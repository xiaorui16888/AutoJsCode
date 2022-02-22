var window = floaty.window(
    <frame gravity="center">
        <text id="text" textSize="16sp" />
    </frame>
);

window.exitOnClose();
window.setAdjustEnabled(true);
window.text.setText("拖动左上与右下图标至需要测量的位置和大小，点击文字复制数据到粘贴板。");
sleep(3000);
window.text.click(()=>{
    setClip(window.text.getText());
    window.text.setText("已复制到粘贴板");
});

setInterval(()=>{
    //对控件的操作需要在UI线程中执行
    ui.run(function(){
        window.text.setText(getWindow());
    });
}, 1000);

function getWindow(){
      return util.format("坐标x: %d\n坐标y: %d\n宽度: %d\n高度: %d\n",window.getX()+38,window.getY()+108, window.getWidth()-74,window.getHeight()-74);
    
}

