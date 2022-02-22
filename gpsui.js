"ui";
ui.layout(
<vertical>
<text id="t" w="*" h="*"/>
</vertical>
);
threads.start(function(){
while(true){
var m=g();
ui.run(function(){
ui.t.text("卫星时间:"+m.time+"\n本地时间:"+(new Date().getTime())+"\n\n\n纬度:"+m.getLatitude()+"\n经度:"+m.getLongitude());     
});
}
});
function g(){
var m=context.getSystemService(context.LOCATION_SERVICE);
var p=m.getBestProvider(android.location.Criteria(),true); 
return m.getLastKnownLocation(p);
}