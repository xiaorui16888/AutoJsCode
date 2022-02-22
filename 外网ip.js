console.show();
log(ip());

function ip() {
    var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
    var InetIP = getIp_api.body.string();
    eval(InetIP);
    return returnCitySN.cip;
}
