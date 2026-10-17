document.addEventListener('DOMContentLoaded', () => {
    // SLIDER PRINCIPAL
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

    // BOTÓN "VER CATÁLOGO COMPLETO"
    const btnVerCatalogo = document.getElementById('btnVerCatalogo');
    if (btnVerCatalogo) {
        btnVerCatalogo.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = btnVerCatalogo.dataset.galeriaUrl;
        });
    }

    // CONTADOR ANIMADO DE ESTADÍSTICAS
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
});