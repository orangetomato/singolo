'use strict';

(function() {
    const navigation = document.querySelector('.page-header__navigation-menu');
    const linkList = navigation.querySelectorAll('.navigation-menu__link');

    function changeColor(evt) {
        if (evt.target.classList.contains('navigation-menu__link')) {
            for (let link of linkList) {
                if (link.classList.contains('navigation-menu__link--current')) {
                    link.classList.remove('navigation-menu__link--current');
                }
            }
            evt.target.classList.add('navigation-menu__link--current');
        }
    }

    navigation.addEventListener('click', changeColor);
})();

(function() {
    const previousSlideArrow = document.querySelector('.slider__arrow--previous');
    const nextSlideArrow = document.querySelector('.slider__arrow--next');
    const slideList = document.querySelectorAll('.pictures__slide');
    const slider = document.querySelector('.slider');
    let currentSlideIndex = 0;

    function showPreviousSlide() {
        slideList[currentSlideIndex].classList.add('hidden');
        let previousSlideIndex = currentSlideIndex - 1;

        if (previousSlideIndex < 0) {
            previousSlideIndex = slideList.length - 1;
        }

        if (previousSlideIndex === 1) {
            slider.classList.add('slider--blue');
        } else {
            slider.classList.remove('slider--blue');
        }

        slideList[previousSlideIndex].classList.remove('hidden');
        currentSlideIndex = previousSlideIndex;
    }

    function showNextSlide() {
        slideList[currentSlideIndex].classList.add('hidden');
        let nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex > slideList.length - 1) {
            nextSlideIndex = 0;
        }

        if (nextSlideIndex === 1) {
            slider.classList.add('slider--blue');
        } else {
            slider.classList.remove('slider--blue');
        }

        slideList[nextSlideIndex].classList.remove('hidden');
        currentSlideIndex = nextSlideIndex;
    }

    previousSlideArrow.addEventListener('click', showPreviousSlide);
    nextSlideArrow.addEventListener('click', showNextSlide);
})();

(function() {
    const phoneList = document.querySelectorAll('.iphone__phone');
    const verticalScreen = document.querySelector('.iphone__screen--vertical');
    const horizontalScreen = document.querySelector('.iphone__screen--horizontal');

    function switchScreen(evt) {
        if (evt.target.classList.contains('iphone__phone--vertical')) {
            verticalScreen.classList.toggle('iphone__screen--hidden');
        } else {
            horizontalScreen.classList.toggle('iphone__screen--hidden');
        }
    }

    for (let phone of phoneList) {
        phone.addEventListener('click', switchScreen);
    }
})();