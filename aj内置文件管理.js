"ui";
importClass(android.graphics.Color);
importClass(android.graphics.drawable.ColorDrawable);
importClass(android.app.Dialog);
importClass(android.view.Gravity);
importClass(android.app.AlertDialog); 
ui.layout( 
         <vertical bg="#ffffffff">
              <linear h="30">
                  <text padding="6 2 0 0" android:ellipsize="start" android:singleLine="true" android:scrollHorizontally="true"
                          size="18" id="currpath"/>
              </linear>
              <list id="list" h="*" w="*">
                  <relative w="1000" h="45" foreground="?selectableItemBackground">
                     <img tint="{{this.icontint}}" id="icon" w="25" src="@drawable/{{this.icon}}"/>
                     <text size="16" layout_toRightOf="icon" layout_centerVertical="true" text="{{this.title}}"/>
                  </relative>
              </list>                     
          </vertical>)

   
      var updateList=function(path){
          ui.currpath.setText(path.replace(context.getDataDir().getPath(),"..."));
          var arr=files.listDir(path)
          arr.sort(function(a,b){
              return a.toLowerCase()==b.toLowerCase()?0:(a.toLowerCase()>b.toLowerCase()?1:-1)
          });
          var filelist=new Array();
          filelist.push({icon:"ic_keyboard_arrow_up_black_48dp",icontint:"#000000",title:"  ..."});
          for(var i=0;i<arr.length;i++) 
              filelist.push({icon:files.isDir(currPath+arr[i])?"ic_folder_black_48dp":"ic_insert_drive_file_black_48dp",icontint:files.isDir(currPath+arr[i])?"#657890":"#011345",title:arr[i]});
        
          ui.list.setDataSource(filelist)
      }
       
      ui.list.on("item_click", function (item, i, itemView, listView) {
         if(i==0){
             if(currPath!=context.getDataDir().getPath()+"/"){
                var ss=currPath.substring(0,currPath.length-1)
                currPath=ss.substring(0,ss.lastIndexOf("/")+1);
                updateList(currPath);
             }
             return;
        }
      
        if(files.isDir(currPath+item.title)){updateList(currPath+=item.title+"/");return;}
         
   
      });
      
      var currPath=context.getDataDir().getPath()+"/";
      updateList(currPath);