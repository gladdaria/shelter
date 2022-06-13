import pets from "../main/pets.js";

const page = document.querySelector('.page');
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.main-nav');
const menuItems = document.querySelectorAll(".nav-item");
const logo = document.querySelector('.logo');
const pageCover = document.querySelector('.page-cover');


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
burger.addEventListener('click', toggleMenu);
menuItems.forEach(item => item.addEventListener('click', toggleMenu));

document.addEventListener('click', function(event){
    if (!event.target.closest('.header-container')) {
        logo.classList.remove('open');
        menu.classList.remove('main-nav_open');
        burger.classList.remove('open');
        pageCover.classList.remove('open-menu');
        page.classList.remove('fixed-page');
    }
});

//open and close modal window
const popup = document.querySelector('.popup');
const learnMoreBtns = document.querySelectorAll('.pets-item');
const html = document.querySelector('html');
const popupCloseBtn = document.querySelector('.popup-close');
let scrollPosition;

function openPopup() {
    scrollPosition = window.pageYOffset;
    html.style.top = `-${scrollPosition}px`;
    popup.classList.add('open');
    html.classList.add('modal-opened');
    pageCover.classList.add('popup-overlay'); 
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

learnMoreBtns.forEach((btn) => btn.addEventListener('click', openPopup));
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


 const info = document.querySelectorAll('[data-pets]');
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

 let searchedName = '';

 learnMoreBtns.forEach((btn) => btn.addEventListener('click',() => {
    searchedName = (btn.children[1].textContent);
    changeInfo (pets);
}));

// pagination
let numOfPages;
let arrOfPages = [];
let numOfPets;

let arrForSix = [];
let shuffledArray = [];
function shuffle(arrOfPages) {
	shuffledArray = [...arrOfPages];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}
//shuffle(arrOfPages);

function createRandomArr(array) {
    let page = 0;
      while (page < 6) {
          shuffle(array);
          arrForSix[page] = shuffledArray;
          page++;
      }
      return arrForSix;
}

function getNumberOfPages() {
	if (document.documentElement.scrollWidth < 768) {
		numOfPages = 16;
        arrOfPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        shuffle(arrOfPages);
	} else if (document.documentElement.scrollWidth >= 768 && document.documentElement.scrollWidth < 1280) {
		numOfPages = 8;
        arrOfPages = [0, 1, 2, 3, 4, 5, 6, 7];
        shuffle(arrOfPages);
	} else if (document.documentElement.scrollWidth >= 1280) {
        numOfPages = 6;
        const array = [0, 1, 2, 3, 4, 5, 6, 7];
        createRandomArr(array);
	}
	return numOfPages, arrOfPages;
}

function getPetsPerPage() {
	if (document.documentElement.scrollWidth < 768) {
		numOfPets = 3;
	} else if (document.documentElement.scrollWidth >= 768 && document.documentElement.scrollWidth < 1280) {
		numOfPets = 6;
	} else if (document.documentElement.scrollWidth >= 1280) {
        numOfPets = 8;
	}
	return numOfPets;
}

getPetsPerPage();
getNumberOfPages();

let arrForEight = [
    [2, 5, 7, 0, 6, 1],
    [6, 3, 4, 2, 1, 5],
    [1, 7, 5, 4, 0, 6],
    [0, 4, 3, 1, 2, 7],
    [4, 0, 2, 5, 7, 3],
    [7, 1, 6, 3, 4, 0],
    [5, 6, 1, 7, 3, 2],
    [3, 2, 0, 6, 5, 4],
];

let arrForSixteen = [
    [2, 5, 7], 
    [0, 6, 1],
    [6, 3, 4],
    [2, 1, 5],
    [1, 7, 5], 
    [4, 0, 6],
    [0, 4, 3], 
    [1, 2, 7],
    [4, 0, 2], 
    [5, 7, 3],
    [7, 1, 6], 
    [3, 4, 0],
    [5, 6, 1], 
    [7, 3, 2],
    [3, 2, 0], 
    [6, 5, 4],
];


//change pages
const prevPageBtn = document.querySelector('.prev');
const nextPageBtn = document.querySelector('.next');
const firstPageBtn = document.querySelector('.begining');
const lastPageBtn = document.querySelector('.end');
const current = document.querySelector('.current');

let currentPage = 1;


nextPageBtn.addEventListener('click', () => {
    checkPage(currentPage);
    if (currentPage === numOfPages) {
        currentPage = numOfPages;
    } else {
        currentPage += 1;
    }
    checkPage(currentPage)
    showPets(currentPage);
    current.textContent = currentPage;
})


prevPageBtn.addEventListener('click', () => {
    checkPage(currentPage)
     if (currentPage === 1) {
        currentPage = 1;
    } else {
        currentPage -= 1;
    }
    checkPage(currentPage);
    showPets(currentPage);
    current.textContent = currentPage;
});

firstPageBtn.addEventListener('click', () => {
    if(currentPage !== 1) {
        currentPage = 1;
        current.textContent = currentPage;
        lastPageBtn.classList.remove('disabled');
        nextPageBtn.classList.remove('disabled');
    }
    checkPage(currentPage);
    showPets(currentPage);
});

lastPageBtn.addEventListener('click', () => {
    if(currentPage !== numOfPages) {
        currentPage = numOfPages;
        current.textContent = currentPage;
        firstPageBtn.classList.remove('disabled');
        prevPageBtn.classList.remove('disabled');
    }
    checkPage(currentPage);
    showPets(currentPage);
});

function checkPage(currentPage) {
    if (currentPage === numOfPages) {
        lastPageBtn.classList.add('disabled');
        nextPageBtn.classList.add('disabled');
        
    }else if (currentPage < 2) {
        firstPageBtn.classList.add('disabled');
        prevPageBtn.classList.add('disabled');
    } else {
        lastPageBtn.classList.remove('disabled');
        nextPageBtn.classList.remove('disabled');
        firstPageBtn.classList.remove('disabled');
        prevPageBtn.classList.remove('disabled');
    }
}

const petsImages = document.querySelectorAll('.pet-image');
const petsNames = document.querySelectorAll('.pet-title');
function showPets(currentPage) {
        if (numOfPets === 8) {
            for (let i = 0; i < numOfPets; i++) {
                petsImages[i].src = pets[arrForSix[[currentPage - 1]][i]].img;
                petsNames[i].textContent = pets[arrForSix[[currentPage - 1]][i]].name;
            }
        } else if (numOfPets === 6) {
            for (let i = 0; i < numOfPets; i++) {
                petsImages[i].src = pets[arrForEight[shuffledArray[currentPage - 1]][i]].img;
                petsNames[i].textContent = pets[arrForEight[shuffledArray[currentPage - 1]][i]].name;
            }
        } else if (numOfPets === 3)
        for (let i = 0; i < numOfPets; i++) {
            petsImages[i].src = pets[arrForSixteen[shuffledArray[currentPage - 1]][i]].img;
            petsNames[i].textContent = pets[arrForSixteen[shuffledArray[currentPage - 1]][i]].name;    
        }     
}

showPets(currentPage);