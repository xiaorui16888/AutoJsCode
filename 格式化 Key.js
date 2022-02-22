//By Chr_2017.11.23
var clip = getClip()
var reg = new RegExp('[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}', 'ig')
var keys = new Array
var result = null
var crlf = '\n'
var i

//12345-67890-09876
for (;;) {
    result = reg.exec(clip)
    if (result != null) {
        keys.push(result)
    } else {
        break
    }
}

i = keys.length

if (i != 0) {

    result = '!r ' + keys.toString()
    setClip(result)

    result = '处理结果：' + crlf + result + crlf + crlf + '剪贴板内容：' + crlf + clip


    if (i > 30) {
        result = '*Key过多，容易导致冷却' + crlf + crlf + result
    }
    alert('完成 已复制 ' + i.toString() + ' 个 Steam Key', result)

} else {
    alert('错误', '在剪贴板中没有找到Steam Key')
}