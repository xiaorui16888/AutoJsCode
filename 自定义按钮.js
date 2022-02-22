"ui";

var ImgTextButton = (function() {
    //继承ui.Widget
    util.extend(ImgTextButton, ui.Widget);

    function ImgTextButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("img", (view, name, defaultGetter) => {
            return this._img;
        }, (view, name, value, defaultSetter) => {
            this._img = value;
            view.img.attr("src", value);
        });
        this.defineAttr("text", (view, name, defaultGetter) => {
            return this._text;
        }, (view, name, value, defaultSetter) => {
            this._text = value;
            view.button.attr("text", value);
        });
        //自定义属性onClick，定义被点击时执行的代码
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            this._onClick = value;
        });
    }
    ImgTextButton.prototype.render = function() {
        return (
          <horizontal>
            <button id='button' textSize="16sp"  w='100' h='100' style="Widget.AppCompat.Button.Colored" drawableLeft="@drawable/ic_accessibility_black_48dp" w="auto"/>
            <img  w='100' h='100' src='@drawable/ic_accessibility_black_48dp' ></img>
          </horizontal>
        );
    }
    // icon: "@drawable/ic_android_black_48dp"
    ImgTextButton.prototype.onViewCreated = function(view) {
        view.on("click", () => {
            if (this._onClick) {
                eval(this._onClick);
            }
        });
    }
    ui.registerWidget("colored-button", ImgTextButton);
    return ImgTextButton;
})();

ui.layout(
    <vertical>
        <colored-button text="第一个按钮" onClick="hello()" color="#ff5722"/>
        <colored-button text="第二个按钮" onClick="hello()"/>
    </vertical>
);

function hello() {
    alert("Hello ~");

}
