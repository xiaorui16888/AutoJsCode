/*

标题：let关键字详解！
作者：留一手
QQ：488716757

*/

function getValue(condition){
    
   if(condition){
       var value = "blue";
       return value;
   }else{
       log(value);
       return null;
   }
   
}

const conter = "解析：如果你不熟悉JavaScript，可能会认为只有当condition为true的时候才会创建value变量，事实上，无论condition的值是true还是false，变量value都会被创建，值为undefined，即未定义！接下来你把12行的var改为let再运行代码试试，结果会报错，因为第15行没有这个变量，把这行注释掉就能正常运行。let声明的变量只能作用在{}中，在花括号外调用此变量都会报错！而var声明的变量可以在花括号外调用，值为undefined！"

console.show();
print(getValue(false));
console.error(conter);


