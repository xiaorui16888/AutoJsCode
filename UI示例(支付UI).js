/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Version: Auto.Js Pro
 * @LastEditors: 大柒
 * @Date: 2019-04-30 22:27:06
 * @LastEditTime: 2019-05-05 12:25:42
 * @Description: 支付UI界面
 *  此模板是参照爱奇艺支付模板
 *  使用 自定义控件 降低代码重复率
 *  有支付宝支付功能 是我自己本人的接口
 *  有弹窗模板  仿toast弹窗 
 */
"ui";

importClass("androidx.drawerlayout.widget.DrawerLayout")
importClass(android.view.WindowManager);
importClass(android.view.View);
importClass(android.graphics.Color)
importClass(android.app.AlertDialog)
importClass(java.io.FileOutputStream);
importClass(java.io.File);


importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
importClass(android.os.Bundle)
importClass(android.view.Window)

importClass(android.view.animation.AccelerateDecelerateInterpolator)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.AnticipateInterpolator)
importClass(android.view.animation.AnticipateOvershootInterpolator)
importClass(android.view.animation.BounceInterpolator)
importClass(android.view.animation.CycleInterpolator)
importClass(android.view.animation.DecelerateInterpolator)
importClass(android.view.animation.LinearInterpolator)
importClass(android.view.animation.OvershootInterpolator)
importClass(android.view.animation.PathInterpolator)
importClass(android.widget.Button)
importClass(android.widget.ImageView)
importClass(android.widget.TextView)

//用户信息
user = {
    name: "大柒",
    id: "15",
    phone: "18000000000",
    time_off: "2019-05-31",
}

//套餐信息
payName = "黄金VIP套餐"

//IMG图片数据
img_zfb = "http://gdown.baidu.com/img/0/512_512/4bfcfd18afa6dc68ef84b00302344dbd.png";
img_wx = "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgh9i35gUogKLn1wUwgAQ4gAQ.png";
img_user = "https://16570095.s21i.faiusr.com/2/ABUIABACGAAgu9y35gUo0Mbk_AUw9AM49AM.jpg"

const animation_time = 500//动画时间

//任务栏透明
var window = activity.getWindow();
var decorView = window.getDecorView();
var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
decorView.setSystemUiVisibility(option);
window.setStatusBarColor(Color.TRANSPARENT);

//确认支付按钮 背景和文字color
pay_bnt = {
    s: { bg: "#e3e3e3", color: "#ffffff" },
    c: { bg: "#f2c186", color: "#6b4128" }
}

var MyColor = "#3d3d3f"//主题色
const log_back = "@drawable/ic_chevron_left_black_48dp"//返回按钮

var v_meal_bg = [];//套餐view信息
var v_pay_radio = [];//支付方式 单选框值
var order = {};
var remind = {};

//订单支付信息
var data = {
    name: user.name,
    id: user.id,
    goods: payName,
    money: "",
    pay: "",
    date: "",
}

