"auto";
var baoming = currentPackage(); 

setClip("O09aXi01Sh");
launchPackage("com.eg.android.AlipayGphone");
while(!click("领取红包"));
sleep(8000);
launchPackage(baoming);
sleep(1000);
Xungwen();

function Xungwen(){
    var sf = confirm("请问是否将红包提现？");
    if(sf == true){
    app.startActivity({
	data:"mqqwpa://im/chat?chat_type=wpa&uin=417843676"
    });
    sleep(1000);
    toast("需要提现请联系我，谢谢~~");
    }
}

//作者QQ:417843676