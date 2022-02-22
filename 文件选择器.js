"ui";
importClass(android.graphics.Color);
importClass(android.graphics.drawable.ColorDrawable);
importClass(android.app.Dialog);
importClass(android.view.Gravity);
importClass(android.app.AlertDialog);
 
 
   var fdialog = new Dialog(activity)
       fdialog.setCancelable(false);
       //fdialog.show(); 
       var selectFile=ui.inflate( 
             <vertical bg="#ffffffff">
                 <linear h="30">
                    <text padding="6 2 0 0" android:ellipsize="start" android:singleLine="true" android:scrollHorizontally="true"
                          size="18" id="currpath"/>
                 </linear>
                 <list id="list" h="400" w="*">
                    <relative w="1000" h="37" foreground="?selectableItemBackground">
                       <img tint="{{this.icontint}}" id="icon" w="25" src="@drawable/{{this.icon}}"/>
                       <text size="16" layout_toRightOf="icon" layout_centerVertical="true" text="{{this.title}}"/>
                    </relative>
                 </list>
                 <relative h="45">
                   <button id="cancle" layout_alignParentRight="true" text="退出" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
                 </relative>                      
             </vertical>,null)
      //fdialog.setContentView(selectFile);
   
var window = fdialog.getWindow();
window.setDimAmount(0.24);//设置窗口外阴影程度 范围0f-1.0f
window.setGravity(Gravity.LEFT|Gravity.BOTTOM); 
window.setContentView(selectFile);

window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

var windowManager = activity.getWindowManager(); 
		var display = windowManager.getDefaultDisplay(); 
	var lp=fdialog.getWindow().getAttributes(); 
	lp.width = display.getWidth();
	lp.height=display.getHeight()*0.7;
	fdialog.getWindow().setAttributes(lp);
fdialog.show();
fdialog.setContentView(selectFile)
   
      var updateList=function(path){
          selectFile.currpath.setText(path);
          var arr=files.listDir(path)
          arr.sort(function(a,b){
              return a.toLowerCase()==b.toLowerCase()?0:(a.toLowerCase()>b.toLowerCase()?1:-1)
          });
          var filelist=new Array();
          filelist.push({icon:"ic_keyboard_arrow_up_black_48dp",icontint:"#000000",title:"  ..."});
          for(var i=0;i<arr.length;i++) 
              filelist.push({icon:files.isDir(currPath+arr[i])?"ic_folder_black_48dp":"ic_insert_drive_file_black_48dp",icontint:files.isDir(currPath+arr[i])?"#657890":"#011345",title:arr[i]});
        
          selectFile.list.setDataSource(filelist)
      }
       
      selectFile.cancle.click(()=>{fdialog.dismiss()});
      selectFile.list.on("item_click", function (item, i, itemView, listView) {
         if(i==0){
             if(currPath!="/sdcard/"){
                var ss=currPath.substring(0,currPath.length-1)
                currPath=ss.substring(0,ss.lastIndexOf("/")+1);
                updateList(currPath);
             }
             return;
        }
      
        if(files.isDir(currPath+item.title)){updateList(currPath+=item.title+"/");return;}
      
        if(!item.title.endsWith(".plug"))return;
         
   
      });
      
      var currPath=context.getFilesDir().getPath()//"/sdcard/";
      updateList(currPath);