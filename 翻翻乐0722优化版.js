
//作者QQ203118908
//更新日期0722

if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}
pressTime=1
pressIntervalTime = 10;
pukeColor="#915bed"
backgroundColor="#301754"
columnsNumber=4
rowsNumber=6
imgPath="/sdcard/快手小游戏截图/翻翻乐/";
imgPathWareHouse="/sdcard/快手小游戏截图/翻翻乐/仓库";
files.removeDir(imgPath)
files.ensureDir(imgPath);
files.ensureDir(imgPathWareHouse);
imgFistCenterCoordinate = [208,505];
imgLastCenterCoordinate = [855,1575];
SpacingLeftAndRight = Math.round((imgLastCenterCoordinate[0] - imgFistCenterCoordinate[0]) / (columnsNumber - 1));
SpacingUpAndDown = Math.round((imgLastCenterCoordinate[1] - imgFistCenterCoordinate[1]) / (rowsNumber - 1));
翻拍之后等待的时间=200
grids = [];
for (var x=0; x<6; x++) {
  grids.push([]);
  for (var y=0; y<4; y++) {
    let xx=imgFistCenterCoordinate[0]+SpacingLeftAndRight*y
    let yy=imgFistCenterCoordinate[1]+SpacingUpAndDown*x
    grids[x].push( {serialNumberX:x,serialNumberY:y,coordinateX:xx, coordinateY:yy,card:"待翻牌",click:function(){
      press(xx,yy,1)
    },colorCenter:function(){
      let img=captureScreen()
      let color=images.pixel(img, xx, yy)
      return color
    }} );
  }
}
for(let kk=0;kk<3;kk++){
  knownGrids=[]
  cardCanTurnResult=cardCanTurn()
  lastClick=null
  for(let i=0;i<cardCanTurnResult.length;i++){
    let x=cardCanTurnResult[i].serialNumberX
    let y=cardCanTurnResult[i].serialNumberY
    cardCanTurnResult[i].click()
    sleep(翻拍之后等待的时间)
    img=captureScreen()
    let coordinateX=grids[x][y].coordinateX
    let coordinateY=grids[x][y].coordinateY
    colorAfterClick=images.pixel(img, coordinateX, coordinateY)
    if(colors.isSimilar(colorAfterClick, backgroundColor)){
      if(lastClick){
        grids[lastClick.serialNumberX][lastClick.serialNumberY].card="disappear"
      }
        grids[x][y].card="disappear"
    }else{
      let xy={x:coordinateX,y:coordinateY}
      let imgCenterSmall=captureCenter(img,xy)
      grids[x][y].card=imgCenterSmall
      name=x+"-"+y
      // images.save(imgCenterSmall, imgPath+name+".png");
      isImgCenterInKnownGridsResult=isImgCenterInKnownGrids(imgCenterSmall)
      if(isImgCenterInKnownGridsResult){
        for(let j=0;j<2;j++){
          grids[x][y].click()
          sleep(pressIntervalTime)
          isImgCenterInKnownGridsResult.click()
          sleep(pressIntervalTime)
        }
        sleep(翻拍之后等待的时间)
      }else{
        knownGrids.push(grids[x][y])
        lastClick=grids[cardCanTurnResult[i]]
        imgCenterSmallWareHouse=grids[x][y].card
        name=x+"-"+y
        // images.save(imgCenterSmallWareHouse, imgPathWareHouse+name+".png");
      }
    }
  }
}
function logKnownGrids(){
  let s=""
  for(let i=0;i<knownGrids.length;i++){
    s=s+knownGrids[i].serialNumberX+knownGrids[i].serialNumberY+","
  }
  return s
}
function isImgCenterInKnownGrids(imgCenter){
  for (var i=0; i<knownGrids.length; i++) {
    var p = findImage(knownGrids[i].card, imgCenter,{
      threshold: 0.8
    });
    if(p){
      knownGrids[i].index=i
      return knownGrids[i]
    }else{
    }
  }
  return false
}
function captureCenter(img,xy) {
  let k=50
  var clip = images.clip(img, xy.x-30, xy.y-30, k+k, k+k);
  return clip
}
function cardCanTurn(){
  let img=captureScreen()
  cardCanTurnList = [];
  for (var x=0; x<6; x++) {
    for (var y=0; y<4; y++) {
      let xx=imgFistCenterCoordinate[0]+SpacingLeftAndRight*y
      let yy=imgFistCenterCoordinate[1]+SpacingUpAndDown*x
      let colorAfterClick=images.pixel(img, xx, yy)
      if(colors.isSimilar(colorAfterClick, backgroundColor)){
      }else{
        cardCanTurnList.push( {serialNumberX:x,serialNumberY:y,coordinateX:xx,coordinateY:yy,toString:function(){ return
          "序号("+x+y+") 坐标("+xx+","+yy+")"
        },click:function(){
          press(xx,yy,1)
        }});
      }
    }
  }
  return cardCanTurnList
}
