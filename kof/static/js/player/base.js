import  {AcGameObject} from "../ac_game_object/base.js";

class Player extends AcGameObject{
    constructor(root,info) {
        super();
        this.id=info.id;//区分两个角色
        this.x=info.x;
        this.y=info.y;
        this.width=info.width;
        this.height=info.height;
        this.color=info.color;

        this.vx=0;
        this.vy=0;

        this.speedx=400; //水平速度

        this.speedy=1000;//跳起速度
    }

    start(){

    }
    update() {
        this.render();
    }

    render(){
        this.ctx.canvas.fillStyle=this.color;
        this.ctx.canvas.fillRect(this.x,this.y,this.width,this.height);

    }
}

export {
    Player
}