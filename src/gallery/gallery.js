const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryImages = Array.from(galleryItems);
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');

let currentImageIndex = 0;
let currentCategory = 'all';
let modalImages = [];
let currentCategoryIndex = 0;

// Créez un tableau pour stocker les images de chaque catégorie
const categoryImagesMap = {};

// Animation barre de filtre

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });


filterButtons.forEach(button => {
    const tag = button.getAttribute('data-tag');
    categoryImagesMap[tag] = galleryImages.filter(item => {
        const itemTag = item.getAttribute('data-gallery-tag');
        return tag === 'all' || itemTag === tag;
    });
});

// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const tag = button.getAttribute('data-tag');
        
//         galleryItems.forEach(item => {
//             item.classList.add('image-fade');
//         });        
//         setTimeout(() => {
//             galleryItems.forEach(item => {
//                 if (tag === 'all' || item.getAttribute('data-gallery-tag') === tag) {
//                     item.classList.remove('image-fade');
//                 }
//             });
//         }, 300);
//     });
// });

function filterImages(tag) {
    modalImages = categoryImagesMap[tag] || [];

    galleryImages.forEach(item => {
        const itemTag = item.getAttribute('data-gallery-tag');
        if (tag === 'all' || itemTag === tag) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tag = button.getAttribute('data-tag');
        if (tag === currentCategory) {
            return;
        }
        currentCategory = tag;
        filterImages(tag);
        currentImageIndex = 0;
        currentCategoryIndex = 0;
        modalImage.src = modalImages[currentCategoryIndex]?.src || '';
    });
});

function openModal(imageIndex) {
    modal.classList.add('active');
    currentCategoryIndex = modalImages.indexOf(galleryImages[imageIndex]);
    modalImage.src = modalImages[currentCategoryIndex]?.src || '';
    const altText = galleryImages[imageIndex]?.getAttribute('alt') || '';
    modalImage.alt = altText;
}

function closeModal() {
    modal.classList.remove('active');
    modalImage.src = '#';
    modalImage.alt = 'image photo modal';
}

function changeImage(direction) {
    currentCategoryIndex += direction;
    if (currentCategoryIndex < 0) {
        currentCategoryIndex = modalImages.length - 1;
    } else if (currentCategoryIndex >= modalImages.length) {
        currentCategoryIndex = 0;
    }
    modalImage.src = modalImages[currentCategoryIndex]?.src || '';
    const altText = modalImages[currentCategoryIndex]?.getAttribute('alt') || '';
    modalImage.alt = altText;
}

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        openModal(index);
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.querySelector('.close').addEventListener('click', closeModal);

document.querySelector('.prev').addEventListener('click', () => {
    changeImage(-1);
});
document.querySelector('.next').addEventListener('click', () => {
    changeImage(1);
});

filterImages('all');
