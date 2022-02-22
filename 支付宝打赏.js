//支付宝打赏
var url="https://qr.alipay.com/tsx07349o9jeij7po60fedc";
app.startActivity({
    action: "android.intent.action.VIEW",
    data: "alipayqr://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode="+url});