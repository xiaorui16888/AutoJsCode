//110 12
//520 773
//96 55

//45 27
//282 1393

/*
30 1,-1
90 0,-2
150 -1,-1
210 -1,1
270 0,2
330 1,1
*/
var MID = [520,773];
var DMID = [96,55];

var SMID = [282,1393];
var SDMID = [45,26];

var DQD;
// console.show();
//回下左上角
//MID[0] -= DMID[0]*3;
//MID[1] -= DMID[1]*3;

if(true)
{
	SMID[1] = 1458;
}

SMID[0] -= SDMID[0]*4;
SMID[1] -= SDMID[1];


//获取权限请求
function GetRequest()
{
	if(!requestScreenCapture(false))
	{
		toast("未获取截图权限");
		exit();
	}
}

//求颜色误差
function ColorSimilar(color1,color2)
{
	var num1;
	num1 = Math.abs(((color1 & 0xff0000) >> 16) - ((color2 & 0xff0000) >> 16));
	num1 += Math.abs(((color1 & 0xff00) >> 8) - ((color2 & 0xff00) >> 8));
	num1 += Math.abs((color1 & 0xff) - (color2 & 0xff));
	return num1;
}

//颜色判断
//similar 误差 最大765
function ColorEqual(color1,color2,similar)
{
	return (ColorSimilar(color1,color2) - similar) < 0;
}

//定义两个类
//一个是小方块
//一个是整体

//小方块
function Square(x,y,p,num)
{
	this.pos = [x,y];
	//周围，30,90,150,210,270,330 六个角度
	//-1为为获取 -2为空 其他为整体下标
	this.near = [-1,-1,-1,-1,-1,-1];
	
	//标记，默认-1
	this.sign = -1;
	
	if(p >= 0&&p <= 6)
		this.near[p] = num;
	//后续再加方法
	
	this.CanInsert = function(sq)//本身是大的
	{
		var i;
		if(this.sign >= 0)
			return false;
		for(i=0;i<6;i++)
		{
			if(this.near[i] < 0 && sq.near[i] >= 0)
				return false;
		}
		return true;
	}
}

//整体
/*
流程
	地图
		用函数获取原点	GetYuan(img,x,y,sim)
		函数获取所有相邻方块	Gets(img,sim);
		完成
	
	组件
		自己获取全部原点
		调用函数获取所有相邻方块	Gets(img,sim);
		完成
*/
function Pattern(dx,dy)
{
	this.elem = new Array();
	//一个点
	this.yuan = [0,0];
	//距离长宽
	this.dMid = [dx,dy];
	//颜色
	this.color = -1;
	
	this.udlr = [0,0,0,0]
	
	this.GetDx = function(pos)
	{
		switch(pos)
		{
			case 0:
			case 5:
				return 1;
			case 1:
			case 4:
				return 0;
			default:
				return -1;
		}
	}
	
	this.GetDy = function(pos)
	{
		switch(pos)
		{
			case 0:
			case 2:
				return -1;
			case 1:
				return -2;
			case 3:
			case 5:
				return 1;
			default:
				return 2;
		}
	}
	
	this.IsBlock = function(img,x,y,sim)
	{
		var color = images.pixel(img,x,y);
		return ColorEqual(color,images.pixel(img,x+this.dMid[0]/2,y),sim)
			&& ColorEqual(color,images.pixel(img,x-this.dMid[0]/2,y),sim)
			&& ColorEqual(color,images.pixel(img,x,y+this.dMid[1]/2),sim)
			&& ColorEqual(color,images.pixel(img,x,y-this.dMid[1]/2),sim);
	}
	
	this.IsExist = function(x,y)
	{
		var i,j;
		for(i=0;i<this.elem.length;i++)
		{
			if(this.elem[i].pos[0] == x&&this.elem[i].pos[1] == y)
				return i;
		}
		return -1;
	}
	
	//获取一个方块
	//获取总列，总行，误差
	this.GetYuan = function(img,x,y,sim)
	{
		var i,j;
		var dx,dy;
		dx = 0;
		for(i=0;i<5;i++)
		{
			dy = 0;
			for(j=0;j<5;j++)
			{
				if(this.IsBlock(img,x+dx,y+dy,sim))
				{
					this.yuan[0] = x+dx;
					this.yuan[1] = y+dy;
					return true;
				}
				dy += this.dMid[1];
			}
			dx += this.dMid[0];
		}
		return false;
	}
	
	//前提，已有原点
	this.Gets = function(img,sim)
	{
		var i,j;
		var dian;
		
		this.color = images.pixel(img,this.yuan[0],this.yuan[1]);
		this.elem.push(new Square(this.yuan[0],this.yuan[1]));
		
		this.udlr[0] = this.yuan[1];
		this.udlr[1] = this.yuan[1];
		this.udlr[2] = this.yuan[0];
		this.udlr[3] = this.yuan[0]
		
		for(i=0;i<this.elem.length;i++)
		{
			dian = this.elem[i];
			for(j=0;j<dian.near.length;j++)
			{
				if(dian.near[j] == -1)//0 - 6
				{
					//判断
					var x,y,pos;
					x = dian.pos[0]+this.dMid[0]*this.GetDx(j);
					y = dian.pos[1]+this.dMid[1]*this.GetDy(j);
					
					if(x < 0 || y < 0 || x > 1079 || y > 1919)
						return false;
					if(ColorEqual(this.color,images.pixel(img,x,y),sim))
					{
						pos = this.IsExist(x,y);
						if(pos < 0)
						{
							dian.near[j] = this.elem.length;
							
							if(x > this.udlr[3])
								this.udlr[3] = x;
							else if(x < this.udlr[2])
								this.udlr[2] = x;
							if(y > this.udlr[1])
								this.udlr[1] = y;
							else if(y < this.udlr[0])
								this.udlr[0] = y;
							
							this.elem.push(new Square(x,y,(j+3)%6,i));
						}
						else
						{
							dian.near[j] = pos;
							if(this.elem[pos].near[(j+3)%6] == -1)
								this.elem[pos].near[(j+3)%6] = i;
							else
								return false;
						}
					}
					else
						dian.near[j] = -2;
				}
			}
		}
		return true;
	}
}

