var window = floaty.window(
    <frame gravity="center">
        <text id="text" text="点击可调整位置" bg="#ffffff" textSize="16sp"/>
    </frame>
);

var rem=files.read("/sdcard/ONEKEY/rem.txt")

var tem=files.read("/sdcard/ONEKEY/tem.txt")

window.exitOnClose();

window.text.click(()=>{
if(rem=="r1"){
    toastLog("1")
    }
    else if(rem=="r2"){
        toastLog("2")}
        else{
            toastLog("3")
            }
});

window.text.longClick(()=>{
if(tem=="t1"){
    toastLog("1")
    }
    else if(tem=="t2"){
        toastLog("2")}
        else{
            toastLog("3")
            }
});



events.broadcast.on("r1", function() {
    rem = "r1"   
})
events.broadcast.on("r2", function() {
    rem = "r2"   
})
events.broadcast.on("r3", function() {
    rem = "r3"  
})
events.broadcast.on("t1", function() {
    tem = "t1"  
})
events.broadcast.on("t2", function() {
    rem = "t2"  
})
events.broadcast.on("t3", function() {
    tem = "t3"  
})






setInterval(()=>{}, 1000);