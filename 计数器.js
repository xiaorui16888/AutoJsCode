var count = function () {
  var count = 0
  return function () {
    return count++;
  }
}()
for (var i = 0; i < 10; i++) {
  log(count())
}
