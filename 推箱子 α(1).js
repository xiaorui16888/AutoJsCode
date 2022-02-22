"ui";

//防蹦，没卵用？
try {
    ui.statusBarColor('#000000')
    ui.layout("<frame><vertical bg='#000000'align='top'h='1000'><frame bg='#CCCCCC'align='top'h='410'><text id='disp'margin='5'bg='#FFFFFF'gravity='top'color='#000000'size='20'h='400'/></frame><frame bg='#CCCCCC'align='top'h='210'><button id='lef'text='左'w='100'h='100'margin='55 0 0 0'/><button id='top'text='上'w='100'h='100'margin='0 0 0 100'/><button id='but'text='下'w='100'h='100'margin='105 0 0 100'/><button id='rig'text='右'w='100'h='100'margin='55 0 0 200'/><text id='hel'text=''w='100'h='55'margin='0'/></frame></vertical></frame>");
    ui.lef.click(() => move('L'))
    ui.rig.click(() => move('R'))
    ui.top.click(() => move('U'))
    ui.but.click(() => move('D'))
    ui.hel.click(() => move('O'))
    //格式化代码的时候留意上面的=>，如果变成= >会直接崩溃
    //
    //
    //全局变量
    var working = false //锁，一次只能操作一个方向
    var lxy = [] //人物位置[x,y]
    var txzmap = [] //地图数组

    main()
} catch (e) {
    toast(e)
    log(e)
}

//主程
function main() {
    /*
    自定义地图： (地图编辑器还没有做:-))
    0或null空气
    1墙
    2放箱子的位置
    3箱子
    5在位子上的箱子
    -1换行
    */
    txzmap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , 2, , 3, , , , , , , 2, , 3, , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
        [, , , , , , , , , , , , , , , , , -1],
        [1, 1, 1, 1, , 1, , , , 1, , 1, 1, 1, 1, , , -1],
        [1, , , , , 1, , , , 1, , 1, , , , 1, , -1],
        [1, , , , , 1, 1, 1, 1, 1, , 1, , , , 1, , -1],
        [1, , , , , 1, , , , 1, , 1, 1, 1, 1, , , -1],
        [1, 1, 1, 1, , 1, , , , 1, , 1, , , 1, 1, , -1]
    ]

    //人物初始位置,超出地图范围会蹦！
    lxy = [1, 1]

    ui.disp.text('\n    推箱子 Ver 0.2\n\n    By Chr_233\n\n   【按下任意键开始游戏】\n\n\n\n\n\n\n\n\n\n ↓点这里可以联系作者')
    ui.hel.text('♂/♀:人物\n■:墙壁 □:空气\n◆:箱子 ◇:目标')

    fillnull()
}

//绘制地图
function paintmap() {
    var lmap = txzmap.slice()
    //slice()可以复制数组
    var grap = new String
    for (i in lmap) {
        lmap[i] = (txzmap[i]).slice()
        for (j in lmap[i]) {
            if (lxy[0] == j && lxy[1] == i) {
                lmap[i][j] += 9
            }
            grap += txt2grap(lmap[i][j])
        }
    }
    return (grap)
}

//填充地图
function fillnull() {
    var ys = txzmap.length
    var xs = 0

    for (var i = 0; i < ys; i++) {
        xs = (txzmap[i]).length
        for (var j = 0; j < xs; j++) {
            switch (txzmap[i][j]) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 5:
                case -1:
                    break
                default:
                    txzmap[i][j] = 0
                    break
            }
        }
    }
}

//判定是否完成，如果没有孤独的箱子在地图上就提示完成游戏
function ifwin() {
    for (i in txzmap) {
        for (j in txzmap[i]) {
            if (txzmap[i][j] == 3) {
                ui.hel.text('♂/♀:人物\n■:墙壁 □:空气\n◆:箱子 ◇:目标')
                return
            }
        }
    }
    ui.hel.text(' --【赢了？】--\n 没有多余的箱子了')
}


//移动人物,LRUD代表四个方向
function move(dire) {
    if (!working) {
        working = true
        switch (dire) {
            case 'L':
                _move(-1, 0)
                break
            case 'R':
                _move(1, 0)
                break
            case 'U':
                _move(0, -1)
                break
            case 'D':
                _move(0, 1)
                break
            default:
                qq()
                break
        }
        working = false
    }
}

//真正移动人物的函数(左右/上下移动的格数)，请不要直接调用，防止出错(调用move()更友好)
function _move(mx, my) {
    var lx = lxy[0] + mx
    var ly = lxy[1] + my

    switch (txzmap[ly][lx]) {
        case 0:
        case 2:
            //移动到空地或目的地
            lxy = [lx, ly]
            break
        case 1:
            //被墙挡住
            break
        case 3:
        case 5:
            //推箱子
            switch (txzmap[ly + my][lx + mx]) {
                case 0:
                case 2:
                    lxy = [lx, ly]
                    txzmap[ly][lx] -= 3
                    txzmap[ly + my][lx + mx] += 3
                    break
            }
            break
    }
    ui.disp.text(paintmap())
    ifwin()
}

//将数字转换成字符，在这里修改就可以自定义显示主题
function txt2grap(num) {
    switch (num) {
        case 0:
            //空气
            return ('□')
        case 1:
            //墙
            return ('■')
        case 2:
            //目的地
            return ('◇')
        case 3:
            //箱子
            return ('◆')
        case 5:
            //归位的箱子
            return ('★')
        case 9:
            //人
            return ('♀')
        case 11:
            //哲♂学♂家
            return ('♂')
        case -1:
            //换行标记
            return ('\n')
        default:
            //其他都看成空气
            return ('□')
    }
}





/*
---作者：Chr_
---创作时间：20171207
---QQ:1142033406

******请保留作者信息，谢谢 :-) ******
*/

function qq() {
    try {
        app.startActivity({
            action: 'android.intent.action.VIEW',
            data: 'mqqapi://card/show_pslcard?&uin=1142033406'
        });
        toast('正在打开QQ,QWQ')
    } catch (e) {
        toast('失败,Orz')
    }
}