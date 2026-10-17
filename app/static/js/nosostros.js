// =========================================================
// CONTADOR ANIMADO DE ESTADÍSTICAS (VERSIÓN CORREGIDA)
// =========================================================
const iniciarContadores = () => {
    const contadores = document.querySelectorAll('.contador');

    if (contadores.length === 0) return;

    const animarContador = (elemento) => {
        // Evitar que se ejecute más de una vez
        if (elemento.classList.contains('animado')) return;
        elemento.classList.add('animado');

        const target = parseInt(elemento.dataset.target, 10);
        if (isNaN(target)) return;

        const suffix = elemento.dataset.suffix || '';
        const duracion = 1500; // Duración en milisegundos (1.5 segundos)
        const inicio = performance.now();

        const paso = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const valorActual = Math.floor(progreso * target);

            elemento.textContent = valorActual.toLocaleString('es-PE') + suffix;

            if (progreso < 1) {
                requestAnimationFrame(paso);
            } else {
                // Asegurar que termine exactamente en el valor final
                elemento.textContent = target.toLocaleString('es-PE') + suffix;
            }
        };

        requestAnimationFrame(paso);
    };

    // Usar IntersectionObserver con un umbral más accesible (0.1)
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });

    contadores.forEach((contador) => observer.observe(contador));
};

// Comprobación para asegurar que corra sin importar el estado de carga del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarContadores);
} else {
    iniciarContadores();
}