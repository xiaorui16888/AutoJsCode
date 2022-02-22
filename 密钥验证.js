compareKey("123");
compareKey("ZTG");
//46*46*46种可能 

function compareKey(code){
    var allText = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //每个安卓id都不一样，所以无法传播，破解脚本当我没说
    var idText = device.getAndroidId();
    log("唯一androidid:"+idText);
    var a1=0,a2=10000,a3=0,key="";
    for (let index = 0; index < idText.length; index++) {
        a1 += idText.charCodeAt(index);
        a2 -= idText.charCodeAt(index);
        a3 += a1+a2;
    }
    a1 %= allText.length;
    a2 %= allText.length;
    a3 %= allText.length;
    key += allText.charAt(a1);
    key += allText.charAt(a2);
    key += allText.charAt(a3);
    //log("生成的简单密钥:"+key);
    if(key.trim() == code.trim()){
        alert("密钥正确");
    }else{
        alert("密钥错误","给986883511冲10块钱Q币\n我就告诉你");
    }
}

