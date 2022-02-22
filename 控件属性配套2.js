"ui";
storage = storages.create("ABC");
ui.layout(
    //var ui = floaty.ui(
    <scroll background="#ffa1887f">
    <vertical padding="3" background="#fFA1887F" id="bj"  >
        <horizontal background="#55AACD6E">
        <radiogroup id="ab" >
            <radio id="a6" text=".find()"/>
            <radio id="a7" text=".findOne()"/>
        </radiogroup>
        <radiogroup id="aa" >
            <radio id="a0" text=".click();"/>
            <radio id="a1" text=".getText();"/>
            <radio id="a2" text=".scrollForward();"/>
            <radio id="a3" text=".scrollBackward();"/>
            <radio id="a4" text=".bounds();"/>
            <radio id="a5" text=".desc();"/>
        </radiogroup>    
            <text textSize="30sp" text="单选区"/>
        </horizontal>        
                <button id="fw" margin="6" textSize="30sp" textStyle="bold" background="#7700000F">重置单选区</button>
        <horizontal background="#FF0ACD6E" marginLeft="0" marginTop="3">
            <text marginLeft="50" w="60" background="#FF0ACD6E" textSize="20sp" >父控件</text>
            <spinner marginLeft="30" background="#FF0ACD6E" id="a8" entries="否|╰╭1╮╯|╰╭2╮╯|╰╭3╮╯|╰╭4╮╯|╰╭5╮╯|╰╭6╮╯" />
        </horizontal>
            <checkbox id="chi" w="100" marginTop="3" marginLeft="50" textSize="20sp" textStyle="bold" background="#FFAACD6E" text="子控件？"/>
       
            <input id="a10" margin="6"  background="#FFAACD6E" hint="不用空着就行，举个栗子:输入: 1,0 结果:child(1),child(0)"/>
       
            <button  id="ok" margin="6" textSize="30sp" textStyle="bold" background="#7711aa1F">生成</button>]
        
            <text text="显示" id="xs" textSize="20sp" />
        
        </vertical>
    </scroll>
);
    
ui.fw.click(()=>{
   device.vibrate(20);
    for (i = 0; i <= 7; i++) {
    var k = "a" + i;
    eval("ui." + k + ".setChecked(false)");
  };
});

ui.ok.click(()=>{
  var sx=storage.get("a");//getClip();
    //var sx="qqqq"
    var 子="";
    var 父=pa(ui.a8.getSelectedItemPosition());
    if(ui.chi.isChecked()==true){
    var 子=ui.a10.getText().toString().split(",");
       // var 子=dialogs.rawInput("输入1,2,3,,,").split(",");
    var 子=ch(子);
        };
    var 选1=pd(6,7);
    var 选2=pd(0,5);
    if(选1==undefined){
        选1="";
        };
    if(选2==undefined){
        选2="";
        };
    var 生成=sx+选1+父+子+选2;
    ui.xs.setText(生成);
    setClip(生成)
    device.vibrate(20);
    });

//判断选中？
function pd(j, l) {
  for (i = j; i <= l; i++) {
    var k = "a" + i;
    if (eval("ui." + k + ".isChecked()") == true) {
        var txt=eval("ui." + k + ".getText()");
      return txt;
    };
  };
};
//父
function pa(t){
    var a6=new Array();
    for(i=0;i<t;i++){
        a6[i]="parent()"
        }
    var a7="."+a6.join(".");
    if(t==0){
        var a7="";
        };
    
    return a7;
    }
//子
function ch(t){
    var a8=new Array();
    for(i=0;i<t.length;i++){
        a8[i]="child("+t[i]+")"
        }
    var a9="."+a8.join(".");
    log(t[0],typeof(t[0]*1));
    if(t[0]==""){
        var a9="";
        };
    return a9;
    }







//r