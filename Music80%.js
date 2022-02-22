"ui";

//主题颜色
var color = "#fffb7299";
//设置顶部通知栏颜色
ui.statusBarColor(color);

//音乐文件的后缀名
var musicExts = [".mp3", ".wma", ".rm", ".wav", ".mid", ".ape", ".flac"];
//扫描路径
var path = "/sdcard/netease/cloudmusic/Music";
//保存音乐文件列表的数组
var musicFiles = [];

ui.layout(
    <drawer id="drawer" bg="file:///sdcard/脚本/PicsArt32.jpg">
        
        
        <vertical>
            <frame>
                <button id="button_cd" h="30" w="45" text="〓" bg="?selectableItemBackground"  textSize="18sp" padding="5" layout_gravity="center|left" textColor="#ffffff"  />
                <text text="Music1.0" h="30"   textStyle="bold" gravity="center"  bg={color} textSize="18sp" textColor="#ffffff"/>
                <button id="button_sz" h="30" w="45" text="#" bg="?selectableItemBackground"  textSize="18sp" padding="5" layout_gravity="center|right" textColor="#ffffff"  />
            </frame>
            
            <frame layout_weight="1" >
                //播放页面
                <vertical id="bfym" visibility="invisible" bg="#33000000" margin="0" layout_weight="1" >
                    <frame>
                        <input id="input_ss"  layout_gravity="center" bg="#80ffffff"  h="30" w="*" margin="0"  padding="0 60 0 15" textColorHint="#99363636" textSize="13sp" hint="搜索网络歌曲" singleLine="true" textColor="#99363636" />
                        <button id="button_ss" text="搜索" bg="?selectableItemBackground"  textSize="13sp" padding="5" layout_gravity="center|right" textColor="#99363636" h="30" w="50"  />
                    </frame>
                    
                    <text h="450" w="*" gravity="center" bg="#ffffff" text="歌词" />
                    <progressbar id="jdt1"  w="*" progress="20" max="100"  style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
                    
                    
                </vertical>
                
                //列表页面
                <list id="files"  visibility="visible"  layout_weight="1"  >
                    <vertical w="*">
                        //列表中间的边框，我自己想的笨方法
                        <frame h="1px" w="*" bg="#1affffff">
                        </frame>
                        <horizontal h="40" layout_weight="1" bg="?selectableItemBackground">
                            
                            <text id="sy" h="20" w="35" gravity="center" layout_gravity="center" margin="5" textSize="13sp" textColor="#ffffff" text="{{this.sy}}"  maxLines="1"  ellipsize="end"/>
                            <text id="name" w="*" gravity="left|center" layout_gravity="center" margin="0 20 0 0" h="20" textSize="13sp" textColor="#ffffff" text="{{this.name}}" maxLines="1"  ellipsize="end"/>
                            
                        </horizontal>
                        <frame h="1px" w="*" bg="#1affffff">
                        </frame>
                    </vertical>
                </list>
                
                //设置页面
                <ScrollView  id="szym" visibility="invisible" >
                    <vertical>
                        
                        <text text="主题颜色" h="20" bg="#ffffff" paddingLeft="10" textSize="16sp" gravity="left|center" />
                        
                        <horizontal>
                            <button  textColor="#ffffff"  w="65" h="100"  text="主题" textSize="15sp" margin="10" />
                            <button  textColor="#ffffff"  w="65" h="100"  text="主题" textSize="15sp" margin="10" />
                            <button  textColor="#ffffff"  w="65" h="100"  text="主题" textSize="15sp" margin="10" />
                            <button  textColor="#ffffff"  w="65" h="100"  text="主题" textSize="15sp" margin="10" />
                        </horizontal>
                        
                    </vertical>
                </ScrollView>
                
            </frame>
            
            //底部状态栏
            <horizontal id="ztl" h="45" bg={color}>
                <img  id="img_tx" h="35" w="35" margin="5" borderWidth="1dp" radius="20dp" src="file:///sdcard/crop.jpg" />
                <vertical h="45" layout_weight="1">
                    <text id="text_gqm" h="20" w="*" gravity="left|center"  textStyle="bold" maxLines="1" textColor="#ffffff" text="当前状态：等待播放" margin="5 15 0 0" textSize="15sp" ellipsize="end" />
                    <text id="text_dz" h="15" w="*" gravity="left|center"  textStyle="bold" maxLines="1" textColor="#ffffff" text="当前状态：等待播放" margin="0 15 0 0" textSize="10sp" ellipsize="end" />
                </vertical>
            </horizontal>
            
        </vertical>
        
        
        
        
        //侧边栏
        <vertical layout_gravity="left" bg="#ffffff" w="250">
            
            <list id="menu" layout_weight="1">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
        
    </drawer>
)

//底部状态栏头像测试播放下一首
var is = 0
ui.ztl.click(() => {
    toast(is + "  " + musicFiles.length)

    if (is == musicFiles.length - 1) {
        is = 0
        toast("is=0")
    }

    is++
    toast(is)
    media.playMusic(musicFiles[is].path)
})


ui.files.on("item_click", function(item, pos) {
    media.playMusic(item.path, 1);
    is = pos
    toast(pos)
    ui.text_gqm.setText(files.getNameWithoutExtension(item.path))
    ui.text_dz.setText(String("正在播放第" + (pos + 1) + "首 ") + " 当前文件夹：" + path)
})



var sy = 0
ui.files.setDataSource(musicFiles);
//启动线程来扫描音乐文件
var sm = threads.start(function() {
    listMuiscFiles(path, musicFiles);
})
sm.join()
ui.text_gqm.setText("当前路径找到" + sy + "首歌")
ui.text_dz.setText("当前文件夹：" + path)

function listMuiscFiles(dir, list) {
    sy = 0
    //遍历该文件夹的文件
    files.listDir(dir).forEach(fileName => {
        var path = files.join(dir, fileName);
        //如果是子文件夹则继续扫描子文件夹的文件
        if (files.isDir(path)) {
            listMuiscFiles(path, list);
            return;
        }

        for (var i = 0; i < musicExts.length; i++) {
            //如果文件名的后缀是音乐格式
            if (fileName.endsWith(musicExts[i])) {
                //则把它添加到列表中
                sy++
                list.push({
                    sy: sy,
                    name: files.getNameWithoutExtension(fileName),
                    path: path
                })
            }
        }
    })
}

ui.menu.setDataSource([{
        title: "本地音乐",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "播放页面",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "设置",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
])

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "本地音乐":
            ui.drawer.closeDrawers();
            ui.files.visibility = 0
            ui.bfym.visibility = 4
            ui.szym.visibility = 4
            break;

        case "播放页面":
            ui.drawer.closeDrawers();
            ui.files.visibility = 4
            ui.bfym.visibility = 0
            ui.szym.visibility = 4
            break;

        case "设置":
            ui.drawer.closeDrawers();
            ui.files.visibility = 4
            ui.bfym.visibility = 4
            ui.szym.visibility = 0
            break;

        case "退出":
            ui.drawer.closeDrawers();
            toast("退出")
            ui.finish();
            break;
    }
})