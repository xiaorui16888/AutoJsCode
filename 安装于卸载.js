function 安装与卸载() { 
	shell(" pm install /data/local/tmp/test.apk ",true)       //   #安装
	shell(" pm install –r /data/local/tmp/test.apk ",true)    //   #重新安装
	shell(" pm uninstall 包名",true) 	                      //   #卸载应用
	shell(" pm uninstall -k 包名",true) 	                  //   #卸载应用  保留数据
}