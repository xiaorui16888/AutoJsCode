"ui";
/*
 * @Author: 笔青居
 * @Date: 2018-11-03 14:25:48
 * @email: 644613693@qq.com
 * @lastEditors: 笔青居
 * @LastEditTime: 2019-05-13 15:56:13
 * @Description: 脚本仓库，用来上传以及下载代码使用，对代码有疑问可以加Q群：715332614
 */

const baseUrl="https://www.biqingju.com/";
const marketUrl="http://www.biqingju.com:8888/autojs/api/v3/market/appList";
const versionCode=2;
const versionName="0.0.2";
const myImei="";
const curFileName="脚本仓库.js";
var currentPage=1;
//主题色
const themeColor="#aaccaa";

if(!app.autojs.versionCode||app.autojs.versionCode<310){
    toast("AutoJs版本过，请使用最新版本。");
    exit();
}

ui.layout(
    <vertical>
        <appbar>
            <toolbar bg={themeColor} id="toolbar" title="笔青居 {{this.versionName}}"/>
            <tabs bg={themeColor} id="tabs"/>
        </appbar>
        <viewpager bg={themeColor} id="viewpager"  >
            <frame >
                <vertical focusable="true" focusableInTouchMode="true" >
                    <input id="search_local" marginTop="8" marginLeft="18" marginRight="18" bg="#eeeeee" paddingLeft="18" paddingRight="18" hint="本地搜索"/>
                    <list id="list" marginTop="4" marginLeft="16" marginRight="16" marginBottom="16">
                        <text text="{{this.displayName}}" textColor="#4a3113" textSize="18sp" margin="5 0 5 10"/>
                    </list>
                </vertical>
                <progressbar w="64" h="64" id="pro_local" layout_gravity="center" marginBottom="64"/>
            </frame>
            <frame>
                <vertical focusable="true" focusableInTouchMode="true">
                    <input id="search_service" marginTop="8" marginLeft="18" marginRight="18" bg="#eeeeee" paddingLeft="18" paddingRight="18" hint="服务端搜索"/>
                    <list id="list2" layout_weight="1" h="0" marginTop="4" marginLeft="16" marginRight="16" marginBottom="16" >
                        <text text="{{this.displayName}}" textColor="{{this.displayColor}}" textSize="18sp" margin="5 0 5 10"/>
                    </list>
                </vertical>
                <progressbar w="64" h="64" id="pro_service" layout_gravity="center" marginBottom="64"/>
            </frame>
            <frame>
                <vertical w="*" focusable="true" focusableInTouchMode="true">
                    <input id="search_market" marginTop="8" marginLeft="18" marginRight="18" bg="#eeeeee" paddingLeft="18" paddingRight="18" hint="应用市场搜索"/>
                    <grid spanCount="3" id="list3" layout_weight="1" h="0" marginTop="4" marginLeft="16" marginRight="16" marginBottom="16" >
                        <vertical  layout_gravity="center" w="*" padding="8">
                            <img scaleType="centerCrop"  layout_gravity="center" w="48" h="48" src="{{this.displayImg}}" />
                            <text w="*" textColor="red" lines="1" ellipsize="end" marginLeft="8" gravity="center" text="{{this.displayName}}" textColor="#4a3113" textSize="18sp" />
                        </vertical>
                    </grid>
                    <button id="more_market" style="Widget.AppCompat.Button.Colored" bg="#009688" >加载更多</button>
                </vertical>
                <progressbar w="64" h="64" id="pro_market" layout_gravity="center" marginBottom="64"/>
            </frame>
        </viewpager>
    </vertical>
);


function main(){
    checkVersion();
    //存储本地名称列表，用来与服务器对比是否有相同的文件
    localNameList=[];
    //存放本地文件列表初始化
    localList=[];
    serviceList=[];
    marketList=[];
    //获取当前脚本所在目录
    basePath=engines.myEngine().cwd();
    toast("当前所读取的目录是->"+basePath);
    notifyLocalFiles();
    notifyServicaFiles();
    notifyMarketFiles();
    uiInit();
    //0是滚动  1是固定
    // ui.tabs.setTabMode(0);
}

