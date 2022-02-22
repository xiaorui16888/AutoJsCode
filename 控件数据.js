"ui";


var 界面系统 = function() {
    this.界面 = ui.inflate(
        <frame>
                <text id="text"/>
            </frame>
    );
    this.数据 = {
        text: "123"
    };
    this.载入数据 = function() {

        for (var i in this.数据) {
            //界面.findView(i).setText(数据[i]);
            eval("this.界面." + i + ".setText(\"" + this.数据[i] + "\")");
        };
    };
    this.读取数据 = function() {
        var obj = {};

        for (var i in this.数据) {
            //界面.findView(i).setText(数据[i]);
            eval("obj." + i +"=this.界面." + i + ".getText()");
        };

        return obj;
    };
};

var 界面1 = new 界面系统();

//界面1.界面=ui.inflate(…………………);
//界面1.数据={……………………};
界面1.载入数据();
ui.setContentView(界面1.界面);
log(界面1.读取数据());