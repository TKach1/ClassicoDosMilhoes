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
    px: 1100,
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
    dir: 8,
    diry: 8,
}

pincel.font = "20px Arial";
var pts1 = 0;
var pts2 = 0;
var score1 = pincel.fillText("Score 1: " + pts1,100,50)
var score2 = pincel.fillText("Score 2: " + pts2,1100,50)
var roundover = pincel.fillText("Pressione espaço para iniciar",480,250)
var isPlaying = false;

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-

function moveBall() {// movimentação bola

    bola.px += bola.dir;
    bola.py += bola.diry;

    if(bola.px < jogador1.px){
        pts2 = pts2 + 1;
        isPlaying = false;
        roundover = pincel.fillText("Pressione espaço para iniciar",480,250)
        setdefault();
        clearInterval(refreshIntervalId);
    }
    if(bola.px > jogador2.px){
        pts1 = pts1 + 1;
        isPlaying = false;
        roundover = pincel.fillText("Pressione espaço para iniciar",480,250)
        setdefault();
        clearInterval(refreshIntervalId);
    }
}

function setdefault(){
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
        px: 1100,
        py: 200,
        tx: 30,
        ty: 250,
        dir: 0,
    }
}

function colisionBall() { // colision
    if(bola.py + bola.ty >= jogador1.py && bola.py <= jogador1.py + jogador1.ty && bola.px <= jogador1.px + jogador1.tx ){
        bola.dir *= -1
    }
    if(bola.py + bola.ty >= jogador2.py && bola.py <= jogador2.py + jogador2.ty && bola.px >= jogador2.px - jogador2.tx ){
        bola.dir *= -1
    }
    if(bola.py <= 0){
        bola.diry *= -1
    }
    if(bola.py >= canvas.height - bola.ty){
        bola.diry *= -1
    }
}

function print() {// desenhar na tela
    score1 = pincel.fillText("Score 1: " + pts1,100,50);
    score2 = pincel.fillText("Score 2: " + pts2,1100,50);
    pincel.fillRect(jogador1.px, jogador1.py, jogador1.tx, jogador1.ty);
    pincel.fillRect(jogador2.px, jogador2.py, jogador2.tx, jogador2.ty);
    pincel.fillRect(bola.px, bola.py, bola.tx, bola.ty);
}

//MOVIMENTAÇÃO JOGADOR 1 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e){
    if(e.keyCode === 87) { // W
        jogador1.dir = -8;
    }
    else if(e.keyCode === 83) { //S
        jogador1.dir = +8;
    }
})

document.addEventListener("keyup", function(e){
    if(e.keyCode === 87) { // W
        jogador1.dir = 0;
    }
    else if(e.keyCode === 83) { // S
        jogador1.dir = 0;
    }
})

function MovePlayer1(){
    if (jogador1.py < 0){
        jogador1.py = 0;
    }else if (jogador1.py > (canvas.height - jogador1.ty)){
        jogador1.py = canvas.height - jogador1.ty;
    }
    jogador1.py += jogador1.dir;
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-
//MOVIMENTAÇÃO JOGADOR 2 =-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e){
    if(e.keyCode === 38) { //setinha Cima
        jogador2.dir = -8;
    }
    else if(e.keyCode === 40) { //setinha Baixo
        jogador2.dir = +8;
    }
})


document.addEventListener("keyup", function(e){
    if(e.keyCode === 38) { //setinha Cima
        jogador2.dir = 0;
    }
    else if(e.keyCode === 40) { //setinha Baixo
        jogador2.dir = 0;
    }
})


function MovePlayer2(){
    if (jogador2.py < 0){
        jogador2.py = 0;
    }else if (jogador2.py > (canvas.height - jogador2.ty)){
        jogador2.py = canvas.height - jogador2.ty;
    }
    jogador2.py += jogador2.dir;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-

document.addEventListener("keydown", function(e){
    if(e.keyCode === 32 && isPlaying === false) { //Espaço
        Start();
        isPlaying = true;
    }
})

//MAIN CODE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-
function Main(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    print();
    colisionBall();
    moveBall();
    MovePlayer1();
    MovePlayer2();
    requestAnimationFrame(Main);
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function Start(){
    var refreshIntervalId = setInterval(Main(), 20);
}

print();