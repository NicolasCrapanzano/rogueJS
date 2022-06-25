class Player{
    constructor(x,y){
        this.positionX = x;
        this.positionY = y;
        window.addEventListener("keydown", event => this.keyInput(event) );
    }

    move(x,y){
        console.log( );
        if(x !== undefined ){
            this.positionX += x;
        }
        if(y !== undefined ){
            this.positionY += y;
        }
        console.log("x: ",this.positionX," | "," y: ",this.positionY);
    }

    keyInput(event){
        if(event.code === "KeyW"){
            console.log("move forwards");
            this.move(0,1);
        }else if(event.code === "KeyS"){
            console.log("move backwards")
            this.move(0,-1);
        }

        if(event.code === "KeyD"){
            console.log("move right")
            this.move(1);
        }else if(event.code === "KeyA"){
            console.log("move left");
            this.move(-1);
        }
    }
}
/*
window.addEventListener("keydown", event => this.keyInput(event) );
    keyInput(event){
        
        if(event.code === "KeyW"){
            console.log("move forwards");
            this.testEntity.move(0,1);
        }else if(event.code === "KeyS"){
            console.log("move backwards")
            this.testEntity.move(0,-1);
        }

        if(event.code === "KeyD"){
            console.log("move right")
            this.testEntity.move(1);
        }else if(event.code === "KeyA"){
            console.log("move left");
            this.testEntity.move(-1);
        }
    }
*/