/*
*
*
*打包出来的脚本不要打开，直接运行就能安装
*
*/
//要打包成js的软件路径
path="/sdcard/backups/apps/AndFTP_4.5.apk";
//要打包的软件名
软件名="FTP";
//打包后js的保存路径
path2="/storage/emulated/0/1/"+软件名+".js";






p=files.readBytes(path);
p2=java.lang.String(android.util.Base64.encode(p,0)).replace('\n', '');

code="sd=getSDPath();\npg=b64('"+p2+"');"+b64+getSDPath+"\n"+"files.writeBytes(sd+'/"+软件名+".apk',pg);app.viewFile(sd+'/"+软件名+".apk')";     

files.write(path2,code);




function b64(str){
return android.util.Base64.decode(java.lang.String(str).getBytes(),0);
}
function getSDPath(){ 
       sdDir = null; 
       sdCardExist =android.os.Environment.getExternalStorageState()   
       .equals(android.os.Environment.MEDIA_MOUNTED);//判断sd卡是否存在
       if(sdCardExist)   
       {                               
         sdDir =android.os.Environment.getExternalStorageDirectory();//获取跟目录
      }
       return sdDir.toString(); 
}