//自定义控件 充值套餐
var setMealLayout = (function () {
    util.extend(setMealLayout, ui.Widget);
    function setMealLayout() {
        ui.Widget.call(this);
        this.defineAttr("title", (view, attr, value, defineSetter) => {
            view._title_bg.attr("visibility", "visible");
            view._title_text.setText(value);
        })
        this.defineAttr("month", (view, attr, value, defineSetter) => {
            view._month.setText(value);
        });
        this.defineAttr("money", (view, attr, value, defineSetter) => {
            view._money.setText(value);
        });
        this.defineAttr("subtitle", (view, attr, value, defineSetter) => {
            view._subtitle.attr("visibility", "visible");
            view._subtitle.setText(value);
        });
        this.defineAttr("remind", (view, attr, value, defineSetter) => {
            view._remind_bg.attr("visibility", "visible");
            view._remind.setText(value);
        });
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            v_meal_bg[v_meal_bg.length] = view
            this._onClick = value;
        });
    };
    setMealLayout.prototype.render = function () {
        return (
            <frame h="*" w="*" marginRight="10" >
                <card
                    id="_title_bg"
                    w="auto" h="14"
                    cardCornerRadius="5dp"
                    cardBackgroundColor="#3b3b3b"
                    gravity="center"
                    foreground="?selectableItemBackground"
                    visibility="invisible"
                >
                    <text id="_title_text" text="0" margin="5 0 5 0" textSize="10" textStyle="bold" textColor="#dbbb88" />
                </card>
                <vertical id="_bg" h="*" w="*" marginTop="7" bg="#e3e3e3" >
                    <vertical id="_bg_1" w="*" h="*" margin="1" bg="#ffffff" gravity="center_horizontal">
                        <text id="_month" w="auto" text="0个月" marginTop="10" textStyle="bold" textSize="22" />
                        <horizontal w="auto" h="auto" >
                            <text text="¥" textColor="#a37655" />
                            <text id="_money" text="0.00" textColor="#a37655" textSize="32" textStyle="bold" typeface="serif" />
                        </horizontal>
                        <text id="_subtitle" w="auto" text="0" textSize="10" visibility="invisible" />
                        <card id="_remind_bg"
                            w="auto" h="auto"
                            marginTop="5" marginBottom="15"
                            cardCornerRadius="6"
                            cardBackgroundColor="#dcbb86"
                            gravity="center"
                            foreground="?selectableItemBackground"
                            visibility="invisible" >
                            <horizontal margin="2 0 2 0">
                                <img w="10" h="10" margin="5 2 3 0" src="@drawable/ic_thumb_up_black_48dp" tint="#ffffff" />
                                <text id="_remind" text="0" margin="0 0 5 0" textSize="10" textStyle="bold" textColor="#ffffff" />
                            </horizontal>
                        </card>
                    </vertical>
                </vertical>
            </frame>
        );
    };
    setMealLayout.prototype.onViewCreated = function (view) {
        view.on("click", () => {
            if (this._onClick) {
                for (let i = 0; i != v_meal_bg.length; i++) {
                    v_meal_bg[i]._bg.attr("bg", "#e3e3e3");
                    v_meal_bg[i]._bg_1.attr("alpha", "1");
                }
                ui.money.setText(view._money.text())
                ui.money_s.setText("你已选择" + ui.money_name.text() + view._month.text() + "套餐")
                data.money = parseInt(view._month.text())
                view._bg.attr("bg", "#d6bf93");
                view._bg_1.attr("alpha", "0.8");
                pay_money = parseInt(view._month.text())
                eval(this._onClick);
            }
        });
    };
    ui.registerWidget("setMeal-layout", setMealLayout);
    return setMealLayout;
})();

//自定义控件 用户信息标题
var userTitleLayout = (function () {
    util.extend(userTitleLayout, ui.Widget);
    function userTitleLayout() {
        ui.Widget.call(this);
    }
    userTitleLayout.prototype.render = function () {
        return (
            <horizontal h="*" w="*" bg="{{MyColor}}" gravity="center_vertical"  >
                <img marginLeft="10" src="{{img_user}}" h="44" w="44" circle="true" scaleType="fitXY" layout_gravity="center_vertical" />
                <vertical w="*" h="44" marginLeft="10" >
                    <horizontal h="22" gravity="vertical_center">
                        <text id="user_name" text="{{user.name}}" textSize="18" textStyle="bold" textColor="#ffffff" />
                        <card w="auto" h="auto" margin="5 3 0 0" cardCornerRadius="5dp" cardBackgroundColor="#dbbb88"
                            cardElevation="5dp" gravity="center" foreground="?selectableItemBackground">
                            <horizontal margin="5 0 5 0">
                                <text id="user_id" text="ID: {{user.id}}" textColor="{{MyColor}}" textStyle="bold" />
                            </horizontal>
                        </card>
                        <text id="user_phone" text="（{{user.phone}} 登录）" h="*" marginTop="1" textSize="16" gravity="center_vertical" textColor="#ffffff" />
                    </horizontal>
                    <text text="{{user.time_off}}到期，购买后有效期将延顺" h="*" gravity="center_vertical" textColor="#80ffffff" />
                </vertical>
            </horizontal>
        )
    }
    ui.registerWidget("user_title-layout", userTitleLayout);
    return userTitleLayout;
})();

