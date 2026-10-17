window.setProductBanner = function(index) {
    const slides = document.querySelectorAll('.product-banner-slide');
    const dots = document.querySelectorAll('.banner-dot');

    if (slides.length === 0) return;

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0');
            slide.classList.add('opacity-100');
        } else {
            slide.classList.remove('opacity-100');
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

    if (window.productBannerState) {
        window.productBannerState.currentIndex = index;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // FILTRO DE PRODUCTOS POR CATEGORÍA
    const categoryButtons = document.querySelectorAll('.product-category-button');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryButtons.length > 0 && productCards.length > 0) {
        categoryButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedCategory = button.dataset.category;

                categoryButtons.forEach((categoryButton) => {
                    categoryButton.classList.remove('bg-emerald-600/60', 'text-white');
                    categoryButton.classList.add('bg-emerald-900/40', 'text-slate-200');
                });

                button.classList.remove('bg-emerald-900/40', 'text-slate-200');
                button.classList.add('bg-emerald-600/60', 'text-white');

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

    // BANNER CARRUSEL DE PRODUCTOS
    const productBannerSlides = document.querySelectorAll('.product-banner-slide');
    const productBannerDots = document.querySelectorAll('.banner-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (productBannerSlides.length > 0) {
        window.productBannerState = { currentIndex: 0 };

        function nextProductSlide() {
            const nextIndex = (window.productBannerState.currentIndex + 1) % productBannerSlides.length;
            window.setProductBanner(nextIndex);
        }

        function prevProductSlide() {
            const prevIndex = (window.productBannerState.currentIndex - 1 + productBannerSlides.length) % productBannerSlides.length;
            window.setProductBanner(prevIndex);
        }

        let autoBannerInterval = setInterval(nextProductSlide, 4000);

        function resetAutoBanner() {
            clearInterval(autoBannerInterval);
            autoBannerInterval = setInterval(nextProductSlide, 4000);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextProductSlide();
                resetAutoBanner();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevProductSlide();
                resetAutoBanner();
            });
        }

        productBannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                window.setProductBanner(index);
                resetAutoBanner();
            });
        });
    }

    // EFECTO TILT 3D
    const cards3d = document.querySelectorAll('.product-card');

    cards3d.forEach((card) => {
        card.style.transition = 'transform 0.15s ease-out, background-color 0.3s ease, box-shadow 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.backgroundColor = '#ecfdf5';
            card.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.25)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.backgroundColor = '';
            card.style.boxShadow = '';
        });
    });
});