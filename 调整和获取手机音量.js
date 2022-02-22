var am = context.getSystemService(context.AUDIO_SERVICE)
// STREAM_MUSIC这个自己试试,是调整那种音量,范围0-6  自己试试,我也不知道
var STREAM_MUSIC = 0
// 1 增大音量   -1  降低音量  0 不变
var ADJUST_RAISE = 0
//  1 显示调整音量界面   0  不显示界面
var FLAG_SHOW_UI = 1
am.adjustStreamVolume(STREAM_MUSIC, ADJUST_RAISE, FLAG_SHOW_UI)


//获取最大音量
var max = am.getStreamMaxVolume(STREAM_MUSIC);
log(max)
//获取当前音量
toastLog('最大音量'+max)
sleep(2000)
var current = am.getStreamVolume(STREAM_MUSIC);
log(current)
toastLog('当前音量'+current)
