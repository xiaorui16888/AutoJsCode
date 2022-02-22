/*本代码禁止商业用途*
*禁止私人用途*
*本代码从1刷屏到100*
*以0.5秒每条的速度发送*
*小智版权所有*
*仅供学习使用*
*下载后请在24小时内删除*
*小智QQ:884938249*/
while (!click(16, 1117, 594, 1192));
while (!input(0, "刷屏的第1条信息"));
while (!click(604, 568, 704, 638));

var a = 1
var id = setInterval(function(){
    var b = a = a + 1
    while (!input(0, "刷屏的第" + b + "条信息" ));
    while (!click(604, 568, 704, 638));
    if (b==100){
        setTimeout(function(){
        clearInterval(id);
        
        }, 1);
        }
    }, 500);