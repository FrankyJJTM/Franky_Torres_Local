// =========================================================
// TRADUCTOR DE IDIOMA COMPLETO (Google Translate)
// =========================================================
window.setGoogleTranslateCookie = function(lang) {
    const domain = window.location.hostname;
    const googTransValue = lang === 'en' ? '/es/en' : '/es/es';
    
    document.cookie = `googtrans=${googTransValue}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${googTransValue}; path=/;`;
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
    window.updateButtonUI(newLang);

    // Cambio dinámico en tiempo real sin recargar la página
    const selectElem = document.querySelector('.goog-te-combo');
    if (selectElem) {
        selectElem.value = newLang;
        selectElem.dispatchEvent(new Event('change'));
    } else {
        window.location.reload();
    }
};

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'es,en',
        autoDisplay: false
    }, 'google_translate_element');
};

document.addEventListener('DOMContentLoaded', () => {

    // ANIMACIÓN DEL LOGO
    const pageTransition = document.createElement('div');
    pageTransition.className = 'logo-page-transition';
    pageTransition.setAttribute('aria-hidden', 'true');
    pageTransition.innerHTML = `
        <div class="logo-page-transition__content">
            <span class="logo-page-transition__icon">
                <i class="fa-solid fa-leaf"></i>
            </span>
            <span>AGROFRUTOS</span>
        </div>
    `;
    document.body.appendChild(pageTransition);

    const claveAnimacionInicial = 'agrofrutos_animacion_inicio_v1';
    let mostrarAnimacionInicial = false;

    try {
        mostrarAnimacionInicial = sessionStorage.getItem(claveAnimacionInicial) !== 'vista';
        if (mostrarAnimacionInicial) {
            sessionStorage.setItem(claveAnimacionInicial, 'vista');
        }
    } catch (error) {
        mostrarAnimacionInicial = true;
    }

    if (mostrarAnimacionInicial) {
        pageTransition.classList.add('is-visible');
        window.setTimeout(() => {
            pageTransition.classList.remove('is-visible');
        }, 1100);
    }

    // Inicializar idioma
    const currentLang = localStorage.getItem('site_lang') || 'es';
    window.updateButtonUI(currentLang);

    // MENÚ HAMBURGUESA
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

    // NAVEGACIÓN DEL LOGO AL INICIO
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

    // BOTÓN VOLVER ARRIBA
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

    // SOMBRA EN EL NAVBAR AL HACER SCROLL
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

    // CHATBOT AGROFRUTOS
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotRain = document.getElementById('chatbot-rain');

    if (chatbotButton && chatbotWindow && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
        const mensajeInicial = '¡Hola! 👋 Soy el asistente virtual de Agrofrutos. ¿En qué podemos ayudarte?';

        const EMPRESA = {
            direccion: 'Calle El Maestro #610, Motupe, Lambayeque - Perú',
            correo: 'info@agrofruto.pe',
            celular: '+51 981 540 331'
        };

        const HORARIO = {
            semana: 'de lunes a viernes de 8:00 a.m. a 5:00 p.m.',
            sabado: 'los sábados de 8:00 a.m. a 1:00 p.m.',
            domingo: 'los domingos no contamos con horario de atención programado'
        };

        const REGLAS = [
            { claves: ['palta', 'aguacate'], respuesta: 'Agrofrutos ofrece palta como uno de sus principales productos. Puedes visitar la sección Productos para conocer sus características.' },
            { claves: ['mango'], respuesta: 'Agrofrutos ofrece mango como uno de sus principales productos. Puedes visitar la sección Productos para conocer más.' },
            { claves: ['maracuya'], respuesta: 'El maracuyá forma parte de nuestra variedad de productos. Puedes visitar la sección Productos para conocer más.' },
            { claves: ['producto', 'vende', 'venden'], respuesta: 'En Agrofrutos contamos con productos como palta, mango y maracuyá. Puedes visitar la sección Productos para conocer más.' },
            { claves: ['ubicacion', 'direccion', 'donde', 'ubicados', 'encuentran'], respuesta: `📍 Nos encontramos en ${EMPRESA.direccion}.` },
            { claves: ['sabado'], respuesta: `🕐 Atendemos ${HORARIO.sabado}.` },
            { claves: ['domingo'], respuesta: '🕐 Los domingos no contamos con horario de atención programado.' },
            { claves: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'], respuesta: `🕐 Atendemos ${HORARIO.semana}.` },
            { claves: ['horario', 'hora', 'atienden', 'atencion', 'abierto', 'abren', 'cierran'], respuesta: `🕐 Nuestro horario es ${HORARIO.semana} y ${HORARIO.sabado}. Además, ${HORARIO.domingo}.` },
            { claves: ['celular', 'telefono', 'numero', 'llamar'], respuesta: `📱 Puedes comunicarte con Agrofrutos al ${EMPRESA.celular}.` },
            { claves: ['correo', 'email', 'e-mail'], respuesta: `📧 Nuestro correo electrónico es ${EMPRESA.correo}.` },
            { claves: ['contacto', 'contactar', 'comunicarme', 'comunicarse'], respuesta: `Puedes usar el formulario de Contacto, llamar al ${EMPRESA.celular} o escribir a ${EMPRESA.correo}.` },
            { claves: ['nosotros', 'empresa', 'quienes son', 'que es agrofrutos'], respuesta: 'Agrofrutos está orientado a la producción y comercialización de frutas de calidad. Puedes visitar la sección Nosotros para conocer más.' },
            { claves: ['galeria', 'fotos', 'imagenes'], respuesta: '📸 Puedes visitar nuestra sección Galería para conocer imágenes de nuestros productos y actividades.' },
            { claves: ['gracias'], respuesta: '¡Con mucho gusto! 😊 Estamos para ayudarte con información sobre Agrofrutos.' },
            { claves: ['adios', 'chau', 'hasta luego'], respuesta: '¡Hasta luego! 👋 Gracias por visitar Agrofrutos.' },
            { claves: ['hola', 'buenas', 'saludos', 'buenos dias'], respuesta: '¡Hola! 👋 Bienvenido a Agrofrutos. ¿En qué podemos ayudarte?' }
        ];

        const RESPUESTA_POR_DEFECTO = 'Lo siento, solo puedo ayudarte con información relacionada con Agrofrutos, como nuestros productos, ubicación, horario de atención, celular, correo, galería y contacto. 😊';

        const normalizar = (texto) =>
            texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

        const coincide = (texto, clave) => new RegExp('\\b' + clave).test(texto);

        function obtenerRespuesta(mensaje) {
            const texto = normalizar(mensaje);
            const regla = REGLAS.find((r) => r.claves.some((clave) => coincide(texto, clave)));
            return regla ? regla.respuesta : RESPUESTA_POR_DEFECTO;
        }

        let rainInterval = null;

        const FRUTAS_SVG = {
            palta: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4C42 4 46 16 48 28C51 42 46 60 32 60C18 60 13 42 16 28C18 16 22 4 32 4Z" fill="#3f6212"/>
                <path d="M32 10C39 10 42 19 43.5 29C46 41 42 54 32 54C22 54 18 41 20.5 29C22 19 25 10 32 10Z" fill="#a3e635"/>
                <circle cx="32" cy="41" r="8" fill="#92400e"/>
                <circle cx="29.5" cy="38.5" r="2.2" fill="#b45309"/>
            </svg>`,
            mango: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10C46 8 58 22 54 40C50 56 30 60 18 50C8 41 12 14 30 10Z" fill="#f59e0b"/>
                <path d="M44 14C54 20 58 32 54 42C50 56 38 60 30 58C42 50 48 30 44 14Z" fill="#ef4444" opacity="0.55"/>
                <ellipse cx="26" cy="24" rx="5" ry="8" fill="#fde68a" opacity="0.6" transform="rotate(20 26 24)"/>
                <path d="M30 10C32 2 42 1 47 5C43 12 35 13 30 10Z" fill="#15803d"/>
            </svg>`,
            maracuya: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="27" fill="#7e22ce"/>
                <circle cx="32" cy="32" r="22" fill="#fef3c7"/>
                <circle cx="32" cy="32" r="17" fill="#f59e0b"/>
                <g fill="#1f2937">
                    <ellipse cx="32" cy="22" rx="2.2" ry="3"/>
                    <ellipse cx="42" cy="28" rx="2.2" ry="3" transform="rotate(60 42 28)"/>
                    <ellipse cx="41" cy="39" rx="2.2" ry="3" transform="rotate(120 41 39)"/>
                    <ellipse cx="32" cy="43" rx="2.2" ry="3"/>
                    <ellipse cx="23" cy="39" rx="2.2" ry="3" transform="rotate(-120 23 39)"/>
                    <ellipse cx="22" cy="28" rx="2.2" ry="3" transform="rotate(-60 22 28)"/>
                    <ellipse cx="32" cy="32" rx="2.2" ry="3"/>
                </g>
            </svg>`
        };

        function crearFruta() {
            if (!chatbotRain) return;

            const tipos = Object.keys(FRUTAS_SVG);
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const tamano = 24 + Math.random() * 20;

            const el = document.createElement('span');
            el.className = 'fruta-lluvia';
            el.style.left = Math.random() * 90 + '%';
            el.style.width = el.style.height = tamano + 'px';
            el.style.animationDuration = (5 + Math.random() * 4) + 's';
            el.innerHTML = FRUTAS_SVG[tipo];

            el.addEventListener('animationend', () => el.remove());
            chatbotRain.appendChild(el);
        }

        function iniciarLluvia() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            if (rainInterval) return;
            rainInterval = setInterval(crearFruta, 700);
        }

        function detenerLluvia() {
            clearInterval(rainInterval);
            rainInterval = null;
            if (chatbotRain) chatbotRain.innerHTML = '';
        }

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
            iniciarLluvia();
        });

        chatbotClose.addEventListener('click', () => {
            limpiarConversacion();
            chatbotWindow.classList.add('hidden');
            detenerLluvia();
        });

        chatbotSend.addEventListener('click', enviarMensaje);

        chatbotInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                enviarMensaje();
            }
        });
    }

    // MODO OSCURO
    const btnTheme = document.getElementById('btnTheme');
    const btnThemeMobile = document.getElementById('btnThemeMobile');
    const themeStorageKey = 'agrofrutos-theme';

    function getSavedTheme() {
        try {
            return localStorage.getItem(themeStorageKey);
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(themeStorageKey, theme);
        } catch (error) {
            console.warn('No se pudo guardar la preferencia del tema.');
        }
    }

    function updateThemeButtons(isDarkMode) {
        const themeButtons = [btnTheme, btnThemeMobile];

        themeButtons.forEach((button) => {
            if (!button) return;

            const icon = button.querySelector('i');
            const label = button.querySelector('span');

            if (isDarkMode) {
                button.setAttribute('aria-label', 'Activar modo claro');
                button.setAttribute('aria-pressed', 'true');
                button.setAttribute('title', 'Activar modo claro');

                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }

                if (label) {
                    label.textContent = 'Modo claro';
                }
            } else {
                button.setAttribute('aria-label', 'Activar modo oscuro');
                button.setAttribute('aria-pressed', 'false');
                button.setAttribute('title', 'Activar modo oscuro');

                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }

                if (label) {
                    label.textContent = 'Modo oscuro';
                }
            }
        });
    }

    function applyTheme(theme, shouldSave) {
        const isDarkMode = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDarkMode);
        updateThemeButtons(isDarkMode);

        if (shouldSave) {
            saveTheme(isDarkMode ? 'dark' : 'light');
        }
    }

    function toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const nextTheme = isDarkMode ? 'light' : 'dark';
        applyTheme(nextTheme, true);
    }

    const savedTheme = getSavedTheme();
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light', false);

    if (btnTheme) btnTheme.addEventListener('click', toggleTheme);
    if (btnThemeMobile) btnThemeMobile.addEventListener('click', toggleTheme);
});