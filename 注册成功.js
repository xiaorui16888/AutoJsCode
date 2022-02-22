var w = floaty.rawWindow(
  <frame  gravity="center" bg="#6600FF00">
      <text  gravity="center" textSize="40sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">注册成功</text>
  </frame>
);

w.setSize(-1, -1);
setTimeout(()=>{
  w.close();
}, 2000);