//自定义控件 付款方式
var payLayout = (function () {
    util.extend(payLayout, ui.Widget);
    function payLayout() {
        ui.Widget.call(this);
        this.defineAttr("name", (view, attr, value, defineSetter) => {
            view._pay_name.setText(value);
        });
        this.defineAttr("label", (view, attr, value, defineSetter) => {
            view._label_text.setText(value)
            switch (value) {
                case "推荐":
                    view._label_bg.attr("cardBackgroundColor", "#f5a623")
                    break;
                case "维护":
                    view._label_bg.attr("cardBackgroundColor", "#999999")
                    break;
            }
            view._label_bg.attr("visibility", "visible");
        })
        this.defineAttr("subtitle", (view, attr, value, defineSetter) => {
            view._subtitle.setText(value);
            view._subtitle.attr("visibility", "visible");
        });
        this.defineAttr("src", (view, attr, value, defineSetter) => {
            view._img.attr("src", value);
        });
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            v_pay_radio[v_pay_radio.length] = view._radio

            this._onClick = value;
        });
    }
    payLayout.prototype.render = function () {
        return (
            <vertical >
                <frame h="1" w="*" bg="#e3e3e3" />
                <horizontal marginTop="10" marginBottom="10" w="*" h="44" >
                    <img id="_img" w="44" src="#ffffff" />
                    <vertical h="*" w="auto" marginLeft="10">
                        <horizontal h="22" w="auto">
                            <text id="_pay_name" w="auto" text="未知" textSize="18" textStyle="bold" textColor="#000000" minWidth="60" />
                            <card id="_label_bg" w="auto" h="auto" marginLeft="10" layout_gravity="center_vertical" cardCornerRadius="6" cardBackgroundColor="#f5a623"
                                foreground="?selectableItemBackground" visibility="invisible">
                                <text id="_label_text" margin="10 0 10 0" text="暂无" textStyle="bold" textSize="14" textColor="#ffffff" />
                            </card>
                        </horizontal>
                        <text id="_subtitle" w="auto" h="*" gravity="bottom" text="暂无" textSize="12" visibility="invisible" />
                    </vertical>
                    <vertical w="*" h="*" gravity="right|center">
                        <radio id="_radio" w="auto" clickable="false" />
                    </vertical>
                </horizontal>
            </vertical>
        )
    };
    payLayout.prototype.onViewCreated = function (view) {
        view.on("click", () => {
            if (this._onClick) {
                for (let i = 0; i != v_pay_radio.length; i++) {
                    v_pay_radio[i].attr("checked", false);
                }
                if (view._label_text.text() == "维护") {
                    pay = 0
                    alert(view._pay_name.text() + "支付通道正在维护中")
                } else {
                    pay = view._pay_name.text()
                    view._radio.attr("checked", true)
                }

                eval(this._onClick);
            }
        });
    };
    ui.registerWidget("pay-layout", payLayout);
    return payLayout;
})();

//自定义控件 处理中toast
var remindLayout = (function () {
    util.extend(remindLayout, ui.Widget);
    function remindLayout() {
        ui.Widget.call(this);
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            remind = view
            this._onClick = value;
        });
    }
    remindLayout.prototype.render = function () {
        return (
            <frame id="_loads" w="*" h="*" >
                <card id="_load" h="150" w="150" cardBackgroundColor="#95000000" layout_gravity="center"
                    cardElevation="0" cardCornerRadius="10dp" alpha="0">
                    <frame >
                        <frame alpha="0.6">
                            <img id="_load_colse" w="70" h="70" src="@drawable/ic_sentiment_dissatisfied_black_48dp" layout_gravity="center" marginBottom="10" tint="#ffffff" alpha="0" />
                        </frame>
                        <frame id="_load_0">
                            <text id="_load_time" text="10" w="auto" h="auto" layout_gravity="center" marginBottom="10" textStyle="bold" textColor="#90ffffff" textSize="30" />
                            <progressbar w="80" h="80" layout_gravity="center" marginBottom="10" alpha="0.8" />
                        </frame>
                        <text id="_load_text" text="正在创建订单" w="auto" h="auto" marginBottom="10" layout_gravity="bottom|center" textStyle="bold" textColor="#90ffffff" textSize="16" />
                    </frame>
                </card>
            </frame>
        )
    }
    ui.registerWidget("remind-layout", remindLayout);
    return remindLayout;
})();

