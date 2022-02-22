
// https://www.zhihu.com/question/22818104

// 1.不可以使用Math.random()
// 2.有一个函数 Rand() 返回1-5的随机数

rand = (function () {
  var today = new Date();
  var seed = today.getTime();
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / (233280.0);
  };
  return function rand(number) {
    return Math.ceil(rnd() * number);
  };
})();
myNum = (rand(5));

log(myNum)


