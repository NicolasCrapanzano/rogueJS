class Entity{
    constructor(name,x,y,maxhp,actualhp){
        this.name = name;
        this.positionX = x;
        this.positionY = y;
        this.maxHp = maxhp;
        this.actualhp = actualhp;

        this.ready = false;
        this.init();
    }

    getPosition(){
        return [this.positionX,this.positionY];
    }
    changePosition(){
        this.positionX = newX;
        this.positionY = newY;
    }
    movePosition(newX,newY){
        if(newX !== undefined){
            this.positionX += newX;
        }
        if(newY !== undefined){
            this.positionY += newY;
        }
    }

    getName(){
        return this.name;
    }
    setName(newName){
        this.name = newName;
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
    init(){
        this.ready = true;
    }

    update(){

    }
    draw(mapData){
        
    }
}

class Player extends Entity{
    constructor(name,x,y,maxhp,actualhp){
        super(name,x,y,maxhp,actualhp);
    }

    init(){
        window.addEventListener("keydown", event => this.getKey(event) );
        console.log("player init");
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

class Map{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.mapSize = (this.width * this.height);

        this.map = [];
        this.mapContent = [];

        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;

        //▀ ▄ █▐ ▌░ ▒ ▓
        this.tileTypes = {
            ground:" ",
            void:1,
            wallHTop:"▀",
            wallHBottom:"▄",
            wallV:"█",
            wallCorner:"█",
        }
        this.tileTypesColor = {
            "0":"white",
            "1":"black",
            "2":"grey"
        }
    }



    generateNewMap(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){

                if(x === 0 && y===0 || y === 0 && x === this.width -1 || x === 0 && y === this.height -1 || x === this.width -1 && y===this.height -1){
                    this.map[this.pixelToMapPos(x,y)] = this.tileTypes.wallCorner; //add wall
                }else if(x === 0 || x === this.width -1){
                    this.map[this.pixelToMapPos(x,y)] = this.tileTypes.wallV; //add wall
                }else if(y === 0 ){
                    this.map[this.pixelToMapPos(x,y)] = this.tileTypes.wallHTop; //add wall
                }else if( y === this.height -1 ){
                    this.map[this.pixelToMapPos(x,y)] = this.tileTypes.wallHBottom; //add wall
                }else{
                    this.map[this.pixelToMapPos(x,y)] = this.tileTypes.ground; //add wall
                }
                
            }
        }
    }

    pixelToMapPos(x,y){
        return (y * this.width)+x;
    }
    mapToPixelPos(){

    }
    
    init(){

    }

    update(){
        console.log(this.map);
    }

    draw(playerPos){
        console.clear();
        let pPos = playerPos;
        if(pPos === undefined){
            console.error("player position cannot be undefined: ",pPos);
            return;
        }
        for(let y = 0; y < this.height; y++){
            let newLine=[];
            let preventGrouping="x";
            let color;

            if((y % 2) === 1){
                preventGrouping="  ";
            }else{
                preventGrouping=" ";
            }

            for(let x = 0; x < this.width; x++){
                newLine[x] = this.map[this.pixelToMapPos(x,y)];

                color = this.tileTypesColor[newLine[x]];
            }
            let msg = newLine.join("").toString()+preventGrouping.toString();
            //console.log( "%c" + msg ,"color:"+color);
            console.log( "%c" + msg ,"color:green");
        }
    }
}

class Game{
    constructor(){
        this.entitiesList = [];
        this.gameMap;
    }

    init(){

    }

    update(){

    }

    draw(){

    }
}