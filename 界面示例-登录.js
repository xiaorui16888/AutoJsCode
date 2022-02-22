"ui";
ui.layout(
  '<frame w="*" h="*">'+
  '  <linear w="*" h="auto" vertical="true" align="center" marginLeft="50" marginRight="50">'+
  '    <linear w="*">'+
  '       <text w="56" gravity="center" color="#111" size="16">用户名</text>'+
  '       <input id="name" w="*" h="40"/>'+
  '    </linear>'+
  '    <linear w="*">'+
  '       <text w="56" gravity="center" color="#111" size="16">密码</text>'+
  '       <input id="pw" w="*" h="40"/>'+
  '    </linear>'+
  '    <linear w="*" gravity="center">'+
  '       <button id="login" text="登录"/>'+
  '       <button text="注册"/>'+
  '    </linear>'+
  '  </linear>'+
  '</frame>'
);
