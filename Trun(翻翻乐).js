/**      翻翻乐脚本          
 *
 * 找到起始点的 X y 坐标       
 * 算出每格之间的距离 将格数存起来           
 * 第一格坐标   225,500          
 * 棋盘大小为  4  *  6
 * 
 * 跳过点击的几种
 * 
 *  一、两坐标相等
 *  二、第二点击点小于当前点击点（已经遍历无需点击）     未实现
 *          2018-5-6 11:55:12 
 */

 var _index = {};
 _index.x = 225;
 _index.y = 506;
 //每格的间距
 var d = 200;

 /**
  * 点击
  */
 function useClick(x, y, x1, y1) {    
    //A点 
    press(_index.x + d * y, _index.y + d * x, 50);
    //B点    
     press(_index.x + d * y1, _index.y + d * x1, 50);
}


for (var i = 0; i < 6; i++) {    
    for (var j = 0; j < 4; j++) {        
        for (var k = 0; k < 6; k++) {            
            for (var l = 0; l < 4; l++) {                
                if (i == k && j == l) {                    
                    //两个坐标相等退出循环                    
                    continue;                
                }                
                useClick(i, j, k, l);            
            }        
        }    
    }
}