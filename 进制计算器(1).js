"ui";//必须在第一行否则报错
ui.layout(<frame>
          <vertical padding="16">//vertical垂直布局
              <input id="one" hint="第一个数"/>
              <input id="two" hint="第二个数"/>
              <radiogroup id="jz" orientation="horizontal">
                  <radio id="sl" text="十六进制"/>
                  <radio id="ba" text="八进制"/>
                  <radio id="er" text="二进制"/>
              </radiogroup>
              <radiogroup id="cho" orientation="horizontal">
                  <radio id="add" text="加"/>
                  <radio id="sub" text="减"/>
                  <radio id="mul" text="乘"/>
                  <radio id="div" text="除"/>
              </radiogroup>
              <button id="emu" text="计算结果！" style="Widget.AppCompat.Button.Colored"/>
              <input id="a_result" hint="原进制计算结果"/>
              <input id="t_result" hint="十进制计算结果"/>
              <linear gravity="center">//linear水平显示
              <button id="copy_a" style="Widget.AppCompat.Button.Colored" text="复制原进制结果"/>
              <button id="copy_t" style="Widget.AppCompat.Button.Colored" text="复制十进制结果"/>
          </linear>
          </vertical>
          </frame>);
ui.emu.click(() =>emul());
ui.copy_a.click(()=>{//ui.id.click(()=>代码)
    var r=ui.a_result.text();
    if(r){//判断非空再进行复制
        setClip(r);
    }
})
ui.copy_t.click(()=>{
    var r=ui.t_result.text();
    if(r){
        setClip(r);
    }
})
ui.jz.check(ui.sl.getId());
ui.cho.check(ui.add.getId());
//设定为默认选择第一个
function emul() {
  var num1 = ui.one.text();
  var num2 = ui.two.text();
  var jz;
  switch (ui.jz.getCheckedRadioButtonId()) {
          //判断选择的进制
    case ui.sl.getId():
      jz = 16;
      break;
    case ui.ba.getId():
      jz = 8;
      break;
    case ui.er.getId():
      jz = 2;
      break;
  }
  switch (ui.cho.getCheckedRadioButtonId()) {
          //判断选择的运算方式
    case ui.add.getId():
      type = 1;
      break;
    case ui.sub.getId():
      type = 2;
      break;
    case ui.mul.getId():
      type = 3;
      break;
    case ui.div.getId():
      type = 4;
      break;
  }
  if (!num1 || !num2 || !type || !jz) {
    alert("请输入完整数据!");
    return null;
  }
  
  var num1_t = parseInt(num1, jz);
  var num2_t = parseInt(num2, jz); //转成10进制
    log(num1_t)
  if(num1_t.toString()=="NaN"||num2_t.toString()=="NaN"){
      //转换失败
      alert("请检查输入的数据是否是选择的相应进制！");
        return ;
    }
  var result;
  switch (type) {
    case 1:
      result = num1_t + num2_t;
      break;
    case 2:
      result = num1_t - num2_t;
      break;
    case 3:
      result = num1_t * num2_t;
      break;
    case 4:
      result = num1_t / num2_t;
      break;
  }
  //return result;
    ui.t_result.text(result.toString());
    ui.a_result.text((parseInt(result).toString(jz)).toUpperCase());
}