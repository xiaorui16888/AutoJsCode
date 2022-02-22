"ui";

ui.layout(
    <frame id='爷爷'>
        <vertical>
            <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
                关于Auto.js的用户调查
            </text>
            <ScrollView id='scrollParent'>
                <vertical id='verticalParent'>
                    <text textSize="16sp" margin="8">1. 您的年龄是?</text>
                    <input text="18" inputType="number" margin="0 16"/>
                    <text textSize="16sp" margin="8">2. 您用过其他类似软件(脚本精灵，按键精灵等)吗?</text>
                    <radiogroup margin="0 16">
                        <radio text="没有用过"/>
                        <radio text="用过"/>
                        <radio text="用过，感觉不好用"/>
                        <radio text="没有Root权限无法使用"/>
                    </radiogroup>
                    <text textSize="16sp" margin="8">3. 您使用Auto.js通常用于做什么?(多选)</text>
                    <checkbox text="游戏辅助" marginLeft="16"/>
                    <checkbox text="点赞" marginLeft="16"/>
                    <checkbox text="日常生活工作辅助" marginLeft="16"/>
                    <checkbox text="练习编程" marginLeft="16"/>
                    <checkbox text="自动化测试" marginLeft="16"/>
                    <linear>
                        <checkbox text="其他" marginLeft="16"/>
                        <input w="*" margin="0 16"/>
                    </linear>
                    <text textSize="16sp" margin="8">4. 您更喜欢以下哪个图标?</text>
                    <radiogroup margin="0 16">
                        <radio/>
                        <img w="100" h="100" margin="0 16" src="http://www.autojs.org/assets/uploads/profile/3-profileavatar.png"/>
                        <radio/>
                        <img w="100" h="100" margin="0 16" src="http://www.autojs.org/assets/uploads/files/1511945512596-autojs_logo.png"/>
                    </radiogroup>
                    <text textSize="16sp" margin="8">5. 您是什么时候开始使用Auto.js的呢?</text>
                    <datepicker margin="4 16" datePickerMode="spinner"/>
                    <text textSize="16sp" margin="8">6. 您用过下面这个Auto.js的论坛吗?</text>
                    <webview id="webview" h="300" margin="0 16"/>
                    <radiogroup marginLeft="16" marginTop="16">
                        <radio text="没有用过"/>
                        <radio text="用过"/>
                        <radio text="用过，感觉不好用"/>
                    </radiogroup>
                    <linear gravity="center">
                        <button margin="16">提交</button>
                        <button margin="16">放弃</button>
                    </linear>
                </vertical>
            </ScrollView>
        </vertical>
    </frame>
)

ui.webview.loadUrl("https://www.baidu.com");

var myVerticalParent, sonViewList;


var num = function() {
    var count = 0
    return function() {
        return count++;
    }
}()


    threads.start(
        function() {
            sleep(500);

        myVerticalParent = ui.爷爷

        sonViewList = getAllChildViews(myVerticalParent)
        log(sonViewList.length)
            //sleep(500);

            sonViewList.forEach(
                (view) => {
                    if (view) {
                        try {
                            //不知道为啥滚动之后不隐藏,
                            //而是一起隐藏
                            // scrollToViewTop(view)
                            // log(view.getText())
                            hideView(view)
                            //sleep(1000);
                        } catch (e) {
                            log(e)
                        }

                    }
                }
            )



        }
    )






/**
 * 获取传入指定视图下的所有子视图
 *
 * @param view
 * @return
 */
function getAllChildViews(view) {
    var allChildViews = []
    if (view != null && view instanceof android.view.ViewGroup) {
        var vp = view;
        for (var i = 0; i < vp.getChildCount(); i++) {
            var viewChild = vp.getChildAt(i);
            // 添加视图
            allChildViews.push(viewChild);
            // 方法递归
            allChildViews=getAllChildViews(viewChild).concat(allChildViews);
        }
    }
    return allChildViews;
}


function scrollToViewTop(view) {
    var scrollView = ui.scrollParent
    scrollView.scrollTo(0, view.getTop());
}


function hideView(view) {
    // var view = ui.scrollParent
    function scrollX(view, x) {
        view.scrollTo(x, 0)
    }
    var num = function() {
        var count = 0
        return function() {
            return count+=5;
        }
    }()
    do{
        var n = num()
        scrollX(view, n)
        var width = view.getWidth()
        sleep(1);
    }while(n < width / 3 * 2);



}