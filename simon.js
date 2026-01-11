let gameSeq = [];
let userseq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

let btns = ["yellow","red","purple","green"];

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    },250);
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

function checkAns(idx){
    if(userseq[idx] === gameSeq[idx]){
        if(userseq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap or Click any button to start`;
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "lightgreen";
        },150);
        reset();
    }
}

function btnPress(){
    if(started === false){
        started = true;
        levelUp();
        return;
    }

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
