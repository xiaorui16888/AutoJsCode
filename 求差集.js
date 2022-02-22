Array.prototype.minus = function (arr) {
  return this.filter(function (element) {
    for(let i=0;i<arr.length;i++){
      if(JSON.stringify(element) == JSON.stringify(arr[i])){
        return false
      }
    }
    return true
  });
};
所有的app = [{
  "包名": "com.le123.ysdq",
  "名称": "某某大全"
}, {
  "包名": "dkplugin.ztt.upa",
  "名称": "4-12-23某某大全分身"
}, {
  "包名": "dkplugin.cde.jev",
  "名称": "4-12-24-00-26某某大全分身"
}, {
  "包名": "dkplugin.hfj.ndm",
  "名称": "4-12-23-15-19某某大全分身"
}]
看完的app = [{
  "包名": "com.le123.ysdq",
  "名称": "某某大全"
}]




没看完的app = 所有的app.minus(看完的app)
log('没看完的app=%j',没看完的app)
