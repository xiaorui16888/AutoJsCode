var log = console.log
const path = require('path')
const fs = require('fs')
const https = require('https')
// 下载文件
var fileUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553759443503&di=27018a238c92857a5c9e9f62cd552653&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FM4AEn4hunB0WiaWnOsgic9xia8fryTQkY4k5as3oWmiatibJa83uVwJ0wsaKbHE66Q1e4MKoyphxdp4sKyR2Q9DarJA%2F640%3Fwx_fmt%3Dpng'
var filePath = path.join(__dirname, 'onepiece.png')
// 第一步删除文件,如果文件存在的话
var p = new Promise(function (resolve, reject) {
    var isFileExists = fs.existsSync(filePath)
    if (isFileExists) {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err)
        }
        log('文件已删除')
        resolve(true)
      })
    }
    log('文件不存在')
    resolve(true)
  })
  // 第二步 创建文件写入流
  .then(function (data) {
    var p = new Promise(
      function (resolve, reject) {
        console.log(data)
        // 创建可写流  用来写入图片
        var file = fs.createWriteStream(filePath)
        log('文件路径=' + filePath)
        resolve(file)
      }
    )
    return p
  })
  // 第三步  下载保存文件
  .then(function (file) {
    console.log(file)
    var responseData = []
    var p = new Promise(
      function (resolve, reject) {
        var res = https.get(fileUrl)
        res.on('response', function (res) {
          console.dir('content-length =', +res.headers['content-length'])
          res.on('data', function (chunk) {
            responseData.push(chunk)
          })
          res.on('end', function () {
            var finalData = Buffer.concat(responseData)
            file.write(finalData)
            file.end()
            log('保存完毕')
            resolve(true)
          })
        })
      }
    )
    return p
  }).catch(
    function (err) {
      log('发生错误' + err.code)
      log(err)
    }
  )
