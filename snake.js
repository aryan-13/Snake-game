function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    ces = 67;
    gameOver = false;
    score = 0;

    //CREATE AN IMAGE OBJECT FOR FOOD
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    food = getRandomFood();

    snake = {
        init_len:5,
        color:"black",
        cells:[],
        direction:"right",
        

        createSnake: function(){
            for(var i = this.init_len; i>0;i--){
                this.cells.push({x:i, y:0});
            }
        },
        drawSnake: function(){

            for(var i = 0; i < this.cells.length; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*ces, this.cells[i].y*ces, ces-3, ces-3);

            }
        },

        updateSnake: function(){
            
           // console.log("Update snake according to the direction property");
           //CHECK IF THE SNAKE HAS EATEN THE FOOD
           //IF YES INCREASE THE LENGTH IF THE SNAKE
           //gENERAT NEW FOOD
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX === food.x && headY === food.y){
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }else{
                this.cells.pop();

            }
             
             var nextX, nextY;
            if(this.direction == "right"){
                nextX = headX +1;
                nextY = headY;
            }else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY+1;
            } else if (this.direction == "up") {
                nextX = headX;
                nextY = headY-1;
            }
            this.cells.unshift({x: nextX, y: nextY})

            var last_x = Math.round(H/ces);
            var last_y = Math.round(W/ces);

            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                gameOver = true;
            }
        }
    };

    snake.createSnake();
    // ADD EVENT LISTENER ON THE DOCUMENT OBJECT
    function KeyPressed(e){
        //CONDITIONAL STATEMENTS
        if(e.key =="ArrowRight"){
            snake.direction = "right";
        } else if (e.key == "ArrowLeft"){
            snake.direction = "left";
        } else if (e.key == "ArrowDown"){
            snake.direction = "down";
        }else{
            snake.direction = "up";

        }
        console.log(snake.direction);
    }
    document.addEventListener('keydown', KeyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();


    pen.drawImage(food_img,food.x*ces,food.y*ces,ces,ces);
    
    pen.drawImage(trophy, 23, 20, ces,ces);
    pen.fillStyle = "black";
    pen.font= "30px Roboto";
    pen.fillText(score, 50, 50);
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - ces) / ces);
    var foodY = Math.round(Math.random() * (H - ces) / ces);
   
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;

}

function update() {
    snake.updateSnake();
}

function gameloop() {
    if(gameOver==true){
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}
init();
var f = setInterval(gameloop,100);