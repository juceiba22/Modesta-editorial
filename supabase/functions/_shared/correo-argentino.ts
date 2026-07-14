export const PROVINCE_MAP: Record<string, string> = {
  "buenos aires": "B",
  "capital federal": "C",
  "caba": "C",
  "catamarca": "K",
  "chaco": "H",
  "chubut": "U",
  "cordoba": "X",
  "córdoba": "X",
  "corrientes": "W",
  "entre rios": "E",
  "entre ríos": "E",
  "formosa": "P",
  "jujuy": "Y",
  "la pampa": "L",
  "la rioja": "F",
  "mendoza": "M",
  "misiones": "N",
  "neuquen": "Q",
  "neuquén": "Q",
  "rio negro": "R",
  "río negro": "R",
  "salta": "A",
  "san juan": "J",
  "san luis": "D",
  "santa cruz": "Z",
  "santa fe": "S",
  "santiago del estero": "G",
  "tierra del fuego": "V",
  "tucuman": "T",
  "tucumán": "T",
};

export function getProvinceCode(provinceName: string): string {
  const normalized = (provinceName || "").toLowerCase().trim();
  return PROVINCE_MAP[normalized] || "A"; // Fallback to 'A' (Salta) or empty depending on strictness
}

export async function getCorreoToken(): Promise<string> {
  const baseUrl = Deno.env.get("CORREO_ARG_BASE_URL");
  const user = Deno.env.get("CORREO_ARG_USER");
  const password = Deno.env.get("CORREO_ARG_PASSWORD");

  if (!baseUrl || !user || !password) {
    throw new Error("Faltan variables de entorno para Correo Argentino (URL, USER, PASSWORD).");
  }

  const basicAuth = btoa(`${user}:${password}`);
  const response = await fetch(`${baseUrl}/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error autenticando con MiCorreo: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  if (!data.token) {
    throw new Error("No se recibió token de MiCorreo.");
  }

  return data.token;
}

export async function importShippingToCorreo(order: any, customerId: string, baseUrl: string, token: string) {
  // Dimensions based on user requirements: fixed 400g per book, 15x20x30 cm
  // cart is a JSON string in DB usually, but could be array if already parsed
  let cart = [];
  if (typeof order.cart === "string") {
    try { cart = JSON.parse(order.cart); } catch(e) {}
  } else if (Array.isArray(order.cart)) {
    cart = order.cart;
  }
  
  const totalBooks = cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0) || 1;
  const totalWeight = totalBooks * 400; 
  
  const payload = {
    extOrderId: order.id,
    orderNumber: order.id,
    customerId: customerId,
    sender: {
      name: "Modesta Editorial",
      email: "modestaeditorial@gmail.com",
      phone: "3874000000",
      street: "San Martín",
      number: "123",
      postalCode: "A4400",
      province: "A", // Salta
      city: "Salta",
    },
    recipient: {
      name: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone || "",
      street: order.shipping_address,
      number: "S/N", // Usually extracted from address, falling back to S/N
      postalCode: order.shipping_zip,
      province: getProvinceCode(order.shipping_state),
      city: order.shipping_city,
    },
    shipping: {
      dimensions: {
        weight: totalWeight, // integer grams
        height: 15, // cm
        width: 20, // cm
        length: 30, // cm
      }
    }
  };

  console.log("Enviando a MiCorreo import:", JSON.stringify(payload));

  const response = await fetch(`${baseUrl}/shipping/import`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`MiCorreo Import API Error: ${response.status} - ${errText}`);
  }

  return await response.json();
}
