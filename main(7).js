var Bmob = require('./src/lib/app')
var express = require('express')
var app = express()
app.get('/',function(req,res){
    console.log('asdfsdf')
    console.log(Bmob)
})
app.listen(3000)

