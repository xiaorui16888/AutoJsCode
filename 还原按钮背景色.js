var w = floaty.rawWindow(
  <vertical>
    <button id="btn" w="300px" h="300px">
      背景色测试
    </button>
  </vertical>
);
setTimeout(() => {
  var view = w.btn;
  restoreButtonBackgroundColor(view);
}, 2000);
w.setPosition(device.width / 2, device.height / 2);
var getCount = (function() {
  var count = 16;
  return function() {
    return count--;
  };
})();
threads.start(function() {
  var count = getCount();
  do {
    var msg = util.format('倒计时 %s 秒', count);
    w.btn.setText(msg);
    count = getCount();
    log(count);
    sleep(1000);
  } while (count >= 0);
});
/**
 * 方法说明
 * @method 还原按钮背景色
 * @for 按钮
 * @param {按钮} view Button
 * @return {无}
 */
function restoreButtonBackgroundColor(view) {
  var originalColor = view.background;
  view.setBackgroundColor(colors.parseColor('#ff0000'));
  sleep(2000);
  view.setBackgroundDrawable(originalColor);
  sleep(2000);
  view.setBackgroundColor(colors.parseColor('#00ff00'));
  sleep(2000);
  view.setBackgroundDrawable(originalColor);
  sleep(2000);
  view.setBackgroundColor(colors.parseColor('#0000ff'));
  sleep(2000);
  view.setBackground(originalColor);
}