//全部分方块,全组件
function AllPattern(dx,dy)
{
	this.elem = new Array();
	this.color = -1;
	this.colors = new Array();
	this.dMid = [dx,dy];
	
	this.IsBorder = function(img,x,y)
	{
		var i;
		var color = images.pixel(img,x,y);
		for(i=-3;i<4;i++)
		{
			if(!ColorEqual(color,images.pixel(img,x,y+i),150))
				return true;
		}
		return false;
	}
	
	this.IsInColors = function(color)
	{
		var i;
		for(i=0;i<this.colors.length;i++)
		{
			if(ColorEqual(color,this.colors[i][0],150))
				return true;
		}
		return false;
	}
	
	//获取颜色加原点
	this.GetAllYuan = function(img,x,y,width,hight)
	{
		var i,j;
		var x1,y1;
		var color;
		
		this.color = images.pixel(img,x-this.dMid[0],y);//空颜色
		
		for(i=0;i<width;i++)
		{
			x1 = x+this.dMid[0]*i;
			for(j=0;j<hight;j++)
			{
				y1 = y+this.dMid[1]*j;
				color = images.pixel(img,x1,y1);
				if(!ColorEqual(this.color,color,50) && !this.IsBorder(img,x1,y1) && !this.IsInColors(color))
					{
						this.colors.push([color,x1,y1]);
						log('新颜色坐标'+String(x1)+'，'+String(y1));
					}
				if(this.colors.length > 8)
				{
					toast("失败2");
					return false;
				}
			}
			
		}
		return true;
	}
	
	this.Gets = function(img,x,y)
	{
		var i;
		if(!this.GetAllYuan(img,x,y,20,5))
			return false;
		log('获取小方块颜色共'+this.colors.length);
		for(i=0;i<this.colors.length;i++)
		{
			this.elem.push(new Pattern(this.dMid[0],this.dMid[1]));
			this.elem[i].yuan[0] = this.colors[i][1];
			this.elem[i].yuan[1] = this.colors[i][2];
			if(!this.elem[i].Gets(img,100))
			{
				console.log("获取失败",i);
				return false;
			}
		}
		return true;
	}
}

//---------------------------------------上为获取部分--------------------------------------------------
//---------------------------------------下为计算部分--------------------------------------------------

//还原一个Pattern的sign
function ClearSign(pat,num)
{
	var i;
	for(i=0;i<pat.elem.length;i++)
	{
		if(pat.elem[i].sign > num)
			pat.elem[i].sign = -1;
	}
}

//判断右边第 n2 个点能否插入左边第 n1 个点
//能 -- 插入方大于等于0的
function CanInsert(pat1,pat2,n1,n2,sign)
{
	var i;
	if(pat1.elem[n1].CanInsert(pat2.elem[n2]))
	{
		pat1.elem[n1].sign = sign;
		pat2.elem[n2].sign = sign;
		for(i=0;i<6;i++)
		{
			//if(i==0&&pat2.elem[n2].near[i] == 3)
			//	console.log("单",pat1.elem[n1].near[i],pat2.elem[n2].near[i],pat2.elem[pat2.elem[n2].near[i]].sign);
			if(pat2.elem[n2].near[i] >= 0 && pat2.elem[pat2.elem[n2].near[i]].sign < 0)
			{
				if(!CanInsert(pat1,pat2,pat1.elem[n1].near[i],pat2.elem[n2].near[i],sign))
					return false;
			}
		}
	}
	else
		return false;
	return true;
}
				
