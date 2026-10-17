document.addEventListener('DOMContentLoaded', () => {
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
});