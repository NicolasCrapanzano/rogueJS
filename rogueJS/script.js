class Entity {
    constructor(maxHp,currentHp,damage,attackSpeed,initialPosition) {
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.positionX = initialPosition[0];
        this.positionY = initialPosition[1];
    }
    move(positionX = 0,positionY = 0){ //TILE based movement
        //check if it can move to desired pos
        //check if colliding with enemy, call attack
        if(positionX !== 0){
            console.log("Previous positionX: ",positionX);
            this.positionX = this.positionX + positionX;
            console.log("New positionX: ",this.positionX);
        }
        if(positionY !== 0){
            console.log("Previous positionY: ",positionY);
            this.positionY = this.positionY + positionY;
            console.log("New positionY: ",this.positionY);
        }
    }
    attack(){

    }
    get position(){
        return [this.positionX,this.positionY];
    }
    get health(){
        return [this.currentHp,this.maxHp]
    }
    set recieveDamage(damage){
        this.currentHp = this.currentHp - damage;
        if(this.currentHp <= 0){
            console.log("you are dead");
        }
    }
}

class Player extends Entity {

}

class Map {
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.mapSize = (this.width * this.height);
        this.map = [];
        this.mapContent = [];
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;
    }

    generateMap(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                //set map layout
                this.map[(y * this.width) + x] = 1;
                if(y === 0 || 
                    y === (this.height - 1) || 
                    x === 0 ||
                    x === (this.width - 1)
                    )
                {
                    this.map[(y * this.width) + x] = 2;
                }else{
                    //add content to map (items, entities)
                    let rand = Math.floor(Math.random() * 100);
                    if(rand > 3 && rand <5){
                        //assign random item as id
                        this.mapContent[(y * this.width) + x] = 1;
                    }
                }
            }
        }
        try{
            this.buildHtmlTableMap();
        }catch (err){
            console.error(err);
        }
    }

    buildHtmlTableMap(){
        let tableMain;
        try{
            tableMain = document.getElementById("tableMain");
        }catch (err){
            console.error(err);
            return;
        }
        
        for(let y = 0; y < this.height; y++){
            let tableRow = document.createElement("tr");
            for(let x = 0; x < this.width; x++){
                let tableCell = document.createElement("th");
                tableCell.id = this.getMapCoordinates(x,y);
                
                //Display layout
                switch (this.map[this.getMapCoordinates(x,y)]) {
                    case 0:
                        tableCell.classList.add("void");
                        break;
                    case 1:
                        tableCell.classList.add("ground");
                        break;
                    case 2:
                        tableCell.classList.add("wall");
                        break;
                    case 3:
                        tableCell.classList.add("door");
                        break;
                    default:
                        break;
                }
                //Display items
                switch (this.mapContent[this.getMapCoordinates(x,y)]) {
                    case 0:
                        tableCell.innerHTML = "P";
                        tableCell.style.color = "blue";
                        break;
                    case 1:
                        tableCell.innerHTML = "p";
                        break;
                    case 2:
                        tableCell.innerHTML = "S";
                        break;
                    case 3:
                        tableCell.innerHTML = "b";
                        break;
                    default:
                        break;
                }
                if(x === this.game){

                }
                tableRow.append(tableCell);
            }
            tableMain.append(tableRow);
        }
    }
    updateHtmlTableMap(){
        let tableMain;
        try{
            tableMain = document.getElementById("tableMain");
        }catch (err){
            console.error(err);
            return;
        }
        
        let sec = Math.floor(Date.now()/1000);
        if(sec != this.currentSecond){
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        }else{
            this.frameCount++;
        }
        for(let y = 0; y < this.height; y++){

            for(let x = 0; x < this.width; x++){
                let tableCell = document.getElementById(this.getMapCoordinates(x,y));
                //Display layout
                
                switch (this.map[this.getMapCoordinates(x,y)]) {
                    case 0:
                        tableCell.classList.add("void");
                        break;
                    case 1:
                        tableCell.classList.add("ground");
                        break;
                    case 2:
                        tableCell.classList.add("wall");
                        break;
                    case 3:
                        tableCell.classList.add("door");
                        break;
                    default:
                        break;
                }
                //Display items
                switch (this.mapContent[this.getMapCoordinates(x,y)]) {
                    case 0:
                        tableCell.innerHTML = "P";
                        tableCell.style.color = "blue";
                        break;
                    case 1:
                        tableCell.innerHTML = "p";
                        break;
                    case 2:
                        tableCell.innerHTML = "S";
                        break;
                    case 3:
                        tableCell.innerHTML = "b";
                        break;
                    default:
                        break;
                }
            }
        }
        
    }
    get getMapSize(){
        return (this.mapSize);
    }
    get mapCenter(){
        return this.getMapCoordinates(this.width/2,this.height/2);
    }
    getMapCoordinates(x,y){
        return (y * this.width) + x;
    }
    getMapContentOnPos(position){
        return this.mapContent[position];
    }
    setMapContent(newContent,position){
        this.mapContent[position] = newContent;
    }
}

class Game{
    constructor(){
        this.player = undefined;
        this.map = undefined;
    }

    startGame(){
        this.player = new Entity(100,100,10,1,[0,0]);
        this.map = new Map(30,20);
        let playerPos = this.player.position;
        window.addEventListener("keydown", event => this.keyInput(event) );

        this.map.generateMap();
        this.map.setMapContent(0,this.map.getMapCoordinates(playerPos[0],playerPos[1]));
        if(this.player != undefined){
            this.gameLoop();
        }else{
            console.log("something went wrong, and character wasn't created; player: ",this.player);
        }
    }

    keyInput(event){
        
        if(event.code === "KeyW"){
            console.log("move forwards");
            this.player.move(0,1);
        }else if(event.code === "KeyS"){
            console.log("move backwards")
            this.player.move(0,-1);
        }

        if(event.code === "KeyD"){
            console.log("move right")
            this.player.move(1);
        }else if(event.code === "KeyA"){
            console.log("move left");
            this.player.move(-1);
        }
    }
    gameLoop(){
        
        let playerPos = this.player.position;
        //console.log(playerPos);
        
    }
}

