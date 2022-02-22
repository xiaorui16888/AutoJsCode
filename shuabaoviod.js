auto.waitFor();//获取无障碍;
let min =7
let max = 15
var count = 1;
var window = floaty.window(
    <frame gravity="center">
        <text id="text" color="red" text='当前脚本执行第：1次' textSize="16sp"/>
    </frame>
);


while(true){
    cs = randmon_time_swipe();
    ui.run(function(){
        window.text.setText("当前脚本执行第:"+cs+"次");
    });
}

/**
 * 随机时间滑动
 */
function randmon_time_swipe(){
    rand_time = random(min , max)*1000;
    //不规则滑行
    x = random(100, device.width-100);//初始点x
    y = random(device.height/2+100,device.height/2+200)//初始点y
    x1= x;
    y1= random(140,200)
    log(x+','+y +';'+x1+','+y1)
    sleep(rand_time)
    swipe(x,y,x1,y1,random(1000,1500));
    count++;
    return count;
}
