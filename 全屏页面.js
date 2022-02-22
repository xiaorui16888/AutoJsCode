"ui";
importClass(android.view.WindowManager);
ui.layout(
    <vertical>
    <button text="我是全屏"/>
    </vertical>
    );
activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);