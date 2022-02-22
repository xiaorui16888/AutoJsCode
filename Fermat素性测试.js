console.show()
print("作者QQ：2185141495。\n长按可复制。")
var i = "66667777", //这里输入。
  input = ~~i
if (input != i) {
  print("E") //溢出。
} else {
  console.info(input + ((素性测试(input)) ? ("是质数。") : ("是合数。")))
}
//以下为主体部分。
//input是输入，turn是要计算的次数，默认为4。
function 素性测试(input, turn) {
  for (var i = 0; i < (turn || 4); i++) {
    if (幂模(random(1, input - 1), input - 1, input) !== 1) {
      return false
    }
  }
  return true

  function 幂模(C, E, N) {
    var i = C % N,
      D = 1
    while (E > 1) {
      if ((E & 1) !== 0) {
        D = D * i % N
      }
      i = i * i % N
      E >>= 1
    }
    return i * D % N
  }
}