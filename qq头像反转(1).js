var head = files.listDir("/sdcard/tencent/MobileQQ/head/_hd/", function(name){
    return name.endsWith(".js");
})
 for (var i = 0; i < head.length; i++) {
    var image = images.rotate(images.read("/sdcard/tencent/MobileQQ/head/_hd/" + head[i]), 180) 
    images.save(image, "/sdcard/tencent/MobileQQ/head/_hd/" + head[i])
}
toast("重启QQ试试")