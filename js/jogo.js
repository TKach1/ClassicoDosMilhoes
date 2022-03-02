var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d');

/*
var jogador1 = pincel.fillRect(100,200,30,250);
var jogador2 = pincel.fillRect(1100,200,30,250);
var bola = pincel.fillRect(600,300,30,30);
*/

//Variaveis
var jogar = true;
var jogador1 = {
    px: 100,
    py: 200,
    tx: 30,
    ty: 250,
    dir: 0,
}

var jogador2 = {
    px: 1149,
    py: 200,
    tx: 30,
    ty: 250,
    dir: 0,
}

var bola = {
    px: 600,
    py: 300,
    tx: 30,
    ty: 30,
    dir: 4,
    diry: 4,
}

var powerup = {
    px: 0,
    py: 0,
    tx: 100,
    ty: 100,
    id: 0,
    onScreen: false,
    isPicked: false,
}
var mouse = {
    x: 0,
    y: 0
}

pincel.font = "20px Arial";
var pts1 = 0;
var pts2 = 0;
var score1 = pincel.fillText("Score 1: " + pts1, 100, 50)
var score2 = pincel.fillText("Score 2: " + pts2, 1100, 50)
var roundover = pincel.fillText("Pressione espaço para iniciar", 480, 250)
var isPlaying = false;
var state = "menu";

var startTime, endTime;

var seconds;
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function moveBall() { // movimentação bola

    bola.px += bola.dir;
    bola.py += bola.diry;

    if (bola.px <= -bola.tx) {
        if (powerup.isActive && powerup.id == 1) {
            pts2 = pts2 + 1;
            powerup.isActive = false;
        }
        pts2 = pts2 + 1;
        isPlaying = false;
        roundover = pincel.fillText("Pressione espaço para iniciar", 480, 250)
        setdefault();
        state = "idle";
        // clearInterval(refreshIntervalId);
    }
    if (bola.px >= canvas.width) {
        if (powerup.isActive && powerup.id == 1) {
            pts1 = pts1 + 1;
        }
        pts1 = pts1 + 1;
        isPlaying = false;
        roundover = pincel.fillText("Pressione espaço para iniciar", 480, 250)
        setdefault();
        state = "idle";
        // clearInterval(refreshIntervalId);
    }
}

function setdefault() {
    bola.px = 600;
    bola.py = 300;
    jogador1 = {
        px: 100,
        py: 200,
        tx: 30,
        ty: 250,
        dir: 0,
    }
    jogador2 = {
        px: 1149,
        py: 200,
        tx: 30,
        ty: 250,
        dir: 0,
    }
}

function colisionBall() { // colision
    if (bola.py + bola.ty >= jogador1.py && bola.py <= jogador1.py + jogador1.ty && bola.px <= jogador1.px + jogador1.tx && bola.px >= jogador1.px) { //jogador 1 colission
        bola.dir *= -1
        if (bola.px < jogador1.px + jogador1.tx) {
            bola.px += bola.tx / 2;
        }
    }
    if (bola.py + bola.ty >= jogador2.py && bola.py <= jogador2.py + jogador2.ty && bola.px >= jogador2.px - jogador2.tx && bola.px <= jogador2.px) { //jogador 2 colission
        bola.dir *= -1
        if (bola.px > jogador2.px - jogador2.tx) {
            bola.px -= bola.tx / 2;
        }
    }
    if (bola.py <= 0) {
        bola.diry *= -1
    }
    if (bola.py >= canvas.height - bola.ty) {
        bola.diry *= -1
    }
    if (bola.py >= powerup.py && bola.py <= powerup.py + powerup.ty && bola.px >= powerup.px && bola.px <= powerup.px + powerup.tx && powerup.onScreen) {
        powerup.onScreen = false;
        powerup.isActive = true;
        startTime = new Date();
    }
}

// -=-=-=-=- Menu imgs -=-=-=-=-=-
var menuimg = new Image();
var jogarimg = new Image();
var creditosimg = new Image();
var trioimg = new Image();
menuimg.src = "img/MENU.png";
jogarimg.src = "img/JOGAR.png";
creditosimg.src = "img/CREDITOS.png";
trioimg.src = "img/TRIO.jpg";

var botaoTamanho = canvas.width / 5;

// -=-=-=-=- Base game imgs -=-=-=-=-=-
var vascoimg = new Image();
var bolaimg = new Image();
var flaimg = new Image();
var quadraimg = new Image();
vascoimg.src = 'img/raquetevasco.png';
flaimg.src = 'img/raqueteflamengo.png'
bolaimg.src = 'img/bola.png';
quadraimg.src = 'img/quadra.png';

// -=-=-=-=- Powerups imgs -=-=-=-=-=-=-
var VARpu = new Image();
VARpu.src = 'img/VAR.png';

// -=-=-=-=- Game Sounds -=-=-=-=-=-=-
var audio = new Audio("audio/TORCIDA VASCO.mp3");


function getPowerup(id) {
    powerup.px = getRandomInt(200, 1000);
    powerup.py = getRandomInt(100, canvas.height - 100);
    powerup.id = id;
    console.log("gerado power up com id: " + id);
}

function playTime() {
    endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    seconds = Math.round(timeDiff);

    if (seconds >= 10 && !powerup.onScreen && !powerup.isActive) {
        getPowerup(getRandomInt(1, 2));
        powerup.onScreen = true;
    }
}

function print() { // desenhar na tela
    playTime();
    pincel.drawImage(quadraimg, 0, 0, canvas.width, canvas.height);
    //pincel.fillRect(jogador1.px, jogador1.py, jogador1.tx, jogador1.ty);
    pincel.drawImage(vascoimg, jogador1.px, jogador1.py, jogador1.tx, jogador1.ty);
    //pincel.fillRect(jogador2.px, jogador2.py, jogador2.tx, jogador2.ty);
    pincel.drawImage(flaimg, jogador2.px, jogador2.py, jogador2.tx, jogador2.ty);
    //pincel.fillRect(bola.px, bola.py, bola.tx, bola.ty);
    pincel.drawImage(bolaimg, bola.px, bola.py, bola.tx, bola.ty);

    score1 = pincel.fillText("Score 1: " + pts1, 100, 50);
    score2 = pincel.fillText("Score 2: " + pts2, 1100, 50);

    if (powerup.id == 1 && powerup.onScreen) {
        pincel.drawImage(VARpu, powerup.px, powerup.py, powerup.tx, powerup.ty);
    }
}

// -=-=-=-=- Menu -=-=-=-=-=-=-
function printMenu() {
    pincel.drawImage(menuimg, 0, 0, canvas.width, canvas.height);
    pincel.drawImage(jogarimg, canvas.width / 2 - botaoTamanho / 2, canvas.height / 2 - 75, botaoTamanho, botaoTamanho);
    pincel.drawImage(creditosimg, canvas.width / 2 - botaoTamanho / 2, canvas.height / 2, botaoTamanho, botaoTamanho);
}

function printCreditos() {
    pincel.drawImage(menuimg, 0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "white";
    pincel.fillRect(canvas.width / 2 - 250, canvas.height / 2, 500, 200);
    pincel.fillStyle = "black";
    pincel.fillText("Feito por:", canvas.width / 2 - 30, canvas.height / 2 + 30);
    pincel.fillText("Nícolas Carvalho", canvas.width / 2 - 150, canvas.height / 2 + 90);
    pincel.fillText("Wesley Brandão", canvas.width / 2 - 150, canvas.height / 2 + 120);
    pincel.fillText("Lucas Freitas", canvas.width / 2 - 150, canvas.height / 2 + 150);
    pincel.fillText("Pressione espaço para voltar", canvas.width / 2 - 150, canvas.height - 50);
    pincel.drawImage(trioimg, canvas.width / 2 - 230, canvas.height / 2 + 10, 60, 180);

    //Nícolas dos Santos Carvalho
    //Wesley Brandão
    //Lucas Freitas
}

function buttonMenu() {
    if (
        mouse.x > canvas.width / 2 - botaoTamanho / 2 &&
        mouse.y > canvas.height / 2 + 15 &&
        mouse.x < canvas.width / 2 - botaoTamanho / 2 + botaoTamanho &&
        mouse.y < canvas.height / 2 + 75
    ) {
        state = "jogo";
    }

    if (
        mouse.x > canvas.width / 2 - botaoTamanho / 2 &&
        mouse.y > canvas.height / 2 + 90 &&
        mouse.x < canvas.width / 2 - botaoTamanho / 2 + botaoTamanho &&
        mouse.y < canvas.height / 2 + 150
    ) {
        state = "creditos";
    }
}


//MOVIMENTAÇÃO JOGADOR 1 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 87) { // W
        jogador1.dir = -8;
    } else if (e.keyCode === 83) { //S
        jogador1.dir = +8;
    }
})

document.addEventListener("keyup", function(e) {
    if (e.keyCode === 87) { // W
        jogador1.dir = 0;
    } else if (e.keyCode === 83) { // S
        jogador1.dir = 0;
    }
})

function MovePlayer1() {
    if (jogador1.py < 0) {
        jogador1.py = 0;
    } else if (jogador1.py > (canvas.height - jogador1.ty)) {
        jogador1.py = canvas.height - jogador1.ty;
    }
    jogador1.py += jogador1.dir;
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-
//MOVIMENTAÇÃO JOGADOR 2 =-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 38) { //setinha Cima
        e.preventDefault();
        jogador2.dir = -8;
    } else if (e.keyCode === 40) { //setinha Baixo
        e.preventDefault();
        jogador2.dir = +8;
    }
})


document.addEventListener("keyup", function(e) {
    if (e.keyCode === 38) { //setinha Cima
        e.preventDefault();
        jogador2.dir = 0;
    } else if (e.keyCode === 40) { //setinha Baixo
        e.preventDefault();
        jogador2.dir = 0;
    }
})


function MovePlayer2() {
    if (jogador2.py < 0) {
        jogador2.py = 0;
    } else if (jogador2.py > (canvas.height - jogador2.ty)) {
        jogador2.py = canvas.height - jogador2.ty;
    }
    jogador2.py += jogador2.dir;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 32 && state === "creditos") {
        state = "menu";
        e.preventDefault();
    }
    if (e.keyCode === 32 && state === "idle") {
        state = "jogo";
        if (pts1 >= 8 || pts2 >= 8) {
            state = "creditos";
        }
        e.preventDefault();
    }
    if (e.keyCode === 32 && isPlaying === false) { //Espaço
        Start();
        isPlaying = true;
        e.preventDefault();
    }
})

canvas.addEventListener("click", function(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    // console.log(mouse);

    if (state === "menu") {
        buttonMenu();
    }
})

//MAIN CODE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-
function Main() {
    switch (state) {
        case "menu":
            audio.pause();
            printMenu();
            break;
        case "creditos":
            printCreditos();
            break;
        case "jogo":
            audio.play();
            audio.loop = true;
            pincel.clearRect(0, 0, canvas.width, canvas.height);
            print();
            colisionBall();
            moveBall();
            MovePlayer1();
            MovePlayer2();
            break;
        case "idle":
            break;
        default:
            break;
    }
    requestAnimationFrame(Main);
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function Start() {
    startTime = new Date();
    var refreshIntervalId = setInterval(Main(), 20);
}
Start();