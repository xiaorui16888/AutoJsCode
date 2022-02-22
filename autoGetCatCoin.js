

function clickAndBack(point){
    point.click();
    sleep(2000);

    swipe(500, 1500, 500, 1000, 2000);
    sleep(17000);

    //点完后退
    back();
    //暂停加载
    sleep(1500);
}

function goShop() {

    let n = 1;
    while (n < 20) {
        let point = text("去进店").findOne(2000);
        if(point == null) return ;
        // log("join: "+point)
        clickAndBack(point)
    }
    
}

function goLook(){
    while(true){
        let point = text("去浏览").findOne(2000);
        if(point == null) return ;
        // log("join: "+point)
        clickAndBack(point)
    }
}

goShop();

goLook();



