var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    on: {
        init: function () {
            updateProgressBar();
        },
        slideChange: function () {
            updateProgressBar();
        },
    },
});

function updateProgressBar() {
    let swiper = mySwiper;
    let progressBar = document.querySelector('.swiper-progress-bar');
    if (progressBar) {
        let progress = Math.min(swiper.realIndex / (swiper.slides.length - 1), 1);
        progressBar.style.transform = 'scaleX(' + progress + ')';
    }
}