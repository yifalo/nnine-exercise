import  {AcGameObject} from "../ac_game_object/base.js";

class Player extends AcGameObject{
    constructor(root,info) {
        super();
        this.root=root;
        this.id=info.id;//区分两个角色
        this.x=info.x;
        this.y=info.y;
        this.width=info.width;
        this.height=info.height;
        this.color=info.color;
        this.ctx=this.root.GameMap.ctx;

        this.gravity=50;
        this.vx=0;
        this.vy=0;

        this.direction=1;

        this.speedx=400; //水平速度

        this.speedy=-1000;//跳起速度

        this.status=3; //0 表是初始，1表示向前，2 向后，3 跳跃 4攻击 5被打 6死亡
        this.press_key=this.root.GameMap.controller.press_key;

        this.animations=new Map();

        this.frame_current_cnt = 0;
    }

    start(){

    }

    update_direction(){
        let players=this.root.players;
        if(players[0]&& players[1]){
            let me=this,you=players[1-this.id];
            if(me.x<you.x){
                me.direction=1;
            }else{
                me.direction=-1;
            }
        }
    }

    update_control(){
         let w,a,d,space;
         if(this.id===0){
             w=this.press_key.has('w');
             a=this.press_key.has('a');
             d=this.press_key.has('d');
             space=this.press_key.has(' ');

         }else{
             w=this.press_key.has('ArrowUp');
             a=this.press_key.has('ArrowLeft');
             d=this.press_key.has('ArrowRight');
             space=this.press_key.has('Enter');
         }

        if(this.status===0 || this.status===1){
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_move(){
        if(this.status===3)
            this.vy+=this.gravity;

        this.x+=this.vx*this.timedelta /1000 ;
        this.y+=this.vy*this.timedelta/1000;
        if(this.y>450){
            this.y=450;
            this.vy=0;
            this.status=0;
        }
        if(this.x<0){
            this.x=0;
        }else if(this.x+this.width>this.root.GameMap.$canvas.width()){
            this.x=this.root.GameMap.$canvas.width()-this.width;
        }

    }
    update() {
        this.update_control();
        this.update_move();
        this.update_direction();
        this.render();

    }

    render(){
        // this.ctx.fillStyle=this.color;
        // this.ctx.fillRect(this.x,this.y,this.width,this.height);
        let status=this.status;

        if(this.status===1 && this.vx * this.direction <0)//判断后退
                status=2;

        let obj=this.animations.get(status);
        if(obj && obj.loaded){
            if(this.direction>0){
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image= obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale)
            }else{
                this.ctx.save();//保存

                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.GameMap.$canvas.width(), 0);

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.GameMap.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }


        }
        if(status===4 || status===3){
            if( this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1))
                this.status=0;
        }

        this.frame_current_cnt++;
    }
}

export {
    Player
}