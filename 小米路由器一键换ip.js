"ui";
token="";
wg = "192.168.31.1";
name = "admin";
password = "";


if(token==""){
showLoginUI();}else{showRegisterUI();}
ui.statusBarColor("#000000")

//显示登录界面
function showLoginUI() {
    ui.layout(
        <frame bg="#ff1682dd">
            <vertical h="auto" align="center" margin="0 50">
                <text text="欢迎使用小米路由器" size="22" gravity="center" color="#ffffff"/>
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">网关</text>
                    <input id="wg" w="*" h="40" text=""/>
                </linear>
                
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">用户名</text>
                    <input id="name" text="" w="*" h="40"/>
                </linear>
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">密码</text>
                    <input id="password" w="*" h="40"/>
                </linear>
                <linear gravity="center">
                    <button id="login" bg="#ff4f8ac6" color="#f2f2f2" text="获取token"/>
                </linear>
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">token</text>
                    <input id="token" w="*" h="40" size="8"/>
                </linear>
                
                <linear gravity="center">
                    <button id="logjinru" bg="#ff4f8ac6" color="#f2f2f2" text="进入"/>
                </linear>
            </vertical>
        </frame>
    );
    if (token != "") {
        ui.token.text(token);
    }
    if (wg != "") {
        ui.wg.text(wg);
    }
    if (name != "") {
        ui.name.text(name);
    }
    if (password != "") {
        ui.password.text(password);
    }
    ui.login.on("click", () => {

        threads.start(function() {
            登录地址 = "http://" + ui.wg.text() + "/cgi-bin/luci/api/xqsystem/login";
            var y = http.post(登录地址, {
                "username": ui.name.text() + "",
                "password": ui.password.text() + ""
            }).body;
            token = y.json().token;
            //toast(token);
            if (token == null) {
                toast("输入错误！");
            } else {

                ui.run(function() {
                    ui.token.text(token);
                });

                zxgx(1, 'token="' + ui.token.text() + '";');
                token=ui.token.text()+"";

                if (wg != ui.wg.text() + "") {
                    toast("网关变化");
                    zxgx(2, 'wg="' + ui.wg.text() + '";');
                }
                if (name != ui.name.text() + "") {
                    toast("用户名变化");
                    zxgx(3, 'name="' + ui.name.text() + '";');
                }
                if (password != ui.password.text() + "") {
                    toast("密码变化");
                    zxgx(4, 'password="' + ui.password.text() + '";');
                }

            }

        });
    });
    ui.logjinru.on("click", function(){showRegisterUI();});
}

