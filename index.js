const inputPassword = document.querySelector("#passwordDisplay");
const messageBtn = document.querySelector("#copyMes");
const copyBtn = document.querySelector("#copyBtn");
const lengthOfPass = document.querySelector("#lengthCounter");
const slider = document.querySelector("#passwordSlider");
const upper = document.querySelector("#uppercase");
const lower = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const Indicator = document.querySelector("#passIndicator");
const genPass = document.querySelector("#genBtn");
const randomSymbols = '?><"+*&^%$#@'
const allCheckBox = document.querySelectorAll("input[type=checkbox");


let password = "";
let passwordLength = 8;
let checkCount = 0;
handleSlider();
// genSymbol();

// set password length 

function handleSlider() {
    slider.value = passwordLength;
    lengthOfPass.innerHTML = passwordLength;
}

// indicator  

function passwordIndicator(color) {
    Indicator.computedStyleMap.backgraundColor = color;
}

// for random number  

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function genRandomNumber() {
    return getRandomNumber(0, 9);


}
function genLowerCase() {
    return String.fromCharCode(getRandomNumber(97, 123));
}

function genUpperCase() {
    return String.fromCharCode(getRandomNumber(65, 91));
}
function genSymbol() {
    const randomNum = getRandomNumber(0, randomSymbols.length);
    return randomSymbols.charAt(randomNum);
}

function calculateStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upper.checked) hasUpper = true;
    if (lower.checked) hasUpper = true;
    if (number.checked) hasUpper = true;
    if (symbol.checked) hasUpper = true;

    if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength >= 8) {
        passwordIndicator("green")
    }
    else if ((hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6) {
        passwordIndicator("yellow")
    }
    else {
        passwordIndicator("red")
    }
}
// copy content 

async function copyText() {
    try {
        await navigator.clipboard.writeText(inputPassword.value);
        copyBtn.innerHTML = "copied";
    }
    catch (e) {
        copyBtn.innerHTML = "failed";
    }
    copyBtn.classList.add("active");
}
setTimeout(() => {
    copyBtn.classList.remove("active")
}, 2000);

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

slider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (inputPassword)
        copyText();
});

genPass.addEventListener('click', () => {
    if (checkCount == 0) return;
    if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
    }

    console.log("start code ");

    password = "";


    let funcAr = [];

    if (upper.checked)
        funcAr.push(genUpperCase);


    if (lower.checked)
        funcAr.push(genLowerCase);

    if (number.checked)
        funcAr.push(genRandomNumber);

    if (symbol.checked)
        funcAr.push(genSymbol);

    for (let i = 0; i < funcAr.length; i++) {
        password += funcAr[i]();
    }

    console.log("midele  ");

    for (let i = 0; i < passwordLength - funcAr.length; i++) {
        let r = getRandomNumber(0, funcAr.length);
        password += funcAr[r]();

    }
    console.log("length code ");


    password = shufflePassword(Array.from(password));




    inputPassword.value = password;

    calculateStrength();

});





//  

