//console. show()
auto.waitFor()
requestScreenCapture()
toast("开始计算")

var SERVERIP = "192.168.1.10"; //这里修改成服务端IP



importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');

while (true) {
    try {
        //创建Socket对象
        var socket = new Socket(SERVERIP, 62701);
        //根据输入输出流和服务端连接
        var outputStream = socket.getOutputStream(); //获取一个输出流，向服务端发送信息
        var printWriter = new PrintWriter(outputStream); //将输出流包装成打印流
        var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
        var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
        var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区

        var temp = null;
        while (true) {
            temp = bufferedReader.readLine();
            if (temp != null) {
                log(temp);
                if (temp == "x") {
                    var i = images.toBase64(captureScreen(), "jpg", 20);
                    log(i)
                    printWriter.println(i)
                    printWriter.flush()
                } else if(temp=="y"){
                    
                }else {

                    eval(temp);
                }
            }
            sleep(20);
        }
    }catch(e){
        console.warn(e)
        sleep(2000)
    }
}

//关闭相对应的资源
bufferedReader.close();
inputStream.close();
printWriter.close();
outputStream.close();
socket.close();