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
        if(positionX !== undefined){
            this.positionX += positionX;
        }
        if(positionY !== undefined){
            this.positionY += positionY;
        }
    }

    changePosition(newX=0,newY=0){
        //"teleport" player to a position
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
        window.addEventListener("keyup", event => this.getKey(event) );

    }
    getKey(event){

        if(event.code === "KeyW"){
            this.move(0,-1);
            
        }else if(event.code === "KeyS"){
            this.move(0,1);
            
            
        }

        if(event.code === "KeyD"){
            this.move(1);
            
        }else if(event.code === "KeyA"){
            this.move(-1);
            
        }
    }
}

class GameMap {
    constructor(width,height,mainObject,player){
        this.mainObj = mainObject;
        this.playerObj = player;
        this.playerLastPos = undefined;
        this.width = width;
        this.height = height;
        this.mapSize = (this.width * this.height);
        this.map = [];
        this.mapContent = new Map();
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;

        //all of this should be saved in its own file and in a simpler structure
        this.entitiesList = {
            //all Mob type entities should appear in mayus
            "player":{
                id: 0,
                sprite:"P",
                color:"blue"
            },
            "goblin":{
                id: 1,
                sprite:"G",
                color:"green"
            },
            "wizard":{
                id: 2,
                sprite:"W",
                color:"purple"
            },
            "necromancer":{
                id: 3,
                sprite:"N",
                color:"brown"
            },
            "potion":{
                id: 4,
                sprite:"p",
                color:"red"
            },
            "sword":{
                id: 5,
                sprite:"s",
                color:"gray"
            },
            "chestPlate":{
                id: 6,
                sprite:"c",
                color:"orange"
            }
        };        
        this.entitiesListById = {
            //all Mob type entities should appear in mayus
            0: this.entitiesList.player,
            1:this.entitiesList.goblin,
            2:this.entitiesList.wizard,
            3:this.entitiesList.necromancer,
            4:this.entitiesList.potion,
            5:this.entitiesList.sword,
            6:this.entitiesList.chestPlate
        };


        this.init();
    }

    init(){
        //this.playerLastPos = this.playerObj.getPosition;
        //set player position to center of screen
        //player should, actually be spawned at a spawn point, generated on generateMap();
        let centerPosition = [this.width / 2, this.height / 2];
        this.playerObj.changePosition(centerPosition[0],centerPosition[1]);
        this.playerLastPos = this.playerObj.position;
        this.mapContent.set(this.getMapCoordinates(centerPosition[0],centerPosition[1]),this.entitiesList.player.id);
        console.log(this.mapContent);
        this.generateMap();
    }
    generateMap(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                //set map layout
                this.map[(y * this.width) + x] = 1;
                if(
                    y === 0 || y === (this.height - 1) 
                    || 
                    x === 0 || x === (this.width - 1)
                    )
                {
                    this.map[(y * this.width) + x] = 2;
                }else{
                    if(x === this.playerLastPos[0] && y === this.playerLastPos[1]){
                        console.log("item cant be placed at player position");
                    }else{
                        //add content to map (items, entities)
                        let rand = Math.floor(Math.random() * 100);
                        if(rand > 3 && rand <5){
                            //assign random item as id
                            this.mapContent.set((y * this.width) + x , this.entitiesList.potion.id);
                        }
                    }
                }
            }
        }
        try{
            console.log("try build map");
            this.buildHtmlTableMap();
        }catch (err){
            console.error(err);
        }
    }

    buildHtmlTableMap(){
        console.log(this.mapContent);
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
                let currentCoords = this.getMapCoordinates(x,y);
                let currentContentID = this.mapContent.get(currentCoords);
                tableCell.id = currentCoords;
                

                //Display layout
                switch (this.map[currentCoords]) {
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
                //Display entities 
                // !!! having these in separated form is easier to read but not really practical, fix!
                //items

                if(currentContentID || currentContentID === 0) {
                    
                    tableCell.innerHTML = this.entitiesListById[ currentContentID ].sprite;
                    tableCell.style.color = this.entitiesListById[ currentContentID ].color;
                };
                //mobs
                /*
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
                */
                tableRow.append(tableCell);
            }
            tableMain.append(tableRow);
        }
    }

    Draw()
    {
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
        
        
        let plPos = this.playerObj.position;
        if(plPos[0] != this.playerLastPos[0] || plPos[1] != this.playerLastPos[1]){
            this.mapContent.delete(this.getMapCoordinates(this.playerLastPos[0],this.playerLastPos[1]));
            this.playerLastPos = this.playerObj.position;
            this.mapContent.set(this.getMapCoordinates(this.playerLastPos[0],this.playerLastPos[1]),this.entitiesList.player.id);
            //console.log("player position changed");
        }
        for(let y = 0; y < this.height; y++){

            for(let x = 0; x < this.width; x++){
                let tableCell = document.getElementById(this.getMapCoordinates(x,y));
                let currentCoords = this.getMapCoordinates(x,y);
                let currentContentID = this.mapContent.get(currentCoords);
                
                tableCell.innerHTML = "";
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
                //Display items change to foreach method
                if(currentContentID || currentContentID === 0) {
                    tableCell.innerHTML = this.entitiesListById[ currentContentID ].sprite;
                    tableCell.style.color = this.entitiesListById[ currentContentID ].color;
                };
                /*
                switch (this.mapContent.get(this.getMapCoordinates(x,y))) {
                    case this.entitiesList.player.id:
                        tableCell.innerHTML = this.entitiesList.player.sprite;
                        tableCell.style.color = this.entitiesList.player.color;
                        break;
                    case this.entitiesList.potion.id:
                        tableCell.innerHTML = this.entitiesList.player.sprite;
                        tableCell.style.color = this.entitiesList.player.color;
                        break;
                    default:
                        break;
                }
                */
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

        
        this.init();
    }

    init(){
        this.startGame();
    }

    gameUpdate(){
        //let playerPos = this.player.position;
        this.map.Draw();
        requestAnimationFrame(() => this.gameUpdate());
    }

    startGame(){
        this.player = new Player(100,100,10,1,[0,0]);
        this.map = new GameMap(30,20,this,this.player);
        //this should be async an wait for player and map to generate
        this.gameUpdate();
    }

    get playerData(){
        return this.player;
    }

    get mapData(){
        return this.map;
    }
}

