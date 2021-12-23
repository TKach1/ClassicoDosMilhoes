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
}

pincel.font = "20px Arial";
var pts1 = 0;
var pts2 = 0;
var score1 = pincel.fillText("Score 1: " + pts1,100,50)
var score2 = pincel.fillText("Score 2: " + pts2,1100,50)

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-

function moveBall() {// movimentação bola
    if(bola.px >= (jogador2.px-jogador2.tx)){
        bola.dir *=-1;
    }
    if(bola.px <= (jogador1.px+jogador1.tx)){
        bola.dir *=-1;
    }
    bola.px += bola.dir;
}

function print() {// desenhar na tela
    score1 = pincel.fillText("Score 1: " + pts1,100,50);
    score2 = pincel.fillText("Score 2: " + pts2,1100,50);
    pincel.fillRect(jogador1.px, jogador1.py, jogador1.tx, jogador1.ty);
    pincel.fillRect(jogador2.px, jogador2.py, jogador2.tx, jogador2.ty);
    pincel.fillRect(bola.px, bola.py, bola.tx, bola.ty);
}

//MAIN CODE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-
function Main(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    print();
    moveBall();
    MovePlayer1();
    MovePlayer2();
    requestAnimationFrame(Main);
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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

setInterval(Main(), 20); // Run game loop