/**
 * name: 一个图形界面计算器
 * by: 板神
 * time: 2019.6.21
 */
"ui";

var btnTextSize = 20;

ui.layout(
    <vertical h="*" margin="8">
        <card layout_weight="1">
            <text id="in" gravity="center" textSize="36" textStyle="bold">0</text>
        </card>
        <vertical layout_weight="1">
            <horizontal layout_weight="1">
                <button id="ce" h="*" layout_weight="1" textSize="{{btnTextSize}}">CE</button>
                <button id="leftparen" h="*" layout_weight="1" textSize="{{btnTextSize}}">(</button>
                <button id="rightparen" h="*" layout_weight="1" textSize="{{btnTextSize}}">)</button>
                <button id="div" h="*" layout_weight="1" textSize="{{btnTextSize}}">÷</button>
            </horizontal>
            <horizontal layout_weight="1">
                <button id="n7" h="*" layout_weight="1" textSize="{{btnTextSize}}">7</button>
                <button id="n8" h="*" layout_weight="1" textSize="{{btnTextSize}}">8</button>
                <button id="n9" h="*" layout_weight="1" textSize="{{btnTextSize}}">9</button>
                <button id="mul" h="*" layout_weight="1" textSize="{{btnTextSize}}">×</button>
            </horizontal>
            <horizontal layout_weight="1">
                <button id="n4" h="*" layout_weight="1" textSize="{{btnTextSize}}">4</button>
                <button id="n5" h="*" layout_weight="1" textSize="{{btnTextSize}}">5</button>
                <button id="n6" h="*" layout_weight="1" textSize="{{btnTextSize}}">6</button>
                <button id="sub" h="*" layout_weight="1" textSize="{{btnTextSize}}">-</button>
            </horizontal>
            <horizontal layout_weight="1">
                <button id="n1" h="*" layout_weight="1" textSize="{{btnTextSize}}">1</button>
                <button id="n2" h="*" layout_weight="1" textSize="{{btnTextSize}}">2</button>
                <button id="n3" h="*" layout_weight="1" textSize="{{btnTextSize}}">3</button>
                <button id="plus" h="*" layout_weight="1" textSize="{{btnTextSize}}">+</button>
            </horizontal>
            <horizontal layout_weight="1">
                <button id="n0" h="*" layout_weight="3" textSize="{{btnTextSize}}">0</button>
                <button id="eq" h="*" layout_weight="1" textSize="{{btnTextSize}}">=</button>
            </horizontal>
        </vertical>
    </vertical>
);

/**
 * @param {控件} out 输出控件
 */
function Calculator(out) {
    this.out = out;     // 输出控件
    this.middle = [];   // 中缀表达式

    /**
     * 向计算器输入一个数
     */
    this.input = function (num) {
        var index = this.middle.length - 1;
        if (this.middle.length == 0) {
            this.middle.push(num);
        } else if (typeof(this.middle[index]) == typeof(1)) {
            this.middle[index] = this.middle[index] * 10 + num;
        } else {
            this.middle.push(num);
        }
        this.show();
    }

    /**
     * 向计算器输入一个符号
     */
    this.inputSymbol = function (symbol) {
        switch (symbol) {
            case "(":
                this.middle.push(symbol);
                break;
            case ")":
                this.middle.push(symbol);
                break;
            case "=":
                this.cal();
                break;
            case "ce":
                this.middle = [0];
                break;
            default:
                var index = this.middle.length - 1;
                if (this.middle[index] in {"+": 0, "-": 0, "*": 0, "/": 0}) {
                    this.middle[index] = symbol;
                } else {
                    this.middle.push(symbol);
                }
        }
        this.show();
    }

    /**
     * 展示输入或输出值
     */
    this.show = function () {
        var info = "";
        this.middle.forEach(ele => {
            info += ele;
        });
        log("info:" + info);
        this.out.text(info);
    }

    /**
     * 计算当前中缀表达式的结果
     */
    this.cal = function () {
        // 生成中缀表达式
        var n = this.middle.length;
        var middle = this.middle;    // 中缀表达式
        log("中缀表达式: " + JSON.stringify(middle));

        // 生成后缀表达式
        var end = [];
        var stack = ["#"];
        var lv = {
            "#": 0,
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
            "(": 0,
        };
        while (middle.length > 0) {
            var ele = middle.shift();
            if (typeof(ele) == typeof(1)) {
                end.push(ele);
                continue;
            }
            if (ele == "(") {
                stack.unshift(ele);
                continue;
            }
            if (ele == ")") {
                while (stack[0] != "(") {
                    end.push(stack.shift());
                }
                stack.shift();
                continue;
            }
            if (lv[ele] > lv[stack[0]]) {
                stack.unshift(ele);
                continue;
            }
            while (lv[ele] <= lv[stack[0]]) {
                end.push(stack.shift());
            }
            stack.unshift(ele);
        }
        while (stack[0] != "#") {
            end.push(stack.shift());
        }
        log("后缀表达式: " + JSON.stringify(end));

        // 计算
        var cc = function (num1, num2, operator) {
            switch (operator) {
                case "+":
                    return num1 + num2;
                case "-":
                    return num1 - num2;
                case "*":
                    return num1 * num2;
                case "/":
                    return num1 / num2;
            }
        }
        stack = [];
        end.forEach(ele => {
            if (typeof(ele) == typeof(1)) {
                stack.push(ele);
            } else {
                var num2 = stack.pop();
                var num1 = stack.pop();
                stack.push(cc(num1, num2, ele));
            }
        });
        if (stack.length != 1) {
            throw new Error("stack invalid: stack = " + JSON.stringify(stack));
        }
        this.middle = [stack[0]];
    }
}

var cal = new Calculator(ui.in);

ui.n0.click(() => {
    cal.input(0);
});
ui.n1.click(() => {
    cal.input(1);
});
ui.n2.click(() => {
    cal.input(2);
});
ui.n3.click(() => {
    cal.input(3);
});
ui.n4.click(() => {
    cal.input(4);
});
ui.n5.click(() => {
    cal.input(5);
});
ui.n6.click(() => {
    cal.input(6);
});
ui.n7.click(() => {
    cal.input(7);
});
ui.n8.click(() => {
    cal.input(8);
});
ui.n9.click(() => {
    cal.input(9);
});
ui.plus.click(() => {
    cal.inputSymbol("+");
});
ui.sub.click(() => {
    cal.inputSymbol("-");
});
ui.mul.click(() => {
    cal.inputSymbol("*");
});
ui.div.click(() => {
    cal.inputSymbol("/");
});
ui.eq.click(() => {
    cal.inputSymbol("=");
});
ui.leftparen.click(() => {
    cal.inputSymbol("(");
});
ui.rightparen.click(() => {
    cal.inputSymbol(")");
});
ui.ce.click(() => {
    cal.inputSymbol("ce");
});
