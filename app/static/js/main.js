// =========================================================
// TRADUCTOR DE IDIOMA COMPLETO (Google Translate)
// * DEBE IR FUERA DE DOMCONTENTLOADED PARA SER GLOBAL *
// =========================================================

window.setGoogleTranslateCookie = function(lang) {
    const domain = window.location.hostname;
    
    // Limpieza previa de cookies viejas en root y dominios específicos
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;

    if (lang === 'en') {
        document.cookie = `googtrans=/es/en; path=/; domain=${domain}`;
        document.cookie = `googtrans=/es/en; path=/`;
    } else {
        document.cookie = `googtrans=/es/es; path=/; domain=${domain}`;
        document.cookie = `googtrans=/es/es; path=/`;
    }
};

window.updateButtonUI = function(lang) {
    const labelText = lang === 'en' ? 'ES' : 'EN';
    const btnDesk = document.getElementById('txtLangBtn');
    const btnMob = document.getElementById('txtLangBtnMobile');
    
    if (btnDesk) btnDesk.textContent = labelText;
    if (btnMob) btnMob.textContent = labelText;
};

window.toggleLanguage = function() {
    const currentLang = localStorage.getItem('site_lang') || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';

    localStorage.setItem('site_lang', newLang);
    window.setGoogleTranslateCookie(newLang);
    window.location.reload();
};

// Inicializador que Google Translate busca globalmente
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'es,en',
        autoDisplay: false
    }, 'google_translate_element');
};

