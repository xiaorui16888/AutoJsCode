auto(false);
app.launchApp("百度贴吧");
waitForActivity("com.baidu.tieba.tblauncher.MainTabActivity");
click("进吧");
a=id("name").find();
a.forEach(n=>{
    if(n.text()=="autojs"){
        n.parent().click();
        签到();
        sleep(400);
    }
})

function 签到(){
    waitForActivity("com.baidu.tieba.frs.FrsActivity");
    sleep(200);
    click("签到");
}