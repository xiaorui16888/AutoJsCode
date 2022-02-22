/*
总所周知,判断语句中要判断的值一般都是布尔类型,即true和false,在这里,if(对象),这是什么意思呢,其实这是js语言的一门特色,弱类型变量,这段代码判断的
并不是值的真假,而是判断值是否为null即为空!同等于16到22行的写法!
*/

var boy = new Object();
boy.gg = '这是boy的gg'
if(boy.gg){
    log('有gg');
}else{
    log('没有gg');
}

/*

var boy = new Object();
boy.gg = '这是boy的gg'
if(boy.gg != ""){
    log('有gg');
}else{
    log('没有gg');
}

*/
