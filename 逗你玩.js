while(true){
    var i = dialogs.select("大家都知道我是一个", "聪明人", "2b", "高富帅", "厉害的人");
    if(i == -1){
        toast("猜一下呗");
        continue;
    }
    if(i == 1){
        toast("你就是2b");
        break;
    }else{
        toast("答错辣")
    }
}


