Date.prototype.format = function(fmt){
var year = this.getFullYear();
var month = this.getMonth()+1;
var date = this.getDate();
var hour = this.getHours();
var minute = this.getMinutes();
var second = this.getSeconds();
fmt = fmt.replace("yyyy",year);
fmt = fmt.replace("yy",year%100);
fmt = fmt.replace("MM",fix(month));
fmt = fmt.replace("dd",fix(this.getDate()));
fmt = fmt.replace("hh",fix(this.getHours()));
fmt = fmt.replace("mm",fix(this.getMinutes()));
fmt = fmt.replace("ss",fix(this.getSeconds()));
return fmt;
function fix(n){
return n<10?"0"+n:n;
}
}
var time = new Date().format("yyyy年MM月dd日 hh:mm:ss")
alert(time)