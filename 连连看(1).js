//1080 1920

//48 404
//189 545
//141 141

//1031 1812
//983 1408

//53 409

//1080 2106

//48 522
//1030 1931
//982 1409

//475 1516
//614 1658
//139 142

//140 10
//53 527
//1035 1936
//982 1409

//元素集合
var THING;
//画面
var MAP;
//消去队列
var QUEEZE;
//点击队列
var CQUEEZE;
//初始化
function Init()
{
	let i;
	THING = new Array();
	MAP = new Array();
	QUEEZE = new Array();
	CQUEEZE = new Array();
	for(i=0;i<12;i++)
	{
		let j;
		MAP.push(new Array());
		for(j=0;j<9;j++)
			MAP[i].push(-1);
	}
}

//判断障碍物
function IsBlock(x,y)
{
	return MAP[x][y] != -1;
}

//水平检测
function Horizon(x1,y1,x2,y2)
{
	//方向
	let direct = y1 < y2 ? true : false;
	if(x1 != x2 || y1 == y2)
		return y1;
	if(x1 == 0 || x1 == 11)
		return y2;
	do
		direct ? y1++ : y1--;
	while(!IsBlock(x1,y1) && y1 != y2);
	return y1;
}

//垂直检测
function Vertical(x1,y1,x2,y2)
{
	//方向
	let direct = x1 < x2 ? true : false;
	if(y1 != y2 || x1 == x2)
		return x1;
	if(y1 == 0 || y1 == 8)
		return x2;
	do
		direct ? x1++ : x1--;
	while(!IsBlock(x1,y1) && x1 != x2);
	return x1;
}

//连接检测
function isConnect(x1,y1,x2,y2)
{
	//x:上 下 y:左 右 四边极限
	let up1,up2,down1,down2,left1,left2,right1,right2;
	left1 = Horizon(x1,y1,x1,0);
	left2 = Horizon(x2,y2,x2,0);
	right1 = Horizon(x1,y1,x1,8);
	right2 = Horizon(x2,y2,x2,8);
	if(left1 < left2)
		left1 = left2;
	if(right1 > right2)
		right1 = right2;
	if(left1 == 0 || right1 == 8)
		return true;
	left1++;
	while(left1 < right1)
	{
		if(Vertical(x1,left1,x2,left1) == x2)
			return true;
		left1++;
	}
	
	up1 = Vertical(x1,y1,0,y1);
	up2 = Vertical(x2,y2,0,y2);
	down1 = Vertical(x1,y1,11,y1);
	down2 = Vertical(x2,y2,11,y2);
	if(up1 < up2)
		up1 = up2;
	if(down1 > down2)
		down1 = down2;
	if(up1 == 0 || down1 == 11)
		return true;
	up1++;
	while(up1 < down1)
	{
		if(Horizon(up1,y1,up1,y2) == y2)
			return true;
		up1++;
	}
	return false;
}

//消除一个元素
function RemoveOne()
{
	for(i=0;i<THING.length;i++)
	{
		//单元素判断
		for(j=1;j<THING[i].length-1;j++)
		{
			//循环
			for(k=j+1;k<THING[i].length;k++)
			{
				if(isConnect(THING[i][j][0],THING[i][j][1],THING[i][k][0],THING[i][k][1]))
				{
					//添加队列
					QUEEZE.push([THING[i][j][0],THING[i][j][1],THING[i][k][0],THING[i][k][1]]);
					//清除画面
					MAP[THING[i][j][0]][THING[i][j][1]] = -1;
					MAP[THING[i][k][0]][THING[i][k][1]] = -1;
					//清除元素
					THING[i].splice(k,1);
					THING[i].splice(j,1);
					//重新判断
					return true;
				}
			}
		}
	}
	return false;
}
//遍历元素集合，加入消去队列
function RemoveQueeze()
{
	//是否为空
	var empty,i,j,k;
	//大循环
	for(empty=0;empty<35;empty++)
	{
		if(RemoveOne())
			console.log("消除成功");
		else
			console.log("消除失败");
		
	}
}

//颜色判断
//similar 误差 最大765
function ColorEqual(color1,color2,similar)
{
	var num1;
	num1 = Math.abs(((color1 & 0xff0000) >> 16) - ((color2 & 0xff0000) >> 16));
	num1 += Math.abs(((color1 & 0xff00) >> 8) - ((color2 & 0xff00) >> 8));
	num1 += Math.abs((color1 & 0xff) - (color2 & 0xff));
	return (num1 - similar) < 0;
}

