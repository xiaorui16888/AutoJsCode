/*
    读取指定行 删除指定行
    QQ1683029923
    2019.04.29
*/ 
var path = "/sdcard/BiePaMoMo/config/qq.txt";//文件路径
console.log(readLine(path,0));
deleteLine(path,0);
console.log(readLine(path,0));
function readLine(file_path,line){
    try{
      var txt = open(file_path, mode = "r", encoding = "utf-8");
      var arr = txt.readlines();
      txt.close();
    }catch(e){
         toastLog("请确认文件是否存在");
         exit();
    }
     return arr[line]
 }
 function deleteLine(file_path,line){
     var arr1=[];
     try{
         var read = open(file_path, mode = "r", encoding = "utf-8");
         var arr = read.readlines();
         //重点在这，先读取所有行的内容，存为数组，在匹配指定行的内容，再写入新数组
         for(var i=0;i<arr.length;i++){
             //指定行的内容不加入数组
             if(arr[i]!=readLine(file_path,line)){
                 arr1.push(arr[i])
             }
         }
         read.close();
     }catch(e){
         toastLog("请确认文件是否存在");
     }
       var write= open(file_path, mode = "w", encoding = "utf-8");
        write.writelines(arr1)
        write.close();
 }