/**
 * 刷新应用商店的列表
 */
function notifyMarketFiles(){
    ui.pro_market.setVisibility(0);
    threads.start(function() {
        log("currewn-->"+currentPage)
        var res=http.postJson(marketUrl, {
            "appName": "",
            "pageNo": currentPage,
            "pageSize":1
        });
        if(res.statusCode != 200){
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        var reqData=res.body.json();
        if(reqData["code"]!=200){
            toast("请求失败: " + reqData["code"] + " " + reqData["message"]);
            return;
        }
        log(reqData);
        //增加页码
        currentPage++;
        if(reqData["data"]["totalPage"]<=currentPage){
            ui.run(function(){
                //当前是最后一页，不显示加载更多按钮
                ui.more_market.setVisibility(8);
            });
        }
        var serviceList=reqData["data"]["list"];
        var tempList=[];
        serviceList.forEach(item=>{
            item["displayName"]=item["appName"];
            if(item["imgUrl"]){
                item["displayImg"]=item["imgUrl"]; 
            }else{
                //使用默认图
                item["displayImg"]="http://bmob-cdn-21628.b0.upaiyun.com/2018/11/14/9de8d9d7406aaf6b8012eb7e2628fd13.jpeg";
            }
            tempList.push(item)
        });
        ui.run(function(){
            ui.pro_market.setVisibility(8);
            marketList=marketList.concat(tempList);
            ui.list3.setDataSource(marketList);
        });
    });
}

/**
 * 刷新本地文件夹
 * 其中setVisbility 0是可见 8是隐藏
 */
function notifyLocalFiles(){
    threads.start(function(){
        readLoacalFiles(basePath,0);
        //主线程对ui进行操作
        ui.run(function(){
            ui.pro_local.setVisibility(8);
            ui.list.setDataSource(localList);
        });
    })
}

/**
 * 刷新服务端脚本
 */
function notifyServicaFiles(){
    ui.pro_service.setVisibility(0);
    threads.start(function(){
        let res = http.get(baseUrl+"codelist.php?"+"versionCode="+versionCode+"&user="+myImei);
        if(res.statusCode != 200){
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        //清空已有的列表
        serviceList=[];
        str=res.body.string();
        var tempList=JSON.parse(str);
        tempList.forEach((item,position)=>{
            let level=item["filePath"].split("/");
            let fileName=item["fileName"];
            let temp="";
            if(level.length>2){
                for (i=0; i<level.length-1; i++){
                    temp+="         ";
                }
                if(position<tempList.length-1&&tempList[position+1]["filePath"]!=item["filePath"]){
                    fileName=temp+"└─"+fileName;
                }else{
                    fileName=temp+"└─"+fileName;
                }
            }else if(position==tempList.length-1){
                fileName="└─"+fileName;
            }else{
                fileName="├─"+fileName;
            }
            if(localNameList.indexOf(item["fileName"])!=-1){
                item["displayName"]=fileName;
                item["displayColor"]="#4a3113";
                serviceList.push(item);
            }else if(item["filePath"]=="/代码未审核/"||item["fileName"=="代码未审核"]){
                item["displayName"]=fileName;
                item["displayColor"]="#d71345";
                serviceList.push(item);
            }else if(item["type"]==0){
                item["displayName"]=fileName;
                item["displayColor"]="#4a3113";
                serviceList.push(item);
            }else{
                item["displayName"]=fileName;
                item["displayColor"]="#005344";
                serviceList.push(item);
            }
        });
        //主线程对ui进行操作
        ui.run(function(){
            ui.pro_service.setVisibility(8);
            ui.list2.setDataSource(serviceList);
        });
    })
}

/**
 * 检测版本更新
 */
function checkVersion(){
    threads.start(function(){
        let res=http.get(baseUrl+"updata.php?"+"versionCode="+versionCode+"&user="+myImei);
            if(res.statusCode != 200){
                toast("更新失败: " + res.statusCode + " " + res.statusMessage);
                return;
            }
            let str=res.body.string();
            let json=JSON.parse(str);
            if(json["code"]==0){
                confirm(json["title"],json["content"],(value)=>{
                    if(value){
                        codePath=basePath+"/"+curFileName;
                        if(downloadCode(json["url"],codePath)){
                            toast("代码仓库更新完成，正在重新加载");
                            engines.execScriptFile(codePath);
                            ui.finish();
                        }else{
                            toast("脚本更新出现了问题");
                        }
                    }
                });
            }
    });
}

/**
 * 初始化逻辑代码
 */
function uiInit(){
    ui.statusBarColor(themeColor);
    activity.setSupportActionBar(ui.toolbar);
    ui.viewpager.setTitles(["点击分享本地代码", "下载服务器代码","应用市场"]);
    ui.tabs.setupWithViewPager(ui.viewpager);
    
    ui.emitter.on("create_options_menu", menu => {
        menu.add("联系我");
    });
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "联系我":
                alert("添加QQ群：715332614").then(()=>{
                    setClip("715332614");
                    toast("已复制到剪切板");
                });
                break;
        }
        e.consumed = true;
    });
    ui.more_market.click(function(){
        notifyMarketFiles();
    });
    
    initListClick();
    initListSearch();
}

