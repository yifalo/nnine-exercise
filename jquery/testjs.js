let main = function (){
    let $div=$('.mydiv');
    let $btn_show=$('#show');
    let $btn_hide=$('#hide');

    $btn_show.on("click",function (){
        $div.fadeIn(1000);
    })

    $btn_hide.on("click",function (){
        $div.fadeOut(1000);
    })

    let $a=$('<a href="https://www.acwing.com/activity/content/1150/" target="_blank" >点我</a>')
    $div.on("click",function (){

        $div.append($a);
    })
    $div.dblclick(function (){
        $a.remove();
        $div.empty();
    })

    let $div_id=$('#mydiv');
    $div_id.on("click",function (){
        console.log($div_id.css('background-color'));
        $div_id.css({
            width:"200px",
            height:"50px",
            "background-color": "orange"

        });
        $div_id.text('hello');
        console.log($div_id.attr('yfh'));
        console.log($div_id.text());
    })

    let step =()=>{
        $div.width($div.width()+1);
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);


    let map=new Map();

    map.set('yfh','18');
    map.set('name','yfhs');
    map.forEach(function (value,key){
        console.log(key,value);
    })
    console.log(map.has('yfh'));

    let set=new Set();

    set.add('yfh');
    set.add(18);
    console.log(set.has('yfh'));
    console.log(set.size);
    console.log(Date.now());

    let starttime=new Date();
    console.log(starttime.getDay());

    let $yfh=$('.yfh');
    $yfh.on("click",function (){
        //window.open("https://www.acwing.com/activity/content/1150/");
        window.location.reload();
        //location.href="https://www.acwing.com/activity/content/1150/";
    })
}

export {
    main
}