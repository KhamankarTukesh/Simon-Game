let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Start game on button click
startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

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
    }, 200);
}

function levelUp() {
    userSeq = []; // Reset user sequence for every new level
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Score: <b>${level}</b> <br> Press any key or Start to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#2c3e50";
        }, 200);
        reset();
    }
}

function btnPress() {
    if (!started) return; // Prevent clicks before game starts

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}