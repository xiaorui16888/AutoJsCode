importClass(java.io.BufferedReader);
importClass(java.io.InputStreamReader);
importClass(java.io.OutputStreamWriter);
importClass(java.io.PrintWriter);
importClass(java.net.ServerSocket);
importClass(java.net.Socket);


try {
    var ss = new ServerSocket(62701);
    log("Server has started");
    var s2 = ss.accept();
    log("Client1 has connected");
    var s1 = ss.accept();
    log("Client2 has connected");

    var br1 = new BufferedReader(new InputStreamReader(s1.getInputStream()));
    var br2 = new BufferedReader(new InputStreamReader(s2[0].getInputStream()));
    var pw1 = new PrintWriter(new OutputStreamWriter(s1.getOutputStream()));
    var pw2 = new PrintWriter(new OutputStreamWriter(s2[0].getOutputStream()));
    log("Street has been built");

    var t = threads.start(function() {
        while(true){
            try {
                var s3 = ss.accept();
                log("re connect");
                br2[0] =new BufferedReader(new InputStreamReader(s3.getInputStream()));
                pw2[0] =new PrintWriter(new OutputStreamWriter(s3.getOutputStream()));
            }catch (e){
                log(e);
            }
        }
    });

    var str=null;
    while(true){
        str=br1.readLine();
        if(str!=null){
            log(str);
            pw2[0].println(str);
            pw2[0].flush();
            if(str.equals("x")){
                log("回送图片");
                pw1.println(br2[0].readLine());
                pw1.flush();
            }
        }
    }

}catch (e){
    log("未知异常:"+e);
}
