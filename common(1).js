var common = (function () {
	// function showView(view,duration){
	//   var window, paint, bitmap, bitmapCanvas;
	//   var duration=duration || 2000
	//   function 创建悬浮窗() {
	//     window = floaty.rawWindow( <canvas id = "board"
	//       h = "{{device.height}}"
	//       w = "{{device.width}}" />
	//     );
	//     // setInterval(() => {}, 3000)
	//     window.setSize(device.width, device.height)
	//     window.setTouchable(false);
	//     // window.setPosition(0, 110)
	//     // var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
	//     bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
	//     bitmapCanvas = new Canvas(bitmap);
	//     paint = new Paint()
	//     paint.setStrokeWidth(10);
	//     var color = '#00ff00'
	//     color = colors.parseColor(color)
	//     paint.setColor(color)
	//     paint.setStyle(Paint.Style.STROKE);
	//     paint.setTextAlign(Paint.Align.CENTER);
	//     paint.setTextSize(35);
	//     window.board.on("draw", function (canvas) {
	//       canvas.drawBitmap(bitmap, 0, 0, paint);
	//     });
	//   }

	//   function showView(view) {
	//     创建悬浮窗()
	//     var bounds = view.bounds()
	//     var left = bounds.left
	//     var top = bounds.top
	//     var right = bounds.right
	//     var bottom = bounds.bottom
	//     if (left > right) {
	//       left = device.width / 3
	//       right = device.width / 3 * 2
	//     }
	//     log(left, top, right, bottom)
	//     var originalStrokeWidth = paint.getStrokeWidth()
	//     var originalColor = paint.getColor()
	//     var rndColor = getRndColor()
	//     var color = colors.parseColor(rndColor)
	//     paint.setColor(color)
	//     paint.setStrokeWidth(20)
	//     画矩形(left, top, right, bottom)
	//     paint.setColor(originalColor)
	//     paint.setStrokeWidth(originalStrokeWidth)
	//   }

	//   function 画矩形(left, top, right, bottom) {
	//     bitmapCanvas.drawRect(left, top, right, bottom, paint)
	//   }

	//   function getRndColor() {
	//     var a, r, g, b;
	//     a = Math.floor(0), r = Math.floor(随机0_255()), g = Math.floor(随机0_255()), b = Math.floor(随机0_255());
	//     // var 反色 = -1 - colors.argb(0, r, g, b);
	//     var color = colors.argb(0, r, g, b);
	//     color = colors.toString(color)
	//     log(color)
	//     return color
	//   }

	//   function 随机0_255() {
	//     var r = parseInt(255 * Math.random())
	//     return r
	//   }

	//   showView(view)
	//   sleep(duration)
	// }

	var 是否打印日志 = false;
	var rand = (function () {
		var today = new Date();
		var seed = today.getTime();
		function rnd() {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / (233280.0);
		};
		return function rand(number) {
			return Math.ceil(rnd() * number);
		};
	})();
	function getSDPath() {
		return files.getSdcardPath();
	}

	function myLog() {
		var path = files.join(getSDPath(), "myLog.txt");
		var info = JSON.stringify(Array.prototype.slice.call(arguments)) + "\n";
		if (是否打印日志) {
			files.append(path, info);
		}
	}

	function exist(propFeature, searchCount, intervalTime) {
		var searchCount = searchCount || 1;
		var intervalTime = intervalTime || 1000;
		//propFeature是一个json格式
		//desc,text,id,boundsInside,bounds,boundsContains
		if (!(getObjType(propFeature) == "Object")) {
			var obj = {
				k1: "v1",
				k2: "v2",
				k3: "v3"
			};
			throw "请传入一个对象,格式如下" + JSON.stringify(obj);
		}
		var propFeature = propFeature || {};
		var mySelector = "";
		for (var k in propFeature) {
			if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
				mySelector +=
					k +
					"(" +
					propFeature[k][0] +
					"," +
					propFeature[k][1] +
					"," +
					propFeature[k][2] +
					"," +
					propFeature[k][3] +
					").";
				continue;
			}
			mySelector += k + '("' + propFeature[k] + '").';
		}
		mySelector += "visibleToUser().findOnce()";
		for (var i = 0; i < searchCount; i++) {
			var searchResult = eval(mySelector);
			if (searchResult) {
				return searchResult;
			}
			sleep(intervalTime);
		}
		return false;
	}

	function getObjType(obj) {
		// JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
		var result = Object.prototype.toString.call(obj);
		result = result.match(/ \w+/)[0];
		result = result.replace(/ /g, "");
		return result;
	}

	function randomDelay(time) {
		var time = time || 1000;
		time = time + random(0, 1000);
		sleep(time);
	}

	function 提取控件区域信息从控件的字符串描述中(view) {
		if (view) {
			function findNum(str) {
				return str.match(/\d+/g);
			}
			var viewText = view.toString();
			var viewRect = viewText.match(
				/boundsInScreen: Rect\(\d+, \d+ \- \d+, \d+\);/
			);
			if (viewRect) {
				var nums = findNum(viewRect[0]);
				if (nums) {
					if (nums.length === 4) {
						for (var i = 0; i < nums.length; i++) {
							nums[i] = parseInt(nums[i]);
						}
						var info = {
							left: nums[0],
							top: nums[1],
							right: nums[2],
							bottom: nums[3]
						};
						return info;
					}
				}
			}
		}
	}

	function getViewAreaInformation(view) {
		if (!view) {
			return false;
		}
		var viewBounds;
		try {
			viewBounds = view.bounds();
		} catch (e) {
			viewBounds = 提取控件区域信息从控件的字符串描述中(view);
		}
		if (viewBounds) {
		} else {
			log("获取控件区域信息失败");
			return false;
		}
		var left = viewBounds.left;
		var top = viewBounds.top;
		var right = viewBounds.right;
		var bottom = viewBounds.bottom;
		var centerX = viewBounds.left + (viewBounds.right - viewBounds.left) / 2;
		var centerY = viewBounds.top + (viewBounds.bottom - viewBounds.top) / 2;
		var width = viewBounds.right - viewBounds.left;
		var height = viewBounds.bottom - viewBounds.top;

		var info = {};
		info.left = left;
		info.top = top;
		info.right = right;
		info.bottom = bottom;
		info.centerX = centerX;
		info.centerY = centerY;
		info.width = width;
		info.height = height;
		log(info);
		return info;
	}

	function doubleClick(x, y) {
		var k = 5;
		press(x + random(-k, k), y + random(-k, k), random(3, 10));
		sleep(random(30, 100));
		press(x + random(-k, k), y + random(-k, k), random(3, 10));
	}

	function clickView(view, t) {
		var viewBoundsInfo = getViewAreaInformation(view);
		if (view && viewBoundsInfo) {
			var x = viewBoundsInfo.centerX;
			var y = viewBoundsInfo.centerY;
			var k = 3;
			x += random(-k, +k);
			y += random(-k, +k);
			t = t || random(1, 30);
			press(x, y, t);
			return true;
		} else {
			myLog("传入点击控件中的view异常\n" + "view=" + String(view));
			toast("传入点击控件中的view异常\n" + "view=" + String(view));
			return false;
		}
	}

	function ring(播放时长, 铃声类型, 是否循环播放) {
		var 播放时长 = 播放时长 || 6000;
		var 铃声类型 = 铃声类型 || 0;
		var 是否循环播放 = 是否循环播放 || false;
		if (是否循环播放) {
			播放时长 = 666 * 1000;
		}
		var 铃声选择结果 = android.media.RingtoneManager.TYPE_NOTIFICATION;
		switch (铃声类型) {
			case 0:
				铃声选择结果 = android.media.RingtoneManager.TYPE_RINGTONE;
				break;
			case 1:
				铃声选择结果 = android.media.RingtoneManager.TYPE_ALARM;
				break;
			case 2:
				铃声选择结果 = android.media.RingtoneManager.TYPE_ALL;
				break;
			default:
				break;
		}
		var mp = new android.media.MediaPlayer();
		mp.setDataSource(
			context,
			android.media.RingtoneManager.getDefaultUri(铃声选择结果)
		);
		if (是否循环播放) mp.setLooping(true);
		mp.prepare();
		mp.start();
		threads.start(function () {
			sleep(播放时长);
			if (mp.isPlaying()) {
				mp.stop();
			}
		});
		return mp;
	}

	function 打开app(appName) {
		var appPackageName = getPackageName(appName);
		var currentPackageName = currentPackage();
		if (appPackageName === currentPackageName) {
			return true;
		} else {
			launchApp(appName);
		}
	}

	function getLatestApp() {
		var pm = context.getPackageManager();
		var appList = pm.getInstalledApplications(0);
		var appInfoList = [];
		for (let i = 0; i < appList.size(); i++) {
			var app = appList.get(i);
			var appInfo = {
				appName: app.loadLabel(pm),
				packageName: app.packageName,
				isSystemApp: app.isSystemApp(),
				firstInstallTime: pm.getPackageInfo(app.packageName, 0).firstInstallTime
			};
			appInfoList.push(appInfo);
		}
		appInfoList.sort((a, b) => {
			return b.firstInstallTime - a.firstInstallTime;
		});
		var packageName = appInfoList[0].packageName;
		launch(packageName);
		return appInfoList[0].appName;
	}

	function getAppVersion(appName) {
		function getPackageVersion(packageName) {
			importPackage(android.content);
			var pckMan = context.getPackageManager();
			var packageInfo = pckMan.getPackageInfo(packageName, 0);
			return packageInfo.versionName;
		}
		var packageName = getPackageName(appName);
		return getPackageVersion(packageName);
	}

	function getFileModificationTime(path) {
		var time = new java.io.File(files.path(path)).lastModified();
		return time;
	}

	function getFileLength(path) {
		var size = new java.io.File(path).length();
		return size;
	}

	function md5(string) {
		return java.math
			.BigInteger(
				1,
				java.security.MessageDigest.getInstance("MD5").digest(
					java.lang.String(string).getBytes()
				)
			)
			.toString(16);
	}

	function getScreenOrientation() {
		var a = context.resources.configuration.orientation;
		if (a === 1) {
			return "vertical";
		} else {
			return "horizontal";
		}
	}

	function getTime(time, rule) {
		var rule = rule || "yyyy-MM-dd HH:mm:ss";
		log("rule=" + rule);
		if (time) {
			return new java.text.SimpleDateFormat(rule).format(new Date(time));
		} else {
			return new java.text.SimpleDateFormat(rule).format(new Date());
		}
	}

	function getAppIcon(appName) {
		importClass(java.io.File);
		importClass(java.io.FileOutputStream);
		importClass(android.graphics.Bitmap);
		var pm = context.getPackageManager();
		importClass(android.util.DisplayMetrics);
		var name = appName;
		var packageName = app.getPackageName(name);
		var appInfo = pm.getApplicationInfo(packageName, 0);
		var bmp = appInfo.loadIcon(pm).getBitmap();
		var imgPath = files.join(files.getSdcardPath(), name + ".jpg");
		files.create(imgPath);
		var f = new File(imgPath);
		var fOut = new FileOutputStream(f);
		bmp.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
		fOut.flush();
		fOut.close();
		var img = images.read(imgPath);
		return img;
		// app.viewFile(imgPath)
	}

	function getEditDistance(sm, sn) {
		// var mindist=minEditDist("126","456")
		// print(mindist)
		var m = sm.length + 1;
		var n = sn.length + 1;
		var matrix = new Array();
		for (var i = 0; i < m; i++) {
			matrix[i] = new Array();
			for (var j = 0; j < n; j++) {
				matrix[i][j] = 0;
			}
		}
		matrix[0][0] = 0;
		for (let i = 1; i < m; i++) {
			matrix[i][0] = matrix[i - 1][0] + 1;
		}
		for (let j = 1; j < n; j++) {
			matrix[0][j] = matrix[0][j - 1] + 1;
		}
		cost = 0;
		for (let i = 1; i < m; i++) {
			for (let j = 1; j < n; j++) {
				if (sm[i - 1] == sn[j - 1]) {
					cost = 0;
				} else {
					cost = 1;
				}
				matrix[i][j] = Math.min(
					matrix[i - 1][j] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j - 1] + cost
				);
			}
		}
		return matrix[m - 1][n - 1];
	}

	function getAllAppNames() {
		var allAppNames = [];
		var pm = context.getPackageManager();
		let list = pm.getInstalledApplications(0);
		for (let i = 0; i < list.size(); i++) {
			let p = list.get(i);
			var app = {
				appName: p.loadLabel(pm),
				packageName: p.packageName
			};
			allAppNames.push(app.appName);
		}
		return allAppNames;
	}

	function getAllText(setting) {
		var setting = setting || {};
		var defaultSetting = {
			getText: true,
			getDesc: true,
			getId: true,
			getBounds: true,
			removeRepetitiveElements: true
		};
		Object.assign(defaultSetting, setting);
		var allStr = [];
		var getDescAndTextAndIdOfNode = function (node) {
			if (node && node.visibleToUser()) {
				if (defaultSetting.getText) {
					var text = node.text();
					if (!!text) {
						allStr.push(text);
					}
				}
				if (defaultSetting.getDesc) {
					var desc = node.desc();
					if (!!desc) {
						allStr.push(desc);
					}
				}
				if (defaultSetting.getId) {
					var id = node.id();
					if (!!id) {
						allStr.push(id);
					}
				}
				if (defaultSetting.getBounds) {
					var boundsInfo = node.bounds();
					if (!!boundsInfo) {
						allStr.push(boundsInfo);
					}
				}
			}
			for (let i = 0; i < node.childCount(); i++) {
				getDescAndTextAndIdOfNode(node.child(i));
			}
		};
		var getFrameLayoutNode = function () {
			return className("FrameLayout").findOne(2000);
		};
		getDescAndTextAndIdOfNode(getFrameLayoutNode());

		function removeRepetitiveElements(arr) {
			var obj = {};
			for (let i = 0; i < arr.length; i++) {
				if (obj.hasOwnProperty(arr[i])) {
				} else {
					obj[arr[i]] = true;
				}
			}
			return Object.keys(obj);
		}
		if (defaultSetting.removeRepetitiveElements) {
			allStr = removeRepetitiveElements(allStr);
		}
		return allStr;
	}

	function randomStr(PassLength) {
		var PassLength = PassLength || 2;
		var str = "abcdefghijklmnopqrstuvwxyz";
		var STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var num = "0123456789";
		var sym = "+=-@#~,.[]()!%^*$";
		var text = str.split("").concat(STR.split(""));
		var pw = "";
		for (i = 0; i < PassLength; i++) {
			var strpos = random(0, text.length - 1);
			pw += text[strpos].charAt(random(0, text[strpos].length - 1));
		}
		return pw;
	}

	function slippery(direction) {
		//str sting 上下左右 分别代表向上向下向左向右。
		var interval = 0.1;
		//gesture.apply(null, points);
		//return points;
		var rand = 30;
		var dw = device.width / 6,
			dh = device.height / 4;
		// 随机的滑动时间
		var points = [random(300, 600)];
		var x0, y0, s0;
		var direction = direction || "up";
		switch (direction) {
			case "up":
				x0 = dw * 3 + random(-rand, rand);
				y0 = dh * 3 + random(-rand, rand);
				s0 = Math.abs(y0 - dh + random(-rand, rand));
				for (var t = 0; t < Math.PI * 0.75; t += interval) {
					var x = x0 - dw * Math.sin(t);
					var y = y0 - s0 * Math.sin(0.5 * t);
					if (x > 0 && y > 0) {
						points.push([parseInt(x), parseInt(y)]);
					}
				}
				// return points;
				break;
			case "down":
				x0 = dw * 3 + random(-rand, rand);
				y0 = dh + random(-rand, rand);
				s0 = Math.abs(y0 - dh * 3 + random(-rand, rand));
				for (var t = 0; t < Math.PI * 0.75; t += interval) {
					var x = x0 - dw * Math.sin(t);
					var y = y0 + s0 * Math.sin(0.5 * t);
					if (x > 0 && y > 0) {
						points.push([parseInt(x), parseInt(y)]);
					}
				}
				// return points;

				break;
			case "left":
				x0 = dw * 5 + random(-rand, rand);
				y0 = dh * 2 + random(-rand, rand);
				s0 = Math.abs(x0 - dw + random(-rand, rand));
				for (var t = 0; t < Math.PI * 0.75; t += interval) {
					var x = x0 - s0 * Math.sin(0.5 * t);
					var y = y0 - dh * 0.2 * Math.sin(t);
					if (x > 0 && y > 0) {
						points.push([parseInt(x), parseInt(y)]);
					}
				}
				// return points;

				break;
			case "right":
				x0 = dw + random(-rand, rand);
				y0 = dh * 2 + random(-rand, rand);
				s0 = Math.abs(x0 - dw * 5 + random(-rand, rand));
				for (var t = 0; t < Math.PI * 0.75; t += interval) {
					var x = x0 + s0 * Math.sin(0.5 * t);
					var y = y0 - dh * 0.2 * Math.sin(t);
					if (x > 0 && y > 0) {
						points.push([parseInt(x), parseInt(y)]);
					}
				}

				// return points;

				break;
			default:
				break;
		}
		gesture.apply(null, points);
	}

	function getDeflateWebPage(url, headers) {
		importClass("java.io.BufferedReader");
		importClass("java.io.InputStreamReader");
		importClass("java.util.zip.InflaterInputStream");
		importClass("java.io.ByteArrayInputStream");
		importClass("java.util.zip.Inflater");
		var headers = headers || {};
		var res = http.get(url, {
			headers: headers
		});
		var deflateFileContent = res.body.bytes();
		var 网页内容 = null;
		if (deflateFileContent) {
			var br = new BufferedReader(
				new InputStreamReader(
					new InflaterInputStream(
						new ByteArrayInputStream(deflateFileContent),
						new Inflater(true)
					)
				)
			);
			var lns = [],
				cl;
			while ((cl = br.readLine())) lns.push(cl);
			网页内容 = lns.join("\n");
			return 网页内容;
		} else {
			toast("getDeflateWebPage ERROR");
			return false;
		}
	}

	function getGzipWebPage(url, form, headers, method) {
		var method = method || "get";
		var headers = headers || {};

		function 保存zip文件(zipFile) {
			var path = files.join(files.cwd(), "getGzipWebPage/webPage.gzip.js");
			files.createWithDirs(path);
			log("path=", path);
			// path= /storage/emulated/0/脚本/zip文件专用/test.zip
			files.writeBytes(path, zipFile);
			var r = 解压zip文件(path);
			log(r);
			return r;
		}

		function 解压zip文件(文件路径) {
			//同一目录下的同一文件名
			// unzipGzipFile(sourceGzipFilePath, targetPath)
			var fileName = files.getName(文件路径);
			var 解压后的文件路径 = 文件路径.replace(fileName, "webPage.js");
			log("解压的解压后的文件路径=", 解压后的文件路径);
			files.createWithDirs(解压后的文件路径);
			// com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件路径))
			var sourceGzipFilePath = 文件路径;
			var targetPath = 解压后的文件路径;
			unzipGzipFile(sourceGzipFilePath, targetPath);
			return targetPath;
		}

		function unzipGzipFile(sourceGzipFilePath, targetPath) {
			importClass(java.io.FileInputStream);
			importClass(java.util.zip.GZIPInputStream);
			importClass("java.io.FileOutputStream");
			var sourceGzipFilePath =
				sourceGzipFilePath ||
				files.join(files.getSdcardPath(), "tempSourceGzipFilePath.js");
			var targetPath =
				targetPath || files.join(files.getSdcardPath(), "tempTargetPath.js");
			var sChunk = 8192;
			var gzipFileInputStream = new FileInputStream(sourceGzipFilePath);
			var zipin = new GZIPInputStream(gzipFileInputStream);
			var buffer = util.java.array("byte", sChunk);
			var out = new FileOutputStream(targetPath);
			var length;
			while ((length = zipin.read(buffer, 0, sChunk)) != -1)
				out.write(buffer, 0, length);
			out.close();
			zipin.close();
		}
		var res = null;
		if (method == "get") {
			res = http.get(url, {
				headers: headers
			});
		} else if (method == "post") {
			res = http.post(url, form, {
				headers: headers
			});
		} else {
			alert("请自行添加get post 之外的方法");
			return false;
		}

		var gzipFileContent = res.body.bytes();
		var 网页内容 = null;
		if (gzipFileContent) {
			var 网页保存路径 = 保存zip文件(gzipFileContent);
			网页内容 = files.read(网页保存路径);
			return 网页内容;
		} else {
			toast("getGzipWebPage ERROR");
			return false;
		}
	}

	function strip(str) {
		var whitespace =
			" \0\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		for (var i = 0, len = str.length; i < len; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}
		for (i = str.length - 1; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : "";
	}

	function isLargeArrayContainsSmallArray(bigArr, smallArr) {
		//对于重复的元素采用计数的方式对比
		var bigArrObj = {};
		var smallArrObj = {};
		for (let i = 0; i < bigArr.length; i++) {
			var has = bigArrObj.hasOwnProperty(bigArr[i]);
			if (has) {
				bigArrObj[bigArr[i]]++;
			} else {
				bigArrObj[bigArr[i]] = 1;
			}
		}
		for (let i = 0; i < smallArr.length; i++) {
			var has = smallArrObj.hasOwnProperty(smallArr[i]);
			if (has) {
				smallArrObj[smallArr[i]]++;
			} else {
				smallArrObj[smallArr[i]] = 1;
			}
		}
		for (var k in smallArrObj) {
			if (bigArrObj.hasOwnProperty(k) && bigArrObj[k] >= smallArrObj[k]) {
			} else {
				return false;
			}
		}
		return true;
	}

	function deepCopy(obj) {
		if (typeof obj != "object") {
			return obj;
		}
		var newobj = {};
		for (var attr in obj) {
			newobj[attr] = deepCopy(obj[attr]);
		}
		return newobj;
	}

	function oppositeColor(color) {
		return (
			-1 -
			colors.argb(0, colors.red(color), colors.green(color), colors.blue(color))
		);
	}

	function dateToTimestamp(date) {
		// log(dateToTimestamp('2019-04-28 18:24:23'))
		var 参数符合格式吗 = /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/.test(date);
		if (!参数符合格式吗) {
			alert("日期格式错误,正确的日期格式 = yyyy-MM-dd HH:mm:ss");
			return false;
		}
		var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		var ts = java.lang.String.valueOf(sdf.parse(date).getTime());
		ts = new java.math.BigDecimal(ts).toPlainString().toString();
		return ts;
	}

	function Command(name, todo, propFeatureOfTheWidgetThatMustAppear) {
		this.name = name;
		this.todo = todo;
		this.propFeatureOfTheWidgetThatMustAppear = propFeatureOfTheWidgetThatMustAppear;
		this.limitTime = 3;
		this.serialNumber = 0;
		this.intervalTime = 1000;
		this.success = false;
	}
	Command.prototype.check = function () {
		return exist(this.propFeatureOfTheWidgetThatMustAppear);
	};
	Command.prototype.go = function () {
		for (var i = 0; i < this.limitTime; i++) {
			this.todo();
			this.success = this.check();
			if (this.success) {
				return true;
			} else {
				sleep(random(1000, 2000) + this.intervalTime);
			}
		}
	};

	function getDeviceModel() {
		var r = device.model;
		if (r && r.length > 6) {
			return r.trim();
		} else {
			return false;
		}
	}

	function readNonBlankLines(filePath) {
		var file = open(filePath, "r");
		var lines = file.readlines();
		file.close();
		var arr = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			line = strip(line);
			if (line.length > 0) {
				arr.push(line);
			}
		}
		return arr;
	}
	function rndReadNonBlankLines(filePath) {
		var file = open(filePath, "r");
		var lines = file.readlines();
		file.close();
		var arr = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			line = strip(line);
			if (line.length > 0) {
				arr.push(line);
			}
		}
		var num = random(0, arr.length - 1)
		return arr[num];
	}
	function readFirstLineNonBlank(filePath) {
		var file = open(filePath, "r");
		var lines = file.readlines();
		file.close();
		var arr = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			line = strip(line);
			if (line.length > 0) {
				arr.push(line);
			}
		}
		if (arr.length > 0) {
			return arr[0];
		}
		return false;
	}
	function rndReadLineNonBlank(filePath) {
		var file = open(filePath, "r");
		var lines = file.readlines();
		file.close();
		var arr = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			line = strip(line);
			if (line.length > 1) {
				arr.push(line);
			}
		}
		var num = random(0, arr.length - 1);
		if (arr.length > 0) {
			return arr[num];
		}
		return false;
	}

	function scanFile(dirs, extensions) {
		var dirs = dirs || [
			files.join(files.getSdcardPath(), "DCIM"),
			files.getSdcardPath()
		];
		var extensions = extensions || ["jpg", "png", "mp4", "gif"];

		function 后缀名是否正确(fileName) {
			var extension = files.getExtension(fileName);
			for (var i = 0; i < extensions.length; i++) {
				if (extensions[i] === extension) {
					return true;
				}
			}
		}
		for (var i = 0; i < dirs.length; i++) {
			var dir = dirs[i];
			log(dir);
			var jsFiles = files.listDir(dir, function (name) {
				if (后缀名是否正确(name) && files.isFile(files.join(dir, name))) {
					return true;
				} else {
					return false;
				}
			});
			jsFiles.map(item => {
				var path = files.join(dir, item);
				log(path);
				media.scanFile(path);
			});
		}
	}

	function stopThread(threadId) {
		if (threadId && threadId.isAlive()) {
			threadId.interrupt();
		}
	}

	function continuousClick(x, y, intervalTime) {
		var k = 3;
		var intervalTime = intervalTime || 100;
		if (intervalTime < 20) {
			intervalTime = 20;
		}
		for (var i = 0; i < random(5, 10); i++) {
			var x = x + random(-k, k);
			var y = y + random(-k, k);
			press(x, y, random(1, 30));
			sleep(random(intervalTime - 10, intervalTime + 10));
		}
	}

	function deletedLine(path, lineNum) {
		var file, result;
		file = open(path, "r");
		result = file.readlines();
		file.close();
		var tempArr = Array.prototype.slice.call(result);
		var line = tempArr.splice(lineNum, 1);
		file = open(path, "w");
		result = file.writelines(tempArr);
		file.flush();
		file.close();
		return line[0];
	}

	function getLineAndDelete(filePath) {
		var file = open(filePath, "r");
		var lines = file.readlines();
		file.close();
		var arr = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			line = strip(line);
			if (line.length > 0) {
				arr.push(line);
			}
		}
		var firstLine = arr.splice(0, 1);
		file = open(filePath, "w");
		result = file.writelines(arr);
		file.flush();
		file.close();
		if (firstLine.length > 0) {
			return firstLine[0];
		} else {
			return false;
		}
	}

	function randomPress(x, y) {
		var k = 5;
		var x = x + random(-k, k);
		var y = y + random(-k, k);
		var t = random(1, 30);
		press(x, y, t);
	}

	function firstImg(sourceImgPath, targetFolder) {
		var sourceImgPath =
			files.join(files.getSdcardPath(), "test.png") || sourceImgPath;
		var targetFolder =
			files.join(files.getSdcardPath(), "DCIM") || targetFolder;
		var baseName = files.getName(sourceImgPath);
		var targetPath = files.join(targetFolder, baseName);
		var fromPath = sourceImgPath;
		var toPath = targetPath;
		var hasImg = files.exists(toPath);
		if (hasImg) {
			files.remove(toPath);
		}
		files.copy(fromPath, toPath);
		media.scanFile(fromPath);
		media.scanFile(toPath);
	}

	function 查找QQ群聊天界面底部图片按钮() {
		var sendButtonView = text("发送")
			.visibleToUser(true)
			.findOnce();
		if (sendButtonView) {
			var parentView = sendButtonView.parent();
			if (parentView) {
				parentView = parentView.parent();
				var viewBoundsInfo = getViewAreaInformation(parentView);
				var left = viewBoundsInfo.left;
				var right = viewBoundsInfo.right;
				var top = viewBoundsInfo.bottom;
				var bottom = device.height;
				var view = idEndsWith("name")
					.visibleToUser(true)
					.boundsInside(left, top, right, bottom)
					.findOnce();
				if (view) {
					childCount = view.childCount();
					if (childCount === 6) {
						return view.getChild(1);
					}
				}
			}
		}
	}

	function printObj(obj) {
		var arr = [];
		for (var k in obj) {
			arr.push(k);
		}
		arr.sort();
		log(arr);
	}

	function findSamePropViews(propFeature, filterFn) {
		var filterFn =
			filterFn ||
			function () {
				return true;
			};
		if (!(getObjType(propFeature) == "Object")) {
			var obj = {
				k1: "v1",
				k2: "v2",
				k3: "v3"
			};
			throw "请传入一个对象,格式如下" + JSON.stringify(obj);
		}
		var propFeature = propFeature || {};
		var mySelector = "";
		for (var k in propFeature) {
			if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
				mySelector +=
					k +
					"(" +
					propFeature[k][0] +
					"," +
					propFeature[k][1] +
					"," +
					propFeature[k][2] +
					"," +
					propFeature[k][3] +
					").";
				continue;
			}
			mySelector += k + '("' + propFeature[k] + '").';
		}
		mySelector += "visibleToUser().filter(filterFn).find()";
		var searchResult = eval(mySelector);
		return searchResult;
	}

	function coordinateCommandThread(command, duration) {
		var flag = false;
		var duration = duration || 1000;
		var arg = arguments[2];
		var threadId = threads.start(function () {
			command(arg);
			flag = true;
		});
		var startTime = new Date().getTime();
		while (1) {
			sleep(300);
			var endTime = new Date().getTime();
			var spendTime = endTime - startTime;
			if (spendTime > duration || flag) {
				if (threadId && threadId.isAlive()) {
					threadId.interrupt();
				}
				break;
			}
		}
	}

	function clickViewThread(propFeature, duration) {
		var propFeature = propFeature || {};
		var duration = duration || 1000;
		var command = function (propFeature) {
			if (!(getObjType(propFeature) == "Object")) {
				var obj = {
					k1: "v1",
					k2: "v2",
					k3: "v3"
				};
				log("传入的内容是");
				log(propFeature);
				throw "请传入一个对象,格式如下" + JSON.stringify(obj);
			}
			var propFeature = propFeature || {};
			var mySelector = "";
			for (var k in propFeature) {
				if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
					mySelector +=
						k +
						"(" +
						propFeature[k][0] +
						"," +
						propFeature[k][1] +
						"," +
						propFeature[k][2] +
						"," +
						propFeature[k][3] +
						").";
					continue;
				}
				mySelector += k + '("' + propFeature[k] + '").';
			}
			mySelector += "visibleToUser(true).findOnce()";
			var searchResult = eval(mySelector);
			if (searchResult) {
				clickView(searchResult);
			}
		};
		coordinateCommandThread(command, duration, propFeature);
	}

	function moveViewToScreenUpperMiddle(propFeature, count) {
		var count = count || 3;
		var propFeature = propFeature || {};
		var mySelector = "";
		for (var k in propFeature) {
			if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
				mySelector +=
					k +
					"(" +
					propFeature[k][0] +
					"," +
					propFeature[k][1] +
					"," +
					propFeature[k][2] +
					"," +
					propFeature[k][3] +
					").";
				continue;
			}
			mySelector += k + '("' + propFeature[k] + '").';
		}
		mySelector += "visibleToUser(true).findOnce()";
		log("mySelector" + "=" + mySelector);
		log("count=" + count);
		for (var i = 0; i < count; i++) {
			log("i=" + i);
			var view = eval(mySelector);
			if (view) {
				log(view);
				var top = getViewAreaInformation(view).top;
				if (top < device.height / 4 * 1 || top > device.height / 4 * 3) {
					common.slippery('up');
					log("上滑了一次");
					sleep(1000);
				} else {
					log("已经将指定view滑到屏幕上方");
					break;
				}
			} else {
				log("没找到指定view");
				common.slippery('up');
				log("上滑了一次");
				sleep(1000);
			}
			sleep(1000);
		}
	}
	function getViewsInTheSpecifiedRange(left, top, right, bottom) {
		var views = visibleToUser(true).boundsInside(left, top, right, bottom).find()
		var viewsLength = views.length
		var idArr = []
		var textArr = []
		var descArr = []
		for (var i = 0; i < viewsLength; i++) {
			var view = views[i]
			var viewId = view.id()
			var viewText = view.text()
			var viewDesc = view.desc()
			if (viewId && !(idArr.indexOf(viewId) > -1)) {
				idArr.push(viewId)
			}
			if (viewText && !(textArr.indexOf(viewText) > -1)) {
				textArr.push(viewText)
			}
			if (viewDesc && !(descArr.indexOf(viewDesc) > -1)) {
				descArr.push(viewDesc)
			}
		}
		var result = {
			idArr: idArr,
			textArr: textArr,
			descArr: descArr,
		}
		return result
	}
	function isEndsWith(str, tail) {
		var reg = new RegExp(tail + '$')
		return reg.test(str)
	}
	function 指定app是否已经打开(appName) {
		var appPackageName = getPackageName(appName);
		var currentPackageName = currentPackage();
		log('appPackageName=' + appPackageName)
		log('currentPackageName=' + currentPackageName)
		if (appPackageName === currentPackageName) {
			return true;
		} else {
			return false
		}
	}
	function stopOtherScript() {
		(function () {
			enginesAll = engines.all()
			log(enginesAll)
			enginesAll.map((ScriptEngine) => {
				log('engines.myEngine().toString()=' + engines.myEngine().toString())
				log('ScriptEngine=' + ScriptEngine)
				if (engines.myEngine().toString() == ScriptEngine.toString()) { } else {
					console.log('即将停止的脚本引擎' + ScriptEngine)
					ScriptEngine.forceStop()
				}
			})
			sleep(1000)
		})()
	}
	var common = {};
	common.getSDPath = getSDPath;
	common.myLog = myLog;
	common.exist = exist;
	common.getObjType = getObjType;
	common.randomDelay = randomDelay;
	common.提取控件区域信息从控件的字符串描述中 = 提取控件区域信息从控件的字符串描述中;
	common.getViewAreaInformation = getViewAreaInformation;
	common.doubleClick = doubleClick;
	common.clickView = clickView;
	common.ring = ring;
	common.打开app = 打开app;
	common.getLatestApp = getLatestApp;
	common.getAppVersion = getAppVersion;
	common.getFileModificationTime = getFileModificationTime;
	common.getFileLength = getFileLength;
	common.md5 = md5;
	common.getScreenOrientation = getScreenOrientation;
	common.getTime = getTime;
	common.getAppIcon = getAppIcon;
	common.getEditDistance = getEditDistance;
	common.getAllAppNames = getAllAppNames;
	common.getAllText = getAllText;
	common.randomStr = randomStr;
	common.slippery = slippery;
	common.getDeflateWebPage = getDeflateWebPage;
	common.getGzipWebPage = getGzipWebPage;
	common.strip = strip;
	common.isLargeArrayContainsSmallArray = isLargeArrayContainsSmallArray;
	common.deepCopy = deepCopy;
	common.oppositeColor = oppositeColor;
	common.dateToTimestamp = dateToTimestamp;
	common.Command = Command;
	common.getDeviceModel = getDeviceModel;
	common.readNonBlankLines = readNonBlankLines;
	common.rndReadNonBlankLines = rndReadNonBlankLines;
	common.readFirstLineNonBlank = readFirstLineNonBlank;
	common.scanFile = scanFile;
	common.stopThread = stopThread;
	common.continuousClick = continuousClick;
	common.deletedLine = deletedLine;
	common.getLineAndDelete = getLineAndDelete;
	common.randomPress = randomPress;
	common.firstImg = firstImg;
	common.查找QQ群聊天界面底部图片按钮 = 查找QQ群聊天界面底部图片按钮;
	common.printObj = printObj;
	common.findSamePropViews = findSamePropViews;
	common.coordinateCommandThread = coordinateCommandThread;
	common.clickViewThread = clickViewThread;
	common.moveViewToScreenUpperMiddle = moveViewToScreenUpperMiddle;
	common.rndReadLineNonBlank = rndReadLineNonBlank;
	common.getViewsInTheSpecifiedRange = getViewsInTheSpecifiedRange;
	common.isEndsWith = isEndsWith;
	common.指定app是否已经打开 = 指定app是否已经打开;
	common.rand = rand;
	common.stopOtherScript = stopOtherScript;
	return common;
})();
