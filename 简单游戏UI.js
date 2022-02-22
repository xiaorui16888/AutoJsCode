"ui";
ui.statusBarColor('#000000')
ui.layout("<frame><vertical bg='#000000'align='top'h='1000'><frame bg='#CCCCCC'align='top'h='410'><text id='disp'margin='5'bg='#FFFFFF'gravity='top'color='#000000'size='20'h='400'/></frame><frame bg='#CCCCCC'align='top'h='210'><button id='lef'text='左'w='100'h='100'margin='55 0 0 0'/><button id='top'text='上'w='100'h='100'margin='0 0 0 100'/><button id='but'text='下'w='100'h='100'margin='105 0 0 100'/><button id='rig'text='右'w='100'h='100'margin='55 0 0 200'/><text id='hel'text=''w='100'h='55'margin='0'/></frame></vertical></frame>");
ui.lef.click(() =>move('L'))
ui.rig.click(() =>move('R'))
ui.top.click(() =>move('U'))
ui.but.click(() =>move('D'))
ui.hel.click(() =>move('O'))
//格式化代码的时候留意上面的=>，如果变成= >会直接崩溃
//
//
//
var aaa= false //锁，一次只能操作一个方向
//防蹦，没卵用？
try {
    main()
} catch(e) {
    toast(e)
}

//主程

function main() {
    ui.disp.text('\n    简单游戏UI Ver 0.1\n\n    By Chr_\n\n\n\n\n\n\n\n\n\n\n ↓点这里可以联系作者')
    ui.hel.text('\n --【By Chr_】')
}

function move(F) {
    if (!working) {
        working = true
        switch (F) {
        case 'L':
        case 'R':
        case 'U':
        case 'D':
            ui.disp.append(F)
            break
        default:
            qq()
            break
        }
        working = false
    }
}

function qq() {
    try {
        app.startActivity({
            action: 'android.intent.action.VIEW',
            data: 'mqqapi://card/show_pslcard?&uin=1142033406'
        });
        toast('正在打开QQ')
    } catch(e) {
        toast('失败')
    }
}



/*
作者：Chr_
创建时间：20171207
QQ:1142033406
***请保留作者信息，谢谢 :-) ***
*/