"ui";

ui.layout(
    <vertical>
        <button id="calc" align="center">文件选择</button>
        <text id="text_test" text="null"></text>
    </vertical>
);


function pathToArray(dir) {
    current_dir_array = new Array();
    current_dir_array = ["返回上级目录"];
    files.listDir(dir.join("")).forEach((i) => {
        if (files.isDir(dir.join("") + i)) {
            current_dir_array.push(i + "/");
        } else if (files.isFile(dir.join("") + i)) {
            current_dir_array.push(i);
        }
    });
    return current_dir_array;
}



ui.calc.click(() => {
    var current_dir_array, dir = ["/", "sdcard", "/"]; //存储当前目录
    function file_select(select_index) {
        switch (select_index) {
            case undefined:
                break;
            case -1:
                return;
            case 0:
                if (dir.length > 3) {
                    dir.pop();
                }
                break;
            default:
                if (files.isFile(files.join(dir.join(""), current_dir_array[select_index]))) {
                    let file_name = (files.join(dir.join(""), current_dir_array[select_index]))
                    toast(file_name)
                    ui.text_test.setText(file_name);
                    return;

                } else if (files.isDir(files.join(dir.join(""), current_dir_array[select_index]))) {
                    dir.push(current_dir_array[select_index])
                }

        };
        current_dir_array = pathToArray(dir)
        dialogs.select("文件选择", current_dir_array).then(n => {
            file_select(n)
        });
    };
    file_select();
});