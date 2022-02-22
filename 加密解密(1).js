var JM=encrypt(dialogs.rawInput("请输入要加密的字符串"));
alert("加密完成的内容：",JM);
toast("加密文件已设置到剪贴板");
setClip(JM);
var AM=decode(dialogs.rawInput("请输入要解密的字符串"));
alert("解密完成的内容：",AM);

function encrypt(stringW){
    //添加尾判断符号
    var str=stringW+"٩";
    
    //添加随机字符
    var ranWs=random(1,6);
    var str1="";
    for(var i=0;i<str.length;i++){
        str1=str1+str[i];
        if(i%ranWs==0){
            str1=str1+ranLetter();
        }
    }
    log(str1)
    str1=ranWs+str1;
    
    //转换倒序
    str1=str1.split("").reverse();
    
    //替换对应值
    for(var x=0;x<str1.length;x++){
        str1[x]=charDh(str1[x]);
    }
    
    return str1.join("");
}

function decode(stringJ){
    var str2=stringJ.split("");
    
    //替换回原值
    for(var x=0;x<str2.length;x++){
        str2[x]=charDh(str2[x]);
    }
    
    //颠倒顺序
    str2=str2.reverse().join("");
    log(str2)
    //去掉多余
    var tt=parseInt(str2[0]);
    str2=str2.substring(1,str2.length-1);
    var str3="";
    for(var y=0;y<str2.length;y++){
        if((y-1)%(tt+1)!=0){
            str3=str3+str2[y];
        }
    }
    
    //去除尾端符号
    if(str3[str3.length-1]=="٩"){
        str3=str3.substring(0,str3.length-1);
    }
    
    return str3;
}

function charDh(cha){
    var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for(var jw=0;jw<arr.length;jw++){
        if(cha==arr[jw]){
            return arr[arr.length-1-jw];
        }
    }
    return cha;
}

function ranLetter(){
    var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var ran=random(0,3);
    if(ran==0){
        return random(0,9);
    }else if(ran==1){
        return arr[random(0,arr.length-1)];
    }else{
        return arr[random(0,arr.length-1)].toUpperCase();
    }
}

