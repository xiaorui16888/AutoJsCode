function login() {
    ui.layout(
        <vertical >
            <appbar>
                <toolbar id="toolbarb" title="【F-R 客户端】"/>
                <tabs id="tabsb"/>
            </appbar>
            <viewpager bg="file://qg.png" id="viewpagerb">
                <vertical>
              
                    
                </vertical>
                <vertical>
                   
                </vertical>
                
                <vertical>
           
        </vertical>
    );

   
    //***************结束***************//

    
 uiInitindex()  
function uiInitindex() {
            activity.setSupportActionBar(ui.toolbarb);
            ui.viewpagerb.setTitles(["登陆页面", "注册页面", "充值页面"]);
            ui.tabsb.setupWithViewPager(ui.viewpagerb);
        };
        

}
 