function initListClick(){
    //本地代码上传监听
    ui.list.on("item_click", function(json) {
        if(files.isFile(json["filePath"])){
            confirm("是否分享\""+json["fileName"]+"\"代码给其他人").then(value=>{
                if(value){
                    uploadCode(json["filePath"]);
                }
            });
        }else{
            toast("这是一个文件夹，上传请点击文件");
        }
    });
    //服务器代码下载监听
    ui.list2.on("item_click", function(data) {
        if(data.type=="0"){
            toast("请点击具体文件下载");
            return;
        }
        threads.start(function(){   
            let localPath=basePath+data.filePath+data.fileName;
            let url=baseUrl+"/"+"download.php?filePath="+data.filePath+"&fileName="+data.fileName;
            log(url);
            if(files.exists(localPath)){
                confirm("是否覆盖本地代码\""+data["fileName"]+"\"?","",y=>{
                    if(y){
                        listDownLoadCode(data,url,localPath);
                    }
                });
            }else{
                listDownLoadCode(data,url,localPath);
            }
        });
    });
    //应用市场代码监听
    ui.list3.on("item_click",function(item){
        app.openUrl("http://autojs.biqingju.com:8888/autojs/market/detail.html?id="+item.appMarketId);
    });
}

function initListSearch(){
    //添加本地搜索输入框监听
    ui.search_local.addTextChangedListener(new android.text.TextWatcher({
        afterTextChanged:function(key){
            if(key!=""){
                ui.list.setDataSource(search(ui.list.getDataSource(),function(item){
                    return item.fileName.toUpperCase().indexOf((key+"").toUpperCase())!=-1;
                }));
            }else{
                //如果没有关键词，就恢复正常的数据
                ui.list.setDataSource(localList);
            }
        }
    }));
    //添加服务端搜索输入监听
    ui.search_service.addTextChangedListener(new android.text.TextWatcher({
        afterTextChanged:function(key){
            
            if(key!=""){
                ui.list2.setDataSource(search(ui.list2.getDataSource(),function(item){
                    return item.fileName.toUpperCase().indexOf((key+"").toUpperCase())!=-1;
                }));
            }else{
                //如果没有关键词，就恢复正常的数据
                ui.list2.setDataSource(serviceList);
            }
        }
    }));
    //添加应用市场搜索监听
    ui.search_market.addTextChangedListener(new android.text.TextWatcher({
        afterTextChanged:function(key){
            if(key!=""){
                ui.list3.setDataSource(search(ui.list3.getDataSource(),function(item){
                    return item.appName.toUpperCase().indexOf((key+"").toUpperCase())!=-1;
                }));
            }else{
                //如果没有关键词，就恢复正常的数据
                ui.list3.setDataSource(marketList);
            }
        }
    }));
}



