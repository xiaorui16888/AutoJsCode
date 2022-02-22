var window = floaty.window(
    <vertical>
        <linear>
            <button id="action" text="▲" w="40" h="40" color="#ffffff"  margin="0" bg="#99000000"/>
        </linear>
    </vertical>

);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置

            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            // if(xs==1){ 
            //   window2.setPosition(windowX + (event.getRawX() - x),
            //    windowY + (event.getRawY() - y)+82);
            // }
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                if ((new Date().getTime()) - downTime > 500) {
                    threads.start(function() {
                        exit();
                    });
                } else {
                    threads.start(function() {
                        onClick();
                    });
                }
            }

            return true;
    }
    return true;
});
xs = 0;

function onClick() {

    if (xs == 1) {
        xs = 0;
        threads.shutDownAll();
        ui.run(() => {
            window.action.text("▲");
        });


    } else {
        xs = 1;
        ui.run(() => {
            window.action.text("■");
        });
        threads.start(function(){
            disableNetWordLick(-1);
            //console.show();
            op=0;
            sleep(3000);
            ui.run(() => {
            window.action.text("▲");
        });
        });
        
        
    }

}







var wifiManager; // 声明管理对象 
var wifiInfo; // Wifi信息 
var scanResultList; // 扫描出来的网络连接列表 
var wifiConfigList; // 网络配置列表 
var wifiLock; // Wifi锁 
function WifiManageClass(context) {
    this.wifiManager = context
        .getSystemService(android.content.Context.WIFI_SERVICE); // 获取Wifi服务 
    // 得到Wifi信息 
    this.wifiInfo = wifiManager.getConnectionInfo(); // 得到连接信息 
}

function getWifiStatus() {
    return wifiManager.isWifiEnabled();
} // 打开/关闭 wifi 
function openWifi() {
    if (!wifiManager.isWifiEnabled()) {
        return wifiManager.setWifiEnabled(true);
    } else {
        return false;
    }
}

function closeWifi() {
    if (!wifiManager.isWifiEnabled()) {
        return true;
    } else {
        return wifiManager.setWifiEnabled(false);
    }
}
// 锁定/解锁wifi 
// 其实锁定WiFI就是判断wifi是否建立成功，在这里使用的是held，握手的意思acquire 得到！ 
function lockWifi() {
    wifiLock.acquire();
}

function unLockWifi() {
    if (!wifiLock.isHeld()) {
        wifiLock.release(); // 释放资源 
    }
}
// 我本来是写在构造函数中了，但是考虑到不是每次都会使用Wifi锁，所以干脆自己建立一个方法！需要时调用，建立就OK 
function createWifiLock() {
    wifiLock = wifiManager.createWifiLock("flyfly"); // 创建一个锁的标志 
} // 扫描网络 
function startScan() {
    wifiManager.startScan();
    scanResultList = wifiManager.getScanResults(); // 扫描返回结果列表 
    wifiConfigList = wifiManager.getConfiguredNetworks(); // 扫描配置列表 
}

function getWifiList() {
    return scanResultList;
}

function getWifiConfigList() {
    return wifiConfigList;
}
// 获取扫描列表 
function lookUpscan() {
    scanBuilder = new java.lang.StringBuilder();
    for (i = 0; i < scanResultList.size(); i++) {
        scanBuilder.append("编号：" + (i + 1));
        scanBuilder.append(scanResultList.get(i).toString());
        //所有信息 
        scanBuilder.append("\n");
    }
    return scanBuilder;
} //获取指定信号的强度 
function getLevel(NetId) {
    return scanResultList.get(NetId).level;
} // 获取本机Mac地址 
function getMac() {
    return (wifiInfo == null) ? "" : wifiInfo.getMacAddress();
}

function getBSSID() {
    return (wifiInfo == null) ? null : wifiInfo.getBSSID();
}

function getSSID() {
    return (wifiInfo == null) ? null : wifiInfo.getSSID();
}
// 返回当前连接的网络的ID 
function getCurrentNetId() {
    return (wifiInfo == null) ? null : wifiInfo.getNetworkId();
} // 返回所有信息 
function getwifiInfo() {
    return (wifiInfo == null) ? null : wifiInfo.toString();
} // 获取IP地址 
function getIP() {
    return (wifiInfo == null) ? null : wifiInfo.getIpAddress();
} // 添加一个连接 
function addNetWordLink(config) {
    NetId = wifiManager.addNetwork(config);
    return wifiManager.enableNetwork(NetId, true);
} // 禁用一个链接 
function disableNetWordLick(NetId) {
    wifiManager.disableNetwork(NetId);
    return wifiManager.disconnect();
} // 移除一个链接 
function removeNetworkLink(NetId) {
    return wifiManager.removeNetwork(NetId);
} //不显示SSID 
function hiddenSSID(NetId) {
    wifiConfigList.get(NetId).hiddenSSID = true;
} //显示SSID
function displaySSID(NetId) {
    wifiConfigList.get(NetId).hiddenSSID = false;
}


WifiManageClass(context);



while (true) {
    sleep(1000);
   
}


