//求1到100w的和
function sum(n){//循环求和
    var s=0;
    for(var i=1;i<=n;i++){
        s=s+i;
    }
    return s;
}
function sum1(n,result){//尾递归 
if(n==0) return result;
 return sum1(n-1,result+n);
    /*
    实现方式如下
    sum1(3,0)
    =sum1(2,0+3)
    =sum1(1,0+3+2)
    =sum1(0,0+3+2+1);
    =6
    尾递归相比下面的递归更节约内存
    */
}
function sum2(n){//递归求和第2种
    if(n==0) return 0;
    return(n+sum2(n-1));
    /*
    sum2(3)
    =3+sum2(2)
    =3+2+sum(1)
    =3+2+1+sum(0)
    =6
    */
}
function sum3(n){//等差数列求和公式
   return n*(1+n)/2;
}

var A=(new Date()).valueOf()
log(sum(1000000))
var B=(new Date()).valueOf()
log("花费"+(B-A)+"毫秒");

var A=(new Date()).valueOf()
log(sum1(1000000,0))
var B=(new Date()).valueOf();
log("花费"+(B-A)+"毫秒");

A=(new Date()).valueOf()
log(sum2(1000000));
B=(new Date()).valueOf()
log("花费"+(B-A)+"毫秒");

A=(new Date()).valueOf();
log(sum3(1000000));
B=(new Date()).valueOf()
log("花费"+(B-A)+"毫秒");
