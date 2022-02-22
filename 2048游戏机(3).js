"ui";
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
    <vertical align="top" margin="5">
		
       <text id="text" bg="#ffffff" h="430" gravity="center" color="#111111" size="40"></text>
     <linear>
    <vertical w="170">
   
    </vertical>
    <vertical>
    <linear> 
    <button margin="0 0 0 60" h="60" w="60" id="up" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="left" text="左"></button>
    <button h="60" w="60" id="ok" text="ok"></button>
    <button h="60" w="60" id="right" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="down" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
    </frame>
);
//console.show()
clear();
display()

function display() {
  ui.text.text(toText(screen));
}

ui.up.click(() => {

});
ui.left.click(() => {

});
ui.down.click(() => {
  down()
  display()
});
ui.left.click(() => {

});
ui.ok.click(() => {
  random()
  //toast(String(screen))
  display()
});

function down() {
  for (y = 3; y > 0; y--) {
    for (x = 0; x < 4; x++) {
      if (screen[y][x] == 0) {
        if(y != 0){
          screen[y][x] = screen[y - 1][x]
          screen[y - 1][x] = 0
        }
        else{
          screen[0][x] = 0
        }
      }
      if(screen[y][x]==[y-1][x]&&screen[y][x]!=0){
          toast(x+","+y)
          screen[y][x]*=2
          screen[y-1][x]=0
      }
    }
  }
}







function random() {
  var blank = 0
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (screen[y][x] == 0) {
        blank++

      }
    }
  }
  var random = Math.floor(Math.random() * blank)
  toast(random)
  blank = 0
  lab:
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (screen[y][x] == 0) {
          if (blank == random) {
            screen[y][x] = 2
            break lab;
          }
          blank++
        }
      }
    }

}


function clear() {
  screen = new Array();
  width = 4;
  height = 4;
  for (y = 0; y <= height; y++) {
    screen[y] = new Array();
    for (x = 0; x <= width; x++) {
      screen[y][x] = 0;
    }
  }
}

function set(x, y, str) {
  if (str == null) {
    str = 0
  }
  if (y <= height && x <= width && y > 0 && x > 0) {
    screen[round(y)][round(x)] = str
  }
  return arr

}


function toText(arr) {
  var text = new String();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      text = text + arr[y][x] + "   "
    }
    text = text + "\n"
  }
  return String(text)
}