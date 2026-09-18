document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // SLIDER
    // =========================================================

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    let autoSlideInterval = null;

    const totalSlides = slides.length;

    // Solo ejecutar el slider si existen slides
    if (totalSlides > 0) {

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

        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prev);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // Botón siguiente
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        // Botón anterior
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        // Puntos
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoSlide();
            });
        });

        // Iniciar slider
        showSlide(0);
        startAutoSlide();
    }


    // =========================================================
    // MENÚ HAMBURGUESA
    // =========================================================

    const btnMenu = document.getElementById('btnMenu');
    const menuMovil = document.getElementById('menuMovil');

    if (btnMenu && menuMovil) {

        // Abrir / cerrar menú
        btnMenu.addEventListener('click', (event) => {
            event.preventDefault();

            menuMovil.classList.toggle('hidden');

            // Cambiar icono hamburguesa <-> X
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


        // Cerrar menú cuando se pulsa un enlace
        const menuLinks = menuMovil.querySelectorAll('a');

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuMovil.classList.add('hidden');

                const icon = btnMenu.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });


        // Cerrar menú al pasar a escritorio
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

});
