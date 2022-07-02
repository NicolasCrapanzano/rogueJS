class Entity {
    constructor(name="entity",x,y,maxHp,currentHp,damage=0,attackSpeed=0) {
        this.name = name;
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.positionX = x;
        this.positionY = y;

        this.ready = false;
        this.init();
    }

    init(){
        this.ready = true;
    }
    update(){

    }
    draw(){

    }

    move(positionX = 0,positionY = 0){ //TILE based movement
        //check if it can move to desired pos
        //check if colliding with enemy, call attack
        if(newX !== undefined){
            this.positionX += newX;
        }
        if(newY !== undefined){
            this.positionY += newY;
        }
    }

    changePosition(){
        this.positionX = newX;
        this.positionY = newY;
    }

    changeHealth(hp){
        this.actualhp += hp;
        
        if(this.actualhp > this.maxHp){
            this.actualhp = this.maxHp;
        }
        console.log(this.name, " HP has changed to: ",this.actualhp);
        
        if(this.actualhp <= 0){
            console.log(this.name, " is dead.");
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

    getName(){
        return this.name;
    }

    setName(newName){
        console.log("name changed from: ",this.name," to: ",newName);
        this.name = newName;
    }

    set maxHealth(hp){
        this.maxHp = hp;
    }
}

class Player extends Entity {
    constructor(name,x,y,maxhp,actualhp){
        super(name,x,y,maxhp,actualhp);
    }

    init(){
        window.addEventListener("keydown", event => this.getKey(event) );
    }
    getKey(event){
        if(event.code === "KeyW"){
            this.movePosition(0,1);
            console.log("move forwards",this.getPosition());
        }else if(event.code === "KeyS"){
            this.movePosition(0,-1);
            console.log("move backwards: ",this.getPosition())
            
        }

        if(event.code === "KeyD"){
            this.movePosition(1);
            console.log("move right",this.getPosition())
        }else if(event.code === "KeyA"){
            this.movePosition(-1);
            console.log("move left",this.getPosition());
        }
    }
}

class Map {
    constructor(width,height,mainObject){
        this.mainObj = mainObject;
        this.width = width;
        this.height = height;
        this.mapSize = (this.width * this.height);
        this.map = [];
        this.mapContent = [];
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;

        console.log(this.mainObject);
    }

    init(){

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
            //this.buildHtmlTableMap();
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
    Draw(){
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

}

class Game{
    constructor(){
        this.player = undefined;
        this.map = undefined;
        this.entities = [];
    }

    init(){

    }

    update(){
        //let playerPos = this.player.position;
    }

    startGame(){
        this.player = new Entity(100,100,10,1,[0,0]);
        this.map = new Map(30,20,this);
    }

    get playerData(){
        return this.player;
    }

    get mapData(){
        return this.map;
    }
}