/**
 * 做搜索操作
 * list:需要搜索的数组
 * key:关键词
 */
function search(list,filter){
    var sum = threads.disposable();
    threads.start(function(){
        //这里使用一个一个匹配，可以扩展成正则，最好的话使用数据库模糊匹配。
        var filterList=list.filter(function(item){
            //返回符合条件的
            return filter(item);
        });
        sum.setAndNotify(filterList);
    });
    return sum.blockedGet();
}


/**
 * 下载代码，并且改变字体颜色
 * item:脚本对象
 * url:下载地址
 * localPath：下载到本地的路径
 */
function listDownLoadCode(item,url,localPath){
    if(downloadCode(url,localPath)){
        notifyLocalFiles();
        ui.run(function(){
            item["displayColor"]="#4a3113" 
            ui.list2.setDataSource(serviceList);
            toast(item["fileName"]+"下载成功！");
        });
    }else{
        toast(item["fileName"]+"下载失败！");   
    }
}

/**
 * 上传代码到服务端
 *  fl:本地文件路径
 */
function uploadCode(fl){
    url=baseUrl+"codepush.php";
    threads.start(function() {
        var res = http.postMultipart(url, {
            imei: "",
            file: open(fl)
        });
        if(res.statusCode != 200){
            toast("上传失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let r=res.body.string();
        let j=JSON.parse(r);
        toastLog(j["msg"]);
        updataData();
    });
}


/**
 * 实际下载操作，可修改为then
 */
function downloadCode(url,localPath){
    var sum = threads.disposable();
    threads.start(function(){
        let res=http.get(url);
        if(res.statusCode != 200){
            toast("下载失败: " + res.statusCode + " " + res.statusMessage);
            sum.setAndNotify(false);
            return;
        }
        str=res.body.string();
        // let code=decodeURIComponent(str);
        files.createWithDirs(localPath);
        files.write(localPath,str);
        sum.setAndNotify(true);
        return;
    });
    return sum.blockedGet();
}


/**
 * 递归读取本地文件
 *  path:路径
 *  n:文件路径的层级
 */
function readLoacalFiles(path,n){
    let fileList=files.listDir(path);
    let temp=""
    for (i=0; i<n; i++)
    {
        temp+="         ";
    }
    fileList.forEach((fname,index)=>{
        let filePath=path+"/"+fname;
        let t=filePath.split(".");
        let fileJson={};
        fileJson["filePath"]=filePath;
        fileJson["fileName"]=fname;
        if(files.isFile(filePath)){
            if(t[t.length-1]!="js"&&t[t.length-1]!="auto"){
                return;
            }
            fileJson["md5"]=getMd5(filePath);
            fileJson["type"]="0";
            if (index==fileList.length-1){
                fileJson["displayName"]=temp+"└─"+fname;
            }else{
                fileJson["displayName"]=temp+"├─"+fname;
            }
            localNameList.push(fname)
            localList.push(fileJson);
        }else{
            fileJson["type"]="1";
            fileJson["displayName"]=temp+"├─"+fname;
            localList.push(fileJson);
            readLoacalFiles(filePath,n+1);
        }
    });
}

/**
 * 获取md5，暂时没用，可以用来判断代码是否与服务端的一致
 */
function getMd5(filePath){
    let result="";
    importClass(java.security.MessageDigest);
    let md5 = MessageDigest.getInstance("MD5");
    str=new java.lang.String(files.read(filePath));
    let bytes=md5.digest(str.getBytes("GBK"));
    importClass(java.lang.Integer);
    bytes.forEach(b=>{
        let temp = Integer.toHexString(b & 0xff).toString();
        if (temp.length == 1) {
            temp = "0" + temp;
        }
        result += temp;
    });
    return result;
}



main();