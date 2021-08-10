'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    //page is jump when open modal
    e.preventDefault();

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


//node;ist html dom array style e dekhai tai same class thakle r same functionality chaile forEach use kora better
btnsOpenModal.forEach((v) => v.addEventListener('click', openModal))
btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//selecting elements
//for this type of eleemnt we dont need any selector
console.log(document);//only document is not proper dom element
console.log(document.documentElement);//entire element select
console.log(document.body);//entire body select
console.log(document.head);//entire header selec

const header = document.querySelector('.header');
console.log(document.querySelectorAll('.header'));//return a nodeList
document.querySelector('.header')
const allSection = document.querySelectorAll('.section');
console.log(allSection);
console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);// this return a htmlcollection , if dom changes its will be update live
console.log(document.getElementsByClassName('btn'));// aslo htmlcollection

//creating and inserting element
//  insertAdjacentHTML

const message = document.createElement('div'); //create a dom element
console.log(message);
//as message now become a dom object so we can use it 
message.classList.add('cookie-message');
// message.textContent = 'WE use cookies for improved functionality and analytics';
//textcontent dile html element count hobe na
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class ="btn btn--close--cookie">Got it!</button>';
//prepend and append not only insert elemnt also move element
//add element as a first child - prepend
// header.prepend(message)
// header.append(message)
//1st prepend that append so element will be updated and visible one time in append way
//if we want to change on both side then we have to amke a copy
// header.append(message.cloneNode(true))
header.append(message)
//append - maek last child prepend make first child of an eleemnt but before and after set element before , after
// but  live updated one will always visible , others are not working
// header.before(message)
// header.after(message)

//delete elements

document.querySelector('.btn--close--cookie').addEventListener('click', function () {
    message.remove()
    //older version of doing this
    // message.parentElement.removeChild(message)
})

//styles , attributes and classes

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.height);// nothing happen cg we not set height property manusally
console.log(message.style.backgroundColor);//it will work we can read cg we set bc manusally
console.log(getComputedStyle(message).display); //in that way we can read certain eleemnt css
// read a certain eleemnt property as suggested by window and add value on it
//use parseFloat or parsInt to get numbers only from a string
message.style.height = parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//set custom property
document.documentElement.style.setProperty('--color-primary', 'orangered')
//attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
logo.alt = "Beautiful Minimalist Logo";
console.log(logo.alt);
//cg its not a standard property
console.log(logo.designer);//undefined
//but we can also get access to manually set attribute 
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
//absolute att thats why we see link 
console.log(logo.src);
//relative att img/abc.png so we can access by getArribute
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//by using src and href we can use getattribute to access our own attribute whatever we wrote, but only using attribute we can access the absolute value like a link type

//data attribute
console.log(logo.dataset.versionNumber);
//classes
logo.classList.add('cf', 'jf')
logo.classList.remove('cf', 'jf')
logo.classList.toogle()
logo.classList.contains()