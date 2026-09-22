// Esperamos a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // SLIDER PRINCIPAL (hero)
    // ============================

    // Seleccionamos todas las slides y los puntos (dots) del slider principal
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0; // índice de la slide que se está mostrando
    let autoSlideInterval = null; // referencia al setInterval del autoplay

    const totalSlides = slides.length;

    // Solo inicializamos el slider si existen slides en la página
    if (totalSlides > 0) {

        // Muestra la slide correspondiente al índice recibido
        // y oculta el resto usando las clases de opacidad de Tailwind
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0');
                    slide.classList.add('opacity-100', 'active');
                } else {
                    slide.classList.remove('opacity-100', 'active');
                    slide.classList.add('opacity-0');
                }
            });

            // Actualizamos el estilo de los puntos (dots) según la slide activa
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-amber-400');
                } else {
                    dot.classList.remove('bg-amber-400');
                    dot.classList.add('bg-white/50');
                }
            });

            currentSlide = index;
        }

        // Avanza a la siguiente slide (vuelve a la primera al llegar al final)
        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }

        // Retrocede a la slide anterior (vuelve a la última si está en la primera)
        function prevSlide() {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prev);
        }

        // Inicia (o reinicia) el autoplay del slider cada 5 segundos
        function startAutoSlide() {
            stopAutoSlide(); // evitamos que se acumulen varios intervalos
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        // Detiene el autoplay del slider
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // Botón "siguiente": avanza manualmente y reinicia el autoplay
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        // Botón "anterior": retrocede manualmente y reinicia el autoplay
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        // Cada punto (dot) permite saltar directamente a su slide
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoSlide();
            });
        });

        // Mostramos la primera slide y arrancamos el autoplay al cargar la página
        showSlide(0);
        startAutoSlide();
    }


    // ============================
    // MENÚ HAMBURGUESA (móvil)
    // ============================

    const btnMenu = document.getElementById('btnMenu');
    const menuMovil = document.getElementById('menuMovil');

    if (btnMenu && menuMovil) {

        // Al hacer clic en el botón hamburguesa, mostramos/ocultamos el menú móvil
        btnMenu.addEventListener('click', (event) => {
            event.preventDefault();
            menuMovil.classList.toggle('hidden');

            // Cambiamos el ícono entre "hamburguesa" y "X" según el estado del menú
            const icon = btnMenu.querySelector('i');

            if (icon) {
                if (menuMovil.classList.contains('hidden')) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            }
        });

        // Si el usuario hace clic en algún link del menú móvil, lo cerramos automáticamente
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

        // Si la pantalla se agranda (por ejemplo, se pasa a vista de escritorio),
        // cerramos el menú móvil automáticamente para evitar que quede abierto
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                menuMovil.classList.add('hidden');

                const icon = btnMenu.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }


    // ============================
    // GALERÍAS DE PRODUCTOS
    // (Palta, Mango, Maracuyá, etc.)
    // ============================

    // Puede haber varias galerías en la misma página, así que recorremos todas
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach((gallery) => {

        // Elementos internos de esta galería en particular
        const mainImage = gallery.querySelector('.gallery-main-image'); // imagen grande
        const thumbnails = gallery.querySelectorAll('.gallery-thumbnail'); // miniaturas
        const prevButton = gallery.querySelector('.gallery-prev'); // flecha izquierda
        const nextButton = gallery.querySelector('.gallery-next'); // flecha derecha
        const dotsContainer = gallery.querySelector('.gallery-dots'); // contenedor de puntos

        // Si falta algún elemento esencial, no inicializamos esta galería
        // (evita errores si el HTML de alguna sección está incompleto)
        if (!mainImage || thumbnails.length === 0 || !prevButton || !nextButton || !dotsContainer) {
            return;
        }

        // -----------------------------------------------------------
        // Construimos la lista COMPLETA de imágenes por las que rota
        // el visor: la imagen principal original (la que ya viene fija
        // en el HTML, ej. "palta-galeria.jpg") + todas las miniaturas.
        // Así, al dar "siguiente" varias veces, el ciclo SIEMPRE vuelve
        // a mostrar la imagen principal original en vez de perderse.
        // -----------------------------------------------------------
        const heroImageUrl = mainImage.getAttribute('src');
        const imageList = [heroImageUrl, ...Array.from(thumbnails).map((t) => t.dataset.image)];
        const totalImages = imageList.length;

        let currentImage = 0; // 0 = imagen principal original, 1..N = miniaturas

        // Generamos dinámicamente un punto (dot) por cada miniatura
        thumbnails.forEach((thumbnail, index) => {
            const dot = document.createElement('button');

            dot.type = 'button';
            dot.className = 'w-2 h-2 rounded-full bg-slate-300 cursor-pointer transition-all duration-200';
            dot.setAttribute('aria-label', `Mostrar imagen ${index + 1}`);

            // Al hacer clic en un punto, mostramos la imagen de esa miniatura
            // (le sumamos 1 porque el índice 0 está reservado para la imagen principal)
            dot.addEventListener('click', () => {
                showGalleryImage(index + 1);
            });

            dotsContainer.appendChild(dot);
        });

        // Guardamos referencia a los puntos ya creados para poder actualizarlos después
        const galleryDots = dotsContainer.querySelectorAll('button');

        // Guardamos la referencia del setTimeout activo para poder cancelarlo
        // si el usuario hace clic varias veces seguidas muy rápido.
        // Esto evita que la imagen se quede "trabada" en opacidad 0 (invisible).
        let fadeTimeout = null;

        // Cambia la imagen principal por la del índice indicado (dentro de imageList),
        // y actualiza los estilos de miniaturas y puntos para reflejar la selección activa
        function showGalleryImage(index) {
            // Si el índice se pasa del final, volvemos al inicio (imagen principal original)
            if (index >= totalImages) {
                index = 0;
            }

            // Si el índice es negativo, saltamos a la última imagen del ciclo
            if (index < 0) {
                index = totalImages - 1;
            }

            currentImage = index;

            const imageUrl = imageList[currentImage];

            // Si había una transición pendiente de un clic anterior, la cancelamos
            // antes de iniciar una nueva. Esto es lo que evita que la imagen
            // se quede invisible cuando se hace clic varias veces muy rápido.
            if (fadeTimeout) {
                clearTimeout(fadeTimeout);
            }

            // Aplicamos un pequeño efecto de fundido: ocultamos, cambiamos el src, mostramos
            mainImage.classList.add('opacity-0');

            fadeTimeout = setTimeout(() => {
                mainImage.src = imageUrl;
                mainImage.classList.remove('opacity-0');
                fadeTimeout = null;
            }, 150);

            // Resaltamos con borde ámbar la miniatura seleccionada
            // (currentImage - 1 porque el índice 0 es la imagen principal, sin miniatura asociada)
            thumbnails.forEach((thumbnail, thumbnailIndex) => {
                if (thumbnailIndex === currentImage - 1) {
                    thumbnail.classList.remove('border-transparent');
                    thumbnail.classList.add('border-amber-400');
                } else {
                    thumbnail.classList.remove('border-amber-400');
                    thumbnail.classList.add('border-transparent');
                }
            });

            // Resaltamos el punto (dot) correspondiente a la imagen activa
            galleryDots.forEach((dot, dotIndex) => {
                if (dotIndex === currentImage - 1) {
                    dot.classList.remove('bg-slate-300');
                    dot.classList.add('bg-emerald-800', 'scale-125');
                } else {
                    dot.classList.remove('bg-emerald-800', 'scale-125');
                    dot.classList.add('bg-slate-300');
                }
            });
        }

        // Cada miniatura, al hacer clic, muestra su imagen en el visor principal
        // (le sumamos 1 porque el índice 0 está reservado para la imagen principal)
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                showGalleryImage(index + 1);
            });
        });

        // Flecha izquierda: retrocede a la imagen anterior
        prevButton.addEventListener('click', () => {
            showGalleryImage(currentImage - 1);
        });

        // Flecha derecha: avanza a la siguiente imagen
        nextButton.addEventListener('click', () => {
            showGalleryImage(currentImage + 1);
        });

        // Estado inicial: dejamos ninguna miniatura marcada como activa,
        // porque al cargar la página se está mostrando la imagen principal
        // original (índice 0), no una miniatura. NO llamamos a
        // showGalleryImage(0) aquí porque eso reemplazaría innecesariamente
        // el src de la imagen principal que ya viene correcto desde el HTML.
        thumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove('border-amber-400');
            thumbnail.classList.add('border-transparent');
        });
    });
});