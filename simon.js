let gameSeq = [];
let userseq = [];
let started = false;//yani abhi game start nhi hua
let level = 0;
let h2 = document.querySelector("h2");

let btns = ["yellow","red","purple","green"];

//step 1):
document.addEventListener("keypress", function (){
    if(started == false){//game ek hi bar hi strt ho sakta he
        console.log("game is started");
        started =true;
        levelUp();//ab game satrt ho chuka he to lvel up kardo
    }
});


//stepc2):
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function() {
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout( function() {
        btn.classList.remove("userFlash");
    },250);
}
function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomIndx = Math.floor(Math.random() *3);
    let randColor = btns[randomIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}


function checkAns(idx){
// console.log("user level :",level);
if( userseq[idx] === gameSeq[idx]){
    if(userseq.length == gameSeq.length){
        setTimeout(levelUp,1000);
    }
}else{
    h2.innerHTML = `Gaem Over! Your score was <b>${level}</b> <br>press Ay key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
}
}



//sterp3):
function btnPress (){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

//step4)
function reset() {
    started = false;
    gameSeq = [];
    userseq = [];
    level = 0;
}