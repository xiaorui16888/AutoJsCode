imgFile = "/sdcard/DCIM/pipi/636716051.jpeg";
log(FaceCken(imgFile).sex)

function FaceCken(imgFile) {
    requestUrl = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
    accessToken = "24.305659aada0a085972c5a5974576be17.2592000.1558500064.282335-11544833";
    requestUrl = requestUrl + "?access_token=" + accessToken
    let res = http.post(requestUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        image: img64(imgFile),
        image_type: "BASE64",
        face_field: "age,beauty,gender"
    });
    let html = res.body.json().result.face_list;
    log("年龄：" + html[0].age)
    log("颜值：" + html[0].beauty);
    log("性别：" + ((html[0].gender.type) == "male" ? "男" : "女"));
    return {
        "age": html[0].age,
        "beauty": html[0].beauty,
        "sex": ((html[0].gender.type) == "male" ? "男" : "女")
    }
}

function img64(imgFile) {
    let img = images.read(imgFile)
    let img64 = images.toBase64(img)
    return img64
}