const clickSound = new Audio('sounds/click.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');
const backgroundMusic = new Audio('sounds/background.mp3');

// Background Music Settings
backgroundMusic.loop = true;     // Loop the background music
backgroundMusic.volume = 0.5;    // Set volume (0.0 to 1.0)

function playClickSound() {
    clickSound.currentTime = 0; 
    clickSound.play();
}

// Play Game Over Sound
function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();

    // Pause Background Music Temporarily
    backgroundMusic.pause();
}

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0; // Persistent high score

// Update High Score Display on Page Load
document.getElementById('high-score').textContent = highScore;

// Function to Update Score
function updateScore() {
    currentScore++;
    document.getElementById('current-score').textContent = currentScore;

    // Update High Score if Beaten
    if (currentScore > highScore) {
        highScore = currentScore;
        document.getElementById('high-score').textContent = highScore;
        localStorage.setItem('highScore', highScore); // Save to local storage
    }
}

let h2 = document.querySelector("h2");

//Function for starting the game
function startGame() {
    if(started == false) {
        backgroundMusic.play(); //Play background music    
        console.log("Game is started");
        started = true;

        levelUp();
    }
}

// For starting game on desktop
document.addEventListener('keydown', startGame);

// For starting game on mobile
let startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', startGame);

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randIdx);
    console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function ansCheck(idx) {
    // let idx = level-1;
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
            updateScore();
        }
    } else {
        playGameOverSound();
        currentScore = 0;
        document.getElementById('current-score').textContent = currentScore;
        h2.innerHTML = `Game Over!<br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#f4f4f4";
        },200);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);
    playClickSound();

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    ansCheck(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}