//自定义控件 支付弹窗ui
var orderLayout = (function () {
    util.extend(orderLayout, ui.Widget);
    function orderLayout() {
        ui.Widget.call(this);
        this.defineAttr("src", (view, attr, value, defineSetter) => {
            view._img.attr("src", value);

        });
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            order = view
            this._onClick = value;
        });
    }
    orderLayout.prototype.render = function () {
        return (
            <frame id="pay_bg_bg" w="*" h="*" bg="#000000" alpha="0" visibility="gone" >
                <vertical w="*" h="*" gravity="center_vertical" marginTop="-40">
                    <horizontal w="*" h="auto" weightSum="5" gravity="center" >
                        <card id="pay_bg" h="auto" w="auto" margin="0 40 0 40" layout_weight="2"
                            cardElevation="20" cardCornerRadius="25dp" cardBackgroundColor="#ffffff" alpha="0">
                            <vertical h="*" w="*" clipChildren="false">
                                <vertical h="*" w="*" marginBottom="30" >
                                    <horizontal marginTop="10" gravity="center_horizontal">
                                        <text text="支付时请核对下面订单号" textColor="#000000" />
                                    </horizontal>
                                    <text
                                        id="_data"
                                        marginTop="10"
                                        text="0"
                                        textColor="#000000"
                                        gravity="center_horizontal"
                                    />
                                    <horizontal w="*" h="150" weightSum="5" gravity="center_horizontal">
                                        <img id="_img" w="*" h="*" src="#ffffff" layout_weight="3" scaleType="fitCenter" layout_gravity="center_horizontal" />
                                    </horizontal>
                                    <text
                                        id="_pay_g"
                                        text="198.00"
                                        textColor="#000000"
                                        textStyle="bold"
                                        textSize="30"
                                        gravity="center"
                                    />
                                </vertical>
                                <vertical h="auto" w="*" layout_weight="1" bg="#00a0e8" >
                                    <img w="44" h="44" marginTop="-22" src="{{img_user}}" layout_gravity="center_horizontal" circle="true" borderWidth="2" borderColor="#ffffff" />
                                    <vertical marginLeft="20" marginTop="10">
                                        <text
                                            id="_user"
                                            h="auto"
                                            text="用户信息: "
                                            textColor="#ffffff"
                                            textSize="12"
                                        />
                                        <text
                                            id="_pay"
                                            h="*"
                                            text="订单信息: "
                                            textColor="#ffffff"
                                            textSize="12"
                                        />
                                        <text
                                            id="_date"
                                            h="*"
                                            text="创建时间: "
                                            textColor="#ffffff"
                                            textSize="12"
                                        />
                                    </vertical>
                                    <frame w="*" h="25" margin="0 10 0 10" gravity="center_horizontal">
                                        <text w="auto" h="*" text="已完成支付" textColor="#ffffff" gravity="center_vertical" />
                                        <img id="_validation" w="100" h="25" src="#00ffffff" borderWidth="1" borderColor="#ffffff" layout_gravity="center_horizontal" scaleType="fitXY" radius="20" />
                                    </frame>
                                </vertical>
                            </vertical>
                        </card>
                    </horizontal>
                    <frame id="_close" w="40" h="40" marginTop="-20" layout_gravity="center_horizontal" alpha="0.5" rotation="45">
                        <img w="*" h="*" src="#00ffffff" borderWidth="1" borderColor="#ffffff" layout_gravity="center_horizontal" scaleType="fitXY" radius="60" />
                        <vertical w="25" h="1" bg="#ffffff" layout_gravity="center" />
                        <vertical w="1" h="25" bg="#ffffff" layout_gravity="center" />
                    </frame>

                </vertical>
                <text
                    text="UI示例,@大柒 "
                    textColor="#80ffffff"
                    textSize="28"
                    textStyle="bold"
                    gravity="center_horizontal"
                    marginTop="20" />
                <vertical w="*" h="auto" layout_gravity="bottom">
                    <frame w="*" h="25" marginBottom="10" gravity="center_horizontal" alpha="0.5">
                        <text id="_intent_text" w="auto" h="*" text="本机支付" textColor="#ffffff" gravity="center_vertical" />
                        <img id="_intent" w="100" h="25" src="#00ffffff" borderWidth="1" borderColor="#ffffff" layout_gravity="center_horizontal" scaleType="fitXY" radius="20" />
                    </frame>
                    <text h="auto" text="扫描上方二维码进行付款" textColor="#80ffffff" gravity="center_horizontal" textSize="10" />
                    <text h="auto" text="付款完成后,点击已完成支付" textColor="#80ffffff" gravity="center_horizontal" textSize="10" />
                </vertical>
            </frame>
        )
    };
    orderLayout.prototype.onViewCreated = function (view, attr, value) {

    };
    ui.registerWidget("order-layout", orderLayout);
    return orderLayout;
})();


