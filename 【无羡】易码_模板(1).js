"ui";
ui.layout(
    <ScrollView>
        <vertical padding="10" >
            <text text="【醉猪🐷】邀请注册 By:无羡" maxLines="1" textSize="25sp" textColor="black" gravity="center"/>
            <input id="dzzh" h="50" hint="请输入易码账号" gravity="center" digits="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567990"/>
            <input id="dzmm" h="50" hint="请输入易码密码" gravity="center" password="true"/>
            <button id="dz_dl" text="易码登录"/>
            <text id="dlxx" text="每行的数据必填哦，否则容易卡死，软件默认延迟为5秒。" textSize="13sp" gravity="center"/>
            <text id="dlcg" text="↓↓↓↓↓↓↓↓↓↓" textSize="13sp" gravity="center"/>
            <input id="szmm" h="50" hint="设置密码" gravity="center"/>
            <input id="yqm" h="50" hint="邀请码" gravity="center"/>
            <input id="yqcs" h="50" hint="邀请次数" gravity="center" digits="1234567890"/>
            <button id="ks" text="开始注册" clickable="false"/>
            <button id="tj" text="点击联系作者" style="Widget.AppCompat.Button.Borderless"/>
            <text id="sm" text="↓↓↓运行日志↓↓↓" textSize="13sp" textColor="black" gravity="center"/>
            <text id="yxrz" text="" textSize="13sp" gravity="center"/>
            <text id="fgx" text="-------------------------------------" textSize="13sp" gravity="center"/>
            <text id="hdsm" text="活动介绍：邀请一个人头送6个酒钻，现在是持币分红，首发项目，一般这种怕拍大腿就先跑100个先。 以后也吃点肉。注册成功的会复制到剪切板（格式：手机号----密码）） " textSize="13sp" maxLines="10" gravity="center"/>
        </vertical>
    </ScrollView>
);

