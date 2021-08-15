'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

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
btnsOpenModal.forEach(v => v.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//navigation
//event delegation-- implementing page navigation

//old way
// document.querySelectorAll('.nav__link').forEach(function (v) {
//     v.addEventListener('click', function (e) {
//         //prevent deafult anchor switching
//         e.preventDefault();
//         console.log('LINK');
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//         console.log(id);

//         //so this call back function we put in 3 eleemnt but if there are thousands eleemnt and the same event for all of this then there might be a performance issue
//         //this prb can be solved by eventdelegation - use the fact event bubble up - we do this by putting the eventListner to commom parent
//         //in our case we put eventhandler to parent ul and inside the ul all li when a user click it will follow the bubble up then we can catch the event in common parent element and handel it there

//     })
// })

// modern way implementing navigation using event delegation
// 1. add eventlistner to common parent element
//2. determine what element originate the event
//3. mathching strategy
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // now we have to figure out where this event actually happen , that is stored in e.target
  // child e click korle parent e gelo thn search kore kothai event ta hoice
  e.preventDefault(); // default event trigger off
  console.log(e.target); // targeted event store position

  //matching strategy , mane common parent er event er response bad dibo
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log(id);
  }
  //sum: feature e click korle parent node ul e jabe tokhn check dibe event target konta sei event target e giye event function perform korbe , common parent er deafult behaviour off kore kaj korte hobe onlu child element gula select kore
  //same event handler multiple place e bosanor theke event delegation lot better
  // some element that not exist on run time but at the end it will visible it can be done by event delegation
});

//smooth scrooling in JS //button scrooling

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//building a tab component

//doing this is a bad practice suppose if i have 200 tabs then i create 200 call back function copies and  its slow down the page
//so better use event delegation

// tabs.forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         console.log(el);
//     })
// })
//add eventlistner to common parent
tabContainer.addEventListener('click', function (e) {
  //stop default behavior cg its follow same action as like child element so prevent it
  e.preventDefault();
  // console.log(e.target);
  //matching strategy
  const clicked = e.target.closest('.operations__tab'); //targeted element e span ace so span ke click korleow parent element dorai dici
  console.log(clicked);
  //guard class - if no click means null the immediately stop the function
  if (!clicked) return;
  //Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate Content Area
  tabContents.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation
//passing argument to event handler function
const handelHover = function (e) {
  // console.log(e); //event mouseover or mouseout
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    })

  }

}
// nav.addEventListener('mouseover', function (e) {
//   handelHover(e, 0.5)
// })
// nav.addEventListener('mouseout', function (e) {

//   handelHover(e, 1)

// })
//better way to do this using bind(this specify) sometimes this specify object sometimes only value
//passing "argument" to handler function using bind
nav.addEventListener('mouseover', handelHover.bind(0.5)) // function reference er sathe event taow jai so event recieve korte hobe
nav.addEventListener('mouseout', handelHover.bind(1))