/*
 *信任的游戏
 *规则：队伍(2)，人数(2)，
 *     初始硬币(5)，
 *     一方投币(对方硬币数＋3自己的硬币-3)，
 *     双方投币(双方硬币数+2)，
 *     局数(5)，
 *     对方(分角色投币)。
 */


//预设变量
var b,b1;
var c=5;//玩家初始硬币数
var d=5;//程序初始硬币数
var e=5;//局数
var f,g,h;
var i=dialogs.select("选择对面","白痴","坏人","复读机");//选择对面
var j,k;



//主体
if(i==0){
    h="白痴";
    BC();//白痴投币
}else if(i==1){
    h="坏人";
    HR();//坏人投币
}else if(i==2){
    h="复读机";
    FDJ();//复读机投币
}else{
    exit();
}


//函数部分
//人物函数
//白痴
function BC(){
    for(;e>0;e--){
        b=random()*2;//1~2随机浮点数
        b1=Math.ceil(b);//1或2
        Wjtb();
        Cxtb();
        Pd();
    }
    Zj();
}

//坏人
function HR(){
    b1=2;//不投币
    for(;e>0;e--){
        Wjtb();
        Cxtb();
        Pd();
    }
    Zj();
}

//复读机
function FDJ(){
    k=233;
    for(;e>0;e--){
        Wjtb();
        Cxtb();
        Pd();
    }
    Zj();
}

//规则函数
//玩家投币
function Wjtb(){
    j=dialogs.confirm("第"+(6-e)+"局给"+h+"投币吗？");
    if(j==true){
        f=1;
    }else if(!j==true){
        f=0;
    }else{
        exit();
    }
}

//程序投币
function Cxtb(){
    if(k==233){
        g=f;
    }else if(b1==1){
        g=1;
    }else{
        g=0;
    }
}

//判断
function Pd(){
    if((f==g)&&f==0){
        alert("然而"+h+"也没有投币，\n你的硬币+0，\n"+h+"的硬币+0。");
    }
    else if((f==g)&&f==1){
        c=c-1+3;
        d=d-1+3;
        alert(h+"也投了币，\n你的硬币+2，\n"+h+"的硬币+2。");
    }
    else if(f>g){
        c--;
        d=d+3;
        alert("然而"+h+"并没有投币，\n你的硬币-1，\n"+h+"的硬币+3。");
    }
    else if(g>f){
        c=c+3;
        d--;
        alert(h+"投了币，\n你的硬币+3，\n"+h+"的硬币-1。");
    }else{
        alert("错误");
        exit();
    }
}

//总结
function Zj(){
    alert("你目前有："+c+"枚硬币，\n"+h+"有："+d+"枚硬币。");
}