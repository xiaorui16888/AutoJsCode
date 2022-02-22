/*
toastLog("空滑");
//scrollDown();
if (scrollDown() == true) {
    toastLog("空滑可以");
} else {
    for (i = 0; i < 10; i++) {
        toastLog(i + "滑");
        //scrollDown(i);
        if (scrollDown(i) == true) {
            toastLog(i + "可以");
            break;
        };
    };
};
*/
toastLog("空滑");
scrollDown();
for (i = 0; i < 10; i++) {
    sleep(2000);
    toastLog(i + "滑");
    scrollDown(i);
};