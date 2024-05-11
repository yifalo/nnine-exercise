import {Player} from "./base.js";
import {GIF} from "../util/gif.js";


export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();

    }

    init_animations() {
        let outTer = this;
        let offset = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i++) {

            let gif = new GIF();
            gif.load(`../static/images/player/kyo/${i}.gif`);//load 是网络请求资源，是根据index.html所在文件路径来判断
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,//总图片数
                frame_rate: 5, //每五帧过度一次
                offset_y: offset[i],//y方向偏移
                loaded: false,
                scale: 2,//缩放
            })

            gif.onload = function () {
                let obj = outTer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;

                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }

}