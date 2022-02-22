function StringItem(name, defValue, enValue) {
    this.name = name;
    //默认值，中文翻译
    this.defValue = defValue;
    //英文翻译
    this.enValue = enValue;
    //机器翻译
    this.translations = {
        youdao: ""
    };
}

StringItem.prototype.fromArray = function (csvArray) {
    return new StringItem(csvArray[0], csvArray[1], csvArray[2]);
}

StringItem.prototype.fromCsv = function(csv){
    let items = [];
    items.defValueCount = 0;
    CSVToArray(csv).forEach(csvArray => {
        let item = StringItem.prototype.fromArray(csvArray);
        items.push(item);
        if(item.defValue){
            items.defValueCount++;
        }
    });
    return items;
}

StringItem.prototype.toCsv = function(items){
    let str = "";
    items.forEach(item => {
        str += util.format("%s,%s,%s,%s\n", item.name, item.defValue, 
            item.enValue, item.translations.youdao);
    })
    return str;
}

const translationHelper = {
    youdao: function(text, callback){
        let url = "http://fanyi.youdao.com/openapi.do?keyfrom=cxvsdffd33&key=1310976914&type=data&doctype=json&version=1.1&q="
        http.get(url + text, {}, function(res, err){
            if(err){
                console.error(err);
                callback("");
                return;
            }
            try{
                let result = res.body.json();
                callback(result.translation[0]);
            }catch(e){
                console.error(e);
                callback("");
            }
           
        });
    }
}


function doTranslate(items, callback){
    let count = threads.atomic(0);
    items.forEach(item => {
        if(item.defValue){
            translationHelper.youdao(item.defValue, result => {
                item.translations.youdao = result;
                let c = count.incrementAndGet();
                log(c + ": ", item);
                if(c == items.defValueCount){
                    callback(items);
                }
            })
        }
    })
}

let path = "/storage/emulated/0/Tencent/QQfile_recv/strings.csv";
let outPath = "/sdcard/string_out.csv"
let csv = files.read(path);
let items = StringItem.prototype.fromCsv(csv);
//log(items);
log(items.length + ", " + items.defValueCount);
sleep(2000);
toast("开始翻译");
let thread = threads.currentThread();
doTranslate(items, result => {
    toast("翻译完成");
    let resultCsv = StringItem.prototype.toCsv(result);
    log(resultCsv);
    files.write(outPath, resultCsv);
    thread.setTimeout(()=>{
        exit();
    }, 1000);
});
setInterval(()=>{}, 1000);

// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}