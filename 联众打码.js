/*
仅供学习和测试，请勿用于非法途径。
*/
function lz(u, p, x, y, w, h) {
    http.__okhttp__.setTimeout(3e4);
    if (!requestScreenCapture()) {
        toast("请求截图失败");
    }
    var path = "/sdcard/1.png";
    var img = captureScreen();
    images.saveImage(img, path);
    var img = images.read(path);
    img = images.clip(img, x, y, w, h);
    images.saveImage(img, path);
    var r = images.toBase64(images.read(path), format = "png");
    var i = device.release;
    var c = device.model;
    var s = device.buildId;
    try {
        var n = http.postJson("https://v2-api.jsdama.com/upload", {
            softwareId: 11659,
            softwareSecret: "pVDcMkEUiUGqCR4itUKH0kvGiXoPkq8RvxehMpI7",
            username: u,
            password: p,
            captchaData: r,
            captchaType: 1001,//1001表示数字英文结合的4位验证码，详情参阅https://www.jsdati.com/docs/price
            captchaMinLength: 0,
            captchaMaxLength: 0,
            workerTipsId: 0
        }, {
            headers: {
                Host: "v2-api.jsdama.com",
                Connection: "keep-alive",
                "Content-Length": "298",
                Accept: "application/json, text/javascript, */*; q=0.01",
                "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
                "Content-Type": "text/json"
            }
        });
    } catch (e) {
        return {
            code: "-1",
            msg: "网络链接超时...",
            data: {}
        };
    }
    var d = n.body.json(),
        p = d.code,
        m = d.message;
    if ("10079009" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142004" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142005" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10079006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("0" == p) {
        return {
            code: p,
            msg: m,
            data: {
                res: d.data.recognition
            }
        };
    }
    return d;
}

log(lz(username, password, x, y, w, h));//填写联众账号,密码,验证码图片左上角x坐标,y坐标,验证码图片宽度,高度
