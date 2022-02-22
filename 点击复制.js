'ui';
ui.layout(
  <vertical>
    <button id='but1' >123</button>
    <button id='but2' >456</button>
  </vertical>
)

function aaa(xx) {
  ui[xx].click(function () {
    var text=ui[xx].getText()
    setClip(text);
    toast("复制成功"+text);
  });
}
aaa("but1");
aaa("but2");


