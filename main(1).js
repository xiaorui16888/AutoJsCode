let arr = new Array();
for(let i=0;i<5;i++) {
    arr[i] = new Array();
    for(let i2=0;i2<5;i2++) {
        arr[i][i2] = 0;
    }
}

while(true) {
    PRESS(4, 4);
    exit();
}

function PRESS(x, y) {
    log(x + "\t" + y);
    if(arr[x, y] != null) {
        arr[x, y] == 0 ? b(x, y) : a(x, y);
        if(arr[x + 1, y] != null)
            arr[x + 1, y] == 0 ? b(x + 1, y) : a(x + 1, y);
        if(arr[x, y + 1] != null)
            arr[x, y + 1] == 0 ? b(x, y + 1) : a(x, y + 1);
        if(arr[x - 1, y] != null)
            arr[x - 1, y] == 0 ? b(x - 1, y) : a(x - 1, y);
        if(arr[x, y - 1] != null)
            arr[x, y - 1] == 0 ? b(x, y - 1) : a(x, y - 1);
        log(arr);
        return 0;
    }else{
        log("参数错误");
        return 0;
    }
}

function a(x, y) {
    arr[x][y] = 1;
}

function b(x, y){
    arr[x][y] = 0;
}