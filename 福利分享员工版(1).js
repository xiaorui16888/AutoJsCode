"ui";

showloginUI();
ui.startshowloginUI();
ui.statusBarColor("#000000")

function showloginUI(){;
ui.layout(
    <frame>
       <vertical align="top" paddingTop="5" margin="10">
          <linear>
             <text id="text" bg="#FFFFFF" gravity="left" color="#000000" size="15" marginTop="15" h="425"></text>                      <text w="56" gravity="center" color="#111111" size="16">用户名</text>
             <input id="name" w="*" h="40" /> 
          <linear>
          <linear>
             <text w="56" gravity="center" color="#111111" size="16">密码</text>
             <input id="password" w="*" h="40"/>
          <linear>
          <linear gravity="center">
             <button id="know" text="登录">
          <linear>
       <vertical>
    <frame>
  )};