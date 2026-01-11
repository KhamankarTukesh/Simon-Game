let gameSeq = [];
let userseq = [];
let started = false; // abhi game start nahi hua
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn"); // start button

let btns = ["yellow", "red", "purple", "green"];

// STEP 1: GAME START ON BUTTON CLICK
startBtn.addEventListener("click", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

// STEP 2
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndx = Math.floor(Math.random() * 4); // FIX
    let randColor = btns[randomIndx];
    let randBtn = document.querySelector(`.${randColor}`); // FIX

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameSeq[idx]) {
        if (userseq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start button to restart`; // FIX
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// STEP 3
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // FIX
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// STEP 4
function reset() {
    started = false;
    gameSeq = [];
    userseq = [];
    level = 0;
}
