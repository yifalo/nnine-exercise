let AC_GAME_OBJECT = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECT.push(this);

        this.timedelta = 0;
        this.has_call_start = false;
    }


    start() {//初始

    }

    update() {//每一帧执行一次

    }

    destroy() {//删除
        for (let i in AC_GAME_OBJECT) {
            if (AC_GAME_OBJECT[i] === this) {
                AC_GAME_OBJECT.splice(parseInt(i), 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_OBJECT_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }

    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECT_FRAME);
}
requestAnimationFrame(AC_GAME_OBJECT_FRAME);


export {
    AcGameObject
}