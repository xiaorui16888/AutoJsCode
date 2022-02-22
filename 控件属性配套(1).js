"ui";

ui.layout(
    <vertical padding="16" id="bj" >
	   <text text="第一步"/>
       <checkbox id="sp1" text="findOne()"/>
         <horizontal>
            <text textSize="16sp">操作</text>
            <spinner id="sp2" entries="控件点击 => click()|获取文本 => getText()|前进滑动 => scrollForward()|后退滑动 => scrollBackward()" spinnerMode="dialog"/>
			<text textSize="16sp">用parent()吗?</text>
            <spinner id="sp3" entries="╰╭否╮╯|╰╭1╮╯|╰╭2╮╯|╰╭3╮╯|╰╭4╮╯|╰╭5╮╯|╰╭6╮╯" />
         </horizontal>
       <checkbox id="sp4" text="用child()吗？" textColor="black" textSize="16sp" marginTop="16"/>
       <input id="sp5" hint="要用就输入数字,格式：次数,一级数,二级数..."/>
       <button id="ok">确定</button>
    </vertical>
);

ui.ok.click(()=>{
	var a0=[".click();",".getText();",".scrollForward();",".scrollBackward();"]
    var a1=ui.sp1.isChecked();
    var a2 = ui.sp2.getSelectedItemPosition();
    var a3 = ui.sp3.getSelectedItemPosition();
    var a4=ui.sp4.isChecked();
    var a5=ui.sp5.getText().toString().split(",");
    var sx=getClip();
    if (a1 == true) { //findOne()
  if (a3 == 0) { //parent
    if (a4 == false) { //child
      setClip(sx + ".findOne()" + a0[a2])
        toast("已复制到剪贴板")
    } else { //child
      setClip(sx + ".findOne()." + ch(a5) + a0[a2])
        toast("已复制到剪贴板")
    }
  } else { //parent
    if (a4 == false) { //child
      setClip(sx + ".findOne()." + pa(a3) + a0[a2])
        toast("已复制到剪贴板")
    } else { //child
      setClip(sx + ".findOne()." + pa(a3) +"."+ ch(a5) + a0[a2])
        toast("已复制到剪贴板")
    }
  }
} else {
  if (a3 == 0) { //parent
    if (a4 == false) { //child
      setClip(sx +"."+ a0[a2])
        toast("已复制到剪贴板")
    } else { //child
      setClip(sx +"."+ ch(a5) + a0[a2])
        toast("已复制到剪贴板")
    }
  } else { //parent
    if (a4 == false) { //child
      setClip(sx +"."+ pa(a3) + a0[a2])
        toast("已复制到剪贴板")
    } else { //child
      setClip(sx +"."+ pa(a3) +"."+ ch(a5) + a0[a2])
        toast("已复制到剪贴板")
    }
  }
    }
});
function pa(t){
    var a6=new Array();
    for(i=0;i<t;i++){
        a6[i]="parent()"
        }
    var a7=a6.join(".");
    return a7;
    }

function ch(t){
    var a8=new Array();
    for(i=0;i<t.length-1;i++){
        a8[i]="child("+t[i+1]+")"
        }
    var a9=a8.join(".");
    return a9;
    }