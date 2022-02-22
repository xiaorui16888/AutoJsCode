setScreenMetrics(1080, 2280);
while(true){
var url =[0];
url[0]="https://carMobile.wsecar.com/carMobile/pay/payWayDriver.html?driverId=10230018759&carNum=皖R865322";
url[1]="http://xxxx";
url[2]="http://xxxx";
url[3]="http://xxxx";
url[4]="http://xxxx";


function openUrlInAlipay(url){
    let uri = "intent://platformapi/startapp?saId=20000067&url="+ encodeURIComponent(url) +"#Intent;scheme=alipayqr;package=com.eg.android.AlipayGphone;end"
    let i = Intent.parseUri(uri,1);
    app.startActivity(i)
}
     function inputAmount(f) {
    f = String(f);
    for (let i = 0, l = f.length; i < l; i++) {
        depth(8).text(f[i]).findOne().click()
    }
}
      i=0;
      openUrlInAlipay(url[i])   
      sleep(1800)
    b = depth(12).className("android.widget.EditText").findOne().bounds();
      press(b.centerX(), b.centerY(),1);
      sleep(50)
      inputAmount(0.51)
      sleep(50);
      desc("确定支付").findOne().click()     
      sleep(2000)
      press(550,2040,1)
sleep(900)
press(900,1550,1)
press(900,1550,1)
press(900,1750,1)
press(900,1750,1)
press(900,1950,1)
press(900,1950,1) 
sleep(2800)}
      