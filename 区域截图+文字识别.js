//自定义截图方便使用找图功能，作者攀登
//在攀登的脚本基础上加入文字识别功能
//识别结果在日志日志中，当然也可以直接复制进剪贴板
//by 白酒煮饭
requestScreenCapture()

截图 = [0, 0, 5, 8]
上部坐标 = [200, 300]
下部坐标 = [400, 500]
files.ensureDir("/sdcard/js截图/")
控制台()
上坐标()
下坐标()
sleep(333334333)

function 控制台() {
    w = floaty.window(
        <frame id="背景1"  w="210" h="120" margin="0" gravity="center"  bg="#8833ff00">
         <vertical gravity="right">
           <linear gravity="center">
             <button id="最小化" margin="-3" gravity="right" text="最小化"  w="60" h="30" textSize="8sp" />
           <button id="退出" margin="-4" gravity="center" text="退出"  w="100" h="30" textSize="8sp" />
           <button id="识别" margin="-3" gravity="center" text="识别"  w="65" h="30" textSize="8sp" />
              </linear>
          <linear gravity="center">
             <vertical margin="3" bg="#99991919" gravity="top">
               <linear margin="-2" gravity="center">
                 <button id="移动0" margin="-3" gravity="center" text="左上"  w="40" h="30" textSize="8sp" />
                 <button id="上0" margin="-3" gravity="center" text="↑"  w="40" h="30" textSize="8sp" />
                 <button id="截图" margin="-3" gravity="center" text="截图"  w="40" h="30" textSize="8sp" />
               </linear>
               <linear margin="-2" gravity="center">
                 <button id="左0" margin="-3" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
                 <button id="下0" margin="-3" gravity="center" text="↓"  w="40" h="30" textSize="8sp" />
                 <button id="右0" margin="-3" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
               </linear>
                 <text id="上坐标" textColor="red">上坐标</text>
             </vertical>
             <vertical margin="3" bg="#99111900" gravity="top">
               <linear margin="-2" gravity="center">
                <button id="移动1" margin="-3" gravity="center" text="右下"  w="40" h="30" textSize="8sp" />
                <button id="上1" margin="-3" gravity="center" text="↑"  w="40" h="30" textSize="8sp" />
                <button id="移动" margin="-3" gravity="center" text="拖动"  w="40" h="30" textSize="8sp" />
               </linear>
               <linear margin="-2" gravity="center">
                <button id="左1" margin="-3" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
                <button id="下1" margin="-3" gravity="center" text="↓"  w="40" h="30" textSize="8sp" />
                <button id="右1" margin="-3" gravity="center" text="→"  w="40" h="30" textSize="8sp" />                
               </linear>
                 <text id="下坐标" textColor="red">下坐标</text>                 
              </vertical>
           </linear>
            <text id="截图大小" textColor="red">图片大小:000X000</text>
          </vertical>
        </frame>
    );
    //setInterval(()=>{}, 1000);
    var x = 0
    var y = 0
    w.setPosition(200, 1000)

    w.截图.click(() => {
        var sj = new Date().getTime()
        sleep(50)
        var 路径 = "/sdcard/js截图/" + sj + ".png"
        img = captureScreen();
        aa = images.clip(img, 截图[0], 截图[1], 截图[2] - 截图[0], 截图[3] - 截图[1])
        images.saveImage(aa, 路径);
        toastLog("截图保存在:\n" + 路径);
    });
    // w.setAdjustEnabled(true);
    w.setSize(900, 600)
    w.退出.click(() => {
        toast("退出");
        //w.close();
        exit()
    });

    w.最小化.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = w.getX();
                windowY = w.getY();

                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));

                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (w.最小化.text() == "最小化") {
                        w.最小化.setText("最大化");
                        w.setSize(150, 150);
                        w1.setSize(0, 0);
                        w2.setSize(0, 0);
                    } else {
                        w.最小化.setText("最小化");
                        w.setSize(900, 600);
                        w1.setSize(上大小[0], 上大小[1]);
                        w2.setSize(下大小[0], 下大小[1]);
                    }
                }
                return true;
        }
        return true;
    });

    w.上0.click(() => {
        上部坐标[1]--
            窗口移动(0, 上部坐标[0], 上部坐标[1])
    });
    w.下0.click(() => {
        上部坐标[1]++
            窗口移动(0, 上部坐标[0], 上部坐标[1])
    });
    w.左0.click(() => {
        上部坐标[0]--
            窗口移动(0, 上部坐标[0], 上部坐标[1])
    });
    w.右0.click(() => {
        上部坐标[0]++
            窗口移动(0, 上部坐标[0], 上部坐标[1])
    });
    w.移动0.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX() - 上部坐标[0];
                y = event.getRawY() - 上部坐标[1];
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                上部坐标[0] = (event.getRawX() - x)
                上部坐标[1] = (event.getRawY() - y)
                窗口移动(0, 上部坐标[0], 上部坐标[1])

            case event.ACTION_UP:
        }
        return true;
    })

    w.上1.click(() => {
        下部坐标[1]--
            窗口移动(1, 下部坐标[0], 下部坐标[1])
    });
    w.下1.click(() => {
        下部坐标[1]++
            窗口移动(1, 下部坐标[0], 下部坐标[1])
    });
    w.左1.click(() => {
        下部坐标[0]--
            窗口移动(1, 下部坐标[0], 下部坐标[1])
    });
    w.右1.click(() => {
        下部坐标[0]++
            窗口移动(1, 下部坐标[0], 下部坐标[1])
    });
    w.移动1.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX() - 下部坐标[0];
                y = event.getRawY() - 下部坐标[1];
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                下部坐标[0] = (event.getRawX() - x)
                下部坐标[1] = (event.getRawY() - y)
                窗口移动(1, 下部坐标[0], 下部坐标[1])

            case event.ACTION_UP:
        }
        return true;
    })

    w.识别.click(() => {
        sleep(50)
        var path = "/sdcard/脚本/识别.png"
        img = captureScreen();
        aa = images.clip(img, 截图[0], 截图[1], 截图[2] - 截图[0], 截图[3] - 截图[1])
        images.saveImage(aa, path);
        文字识别(path);
    })



    w.移动.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
}

