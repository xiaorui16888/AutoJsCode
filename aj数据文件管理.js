"ui";
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

var currPath = context.getDataDir().getPath() + "/";
updateList(currPath);

function updateList(path) {
    ui.currpath.setText(path.replace(context.getDataDir().getPath(), "..."));
    var arr = files.listDir(path)
    arr.sort(function(a, b) {
        return a.toLowerCase() == b.toLowerCase() ? 0 : (a.toLowerCase() > b.toLowerCase() ? 1 : -1)
    });
    var filelist = new Array();
    filelist.push({
        icon: "ic_keyboard_arrow_up_black_48dp",
        icontint: "#000000",
        title: "  ..."
    });
    for (var i = 0; i < arr.length; i++)
        filelist.push({
            icon: files.isDir(currPath + arr[i]) ? "ic_folder_black_48dp" : "ic_insert_drive_file_black_48dp",
            icontint: files.isDir(currPath + arr[i]) ? "#657890" : "#011345",
            title: arr[i]
        });

    ui.list.setDataSource(filelist)
}

ui.list.on("item_click",(dataItem, i, itemView, listView)=>{
    if (i == 0) {
        if (currPath != context.getDataDir().getPath() + "/") {
            var ss = currPath.substring(0, currPath.length - 1)
            currPath = ss.substring(0, ss.lastIndexOf("/") + 1);
            updateList(currPath);
        }
        return;
    }

    if (files.isDir(currPath + dataItem.title)) {
        updateList(currPath += dataItem.title + "/");
        return;
    }

});

ui.list.on("item_long_click",(event,dataItem,i,itemView,listView)=>{
    if(i==0){event.consumed=true;return;}
    dialogs.select("操作",["删除","复制到sdcard根目录"],(i)=>{
        if(i==-1)return;
        if(i==1){
            toast(files.copy(currPath+dataItem.title,"/sdcard/"+dataItem.title));
            return;
        }
                           
        if(files.isDir(currPath+dataItem.title)){
            files.removeDir(currPath+dataItem.title);
        }else{
            files.remove(currPath+dataItem.title);
        }
        updateList(currPath);
        toast("删除成功");
    });
});

ui.emitter.on("back_pressed", event => {    
     if (currPath != context.getDataDir().getPath() + "/") {
         var ss = currPath.substring(0, currPath.length - 1)
         currPath = ss.substring(0, ss.lastIndexOf("/") + 1);
         updateList(currPath);
         event.consumed=true;
     }
});
