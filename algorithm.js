import difficulties from "./data/difficulties.js";
import ancientsData from "./data/ancients.js";

import blueCardsData from "./data/mythicCards/blue/index.js";

import brownCardsData from "./data/mythicCards/brown/index.js";

import greenCardsData from "./data/mythicCards/green/index.js";

let isChooseDrevni = false;
let isChooseLevel = false;
let isOpenSteps = false;

let currentDrevni = null;
let currentLevel = null;

const drevnie = document.getElementsByClassName("drevni");
const levels = document.getElementsByClassName("level");
const mixButton = document.querySelector(".tasovka");

const easyCards = shuffle(blueCardsData.filter(item => item.difficulty === 'easy')
    .concat(brownCardsData.filter(item => item.difficulty === 'easy')
    .concat(greenCardsData.filter(item => item.difficulty === 'easy'))));

const normalCards = shuffle(blueCardsData.filter(item => item.difficulty === 'normal')
    .concat(brownCardsData.filter(item => item.difficulty === 'normal')
    .concat(greenCardsData.filter(item => item.difficulty === 'normal'))));

const hardCards = shuffle(blueCardsData.filter(item => item.difficulty === 'hard')
    .concat(brownCardsData.filter(item => item.difficulty === 'hard')
    .concat(greenCardsData.filter(item => item.difficulty === 'hard'))));

console.log(easyCards);
console.log(normalCards);
console.log(hardCards);

for (let i = 0; i < drevnie.length; i++) {
    const element = drevnie[i];
    element.style.backgroundImage = `url(${ancientsData[i].cardFace})`;
    element.style.backgroundSize = "100% 100%";
    element.innerHTML = i;

    element.addEventListener("click", function () {
        if(!isChooseDrevni) {
            document.querySelector(".levelContainer").style.visibility = "visible";
            isChooseDrevni = true;
        }
        else{
            document.querySelector(".currentDrevni").classList.toggle("currentDrevni");
        }

        if(isOpenSteps) {
            document.querySelector(".randomWrapper").style.visibility = "hidden";
            isOpenSteps = false;
        }

        currentDrevni = element.innerHTML;
        element.classList.toggle("currentDrevni");
    });
}

for (let i = 0; i < levels.length; i++) {
    const element = levels[i];
    element.innerHTML = difficulties[i].id;
    element.addEventListener("click", function () {
        if(!isChooseLevel) {
            document.querySelector(".tasovka").style.visibility = "visible";
            isChooseLevel = true;
        }
        else{
            document.querySelector(".currentLevel").classList.toggle("currentLevel");
        }

        if(isOpenSteps) {
            document.querySelector(".randomWrapper").style.visibility = "hidden";
            isOpenSteps = false;
        }

        currentLevel = element.innerHTML;
        element.classList.toggle("currentLevel");
    });
}

const firstStep = document.querySelector(".stepContainer.one");
const secondStep = document.querySelector(".stepContainer.two");
const thirdStep = document.querySelector(".stepContainer.three");

let levelArray;

let greenArray;
let brownArray;
let blueArray;

const card = document.querySelector('.shapka.noreverse');

mixButton.addEventListener("click", function () {
    card.style.backgroundImage = `url('./assets/mythicCardBackground.png')`;
    document.querySelector(".randomWrapper").style.visibility = "visible";
    isOpenSteps = true;

    firstStep.children[0].innerHTML = ancientsData[currentDrevni].firstStage.greenCards;
    firstStep.children[1].innerHTML = ancientsData[currentDrevni].firstStage.brownCards;
    firstStep.children[2].innerHTML = ancientsData[currentDrevni].firstStage.blueCards;

    secondStep.children[0].innerHTML = ancientsData[currentDrevni].secondStage.greenCards;
    secondStep.children[1].innerHTML = ancientsData[currentDrevni].secondStage.brownCards;
    secondStep.children[2].innerHTML = ancientsData[currentDrevni].secondStage.blueCards;

    thirdStep.children[0].innerHTML = ancientsData[currentDrevni].thirdStage.greenCards;
    thirdStep.children[1].innerHTML = ancientsData[currentDrevni].thirdStage.brownCards;
    thirdStep.children[2].innerHTML = ancientsData[currentDrevni].thirdStage.blueCards;

    chooseRandomCard();
});

const cardChanger = document.querySelector('.shapka.reverse');