document.addEventListener('DOMContentLoaded', () => {

    // Inicializar el texto del botón según el idioma actual guardado
    const currentLang = localStorage.getItem('site_lang') || 'es';
    window.updateButtonUI(currentLang);

    // =========================================================
    // SLIDER PRINCIPAL
    // =========================================================

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
        if (slides.length === 0) return;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('opacity-100', slideIndex === index);
            slide.classList.toggle('opacity-0', slideIndex !== index);
            slide.classList.toggle('active', slideIndex === index);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('bg-amber-400', dotIndex === index);
            dot.classList.toggle('bg-white/50', dotIndex !== index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        if (slides.length === 0) return;
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoSlide();
            });
        });
    }

    // =========================================================
    // MENÚ HAMBURGUESA
    // =========================================================

    const btnMenu = document.getElementById('btnMenu');
    const menuMovil = document.getElementById('menuMovil');

    if (btnMenu && menuMovil) {
        btnMenu.addEventListener('click', (event) => {
            event.preventDefault();
            menuMovil.classList.toggle('hidden');

            const icon = btnMenu.querySelector('i');
            if (!icon) return;

            if (menuMovil.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });

        const menuLinks = menuMovil.querySelectorAll('a');
        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                menuMovil.classList.add('hidden');
                const icon = btnMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // =========================================================
    // GALERÍAS
    // =========================================================

    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach((gallery) => {
        const mainImage = gallery.querySelector('.gallery-main-image');
        const thumbnails = gallery.querySelectorAll('.gallery-thumbnail');
        const prevButton = gallery.querySelector('.gallery-prev');
        const nextButton = gallery.querySelector('.gallery-next');
        const dotsContainer = gallery.querySelector('.gallery-dots');

        if (!mainImage || thumbnails.length === 0 || !prevButton || !nextButton || !dotsContainer) {
            return;
        }

        const imageList = [
            mainImage.src,
            ...Array.from(thumbnails)
                .map((thumbnail) => thumbnail.dataset.image)
                .filter(Boolean)
        ];

        let currentImage = 0;

        function showGalleryImage(index) {
            if (imageList.length === 0) return;
            if (index >= imageList.length) index = 0;
            if (index < 0) index = imageList.length - 1;

            currentImage = index;
            mainImage.src = imageList[currentImage];

            thumbnails.forEach((thumbnail, thumbnailIndex) => {
                const activo = thumbnailIndex === currentImage - 1;
                thumbnail.classList.toggle('border-amber-400', activo);
                thumbnail.classList.toggle('border-transparent', !activo);
            });
        }

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                showGalleryImage(index + 1);
            });
        });

        prevButton.addEventListener('click', () => {
            showGalleryImage(currentImage - 1);
        });

        nextButton.addEventListener('click', () => {
            showGalleryImage(currentImage + 1);
        });
    });

    // =========================================================
    // FORMULARIO DE CONTACTO
    // =========================================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nombreInput = contactForm.querySelector('[name="nombre"]');
        const apellidoInput = contactForm.querySelector('[name="apellido"]');
        const telefonoInput = contactForm.querySelector('[name="telefono"]');
        const correoInput = contactForm.querySelector('[name="correo"]');
        const mensajeInput = contactForm.querySelector('[name="mensaje"]');

        function mostrarError(input, mensaje) {
            if (!input) return;
            const contenedor = input.parentElement;
            if (!contenedor) return;

            const errorElement = contenedor.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = mensaje;
                errorElement.classList.toggle('hidden', mensaje === '');
            }

            input.classList.toggle('ring-2', mensaje !== '');
            input.classList.toggle('ring-red-500', mensaje !== '');
        }

        function validarTexto(input, nombreCampo) {
            if (!input) return false;
            const valor = input.value.trim();
            const soloLetras = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]+$/;

            if (valor === '') {
                mostrarError(input, `Ingresa tu ${nombreCampo}`);
                return false;
            }
            if (!soloLetras.test(valor)) {
                mostrarError(input, `El ${nombreCampo} solo debe contener letras`);
                return false;
            }
            mostrarError(input, '');
            return true;
        }

        function validarTelefono() {
            if (!telefonoInput) return false;
            const telefono = telefonoInput.value.trim();

            if (!/^9[0-9]{8}$/.test(telefono)) {
                mostrarError(telefonoInput, 'El teléfono debe tener 9 dígitos y comenzar con 9');
                return false;
            }
            mostrarError(telefonoInput, '');
            return true;
        }

        function validarCorreo() {
            if (!correoInput) return false;
            const correo = correoInput.value.trim();
            const emailRegex = /^(?=.*[a-zA-Z])[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(correo)) {
                mostrarError(correoInput, 'El correo debe contener al menos una letra en el usuario');
                return false;
            }
            mostrarError(correoInput, '');
            return true;
        }

        function validarMensaje() {
            if (!mensajeInput) return false;
            if (mensajeInput.value.trim() === '') {
                mostrarError(mensajeInput, 'Ingresa un mensaje');
                return false;
            }
            mostrarError(mensajeInput, '');
            return true;
        }

        [nombreInput, apellidoInput].forEach((input) => {
            if (!input) return;
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]/g, '');
            });
        });

        if (telefonoInput) {
            telefonoInput.addEventListener('input', () => {
                telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, '').substring(0, 9);
            });
        }

        contactForm.addEventListener('submit', (event) => {
            const nombreValido = validarTexto(nombreInput, 'nombre');
            const apellidoValido = validarTexto(apellidoInput, 'apellido');
            const telefonoValido = validarTelefono();
            const correoValido = validarCorreo();
            const mensajeValido = validarMensaje();

            const formularioValido = nombreValido && apellidoValido && telefonoValido && correoValido && mensajeValido;

            if (!formularioValido) {
                event.preventDefault();
            }
        });

        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeSuccessModal');

        if (closeModalBtn && successModal) {
            closeModalBtn.addEventListener('click', () => {
                successModal.classList.add('hidden');
            });

            successModal.addEventListener('click', (event) => {
                if (event.target === successModal) {
                    successModal.classList.add('hidden');
                }
            });
        }
    }

    // =========================================================
    // NAVEGACIÓN DEL LOGO AL INICIO
    // =========================================================

    const logoAgrofrutos = document.getElementById('logoAgrofrutos');

    if (logoAgrofrutos) {
        const homeUrl = logoAgrofrutos.dataset.homeUrl;

        logoAgrofrutos.addEventListener('click', () => {
            window.location.href = homeUrl;
        });

        logoAgrofrutos.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = homeUrl;
            }
        });
    }

    // =========================================================
    // BOTÓN "VER CATÁLOGO COMPLETO" -> GALERÍA
    // =========================================================

    const btnVerCatalogo = document.getElementById('btnVerCatalogo');

    if (btnVerCatalogo) {
        btnVerCatalogo.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = btnVerCatalogo.dataset.galeriaUrl;
        });
    }

    // BOTÓN "VOLVER ARRIBA"
    const btnScrollTop = document.getElementById('btnScrollTop');
    if (btnScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnScrollTop.classList.remove('hidden');
            } else {
                btnScrollTop.classList.add('hidden');
            }
        });
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================================
    // CONTADOR ANIMADO DE ESTADÍSTICAS
    // =========================================================

    const contadores = document.querySelectorAll('.contador');

    if (contadores.length > 0) {
        const animarContador = (elemento) => {
            const target = parseInt(elemento.dataset.target, 10);
            const suffix = elemento.dataset.suffix || '';
            const duracion = 1500;
            const inicio = performance.now();

            const paso = (ahora) => {
                const progreso = Math.min((ahora - inicio) / duracion, 1);
                const valorActual = Math.floor(progreso * target);

                elemento.textContent = valorActual.toLocaleString('es-PE') + suffix;

                if (progreso < 1) {
                    requestAnimationFrame(paso);
                }
            };

            requestAnimationFrame(paso);
        };

        const observer = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    animarContador(entrada.target);
                    observer.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.5 });

        contadores.forEach((contador) => observer.observe(contador));
    }

    // =========================================================
    // CONTADOR DE CARACTERES
    // =========================================================

    const mensajeInputContador = document.getElementById('mensajeInput');
    const contadorMensaje = document.getElementById('contadorMensaje');

    if (mensajeInputContador && contadorMensaje) {
        const limiteMaximo = 300;

        const actualizarContador = () => {
            const caracteresEscritos = mensajeInputContador.value.length;
            contadorMensaje.textContent = `${caracteresEscritos}/${limiteMaximo}`;
            contadorMensaje.classList.toggle('limite-cerca', caracteresEscritos >= limiteMaximo - 20);
        };

        mensajeInputContador.addEventListener('input', actualizarContador);
        actualizarContador();
    }

    // =========================================================
    // FILTRO DE PRODUCTOS POR CATEGORÍA
    // =========================================================

    const categoryButtons = document.querySelectorAll('.product-category-button');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryButtons.length > 0 && productCards.length > 0) {
        categoryButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedCategory = button.dataset.category;

                categoryButtons.forEach((categoryButton) => {
                    categoryButton.classList.remove('bg-emerald-900', 'text-white');
                    categoryButton.classList.add('bg-white', 'text-emerald-900');
                });

                button.classList.remove('bg-white', 'text-emerald-900');
                button.classList.add('bg-emerald-900', 'text-white');

                productCards.forEach((productCard) => {
                    const productCategory = productCard.dataset.productCategory;

                    if (productCategory === selectedCategory) {
                        productCard.classList.remove('hidden');
                    } else {
                        productCard.classList.add('hidden');
                    }
                });
            });
        });
    }

    // =========================================================
    // CHATBOT AGROFRUTOS
    // =========================================================

    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotButton && chatbotWindow && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
        const mensajeInicial = '¡Hola! 👋 Soy el asistente virtual de Agrofrutos. ¿En qué podemos ayudarte?';

        function agregarMensaje(mensaje, tipo) {
            const mensajeElement = document.createElement('div');
            mensajeElement.classList.add('chatbot-message', tipo === 'usuario' ? 'chatbot-message-user' : 'chatbot-message-bot');
            mensajeElement.textContent = mensaje;
            chatbotMessages.appendChild(mensajeElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function limpiarConversacion() {
            chatbotMessages.innerHTML = '';
            agregarMensaje(mensajeInicial, 'bot');
            chatbotInput.value = '';
        }

        function obtenerRespuesta(mensaje) {
            const mensajeNormalizado = mensaje.toLowerCase().trim();

            if (mensajeNormalizado.includes('hola') || mensajeNormalizado.includes('buenas') || mensajeNormalizado.includes('saludos') || mensajeNormalizado.includes('buenos dias') || mensajeNormalizado.includes('buenos días') || mensajeNormalizado.includes('buenas tardes') || mensajeNormalizado.includes('buenas noches')) {
                return '¡Hola! 👋 Bienvenido a Agrofrutos. ¿En qué podemos ayudarte?';
            }

            if (mensajeNormalizado.includes('producto') || mensajeNormalizado.includes('productos') || mensajeNormalizado.includes('vende') || mensajeNormalizado.includes('venden') || mensajeNormalizado.includes('que venden') || mensajeNormalizado.includes('qué venden')) {
                return 'En Agrofrutos contamos con productos como palta, mango y maracuyá. Puedes visitar la sección Productos para conocer más.';
            }

            if (mensajeNormalizado.includes('palta') || mensajeNormalizado.includes('aguacate')) {
                return 'Agrofrutos ofrece palta como uno de sus principales productos. Puedes visitar la sección Productos para conocer sus características.';
            }

            if (mensajeNormalizado.includes('mango')) {
                return 'Agrofrutos ofrece mango como uno de sus principales productos. Puedes visitar la sección Productos para conocer más.';
            }

            if (mensajeNormalizado.includes('maracuya') || mensajeNormalizado.includes('maracuyá')) {
                return 'El maracuyá forma parte de nuestra variedad de productos. Puedes visitar la sección Productos para conocer más.';
            }

            if (mensajeNormalizado.includes('ubicacion') || mensajeNormalizado.includes('ubicación') || mensajeNormalizado.includes('direccion') || mensajeNormalizado.includes('dirección') || mensajeNormalizado.includes('donde') || mensajeNormalizado.includes('dónde') || mensajeNormalizado.includes('ubicados') || mensajeNormalizado.includes('encuentran')) {
                return '📍 Nos encontramos en Calle El Maestro #610, Motupe, Lambayeque - Perú.';
            }

            if (mensajeNormalizado.includes('horario') || mensajeNormalizado.includes('horarios') || mensajeNormalizado.includes('hora') || mensajeNormalizado.includes('horas') || mensajeNormalizado.includes('atienden') || mensajeNormalizado.includes('atencion') || mensajeNormalizado.includes('atención') || mensajeNormalizado.includes('abierto') || mensajeNormalizado.includes('abren') || mensajeNormalizado.includes('cierran')) {
                return '🕐 Nuestro horario de atención es de lunes a viernes de 8:00 a.m. a 5:00 p.m. y los sábados de 8:00 a.m. a 1:00 p.m. Los domingos no contamos con horario de atención programado.';
            }

            if (mensajeNormalizado.includes('lunes') || mensajeNormalizado.includes('martes') || mensajeNormalizado.includes('miercoles') || mensajeNormalizado.includes('miércoles') || mensajeNormalizado.includes('jueves') || mensajeNormalizado.includes('viernes')) {
                return '🕐 De lunes a viernes atendemos de 8:00 a.m. a 5:00 p.m.';
            }

            if (mensajeNormalizado.includes('sabado') || mensajeNormalizado.includes('sábado')) {
                return '🕐 Los sábados atendemos de 8:00 a.m. a 1:00 p.m.';
            }

            if (mensajeNormalizado.includes('domingo')) {
                return '🕐 Los domingos no contamos con horario de atención programado.';
            }

            if (mensajeNormalizado.includes('celular') || mensajeNormalizado.includes('telefono') || mensajeNormalizado.includes('teléfono') || mensajeNormalizado.includes('numero') || mensajeNormalizado.includes('número') || mensajeNormalizado.includes('llamar') || mensajeNormalizado.includes('cel')) {
                return '📱 Puedes comunicarte con Agrofrutos al +51 981 540 331.';
            }

            if (mensajeNormalizado.includes('correo') || mensajeNormalizado.includes('email') || mensajeNormalizado.includes('e-mail')) {
                return '📧 Nuestro correo electrónico es info@agrofruto.pe.';
            }

            if (mensajeNormalizado.includes('contacto') || mensajeNormalizado.includes('contactar') || mensajeNormalizado.includes('comunicarme') || mensajeNormalizado.includes('comunicarse')) {
                return 'Puedes comunicarte con Agrofrutos mediante nuestro formulario de Contacto, al celular +51 981 540 331 o mediante el correo info@agrofruto.pe.';
            }

            if (mensajeNormalizado.includes('nosotros') || mensajeNormalizado.includes('empresa') || mensajeNormalizado.includes('quienes son') || mensajeNormalizado.includes('quiénes son') || mensajeNormalizado.includes('que es agrofrutos') || mensajeNormalizado.includes('qué es agrofrutos')) {
                return 'Agrofrutos está orientado a la producción y comercialización de frutas de calidad. Puedes visitar la sección Nosotros para conocer más sobre nuestra empresa.';
            }

            if (mensajeNormalizado.includes('galeria') || mensajeNormalizado.includes('galería') || mensajeNormalizado.includes('fotos') || mensajeNormalizado.includes('imagenes') || mensajeNormalizado.includes('imágenes')) {
                return '📸 Puedes visitar nuestra sección Galería para conocer imágenes relacionadas con nuestros productos y actividades.';
            }

            if (mensajeNormalizado.includes('gracias') || mensajeNormalizado.includes('muchas gracias')) {
                return '¡Con mucho gusto! 😊 Estamos para ayudarte con información sobre Agrofrutos.';
            }

            if (mensajeNormalizado.includes('adios') || mensajeNormalizado.includes('adiós') || mensajeNormalizado.includes('chau') || mensajeNormalizado.includes('hasta luego')) {
                return '¡Hasta luego! 👋 Gracias por visitar Agrofrutos.';
            }

            return 'Lo siento, solo puedo ayudarte con información relacionada con Agrofrutos, como nuestros productos, ubicación, horario de atención, celular, correo, galería y contacto. 😊';
        }

        function enviarMensaje() {
            const mensaje = chatbotInput.value.trim();
            if (mensaje === '') return;

            agregarMensaje(mensaje, 'usuario');
            chatbotInput.value = '';

            const respuesta = obtenerRespuesta(mensaje);

            setTimeout(() => {
                agregarMensaje(respuesta, 'bot');
            }, 500);
        }

        chatbotButton.addEventListener('click', () => {
            chatbotWindow.classList.remove('hidden');
            chatbotInput.focus();
        });

        chatbotClose.addEventListener('click', () => {
            limpiarConversacion();
            chatbotWindow.classList.add('hidden');
        });

        chatbotSend.addEventListener('click', () => {
            enviarMensaje();
        });

        chatbotInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                enviarMensaje();
            }
        });
    }
});

// =========================================================
// SOMBRA EN EL NAVBAR AL HACER SCROLL
// =========================================================

const navbarHeader = document.getElementById('navbarHeader');

if (navbarHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbarHeader.style.boxShadow = '0 8px 20px rgba(6, 78, 59, 0.55)';
        } else {
            navbarHeader.style.boxShadow = 'none';
        }
    });
}