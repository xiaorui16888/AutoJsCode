importPackage(org.jsoup)
var JsDroid ={
	JSversion:function(){
		return "1.7.7";
	},
	scrollToTop:function(res){
		var lastPosition = null
		while(true){
			var list = findView(res)
			if(list==null){
				break
			}
			var thisPosition = list.getAllText()
			if(lastPosition==null||thisPosition!=lastPosition){
				//非重复，滑动
				list.swipe(Direction.DOWN,parseFloat(0.8),10000)
				try{device.waitForIdle(2000)}catch(e){}
			}else{
				//重复，退出循环
				break
			}
			lastPosition = thisPosition
		}
	},
	scrollToBottom:function(res){
		var lastPosition = null
		while(true){
			var list = findView(res)
			if(list==null){
				break
			}
			var thisPosition = list.getAllText()
			if(lastPosition==null||thisPosition!=lastPosition){
				//非重复，滑动
				list.swipe(Direction.UP,parseFloat(0.8),10000)
			}else{
				//重复，退出循环
				break
			}
			lastPosition = thisPosition
		}
	},
	//查找节点,指定下标
	FindNodeS:function(obj,num) {
		num = num || 0;
		if (obj == null || obj == "") {
			return false;
		} 
		var node = null;
		try {
			if (obj.class.getName().equals("com.jsdroid.uiautomator2.BySelector")) {
				if (num==0){
					node = findView(obj);
				}else{
					var newnode = findViews(obj);
					if(newnode && newnode.size()>num){
						node = newnode.get(num);
					}else{
						 return false;
					}	
				}
			} else if (obj.class.getName().equals("com.jsdroid.uiautomator2.UiObject2")) {
				if (num>0){
					 return false;
				}else{
						node = obj;
				}
			}else if (obj.class.getName().equals("java.util.ArrayList")){
				if(obj.size()>num){
						 node=obj.get(num);
					}else{
						return false;
					}	
		   }
			if (node != null) {
			  return node;
			  }else{
					return false;
					}
		} catch (e) {
			return false;
		}
	},
	//点击节点
	Click:function(obj,num) {
		var node = JsDroid.FindNodeS(obj,num);
		if (node){
			node.click();
			return true;
			}else{
				return false;
				}
	},
	//获取所有节点信息(文本描述,可见范围,中心坐标)
	getNodeInfoAll:function(obj) {
		if (obj == null || obj == "") {
			return null;
		}
		try {
			var node = null;
			if (obj.class.getName().equals("com.jsdroid.uiautomator2.BySelector")) {
				node = findViews(obj);
			} else if (obj.class.getName().equals("coAllDecodem.jsdroid.uiautomator2.UiObject2")) {
				node = new ArrayList(1);
				node.add(obj)
			} else if (obj.class.getName().equals("java.util.ArrayList")) {
				node = obj;
			}
			if (node!=null)
			{
				var strs = []
				var bounds = []
				var centers = []
				for (var i=0;i<node.size() ;i++ )
				{
					var n = node.get(i);
					strs[i] = new String(n.getText()||n.getContentDescription()||'');
					var bound = n.getVisibleBounds()
					bounds[i] = [bound.left, bound.top, bound.right, bound.bottom]
					var center = n.getVisibleCenter();
					centers[i] = [center.x,center.y];
				}
				return strs.join("!@#")+'"|"'+centers.join(',')+'"|"'+bounds.join(',');
			}
		} catch (e) {}
		return null;
	},

	//获取节点信息(文本描述,可见范围,中心坐标)
	getNodeInfo:function(obj) {
		if (node){
			return null;
		}
		try {
			var node = null;
			if (obj.class.getName().equals("com.jsdroid.uiautomator2.BySelector")) {
				node = findView(obj);
			} else if (obj.class.getName().equals("com.jsdroid.uiautomator2.UiObject2")) {
				node = obj;
			}else if (obj.class.getName().equals("java.util.ArrayList")){
				node = obj.size()>0?obj.get(0):null;
			}
			if (node != null) {
				var str = new String(node.getText() || node.getContentDescription()||"");
				var bound = node.getVisibleBounds();
				var bounds = [bound.left, bound.top, bound.right, bound.bottom];
				var center = node.getVisibleCenter();
				var point = [center.x, center.y]
				return str+'"|"'+ point.join(',')+'"|"'+ bounds.join(',');
			}
		} catch (e) {}
		return null;
	},
	//拖动控件
	drag:function(obj, x, y,s) {
		try {
			if (obj.class.getName().equals("com.jsdroid.uiautomator2.BySelector")) {
				findView(obj).drag(new Point(x, y),s);
			} else if (obj.class.getName().equals("com.jsdroid.uiautomator2.UiObject2")) {
				obj.drag(new Point(x, y),s)
			}
		} catch (e) {}
	},

	//多点滑动
	move:function(points,steps){
		var arr = []
		for(var i=0;i<points.length;i+=2){
			arr[i/2]=new Point(points[i],points[i+1])
		}
		device.swipe(arr,steps)
	},
	ocrImg:function(path){
		var image = FileUtil.readBytes(path);
		json = Ocr.ocr(image)
		var txt = Ocr.getOcrText(json)
		return txt
	},
	ocr:function(x1,y1,x2,y2){
		if ((x2-x1)<50 || (y2-y1)<50){
			return '您的图片范围太小了,宽高不能低于50像素';
			}
		var json = Ocr.ocr(x1,y1,x2,y2)
		var txt = Ocr.getOcrText(json)
		return txt
	},

	//查找节点,获取节点信息(text文本,描述,可见范围,中心坐标),所有信息
	//参数key,字符串型,可选,如果key不是指定的参数,但是有效字符串,则获取所有信息,忽略则默认为只查找,指定格式(text.desc,point,rect)
	//参数num,数值型,指定下标,忽略则默认取第一个节点
	FindNodeInfo:function(obj,key,num) {
		if (typeof(key)=='number'){
			var newnum = key
			key = num
			num = newnum
		}
		num = num || 0;
		if (obj == null || obj == "") {
			return 'false"|"false';	
		}
		var node = JsDroid.FindNodeS(obj,num);    
		if (node) {
				if(key){20,106,469,132
					var Arr = []
					Arr[0] = (node.getText() || "");
					Arr[1] = (node.getContentDescription() || "");
					var point = node.getVisibleCenter();
					Arr[2] = [point.x,point.y].join(',');
					var rect = node.getVisibleBounds();
					Arr[3] = [rect.left,rect.top,rect.right,rect.bottom].join(',');
					switch(key)
					{
					case "text":
						return 'true"|"'+Arr[0];
					case "desc":
						return 'true"|"'+Arr[1];
					case "point":
						return 'true"|"'+Arr[2];
					case "rect":
						return 'true"|"' + Arr[3];
					case "allText":
						return 'true"|"' + (node.getAllText() || '');//获取所有文字
					case "clazz":
						return 'true"|"' + (node.getClassName() || '');//获取clazz
					case "res":
						return 'true"|"' + (node.getResourceName() || '');//获取res
					default:
						return 'true"|"'+Arr.join('"|"') ;
					}
				}else{
					return 'true"|"true'; 
					}
		  }else{
			 return 'false"|"false';
				}
	},
	//获取子节点集合
	GetChild:function(obj,num) {
		var node = JsDroid.FindNodeS(obj,num);
		if (node){
			return node.getChildren();	
			}else{
				return false;
				}
	},
	//获取子节点数量
	GetChildCount:function(obj,num){
		var node = JsDroid.FindNodeS(obj,num);
		if (node){
			return node.getChildCount();
			}else{
				return -1;
				}
	},	
	//获取父节点				
	GetParent:function(obj,num) {
	   var node = JsDroid.FindNodeS(obj,num)
	   if (node){
		return node.getParent()
		}
		return false;
	},
	//节点集合中搜索指定节点
	SeachNode:function(obj,newobj){
		try {
			if (obj.class.getName().equals("com.jsdroid.uiautomator2.BySelector")) {
				node = findView(obj);
				if (node){
					return node.hasObject(newobj);
					}else{
						return false;
						}
			} else if (obj.class.getName().equals("com.jsdroid.uiautomator2.UiObject2")) {
				return obj.hasObject(newobj);
			}else if (obj.class.getName().equals("java.util.ArrayList")){
				for (var i=0;i<obj.size();i++){
					if (obj.get(i).hasObject(newobj)){
						return i;
						}
					}
				return false;	
		   }
		}catch(e){
			return false;
			}
	},
	//开启网页增强
	openwebMode:function(){
		var info =device.getUiAutomation().getServicAllDecodeeInfo();
		info.flags = info.flags|android.accessibilityservice.AccessibilityServiceInfo.FLAG_REQUEST_ENHANCED_WEB_ACCESSIBILITY;
		device.getUiAutomation().setServiceInfo(info);
	},
	//获取父节点增强版
	GetParentEx:function(obj,num1,num2){
		num1=num1 || 0;
		Num2=num2 || 0;
		try{
			var node = JsDroid.FindNodeS(obj,num1);
			if (node){
				var nodearr = [];
				nodearr[0]=node;
				for (var i=1;i<=num2;i++){
					nodearr[i]=nodearr[i-1].getParent();
					if (!nodearr[i]){
						return false;
						}
					}
				return nodearr[num2];
				}else{
						return false;
						}
			}catch(e){
				return false;
				}
		},
		//获取子节点增强版
		GetChildsEx:function(obj,num,arr){
			num = num || 0;
			if (!arr){
				arr=[];
				}
				print(arr.length)
			try{
				var node = JsDroid.FindNodeS(obj,num);
				if (node){
					print(node);
					var nodearr =[]
					nodearr[0]=node.getChildren();
					for (var i=0;i<arr.length;i++){
						print(nodearr[i]);
						if (nodearr[i] && nodearr[i].size()>arr[i]){
							nodearr[i+1]=nodearr[i].get(arr[i]).getChildren();
							if (!nodearr[i+1]){
								return false;
								}
						}else{
							return false;
							}	
					}
					return nodearr[nodearr.length-1];
				}else{
					return false;
					}

				
				}	catch(e){
					print(e);
					return false;
					}
			},
			//设置输入框文字
			SetText:function(obj,str,num){
			var node = JsDroid.FindNodeS(obj,num);
			if (node){
				node.setText(str);
				return true;
				}
			},
			//清空输入框内容
			EditClear:function(obj,num){
				num = num || 0;
				var node = JsDroid.FindNodeS(obj,num);
				if (node){
					node.clear();
					return true;
				}
			},
			//长按节点
			LongClick:function(obj,num){
				num = num || 0;
				var node = JsDroid.FindNodeS(obj,num);
				if (node){
					node.longClick();
					return true;
				}
			},
			IsChecked:function(obj,num){
					var node = JsDroid.FindNodeS(obj,num);
					if (node){
						return node.isChecked();
						}else{
							return false;
							}
					},	
			//二维码解析
			parseQRCode:function(imgSrc){
				var document = Jsoup.connect("https://zxing.org/w/decode")
				.data("f","1.jpg", new FileInputStream(imgSrc))
				.post();
				return document.select("#result tr td pre").first().text();
			 },
			 //下载网络文件
			 downloadFile:function(url,src){
				 var bytes = org.jsoup.Jsoup.connect(url)
				  .ignoreContentType(true)//忽略返回类型
				  .maxBodySize(0)//设置返回数据大小不受限制
				  .execute()
				   new FileOutputStream(src).write(bytes.bodyAsBytes());
			  }
}
