// 开发文档https://easydoc.xyz/#/doc/25791054/uw2FUUiw/dUKkGTUD


//此代码由飞云脚本圈原创（www.feiyunjs.com）
//保存本地数据
function setStorageData(name, key, value) {
    const storage = storages.create(name);  
    storage.put(key, value);
};

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  
    if (storage.contains(key)) {
        return storage.get(key, "");
    };
    //默认返回undefined
};

//删除本地数据
function delStorageData(name, key) {
    const storage = storages.create(name); 
    if (storage.contains(key)) {
        storage.remove(key);
    };
};