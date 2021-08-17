'use strict';

// BANKIST APP -mimimalist online banking

// Data
//using object rather than map cg data are coming from web api are like object
const account1 = {
    owner: 'Mohammad Ali Shuvo',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2020-11-18T21:31:17.178Z',
        '2020-12-23T07:42:02.383Z',
        '2021-07-28T09:15:04.904Z',
        '2021-07-01T10:17:24.185Z',
        '2021-08-05T14:11:59.604Z',
        '2021-08-06T17:01:17.194Z',
        '2021-08-07T08:36:17.929Z',
        '2021-08-08T10:51:36.790Z',
    ],
    currency: 'BDT',
    locale: 'bn-BD',
};

const account2 = {
    owner: 'Noushad Bhuiyan',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'A.K.M Miftahur Rahman Sarker',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2020-11-18T21:31:17.178Z',
        '2020-12-23T07:42:02.383Z',
        '2021-07-28T09:15:04.904Z',
        '2021-07-01T10:17:24.185Z',
        '2021-08-05T14:11:59.604Z',
        '2021-08-06T17:01:17.194Z',
        '2021-08-08T08:36:17.929Z',
        '2021-08-09T10:51:36.790Z',
    ],
    currency: 'BDT',
    locale: 'bn-BD',
};

const account4 = {
    owner: 'John Doe',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2020-11-18T21:31:17.178Z',
        '2020-12-23T07:42:02.383Z',
        '2021-07-28T09:15:04.904Z',
        '2021-07-01T10:17:24.185Z',
        '2021-08-05T14:11:59.604Z',
        '2021-08-07T17:01:17.194Z',
        '2021-08-08T08:36:17.929Z',
        '2021-08-09T10:51:36.790Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin ');
