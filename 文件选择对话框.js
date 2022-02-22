// 文件选择对话框，还没做任何调试，肯定跑不起来
// 只是给你们看看代码而已
//requiresAutoJsVersion(7000304);

function listFiles(dir, options, ctx) {
    return Array.prototype.map.call(files.listDir(dir), (name) => {
        // 文件的绝对路径
        let absPath = files.join(dir, name);
        // 该文件是否是文件夹
        let isDir = files.isDir(absPath);
        let checkable;
        if (isDir) {
            checkable = options.canChooseDir;
            name += '/';
        } else {
            checkable = options.canChooseFile;
        }
        //let checkable;
        return {
            context: ctx,
            fileName: name,
            checkable: checkable,
            icon: isDir ? "ic_insert_drive_file_black_48dp" : "ic_folder_black_48dp",
            checked: false
        }
    })
}

function FileChooserView(options, ctx) {
    this.ctx = ctx;
    this.options = options;
    let view = ui.inflate(
        <vertical>
            <list id="fileList">
                <horizontal>
                    <checkbox id="checkbox" checked="{{this.checked}}" />
                    <img  w="40dp" h="40dp" scaleType="fitXY" />
                    <text text="{{this.fileName}}" w="*" h="*" textSize="16sp" textColor="#373737" marginLeft="8dp" />
                </horizontal>
            </list>
        </vertical>
    );
    this.view = view;
    view.fileList.on("item_bind", function(itemView, itemHolder) {
        itemView.checkbox.on("check", function(checked) {
            let item = itemHolder.item;
            let ctx = item.context;
            //let adapter = adapter;
            if (checked) {
                if (ctx.selectedPos >= 0) {
                    ctx.data[ctx.selectedPos].checked = false
                };
                //adapter.notifyItemChanged(ctx.selectedPos);
                ctx.selectedPos = itemHolder.position;
                ctx.data[itemHolder.position].checked = true;
                //adapter.notifyItemChanged(itemHolder.position);
            } else {
                ctx.selectedPos = -1;
                ctx.data[itemHolder.position].checked = false;
                //adapter.notifyItemChanged(itemHolder.position);
            }
        });
    });
    view.fileList.on("item_click", (item, i, itemView, listView) =>{
        if (item.fileName == '..') {
            return;
        }
        if (item.fileName.endsWith("/")) {
            this.enterDir(files.join(item.context.dir, item.fileName));
        } else {
            itemView.checkbox.toggle();
        }
    });
    this.enterDir = function(dir) {
        this.ctx.dir = dir;
        this.ctx.data = listFiles(dir, this.options, this.ctx);
        this.view.fileList.setDataSource(this.ctx.data);
    };
    //return view;
}

//FileChooserView.prototype

function FileChooserDialog(options) {
    let options = Object.assign({}, options);
    let canChoose = options.canChoose || [];
    options.canChooseFile = canChoose.indexOf("file") >= 0;
    options.canChooseDir = canChoose.indexOf("dir") >= 0;
    let ctx = {
        selectedPos: -1,
        data: []
    };
    let view = new FileChooserView(options, ctx);
    view.enterDir(options.dir);
    options.customView = view.view;
    options.wrapInScrollView = false;
    options.title = options.title || "选择文件(夹)";
    options.positive = options.positive || "确定";
    let fileCallback = options.fileCallback;
    return dialogs.build(options)
        .on("positive", () => {
            let selectedFile = ctx.selectedPos >= 0 ? files.join(ctx.dir, ctx.data[ctx.selectedPos]) : null;
            fileCallback && fileCallback(selectedFile);
        }).on("negative", (dialog)=>{
             toast("你点击了取消"); 
             dialog.dissmiss();
        });
}


FileChooserDialog({
    dir: "/sdcard/",
    canChooseDir:"visible",
    canChooseFile:"visible",
}).show();