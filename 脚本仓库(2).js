"ui";
/*
 * @Author: 笔青居
 * @Date: 2018-11-03 14:25:48
 * @email: 644613693@qq.com
 * @lastEditors: 笔青居
 * @LastEditTime: 2018-11-03 15:26:26
 * @Description: 脚本仓库，用来上传以及下载代码使用，对代码有疑问可以加Q群：715332614
 */

const baseUrl="https://www.biqingju.com/";
const versionCode=1;
const versionName="0.0.1";
const myImei=device.getIMEI();
const curFileName="脚本仓库.js";

if(app.autojs.versionCode<400){
    toast("AutoJs框架不支持");
    exit();
}

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="笔青居 {{this.versionName}}"/>
            <tabs id="tabs"/>
        </appbar>
        <viewpager id="viewpager">
                <vertical>
                    <list id="list" layout_weight="1" h="0" padding="5">
                        <vertical >
                            <text text="{{this.localFile}}" textColor="#4a3113" textSize="18sp" margin="5 0 5 10"/>
                        </vertical>
                    </list>
                </vertical>
            <vertical>
                <list id="list2" layout_weight="1" h="0" padding="5">
                    <vertical >
                        <text text="{{this.serviceFile}}" textColor="{{this.textColor}}" textSize="18sp" margin="5 0 5 10"/>
                    </vertical>
                </list>
                </vertical>
        </viewpager>
    </vertical>
);


function main(){
    checkVersion();
    Local_List=[];
    localNameList=[];
    localList=[];
    Service_List=[];
    serviceList=[];
    basePath=engines.myEngine().cwd();
    log(basePath);
    readLoacalFile(basePath,0);
    updataData();
    uiInit();
}

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

function updataLocalList(){
    Local_List=[];
    localNameList=[];
    localList=[];
    readLoacalFile(basePath,0);
    ui.run(function(){
        ui.list.setDataSource(Local_List);
    })
}

function uiInit(){
    activity.setSupportActionBar(ui.toolbar);
    ui.viewpager.setTitles(["点击分享本地代码", "下载服务器代码"]);
    ui.tabs.setupWithViewPager(ui.viewpager);
    ui.list.setDataSource(Local_List);
    ui.list2.setDataSource(Service_List);
    ui.list.on("item_click", function(item, position) {
        json=localList[position];
        // n=item.localFile.replace("├─","").replace("└─","").replace(/^\s+|\s+$/g, '');
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
    ui.list2.on("item_click", function(item, position) {
        threads.start(function(){
            let data=serviceList[position];
            if(data.type=="0"){
                toast("请点击具体文件下载");
                return;
            }
            let localPath=basePath+data.filePath+data.fileName;
            let url=baseUrl+"/"+"download.php?filePath="+data.filePath+"&fileName="+data.fileName;
            if(files.exists(localPath)){
                confirm("是否覆盖本地代码\""+data["fileName"]+"\"?","",y=>{
                    if(y){
                        listDownLoadCode(item,data,url,localPath);
                    }
                });
            }else{
                listDownLoadCode(item,data,url,localPath);
            }
        });
    });
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
}


function listDownLoadCode(item,data,url,localPath){
    if(downloadCode(url,localPath)){
        updataLocalList();
        ui.run(function(){
            item["textColor"]="#4a3113" 
            ui.list2.setDataSource(Service_List);
            toast(data["fileName"]+"下载成功！");
        });
            
    }else{
        toast(data["fileName"]+"下载失败！");   
    }
}


function uploadCode(fl){
    url=baseUrl+"codepush.php";
    threads.start(function() {
        var res = http.postMultipart(url, {
            imei: device.getIMEI(),
            file: open(fl)
        });
        if(res.statusCode != 200){
            toast("上传失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let r=res.body.string();
        let j=JSON.parse(r);
        toast(j["msg"]);
        updataData();
    });
}



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



function readLoacalFile(path,n){
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
        if(files.isFile(filePath)){
            if(t[t.length-1]!="js"&&t[t.length-1]!="auto"){
                return;
            }
            fileJson["filePath"]=filePath;
            fileJson["fileName"]=fname;
            fileJson["md5"]=getMd5(filePath);
            fileJson["type"]="0";
            localList.push(fileJson);
            localNameList.push(fname);
            if (index==fileList.length-1){
                Local_List.push({localFile:temp+"└─"+fname})
            }else{
                Local_List.push({localFile:temp+"├─"+fname})
            }
        }else{
            fileJson["filePath"]=filePath;
            fileJson["fileName"]=fname;
            fileJson["type"]="0";
            localList.push(fileJson);
            Local_List.push({localFile:temp+"├─"+fname})
            readLoacalFile(filePath,n+1);
        }
    });
}


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


function updataData(){
    Service_List=[];
    serviceList=[];
    threads.start(function() {
        let res = http.get(baseUrl+"codelist.php?"+"versionCode="+versionCode+"&user="+myImei);
        if(res.statusCode != 200){
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        str=res.body.string();
        serviceList=JSON.parse(str);
        serviceList.forEach((item,position)=>{
            let level=item["filePath"].split("/");
            let fileName=item["fileName"];
            let temp="";
            if(level.length>2){
                for (i=0; i<level.length-1; i++){
                    temp+="         ";
                }
                if(position<serviceList.length-1&&serviceList[position+1]["filePath"]!=item["filePath"]){
                    fileName=temp+"└─"+fileName;
                }else{
                    fileName=temp+"└─"+fileName;
                }
            }else if(position==serviceList.length-1){
                fileName="└─"+fileName;
            }else{
                fileName="├─"+fileName;
            }
            if(localNameList.indexOf(item["fileName"])!=-1){
                Service_List.push({serviceFile:fileName,textColor:"#4a3113"});
            }else if(item["filePath"]=="/代码未审核/"||item["fileName"=="代码未审核"]){
                Service_List.push({serviceFile:fileName,textColor:"#d71345"});
            }else if(item["type"]==0){
                Service_List.push({serviceFile:fileName,textColor:"#4a3113"});
            }else{
                Service_List.push({serviceFile:fileName,textColor:"#005344"});
            }
        });
        ui.run(function(){
            ui.list2.setDataSource(Service_List);
        })
    });
}

main();