'use strict';

(function() {
    const navigation = document.querySelector('.page-header__navigation-menu');
    const linkList = navigation.querySelectorAll('.navigation-menu__link');

    function changeColor(evt) {
        if (evt.target.classList.contains('navigation-menu__link')) {
            for (let link of linkList) {
                if (link.classList.contains('navigation-menu__link--current')) {
                    link.classList.remove('navigation-menu__link--current');
                    break;
                }
            }
            evt.target.classList.add('navigation-menu__link--current');
        }
    }

    navigation.addEventListener('click', changeColor);


    document.addEventListener('scroll', changeActiveLink);
    window.onload = changeActiveLink();

    function changeActiveLink() {
        const currentPositionY = window.scrollY;
        const tagsWithId = document.querySelectorAll('[id]');

        tagsWithId.forEach(tag => {
            if (tag.offsetTop - 95 <= currentPositionY && tag.offsetTop + tag.offsetHeight - 95 > currentPositionY) {
                linkList.forEach(link => {
                    link.classList.remove('navigation-menu__link--current');
                    if (tag.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('navigation-menu__link--current');
                    }
                });
            }
        });
    }
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

(function() {
    const buttons = document.querySelectorAll('.portfolio__button');
    const portfolio = document.querySelector('.portfolio__picture-list');

    function changePictures(evt) {
        if (!evt.target.classList.contains('portfolio__button--active')) {
            let portfolioPictures = [...portfolio.querySelectorAll('.portfolio__item')];
            portfolioPictures.unshift(portfolioPictures.pop());
            portfolioPictures.forEach(picture => portfolio.append(picture));
        }
        buttons.forEach(button => button.classList.remove('portfolio__button--active'));
        evt.target.classList.add('portfolio__button--active');
    }

    buttons.forEach(button => button.addEventListener('click', () => changePictures(event)));
})();

(function() {
    let isSwitched = true;
    const portfolio = document.querySelector('.portfolio__picture-list');
    const portfolioPictures = portfolio.querySelectorAll('.portfolio__picture');

    function showBorder(evt) {
        if (evt.target.classList.contains('portfolio__picture--bordered')) {
            isSwitched = false;
        }

        portfolioPictures.forEach(picture => picture.classList.remove('portfolio__picture--bordered'));
        
        if (isSwitched) {
            evt.target.classList.add('portfolio__picture--bordered');
        }

        isSwitched = true;
    }

    portfolioPictures.forEach(image => image.addEventListener('click', () => showBorder(event)));
})();

(function() {
    const modal = document.querySelector('.modal');
    const sendFormButton = document.querySelector('.contact-form__button');
    const closeModalButton = document.querySelector('.modal__close-button');
    const subject = document.querySelector('.modal__subject');
    const description = document.querySelector('.modal__description');

    function addNodeValue(node, defaultValue) {
        let value = document.querySelector(node).value;
        value = value === '' ? defaultValue : value;
        return value;
    }

    function showModal() {
        modal.classList.remove('hidden');
        addContent(event);
    }

    function hideModal() {
        modal.classList.add('hidden');
        document.forms[0].reset();
    }

    function addContent() {
        subject.innerText = `Subject: ${addNodeValue('.contact-form__item--subject', 'no subject')}`;
        description.innerText = `Description: ${addNodeValue('.contact-form__item--textarea', 'no description')}`;
    }

    function validate(evt) {
        let requiredFields = [...document.querySelectorAll('[required]')];
        let isValid = field => field.checkValidity();
        if (requiredFields.every(isValid)) {
            evt.preventDefault();
            showModal();
        }
    }

    sendFormButton.addEventListener('click', () => validate(event));
    closeModalButton.addEventListener('click', hideModal);
})();