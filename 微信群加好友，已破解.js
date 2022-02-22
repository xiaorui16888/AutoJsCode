//注册码="+loQgz6cOr7Uhbv+e/NCxrARVu0d/DUxtN2UIZii2XPurPYHnDQk70ZVPdCpY9De";


code="2TcWQMSpdA8CU38FZf9Zqu4TPFDMCqtq4KbKeZpr+gIble6ldPZLZyq8NJf8xfieE9Gz7q3TebOYo4mPqZYDH2WWw58Jn2tsUg0eWuAsKZWhFObe//oLBW+Ggybudux48xqDTSyHbfu9lLfDS9hY/jDm9eTo1/o7YgrN3V9f8EIsfcLUiSUuCGrcxZK6rHAgrywxhxMqYV+f7877ihcaYZPGHO6NoRKQtGQkuoz0lnJ+RWLP9G4U8R0pxMqkfyD3vMm2Co0VjomAvAXclpIfMIQJwX96Ua1h5C62ykN+GwinK+otgo7IYbE/CEH3ccQKa0l4kc9KnvXXOJS2da+skcjoGyLkDifaalz4GHFtT7rgzl+XgSRabwPCj6xb6v/y3fKtNdFc/zFzpUnkTafltGcDulywfe3gFGeGLSFdnnhvKMqWvtDhn6T2sZ6vPGEfsSOX9A9wiLMRHb7r6tiLbFxBNJ++CR6Jw5UgegdGn2Ck9OGj1Hz6l48+Fxd42EwLinihl4ro5ynDsqJgYgHmSnzb4TyxOwuowoG1t3kpD9Y6zhDzdlOsKDVLx6svmwyOXAKnBI/Rbq1ucyInzC6AwGk7jxKvh8486ddNtbbt+cS6ILkLHMD3ER1dSvdTajgSEMLteNQ/V/+hJ+chLyCQr9XK6sN7jp581ugPwlqL18CtIGaR5Z+/7oUqoioa/tCkX3vU987EB3FRpsE1zwdawVPKo5E/ok32/1U6FEvaQ1wLtrwer4JPeWJ2JWvhHmAUAB/AkNCEeT5Vfqn21I05yeQKEcD5pW3AlqHxBDCnuOQhmEEDiBxcpki2/7r+DCVm0OrikZ6j0tgne8diOvW41udf59/okNpLPEGbzJ+nD2JdK5crYeZJpLIj/m8d68fSJV8O/ER5UyeqEIz7ECEhD4HQgRw3czDQ8Z9v0lFmA7VYo2G29Mg1ugFQgafnJdAg";
/*
try {
    注册信息 = 注册码decode(注册码, "脚本").split("|");
} catch (e) {
    alert("注册码不正确，联系qq787067033获取注册码");
    setClip(device.getIMEI());
}
注册信息[1] = parseInt(注册信息[1]);
if (注册信息[0] == device.getIMEI() || 注册信息[0] == "通用") {
    toast("到期时间:" + new Date(注册信息[1]).toLocaleString());
    if (注册信息[1] < (new Date()).getTime()) {
        alert("现在时间:" + new Date().toLocaleString() + "到期时间:" + new Date(注册信息[1]).toLocaleString() + "已过期");
        exit();
        while (true) {}
    }
} else {
    alert("注册码非本机注册码");
    exit();
    while (true) {}
}

function 注册码decode(content, password) {
    return decode(content, "qq787067033" + password);
}
*/
function decode(content, password) {
    var key = javax.crypto.spec.SecretKeySpec(md5(password, "md5"), "AES");
    var cipher = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
    var byteContent = android.util.Base64.decode(content, 0);
    cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key, javax.crypto.spec.IvParameterSpec(md5(password, "sha1")));
    var result = java.lang.String(cipher.doFinal(byteContent));
    return result.substring(4, result.length());
}

function md5(str, n) {
    var md5 = java.security.MessageDigest.getInstance(n);
    md5.update(java.lang.String(str).getBytes());
    return md5.digest().slice(0, 16);
}

function randomx(n) {
    var str = "";
    for (var i = 0; i < n; i++) {
        str += String.fromCharCode(random(0, 65535));
    }
    return str;
}
engines.execScript("脚本", decode(code, "我的qq号码是787067033，哈哈哈哈哈哈哈脚本"));

//62 - 1[[Function], [Function: eval]]
/*
function() {
    return "\\w+";
} {
    '0': '0',
    '1': '1',
    '2': '16',
    '3': '4',
    '4': '65535',
    '5': 'AES',
    '6': 'Base64',
    '7': 'CBC',
    '8': 'Cipher',
    '9': 'DECRYPT_MODE',
    '10': 'spec',
    '11': 'split',
    '12': 'str',
    '13': 'substring',
    '14': 'toLocaleString',
    '15': 'toast',
    '16': 'true',
    '17': 'try',
    '18': 'update',
    '19': 'util',
    '1o': '通用',
    '1n': '脚本',
    '1m': '联系qq787067033获取注册码',
    '1l': '现在时间',
    '1k': '注册码非本机注册码',
    '1j': '注册码不正确',
    '1i': '注册码decode',
    '1h': '注册码',
    '1g': '注册信息',
    '1f': '我的qq号码是787067033',
    '1e': '已过期',
    '1d': '哈哈哈哈哈哈哈脚本',
    '1c': '到期时间',
    '1b': 'while',
    '1a': 'var',
    Z: 'slice',
    Y: 'sha1',
    X: 'setClip',
    W: 'security',
    V: 'return',
    U: 'result',
    T: 'randomx',
    S: 'random',
    R: 'qq787067033',
    Q: 'password',
    P: 'parseInt',
    O: 'new',
    N: 'n',
    M: 'md5',
    L: 'length',
    K: 'lang',
    J: 'key',
    I: 'javax',
    H: 'java',
    G: 'init',
    F: 'if',
    E: 'i',
    D: 'getTime',
    C: 'getInstance',
    B: 'getIMEI',
    A: 'getBytes',
    z: 'function',
    y: 'fromCharCode',
    x: 'for',
    w: 'exit',
    v: 'execScript',
    u: 'engines',
    t: 'else',
    s: 'e',
    r: 'doFinal',
    q: 'digest',
    p: 'device',
    o: 'decode',
    n: 'crypto',
    m: 'content',
    l: 'code',
    k: 'cipher',
    j: 'catch',
    i: 'byteContent',
    h: 'android',
    g: 'alert',
    f: 'String',
    e: 'SecretKeySpec',
    d: 'PKCS5Padding',
    c: 'MessageDigest',
    b: 'IvParameterSpec',
    a: 'Date'
}
*/