
var _sleep=sleep;
sleep=function(t){
	if(t<100) _sleep(t);
	else _sleep(t*(1+Math.random()/10));
};

var _RootAutomator=RootAutomator;
RootAutomator=function self(){
	_RootAutomator.call(this);
	var _setScreenMetrics=this.setScreenMetrics;
	var _sendEvent=this.sendEvent;
	var _touchX=this.touchX;
	var _touchY=this.touchY;
	var _exit=this.exit;
	var time=new Date().getTime();
	var mX,mY;
	this.touchX=function(x){
		var k=x+addE(3);
		if(k<0||k>mX) k=x;
		_touchX(k|0);
	};
	this.touchY=function(y){
		var k=y+addE(3);
		if(k<0||k>mY) k=y;
		_touchY(k|0);
	};
	this.setScreenMetrics=function(w,h){
		mX=w;
		mY=h;
		_setScreenMetrics(w, h);
	};
	this.sendEvent=function(a,b,c){
		_sendEvent(a, b, c);
	};
	this.exit=function(){
		_exit();
		log("结束，耗时:"+(new Date().getTime()-time));
	};
	function addE(s){
		return (Math.random()-0.5)*2*s;
	}
};
