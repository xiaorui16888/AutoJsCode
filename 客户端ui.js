"ui";

//自定义图片路径或者base64数据
const img_link = 'https://www.baidu.com/img/bd_logo1.png';

ui.layout(
    <vertical w='*' h='*' background='#ffffff' >
        <horizontal w='*' h='auto' padding='5dp' background='#b2b2b2'>
            <button id='button_0' text='截 图' textSize='16sp' layout_weight='1'></button>
            <button id='button_1' text='运 行' textSize='16sp' layout_weight='1'></button>
        </horizontal>
        <vertical w='*' h='*' gravity='center'>
            <img src='{{img_link}}' w='auto' h='auto' id='img_0'></img>
        </vertical>
    </vertical>
);

//程序初始化线程
threads.start(function(){
    //请求截屏权限
    if(images.requestScreenCapture()){
        toastLog('请求截屏权限成功');
    }else{
        toastLog('请求截屏权限失败');
    }
});

//截图事件
ui.button_0.on('click', ()=> {
    
});

//运行事件
ui.button_1.on('click', ()=> {
    var config = {};
    config.con = rawInput('请输入','');
    var th = '';
    if(config.con != ''){
        if(th.isAilve()){
            th.interrupt();
        }
        th = threads.start(function(){
            //主函数
            bu_1(config);
        });
    }else{
        toastLog('请输入字符串');
    }
});

function bu_0(obj){
    log('开始bu_1函数,传入数据为:'+obj);
}

function bu_1(obj){
    log('开始bu_1函数,传入数据为:'+obj);
}