function 文字识别(路径) {
    threads.start(function() {
        var url = "http://pic.sogou.com/pic/upload_pic.jsp";
        var res = http.postMultipart(url, {
            "file": open(路径),
        });
        var t = res.body.string();
        res = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + t);
        str = res.body.string();
        //log(str);
        const json = JSON.parse(str)
        a = json.result.map(val => val.content)
        a = a.join('\n')
        log(a);
        setClip(a);
        toast("识别完成，请往日志查看结果");
    });
}

function 窗口移动(a, x, y) {
    if (a == 0) {
        w1.setPosition(x, y)
    } else if (a == 1) {
        w2.setPosition(x, y)
    }
    截图[0] = w1.getX() + 39
    截图[1] = w1.getY() + 99
    截图[2] = w2.getX() + 482 //自己设置偏移量
    截图[3] = w2.getY() + 545
    ui.run(function() {
        w.上坐标.setText(截图[0] + "x" + 截图[1])
        w.下坐标.setText(截图[2] + "x" + 截图[3])
        w.截图大小.setText("截图大小:" + (截图[2] - 截图[0]) + "x" + (截图[3] - 截图[1]))
    });
}

function 上坐标() {
    w1 = floaty.window(
        <frame id="移动11" gravity="center"> 
        <vertical>
            <text w="150" h="1" bg="#ff000000"></text> 
            <text w="1" h="150" bg="#ff000000"></text> 
          </vertical>
     </frame>
    );
    w1.setPosition(上部坐标[0], 上部坐标[1])
    sleep(100)
    w1.移动11.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w1.getWidth();
                ah = w1.getHeight();
                windowX = w1.getX();
                windowY = w1.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                上部坐标[0] = windowX + (event.getRawX() - x)
                上部坐标[1] = windowY + (event.getRawY() - y)
                窗口移动(2, 上部坐标[0], 上部坐标[1])
                w1.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    上大小 = [0, 0]
    上大小[0] = w1.getWidth();
    上大小[1] = w1.getHeight()
    log(w1.getWidth())
}

function 下坐标() {
    w2 = floaty.window(
        <frame id="移动22" gravity="right|bottom"> 
          <vertical gravity="right|bottom" >
            <text w="1" h="150" bg="#ff000000"></text>  
            <text w="150" h="1" bg="#ff000000"></text> 
          </vertical>
        </frame>
    );
    w2.setPosition(下部坐标[0], 下部坐标[1])
    sleep(100)
    w2.移动22.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w2.getWidth();
                ah = w2.getHeight();
                windowX = w2.getX();
                windowY = w2.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                下部坐标[0] = windowX + (event.getRawX() - x)
                下部坐标[1] = windowY + (event.getRawY() - y)
                窗口移动(2, 下部坐标[0], 下部坐标[1])
                w2.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    下大小 = []
    下大小[0] = w2.getWidth()
    下大小[1] = w2.getHeight()
}