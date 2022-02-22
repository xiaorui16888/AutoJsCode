//适用于手机触屏坏了，用一个手机控制另一个手机，相当于手机接otg鼠标效果
//在控制端填入被控端ip地址即可控制，需要两个手机在同一局域网内

 w0 = floaty.rawWindow(
     <frame id="移动11" gravity="center"> 
        <vertical>
            <text w="15" h="15" textColor="red" bg="#00000000">↖</text> 
          </vertical>
     </frame>
 );
 w0.setTouchable(false);
 w0.setPosition(100, 300)
 sleep(10)
 importClass('java.net.Inet4Address');
 importClass('java.net.InetAddress');
 importClass('java.net.NetworkInterface');
 importClass('java.util.Enumeration');
 importClass('java.net.Inet6Address');
 var hostIp = null;
 try {
     var nis = NetworkInterface.getNetworkInterfaces();
     var ia = null;
     while (nis.hasMoreElements()) {
         var ni = nis.nextElement();
         var ias = ni.getInetAddresses();
         while (ias.hasMoreElements()) {
             ia = ias.nextElement();
             if (ia instanceof Inet6Address) {
                 continue;
             }
             var ip = ia.getHostAddress();
             if (!"127.0.0.1".equals(ip)) {
                 hostIp = ia.getHostAddress();
                 break;
             }
         }
     }
 } catch (e) {
     log(e);
 }
 toastLog("本机ip:" + hostIp);
 toastLog("本机ip:" + hostIp);
 toastLog("本机ip:" + hostIp);
 importClass('java.io.BufferedReader');
 importClass('java.io.IOException');
 importClass('java.io.InputStream');
 importClass('java.io.InputStreamReader');
 importClass('java.io.OutputStream');
 importClass('java.io.PrintWriter');
 importClass('java.net.Socket');
 importClass('java.net.ServerSocket');
 events.on("exit", function() {
     log("结束运行");
     服务器接口.close();
     thread.interrupt();
     log("结束")
 });
 var 服务器接口 = new ServerSocket(8888);
 a = 0
 var thread = threads.start(function() {
     while (true) {
         //log(a)
         a++
         操作(收到回复("收到" + a))
     }
 });

 setInterval(() => {
     sleep(200);
 }, 1000);

 function 收到回复(text) {
     var socket = 服务器接口.accept();
  //   log("客户端已链接")
     var 输入流 = socket.getInputStream();
     var 输入流读出器 = new InputStreamReader(输入流);
     var 缓冲读出器 = new BufferedReader(输入流读出器);
     var temp = 缓冲读出器.readLine();
   //  log("收到客户端信息：\n" + temp + "\n\n当前客户端ip为：\n" + socket.getInetAddress().getHostAddress());
     var 输出流 = socket.getOutputStream();
     var printWriter = new PrintWriter(输出流);
     printWriter.print(text);
     printWriter.flush();
     socket.shutdownOutput(); //关闭输出流
     return temp
     printWriter.close();
     输出流.close();
     缓冲读出器.close();
     输入流.close();
 }


 function 操作(ml) {
     ml = ml.split("♥")
     var x = w0.getX()
     var y = w0.getY()
     if (ml[0] == "鼠标移动") {
         x = x - (-ml[1]);
         y = y - (-ml[2]);
         let fx = context.getResources().getConfiguration().orientation;
         let w = device.width;
         let h = device.height;
         if (fx == 1) {
             if (x < 1) x = 0
             if (x > w - 1) x = w - 1
             if (y < 1) y = 0
             if (y > h - 1) y = h
         } else {
             if (x < 1) x = 0
             if (x > h - 1) x = h
             if (y < 1) y = 0
             if (y > w - 1) y = w - 1
         }
        // log(x, y);
         ui.run(function() {
             w0.setPosition(x, y)
         });
     } else if (ml[0] == "鼠标点击") {
         click(x, y)
     } else if (ml[0] == "鼠标长按") {
         press(x, y, ml[1])
     } else if (ml[0] == "滑动") {
         x1 = x - (-ml[1]);
         y1 = y - (-ml[2]);
        // log(x, y, x1, y1, ml[3])
         try {
             swipe(x, y, x1, y1, ml[3])
         } catch (e) {}
     } else if (ml[0] == "返回") {
         back()
     } else if (ml[0] == "主页") {
         home()
     } else if (ml[0] == "任务") {
         recents()
     }
 }