"ui";
ui.layout(
    <vertical>
        <horizontal>
            <input id="input" hint="请输入网址" maxLines="1" inputType="textUri" layout_weight="1"/>
            <button id="search_but" w="auto" text="进入"/>
        </horizontal>
        <frame>
            <text id="text" w="*" gravity="center" maxLines="1" ellipsize="end"/>
            <progressbar id="progress" w="*" h="auto" indeterminate="true" layout_gravity="top" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </frame>
        <frame layout_weight="1">
            <webview id="webview" w="*" h="*"/>
              <list id="list" w="90dp" h="*" bg="#346489" layout_gravity="right">
                <text w="*" h="50" text="{{txt}}" textSize="16sp" bg="#dddddd" margin="5" gravity="center"/>
            </list>
        </frame>
        <frame w="*">
            <button id="left" w="auto" text="上页" layout_gravity="left"/>
            <button id="center" w="auto" text="菜单" layout_gravity="center"/>
            <button id="right" w="auto" text="下页" layout_gravity="right"/>
        </frame>
    </vertical>
);
