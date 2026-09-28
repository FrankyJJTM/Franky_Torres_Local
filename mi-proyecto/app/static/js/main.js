document.addEventListener('DOMContentLoaded', () => {

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
        if (slides.length === 0) {
            return;
        }

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                'opacity-100',
                slideIndex === index
            );

            slide.classList.toggle(
                'opacity-0',
                slideIndex !== index
            );

            slide.classList.toggle(
                'active',
                slideIndex === index
            );
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                'bg-amber-400',
                dotIndex === index
            );

            dot.classList.toggle(
                'bg-white/50',
                dotIndex !== index
            );
        });

        currentSlide = index;
    }

    function nextSlide() {
        if (slides.length === 0) {
            return;
        }

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);
    }

    function prevSlide() {
        if (slides.length === 0) {
            return;
        }

        currentSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        showSlide(currentSlide);
    }

    function startAutoSlide() {
        if (slides.length === 0) {
            return;
        }

        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }

        autoSlideInterval =
            setInterval(nextSlide, 5000);
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

    const btnMenu =
        document.getElementById('btnMenu');

    const menuMovil =
        document.getElementById('menuMovil');

    if (btnMenu && menuMovil) {

        btnMenu.addEventListener('click', (event) => {
            event.preventDefault();

            menuMovil.classList.toggle('hidden');

            const icon =
                btnMenu.querySelector('i');

            if (!icon) {
                return;
            }

            if (menuMovil.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });

        const menuLinks =
            menuMovil.querySelectorAll('a');

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {

                menuMovil.classList.add('hidden');

                const icon =
                    btnMenu.querySelector('i');

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

    const galleries =
        document.querySelectorAll('.gallery-container');

    galleries.forEach((gallery) => {

        const mainImage =
            gallery.querySelector('.gallery-main-image');

        const thumbnails =
            gallery.querySelectorAll('.gallery-thumbnail');

        const prevButton =
            gallery.querySelector('.gallery-prev');

        const nextButton =
            gallery.querySelector('.gallery-next');

        const dotsContainer =
            gallery.querySelector('.gallery-dots');

        if (
            !mainImage ||
            thumbnails.length === 0 ||
            !prevButton ||
            !nextButton ||
            !dotsContainer
        ) {
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

            if (imageList.length === 0) {
                return;
            }

            if (index >= imageList.length) {
                index = 0;
            }

            if (index < 0) {
                index = imageList.length - 1;
            }

            currentImage = index;

            mainImage.src =
                imageList[currentImage];

            thumbnails.forEach(
                (thumbnail, thumbnailIndex) => {

                    const activo =
                        thumbnailIndex === currentImage - 1;

                    thumbnail.classList.toggle(
                        'border-amber-400',
                        activo
                    );

                    thumbnail.classList.toggle(
                        'border-transparent',
                        !activo
                    );
                }
            );
        }

        thumbnails.forEach(
            (thumbnail, index) => {

                thumbnail.addEventListener(
                    'click',
                    () => {
                        showGalleryImage(index + 1);
                    }
                );
            }
        );

        prevButton.addEventListener(
            'click',
            () => {
                showGalleryImage(currentImage - 1);
            }
        );

        nextButton.addEventListener(
            'click',
            () => {
                showGalleryImage(currentImage + 1);
            }
        );
    });


    // =========================================================
    // FORMULARIO DE CONTACTO
    // =========================================================

    const contactForm =
        document.getElementById('contactForm');

    if (contactForm) {

        const nombreInput =
            contactForm.querySelector('[name="nombre"]');

        const apellidoInput =
            contactForm.querySelector('[name="apellido"]');

        const telefonoInput =
            contactForm.querySelector('[name="telefono"]');

        const correoInput =
            contactForm.querySelector('[name="correo"]');

        const mensajeInput =
            contactForm.querySelector('[name="mensaje"]');


        // =====================================================
        // MOSTRAR ERROR
        // =====================================================

        function mostrarError(input, mensaje) {

            if (!input) {
                return;
            }

            const contenedor =
                input.parentElement;

            if (!contenedor) {
                return;
            }

            const errorElement =
                contenedor.querySelector('.error-message');

            if (errorElement) {
                errorElement.textContent = mensaje;

                errorElement.classList.toggle(
                    'hidden',
                    mensaje === ''
                );
            }

            input.classList.toggle(
                'ring-2',
                mensaje !== ''
            );

            input.classList.toggle(
                'ring-red-500',
                mensaje !== ''
            );
        }


        // =====================================================
        // VALIDACIÓN DE NOMBRE Y APELLIDO
        // =====================================================

        function validarTexto(input, nombreCampo) {

            if (!input) {
                return false;
            }

            const valor =
                input.value.trim();

            const soloLetras =
                /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]+$/;

            if (valor === '') {
                mostrarError(
                    input,
                    `Ingresa tu ${nombreCampo}`
                );

                return false;
            }

            if (!soloLetras.test(valor)) {
                mostrarError(
                    input,
                    `El ${nombreCampo} solo debe contener letras`
                );

                return false;
            }

            mostrarError(input, '');

            return true;
        }


        // =====================================================
        // VALIDACIÓN DEL TELÉFONO
        // =====================================================

        function validarTelefono() {

            if (!telefonoInput) {
                return false;
            }

            const telefono =
                telefonoInput.value.trim();

            if (!/^9[0-9]{8}$/.test(telefono)) {

                mostrarError(
                    telefonoInput,
                    'El teléfono debe tener 9 dígitos y comenzar con 9'
                );

                return false;
            }

            mostrarError(telefonoInput, '');

            return true;
        }


        // =====================================================
        // VALIDACIÓN DEL CORREO
        // =====================================================

        function validarCorreo() {

            if (!correoInput) {
                return false;
            }

            const correo = correoInput.value.trim();

            // Exige que la parte local (antes del @) contenga al menos una letra (a-z)
            const emailRegex = /^(?=.*[a-zA-Z])[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(correo)) {

                mostrarError(
                    correoInput,
                    'El correo debe contener al menos una letra en el usuario'
                );

                return false;
            }

            mostrarError(correoInput, '');

            return true;
        }


        // =====================================================
        // VALIDACIÓN DEL MENSAJE
        // =====================================================

        function validarMensaje() {

            if (!mensajeInput) {
                return false;
            }

            if (mensajeInput.value.trim() === '') {

                mostrarError(
                    mensajeInput,
                    'Ingresa un mensaje'
                );

                return false;
            }

            mostrarError(mensajeInput, '');

            return true;
        }


        // =====================================================
        // SOLO LETRAS EN NOMBRE Y APELLIDO
        // =====================================================

        [nombreInput, apellidoInput].forEach((input) => {

            if (!input) {
                return;
            }

            input.addEventListener('input', () => {

                input.value =
                    input.value.replace(
                        /[^A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]/g,
                        ''
                    );
            });
        });


        // =====================================================
        // SOLO NÚMEROS EN TELÉFONO
        // =====================================================

        if (telefonoInput) {

            telefonoInput.addEventListener(
                'input',
                () => {

                    telefonoInput.value =
                        telefonoInput.value
                            .replace(/[^0-9]/g, '')
                            .substring(0, 9);
                }
            );
        }


        // =====================================================
        // ENVÍO DEL FORMULARIO
        // =====================================================

        contactForm.addEventListener(
            'submit',
            (event) => {

                const nombreValido =
                    validarTexto(
                        nombreInput,
                        'nombre'
                    );

                const apellidoValido =
                    validarTexto(
                        apellidoInput,
                        'apellido'
                    );

                const telefonoValido =
                    validarTelefono();

                const correoValido =
                    validarCorreo();

                const mensajeValido =
                    validarMensaje();

                const formularioValido =
                    nombreValido &&
                    apellidoValido &&
                    telefonoValido &&
                    correoValido &&
                    mensajeValido;

                if (!formularioValido) {
                    event.preventDefault();
                    return;
                }

                /*
                 * Si todos los campos son válidos,
                 * permitimos que el formulario se envíe
                 * normalmente mediante POST a Flask.
                 */
            }
        );


        // =====================================================
        // MODAL DE ÉXITO
        // =====================================================

        const successModal =
            document.getElementById('successModal');

        const closeModalBtn =
            document.getElementById('closeSuccessModal');

        if (closeModalBtn && successModal) {

            closeModalBtn.addEventListener(
                'click',
                () => {
                    successModal.classList.add('hidden');
                }
            );

            successModal.addEventListener(
                'click',
                (event) => {

                    if (event.target === successModal) {
                        successModal.classList.add('hidden');
                    }
                }
            );
        }
    }
     // =========================================================
    // NAVEGACIÓN DEL LOGO AL INICIO
    // =========================================================

    const logoAgrofrutos =
        document.getElementById('logoAgrofrutos');

    if (logoAgrofrutos) {

        const homeUrl =
            logoAgrofrutos.dataset.homeUrl;

        logoAgrofrutos.addEventListener(
            'click',
            () => {

                window.location.href = homeUrl;

            }
        );

        logoAgrofrutos.addEventListener(
            'keydown',
            (event) => {

                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {

                    event.preventDefault();

                    window.location.href = homeUrl;

                }

            }
        );

    }

    // 1. BOTÓN "VOLVER ARRIBA" (Scroll to Top)
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
// CONTADOR ANIMADO DE ESTADÍSTICAS (sección Nosotros)
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

            elemento.textContent =
                valorActual.toLocaleString('es-PE') + suffix;

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
// CONTADOR DE CARACTERES (MENSAJE DE CONTACTO)
// =========================================================

const mensajeInputContador =
    document.getElementById('mensajeInput');

const contadorMensaje =
    document.getElementById('contadorMensaje');

if (mensajeInputContador && contadorMensaje) {
    const limiteMaximo = 300;

    const actualizarContador = () => {
        const caracteresEscritos =
            mensajeInputContador.value.length;

        contadorMensaje.textContent =
            `${caracteresEscritos}/${limiteMaximo}`;

        contadorMensaje.classList.toggle(
            'limite-cerca',
            caracteresEscritos >= limiteMaximo - 20
        );
    };

    mensajeInputContador.addEventListener(
        'input',
        actualizarContador
    );

    actualizarContador();
}