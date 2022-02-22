var ls_socket = {};
// 建立连接
ls_socket.initiate = function (ip, port){
    if (ls_socket.socket != undefined){
        console.log();
        return false;
    }
    ls_socket.socket = new java.net.Socket(ip, port);
    console.log("IP: " + ip + ", PORT: " + port + ", 连接成功!" );
}
// 监听信息
ls_socket.accept = function(fun){
    if (ls_socket.socket == undefined){
        console.log("请先建立连接!");
        return false;
    }
    threads.start(function(){
        //获取一个输入流，接收服务端的信息
        var inputStream = ls_socket.socket.getInputStream();
        //包装成字符流，提高效率
        var inputStreamReader = new java.io.InputStreamReader(inputStream);
        //缓冲区
        var bufferedReader = new java.io.BufferedReader(inputStreamReader);
        while(true){
            var msg = "";
            while((msg = bufferedReader.readLine()) != null){
                fun(msg);
            }
        }
    });
    console.log("监听消息成功!");
}
// 发送信息
ls_socket.send = function(msg){
    if (ls_socket.socket == undefined){
        console.log("请先建立连接!");
        return false;
    }
    //获取一个输出流，向服务端发送信息
    var outputStream = ls_socket.socket.getOutputStream();
    //将输出流包装成打印流
    var printWriter = new java.io.PrintWriter(outputStream);
    printWriter.println(msg);
    printWriter.flush();
    outputStream.flush();
    console.log("消息发送成功!");
}