document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // CONTADOR ANIMADO DE ESTADÍSTICAS
    // =========================================================
    const contadores = document.querySelectorAll('.contador');

    if (contadores.length > 0) {
        const animarContador = (elemento) => {
            const target = parseInt(elemento.dataset.target, 10);
            const suffix = elemento.dataset.suffix || '';
            const duracion = 1500; // Tiempo en ms
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
        }, { threshold: 0.3 });

        contadores.forEach((contador) => observer.observe(contador));
    }
});