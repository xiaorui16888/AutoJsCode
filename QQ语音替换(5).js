//*******************************************************************************************************************
var name="1"
var QQ="3068758340"
var date1=(new Date().getYear()+1900)*100+new Date().getMonth()+1
var date2=new Date().getDate()
var path = "/storage/emulated/0/tencent/MobileQQ/"+QQ+"/ptt/"+date1+"/"+date2+"/"

files.removeDir(path)
sleep(200)
files.ensureDir(path)
//toast(arr)
bounds(0,1809,154,1911).find().click()
sleep(200)
click("录音")
sleep(200)
bounds(379,1356,700,1677).find().click()
sleep(2000)
bounds(379,1356,700,1677).find().click()
//var arr = files.listDir("/sdcard/");
toast(path);
sleep(1000)
var fileName = files.listDir(path);
toast(fileName[0])
//files.remove(path+fileName)
files.copy("/storage/emulated/0/QQ测试语音/"+name,path)
//files.rename(path+name,fileName)
sleep(200)
click("发送")
/*toast(date1)
toast(date2)*/
