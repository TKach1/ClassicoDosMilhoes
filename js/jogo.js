var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d');

/*
var jogador1 = pincel.fillRect(100,200,30,250);
var jogador2 = pincel.fillRect(1100,200,30,250);
var bola = pincel.fillRect(600,300,30,30);
*/
var jogar = true;
var jogador1 = {
    px: 100,
    py: 200,
    tx: 30,
    ty: 250,
}

var jogador2 = {
    px: 1100,
    py: 200,
    tx: 30,
    ty: 250,
}

var bola = {
    px: 600,
    py: 300,
    tx: 30,
    ty: 30,
}
pincel.font = "20px Arial";
var pts1 = 0;
var pts2 = 0;
var score1 = pincel.fillText("Score 1: " + pts1,100,50)
var score2 = pincel.fillText("Score 2: " + pts2,1100,50)
var speed = 2;
function print() {
    /*pincel.clearRect(0, 0, canvas.width, canvas.height);
    if(bola.px >= (jogador2.px-jogador2.tx)){
        speed = speed * -1;
    }
    if(bola.px <= (jogador1.px+jogador1.tx)){
        speed = speed * -1;
    }
    bola.px += speed;*/
    score1 = pincel.fillText("Score 1: " + pts1,100,50);
    score2 = pincel.fillText("Score 2: " + pts2,1100,50);
    pincel.fillRect(jogador1.px, jogador1.py, jogador1.tx, jogador1.ty);
    pincel.fillRect(jogador2.px, jogador2.py, jogador2.tx, jogador2.ty);
    pincel.fillRect(bola.px, bola.py, bola.tx, bola.ty);
    //requestAnimationFrame(print);
}
print();