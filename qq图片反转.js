rotate("/sdcard/tencent/MobileQQ/diskcache/")
rotate("/sdcard/tencent/MobileQQ/head/_hd/")
rotate("/sdcard/tencent/QQ_Images/")

toast("重启QQ试试")

function rotate(path) {
    var head = files.listDir(path);
    for (var i = 0; i < head.length; i++) {
        try{
        var image = images.rotate(images.read(path + head[i]), 180)
        images.save(image, path + head[i])
        }
        catch(e){log(head[i]+"  "+i)}
    }
}