//遍历所有可能计算出正确路径
function GetResult(apa,pa,n)
{
	var i;
	for(i=0;i<pa.elem.length;i++)
	{
		ClearSign(pa,n-1);
		ClearSign(apa.elem[n],-1);
		if(CanInsert(pa,apa.elem[n],i,0,n))
		{
			DQD[n] = i;
			if(n == apa.elem.length-1)
				return true;
			if(GetResult(apa,pa,n+1))
				return true;
		}
	}
	return false;
}

function Zzt(spos,pos,udlr)
{
	var mid = [(udlr[2]+udlr[3])/2,udlr[1]];
	var dx = (mid[0]-spos[0])/SDMID[0];
	var dy = (mid[1]-spos[1])/SDMID[1];
	var height = (udlr[1]-udlr[0])/SDMID[1];
	var re = [pos[0]+dx*(DMID[0]),pos[1]+dy*(DMID[1])];
	//re[0] += DMID[0]/4;
	re[1] += (2.2-height/1.8)*DMID[1];
	//re[0] = Math.floor(re[0]);
	//re[1] = Math.floor(re[1]);

	return re;
}

function Run()
{
	var img = captureScreen();
	var apa = new AllPattern(SDMID[0],SDMID[1]);
	var pa = new Pattern(DMID[0],DMID[1]);
	
	var end = new Array();//终点序列
	
	var sn;
	
	sn = 0;
	
	apa.Gets(img,100,1300);
	pa.GetYuan(img,MID[0],MID[1],5);
	pa.Gets(img,5);
	
	DQD = new Array();
	for(sn=0;sn<apa.elem.length;sn++)
		DQD.push(0);
	sn = 0;
	
	console.log("获取完毕");
	console.log("大方块",pa.elem.length);
	console.log("小方块",apa.elem.length);
	for(i=0;i<apa.elem.length;i++)
	{
		sn += apa.elem[i].elem.length;
	
		// log(apa.elem[i].elem)
		//console.log(apa.elem[i].elem.length);
	}
	//console.log("小方块",sn);
	
	if(sn != pa.elem.length)
	{
	
		toast("失败3");
		return false;
	}
	
	if(GetResult(apa,pa,0))
	{
		for(sn=0;sn<DQD.length;sn++)
		{
			end.push(Zzt(apa.elem[sn].elem[0].pos,pa.elem[DQD[sn]].pos,apa.elem[sn].udlr));
			//console.log("下",apa.elem[sn].elem[0].pos);
			//console.log("上",pa.elem[DQD[sn]].pos);
		}
		//一拐两格，每个半格
		//console.log(end);
		toast("成功");
		for(sn=0;sn<end.length;sn++)
		{
			let p1 = apa.elem[sn].elem[0].pos;
			let p2 = end[sn];
			let d1 = [p2[0]-p1[0],p2[1]-p1[1]];
			let can = 0.15;
			apa.elem[sn].elem[0].pos[0] = (apa.elem[sn].udlr[2] + apa.elem[sn].udlr[3])/2;
			//gesture(1000,apa.elem[sn].elem[0].pos,[end[sn][0],end[sn][1]+30],end[sn]);
			log(p1[0],p1[1],p2[0]+d1[0]*can,p2[1]+d1[1]*can,500)
			swipe(p1[0],p1[1],p2[0]+d1[0]*can,p2[1]+d1[1]*can,500);
			sleep(100);
		}

	}
	else
	{
		toast("失败1");
		return false;
	}
	return true;
}

function Main()
{	
	var isStart = false;
	//悬浮窗
	var win = floaty.window(
		<frame gravity="center">
			<text id="text">⚪</text>
		</frame>
	);
	
	win.text.click(() =>
	{
		if(!isStart)
		{
			threads.start(function()
			{
				isStart = true;
				while(Run())
					sleep(2000);
				sleep(500);
				while(Run())
					sleep(2000);
				isStart = false;
			});
		}
		else
			threads.start(function()
			{
				toast("运行中");
			});
	});
	
	win.setPosition(900,200);
}

GetRequest();
Main();

threads.start(function()
{
	while(true)
		sleep(1000);
});















