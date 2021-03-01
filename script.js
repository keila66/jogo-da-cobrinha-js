//declaracao de variaveis
let canvas = document.getElementById('snake');//criar elemento que irá rodar o jogo
let context = canvas.getContext('2d');//renderiza o desenho que vai dentro do canvas
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let direction = 'right'; //direcao inicial da cobrinha
let pontos = 0;

//comida que aparce aleatoriamente na tela
let food = {

    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box

}

snake[0] = {

    x: 8 * box,
    y: 8 * box

}
/*funcoes do jogo */

//funcao que  desenha o canvas
function criarBG() {

    context.fillStyle = '#44475a';//cor do background
    context.fillRect(0, 0, 16 * box, 16 * box);//desenha o quadrado usando x e y e a largura e altura setadas

}

//funcao que desenha os quadradinhos da cobrinha
function criarCobrinha() {

    for(i = 0; i < snake.length; i++) {

        context.fillStyle = '#50fa7b';
        context.fillRect(snake[i].x, snake[i].y, box, box)

    }
}

//funcao desenha a comida
function criarComida() {
    context.fillStyle = '#ff79c6';
    context.fillRect(food.x, food.y, box, box);
}

//funcao que captura a entrada do teclado
function update (event) {

    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

    //funcoes chamadas ao iniciar o jogo
    criarBG();
    criarCobrinha();
    criarComida();

    //se cobrinha tocar na borda ela retorna pelo lado oposto
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //verifica se a cobbrinha tocou nela mesma
    for(i = 1; i < snake.length; i++) {

        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {

            clearInterval(jogo);
            alert('   Game Over :(  \nVocê fez ' + pontos + ' pontos!');

        }
    }

    //posicao da cobrinha ao iniciar o jogo
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //movimento da cobrinha
    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {

        snake.pop();

    } else {
        //cobrinha come a comidinha e ela (comida) aparece em outro local
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box

        pontos++;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);//método unshift adiciona como primeiro quadradinho da cobrinha
    

}

let jogo = setInterval(iniciarJogo, 100);

//evento acionado ao apertar tecla arrow
document.addEventListener('keydown', update);
