"ui";
var theme_color = "#fefefe";
ui.layout(
    <LinearLayout 
        layout_width="fill_parent"
        layout_height="fill_parent"
        orientation="vertical" >
        <LinearLayout
            focusable="true"
            focusableInTouchMode="true"
            orientation="horizontal"
            layout_width="fill_parent"
            layout_height="wrap_content" >
            <EditText
                id="et_url" 
                layout_width="360dp"
                layout_height="wrap_content" 
                background="{{theme_color}}" 
                singleLine="true"
                maxLines="1"
            />
            <Button 
                id="btn_go"
                layout_height="wrap_content"
                layout_width="wrap_content"
                text="访  问"
                background="{{theme_color}}"
            /> 
        </LinearLayout>

        <webview 
            layout_weight="2"
            id="webView"
            layout_width="fill_parent"
            layout_height="fill_parent" />

        <LinearLayout
            layout_weight="15"
            layout_width="fill_parent"
            layout_height="fill_parent"
            orientation="horizontal"
            background="{{theme_color}}"
        > 
            <Button
                id="btn_back"
                layout_weight="1"
                layout_height="wrap_content"
                layout_width="wrap_content"
                text="←"
                background="{{theme_color}}"
            /> 
            <Button
                id="btn_index"
                layout_weight="1"
                layout_height="wrap_content"
                layout_width="wrap_content"
                text="主页"
                background="{{theme_color}}"
            />
            <Button
                id="btn_forward"
                layout_weight="1"
                layout_height="wrap_content"
                layout_width="wrap_content"
                text="→"
                background="{{theme_color}}"
            /> 
            <Button 
                id="btn_toConsole"
                layout_weight="1"
                layout_height="wrap_content"
                layout_width="wrap_content"
                text="查  看"
                background="{{theme_color}}"
            />
        </LinearLayout>
    </LinearLayout>
)

importClass(android.webkit.CookieManager);
importClass(android.webkit.CookieSyncManager);
importClass(android.os.Build);
importClass(android.webkit.WebSettings);
importClass(android.view.inputmethod.InputMethodManager);
importClass(android.app.Activity);
importPackage(android.content);


CookieSyncManager.createInstance(context);

var webSettings = ui.webView.getSettings();
webSettings.setJavaScriptEnabled(true);

webSettings.setUseWideViewPort(true);
webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);  
webSettings.setLoadWithOverviewMode(true);

var cookieManager = CookieManager.getInstance();
CookieSyncManager.getInstance().sync();

var client = android.webkit.WebViewClient;
var t = new JavaAdapter(client, {
    shouldOverrideUrlLoading : function(view, url) {
        if (isURL(url.getUrl().toString())) {
            return false;
        } else {
            log("拦截到scheme请求:");
            log(url.getUrl().toString());
            return true;
        }
    },
    onPageStarted : function(view, url) {
        ui.et_url.setText(url);
    },
    onPageFinished : function(view, url) {
        ui.et_url.setText(url);
    }
})
ui.webView.setWebViewClient(t);

ui.et_url.clearFocus();

ui.et_url.setOnFocusChangeListener({
    onFocusChange : function(view, hasFocus) {
        if (hasFocus) {
            ui.btn_go.setText("清  空");
        } else {
            ui.btn_go.setText("访  问");
        }
    }
});

ui.webView.setOnFocusChangeListener({
    onFocusChange : function(view, hasFocus) {
        if (hasFocus) {
            ui.et_url.clearFocus();
        }
    }
});

ui.et_url.addTextChangedListener({
    afterTextChanged: function(s) {
        ui.btn_go.setText("访  问");
    }
});

var url = "https://m.baidu.com"

ui.webView.loadUrl(url);

ui.btn_go.click(()=>{
    switch(ui.btn_go.getText().toString()) {
        case "访  问": {
            ui.et_url.clearFocus();
            hideSoftKeyboard(activity);
            var url = ui.et_url.getText();
            if (url.toString().match(/^(http:\/\/|https:\/\/)/)) {
                ui.webView.loadUrl(url);
            } else {
                ui.webView.loadUrl("http://"+url);
            }
        }
        break;
        case "清  空": {
            ui.et_url.setText("");
            ui.btn_go.setText("访  问");
        }
        break;
        default : {}
    }

});

ui.btn_index.click(()=>{
    ui.webView.loadUrl("https://m.baidu.com");
});

ui.btn_back.click(()=>{
    if (ui.webView.canGoBack()) {
        ui.webView.goBack();
    }
});

ui.btn_forward.click(()=>{
    if (ui.webView.canGoForward()) {
        ui.webView.goForward();
    }
});

ui.btn_toConsole.click(()=>{
    app.startActivity("console");
});

var isCanFinish = false;
var isCanFinishTimeout;
ui.emitter.on("back_pressed", e => {
    if (!isCanFinish) {
        toast("连续按两次返回键退出");
        isCanFinish = true;
        isCanFinishTimeout=setTimeout(() => {
            isCanFinish = false;
        }, 700);
        e.consumed = true;
    } else {
        clearTimeout(isCanFinishTimeout);
        e.consumed = false;
    };
});


function isURL(str){
    return !!str.match(/^(http:\/\/|https:\/\/)/);
}

function hideSoftKeyboard(activity) {
    var view = activity.getCurrentFocus();
    if (view != null) {
        var inputMethodManager = activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        inputMethodManager.hideSoftInputFromWindow(view.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
    }
}