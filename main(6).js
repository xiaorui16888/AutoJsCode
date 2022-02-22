"ui";
//by Capricornus 
var title_text = "找字母游戏"
ui.layout(
    <vertical padding="10">
        <text name="title" color="black" size="30dp" layout_gravity="center" gravity="center" text="{{title_text}}"/>
        <View bg="#aa000000" h="1px" w="*"/>
        
        <grid name="letters_layout" id="letters" spanCount="4" layout_gravity="center" h="808px" w="808px">
            <card name="letter_card" w="200px" h="200px" margin="1px 1px 1px 1px" cardCornerRadius="5px" bg="#00ffffff">
                <text id="letter" color="#000000" size="40dp" layout_gravity="center" gravity="center" text="{{this}}"/>
                <img id="letter_mask" h="180px" w="180px" src="#33ffffff" layout_gravity="center"/>
            </card>
        </grid>
        <View bg="#aa000000" h="1px" w="*"/>
        
        <text name="start_button" id="start_button" gravity="center" layout_gravity="center" size="34dp" color="#88000000" text="开始游戏"/>
        
        <text name="letter_text" id="letter_text" gravity="center" layout_gravity="center" size="280dp" color="#99000000" text="?"/>
    </vertical>
)

isBegin = false

var letters_array = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

ui.start_button.on("click", () => {
    if (ui.start_button.getText() == "开始游戏") {
        startGame()
        ui.start_button.setText("重新开始")
    } else {
        terminateGame()
        ui.start_button.setText("开始游戏")
    }
})

function isInclude(array, item) {
    for (i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return true
        }
    }
    return false
}

ui.letters.on("item_bind", function(itemView, itemHolder) {
    itemView.letter.on("click", function(v) {
        if (isBegin) {
            if (v.getText() == thisLetter) {
                ui.start_button.setText("😆找到了！")
                ui.letters.setBackgroundColor(colors.parseColor("#ffffff"))
            } else {
                ui.start_button.setText("😭找错了！")
                ui.letters.setBackgroundColor(colors.parseColor("#ffffff"))
            }
            isBegin = false
            threads.start(function() {
                sleep(5000)
                ui.run(() => {
                    ui.start_button.setText("开始游戏")
                })
                terminateGame()
            })
        }
    })

})


function startGame() {
    threads.start(function() {
        ui.run(() => {
            ui.start_button.setText("5秒后翻牌")
        })
        var lucky_num = random(0, 25)
        //生成letter_text的letter
        thisLetter = letters_array[lucky_num]
        //生成所有letter_card的letter
        var letter_card_num = 0
        var letter_cardItem_array = []
        while (letter_card_num < 16) {
            var lucky_num_letter = random(0, 25)
            if (letters_array[lucky_num_letter] != thisLetter && isInclude(letter_cardItem_array, letters_array[lucky_num_letter]) == false) {
                letter_cardItem_array.push(letters_array[lucky_num_letter])
                letter_card_num++
            }
        }
        //插入letter
        letter_cardItem_array[random(0,15)]=thisLetter
        
        ui.run(() => {
            ui.letters.setDataSource(letter_cardItem_array)

        })
        sleep(5000)
        ui.run(() => {
            ui.letters.setBackgroundColor(colors.parseColor("#000000"))
            ui.letter_text.setText(thisLetter)
            ui.start_button.setText("请找出以下字母")
        })

        isBegin = true
    })
}

function terminateGame() {
    ui.run(()=>{
    ui.letters.setDataSource([])
    ui.letter_text.setText("?")
    })
}