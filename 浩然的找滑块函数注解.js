/**
 *修改者QQ: 1811588980
 *完成时间: 2019年5月30日 下午7:25:51
 *备注: 增加了实现方法的注解
  修改了函数返回值。
  修改了代码实现方式。(原来是以字符串的形式现改为数组的形式)
  添加了适配屏幕1440。
**/




function discernSlidingblock(img, ratio) {
    //此函数的返回值。找到返回滑块左上角坐标对象{x:123,y:123}  没找到返回。null
    /*
       [x1,y1,x2,y2,w]
    坐标(x1,y1)与坐标(x2,y2)构成的长方形区域为找滑块的范围。
    宽度w 比滑块的白色边框宽度要小上10~20. 
    你需要修改下面代码中的这些参数。
    请自行尝试为你的设备找出最佳的数值(宽度)
    */
    
    var tb;//找滑块的范围。
    //分析设备分辨率
    if (ratio == 720) {
        tb = [348, 253, 691, 638, 81];
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        tb = [463, 387, 912, 831, 125];
        log("您的设备分辨率为：1080p");
    } else if (ratio == 1440) {
        tb = [699, 525, 699+660, 525+708,160];
        log("您的设备分辨率为：1440p");
    } else {
        log("当前设备分辨率不符合规范");
        return null;
    };
    
    //下面的所有部分不需要修改。
    var num = Math.ceil(tb[4] / 3.3 - 4);//滑块边长1/3。线段的长度。
    
    //找滑块位置
    for (var k = 29; k <= 40; k++) {//黑色颜色范围。
        var  color =colors.rgb(k,k,k);
        var temp2 =[[0,0,color]];
        for (var i = 1; i <= num; i++) {
            //生成三行三竖的左上角点位数组。
            
            //向右的点位。
            temp2.push([i,0,color]);//→
            temp2.push([i,1,color]);//→
            temp2.push([i,2,color]);//→
            //向下的点位。
            temp2.push([0,i,color]);//↓
            temp2.push([1,i,color]);//↓
            temp2.push([2,i,color]);//↓
        };
        //一个差不多的坐标范围。
        //微调其他3个角的位置。
        for(var x = 0;x > -2;x--) {
            for (var y = 0;y > -2;y--) {
                var temp=new Array;
                for (var i = 1; i <= num; i += 2) {
                    //生成其余6条边线坐标点。
                    temp.push([tb[4] + x - i - 1,0,color]);//右上角向左
                    temp.push([tb[4] + x - i - 1,1,color]);//右上角向左。
                    temp.push([tb[4] + x,i,color]);//右上角向下。
                    temp.push([tb[4] + x - 1,i,color]);//右上角向下。
                    
                    
                    temp.push([0,tb[4] + y - i - 1,color]);//左下角向上。
                    temp.push([1,tb[4] + y - i - 1,color]);//左下角向上。
                    temp.push([i,tb[4] + y,color]);//左下角向右。
                    temp.push([i,tb[4] + y - 1,color]);//左下角向右。
                    
                    
                    temp.push([tb[4] + x - i - 1,tb[4] + y,color]);//右下角向左
                    temp.push([tb[4] + x - i - 1,tb[4] + y - 1,color]);//右下角向左
                    temp.push([tb[4] + x,tb[4] + y - i - 1,color]);//右下角向上。
                    temp.push([tb[4] + x - 1,tb[4] + y - i - 1,color]);//右下角向上。
                    
                };
                temp = temp.concat(temp2);
                try {
                    //多点找色。
                   var p = images.findMultiColors(img, color, temp, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p;
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    console.error("请检查范围是否超出");
                    return null;
                };
            };
        };
    };
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    };
    return null;
};
