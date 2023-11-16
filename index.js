const gameNumberElement = document.querySelector(".game-number");
const gameFeedBackElement = document.querySelector(".game-feedback");
const gameGuessElement = document.querySelector(".game-guess");
const gameHealthNumberElement = document.querySelector(".health-number");
const gameHealthElement = document.querySelector(".health-bar");
const gamePlayBtn = document.querySelector(".game-button-play");
const gameResetBtn = document.querySelector(".game-button-reset");

let gameHealth;
let gameOver;
let randomNum;

const updateData = (element, message) =>{
    element.textContent = message;
}
//initalize the game
const init = () =>{
    gameHealth = 100;
    gameOver = false;
    randomNum = Math.trunc(Math.random() * 10) + 1;
    updateData(gameHealthNumberElement, "100%");
    updateData(gameFeedBackElement, "What is your guess?");
    updateData(gameNumberElement, "?");
    gameGuessElement.value = "";
    gameHealthElement.style.background = "green";
    gameHealthElement.style.width = `${gameHealth}%`;
};

init();


const playGame = () =>{
    const guess = Number(gameGuessElement.value);
    if(!gameOver){
        if(guess <= 0 || guess >10){
            updateData(gameFeedBackElement, "Please enter a valid number!");
        }else if(guess == randomNum){
            gameNumberElement.textContent = randomNum;
            updateData(gameFeedBackElement, "You Won!")
        }else if(guess !== randomNum){
            if(gameHealth > 20){
                updateData(gameFeedBackElement, guess > randomNum ?
                "Try a lower number!" : "Try a higher number!");
                gameHealth -= 20;
                gameHealthElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, `${gameHealth}%`);
                if(gameHealth < 50){
                    gameHealthElement.style.background = "red";
                }
            }else{
                updateData(gameFeedBackElement, "Game Over!");
                gameHealth = 0;
                gameHealthElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, "0%");
                gameOver = true;
            }
        }
    }else{
        updateData(gameFeedBackElement, "Reset to play again!");
    }
};

gamePlayBtn.addEventListener("click", playGame);
gameResetBtn.addEventListener("click", init);