const logo = document.querySelector('.nav img');
const loginContainer = document.querySelector('.login');
const btnlogOut = document.querySelector('.btn-logout');
const footer = document.querySelector('.footer')
//global variable
let currentAccount, timer;
//formatting movement date using internatiolaizing API
const formatMovementDate = function (date) {
    console.log(date);

    //calculate how many days passed since the current date and also between the date of movements
    // two day timestamp e diff korle milliseconds e asbe result setake hour day minute e pore convert korlei hobe

    const calcdayPassed = (date1, date2) =>
        // diff between 2 date object result will be a timetsamps(milliseconds)
        // so convert this milliseconds to day:milliseconds-> sec(1000)->minute(60)>hour(60)->day(24)
        Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)); // get the total day left
    // console.log(calcdayPassed(new Date(2037, 3, 14), new Date(2037, 3, 23)));
    const daysPassed = calcdayPassed(new Date(), date);
    console.log(daysPassed);
    const local = navigator.language;
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    //formate date day/month/year
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`
    // now using internationalize format date by user local data

    return new Intl.DateTimeFormat(local).format(date); //here we don't need  option object to set hour min sec,month...
};
//formatting  balence using internatiolaizing API
const formattedBalence = function (value, locale, currency) {
    const formattedBalence = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        // currency specify kore dile oi onujai currency dekhabe but currency er format style local user based e hobe as we use user local navigator language
    }).format(value);
    return formattedBalence;
};

//display each movements on the list by recieve a movement array

const displayMovements = function (curracc, sort = false) {
    // console.log(containerMovements.innerHTML);
    containerMovements.innerHTML = '';
    // sorting functionality
    // orginal mov array ke sort na kore shallow copy er upor kaj korbo
    const movs = sort
        ? curracc.movements.slice().sort((a, b) => a - b)
        : curracc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        //common technique to looping over two arrays at the same time
        //get time string
        const date = new Date(curracc.movementsDates[i]);
        //if browser api local time exist then we can also pass the currentaccount localZone
        const displayDate = formatMovementDate(date);

        const formattedcurrMov = formattedBalence(
            mov,
            currentAccount.locale,
            currentAccount.currency
        );
        console.log(displayDate);
        // two ways of creating dom element and insert dom in the node Tree 

        // const html = document.createElement('div');
        // html.classList.add('movements__row');
        // console.log(html);
        // html.innerHTML = `<div class="movements__type movements__type--${type}">${i + 1
        //     } ${type}</div>
        //    <div class="movements__date">${displayDate}</div> 
        //    <div class="movements__value">${formattedcurrMov}</div>`;

        const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1
            } ${type}</div>
            <div class="movements__date">${displayDate}</div> 
            <div class="movements__value">${formattedcurrMov}</div>
        </div>`;

        /*
** position
A DOMString representing the position relative to the element; must be one of the following strings:
'beforebegin': Before the element itself. //before
'afterbegin': Just inside the element, before its first child. //prepend
'beforeend': Just inside the element, after its last child. //append
'afterend': After the element itself. //after
text
The string to be parsed as HTML or XML and inserted into the tree.
        */
        // containerMovements.insertAdjacentHTML('afterbegin', html);
        containerMovements.insertAdjacentHTML('afterbegin', html);
        //using beforeend create each new element after the previous one, in inverted way
    });
    // console.log(containerMovements.innerHTML);
};

//calculate movement balence and print it

const calcPrintBalence = function (acc) {
    acc.balence = acc.movements.reduce(
        (acc, currValue, i, arr) => acc + currValue,
        0
    );

    labelBalance.textContent = `${formattedBalence(
        acc.balence,
        acc.locale,
        acc.currency
    )}`;
};

// calculate summary

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((v) => v > 0)
        .reduce((acc, v) => acc + v, 0);
    labelSumIn.textContent = `${formattedBalence(
        incomes,
        acc.locale,
        acc.currency
    )}`;
    const out = acc.movements.filter((v) => v < 0).reduce((acc, v) => acc + v, 0);
    labelSumOut.textContent = `${formattedBalence(
        Math.abs(out),
        acc.locale,
        acc.currency
    )}`;
    const intRate = acc.interestRate / 100;
    const interest = acc.movements
        .filter((v) => v > 0)
        .map((v) => v * intRate)
        .filter((v) => v >= 1)
        .reduce((acc, v) => acc + v, 0);
    labelSumInterest.textContent = `${formattedBalence(
        interest,
        acc.locale,
        acc.currency
    )}`;
};

// user Name compute function
const createUserName = function (accs) {
    accs.forEach(function (acc) {
        // console.log(acc);
        //create a new property;

        // side effects - do some work without returning anything

        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map((v) => v[0])
            .join('');
    });
};
//manually call first time to set username object on each account
createUserName(accounts);

// Update The UI
const UpdateUi = function (currAcc) {
    //Display movements
    displayMovements(currAcc);

    //Display balence
    calcPrintBalence(currAcc);

    //Display summary
    calcDisplaySummary(currAcc);
};

// 12 hour date format with Am/pm using moment js / but i use here internatiolaize API
function displayTime() {
    // var time = moment().format('MMMM Do YYYY, h:mm:ss a')

    const now = new Date();
    const option = {
        hour: '2-digit',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'long', //long dile dekhabe month name like August, '2-digit' dile 08 emn output asbe
        year: '2-digit',
        weekday: 'short', //short(sun)//narrow(s)
    };
    //rather than defining country local time we can use user browser to set current local time and date
    const local = navigator.language;
    // console.log(curracc.locale); //my local zone is : en-IN
    const time = new Intl.DateTimeFormat(local, option).format(now); //Sunday, 8/8/2021, 1:09 pm

    setTimeout(displayTime, 1000); //MISUNDERSTOOD THE FUNCTIONALITY

    labelDate.textContent = `${time}`;
}
//logout Timer function

const startlogOutTimer = function () {
    //trick
    //this setinterval function not call immediately it call after 1 sec so i have to fix this bug
    const trick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        //in each call , print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        //when 0 seconds stop timer and log out the user and hide UI
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }
        // decrease 1 sec
        time--;
    };
    //set time to 5 minutes

    let time = 600;

    // call timer in every seconds
    trick();
    const timer = setInterval(trick, 1000);
    return timer;
};
// tConvert('18:00')
//login functionality

btnLogin.addEventListener('click', function (e) {
    //prevent from form submitting
    e.preventDefault();
    // console.log('Login');

    currentAccount = accounts.find(
        //eikhane filter use koiraow specific object paitam kintu filter new array banaiya tr vitor object take rakhbe kintu find direct element take return kore
        (v) => v.userName === inputLoginUsername.value
    );
    console.log(currentAccount);
    //  console.log(+'23');
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log(`login successfull`);

        inputLoginUsername.value = inputLoginPin.value = '';
        //inputPin looses its focus by using blur
        inputLoginPin.blur();
        logo.style.opacity = 0;
        loginContainer.style.opacity = 0;

        //display UI and welcome message
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]
            }`;

        //day/mon/year
        // labelDate.textContent = `${day}/${month}/${year}, ${tConvert(`${hour}:${minute}`)}`
        // if api has selected zone then manually we can pass the currenyzone to this function
        // displayTime(currentAccount);

        //but we want to user browser time zone not set api time zone
        displayTime();

        containerApp.style.opacity = 100;
        footer.classList.remove('hidden');

        //set the timer function globally so we can check if any timer exist on new login then we can easily clear this timer
        if (timer) {
            clearInterval(timer);
        }
        timer = startlogOutTimer();

        // console.log(tConvert);
        UpdateUi(currentAccount);
    } else {

    }
});

