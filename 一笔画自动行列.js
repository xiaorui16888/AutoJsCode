//用于微信小程序：一笔过关
importClass(android.webkit.WebView);
var window = floaty.window(
   <horizontal>
        <button id="action" style="Widget.AppCompat.Button.Colored" text="运行" w="70"/>
   </horizontal>
);

setInterval(()=>{}, 1000);

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
var is_wrap=false;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
        if(new Date().getTime()-downTime<35)break;
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
            windowY + (event.getRawY() - y));
            if(Math.abs(event.getRawY() - y) > 15 || Math.abs(event.getRawX() - x) >15)is_wrap=true;
            //如果按下的时间超过0.6秒判断为长按，退出脚本
            if((new Date().getTime() - downTime > 800)&&!is_wrap){
                
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 6 && Math.abs(event.getRawX() - x) < 6){
               toast("运行中");
               engines.execScript("smartline", "mainf();\n" + mainf.toString());    
            }
            is_wrap=false;
            return true;
    }
    return true;
});

        
 
      
function mainf(){
      setScreenMetrics(1080,2160);
      images.requestScreenCapture();
      var dw=device.width/1080,dh=device.height/2160;
      var sx,sy;
      var rown,coln;
      var bw,cw;
      var img=images.captureScreen();
      var table=new Array();
      var path=new Array();
      var start_r,start_c;
      c_r_num();
      for(var i=0;i<rown;i++){
          var tab0=new Array();
          for(var j=0;j<coln;j++){
             if(images.detectsColor(img,"#d0d0d0",dw*(sx+(bw+cw)*j+bw/2),dh*(sy+bw/2+(bw+cw)*i))){
                 tab0[j]=1;
             }else if(images.detectsColor(img,"#ffffff",dw*(sx+(bw+cw)*j+bw/2),dh*(sy+bw/2+(bw+cw)*i))){
                 tab0[j]=0;
             }else{tab0[j]=2;start_r=i;start_c=j;}
          }
          table[i]=tab0;
       }
       
      an(start_r,start_c);
      toast("结束运行");
      
      function showw(){
          var swipe_path=new Array();
          var x=start_c*(bw+cw)+sx+bw/2;var y=start_r*(bw+cw)+sy+bw/2;
          swipe_path[0]=[x,y];
          for(var i=0;i<path.length;i++){
              switch(path[i]){
                  case 1:x+=(bw+cw);swipe_path[i+1]=[x,y];break;
                  case -1:x-=(bw+cw);swipe_path[i+1]=[x,y];break;
                  case 2:y+=(bw+cw);swipe_path[i+1]=[x,y];break;
                  case -2:y-=(bw+cw);swipe_path[i+1]=[x,y];break;
       
              } 
          }
          sleep(100);
          for(var i=0;i<swipe_path.length-1;i++){
              swipe(swipe_path[i][0],swipe_path[i][1],swipe_path[i+1][0],swipe_path[i+1][1],130);
          }
        
              
      }
      
      function an(r,c){
          if(is_end_ng1(r,c))return false;
          var dir=arry_1_dir(r,c);
          if(dir.length==0){
               if(!is_table_n1())return false;
               showw();return true;
          }else{
              for(var i=0;i<dir.length;i++){
                  switch(dir[i]){
                      case -2:
                          table[r-1][c]=2;
                          path[path.length]=-2;
                          if(an(r-1,c)){
                              return true;
                          }else{
                              table[r-1][c]=1;
                              path.pop();
                          }
                          break;
                      case 2:
                        
                          table[r+1][c]=2;
                          path[path.length]=2;
                          if(an(r+1,c)){
                              return true;
                          }else{
                             
                              table[r+1][c]=1;
                              path.pop();
                          }
                          break;
                      case -1:
                        
                          table[r][c-1]=2;
                          path[path.length]=-1;
                          if(an(r,c-1)){
                              return true;
                          }else{
                              
                              table[r][c-1]=1;
                              path.pop();
                          }
                          break;
                     case 1:
                         
                          table[r][c+1]=2;
                          path[path.length]=1;
                          if(an(r,c+1)){
                              return true;
                          }else{
                              
                              table[r][c+1]=1;
                              path.pop();
                          }
                          break;
                   
                  }
               }
               return false;
          }
          
       }
       
  function c_r_num(){
      sx=800; 
      var left_y;
      var right=500;
      sy=1000;
      var buttom=400;  
   for(var i=470;i<1430;i=i+60){
       for(var j=100;j<360;j=j+2){
           if(!images.detectsColor(img,"#ffffff",j,i)){
               if(j<sx  ){sx  =j;left_y=i;}
               break;
           }
        }
  }
  for(var i=470;i<1430;i=i+60){
       for(var j=980;j>720;j=j-2){
           if(!images.detectsColor(img,"#ffffff",j,i)){
               if(j>right){right=j;}
               break;
           }
        }
  }
  var f_block_e=false;
  for(var i=sx+2;(!f_block_e)&&(i<sx+200);i=i+2){
      if(images.detectsColor(img,"#ffffff",i,left_y)){
           f_block_e=true;
           bw=i-sx  ;
           coln=parseInt((right-sx  )/(bw+20)+1);
       }
  }
  cw=parseInt((right-sx-coln*bw)/(coln-1));
  for(var i=160;i<1000;i=i+60){
       for(var j=410;j<1080;j=j+3){
           if(!images.detectsColor(img,"#ffffff",i,j)){
               if(j<sy){sy=j;}
               break;
           }
        }
  }
  for(var i=160;i<1000;i=i+60){
       for(var j=1440;j>1000;j=j-3){
           if(!images.detectsColor(img,"#ffffff",i,j)){
               if(j>buttom){buttom=j;}
               break;
           }
        }
  }
  rown=parseInt((buttom-sy)/(cw*1.6+bw)+1);
       
    }
      function arry_1_dir(r,c){
          var dir=new Array();
          if(r!=rown-1){if(table[r+1][c]==1)dir[dir.length]=2;}
          if(r!=0){if(table[r-1][c]==1)dir[dir.length]=-2;}
          if(c!=0){if(table[r][c-1]==1)dir[dir.length]=-1;}
          if(c!=coln-1){if(table[r][c+1]==1)dir[dir.length]=1;}
          return dir;
          
       }
       
      function is_end_ng1(r,c){
        var t=0;
        for(var i=0;i<rown;i++){
          for(var j=0;j<coln;j++){
             if(table[i][j]==1&&arry_1_dir(i,j).length<2){
                if(i==r&&j==c){}
                else if(i==r-1&&j==c){}
                else if(i==r+1&&j==c){}
                else if(i==r&&j==c-1){}
                else if(i==r&&j==c+1){}
                else{
                    t++;
                    if(t==2)return true;
                }
             }
          }
          
       }
       return false;
      }
       
       function is_table_n1(){
           for(var i=0;i<table.length;i++){
               for(var j=0;j<table[i].length;j++){
                   if(table[i][j]==1)return false;
                }
            }
            return true;
       }
}
      