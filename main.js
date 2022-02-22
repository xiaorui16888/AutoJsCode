"ui";

function Ui() {
    ui.layout(
        <vertical>
            <text id="light" textSize="50" gravity="center"></text>
            <horizontal gravity="center">
                <input id="x" w="100" hint="输入x" inputType="number"/>
                <input id="y" w="100" hint="输入y" inputType="number"/>
            </horizontal>
            <button id="ok" w="300">点</button>
        </vertical>
    );
    ui.ok.on("click", function() {
        let cx = Number(ui.x.getText());
        let cy = Number(ui.y.getText());

        press(cx, cy);
    });
}

//6＊6灯
//0~5

let arr = new Array();
let str;
for(let i=0;i<=6;i++) {
    arr[i] = new Array();
    for(let i2=0;i2<=6;i2++) {
        arr[i][i2] = "⬜";
    }
}

function press(x, y) {
    try {
        if(typeof arr[x][y] != "undefined") {
            arr[x][y] == "⬜" ? b(x, y) : a(x, y);
            if(typeof arr[x + 1][y] != "undefined")
                arr[x + 1][y] == "⬜" ? b(x + 1, y) : a(x + 1, y);
            if(typeof arr[x][y + 1] != "undefined")
                arr[x][y + 1] == "⬜" ? b(x, y + 1) : a(x, y + 1);
            if(typeof arr[x - 1][y] != "undefined")
                arr[x - 1][y] == "⬜" ? b(x - 1, y) : a(x - 1, y);
            if(typeof arr[x][y - 1] != "undefined")
                arr[x][y - 1] == "⬜" ? b(x, y - 1) : a(x, y - 1);
                outPut();
            return 0;
        }else{
            return 0;
        }
    }catch(err){
        toastLog("未知错误");
    }
}

function a(x, y) {
    arr[x][y] = "⬜";
}

function b(x, y){
    arr[x][y] = "⬛";
}

function outPut() {
    str = "";
    for(let i=0;i<=5;i++) {
        for(let i2=0;i2<=5;i2++) 
            str = str + arr[i][i2];
        str = str + "\n";
    }
    ui.light.setText(str);
}

Ui();