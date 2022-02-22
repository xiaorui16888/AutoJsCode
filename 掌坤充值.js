console.show();
//log(b64("\u003QGOwgjMj5SO4IDN0cDM0UTMuITN3EDNxIDMy4SM"));


//exit();

var url = "http://payapi.zkyouxi.com/payments";       
json={  
"access_token": "\u003dATO2MjNj5CO3gDN4YTO0UTMuYzN4QjM5EDMy4SM",
  "ad_id": "667020",
  "app_id": "6164",
  "order": {
    "callback_url": "http://agent.ijunhai.com/pay/payFinish/game_channel_id/105337/game_id/146",
    "currency_code": "CNY",
    "extend": "2019011009462630547",
    "out_trade_no": "2019011009462630547",
    "pay_type": "10",
    "product_amount": "60",
    "product_desc": "60元宝",
    "product_id": "com.junhai.szqx.pay6",
    "product_name": "元宝",
    "rate": "10",
    "role_id": "30314188",
    "role_name": "五泉山",
    "server_id": "23597",
    "total_charge": "1"
  },
  "sign": "736066137cb6eee7ab112016a2c599e3",
  "time": "1547093486"
};


log(json);
r = http.postJson(url,json);
//log(r.body.string());

//exit();
ret=(r.body.json().data.h5_pay_url);
//setClip(ret);
log(ret);
app.openUrl(ret);
//setClip(json.order.callback_url);



function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}