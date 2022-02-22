"ui";
frame();
function frame() {
    ui.layout(
        <frame h="*" w="*" >
            <relative
                layout_width="match_parent"
                layout_height="match_parent"
                gravity="bottom|right" >
                <img id="cd_0" layout_gravity="right" w="150px" h="150px" src="@drawable/ic_sentiment_satisfied_black_48dp" rotation="-90" />
                <img id="cd_1" layout_gravity="right" w="150px" h="150px" src="@drawable/ic_sentiment_neutral_black_48dp" rotation="-90" />
                <img id="cd_2" layout_gravity="right" w="150px" h="150px" src="@drawable/ic_sentiment_dissatisfied_black_48dp" rotation="-90" />
                <img id="cd_3" layout_gravity="right" w="150px" h="150px" src="@drawable/ic_sentiment_very_dissatisfied_black_48dp" rotation="-90" />
                <frame margin="11 11 0 0" bg="#ffffff" w="80px" h="80px" ></frame>
                <frame >
                    <img id="jia" layout_gravity="bottom|right" w="150px" h="150px" src="@drawable/ic_add_circle_black_48dp" />
                </frame>
            </relative>
        </frame>
    )
    let FX = true;//真 横向 假 竖向  自行用图片处理软件调整图片方向  横向 图片旋转90度   竖向 图片旋转 -90度
    if (FX) {
        ui.cd_0.setRotation(90);
        ui.cd_1.setRotation(90);
        ui.cd_2.setRotation(90);
        ui.cd_3.setRotation(90);
    } else {
        ui.cd_0.setRotation(-90);
        ui.cd_1.setRotation(-90);
        ui.cd_2.setRotation(-90);
        ui.cd_3.setRotation(-90);
    }
    //c 值是图片的半径 b,d,e值跟随c值 f值为0 展开图标的默认角度
    var c = 75
    let b = c, d = c, e = c, f = 0
    //y 值为真时 四个选项图标才可以有效点击
    //y1 等于假时代表正在展开或收起   
    var y = false, y1 = true;
    ui.cd_0.on("click", () => {
        if (y) {
            toastLog("开心!")
        }
    })
    ui.cd_1.on("click", () => {
        if (y) {
            toastLog("面无表情!")
        }
    })
    ui.cd_2.on("click", () => {
        if (y) {
            toastLog("难过!")
        }
    })
    ui.cd_3.on("click", () => {
        if (y) {
            toastLog("凉凉!")
        }
    })
    ui.jia.on("click", () => {
        threads.start(function () {
            if (y1) {
                y1 = false
                if (y) {
                    for (let i = 0; i < 104; i++) {
                        if (i % 2) {ui.jia.setRotation(f += 6)}
                        ui.cd_0.setPivotY(c += 1)
                        ui.cd_0.setPivotX(c)
                        ui.cd_1.setPivotY(b += 2)
                        ui.cd_1.setPivotX(b)
                        ui.cd_2.setPivotY(d += 3)
                        ui.cd_2.setPivotX(d)
                        ui.cd_3.setPivotY(e += 4)
                        ui.cd_3.setPivotX(e)
                        sleep(1)
                    }
                    y = false
                } else {
                    for (let i = 104; i > 0; i--) {
                        if (i % 2) {ui.jia.setRotation(f -= 6)}
                        ui.cd_0.setPivotY(c -= 1)
                        ui.cd_0.setPivotX(c)
                        ui.cd_1.setPivotY(b -= 2)
                        ui.cd_1.setPivotX(b)
                        ui.cd_2.setPivotY(d -= 3)
                        ui.cd_2.setPivotX(d)
                        ui.cd_3.setPivotY(e -= 4)
                        ui.cd_3.setPivotX(e)
                        sleep(1)
                    }
                    y = true;
                }
                y1 = true
            }
        })
    })
}