sleep(5000)
while(true){
	var submit=id("message_body").findOne().bounds()
	click(submit.centerX() , submit.centerY())
	while(!click("取消收藏"));
	while(!click("确定"));
}