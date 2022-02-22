
var apiKey = "65458a5df537443b89b31f1c03202a80";

auto();
events.observeNotification()
events.onNotification(function(n) {
    if (n.getPackageName() != "com.tencent.mobileqq") {
        return;
    }
    if (n && n.contentIntent) {
        n.contentIntent.send();
        reply(n);
        home();
    }
})

function reply(message){
	var sender = message.getTitle();
	log("昵称: " + sender);
	var content = message.getText();
	log("消息: " + content);
	var response = getResponse(getUserId(sender), content);
	log("回复: " + response);
	while(!setText(response));
	while(!click("发送"));
}

function getResponse(userId, message){
	var url = "http://www.tuling123.com/openapi/api";
	var r = http.postJson(url, {
	    key: apiKey,
	    info: String(message),
	    userid: userId
	});
	return r.body.json().text;

}

var users = {};
var userCount = 0;

function getUserId(userName){
	var id = users[userName];
	if(!id){
		id = userCount;
		userCount++;
		users[userName] = id;
	}
	return id;
}