//添加元素并画图
function AddThing(x1,y1,color1,isAdd)
{
	var i;
	for(i=0;i<THING.length;i++)
	{
		if(ColorEqual(THING[i][0],color1,25))
		{
			//添加元素
			THING[i].push([x1,y1]);
			//画图
			MAP[x1][y1] = i;
			return true;
		}
	}
	//若没有则添加
	if(isAdd)
	{
		THING.push([color1]);
		THING[THING.length-1].push([x1,y1]);
		MAP[x1][y1] = i;
		return true;
	}
	return false;
}

//根据图片更新 元素，画面
//前提：全局变量已初始化
function InitImg(img)
{
	//基础坐标
	var base = [53,583];
	//地图长宽
	var map = [993,1419];
	//图标长宽
	var changPixel = [map[0]/7,map[1]/10];
	//偏移坐标
	var pianYi = [67,103];
	//修正后遍历坐标
	var move = [base[0]+pianYi[0],base[1]+pianYi[1]];
	var i,j;
	var color1;
	for(i=0;i<10;i++)
	{
		for(j=0;j<7;j++)
		{
			//console.log(Math.floor(move[0]),Math.floor(move[1]));
			//修正位置
			if(!AddThing(i+1,j+1,images.pixel(img,Math.floor(move[0])-1,Math.floor(move[1])),false))
				if(!AddThing(i+1,j+1,images.pixel(img,Math.floor(move[0]),Math.floor(move[1])-1),false))
					if(!AddThing(i+1,j+1,images.pixel(img,Math.floor(move[0])-1,Math.floor(move[1])-1),false))
						AddThing(i+1,j+1,images.pixel(img,Math.floor(move[0])+1,Math.floor(move[1])),true);
			move[0] += changPixel[0];
		}
		move[0] = base[0]+pianYi[0];
		move[1] += changPixel[1];
	}
	//判断结果是否正确
	if(THING.length > 8)
	{
		console.log(THING.length);
		return false;
	}
	for(i=0;i<THING.length;i++)
	{
		if(THING[i].length%2 == 0)
		{
			console.log(i);
			console.log(THING[i].length);
			return false;
		}
	}
	return true;
}

//更新点击队列
function UpdateCQueeze()
{
	//基础坐标
	var base = [53,583];
	//地图长宽
	var map = [993,1418];
	//图标长宽
	var changPixel = [map[0]/7,map[1]/10];
	//偏移坐标
	var pianYi = [changPixel[0]/2,changPixel[1]/2];
	//修正后遍历坐标
	var move = [base[0]+pianYi[0],base[1]+pianYi[1]];
	let i;
	for(i=0;i<QUEEZE.length;i++)
	{
		//console.log(QUEEZE[i]);
		CQUEEZE.push([Math.floor(move[0]+changPixel[0]*(QUEEZE[i][1]-1)),Math.floor(move[1]+changPixel[1]*(QUEEZE[i][0]-1))]);
		CQUEEZE.push([Math.floor(move[0]+changPixel[0]*(QUEEZE[i][3]-1)),Math.floor(move[1]+changPixel[1]*(QUEEZE[i][2]-1))]);
	}
}
//根据点击队列按顺序点击消除
function Click()
{
	let i;
	for(i=0;i<CQUEEZE.length;i++)
	{
		//console.log(CQUEEZE[i]);
		press(CQUEEZE[i][0],CQUEEZE[i][1],30);
		sleep(50);
	}
}

//获取权限请求
function GetRequest()
{
	if(!requestScreenCapture(false))
	{
		toast("未获取截图权限");
		exit();
	}
}

function Run()
{
	var img;
	//GetRequest();
	img = captureScreen();
	//初始化全局变量
	Init();
	if(InitImg(img))
	{
		toast("数据获取成功");
		RemoveQueeze();
		UpdateCQueeze();
		Click();
		return true;
	}
	return false;
}

function Main()
{
	var isStart = false;
	
	//悬浮窗
	var win = floaty.window(
		<frame gravity="center">
			<text id="text">国宝呀</text>
		</frame>
	);
	
	win.text.click(() =>
	{
		if(!isStart)
		{
			threads.start(function()
			{
				let i;
				for(i=0;i<5;i++)
				{
					isStart = true;
					if(Run())
					{
						isStart = false;
						break;
					}
					else
						sleep(200);
				}
				if(i == 5)
					toast("数据获取失败");
			});
		}
		else
			toast("运行中");
		isStart = false;
	});
	
	win.setPosition(900,200);
	
	
	/*
	while(!isStart)
	{
		sleep(1000);
	}
	Main();*/
}

GetRequest();
Main();


threads.start(function()
{
	while(true)
		sleep(1000);
});





