
var id=""//文件id
var base = "https://gitee.com/api/v5/gists/"
url=base+id+"?access_token="//token
var json={"files":{"456.txt":{"content":"8230178yvh"}}}
json=JSON.stringify(json)
var options={contentType:"application/json",method:"PATCH",body:json}
var dat=http.request(url, options)
log(dat.body.string())