//ui界面
ui.layout(
    <vertical h="*" >
        <frame h="*" id="pay_0">
            <vertical h="*" w="*">
                <vertical h="auto">
                    <appbar >
                        <toolbar bg="{{MyColor}}" id="toolbar" fitsSystemWindows="true" h="75" >
                            <img h="35" id="pay_close" src="{{log_back}}" tint="#98ffffff" />
                            <text text="会员中心" textStyle="bold" textSize="18" textColor="#98ffffff" layout_gravity="center" />
                        </toolbar>
                    </appbar>
                </vertical>
                <scroll h="*" w="*" layout_gravity="center">
                    <vertical h="*" w="*" bg="#f5f6f8" >
                        <user_title-layout h="60" w="*" />
                        <vertical h="auto" w="*" bg="#ffffff"  >
                            <frame h="64" w="*" margin="10 0 10 0" >
                                <text h="*" w="auto" id="money_name" text="{{payName}}" textSize="22" textColor="#000000" textStyle="bold" layout_gravity="left" gravity="center_vertical" />
                                <frame h="*" w="auto" layout_gravity="right" >
                                    <text h="*" w="auto" id="pay_key" text="激活码续费 >" gravity="center_vertical" />
                                </frame>
                            </frame>
                            <horizontal h="auto" marginLeft="10" marginBottom="30" >
                                <setMeal-layout h="auto" w="*" layout_weight="1" title="赠一对一专属客服" month="12个月" money="198" subtitle="折合16.5/月" remind="最大优惠哦!" onClick="pay_bnt_color1()" />
                                <setMeal-layout h="auto" w="*" layout_weight="1" title="优惠很低" month="3个月" money="58" subtitle="折合19.3/月" onClick="pay_bnt_color1()" />
                                <setMeal-layout h="auto" w="*" layout_weight="1" month="1个月" money="19.8" onClick="pay_bnt_color1()" />
                            </horizontal>
                        </vertical>
                        <vertical w="*" h="auto" marginTop="10" bg="#ffffff">
                            <vertical margin="10 10 20 10">
                                <text text="付款方式" marginBottom="10" textSize="22" textStyle="bold" textColor="#000000" />
                                <pay-layout w="*" h="auto"
                                    name="支付宝"
                                    src="{{img_zfb}}"
                                    label="推荐"
                                    subtitle="数亿人都在用 , 安全可托付"
                                    onClick="pay_bnt_color1()"
                                />
                                <pay-layout w="*" h="auto"
                                    name="微信"
                                    src="{{img_wx}}"
                                    label="维护"
                                    subtitle="诚信1+1 , 支付百分百"
                                    onClick="pay_bnt_color1()"
                                />
                            </vertical>
                        </vertical>
                        <vertical w="*" h="100" />
                    </vertical>
                </scroll>
                <card h="60" w="*" bg="#f5f6f8" marginTop="-60" layout_gravity="bottom"
                    cardElevation="30">
                    <horizontal h="*" w="*" >
                        <vertical h="*" w="*" layout_weight="1" marginLeft="20">
                            <horizontal w="*" h="40">
                                <text text="总计:" h="*" w="auto" textSize="20" gravity="center_vertical" textColor="#000000" />
                                <text text="¥" textSize="20" marginLeft="10" gravity="center_vertical" textColor="#b48c51" />
                                <text id="money" text="0.00" textSize="30" textStyle="bold" gravity="center_vertical" textColor="#b48c51" />
                            </horizontal>
                            <frame w="*" h="20" >
                                <text id="money_s" text="请选择套餐" />
                            </frame>
                        </vertical>
                        <vertical id="pay_bnt_bg" h="*" w="*" layout_weight="2" bg="{{pay_bnt.s.bg}}" gravity="center">
                            <text id="pay_bnt_color" text="确认支付" textStyle="bold" textSize="20" gravity="center" textColor="{{pay_bnt.s.color}}" />
                        </vertical>
                    </horizontal>
                </card>

            </vertical>
            <remind-layout w="*" h="*" onClick="" />
            <order-layout w="*" h="*" onClick="" />
        </frame>
    </vertical>
);

