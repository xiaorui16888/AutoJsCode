let en = engines.myEngine();
let arr = engines.all();

for (let i = 0; i < arr.length; i++) {
    toastLog(arr[i] == en); //为什么输出全是false
}
sleep(5000);