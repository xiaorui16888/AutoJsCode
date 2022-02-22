auto.waitFor();//获取无障碍;
console.show()
run_paipai();
function run_paipai(){
    app.launch('com.ifreetalk.ftalk');
    //不管进入哪个界面都需要点击好友列表去偷红包
    sleep(2000);
    text('好友').waitFor();
    click(text('好友').findOnce().bounds().centerX(),text('好友').findOnce().bounds().centerY());

}
sleep(3000)
run_检测红包()
function run_检测红包(){
    sum_je = 0;
    while(1){
        try {
            if(id('com.ifreetalk.ftalk:id/br0').exists()){
                id('com.ifreetalk.ftalk:id/br0').findOnce().click();
                sleep(500);
                if(id('com.ifreetalk.ftalk:id/egs').exists()){
                    click(
                        id('com.ifreetalk.ftalk:id/egs').findOnce().bounds().centerX(),
                        id('com.ifreetalk.ftalk:id/egs').findOnce().bounds().centerY()
                    )
                }
            }else if(id('com.ifreetalk.ftalk:id/egs').exists()){
                click(
                    id('com.ifreetalk.ftalk:id/egs').findOnce().bounds().centerX(),
                    id('com.ifreetalk.ftalk:id/egs').findOnce().bounds().centerY()
                )
            }else if (text('你打开了他的红包，得到了').exists()){
                sum_je=sum_je+className('android.widget.TextView').find()[2].text();
                toastLog('获取当前金额为:'+className('android.widget.TextView').find()[2].text()+"元，总金额为："+sum_je);
                click(
                    text('确定').findOnce().bounds().centerX(),
                    text('确定').findOnce().bounds().centerY()
                )
                continue;
            }else{
                toastLog('当前没有红包,休息3秒');
                sleep(3000)
            }
        } catch (error) {
                toastLog('当前没有红包,休息3秒');
                sleep(3000);
        }
    }
}