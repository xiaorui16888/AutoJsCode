"ui";
threads.start(function() {
  toastLog('3秒后弹框')
  sleep(1000)
  toastLog('计时开始')
  sleep(1000)
  for (let i = 0; i < 3; i++) {
    toastLog(util.format('延迟第%d秒', i + 1))
    sleep(1000)
  }
  toastLog('计时结束')
  alert('3秒了')
})
