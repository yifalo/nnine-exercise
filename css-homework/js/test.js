let name="yfh";
let d={
    name: "yfh",
    age:18
}
function print(){
    let s=`${name} ${d.age}`;
    console.log("hello word");
    console.log(d.name+d.age);
    console.log(s);
}

export {
    name,
    print
}