//显示进入界面
function showRegisterUI() {
    ui.layout(
        <frame>
            <vertical h="auto" align="center" margin="0 50">
                <linear>
                    <text w="auto" gravity="center" color="#111111" size="16">广网口</text>
                    <input w="*" id="gw" h="40"/>
                </linear>
                <linear>
                    <text w="auto" gravity="center" color="#111111" size="16">广网口分配的ip</text>
                    <input w="*" id="ip" h="40"/>
                </linear>
                <linear>
                    <text w="auto" gravity="center" color="#111111" size="16">DNS:</text>
                    <input id="dns0" w="150" h="40" />
                    <input id="dns1" w="150" h="40" />
                    
                </linear>
                <linear>
                    <text w="auto" gravity="center" color="#111111" size="16">宽带号</text>
                    <input id="pppoename" w="*" h="40" inputType="textEmailAddress"/>
                </linear>
                <linear>
                    <text w="auto" gravity="center" color="#111111" size="16">宽带密</text>
                    <input w="*" id="password" h="40"/>
                </linear>
                
                <linear gravity="center">
             

                    <button id="hip">重新拨号</button>
                    <button id="cancel">重新登陆</button>
                </linear>
            </vertical>
        </frame>
    );
    ui.cancel.on("click", () => showLoginUI());
    ztb();
             engines.execScript("一键换ip",'token="'+token+'";wg="'+wg+'";\n'+xx+link+unlink+b64("CgoKCnZhciB3aW5kb3cgPSBmbG9hdHkud2luZG93KAogICAgPHZlcnRpY2FsPgogICAgICAgIDx0ZXh0IGlkPSJoaXAiIGg9IjQwIiB3PSI0MCIgZ3Jhdml0eT0iY2VudGVyIiBjb2xvcj0iI2ZmZmZmZiIgYmc9IiM3NzAwMDAwMCIgdGV4dD0i4payIi8+CiAgICA8L3ZlcnRpY2FsPgoKKTsKdmFyIGV4ZWN1dGlvbiA9IG51bGw7CgovL+iusOW9leaMiemUruiiq+aMieS4i+aXtueahOinpuaRuOWdkOaghwp2YXIgeCA9IDAsCiAgICB5ID0gMDsKLy/orrDlvZXmjInplK7ooqvmjInkuIvml7bnmoTmgqzmta7nqpfkvY3nva4KdmFyIHdpbmRvd1gsIHdpbmRvd1k7Ci8v6K6w5b2V5oyJ6ZSu6KKr5oyJ5LiL55qE5pe26Ze05Lul5L6/5Yik5pat6ZW/5oyJ562J5Yqo5L2cCnZhciBkb3duVGltZTsKd2luZG93LmhpcC5zZXRPblRvdWNoTGlzdGVuZXIoZnVuY3Rpb24odmlldywgZXZlbnQpIHsKICAgIHN3aXRjaCAoZXZlbnQuZ2V0QWN0aW9uKCkpIHsKICAgICAgICBjYXNlIGV2ZW50LkFDVElPTl9ET1dOOgogICAgICAgICAgICB4ID0gZXZlbnQuZ2V0UmF3WCgpOwogICAgICAgICAgICB5ID0gZXZlbnQuZ2V0UmF3WSgpOwogICAgICAgICAgICB3aW5kb3dYID0gd2luZG93LmdldFgoKTsKICAgICAgICAgICAgd2luZG93WSA9IHdpbmRvdy5nZXRZKCk7CiAgICAgICAgICAgIGRvd25UaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIGNhc2UgZXZlbnQuQUNUSU9OX01PVkU6CiAgICAgICAgICAgIC8v56e75Yqo5omL5oyH5pe26LCD5pW05oKs5rWu56qX5L2N572uCgogICAgICAgICAgICB3aW5kb3cuc2V0UG9zaXRpb24od2luZG93WCArIChldmVudC5nZXRSYXdYKCkgLSB4KSwKICAgICAgICAgICAgICAgIHdpbmRvd1kgKyAoZXZlbnQuZ2V0UmF3WSgpIC0geSkpOwoKICAgICAgICAgICAgLy8gaWYoeHM9PTEpeyAKICAgICAgICAgICAgLy8gICB3aW5kb3cyLnNldFBvc2l0aW9uKHdpbmRvd1ggKyAoZXZlbnQuZ2V0UmF3WCgpIC0geCksCiAgICAgICAgICAgIC8vICAgIHdpbmRvd1kgKyAoZXZlbnQuZ2V0UmF3WSgpIC0geSkrODIpOwogICAgICAgICAgICAvLyB9CiAgICAgICAgICAgIC8v5aaC5p6c5oyJ5LiL55qE5pe26Ze06LaF6L+HMS4156eS5Yik5pat5Li66ZW/5oyJ77yM6YCA5Ye66ISa5pysCiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIGNhc2UgZXZlbnQuQUNUSU9OX1VQOgogICAgICAgICAgICAvL+aJi+aMh+W8uei1t+aXtuWmguaenOWBj+enu+W+iOWwj+WImeWIpOaWreS4uueCueWHuwogICAgICAgICAgICBpZiAoTWF0aC5hYnMoZXZlbnQuZ2V0UmF3WSgpIC0geSkgPCA1ICYmIE1hdGguYWJzKGV2ZW50LmdldFJhd1goKSAtIHgpIDwgNSkgewogICAgICAgICAgICAgICAgaWYgKChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLSBkb3duVGltZSA+IDUwMCkgewogICAgICAgICAgICAgICAgICAgIHRocmVhZHMuc3RhcnQoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBleGl0KCk7CiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewoKICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKCk7CgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CgogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICAgIHJldHVybiB0cnVlOwp9KTsKCgpmdW5jdGlvbiBvbkNsaWNrKCkgewogICAgaWYgKHdpbmRvdy5oaXAudGV4dCgpID09ICLilrIiKSB7CiAgICAgICAgdWkucnVuKGZ1bmN0aW9uKCl7d2luZG93LmhpcC50ZXh0KCLilqAiKTt9KTsKICAgICAgICB0aHJlYWRzLnN0YXJ0KGZ1bmN0aW9uKCkgewogICAgICAgICAgICBjb25zb2xlLnNob3coKTsKICAgICAgICAgICAgbG9nKHh4KCkuaXAuYWRkcmVzcyk7CiAgICAgICAgICAgIHVubGluaygpOwogICAgICAgICAgICBsb2coInVubGluayIpOwogICAgICAgICAgICBsaW5rKCk7CiAgICAgICAgICAgIGxvZygibGluayIpOwogICAgICAgICAgICBzbGVlcCgyMDAwKTsKICAgICAgICAgICAgbG9nKHh4KCkuaXAuYWRkcmVzcyk7CiAgICAgICAgICAgIGNvbnNvbGUuaGlkZSgpOwogICAgICAgICAgICB1aS5ydW4oZnVuY3Rpb24oKXt3aW5kb3cuaGlwLnRleHQoIuKWsiIpO30pOwogICAgICAgIAogICAgICAgIH0pOwogICAgfSBlbHNlIHsKICAgICAgICB0aHJlYWRzLnNodXREb3duQWxsKCk7CiAgICAgICAgY29uc29sZS5oaWRlKCk7CiAgICAgICAgdWkucnVuKGZ1bmN0aW9uKCl7d2luZG93LmhpcC50ZXh0KCLilrIiKTt9KTsKICAgICAgICAKICAgIH0KCgoKCn0KCgp3aGlsZSAodHJ1ZSkgewogICAgc2xlZXAoMTAwMCk7Cn0="));
    ui.hip.on("click", function(){
    threads.shutDownAll();
     threads.start(function() {
           
            //console.show();
            unlink();
           xs("断开");
            link();
            xs("连接");
            k=0;
           while(true){sleep(100);
           try{b=xx().ip.address;
           if(b!=null&&b!=""){break;}else{k++;xs("连接中"+k);}
           }catch(e){}
           }
           xs("重新拨号");
           
            ztb0();
         
       
        
        });
    
    
    });
    
    
    function xs(str){
    ui.run(function(){
    ui.hip.text(str+"");
    });
    }
function ztb0(){
var a=xx();
        ui.run(function(){
            ui.gw.text(a.gw);
            ui.dns0.text(a.dns[0]);
            ui.dns1.text(a.dns[1]);
            ui.pppoename.text(a.pppoename);
            ui.ip.text(a.ip.address);
            ui.password.text(a.password);
        });
}
    
function ztb(){
    threads.start(function(){
       ztb0();
    });
}
    
}





function unlink() {
    var url = "http://"+wg+"/cgi-bin/luci/;stok=" + token + "/api/xqnetwork/pppoe_stop";
    var a = http.get(url);
}

function link() {
    var url = "http://"+wg+"/cgi-bin/luci/;stok=" + token + "/api/xqnetwork/pppoe_start";
    var a = http.get(url).body.string();
}

function xx() {
    var url = "http://"+wg+"/cgi-bin/luci/;stok=" + token + "/api/xqnetwork/pppoe_status";
    var a = http.get(url).body.json();
    return a;
}


function zxgx(num, str) {
    var path = engines.myEngine().getSource();
    var a = files.read(path).split("\n");
    a[num] = str;
    files.write(path, a.join("\n"));
}

function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}
