import pets from "./pets.js";

const page = document.querySelector('.page');
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.main-nav');
const menuItems = document.querySelectorAll(".nav-item");
const logo = document.querySelector('.logo');
const pageCover = document.querySelector('.page-cover');

//Open and close menu
function toggleMenu() {
    if(menu.classList.contains('main-nav_open')) {
        logo.classList.remove('open');
        menu.classList.remove('main-nav_open');
        burger.classList.remove('open');
        pageCover.classList.remove('open-menu');
        page.classList.remove('fixed-page');
    } else {
        logo.classList.add('open');
        menu.classList.add('main-nav_open');
        burger.classList.add('open');
        pageCover.classList.add('open-menu');
        page.classList.add('fixed-page');
    }
}

document.addEventListener('click', function(event){
    if (!event.target.closest('.header-container')) {
        logo.classList.remove('open');
        menu.classList.remove('main-nav_open');
        burger.classList.remove('open');
        pageCover.classList.remove('open-menu');
        page.classList.remove('fixed-page');
    }
})

burger.addEventListener('click', toggleMenu);
menuItems.forEach(item => item.addEventListener('click', toggleMenu));

//modal window
const popup = document.querySelector('.popup');
const carousel = document.querySelector('.pets-list');
const html = document.querySelector('html');
const popupCloseBtn = document.querySelector('.popup-close');

let scrollPosition;
let searchedName = '';

function openPopup(event) {
    if (event.target.closest('.pets-item')) {
        scrollPosition = window.pageYOffset;
        html.style.top = `-${scrollPosition}px`;
        popup.classList.add('open');
        html.classList.add('modal-opened');
        pageCover.classList.add('popup-overlay'); 
        searchedName = event.target.closest('.pets-item').children[1].textContent;
        console.log(searchedName);
        changeInfo (pets);
    }    
}

function closePopup(event) {
    if ((event.target.closest('.popup-close')) || (!event.target.closest('.popup-content'))) {
        popup.classList.remove('open');
        html.classList.remove('modal-opened');
        window.scrollTo(0, scrollPosition);
        html.style.top=''; 
        pageCover.classList.remove('popup-overlay'); 
    }
}

carousel.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);


const popupBody = document.querySelector('.popup-body');
const popupContent = document.querySelector('.popup-content')

popupBody.addEventListener('mouseover', function(event) {
    if ((!event.target.closest('.popup-wrapper'))) {
        popupCloseBtn.style.backgroundColor = '#FDDCC4';
        popupBody.style.cursor = 'pointer';
        popupContent.classList.add('popup-content-shadow');
    } else {
        popupCloseBtn.style.backgroundColor = 'transparent';
        popupBody.style.cursor = 'default';
        popupContent.classList.remove('popup-content-shadow');
    }
 });

 let info = document.querySelectorAll('[data-pets]');

 function changeInfo (pets) {
    info.forEach((el) => {
        const key = el.getAttribute('data-pets');
        let petInfo = pets.find(pet => pet.name === searchedName)
        if (key === 'img') {
            el.src = petInfo[key];
        } 
        el.textContent = petInfo[key];
      });  
}


 //slider
const btnLeftSlider = document.querySelector('.arrow-left');
const btnRightSlider = document.querySelector('.arrow-right');
const itemLeft = document.querySelector('.item-left');
const itemRight = document.querySelector('.item-right');
const petImagesActive = document.querySelectorAll('.pet-image-active');
const petNamesActive = document.querySelectorAll('.pet-title-active');

let pageWidth = 0;
let randomNum = 0;
let petsArr = [];
let prevArr = [];
let changedItem;

function showPets() {
    getRandomPets();
    getRandomPets();
    for (let i = 0; i < prevArr.length; i++) {
        petImagesActive[i].src = pets[prevArr[i]].img;
        petNamesActive[i].textContent = pets[prevArr[i]].name;
    }      
}

showPets()

const moveLeft = () => {
    carousel.classList.add('transition-left'); 
    btnLeftSlider.removeEventListener('click', moveLeft);
    btnRightSlider.removeEventListener('click', moveRight);
};

const moveRight = () => {
    carousel.classList.add('transition-right');
    btnRightSlider.removeEventListener('click', moveRight);
    btnLeftSlider.removeEventListener('click', moveLeft);
};

btnLeftSlider.addEventListener('click', () => {
    moveLeft();
    changedItem = itemLeft;
    changedItem.innerHTML = '';
    for (let i = 0; i < petsArr.length; i++) {
        changedItem.appendChild(createCardTemplate(i));    
    }
});

btnRightSlider.addEventListener('click', () => {
    changedItem = itemRight;
    changedItem.innerHTML = '';
    for (let i = 0; i < petsArr.length; i++) {
        changedItem.appendChild(createCardTemplate(i));    
    }
    moveRight();
});

function createCardTemplate(i) {
    const card = document.createElement("div");
    card.classList.add('pets-item');
    card.insertAdjacentHTML ('beforeend',
        `<img class="pet-image" src=${pets[petsArr[i]].img} alt="pet's image" data-pets="img">
        <h4 class="pet-title title" data-pets="name">${pets[petsArr[i]].name}</h4>
        <button class="btn pet-btn">Learn more</button>`    
        )
    return card;
}

carousel.addEventListener('animationend', (animationEvent) => {
    if(animationEvent.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        const leftItems = itemLeft.innerHTML;
        document.querySelector('.item-active').innerHTML = leftItems;
        changedItem = itemLeft;
        getRandomPets();
      
    } else {
        carousel.classList.remove('transition-right');
        const rightItems = itemRight.innerHTML;
        document.querySelector('.item-active').innerHTML = rightItems;
        changedItem = itemRight;
        getRandomPets();
    };
    //btnLeftSlider.addEventListener('click', moveLeft);
    //btnRightSlider.addEventListener('click', moveRight);    
})

 
function getRandomPets() {
    pageWidth = document.documentElement.scrollWidth;
     if(petsArr.length >= 1) {
         prevArr = petsArr;
     }
     petsArr = [];
     if (pageWidth >= 1280) {
        for (let i = 0; i < 3; i++) {
            randomNum = Math.floor(Math.random() * 8);
             if(prevArr.includes(randomNum) || petsArr.includes(randomNum)) {
                 i--
             } else {
                petsArr.push(randomNum); 
             }             
        }
        return (petsArr);
     } else if (pageWidth < 1280 && pageWidth > 767) {
        for (let i = 0; i < 2; i++) {
            randomNum = Math.floor(Math.random() * 8);
            if(prevArr.includes(randomNum) || petsArr.includes(randomNum)) {
                i--
            } else {
               petsArr.push(randomNum); 
            }   
        }
        return (petsArr);
     } else {
        for (let i = 0; i < 1; i++) {
            randomNum = Math.floor(Math.random() * 8);
            if(prevArr.includes(randomNum)) {
                i--
            } else {
               petsArr.push(randomNum); 
            }   
        }
        return (petsArr);
     }
}

