/*
两次实例的目的一样,结果却不同,对,数据类型的不同,只有对象才能进行.的运算操作,log(a.b),这段代码的含义是,输出一个对象a里面一个下标为b的值
那么问题来了,某某.某某,前者必须是对象类型(Object)我们再来看看实例一,a.length,这里的a数据类型为String字符串类型,那么你可以理解为字符串.length
在正常情况下肯定是会报错的,其实在这里,JavaScript做了一个我们看不见的运算,当执行到a.length的时候,JavaScript会临时把a字符串包装成String对象,然后获取
a的内容,再获取该对象的length属性,最后,这个临时的对象被释放,那么执行a.length 的时候JavaScript做了四步我们看不见的运算,第一步,把字符串类型的a包装成
String对象类型的a;第二部,获取该对象a的值;第三步,获取该对象的length属性,第四部,释放该变量,也就是把String对象类型转换为String类型,String类型在实例二
有介绍

var String对象 = new String("我是字符串对象,我有length属性");
var 普通String字符串 = "我是个普通的字符串,我没有length属性";

 */
console.show();

//实例1
var a = '大家好我是留一手';
log('a变量的长度为:'+a.length+'\na变量的数据类型为'+typeof(a));

//实例2
var b = new String('大家好我是留一手');
log('a变量的长度为:'+b.length+'\na变量的数据类型为'+typeof(b));