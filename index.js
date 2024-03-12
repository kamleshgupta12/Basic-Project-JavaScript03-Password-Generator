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
const genPass = document.querySelector("#genBet");
const randomSymbols = '`-=\[];/.,?><":}{+_)(*&^%$#@!~|'
const allCheckBox = document.querySelectorAll("input[type=checkbox");


let password = "";
let passwordLength = 8;
let checkCount = 1;
// handleSlider();
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


slider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

