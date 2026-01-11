let gameSeq = [];
let userseq = [];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");

let btns = ["yellow","red","purple","green"];

startBtn.addEventListener("pointerdown", function () {
    if (started === false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIndx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameSeq[idx]) {
        if (userseq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Score: <b>${level}</b>`;
        reset();
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("pointerdown", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userseq = [];
    level = 0;
}