var pay = 0
var pay_money = 0
var int_0 = 0, int_1 = 0
var load_time = 10
var load_pay = false
var pay_key = {}
var uname
var get_url = "http://shangtai0115.vicp.io:45981/"


ui.pay_bnt_bg.on("click", () => {
    if (load_pay) { toast("请不要重复提交订单"); return };
    if (!pay_money) { dialogs.alert("请选择续费套餐"); return };
    if (!pay) { dialogs.alert("请选择支付方式"); return };
    ui.run(function () {
        remind._load_colse.attr("alpha", "0")
        remind._load_text.setText("正在创建订单")
        remind._load_0.attr("alpha", "1")
        load_time = 10
        remind._load_time.setText("10")
        dialogs.select("请选择预执行的动作", ["生成订单", "生成赞赏码"])
            .then(i => {
                switch (i) {
                    case 0:
                        let get = "open-get?flag=测试订单&"
                        get += "user=" + user.name + "&"
                        get += "id=" + user.id + "&"
                        get += "data=" + pay_money + "&"
                        get += "pay=支付宝"
                        uname = "购买" + pay_money + "个月" + payName
                        gethttp(get)
                        break;
                    case 1:
                        rawInput("请输入要赞赏的金额").then(age => {
                            let A = age
                            //let A = parseFloat(age)
                            if (isNaN(A) || A == null || A <= 0) { log("错误"); alert("请输入正确金额"); return }
                            let get = "open-get?flag=自定义赞赏&"
                            get += "user=" + user.name + "&"
                            get += "id=" + user.id + "&"
                            get += "data=" + A + "&"
                            get += "pay=支付宝"
                            uname = "自定义赞赏"
                            gethttp(get)
                        });
                        break;
                }
            });
    })
    function gethttp(data) {
        remind._loads.attr("clickable", true);
        load_pay = true
        //采用回调方式GET请求
        http.get(get_url + data, {}, function (res, err) {
            if (err) {
                console.error(err);
                return;
            }
            pay_key = res.body.json()
            http.get(pay_key.url_logo, {}, function (res1, err) {
                if (err) {
                    console.error(err);
                    return;
                }
                let AA1 = res1.body.string()
                var pattern = "qrcode_plugins_img =\"(.*)\"";
                pay_key.img = AA1.match(pattern)[1];
                //log("html = " + pay_key.img);
                pay_loading()
            });
        });
        //定时器倒计时
        remind._load.attr("alpha", "1");
        int_0 = setInterval(function () {
            if (!load_pay) { toast_load_colse(); clearInterval(int_0); }
            if (load_time == 0) {
                ui.run(function () {
                    remind._load_colse.attr("alpha", "1")
                    remind._load_0.attr("alpha", "0")
                    remind._load_text.setText("创建订单失败")
                    clearInterval(int_0);
                })
                setTimeout(function () {
                    toast_load_colse()
                }, 2000);
                return
            }
            load_time--
            remind._load_time.setText("" + load_time)
        }, 1000);
    }
})

