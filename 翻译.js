auto.waitFor();
var all="";
all=all.split("");
for(var i=0;i<all.length;i++){
    if(isChinese(all[i])){
        var cstr=all[i];
        for(var end=i+1;end<all.length;end++){
            if(!temp(all[end])){
                break;
            }
            cstr=cstr+all[end];
            all[end]="";
        }
        all[i]=t_sogou(c_str);
    }
}
log(all);


function t_sogou(str) {
    url = "http://fanyi.sogou.com/reventondc/translate";
    var text = http.post(url, {
      "from": "en",
      "to": "zh-CHS",
      "text": str
    }).body.string();
    log(text);
    eval("text=" + text);
    return text.translate.dit;
}
function isChinese(temp){
    var re=/[^/u4e00-/u9fa5]/;
    if (re.test(temp)) return false ;
    return true ;
}

