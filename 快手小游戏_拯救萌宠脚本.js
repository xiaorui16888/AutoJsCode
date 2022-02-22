// 得不了高分,只能赢大部分人.
//反正我玩了几把都赢了.


// 遍历所有色块,点击颜色相同并且相邻的色块(点击一下就可以,相邻的会自动消除,也就是说不用两个都点)

// 步骤
// 1 截图
// 2 分析颜色相同的色块位置
// 3 点击分析出来的坐标
// 4 重复

Threshold=6;
function captureScreenImg(){
    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
    var img = captureScreen();
    return img;
}


function coordinateAnalysisAndExtract(img){
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart=137,yStart=542,xEnd=1027,yEnd=1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight=124;
    SpacingUpAndDown=122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    HorizontalNumber=8;
    VerticalNumber=9;

    var targetCoordinatesArray=new Array()
    // 从左往右,从上到下.
    for(var i=1;i<=HorizontalNumber-1;i++) {
        for(var j=1;j<=VerticalNumber-1;j++) {
            //获取在点(x, y)处的颜色
            // log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
            var ColorMainColorBlock = images.pixel(img, xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);







            // ttt=1200;

            // var xxx=xStart+(i-1)*SpacingLeftAndRight
            // var yyy=yStart+(j-1)*SpacingUpAndDown
            // press(xxx,yyy, ttt);

            // var xxxRight=xStart+i*SpacingLeftAndRight
            // var yyyRight=yStart+(j-1)*SpacingUpAndDown
            // press(xxxRight,yyyRight, ttt);

            // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
            // var yyyDown=yStart+j*SpacingUpAndDown
            // press(xxxDown,yyyDown, ttt);





            var ColorRightColorBlock = images.pixel(img, xStart+i*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
            var ColorDownColorBlock = images.pixel(img, xStart+(i-1)*SpacingLeftAndRight, yStart+j*SpacingUpAndDown);

            // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
            threshold=Threshold;
            if (colors.isSimilar(ColorMainColorBlock, ColorRightColorBlock,threshold) || colors.isSimilar(ColorMainColorBlock, ColorDownColorBlock,threshold)){
                var targetCoordinates=new Array(xStart+(i-1)*SpacingLeftAndRight,yStart+(j-1)*SpacingUpAndDown)
                targetCoordinatesArray.push(targetCoordinates)
            }
        }
    }
    return targetCoordinatesArray;
}


//边上的色块


function coordinateAnalysisAndExtractRight(img){
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart=1008,yStart=547,xEnd=1027,yEnd=1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight=124;
    SpacingUpAndDown=122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    VerticalNumber=9;

    var targetCoordinatesArray=new Array()
    // 从左往右,从上到下.

    for(var j=1;j<=VerticalNumber-1;j++) {
        //获取在点(x, y)处的颜色
        // log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
        var ColorMainColorBlock = images.pixel(img, xStart, yStart+(j-1)*SpacingUpAndDown);







        // ttt=1200;

        // var xxx=xStart+(i-1)*SpacingLeftAndRight
        // var yyy=yStart+(j-1)*SpacingUpAndDown
        // press(xxx,yyy, ttt);

        // var xxxRight=xStart+i*SpacingLeftAndRight
        // var yyyRight=yStart+(j-1)*SpacingUpAndDown
        // press(xxxRight,yyyRight, ttt);

        // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
        // var yyyDown=yStart+j*SpacingUpAndDown
        // press(xxxDown,yyyDown, ttt);



        var ColorDownColorBlock = images.pixel(img, xStart, yStart+j*SpacingUpAndDown);

        // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
        threshold=Threshold;
        if (colors.isSimilar(ColorMainColorBlock, ColorDownColorBlock,threshold)){
            var targetCoordinates=new Array(xStart,yStart+(j-1)*SpacingUpAndDown)
            targetCoordinatesArray.push(targetCoordinates)
        }
    }

    return targetCoordinatesArray;
}






function coordinateAnalysisAndExtractDown(img){
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart=137,yStart=1530,xEnd=1027,yEnd=1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight=124;
    SpacingUpAndDown=122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    HorizontalNumber=8;


    var targetCoordinatesArray=new Array()
    // 从左往右,从上到下.
    for(var i=1;i<=HorizontalNumber-1;i++) {

        //获取在点(x, y)处的颜色
        // log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
        var ColorMainColorBlock = images.pixel(img, xStart+(i-1)*SpacingLeftAndRight, yStart);







        // ttt=1200;

        // var xxx=xStart+(i-1)*SpacingLeftAndRight
        // var yyy=yStart+(j-1)*SpacingUpAndDown
        // press(xxx,yyy, ttt);

        // var xxxRight=xStart+i*SpacingLeftAndRight
        // var yyyRight=yStart+(j-1)*SpacingUpAndDown
        // press(xxxRight,yyyRight, ttt);

        // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
        // var yyyDown=yStart+j*SpacingUpAndDown
        // press(xxxDown,yyyDown, ttt);





        var ColorRightColorBlock = images.pixel(img, xStart+i*SpacingLeftAndRight, yStart);
        var ColorDownColorBlock = images.pixel(img, xStart+(i-1)*SpacingLeftAndRight, yStart);

        // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
        threshold=Threshold;
        if (colors.isSimilar(ColorMainColorBlock, ColorRightColorBlock,threshold)){
            var targetCoordinates=new Array(xStart+(i-1)*SpacingLeftAndRight,yStart)
            targetCoordinatesArray.push(targetCoordinates)
        }

    }
    return targetCoordinatesArray;
}









function coordinatesClick(targetCoordinatesArray){
    for(j = 0,len=targetCoordinatesArray.length; j < len; j++) {
        x=targetCoordinatesArray[j][0];
        y=targetCoordinatesArray[j][1];
        click(x,y);
        // press(500, 1000, 1200);
        sleep(10);
    }
}



function rocketClick(img){
    var wx = images.read("/sdcard/火箭筒.png");
    //截图并找图
    var p = findImage(img, wx, {
        region: [52, 482,950,1145],
        threshold: 0.8
    });
    if(p){
        log("在桌面找到了微信图标啦: " + p);
        click(p.x,p.y);
    }


}



while(1){
    img=captureScreenImg();
    sleep(30);
    targetCoordinatesArray=coordinateAnalysisAndExtract(img);
    log(targetCoordinatesArray);
    coordinatesClick(targetCoordinatesArray);
    targetCoordinatesArray=coordinateAnalysisAndExtractRight(img);
    log(targetCoordinatesArray);
    coordinatesClick(targetCoordinatesArray);
    targetCoordinatesArray=coordinateAnalysisAndExtractDown(img);
    log(targetCoordinatesArray);
    coordinatesClick(targetCoordinatesArray);
    //增加点击火箭筒
    rocketClick(img);
    sleep(80);
}



