auto.waitFor();//获取无障碍;
var websever = '';
/**
 * 主程序
 */

main();
function main(){
    while(1){
        sleep(1000);
        if(text('谁看过我').exists()){
            if(text('还没有人看过你的资料').exists()){
                toastLog('还没有人看过你的资料');
            }else{
                click(className('android.widget.ImageView').find()[0].bounds().centerX(),className('android.widget.ImageView').find()[0].bounds().centerY());
                sleep(500);
                text('资料').waitFor();//等待资料出现
                click(text('资料').findOne().bounds().centerX(),text('资料').findOne().bounds().centerY());
                //上滑
                swipe(500,1000,500,0,800);
                sleep(1500);
                momozhanghao =  className('android.widget.TextView').find()[16].text().split("：")[1];
                toastLog('陌陌账号为：'+momozhanghao);
                http.get(websever+'/api/index/is_sucessfuy?momohao='+momozhanghao);   
                back();
                sleep(1000);
                longClick(className('android.widget.ImageView').find()[0].bounds().centerX(),className('android.widget.ImageView').find()[0].bounds().centerY());
                sleep(1000);
                text('确认').click();
                sleep(2000);
                if(text('点击加载更多').exists()){
                    click(text('点击加载更多').findOne().bounds().centerX(),text('点击加载更多').findOne().bounds().centerY());
                    sleep(2000);
                }
            }
        }else{
            toastLog('请回到谁看过我的界面')
        }

    }
}