//logout functionality
btnlogOut.addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(timer);
    tata.success(
        'LogOut Successful ',
        `See You Soon ${currentAccount.owner}`
    );
    logo.style.opacity = 100;
    loginContainer.style.opacity = 100;
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
    footer.classList.add('hidden');



})
//Transfer Money

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(currentAccount);
    let amount = Number(inputTransferAmount.value);
    let recamount;
    // console.log(inputTransferTo.value);

    const reciverAcc = accounts.find((v) => v.userName === inputTransferTo.value);
    console.log(amount, reciverAcc);

    inputTransferTo.value = inputTransferAmount.value = '';

    // console.log(amount, TransUserName);
    if (
        reciverAcc &&
        currentAccount.balence >= amount &&
        amount > 0 &&
        reciverAcc.userName != currentAccount.userName
    ) {
        switch (reciverAcc.currency) {
            case 'USD':
                recamount = amount * 0.012;
                break;
            case 'BDT':
                recamount = amount * 84.98;
                break;
            // case "EUR":
            //     recamount = amount * 84.98; //FIXME find a solution later

            //     break;
            // default:
            //     text = "I have never heard of that fruit...";
        }
        //withdraw from sender at first
        console.log('Transfer valid');
        currentAccount.movements.push(-amount);
        console.log(currentAccount.movements);

        //add deposite to the reciever account
        reciverAcc.movements.push(recamount);
        console.log(reciverAcc.movements);

        // add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        reciverAcc.movementsDates.push(new Date().toISOString());

        //reset the timer when user transfer money

        clearInterval(timer); // so it is important to keep the timer variable global
        timer = startlogOutTimer(); // store the timer variable to avoid conflict between users timer functionality
        UpdateUi(currentAccount);
        tata.success(`Successfully Transfer Money`, `to ${reciverAcc.owner}`, {
            closeBtn: false,
        });
    } else {
        // notification dekhabo pore
        tata.error('Invalid Transfer', '', {
            closeBtn: false,
        });
        console.log('You have not sufficient money');
    }

    // add deposite to the transfer user account
});

//Request Loan Functionality using some method
// we get loan if atleast 1 deposite and 10% of loan amount exist on my balence

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some((v) => v >= amount * 0.1)) {
        tata.info('Please wait ', 'for BANK approval', {
            duration: 2500,
        });
        setTimeout(function () {
            currentAccount.movements.push(amount);
            console.log(currentAccount.movements);
            //Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            UpdateUi(currentAccount);
            //reset the timer after bank approve the loan

            clearInterval(timer); // so it is important to keep the timer variable global
            timer = startlogOutTimer(); // store the timer variable to avoid conflict between users timer functionality
        }, 2500);

        inputLoanAmount.value = '';
        inputLoanAmount.blur();
    } else {
        tata.error('Not Eligible', 'You are not eligible for loan');

        console.log(`not eligible`);
    }
});

// close account functionality  using find index method
// find index same as find but it return only index not whole thing

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(inputClosePin.value);

    if (
        inputCloseUsername.value === currentAccount.userName &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const clsAccUser = accounts.findIndex(
            (v) => v.userName === inputCloseUsername.value
        );
        //indexof o kora jai but indexof findindex er moto complex query kora jai na just array te data thakle kaj kore like indexof(23)
        accounts.splice(clsAccUser, 1);
        tata.success(
            'Account Delete Successful ',
            `See You Soon ${currentAccount.owner}`
        );
        // hide UI
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';
        console.log(`Account close successfull`);

        console.log(accounts);
    } else {
        tata.info('Information Invalid', 'provide valid username and pin');
    }

    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
});

let sorted = false;
//sort functionality
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);

    sorted = !sorted;
});
