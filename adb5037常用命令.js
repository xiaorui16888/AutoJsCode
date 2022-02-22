查看adb端口
adb nodaemon server

adb kill-server

查看5037端口被谁占用了
netstat -aon|findstr "5037"

查找pid2748的程序
tasklist|findstr "7712"

结束进程
taskkill /f /t /im adb.exe

adb kill-server

adb start-server

解决方法：建立或修改 C:\用户\<你的用户名>\.android\Adb_usb.ini 文件，在该文件中添加一行文本，内容是设备的 Product ID（设备硬件 ID，如 0x2a45），然后执行 Adb kill-server，Adb devices。查看硬件 ID 的方法：进入设备管理器--选中当前已连接的 USB 手机设备-右键属性--详细信息--硬件 ID

4.在路径:%userprofile%\.android\adb_usb.ini 中添加下图中的硬件ID,例子如下:

