// Modesta Editorial - Main Application JavaScript
// Implementa la SPA, el carrito, la simulación de pagos y las reseñas

const app = {
    // 0. SUPABASE CONFIGURATION
    // Reemplazar con las credenciales de tu panel de Supabase
    supabaseUrl: "https://noabatfkgcdlzlpyyvgz.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vYWJhdGZrZ2NkbHpscHl5dmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjMyMjYsImV4cCI6MjA5NzMzOTIyNn0.jfviFnKkn4WhcXOwB8Ne6UeJ-v0OPlpaa_1RaVbSS2g",

    // 1. DATA STORES
    books: {
        posturas: {
            id: "posturas",
            title: "Posturas",
            author: "Mercedes Miralpeix",
            artist: "Virginia Montaldi (Pinturas)",
            price: 35000,
            priceUSD: 1.50,
            coverFront: "assets/cover_posturas.jpg",
            coverBack: "assets/cover_posturas.jpg", // Single cover image
            hasBack: false,
            desc: "Este libro es un encuentro entre dos formas de pensamiento: la escritura de Mercedes Miralpeix y la pintura de Virginia Montaldi. Ni una teoría que explica, ni una obra que ilustra: aquí lo que se abre es un diálogo crítico, feminista y situado. Las pinturas de Montaldi convocan una experiencia sensible del arte, y Miralpeix responde con una escritura que piensa desde el cuerpo y sus pliegues. Una invitación a mirar de otra manera.",
            features: "Encuadernación cosida a hilo, papel ahuesado premium de 90g, reproducción de obras a color.",
            reviews: [
                {
                    name: "Pedro Marcelo Ibarra",
                    rating: 5,
                    date: "10/06/2026",
                    comment: "Este libro es un encuentro. Entre dos formas de pensamiento. Entre la escritura de Mercedes Miralpeix y la pintura de Virginia Montaldi. Ni una teoría que explica, ni una obra que ilustra: aquí lo que se abre es un diálogo. Una conversación hecha de pausas, gestos, desvíos. Una poética crítica, feminista y situada, que piensa con las obras, no sobre ellas. Que no busca cerrar sentidos, sino habilitar nuevas formas de mirar, de sentir, de decir."
                }
            ]
        },
        circulantes: {
            id: "circulantes",
            title: "Circulantes",
            author: "Jorge F. Pantaleón",
            artist: "Sergio Díaz (Intervenciones sobre billetes)",
            price: 35000,
            priceUSD: 1.50,
            coverFront: "assets/cover_circulantes_front.png",
            coverBack: "assets/cover_circulantes_back.png",
            hasBack: true,
            desc: "Un diálogo interdisciplinar sobre el valor, la creencia y la memoria del dinero. Jorge F. Pantaleón retoma su larga trayectoria investigando nuestra relación con la economía y la entrelaza con las provocadoras intervenciones artísticas de Sergio Díaz sobre billetes. Desde el norte de Argentina, surge este ensayo luminoso que desarma el sentido común económico y propone otra forma de pensar el arte y el intercambio.",
            features: "Colección Ensayos. Rústica con solapas. Prólogo de Ariel Wilkis. Presentación de Gonzalo Aguirre. 150 páginas.",
            reviews: [
                {
                    name: "Pedro Marcelo Ibarra",
                    rating: 5,
                    date: "10/06/2026",
                    comment: "Este libro es, ante todo, un intercambio: entre disciplinas, entre territorios, entre imaginaciones, entre imágenes, entre reflexiones, entre personas. Jorge F. Pantaleón retoma su larga trayectoria investigando cómo nos relacionamos con el dinero —como valor, como creencia, como memoria y como vínculo— y la entrelaza con las provocadoras intervenciones artísticas de Sergio Díaz sobre los billetes. Así surge una conversación situada y desobediente."
                }
            ]
        },
        desborde: {
            id: "desborde",
            title: "Desbordes",
            author: "Hernán Ulm",
            artist: "Roly Arias (Dibujos)",
            price: 35000,
            priceUSD: 1.50,
            coverFront: "assets/cover_desborde_front.png",
            coverBack: "assets/cover_desborde_back.png",
            hasBack: true,
            desc: "En la época de la imagen digital y su hiper-visualización, este libro explora los dibujos de Roly Arias como un espacio donde los límites se transforman y contaminan. La escritura reflexiva de Hernán Ulm nos invita a sumergirnos en esta experiencia estética, política y colectiva del presente. Memoria viva de un ojo estallado en cruce con la historia, el amor y la discrepancia.",
            features: "Diseño apaisado de colección, tapa blanda con solapas, papel satinado de alta calidad.",
            reviews: [
                {
                    name: "Pedro Marcelo Ibarra",
                    rating: 5,
                    date: "10/06/2026",
                    comment: "En la época de la imagen digital y su hiper-visualización, este libro se centra en el dibujo de Roly Arias. Cultiva una mirada que se enfoca en los límites del dibujo, desatando así su potencia. En este libro el límite no se define como el punto donde algo termina, sino es el espacio donde ese algo se transforma, se contamina y se potencia. La escritura reflexiva de Hernán Ulm nos invita a mirar los dibujos de Roly."
                }
            ]
        }
    },

    authors: {
        miralpeix: {
            id: "miralpeix",
            name: "Mercedes Miralpeix",
            initials: "MM",
            bookTitle: "Posturas",
            bookId: "posturas",
            bio: "Es Licenciada en Filosofía por la Universidad Nacional de Salta (UNSa). Docente en la Facultad de Humanidades de la UNSa e investigadora especializada en el pensamiento político y filosófico de Walter Benjamin y Hannah Arendt. Realizó sus estudios doctorales en Filosofía en la Universidad Nacional de La Plata (UNLP) con beca del CONICET. Es autora de numerosos artículos en revistas académicas y ha coordinado proyectos de filosofía con niños y jóvenes en la región.",
            backCover: "Este libro es un encuentro entre dos formas de pensamiento: la escritura de Mercedes Miralpeix y la pintura de Virginia Montaldi. Ni una teoría que explica, ni una obra que ilustra: aquí lo que se abre es un diálogo crítico, feminista y situado. Las pinturas de Montaldi convocan una experiencia sensible del arte, y Miralpeix responde con una escritura que piensa desde el cuerpo y sus pliegues. Una invitación a mirar de otra manera."
        },
        pantaleon: {
            id: "pantaleon",
            name: "Jorge F. Pantaleón",
            initials: "JP",
            bookTitle: "Circulantes",
            bookId: "circulantes",
            bio: "Es antropólogo, disciplina desde la cual comenzó a interrogar los vínculos entre técnica, política y vida cotidiana. Actualmente es profesor en el Departamento de Antropología de la Universidad de Montreal e investigador del Centre de Recherches Internationales de esa misma universidad. Ha codirigido la Cátedra de Estudios de las Américas y fue director de la Cátedra de Estudios del México Contemporáneo.",
            backCover: "Este libro es, ante todo, un intercambio: entre disciplinas, entre territorios, entre imaginaciones, entre imágenes, entre reflexiones, entre personas. Jorge F. Pantaleón retoma su larga trayectoria investigando cómo nos relacionamos con el dinero —como valor, como creencia, como memoria y como vínculo— y la entrelaza con las provocadoras intervenciones artísticas de Sergio Díaz sobre los billetes. Así surge una conversación situada y desobediente."
        },
        ulm: {
            id: "ulm",
            name: "Hernán Ulm",
            initials: "HU",
            bookTitle: "Desbordes",
            bookId: "desborde",
            bio: "Es filósofo. En sus trabajos ha indagado sobre el arte, la imagen, la política y la estética contemporánea. Ha desarrollado un pensamiento original sobre el modo en que el arte ha transformado nuestro modo de concebir, conocer e interpretar la realidad. Esta es su tercera publicación luego de Cuestión de imágenes y Rituales de la percepción: artes, técnicas, políticas.",
            backCover: "En la época de la imagen digital y su hiper-visualización, este libro explora los dibujos de Roly Arias como un espacio donde los límites se transforman y contaminan. La escritura reflexiva de Hernán Ulm nos invita a sumergirnos en esta experiencia estética, política y colectiva del presente. Memoria viva de un ojo estallado en cruce con la historia, el amor y la discrepancia."
        }
    },

    manifesto: `
        <p class="manifesto-lead">Modesta Editorial nace con el propósito de promover, acompañar y desarrollar la publicación de autoras y autores situados en la región, cuyas obras permitan pensar las singularidades de nuestra experiencia histórica, cultural y política.</p>
        <p>El proyecto parte de una premisa inicial: escribir y publicar desde este lugar del mundo implica también disputar sentidos. Si el neoliberalismo produce periferias, silencios y formas de subordinación cultural, publicar desde la región constituye una manera de interrumpir esa lógica y afirmar otras voces, otros relatos y otras formas de pensamiento.</p>
        <p>Nuestro punto de partida es político. Entendemos que toda escritura se produce desde algún lugar, aunque muchas veces ese lugar permanezca oculto. Modesta Editorial asume el suyo. Publicamos desde aquí.</p>
        <p>Nos interesan los trabajos que exploran las singularidades de nuestro tiempo y de nuestro sitio: el arte, la cultura, la política, las transformaciones sociales, las formas de vida, las memorias, los conflictos y las posibilidades abiertas hacia el futuro.</p>
        <p>Buscamos que nuestro catálogo reúna ensayos, investigaciones, tesis, ficciones y conversaciones. Nos interesan tanto las preguntas que nacen en el ámbito académico como aquellas que emergen del arte, de la experiencia social, de la práctica política o de la vida cotidiana.</p>
        <p>Modesta Editorial busca construir un espacio donde la escritura, la lectura y la conversación puedan encontrarse. Un espacio para producir libros que ayuden a pensar, imaginar y habitar de otro modo el presente.</p>
    `,

    cart: [],
    tempReviewStars: 5,

    // 2. INITIALIZATION
    init() {
        this.loadCart();
        this.loadUserReviews();
        this.renderCatalog();
        this.renderAuthors();
        this.setupRouter();
        this.setupEventListeners();
        this.updateCartUI();
        this.renderManifesto();
    },

    // 3. ROUTER & SECTIONS
    setupRouter() {
        const handleRoute = () => {
            const hash = window.location.hash || '#inicio';
            
            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Update active menu link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash.split('/')[0]) {
                    link.classList.add('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Close payment modal if it was open (prevents loop when returning via browser Back button)
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal) paymentModal.classList.remove('open');

            // Route parsing
            if (hash.startsWith('#libro-detalle/')) {
                const bookId = hash.split('/')[1];
                this.renderBookDetail(bookId);
                document.getElementById('libro-detalle').classList.add('active');
            } else if (hash.startsWith('#checkout/success')) {
                this.handleCheckoutSuccess();
                document.getElementById('checkout-success').classList.add('active');
            } else if (hash.startsWith('#checkout/failure')) {
                this.handleCheckoutFailure();
                document.getElementById('checkout-failure').classList.add('active');
            } else if (hash === '#checkout') {
                this.renderCheckout();
                document.getElementById('checkout').classList.add('active');
            } else if (hash === '#nuestros-autores') {
                this.renderAuthors();
                document.getElementById('nuestros-autores').classList.add('active');
            } else {
                const activeSection = document.querySelector(hash);
                if (activeSection) {
                    activeSection.classList.add('active');
                } else {
                    document.getElementById('inicio').classList.add('active');
                }
            }
        };

        window.addEventListener('hashchange', handleRoute);
        
        // Handle bfcache restorations (when user navigates back from PayPal/MercadoPago)
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                const paymentModal = document.getElementById('payment-modal');
                if (paymentModal) paymentModal.classList.remove('open');
            }
        });

        // Initial run
        handleRoute();
    },

    // 4. EVENT LISTENERS
    setupEventListeners() {
        // Cart drawer open/close
        const cartDrawer = document.getElementById('cart-drawer');
        const cartOverlay = document.getElementById('cart-drawer-overlay');
        const openCartBtn = document.getElementById('open-cart-btn');
        const closeCartBtn = document.getElementById('close-cart-btn');

        const openCart = () => {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
        };

        const closeCart = () => {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
        };

        openCartBtn.addEventListener('click', openCart);
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
        document.getElementById('cart-checkout-btn').addEventListener('click', closeCart);

        // Checkout country change
        const countrySelect = document.getElementById('checkout-country');
        if (countrySelect) {
            countrySelect.addEventListener('change', () => {
                this.updateCheckoutShippingAndPayment();
            });
        }
        
        // Dynamic Shipping Fetching
        const zipInput = document.getElementById('checkout-zip');
        const stateInput = document.getElementById('checkout-state');
        if (zipInput) {
            zipInput.addEventListener('blur', () => this.fetchShippingRates());
        }
        if (stateInput) {
            stateInput.addEventListener('blur', () => {
                this.fetchShippingRates();
                if (this.selectedShippingType === 'S') {
                    this.fetchAgencies(stateInput.value);
                }
            });
        }

        // Checkout submit
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.cart.length === 0) {
                    alert('Tu carrito está vacío.');
                    return;
                }
                this.openPaymentGateway();
            });
        }
    },

    // 5. VIEW RENDERING
    renderManifesto() {
        document.getElementById('about-manifesto-container').innerHTML = `
            <h2>Quiénes Somos</h2>
            ${this.manifesto}
        `;
    },

    renderCatalog() {
        const featuredGrid = document.getElementById('featured-books-grid');
        const catalogGrid = document.getElementById('catalog-books-grid');
        
        let booksHTML = '';
        
        Object.values(this.books).forEach(book => {
            booksHTML += `
                <div class="book-card">
                    <div class="book-cover-container">
                        <div class="book-cover-wrapper ${book.hasBack ? 'has-back' : ''}" id="card-wrapper-${book.id}">
                            <div class="book-cover-side book-cover-front">
                                <img src="${book.coverFront}" alt="Portada de ${book.title}">
                            </div>
                            ${book.hasBack ? `
                            <div class="book-cover-side book-cover-back">
                                <img src="${book.coverBack}" alt="Contratapa de ${book.title}">
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <h3>${book.title}</h3>
                    <div class="book-author">${book.author}</div>
                    <div class="book-artist">${book.artist}</div>
                    <div class="price">$${book.price.toLocaleString('es-AR')} ARS</div>
                    <div class="book-card-actions">
                        <a href="#libro-detalle/${book.id}" class="btn btn-secondary">Ver Reseña</a>
                        <button onclick="app.addToCart('${book.id}')" class="btn btn-primary"><i class="fa-solid fa-cart-plus"></i> Comprar</button>
                    </div>
                </div>
            `;
        });

        if (featuredGrid) featuredGrid.innerHTML = booksHTML;
        if (catalogGrid) catalogGrid.innerHTML = booksHTML;
    },

    renderAuthors() {
        const container = document.getElementById('authors-container');
        if (!container) return;

        let authorsHTML = '';
        Object.values(this.authors).forEach(author => {
            authorsHTML += `
                <div class="author-card">
                    <div class="author-header">
                        <div class="author-avatar-container" style="background-color: var(--color-bg); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; color: var(--color-accent);">
                            ${author.initials}
                        </div>
                        <div class="author-meta">
                            <h3>${author.name}</h3>
                            <a href="#libro-detalle/${author.bookId}" class="author-book-badge">Ver Libro "${author.bookTitle}"</a>
                        </div>
                    </div>
                    <div class="author-bio">
                        ${author.bio}
                    </div>
                    <div class="author-quote-box">
                        <div class="author-quote-title">De la Contratapa</div>
                        <p class="author-quote">"${author.backCover}"</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = authorsHTML;
    },

    renderBookDetail(bookId) {
        const book = this.books[bookId];
        const container = document.getElementById('libro-detalle');
        if (!book) {
            container.innerHTML = `<h2>Libro no encontrado</h2><a href="#catalogo" class="btn btn-secondary">Volver al catálogo</a>`;
            return;
        }

        // Calculate Average Rating
        const avg = this.getAverageRating(bookId);

        container.innerHTML = `
            <div class="detail-container">
                <div class="detail-visual">
                    <div class="detail-cover-view">
                        <div class="detail-cover-wrapper" id="detail-cover-wrapper">
                            <div class="detail-cover-side detail-cover-front">
                                <img src="${book.coverFront}" id="detail-cover-front-img" alt="Portada de ${book.title}">
                            </div>
                            <div class="detail-cover-side detail-cover-back">
                                <img src="${book.coverBack}" id="detail-cover-back-img" alt="Contratapa de ${book.title}">
                            </div>
                        </div>
                    </div>
                    
                    ${book.hasBack ? `
                    <div class="detail-cover-controls">
                        <button class="detail-cover-btn active" id="btn-show-front" onclick="app.flipDetailCover(false)">Tapa</button>
                        <button class="detail-cover-btn" id="btn-show-back" onclick="app.flipDetailCover(true)">Contratapa</button>
                    </div>
                    ` : ''}
                </div>
                
                <div class="detail-info">
                    <div style="font-size: 0.85rem; color: var(--color-accent); text-transform: uppercase; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 0.5rem;">Modesta Editorial</div>
                    <h2>${book.title}</h2>
                    <div class="book-author" style="font-size: 1.1rem; margin-bottom: 0.5rem;">${book.author}</div>
                    <div class="book-artist" style="font-size: 1rem; margin-bottom: 2rem;">${book.artist}</div>
                    
                    <div class="detail-price-box">
                        <span class="price-label">Adquisición Disponible</span>
                        <span class="price-val">$${book.price.toLocaleString('es-AR')} ARS</span>
                    </div>

                    <button onclick="app.addToCart('${book.id}')" class="btn btn-primary" style="width: 100%; padding: 1.1rem; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 3rem;">
                        <i class="fa-solid fa-cart-shopping"></i> Añadir al Carrito de Compras
                    </button>
                    
                    <div class="detail-description">
                        <h3>Reseña de la Publicación</h3>
                        <p>${book.desc}</p>
                    </div>
                    
                    <div class="meta-item" style="background-color: var(--color-bg-alt); padding: 1.5rem; border-radius: 6px; border: 1px solid var(--color-border); margin-bottom: 4rem;">
                        <div class="meta-label">Detalles del Libro</div>
                        <div class="meta-val" style="font-weight: 500; font-size: 0.95rem; color: var(--color-text-muted);">${book.features}</div>
                    </div>

                    <!-- Reviews Section -->
                    <div class="reviews-section">
                        <h3>Opiniones y Calificaciones</h3>
                        
                        <div class="reviews-summary">
                            <div class="rating-avg-box">
                                <div class="rating-avg-num">${avg.toFixed(1)}</div>
                                <div class="stars stars-large">
                                    ${this.getStarsHTML(avg)}
                                </div>
                                <div class="rating-count">Basado en ${book.reviews.length} opiniones</div>
                            </div>
                            
                            <div class="add-review-box">
                                <h4>Deja tu reseña</h4>
                                <form class="review-form" id="new-review-form" onsubmit="app.handleNewReviewSubmit(event, '${book.id}')">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Nombre Completo</label>
                                            <input type="text" id="review-name" required placeholder="Juan Pérez">
                                        </div>
                                        <div class="form-group">
                                            <label>Tu Calificación</label>
                                            <div class="star-rating-select" id="star-selector">
                                                <span onclick="app.setReviewRating(1)" class="star-sel selected" data-value="1"><i class="fa-solid fa-star"></i></span>
                                                <span onclick="app.setReviewRating(2)" class="star-sel selected" data-value="2"><i class="fa-solid fa-star"></i></span>
                                                <span onclick="app.setReviewRating(3)" class="star-sel selected" data-value="3"><i class="fa-solid fa-star"></i></span>
                                                <span onclick="app.setReviewRating(4)" class="star-sel selected" data-value="4"><i class="fa-solid fa-star"></i></span>
                                                <span onclick="app.setReviewRating(5)" class="star-sel selected" data-value="5"><i class="fa-solid fa-star"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Comentario u Opinión</label>
                                        <textarea id="review-text" required rows="3" placeholder="¿Qué te pareció esta publicación?..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary" style="align-self: flex-start; padding: 0.6rem 1.5rem; font-size: 0.8rem;">Enviar Comentario</button>
                                </form>
                            </div>
                        </div>

                        <div class="reviews-list">
                            ${book.reviews.map(r => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <div class="reviewer-name">${r.name}</div>
                                        <div class="stars">${this.getStarsHTML(r.rating)}</div>
                                        <div class="review-date">${r.date}</div>
                                    </div>
                                    <div class="review-comment">"${r.comment}"</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Reset temp review rating
        this.setReviewRating(5);
    },

    flipDetailCover(showBack) {
        const cover = document.getElementById('detail-cover-wrapper');
        const btnFront = document.getElementById('btn-show-front');
        const btnBack = document.getElementById('btn-show-back');
        if (showBack) {
            cover.classList.add('flipped');
            btnFront.classList.remove('active');
            btnBack.classList.add('active');
        } else {
            cover.classList.remove('flipped');
            btnFront.classList.add('active');
            btnBack.classList.remove('active');
        }
    },

    // 6. SHOPPING CART LOGIC
    addToCart(bookId) {
        const book = this.books[bookId];
        if (!book) return;

        const existingItem = this.cart.find(item => item.id === bookId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: book.id,
                title: book.title,
                author: book.author,
                price: book.price,
                priceUSD: book.priceUSD,
                coverFront: book.coverFront,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartUI();
        
        // Open Cart Drawer automatically to show feedback
        document.getElementById('cart-drawer').classList.add('open');
        document.getElementById('cart-drawer-overlay').classList.add('open');
    },

    updateQuantity(bookId, delta) {
        const item = this.cart.find(item => item.id === bookId);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            this.cart = this.cart.filter(i => i.id !== bookId);
        }

        this.saveCart();
        this.updateCartUI();
        this.updateOrderSummary();
    },

    removeFromCart(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        this.saveCart();
        this.updateCartUI();
        this.updateOrderSummary();
    },

    saveCart() {
        localStorage.setItem('modesta_cart', JSON.stringify(this.cart));
    },

    loadCart() {
        const stored = localStorage.getItem('modesta_cart');
        if (stored) {
            try {
                this.cart = JSON.parse(stored);
            } catch (e) {
                this.cart = [];
            }
        }
    },

    updateCartUI() {
        // Update badge count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-badge-count').innerText = totalItems;

        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartSubtotalEl = document.getElementById('cart-subtotal');

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="cart-empty-message"><i class="fa-solid fa-book-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-border)"></i><br>El carrito de compras está vacío</div>`;
            cartSubtotalEl.innerText = '$0 ARS';
            return;
        }

        let cartHTML = '';
        let subtotal = 0;

        this.cart.forEach(item => {
            subtotal += item.price * item.quantity;
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.coverFront}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-author">${item.author}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString('es-AR')} ARS</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="app.updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="app.updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" onclick="app.removeFromCart('${item.id}')" aria-label="Eliminar item">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        cartSubtotalEl.innerText = `$${subtotal.toLocaleString('es-AR')} ARS`;
    },

    // 7. CHECKOUT & SHIPPING SYSTEM
    renderCheckout() {
        this.updateCheckoutShippingAndPayment();
        this.updateOrderSummary();
    },

    updateCheckoutShippingAndPayment() {
        const countrySelect = document.getElementById('checkout-country');
        const stateLabel = document.getElementById('label-state');
        const stateInput = document.getElementById('checkout-state');
        
        const isArgentina = (countrySelect.value === 'AR');
        
        // Update State input placeholder/label
        if (isArgentina) {
            stateLabel.innerText = "Provincia *";
            stateInput.placeholder = "Salta";
            stateInput.onchange = () => {
                if (document.getElementById('shipping-options-container').innerHTML.includes('ship-S')) {
                    this.fetchAgencies(stateInput.value);
                }
            };
        } else {
            stateLabel.innerText = "Estado / Región *";
            stateInput.placeholder = "Región Metropolitana, etc.";
        }

        // Render Shipping options
        const shippingContainer = document.getElementById('shipping-options-container');
        if (isArgentina) {
            shippingContainer.innerHTML = `
                <div style="padding: 1.5rem; background: var(--color-bg-alt); border-radius: 8px; border: 1px solid var(--color-border); text-align: center;">
                    <p style="color: var(--color-text-muted); margin-bottom: 0;">Ingresa tu Código Postal y Provincia para ver las opciones de envío de Correo Argentino.</p>
                </div>
            `;
            this.selectedShippingCost = 0;
            this.selectedShippingType = null;
            this.selectedShippingAgency = null;
            document.getElementById('checkout-zip').addEventListener('input', () => this.fetchShippingRates());
        } else {
            this.selectedShippingCost = 0;
            this.selectedShippingType = 'international';
            this.selectedShippingAgency = null;
            shippingContainer.innerHTML = `
                <div class="shipping-option selected" onclick="app.selectShippingOption('international')">
                    <input type="radio" id="ship-int" name="shipping-type" checked>
                    <div class="shipping-option-details">
                        <div class="shipping-option-title">DHL Express / FedEx Internacional</div>
                        <div class="shipping-option-desc">Envío internacional prioritario Courier con seguimiento (5 a 10 días hábiles)</div>
                    </div>
                    <div class="shipping-option-price">$0 USD (Gratis)</div>
                </div>
            `;
        }

        // Render Payment options
        const paymentContainer = document.getElementById('payment-methods-container');
        if (isArgentina) {
            paymentContainer.innerHTML = `
                <div class="payment-method-card selected" id="pay-card-mp" onclick="app.selectPaymentMethod('mercadopago')">
                    <img src="https://logotipode.com/wp-content/uploads/2021/10/mercado-pago-logo.png" alt="Mercado Pago Logo" class="payment-method-logo" onerror="this.src='assets/logo_icon.png'">
                    <div class="payment-method-title">Mercado Pago</div>
                    <div class="payment-method-desc">Tarjetas de crédito/débito, Pago Fácil/RapiPago, dinero en cuenta</div>
                </div>
                <div class="payment-method-card" id="pay-card-paypal" onclick="app.selectPaymentMethod('paypal')" style="margin-top: 1rem;">
                    <img src="https://pngimg.com/d/paypal_PNG22.png" alt="PayPal Logo" class="payment-method-logo" onerror="this.src='assets/logo_icon.png'">
                    <div class="payment-method-title">PayPal</div>
                    <div class="payment-method-desc">Tarjetas internacionales o saldo en tu cuenta PayPal (en USD)</div>
                </div>
            `;
            this.selectedPaymentMethod = 'mercadopago';
        } else {
            paymentContainer.innerHTML = `
                <div class="payment-method-card selected" id="pay-card-paypal" onclick="app.selectPaymentMethod('paypal')">
                    <img src="https://pngimg.com/d/paypal_PNG22.png" alt="PayPal Logo" class="payment-method-logo" onerror="this.src='assets/logo_icon.png'">
                    <div class="payment-method-title">PayPal</div>
                    <div class="payment-method-desc">Saldo PayPal o tarjetas internacionales (Visa, Mastercard, AMEX)</div>
                </div>
            `;
            this.selectedPaymentMethod = 'paypal';
        }

        this.updateOrderSummary();
    },

    selectShippingOption(optionId, cost = 0) {
        document.querySelectorAll('.shipping-option').forEach(el => {
            el.classList.remove('selected');
        });
        const selectedEl = document.querySelector(`.shipping-option[onclick*="'${optionId}'"]`) || document.querySelector(`.shipping-option[onclick*="('${optionId}'"]`);
        if (selectedEl) {
            selectedEl.classList.add('selected');
            const radio = selectedEl.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        }

        this.selectedShippingType = optionId;
        this.selectedShippingCost = cost;
        
        if (optionId.startsWith('S')) {
            const stateInput = document.getElementById('checkout-state');
            this.fetchAgencies(stateInput.value);
            const agenciesContainer = document.getElementById('agencies-container');
            if (agenciesContainer) agenciesContainer.style.display = 'block';
        } else {
            this.selectedShippingAgency = null;
            const agenciesContainer = document.getElementById('agencies-container');
            if (agenciesContainer) agenciesContainer.style.display = 'none';
        }
        
        this.updateOrderSummary();
    },

    selectAgency(agencyCode) {
        this.selectedShippingAgency = agencyCode;
    },

    async fetchShippingRates() {
        const countrySelect = document.getElementById('checkout-country');
        const zipInput = document.getElementById('checkout-zip');
        const shippingContainer = document.getElementById('shipping-options-container');
        
        if (!countrySelect || countrySelect.value !== 'AR' || !zipInput || !zipInput.value || zipInput.value.length < 4) {
            return;
        }

        shippingContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--color-accent);"></i>
                <p style="margin-top: 1rem; color: var(--color-text-muted);">Cotizando envíos...</p>
            </div>
        `;

        try {
            const totalQuantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
            const res = await fetch(`${this.supabaseUrl}/functions/v1/correo-argentino-rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseAnonKey
                },
                body: JSON.stringify({ 
                    postalCodeDestination: zipInput.value,
                    totalQuantity: totalQuantity
                })
            });

            if (!res.ok) throw new Error("No se pudieron cargar las tarifas de envío");
            
            const data = await res.json();
            const rates = data.rates || data.rates?.rates || []; 
            let ratesArray = Array.isArray(rates) ? rates : (Array.isArray(data.rates) ? data.rates : data);

            if (!Array.isArray(ratesArray) || ratesArray.length === 0) {
                shippingContainer.innerHTML = `<p style="color: var(--color-error);">No hay opciones de envío para este código postal.</p>`;
                return;
            }

            let html = '';
            let firstId = null;
            let firstCost = 0;

            ratesArray.forEach((rate, index) => {
                if (!rate.deliveredType) return;
                const typeId = `${rate.deliveredType}_${rate.productType || 'CP'}`;
                const cost = Number(rate.price);
                const isSelected = index === 0;
                
                if (isSelected) {
                    firstId = typeId;
                    firstCost = cost;
                }

                html += `
                    <div class="shipping-option ${isSelected ? 'selected' : ''}" onclick="app.selectShippingOption('${typeId}', ${cost})">
                        <input type="radio" id="ship-${typeId}" name="shipping-type" ${isSelected ? 'checked' : ''}>
                        <div class="shipping-option-details">
                            <div class="shipping-option-title">${rate.productName || 'Correo Argentino'} a ${rate.deliveredType === 'S' ? 'Sucursal' : 'Domicilio'}</div>
                            <div class="shipping-option-desc">Tiempo estimado: ${rate.deliveryTimeMin} a ${rate.deliveryTimeMax} días hábiles</div>
                        </div>
                        <div class="shipping-option-price">$${cost.toLocaleString('en-US')} ARS</div>
                    </div>
                `;
            });
            
            html += `<div id="agencies-container" style="display: none; margin-top: 1rem;"></div>`;
            shippingContainer.innerHTML = html;
            
            if (firstId) {
                this.selectShippingOption(firstId, firstCost);
            }

        } catch (error) {
            console.error("Error fetching rates:", error);
            shippingContainer.innerHTML = `<p style="color: var(--color-error);">Error al cotizar el envío. Intenta nuevamente.</p>`;
        }
    },

    async fetchAgencies(provinceName) {
        const agenciesContainer = document.getElementById('agencies-container');
        if (!agenciesContainer || !provinceName) return;

        const provinceMap = {
            "buenos aires": "B", "capital federal": "C", "caba": "C", "catamarca": "K", "chaco": "H", 
            "chubut": "U", "cordoba": "X", "córdoba": "X", "corrientes": "W", "entre rios": "E", 
            "entre ríos": "E", "formosa": "P", "jujuy": "Y", "la pampa": "L", "la rioja": "F", 
            "mendoza": "M", "misiones": "N", "neuquen": "Q", "neuquén": "Q", "rio negro": "R", 
            "río negro": "R", "salta": "A", "san juan": "J", "san luis": "D", "santa cruz": "Z", 
            "santa fe": "S", "santiago del estero": "G", "tierra del fuego": "V", "tucuman": "T", "tucumán": "T"
        };
        const pCode = provinceMap[provinceName.toLowerCase().trim()] || "A";

        agenciesContainer.innerHTML = `<p style="font-size: 0.9rem; color: var(--color-text-muted);">Cargando sucursales...</p>`;

        try {
            const res = await fetch(`${this.supabaseUrl}/functions/v1/correo-argentino-agencies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseAnonKey
                },
                body: JSON.stringify({ provinceCode: pCode })
            });

            if (!res.ok) throw new Error("Failed to load agencies");
            
            const data = await res.json();
            const agencies = data.agencies || [];
            
            if (agencies.length === 0) {
                agenciesContainer.innerHTML = `<p style="color: var(--color-error); font-size: 0.9rem;">No se encontraron sucursales en tu provincia.</p>`;
                return;
            }

            let selectHtml = `
                <label style="font-size: 0.9rem; font-weight: 500; margin-bottom: 0.5rem; display: block;">Selecciona la Sucursal:</label>
                <select id="checkout-agency" class="form-input" style="width: 100%; margin-bottom: 1rem;" onchange="app.selectAgency(this.value)">
                    <option value="" disabled selected>Elige una sucursal...</option>
            `;

            agencies.forEach(ag => {
                const street = ag.location?.address?.streetName || '';
                const number = ag.location?.address?.streetNumber || '';
                const loc = ag.location?.locality || '';
                selectHtml += `<option value="${ag.code}">${ag.name} - ${street} ${number} (${loc})</option>`;
            });

            selectHtml += `</select>`;
            agenciesContainer.innerHTML = selectHtml;

        } catch (error) {
            console.error("Error fetching agencies:", error);
            agenciesContainer.innerHTML = `<p style="color: var(--color-error); font-size: 0.9rem;">Error al cargar las sucursales.</p>`;
        }
    },

    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        const mpCard = document.getElementById('pay-card-mp');
        const ppCard = document.getElementById('pay-card-paypal');
        
        if (mpCard) mpCard.classList.remove('selected');
        if (ppCard) ppCard.classList.remove('selected');
        
        if (method === 'mercadopago' && mpCard) {
            mpCard.classList.add('selected');
        } else if (method === 'paypal' && ppCard) {
            ppCard.classList.add('selected');
        }
        
        this.updateOrderSummary();
    },

    async updateOrderSummary() {
        const countrySelect = document.getElementById('checkout-country');
        const isArgentina = (countrySelect && countrySelect.value === 'AR');
        
        const summaryItemsList = document.getElementById('summary-items-list');
        const summarySubtotal = document.getElementById('summary-subtotal');
        const summaryShipping = document.getElementById('summary-shipping');
        const summaryTotal = document.getElementById('summary-total');
        const checkoutTotalBtn = document.getElementById('checkout-submit-btn');

        if (this.cart.length === 0) {
            if (summaryItemsList) {
                summaryItemsList.innerHTML = `<div class="cart-empty-message">No hay ítems en tu compra</div>`;
            }
            if (summarySubtotal) summarySubtotal.innerText = isArgentina ? '$0 ARS' : '$0 USD';
            if (summaryShipping) summaryShipping.innerText = isArgentina ? '$0 ARS' : '$0 USD';
            if (summaryTotal) summaryTotal.innerText = isArgentina ? '$0 ARS' : '$0 USD';
            if (checkoutTotalBtn) checkoutTotalBtn.innerText = "Continuar al Pago";
            return;
        }

        let isUSD = !isArgentina || (isArgentina && this.selectedPaymentMethod === 'paypal');
        let exchangeRate = 1000;

        if (isArgentina && isUSD) {
            try {
                const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
                if (res.ok) {
                    const data = await res.json();
                    exchangeRate = data.venta || 1000;
                }
            } catch(e) {}
        }

        let itemsHTML = '';
        let subtotal = 0;

        this.cart.forEach(item => {
            if (!isUSD) {
                subtotal += item.price * item.quantity;
                itemsHTML += `
                    <div class="summary-item">
                        <span class="summary-item-name">${item.title} (x${item.quantity})</span>
                        <span class="summary-item-price">$${(item.price * item.quantity).toLocaleString('es-AR')} ARS</span>
                    </div>
                `;
            } else {
                subtotal += item.priceUSD * item.quantity;
                itemsHTML += `
                    <div class="summary-item">
                        <span class="summary-item-name">${item.title} (x${item.quantity})</span>
                        <span class="summary-item-price">$${(item.priceUSD * item.quantity).toLocaleString('en-US')} USD</span>
                    </div>
                `;
            }
        });

        if (summaryItemsList) summaryItemsList.innerHTML = itemsHTML;

        // Shipping price
        let shippingARS = isArgentina ? (this.selectedShippingCost || 0) : 0;
        let shippingStr = "";
        let finalShipping = 0;

        if (isArgentina) {
            if (isUSD) {
                finalShipping = shippingARS > 0 ? Number((shippingARS / exchangeRate).toFixed(2)) : 0;
                shippingStr = finalShipping > 0 ? `$${finalShipping.toLocaleString('en-US')} USD` : 'Gratis';
            } else {
                finalShipping = shippingARS;
                shippingStr = finalShipping > 0 ? `$${finalShipping.toLocaleString('es-AR')} ARS` : 'Gratis';
            }
        } else {
            finalShipping = 0;
            shippingStr = 'Gratis';
        }

        const total = subtotal + finalShipping;

        if (summarySubtotal) summarySubtotal.innerText = isUSD ? `$${subtotal.toLocaleString('en-US')} USD` : `$${subtotal.toLocaleString('es-AR')} ARS`;
        if (summaryShipping) summaryShipping.innerText = shippingStr;
        if (summaryTotal) summaryTotal.innerText = isUSD ? `$${total.toLocaleString('en-US')} USD` : `$${total.toLocaleString('es-AR')} ARS`;
        if (checkoutTotalBtn) checkoutTotalBtn.innerText = isUSD ? `Pagar $${total.toLocaleString('en-US')} USD` : `Pagar $${total.toLocaleString('es-AR')} ARS`;
    },

    // 8. PAYMENT SIMULATION
    openPaymentGateway() {
        const countrySelect = document.getElementById('checkout-country');
        const isArgentina = (countrySelect.value === 'AR');
        
        const modal = document.getElementById('payment-modal');
        const modalCard = document.getElementById('payment-modal-card');
        
        modal.classList.add('open');
        modalCard.innerHTML = `
            <div class="payment-status-screen">
                <div style="margin: 2rem 0;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 3.5rem; color: var(--color-accent)"></i>
                </div>
                <h4 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 1rem;">Preparando tu Pago</h4>
                <p style="color: var(--color-text-muted);">Por favor, espera un momento mientras te conectamos con la pasarela de pagos...</p>
            </div>
        `;

        const checkoutData = {
            customer_name: document.getElementById('checkout-name').value,
            customer_email: document.getElementById('checkout-email').value,
            customer_phone: document.getElementById('checkout-phone').value,
            shipping_address: document.getElementById('checkout-address').value,
            shipping_city: document.getElementById('checkout-city').value,
            shipping_state: document.getElementById('checkout-state').value,
            shipping_zip: document.getElementById('checkout-zip').value,
            shipping_country: countrySelect.value,
            payment_method: this.selectedPaymentMethod || (isArgentina ? 'mercadopago' : 'paypal'),
            shipping_type: this.selectedShippingType,
            shipping_agency: this.selectedShippingAgency,
            shipping_cost_frontend: this.selectedShippingCost,
            cart: this.cart.map(item => ({ id: item.id, quantity: item.quantity })),
            site_url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`
        };

        fetch(`${this.supabaseUrl}/functions/v1/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': this.supabaseAnonKey
            },
            body: JSON.stringify(checkoutData)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.error || 'Error en el servidor') });
            }
            return res.json();
        })
        .then(data => {
            if (data.url) {
                sessionStorage.setItem('last_order_id', data.order_id);
                window.location.href = data.url;
            } else {
                throw new Error("No se recibió la URL de pago.");
            }
        })
        .catch(err => {
            console.error("Checkout error:", err);
            modalCard.innerHTML = `
                <div class="payment-status-screen">
                    <div class="status-icon failure">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <h3 class="status-title" style="color: #c62828;">Error en el Checkout</h3>
                    <p class="status-desc">${err.message}</p>
                    <button onclick="app.closePaymentModal()" class="btn btn-secondary" style="padding: 0.6rem 1.5rem;">
                        Cerrar y Reintentar
                    </button>
                </div>
            `;
        });
    },

    closePaymentModal() {
        document.getElementById('payment-modal').classList.remove('open');
    },

    getHashParams() {
        const hash = window.location.hash;
        const qPos = hash.indexOf('?');
        if (qPos === -1) return {};
        const search = hash.substring(qPos + 1);
        const params = {};
        search.split('&').forEach(pair => {
            const [key, val] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(val || '');
        });
        return params;
    },

    handleCheckoutSuccess() {
        const successBox = document.getElementById('success-details-box');
        const params = this.getHashParams();
        const gateway = params.gateway;
        const orderId = params.order_id || sessionStorage.getItem('last_order_id');
        
        // PayPal appends token to the query string, not the hash in some cases
        const urlParams = new URLSearchParams(window.location.search);
        const token = params.token || urlParams.get('token');

        if (!orderId) {
            successBox.innerHTML = `
                <p style="color: #c62828;"><strong>Error:</strong> No se pudo recuperar el identificador del pedido.</p>
                <p>Si realizaste el pago, por favor contáctanos con tu comprobante.</p>
            `;
            return;
        }

        if (gateway === 'paypal' && token) {
            successBox.innerHTML = `
                <div style="text-align: center; padding: 1rem 0;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: #0070ba; margin-bottom: 1rem;"></i>
                    <p>Capturando fondos y verificando tu pago con PayPal...</p>
                </div>
            `;

            fetch(`${this.supabaseUrl}/functions/v1/paypal-capture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseAnonKey
                },
                body: JSON.stringify({
                    paypal_order_id: token,
                    order_id: orderId
                })
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.error || 'Error al procesar la captura') });
                }
                return res.json();
            })
            .then(data => {
                this.cart = [];
                this.saveCart();
                this.updateCartUI();

                successBox.innerHTML = `
                    <div style="margin-bottom: 0.5rem;"><strong>Número de Pedido:</strong> #${orderId}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Transacción:</strong> Aprobada y capturada por PayPal</div>
                    <div><strong>Detalle de Envío:</strong> Enviaremos el código de seguimiento prioritario a tu e-mail.</div>
                `;
                sessionStorage.removeItem('last_order_id');
            })
            .catch(err => {
                console.error("PayPal Capture error:", err);
                successBox.innerHTML = `
                    <p style="color: #c62828;"><strong>Error en captura de PayPal:</strong> ${err.message}</p>
                    <p>Por favor, contáctanos si se te ha descontado saldo pero no ves la orden como completada.</p>
                `;
            });
        } else if (gateway === 'mercadopago') {
            successBox.innerHTML = `
                <div style="text-align: center; padding: 1rem 0;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: #009ee3; margin-bottom: 1rem;"></i>
                    <p>Verificando acreditación de pago de Mercado Pago...</p>
                </div>
            `;

            let attempts = 0;
            const maxAttempts = 6;

            const checkStatus = () => {
                attempts++;
                fetch(`${this.supabaseUrl}/rest/v1/orders?id=eq.${orderId}&select=status`, {
                    headers: {
                        'apikey': this.supabaseAnonKey,
                        'Authorization': `Bearer ${this.supabaseAnonKey}`
                    }
                })
                .then(res => res.json())
                .then(orders => {
                    if (orders && orders.length > 0) {
                        const order = orders[0];
                        if (order.status === 'paid') {
                            this.cart = [];
                            this.saveCart();
                            this.updateCartUI();

                            successBox.innerHTML = `
                                <div style="margin-bottom: 0.5rem;"><strong>Número de Pedido:</strong> #${orderId}</div>
                                <div style="margin-bottom: 0.5rem;"><strong>Transacción:</strong> Acreditada por Mercado Pago</div>
                                <div><strong>Detalle de Envío:</strong> El correo prioritario de envío nacional certificado será enviado a tu e-mail.</div>
                            `;
                            sessionStorage.removeItem('last_order_id');
                        } else if (attempts < maxAttempts) {
                            setTimeout(checkStatus, 2000);
                        } else {
                            this.cart = [];
                            this.saveCart();
                            this.updateCartUI();
                            
                            successBox.innerHTML = `
                                <div style="margin-bottom: 0.5rem;"><strong>Número de Pedido:</strong> #${orderId}</div>
                                <div style="margin-bottom: 0.5rem;"><strong>Transacción:</strong> Procesando (Pendiente / Acreditándose)</div>
                                <div style="margin-top: 1rem; color: var(--color-text-muted);">El pago se está procesando. Una vez acreditado por Mercado Pago, tu pedido se despachará automáticamente. Te enviaremos un e-mail con la confirmación.</div>
                            `;
                            sessionStorage.removeItem('last_order_id');
                        }
                    } else {
                        throw new Error("No se encontró la orden.");
                    }
                })
                .catch(err => {
                    console.error("Error polling order status:", err);
                    successBox.innerHTML = `
                        <div style="margin-bottom: 0.5rem;"><strong>Número de Pedido:</strong> #${orderId}</div>
                        <div><strong>Transacción:</strong> Estado en verificación</div>
                        <div style="margin-top: 1rem; color: var(--color-text-muted);">No pudimos verificar el estado del pago al instante, pero procesaremos tu orden tan pronto como Mercado Pago notifique la acreditación.</div>
                    `;
                });
            };

            setTimeout(checkStatus, 1000);
        } else {
            successBox.innerHTML = `
                <div style="margin-bottom: 0.5rem;"><strong>Número de Pedido:</strong> #${orderId}</div>
                <div><strong>Transacción:</strong> Recibida</div>
                <div style="margin-top: 1rem;">Procesaremos tu pedido a la brevedad.</div>
            `;
        }
    },

    handleCheckoutFailure() {
        const params = this.getHashParams();
        const orderId = params.order_id || sessionStorage.getItem('last_order_id');
        const detailText = document.getElementById('failure-details-text');
        
        if (orderId) {
            detailText.innerText = `Referencia de orden interna: #${orderId}`;
        } else {
            detailText.innerText = "";
        }
    },

    finalizePurchaseOrder() {
        this.closePaymentModal();
        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.updateOrderSummary();
        
        // Reset checkout form fields
        const form = document.getElementById('checkout-form');
        if (form) form.reset();
        
        // Redirect to Home
        window.location.hash = '#inicio';
    },

    // 9. REVIEWS SYSTEM
    getAverageRating(bookId) {
        const book = this.books[bookId];
        if (!book || book.reviews.length === 0) return 0;
        const sum = book.reviews.reduce((acc, r) => acc + r.rating, 0);
        return sum / book.reviews.length;
    },

    getStarsHTML(rating) {
        let starsHTML = '';
        const rounded = Math.round(rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= rounded) {
                starsHTML += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHTML += '<i class="fa-regular fa-star"></i>';
            }
        }
        return starsHTML;
    },

    setReviewRating(rating) {
        this.tempReviewStars = rating;
        const selector = document.getElementById('star-selector');
        if (!selector) return;
        
        const stars = selector.querySelectorAll('.star-sel');
        stars.forEach(s => {
            const val = parseInt(s.getAttribute('data-value'));
            if (val <= rating) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    },

    handleNewReviewSubmit(e, bookId) {
        e.preventDefault();
        const book = this.books[bookId];
        if (!book) return;

        const nameEl = document.getElementById('review-name');
        const textEl = document.getElementById('review-text');

        if (!nameEl.value || !textEl.value) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newReview = {
            name: nameEl.value.trim(),
            rating: this.tempReviewStars,
            date: new Date().toLocaleDateString('es-AR'),
            comment: textEl.value.trim()
        };

        // Add review
        book.reviews.unshift(newReview);
        
        // Save to localStorage
        this.saveUserReviews();
        
        // Rerender book details to show the new review
        this.renderBookDetail(bookId);
    },

    saveUserReviews() {
        const dataToStore = {};
        Object.keys(this.books).forEach(bookId => {
            // Extract only user-added reviews (or store all if modified)
            dataToStore[bookId] = this.books[bookId].reviews;
        });
        localStorage.setItem('modesta_reviews', JSON.stringify(dataToStore));
    },

    loadUserReviews() {
        const stored = localStorage.getItem('modesta_reviews');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                Object.keys(parsed).forEach(bookId => {
                    if (this.books[bookId]) {
                        // Merge or replace reviews list
                        // To preserve the original default review, let's filter out duplicates or replace.
                        // Since we load from storage, we can just assign, ensuring original is kept.
                        this.books[bookId].reviews = parsed[bookId];
                    }
                });
            } catch (e) {
                console.error("Failed to load user reviews:", e);
            }
        }
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Expose application globally for onclick handlers
window.app = app;