ui.pay_key.on("click", () => {
    log("激活码续费")
    alert("UI示例文件,不支持激活码续费")
})

ui.pay_close.on("click", () => {
    toastLog("ui关闭")
    exit()
})

function toast_load_colse() {
    ui.run(function () {
        remind._load.attr("alpha", "0")
        clearInterval(int_0);
        load_pay = false
        remind._loads.attr("clickable", false);
    })
}

function pay_bnt_color1() {
    ui.run(function () {
        if (pay && pay_money) {
            ui.pay_bnt_bg.attr("bg", pay_bnt.c.bg)
            ui.pay_bnt_color.setTextColor(colors.parseColor(pay_bnt.c.color))
        } else {
            ui.pay_bnt_bg.attr("bg", pay_bnt.s.bg)
            ui.pay_bnt_color.setTextColor(colors.parseColor(pay_bnt.s.color))
        }
    })
}

function pay_loading() {
    ui.run(function () {
        order._img.attr("src", "http:" + pay_key.img)
        order._user.setText('用户信息: ' + user.name + ' ID: ' + user.id)
        order._pay.setText('订单信息: ' + uname)
        order._date.setText('创建时间: ' + pay_key.date)
        order._pay_g.setText(keepTwoDecimalFull(pay_key.pay))
        order._data.setText(str_key(pay_key.data, 4))
    })
    sleep(2000)
    toast_load_colse()
    load_pay = true
    ui.run(function () {
        order.pay_bg_bg.attr("visibility", "visible");
        order.pay_bg_bg.attr("clickable", true);
        slX = ObjectAnimator.ofFloat(order.pay_bg, "scaleX", 0, 1)
        slY = ObjectAnimator.ofFloat(order.pay_bg, "scaleY", 0, 1)
        animator = ObjectAnimator.ofFloat(order.pay_bg, "alpha", 1, 1)
        animator1 = ObjectAnimator.ofFloat(order.pay_bg_bg, "alpha", 0, 1)
        set = new AnimatorSet()
        set.playTogether(
            slX, slY, animator, animator1);
        set.setDuration(animation_time);
        set.start();
    })
}

/**
 * 支付页面 控件触发
 */
order._intent.on("click", () => {
    log("跳转支付宝")
    try {
        app.startActivity({
            data: pay_key.url
        });
        toast("正在打开支付宝")
    } catch (error) {
        toast("没有安装支付宝")
    }

});

order._close.on("click", () => {
    log("点击>>>关闭")
    confirm("确定要关闭吗").then(value => {
        //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
        if (value) {
            slX = ObjectAnimator.ofFloat(order.pay_bg, "scaleX", 1, 0)
            slY = ObjectAnimator.ofFloat(order.pay_bg, "scaleY", 1, 0)
            animator = ObjectAnimator.ofFloat(order.pay_bg, "alpha", 1, 1)
            animator1 = ObjectAnimator.ofFloat(order.pay_bg_bg, "alpha", 1, 0)
            set = new AnimatorSet()
            set.playTogether(
                slX, slY, animator, animator1);
            set.setDuration(animation_time);
            set.start();
            setTimeout(function () {
                load_pay = false
                ui.run(function () {
                    order.pay_bg_bg.attr("clickable", false);
                    order.pay_bg_bg.attr("visibility", "gone");
                })
            }, animation_time);
        }
    });
})

order._validation.on("click", () => {
    log("效验结果")
    alert("UI示例文件,不支持支付结果效验")
})

function keepTwoDecimalFull(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

function str_key(source, count) {
    let arr = [];
    for (let i = 0, len = source.length / count; i < len; i++) {
        let subStr = source.substr(0, count);
        arr.push(subStr);
        source = source.replace(subStr, "");
    }
    let str = ""
    for (i = 0; i < arr.length - 1; i++) {
        str += arr[i] + " "
    }
    return str + arr[arr.length - 1]
}