function chooseRandomCard() {
    switch(currentLevel) {
        case 'superEasy':
            levelArray = easyCards.concat(normalCards);
            break;
        case 'easy':
            levelArray = shuffle(easyCards.concat(normalCards));
            break;
        case 'normal':
            levelArray = shuffle(easyCards.concat(normalCards.concat(hardCards)));
            break;
        case 'hard':
            levelArray = shuffle(hardCards.concat(normalCards));
            break;
        case 'superHard':
            levelArray = hardCards.concat(normalCards);
            break;
    }  

    const greenNumbers = ancientsData[currentDrevni].firstStage.greenCards
    + ancientsData[currentDrevni].secondStage.greenCards 
    + ancientsData[currentDrevni].thirdStage.greenCards;

    const brownNumbers = ancientsData[currentDrevni].firstStage.brownCards
    + ancientsData[currentDrevni].secondStage.brownCards 
    + ancientsData[currentDrevni].thirdStage.brownCards;

    const blueNumbers = ancientsData[currentDrevni].firstStage.blueCards
    + ancientsData[currentDrevni].secondStage.blueCards 
    + ancientsData[currentDrevni].thirdStage.blueCards;

    greenArray = shuffle(levelArray.filter(item => item.color === 'green').slice(0, greenNumbers));
    brownArray = shuffle(levelArray.filter(item => item.color === 'brown').slice(0, brownNumbers));
    blueArray = shuffle(levelArray.filter(item => item.color === 'blue').slice(0, blueNumbers));
}

let greenCards;
let brownCards;
let blueCards;

card.addEventListener("click", function () {
    console.log("Call");
    if(onFirstStep() === -1) {
        console.log("КЛИК!");
        if(onSecondStep() === -1) {
            if(onThirdStep() === -1) {
                card.style.backgroundImage = "none";
                alert("Shuffled!");
            }   
        }
    }
    else {
        console.log("КЛИК!");
    }
});

function onFirstStep () {
    greenCards = +firstStep.children[0].innerHTML;
    brownCards = +firstStep.children[1].innerHTML;
    blueCards = +firstStep.children[2].innerHTML;

    if(greenCards !== 0) {
        changeCard(greenArray[0].cardFace);
        greenArray.shift()
        firstStep.children[0].innerHTML = --greenCards;
    } else if (brownCards !== 0) {
        changeCard(brownArray[0].cardFace);
        brownArray.shift()
        firstStep.children[1].innerHTML = --brownCards;
    } else if (blueCards !== 0) {
        changeCard(blueArray[0].cardFace);
        blueArray.shift()
        firstStep.children[2].innerHTML = --blueCards;
    } else {
        return -1;
    }
    return 0;
}

function onSecondStep () {
    greenCards = +secondStep.children[0].innerHTML;
    brownCards = +secondStep.children[1].innerHTML;
    blueCards = +secondStep.children[2].innerHTML;

    if(greenCards !== 0) {
        changeCard(greenArray[0].cardFace);
        greenArray.shift()
        secondStep.children[0].innerHTML = --greenCards;
    } else if (brownCards !== 0) {
        changeCard(brownArray[0].cardFace);
        brownArray.shift()
        secondStep.children[1].innerHTML = --brownCards;
    } else if (blueCards !== 0) {
        changeCard(blueArray[0].cardFace);
        blueArray.shift()
        secondStep.children[2].innerHTML = --blueCards;
    } else {
        return -1;
    }
    return 0;
}

function onThirdStep () {
    greenCards = +thirdStep.children[0].innerHTML;
    brownCards = +thirdStep.children[1].innerHTML;
    blueCards = +thirdStep.children[2].innerHTML;

    if(greenCards !== 0) {
        changeCard(greenArray[0].cardFace);
        greenArray.shift()
        thirdStep.children[0].innerHTML = --greenCards;
    } else if (brownCards !== 0) {
        changeCard(brownArray[0].cardFace);
        brownArray.shift()
        thirdStep.children[1].innerHTML = --brownCards;
    } else if (blueCards !== 0) {
        changeCard(blueArray[0].cardFace);
        blueArray.shift()
        thirdStep.children[2].innerHTML = --blueCards;
    } else {

        return -1;
    }
    return 0;
}

function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function changeCard (url) {
    cardChanger.style.backgroundImage = `url(${url})`;
}
