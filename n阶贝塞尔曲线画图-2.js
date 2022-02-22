"ui";
ui.layout(
    <frame>
        <canvas id="a" w="*" h="*"/>
    </frame>
)

var paint=new Paint();
ui.a.on("draw",(canvas)=>{
    paint.setARGB(255,255,0,255);
    var M=0.01;
    var x=new Array();
    var y=new Array();
    for(t=0,i=0;t<=1;t+=M,i++)
    {
        x[i]=FX(t);
        y[i]=FY(t);
    };
    for(t=M,i=1;t<=1;t+=M,i++)
    {
        canvas.drawLine(x[i-1],y[i-1],x[i],y[i],paint)
    }
})

var N=6;//N为贝塞尔曲线阶数，这里以6阶为例
var a=new Array();//a为贝塞尔曲线特征点，元素个数应为阶数加一
 a[0]={"x":100,"y":100};
 a[1]={"x":200,"y":600};
 a[2]={"x":300,"y":600};
 a[3]={"x":400,"y":500};
 a[4]={"x":500,"y":300};
 a[5]={"x":400,"y":200};
 a[6]={"x":300,"y":100};


function FX(t){
    return X(0,0,t,N);
}

function FY(t){
    return Y(0,0,t,N);
}

function X(i,j,t,N){
    if (i==N)
    {
        return a[j].x;
    }
    return (1-t)*X(i+1,j,t,N)+t*X(i+1,j+1,t,N);
}

function Y(i,j,t,N){
    if (i==N)
    {
        return a[j].y;
    }
    return (1-t)*Y(i+1,j,t,N)+t*Y(i+1,j+1,t,N);
}

//求更高阶只要修改N的值与添加特征点即可
//采用递归思想
//作者：绯色天空 3469896819，求大佬带我写代码QAQ