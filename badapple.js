"ui";
ui.layout(
    <vertical padding="16">
        <text id="txt" textSize="1sp"></text>
        
        <button id="btn" textSize="1sp">按钮</button>
    </vertical>
);
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var play = new android.media.MediaPlayer();

var flash = load("/storage/emulated/10/Tencent/QQfile_recv/AscPic/apple.txt").split("\n")


var frame = "\n\n\n\n\n\n\n\n\n\n"
var color = "§a"
var isRun = true

function chatHook(chat) {
  color = "§" + chat
}

function byteArray(length) {
  return java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, length);
}

function load(path) {
  var stream = new java.io.FileInputStream(path);
  var baos = new java.io.ByteArrayOutputStream();
  var buf = byteArray(4096);
  while ((len = stream.read(buf)) != -1) {
    baos.write(buf, 0, len);
  }
  stream.close();
  baos.close();
  return baos.toString();
}


/*var modevet = new Thread(new Runnable({
  run: function() {
    try {*/
      //playSound("/storage/emulated/10/MikuMikuAR/User/BadApple.mp3");
      //modevet.sleep(500);

      //for (var a = 0; a < 6481; a++) {
a=0
ui.btn.click(() => {
        for (i = 0; i < 61; i++) {
          frame = frame + color + flash[i + 61 * a++] + "\n"
        }

        ui.txt.text = frame.replace(/ /g, "_")
        frame = "\n\n\n\n\n\n\n\n\n\n"
        ModPE.showTipMessage((a / 6481) / (play.currentPosition / play.duration))
        modevet.sleep(Math.pow(((a / 6481) / (play.currentPosition / play.duration)), 128) * 20);
    })
     // }
     // ui.txt.text = "finish"
    //} //catch (err) {
   /*   print(err);
    }
  }
}));
modevet.start();
*/





function playSound(sound) {
  try {
    play.stop();
    play.reset();
    play.setDataSource(sound);
    play.prepare();
    play.setLooping(false);
    play.start()
  } catch (e) {
    print("playSound: " + e);
  }
}