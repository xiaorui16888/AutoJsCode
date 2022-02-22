"auto"
while (true) {
    className("android.widget.RelativeLayout").id("sl_item_my_room_avatar").findOne().parent().parent().click()
    waitForActivity("com.yy.huanju.chatroom.ChatroomActivity", period = 200)
    className("android.widget.LinearLayout").id("topbar_right_child_layout").findOne().click()
    className("android.widget.TextView").id("txt_menu_item_content").text("退出房间").findOne().parent().click()
    text("退出").waitFor();
        click("退出")

    
    


    waitForActivity("com.yy.huanju.MainActivity", period = 200)

}