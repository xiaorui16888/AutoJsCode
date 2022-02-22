var y=1058
var t=100

console.show()
console.setPosition(100,1300)
/**
*脚本来源：浩然
*
*适用版本：所有安卓版本
*适用分辨率：1080p
*
*转载请附注来源，谢谢
*成功率实测百次：成功率100%
*/
if(!requestScreenCapture()){
    alert("请求截图权限失败！");
    exit();
}
testSwipe()

/** 
 * 识别滑块位置
 * 
 * 传入值img，ratio
 * img为要识别的图片
 * ratio为识别图片的分辨率（暂时只可选择720或1080）
 * 
 * 返回值x
 * 识别出方块位置的左端横坐标
 */
function discernSlidingblock(img,ratio){
    var temp,temp2,x,y,num,color,p,temp3,arr1;
    if(ratio==720){
      var tb=[348,253,691,638,81]
    }else if(ratio==1080){
      var tb=[463,387,912,831,125]
    }else{
      log("分辨率不符合规范")
      return -2
    }
    num=Math.ceil(tb[4]/3.3-4);

    for(var k=29;k<=40;k++){
       temp2="";
      color="#"+k+""+k+""+k+"";
      for (var i=1;i<=num;i++){
        temp2=temp2+"0|"+i+"|"+color+",";
        temp2=temp2+i+"|0|"+color+",";
        temp2=temp2+"1|"+i+"|"+color+",";
        temp2=temp2+i+"|1|"+color+",";
        temp2=temp2+"2|"+i+"|"+color+",";
        temp2=temp2+i+"|2|"+color+",";
      }
    x=0;
    while(x>-2){
      y=0;
      while(y>-2){
        temp="";
        for (var i=1;i<=num;i+=2){
          temp=temp+"0|"+(tb[4]+y-i-1)+"|"+color+",";
          temp=temp+(tb[4]+x)+"|"+i+"|"+color+",";
          temp=temp+(tb[4]+x)+"|"+(tb[4]+y-i-1)+"|"+color+",";
          temp=temp+(tb[4]+x-i-1)+"|0|"+color+",";
          temp=temp+i+"|"+(tb[4]+y)+"|"+color+",";
          temp=temp+(tb[4]+x-i-1)+"|"+(tb[4]+y)+"|"+color+",";
          temp=temp+"1|"+(tb[4]+y-i-1)+"|"+color+",";
          temp=temp+(tb[4]+x-1)+"|"+i+"|"+color+",";
          temp=temp+(tb[4]+x-1)+"|"+(tb[4]+y-i-1)+"|"+color+",";
          temp=temp+(tb[4]+x-i-1)+"|1|"+color+",";
          temp=temp+i+"|"+(tb[4]+y-1)+"|"+color+",";
          temp=temp+(tb[4]+x-i-1)+"|"+(tb[4]+y-1)+"|"+color+",";
        }
        temp=temp+temp2+"0|0|"+color;
         arr1=temp.split(",");
         var arr2=new Array();
        for(var i=0;i<arr1.length-1;i++){
          arr2[i]=new Array();
          temp3=arr1[i].split("|");
          arr2[i]=[Number(temp3[0]),Number(temp3[1]),temp3[2]];
        }   
    try{
      p = images.findMultiColors(img, color,arr2, {region: [tb[0], tb[1], tb[2]-tb[0], tb[3]-tb[1]],threshold:(Math.floor(k/10)*16+k%10)});
      if(p){
        img.recycle();
        return p.x
      }
    }catch(error){
      console.log("识别失败，错误原因："+error);
      return -1;
    }
    y=--y;
      }
    x=--x;
    }
  }
  try {
    img.recycle();
  } catch (error) {
    console.log("识别失败，错误原因："+error);
  }
  return -1;
}

function testSwipe(){
    auto.waitFor()
  while (true) {
    img=images.captureScreen();
    if(img){
      log("截图成功。进行识别滑块！");
      break;
    }else{
      log('截图失败,重新截图');
    }
  }
  var x = discernSlidingblock(img,1080)+65
  console.info("识别结果滑块X坐标："+x);

  if(x>-1){
    swipe(220,y,x,y,t)
    //滑动完成
  }else{
    console.log("识别有误，请确认是否在滑块界面");
  }
}

