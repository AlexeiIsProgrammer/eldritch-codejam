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

let fCheck = true;
let sCheck = true;
let tCheck = true;

card.addEventListener("click", function () {
    // if(fCheck) {
    //     fCheck = onStep(firstStep);
    //     console.log('1'+fCheck);
    // }
    // else if(sCheck) {
    //     console.log('2'+fCheck);
    //     sCheck = onStep(secondStep);
    // } else if(tCheck) {
    //     console.log('3'+sCheck);
    //     tCheck = onStep(thirdStep);
    // }
    // else {
    //     alert('shuffled');
    //     fCheck = true;
    //     sCheck = true;
    //     tCheck = true;
    // }

    if(!onStep(firstStep)) {
        console.log("secondComplete");
        if(!onStep(secondStep)) {
            console.log("thirdComplete");
            if(!onStep(thirdStep)) {
                console.log("thirdComplete");
                alert('isShuffled');
            }
        }
    }
    
});

let isGreenFull = false,
        isBrownFull = false,
        isBlueFull = false;

function generateRandomNum() {
    return Math.floor(Math.random() * (4 - 1) + 1);
}

function onStep (stepName) {
    greenCards = +stepName.children[0].innerHTML;
    brownCards = +stepName.children[1].innerHTML;
    blueCards = +stepName.children[2].innerHTML;
    
    while (true) {

        if(isGreenFull === true && isBrownFull === true && isBlueFull === true)
            break;

        console.log(`${isBlueFull} ${isGreenFull} ${isBrownFull}`);
        const random = generateRandomNum();

        if(random === 1 && !isGreenFull) {
            console.log("Call green");
            if(colorIsGreen(stepName)){
                return 1;
            }
            else {
                isGreenFull = true;
            }
            
            
        }
        else if(random === 2 && !isBrownFull){
            console.log("Call brown"); 
            if(colorIsBrown(stepName)){
                return 1; 
            } else {
                isBrownFull = true;
            }
    
        } else if(random === 3 && !isBlueFull){
            console.log("Call blue");
            if(colorIsBlue(stepName)){
                return 1; 
            } else {
                isBlueFull = true;
            }
        } 
        
    }

        isBlueFull = false;
        isGreenFull = false;
        isBrownFull = false;
        console.log("All fulled");
        return 0;

}

function colorIsGreen (stepName) {
    if(greenCards !== 0) {
        changeCard(greenArray[0].cardFace);
        greenArray.shift();
        stepName.children[0].innerHTML = --greenCards;
        return true;
    } else {
        return false;
    }
}

function colorIsBrown (stepName) {
    if (brownCards !== 0) {
        changeCard(brownArray[0].cardFace);
        brownArray.shift();
        stepName.children[1].innerHTML = --brownCards;
        return true;
    } else {
        return false;
    }
}

function colorIsBlue (stepName) {
    if (blueCards !== 0) {
        changeCard(blueArray[0].cardFace);
        blueArray.shift();
        stepName.children[2].innerHTML = --blueCards;
        return true;
    } else {
        return false;
    }
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
