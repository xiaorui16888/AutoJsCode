// 0 静音  1非静音
var 静音模式文件 = files.join(files.getSdcardPath(), '脚本/volumeMode.js')
var 存储声音大小的文件 = files.join(files.getSdcardPath(), '脚本/volume.js')

var volumeMode = files.read(静音模式文件)


if (volumeMode.indexOf('0') > -1) {
  toast('开启静音模式')
  // 备份原来的声音大小
  var 原来的声音大小 = device.getMusicVolume()
  files.write(存储声音大小的文件, 原来的声音大小);
  var volume = 0
  device.setMusicVolume(volume)
} else {
  toast('恢复原来声音的大小')
  if (files.exists(存储声音大小的文件)) {
    var volume = files.read(存储声音大小的文件)
    volume = parseInt(volume)
    device.setMusicVolume(volume)
  } else {
    device.setMusicVolume(10)
  }
}