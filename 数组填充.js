let n = 128;
let arr = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, n);
java.util.Arrays.fill(arr, 50); //将arr数组全赋值为50
java.util.Arrays.fill(arr, 0, 100, 30); //将arr数组0到100的元素赋值为30
for (let i = 0; i < n; i++) {

    log(i + "\t" + arr[i])
}