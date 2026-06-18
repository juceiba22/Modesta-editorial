# Configuración de Supabase Backend para Pagos (PayPal & Mercado Pago)

Este documento detalla los pasos necesarios para configurar y desplegar el backend de pagos en tu proyecto de **Supabase**.

---

## 1. Configuración de la Base de Datos

1. Ingresa a tu panel de **Supabase** (https://supabase.com).
2. Dirígete a la sección **SQL Editor** en el menú lateral.
3. Haz clic en **New Query**.
4. Copia todo el contenido del archivo de migración ubicado en:
   `supabase/migrations/20260618000000_create_payment_tables.sql`
5. Pégalo en el editor SQL de Supabase y presiona el botón **Run**.
   *Esto creará las tablas `books`, `orders`, `order_items` y `payments`, habilitará las políticas de seguridad (RLS) e insertará los tres libros con sus precios de catálogo oficiales.*

---

## 2. Variables de Entorno en Supabase

Las Funciones Edge necesitan credenciales para comunicarse con las pasarelas de pago y la base de datos. Debes configurar las siguientes variables de entorno.

### Lista de variables necesarias:
- `SUPABASE_URL`: La URL de tu proyecto de Supabase (se obtiene en *Settings > API*).
- `SUPABASE_SERVICE_ROLE_KEY`: La clave secreta de servicio (se obtiene en *Settings > API > service_role*). **No compartas esta clave**.
- `MERCADOPAGO_ACCESS_TOKEN`: Token de acceso (Access Token) de producción o de prueba de Mercado Pago.
- `PAYPAL_CLIENT_ID`: Client ID obtenido en el portal de desarrolladores de PayPal.
- `PAYPAL_CLIENT_SECRET`: Client Secret secreto de PayPal.
- `PAYPAL_MODE`: Define el entorno de PayPal. Usa `sandbox` para pruebas o `live` para producción. (Si se omite, por defecto es `sandbox`).

### Cómo configurarlas:

#### Opción A: Desde la Consola de Supabase (Recomendado y más fácil)
1. Ve a **Settings** (Icono de engranaje) > **Edge Functions**.
2. Haz clic en **Add New Secret** (o Add Secret).
3. Añade cada una de las variables mencionadas arriba con sus respectivos valores.

#### Opción B: Usando la CLI de Supabase
Si tienes la CLI instalada, puedes configurarlas ejecutando en tu terminal:
```bash
supabase secrets set SUPABASE_URL="https://tu-proyecto.supabase.co"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"
supabase secrets set MERCADOPAGO_ACCESS_TOKEN="APP_USR-tu-access-token"
supabase secrets set PAYPAL_CLIENT_ID="tu-paypal-client-id"
supabase secrets set PAYPAL_CLIENT_SECRET="tu-paypal-client-secret"
supabase secrets set PAYPAL_MODE="sandbox"
```

---

## 3. Despliegue de las Funciones Edge

Para subir el código de las Funciones Edge a tu proyecto de Supabase, utiliza la CLI de Supabase desde la raíz de este proyecto en tu computadora.

1. **Iniciar sesión en Supabase:**
   ```bash
   supabase login
   ```
2. **Vincular el proyecto local con Supabase:**
   *(Consigue tu "Project ID" o "Project Ref" desde la URL de tu proyecto en Supabase, por ejemplo en `https://supabase.com/dashboard/project/abcde12345` el ID es `abcde12345`)*
   ```bash
   supabase link --project-ref TU_PROJECT_ID
   ```
3. **Desplegar las funciones:**
   Ejecuta los siguientes comandos para desplegar cada función:
   ```bash
   supabase functions deploy checkout --no-verify-jwt
   supabase functions deploy paypal-capture --no-verify-jwt
   supabase functions deploy mercadopago-webhook --no-verify-jwt
   ```
   *El parámetro `--no-verify-jwt` es muy importante para permitir que el checkout público y los webhooks de PayPal/Mercado Pago puedan hacer peticiones sin requerir tokens de autenticación de usuario de Supabase.*

---

## 4. Configurar Webhook en Mercado Pago

Para recibir las notificaciones de pago de Mercado Pago y actualizar las órdenes automáticamente:

1. Ve al panel de **Mercado Pago Developers** (https://www.mercadopago.com.ar/developers).
2. Dirígete a **Tus Integraciones** > Selecciona tu aplicación.
3. Ve a la sección **Webhooks** en el menú lateral.
4. En **Production URL** (o Sandbox URL según tu entorno de pruebas), ingresa la URL de tu función webhook de Supabase:
   `https://TU_PROJECT_ID.supabase.co/functions/v1/mercadopago-webhook`
5. Selecciona los eventos que deseas escuchar. El más importante es:
   - `payment` (Pagos)
6. Haz clic en **Guardar**.

---

## 5. Actualizar URL de Backend en Frontend

Una vez desplegadas tus funciones, tendrás tus endpoints de Supabase.
Abre tu archivo local `app.js` de frontend y actualiza la constante en la línea superior que define la URL de la API:

```javascript
// app.js
const SUPABASE_FUNCTIONS_URL = "https://TU_PROJECT_ID.supabase.co/functions/v1";
```

¡Listo! El checkout de Modesta Editorial ahora procesará las órdenes, guardará el historial en tu base de datos de Supabase y redirigirá a pagos reales a través de PayPal y Mercado Pago.
