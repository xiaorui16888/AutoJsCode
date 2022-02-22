"ui";
/*
    Command Assistant (命令助手)
    Copyright (C) 2017-2018  ProjectXero
    E-mail: projectxero@163.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see [http://www.gnu.org/licenses/].
*/
function attackHook(attacker, victim) {}
function chatHook(str) {}
function continueDestroyBlock(x, y, z, side, progress) {}
function destroyBlock(x, y, z, side) {}
function projectileHitEntityHook(projectile, targetEntity) {}
function eatHook(hearts, saturationRatio) {}
function entityAddedHook(entity) {}
function entityHurtHook(attacker, victim, halfhearts) {}
function entityRemovedHook(entity) {}
function explodeHook(entity, x, y, z, power, onFire) {}
function serverMessageReceiveHook(str) {}
function deathHook(attacker, victim) {}
function playerAddExpHook(player, experienceAdded) {}
function playerExpLevelChangeHook(player, levelsAdded) {}
function redstoneUpdateHook(x, y, z, newCurrent, someBooleanIDontKnow, blockId, blockData) {}
function screenChangeHook(screenName) {}
function newLevel() {}
function startDestroyBlock(x, y, z, side) {}
function projectileHitBlockHook(projectile, blockX, blockY, blockZ, side) {}
function modTick() {}
function leaveGame() {}
function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {}
function initialize() {}
function unload() {}

var MapScript = {
	//世界目录
	baseDir : android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftWorlds/",

	//可访问钩子
	hooks : ["attackHook", "chatHook", "continueDestroyBlock", "destroyBlock", "projectileHitEntityHook", "eatHook", "entityAddedHook", "entityHurtHook", "entityRemovedHook", "explodeHook", "serverMessageReceiveHook", "deathHook", "playerAddExpHook", "playerExpLevelChangeHook", "redstoneUpdateHook", "screenChangeHook", "newLevel", "startDestroyBlock", "projectileHitBlockHook", "modTick", "leaveGame", "useItem", "initialize", "unload"],

	//已加载模块列表
	modules : [],

	//重置函数代码
	clearCode : function(func) {
		if (!(func in this) || typeof this[func] != "function") return null;
		var q = this[func].toString();
		q = q.slice(q.indexOf("function"), q.indexOf("{"));
		return this[func] = eval("(" + q + "{})");
	},

	//补充函数代码
	addCode : function(func, code) {
		if (!(func in this) || typeof this[func] != "function") return null;
		var q = this[func].toString();
		q = q.slice(q.indexOf("function"), q.lastIndexOf("}"));
		return this[func] = eval("(" + q + code + "})");
	},

	//读取并解析JSON-EX
	readJSON : function(path, defaultValue, gzipped) {
		try{
			if (!(new java.io.File(path)).isFile()) return defaultValue;
			var rd, s = [], q;
			if (gzipped) {
				rd = new java.io.BufferedReader(new java.io.InputStreamReader(new java.util.zip.GZIPInputStream(new java.io.FileInputStream(path))));
			} else {
				rd = new java.io.BufferedReader(new java.io.FileReader(path));
			}
			while (q = rd.readLine()) s.push(q);
			rd.close();
			return eval("(" + s.join("\n") + ")");
		} catch(e) {
			return defaultValue;
		}
	},

	//保存JSON-EX
	saveJSON : function(path, object, gzipped) {
		var wr;
		var f = new java.io.File(path).getParentFile();
		if (f) f.mkdirs();
		if (gzipped) {
			wr = new java.util.zip.GZIPOutputStream(new java.io.FileOutputStream(path));
		} else {
			wr = new java.io.FileOutputStream(path);
		}
		wr.write(new java.lang.String(this.toSource(object)).getBytes());
		wr.close();
	},

	//加载模块
	loadModule : function(name, obj, ignoreHook) {
		var i, sn, dx = this.modules.indexOf(name);
		if (obj === undefined && dx >= 0) {
			delete this.global[name];
		} else if (!(name in this.global) || dx >= 0) {
			this.global[name] = obj;
			if (dx < 0) this.modules.push(name);
			if (!ignoreHook && (obj instanceof Object)) {
				if (typeof obj.onCreate == "function") obj.onCreate();
				sn = this.toSource(name);
				for (i in obj)
					if (typeof obj[i] == "function" && this.hooks.indexOf(i) >= 0 && this.global[i].length == obj[i].length)
						this.addCode.call(this.global, i, "this[" + sn + "]." + i + ".apply(this[" + sn + "],arguments);");
			}
		} else return false;
		return true;
	},

	//返回对象源代码
	toSource : function(obj) {
		var strtok = ["\\\\", "\\n", "\\t", /*"\\b",*/ "\\r", "\\f", "\\\"", "\\\'"];
		var _toJSON = function toJSON(x, lev) {
			var p = "", r, i;
			if (lev < 0) return String(x);
			if (typeof x == "string") {
				for (i = 0; i < strtok.length; i++) x = x.replace(new RegExp(strtok[i], "g"), strtok[i]);
				return "\"" + x + "\"";
			} else if (Array.isArray(x)) {
				r = new Array();
				for (i = 0; i < x.length; i++) r.push(toJSON(x[i], lev - 1));
				p = "[" + r.join(",") + "]";
			} else if (x instanceof Error) {
				p = "new Error(" + toJSON(x.message) + ")";
			} else if (x instanceof RegExp) {
				p = x.toString();
			} else if (x instanceof Date) {
				p = "new Date(" + x.getTime() + ")";
			} else if (x instanceof Function) {
				p = x.toString();
			} else if (x instanceof Object) {
				r = new Array();
				for (i in x) r.push(toJSON(i, lev) + ":" + toJSON(x[i], lev - 1));
				p = "{" + r.join(",") + "}";
			} else {
				p = String(x);
			}
			return p;
		}
		return _toJSON(obj, 32);
	},

	//初始化
	init : function(g) {
		Object.defineProperty(this, "global", {
			enumerable: false,
			configurable: false,
			writable: false,
			value: g
		});
		if ("module" in g) { //Node.js
			module.exports = function(name) {
				return g[name];
			}
		}
	},

	initialize : function() {
		this.global.initialize();
	}
}
MapScript.init(this);

MapScript.loadModule("ctx", (function(global) {
	if ("ModPE" in global) { //以ModPE脚本加载(BlockLauncher及衍生App)
		MapScript.host = "BlockLauncher";
		return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	} else if ("activity" in global) { //以AutoJS脚本加载（UI模式）
		MapScript.host = "AutoJs";
		return activity;
	} else if ("context" in global) { //以AutoJS脚本加载（非UI模式）
		MapScript.host = "AutoJsNoUI";
		return context;
	} else if ("ScriptActivity" in global) { //在Android脚本外壳中加载
		MapScript.host = "Android";
		return ScriptActivity;
	} else if ("World" in global) { //在Inner Core中加载
		MapScript.host = "InnerCore";
		return Packages.zhekasmirnov.launcher.utils.UIUtils.getContext();
	} else {
		MapScript.host = "Unknown";
		return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	}
})(this));

MapScript.loadModule("gHandler", new android.os.Handler(ctx.getMainLooper()));

MapScript.loadModule("erp", function self(error) {
	var tech = [error, "\n版本: 2018-05-16\n堆栈: ", error.stack, "\n来源: ", error.fileName, "\n包名: ", ctx.getPackageName(), "\nSDK版本: ", android.os.Build.VERSION.SDK_INT].join("");
	if (MapScript.host == "BlockLauncher") tech += "\nMinecraft版本: " + ModPE.getMinecraftVersion();
	if (error.javaException) {
		var strw = new java.io.StringWriter(), strp = new java.io.PrintWriter(strw);
		error.javaException.printStackTrace(strp);
		tech += "\nJavaException: " + strw.toString();
	}
	android.util.Log.e("CA", tech);
	try {
		var fs = new java.io.PrintWriter(new java.io.FileOutputStream(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/com.xero.ca.error.log", true));
		fs.println("* Error: " + new Date().toLocaleString());
		fs.println(tech);
		fs.close();
	} catch(e) {
		android.util.Log.e("CA", e);
	}
	if (self.count) {
		self.count++;
	} else {
		self.count = 1;
	}
	if (self.count > 10) return;
	gHandler.post(new java.lang.Runnable({run : function() {try {
		android.widget.Toast.makeText(ctx, error.fileName + "出现了一个错误：" + error + "\n查看对话框获得更多信息。", 0).show();
		var dialog = new android.app.AlertDialog.Builder(ctx);
		dialog.setTitle("错误");
		dialog.setCancelable(false);
		dialog.setMessage("您好，" + error.fileName + "出现了一个错误。您可以将这个错误反馈给我们，来推动这个Mod的更新。您也可以选择忽略。作者联系方式：QQ-814518615(Xero)\n\n错误信息：\n" + tech);
		dialog.setPositiveButton("忽略", new android.content.DialogInterface.OnClickListener({
			onClick : function(dia,w) {
				dia.dismiss();
			}
		}));
		dialog.setNegativeButton("立即停止", new android.content.DialogInterface.OnClickListener({
			onClick : function(dia,w) {
				unload()
				ctx.finish();
			}
		}));
		dialog.setNeutralButton("复制错误信息", new android.content.DialogInterface.OnClickListener({
			onClick : function(dia,w) {try {
				ctx.getSystemService(ctx.CLIPBOARD_SERVICE).setText(tech);
				android.widget.Toast.makeText(ctx, "错误信息已复制", 0).show();
				dia.dismiss();
			} catch(e) {}}
		}));
		dialog.show();
	} catch(e) {}}}));
});

MapScript.loadModule("Loader", {
	loading : false,
	load : function(f) {
		var lto, lm, lmb;
		if (MapScript.host == "Android") {
			lm = MapScript.loadModule;
			lmb = lm.bind(MapScript);
			MapScript.loadModule = function(name, obj, ignoreHook) {
				gHandler.post(function() {try {
					ScriptActivity.setLoadingTitle("正在加载模块：" + name);
				} catch(e) {erp(e)}});
				lmb(name, obj, ignoreHook);
			};
		}
		this.loading = true;
		if (MapScript.host != "Android") {
			gHandler.post(function() {try {
				lto = android.widget.Toast.makeText(ctx, "命令助手 by ProjectXero\n基于Rhino (" + MapScript.host + ")\n加载中……", 1);
				lto.setGravity(android.view.Gravity.CENTER, 0, 0);
				lto.show();
			} catch(e) {erp(e)}});
		}
		var th = new java.lang.Thread(new java.lang.Runnable({run : function() {try { //Async Loading
			f();
			gHandler.post(function() {try {
				if (lto) lto.cancel();
				if (lm) ScriptActivity.setLoadingTitle("初始化模块……");
			} catch(e) {erp(e)}});
			if (lm) MapScript.loadModule = lm;
			Loader.loading = false;
			MapScript.initialize();
		} catch(e) {erp(e)}}}));
		th.start();
	},
});

Loader.load(function() {

"IGNORELN_START";
MapScript.loadModule("G", {
	onCreate : function() {
		var t;
		t = ctx.getResources().getDisplayMetrics();
		this.screenHeight = t.heightPixels;
		this.screenWidth = t.widthPixels;
		this.dp = t.density;
		this.sp = t.scaledDensity;
	},
	initialize : function() {
		if (android.os.Build.VERSION.SDK_INT >= 21) {
			this.style = "Material";
			ctx.setTheme(android.R.style.Theme_Material_Light);
		} else if (android.os.Build.VERSION.SDK_INT >= 11) {
			this.style = "Holo";
			ctx.setTheme(android.R.style.Theme_Holo_Light);
			this.ui(function() {try {
				G.Toast.makeText(ctx, "您的Android版本低于5.0，不支持Material Design风格。已使用Holo风格替换，界面可能与预览图不同。", 1).show();
			} catch(e) {erp(e)}});
		} else {
			this.style = "Basic";
			ctx.setTheme(android.R.style.Theme_Light);
			this.ui(function() {try {
				G.Toast.makeText(ctx, "您的Android版本低于3.0，不支持Material Design风格。已使用安卓默认风格替换，界面可能与预览图不同。", 1).show();
			} catch(e) {erp(e)}});
		}
	},
	ui : (function() {
		return ctx.runOnUiThread ? ctx.runOnUiThread.bind(ctx) : gHandler.post.bind(gHandler);
	})(),
//IMPORTS_BEGIN
	AbsListView: android.widget.AbsListView,
	AccelerateInterpolator: android.view.animation.AccelerateInterpolator,
	AdapterView: android.widget.AdapterView,
	AlertDialog: android.app.AlertDialog,
	AlphaAnimation: android.view.animation.AlphaAnimation,
	Animation: android.view.animation.Animation,
	AnimationSet: android.view.animation.AnimationSet,
	BackgroundColorSpan: android.text.style.BackgroundColorSpan,
	Bitmap: android.graphics.Bitmap,
	BitmapDrawable: android.graphics.drawable.BitmapDrawable,
	BitmapFactory: android.graphics.BitmapFactory,
	BitmapShader: android.graphics.BitmapShader,
	BulletSpan: android.text.style.BulletSpan,
	Button: android.widget.Button,
	Canvas: android.graphics.Canvas,
	CheckBox: android.widget.CheckBox,
	Color: android.graphics.Color,
	ColorDrawable: android.graphics.drawable.ColorDrawable,
	CompoundButton: android.widget.CompoundButton,
	DecelerateInterpolator: android.view.animation.DecelerateInterpolator,
	EditText: android.widget.EditText,
	EditorInfo: android.view.inputmethod.EditorInfo,
	ForegroundColorSpan: android.text.style.ForegroundColorSpan,
	FrameLayout: android.widget.FrameLayout,
	Gravity: android.view.Gravity,
	GridView: android.widget.GridView,
	HorizontalScrollView: android.widget.HorizontalScrollView,
	Html: android.text.Html,
	ImageSpan: android.text.style.ImageSpan,
	ImageView: android.widget.ImageView,
	InputMethodManager: android.view.inputmethod.InputMethodManager,
	InputType: android.text.InputType,
	LinearInterpolator: android.view.animation.LinearInterpolator,
	LinearLayout: android.widget.LinearLayout,
	LinkMovementMethod: android.text.method.LinkMovementMethod,
	ListAdapter: android.widget.ListAdapter,
	ListView: android.widget.ListView,
	MotionEvent: android.view.MotionEvent,
	Paint: android.graphics.Paint,
	Path: android.graphics.Path,
	PixelFormat: android.graphics.PixelFormat,
	PopupWindow: android.widget.PopupWindow,
	ProgressBar: android.widget.ProgressBar,
	R: android.R,
	RadioButton: android.widget.RadioButton,
	Rect: android.graphics.Rect,
	ScaleAnimation: android.view.animation.ScaleAnimation,
	ScrollView: android.widget.ScrollView,
	SeekBar: android.widget.SeekBar,
	Selection: android.text.Selection,
	Shader: android.graphics.Shader,
	Space: android.widget.Space,
	SpanWatcher: android.text.SpanWatcher,
	SpannableString: android.text.SpannableString,
	SpannableStringBuilder: android.text.SpannableStringBuilder,
	Spanned: android.text.Spanned,
	StrikethroughSpan: android.text.style.StrikethroughSpan,
	StyleSpan: android.text.style.StyleSpan,
	SubscriptSpan: android.text.style.SubscriptSpan,
	SuperscriptSpan: android.text.style.SuperscriptSpan,
	Surface: android.view.Surface,
	TableLayout: android.widget.TableLayout,
	TableRow: android.widget.TableRow,
	TextUtils: android.text.TextUtils,
	TextView: android.widget.TextView,
	TextWatcher: android.text.TextWatcher,
	Toast: android.widget.Toast,
	TranslateAnimation: android.view.animation.TranslateAnimation,
	Typeface: android.graphics.Typeface,
	TypefaceSpan: android.text.style.TypefaceSpan,
	UnderlineSpan: android.text.style.UnderlineSpan,
	ValueAnimator: android.animation.ValueAnimator,
	View: android.view.View,
	ViewConfiguration: android.view.ViewConfiguration,
	ViewGroup: android.view.ViewGroup,
	WebView: android.webkit.WebView,
	WindowManager: android.view.WindowManager
//IMPORTS_END
});
"IGNORELN_END";

MapScript.loadModule("CA", {//CommandAssistant 命令助手
	icon : null,
	qbar : null,
	gen : null,
	con : null,
	cmd : null,
	history : null,
	assist : null,
	fcs : null,
	paste : null,
	
	his : null,
	fav : null,
	cmdstr : "",
	settings : {},
	fine : false,
	
	profilePath : MapScript.baseDir + "xero_commandassist.dat",
	version : "0.9.7",
	publishDate : "2018-05-16",
	help : '{HELP}',
	tips : [],
	
	initialize : function() {try {
		this.supportFloat = MapScript.host == "AutoJs" || MapScript.host == "Android";
		if (this.supportFloat) {
			if (SettingsCompat.ensureCanFloat()) {
				this.showContentView(true);
			} else {
				this.showContentView(false);
				this.supportFloat = false;
				Common.showConfirmDialog({
					title : "警告\n\n命令助手无法获取到系统悬浮窗权限，已切换为弹窗模式。\n下次打开时将重新检测。",
					buttons : ["立即重启", "暂时忽略"],
					callback : function(id) {
						if (id == 1) return;
						unload();
						initialize();
					}
				});
			}
		}
		this.load();
		this.checkFeatures();
		if (!this.hasFeature("enableCommand")) {
			Common.showTextDialog("兼容性警告\n\n您的Minecraft PE版本过低（" + getMinecraftVersion() + "），没有命令和命令方块等功能，无法正常使用命令助手。请升级您的Minecraft PE至1.2及以上。");
		} else if (!this.hasFeature("enableCommandBlock")) {
			Common.showTextDialog("兼容性警告\n\n您的Minecraft PE版本较低（" + getMinecraftVersion() + "），可以使用命令，但没有命令方块等功能，部分命令助手的功能可能无法使用。推荐升级您的Minecraft PE至1.2及以上。");
		} else if (this.hasFeature("version_1_1")) {
			Common.showTextDialog("兼容性警告\n\n您的Minecraft PE版本较低（" + getMinecraftVersion() + "），可以使用命令，但没有ID表，且选择器部分有bug。推荐升级您的Minecraft PE至1.2及以上。");
		}
		Common.toast("命令助手 " + this.version + " by ProjectXero\n\n" + this.getTip(), 1);
		this.fine = true;
		this.screenChangeHook();
	} catch(e) {erp(e)}},
	unload : function() {
		CA.trySave();
		G.ui(CA.resetGUI);
	},
	chatHook : function(s) {try {
		var i;
		if ((/^\//).test(s)) this.addHistory(s);
		if (s == "cadebug") Common.showDebugDialog();
	} catch(e) {erp(e)}},
	screenChangeHook : function self(screenName) {try {
		if (screenName) {
			self.l = screenName;
		} else {
			screenName = self.l;
		}
		if (!this.fine) return;
		if (MapScript.host != "BlockLauncher" || !this.settings.autoHideIcon || (this.settings.topIcon && PWM.getCount() > 0)) return this.showIcon();
		if (screenName == "chat_screen" || screenName == "command_block_screen" || (this.cmdstr.length && screenName == "hud_screen")) {
			this.showIcon();
		} else {
			this.hideIcon();
		}
	} catch(e) {erp(e)}},
	load : function() {
		var f = MapScript.readJSON(this.profilePath, null, true), t;
		if (f && Array.isArray(f.history) && (f.favorite instanceof Object) && (f.settings instanceof Object)) {
			this.his = f.history;
			this.fav = f.favorite;
			this.cmdstr = f.cmd ? String(f.cmd) : "";
			this.settings = f.settings;
			if (f.theme) {
				f.settings.alpha = f.settings.alpha ? 0.75 : 1;
				Common.loadTheme(f.theme);
			} else {
				Common.loadTheme(f.settings.theme);
			}
			if (!f.settings.enabledLibrarys) f.settings.enabledLibrarys = Object.keys(this.IntelliSense.inner);
			if (!f.settings.disabledLibrarys) f.settings.disabledLibrarys = [];
			if (f.settings.libPath) {
				this.IntelliSense.enableLibrary(f.settings.libPath);
				delete f.settings.libPath;
			}
			if (f.library) {
				Common.showFileDialog({
					type : 1,
					callback : function(f) {
						var t;
						MapScript.saveJSON(t = String(f.result.getAbsolutePath()), f.l);
						CA.IntelliSense.enableLibrary(t);
						CA.IntelliSense.initLibrary();
						Common.toast("命令库已保存");
					},
					l : f.library
				});
				Common.showTextDialog("兼容性警告\n\n由于版本更新，命令助手已不再支持旧版无文件基础的自定义命令库，请选择一个位置来保存当前的命令库，以避免不必要的数据丢失。\n\n您也可以选择忽略。");
			}
			Object.keys(this.IntelliSense.inner).forEach(function(e) {
				if (this.enabledLibrarys.indexOf(e) < 0 && this.disabledLibrarys.indexOf(e) < 0) this.enabledLibrarys.push(e);
			}, this.settings);
			if (isNaN(f.settings.firstUse)) {
				f.settings.firstUse = Date.parse(this.publishDate) - 30 * 24 * 60 * 60 * 1000; //30d
			}
			if (isNaN(f.settings.nextAskSupport)) {
				f.settings.nextAskSupport = Date.now() + 30 * 24 * 60 * 60 * 1000; //30d
			}
			if (f.settings.icon == undefined) f.settings.icon = "default";
			if (!Array.isArray(this.fav)) {
				this.fav = Object.keys(f.favorite).map(function(e) {
					return {
						key : e,
						value : f.favorite[e]
					};
				});
			}
			if (Date.parse(f.publishDate) < Date.parse("2017-10-22")) {
				f.settings.senseDelay = true;
				f.settings.topIcon = true;
			}
			if (Date.parse(f.publishDate) < Date.parse("2018-03-10")) {
				f.settings.pasteMode = f.settings.disablePaste ? 0 : 1;
			}
			
			this.IntelliSense.initLibrary(function(flag) {
				if (!flag) Common.toast("有至少1个拓展包无法加载，请在设置中查看详情");
			});
			if (Date.parse(f.publishDate) < Date.parse(this.publishDate)) {
				Updater.showNewVersionInfo(f.publishDate);
			}
		} else {
			this.his = [
				"/say 你好，我是命令助手！左边是历史，右边是收藏，可以拖来拖去，也可以长按编辑哦"
			];
			this.fav = [{
				key : "获得命令方块",
				value : "/give @p command_block"
			}, {
				key : "关闭命令提示",
				value : "/gamerule commandblockoutput false"
			}, {
				key : "命令助手设置",
				value : "/help"
			}];
			this.cmdstr = "";
			this.settings = {
				firstUse : Date.now(),
				nextAskSupport : Date.now() + 30 * 24 * 60 * 60 * 1000,
				barTop : false,
				autoHideIcon : false,
				autoFormatCmd : false,
				alpha : 1,
				noAnimation : false,
				senseDelay : true,
				pasteMode : 1,
				historyCount : 0,
				splitScreenMode : false,
				keepWhenIME : false,
				topIcon : true,
				icon : "default",
				noWebImage : false,
				iconAlpha : 0,
				tipsRead : 0,
				iiMode : -1,
				enabledLibrarys : Object.keys(this.IntelliSense.inner),
				disabledLibrarys : []
			};
			Common.loadTheme();
			CA.checkFeatures();
			this.IntelliSense.initLibrary();
		}
	},
	save : function() {
		if (Common.theme) this.settings.theme = Common.theme.id;
		MapScript.saveJSON(this.profilePath, {
			history : this.his,
			favorite : this.fav,
			cmd : this.cmdstr,
			settings : this.settings,
			publishDate : this.publishDate
		}, true);
	},
	addHistory : function(t) {
		var i = this.his.indexOf(String(t));
		if (i >= 0) this.his.splice(i, 1);
		this.his.unshift(String(t));
		if (CA.settings.histroyCount) {
			this.his.splice(CA.settings.histroyCount);
		}
	},
	addFavorite : function(key, value, folder) {
		if (!folder) folder = this.fav;
		var t = this.getFavorite(key, folder);
		if (t) {
			t.value = value;
		} else {
			folder.push({
				key : key,
				value : value
			});
		}
	},
	getFavorite : function(key, folder) {
		var i;
		if (!folder) folder = this.fav;
		for (i in folder) {
			if (key == folder[i].key && !folder.children) return folder[i];
		}
		return null;
	},
	getFavoriteDir : function(key, folder) {
		var i, t;
		if (!folder) folder = this.fav;
		for (i in folder) {
			if (key == folder[i].key && folder.children) return folder[i];
		}
		folder.push(t = {
			key : key,
			children : []
		});
		return t;
	},
	removeFavorite : function(data, folder) {
		var i;
		if (!folder) folder = this.fav;
		i = folder.indexOf(data);
		if (i < 0) return;
		folder.splice(i, 1);
	},
	trySave : function() {
		try {
			this.save();
			return true;
		} catch(e) {
			Common.showTextDialog("命令助手无法在您的手机上运行：文件写入失败。\n原因可能为：\n1、您的内部存储没有足够的空间\n2、文件被保护\n3、未开放文件读写权限\n\n请检查您的系统。\n\n错误原因：" + e);
		}
		return false;
	},
	showIcon : function self() {G.ui(function() {try {
		if (!self.view) {
			var vcfg = G.ViewConfiguration.get(ctx);
			var longPressTimeout = vcfg.getLongPressTimeout();
			var touchSlop = vcfg.getScaledTouchSlop();
			self.view = new G.FrameLayout(ctx);
			self.view.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (PWM.onResume()) return;
				if (isNaN(CA.settings.iiMode) || CA.settings.iiMode < 0) {
					Common.toast("请选择智能模式");
					CA.showModeChooser(function() {
						v.postDelayed(function() {
							self.open();
						}, 150);
					});
					return;
				}
				self.open();
			} catch(e) {erp(e)}}}));
			self.view.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				switch (e.getAction()) {
					case e.ACTION_MOVE:
					if (touch.stead) {
						if (Math.abs(touch.lx - e.getRawX()) + Math.abs(touch.ly - e.getRawY()) < touchSlop) {
							break;
						}
						self.longClicked = false;
						touch.stead = false;
						self.animateTranslation(0);
					}
					if (CA.settings.iconDragMode == 2) break;
					CA.icon.update(self.cx = e.getRawX() + touch.offx, self.cy = e.getRawY() + touch.offy, -1, -1);
					break;
					case e.ACTION_DOWN:
					touch.offx = self.cx - (touch.lx = e.getRawX());
					touch.offy = self.cy - (touch.ly = e.getRawY());
					touch.stead = true;
					v.postDelayed(self.longClick, longPressTimeout);
					self.longClicked = true;
					self.cancelAnimator();
					return true;
					case e.ACTION_UP:
					if (touch.stead) {
						if (e.getEventTime() - e.getDownTime() < longPressTimeout) {
							v.performClick();
						}
					}
					case e.ACTION_CANCEL:
					self.refreshPos();
					CA.settings.iconX = self.cx;
					CA.settings.iconY = self.cy;
					self.longClicked = false;
				}
				self.icon.dispatchTouchEvent(e);
				return true;
			} catch(e) {return erp(e), true}}}));
			self.view.addOnLayoutChangeListener(new G.View.OnLayoutChangeListener({onLayoutChange : function(v, l, t, r, b, ol, ot, or, ob) {try {
				self.updateScreenInfo();
				if (self.cx < 0) self.cx = 0;
				if (self.cy < 0) self.cy = 0;
				if (self.cx > self.scrWidth) self.cx = self.scrWidth;
				if (self.cy > self.scrHeight) self.cy = self.scrHeight;
			} catch(e) {erp(e)}}}));
			self.longClick = new java.lang.Runnable({run : function() {try {
				if (self.longClicked && (PWM.getCount() == 0 || !self.lastState)) CA.showQuickBar();
				self.longClicked = false;
			} catch(e) {erp(e)}}});
			self.updateScreenInfo = function() {
				self.scrWidth = Common.getScreenWidth();
				self.scrHeight = Common.getScreenHeight();
			}
			self.animateToPos = function(x, y, dur, interpolator, callback) {
				if (!CA.icon) return;
				self.cancelAnimator();
				var xani, yani;
				self.xanimator = xani = G.ValueAnimator.ofInt([self.cx, x]);
				self.yanimator = yani = G.ValueAnimator.ofInt([self.cy, y]);
				xani.setDuration(dur);
				yani.setDuration(dur);
				if (interpolator) {
					xani.setInterpolator(interpolator);
					yani.setInterpolator(interpolator);
				}
				var updater = new java.lang.Runnable({run : function() {try {
					if (!CA.icon) return;
					CA.icon.update(self.cx = xani.getAnimatedValue(), self.cy = yani.getAnimatedValue(), -1, -1);
					if (!xani.isRunning()) {
						if (callback) callback();
						return;
					}
					gHandler.post(updater);
				} catch(e) {erp(e)}}});
				xani.start();
				yani.start();
				gHandler.post(updater);
			}
			self.cancelAnimator = function() {
				if (self.xanimator) {
					self.xanimator.cancel();
					self.yanimator.cancel();
					self.xanimator = self.yanimator = null;
				}
			}
			self.animateTranslation = function(offset, delay) {
				if (offset == self.icon.getTranslationX()) return;
				var animation = new G.TranslateAnimation(self.icon.getTranslationX() - offset, 0, 0, 0);
				animation.setDuration(100);
				self.icon.setTranslationX(offset);
				self.icon.startAnimation(animation);
			}
			self.open = function() {
				if (!CA.settings.topIcon) {
					CA.showGen(CA.settings.noAnimationm);
					CA.hideIcon();
					if (CA.paste) CA.hidePaste();
				} else if (PWM.getCount() > 0) {
					if (self.lastState = !self.lastState) {
						PWM.showAll();
					} else {
						PWM.hideAll();
					}
				} else {
					CA.showGen(CA.settings.noAnimation);
				}
				self.refreshAlpha();
			}
			self.refreshAlpha = function() {
				if (CA.settings.iconAlpha) {
					self.view.setAlpha(CA.settings.iconAlpha / 10);
				} else {
					self.view.setAlpha(self.lastState && PWM.getCount() > 0 ? 0.3 : 0.7);
				}
			}
			self.refreshPos = function() {
				if (CA.settings.iconDragMode == 1) {
					if (self.cx * 2 > self.scrWidth) {
						self.animateToPos(self.scrWidth, self.cy, 150, new G.AccelerateInterpolator(2.0), function() {
							self.animateTranslation(0.6 * self.view.getMeasuredWidth());
						});
					} else {
						self.animateToPos(0, self.cy, 150, new G.AccelerateInterpolator(2.0), function() {
							self.animateTranslation(-0.6 * self.view.getMeasuredWidth());
						});
					}
				} else {
					self.animateTranslation(0);
				}
			}
			self.refreshIcon = function() {
				if (!(CA.settings.iconSize > 0)) CA.settings.iconSize = 1;
				self.icon = CA.settings.icon in CA.Icon ? CA.Icon[CA.settings.icon](CA.settings.iconSize, false) : CA.customIcon(CA.settings.icon, CA.settings.iconSize);
				self.view.removeAllViews();
				self.view.addView(self.icon);
				self.refreshAlpha();
			}
			self.refresh = function() {
				self.refreshIcon();
				self.refreshAlpha();
				self.refreshPos();
			}
			self.lastState = true;
			PWM.registerResetFlag(CA, "icon");
			PWM.registerResetFlag(self, "view");
		}
		if (CA.icon) return self.refreshAlpha();
		self.updateScreenInfo();
		self.refreshIcon();
		if (isNaN(CA.settings.iconX)) {
			self.view.measure(0, 0);
			//ctx.getWindowManager().getDefaultDisplay().getRotation() == G.Surface.ROTATION_90
			CA.settings.iconX = 0;
			CA.settings.iconY = 0.25 * G.screenHeight - 0.5 * self.view.getMeasuredHeight();
		}
		CA.icon = new G.PopupWindow(self.view, -2, -2);
		if (CA.supportFloat) CA.icon.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		CA.icon.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.LEFT | G.Gravity.TOP, self.cx = CA.settings.iconX, self.cy = CA.settings.iconY);
		self.refreshPos();
		if (CA.settings.topIcon) {
			PWM.addFloat(CA.icon);
		} else {
			PWM.addPopup(CA.icon);
		}
	} catch(e) {erp(e)}})},
	hideIcon : function() {G.ui(function() {try {
		if (CA.icon) CA.icon.dismiss();
		CA.icon = null;
	} catch(e) {erp(e)}})},
	
	showQuickBar : function self() {G.ui(function() {try {
		if (!self.list) {
			self.list = new G.LinearLayout(ctx);
			self.list.setOrientation(G.LinearLayout.VERTICAL);
			self.list.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				if (e.getAction() == e.ACTION_DOWN) CA.hideQuickBar();
				return true;
			} catch(e) {return erp(e), true}}}));
			self.lp = new G.LinearLayout.LayoutParams(-1, -2);
		}
		if (CA.qbar) return;
		var i, e, a;
		self.list.removeAllViews();
		for (i in CA.QuickBar) {
			e = CA.QuickBar[i];
			a = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 1, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0);
			a.setDuration(100);
			a.setStartOffset(self.list.getChildCount() * 30);
			if (!e._view) {
				e._view = e.create(CA.hideQuickBar);
			}
			if (e.refresh) e.refresh();
			e._view.startAnimation(a);
			self.list.addView(e._view, self.lp);
		}
		CA.qbar = new G.PopupWindow(self.list, -2, -2);
		CA.qbar.setFocusable(true);
		if (CA.supportFloat) CA.qbar.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		CA.qbar.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.RIGHT | G.Gravity.TOP, 0, 0);
		PWM.addPopup(CA.qbar);
	} catch(e) {erp(e)}})},
	hideQuickBar : function() {G.ui(function() {try {
		if (CA.qbar) CA.qbar.dismiss();
		CA.qbar = null;
	} catch(e) {erp(e)}})},
	
	showGen : function self(noani) {G.ui(function() {try {
		if (CA.gen) CA.gen.dismiss();
		if (!self.main) {
			self.cmdEdit = [{
				text : "粘贴",
				onclick : function(v) {
					if (!Common.hasClipboardText()) return;
					Common.replaceSelection(CA.cmd.getText(), Common.getClipboardText());
				}
			},{
				text : "显示样式代码栏",
				onclick : function(v) {
					CA.showFCS(CA.cmd.getText());
				}
			},{
				text : "插入JSON/组件",
				onclick : function(v) {
					JSONEdit.create(function(data) {
						var showMenu = function() {
							Common.showOperateDialog([{
								text : "插入该JSON",
								onclick : function(v) {
									var k = MapScript.toSource(data);
									if ((/\S$/).test(CA.cmd.getText())) {
										k = " " + k;
									}
									CA.cmd.getText().append(CA.cmd.getText() + k);
								}
							},{
								text : "继续编辑",
								onclick : function(v) {
									if (!JSONEdit.show({
										source : data,
										rootname : "新JSON",
										update : function() {
											data = this.source;
											showMenu();
										}
									})) showMenu();
								}
							},{
								text : "取消",
								onclick : function(v) {}
							}]);
						}
						showMenu();
					});
				}
			},{
				text : "创建批量生成模板",
				onclick : function(v, tag) {
					CA.showBatchBuilder(tag.cmd);
				}
			},{
				text : "清空",
				onclick : function(v) {
					CA.cmd.setText("");
				}
			},{
				gap : 10 * G.dp
			},{
				text : "教程",
				onclick : function(v) {
					Tutorial.showList();
				}
			},{
				text : "设置",
				onclick : function(v) {
					CA.showSettings();
				}
			}];
			if (CA.supportFloat) {
				self.cmdEdit.push({
					text : "退出命令助手",
					onclick : function(v) {
						CA.performExit();
					}
				});
			}
			self.performClose = function(callback) {
				if (CA.settings.noAnimation) {
					CA.hideGen();
					if (callback) callback();
					return;
				}
				var animation = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, CA.settings.barTop ? -1 : 1);
				animation.setInterpolator(new G.AccelerateInterpolator(2.0));
				animation.setDuration(100);
				animation.setStartOffset(100);
				self.bar.startAnimation(animation);
				animation = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, CA.settings.barTop ? 1 : -1);
				animation.setInterpolator(new G.AccelerateInterpolator(2.0));
				animation.setDuration(200);
				animation.setAnimationListener(new G.Animation.AnimationListener({
					onAnimationEnd : function(a) {try {
						CA.hideGen();
						if (callback) callback();
					} catch(e) {erp(e)}},
					//onAnimationStart : function(a) {},
					//onAnimationRepeat : function(a) {},
				}));
				CA.con.startAnimation(animation);
			}
			self.performCopy = function(s) {
				s = String(s);
				Common.setClipboardText(s);
				CA.addHistory(s);
				if (CA.settings.pasteMode == 1) {
					CA.showPaste(0);
				} else if (CA.settings.pasteMode == 2) {
					self.performClose(function() {
						CA.performPaste(s);
					});
					return;
				}
				self.performClose();
			}
			self.activate = function(fl) {
				CA.cmd.requestFocus();
				CA.cmd.setSelection(CA.cmd.getText().length());
				if (fl) ctx.getSystemService(ctx.INPUT_METHOD_SERVICE).showSoftInput(CA.cmd, G.InputMethodManager.SHOW_IMPLICIT);
			}
			self.pointerChanged = function(p) {
				//即将支持
			}
			self.spanWatcher = new G.SpanWatcher({
				//onSpanAdded : function(text, what, start, end) {},
				//onSpanRemoved : function(text, what, start, end) {},
				onSpanChanged : function(text, what, ostart, oend, nstart, nend) {try {
					if (what === G.Selection.SELECTION_START) {
						self.pointerChanged(nstart);
					}
				} catch(e) {erp(e)}}
			});
			
			self.main = new G.LinearLayout(ctx);
			self.main.setOrientation(G.LinearLayout.VERTICAL);
			
			self.bar = new G.LinearLayout(ctx);
			self.bar.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.bar.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.bar, "bar_float");
			
			self.add = new G.TextView(ctx);
			self.add.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			self.add.setText("╋");
			self.add.setGravity(G.Gravity.CENTER);
			self.add.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.add, "textview_default", 3);
			self.add.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (CA.settings.iiMode == 1) {
					CA.Assist.active = true;
					CA.cmd.setFocusable(false);
					CA.cmd.setText(CA.cmdstr);
				} else {
					CA.cmd.setText("/");
					self.activate(true);
				}
			} catch(e) {erp(e)}}}));
			self.bar.addView(self.add);
			
			CA.cmd = new G.EditText(ctx);
			CA.cmd.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1, 1.0));
			if (CA.settings.genOpenedMenu) {
				CA.cmd.setHint("命令");
			} else {
				CA.cmd.setHint("在此输入命令|长按打开菜单");
			}
			Common.applyStyle(CA.cmd, "edittext_default", 3);
			CA.cmd.setInputType(G.InputType.TYPE_CLASS_TEXT | G.InputType.TYPE_TEXT_FLAG_AUTO_CORRECT);
			CA.cmd.setFocusableInTouchMode(true);
			CA.cmd.setPadding(5 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			CA.cmd.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
			CA.cmd.setTypeface(G.Typeface.MONOSPACE);
			CA.cmd.setText(CA.cmdstr);
			CA.cmd.addTextChangedListener(new G.TextWatcher({
				afterTextChanged : (function() {
					var state = -1;
					var rep = function(s) {
						FCString.clearSpans(s);
						FCString.colorFC(s, Common.theme.textcolor);
					}
					var gostate0 = function() {
						state = 0;
						CA.hideAssist(); CA.showHistory();
						self.copy.setText("关闭");
						self.add.setVisibility(G.View.VISIBLE);
						self.clear.setVisibility(G.View.GONE);
					}
					var gostate1 = function() {
						state = 1;
						if (CA.settings.iiMode == 2) {
							CA.hideHistory(); CA.showAssist();
							CA.Assist.hide(); CA.IntelliSense.show();
						} else {
							CA.hideAssist(); CA.showHistory();
						}
						self.copy.setText(CA.settings.pasteMode == 2 ? "粘贴" : "复制");
						self.add.setVisibility(G.View.GONE);
						self.clear.setVisibility(G.View.VISIBLE);
					}
					var gostate2 = function() {
						state = 2;
						CA.hideHistory(); CA.showAssist();
						CA.Assist.hide(); CA.IntelliSense.show();
						CA.IntelliSense.showHelp();
						self.copy.setText("关闭");
						self.add.setVisibility(G.View.GONE);
						self.clear.setVisibility(G.View.VISIBLE);
					}
					var gostate3 = function() {
						state = 3;
						CA.hideHistory(); CA.showAssist();
						CA.IntelliSense.hide(); CA.Assist.show(); CA.hideFCS();
						self.copy.setText(CA.settings.pasteMode == 2 ? "粘贴" : "复制");
						self.add.setVisibility(G.View.GONE);
						self.clear.setVisibility(G.View.GONE);
					}
					return function(s) {try {
						s.setSpan(self.spanWatcher, 0, s.length(), G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
						CA.cmdstr = String(s);
						if (CA.settings.iiMode == 1 && CA.Assist.active) {
							if (state != 3) gostate3();
						} else if (state != 2 && s == "/help") {
							gostate2();
						} else if (state != 1 && s.length() && s != "/help") {
							gostate1();
						} else if (state != 0 && !s.length()) {
							gostate0();
						}
						if (CA.fcs) CA.showFCS(s);
						if (CA.history) CA.showHistory();
						if (CA.settings.autoFormatCmd) rep(s);
						if (CA.settings.iiMode != 2 || state !== 1) return;
						if (CA.settings.senseDelay) {
							CA.IntelliSense.callDelay(String(s));
						} else {
							CA.IntelliSense.proc(String(s));
						}
					} catch(e) {erp(e)}}
				})()
				//beforeTextChanged : function(s, start, count, after) {},
				//onTextChanged : function(s, start, before, count) {},
			}));
			CA.cmd.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (CA.Assist.active) {
					CA.Assist.active = false;
					CA.cmd.setFocusableInTouchMode(true);
					CA.cmd.setText(CA.cmdstr);
					self.activate(true);
				}
			} catch(e) {erp(e)}}}));
			CA.cmd.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				var t;
				if (touch.ignore && e.getAction() != e.ACTION_DOWN) return true;
				switch (e.getAction()) {
					case e.ACTION_MOVE:
					t = e.getRawY() - touch.sy;
					if (Math.abs(t) + Math.abs(e.getRawX() - touch.sx) > 20 * G.dp && touch.cbk) {
						self.main.removeCallbacks(touch.cbk);
						touch.cbk = null;
					}
					if ((t < 0) == CA.settings.barTop) t = 0;
					if (touch.stead && Math.abs(t) < 20 * G.dp) break;
					touch.stead = false;
					self.main.setTranslationY(t);
					break;
					case e.ACTION_DOWN:
					touch.sx = e.getRawX();
					touch.sy = e.getRawY();
					touch.stead = true;
					touch.ignore = false;
					if (!CA.Assist.active) self.main.postDelayed(touch.cbk = new java.lang.Runnable({run : function() {try {
						Common.showOperateDialog(self.cmdEdit, {
							cmd : String(CA.cmd.getText())
						});
						CA.settings.genOpenedMenu = true;
						touch.cbk = null;
						touch(CA.cmd, G.MotionEvent.obtain(0, 0, G.MotionEvent.ACTION_CANCEL, 0, 0, 0, 0, 0, 0, 0, 0, 0));
					} catch(e) {erp(e)}}}), 300);
					break;
					case e.ACTION_CANCEL:
					touch.ignore = true;
					case e.ACTION_UP:
					if (touch.cbk) {
						self.main.removeCallbacks(touch.cbk);
						touch.cbk = null;
					}
					self.main.setTranslationY(0);
					if (e.getAction() == e.ACTION_CANCEL || touch.stead) return false;
					t = e.getRawY() - touch.sy;
					if ((t < 0) == CA.settings.barTop) t = 0;
					if (Math.abs(t) > 0.4 * self.main.getMeasuredHeight()) {
						if (CA.settings.noAnimation) {
							CA.hideGen();
						} else {
							t = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.ABSOLUTE, t, G.Animation.ABSOLUTE, -self.main.getMeasuredHeight());
							t.setInterpolator(new G.AccelerateInterpolator(2.0));
							t.setDuration(100);
							t.setAnimationListener(new G.Animation.AnimationListener({
								onAnimationEnd : function(a) {
									CA.hideGen();
								}
							}));
							self.main.startAnimation(t);
						}
					} else if (!CA.settings.noAnimation) {
						t = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.ABSOLUTE, t, G.Animation.RELATIVE_TO_SELF, 0);
						t.setInterpolator(new G.DecelerateInterpolator(2.0));
						t.setDuration(100);
						self.main.startAnimation(t);
					}
					return true;
				}
				return false;
			} catch(e) {return erp(e), true}}}));
			CA.cmd.getText().setSpan(self.spanWatcher, 0, CA.cmd.getText().length(), G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
			PWM.observe(function(action) {
				if (action == "showAll") G.ui(function() {try {
					CA.cmd.setText(CA.cmd.getText());
				} catch(e) {erp(e)}});
			});
			self.bar.addView(CA.cmd);
			
			self.clear = new G.TextView(ctx);
			self.clear.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			self.clear.setText("×");
			self.clear.setGravity(G.Gravity.CENTER);
			self.clear.setPadding(5 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.clear, "button_secondary", 3);
			self.clear.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				CA.cmd.setText("");
				self.activate(false);
			} catch(e) {erp(e)}}}));
			self.bar.addView(self.clear);
			
			self.copy = new G.TextView(ctx);
			self.copy.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			self.copy.setGravity(G.Gravity.CENTER);
			self.copy.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.copy, "button_reactive", 3);
			self.copy.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var t = CA.cmd.getText(), i, s = v.getText();
				if (s == "复制" || s == "粘贴") {
					self.performCopy(t);
				} else {
					self.performClose();
				}
				CA.cmd.setText("");
			} catch(e) {erp(e)}}}));
			self.copy.setOnTouchListener(new G.View.OnTouchListener({onTouch : function(v, e) {try {
				switch (e.getAction()) {
					case e.ACTION_DOWN:
					Common.applyStyle(v, "button_reactive_pressed", 3);
					break;
					case e.ACTION_CANCEL:
					case e.ACTION_UP:
					Common.applyStyle(v, "button_reactive", 3);
				}
				return false;
			} catch(e) {return erp(e), false}}}));
			self.copy.setOnLongClickListener(new G.View.OnLongClickListener({onLongClick : function(v) {try {
				EasterEgg.start();
				return true;
			} catch(e) {return erp(e), true}}}));
			self.bar.addView(self.copy);
			
			CA.con = new G.FrameLayout(ctx);
			CA.con.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1));
			Common.applyStyle(CA.con, "container_default")
			
			if (CA.settings.barTop) {
				self.main.addView(self.bar);
				self.main.addView(CA.con);
			} else {
				self.main.addView(CA.con);
				self.main.addView(self.bar);
			}
			
			PWM.registerResetFlag(CA, "con");
			PWM.registerResetFlag(CA, "cmd");
			PWM.registerResetFlag(self, "main");
		}
		CA.gen = new G.PopupWindow(self.main, -1, -1);
		if (CA.supportFloat) CA.gen.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		CA.gen.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		CA.gen.setFocusable(true);
		CA.gen.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NEEDED);
		CA.gen.setSoftInputMode(G.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
		CA.gen.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			if (PWM.busy) return; //避免在dismiss过程中修改窗口数组
			CA.screenChangeHook();
			CA.trySave();
		} catch(e) {erp(e)}}}));
		CA.gen.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(CA.gen);
		CA.cmd.setText(CA.cmd.getText());
		self.activate(false);
		if (noani) return;
		var animation = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, CA.settings.barTop ? -1 : 1, G.Animation.RELATIVE_TO_SELF, 0);
		animation.setInterpolator(new G.DecelerateInterpolator(2.0));
		animation.setDuration(100);
		animation.setStartOffset(100);
		self.bar.startAnimation(animation);
		animation = new G.TranslateAnimation(G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, CA.settings.barTop ? 1 : -1, G.Animation.RELATIVE_TO_SELF, 0);
		animation.setInterpolator(new G.DecelerateInterpolator(2));
		animation.setDuration(200);
		CA.con.startAnimation(animation);
	} catch(e) {erp(e)}})},
	hideGen : function() {G.ui(function() {try {
		if (CA.gen) CA.gen.dismiss();
		CA.gen = null;
	} catch(e) {erp(e)}})},
	
	showHistory : function self() {G.ui(function() {try {
		if (!self.history) {
			self.historyEdit = [{
				text : "复制",
				onclick : function(v, tag) {
					Common.setClipboardText(tag.cmd);
					Common.toast("已复制到您的剪贴板～");
				}
			},{
				text : "添加收藏",
				onclick : function(v, tag) {
					Common.showInputDialog({
						title : "添加收藏",
						description : "请给这条命令一个名字吧～\n\t有名字的命令才能被收藏",
						callback : function(s) {
							if (CA.getFavorite(s)) {
								Common.toast("名字重复了～换一个名字吧");
							} else {
								if (!s) s = tag.cmd;
								CA.addFavorite(s, tag.cmd);
								CA.showHistory();
							}
						},
						singleLine : true
					});
				}
			},{
				text : "删除",
				onclick : function(v, tag) {
					CA.his.splice(tag.pos, 1);
					Common.toast("删除啦～");
					CA.showHistory();
				}
			}, {
				text : "批量编辑",
				onclick : function(v, tag) {
					CA.showHistoryEdit(tag.pos, function() {
						CA.showHistory();
					});
				}
			}];
			self.favoriteEdit = [{
				text : "复制",
				onclick : function(v, tag) {
					Common.setClipboardText(tag.data.value);
					Common.toast("已复制到您的剪贴板～");
				}
			},{
				text : "从模板创建",
				onclick : function(v, tag) {
					CA.showBatchBuilder(tag.data.value, true);
				}
			},{
				text : "编辑名称",
				onclick : function(v, tag) {
					Common.showInputDialog({
						title : "编辑名称",
						callback : function(s) {
							if (!s) s = tag.data.value;
							tag.data.key = s;
							CA.showHistory();
						},
						singleLine : true,
						defaultValue : tag.data.key
					});
				}
			},{
				text : "编辑内容",
				onclick : function(v, tag) {
					Common.showInputDialog({
						title : "编辑内容",
						callback : function(s) {
							if (!s) {
								Common.toast("命令不能为空哦～");
							} else {
								tag.data.value = s;
								CA.showHistory();
							}
						},
						singleLine : true,
						defaultValue : tag.data.value
					});
				}
			},{
				text : "删除",
				onclick : function(v, tag) {
					CA.removeFavorite(tag.data);
					Common.toast("删除啦～");
					CA.showHistory();
				}
			}, {
				text : "批量编辑",
				onclick : function(v, tag) {
					CA.showFavoriteEdit(tag.data, function() {
						CA.showHistory();
					});
				}
			}];
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.HORIZONTAL);
			self.tag1 = new G.TextView(ctx);
			self.tag1.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
			self.tag1.setText("历史");
			self.tag1.setGravity(G.Gravity.LEFT);
			self.tag1.setPadding(10 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			self.tag1.setFocusable(true);
			Common.applyStyle(self.tag1, "textview_prompt", 1);
			self.history = new G.ListView(ctx);
			self.history.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				if (pos < 1 || !parent.getItemAtPosition(pos)) return;
				pos -= 1;
				CA.cmd.setText(CA.his[pos]);
				CA.showGen.activate(true);
			} catch(e) {erp(e)}}}));
			self.history.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({onItemLongClick : function(parent, view, pos, id) {try {
				if (pos < 1 || !parent.getItemAtPosition(pos)) return;
				pos -= 1;
				Common.showOperateDialog(self.historyEdit, {
					pos : parseInt(pos),
					cmd : CA.his[pos]
				});
				return true;
			} catch(e) {return erp(e), true}}}));
			self.history.addHeaderView(self.tag1);
			self.linear.addView(self.history);
			self.tag2 = new G.TextView(ctx);
			self.tag2.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
			self.tag2.setText("收藏");
			self.tag2.setGravity(G.Gravity.LEFT);
			self.tag2.setPadding(10 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			self.tag2.setFocusable(true);
			Common.applyStyle(self.tag2, "textview_prompt", 1);
			self.favorite = new G.ListView(ctx);
			self.favorite.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var t;
				if (pos < 1 || !(t = parent.getItemAtPosition(pos))) return;
				pos -= 1;
				CA.cmd.setText(t.value);
				CA.showGen.activate(false);
			} catch(e) {erp(e)}}}));
			self.favorite.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({onItemLongClick : function(parent, view, pos, id) {try {
				var t;
				if (pos < 1 || !(t = parent.getItemAtPosition(pos))) return;
				pos -= 1;
				Common.showOperateDialog(self.favoriteEdit, {
					data : t
				});
				return true;
			} catch(e) {return erp(e), true}}}));
			self.favorite.addHeaderView(self.tag2);
			self.linear.addView(self.favorite);
			CA.con.addOnLayoutChangeListener(self.layoutListener = new G.View.OnLayoutChangeListener({onLayoutChange : function(v, l, t, r, b, ol, ot, or, ob) {try {
				if (r - l == or - ol) return;
				self.screenWidth = r - l;
				if (CA.settings.splitScreenMode) {
					self.linear.setLayoutParams(new G.FrameLayout.LayoutParams(self.screenWidth, -1));
					self.history.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth * 0.5, -1));
					self.favorite.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth * 0.5, -1));
				} else {
					self.linear.setLayoutParams(new G.FrameLayout.LayoutParams(self.screenWidth * 2, -1));
					self.history.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth, -1));
					self.favorite.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth, -1));
				}
				if (self.tx < 0) self.linear.setTranslationX(self.tx = -self.screenWidth);
			} catch(e) {erp(e)}}}));
			self.hisa = function(s) {
				var layout = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.HORIZONTAL);
				text1.setPadding(15 * G.dp, 15 * G.dp, 0, 15 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1.0));
				text1.setText(s);
				text1.setMaxLines(2);
				text1.setEllipsize(G.TextUtils.TruncateAt.END);
				Common.applyStyle(text1, "textview_default", 3);
				layout.addView(text1);
				text2.setPadding(15 * G.dp, 0, 15 * G.dp, 0);
				text2.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
				text2.setText("📋");
				text2.setGravity(G.Gravity.CENTER);
				Common.applyStyle(text2, "textview_prompt", 3);
				text2.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					CA.showGen.performCopy(s);
					return true;
				} catch(e) {erp(e)}}}));
				layout.addView(text2);
				return layout;
			}
			self.fava = function(e) {
				var layout = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.VERTICAL);
				text1.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 5 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text1.setText(e.key);
				Common.applyStyle(text1, "textview_default", 3);
				layout.addView(text1);
				text2.setPadding(15 * G.dp, 0, 15 * G.dp, 15 * G.dp);
				text2.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text2.setText(e.value);
				text2.setEllipsize(G.TextUtils.TruncateAt.END);
				text2.setSingleLine(true);
				Common.applyStyle(text2, "textview_prompt", 1);
				layout.addView(text2);
				return layout;
			}
			self.nula = function(s) {
				var text = new G.TextView(ctx);
				text.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				text.setText("空空如也");
				text.setPadding(0, 40 * G.dp, 0, 40 * G.dp);
				text.setGravity(G.Gravity.CENTER);
				text.setFocusable(true);
				Common.applyStyle(text, "textview_prompt", 4);
				return text;
			}
			if (!CA.settings.splitScreenMode) {
				var touchSlop = G.ViewConfiguration.get(ctx).getScaledTouchSlop();
				var switchSlop = 80 * G.dp;
				self.scroller = new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
					var t, f;
					switch (e.getAction()) {
						case e.ACTION_MOVE:
						f = true; t = self.x;
						self.x = e.getRawX();
						if (self.vscr && Math.abs(e.getRawX() - self.sx) - Math.abs(e.getRawY() - self.sy) < touchSlop) break;
						//超过范围，开始滑动
						self.vscr = false;
						self.stead = false;
						//计算当前偏移量（当前点X-上个点X）
						self.tx += e.getRawX() - t;
						if (self.tx > 0) {
							self.tx = 0;
						} else if (self.tx < -self.screenWidth) {
							self.tx = -self.screenWidth;
						} else {
							f = false; //未超出范围
						}
						self.linear.setTranslationX(self.tx);
						if (f) break;
						if (self.cancelled) return true;
						e.setAction(e.ACTION_CANCEL);//取回控制权
						self.cancelled = true;
						break;
						case e.ACTION_DOWN:
						//开始点
						self.sx = self.x = e.getRawX();
						self.sy = e.getRawY();
						self.lx = self.tx; //上个偏移量状态
						self.vscr = true;
						self.cancelled = false;
						break;
						case e.ACTION_CANCEL:
						case e.ACTION_UP:
						if (self.vscr) break;
						t = self.tx; //计算偏移量
						self.tx = (Math.abs(t - self.lx) < switchSlop) ? self.lx : t < self.lx ? -self.screenWidth : 0;
						self.linear.setTranslationX(self.tx);
						if (!CA.settings.noAnimation) { //动画
							var animation = new G.TranslateAnimation(G.Animation.ABSOLUTE, t - self.tx, G.Animation.ABSOLUTE, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0);
							animation.setInterpolator(new G.DecelerateInterpolator(1.0));
							animation.setDuration(200);
							self.linear.startAnimation(animation);
						}
						if (self.cancelled) return true;
					}
					return false;
				} catch(e) {return erp(e), true}}});
				self.history.setOnTouchListener(self.scroller);
				self.favorite.setOnTouchListener(self.scroller);
			}
			PWM.registerResetFlag(CA, "history");
			PWM.registerResetFlag(self, "history");
		}
		if (CA.his.length == 0) {
			self.history.setAdapter(new RhinoListAdapter([null], self.nula));
		} else {
			self.history.setAdapter(new RhinoListAdapter(CA.his, self.hisa));
		}
		if (CA.fav.length == 0) {
			self.favorite.setAdapter(new RhinoListAdapter([null], self.nula));
		} else {
			self.favorite.setAdapter(new RhinoListAdapter(CA.fav, self.fava));
		}
		if (CA.paste) CA.showPaste.refresh();
		if (CA.history) return;
		CA.history = self.linear;
		self.linear.setTranslationX(self.tx = self.lx = 0);
		CA.con.addView(CA.history);
		self.layoutListener.onLayoutChange(CA.con, 0, 0, CA.con.getMeasuredWidth(), CA.con.getMeasuredHeight(), 0, 0, 0, 0);
	} catch(e) {erp(e)}})},
	hideHistory : function() {G.ui(function() {try {
		if (!CA.history) return;
		CA.con.removeView(CA.history);
		CA.history = null;
	} catch(e) {erp(e)}})},
	
	showAssist : function self() {G.ui(function() {try {
		if (CA.assist) return;
		if (!self.con) {
			self.htype = -1;
			self.htext = "";
			self.keep = true;
			self.hUpdate = false;
			self.postHelp = function(type, text) {
				if (type == self.htype && text == self.htext) return;
				self.htype = type;
				self.htext = text;
				self.hUpdate = true;
				self.hCheck();
			}
			self.hCheck = function() {G.ui(function() {try {
				if (!self.hUpdate) return;
				if (CA.settings.splitScreenMode || self.tx < 0) self.hLoad();
			} catch(e) {erp(e)}})}
			self.hLoad = function() {
				switch (self.htype) {
					case 0:
					self.help.loadUrl(self.htext);
					break;
					case 1:
					self.help.loadData(self.htext, "text/html; charset=UTF-8", null);
					break;
					default:
					self.help.loadUrl("about:blank");
					break;
				}
				self.hUpdate = false;
			}
			self.initBrowser = function(wv) {
				var ws = wv.getSettings();
				ws.setSupportZoom(true);
				ws.setJavaScriptEnabled(true);
				ws.setAllowFileAccess(true);
				ws.setAllowFileAccessFromFileURLs(true);
				ws.setAllowUniversalAccessFromFileURLs(true);
				ws.setSaveFormData(true);
				ws.setLoadWithOverviewMode(true);
				ws.setJavaScriptCanOpenWindowsAutomatically(true);
				ws.setLoadsImagesAutomatically(!CA.settings.noWebImage);
				ws.setAllowContentAccess(true);
				/*ws.setAppCachePath((new java.io.File(ctx.getCacheDir(), "com.xero.ca.webview")).getAbsolutePath());
				ws.setAppCacheEnabled(true);
				ws.setCacheMode(ws.LOAD_CACHE_ELSE_NETWORK);*/
			}
			self.initContent = function(v) {
				if (!CA.settings.splitScreenMode) {
					v.setOnTouchListener(self.scroller);
				}
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.HORIZONTAL);
			self.con = new G.FrameLayout(ctx);
			self.linear.addView(self.con);
			self.help = new G.WebView(ctx);
			self.initBrowser(self.help);
			self.linear.addView(self.help);
			CA.con.addOnLayoutChangeListener(self.layoutListener = new G.View.OnLayoutChangeListener({onLayoutChange : function(v, l, t, r, b, ol, ot, or, ob) {try {
				if (r - l == or - ol) return;
				self.screenWidth = r - l;
				if (CA.settings.splitScreenMode) {
					self.linear.setLayoutParams(new G.FrameLayout.LayoutParams(self.screenWidth, -1));
					self.con.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth * 0.5, -1));
					self.help.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth * 0.5, -1));
				} else {
					self.linear.setLayoutParams(new G.FrameLayout.LayoutParams(self.screenWidth * 2, -1));
					self.con.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth, -1));
					self.help.setLayoutParams(new G.LinearLayout.LayoutParams(self.screenWidth, -1));
				}
				if (self.tx < 0) self.linear.setTranslationX(self.tx = -self.screenWidth);
			} catch(e) {erp(e)}}}));
			if (!CA.settings.splitScreenMode) {
				var touchSlop = G.ViewConfiguration.get(ctx).getScaledTouchSlop();
				var switchSlop = 80 * G.dp;
				self.scroller = new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
					var t, f;
					switch (e.getAction()) {
						case e.ACTION_MOVE:
						f = true; t = self.x;
						self.x = e.getRawX();
						//网页情况下检查网页是否滑到最左侧
						if (self.lx == -self.screenWidth && self.help.getScrollX() != 0) break;
						if (self.vscr && Math.abs(e.getRawX() - self.sx) - Math.abs(e.getRawY() - self.sy) < touchSlop) break;
						self.vscr = false;
						self.stead = false;
						self.tx += e.getRawX() - t;
						if (self.tx > 0) {
							self.tx = 0;
						} else if (self.tx < -self.screenWidth) {
							self.tx = -self.screenWidth;
						} else {
							f = false;
						}
						self.linear.setTranslationX(self.tx);
						if (f) break;
						if (self.cancelled) return true;
						self.hCheck(); //检测是否需要加载网页
						e.setAction(e.ACTION_CANCEL);
						self.cancelled = true;
						break;
						case e.ACTION_DOWN:
						self.sx = self.x = e.getRawX();
						self.sy = e.getRawY();
						self.lx = self.tx;
						self.vscr = true;
						self.cancelled = false;
						break;
						case e.ACTION_CANCEL:
						case e.ACTION_UP:
						if (self.vscr) break;
						t = self.tx;
						self.tx = (Math.abs(t - self.lx) < switchSlop) ? self.lx : t < self.lx ? -self.screenWidth : 0;
						self.linear.setTranslationX(self.tx);
						if (!CA.settings.noAnimation) {
							var animation = new G.TranslateAnimation(G.Animation.ABSOLUTE, t - self.tx, G.Animation.ABSOLUTE, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0);
							animation.setInterpolator(new G.DecelerateInterpolator(1.0));
							animation.setDuration(200);
							self.linear.startAnimation(animation);
						}
						if (self.cancelled) return true;
					}
					return false;
				} catch(e) {return erp(e), true}}});
				self.help.setOnTouchListener(self.scroller);
			}
			PWM.registerResetFlag(CA, "assist");
			PWM.registerResetFlag(self, "con");
		}
		self.linear.setTranslationX(self.tx = self.lx = 0);
		CA.assist = self.linear;
		CA.con.addView(CA.assist);
		self.layoutListener.onLayoutChange(CA.con, 0, 0, CA.con.getMeasuredWidth(), CA.con.getMeasuredHeight(), 0, 0, 0, 0);
	} catch(e) {erp(e)}})},
	hideAssist : function() {G.ui(function() {try {
		if (!CA.assist) return;
		CA.showAssist.postHelp(-1);
		CA.showAssist.hLoad();
		CA.con.removeView(CA.assist);
		CA.Assist.hide(); CA.IntelliSense.hide();
		CA.assist = null;
	} catch(e) {erp(e)}})},
	
	showHistoryEdit : function self(pos, callback) {G.ui(function() {try {
		if (!self.linear) {
			self.adapter = null;
			self.refresh = function(pos) {
				var a;
				self.selection = new Array(CA.his.length);
				if (pos != null) self.selection[pos] = true;
				if (CA.his.length == 0) {
					self.adapter = null;
					self.list.setAdapter(new RhinoListAdapter([null], self.nula));
				} else {
					if (self.adapter) {
						self.adapter.setArray(CA.his);
					} else {
						self.list.setAdapter(a = new RhinoListAdapter(CA.his, self.adpt));
						self.adapter = RhinoListAdapter.getController(a);
					}
				}
				self.refreshBar();
			}
			self.refreshBar = function() {
				var i, c = 0;
				for (i in self.selection) {
					if (!self.selection[i]) continue;
					c++;
				}
				for (i = 0; i < self.actions.length; i++) {
					if (self.actions[i].type == 0) { //总是显示
						self.bar.getChildAt(i).setVisibility(G.View.VISIBLE);
					} else if (self.actions[i].type == 1) { //仅选中1个时显示
						self.bar.getChildAt(i).setVisibility(c == 1 ? G.View.VISIBLE : G.View.GONE);
					} else if (self.actions[i].type == 2) { //选中1个或多个时显示
						self.bar.getChildAt(i).setVisibility(c > 0 ? G.View.VISIBLE : G.View.GONE);
					}
				}
				self.title.setText("编辑 历史 （" + c + "/" + self.selection.length + "）");
			}
			self.actions = [{
				type : 0,
				text : "全选",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = true;
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "反选",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = !self.selection[i];
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "清除选择",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = false;
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "复制",
				action : function() {
					var z = [], i, c = 0;
					for (i in self.selection) {
						if (!self.selection[i]) continue;
						z.push(CA.his[i]);
						c++;
					}
					Common.setClipboardText(z.join("\n"));
					Common.toast(c + "条命令已复制");
				}
			}, {
				type : 0,
				text : "粘贴",
				action : function() {
					if (!Common.hasClipboardText()) return Common.toast("剪贴板为空");
					var i, z = String(Common.getClipboardText()).split("\n");
					for (i = z.length - 1; i >= 0; i--) if (z[i].length == 0) z.splice(i, 1);
					for (i in z) CA.addHistory(z[i]);
					Common.toast(z.length + "条命令已粘贴");
					self.refresh();
				}
			}, {
				type : 2,
				text : "删除",
				action : function() {
					var i, c = 0;
					for (i = self.selection.length - 1; i >= 0; i--) {
						if (!self.selection[i]) continue;
						CA.his.splice(i, 1);
						c++;
					}
					Common.toast(c + "条命令已删除");
					self.refresh();
				}
			}];
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			Common.applyStyle(self.linear, "container_default");
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			self.header.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(self.header, "bar_float");
			self.title = new G.TextView(ctx);
			self.title.setPadding(15 * G.dp, 10 * G.dp, 15 * G.dp, 10 * G.dp);
			self.title.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			Common.applyStyle(self.title, "textview_default", 4);
			self.header.addView(self.title);
			
			self.hscr = new G.HorizontalScrollView(ctx);
			self.hscr.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			self.hscr.setHorizontalScrollBarEnabled(false);
			self.hscr.setFillViewport(true);
			self.bar = new G.LinearLayout(ctx);
			self.bar.setOrientation(G.LinearLayout.HORIZONTAL);
			self.bar.setPadding(0, 0, 5 * G.dp, 0);
			self.bar.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
			self.bar.setGravity(G.Gravity.RIGHT);
			self.actions.forEach(function(o) {
				var b = new G.TextView(ctx);
				b.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
				b.setText(o.text);
				b.setGravity(G.Gravity.CENTER);
				b.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
				Common.applyStyle(b, "button_highlight", 2);
				b.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					o.action();
				} catch(e) {erp(e)}}}));
				self.bar.addView(b);
			});
			self.hscr.addView(self.bar);
			self.header.addView(self.hscr);
			self.linear.addView(self.header);
			
			self.list = new G.ListView(ctx);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				view.getChildAt(0).performClick();
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list);
			self.adpt = function(e, i) {
				var layout = new G.LinearLayout(ctx),
					check = new G.CheckBox(ctx),
					text = new G.TextView(ctx);
				layout.setGravity(G.Gravity.CENTER);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.HORIZONTAL);
				check.setChecked(self.selection[i] == true);
				check.setOnCheckedChangeListener(new G.CompoundButton.OnCheckedChangeListener({onCheckedChanged : function(v, s) {try {
					self.selection[i] = s;
					self.refreshBar();
				} catch(e) {erp(e)}}}));
				check.setFocusable(false);
				layout.addView(check);
				text.setPadding(5 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				text.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1.0));
				text.setText(e);
				text.setMaxLines(2);
				text.setEllipsize(G.TextUtils.TruncateAt.END);
				Common.applyStyle(text, "textview_default", 3);
				layout.addView(text);
				return layout;
			}
			self.nula = function(s) {
				var text = new G.TextView(ctx);
				text.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				text.setText("空空如也");
				text.setPadding(0, 40 * G.dp, 0, 40 * G.dp);
				text.setGravity(G.Gravity.CENTER);
				text.setFocusable(true);
				Common.applyStyle(text, "textview_prompt", 4);
				return text;
			}
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		self.refresh(pos);
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			self.popup = null;
			if (callback) callback();
		} catch(e) {erp(e)}}}));
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showFavoriteEdit : function self(data, callback) {G.ui(function() {try {
		if (!self.linear) {
			self.adapter = null;
			self.refresh = function(key) {
				var a, t;
				self.array = CA.fav;
				self.selection = new Array(self.array.length);
				if (key != null) self.selection[self.array.indexOf(data)] = true;
				if (self.array.length == 0) {
					self.adapter = null;
					self.list.setAdapter(new RhinoListAdapter([null], self.nula));
				} else {
					if (self.adapter) {
						self.adapter.setArray(self.array);
					} else {
						self.list.setAdapter(a = new RhinoListAdapter(self.array, self.adpt));
						self.adapter = RhinoListAdapter.getController(a);
					}
				}
				self.refreshBar();
			}
			self.refreshBar = function() {
				var i, c = 0;
				for (i in self.selection) {
					if (!self.selection[i]) continue;
					c++;
				}
				for (i = 0; i < self.actions.length; i++) {
					if (self.actions[i].type == 0) { //总是显示
						self.bar.getChildAt(i).setVisibility(G.View.VISIBLE);
					} else if (self.actions[i].type == 1) { //仅选中1个时显示
						self.bar.getChildAt(i).setVisibility(c == 1 ? G.View.VISIBLE : G.View.GONE);
					} else if (self.actions[i].type == 2) { //选中1个或多个时显示
						self.bar.getChildAt(i).setVisibility(c > 0 ? G.View.VISIBLE : G.View.GONE);
					}
				}
				self.title.setText("编辑 收藏 （" + c + "/" + self.selection.length + "）");
			}
			self.actions = [{
				type : 0,
				text : "全选",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = true;
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "反选",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = !self.selection[i];
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "清除选择",
				action : function() {
					var i, aa;
					if (!self.adapter) return;
					aa = self.adapter.views;
					for (i = 0; i < self.selection.length; i++) {
						self.selection[i] = false;
						if (aa[i]) aa[i].getChildAt(0).setChecked(self.selection[i]);
					}
				}
			}, {
				type : 2,
				text : "复制",
				action : function() {
					var z = [], i, c = 0, e;
					for (i in self.selection) {
						if (!self.selection[i]) continue;
						e = self.array[i];
						z.push(e.key, e.value);
						c++;
					}
					Common.setClipboardText(z.join("\n"));
					Common.toast(c + "条命令已复制");
				}
			}, {
				type : 0,
				text : "粘贴",
				action : function() {
					if (!Common.hasClipboardText()) return Common.toast("剪贴板为空");
					var i, z = String(Common.getClipboardText()).split("\n");
					for (i = z.length - 1; i >= 0; i--) if (z[i].length == 0) z.splice(i, 1);
					for (i = 1; i < z.length; i += 2) CA.addFavorite(z[i - 1], z[i]);
					Common.toast(Math.floor(z.length / 2) + "条命令已粘贴");
					self.refresh();
				}
			}, {
				type : 2,
				text : "删除",
				action : function() {
					var i, c = 0;
					for (i = self.selection.length; i >= 0; i--) {
						if (!self.selection[i]) continue;
						CA.removeFavorite(self.array[i]);
						c++;
					}
					Common.toast(c + "条命令已删除");
					self.refresh();
				}
			}];
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			Common.applyStyle(self.linear, "container_default");
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			self.header.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(self.header, "bar_float");
			self.title = new G.TextView(ctx);
			self.title.setPadding(15 * G.dp, 10 * G.dp, 15 * G.dp, 10 * G.dp);
			self.title.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			Common.applyStyle(self.title, "textview_default", 4);
			self.header.addView(self.title);
			
			self.hscr = new G.HorizontalScrollView(ctx);
			self.hscr.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			self.hscr.setHorizontalScrollBarEnabled(false);
			self.hscr.setFillViewport(true);
			self.bar = new G.LinearLayout(ctx);
			self.bar.setOrientation(G.LinearLayout.HORIZONTAL);
			self.bar.setPadding(0, 0, 5 * G.dp, 0);
			self.bar.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
			self.bar.setGravity(G.Gravity.RIGHT);
			self.actions.forEach(function(o) {
				var b = new G.TextView(ctx);
				b.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
				b.setText(o.text);
				b.setGravity(G.Gravity.CENTER);
				b.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
				Common.applyStyle(b, "button_highlight", 2);
				b.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					o.action();
				} catch(e) {erp(e)}}}));
				self.bar.addView(b);
			});
			self.hscr.addView(self.bar);
			self.header.addView(self.hscr);
			self.linear.addView(self.header);
			
			self.list = new G.ListView(ctx);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				view.getChildAt(0).performClick();
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list);
			self.adpt = function(e, i) {
				var layout = new G.LinearLayout(ctx),
					check = new G.CheckBox(ctx),
					linear = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setGravity(G.Gravity.CENTER);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.HORIZONTAL);
				check.setChecked(self.selection[i] == true);
				check.setOnCheckedChangeListener(new G.CompoundButton.OnCheckedChangeListener({onCheckedChanged : function(v, s) {try {
					self.selection[i] = s;
					self.refreshBar();
				} catch(e) {erp(e)}}}));
				check.setFocusable(false);
				layout.addView(check);
				linear.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				linear.setOrientation(G.LinearLayout.VERTICAL);
				text1.setPadding(10 * G.dp, 15 * G.dp, 15 * G.dp, 5 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text1.setText(e.key);
				Common.applyStyle(text1, "textview_default", 3);
				linear.addView(text1);
				text2.setPadding(10 * G.dp, 0, 15 * G.dp, 15 * G.dp);
				text2.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text2.setText(e.value);
				text2.setEllipsize(G.TextUtils.TruncateAt.END);
				text2.setSingleLine(true);
				Common.applyStyle(text2, "textview_prompt", 1);
				linear.addView(text2);
				layout.addView(linear);
				return layout;
			}
			self.nula = function(s) {
				var text = new G.TextView(ctx);
				text.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				text.setText("空空如也");
				text.setPadding(0, 40 * G.dp, 0, 40 * G.dp);
				text.setGravity(G.Gravity.CENTER);
				text.setFocusable(true);
				Common.applyStyle(text, "textview_prompt", 4);
				return text;
			}
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		self.refresh(data);
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			self.popup = null;
			if (callback) callback();
		} catch(e) {erp(e)}}}));
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	performExit : function() {G.ui(function() {try {
		unload();
		if (MapScript.host == "AutoJs") {
			ctx.finish();
		} else if (MapScript.host == "Android") {
			if (G.style == "Material") {
				ctx.finishAndRemoveTask();
			} else {
				ctx.finish();
			}
		}
	} catch(e) {erp(e)}})},
	
	showContentView : function(canFloat) {G.ui(function() {try {
		var layout, help, exit;
		layout = new G.LinearLayout(ctx);
		layout.setBackgroundColor(G.Color.WHITE);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setGravity(G.Gravity.CENTER);
		layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
		layout.setLayoutParams(new G.ViewGroup.LayoutParams(-1, -1));
		help = new G.TextView(ctx);
		help.setTextSize(16);
		help.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
		help.setText("现在您应该可以看到悬浮窗了，如果没有看到请打开悬浮窗权限。");
		help.setLayoutParams(new G.ViewGroup.LayoutParams(-1, -2));
		layout.addView(help);
		exit = new G.Button(ctx);
		exit.setText("退出命令助手");
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			CA.performExit();
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		ctx.setContentView(layout);
		if (canFloat) ctx.moveTaskToBack(true);
	} catch(e) {erp(e)}})},
	
	showSettings : function self() {G.ui(function() {try {
		if (!self.data) {
			self.getsettingbool = function() {
				return Boolean(CA.settings[this.id]);
			}
			self.setsettingbool = function(v) {
				CA.settings[this.id] = Boolean(v);
			}
			self.refresh = function(f) {
				Common.loadTheme(Common.theme.id);
				if (self.refreshed) return;
				self.refreshed = true;
				CA.resetGUI();
				CA.showGen(true);
				if (f) CA.showSettings();
				if (CA.settings.topIcon) CA.showIcon();
			}
			self.data = [{
				name : "当前版本",
				description : "基于Rhino (" + MapScript.host + ")",
				type : "custom",
				get : function() {
					return CA.version;
				},
				onclick : function(fset) {
					CA.showAboutDialog();
				}
			},{
				name : "检查更新",
				description : "点击检查更新",
				type : "custom",
				get : function() {
					return Updater.getVersionInfo();
				},
				onclick : function(fset) {
					Updater.checkUpdate(function() {
						G.ui(function() {try {
							fset();
						} catch(e) {erp(e)}});
					});
				}
			},{
				name : "智能补全设置",
				type : "tag"
			},{
				name : "智能模式",
				type : "custom",
				get : function() {
					var t = CA.settings.iiMode;
					return t == 1 ? "初学者模式" : t == 2 ? "专家模式" : "关闭";
				},
				onclick : function(fset) {
					CA.showModeChooser(function() {
						self.refresh(true);
					});
				}
			},{
				name : "拓展包",
				type : "custom",
				get : function() {
					return CA.settings.enabledLibrarys.length + "个已启用";
				},
				onclick : function(fset) {
					CA.showLibraryMan(function() {
						fset();
					});
				}
			},{
				id : "senseDelay",
				name : "启用多线程",
				description : "IntelliSense将不会即时输出结果以避免卡顿。",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				id : "autoFormatCmd",
				name : "启用样式代码显示",
				description : "输入框会自动解释输入命令中的样式代码。",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				name : "粘贴模式",
				type : "custom",
				list : [{
					text : "仅复制"
				}, {
					text : "复制并显示粘贴栏"
				}, {
					text : "复制并立即粘贴"
				}],
				get : function() {
					if (CA.settings.pasteMode in this.list) {
						return this.list[CA.settings.pasteMode].text;
					} else {
						return this.list[CA.settings.pasteMode = 1].text;
					}
				},
				onclick : function(fset) {
					Common.showListChooser(this.list, function(i) {
						CA.settings.pasteMode = i;
						fset();
					});
				}
			},{
				name : "粘贴栏位置",
				type : "custom",
				list : [{
					text : "左侧"
				}, {
					text : "右侧"
				}],
				get : function() {
					if (CA.settings.pasteBarGravity in this.list) {
						return this.list[CA.settings.pasteBarGravity].text;
					} else {
						return this.list[CA.settings.pasteBarGravity = 0].text;
					}
				},
				onclick : function(fset) {
					Common.showListChooser(this.list, function(i) {
						CA.settings.pasteBarGravity = i;
						fset();
						CA.hidePaste();
					});
				}
			},{
				name : "粘贴延迟",
				type : "custom",
				get : function() {
					var v = isNaN(CA.settings.pasteDelay) ? 2 : CA.settings.pasteDelay / 20;
					return v > 0 ? v + "秒" : "无";
				},
				onclick : function(fset) {
					CA.showPasteDelaySet(fset)
				}
			},{
				name : "管理历史",
				type : "custom",
				get : function() {
					return "共有" + CA.his.length + "条记录";
				},
				onclick : function(fset) {
					CA.showHistoryEdit(null, function() {
						fset();
						if (CA.history) CA.showHistory();
					});
				}
			},{
				name : "管理收藏",
				type : "custom",
				get : function() {
					return "共有" + CA.fav.length + "条记录";
				},
				onclick : function(fset) {
					CA.showFavoriteEdit(null, function() {
						fset();
						if (CA.history) CA.showHistory();
					});
				}
			},{
				name : "历史记录容量",
				type : "seekbar",
				current : function(p) {
					return p == 0 ? "无限制" : this.list[p] + "条";
				},
				list : [0, 1, 3, 5, 8, 10, 20, 30, 50, 100],
				max : 9,
				get : function() {
					var k = this.list.indexOf(CA.settings.histroyCount);
					return k < 0 ? 0 : this.list[k];
				},
				set : function(v) {
					CA.settings.histroyCount = parseInt(this.list[v]);
					if (CA.settings.histroyCount) CA.his.splice(CA.settings.histroyCount);
				}
			},{
				name : "外观设置",
				type : "tag"
			},{
				name : "界面主题",
				type : "custom",
				get : function() {
					return Common.theme.name;
				},
				onclick : function() {
					Common.showChangeTheme(function() {
						self.refresh(true);
					});
				}
			},{
				id : "barTop",
				name : "输入栏置顶",
				description : "命令输入栏会被显示在顶部，兼容旧版UI。",
				type : "boolean",
				refresh : self.refresh,
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				id : "noAnimation",
				name : "关闭动画",
				description : "关闭部分动画以减轻卡顿。",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				id : "keepWhenIME",
				name : "禁用压缩列表栏",
				description : "当输入法弹出时不再压缩列表栏。",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				id : "splitScreenMode",
				name : "双栏模式",
				description : "推荐大屏手机/Pad使用",
				type : "boolean",
				refresh : self.refresh,
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				name : "悬浮窗设置",
				type : "tag"
			},{
				name : "图标样式",
				type : "custom",
				get : function() {
					return "点击以修改";
				},
				onclick : function() {
					CA.showIconChooser(function() {
						if (CA.showIcon.refresh) CA.showIcon.refreshIcon();
					});
				}
			},{
				name : "图标大小",
				type : "seekbar",
				values : [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4],
				current : function(p) {
					return parseInt(this.values[p] * 100) + "%";
				},
				max : 10,
				get : function() {
					var i = this.values.indexOf(CA.settings.iconSize);
					return i >= 0 ? i : 3;
				},
				set : function(v) {
					CA.settings.iconSize = this.values[v];
					if (CA.showIcon.refresh) {
						CA.showIcon.refreshIcon();
						CA.showIcon.refreshPos();
					}
				}
			},{
				name : "不透明度",
				type : "seekbar",
				current : function(p) {
					return p == 0 ? "自动" : p + "0%";
				},
				max : 10,
				get : function() {
					return isNaN(CA.settings.iconAlpha) ? 0 : CA.settings.iconAlpha;
				},
				set : function(v) {
					CA.settings.iconAlpha = v;
					if (CA.showIcon.refresh) CA.showIcon.refreshAlpha();
				}
			},{
				name : "拖动方式",
				type : "custom",
				list : [
					"自由拖动",
					"自动贴边",
					"固定"
				],
				get : function() {
					if (CA.settings.iconDragMode in this.list) {
						return this.list[CA.settings.iconDragMode];
					} else {
						return this.list[CA.settings.iconDragMode = 0];
					}
				},
				onclick : function(fset) {
					Common.showListChooser(this.list, function(i) {
						CA.settings.iconDragMode = i;
						if (CA.showIcon.refresh) CA.showIcon.refreshPos();
						fset();
					});
				}
			},{
				id : "topIcon",
				name : "图标置于顶层",
				description : "点击图标可以暂时隐藏所有界面，再次点击可恢复",
				type : "boolean",
				refresh : self.refresh,
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				id : "autoHideIcon",
				name : "自动隐藏悬浮窗",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				name : "辅助功能",
				type : "tag"
			},{
				id : "noWebImage",
				name : "不加载图片",
				description : "加载网页时不加载图片",
				type : "boolean",
				get : self.getsettingbool,
				set : self.setsettingbool
			},{
				name : "每日提示",
				type : "custom",
				get : function() {
					return "共" + CA.tips.length + "条";
				},
				onclick : function() {
					Common.showTextDialog(CA.tips.join("\n\n"));
				}
			},{
				name : "恢复默认数据",
				type : "custom",
				onclick : function(fset) {
					Common.showConfirmDialog({
						title : "确定恢复默认？",
						description : "*此操作无法撤销",
						callback : function(id) {
							if (id != 0) return;
							G.ui(function() {try {
								CA.resetGUI();
								(new java.io.File(CA.profilePath)).delete();
								CA.initialize();
								Common.toast("命令助手已重新启动");
							} catch(e) {erp(e)}});
						}
					});
				}
			},{
				name : "调试工具",
				type : "tag"
			},{
				name : "JSON编辑器",
				type : "custom",
				get : function() {
					return "";
				},
				onclick : function() {
					JSONEdit.main();
				}
			},{
				name : "错误记录",
				type : "custom",
				get : function() {
					return "";
				},
				onclick : function() {
					CA.manageErrors();
				}
			},{
				name : "控制台",
				type : "custom",
				get : function() {
					return "开发者专用";
				},
				onclick : function(fset) {
					Common.showDebugDialog();
				}
			}];
			AndroidBridge.addSettings(self.data);
		}
		self.refreshed = false;
		Common.showSettings(self.data, function() {
			CA.trySave();
		});
	} catch(e) {erp(e)}})},
	
	manageErrors : function() {
		var f = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "com.xero.ca.error.log");
		if (!f.isFile()) return Common.toast("无错误记录");
		Common.showOperateDialog([{
			text : "打开",
			intent : (function() {
				try {
					return new android.content.Intent(android.content.Intent.ACTION_VIEW).setDataAndType(android.net.Uri.fromFile(f), "text/plain");
				} catch(e) {}
			})(),
			onclick : function() {
				ctx.startActivity(this.intent);
			},
			hidden : function() {
				return !this.intent;
			}
		}, {
			text : "查看",
			onclick : function() {
				CA.listErrors();
			}
		}, {
			text : "发送",
			intent : (function() {
				try {
					return new android.content.Intent(android.content.Intent.ACTION_SEND).setType("text/plain").putExtra(android.content.Intent.EXTRA_STREAM, android.net.Uri.fromFile(f));
				} catch(e) {}
			})(),
			onclick : function() {
				ctx.startActivity(this.intent);
			},
			hidden : function() {
				return !this.intent;
			}
		}, {
			text : "清空",
			onclick : function() {
				f.delete();
				Common.toast("错误信息已清空");
			}
		}]);
	},
	listErrors : function() {
		var f = Common.readFile(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/com.xero.ca.error.log", "");
		if (!f.length) return;
		var a = f.slice(9).split("\n* Error: ");
		a.reverse();
		Common.showListChooser(a, function(id) {
			Common.setClipboardText(a[id]);
			Common.toast("错误信息已复制");
		});
	},
	
	resetGUI : function() {
		PWM.dismissAll();
		PWM.dismissFloat();
		PWM.dismissPopup();
		PWM.reset();
		PWM.resetUICache();
	},
	
	showFCS : function self(v) {G.ui(function() {try {
		var i, j;
		if (!self.prompt) {
			var data = [["§", "§l§§l", "§m§§m", "§n§§n", "§o§§o", "§§k", "§§r"], ["§0§§0", "§1§§1", "§2§§2", "§3§§3", "§4§§4", "§5§§5", "§6§§6", "§7§§7"], ["§8§§8", "§9§§9", "§a§§a", "§b§§b", "§c§§c", "§d§§d", "§e§§e", "§f§§f"]];
			var l, b, lp1, lp2, onclick;
			var frcolor = G.Color.WHITE, bgcolor = G.Color.BLACK;
			
			self.frame = new G.FrameLayout(ctx);
			self.frame.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
			
			self.scr = new G.ScrollView(ctx);
			self.scr.setBackgroundColor(Common.setAlpha(bgcolor, 0xC0));
			self.scr.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2, CA.settings.barTop ? G.Gravity.TOP : G.Gravity.BOTTOM));
			
			self.line = new G.LinearLayout(ctx);
			self.line.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
			self.line.setOrientation(G.LinearLayout.VERTICAL);
			
			self.prompt = new G.TextView(ctx);
			self.prompt.setLayoutParams(lp1 = new G.LinearLayout.LayoutParams(-1, -2));
			self.prompt.setTextColor(frcolor);
			self.prompt.setSingleLine(true);
			self.prompt.setEllipsize(G.TextUtils.TruncateAt.START);
			self.prompt.setTextSize(Common.theme.textsize[2]);
			self.prompt.setPadding(20 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			self.prompt.setTypeface(G.Typeface.MONOSPACE);
			self.line.addView(self.prompt);
			
			lp2 = new G.LinearLayout.LayoutParams(0, -2, 1);
			onclick = new G.View.OnClickListener({onClick : function(v) {try {
				Common.replaceSelection(CA.cmd.getText(), v.getText().toString());
			} catch(e) {erp(e)}}});
			
			for (i = 0; i < data.length; i++) {
				l = new G.LinearLayout(ctx);
				l.setOrientation(G.LinearLayout.HORIZONTAL);
				for (j = 0; j < data[i].length; j++) {
					b = new G.TextView(ctx);
					b.setTextColor(frcolor);
					b.setTextSize(Common.theme.textsize[2]);
					b.setGravity(G.Gravity.CENTER);
					b.setTypeface(G.Typeface.MONOSPACE);
					b.setPadding(0, 10 * G.dp, 0, 10 * G.dp);
					b.setText(FCString.parseFC(data[i][j]));
					b.setOnClickListener(onclick);
					l.addView(b, lp2);
				}
				self.line.addView(l, lp1);
			}
			self.exit = new G.TextView(ctx);
			self.exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.exit.setText("关闭");
			self.exit.setTextSize(Common.theme.textsize[2]);
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setTextColor(frcolor);
			self.exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 20 * G.dp);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				CA.hideFCS();
			} catch(e) {erp(e)}}}));
			self.line.addView(self.exit);
			
			self.scr.addView(self.line);
			self.frame.addView(self.scr);
			
			PWM.registerResetFlag(CA, "fcs");
			PWM.registerResetFlag(self, "prompt");
		}
		if (v) self.prompt.setText(FCString.parseFC(v));
		if (CA.fcs) return CA.fcs.bringToFront();
		CA.fcs = self.frame;
		CA.con.addView(CA.fcs);
	} catch(e) {erp(e)}})},
	hideFCS : function() {G.ui(function() {try {
		if (!CA.fcs) return;
		CA.con.removeView(CA.fcs);
		CA.fcs = null;
	} catch(e) {erp(e)}})},
	
	performPaste : function(cmd) {
		var r, t;
		Common.setClipboardText(cmd);
		if (MapScript.host == "AutoJs" || MapScript.host == "Android") {
			try {
				if (MapScript.host == "AutoJs") {
					if (!editable().findOne().paste()) throw "";
				} else if (MapScript.host == "Android") {
					t = ScriptActivity.getAccessibilitySvc();
					if (!t) throw 1;
					t.paste();
				}
			} catch(e) {
				Common.toast("请打开无障碍服务");
			}
		} else {
			try {
				if (CA.settings.pasteDelay > 0) {
					Common.toast("请在" + (CA.settings.pasteDelay / 20) + "秒内点击需要粘贴的文本框");
					gHandler.postDelayed(function() {try {
						ctx.updateTextboxText(cmd);
					} catch(e) {
						Common.toast("当前版本暂不支持粘贴命令\n" + e);
					}}, CA.settings.pasteDelay * 50);
				} else if (CA.settings.pasteDelay == 0) {
					ctx.updateTextboxText(cmd);
				} else {
					CA.showPasteDelaySet(function() {
						CA.performPaste(cmd);
					});
				}
			} catch(e) {
				Common.toast("当前版本暂不支持粘贴命令\n" + e);
			}
		}
	},
	
	showPaste : function self() {G.ui(function() {try {
		if (!self.bar) {
			self.vmaker = function(holder) {
				var view = new G.TextView(ctx);
				view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				view.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
				Common.applyStyle(view, "textview_default", 2);
				return view;
			}
			self.vbinder = function(holder, s, i, a) {
				holder.self.setText(s);
			}
			self.adapter = SimpleListAdapter.getController(new SimpleListAdapter([], self.vmaker, self.vbinder));
			self.refresh = function() {
				self.adapter.setArray(CA.his);
			}
			self.updateWidth = function(width) {
				if (width > self.widthMax) width = self.widthMax;
				if (width < self.widthMin) {
					self.inDrawer = true;
					width = G.dp;
				} else {
					self.inDrawer = false;
				}
				self.lparam.width = width;
				self.linear.setLayoutParams(self.lparam);
			}
			self.animateShow = function() {
				var t = new G.TranslateAnimation(-self.dir * self.lparam.width, 0, 0, 0);
				t.setInterpolator(new G.DecelerateInterpolator(2.0));
				t.setDuration(100);
				self.linear.startAnimation(t);
			}
			self.animateHide = function() {
				var t = new G.TranslateAnimation(0, -self.dir * self.lparam.width, 0, 0);
				t.setInterpolator(new G.AccelerateInterpolator(2.0));
				t.setDuration(100);
				t.setAnimationListener(new G.Animation.AnimationListener({
					onAnimationEnd : function(a) {
						CA.hidePaste();
					}
				}));
				self.linear.startAnimation(t);
			}
			self.touchListener = new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				switch (e.getAction()) {
					case e.ACTION_MOVE:
					if (touch.verticalScroll) break;
					if (touch.stead) {
						if (Math.abs(touch.lx - e.getRawX()) < 16 * G.dp) {
							break;
						}
						if (Math.abs(touch.lx - e.getRawX()) < Math.abs(touch.ly - e.getRawY()) * 2) {
							touch.verticalScroll = true;
							break;
						}
						touch.stead = false;
						if (!self.inDrawer) self.list.setVisibility(G.View.GONE);
						CA.paste.update(Common.getScreenWidth(), -1);
					} else {
						self.updateWidth(touch.slw + (e.getRawX() - touch.lx) * self.dir);
					}
					break;
					case e.ACTION_DOWN:
					touch.lx = e.getRawX();
					touch.ly = e.getRawY();
					touch.slw = self.lparam.width;
					self.widthMin = 0.1 * Common.getScreenWidth();
					self.widthMax = 9 * self.widthMin;
					touch.stead = true;
					touch.verticalScroll = false;
					break;
					case e.ACTION_UP:
					if (touch.verticalScroll || touch.stead) break;
					self.updateWidth(touch.slw + (e.getRawX() - touch.lx) * self.dir);
					case e.ACTION_CANCEL:
					if (!self.inDrawer) self.list.setVisibility(G.View.VISIBLE);
					CA.paste.update(self.lparam.width + 16 * G.dp, -1);
				}
				return false;
			} catch(e) {return erp(e), true}}});
			self.bar = new G.FrameLayout(ctx);
			self.bar.setOnTouchListener(self.touchListener);
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			self.linear.setLayoutParams(self.lparam = new G.FrameLayout.LayoutParams(0.4 * Common.getScreenWidth(), -1, G.Gravity.LEFT));
			Common.applyStyle(self.linear, "bar_float");
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			self.header.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.title = new G.TextView(ctx);
			self.title.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1));
			self.title.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			self.title.setText("粘贴栏");
			self.title.setSingleLine(true);
			Common.applyStyle(self.title, "textview_prompt", 1);
			self.header.addView(self.title);
			self.exit = new G.TextView(ctx);
			self.exit.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			self.exit.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			self.exit.setText("x");
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (CA.settings.noAnimation) {
					CA.hidePaste();
				} else {
					self.animateHide();
				}
			} catch(e) {erp(e)}}}));
			Common.applyStyle(self.exit, "button_critical", 1);
			self.header.addView(self.exit);
			self.linear.addView(self.header);
			self.list = new G.ListView(ctx);
			self.list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			self.list.setAdapter(self.adapter.self);
			self.list.setOnTouchListener(self.touchListener);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				CA.performPaste(self.adapter.array[pos]);
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list);
			self.bar.addView(self.linear);
			PWM.registerResetFlag(self, "bar");
		}
		self.refresh();
		if (CA.paste) return;
		if (CA.settings.pasteBarGravity == 1) {
			self.lparam.gravity = self.gravity = G.Gravity.RIGHT;
			self.lparam.setMargins(16 * G.dp, 0, 0, 0);
			self.dir = -1;
		} else {
			self.lparam.gravity = self.gravity = G.Gravity.LEFT;
			self.lparam.setMargins(0, 0, 16 * G.dp, 0);
			self.dir = 1;
		}
		CA.paste = new G.PopupWindow(self.bar, self.lparam.width + 16 * G.dp, -1);
		if (CA.supportFloat) CA.paste.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		CA.paste.showAtLocation(ctx.getWindow().getDecorView(), self.gravity, 0, 0);
		if (!CA.settings.noAnimation) self.animateShow();
		PWM.addPopup(CA.paste);
	} catch(e) {erp(e)}})},
	hidePaste : function() {G.ui(function() {try {
		if (CA.paste) CA.paste.dismiss();
		CA.paste = null;
	} catch(e) {erp(e)}})},
	
	showPasteDelaySet : function(callback) {
		Common.showSlider({
			max : 100,
			progress : CA.settings.pasteDelay,
			prompt : function(progress) {
				if (progress > 0) {
					return "延迟" + (progress / 20).toFixed(2) + "秒后粘贴（仅适用于启动器）\n\n点击“粘贴”时将不会立即粘贴，你需要在这段延迟时间中点击需要粘贴的文本框。\n您可以在设置中修改该设置。";
				} else {
					return "立即粘贴\n\n点击“粘贴”时将会立即粘贴，但你只能粘贴到聊天框中。\n您可以在设置中修改该设置。";
				}
			},
			callback : function(progress) {
				CA.settings.pasteDelay = parseInt(progress);
			},
			onDismiss : callback
		});
	},
	
	showLibraryMan : function self(callback) {G.ui(function() {try {
		if (!self.linear) {
			self.contextMenu = [{
				text : "从文件中导入",
				description : "导入外置拓展包",
				onclick : function(v, tag) {
					Common.showFileDialog({
						type : 0,
						callback : function(f) {
							self.postTask(function(cb) {
								if (!CA.IntelliSense.enableLibrary(String(f.result.getAbsolutePath()))) {
									Common.toast("无法导入该拓展包，可能文件不存在");
									cb(false);
									return;
								}
								cb(true, function() {
									Common.toast("导入成功！");
								});
							});
						}
					});
				}
			},{
				text : "新建拓展包",
				description : "新建一个不包含内容的包",
				onclick : function(v, tag) {
					Common.showFileDialog({
						type : 1,
						callback : function(f) {
							self.postTask(function(cb) {
								var fp = String(f.result.getAbsolutePath());
								try {
									MapScript.saveJSON(fp, {
										"name": "新建拓展包",
										"author": "作者名",
										"description": "此处填写介绍，可留空，新建于" + new Date().toLocaleDateString(),
										"uuid": String(java.util.UUID.randomUUID().toString()),
										"version": [0, 0, 1],
										"require": []
									});
									CA.IntelliSense.enableLibrary(fp);
									cb(true, function() {
										Common.toast("拓展包已新建：" + fp);
									});
								} catch(e) {
									Common.toast("文件保存失败，无法新建\n" + e);
									cb(false);
								}
							});
						}
					});
				}
			},{
				text : "刷新",
				description : "刷新所有的拓展包",
				onclick : function(v, tag) {
					self.postTask(function(cb) {
						cb(true, function() {
							Common.toast("刷新成功");
						});
					});
				}
			},{
				text : "切换版本",
				description : "切换命令所属版本",
				onclick : function(v, tag) {
					NeteaseAdapter.switchVersion(function() {
						CA.checkFeatures();
						self.postTask(function(cb) {
							cb(true, function() {
								Common.toast("版本已切换为" + getMinecraftVersion() + "。");
							});
						});
					});
				}
			},{
				text : "忽略版本",
				description : "暂时忽略版本限制",
				onclick : function(v, tag) {
					self.postTask(function(cb) {
						CA.IntelliSense.ignoreVersion = true;
						CA.checkFeatures();
						cb(true, function() {
							Common.toast("版本限制已关闭，重新打开游戏即可恢复。");
						});
					});
				}
			},{
				text : "恢复默认",
				description : "将拓展包列表恢复为默认",
				onclick : function(v, tag) {
					self.postTask(function(cb) {
						CA.settings.enabledLibrarys = Object.keys(CA.IntelliSense.inner);
						CA.settings.disabledLibrarys = [];
						cb(true, function() {
							Common.toast("已恢复为默认拓展包列表");
						});
					});
				}
			}];
			self.itemMenu = [{
				text : "移除",
				description : "将该拓展包从列表中移除",
				onclick : function(v, tag) {
					if (tag.data.mode == 0) {
						Common.toast("内置拓展包无法删除");
						return true;
					}
					self.postTask(function(cb) {
						CA.IntelliSense.removeLibrary(tag.data.src);
						cb(true, function() {
							Common.toast("该拓展包已从列表中移除");
						});
					});
				}
			},{
				text : "查看信息",
				description : "查看该拓展包的相关信息",
				onclick : function(v, tag) {
					var f = new java.io.File(tag.data.src), s;
					s = "名称 : " + tag.data.name;
					if (f.isFile()) s += "\n位置 : " + tag.data.src + "\n大小 : " + Common.getFileSize(f, true) + "\n时间 : " + new Date(f.lastModified()).toLocaleString();
					if (!tag.data.disabled && !tag.data.hasError) s += "\n\n" + tag.data.stat.toString();
					Common.showTextDialog(s);
				}
			}];
			self.enabledMenu = [{
				text : "检测更新",
				description : "如果可行，连接服务器检测是否有更新",
				onclick : function(v, tag) {
					if (tag.data.mode == 0 || !tag.data.update) {
						Common.toast("该拓展包暂不支持检测更新");
						return true;
					}
					self.postTask(function(cb) {new java.lang.Thread(function() {try {
						var r, d = tag.data, u = d.update, i, f = false, dl;
						try {
							if (typeof u == "function") {
								r = tag.data.update();
							} else if (typeof u == "string") {
								r = JSON.parse(Updater.queryPage(u));
							}
							if (!(r instanceof Object) || !Array.isArray(r.version)) {
								Common.toast("该拓展包没有更新数据");
								return cb(false);
							}
							for (i = 0; i < d.version.length; i++) {
								if (d.version[i] > r.version[i]) {
									break;
								} else if (d.version[i] < r.version[i]) {
									f = true;
									break;
								}
							}
							if (f) {
								Common.toast("更新中……\n" + d.version.join(".") + " -> " + r.version.join("."));
								Updater.download(r.url, tag.data.src);
								cb(true, function() {
									Common.toast("更新完成：" + r.version.join("."));
								});
							} else {
								Common.toast("已是最新版本：" + r.version.join("."));
								cb(false);
							}
						} catch(e) {
							Common.toast("检测更新失败\n" + e);
							cb(false);
						}
					} catch(e) {erp(e)}}).start()});
				}
			},{
				text : "编辑",
				description : "用JSON编辑器编辑该拓展包",
				onclick : function(v, tag) {
					if (tag.data.mode != 1) {
						Common.toast("拓展包已被锁定，无法编辑");
						return true;
					}
					self.postTask(function(cb) {
						var a = MapScript.readJSON(tag.data.src, {});
						if (!(a instanceof Object)) a = {};
						JSONEdit.show({
							source : a,
							rootname : "拓展包",
							update : function() {
								try {
									self.processing = true;
									MapScript.saveJSON(tag.data.src, a);
									cb(true, function() {
										Common.toast("加载成功！");
									});
								} catch(e) {
									Common.toast("格式不合法，无法保存\n" + e);
									cb(false);
									return;
								}
							}
						});
					});
				}
			},{
				text : "另存为",
				description : "将该拓展包保存到一个新文件里",
				onclick : function(v, tag) {
					if (tag.data.hasError) {
						Common.toast("该拓展包有错误，不能另存为");
						return true;
					}
					Common.showFileDialog({
						type : 1,
						callback : function(f) {
							self.postTask(function(cb) {
								var fp = String(f.result.getAbsolutePath());
								try {
									if (tag.data.mode == 0) {
										MapScript.saveJSON(fp, CA.IntelliSense.inner[tag.data.src]);
									} else {
										Common.fileCopy(new java.io.File(tag.data.src), f.result);
									}
									CA.IntelliSense.disableLibrary(fp);
									cb(true, function() {
										Common.toast("当前拓展包已另存为" + fp);
									});
								} catch(e) {
									Common.toast("文件保存失败，无法另存为\n" + e);
									cb(false);
								}
							});
						}
					});
				}
			},{
				text : "创建副本",
				description : "创建该拓展包的副本（副本不会被认为与原拓展包相同）",
				onclick : function(v, tag) {
					if (tag.data.hasError) {
						Common.toast("该拓展包有错误，不能创建副本");
						return true;
					}
					if (tag.data.mode == 2) {
						Common.toast("拓展包已被锁定，不能创建副本");
						return true;
					}
					Common.showFileDialog({
						type : 1,
						callback : function(f) {
							self.postTask(function(cb) {
								var fp = String(f.result.getAbsolutePath()), l;
								try {
									if (tag.data.mode == 0) {
										l = Object.copy(CA.IntelliSense.inner[tag.data.src]);
									} else {
										l = MapScript.readJSON(tag.data.src, null);
										if (!(l instanceof Object)) throw "无法读取文件";
									}
									l.name = String(l.name) + " 的副本";
									l.uuid = String(java.util.UUID.randomUUID().toString());
									MapScript.saveJSON(fp, l);
									CA.IntelliSense.enableLibrary(fp);
									cb(true, function() {
										Common.toast("当前拓展包的副本已创建" + fp);
									});
								} catch(e) {
									Common.toast("文件保存失败，无法创建副本\n" + e);
									cb(false);
								}
							});
						}
					});
				}
			},{
				text : "锁定",
				description : "锁定拓展包，使其不能被编辑",
				onclick : function(v, tag) {
					if (tag.data.mode != 1) {
						Common.toast("该拓展包已被锁定");
						return true;
					}
					if (tag.data.hasError) {
						Common.toast("该拓展包有错误，不能锁定");
						return true;
					}
					Common.showConfirmDialog({
						title : "确定锁定拓展包“" + tag.data.name + "”？",
						description : "*此操作无法撤销",
						callback : function(id) {
							if (id != 0) return;
							self.postTask(function(cb) {
								try {
									CA.IntelliSense.savePrefixed(tag.data.src, MapScript.readJSON(tag.data.src));
									cb(true, function() {
										Common.toast("该拓展包已锁定");
									});
								} catch(e) {
									Common.toast("文件保存失败\n" + e);
									cb(false);
								}
							});
						}
					});
				}
			},{
				text : "上移",
				description : "使该拓展包较早加载",
				onclick : function(v, tag) {
					if (tag.data.index < 1) {
						Common.toast("该拓展包已在顶端，无法继续上移");
						return true;
					}
					self.postTask(function(cb) {
						var a = CA.settings.enabledLibrarys;
						a.splice(tag.data.index - 1, 0, a.splice(tag.data.index, 1)[0]);
						cb(true, function() {});
					});
				}
			},{
				text : "下移",
				description : "使该拓展包较晚加载",
				onclick : function(v, tag) {
					if (tag.data.index > CA.settings.enabledLibrarys.length - 2) {
						Common.toast("该拓展包已在底端，无法继续下移");
						return true;
					}
					self.postTask(function(cb) {
						var a = CA.settings.enabledLibrarys;
						a.splice(tag.data.index + 1, 0, a.splice(tag.data.index, 1)[0]);
						cb(true, function() {});
					});
				}
			},{
				text : "停用",
				description : "停用该拓展包",
				onclick : function(v, tag) {
					self.postTask(function(cb) {
						CA.IntelliSense.disableLibrary(tag.data.src);
						cb(true, function() {
							Common.toast("该拓展包已停用");
						});
					});
				}
			}].concat(self.itemMenu);
			self.disabledMenu = [{
				text : "启用",
				description : "启用该拓展包",
				onclick : function(v, tag) {
					self.postTask(function(cb) {
						CA.IntelliSense.enableLibrary(tag.data.src);
						cb(true, function() {
							Common.toast("该拓展包已启用");
						});
					});
				}
			}].concat(self.itemMenu);
			self.errMenu = [{
				text : "查看堆栈",
				onclick : function(v, tag) {
					if (tag.data.error instanceof Object && tag.data.error.stack) {
						Common.showTextDialog(String(tag.data.error.stack));
					} else {
						Common.toast("错误堆栈不存在");
						return true;
					}
				}
			}].concat(self.enabledMenu);
			self.adapter = function(e, i, a) {
				var layout = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.VERTICAL);
				layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text1.setText((e.mode == 0 ? "[内置] " : e.mode == 2 ? "[锁定] " : "") + e.name + (e.disabled || e.hasError ? "" : " (已启用)"));
				text1.setEllipsize(G.TextUtils.TruncateAt.MIDDLE);
				text1.setSingleLine(true);
				Common.applyStyle(text1, e.disabled ? "item_disabled" : e.hasError ? "item_critical" : "item_default", 3);
				layout.addView(text1);
				text2.setPadding(0, 5 * G.dp, 0, 0);
				text2.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text2.setText(e.disabled ? "已禁用" : e.hasError ? "加载出错 :\n" + e.error : "版本 : " + e.version.join(".") + "\n作者 : " + e.author + (e.description && e.description.length ? "\n\n" + e.description : ""));
				Common.applyStyle(text2, "textview_prompt", 1);
				layout.addView(text2);
				return layout;
			}
			self.refresh = function() {
				var arr = CA.IntelliSense.library.info.concat(CA.settings.disabledLibrarys.map(function(e, i, a) {
					var k = e in CA.IntelliSense.inner;
					return {
						src : e,
						index : i,
						mode : k ? 0 : -1,
						name : k ? CA.IntelliSense.inner[e].name : (new java.io.File(e)).getName(),
						disabled : true
					};
				}));
				self.list.setAdapter(new RhinoListAdapter(arr, self.adapter));
			}
			self.postTask = function(f) {
				if (self.processing) {
					Common.toast("处理中，请稍候……");
					return true;
				}
				var progress = Common.showProgressDialog();
				progress.setText("正在处理……");
				self.processing = true;
				f(function(success, callback) {
					if (!success) return self.processing = false;
					progress.setText("正在刷新命令库……");
					CA.IntelliSense.initLibrary(function() {
						progress.close();
						G.ui(function() {try {
							self.refresh();
							self.processing = false;
							callback();
						} catch(e) {erp(e)}});
					});
				});
			}
			self.processing = false;
			
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			self.linear.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(self.linear, "message_bg");
			
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			self.header.setPadding(0, 0, 0, 10 * G.dp);
			self.header.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				Common.showOperateDialog(self.contextMenu, {
					callback : function() {G.ui(function() {try {
						self.refresh();
					} catch(e) {erp(e)}})}
				});
				return true;
			} catch(e) {erp(e)}}}));
			
			self.title = new G.TextView(ctx);
			self.title.setText("管理拓展包");
			self.title.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
			self.title.setPadding(10 * G.dp, 0, 10 * G.dp, 0);
			Common.applyStyle(self.title, "textview_default", 4);
			self.header.addView(self.title, new G.LinearLayout.LayoutParams(0, -2, 1.0));
			
			self.menu = new G.TextView(ctx);
			self.menu.setText("▼");
			self.menu.setPadding(10 * G.dp, 0, 10 * G.dp, 0);
			self.menu.setGravity(G.Gravity.CENTER);
			Common.applyStyle(self.menu, "button_highlight", 3);
			self.header.addView(self.menu, new G.LinearLayout.LayoutParams(-2, -1));
			self.linear.addView(self.header, new G.LinearLayout.LayoutParams(-1, -2));
			
			self.list = new G.ListView(ctx);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var data = parent.getAdapter().getItem(pos);
				var mnu = data.disabled ? self.disabledMenu : data.hasError ? self.errMenu : self.enabledMenu;
				if (data.menu) {
					mnu = data.menu.concat(mnu);
				}
				Common.showOperateDialog(mnu, {
					pos : parseInt(pos),
					data : data,
					callback : function() {G.ui(function() {try {
						self.refresh();
					} catch(e) {erp(e)}})}
				});
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list, new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			
			self.exit = new G.TextView(ctx);
			self.exit.setText("确定");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.popup.dismiss();
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.exit, new G.LinearLayout.LayoutParams(-1, -2));
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NOT_NEEDED);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			callback();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.refresh();
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showModeChooser : function self(callback) {
		if (self.popup) return;
		if (!self.menu) {
			self.menu = [{
				text : "关闭",
				description : "禁用IntelliSense的所有功能",
				onclick : function(v, tag) {
					CA.settings.iiMode = 0;
					tag.callback();
				}
			},{
				text : "初学者模式",
				description : "只启用提示助手",
				onclick : function(v, tag) {
					CA.settings.iiMode = 1;
					tag.callback();
				}
			},{
				text : "专家模式",
				description : "启用提示助手与智能补全",
				onclick : function(v, tag) {
					CA.settings.iiMode = 2;
					tag.callback();
				}
			}];
		}
		Common.showOperateDialog(self.menu, {
			callback : function() {
				callback();
			}
		});
	},
	showIconChooser : function self(callback, onDismiss) {G.ui(function() {try {
		if (!self.addCustom) {
			self.addCustom = function() {
				var view = new G.TextView(ctx);
				view.setText("自定义图标");
				view.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
				Common.applyStyle(view, "button_reactive", 2);
				return view;
			}
			self.selectIcon = function(callback) {
				if (MapScript.host == "Android") {
					AndroidBridge.selectFile("image/*", function(path) {
						CA.settings.icon = path;
						if (self.recent.indexOf(path) < 0) self.recent.push(path);
						if (callback) callback();
					});
				} else {
					Common.showFileDialog({
						type : 0,
						check : function(path) {
							var bmp = G.BitmapFactory.decodeFile(path.getAbsolutePath());
							if (!bmp) {
								Common.toast("不支持的图片格式");
								return false;
							}
							bmp.recycle();
							return true;
						},
						callback : function(f) {
							var path = String(f.result.getAbsolutePath());
							CA.settings.icon = path;
							if (self.recent.indexOf(path) < 0) self.recent.push(path);
							if (callback) callback();
						}
					});
				}
			}
			self.recent = [];
		}
		var ci, frame, list, popup;
		if (CA.settings.icon.startsWith("/") && self.recent.indexOf(CA.settings.icon) < 0) self.recent.push(CA.settings.icon);
		ci = Object.keys(CA.Icon).concat(self.recent, "");
		frame = new G.FrameLayout(ctx);
		Common.applyStyle(frame, "message_bg");
		list = new G.GridView(ctx);
		list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
		list.setHorizontalSpacing(20 * G.dp);
		list.setVerticalSpacing(20 * G.dp);
		list.setPadding(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
		list.setGravity(G.Gravity.CENTER);
		list.setNumColumns(-1);
		list.setStretchMode(2);
		list.setAdapter(new RhinoListAdapter(ci, function(e) {
			var view = e == "" ? self.addCustom() : e in CA.Icon ? CA.Icon[e](1, true) : CA.customIcon(e, 1, true);
			view.setLayoutParams(new G.AbsListView.LayoutParams(-2, -2));
			return view;
		}));
		list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
			var z = String(parent.getItemAtPosition(pos));
			if (z) {
				CA.settings.icon = z;
				if (callback) callback();
			} else {
				self.selectIcon(callback);
			}
			popup.dismiss();
		} catch(e) {erp(e)}}}));
		frame.addView(list);
		popup = Common.showDialog(frame, -1, -1, onDismiss);
	} catch(e) {erp(e)}})},
	customIcon : function(path, size, preview) {
		const w = 32 * G.dp * size;
		var frm = new G.FrameLayout(ctx);
		var view = new G.ImageView(ctx);
		var bmp = G.BitmapFactory.decodeFile(path);
		if (bmp) {
			view.setImageBitmap(bmp);
		} else if (preview) {
			view.setImageResource(G.R.drawable.ic_delete);
		} else {
			return CA.Icon.default(size, false);
		}
		view.setScaleType(G.ImageView.ScaleType.FIT_XY);
		view.setLayoutParams(new G.FrameLayout.LayoutParams(w, w));
		frm.addView(view);
		return frm;
	},
	Icon : {
		"default" : function(size) {
			const w = 32 * G.dp * size;
			var bmp = G.Bitmap.createBitmap(w, w, G.Bitmap.Config.ARGB_8888);
			var cv = new G.Canvas(bmp);
			cv.scale(w / 256, w / 256);
			var pt = new G.Paint();
			pt.setAntiAlias(true);
			pt.setColor(Common.theme.go_bgcolor);
			pt.setShadowLayer(16, 0, 0, Common.theme.go_touchbgcolor);
			cv.drawCircle(128, 128, 112, pt);
			pt.setTextSize(128);
			pt.setTypeface(G.Typeface.create(G.Typeface.MONOSPACE, G.Typeface.BOLD));
			pt.clearShadowLayer();
			var fb = new G.Rect(), fm = pt.getFontMetrics();
			pt.getTextBounds("CA", 0, 2, fb);
			pt.setColor(Common.theme.go_textcolor);
			cv.drawText("CA", 128 - fb.centerX(), 128 - (fm.descent + fm.ascent) / 2 , pt);
			var frm = new G.FrameLayout(ctx);
			var view = new G.ImageView(ctx);
			view.setImageBitmap(bmp);
			view.setLayoutParams(new G.FrameLayout.LayoutParams(w, w));
			frm.addView(view);
			return frm;
		},
		"default_old" : function(size) {
			var zp = G.dp * size;
			var view = new G.TextView(ctx);
			view.setText("CA");
			view.setPadding(5 * zp, 5 * zp, 5 * zp, 5 * zp);
			view.setTextSize(18 * size);
			view.setBackgroundColor(Common.theme.go_bgcolor);
			view.setTextColor(Common.theme.go_textcolor);
			view.setOnTouchListener(new G.View.OnTouchListener({onTouch : function(v, e) {try {
				switch (e.getAction()) {
					case e.ACTION_DOWN:
					v.setBackgroundColor(Common.theme.go_touchbgcolor);
					v.setTextColor(Common.theme.go_touchtextcolor);
					break;
					case e.ACTION_UP:
					case e.ACTION_CANCEL:
					v.setBackgroundColor(Common.theme.go_bgcolor);
					v.setTextColor(Common.theme.go_textcolor);
				}
				return false;
			} catch(e) {return erp(e), false}}}));
			return view;
		}
	},
	QuickBar : [{
		create : function(hide) {
			var v = new G.Button(ctx);
			v.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			v.setText("退出");
			v.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				hide();
				CA.performExit();
			} catch(e) {erp(e)}}}));
			return v;
		}
	}, {
		create : function(hide) {
			var v = new G.Button(ctx);
			v.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			v.setText("编辑剪贴板");
			v.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				hide();
				if (!Common.hasClipboardText()) {
					Common.toast("剪切板为空");
					return;
				}
				CA.showGen(CA.settings.noAnimation);
				CA.cmd.setText(String(Common.getClipboardText()));
				CA.showGen.activate(false);
			} catch(e) {erp(e)}}}));
			return v;
		}
	}, {
		create : function(hide) {
			var v = new G.Button(ctx);
			v.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
			v.setText("快速粘贴");
			v.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				hide();
				var a = [], t;
				if (Common.hasClipboardText()) {
					t = Common.getClipboardText();
					a.push({
						text : t,
						description : "剪贴板",
						cmd : t
					});
				}
				CA.his.forEach(function(e) {
					if (e == t) return;
					a.push({
						text : e,
						cmd : e
					});
				});
				CA.fav.forEach(function(e) {
					a.push({
						text : e.key,
						description : e.value,
						cmd : e.value
					});
				});
				Common.showListChooser(a, function(id) {
					gHandler.post(function() {
						CA.performPaste(String(a[id].cmd));
					});
				}, true);
			} catch(e) {erp(e)}}}));
			return v;
		}
	}],
	checkFeatures : function() {
		var i;
		for (i in this.Features) {
			this.Features[i].flag = this.IntelliSense.checkPackVer(this.Features[i]);
		}
	},
	hasFeature : function(feature) {
		return this.Features[feature].flag == 0;
	},
	Features : {
		enableCommand : {
			minSupportVer : "0.16"
		},
		enableCommandBlock : {
			minSupportVer : "1.0.5"
		},
		enableLocalCoord : {
			minSupportVer : "1.2"
		},
		version_1_1 : {
			minSupportVer : "1.1",
			maxSupportVer : "1.1.*",
		}
	},
	showAboutDialog : function() {
		Common.showConfirmDialog({
			title : ISegment.rawJson([{
				text : "命令助手",
				bold : true
			},
			" - ", CA.publishDate, " (", CA.version, ")\n\n", {
				text : "Copyright ProjectXero 2017 - 2018",
				bold : true
			}]),
			buttons : [
				"分享链接",
				"加入交流群",
				"提出意见/反馈bug",
				"向作者捐助"
			],
			callback : function(id) {
				var t;
				switch (id) {
					case 0:
					t = "http://pan.baidu.com/share/link?shareid=2966673396&uk=404195919";
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_SEND).setType("text/plain").putExtra(android.content.Intent.EXTRA_TEXT, new java.lang.String("Hi，我发现一款很棒的Minecraft辅助软件，命令助手。下载链接：" + t)));
					} catch(e) {
						Common.setClipboardText(t);
						Common.toast("下载链接已复制到剪贴板");
					}
					break;
					case 1:
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://jq.qq.com/?_wv=1027&k=46Yl84D")));
					} catch(e) {
						Common.toast("QQ群号已复制至剪贴板");
						Common.setClipboardText("207913610");
					}
					break;
					case 2:
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://projectxero.mikecrm.com/CDOsI2C")));
					} catch(e) {
						Common.showWebViewDialog({
							url : "http://projectxero.mikecrm.com/CDOsI2C"
						});
					}
					break;
					case 3:
					CA.showDonateDialog();
				}
				offset = 30 * 24 * 60 * 60 * 1000; //30d
			},
		});
	},
	getQRCode : function(w, size, code) {
		var bytes = android.util.Base64.decode(code, 2), x, y;
		var bmp = G.Bitmap.createBitmap(w, w, G.Bitmap.Config.ARGB_8888);
		var cv = new G.Canvas(bmp);
		var pt = new G.Paint();
		pt.setAntiAlias(true);
		pt.setColor(G.Color.BLACK);
		pt.setStyle(G.Paint.Style.FILL);
		cv.drawColor(G.Color.WHITE);
		cv.scale(w / (size + 2), w / (size + 2));
		cv.translate(1, 1);
		for (x = 0; x < size; x++) {
			for (y = 0; y < size; y++) {
				t = x * size + y;
				if (bytes[t >> 3] & new java.lang.Integer(1 << (t & 7)).byteValue()) {
					cv.drawRect(x, y, x + 1, y + 1, pt);
				}
			}
		}
		return bmp;
	},
	showDonateDialog : function() {G.ui(function() {try {
		var layout, scr, text, img, exit, popup, bmp;
		scr = new G.ScrollView(ctx);
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		layout.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
		Common.applyStyle(layout, "message_bg");
		text = new G.TextView(ctx);
		text.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		text.setText("捐助通道（微信支付)\n\n命令助手捐助\n2.99元");
		text.setGravity(G.Gravity.CENTER);
		text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		Common.applyStyle(text, "textview_default", 4);
		layout.addView(text);
		img = new G.ImageView(ctx);
		img.setImageBitmap(bmp = CA.getQRCode(240 * G.dp, 37, "f14l0z9I5TYKdmlZGN0u/Fqj23XvNXSDsjOw4F9VVfUHyOz0AOLWOvZhY0LFaqU5K4ae3tR7QsN1ohFOM+T/sdDdGmA6z4wzpGj+UIJ3zPZMdJtCMYGq25wk00tBnyRrXC/gBPP2NvS/IVGoqmhh9vOqg6r3/O3sZJ+d5TUcEhEzZH1mj/8BBAsu+t9uZlYJOv+vGF1mVPa1S9lj5nRBFDaWoDvEzvsHu9S5AQ=="));
		img.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
		img.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			try {
				var f = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "Pictures/ca_donate.png");
				f.getParentFile().mkdirs();
				var out = new java.io.FileOutputStream(f);
				bmp.compress(G.Bitmap.CompressFormat.PNG, 0, out);
				out.close();
				Common.toast("图片已保存至" + f.getAbsolutePath());
			} catch(e) {
				Common.toast("图片保存失败\n" + e);
			}
		} catch(e) {erp(e)}}}));
		layout.addView(img);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("关闭");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			popup.dismiss();
			bmp.recycle();
			Common.toast("感谢您的支持！");
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		scr.addView(layout);
		popup = Common.showDialog(scr, -2, -2);
	} catch(e) {erp(e)}})},
	
	SpecialTips : [
		function(d) {
			if (d.getFullYear() > 2017 && d.getMonth() == 2 && d.getDate() == 20) return "命令助手" + (d.getFullYear() - 2017) + "周年！感谢你们的支持！";
		},
		function(d) {
			if (d.getMonth() == 4 && d.getDate() == 1) return "劳动节快乐！";
		},
		function(d) {
			if (d.getMonth() == 5 && d.getDate() == 1) return "儿童节快乐！";
		},
		function(d) {
			if (d.getMonth() == 9 && d.getDate() == 1) return "国庆节快乐！";
		}
	],
	getTip : function() {
		var i, date = new Date(), t;
		for (i in this.SpecialTips) {
			t = this.SpecialTips[i](date);
			if (t) return t;
		}
		this.settings.tipsRead = isNaN(this.settings.tipsRead) ? 0 : (this.settings.tipsRead + 1) % this.tips.length;
		return this.tips[this.settings.tipsRead];
	},
	
	showBatchBuilder : function self(text, reset) {G.ui(function() {try {
		if (!self.linear) {
			self.variables = [];
			self.bmpcache = [];
			self.init = function(s) {
				self.variables.length = 0;
				self.spanNo = {};
				self.edit.setText(self.unflatten(s));
				self.edit.setSelection(self.edit.length());
				self.setContent(self.getDefaultContent());
			}
			self.setContent = function(v) {
				if (self.container.getChildAt(0) != v) {
					self.container.removeAllViews();
					self.container.addView(v, new G.FrameLayout.LayoutParams(-1, -1));
				}
			}
			self.unflatten = function(str) {
				var start = 0, r = new G.SpannableStringBuilder();
				var pos_start, pos_type, pos_param, pos_end;
				var cur, match, has_param, error = [];
				while ((pos_start = str.indexOf("${", start)) >= 0) {
					r.append(str.slice(start, pos_start).replace(/\$ /g, "$"));
					try {
						pos_type = str.indexOf(":", pos_start + 2);
						if (pos_type < 0) throw "找不到变量类型";
						pos_param = str.indexOf("(", pos_type + 1);
						pos_end = str.indexOf("}", pos_type + 1);
						if (pos_end < 0) throw "找不到变量结束符";
						has_param = pos_param >= 0 && pos_end > pos_param;
						cur = {
							label : str.slice(pos_start + 2, pos_type),
							type : str.slice(pos_type + 1, has_param ? pos_param : pos_end)
						};
						if (cur.label.length == 0) throw "变量名称不能为空";
						if (!(cur.type in CA.BatchPattern)) throw "不存在的变量类型：" + cur.type;
						if (has_param) {
							match = CA.BatchPattern[cur.type].parse(str.slice(pos_param));
							if (!match) throw "变量参数格式错误";
							start = pos_param + match.length;
							cur.data = match.data;
						} else {
							cur = self.createVariable(cur.label, cur.type);
							start = pos_end;
						}
						if (str.slice(start, ++start) != "}") throw "找不到变量结束符";
						r.append(self.buildSpan(cur));
						self.variables.push(cur);
					} catch(e) {
						error.push(e + "(位置：" + pos_start + ")");
						r.append("${");
						start = pos_start + 2;
						continue;
					}
				}
				r.append(str.slice(start).replace(/\$ /g, "$"));
				if (error.length) {
					Common.showTextDialog(error.join("\n"));
				}
				return r;
			}
			self.addVariable = function() {
				var i, r = [], a = CA.BatchPattern;
				for (i in a) {
					r.push({
						text : a[i].name,
						description : a[i].description,
						obj : a[i],
						id : i
					});
				}
				Common.showListChooser(r, function(pos) {
					var e = r[pos];
					if (!self.spanNo[e.id]) self.spanNo[e.id] = 0;
					self.insertVariable(self.createVariable(e.text + (++self.spanNo[e.id]), e.id), true);
				}, true);
			}
			self.createImageSpan = function(bgcolor, frcolor, fontsize, text) {
				var margin = 2 * G.dp, padding = 4 * G.dp;
				var offset = margin + padding;
				var pt = new G.Paint();
				fontsize *= G.sp;
				pt.setAntiAlias(true);
				pt.setTextSize(fontsize);
				pt.setTypeface(G.Typeface.MONOSPACE);
				var fb = new G.Rect(), fm = pt.getFontMetrics();
				fontsize -= 2 * offset / (fm.descent - fm.ascent);
				pt.setTextSize(fontsize);
				pt.getFontMetrics(fm);
				pt.getTextBounds(text, 0, text.length, fb);
				fb.top = fm.ascent; fb.bottom = fm.descent;
				var bmp = G.Bitmap.createBitmap(fb.width() + 2 * offset, fb.height() + 2 * offset, G.Bitmap.Config.ARGB_8888);
				var cv = new G.Canvas(bmp);
				var ox = -fb.left, oy = -fb.top;
				pt.setColor(bgcolor);
				fb.inset(-padding, -padding);
				fb.offsetTo(margin, margin);
				cv.drawRect(fb, pt);
				pt.setColor(frcolor);
				cv.drawText(text, offset + ox, offset + oy , pt);
				self.bmpcache.push(bmp);
				return new G.ImageSpan(ctx, bmp, 0); //0 = ALIGN_BOTTOM
			}
			self.createVariable = function(label, type) {
				var o = {
					label : label,
					type : type,
					data : CA.BatchPattern[type].create()
				};
				return o;
			}
			self.insertVariable = function(o, notify) {
				self.variables.push(o);
				Common.replaceSelection(self.edit.getText(), self.buildSpan(o));
				if (notify) self.clickSpan(o.span);
			}
			self.buildSpan = function(o) {
				var ss = new G.SpannableString("${" + o.label + ":" + o.type + "}");
				var span = self.createImageSpan(Common.theme.highlightcolor, Common.theme.bgcolor, Common.theme.textsize[3], o.label);
				ss.setSpan(span, 0, ss.length(), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
				o.span = span;
				return ss;
			}
			self.findVariableBySpan = function(span) {
				var i, e;
				for (i in self.variables) {
					e = self.variables[i];
					if (e.span == span) return e;
				}
				return null;
			}
			self.clickSpan = function(span) {
				var e = self.findVariableBySpan(span);
				if (!e) return;
				if (e.data.onClick) e.data.onClick();
				if (e.data.layout) {
					self.setContent(e.data.layout);
				} else {
					self.setContent(self.getDefaultContent());
				}
			}
			self.endSpanEdit = function() {
				self.setContent(self.getDefaultContent());
			}
			self.getVariables = function() {
				var template = self.edit.getText();
				var spans = template.getSpans(0, template.length(), G.ImageSpan);
				var i, variables = [], e;
				for (i in spans) {
					e = self.findVariableBySpan(spans[i]);
					if (!e) continue;
					e.start = template.getSpanStart(spans[i]);
					e.end = template.getSpanEnd(spans[i]);
					variables.push(e);
				}
				variables.sort(function(a, b) {
					return a.start - b.start;
				});
				return variables;
			}
			self.flatten = function() {
				var template = String(self.edit.getText());
				var vars = self.getVariables();
				var i, r = [], pos = 0;
				for (i in vars) {
					r.push(template.slice(pos, vars[i].start));
					r.push("${", vars[i].label, ":", vars[i].type);
					r.push(CA.BatchPattern[vars[i].type].stringify(vars[i].data));
					r.push("}");
					pos = vars[i].end;
				}
				r.push(template.slice(pos, template.length));
				return r.join("");
			}
			self.concatStrBundle = function(target, string) {
				var i, j, dstLen, strLen;
				if (!target.length) target.push("");
				if (!Array.isArray(string)) string = [string];
				dstLen = target.length;
				strLen = string.length;
				if (strLen > 1) {
					target.length *= strLen;
					for (i = dstLen - 1; i >= 0; i--) {
						for (j = 0; j < strLen; j++) {
							target[i * strLen + j] = target[i];
						}
					}
				}
				for (i = 0; i < dstLen; i++) {
					for (j = 0; j < strLen; j++) {
						target[i * strLen + j] += string[j];
					}
				}
				return target;
			}
			self.export = function() {
				var template = String(self.edit.getText());
				var vars = self.getVariables();
				var i, r = [], pos = 0;
				for (i in vars) {
					self.concatStrBundle(r, template.slice(pos, vars[i].start));
					self.concatStrBundle(r, CA.BatchPattern[vars[i].type].export(vars[i].data));
					pos = vars[i].end;
				}
				self.concatStrBundle(r, template.slice(pos, template.length));
				return r;
			}
			self.touchEvent = function(event) {
				var widget = self.edit, buffer = self.edit.getText();
				var action = event.getAction(), x = event.getX(), y = event.getY();
				var layout, linear, line, off, links;
				x -= widget.getTotalPaddingLeft();
				y -= widget.getTotalPaddingTop();
				x += widget.getScrollX();
				y += widget.getScrollY();
				layout = widget.getLayout();
				line = layout.getLineForVertical(y);
				off = layout.getOffsetForHorizontal(line, x);
				links = buffer.getSpans(off, off, G.ImageSpan);
				if (x < layout.getLineMax(line) && links.length != 0) {
					if (action == event.ACTION_UP) {
						self.clickSpan(links[0]);
					} else if (action == event.ACTION_DOWN) {
						G.Selection.setSelection(buffer,
							buffer.getSpanStart(links[0]),
							buffer.getSpanEnd(links[0]));
					}
					return true;
				} else {
					self.endSpanEdit();
				}
				return false;
			}
			self.menuVMaker = function(holder) {
				var view = new G.TextView(ctx);
				view.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				Common.applyStyle(view, "textview_default", 3);
				return holder.text = view;
			}
			self.menuVBinder = function(holder, e) {
				holder.text.setText(e.text);
			}
			self.buildMenuView = function(arr) {
				var list = new G.ListView(ctx);
				list.setAdapter(new SimpleListAdapter(arr, self.menuVMaker, self.menuVBinder));
				list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
					parent.getItemAtPosition(pos).onclick();
				} catch(e) {erp(e)}}}));
				return list;
			}
			self.getDefaultContent = function() {
				if (self.content_default) return self.content_default;
				var view = self.buildMenuView([{
					text : "添加变量……",
					onclick : function() {
						self.addVariable();
					}
				}, {
					text : "预览",
					onclick : function() {
						if (!self.edit.length()) {
							Common.toast("模板为空");
							return;
						}
						Common.showTextDialog(self.export().join("\n"));
					}
				}, {
					text : "保存至历史",
					onclick : function() {
						if (!self.edit.length()) {
							Common.toast("模板为空");
							return;
						}
						self.export().forEach(function(e) {
							if (e.length) CA.addHistory(e);
						});
						if (CA.history) CA.showHistory();
						self.popup.dismiss();
						Common.toast("已保存至历史");
					}
				}, {
					text : "收藏模板",
					onclick : function() {
						if (!self.edit.length()) {
							Common.toast("模板为空");
							return;
						}
						var cmd = self.flatten();
						Common.showInputDialog({
							title : "名称",
							callback : function(s) {
								if (CA.getFavorite(s)) {
									Common.toast("名称已存在");
								} else {
									if (!s) s = cmd;
									CA.addFavorite(s, cmd);;
									if (CA.history) CA.showHistory();
									Common.toast("模板已收藏");
								}
							},
							singleLine : true
						});
					}
				}, {
					text : "清空并关闭",
					onclick : function() {
						self.edit.setText("");
						self.popup.dismiss();
					}
				}]);
				self.content_default = view;
				PWM.registerResetFlag(self, "content_default");
				return view;
			}
			
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			Common.applyStyle(self.linear, "container_default");
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			self.header.setPadding(5 * G.dp, 0, 0, 0)
			self.header.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(self.header, "bar_float");
			self.edit = new G.EditText(ctx);
			self.edit.setSingleLine(true);
			self.edit.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1.0));
			self.edit.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
			self.edit.setTypeface(G.Typeface.MONOSPACE);
			Common.applyStyle(self.edit, "edittext_default", 3);
			self.edit.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				var action = e.getAction();
				if (action == e.ACTION_DOWN || action == e.ACTION_UP) self.touchEvent(e);
				return false;
			} catch(e) {return erp(e), true}}}));
			self.header.addView(self.edit);
			self.exit = new G.TextView(ctx);
			self.exit.setText("×");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(10 * G.dp, 0, 10 * G.dp, 0)
			self.exit.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.popup.dismiss();
			} catch(e) {erp(e)}}}));
			self.header.addView(self.exit);
			self.linear.addView(self.header);
			self.container = new G.FrameLayout(ctx);
			self.container.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			self.linear.addView(self.container);
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
		if (reset || !self.edit.length()) self.init(text || "");
	} catch(e) {erp(e)}})},
	BatchPattern : {
		list : {
			name : "列表",
			create : function() {
				return this.buildLayout({
					list : []
				});
			},
			parse : function(s) {
				var z = s.indexOf("|)");
				if (z < 0) return;
				return {
					length : z + 2,
					data : this.buildLayout({
						list : s.slice(1, z).split("|")
					})
				};
			},
			stringify : function(o) {
				this.update(o);
				return "(" + o.list.join("|") + "|)";
			},
			export : function(o) {
				this.update(o);
				return o.list;
			},
			buildLayout : function(o) {
				var text = new G.EditText(ctx);
				text.setText(o.list.join("\n"));
				text.setHint("每一行为列表的一个条目");
				text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
				text.setGravity(G.Gravity.LEFT | G.Gravity.TOP);
				text.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
				Common.applyStyle(text, "edittext_default", 3);
				o.layout = o.edittext = text;
				return o;
			},
			update : function(o) {
				o.list = String(o.edittext.getText()).split("\n");
			}
		}
	},
	
	IntelliSense : {
		UNINITIALIZED : 0,
		ONLY_COMMAND_NAME : 1,
		UNKNOWN_COMMAND : -1,
		COMMAND_WITH_PATTERN : 2,
		UNKNOWN_PATTERN : -2,
		inner : {},
		
		input : [],
		output : [],
		cmdname : "",
		prompt : [],
		help : "",
		patterns : [],
		mode : 0,
		last : {},
		callDelay : function self(s) {
			if (CA.settings.iiMode != 2) return;
			self.current = s;
			if (!self.thread) {
				self.thread = new java.lang.Thread(new java.lang.Runnable({run : function() {try {
					android.os.Looper.prepare();
					self.handler = new android.os.Handler();
					android.os.Looper.loop();
					self.thread = null;
				} catch(e) {erp(e)}}}));
				self.thread.start();
				self.runnable = function() {
					CA.IntelliSense.proc(self.current);
					self.running = false;
				}
				self.running = false;
				while (!self.handler);
			}
			if (self.running) self.handler.removeCallbacks(self.runnable);
			self.handler.postDelayed(self.runnable, 150);
			self.running = true;
		},
		apply : function() {
			if (this.ui) this.show.apply(this);
		},
		proc : function(s) {try {
			if (CA.settings.iiMode != 2) return;
			var r = this.procCmd(s);
			this.source = r.source;
			this.cmdname = r.cmdname;
			this.hasSlash = r.hasSlash;
			this.strParam = r.strParam;
			this.input = r.input;
			this.output = r.output;
			this.help = r.help;
			this.prompt = r.prompt;
			this.patterns = r.patterns;
			//应用更改
			this.apply();
		} catch(e) {
			Common.showTextDialog("当前命令库解析出错。\n" + e + (e instanceof Error ? "\n堆栈：\n" + e.stack : ""));
		}},
		procCmd : function(s) {
			var c, ca, t, i, pp, r;
			
			//分析命令结构 - 拆分
			c = /^(\/)?(\S*)(\s+)?(.*)/.exec(s);
			if (!c) return; //c = [匹配文本, 是否存在/, 命令名称, 是否存在命令名称后的空格, 命令参数]
			
			r = {
				source : c[0],
				cmdname : c[2],
				hasSlash : Boolean(c[1]),
				strParam : c[4],
				input : [],
				output : {},
				prompt : [],
				patterns : [],
				help : null,
				canFinish : false
			};
			
			if (c[3]) {
				//分类 - 输入参数中
				if (c[2] in this.library.commands) {
					//分类 - 存在命令
					this.procParams(r);
				} else {
					//分类 - 不存在命令
					//提示命令未找到
					pp = new G.SpannableStringBuilder((c[1] ? "/" : "") + c[2] + " ");
					appendSSB(pp, "...", new G.ForegroundColorSpan(Common.theme.highlightcolor));
					pp.append("\n");
					appendSSB(pp, "无法在库中找到命令“" + c[2] + "”。", new G.ForegroundColorSpan(Common.theme.criticalcolor));
					r.prompt.push(pp);
					r.help = "找不到这样的命令";
					r.mode = this.UNKNOWN_COMMAND;
				}
			} else {
				//分类 - 未输入参数
				
				//获得可选命令
				t = this.library.command_snap;
				ca = Object.keys(t).filter(function(e, i, a) {
					return e.indexOf(c[2]) >= 0 || t[e].indexOf(c[2]) >= 0;
				}).sort();
				
				if (ca.length) {
					//分类 - 可选命令长度大于0
					
					ca.forEach(function(e, i, a) {
						pp = new G.SpannableStringBuilder(c[1] ? "/" : "");
						appendSSB(pp, e, new G.ForegroundColorSpan(Common.theme.highlightcolor));
						t = this.library.commands[e];
						while (t.alias) t = this.library.commands[t.alias];
						
						//存在无参数用法
						if (!t.noparams) pp.append(" ...");
						if (t.noparams && c[2] == e && t.noparams.description) { //当命令全输入且存在无参数用法时
							r.canFinish = true;
							pp.append("\n");
							appendSSB(pp, t.noparams.description, new G.ForegroundColorSpan(Common.theme.promptcolor));
						} else if ("description" in t) { //存在提示则显示提示
							pp.append("\n");
							appendSSB(pp, t.description, new G.ForegroundColorSpan(Common.theme.promptcolor));
						}
						r.prompt.push(pp);
						r.output[t.description ? e + " - "  + t.description : e] = (r.hasSlash ? "/" : "") + e + (t.noparams ?  "" : " ");
					}, this);
					
					t = this.library.commands[ca[0]];
					while (t.alias) t = this.library.commands[t.alias];
					r.help = t.help ? t.help : "该命令帮助还未上线";
					r.mode = this.ONLY_COMMAND_NAME;
				} else {
					//分类 - 可选命令长度等于0（无可选命令）
					//提示命令不存在
					pp = new G.SpannableStringBuilder(c[1] ? "/" : "");
					appendSSB(pp, c[2], new G.ForegroundColorSpan(Common.theme.highlightcolor));
					pp.append(" ...\n");
					appendSSB(pp, "无法在库中找到命令“" + c[2] + "”。", new G.ForegroundColorSpan(Common.theme.criticalcolor));
					r.prompt.push(pp);
					r.help = "命令不存在";
					r.mode = this.UNKNOWN_COMMAND;
				}
				
				//设置列表内容及反应
				r.input = Object.keys(r.output);
			}
			return r;
		},
		procParams : function(c) {
			var i, j, cm = this.library.commands[c.cmdname], ps, pa, ci, cp, t, f = true, k, u, ms, pp, cpl = [], nn = false, erm = [];
			
			//别名处理
			while (cm.alias) cm = this.library.commands[cm.alias];
			
			c.help = cm.help ? cm.help : "该命令帮助还未上线";
			ps = cm.patterns;
			c.canFinish = false;
			
			//对每一种模式进行判断
			for (i in ps) {
				pa = ps[i].params;
				ci = 0;
				
				//重置提示
				pp = new G.SpannableStringBuilder((c.hasSlash ? "/" : "") + c.cmdname);
				cpl.length = 0;
				
				//逐部分匹配参数
				for (j = 0; j < pa.length; j++) {
					cp = pa[j];
					
					//匹配参数
					t = this.matchParam(cp, c.strParam.slice(ci));
					
					if (t && t.length >= 0 && ((/^\s?$/).test(c.strParam.slice(ci += t.length, ++ci)))) {
						//分类 - 匹配成功
						ci += (/^\s*/).exec(c.strParam.slice(ci))[0].length;
						
						if (ci > c.strParam.length) {
							//分类 - 到达末尾
							//处理提示与输入
							u = (c.hasSlash ? "/" : "") + c.cmdname + " " + c.strParam.slice(0, ci - t.length - 1);
							if (pa[j + 1] && !pa[j + 1].optional) {
								for (k in t.output) t.output[k] = t.output[k] + " ";
							}
							if (t.length && t.canFinish && pa[j + 1]) nn = true;
							if (t.input) for (k in t.input) if (c.input.indexOf(t.input[k]) < 0) c.input.push(t.input[k]);
							if (t.output) for (k in t.output) if (!(k in c.output)) c.output[k] = u + t.output[k];
							if (t.recommend) for (k in t.recommend) if (!(k in c.output)) c.output[k] = u + t.recommend[k];
							if (t.assist) for (k in t.assist) if (!(k in c.output)) c.output[k] = c.source + t.assist[k];
							if (t.menu) for (k in t.menu) if (!(k in c.output)) c.output[k] = t.menu[k];
							if (t.canFinish && (!pa[j + 1] || pa[j + 1].optional)) c.canFinish = true;
							f = false;
							pp.append(" ");
							pp.append(this.getParamTag(cp, c.strParam.slice(ci - t.length - 1, ci), 1, t));
							for (j++; j < pa.length; j++) {
								pp.append(" ");
								pp.append(this.getParamTag(pa[j], "", 2, null));
							}
							if (t.description || cp.description || ps[i].description || cm.description) appendSSB(pp, "\n" + (t.description ? String(t.description) : cp.description ? String(cp.description) : ps[i].description ? String(ps[i].description) : String(cm.description)), new G.ForegroundColorSpan(Common.theme.promptcolor));
							//详情优先级：匹配函数动态产生 > 当前参数 > 当前用法 > 当前命令 > 不显示
							
							c.prompt.push(pp);
							c.patterns.push(cpl);
							break;
						} else {
							//分类 - 未到达末尾
							if (!t.canFinish) if (cp.canIgnore) {
								continue;
							} else {
								pp.append(" ");
								pp.append(this.getParamTag(cp, "", 3, t));
								for (k = j + 1; k < pa.length; k++) {
									pp.append(" ");
									pp.append(this.getParamTag(pa[k], "", 2, null));
								}
								erm.push({
									desp : "未结束的参数",
									count : j,
									pp : pp
								});
								break;
							}
							pp.append(" ");
							pp.append(this.getParamTag(cp, c.strParam.slice(ci - t.length - 1, ci - 1), 0));
							cpl.push(t);
						}
					} else {
						//分类 - 匹配失败
						if (cp.canIgnore) {
							continue;
							//忽略参数
						} else {
							pp.append(" ");
							pp.append(this.getParamTag(cp, "", 3, t));
							for (k = j + 1; k < pa.length; k++) {
								pp.append(" ");
								pp.append(this.getParamTag(pa[k], "", 2, null));
							}
							erm.push({
								desp : !t ? null : t.length >= 0 ? "字符多余：" + c.strParam.slice(ci - 1) : t.description,
								count : j,
								pp : pp
							});
							break;
							//下一个模式
						}
					}
					if (cp.repeat) {
						j--; continue;
						//重复
					}
				}
			}
			//如果未找到正确用法
			if (f) {
				c.input = [];
				erm.sort(function(a, b) {
					return b.count - a.count;
				});
				erm.forEach(function(e) {
					e.pp.append("\n");
					appendSSB(e.pp, e.desp ? e.desp : "用法不存在", new G.ForegroundColorSpan(Common.theme.criticalcolor));
					c.prompt.push(e.pp);
				});
				if (!erm.length) {
					pp = new G.SpannableStringBuilder((c.hasSlash ? "/" : "") + c.cmdname + " ");
					appendSSB(pp, "...", new G.ForegroundColorSpan(Common.theme.highlightcolor));
					pp.append("\n");
					appendSSB(pp, "无法在库中找到命令“" + c.cmdname + "”的此类用法。", new G.ForegroundColorSpan(Common.theme.criticalcolor));
					c.prompt.push(pp);
				}
			} else if (nn) {
				c.input.push("  - 下一个参数");
				c.output["  - 下一个参数"] = c.source + " ";
			}
			c.mode = f ? this.UNKNOWN_PATTERN : this.COMMAND_WITH_PATTERN;
		},
		matchParam : function(cp, ps) {
			var i, r, t, t2, t3, t4;
			switch (cp.type) {
				case "text":
				case "rawjson":
				r = {
					length : ps.length,
					canFinish : true
				};
				break;
				
				case "nbt":
				case "json":
				r = {
					input : ["插入JSON"],
					menu : {
						"插入JSON" : function() {
							CA.IntelliSense.assistJSON(cp);
						}
					},
					length : ps.length,
					canFinish : true
				};
				break;
				
				case "plain":
				t = cp.name;
				if (cp.prompt) t += " - " + cp.prompt;
				r = {
					input : [t],
					output : {}
				};
				r.output[t] = cp.name;
				if (ps.startsWith(cp.name + " ") || ps == cp.name) {
					r.length = cp.name.length;
					r.canFinish = true;
				} else if (cp.name.indexOf(ps) >= 0 || cp.prompt && cp.prompt.indexOf(ps) >= 0) {
					r.length = ps.length;
					r.canFinish = false;
				} else return {
					description : "不可为" + ps
				};
				break;
				
				case "selector":
				r = this.procSelector(cp, ps);
				if (!r || !(r.length >= 0)) return r;
				break;
				
				case "uint":
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				if (!(/^\d*$/).test(t)) return {
					description : t + "不是自然数"
				};
				r = {
					length : t.length,
					canFinish : t.length > 0
				};
				break;
				
				case "int":
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				if (!(/^(\+|-)?\d*$/).test(t)) return {
					description : t + "不是整数"
				};
				r = {
					length : t.length,
					canFinish : t.length && !isNaN(t)
				};
				break;
				
				case "float":
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				if (!(t2 = (/^(\+|-)?(\d*\.)?(\d)*$/).exec(t))) return {
					description : t + "不是数值"
				};
				r = {
					length : t.length,
					canFinish : t.length && t2[3]
				};
				break;
				
				case "relative":
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				if (!(t2 = (/^(~)?((\+|-)?(\d*\.)?(\d)*)$/).exec(t))) return {
					description : t + "不是数值"
				};
				r = {
					length : t.length,
					input : ["~ - 相对标识符"],
					assist : {
						"~ - 相对标识符" : "~"
					},
					canFinish : t2[5] || t2[1] && !t2[2].length
				};
				break;
				
				case "position":
				r = this.procPosition(cp, ps);
				if (!r || !(r.length >= 0)) return r;
				break;
				
				case "custom":
				t = new RegExp(cp.input, "").exec(ps);
				if (!t) return {
					description : t + "不满足指定的条件"
				};
				r = {
					length : t[0].length,
					canFinish : new RegExp(cp.finish, "").test(ps)
				};
				break;
				
				case "enum":
				if (!(t = cp.list instanceof Object ? cp.list : this.library.enums[cp.list])) throw "无法找到指定枚举类型";
				r = {
					output : {},
					canFinish : false,
					length : -1
				};
				if (Array.isArray(t)) { //这个懒得用matchString了
					r.input = t.filter(function(e, i, a) {
						if (ps.startsWith(e + " ") || ps == e) {
							r.length = Math.max(r.length, e.length);
							r.canFinish = true;
						} else if (e.startsWith(ps)) {
							r.length = Math.max(r.length, ps.length);;
						} else return false;
						r.output[e] = e;
						return true;
					});
					r.input.sort();
				} else {
					t2 = [];
					r.input = [];
					Object.keys(t).forEach(function(e, i, a) {
						if (ps.startsWith(e + " ") || ps == e) {
							r.length = Math.max(r.length, e.length);
							r.canFinish = true;
						} else if (e.indexOf(ps) >= 0 || t[e].indexOf(ps) >= 0) {
							r.length = Math.max(r.length, ps.length);
						} else return;
						if (t[e]) {
							r.output[e + " - " + t[e]] = e;
							r.input.push(e + " - " + t[e]);
						} else {
							r.output[e] = e;
							t2.push(e);
						}
					});
					r.input.sort(); t2.sort(); r.input = r.input.concat(t2);
				}
				if (r.length < 0) {
					r.description = ps + "不是有效的元素";
				}
				break;
				
				case "command":
				t = this.procCmd(ps);
				if (!t) return {
					description : "不是合法的命令格式"
				};
				t2 = t.prompt[0];
				t3 = t2.toString().indexOf("\n");
				r = {
					length : t.mode < 0 ? -1 :  t.source.length,
					input : t.input,
					output : {},
					menu : {},
					canFinish : t.canFinish,
					description : String(t2.subSequence(t3 + 1, t2.length())),
					tag : t2.subSequence(0, t3)
				}
				for (i in t.output) {
					if (t.output[i] instanceof Function) {
						r.menu[i] = t.output[i];
					} else {
						r.output[i] = t.output[i];
					}
				}
				break;
				
				case "string":
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				r = {
					length : t.length,
					canFinish : t.length > 0
				};
				break;
				
				default:
				t = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "));
				r = {
					length : t.length,
					canFinish : true
				};
			}
			if (!cp.suggestion) return r;
			t = cp.suggestion instanceof Object ? cp.suggestion : this.library.enums[cp.suggestion];
			t2 = ps.slice(0, r.length);
			this.matchString(t2, t, r);
			return r;
		},
		getParamTag : function(cp, ms, mt, md) { //匹配模式，匹配字符串，匹配类型（已输入、输入中、未输入、出错），matchParam返回的匹配数据
			var z = cp.name, t, t2;
			if (mt == 1 || mt == 3) {
				switch (cp.type) {
					case "int":
					z += ":整数";
					break;
					
					case "uint":
					z += ":正整数";
					break;
					
					case "float":
					case "relative":
					z += ":数值";
					break;
					
					case "nbt":
					z += ":数据标签";
					break;
					
					case "rawjson":
					z += ":文本JSON";
					break;
					
					case "json":
					z += ":JSON";
					break;
					
					case "selector":
					z += ":实体";
					break;
					
					case "enum":
					z += ":列表";
					break;
					
					case "plain":
					break;
					
					case "custom":
					if (cp.vtype) z += ":" + cp.vtype;
					break;
					
					case "position":
					if (mt == 3) {
						z += ":x y z";
						break;
					}
					t2 = md.uv ? ["左", "上", "前"] : ["x", "y", "z"];
					t = (/(\S*)\s*(\S*)\s*(\S*)/).exec(ms);
					if (t[1]) t2[0] = t[1];
					if (t[2]) t2[1] = t[2];
					if (t[3]) t2[2] = t[3];
					z += ":" + t2.join(" ");
					break;
					
					case "command":
					if (md) {
						return md.tag;
					}
					z += ":命令";
					break;
					
					case "text":
					default:
					z += ":文本";
					break;
				}
			}
			if (cp.type != "plain" && !cp.optional && !cp.canIgnore && !cp.chainOptional) z = "<" + z + ">";
			if (cp.optional || cp.canIgnore || cp.chainOptional) z = "[" + z + "]";
			if (cp.type == "custom") {
				if (cp.prefix) z = cp.prefix + z;
				if (cp.suffix) z = z + cp.suffix;
			}
			if (cp.repeat && mt == 1) z = z + " ...";
			z = new G.SpannableString(z);
			if (mt == 2) {
				z.setSpan(new G.ForegroundColorSpan(Common.theme.promptcolor), 0, z.length(), z.SPAN_INCLUSIVE_EXCLUSIVE);
			} else if (mt == 1) {
				z.setSpan(new G.ForegroundColorSpan(Common.theme.highlightcolor), 0, z.length(), z.SPAN_INCLUSIVE_EXCLUSIVE);
			} else if (mt == 3) {
				z.setSpan(new G.ForegroundColorSpan(Common.theme.criticalcolor), 0, z.length(), z.SPAN_INCLUSIVE_EXCLUSIVE);
			}
			return z;
		},
		procSelector : function(cp, ps) {
			var c = (/^@(p|e|a|r|s|)(\[)?([^\s\]]*)(\])?(\s)?/).exec(ps), ml, t, i, pl, ms, rx, ls, cp2, mr, bb, sk = false;
			//[全文, 选择器类型, "[", 修饰符, "]", 后置空格]
			if (!c) {
				//正在输入@ / 输入的是玩家名
				t = {
					length : (ms = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "))).length,
					recommend : {},
					canFinish : ps.length > 0
				};
				if (!(/^[^@\^~]*$/).test(ms) || ms.length && !isNaN(ms)) return {
					description : ms + "不是合法的玩家名或选择器"
				};
				if (cp.target == "entity" || cp.target == "player") {
					t.recommend["@a - 选择所有玩家"] = "@a";
					t.recommend["@p - 选择距离最近的玩家"] = "@p";
					t.recommend["@r - 选择随机玩家"] = "@r";
				}
				if (cp.target == "entity" || cp.target == "nonplayer") t.recommend["@e - 选择所有实体"] = "@e";
				if (cp.target != "nonselector") t.recommend["@s - 选择命令执行者"] = "@s";
				t.input = Object.keys(t.recommend);
				if (MCAdapter.available()) {
					t.output = {};
					pl = MCAdapter.getInfo("playernames");
					if (pl) {
						for (i in pl) if (String(pl[i]).startsWith(ms)) t.output[pl[i]] = String(pl[i]);
						t.input = t.input.concat(Object.keys(t.output));
					}
				} else MCAdapter.applySense(t);
			} else if (c[1].length < 1) {
				//正在输入p/e/a/r
				t = {
					length : 1,
					recommend : {
						"@a - 选择所有玩家" : "@a",
						"@p - 选择距离最近的玩家" : "@p",
						"@r - 选择随机玩家" : "@r",
						"@s - 选择命令执行者" : "@s"
					},
					canFinish : false
				};
				if (cp.target == "entity") t.recommend["@e - 选择所有实体"] = "@e";
				t.input = Object.keys(t.recommend);
			} else if (c[1].length == 1 && !c[2]) {
				//正在输入[ / 结束
				t = {
					length : 2,
					assist : {
						"[...] - 插入参数" : "["
					},
					input : ["[...] - 插入参数"],
					canFinish : true
				};
			} else if(c[2] && !c[4] && !c[5]) {
				//正在输入修饰符
				t = {
					length : 3 + c[3].length,
					recommend : {},
					output : {},
					menu : {},
					input : [],
					canFinish : false
				};
				ml = c[3].split(",");
				pl = {};
				ls = ml.pop();
				bb = ps.slice(0, ps.length - ls.length);
				if (ml.length < 4 && ml.length > 0) {
					sk = true;
					rx = /^(\+|-)?(\d*\.)?\d+$/;
					for (i in ml) { //特殊情况
						sk = sk && rx.test(ml[i]);
					}
				}
				if (!sk) rx = /^([^\=]+)(\=)(.*)$/;
				for (i in ml) { //检验之前的参数，此处需更新
					if (!(ms = rx.exec(ml[i]))) return {
						description : ml[i] + "不是合法的选择器参数对"
					};
					if (sk) continue;
					if (!(cp2 = this.library.selectors[ms[1]])) continue;
					if (cp2.hasInverted && ms[3].search(/^!/) == 0) {
						ms[3] = ms[3].slice(1);
					} else pl[ms[1]] = true;
					mr = this.matchParam(cp2, ms[3] + " ");
					if (!mr || !(mr.length >= 0)) {
						return {
							description : mr ? mr.description : ml[i] + "不是合法的选择器参数对"
						};
					} else if (mr.length < ms[3].length || !mr.canFinish) return {
						description : "未结束的选择器参数：" + ms[3]
					};
				}
				rx = sk ? /^(\+|-)?(\d*\.)?\d*$/ : /^([^\=]*)(\=)?(.*)$/;
				if (!(ms = rx.exec(ls))) return {
					description : ls + "不是合法的选择器参数对"
				};
				if (sk) { // 特殊处理
					t.recommend[", - 下一个参数"] = bb + ls + ",";
					t.output["] - 结束参数"] = bb + ls + "]";
					t.input.push(", - 下一个参数", "] - 结束参数");
					return t;
				}
				if (ms[2]) { // 输入修饰符内容
					if (!ms[1]) return {
						description : ls + "缺少等号"
					};
					bb += ms[1] + ms[2];
					if (cp2 = this.library.selectors[ms[1]]) {
						if (cp2.hasInverted) {
							if (ms[3].startsWith("!")) {
								ms[3] = ms[3].slice(1);
								bb += "!";
							} else {
								if (!ms[3]) {
									t.recommend["! - 反向选择"] = bb + "!";
									t.input.push("! - 反向选择");
								}
							}
						}
						mr = this.matchParam(cp2, ms[3]);
						if (!mr || mr.length < ms[3].length) return {
							description : mr ? mr.description : ls + "不是合法的选择器参数对"
						};
						if (mr.canFinish) {
							t.recommend[", - 下一个参数"] = bb + ms[3] + ",";
							t.output["] - 结束参数"] = bb + ms[3] + "]";
							t.input.push(", - 下一个参数", "] - 结束参数");
						}
						for (i in mr.assist) if (!(i in t.recommend)) t.recommend[i] = ps + mr.assist[i];
						for (i in mr.recommend) if (!(i in t.recommend)) t.recommend[i] = bb + mr.recommend[i];
						for (i in mr.output) if (!(i in t.recommend)) t.recommend[i] = bb + mr.output[i];
						for (i in mr.menu) if (!(i in t.menu)) t.menu[i] = mr.menu[i];
						for (i in mr.input) if (t.input.indexOf(mr.input[i]) < 0) t.input.push(mr.input[i]);
					} else {
						t.recommend[", - 下一个参数"] = bb + ms[3] + ",";
						t.output["] - 结束参数"] = bb + ms[3] + "]";
						t.input.push(", - 下一个参数", "] - 结束参数");
					}
				} else { //输入修饰符名称
					if (ms[1]) {
						t.recommend["= - 输入参数"] = bb + ms[1] + "=";
						t.input.push("= - 输入参数");
					}
					Object.keys(this.library.selectors).forEach(function(e, i, a) {
						if (!e.startsWith(ms[1])) return;
						if (pl[e]) return;
						t.recommend[e + " - " + this.library.selectors[e].name] = bb + e + "=";
						t.input.push(e + " - " + this.library.selectors[e].name);
					}, this);
				}
			} else if (c[4]) {
				//输入完毕
				t = {
					length : (ms = ps.search(" ") < 0 ? ps : ps.slice(0, ps.search(" "))).length,
					canFinish : true
				};
			} else return {
				description : c[0] + "不是合法的选择器"
			};
			return t;
		},
		procPosition : function(cp, ps) {
			var l = ps.split(/\s+/), f = true, uv = false, i, n = Math.min(l.length, 3), t, pp, t2, t3;
			for (i = 0; i < n; i++) {
				if (i == 0 && l[0].startsWith("^") && CA.hasFeature("enableLocalCoord")) uv = true;
				if (!(t = (uv ? /^(?:(\^)((\+|-)?(\d*\.)?\d*))?$/ : /^(~)?((\+|-)?(\d*\.)?\d*)$/).exec(l[i]))) return {
					description : l[i] + "不是合法的坐标值"
				};
				if ((!t[1] || t[2]) && !(/^(\+|-)?(\d*\.)?\d+$/).test(t[2])) if (i == n - 1) {
					f = false;
				} else return {
					description : l[i] + "不是合法的坐标值"
				};
			}
			t = {
				length : n == 3 && l[2].length > 0 ? (/^\S+\s+\S+\s+\S+/).exec(ps)[0].length : ps.length,
				input : [],
				assist : {},
				canFinish : f && n == 3,
				uv : uv
			}
			if (l[n - 1].length > 0) {
				if (n < 3) {
					t.input.push("  - 空格");
					t.assist["  - 空格"] = " ";
				}
			} else {
				if (!uv) {
					t.input.push("~ - 相对位置");
					t.assist["~ - 相对位置"] = "~";
				}
				if ((ps.length == 0 || uv) && CA.hasFeature("enableLocalCoord")) {
					t.input.push("^ - 本地坐标(^左 ^上 ^前)");
					t.assist["^ - 本地坐标(^左 ^上 ^前)"] = "^";
				}
			}
			if (MCAdapter.available()) {
				t.output = {};
				pp = MCAdapter.getInfo("playerposition").slice();
				if (pp && pp[1] != 0) {
					pp[1] -= 1.619999885559082;
					t2 = pp.join(" ");
					t.output[t2 + " - 玩家实际坐标"] = t2;
					t2 = [Math.floor(pp[0]), Math.floor(pp[1]), Math.floor(pp[2])].join(" ");
					t.output[t2 + " - 玩家脚部方块坐标"] = t2;
					t2 = [Math.floor(pp[0]), Math.floor(pp[1] + 1), Math.floor(pp[2])].join(" ");
					t.output[t2 + " - 玩家头部方块坐标"] = t2;
					t2 = [Math.floor(pp[0]), Math.floor(pp[1] - 1), Math.floor(pp[2])].join(" ");
					t.output[t2 + " - 玩家脚下方块坐标"] = t2;
					pp = MCAdapter.getInfo("pointedblockpos");
					if (pp && pp[1] >= 0) {
						t2 = pp.join(" ");
						t.output[t2 + " - 玩家指向方块坐标"] = t2;
					}
				}
				t.input = t.input.concat(Object.keys(t.output));
			} else MCAdapter.applySense(t);
			return t;
		},
		matchString : function(ps, a, r) {
			var t, t2, t3;
			if (!(r instanceof Object)) r = {};
			if (!Array.isArray(r.input)) r.input = [];
			if (!(r.output instanceof Object)) r.output = {};
			if (Array.isArray(a)) {
				t = [];
				a.forEach(function(e) {
					if (e.indexOf(ps) < 0) return;
					r.output[e] = e;
					if (r.input.indexOf(e) < 0) t.push(e);
				});
				t.sort();
				r.input = r.input.concat(t);
			} else {
				t = []; t2 = [];
				Object.keys(a).forEach(function(e) {
					if (e.indexOf(ps) < 0 && a[e].indexOf(ps) < 0) return;
					if (a[e]) {
						t3 = e + " - " + a[e];
						r.output[t3] = e;
						if (r.input.indexOf(t3) < 0) t.push(t3);
					} else {
						r.output[e] = e;
						if (r.input.indexOf(e) < 0) t2.push(e);
					}
				});
				t.sort(); t2.sort();
				r.input = r.input.concat(t, t2);
			}
			return r;
		},
		assistJSON : function(param) {
			CA.Assist.editParamJSON({
				param : param
			}, function(text) {
				CA.cmd.getText().append(text);
			});
		},
		showHelp : function() {
			var pp = new G.SpannableStringBuilder();
			this.source = "/help";
			this.cmdname = "help";
			this.hasSlash = true;
			this.strParam = "";
			this.output = {
				"设置" : function() {
					CA.showSettings();
				},
				"关于命令助手..." : function() {
					if (CA.settings.splitScreenMode) return;
					CA.showAssist.linear.setTranslationX(CA.showAssist.tx = -CA.showAssist.screenWidth);
					CA.showAssist.hCheck();
					if (CA.settings.noAnimation) return;
					var animation = new G.TranslateAnimation(G.Animation.ABSOLUTE, CA.showAssist.screenWidth, G.Animation.ABSOLUTE, 0, G.Animation.RELATIVE_TO_SELF, 0, G.Animation.RELATIVE_TO_SELF, 0);
					animation.setDuration(200);
					CA.showAssist.linear.startAnimation(animation);
				},
				"查看中文Wiki" : function() {
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4")));
					} catch(e) {
						Common.showWebViewDialog({
							url : "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4"
						});
					}
				},
				"加入我们..." : function() {
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://jq.qq.com/?_wv=1027&k=46Yl84D")));
					} catch(e) {
						Common.toast("QQ群号已复制至剪贴板");
						Common.setClipboardText("207913610");
					}
				},
				"意见反馈" : function() {
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://projectxero.mikecrm.com/CDOsI2C")));
					} catch(e) {
						Common.showWebViewDialog({
							url : "http://projectxero.mikecrm.com/CDOsI2C"
						});
					}
				}
			};
			this.input = Object.keys(this.output);
			pp.append("命令助手 - 设置 & 关于\n");
			appendSSB(pp, "（这个命令的用途是显示帮助，不过你有这个JS就不需要帮助了吧）", new G.ForegroundColorSpan(Common.theme.promptcolor));
			this.prompt = [pp];
			this.help = CA.help;
			this.patterns = [];
			return this.apply();
		},
		show : function self() {G.ui(function() {try {
			if (CA.IntelliSense.ui) return;
			if (!self.prompt) {
				self.adptcon = null;
				self.apply = function(z) {G.ui(function() {try {
					self.prompt.setText(z.prompt[0] || "");
					try {
						new java.net.URL(z.help);
						CA.showAssist.postHelp(0, z.help);
					} catch(e) {
						CA.showAssist.postHelp(1, z.help || "暂时没有帮助，以后会加上的啦");
					}
					if (self.adptcon) {
						self.adptcon.setArray(z.input);
					} else {
						var a = new SimpleListAdapter(z.input, self.vmaker, self.vbinder);
						self.adptcon = SimpleListAdapter.getController(a);
						self.list.setAdapter(a);
					}
				} catch(e) {erp(e)}})}
				self.vmaker = function(holder) {
					var view = new G.TextView(ctx);
					view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					Common.applyStyle(view, "textview_default", 3);
					return view;
				}
				self.vbinder = function(holder, s, i, a) {
					if (self.keep) {
						holder.self.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
					} else {
						holder.self.setPadding(15 * G.dp, 2 * G.dp, 15 * G.dp, 2 * G.dp);
					}
					holder.self.setText(s);
				}
				self.prompt = new G.TextView(ctx);
				self.prompt.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				self.prompt.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
				self.prompt.setTypeface(G.Typeface.MONOSPACE);
				self.prompt.setLineSpacing(10, 1);
				Common.applyStyle(self.prompt, "textview_default", 2);
				self.list = new G.ListView(ctx);
				self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
					if (pos == 0) {
						CA.IntelliSense.showMoreUsage();
						return;
					}
					var a = CA.IntelliSense.output[CA.IntelliSense.input[pos - parent.getHeaderViewsCount()]];
					if (a instanceof Function) {
						a();
					} else if (a) {
						CA.cmd.setText(String(a));
						CA.showGen.activate(false);
					}
				} catch(e) {erp(e)}}}));
				self.list.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({onItemLongClick : function(parent, view, pos, id) {try {
					if (pos == 0) {
						CA.IntelliSense.showMoreUsage();
						return true;
					}
					var a = CA.IntelliSense.output[CA.IntelliSense.input[pos - parent.getHeaderViewsCount()]];
					if (a && !(a instanceof Function)) {
						var rect;
						if (self.lastToast) self.lastToast.cancel();
						self.lastToast = G.Toast.makeText(ctx, String(a), 0);
						view.getGlobalVisibleRect(rect = new G.Rect());
						self.lastToast.setGravity(G.Gravity.CENTER, rect.centerX() - Common.getScreenWidth() / 2, rect.centerY() - Common.getScreenHeight() / 2);
						self.lastToast.show();
					}
					return true;
				} catch(e) {return erp(e), true}}}));
				self.list.addOnLayoutChangeListener(new G.View.OnLayoutChangeListener({onLayoutChange : function(v, l, t, r, b, ol, ot, or, ob) {try {
					var t = (b - t > Common.theme.textsize[3] * G.sp * 8) || CA.settings.keepWhenIME;
					if (self.keep == t) return;
					self.keep = t;
					if (t) {
						self.prompt.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
					} else {
						self.prompt.setPadding(20 * G.dp, 2 * G.dp, 20 * G.dp, 2 * G.dp);
					}
					v.post(function() {CA.IntelliSense.apply()});
				} catch(e) {erp(e)}}}));
				self.list.addHeaderView(self.prompt);
				self.list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
				if (G.style == "Material") { //Fixed：Android 5.0以下FastScroller会尝试将RhinoListAdapter强转为BaseAdapter
					self.list.setFastScrollEnabled(true);
					self.list.setFastScrollAlwaysVisible(false);
				}
				CA.showAssist.initContent(self.list);
				PWM.registerResetFlag(CA.IntelliSense, "ui");
				PWM.registerResetFlag(self, "prompt");
			}
			CA.showAssist.con.addView(CA.IntelliSense.ui = self.list);
		} catch(e) {erp(e)}})},
		hide : function() {G.ui(function() {try {
			if (!CA.IntelliSense.ui) return;
			CA.showAssist.con.removeView(CA.IntelliSense.ui);
			CA.IntelliSense.ui = null;
		} catch(e) {erp(e)}})},
		showMoreUsage : function() {
			var pp = new G.SpannableStringBuilder(), i, l = CA.IntelliSense.prompt.length;
			pp.append(this.prompt[0]);
			for (i = 1; i < l; i++) {
				pp.append("\n\n");
				pp.append(this.prompt[i]);
			}
			Common.showTextDialog(pp);
		},
		initLibrary : function(callback) {(new java.lang.Thread(new java.lang.Runnable({run : function() {try {
			var info, flag = true, t, t2;
			CA.IntelliSense.library = {
				commands : {},
				command_snap : {},
				enums : {},
				selectors : {},
				json : {},
				help : {},
				tutorials : [],
				info : info = []
			};
			CA.settings.enabledLibrarys.forEach(function(e, i, a) {
				var m = 0, v, cur, resolved, stat;
				try {
					cur = CA.IntelliSense.inner[e] || (m = 1, MapScript.readJSON(e, null, false)) || (m = 2, MapScript.readJSON(e, null, true)) || (m = 2, CA.IntelliSense.loadPrefixed(e, null));
					if (!cur) throw "无法读取或解析拓展包";
					if (!(cur instanceof Object)) throw "错误的拓展包格式";
					resolved = true;
					if ((v = CA.IntelliSense.checkPackVer(cur)) != 0) throw v > 0 ? "拓展包版本过低" : "游戏版本过低"; //兼容旧版
					if (cur.minCAVersion && Date.parse(CA.publishDate) < Date.parse(cur.minCAVersion)) throw "命令助手版本过低";
					stat = CA.IntelliSense.statLib(cur);
					CA.IntelliSense.loadLibrary(CA.IntelliSense.library, cur, stat);
					info.push({
						src : e,
						index : i,
						name : cur.name,
						author : cur.author,
						description : cur.description,
						uuid : cur.uuid,
						version : cur.version,
						update : cur.update,
						menu : cur.menu,
						mode : m,
						stat : stat,
						loaded : true
					});
				} catch(err) {
					flag = false;
					if (resolved) {
						info.push({
							src : e,
							index : i,
							name : cur.name,
							version : cur.version,
							update : cur.update,
							menu : cur.menu,
							hasError : true,
							mode : m,
							error : err
						});
					} else {
						info.push({
							src : e,
							index : i,
							name : m = 0 ? e : (new java.io.File(e)).getName(),
							hasError : true,
							mode : m,
							error : err
						});
					}
				}
			}, this);
			//快捷操作
			t = CA.IntelliSense.library.commands;
			Object.keys(t).forEach(function(e) {
				t2 = e;
				while (t[t2].alias) t2 = t[t2].alias;
				t2 = t[t2];
				CA.IntelliSense.library.command_snap[e] = t2.description ? t2.description : "";
			});
			Tutorial.library = CA.IntelliSense.library.tutorials;
			if (callback) callback(flag);
		} catch(e) {erp(e)}}}))).start()},
		enableLibrary : function(name) {
			var a, p;
			if (!(name in this.inner) && !(new java.io.File(name)).isFile()) return false;
			a = CA.settings.disabledLibrarys;
			p = a.indexOf(name);
			if (p >= 0) a.splice(p, 1);
			a = CA.settings.enabledLibrarys;
			p = a.indexOf(name);
			if (p < 0) a.push(name);
			return true;
		},
		disableLibrary : function(name) {
			var a, p;
			a = CA.settings.enabledLibrarys;
			p = a.indexOf(name);
			if (p >= 0) a.splice(p, 1);
			a = CA.settings.disabledLibrarys;
			p = a.indexOf(name);
			if (p < 0) a.unshift(name);
			return true;
		},
		removeLibrary : function(name) {
			var a, p;
			a = CA.settings.enabledLibrarys;
			p = a.indexOf(name);
			if (p >= 0) a.splice(p, 1);
			a = CA.settings.disabledLibrarys;
			p = a.indexOf(name);
			if (p >= 0) a.splice(p, 1);
			return true;
		},
		loadLibrary : function(cur, l, stat) {
			var c, i, t;
			this.checkLibrary(l);
			if (this.library.info.some(function(e) {
				return l.uuid == e.uuid;
			})) throw "已存在相同的拓展包";
			if (l.require.some(function(e1) {
				return !this.library.info.some(function(e2) {
					return e1 == e2.uuid;
				});
			}, this)) throw "前提包并未全部加载，请检查加载顺序及拓展包列表";
			this.joinPack(cur, Object.copy(l)); //创建副本
			if (!l.versionPack) return;
			c = l.versionPack;
			for (i in c) {
				t = this.joinPack(cur, c[i]); //加载版本包
				if (stat && t) stat.availablePack++;
			}
		},
		loadPrefixed : function(path, defaultValue) {
			try{
				if (!(new java.io.File(path)).isFile()) return defaultValue;
				var rd, s = [], q, dp;
				rd = new java.io.FileInputStream(path);
				rd.skip(15);
				rd = new java.io.BufferedReader(new java.io.InputStreamReader(new java.util.zip.GZIPInputStream(rd)));
				while (q = rd.readLine()) s.push(q);
				rd.close();
				return eval("(" + s.join("\n") + ")");
			} catch(e) {
				return defaultValue;
			}
		},
		savePrefixed : function(path, object) {
			var wr, ar;
			var f = new java.io.File(path).getParentFile();
			if (f) f.mkdirs();
			wr = new java.io.FileOutputStream(path);
			ar = java.nio.ByteBuffer.allocate(15); //LIBRARY
			ar.put([0x4c, 0x49, 0x42, 0x52, 0x41, 0x52, 0x59]).putLong((new java.util.Date()).getTime());
			wr.write(ar.array());
			wr = new java.util.zip.GZIPOutputStream(wr);
			wr.write(new java.lang.String(MapScript.toSource(object)).getBytes());
			wr.close();
		},
		checkLibrary : (function() {
			var stack = null, last = null;
			var e = function(d) {
				throw {
					message : d,
					stack : stack,
					source : last,
					toString : function() {
						return this.stack.join("->") + this.message;
					}
				}
			}
			var checkObject = function(o) {
				if (!o || !(o instanceof Object)) e("不是对象");
			}
			var checkArray = function(o) {
				if (!Array.isArray(o)) e("不是数组");
			}
			var checkUnsignedInt = function(o) {
				if (!(/^\d+$/).test(o)) e("不是正整数");
			}
			var checkString = function(o) {
				if (!(typeof o === "string")) e("不是字符串");
			}
			var checkNotEmptyString = function(o) {
				checkString(o);
				if (!o) e("是空字符串");
			}
			var iterateArray = function(o, iter) {
				var l = stack.length, i;
				checkArray(o);
				stack.length = l + 1;
				for (i = 0; i < o.length; i++) {
					stack[l] = i;
					iter(o[i]);
				}
				stack.length = l;
			}
			return function(a) {
				var i;
				stack = ["根"]; last = a;
				checkObject(a);
				stack.push("名称(name)");
				checkNotEmptyString(a.name);
				stack[1] = "作者(author)";
				checkNotEmptyString(a.author);
				stack[1] = "简介(description)";
				checkString(a.description);
				stack[1] = "UUID(uuid)";
				checkNotEmptyString(a.uuid);
				stack[1] = "版本(version)";
				iterateArray(a.version, checkUnsignedInt);
				stack[1] = "前提包(require)";
				iterateArray(a.require, checkNotEmptyString);
			}
		})(),
		checkPackVer : (function() {
			var a;
			var opt = function(a) {
				return a == "*" ? Infinity : isNaN(a) ? -1 : parseInt(a);
			}
			var compare = function (b) {
				var n, i, p1, p2;
				b = String(b).split(".");
				n = Math.max(a.length, b.length);
				for (i = 0; i < n; i++) {
					p1 = opt(a[i]); p2 = opt(b[i]);
					if (p1 < p2) {
						return -1; //pe版本过低
					} else if (p1 > p2) {
						return 1; //拓展包版本过低
					}
				}
				return 0;
			}
			var inRange = function(min, max) {
				if (min && compare(min) < 0) return -1;
				if (max && compare(max) > 0) return 1;
				return 0;
			}
			return function(o) {
				var r = 0, i, n, e;
				if (this.ignoreVersion) return 0;
				a = getMinecraftVersion().split(".");
				if (o.minSupportVer || o.maxSupportVer) {
					r = inRange(o.minSupportVer, o.maxSupportVer);
					if (r != 0) return r; //这两个参数是总范围
				}
				if (Array.isArray(o.supportVer)) {
					n = o.supportVer.length;
					r = 1;
					for (i = 0; i < n; i++) {
						e = o.supportVer[i];
						r = Math.min(r, inRange(e.min, e.max)); //趋向返回游戏版本过低
						if (r == 0) return 0; //这段只要存在一个范围符合条件就返回0
					}
				}
				return r;
			}
		})(),
		joinPack : (function() {
			var joinCmd = function(src, o) {
				var i, op, sp, t;
				if (o.description) src.description = o.description;
				if (o.help) src.help = o.help;
				if (o.noparams) src.noparams = o.noparams;
				if (o.patterns) {
					op = o.patterns;
					sp = src.patterns;
					if (Array.isArray(sp) != Array.isArray(op)) throw "命令模式格式不一致，无法合并";
					if (Array.isArray(op)) {
						for (i in op) {
							t = sp.indexOf(op[i]);
							if (t < 0) sp.push(op[i]);
						}
					} else {
						for (i in op) sp[i] = op[i];
					}
				}
			}
			var filterCmd = function(src, o) {
				var i, t, op, sp, t;
				if (o.noparams) delete src.noparams;
				if (o.patterns) {
					op = o.patterns;
					sp = src.patterns;
					if (Array.isArray(sp) != Array.isArray(op)) throw "命令模式格式不一致，无法过滤";
					if (Array.isArray(op)) {
						for (i in op) {
							t = sp.indexOf(op[i]);
							if (t >= 0) sp.splice(t, 1);
						}
					} else {
						for (i in op) delete sp[i];
					}
				}
			}
			var joinEnum = function(src, o) {
				var i, t;
				if (Array.isArray(src) && Array.isArray(o)) {
					for (i in o) {
						t = src.indexOf(o[i]);
						if (t < 0) src.push(o[i]);
					}
				} else if (Array.isArray(src) && !Array.isArray(o)) {
					throw "枚举列表格式不一致，无法合并";
				} else if (!Array.isArray(src) && Array.isArray(o)) {
					for (i in o) if (!src[o[i]]) src[o[i]] = "";
				} else {
					for (i in o) if (!src[i] || o[i] != "") src[i] = o[i];
				}
			}
			var filterEnum = function(src, o) {
				var i, t, f = Array.isArray(o) ? o : Object.keys(o);
				if (Array.isArray(src)) {
					for (i in f) {
						t = src.indexOf(f[i]);
						if (t >= 0) src.splice(t, 1);
					}
				} else {
					for (i in f) delete src[f[i]];
				}
			}
			var parseAliasEnum = function(g, o) {
				if (typeof o != "string") return o;
				if (!(o in g.enums)) throw "无效的枚举引用";
				return g.enums[o];
			}
			return function(cur, l) {
				if (this.checkPackVer(l) != 0) return false;
				var i;
				if (!(l.commands instanceof Object)) l.commands = {};
				if (!(l.enums instanceof Object)) l.enums = {};
				if (!(l.selectors instanceof Object)) l.selectors = {};
				if (!(l.help instanceof Object)) l.help = {};
				for (i in l.commands) {
					if (l.mode == "remove") {
						if (l.commands[i]) {
							filterCmd(cur.commands[i], l.commands[i]);
						} else {
							delete cur.commands[i];
						}
					} else if ((i in cur.commands) && l.mode != "overwrite") {
						joinCmd(cur.commands[i], l.commands[i]);
					} else {
						cur.commands[i] = l.commands[i];
					}
				}
				for (i in l.enums) {
					if (l.mode == "remove") {
						if (l.enums[i]) {
							filterEnum(cur.enums[i], parseAliasEnum(cur, l.enums[i]));
						} else {
							delete cur.enums[i];
						}
					} else if ((i in cur.enums) && l.mode != "overwrite") {
						joinEnum(cur.enums[i], parseAliasEnum(cur, l.enums[i]));
					} else {
						cur.enums[i] = parseAliasEnum(cur, l.enums[i]);
					}
				}
				for (i in l.selectors) {
					if (l.mode == "remove") {
						delete cur.selectors[i];
					} else {
						cur.selectors[i] = l.selectors[i];
					}
				}
				for (i in l.json) {
					if (l.mode == "remove") {
						delete cur.json[i];
					} else {
						cur.json[i] = l.json[i];
					}
				}
				for (i in l.help) {
					if (l.mode == "remove") {
						delete cur.help[i];
					} else {
						cur.help[i] = l.help[i];
					}
				}
				for (i in l.tutorials) {
					if (l.mode != "remove") {
						cur.tutorials.push(l.tutorials[i]);
					}
				}
				return true;
			}
		})(),
		statLib : (function() {
			var stat;
			function calcCmd(c) {
				var i;
				if (!c) return;
				stat.command++;
				if (c.noparams) stat.pattern++;
				for (i in c.patterns) { // patterns 是 可枚举类型 包括但不限于 数组、对象
					stat.pattern++;
				}
			}
			function calcSelectors(c) {
				if (!c) return;
				stat.selector += Object.keys(c).length;
			}
			function calcEnum(c) {
				if (!c) return 0;
				return typeof c == "string" ? 0 : Array.isArray(c) ? c.length : Object.keys(c).length;
			}
			function calcEnums(c) {
				var i;
				if (!c) return;
				for (i in c) {
					stat.enums++;
					stat.enumitem += calcEnum(c[i]);
				}
			}
			function calcCommands(k) {
				var i;
				if (!k) return;
				for (i in k) {
					calcCmd(k[i]);
				}
			}
			function toString() {
				return ["命令数:", this.command, "\n枚举数:", this.enums, "\n选择器数:", this.selector, "\n版本包数:", this.availablePack, "/", this.versionPack, "\n命令模式数:", this.pattern, "\n枚举项目数:", this.enumitem].join("");
			}
			return function (l) {
				var i;
				stat = {
					availablePack : 0,
					command : 0,
					versionPack : 0,
					enums : 0,
					selector : 0,
					pattern : 0,
					enumitem : 0,
					toString : toString
				}
				calcCommands(l.commands);
				calcEnums(l.enums);
				calcSelectors(l.selectors);
				for (i in l.versionPack) {
					if ("commands" in l.versionPack[i]) calcCommands(l.versionPack[i].commands);
					if ("enums" in l.versionPack[i]) calcEnums(l.versionPack[i].enums);
					if ("selectors" in l.versionPack[i]) calcSelectors(l.versionPack[i].selectors);
					stat.versionPack++;
				}
				return stat;
			}
		})()
	},
	Assist : {
		active : false,
		show : function self() {G.ui(function() {try {
			if (!self.head) {
				self.init = function() {
					CA.Assist.command = null;
					CA.Assist.pattern = null;
					self.refresh();
					self.choosePattern(true);
				}
				self.refresh = function() {
					var pp, arr, adpt, help;
					if (CA.Assist.command) {
						pp = new G.SpannableStringBuilder(CA.Assist.formatPattern(CA.Assist.command, CA.Assist.pattern));
						pp.append("\n");
						appendSSB(pp, CA.Assist.getPatternDescription(CA.Assist.command, CA.Assist.pattern), new G.ForegroundColorSpan(Common.theme.promptcolor));
						arr = (CA.Assist.pattern ? CA.IntelliSense.library.commands[CA.Assist.command].patterns[CA.Assist.pattern].params : []) || [];
						arr = arr.map(function(e, i) {
							return {
								param : e
							};
						});
					} else {
						pp = "选择命令……";
						arr = [];
					}
					self.head.setText(pp);
					self.list.setAdapter(adpt = new RhinoListAdapter((CA.Assist.params = arr).filter(function(e) {
						if (e.param.type == "plain") {
							e.text = e.param.name;
							return false;
						} else {
							return true;
						}
					}), CA.Assist.paramAdapter, self));
					self.adpt = RhinoListAdapter.getController(adpt);
					try {
						help = CA.Assist.command ? CA.IntelliSense.library.commands[CA.Assist.command].help : CA.IntelliSense.library.help.command;
						new java.net.URL(help);
						CA.showAssist.postHelp(0, help);
					} catch(e) {
						CA.showAssist.postHelp(1, help || "暂时没有帮助，以后会加上的啦");
					}
					CA.Assist.refreshCommand();
				}
				self.choosePattern = function(optional) {
					CA.Assist.chooseCommand(function(cmd) {
						CA.Assist.choosePatterns(cmd, function(pattern) {
							CA.Assist.command = cmd;
							CA.Assist.pattern = pattern;
							self.refresh();
						}, optional);
					}, optional);
				}
				self.head = new G.TextView(ctx);
				self.head.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				self.head.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
				self.head.setTypeface(G.Typeface.MONOSPACE);
				self.head.setLineSpacing(10, 1);
				Common.applyStyle(self.head, "textview_default", 2);
				self.list = new G.ListView(ctx);
				self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
					var e;
					if (pos == 0) {
						self.choosePattern();
						return;
					}
					CA.Assist.editParam(e = parent.getItemAtPosition(pos), function(t) {
						G.ui(function() {try {
							e._text.setText(e.text = String(t));
							CA.Assist.refreshCommand();
						} catch(e) {erp(e)}});
					}, function() {
						self.adpt.replace(CA.Assist.params[pos - 1] = {
							param : e.param
						}, pos - 1);
						CA.Assist.refreshCommand();
					});
				} catch(e) {erp(e)}}}));
				self.list.addHeaderView(self.head);
				self.list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
				CA.showAssist.initContent(self.list);
				PWM.registerResetFlag(CA.Assist, "ui");
				PWM.registerResetFlag(self, "head");
			}
			self.init();
			if (CA.Assist.ui) return;
			CA.showAssist.con.addView(CA.Assist.ui = self.list);
		} catch(e) {erp(e)}})},
		hide : function() {G.ui(function() {try {
			if (!CA.Assist.ui) return;
			CA.showAssist.con.removeView(CA.Assist.ui);
			CA.Assist.ui = null;
		} catch(e) {erp(e)}})},
		paramAdapter : function(e, i, a) {
			var hl, vl, name, desp, p;
			p = e.param;
			hl = new G.LinearLayout(ctx);
			hl.setOrientation(G.LinearLayout.HORIZONTAL);
			hl.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
			hl.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
			vl = new G.LinearLayout(ctx);
			vl.setOrientation(G.LinearLayout.VERTICAL);
			vl.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 1.0));
			vl.getLayoutParams().gravity = G.Gravity.CENTER;
			name = new G.TextView(ctx);
			name.setText(String(p.name) + (p.optional || p.canIgnore || p.chainOptional ? " (可选)" : ""));
			name.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(name, "textview_default", 3);
			vl.addView(name);
			desp = new G.TextView(ctx);
			desp.setText(p.description ? String(p.description) : CA.Assist.getParamType(p));
			desp.setSingleLine(true);
			desp.setEllipsize(G.TextUtils.TruncateAt.END);
			desp.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(desp, "textview_prompt", 1);
			vl.addView(desp);
			hl.addView(vl);
			e._text = new G.TextView(ctx);
			e._text.setText("点击以编辑");
			e._text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			e._text.setMaxEms(10);
			e._text.setSingleLine(true);
			e._text.setEllipsize(G.TextUtils.TruncateAt.END);
			e._text.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
			e._text.getLayoutParams().gravity = G.Gravity.CENTER;
			Common.applyStyle(e._text, "textview_prompt", 2);
			hl.addView(e._text);
			return hl;
		},
		refreshCommand : function() {
			if (CA.Assist.command) {
				var r = ["/" + CA.Assist.command], i, p = CA.Assist.params;
				for (i = 0; i < p.length; i++) {
					if (!p[i].text) break;
					r.push(p[i].text);
				}
				CA.cmd.setText(r.join(" "));
			} else {
				CA.cmd.setText("/");
			}
		},
		editParam : function(e, callback, onReset) {
			switch (e.param.type) {
				case "plain":
				Common.showOperateDialog([{
					text : e.param.name,
					onclick : function() {
						callback(e.param.name);
					}
				}, {
					text : "重置参数",
					onclick : function() {
						onReset();
					},
					hidden : function() {
						return !onReset;
					}
				}]);
				break;
				case "enum":
				this.editParamEnum(e, callback, onReset);
				break;
				case "nbt":
				case "json":
				this.editParamJSON(e, callback, onReset);
				break;
				case "position":
				this.editParamPosition(e, callback, onReset);
				break;
				case "selector":
				this.editParamSelector(e, callback, onReset);
				break;
				case "int":
				case "uint":
				case "float":
				case "relative":
				case "custom":
				case "command":
				case "rawjson":
				case "text":
				default:
				this.editParamDialog(e, callback, onReset);
			}
		},
		editParamDialog : function self(e, callback, onReset) {G.ui(function() {try {
			var layout, title, p, ret, exit, popup, t, listener = {}, suggestion = {}, i;
			if (!self.initTextBox) {
				self.initTextBox = function(e, defVal) {
					var ret = new G.EditText(ctx);
					ret.setText(defVal ? String(defVal) : e.text ? e.text : "");
					ret.setSingleLine(true);
					ret.setPadding(0, 10 * G.dp, 0, 10 * G.dp);
					ret.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
					ret.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
					ret.setSelection(ret.length());
					Common.applyStyle(ret, "edittext_default", 2);
					return ret;
				}
				self.initListener = function(ret, l, gText) {
					l.getText = function(pure) {
						if (pure) return ret.getText();
						return gText();
					}
					l.setText = function(e) {
						ret.setText(String(e));
					}
					ret.addTextChangedListener(new G.TextWatcher({
						afterTextChanged : function(s) {try {
							l.onTextChanged(s);
						} catch(e) {erp(e)}}
					}));
				}
			}
			layout = new G.LinearLayout(ctx);
			layout.setOrientation(G.LinearLayout.VERTICAL);
			layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(layout, "message_bg");
			title = new G.TextView(ctx);
			title.setText("编辑“" + e.param.name + "”");
			title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
			switch (p = e.param.type) {
				case "int":
				layout.addView(ret = self.initTextBox(e));
				ret.setInputType(G.InputType.TYPE_CLASS_NUMBER | G.InputType.TYPE_NUMBER_FLAG_SIGNED);
				self.initListener(ret, listener, function() {
					var t = ret.getText();
					return !t.length() ? undefined : isFinite(t) ? parseInt(t) : (Common.toast("内容不是数字！"), null);
				});
				Common.postIME(ret);
				break;
				case "uint":
				layout.addView(ret = self.initTextBox(e));
				ret.setInputType(G.InputType.TYPE_CLASS_NUMBER);
				self.initListener(ret, listener, function() {
					var t = ret.getText();
					return !t.length() ? undefined : isFinite(t) ? Math.abs(parseInt(t)) : (Common.toast("内容不是数字！"), null);
				});
				Common.postIME(ret);
				break;
				case "float":
				layout.addView(ret = self.initTextBox(e));
				ret.setInputType(G.InputType.TYPE_CLASS_NUMBER | G.InputType.TYPE_NUMBER_FLAG_SIGNED | G.InputType.TYPE_NUMBER_FLAG_DECIMAL);
				self.initListener(ret, listener, function() {
					var t = ret.getText();
					return !t.length() ? undefined : isFinite(t) ? parseFloat(t) : (Common.toast("内容不是数字！"), null);
				});
				Common.postIME(ret);
				break;
				case "relative":
				layout.addView(ret = self.initTextBox(e, isNaN(e.offset) ? "" : e.offset));
				ret.setInputType(G.InputType.TYPE_CLASS_NUMBER | G.InputType.TYPE_NUMBER_FLAG_SIGNED | G.InputType.TYPE_NUMBER_FLAG_DECIMAL);
				var rela = new G.CheckBox(ctx);
				rela.setChecked(Boolean(e.isRela));
				rela.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
				rela.getLayoutParams().setMargins(0, 0, 0, 10 * G.dp)
				rela.setText("启用相对参数");
				layout.addView(rela);
				listener.getText = function(pure) {
					e.isRela = rela.isChecked();
					e.offset = ret.getText();
					if (pure) return (e.isRela ? "~" : "") + parseFloat(e.offset);
					return !e.offset.length() ? undefined : isFinite(e.offset) ? (e.isRela ? "~" : "") + parseFloat(e.offset) : (Common.toast("内容不是数字！"), null);
				}
				listener.setText = function(e) {
					var s = String(e), f = s.startsWith("~");
					rela.setChecked(f);
					ret.setText(f ? s.slice(1) : s);
				}
				ret.addTextChangedListener(new G.TextWatcher({
					afterTextChanged : function(s) {try {
						listener.onTextChanged();
					} catch(e) {erp(e)}}
				}));
				Common.postIME(ret);
				break;
				case "custom":
				layout.addView(ret = self.initTextBox(e));
				ret.setInputType(G.InputType.TYPE_CLASS_TEXT);
				self.initListener(ret, listener, function() {
					return ret.length() == 0 ? undefined : (new RegExp(e.param.finish, "")).test(ret.getText()) ? ret.getText() : (Common.toast("内容不合规范！"), null);
				});
				Common.postIME(ret);
				break;
				case "command":
				CA.his.forEach(function(e) {
					suggestion[e] = e;
				});
				case "text":
				default:
				layout.addView(ret = self.initTextBox(e));
				ret.setInputType(G.InputType.TYPE_CLASS_TEXT);
				self.initListener(ret, listener, function() {
					return ret.length() > 0 ? ret.getText() : undefined;
				});
				Common.postIME(ret);
			}
			if (e.param.suggestion) {
				t = e.param.suggestion instanceof Object ? e.param.suggestion : CA.IntelliSense.library.enums[e.param.suggestion];
				if (Array.isArray(t)) {
					for (i in t) {
						suggestion[t[i]] = t[i];
					}
				} else {
					for (i in t) {
						if (t[i]) {
							suggestion[i + " - " + t[i]] = i;
						} else {
							suggestion[i] = i;
						}
					}
				}
			}
			if (listener.setText) {
				var sugg = new G.ListView(ctx), adpt = new FilterListAdapter(new SimpleListAdapter(Object.keys(suggestion), CA.Assist.smallVMaker, CA.Assist.smallVBinder));
				sugg.setBackgroundColor(G.Color.TRANSPARENT);
				sugg.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1));
				sugg.setAdapter(adpt.build());
				sugg.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
					listener.setText(suggestion[parent.getItemAtPosition(pos)]);
				} catch(e) {erp(e)}}}));
				layout.addView(sugg);
				if (G.style == "Material") {
					sugg.setFastScrollEnabled(true);
					sugg.setFastScrollAlwaysVisible(false);
				}
				listener.onTextChanged = function(s) {
					var s = String(s);
					if (s) {
						adpt.setFilter(function(e, i) {
							return e.indexOf(s) >= 0;
						});
					} else {
						adpt.clearFilter();
					}
				}
				if (listener.getText) listener.onTextChanged(listener.getText(true));
			}
			exit = new G.TextView(ctx);
			exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			exit.setText("确定");
			exit.setGravity(G.Gravity.CENTER);
			exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
			Common.applyStyle(exit, "button_critical", 3);
			exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var t = listener.getText();
				if (typeof t == "undefined" && onReset) {
					onReset();
				} else {
					if (t == null) return;
					callback(String(t));
				}
				popup.dismiss();
			} catch(e) {erp(e)}}}));
			layout.addView(exit);
			popup = Common.showDialog(layout, -1, -2);
		} catch(e) {erp(e)}})},
		editParamEnum : function(e, callback, onReset) {
			var t = e.param.list instanceof Object ? e.param.list : CA.IntelliSense.library.enums[e.param.list];
			var arr = [], i;
			if (onReset) arr.push({
				text : "重置参数",
				reset : true
			});
			if (Array.isArray(t)) {
				for (i in t) {
					arr.push(t[i]);
				}
			} else {
				for (i in t) {
					if (t[i]) {
						arr.push({
							text : i,
							description : t[i]
						});
					} else {
						arr.push(i);
					}
				}
			}
			Common.showListChooser(arr, function(pos) {
				var t = arr[pos];
				if (t.reset) {
					onReset()
				} else if (t instanceof Object) {
					callback(t.text);
				} else {
					callback(t);
				}
			});
		},
		editParamJSON : function self(e, callback, onReset) {
			if (!self.refresh) {
				self.refresh = function(e, data, callback) {
					e.jsonData = data;
					callback(MapScript.toSource(data));
				}
				self.modify = function(e, callback) {
					JSONEdit.show({
						source : e.jsonData,
						rootname : e.param.name,
						update : function() {
							self.refresh(e, this.source, callback);
						}
					});
				}
				self.buildnew = function(e, callback) {
					JSONEdit.create(function(data) {
						self.refresh(e, data, callback);
					}, e.param.name);
				}
				self.editmenu = [{
					text : "编辑",
					onclick : function(v, tag) {
						self.modify(tag.e, tag.callback);
					}
				},{
					text : "新建",
					onclick : function(v, tag) {
						self.buildnew(tag.e, tag.callback);
					}
				},{
					text : "重置参数",
					onclick : function(v, tag) {
						tag.onReset();
					},
					hidden : function(tag) {
						return !tag.onReset;
					}
				},{
					text : "取消",
					onclick : function(v) {}
				}]
			}
			if (e.param.component) return this.editComponent(e, callback, onReset);
			if ("jsonData" in e) {
				Common.showOperateDialog(self.editmenu, {
					e : e,
					callback : callback,
					onReset : onReset
				});
			} else {
				self.buildnew(e, callback);
			}
		},
		editParamPosition : function self(e, callback, onReset) {G.ui(function() {try {
			var layout, title, i, row, label, ret = [], rela = [], screla, posp = ["X", "Y", "Z"], reset, exit, popup;
			layout = new G.TableLayout(ctx);
			layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(layout, "message_bg");
			title = new G.TextView(ctx);
			title.setText("编辑“" + e.param.name + "”");
			title.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
			if (!e.pos) {
				e.pos = [];
				e.rela = [];
			}
			for (i = 0; i < 3; i++) {
				row = new G.TableRow(ctx);
				row.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
				row.setGravity(G.Gravity.CENTER);
				label = new G.TextView(ctx);
				label.setText(posp[i]);
				label.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
				label.setLayoutParams(new G.TableRow.LayoutParams(-1, -2));
				Common.applyStyle(label, "textview_default", 2);
				row.addView(label);
				ret[i] = new G.EditText(ctx);
				ret[i].setText(isNaN(e.pos[i]) ? "" : String(e.pos[i]));
				ret[i].setSingleLine(true);
				ret[i].setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
				ret[i].setInputType(G.InputType.TYPE_CLASS_NUMBER | G.InputType.TYPE_NUMBER_FLAG_SIGNED | G.InputType.TYPE_NUMBER_FLAG_DECIMAL);
				ret[i].setLayoutParams(new G.TableRow.LayoutParams(0, -2, 1));
				ret[i].setSelection(ret[i].length());
				Common.applyStyle(ret[i], "edittext_default", 2);
				row.addView(ret[i]);
				rela[i] = new G.CheckBox(ctx);
				rela[i].setChecked(Boolean(e.rela[i]));
				rela[i].setLayoutParams(G.TableRow.LayoutParams(-2, -2));
				rela[i].getLayoutParams().setMargins(0, 0, 10 * G.dp, 0)
				rela[i].setText("~"); //BUG：CheckBox需重新着色
				row.addView(rela[i]);
				layout.addView(row);
			}
			screla = new G.CheckBox(ctx);
			screla.setChecked(false);
			screla.setLayoutParams(G.TableLayout.LayoutParams(-1, -2));
			screla.getLayoutParams().setMargins(0, 0, 0, 10 * G.dp)
			screla.setText("使用本地坐标（^左 ^上 ^前）");
			screla.setOnCheckedChangeListener(new G.CompoundButton.OnCheckedChangeListener({onCheckedChanged : function(v, s) {try {
				var i;
				for (i = 0; i < 3; i++) rela[i].setVisibility(s ? G.View.GONE : G.View.VISIBLE);
			} catch(e) {erp(e)}}}));
			screla.setChecked(Boolean(e.screla));
			screla.setVisibility(CA.hasFeature("enableLocalCoord") ? G.View.VISIBLE : G.View.GONE);
			layout.addView(screla);
			if (onReset) {
				reset = new G.TextView(ctx);
				reset.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
				reset.setText("重置参数");
				reset.setGravity(G.Gravity.CENTER);
				reset.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
				Common.applyStyle(reset, "button_critical", 3);
				reset.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					onReset();
					popup.dismiss();
				} catch(e) {erp(e)}}}));
				layout.addView(reset);
			}
			exit = new G.TextView(ctx);
			exit.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
			exit.setText("确定");
			exit.setGravity(G.Gravity.CENTER);
			exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
			Common.applyStyle(exit, "button_critical", 3);
			exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var r = [];
				e.screla = CA.hasFeature("enableLocalCoord") && screla.isChecked();
				for (i = 0; i < 3; i++) {
					e.pos[i] = parseFloat(ret[i].getText());
					e.rela[i] = rela[i].isChecked();
					if (!e.screla && !e.rela[i] && !isFinite(e.pos[i])) return Common.toast(posp[i] + "坐标不是数字！");
					r.push((e.screla ? "^" : e.rela[i] ?  "~" : "") + (isFinite(e.pos[i]) ? e.pos[i] : ""));
				}
				callback(r.join(" "));
				popup.dismiss();
			} catch(e) {erp(e)}}}));
			layout.addView(exit);
			popup = Common.showDialog(layout, -1, -2);
		} catch(e) {erp(e)}})},
		editParamSelector : function self(e, callback, onReset) {G.ui(function() {try {
			var layout, title, i, label, list, add, reset, exit, popup;
			if (!self.selectors) {
				self.selectors = {
					"@a" : "选择所有玩家",
					"@p" : "选择距离最近的玩家",
					"@r" : "选择随机玩家",
					"@e" : "选择所有实体",
					"@s" : "选择命令执行者"
				}
				self.editLabel = function(e, callback) {
					var a = [], t = e.param.target;
					if (t == "entity" || t == "player") a.push("@a", "@p", "@r");
					if (t == "entity" || t == "nonplayer") a.push("@e");
					if (t != "nonselector") a.push("@s");
					a = a.map(function(e) {
						return {
							text : e,
							description : self.selectors[e]
						};
					});
					a.push({
						text : "玩家名",
						description : "选择具有指定名称的玩家",
						custom : true
					});
					Common.showListChooser(a, function(pos) {
						if (a[pos].custom) {
							Common.showInputDialog({
								title : "选择玩家名",
								callback : function(s) {
									if (s.startsWith("@")) {
										Common.toast("玩家名不合法");
										callback("");
									} else {
										callback(s);
									}
								},
								singleLine : true
							});
						} else {
							callback(a[pos].text);
						}
					});
				}
				self.checkPar = function(label, list) {
					list.setVisibility(label.getText() in self.selectors ? G.View.VISIBLE : G.View.GONE);
				}
				self.refresh = function(e, list) {
					list.setAdapter(new RhinoListAdapter(e.selpar, self.adapter, {
						delete : function(i) {
							e.selpar.splice(i, 1);
							self.refresh(e, list);
						}
					}));
				}
				self.addParam = function(e, list) {
					var a = [], ss = CA.IntelliSense.library.selectors;
					Object.keys(ss).forEach(function(e) {
						a.push({
							text : ss[e].name,
							description : e,
							name : e,
							par : ss[e],
							inverted : false
						});
						if (ss[e].hasInverted) {
							a.push({
								text : "(不满足)" + ss[e].name,
								description : "非" + e,
								name : e,
								par : ss[e],
								inverted : true
							});
						}
					});
					Common.showListChooser(a, function(pos) {
						var p = {
							name : a[pos].name,
							param : a[pos].par,
							isInverted : a[pos].inverted
						};
						CA.Assist.editParam(p, function(text) {
							p.text = text;
							e.selpar.push(p);
							self.refresh(e, list);
						});
					});
				}
				self.editParam = function(e, i, list) {
					CA.Assist.editParam(e.selpar[i], function(text) {
						e.selpar[i].text = text;
						self.refresh(e, list);
					});
				}
				self.adapter = function(e, i, a, tag) {
					var view = new G.LinearLayout(ctx),
						text = new G.TextView(ctx),
						del = new G.TextView(ctx);
					view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					view.setOrientation(G.LinearLayout.HORIZONTAL);
					view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					text.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1));
					text.setText((e.isInverted ? "(不满足)" : "") + e.param.name + "：" + e.text);
					text.setSingleLine(true);
					text.setEllipsize(G.TextUtils.TruncateAt.END);
					text.setPadding(10 * G.dp, 10 * G.dp, 0, 10 * G.dp);
					Common.applyStyle(name, "textview_default", 2);
					view.addView(text);
					del.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
					del.setText("×");
					del.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
					Common.applyStyle(del, "textview_default", 2);
					del.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
						tag.delete(i);
					} catch(e) {erp(e)}}}));
					view.addView(del);
					return view;
				}
			}
			layout = new G.LinearLayout(ctx);
			layout.setOrientation(G.LinearLayout.VERTICAL);
			layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(layout, "message_bg");
			title = new G.TextView(ctx);
			title.setText("编辑“" + e.param.name + "”");
			title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
			if (!e.selpar) e.selpar = [];
			label = new G.EditText(ctx);
			label.setHint("点击以选择");
			label.setSingleLine(true);
			label.setPadding(0, 0, 0, 10 * G.dp);
			label.setInputType(G.InputType.TYPE_NULL);
			label.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(label, "edittext_default", 2);
			label.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.editLabel(e, function(text) {G.ui(function() {try {
					v.setText(text);
					self.checkPar(v, list);
				} catch(e) {erp(e)}})});
			} catch(e) {erp(e)}}}));
			if (e.label) {
				label.setText(e.label);
			} else {
				label.post(function() {try {
					label.performClick();
				} catch(e) {erp(e)}});
			}
			layout.addView(label);
			add = new G.TextView(ctx);
			add.setText("+ 添加选择器参数");
			add.setSingleLine(true);
			add.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			add.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
			Common.applyStyle(add, "textview_default", 2);
			list = new G.ListView(ctx);
			list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1));
			list.addFooterView(add);
			list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				if (view == add) {
					self.addParam(e, parent);
				} else {
					self.editParam(e, pos, parent);
				}
			} catch(e) {erp(e)}}}));
			layout.addView(list);
			if (onReset) {
				reset = new G.TextView(ctx);
				reset.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
				reset.setText("重置参数");
				reset.setGravity(G.Gravity.CENTER);
				reset.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
				Common.applyStyle(reset, "button_critical", 3);
				reset.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					onReset();
					popup.dismiss();
				} catch(e) {erp(e)}}}));
				layout.addView(reset);
			}
			exit = new G.TextView(ctx);
			exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			exit.setText("确定");
			exit.setGravity(G.Gravity.CENTER);
			exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
			Common.applyStyle(exit, "button_critical", 3);
			exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (!(e.label = String(label.getText()))) return Common.toast("选择器不可为空！")
				callback(e.label + (e.label in self.selectors && e.selpar.length ? "[" + e.selpar.map(function(e) {
					return e.name + "=" + (e.isInverted ? "!" : "") + e.text;
				}).join(",") + "]" : ""));
				popup.dismiss();
			} catch(e) {erp(e)}}}));
			layout.addView(exit);
			self.checkPar(label, list);
			self.refresh(e, list);
			popup = Common.showDialog(layout, -1, -2);
		} catch(e) {erp(e)}})},
		smallVMaker : function(holder) {
			var view = holder.view = new G.TextView(ctx);
			view.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
			Common.applyStyle(view, "textview_default", 2);
			return view;
		},
		smallVBinder : function(holder, s) {
			holder.view.setText(s);
		},
		getParamType : function(cp) {
			switch (cp.type) {
				case "int":
				return "整数";
				
				case "uint":
				return "自然数";
				
				case "float":
				case "relative":
				return "数值";
				
				case "nbt":
				return "数据标签";
				
				case "rawjson":
				return "文本JSON";
				
				case "json":
				return "JSON";
				
				case "selector":
				return "实体";
				
				case "enum":
				return "列表";
				
				case "plain":
				return "常量";
				
				case "custom":
				if (cp.vtype) return cp.vtype;
				return "自定义类型";
				
				case "position":
				return "坐标";
				
				case "command":
				return "命令";
				
				case "text":
				default:
				return "文本";
			}
		},
		formatPattern : function(cmd, pattern) {
			var c = CA.IntelliSense.library.commands[cmd], r = ["/" + cmd];
			if (pattern) {
				c.patterns[pattern].params.forEach(function(e) {
					r.push(CA.IntelliSense.getParamTag(e, null, 0, null));
				});
			}
			return r.join(" ");
		},
		getPatternDescription : function(cmd, pattern) {
			var c = CA.IntelliSense.library.commands[cmd];
			return (pattern ? c.patterns[pattern].description : c.noparams.description) || c.description;
		},
		chooseCommand : function(callback, optional) {
			var lib = CA.IntelliSense.library, cmds;
			(cmds = Object.keys(lib.commands).filter(function(e) {
				return !lib.commands[e].alias;
			})).sort();
			if (!cmds.length) {
				Common.toast("没有可选的命令");
				return;
			}
			Common.showListChooser(cmds.map(function(e) {
				return {
					text : e,
					description : lib.commands[e].description
				};
			}), function(id) {
				callback(cmds[id]);
			}, optional);
		},
		choosePatterns : function(cmd, callback, optional) {
			var c = CA.IntelliSense.library.commands[cmd], ps;
			if (!c.patterns && !c.noparams) return void Common.toast("该命令不存在命令模式");
			ps = c.patterns ? Object.keys(c.patterns) : [];
			if (c.noparams) ps.unshift(null);
			if (!ps.length) {
				Common.toast("没有可选的命令模式");
				return;
			}
			Common.showListChooser(ps.map(function(e) {
				return {
					text : CA.Assist.formatPattern(cmd, e),
					description : CA.Assist.getPatternDescription(cmd, e)
				};
			}), function(id) {
				callback(ps[id]);
			}, optional);
		},
		editComponent : function self(e, callback, onReset) {G.ui(function() {try {
			var layout, title, i, adpt, list, add, reset, exit, popup;
			if (!self.selectors) {
				self.refresh = function(e, adpt) {
					adpt.setArray(e.components);
				}
				self.addParam = function(e, adpt) {
					var i, a = [], c, cs = e.current_component;
					if (cs.type == "object") {
						for (i in cs.children) {
							c = self.extendComponent(cs.children[i]);
							a.push({
								text : c.name,
								description : c.description || i,
								data : c,
								id : i
							});
						}
					} else if (cs.type == "array") {
						c = self.extendComponent(cs.children);
						a.push({
							text : c.name || "元素",
							description : c.description,
							data : c
						});
					}
					Common.showListChooser(a, function(pos) {
						var p = {
							_id : a[pos].id,
							param : a[pos].data
						};
						if (p.param.type == "object" || p.param.type == "array") {
							p.param = {
								type : "json",
								name : a[pos].text,
								component : p.param
							}
						}
						CA.Assist.editParam(p, function(text) {
							p.text = text;
							p.jsonData = self.getJSON(p);
							e.components.push(p);
							self.refresh(e, adpt);
						});
					}, true);
				}
				self.editParam = function(e, i, adpt) {
					CA.Assist.editParam(e.components[i], function(text) {
						var p = e.components[i];
						p.text = text;
						p.jsonData = self.getJSON(p);
						self.refresh(e, adpt);
					});
				}
				self.extendComponent = function(c) {
					var i, o;
					if (!c) return null;
					if (c instanceof Object) {
						o = c.extends ? self.extendComponent(c.extends) : {};
						for (i in c) o[i] = c[i];
						return o;
					} else {
						return self.extendComponent(CA.IntelliSense.library.json[c]);
					}
				}
				self.getJSON = function(e) {
					switch (e.param.type) {
						case "nbt":
						case "json":
						return e.jsonData;
						break;
						case "int":
						case "uint":
						case "float":
						return Number(e.text);
						break;
						case "plain":
						case "enum":
						case "custom":
						case "command":
						case "rawjson":
						case "text":
						default:
						return e.text;
					}
				}
				self.adapter = function(e, i, a, tag) {
					var view = new G.LinearLayout(ctx),
						text = new G.TextView(ctx),
						del = new G.TextView(ctx);
					view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					view.setOrientation(G.LinearLayout.HORIZONTAL);
					view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					text.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1));
					text.setText((e._id ? e.param.name + "：" : "") + e.text);
					text.setSingleLine(true);
					text.setEllipsize(G.TextUtils.TruncateAt.END);
					text.setPadding(10 * G.dp, 10 * G.dp, 0, 10 * G.dp);
					Common.applyStyle(text, "textview_default", 2);
					view.addView(text);
					del.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
					del.setText("×");
					del.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
					Common.applyStyle(del, "textview_default", 2);
					del.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
						tag.delete(i);
					} catch(e) {erp(e)}}}));
					view.addView(del);
					return view;
				}
			}
			layout = new G.LinearLayout(ctx);
			layout.setOrientation(G.LinearLayout.VERTICAL);
			layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(layout, "message_bg");
			title = new G.TextView(ctx);
			title.setText("编辑“" + e.param.name + "”");
			title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
			add = new G.TextView(ctx);
			add.setText("+ 添加组件");
			add.setSingleLine(true);
			add.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			add.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
			Common.applyStyle(add, "button_default", 2);
			list = new G.ListView(ctx);
			list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1));
			list.addFooterView(add);
			list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				if (view == add) {
					self.addParam(e, adpt);
				} else {
					self.editParam(e, pos, adpt);
				}
			} catch(e) {erp(e)}}}));
			layout.addView(list);
			if (onReset) {
				reset = new G.TextView(ctx);
				reset.setLayoutParams(new G.TableLayout.LayoutParams(-1, -2));
				reset.setText("重置参数");
				reset.setGravity(G.Gravity.CENTER);
				reset.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
				Common.applyStyle(reset, "button_critical", 3);
				reset.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
					onReset();
					popup.dismiss();
				} catch(e) {erp(e)}}}));
				layout.addView(reset);
			}
			exit = new G.TextView(ctx);
			exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			exit.setText("确定");
			exit.setGravity(G.Gravity.CENTER);
			exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 15 * G.dp);
			Common.applyStyle(exit, "button_critical", 3);
			exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var i, o;
				if (e.current_component.type == "object") {
					o = {};
					for (i in e.components) {
						o[e.components[i]._id] = e.components[i].jsonData;
					}
				} else if (e.current_component.type == "array") {
					o = [];
					for (i in e.components) {
						o.push(e.components[i].jsonData);
					}
				}
				callback(JSON.stringify(e.jsonData = o));
				popup.dismiss();
			} catch(e) {erp(e)}}}));
			layout.addView(exit);
			if (!e.components) e.components = [];
			list.setAdapter(adpt = new RhinoListAdapter(e.components, self.adapter, {
				delete : function(i) {
					e.components.splice(i, 1);
					self.refresh(e, adpt);
				}
			}));
			e.current_component = self.extendComponent(e.param.component);
			adpt = RhinoListAdapter.getController(adpt);
			self.refresh(e, adpt);
			popup = Common.showDialog(layout, -1, -2);
		} catch(e) {erp(e)}})}
	}
});

MapScript.loadModule("PWM", {
	windows : [],
	floats : [],
	popups : [],
	listeners : [],
	resetFlags : [],
	intentBack : false,
	busy : false,
	wm : ctx.getSystemService(ctx.WINDOW_SERVICE),
	onResume : function() {
		if (this.intentBack) {
			this.showAll();
			this.intentBack = false;
			return true;
		}
		return false;
	},
	add : function(w) {
		var v, wp;
		if (this.windows.indexOf(w) < 0) this.windows.push(w);
		this.floats.forEach(function(e) {
			if (!e.isShowing()) return;
			v = e.getContentView();
			if (!v) return;
			v = v.getRootView();
			wp = v.getLayoutParams();
			PWM.wm.removeViewImmediate(v);
			PWM.wm.addView(v, wp);
		});
		this._notifyListeners("add", w);
	},
	addFloat : function(w) {
		if (this.floats.indexOf(w) < 0) this.floats.push(w);
		this._notifyListeners("addFloat", w);
	},
	addPopup : function(w) {
		if (this.popups.indexOf(w) < 0) this.popups.push(w);
		this._notifyListeners("addPopup", w);
	},
	hideAll : function() {
		var v;
		this.windows.forEach(function(e) {
			if (!e.isShowing()) return;
			v = e.getContentView();
			if (!v) return;
			v.getRootView().setVisibility(G.View.GONE);
		});
		Common.hideIME();
		this._notifyListeners("hideAll");
	},
	showAll : function() {
		var v;
		this.windows.forEach(function(e) {
			if (!e.isShowing()) return;
			v = e.getContentView();
			if (!v) return;
			v.getRootView().setVisibility(G.View.VISIBLE);
		});
		this._notifyListeners("showAll");
	},
	dismissAll : function() {
		var v;
		this.busy = true;
		this.windows.forEach(function(e) {
			if (!e.isShowing()) return;
			e.dismiss();
		});
		this.busy = false;
		this._notifyListeners("dismissAll");
	},
	dismissFloat : function() {
		var v;
		this.busy = true;
		this.floats.forEach(function(e) {
			if (!e.isShowing()) return;
			e.dismiss();
		});
		this.busy = false;
		this._notifyListeners("dismissFloat");
	},
	dismissPopup : function() {
		var v;
		this.busy = true;
		this.popups.forEach(function(e) {
			if (!e.isShowing()) return;
			e.dismiss();
		});
		this.busy = false;
		this._notifyListeners("dismissPopup");
	},
	getCount : function() {
		var s = 0;
		this.windows.forEach(function(e) {
			if (e.isShowing()) s++;
		});
		return s;
	},
	reset : function() {
		this._notifyListeners("reset");
		this.windows.length = this.floats.length = this.popups.length = this.listeners.length = 0;
	},
	resetUICache : function() {
		this.resetFlags.forEach(function(e) {
			e.obj[e.prop] = e.value;
		});
	},
	registerResetFlag : function(obj, prop, value) {
		var i, e;
		for (i in this.resetFlags) {
			e = this.resetFlags[i];
			if (e.obj == obj && e.prop == prop) {
				e.value = value;
				return;
			}
		}
		this.resetFlags.push({
			obj : obj,
			prop : prop,
			value : value
		});
	},
	observe : function(f) {
		this.unobserve(f);
		this.listeners.push(f);
	},
	unobserve : function(f) {
		var t = this.listeners.indexOf(f);
		if (t >= 0) this.listeners.splice(t, 1);
	},
	_notifyListeners : function() {
		var args = arguments;
		this.listeners.forEach(function(e) {
			e.apply(null, args);
		});
	}
});

MapScript.loadModule("Common", {
	themelist : {
		"light" : {
			"name" : "默认风格"
		}
	},
	theme : null,
	
	/* BUG 修复
	 * Android 8.0 颜色转换出错
	 * 原因：Oreo版本新增了多个方法：
	    Color.argb(float, float, float, float)
	   与它的同名方法在JS层面上参数表相同。
	    Color.argb(int, int, int, int)
	   还有Color.red, Color.green等方法也出现此状况。
	   解决方案：自定义argb、rgb等方法。
	 */
	argbInt : function(alpha, red, green, blue) {
		return (new java.lang.Long((alpha << 24) | (red << 16) | (green << 8) | blue)).intValue();
	},
	rgbInt : function(red, green, blue) {
		return (new java.lang.Long((0xff << 24) | (red << 16) | (green << 8) | blue)).intValue();
	},
	setAlpha : function(color, alpha) {
		return (new java.lang.Long((alpha << 24) | (color & 0xffffff))).intValue();
	},
	
	loadTheme : function(id) {
		var light = {
			"bgcolor" : "#FAFAFA",
			"float_bgcolor" : "#F5F5F5",
			"message_bgcolor" : "#FAFAFA",
			"textcolor" : "#212121",
			"promptcolor" : "#9E9E9E",
			"highlightcolor" : "#0000FF",
			"criticalcolor" : "#FF0000",
			"go_bgcolor" : "#EEEEEE",
			"go_textcolor" : "#000000",
			"go_touchbgcolor" : "#616161",
			"go_touchtextcolor" : "#FAFAFA"
		};
		var convert = function(v, d) {
			var n = Number("0x" + String(v).slice(1));
			if (isNaN(n)) n = Number("0x" + d.slice(1));
			return Common.argbInt(0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff);
		}
		var r = {id : (id in this.themelist ? String(id) : "light")}, k, i, t;
		k = r.id in this.themelist ? this.themelist[r.id] : light;
		for (i in light) {
			r[i] = convert(k[i], light[i]);
		}
		r.name = k === light ? "默认主题" : String(k.name);
		i = Math.floor(CA.settings.alpha * 255);
		if (i >= 0 && i < 255) {
			r.bgcolor = this.setAlpha(r.bgcolor, i);
			r.float_bgcolor = this.setAlpha(r.float_bgcolor, i);
			r.message_bgcolor = this.setAlpha(r.message_bgcolor, 0xe0);
		} else {
			CA.settings.alpha = i = 1;
		}
		i = parseFloat(CA.settings.textSize);
		if (!(i > 0)) {
			CA.settings.textSize = i = 1;
		}
		r.textsize = [Math.ceil(10 * i), Math.ceil(12 * i), Math.ceil(14 * i), Math.ceil(16 * i), Math.ceil(18 * i)];
		t = ctx.getResources().getDisplayMetrics();
		G.dp = t.density * i;
		G.sp = t.scaledDensity * i;
		this.theme = r;
	},
	applyStyle : function(v, style, size) {
		switch (style) {
			case "bar_float":
			v.setBackgroundColor(this.theme.float_bgcolor);
			if (G.style == "Material") v.setElevation(8 * G.dp);
			break;
			case "container_default":
			v.setBackgroundColor(Common.theme.bgcolor);
			break;
			case "message_bg":
			v.setBackgroundColor(Common.theme.message_bgcolor);
			break;
			case "textview_default":
			case "button_default":
			case "item_default":
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.textcolor);
			break;
			case "textview_prompt":
			case "button_secondary":
			case "item_disabled":
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.promptcolor);
			break;
			case "textview_critial":
			case "button_critical":
			case "item_critical":
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.criticalcolor);
			break;
			case "textview_highlight":
			case "button_highlight":
			case "item_highlight":
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.highlightcolor);
			break;
			case "button_reactive":
			v.setBackgroundColor(Common.theme.go_bgcolor);
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.go_textcolor);
			break;
			case "button_reactive_pressed":
			v.setBackgroundColor(Common.theme.go_touchbgcolor);
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.go_touchtextcolor);
			break;
			case "edittext_default":
			v.setBackgroundColor(G.Color.TRANSPARENT);
			v.setTextSize(Common.theme.textsize[size]);
			v.setTextColor(Common.theme.textcolor);
			v.setHintTextColor(Common.theme.promptcolor);
			break;
		}
	},
	
	showChangeTheme : function self(update, dismiss) {G.ui(function() {try {
		if (!self.linear) {
			self.adapter = function(e, i, a) {
				var view = new G.TextView(ctx);
				Common.loadTheme(e);
				view.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				view.setBackgroundColor(Common.theme.bgcolor);
				view.setText(Common.theme.name + (self.current == e ? " (当前)" : ""));
				view.setTextSize(Common.theme.textsize[3]);
				view.setTextColor(Common.theme.textcolor);
				Common.loadTheme(self.current);
				view.setGravity(G.Gravity.CENTER);
				return view;
			}
			self.refresh = function() {
				self.current = Common.theme.id;
				self.list.setAdapter(new RhinoListAdapter(Object.keys(Common.themelist), self.adapter));
				self.linear.setBackgroundColor(Common.theme.message_bgcolor);
				self.linear.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
				self.title.setPadding(0, 0, 0, 10 * G.dp);
				self.title.setTextSize(Common.theme.textsize[4]);
				self.title.setTextColor(Common.theme.textcolor);
				self.alpha.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
				self.alpha.setText("不透明度：" + (isFinite(CA.settings.alpha) ? parseInt(CA.settings.alpha * 100) : 100) + "%");
				self.alpha.setTextSize(Common.theme.textsize[2]);
				self.alpha.setTextColor(Common.theme.highlightcolor);
				self.tsz.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
				self.tsz.setText("字体大小：" + (isFinite(CA.settings.textSize) ? parseInt(CA.settings.textSize * 100) : 100) + "%");
				self.tsz.setTextSize(Common.theme.textsize[2]);
				self.tsz.setTextColor(Common.theme.highlightcolor);
				self.exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
				self.exit.setTextSize(Common.theme.textsize[3]);
				self.exit.setTextColor(Common.theme.criticalcolor);
			}
			self.alphaSetting = function() {
				Common.showSlider({
					max : 100,
					progress : Math.floor(CA.settings.alpha * 100),
					prompt : function(progress) {
						return "不透明度：" + progress + "%";
					},
					callback : function(progress) {
						CA.settings.alpha = progress / 100;
						Common.loadTheme(self.current);
						self.refresh();
					},
				});
			}
			self.tszSetting = function() {
				var l = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
				Common.showListChooser(l.map(function(e) {
					return String(e * 100) + "%";
				}), function(p) {
					CA.settings.textSize = l[p];
					Common.loadTheme(self.current);
					self.refresh();
				});
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			
			self.title = new G.TextView(ctx);
			self.title.setText("主题选择");
			self.title.setGravity(G.Gravity.CENTER);
			self.linear.addView(self.title, new G.LinearLayout.LayoutParams(-1, -2));
			
			self.list = new G.ListView(ctx);
			self.list.setDividerHeight(0);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				Common.loadTheme(parent.getAdapter().getItem(pos));
				self.refresh();
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list, new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			
			self.exbar = new G.LinearLayout(ctx);
			self.exbar.setOrientation(G.LinearLayout.HORIZONTAL);
			
			self.alpha = new G.TextView(ctx);
			self.alpha.setGravity(G.Gravity.CENTER);
			self.alpha.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.alphaSetting();
			} catch(e) {erp(e)}}}));
			self.exbar.addView(self.alpha, new G.LinearLayout.LayoutParams(-2, -2, 1));
			
			self.tsz = new G.TextView(ctx);
			self.tsz.setGravity(G.Gravity.CENTER);
			self.tsz.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.tszSetting();
			} catch(e) {erp(e)}}}));
			self.exbar.addView(self.tsz, new G.LinearLayout.LayoutParams(-2, -2, 1));
			self.linear.addView(self.exbar, new G.LinearLayout.LayoutParams(-1, -2));
			
			self.exit = new G.TextView(ctx);
			self.exit.setText("确定");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (Common.theme.id != self.last || CA.settings.alpha != self.lastalpha || CA.settings.textSize != self.lasttsz) {
					self.modified = true;
					if (self.update) self.update();
					//此处无需dismiss。因为update会自动resetGUI()
				} else {
					self.popup.dismiss();
				}
				return true;
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.exit, new G.LinearLayout.LayoutParams(-1, -2));
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		self.update = update;
		self.modified = false;
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NOT_NEEDED);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			if (!self.modified) Common.loadTheme(self.last);
			if (dismiss) dismiss();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.last = Common.theme.id;
		self.lastalpha = CA.settings.alpha;
		self.lasttsz = CA.settings.textSize;
		self.refresh();
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	customVMaker : function(holder) {
		var view = new G.TextView(ctx);
		view.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
		view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
		Common.applyStyle(view, "textview_default", 3);
		return view;
	},
	
	initEnterAnimation : function(v) {
		var trans;
		if (!CA.settings.noAnimation) {
			trans = new G.AlphaAnimation(0, 1);
			trans.setDuration(150);
			v.startAnimation(trans);
		}
	},
	
	showDialog : function(layout, width, height, onDismiss, modal) {
		var frame, popup, trans;
		frame = new G.FrameLayout(ctx);
		frame.setBackgroundColor(this.argbInt(0x80, 0, 0, 0));
		frame.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
			if (e.getAction() == e.ACTION_DOWN && !modal) {
				popup.dismiss();
			}
			return true;
		} catch(e) {return erp(e), true}}}));
		layout.setLayoutParams(new G.FrameLayout.LayoutParams(width, height, G.Gravity.CENTER));
		layout.getLayoutParams().setMargins(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
		layout.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
			return true;
		} catch(e) {return erp(e), true}}}));
		frame.addView(layout);
		this.initEnterAnimation(frame);
		if (G.style == "Material") layout.setElevation(16 * G.dp);
		popup = new G.PopupWindow(frame, -1, -1);
		if (CA.supportFloat) popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		popup.setFocusable(true);
		if (!modal) popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		if (onDismiss) popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			onDismiss();
		} catch(e) {erp(e)}}}));
		popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(popup);
		return popup;
	},
	
	showTextDialog : function(s, onDismiss) {G.ui(function() {try {
		var layout, scr, text, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		scr = new G.ScrollView(ctx);
		scr.setLayoutParams(new G.LinearLayout.LayoutParams(-2, 0, 1));
		text = new G.TextView(ctx);
		text.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
		text.setText(s);
		text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		text.setMovementMethod(G.LinkMovementMethod.getInstance());
		Common.applyStyle(text, "textview_default", 2);
		scr.addView(text);
		layout.addView(scr);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("关闭");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			popup.dismiss();
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		popup = Common.showDialog(layout, -2, -2, onDismiss);
	} catch(e) {erp(e)}})},
	
	showOperateDialog : function self(s, tag, onDismiss) {G.ui(function() {try {
		var frame, list, popup;
		if (!self.adapter) {
			self.adapter = function(e) {
				if (isFinite(e.gap)) {
					e.view = new G.View(ctx);
					e.view.setLayoutParams(new G.AbsListView.LayoutParams(-1, e.gap));
					e.view.setFocusable(true);
					return e.view;
				} else {
					e.view = new G.LinearLayout(ctx);
					e.view.setOrientation(G.LinearLayout.VERTICAL);
					e.view.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
					e.view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					e._title = new G.TextView(ctx);
					e._title.setText(String(e.text));
					e._title.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
					e._title.setFocusable(false);
					e._title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
					Common.applyStyle(e._title, "textview_default", 2);
					e.view.addView(e._title);
					if (e.description) {
						e._description = new G.TextView(ctx);
						e._description.setText(String(e.description));
						e._description.setPadding(0, 3 * G.dp, 0, 0);
						e._description.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
						Common.applyStyle(e._description, "textview_prompt", 1);
						e.view.addView(e._description);
					}
					return e.view;
				}
			}
		}
		s = s.filter(function(e) {
			if (e.hidden && e.hidden(tag)) return false;
			return true;
		});
		frame = new G.FrameLayout(ctx);
		frame.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
		Common.applyStyle(frame, "message_bg");
		list = new G.ListView(ctx);
		list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
		list.setDividerHeight(0);
		list.setAdapter(new RhinoListAdapter(s, self.adapter));
		list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
			var e = s[pos];
			if (e.onclick) if (!e.onclick(e.button, tag)) popup.dismiss();
			return true;
		} catch(e) {erp(e)}}}));
		frame.addView(list);
		popup = Common.showDialog(frame, -1, -2, onDismiss);
	} catch(e) {erp(e)}})},
	
	showInputDialog : function(s) {G.ui(function() {try {
		var layout, title, text, ret, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		if (s.title) {
			title = new G.TextView(ctx);
			title.setText(s.title);
			title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
		}
		if (s.description) {
			text = new G.TextView(ctx);
			text.setText(s.description);
			text.setPadding(0, 0, 0, 10 * G.dp);
			text.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			Common.applyStyle(text, "textview_prompt", 2);
			layout.addView(text);
		}
		ret = new G.EditText(ctx);
		if (s.defaultValue) ret.setText(s.defaultValue);
		ret.setSingleLine(Boolean(s.singleLine));
		if (s.inputType) ret.setInputType(s.inputType);
		if (s.keyListener) ret.setKeyListener(s.keyListener);
		if (s.transformationMethod) ret.setTransformationMethod(s.transformationMethod);
		ret.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
		ret.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
		ret.setSelection(ret.length());
		Common.applyStyle(ret, "edittext_default", 2);
		layout.addView(ret);
		Common.postIME(ret);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("确定");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			if (s.callback && s.callback(s.text = String(ret.getText()))) return true;
			popup.dismiss();
			return true;
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		layout.addOnLayoutChangeListener(new G.View.OnLayoutChangeListener({onLayoutChange : function(v, l, t, r, b, ol, ot, or, ob) {try {
			ret.setMinWidth(0.5 * Common.getScreenWidth());
		} catch(e) {erp(e)}}}));
		s.text = null;
		s.dialog = popup = Common.showDialog(layout, -2, -2, s.onDismiss);
	} catch(e) {erp(e)}})},
	
	showConfirmDialog : function(s) {G.ui(function() {try {
		var scr, layout, title, text, skip, onClick, popup;
		scr = new G.ScrollView(ctx);
		Common.applyStyle(scr, "message_bg");
		layout = new G.LinearLayout(ctx);
		layout.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 5 * G.dp);
		if (s.title) {
			title = new G.TextView(ctx);
			title.setText(s.title);
			title.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			title.setPadding(0, 0, 0, 10 * G.dp);
			Common.applyStyle(title, "textview_default", 4);
			layout.addView(title);
		}
		if (s.description) {
			text = new G.TextView(ctx);
			text.setText(s.description);
			text.setPadding(0, 0, 0, 10 * G.dp);
			text.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			Common.applyStyle(text, "textview_prompt", 2);
			layout.addView(text);
		}
		if (s.skip) {
			skip = new G.CheckBox(ctx);
			skip.setChecked(Boolean(s.canSkip));
			skip.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
			skip.getLayoutParams().setMargins(0, 0, 0, 10 * G.dp)
			skip.setText("不再提示");
			layout.addView(skip);
		}
		onClick = function(i) {
			if (s.skip) s.skip(skip.isChecked());
			if (s.callback && s.callback(i)) return;
			popup.dismiss();
		}
		but = (s.buttons || ["确定", "取消"]).map(function(e, i) {
			var b = new G.TextView(ctx);
			b.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			b.setText(String(e));
			b.setGravity(G.Gravity.CENTER);
			b.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(b, "button_critical", 3);
			b.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				onClick(i);
			} catch(e) {erp(e)}}}));
			layout.addView(b);
			return b;
		});
		scr.addView(layout);
		popup = Common.showDialog(scr, -2, -2, s.onDismiss);
	} catch(e) {erp(e)}})},
	
	showListChooser : function self(l, callback, optional, onDismiss) {G.ui(function() {try {
		var frame, list, popup;
		if (!self.vmaker) {
			self.vmaker = function(holder) {
				var view = new G.LinearLayout(ctx);
				view.setOrientation(G.LinearLayout.VERTICAL);
				view.setPadding(15 * G.dp, 10 * G.dp, 15 * G.dp, 10 * G.dp);
				view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				var title = holder.title = new G.TextView(ctx);
				title.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
				title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				Common.applyStyle(title, "textview_default", 2);
				view.addView(title);
				var desp = holder.desp = new G.TextView(ctx);
				desp.setPadding(0, 3 * G.dp, 0, 0);
				desp.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
				Common.applyStyle(desp, "textview_prompt", 1);
				view.addView(desp);
				return view;
			}
			self.vbinder = function(holder, e) {
				if (e instanceof Object) {
					holder.title.setText(String(e.text));
					if (e.description) {
						holder.desp.setText(String(e.description));
						holder.desp.setVisibility(G.View.VISIBLE);
					} else {
						holder.desp.setVisibility(G.View.GONE);
					}
				} else {
					holder.title.setText(String(e));
					holder.desp.setVisibility(G.View.GONE);
				}
			}
		}
		if (l.length == 0) {
			Common.toast("没有可选的选项");
			return;
		}
		if (optional && l.length == 1 && !callback(0)) return;
		frame = new G.FrameLayout(ctx);
		Common.applyStyle(frame, "message_bg");
		list = new G.ListView(ctx);
		list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
		list.setAdapter(new SimpleListAdapter(l, self.vmaker, self.vbinder));
		list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
			if (!callback(pos)) popup.dismiss();
			return true;
		} catch(e) {erp(e)}}}));
		frame.addView(list);
		popup = Common.showDialog(frame, -1, -2, onDismiss);
	} catch(e) {erp(e)}})},
	
	showProgressDialog : function self(f, onCancel) {
		if (!self.loadAnimation) {
			self.loadAnimation = function(prg) {
				prg.setImageDrawable(new G.ColorDrawable(Common.theme.highlightcolor));
				var aset = new G.AnimationSet(false);
				var tani = new G.TranslateAnimation(-180 * G.dp, 180 * G.dp, 0, 0);
				var sani = new G.ScaleAnimation(0.5, 0.3, 1, 1, 120 * G.dp, 0);
				tani.setDuration(1500);
				tani.setRepeatMode(G.Animation.RESTART);
				tani.setRepeatCount(-1);
				sani.setDuration(1000);
				sani.setRepeatMode(G.Animation.REVERSE);
				sani.setRepeatCount(-1);
				aset.addAnimation(sani);
				aset.addAnimation(tani);
				prg.startAnimation(aset);
			}
			self.init = function(o) {G.ui(function() {try {
				var layout, text, prg, popup;
				layout = new G.LinearLayout(ctx);
				layout.setOrientation(G.LinearLayout.VERTICAL);
				Common.applyStyle(layout, "message_bg");
				text = o.text = new G.TextView(ctx);
				text.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
				text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
				Common.applyStyle(text, "textview_default", 2);
				layout.addView(text);
				prg = new G.ImageView(ctx);
				prg.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 4 * G.dp));
				self.loadAnimation(prg);
				layout.addView(prg);
				o.popup = Common.showDialog(layout, 240 * G.dp, -2, function() {
					if (!o.closed) {
						o.cancelled = true;
						if (typeof o.onCancel == "function") o.onCancel();
					}
					o.closed = true;
				}, !o.onCancel);
			} catch(e) {erp(e)}})},
			self.controller = {
				setText : function(s) {
					var o = this;
					G.ui(function() {try {
						o.text.setText(s);
					} catch(e) {erp(e)}});
				},
				close : function() {
					var o = this;
					G.ui(function() {try {
						if (o.closed) return;
						o.closed = true;
						o.popup.dismiss();
					} catch(e) {erp(e)}});
				},
				async : function(f) {
					var o = this;
					var th = new java.lang.Thread(function() {
						try {
							f(o);
						} catch(e) {erp(e)}
						o.close();
					});
					th.start();
				}
			};
		}
		var o = Object.create(self.controller);
		o.onCancel = onCancel;
		self.init(o);
		if (f) o.async(f);
		return o;
	},
	
	showSlider : function self(o) {G.ui(function() {try {
		var layout, seekbar, text, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		seekbar = new G.SeekBar(ctx);
		seekbar.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
		seekbar.setMax(o.max);
		seekbar.setProgress(o.progress);
		seekbar.setOnSeekBarChangeListener(new G.SeekBar.OnSeekBarChangeListener({
			onProgressChanged : function(v, progress, fromUser) {try {
				text.setText(o.prompt(progress));
			} catch(e) {erp(e)}}
		}));
		layout.addView(seekbar);
		text = new G.TextView(ctx);
		text.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
		text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		Common.applyStyle(text, "textview_default", 2);
		layout.addView(text);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("关闭");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			o.callback(seekbar.getProgress());
			popup.dismiss();
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		text.setText(o.prompt(o.progress));
		popup = Common.showDialog(layout, -1, -2, o.onDismiss);
	} catch(e) {erp(e)}})},
	
	showSettings : function self(data, onSave) {G.ui(function() {try {
		if (!self.linear) {
			self.refreshText = function() {
				if (!self.popup) return;
				self.data.forEach(function(e, i) {
					if (!e._view) return;
					if (e.type == "text") {
						e._text.setText(String(e.get ? e.get() : e.text));
					} else if (e.type == "custom") {
						e._text.setText(e.get ? String(e.get()) : "");
					} else if (e.type == "boolean") {
						e._box.setChecked(e.get());
					} else if (e.type == "seekbar") {
						e._seekbar.setProgress(e.get());
					}
				});
			}
			self.adapter = function(e, i, a, extra) {
				var hl, vl;
				switch (e.type) {
					case "boolean":
					case "custom":
					hl = new G.LinearLayout(ctx);
					hl.setOrientation(G.LinearLayout.HORIZONTAL);
					hl.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
					hl.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
					vl = new G.LinearLayout(ctx);
					vl.setOrientation(G.LinearLayout.VERTICAL);
					vl.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 1.0));
					vl.getLayoutParams().gravity = G.Gravity.CENTER;
					e._name = new G.TextView(ctx);
					e._name.setText(String(e.name));
					e._name.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
					Common.applyStyle(e._name, "textview_default", 3);
					vl.addView(e._name);
					if (e.description) {
						e._description = new G.TextView(ctx);
						e._description.setText(String(e.description));
						e._description.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
						Common.applyStyle(e._description, "textview_prompt", 1);
						vl.addView(e._description);
					}
					hl.addView(vl);
					if (e.type == "custom") {
						e._text = new G.TextView(ctx);
						e._text.setText(e.get ? String(e.get()) : "");
						e._text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
						e._text.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
						e._text.getLayoutParams().gravity = G.Gravity.CENTER;
						Common.applyStyle(e._text, "textview_prompt", 2);
						hl.addView(e._text);
					} else {
						e._box = new G.CheckBox(ctx);
						e._box.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
						e._box.getLayoutParams().gravity = G.Gravity.CENTER;
						e._box.setChecked(e.get());
						e._box.setOnCheckedChangeListener(new G.CompoundButton.OnCheckedChangeListener({onCheckedChanged : function(v, s) {try {
							e.set(s);
							if (e.onclick) e.onclick(function() {
								self.refreshText();
							});
							e._box.setChecked(e.get());
						} catch(e) {erp(e)}}}));
						e._box.setFocusable(false);
						hl.addView(e._box);
					}
					return e._view = hl;
					case "space":
					e._sp = new G.Space(ctx);
					e._sp.setLayoutParams(G.AbsListView.LayoutParams(-1, e.height));
					e._sp.setFocusable(true);
					return e._view = e._sp;
					case "tag":
					e._tag = new G.TextView(ctx);
					e._tag.setText(String(e.name));
					e._tag.setPadding(20 * G.dp, 25 * G.dp, 0, 0);
					e._tag.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
					e._tag.setFocusable(true);
					Common.applyStyle(e._tag, "textview_highlight", 2);
					return e._view = e._tag;
					case "text":
					e._text = new G.TextView(ctx);
					e._text.setText(String(e.get ? e.get() : e.text));
					e._text.setPadding(20 * G.dp, 0, 20 * G.dp, 10 * G.dp);
					e._text.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
					e._text.setFocusable(true);
					Common.applyStyle(e._text, "textview_prompt", 2);
					return e._view = e._text;
					case "seekbar":
					vl = new G.LinearLayout(ctx);
					vl.setOrientation(G.LinearLayout.VERTICAL);
					vl.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
					vl.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
					hl = new G.LinearLayout(ctx);
					hl.setOrientation(G.LinearLayout.HORIZONTAL);
					hl.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
					hl.setPadding(0, 0, 0, 10 * G.dp);
					hl.getLayoutParams().gravity = G.Gravity.CENTER;
					e._name = new G.TextView(ctx);
					e._name.setText(String(e.name));
					e._name.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2));
					Common.applyStyle(e._name, "textview_default", 3);
					hl.addView(e._name);
					e._progress = new G.TextView(ctx);
					e._progress.setLayoutParams(G.LinearLayout.LayoutParams(-1, -1));
					e._progress.setGravity(G.Gravity.CENTER | G.Gravity.RIGHT);
					e._progress.setPadding(0, 0, 10 * G.dp, 0);
					Common.applyStyle(e._progress, "textview_prompt", 2);
					hl.addView(e._progress);
					vl.addView(hl);
					e._seekbar = new G.SeekBar(ctx);
					e._seekbar.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
					e._seekbar.setOnSeekBarChangeListener(new G.SeekBar.OnSeekBarChangeListener({
						onProgressChanged : function(v, progress, fromUser) {try {
							e._progress.setText(e.current ? e.current(progress) : progress);
							return true;
						} catch(e) {erp(e)}},
						onStopTrackingTouch : function(v) {try {
							e.set(v.getProgress());
							return true;
						} catch(e) {erp(e)}}
					}));
					e._seekbar.setMax(e.max);
					e._seekbar.setProgress(e.get());
					vl.addView(e._seekbar);
					return e._view = vl;
				}
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			Common.applyStyle(self.linear, "message_bg");
			
			self.title = new G.TextView(ctx);
			self.title.setText("设置");
			self.title.setPadding(15 * G.dp, 10 * G.dp, 15 * G.dp, 10 * G.dp);
			Common.applyStyle(self.title, "bar_float");
			Common.applyStyle(self.title, "textview_default", 4);
			self.title.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
			
			self.list = new G.ListView(ctx);
			self.list.setDividerHeight(0);
			self.list.addHeaderView(self.title);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var e = parent.getAdapter().getItem(pos);
				if (!e) return true;
				if (e.type == "custom") {
					if (e.onclick) e.onclick(function(v) {
						self.refreshText();
						e._text.setText(String(v == null ? e.get() : v));
					});
				} else if (e.type == "boolean") {
					e._box.performClick();
				}
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list, new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			
			self.exit = new G.TextView(ctx);
			self.exit.setText("确定");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
			Common.applyStyle(self.exit, "bar_float");
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.popup.dismiss();
				return true;
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.exit, new G.LinearLayout.LayoutParams(-1, -2));
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NOT_NEEDED);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			self.data.forEach(function(e, i) {
				switch (e.type) {
					case "boolean":
					case "seekbar":
					if (e.get() != self.last[i] && e.refresh) e.refresh();
					return;
					case "custom":
					case "space":
					case "tag":
					case "text":
					return;
				}
			});
			if (onSave) onSave();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.data = data;
		self.last = data.map(function(e) {
			switch (e.type) {
				case "boolean":
				case "seekbar":
				return e.get();
				case "custom":
				case "space":
				case "tag":
				case "text":
				return null;
			}
		});
		self.list.setAdapter(new RhinoListAdapter(data, self.adapter));
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showFileDialog : function self(o) {G.ui(function() {try {
		if (!self.linear) {
			self.vmaker = function() {
				var name = new G.TextView(ctx);
				name.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				name.setSingleLine(true);
				name.setEllipsize(G.TextUtils.TruncateAt.END);
				name.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
				return name;
			}
			self.vbinder = function(holder, e) {
				if (e) {
					holder.self.setText((e.isDirectory() ? "📁 " : "📄 ") + String(e.getName()));
					Common.applyStyle(holder.self, e.isHidden() ? "item_disabled" : "item_default", 3);
				} else {
					holder.self.setText("📂 .. (上一级目录)");
					Common.applyStyle(holder.self, "item_default", 3);
				}
			}
			self.compare = function(a, b) {
				return a.getName().compareToIgnoreCase(b.getName());
			}
			self.choose = function(e) {
				var o = self.sets;
				if (o.check && !o.check(e)) return false;
				self.popup.dismiss();
				o.result = e;
				if (o.callback) o.callback(o);
				self.lastDir = o.curdir.getAbsolutePath();
				return true;
			}
			self.refresh = function() {
				var o = self.sets;
				var f = o.curdir.listFiles(), i, dir = [], fi = [];
				for (i in f) {
					if (o.filter && !o.filter(f[i])) continue;
					if (f[i].isDirectory()) {
						dir.push(f[i]);
					} else if (f[i].isFile()) {
						fi.push(f[i]);
					}
				}
				self.path.setText(o.curdir.getAbsolutePath());
				if (o.compare) {
					dir.sort(o.compare);
					fi.sort(o.compare);
				} else {
					dir.sort(self.compare);
					fi.sort(self.compare);
				}
				var a = o.fileFirst ? fi.concat(dir) : dir.concat(fi);
				if (o.curdir.getParent()) a.unshift(null);
				self.list.setAdapter(self.curadp = new SimpleListAdapter(a, self.vmaker, self.vbinder));
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			
			self.header = new G.LinearLayout(ctx);
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.header, "bar_float");
			
			self.back = new G.TextView(ctx);
			self.back.setText("< 返回");
			self.back.setGravity(G.Gravity.CENTER);
			self.back.setPadding(20 * G.dp, 0, 20 * G.dp, 0);
			Common.applyStyle(self.back, "button_highlight", 2);
			self.back.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.popup.dismiss();
				return true;
			} catch(e) {erp(e)}}}));
			self.header.addView(self.back, new G.LinearLayout.LayoutParams(-2, -1));
			
			self.title = new G.TextView(ctx);
			self.title.setPadding(0, 10 * G.dp, 0, 10 * G.dp);
			Common.applyStyle(self.title, "textview_default", 4);
			self.header.addView(self.title, new G.LinearLayout.LayoutParams(-2, -2));
			
			self.path = new G.TextView(ctx);
			self.path.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
			self.path.setPadding(15 * G.dp, 0, 5 * G.dp, 0);
			self.path.setSingleLine(true);
			self.path.setEllipsize(G.TextUtils.TruncateAt.START);
			Common.applyStyle(self.path, "textview_prompt", 2);
			self.path.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var o = self.sets;
				Common.showInputDialog({
					title : "路径",
					callback : function(s) {
						var f = new java.io.File(s);
						if (!f.exists()) {
							return Common.toast("路径不存在");
						}
						if (o.type == 0) {
							if (f.isDirectory()) {
								o.curdir = f;
							} else if (f.isFile()) {
								self.choose(f);
							} else return;
						} else if (o.type == 1 || o.type == 2) {
							o.curdir = f.isDirectory() ? f : f.getParentFile();
						}
						self.refresh();
					},
					singleLine : true,
					defaultValue : o.curdir.getAbsolutePath()
				});
				return true;
			} catch(e) {erp(e)}}}));
			self.header.addView(self.path, new G.LinearLayout.LayoutParams(0, -1, 1.0));
			
			self.newDir = new G.TextView(ctx);
			self.newDir.setText("📁+");
			self.newDir.setGravity(G.Gravity.CENTER);
			self.newDir.setPadding(20 * G.dp, 0, 20 * G.dp, 0);
			Common.applyStyle(self.newDir, "button_default", 2);
			self.newDir.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var a = {
					title : "新建文件夹",
					callback : function(s) {
						if (!s) {
							Common.toast("目录名不能为空哦～");
							return;
						} else {
							try {
								(new java.io.File(self.sets.curdir, s)).mkdirs();
								self.refresh();
							} catch (e) {
								Common.toast("创建目录出错\n" + e + ")");
							}
						}
					}
				}
				Common.showInputDialog(a);
				return true;
			} catch(e) {erp(e)}}}));
			self.header.addView(self.newDir, new G.LinearLayout.LayoutParams(-2, -1));
			self.linear.addView(self.header, new G.LinearLayout.LayoutParams(-1, -2));
			
			self.list = new G.ListView(ctx);
			Common.applyStyle(self.list, "message_bg");
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var o = self.sets;
				var e = self.curadp.getItem(pos);
				if (!e) {
					o.curdir = o.curdir.getParentFile();
				} else if (e.isDirectory()) {
					o.curdir = e;
				} else if (o.type == 0) {
					self.choose(e);
					return true;
				} else if (o.type == 1) {
					self.fname.setText(e.getName());
					return true;
				}
				self.refresh();
				return true;
			} catch(e) {erp(e)}}}));
			if (G.style == "Material") {
				self.list.setFastScrollEnabled(true);
				self.list.setFastScrollAlwaysVisible(false);
			}
			self.linear.addView(self.list, new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			
			self.inputbar = new G.LinearLayout(ctx);
			self.inputbar.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.inputbar, "bar_float");
			
			self.fname = new G.EditText(ctx);
			self.fname.setHint("文件名");
			self.fname.setSingleLine(true);
			self.fname.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
			self.fname.setInputType(G.InputType.TYPE_CLASS_TEXT);
			self.fname.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.fname, "edittext_default", 3);
			self.inputbar.addView(self.fname, new G.LinearLayout.LayoutParams(0, -1, 1.0));
			
			self.exit = new G.TextView(ctx);
			self.exit.setText("确定");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				var o = self.sets, e;
				if (o.type == 1) {
					if (!self.fname.getText().length()) {
						Common.toast("文件名不能为空哦～");
						return true;
					}
					var e = new java.io.File(o.curdir, self.fname.getText());
					if (!e.getParentFile().exists()) {
						e = new java.io.File(self.fname.getText());
						if (!e.getParentFile().exists()) {
							Common.toast("无效的文件名");
							return true;
						}
					}
					if (e.exists() && !e.isFile()) {
						Common.toast("同名目录已存在，无法保存");
						return true;
					}
					self.choose(e);
				} else if (o.type == 2) {
					self.choose(o.curdir);
				}
				return true;
			} catch(e) {erp(e)}}}));
			self.inputbar.addView(self.exit, new G.LinearLayout.LayoutParams(-2, -2));
			self.linear.addView(self.inputbar, new G.LinearLayout.LayoutParams(-1, -2));
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			if (o.onDismiss) o.onDismiss();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.sets = o;
		try {
			o.curdir = new java.io.File(String(o.initDir ? o.initDir : self.lastDir));
			if (!o.curdir.isDirectory()) o.curdir = android.os.Environment.getExternalStorageDirectory();
			self.refresh();
		} catch (e) {
			Common.toast("拒绝访问\n" + e + ")");
			return;
		}
		self.title.setText(String(o.title || "浏览"));
		switch (o.type) {
			case 1: //新建文件（保存）
			self.exit.setVisibility(G.View.VISIBLE);
			self.fname.setVisibility(G.View.VISIBLE);
			self.fname.setText(String(o.defaultFileName || ""));
			break;
			case 2: //选择目录（打开）
			self.exit.setVisibility(G.View.VISIBLE);
			self.fname.setVisibility(G.View.GONE);
			break;
			default:
			o.type = 0;
			case 0: //选择文件（打开）
			self.exit.setVisibility(G.View.GONE);
			self.fname.setVisibility(G.View.GONE);
		}
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showDebugDialog : function self(o) {G.ui(function() {try {
		if (!self.main) {
			self.history = [];
			self.cls = function() {
				self.prompt.setText("");
				self.ready();
			}
			self.print = function(str, span) {
				var t = new G.SpannableStringBuilder(self.prompt.getText());
				if (span) {
					appendSSB(t, str, span);
				} else {
					t.append(str);
				}
				self.prompt.setText(t);
				self.vscr.post(function() {try {
					self.vscr.fullScroll(G.View.FOCUS_DOWN);
				} catch(e) {erp(e)}});
			}
			self.ready = function() {
				self.print("\n>  ", new G.ForegroundColorSpan(Common.theme.highlightcolor));
			}
			self.exec = function(s) {
				self.history.unshift(s);
				self.print(s);
				self.print("\n");
				if (s.toLowerCase() == "exit") {
					self.popup.dismiss();
					return;
				} else if (s.toLowerCase() == "cls") {
					self.cls();
					return;
				} else if (s.toLowerCase() == "ls") {
					JSONEdit.traceGlobal();
				} else if (s.toLowerCase().startsWith("ls ")) {
					JSONEdit.trace(eval(s.slice(3)));
				} else if (s.toLowerCase().startsWith("cp ")) {
					try {
						var t = MapScript.toSource(eval.call(null, s.slice(3)));
						self.print(t);
						Common.setClipboardText(t);
					} catch(e) {
						self.print(e + "\n" + e.stack, new G.ForegroundColorSpan(Common.theme.criticalcolor));
						Common.setClipboardText(e + "\n" + e.stack);
					}
				} else if (s.toLowerCase().startsWith("sn ")) {
					var t;
					try {
						t = MapScript.toSource(eval.call(null, s.slice(3)));
						self.print(t);
					} catch(e) {
						self.print(t = e + "\n" + e.stack, new G.ForegroundColorSpan(Common.theme.criticalcolor));
					}
					var file = new java.io.File(ctx.getExternalCacheDir(), "sn.txt");
					var fs = new java.io.PrintWriter(new java.io.FileOutputStream(file));
					fs.println(t);
					fs.close();
					try {
						ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_SEND).setType("text/plain").putExtra(android.content.Intent.EXTRA_STREAM, android.net.Uri.fromFile(file)));
					} catch(e) {
						Common.toast("文件已生成于" + file.getAbsolutePath());
					}
				} else {
					try {
						var t = eval.call(null, s);
						self.print(typeof t == "string" ? t : MapScript.toSource(t));
					} catch(e) {
						self.print(e + "\n" + e.stack, new G.ForegroundColorSpan(Common.theme.criticalcolor));
					}
				}
				self.ready();
			}
			
			self.main = new G.LinearLayout(ctx);
			self.main.setOrientation(G.LinearLayout.VERTICAL);
			
			self.bar = new G.LinearLayout(ctx);
			self.bar.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.bar.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.bar, "bar_float");
			
			self.cmd = new G.EditText(ctx);
			self.cmd.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2, 1.0));
			self.cmd.setFocusableInTouchMode(true);
			self.cmd.setPadding(5 * G.dp, 10 * G.dp, 0, 10 * G.dp);
			self.cmd.setImeOptions(G.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
			Common.applyStyle(self.cmd, "edittext_default", 3);
			self.bar.addView(self.cmd);
			Common.postIME(self.cmd);
			
			self.eval = new G.TextView(ctx);
			self.eval.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			self.eval.setGravity(G.Gravity.CENTER);
			self.eval.setText(">");
			self.eval.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.eval, "button_reactive", 3);
			self.eval.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {try {
				switch (e.getAction()) {
					case e.ACTION_DOWN:
					Common.applyStyle(v, "button_reactive_pressed", 3);
					break;
					case e.ACTION_CANCEL:
					case e.ACTION_UP:
					Common.applyStyle(v, "button_reactive", 3);
				}
				return false;
			} catch(e) {return erp(e), true}}}));
			self.eval.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (!self.cmd.getText().length()) return true;
				self.exec(String(self.cmd.getText()));
				self.cmd.setText("");
				return true;
			} catch(e) {erp(e)}}}));
			self.bar.addView(self.eval);
			
			self.vscr = new G.ScrollView(ctx);
			self.vscr.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			Common.applyStyle(self.vscr, "message_bg");
			self.prompt = new G.TextView(ctx);
			self.prompt.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.prompt.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.prompt, "textview_default", 2);
			self.prompt.setOnLongClickListener(new G.View.OnLongClickListener({onLongClick : function(v) {try {
				Common.showListChooser(self.history, function(i) {
					self.cmd.setText(self.history[i]);
				}, true);
				return true;
			} catch(e) {return erp(e), true}}}));
			self.vscr.addView(self.prompt);
			
			self.main.addView(self.vscr);
			self.main.addView(self.bar);
			
			self.print("控制台 - 输入exit以退出", new G.StyleSpan(G.Typeface.BOLD));
			self.print("\n想接这坑的请联系我，联系方式在关于里面");
			self.ready();
			PWM.registerResetFlag(self, "main");
		}
		if (self.popup) self.popup.dismiss();
		self.popup = new G.PopupWindow(self.main, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showWebViewDialog : function(s) {G.ui(function() {try {
		var layout, wv, ws, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		wv = new G.WebView(ctx);
		wv.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1.0));
		if (s.url && s.code) {
			wv.loadDataWithBaseURL(String(s.url), String(s.code), s.mimeType ? String(s.mimeType) : null, null, null);
		} else if (s.code) {
			wv.loadData(String(s.code), s.mimeType ? String(s.mimeType) : null, null);
		} else if (s.url) {
			wv.loadUrl(String(s.url));
		} else {
			wv.loadUrl("about:blank");
		}
		ws = wv.getSettings();
		ws.setSupportZoom(true);
		ws.setJavaScriptEnabled(true);
		ws.setAllowFileAccess(true);
		ws.setAllowFileAccessFromFileURLs(true);
		ws.setAllowUniversalAccessFromFileURLs(true);
		ws.setSaveFormData(true);
		ws.setLoadWithOverviewMode(true);
		ws.setJavaScriptCanOpenWindowsAutomatically(true);
		ws.setLoadsImagesAutomatically(!CA.settings.noWebImage);
		ws.setAllowContentAccess(true);
		//ws.setBuiltInZoomControls(true);
		//ws.setUseWideViewPort(true);
		layout.addView(wv);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("关闭");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			popup.dismiss();
			return true;
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		popup = Common.showDialog(layout, -1, -1, function() {
			wv.destroy();
		});
	} catch(e) {erp(e)}})},
	
	fileCopy : function(src, dest) {
		const BUFFER_SIZE = 4096;
		var fi, fo, buf, hr;
		fi = new java.io.FileInputStream(src);
		fo = new java.io.FileOutputStream(dest);
		buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, BUFFER_SIZE);
		while ((hr = fi.read(buf)) > 0) fo.write(buf, 0, hr);
		fi.close();
		fo.close();
	},
	
	readFile : function(path, defaultValue, gzipped) {
		try{
			if (!(new java.io.File(path)).isFile()) return defaultValue;
			var rd, s = [], q;
			if (gzipped) {
				rd = new java.io.BufferedReader(new java.io.InputStreamReader(new java.util.zip.GZIPInputStream(new java.io.FileInputStream(path))));
			} else {
				rd = new java.io.BufferedReader(new java.io.FileReader(path));
			}
			while (q = rd.readLine()) s.push(q);
			rd.close();
			return s.join("\n");
		} catch(e) {
			return defaultValue;
		}
	},
	
	saveFile : function(path, text, gzipped) {
		var wr;
		var f = new java.io.File(path).getParentFile();
		if (f) f.mkdirs();
		if (gzipped) {
			wr = new java.util.zip.GZIPOutputStream(new java.io.FileOutputStream(path));
		} else {
			wr = new java.io.FileOutputStream(path);
		}
		wr.write(new java.lang.String(text).getBytes());
		wr.close();
	},
	
	getFileSize : function(f, showBytes) {
		var l = Number(f.length()), r;
		if (l < 1000) {
			r = l + " 字节";
		} else if (l >= 1000 && l < 1024000) {
			r = (l / 1024).toFixed(2) + " KB";
		} else if (l >= 1024000 && l < 1048576000) {
			r = (l / 1048576).toFixed(2) + " MB";
		} else {
			r = (l / 1073741824).toFixed(2) + " GB";
		}
		if (showBytes) r += " (" + l.toLocaleString() + " 字节)";
		return r;
	},
	
	traceStack : function() {
		var s = [], i;
		var ts = java.lang.Thread.getAllStackTraces();
		var it = ts.keySet().iterator();
		var ct, cts, ctid = java.lang.Thread.currentThread().getId();
		while (it.hasNext()) {
			ct = it.next();
			s.push((ctid == ct.getId() ? "<当前>" : "") + "线程" + ct.getId() + ":" + ct.getName() + " (优先级" + ct.getPriority() + (ct.isDaemon() ? "守护线程" : "") + ") - " + ct.getState().toString());
			cts = ts.get(ct);
			for (i in cts) {
				s.push(" at " + cts[i].toString());
			}
			s.push("");
		}
		return s.join("\n");
	},
	
	toast : function self(s, dur) {G.ui(function() {try {
		if (self.last) self.last.cancel();
		(self.last = G.Toast.makeText(ctx, String(s), dur ? 1 : 0)).show();
	} catch(e) {erp(e)}})},
	
	postIME : function(v, delay) {
		v.postDelayed(function() {try {
			v.requestFocus();
			ctx.getSystemService(ctx.INPUT_METHOD_SERVICE).showSoftInput(v, G.InputMethodManager.SHOW_IMPLICIT);
		} catch(e) {erp(e)}}, isNaN(delay) ? 0 : delay);
	},
	
	hideIME : function(v) {
		var imm = ctx.getSystemService(ctx.INPUT_METHOD_SERVICE);
		if (v) {
			imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
		} else {
			if (imm.isActive()) imm.toggleSoftInput(0, imm.HIDE_NOT_ALWAYS);
		}
	},
	
	hasClipboardText : function() {
		if (android.os.Build.VERSION.SDK_INT >= 11) {
			return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).hasPrimaryClip();
		} else {
			return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).hasText();
		}
	},
	getClipboardText : function() {
		if (android.os.Build.VERSION.SDK_INT >= 11) {
			var clip = ctx.getSystemService(ctx.CLIPBOARD_SERVICE).getPrimaryClip();
			if (!clip) return null;
			return clip.getItemAt(0).coerceToText(ctx);
		} else {
			return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).getText();
		}
	},
	setClipboardText : function(text) {
		if (android.os.Build.VERSION.SDK_INT >= 11) {
			return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).setPrimaryClip(android.content.ClipData.newPlainText("", text));
		} else {
			return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).setText(text);
		}
	},
	
	getScreenHeight : function() {
		return ctx.getResources().getDisplayMetrics().heightPixels;
	},
	getScreenWidth : function() {
		return ctx.getResources().getDisplayMetrics().widthPixels;
	},
	
	replaceSelection : function(s, text) {
		var start = G.Selection.getSelectionStart(s);
		var end = G.Selection.getSelectionEnd(s);
		var t;
		if (start > end) {
			t = start; start = end; end = t;
		}
		if (start < 0) return;
		s.replace(start, end, text);
	}
});

MapScript.loadModule("Plugins", {
	FEATURES : [
		"injectable",
		"observable"
	],
	modules : {},
	observers : {
		plugin : {
			inject : []
		},
		custom : {}
	},
	Plugin : {
		get : function() {
			return this.core;
		},
		observe : function(type, target, f) {
			this._parent.registerObserver(this.uuid, type, target, f);
		},
		unobserve : function(type, target, f) {
			this._parent.unregisterObserver(this.uuid, type, target, f);
		},
		feature : function() {
			for (i in arguments) {
				if (this._parent.FEATURES.indexOf(arguments[i]) < 0) throw new Error("Require Feature:" + arguments[i]);
			}
		}
	},
	inject : function(f) {
		var o = Object.create(this.Plugin);
		o._parent = this;
		try {
			o.core = typeof f == "function" ? f(o) : Object(f);
		} catch(e) {
			o.error = e;
		}
		this.fillInfo(o);
		if (o.uuid in this.modules) {
			return this.modules[o.uuid].info;
		} else {
			if (o.core.init) o.core.init(o);
			this.emit("plugin", "inject", o.uuid);
			return (this.modules[o.uuid] = o).info;
		}
	},
	fillInfo : function(o) {
		if (!o.core) o.core = {};
		if (!o.info) o.info = {};
		if (!o.name) o.name = o.core.name || "未知插件";
		if (!o.description) o.description = o.core.description || "";
		if (!o.author) o.author = o.core.author || "Anonymous";
		if (!o.uuid) o.uuid = o.core.uuid || (o.author + ":" + o.name);
		if (!Array.isArray(o.version)) o.version = o.core.version || [0];
		if (!Array.isArray(o.require)) o.require = o.core.require || [];
		if (!Array.isArray(o.menu)) o.menu = o.core.menu || [];
		if (o.error) {
			o.menu.unshift({
				text : "查看错误",
				onclick : function() {
					erp(o.error);
				}
			});
			o.name += "[出错]";
		}
		o.info = {
			name : o.name,
			description : o.description,
			author : o.author,
			uuid : o.uuid,
			version : o.version,
			require : o.require,
			menu : o.menu
		};
		if (!CA.settings.moduleSettings) CA.settings.moduleSettings = {};
		if (!CA.settings.moduleSettings[o.uuid]) CA.settings.moduleSettings[o.uuid] = {};
		o.settings = CA.settings.moduleSettings[o.uuid];
	},
	registerObserver : function(module, type, target, f) {
		var o = this.getObservers(type, target);
		o.push({
			module : module,
			observer : f
		});
	},
	unregisterObserver : function(module, type, target, f) {
		var i, o;
		if (f) {
			o = this.getObservers(type, target);
			for (i = o.length - 1; i >= 0; i--) {
				if (o[i].module == module && o[i].observer == f) {
					o.splice(i, 1);
				}
			}
		} else if (target) {
			o = this.getObservers(type, target);
			for (i = o.length - 1; i >= 0; i--) {
				if (o[i].module == module) o.splice(i, 1);
			}
		} else if (type) {
			o = this.observers[type];
			if (!o) throw new Error("Invalid event type: " + type);
			for (i in o) this.unregisterObserver(module, type, i);
		} else {
			o = this.observers;
			for (i in o) this.unregisterObserver(module, i);
		}
	},
	getObservers : function(type, target) {
		var o = this.observers;
		if (!(type in o)) throw new Error("Invalid event type: " + type);
		o = o[type];
		if (!o[target]) o[target] = [];
		return o[target];
	},
	emit : function(type, target) {
		var i, o = this.getObservers(type, target), t;
		for (i in o) {
			t = this.modules[o[i].module];
			try {
				o[i].apply(t, arguments);
			} catch(e) {
				try {
					if (t.onError instanceof Function) t.onError(e);
				} catch(e) {}
			}
		}
	}
});

MapScript.loadModule("appendSSB", function(src, str, span) { //#IMPORTANT# Fix Bug: SpannableStringBuilder.append(CharSequence text, Object what, int flags) can only run on Android 5.0+
	var c = src.length();
	src.append(str);
	src.setSpan(span, c, src.length(), src.SPAN_INCLUSIVE_EXCLUSIVE);
});

MapScript.loadModule("ES6Ex", { //Partically Supported ECMAScript 6
	onCreate : function() {
		if (!String.prototype.startsWith) String.prototype.startsWith = this.string_startsWith;
		if (!String.prototype.endsWith) String.prototype.endsWith = this.string_endsWith;
		if (!Object.copy) Object.copy = this.object_copy;
	},
	string_startsWith : function(s) {
		return this.slice(0, s.length) == s;
	},
	string_endsWith : function(s) {
		return this.slice(-s.length) == s;
	},
	object_copy : function(o) { //浅层对象复制
		var _copy = function copy(x, lev) {
			var p = "", r, i;
			if (lev < 0) return x;
			if (Array.isArray(x)) {
				r = x.slice();
				for (i = 0; i < x.length; i++) r[i] = copy(r[i], lev - 1);
				return r;
			} else if (x instanceof Date) {
				return new Date(x.getTime());
			} else if (x instanceof Object) {
				r = {};
				for (i in x) r[i] = copy(x[i]);
				return r;
			}
			return x;
		}
		return _copy(o, 32);
	}
});

MapScript.loadModule("FCString", {
	BEGIN : "§",
	COLOR : {
		"0" : Common.rgbInt(0, 0, 0),
		"1" : Common.rgbInt(0, 0, 170),
		"2" : Common.rgbInt(0, 170, 0),
		"3" : Common.rgbInt(0, 170, 170),
		"4" : Common.rgbInt(170, 0, 0),
		"5" : Common.rgbInt(170, 0, 170),
		"6" : Common.rgbInt(255, 170, 0),
		"7" : Common.rgbInt(170, 170, 170),
		"8" : Common.rgbInt(85, 85, 85),
		"9" : Common.rgbInt(85, 85, 255),
		"a" : Common.rgbInt(85, 255, 85),
		"b" : Common.rgbInt(85, 255, 255),
		"c" : Common.rgbInt(255, 85, 85),
		"d" : Common.rgbInt(255, 85, 255),
		"e" : Common.rgbInt(255, 255, 85),
		"f" : Common.rgbInt(255, 255, 255)
	},
	BOLD : "l",
	STRIKETHROUGH : "m",
	UNDERLINE : "n",
	ITALIC : "o",
	RANDOMCHAR : "k",
	RESET : "r",
	parseFC : function self(s) {
		if (!self.tokenize) {
			self.tokenize = function(o, s) {
				var c, i, f = false;
				for (i = 0; i < s.length; i++) {
					c = s.slice(i, i + 1);
					if (f) {
						if (c in FCString.COLOR) {
							self.reset(o);
							self.startColor(o, c);
						} else if (c in o.style) {
							self.startStyle(o, c);
						} else if (c == FCString.RESET) {
							self.reset(o);
						} else if (c == FCString.BEGIN) {
							o.result.push(FCString.BEGIN);
							o.index += 1;
						} else {
							o.result.push(FCString.BEGIN, c);
							o.index += 2;
						}
						f = false;
					} else if (c == FCString.BEGIN){
						f = true;
					} else {
						o.result.push(c);
						o.index += 1;
					}
				}
				self.reset(o);
				if (f) o.result.push(FCString.BEGIN);
			}
			self.startColor = function(o, char) {
				if (!isNaN(o.color)) self.endColor(o);
				o.color = FCString.COLOR[char];
				o.colorStart = o.index;
			}
			self.endColor = function(o) {
				if (isNaN(o.color)) return;
				o.spans.push({
					span : new G.ForegroundColorSpan(o.color),
					start : o.colorStart,
					end : o.index
				});
				o.color = NaN;
			}
			self.startStyle = function(o, char) {
				if (!isNaN(o.style[char])) self.endStyle(o, char);
				o.style[char] = o.index;
			}
			self.endStyle = function(o, char) {
				if (isNaN(o.style[char])) return;
				o.spans.push({
					span : self.buildStyleSpan(char),
					start : o.style[char],
					end : o.index
				});
				o.style[char] = NaN;
			}
			self.reset = function(o) {
				var char;
				for (char in o.style) self.endStyle(o, char);
				self.endColor(o);
			}
			self.buildStyleSpan = function(ch) {
				switch (ch) {
					case FCString.BOLD:
					return new G.StyleSpan(G.Typeface.BOLD);
					case FCString.STRIKETHROUGH:
					return new G.StrikethroughSpan();
					case FCString.UNDERLINE:
					return new G.UnderlineSpan();
					case FCString.ITALIC:
					return new G.StyleSpan(G.Typeface.ITALIC);
					case FCString.RANDOMCHAR:
					return new G.StyleSpan(0); //Unknown
				}
			}
		}
		var o = {
			color : NaN,
			colorStart : 0,
			style : {},
			spans : [],
			result : [],
			index : 0
		};
		o.style[this.BOLD] = NaN;
		o.style[this.STRIKETHROUGH] = NaN;
		o.style[this.UNDERLINE] = NaN;
		o.style[this.ITALIC] = NaN;
		o.style[this.RANDOMCHAR] = NaN;
		self.tokenize(o, String(s));
		var r = new G.SpannableString(o.result.join(""));
		o.spans.forEach(function(e) {
			r.setSpan(e.span, e.start, e.end, G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
		});
		return r;
	},
	colorFC : function self(ss, defaultcolor) {
		if (!self.tokenize) {
			self.tokenize = function(o, s) {
				var c, i, f = false;
				for (i = 0; i < s.length; o.index = ++i) {
					c = s.slice(i, i + 1);
					if (f) {
						if (c in FCString.COLOR) {
							o.index--;
							self.reset(o);
							self.startColor(o, c);
							self.colorTag(o, 2);
						} else if (c in o.style) {
							o.index--;
							self.startStyle(o, c);
							self.colorTag(o, 2);
						} else if (c == FCString.RESET) {
							o.index--;
							self.reset(o);
							self.colorTag(o, 2);
						} else if (c == FCString.BEGIN) {
							o.index--;
							self.colorTag(o, 1);
						}
						f = false;
					} else if (c == FCString.BEGIN){
						f = true;
					}
				}
				if (f) {
					o.index--;
					self.colorTag(o, 1);
					o.index++;
				}
				self.reset(o);
			}
			self.startColor = function(o, char) {
				if (!isNaN(o.color)) self.endColor(o);
				o.color = FCString.COLOR[char];
				o.colorStart = o.index;
			}
			self.endColor = function(o) {
				if (isNaN(o.color)) return;
				o.spans.push({
					span : new G.ForegroundColorSpan(o.color),
					start : o.colorStart,
					end : o.index
				});
				o.color = NaN;
			}
			self.startStyle = function(o, char) {
				if (!isNaN(o.style[char])) self.endStyle(o, char);
				o.style[char] = o.index;
			}
			self.endStyle = function(o, char) {
				if (isNaN(o.style[char])) return;
				o.spans.push({
					span : self.buildStyleSpan(char),
					start : o.style[char],
					end : o.index
				});
				o.style[char] = NaN;
			}
			self.reset = function(o) {
				var char;
				for (char in o.style) self.endStyle(o, char);
				self.endColor(o);
			}
			self.colorTag = function(o, len) {
				if (!isNaN(o.color)) {
					if (o.colorStart < o.index) {
						o.spans.push({
							span : new G.ForegroundColorSpan(o.color),
							start : o.colorStart,
							end : o.index
						});
					}
					o.colorStart = o.index + len;
				}
				o.spans.push({
					span : new G.ForegroundColorSpan(Common.setAlpha(isNaN(o.color) ? o.defaultcolor : o.color, 0x80)),
					start : o.index,
					end : o.index + len
				});
			}
			self.buildStyleSpan = function(ch) {
				switch (ch) {
					case FCString.BOLD:
					return new G.StyleSpan(G.Typeface.BOLD);
					case FCString.STRIKETHROUGH:
					return new G.StrikethroughSpan();
					case FCString.UNDERLINE:
					return new G.UnderlineSpan();
					case FCString.ITALIC:
					return new G.StyleSpan(G.Typeface.ITALIC);
					case FCString.RANDOMCHAR:
					return new G.StyleSpan(0); //Unknown
				}
			}
		}
		var o = {
			defaultcolor : defaultcolor,
			color : NaN,
			colorStart : 0,
			style : {},
			spans : [],
			index : 0
		};
		o.style[this.BOLD] = NaN;
		o.style[this.STRIKETHROUGH] = NaN;
		o.style[this.UNDERLINE] = NaN;
		o.style[this.ITALIC] = NaN;
		o.style[this.RANDOMCHAR] = NaN;
		self.tokenize(o, String(ss));
		o.spans.forEach(function(e) {
			ss.setSpan(e.span, e.start, e.end, G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
		});
	},
	clearSpans : function(ss) {
		[
			G.ForegroundColorSpan,
			G.StyleSpan,
			G.StrikethroughSpan,
			G.UnderlineSpan
		].forEach(function(e) {
			var i, a = ss.getSpans(0, ss.length(), e);
			for (i in a) ss.removeSpan(a[i]);
		});
	}
});

MapScript.loadModule("Tutorial", {
	library : [],
	showList : function self(callback) {G.ui(function() {try {
		if (!self.linear) {
			self.adapter = function(e, i, a) {
				var layout = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.VERTICAL);
				layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				text1.setText(e.title);
				text1.setEllipsize(G.TextUtils.TruncateAt.MIDDLE);
				text1.setSingleLine(true);
				Common.applyStyle(text1, e.state == 2 ? "item_disabled" : "item_default", 3);
				layout.addView(text1);
				if (e.description) {
					text2.setPadding(0, 5 * G.dp, 0, 0);
					text2.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
					text2.setText(e.description);
					Common.applyStyle(text2, "textview_prompt", 1);
					layout.addView(text2);
				}
				return layout;
			}
			self.refresh = function() {
				var i, e, t;
				var data = Tutorial.getSettings();
				var a = {}, states = [[], [], []];
				Tutorial.library.forEach(function(e, i) {
					a[e.id] = {
						index : i,
						type : e.type,
						name : e.name,
						description : e.description,
						segmentLen : e.segments.length,
						progress : data[e.id] ? data[e.id].progress : -1,
						source : e
					}
				});
				Object.keys(a).forEach(function(i) {
					if (a[i].progress >= a[i].segmentLen) {
						a[i].title = a[i].name;
						states[a[i].state = 2].push(a[i]);
					} else if (a[i].progress >= 0) {
						a[i].title = a[i].name + " （" + ((a[i].progress + 1) / a[i].segmentLen * 100).toFixed(0) + "%）";
						states[a[i].state = 0].push(a[i]);
					} else {
						a[i].title = a[i].name + " *";
						states[a[i].state = 1].push(a[i]);
					}
				});
				self.title.setText("教程 (进行中:" + states[0].length + "|未读:" + states[1].length + "|已读:" + states[2].length + ")");
				self.list.setAdapter(new RhinoListAdapter(states[0].concat(states[1], states[2]), self.adapter));
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.VERTICAL);
			self.linear.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
			Common.applyStyle(self.linear, "message_bg");
			self.title = new G.TextView(ctx);
			self.title.setText("教程");
			self.title.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
			self.title.setPadding(10 * G.dp, 0, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.title, "textview_default", 4);
			self.linear.addView(self.title, new G.LinearLayout.LayoutParams(-1, -2));
			self.list = new G.ListView(ctx);
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var data = parent.getAdapter().getItem(pos);
				Tutorial.showIntro(data.source, function() {
					self.refresh();
				});
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.list, new G.LinearLayout.LayoutParams(-1, 0, 1.0));
			self.exit = new G.TextView(ctx);
			self.exit.setText("关闭");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.popup.dismiss();
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.exit, new G.LinearLayout.LayoutParams(-1, -2));
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.linear, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NOT_NEEDED);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			CA.trySave();
			if (callback) callback();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.refresh();
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	showIntro : function(o, callback) {G.ui(function() {try {
		var linear, title, scr, desc, enter, popup;
		linear = new G.LinearLayout(ctx);
		linear.setOrientation(G.LinearLayout.VERTICAL);
		linear.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
		Common.applyStyle(linear, "message_bg");
		title = new G.TextView(ctx);
		title.setText(o.name);
		title.setPadding(0, 0, 0, 10 * G.dp);
		Common.applyStyle(title, "textview_default", 4);
		linear.addView(title, new G.LinearLayout.LayoutParams(-1, -2));
		scr = new G.ScrollView(ctx);
		desc = new G.TextView(ctx);
		desc.setText(ISegment.rawJson(o.intro || o.description || "暂无简介"));
		Common.applyStyle(desc, "textview_default", 3);
		scr.addView(desc, new G.FrameLayout.LayoutParams(-1, -2));
		linear.addView(scr, new G.LinearLayout.LayoutParams(-1, 0, 1));
		enter = new G.TextView(ctx);
		enter.setText("进入");
		enter.setGravity(G.Gravity.RIGHT);
		enter.setPadding(0, 10 * G.dp, 20 * G.dp, 20 * G.dp);
		Common.applyStyle(enter, "button_critical", 3);
		enter.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			popup.dismiss();
			if (o.type == "tutorial") {
				Tutorial.showTutorial(o, callback);
			} // more: exam article
		} catch(e) {erp(e)}}}));
		linear.addView(enter, new G.LinearLayout.LayoutParams(-1, -2));
		popup = Common.showDialog(linear, -1, -1);
	} catch(e) {erp(e)}})},
	
	showTutorial : function self(o, callback) {G.ui(function() {try {
		if (!self.linear) {
			self.adapter = function(e, i, a) {
				return e.view;
			}
			self.init = function(o) {
				var i, a, adapter, r = [{
					type : "title",
					view : self.linear
				}];
				self.current = o;
				self.sets = Tutorial.getSettings(String(o.id));
				self.title.setText(o.name);
				if (isNaN(self.sets.progress)) self.sets.progress = 0;
				if (!self.sets.varmap) self.sets.varmap = {};
				a = o.segments;
				for (i = 0; i < self.sets.progress && i < a.length; i++) {
					r.push(self.convertView(a[i], self.sets));
				}
				adapter = new RhinoListAdapter(r, self.adapter);
				self.list.setAdapter(adapter);
				self.adpt = RhinoListAdapter.getController(adapter);
				self.next();
			}
			self.next = function() {
				var i, a = self.current.segments, t, f;
				for (i = self.sets.progress; i < a.length; i++) {
					t = a[i];
					self.adpt.add(self.convertView(t, self.sets));
					switch (t.stepMode) {
						case "manual":
						f = true;
						self.adpt.add({
							type : "step.manual",
							view : self.generateText("点击进入下一步", false)
						});
						case "auto":
						default:
						break;
					}
					if (f) break;
				}
				self.sets.progress = i;
				if (i == a.length) {
					self.adpt.add({
						type : "ending",
						view : self.generateText(self.current.name + "已结束，点击以退出", false)
					});
				}
				//self.list.setSelectionFromTop(self.adpt.length() - 1, 0);
				self.list.smoothScrollToPosition(self.adpt.length() - 1);
			}
			self.convertView = function(e, sets) {
				var t;
				if (e.text) {
					t = ISegment.rawJson(e.text, sets.varmap);
					return {
						type : "text",
						text : t,
						view : self.generateText(t, true)
					};
				} else if (e.command) {
					return {
						type : "command",
						command : e.command,
						view : self.generateCopyable(ISegment.rawJson({command : e.command}, null))
					};
				}
				return {
					type : "unknown",
					view : self.generateText("未知的片段&")
				};
			}
			self.generateText = function(str, focusable) {
				var text = new G.TextView(ctx);
				text.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
				text.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				text.setText(str);
				text.setFocusable(focusable);
				Common.applyStyle(text, "textview_default", 3);
				return text;
			}
			self.generateCopyable = function(str) {
				var layout = new G.LinearLayout(ctx),
					text1 = new G.TextView(ctx),
					text2 = new G.TextView(ctx);
				layout.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
				layout.setOrientation(G.LinearLayout.HORIZONTAL);
				text1.setPadding(15 * G.dp, 15 * G.dp, 0, 15 * G.dp);
				text1.setLayoutParams(new G.LinearLayout.LayoutParams(0, -2, 1.0));
				text1.setText(str);
				Common.applyStyle(text1, "textview_default", 3);
				layout.addView(text1);
				text2.setPadding(15 * G.dp, 0, 15 * G.dp, 0);
				text2.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
				text2.setText("📋");
				text2.setGravity(G.Gravity.CENTER);
				Common.applyStyle(text2, "button_default", 3);
				layout.addView(text2);
				return layout;
			}
			self.linear = new G.LinearLayout(ctx);
			self.linear.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.linear, "bar_float");
			self.linear.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
			self.title = new G.TextView(ctx);
			self.title.setPadding(20 * G.dp, 20 * G.dp, 0, 20 * G.dp);
			Common.applyStyle(self.title, "textview_default", 4);
			self.linear.addView(self.title, new G.LinearLayout.LayoutParams(0, -1, 1.0));
			self.exit = new G.TextView(ctx);
			self.exit.setText("关闭");
			self.exit.setGravity(G.Gravity.CENTER);
			self.exit.setPadding(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
			Common.applyStyle(self.exit, "button_critical", 3);
			self.exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				if (self.popup) self.popup.dismiss();
				//BUG: View显示卡顿，导致可以在dismissed的状态下点击按钮
			} catch(e) {erp(e)}}}));
			self.linear.addView(self.exit, new G.LinearLayout.LayoutParams(-2, -1));
			self.list = new G.ListView(ctx);
			Common.applyStyle(self.list, "message_bg");
			self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				var e = parent.getAdapter().getItem(pos);
				if (!e) return;
				switch (e.type) {
					case "command":
					Common.setClipboardText(e.command);
					Common.toast("内容已复制");
					break;
					case "step.manual":
					self.sets.progress++;
					self.adpt.removeByIndex(pos);
					self.next();
					break;
					case "ending":
					self.popup.dismiss();
					break;
				}
			} catch(e) {erp(e)}}}));
			
			PWM.registerResetFlag(self, "linear");
		}
		if (self.popup) self.popup.dismiss();
		Common.initEnterAnimation(self.linear);
		self.popup = new G.PopupWindow(self.list, -1, -1);
		if (CA.supportFloat) self.popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		self.popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		self.popup.setFocusable(true);
		self.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NOT_NEEDED);
		self.popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			CA.trySave();
			if (callback) callback();
			self.popup = null;
		} catch(e) {erp(e)}}}));
		self.init(o);
		self.popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(self.popup);
	} catch(e) {erp(e)}})},
	
	getSettings : function(id) {
		if (!CA.settings.tutorialData) {
			CA.settings.tutorialData = {};
		}
		if (id) {
			if (!CA.settings.tutorialData[id]) {
				CA.settings.tutorialData[id] = {};
			}
			return CA.settings.tutorialData[id];
		} else {
			return CA.settings.tutorialData;
		}
	}
});

MapScript.loadModule("RhinoListAdapter", (function() {
	var r = function(arr, vmaker, params, preload) {
		//arr是列表数组，vmaker(element, index, array, params)从item生成指定view
		var src = arr.slice(), views = new Array(arr.length), dso = [], controller;
		if (preload) {
			src.forEach(function(e, i, a) {
				views[i] = vmaker(e, i, a, params);
			});
		}
		controller = new RhinoListAdapter.Controller(src, views, dso, vmaker, params, preload);
		return new G.ListAdapter({
			getCount : function() {
				return src.length;
			},
			getItem : function(pos) {
				if (pos == -1) return controller;
				return src[pos];
			},
			getItemId : function(pos) {
				return pos;
			},
			getItemViewType : function(pos) {
				return 0;
			},
			getView : function(pos, convert, parent) {
				try {
					return views[pos] ? views[pos] : (views[pos] = vmaker(src[pos], parseInt(pos), src, params));
				} catch(e) {
					var a = new G.TextView(ctx);
					a.setText(e + "\n" + e.stack);
					erp(e);
					return a;
				}
			},
			getViewTypeCount : function() {
				return 1;
			},
			hasStableIds : function() {
				return true;
			},
			isEmpty : function() {
				return src.length === 0;
			},
			areAllItemsEnabled : function() {
				return true;
			},
			isEnabled : function(pos) {
				return pos >= 0 && pos < src.length;
			},
			registerDataSetObserver : function(p) {
				if (dso.indexOf(p) >= 0) return;
				dso.push(p);
			},
			unregisterDataSetObserver : function(p) {
				var i = dso.indexOf(p);
				if (p >= 0) dso.splice(i, 1);
			}
		});
	}
	r.Controller = function(src, views, dso, vmaker, params, preload) {
		this.src = src;
		this.views = views;
		this.dso = dso;
		this.vmaker = vmaker;
		this.params = params;
		this.preload = preload;
	}
	r.Controller.prototype = {
		notifyChange : function() {
			this.dso.forEach(function(e) {
				if (e) e.onChanged();
			});
		},
		notifyInvalidate : function() {
			this.dso.forEach(function(e) {
				if (e) e.onInvalidated();
			});
		},
		add : function(e) {
			this.src.push(e);
			if (this.preload) this.views.push(this.vmaker(e, this.src.length - 1, this.src, this.params));
			this.notifyChange();
		},
		concat : function(arr) {
			arr.forEach(function(e) {
				this.src.push(e)
				if (this.preload) this.views.push(this.vmaker(e, this.src.length - 1, this.src, this.params));
			}, this);
			this.notifyChange();
		},
		filter : function(f, thisArg) {
			var i;
			for (i = 0; i < this.src.length; i++) {
				if (!f.call(thisArg, this.src[i], i, this.src)) {
					this.src.splice(i, 1);
					this.views.splice(i, 1);
					i--;
				}
			}
			this.notifyChange();
		},
		forEach : function(f, thisArg) {
			var i;
			for (i in this.src) {
				if (f.call(thisArg, this.src[i], i, this.src)) {
					this.views[i] = this.vmaker(this.src[i], i, this.src, this.params);
				}
			}
			this.notifyChange();
		},
		get : function(i) {
			return this.src[i];
		},
		insert : function(e, i, respawn) {
			this.src.splice(i, 0, e);
			if (respawn) {
				this.respawnAll();
			} else {
				this.views.splice(i, 0, this.preload ? this.vmaker(e, i, this.src, this.params) : null);
			}
			this.notifyChange();
		},
		length : function() {
			return this.src.length;
		},
		remove : function(e, respawn) {
			var i;
			for (i = this.src.length; i >= 0; i--) {
				if (this.src[i] != e) continue;
				this.src.splice(i, 1);
				this.views.splice(i, 1);
			}
			if (respawn) this.respawnAll();
			this.notifyChange();
		},
		removeByIndex : function(i, respawn) {
			this.src.splice(i, 1);
			this.views.splice(i, 1);
			if (respawn) this.respawnAll();
			this.notifyChange();
		},
		replace : function(e, i) {
			this.src[i] = e;
			this.views[i] = this.preload ? this.vmaker(e, i, this.src, this.params) : null;
			this.notifyChange();
		},
		respawn : function(i) {
			this.views[i] = this.vmaker(this.src[i], i, this.src, this.params);
			this.notifyChange();
		},
		respawnAll : function(i) {
			this.src.forEach(function(e, i, a) {
				this.views[i] = this.vmaker(e, i, a, this.params);
			}, this);
			this.notifyChange();
		},
		slice : function(start, end) {
			return Array.prototype.slice.apply(this.src, arguments);
		},
		splice : function(index, len) {
			var i, z = [];
			for (i in arguments) z.push(arguments[i]);
			var r = Array.prototype.splice.apply(this.src, z);
			for (i = 2; i < z.length; i++) {
				z[i] = this.preload ? this.vmaker(z[i], i - 2 + index, this.src, this.params) : null;
			}
			Array.prototype.splice.apply(this.views, z);
			this.notifyChange();
		},
		getArray : function() {
			return this.src.slice();
		},
		setArray : function(a) {
			this.views.length = this.src.length = 0;
			for (i in a) this.src.push(a[i]);
			this.views.length = this.src.length;
			if (this.preload) {
				this.respawnAll();
			} else {
				this.notifyChange();
			}
		}
	}
	r.getController = function(adapter) {
		var r = adapter.getItem(-1);
		r.self = adapter;
		return r;
	}
	return r;
})());

MapScript.loadModule("FilterListAdapter", (function() {
	var r = function(wrap) {
		this._wrap = wrap;
		this._dso = [];
		this._pos = [];
		try {
			new java.lang.Runnable({run : function() { //防止直接从InterfaceAdapter抛出
				var self = this;
				wrap.registerDataSetObserver(new JavaAdapter(android.database.DataSetObserver, {
					onChanged : function() {
						self.requestFilter();
					}
				}));
			}}).run();
		} catch(e) {}
	}
	r.prototype = {
		build : function() {
			if (this.buildAdapter) return this.buildAdapter;
			var self = this;
			return this.buildAdapter = new G.ListAdapter({
				getCount : function() {
					return self._filter ? self._pos.length : self._wrap.getCount();
				},
				getItem : function(pos) {
					return self._wrap.getItem(self.getRealPosition(pos));
				},
				getItemId : function(pos) {
					return self._wrap.getItemId(self.getRealPosition(pos));
				},
				getItemViewType : function(pos) {
					return self._wrap.getItemViewType(self.getRealPosition(pos));
				},
				getView : function(pos, convert, parent) {
					return self._wrap.getView(self.getRealPosition(pos), convert, parent);
				},
				getViewTypeCount : function() {
					return self._wrap.getViewTypeCount();
				},
				hasStableIds : function() {
					return self._wrap.hasStableIds();
				},
				isEmpty : function() {
					return self._filter ? self._pos.length === 0 : self._wrap.isEmpty();
				},
				areAllItemsEnabled : function() {
					return self._wrap.areAllItemsEnabled();
				},
				isEnabled : function(pos) {
					return self._wrap.isEnabled(self.getRealPosition(pos));
				},
				registerDataSetObserver : function(p) {
					self._wrap.registerDataSetObserver(p);
					if (self._dso.indexOf(p) >= 0) return;
					self._dso.push(p);
				},
				unregisterDataSetObserver : function(p) {
					self._wrap.unregisterDataSetObserver(p);
					var i = self._dso.indexOf(p);
					if (p >= 0) self._dso.splice(i, 1);
				}
			});
		},
		setFilter : function(f) {
			this._filter = f;
			this.requestFilter();
		},
		clearFilter : function() {
			this.setFilter(null);
		},
		hasFilter : function() {
			return this._filter != null;
		},
		requestFilter : function() {
			if (this._filter != null) {
				var i, n = this._wrap.getCount();
				this._pos.length = 0;
				for (i = 0; i < n; i++) {
					if (this._filter(this._wrap.getItem(i), i)) this._pos.push(i);
				}
			}
			this.notifyDataSetChanged();
		},
		getRealPosition : function(pos) {
			return this._filter ? this._pos[pos] : pos;
		},
		notifyDataSetChanged : function() {
			var i;
			for (i in this._dso) {
				this._dso[i].onChanged();
			}
		}
	}
	return r;
})());

MapScript.loadModule("SimpleListAdapter", (function() {
	var r = function(arr, maker, binder, params) {
		//arr是列表数组，maker(holder, params)生成基础view，binder(holder, element, index, array, params)修改view使其实现指定的界面
		var src = arr.slice(), holders = [], dso = [], controller;
		controller = new SimpleListAdapter.Controller(src, holders, dso, maker, binder, params);
		return new G.ListAdapter({
			getCount : function() {
				return src.length;
			},
			getItem : function(pos) {
				if (pos == -1) return controller;
				return src[pos];
			},
			getItemId : function(pos) {
				return pos;
			},
			getItemViewType : function(pos) {
				return 0;
			},
			getView : function(pos, convert, parent) {
				var holder;
				try {
					if (!convert || !(convert.getTag() in holders)) {
						holder = {};
						convert = maker(holder, params);
						holder.self = convert;
						convert.setTag(holders.length.toString());
						holders.push(holder);
					}
					holder = holders[convert.getTag()];
					holder.pos = parseInt(pos);
					binder(holder, src[pos], parseInt(pos), src, params);
					return convert;
				} catch(e) {
					var a = new G.TextView(ctx);
					a.setText(e + "\n" + e.stack);
					erp(e);
					return a;
				}
			},
			getViewTypeCount : function() {
				return 1;
			},
			hasStableIds : function() {
				return true;
			},
			isEmpty : function() {
				return src.length === 0;
			},
			areAllItemsEnabled : function() {
				return true;
			},
			isEnabled : function(pos) {
				return pos >= 0 && pos < src.length;
			},
			registerDataSetObserver : function(p) {
				if (dso.indexOf(p) >= 0) return;
				dso.push(p);
			},
			unregisterDataSetObserver : function(p) {
				var i = dso.indexOf(p);
				if (p >= 0) dso.splice(i, 1);
			}
		});
	}
	r.Controller = function(array, holders, dso, maker, binder, params) {
		this.array = array;
		this.holders = holders;
		this.dso = dso;
		this.maker = maker;
		this.binder = binder;
		this.params = params;
	}
	r.Controller.prototype = {
		clearHolder : function() {
			var i;
			for (i in this.holders) {
				this.holders[i].self.setTag("");
			}
			this.holders.length = 0;
			this.notifyChange();
		},
		getHolder : function(view) { 
			return this.holders[view.getTag()];
		},
		notifyChange : function() {
			this.dso.forEach(function(e) {
				if (e) e.onChanged();
			});
		},
		notifyInvalidate : function() {
			this.dso.forEach(function(e) {
				if (e) e.onInvalidated();
			});
		},
		rebind : function(pos) {
			var i;
			for (i in this.holders) {
				if (this.holders[i].pos == pos) {
					this.binder(this.holders[i], this.array[pos], parseInt(pos), this.array, this.params);
				}
			}
		},
		setArray : function(a) {
			this.array.length = 0;
			for (i in a) this.array.push(a[i]);
			this.notifyChange();
		}
	}
	r.getController = function(adapter) {
		var r = adapter.getItem(-1);
		r.self = adapter;
		return r;
	}
	return r;
})());

MapScript.loadModule("Updater", {
	queryPage : function(url) {
		var url = new java.net.URL(url);
		var conn = url.openConnection();
		conn.setConnectTimeout(5000);
		conn.setUseCaches(false);
		conn.setRequestMethod("GET");
		conn.connect();
		var rd = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
		var s = [], ln, r;
		while (ln = rd.readLine()) s.push(ln);
		rd.close();
		return s.join("\n");
	},
	download : function(url, path) {
		const BUFFER_SIZE = 4096;
		var url = new java.net.URL(url);
		var conn = url.openConnection();
		conn.setConnectTimeout(5000);
		conn.setUseCaches(false);
		conn.setRequestMethod("GET");
		conn.connect();
		var is, os, buf, hr;
		is = conn.getInputStream();
		os = new java.io.FileOutputStream(path);
		buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, BUFFER_SIZE);
		while ((hr = is.read(buf)) > 0) os.write(buf, 0, hr);
		os.close();
	},
	toChineseDate : function(d) {
		return new java.text.SimpleDateFormat("yyyy'年'MM'月'dd'日' HH:mm").format(new java.util.Date(d));
	},
	toAnchor : function(title, url) {
		return '<a href="' + url + '">' + title + '</a>';
	},
	getUpdateInfo : function(callback, silently) {
		var r;
		try {
			if (this.lastcheck) {
				r = this.lastcheck;
			} else {
				this.lastcheck = r = JSON.parse(this.queryPage(this.url));
			}
			callback(Date.parse(CA.publishDate) < Date.parse(r.version), r.version, r);
		} catch(e) {
			if (!silently) return Common.toast("检测更新失败，请检查网络连接\n(" + e + ")");
		}
	},
	getVersionInfo : function() {
		if (this.checking) return "正在检查版本……";
		if (!this.latest) return "版本：" + CA.publishDate;
		if (Date.parse(CA.publishDate) < Date.parse(this.latest)) {
			return "更新：" + CA.publishDate + " -> " + this.latest;
		} else if (Date.parse(CA.publishDate) == Date.parse(this.latest)) {
			return "您使用的是最新版本";
		} else {
			return "Beta版本：" + CA.publishDate;
		}
	},
	checkUpdate : function(callback, silently) {
		if (this.checking) {
			Common.toast("正在检查更新中，请稍候");
			return false;
		}
		this.checking = true;
		if (callback) callback();
		var thread = new java.lang.Thread(new java.lang.Runnable({run : function() {try {
			Updater.getUpdateInfo(function(flag, date, info) {
				if (flag) {
					Common.showTextDialog(G.Html.fromHtml([
						"<b>命令助手更新啦！</b><br />",
						"<b>最新版本：" + info.version + "</b>\t(" + info.belongs + ")",
						"发布时间：" + Updater.toChineseDate(info.time),
						"<br /><b>下载地址：</b><br />" + Object.keys(info.downloads).map(function(e) {
							return Updater.toAnchor("★" + e, info.downloads[e]);
						}).join("<br />"),
						"<br />最近更新内容：",
						info.info.replace(/\n/g, "<br />")
					].join("<br />")));
				} else if (!silently) {
					Common.toast("当前已经是最新版本：" + date);
				}
				Updater.latest = date;
			}, silently);
			if (callback) callback();
			Updater.checking = false;
		} catch(e) {erp(e)}}}));
		thread.start();
	},
	showNewVersionInfo : function(oldVer) {
		this.checking = true;
		var thread = new java.lang.Thread(new java.lang.Runnable({run : function() {try {
			Updater.getUpdateInfo(function(flag, date, info) {
				if (Date.parse(CA.publishDate) <= Date.parse(date)) {
					Common.showTextDialog(G.Html.fromHtml([
						"<b>命令助手已更新！</b>",
						"<b>" + oldVer + " -> " + info.version + "</b>\t(" + info.belongs + ")",
						"发布时间：" + Updater.toChineseDate(info.time),
						"<br />最近更新内容：",
						info.info.replace(/\n/g, "<br />")
					].join("<br />")));
				} else {
					Common.showTextDialog(G.Html.fromHtml([
						"<b>欢迎使用命令助手 公测版本</b>",
						"<b>" + oldVer + " -> " + CA.publishDate + "</b>\t(" + CA.version + ")",
						"公测版容易出现bug。如果出现bug，欢迎加入命令助手讨论区向我反馈。",
						"MCPE命令助手讨论区：" + Updater.toAnchor("207913610", "https://jq.qq.com/?_wv=1027&k=46Yl84D")
					].join("<br />")));
				}
				Updater.latest = date;
			}, true);
			Updater.checking = false;
		} catch(e) {erp(e)}}}));
		thread.start();
	},
	isConnected : function() {
		var cm = ctx.getSystemService(ctx.CONNECTIVITY_SERVICE);
		var an = cm.getActiveNetworkInfo();
		if (an && an.isConnected()) {
			return true;
		} else {
			return false;
		}
	},
	initialize : function() {
		if (Math.random() > 0.8 && this.isConnected() && !(CA.settings.nextCheckUpdate < Date.now())) {
			this.checkUpdate(function() {
				CA.settings.nextCheckUpdate = Date.now() + 7 * 24 * 3600;
			}, true);
		}
	},
	latest : null,
	lastcheck : null,
	checking : false,
	url : "http://git.oschina.net/projectxero/ca/raw/master/update.json"
});

MapScript.loadModule("ISegment", {
	rawJson : function self(o, variableMap) {
		if (!self.coverSpan) {
			self.coverSpan = function(src, span) {
				src.setSpan(span, 0, src.length(), G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
			}
		}
		var i, result = new G.SpannableStringBuilder();
		if (Array.isArray(o)) {
			for (i in o) {
				result.append(self(o[i], variableMap));
			}
		} else if (typeof o == "function") {
			result.append(self(o(variableMap), variableMap));
		} else if (o instanceof Object) {
			if (o.text) {
				result.append(o.text);
			} else if (o.variable) {
				result.append(String(variableMap[o.variable]));
			} else if (o.command) {
				result.append(o.command);
				self.coverSpan(result, new G.ForegroundColorSpan(G.Color.WHITE));
				FCString.colorFC(result, G.Color.WHITE);
				self.coverSpan(result, new G.TypefaceSpan("monospace"));
				self.coverSpan(result, new G.BackgroundColorSpan(G.Color.BLACK));
			} else if (o.list) {
				for (i in o.list) {
					result.setSpan(new G.BulletSpan(), result.length(), result.length(), G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
					result.append(self(o.list[i], variableMap));
					result.append("\n");
				}
			} else if (o.image) {
				result.setSpan(new G.ImageSpan(ctx, android.net.Uri.parse(o.image)), result.length(), result.length(), G.Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
			}
			if (o.extra) {
				result.append(self(o.extra, variableMap));
			}
			if (o.color) self.coverSpan(result, new G.ForegroundColorSpan(o.color in Common.theme ? Common.theme[o.color] : G.Color.parseColor(o.color)));
			if (o.bgcolor) self.coverSpan(result, new G.BackgroundColorSpan(o.bgcolor in Common.theme ? Common.theme[o.bgcolor] : G.Color.parseColor(o.bgcolor)));
			if (o.bold) self.coverSpan(result, new G.StyleSpan(G.Typeface.BOLD));
			if (o.italic) self.coverSpan(result, new G.StyleSpan(G.Typeface.ITALIC));
			if (o.underlined) self.coverSpan(result, new G.UnderlineSpan());
			if (o.strikethrough) self.coverSpan(result, new G.StrikethroughSpan());
			if (o.superscript) self.coverSpan(result, new G.SuperscriptSpan());
			if (o.subscript) self.coverSpan(result, new G.SubscriptSpan());
			if (o.typeface) self.coverSpan(result, new G.TypefaceSpan(o.typeface));
		} else if (o instanceof java.lang.CharSequence) {
			result.append(o);
		} else {
			result.append(String(o));
		}
		return result;
	}
});

MapScript.loadModule("JSONEdit", {
	edit : null,
	pathbar : null,
	list : null,
	path : [],
	showAll : false,
	listItems : Object.keys,
	isObject : function(o) {
		return o instanceof Object;
	},
	show : function(o) {
		var i;
		o = Object(o);
		var name = o.rootname ? o.rootname : "根";
		var data = o.source;
		if (data === null) {
			return false;
		}
		this.showAll = Boolean(o.showAll);
		this.listItems = o.showAll ? function(o) {
			try {
				return Object.getOwnPropertyNames(o);
			} catch(e) {
				return Object.keys(o);
			}
		} : Object.keys;
		this.isObject = o.showAll ? function(o) {
			if (o == null) return false;
			return typeof o == "object" || typeof o == "function";
		} : function(o) {
			return o instanceof Object;
		};
		if (!this.isObject(o.source)) {
			this.showData("编辑“" + name + "”", data, function(newValue) {
				o.source = newValue;
				if (o.update) o.update();
			});
			return true;
		}
		this.path.length = 0;
		this.path.push({
			name : name,
			data : data,
			pos : 0
		});
		if (o.path) {
			for (i in o.path) {
				this.path.push({
					name : String(o.path[i]),
					data : this.isObject(data = data[o.path[i]]) ? data : {},
					pos : 0
				});
			}
		}
		this.updateListener = o.update ? function() {
			o.update();
		} : function() {};
		this.showEdit();
		this.refresh();
		return true;
	},
	create : function(callback, rootname) {
		this.showNewItem(function(data) {
			if (JSONEdit.isObject(data)) {
				JSONEdit.show({
					source : data,
					rootname : rootname,
					update : function() {
						callback(data);
					}
				});
			} else {
				return callback(data);
			}
		});
	},
	main : function self() {
		if (!self.menu) {
			self.saveMenu = [{
				text : "继续编辑",
				description : "继续编辑JSON",
				onclick : function(v, tag) {
					if (!JSONEdit.show(tag.par)) {
						Common.toast("该JSON没有可以编辑的地方");
						return true;
					}
				}
			},{
				text : "复制",
				description : "复制JSON",
				onclick : function(v, tag) {
					Common.setClipboardText(JSON.stringify(tag.data, null, "\t"));
					Common.toast("JSON已复制至剪贴板");
				}
			},{
				text : "保存",
				description : "将JSON的更改保存至之前的文件",
				onclick : function(v, tag) {
					if (tag.path) {
						MapScript.saveJSON(tag.path, tag.data);
						Common.toast("保存成功！");
					} else {
						Common.toast("请先另存为该文件");
					}
					return true;
				}
			},{
				text : "另存为",
				description : "将JSON保存到一个新文件",
				onclick : function(v, tag) {
					Common.showFileDialog({
						type : 1,
						callback : function(f) {
							try {
								MapScript.saveJSON(tag.path = f.result.getAbsolutePath(), tag.data);
								Common.toast("另存为成功");
							} catch(e) {
								Common.toast("文件保存失败，无法保存\n" + e);
							}
						}
					});
					return true;
				}
			},{
				text : "关闭",
				onclick : function(v, tag) {}
			}];
			self.menu = [{
				text : "新建",
				description : "新建一个JSON",
				onclick : function() {
					JSONEdit.create(function cb(o) {
						Common.showOperateDialog(self.saveMenu, {
							data : o,
							path : null,
							par : {
								source : o,
								update : function() {
									cb(this.source);
								}
							}
						});
					});
				}
			},{
				text : "打开",
				description : "从文件打开一个JSON",
				onclick : function() {
					Common.showFileDialog({
						type : 0,
						callback : function(f) {
							var o;
							try {
								o = {
									data : MapScript.readJSON(f.result.getAbsolutePath(), null),
									path : f.result.getAbsolutePath()
								}
								if (!JSONEdit.show(o.par = {
									source : o.data,
									update : function() {
										o.data = this.source;
										Common.showOperateDialog(self.saveMenu, o);
									}
								})) Common.showOperateDialog(self.saveMenu, o);
							} catch(e) {
								Common.toast("不是正确的JSON\n" + e);
							}
						}
					});
				}
			},{
				text : "取消",
				onclick : function(v, tag) {}
			}];
		}
		Common.showOperateDialog(self.menu);
	},
	
	showEdit : function self() {G.ui(function() {try {
		if (!self.main) {
			self.drawDivider = function(height) {
				var width = Math.floor(height / 2);
				var bmp = G.Bitmap.createBitmap(width, height, G.Bitmap.Config.ARGB_8888);
				var cv = new G.Canvas(bmp);
				var pa = new G.Paint();
				pa.setStrokeCap(G.Paint.Cap.BUTT);
				pa.setStyle(G.Paint.Style.STROKE)
				pa.setColor(Common.theme.promptcolor);
				pa.setStrokeWidth(2);
				pa.setAntiAlias(true);
				
				var ph = new G.Path();
				ph.moveTo(0, 0);
				ph.lineTo(width, width);
				ph.lineTo(0, height);
				cv.drawPath(ph, pa);
				
				return new G.BitmapDrawable(ctx.getResources(), bmp);
			}
			
			self.main = new G.LinearLayout(ctx);
			self.main.setOrientation(G.LinearLayout.VERTICAL);
			self.main.setFocusableInTouchMode(true);
			self.main.setOnKeyListener(new G.View.OnKeyListener({onKey : function(v, code, e) {try {
				if (code == e.KEYCODE_BACK && e.getAction() == e.ACTION_DOWN) {
					if (JSONEdit.path.length > 1) {
						JSONEdit.path.pop();
						JSONEdit.refresh();
					} else {
						self.dismiss();
					}
				}
				return false;
			} catch(e) {return erp(e), true}}}));
			
			self.header = new G.LinearLayout(ctx);
			self.header.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
			self.header.setOrientation(G.LinearLayout.HORIZONTAL);
			Common.applyStyle(self.header, "bar_float");
			
			self.back = new G.TextView(ctx);
			self.back.setText("< 返回");
			self.back.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
			self.back.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			Common.applyStyle(self.back, "button_critical", 2);
			self.back.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
				self.dismiss();
				return true;
			} catch(e) {erp(e)}}}));
			self.header.addView(self.back);
			
			self.hscr = new G.HorizontalScrollView(ctx);
			self.hscr.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			self.hscr.setHorizontalScrollBarEnabled(false);
				
			JSONEdit.pathbar = new G.LinearLayout(ctx);
			self.back.measure(0, 0);
			JSONEdit.pathbar.setDividerDrawable(self.drawDivider(self.back.getMeasuredHeight()));
			JSONEdit.pathbar.setShowDividers(G.LinearLayout.SHOW_DIVIDER_MIDDLE);
			JSONEdit.pathbar.setPadding(10 * G.dp, 0, 10 * G.dp, 0);
			JSONEdit.pathbar.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1));
			self.hscr.addView(JSONEdit.pathbar);
			self.header.addView(self.hscr);
			self.main.addView(self.header);
			
			self.create = new G.TextView(ctx);
			self.create.setText("添加 / 粘贴 ...");
			self.create.setGravity(G.Gravity.CENTER);
			self.create.setPadding(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
			self.create.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
			Common.applyStyle(self.create, "textview_default", 3);
			
			JSONEdit.list = new G.ListView(ctx);
			JSONEdit.list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
			JSONEdit.list.addHeaderView(self.create);
			Common.applyStyle(JSONEdit.list, "message_bg");
			JSONEdit.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({onItemClick : function(parent, view, pos, id) {try {
				if (view == self.create) {
					JSONEdit.showNewItem(function(newItem) {
						var data = JSONEdit.path[JSONEdit.path.length - 1].data;
						if (Array.isArray(data)) {
							data.push(newItem);
							JSONEdit.refresh();
						} else if (JSONEdit.isObject(data)) {
							Common.showInputDialog({
								title : "请输入键名",
								callback : function(s) {
									if (!s) {
										Common.toast("键名不能为空");
									} else if (s in data) {
										Common.toast("键名已存在");
									} else {
										data[s] = newItem;
										JSONEdit.refresh();
									}
								}
							});
						} else {
							Common.toast("当前位置无法插入项目，请检查当前位置是否正确");
						}
					});
					return true;
				}
				
				var name = parent.getAdapter().getItem(pos);
				var data = JSONEdit.path[JSONEdit.path.length - 1].data[name];
				JSONEdit.path[JSONEdit.path.length - 1].pos = JSONEdit.list.getFirstVisiblePosition();
				if (JSONEdit.isObject(data)) {
					JSONEdit.path.push({
						name : String(name),
						data : data,
						pos : 0
					});
					JSONEdit.refresh();
					self.hscr.post(function() {try {
						self.hscr.fullScroll(G.View.FOCUS_RIGHT);
					} catch(e) {erp(e)}});
				} else if (data != null) {
					JSONEdit.showData("编辑“" + name + "”", data, function(newValue) {
						JSONEdit.path[JSONEdit.path.length - 1].data[name] = newValue;
						JSONEdit.refresh();
					});
				}
			} catch(e) {erp(e)}}}));
			JSONEdit.list.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({onItemLongClick : function(parent, view, pos, id) {try {
				if (view == self.create) {
					return true;
				}
				JSONEdit.showItemAction(parent.getAdapter().getItem(pos));
				return true;
			} catch(e) {return erp(e), true}}}));
			if (G.style == "Material") {
				JSONEdit.list.setFastScrollEnabled(true);
				JSONEdit.list.setFastScrollAlwaysVisible(false);
			}
			self.main.addView(JSONEdit.list);
			self.getContentView = self.getRootView = function() {
				return self.main;
			}
			self.isShowing = function() {
				return JSONEdit.edit != null;
			}
			self.show = function() {
				var p = new G.WindowManager.LayoutParams();
				p.gravity = G.Gravity.LEFT | G.Gravity.TOP;
				p.flags = 0;
				p.type = CA.supportFloat ? G.WindowManager.LayoutParams.TYPE_PHONE : G.WindowManager.LayoutParams.TYPE_APPLICATION_PANEL;
				p.token = ctx.getWindow().getDecorView().getWindowToken();
				p.format = G.PixelFormat.TRANSLUCENT;
				p.height = -1;
				p.width = -1;
				p.x = 0;
				p.y = 0;
				PWM.wm.addView(self.main, p);
				JSONEdit.edit = self;
				PWM.add(self);
			}
			self.dismiss = function() {
				JSONEdit.edit = null;
				if (JSONEdit.updateListener) JSONEdit.updateListener();
				PWM.wm.removeViewImmediate(self.main);
			}
			
			PWM.registerResetFlag(self, "main");
		}
		Common.initEnterAnimation(self.main);
		self.show();
	} catch(e) {erp(e)}})},
	hideEdit : function() {G.ui(function() {try {
		if (JSONEdit.edit) JSONEdit.edit.dismiss();
		JSONEdit.edit = null;
	} catch(e) {erp(e)}})},
	showData : function(msg, data, callback) {G.ui(function() {try {
		var layout, title, text, ret, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		title = new G.TextView(ctx);
		title.setText(msg);
		title.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
		title.setPadding(0, 0, 0, 10 * G.dp);
		Common.applyStyle(title, "textview_default", 4);
		layout.addView(title);
		if (typeof data == "boolean") {
			ret = new G.CheckBox(ctx);
			ret.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
			ret.getLayoutParams().setMargins(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp)
			ret.setChecked(data);
			ret.setText("True / False");
		} else {
			ret = new G.EditText(ctx);
			ret.setText(String(data));
			ret.setSingleLine(false);
			ret.setMinWidth(0.5 * Common.getScreenWidth());
			ret.setImeOptions(G.EditorInfo.IME_FLAG_NO_FULLSCREEN);
			ret.setLayoutParams(new G.LinearLayout.LayoutParams(-2, 0, 1.0));
			if (typeof data == "number") ret.setInputType(G.InputType.TYPE_CLASS_NUMBER | G.InputType.TYPE_NUMBER_FLAG_SIGNED | G.InputType.TYPE_NUMBER_FLAG_DECIMAL);
			ret.setSelection(ret.length());
			Common.applyStyle(ret, "edittext_default", 2);
			Common.postIME(ret);
		}
		layout.addView(ret);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("确定");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			var t;
			if (callback) {
				if (typeof data == "boolean") {
					callback(Boolean(ret.isChecked()));
				} else if (typeof data == "number") {
					t = Number(ret.getText());
					if (isFinite(t)) {
						callback(t);
					} else {
						Common.toast("非法的数字格式");
					}
				} else {
					callback(String(ret.getText()));
				}
			}
			popup.dismiss();
			return true;
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		popup = Common.showDialog(layout, -2, -2);
	} catch(e) {erp(e)}})},
	showBatchEdit : function(data, callback) {G.ui(function() {try {
		var frame, layout, title, text, ret, exit, popup;
		layout = new G.LinearLayout(ctx);
		layout.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -1, G.Gravity.CENTER));
		layout.setOrientation(G.LinearLayout.VERTICAL);
		layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 0);
		Common.applyStyle(layout, "message_bg");
		layout.setOnTouchListener(new G.View.OnTouchListener({onTouch : function touch(v, e) {
			return true;
		}}));
		ret = new G.EditText(ctx);
		ret.setText(JSONEdit.showAll ? MapScript.toSource(data) : JSON.stringify(data, null, 4) || "<非法JSON>");
		ret.setSingleLine(false);
		ret.setGravity(G.Gravity.LEFT | G.Gravity.TOP);
		ret.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1.0));
		Common.applyStyle(ret, "edittext_default", 2);
		layout.addView(ret);
		exit = new G.TextView(ctx);
		exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
		exit.setText("保存");
		exit.setGravity(G.Gravity.CENTER);
		exit.setPadding(10 * G.dp, 20 * G.dp, 10 * G.dp, 20 * G.dp);
		Common.applyStyle(exit, "button_critical", 3);
		exit.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			var t;
			if (callback) {
				try {
					callback(JSON.parse(ret.getText()));
					popup.dismiss();
				} catch(e) {
					Common.toast("解析JSON出错\n" + e);
				}
			}
		} catch(e) {erp(e)}}}));
		layout.addView(exit);
		Common.initEnterAnimation(layout);
		popup = new G.PopupWindow(layout, -1, -1);
		if (CA.supportFloat) popup.setWindowLayoutType(G.WindowManager.LayoutParams.TYPE_PHONE);
		popup.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		popup.setFocusable(true);
		popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.add(popup);
	} catch(e) {erp(e)}})},
	showNewItem : function self(callback) {
		if (!self.menu) {
			self.menu = [{
				text : "空对象(默认)",
				description : "{} : 用于存储键值对",
				onclick : function(v, tag) {
					tag.callback({});
				}
			},{
				text : "空数组",
				description : "[] : 用于存储有序条目",
				onclick : function(v, tag) {
					tag.callback([]);
				}
			},{
				text : "字符串",
				description : "\"...\" : 用于存储文本",
				onclick : function(v, tag) {
					JSONEdit.showData("新建字符串", "", function(newValue) {
						tag.callback(newValue);
					});
				}
			},{
				text : "数字",
				description : "1234.5 : 用于存储数字",
				onclick : function(v, tag) {
					JSONEdit.showData("新建数字", 0, function(newValue) {
						tag.callback(newValue);
					});
				}
			},{
				text : "布尔值",
				description : "true / false : 用于存储一个表示是或否的值",
				onclick : function(v, tag) {
					JSONEdit.showData("新建布尔值", true, function(newValue) {
						tag.callback(newValue);
					});
				}
			},{
				text : "空引用",
				description : "null : 用于存储一个表示不可用或不存在的值",
				onclick : function(v, tag) {
					tag.callback(null);
				}
			},{
				gap : G.dp * 10
			},{
				text : "从剪贴板粘贴",
				description : "从剪贴板中导入JSON",
				onclick : function(v, tag) {
					if (!Common.hasClipboardText()) {
						Common.toast("剪贴板为空");
						return true;
					}
					try {
						tag.callback(JSON.parse(Common.getClipboardText()));
					} catch(e) {
						Common.toast("解析JSON出错\n" + e);
					}
				}
			},{
				text : "手动输入",
				description : "手动输入JSON",
				onclick : function(v, tag) {
					Common.showInputDialog({
						title : "手动输入JSON",
						callback : function(s) {
							try {
								tag.callback(JSON.parse(s));
							} catch(e) {
								Common.toast("解析JSON出错\n" + e);
							}
						}
					});
				}
			}];
		}
		Common.showOperateDialog(self.menu, {callback : callback});
	},
	showItemAction : function self(name) {
		if (!self.menu) {
			self.menu = [{
				text : "复制",
				onclick : function(v, tag) {
					Common.setClipboardText(MapScript.toSource(tag.data));
					JSONEdit.refresh();
				}
			},{
				text : "剪切",
				onclick : function(v, tag) {
					Common.setClipboardText(MapScript.toSource(tag.data));
					if (Array.isArray(tag.src)) {
						cd.splice(parseInt(tag.name), 1);
					} else {
						delete tag.src[tag.name];
					}
					JSONEdit.refresh();
				}
			},{
				text : "替换",
				onclick : function(v, tag) {
					JSONEdit.showNewItem(function(newItem) {
						tag.src[tag.name] = newItem;
						JSONEdit.refresh();
					});
				}
			},{
				text : "删除",
				onclick : function(v, tag) {
					if (Array.isArray(tag.src)) {
						tag.src.splice(parseInt(tag.name), 1);
					} else {
						delete tag.src[tag.name];
					}
					JSONEdit.refresh();
				}
			},{
				text : "批量编辑",
				onclick : function(v, tag) {
					JSONEdit.showBatchEdit(tag.data, function(v) {
						tag.src[tag.name] = v;
						JSONEdit.refresh();
					});
				}
			}];
			self.objMenu = [{
				text : "重命名",
				onclick : function(v, tag) {
					Common.showInputDialog({
						title : "重命名",
						callback : function(s) {
							tag.src[s] = tag.src[tag.name];
							delete tag.src[tag.name];
							JSONEdit.refresh();
						},
						defaultValue : tag.name
					});
				}
			}].concat(self.menu);
			self.arrMenu = [{
				text : "插入（上方）",
				onclick : function(v, tag) {
					JSONEdit.showNewItem(function(newItem) {
						tag.src.splice(parseInt(tag.name), 0, newItem);
						JSONEdit.refresh();
					});
				}
			}].concat(self.menu);
		}
		var cd = JSONEdit.path[JSONEdit.path.length - 1].data;
		Common.showOperateDialog(Array.isArray(cd) ? self.arrMenu : JSONEdit.isObject(cd) ? self.objMenu : obj.menu, {
			name : name,
			src : cd,
			data : cd[name]
		});
	},
	pathClick : new G.View.OnClickListener({onClick : function(v) {try {
		var i = JSONEdit.pathbar.indexOfChild(v);
		JSONEdit.path.splice(i + 1);
		JSONEdit.refresh();
	} catch(e) {erp(e)}}}),
	viewMaker : function(holder, par) {
		var hl, vl, name, data, more;
		hl = new G.LinearLayout(ctx);
		hl.setOrientation(G.LinearLayout.HORIZONTAL);
		hl.setLayoutParams(G.AbsListView.LayoutParams(-1, -2));
		hl.setPadding(20 * G.dp, 10 * G.dp, 20 * G.dp, 10 * G.dp);
		vl = new G.LinearLayout(ctx);
		vl.setOrientation(G.LinearLayout.VERTICAL);
		vl.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 1.0));
		vl.getLayoutParams().gravity = G.Gravity.CENTER;
		name = holder.name = new G.TextView(ctx);
		name.setEllipsize(G.TextUtils.TruncateAt.END);
		name.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
		Common.applyStyle(name, "textview_default", 3);
		vl.addView(name);
		data = holder.data = new G.TextView(ctx);
		data.setMaxLines(2);
		data.setEllipsize(G.TextUtils.TruncateAt.END);
		data.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
		Common.applyStyle(data, "textview_prompt", 1);
		vl.addView(data);
		hl.addView(vl);
		more = new G.TextView(ctx);
		more.setText(">");
		more.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
		more.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
		more.getLayoutParams().gravity = G.Gravity.CENTER;
		Common.applyStyle(more, "button_secondary", 4);
		more.setOnClickListener(new G.View.OnClickListener({onClick : function(v) {try {
			JSONEdit.showItemAction(holder.e);
		} catch(e) {erp(e)}}}));
		hl.addView(more);
		return hl;
	},
	viewBinder : function(holder, e, i, a, par) {
		holder.name.setText(Array.isArray(par) && !JSONEdit.showAll ? "#" + (parseInt(e) + 1) : String(e));
		holder.data.setText(JSONEdit.getDesp(par[e]));
		holder.e = e;
	},
	getDesp : function(o) {
		try {
			if (Array.isArray(o)) {
				return o.length ? o[0] + "等" + o.length + "个项目" : "0个项目";
			} else if (o instanceof Object && typeof o !== "function" && !(o instanceof java.lang.String)) {
				return this.listItems(o).length + "个键值对";
			} else if (o === null) {
				return "空引用(null)";
			} else return String(o);
		} catch(e) {
			return "<未知的项目>";
		}
	},
	refresh : function() {G.ui(function() {try {
		var lbl, i, e, ci = JSONEdit.path[JSONEdit.path.length - 1], cd = ci.data, items;
		JSONEdit.pathbar.removeAllViews();
		for (i in JSONEdit.path) {
			e = JSONEdit.path[i];
			lbl = new G.TextView(ctx);
			lbl.setText(String(e.name));
			lbl.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -1));
			lbl.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
			lbl.setOnClickListener(JSONEdit.pathClick);
			Common.applyStyle(lbl, "item_default", 2);
			JSONEdit.pathbar.addView(lbl);
		}
		items =  JSONEdit.listItems(cd);
		//items.sort();
		JSONEdit.list.setAdapter(new SimpleListAdapter(items, JSONEdit.viewMaker, JSONEdit.viewBinder, cd));
		JSONEdit.list.post(function() {try {
			JSONEdit.list.setSelection(ci.pos);
		} catch(e) {erp(e)}});
	} catch(e) {erp(e)}})},
	traceGlobal : function() {
		this.show({
			source : eval.call(null, "this"),
			rootname : "全局对象",
			showAll : true
		});
	},
	trace : function(obj) {
		this.show({
			source : obj,
			rootname : "Trace",
			showAll : true
		});
	}
});

MapScript.loadModule("SettingsCompat", {
	// 原作者 czy1121
	// 使用开源协议：Apache License, Version 2.0
	// https://github.com/czy1121/settingscompat
	// 原代码类型：Java/Android
	// 现代码类型：JavaScript/Rhino/Android
	// 由 ProjectXero (@XeroAlpha) 翻译，有改动
	
	SYSVER : android.os.Build.VERSION.SDK_INT,
	ensureCanFloat : function() {
		if (this.canDrawOverlays()) {
			return true;
		}
		if (this.setDrawOverlays(true)) {
			return true;
		}
		G.ui(function() {try {
			G.Toast.makeText(ctx, "系统不允许悬浮窗显示，请在设置中启用", 1).show();
		} catch(e) {erp(e)}});
		this.manageDrawOverlays();
		return false;
	},
	showAppSettings : function() {
		var localIntent = new android.content.Intent();
		localIntent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
		if (this.SYSVER >= 9) {
			localIntent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
			localIntent.setData(android.net.Uri.fromParts("package", ctx.getPackageName(), null));
		} else {
			localIntent.setAction(android.content.Intent.ACTION_VIEW);
			localIntent.setClassName("com.android.settings", "com.android.settings.InstalledAppDetails");
			localIntent.putExtra("com.android.settings.ApplicationPkgName", ctx.getPackageName());
		}
		ctx.startActivity(localIntent);
	},
	canDrawOverlays : function() {
		if (this.SYSVER >= 23) { //Android M (6.0)
			return android.provider.Settings.canDrawOverlays(ctx);
		} else if (this.SYSVER >= 18) { //Android Jelly Bean (4.3.x)
			return this.checkOp(ctx, 24); //OP_SYSTEM_ALERT_WINDOW
		} else {
			return true;
		}
	},
	setDrawOverlays : function(allowed) {
		return this.setMode(ctx, 24, allowed);
	},
	checkOp : function(ctx, op) {
		try {
			return ctx.getSystemService("appops").checkOp(op, android.os.Binder.getCallingUid(), ctx.getPackageName()) == 0; //MODE_ALLOWED
		} catch(e) {}
		return false;
	},
	setMode : function(ctx, op, allowed) {
		if (this.SYSVER < 18 || this.SYSVER >= 21) { // Android L (5.0)
			return false;
		}
		try {
			ctx.getSystemService("appops").setMode(op, android.os.Binder.getCallingUid(), ctx.getPackageName(), allowed);
			return true;
		} catch(e) {}
		return false;
	},
	manageDrawOverlays : function() {
		if (this.SYSVER >= 18) {
			if (this.manageDrawOverlaysForRom()) {
				return;
			}
		}
		if (this.SYSVER >= 23) {
			var intent = new android.content.Intent(android.provider.Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
			intent.setData(android.net.Uri.parse("package:" + ctx.getPackageName()));
			intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
			ctx.startActivity(intent);
		} else {
			this.showAppSettings();
		}
	},
	manageDrawOverlaysForRom : function() {
		if (this.rom in this.ShowManager) {
			return this.ShowManager[this.rom].call(this);
		}
		return false;
	},
	startSafely : function(intent) {
		try {
			if (ctx.getPackageManager().queryIntentActivities(intent, android.content.pm.PackageManager.MATCH_DEFAULT_ONLY).size() > 0) {
				intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
				ctx.startActivity(intent);
				return true;
			}
		} catch(e) {}
		return false;
	},
	ShowManager : {
		"MIUI" : function() {
			var intent = new android.content.Intent("miui.intent.action.APP_PERM_EDITOR");
			intent.putExtra("extra_pkgname", ctx.getPackageName());
			intent.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.AppPermissionsEditorActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			intent.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.PermissionsEditorActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			if (this.SYSVER < 21) {
				var intent1 = new android.content.Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
				intent1.setData(android.net.Uri.fromParts("package", ctx.getPackageName(), null));
				return this.startSafely(context, intent1);
			}
			return false;
		},
		"EMUI" : function() {
			const HUAWEI_PACKAGE = "com.huawei.systemmanager";
			var intent = new android.content.Intent();
			if (this.SYSVER >= 21) {
				intent.setClassName(HUAWEI_PACKAGE, "com.huawei.systemmanager.addviewmonitor.AddViewMonitorActivity");
				if (this.startSafely(intent)) {
					return true;
				}
			}
			intent.setClassName(HUAWEI_PACKAGE, "com.huawei.notificationmanager.ui.NotificationManagmentActivity");
			intent.putExtra("showTabsNumber", 1);
			if (this.startSafely(intent)) {
				return true;
			}
			intent.setClassName(HUAWEI_PACKAGE, "com.huawei.permissionmanager.ui.MainActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			return false;
		},
		"OPPO" : function() {
			var intent = new android.content.Intent();
			intent.putExtra("packageName", ctx.getPackageName());
			intent.setAction("com.oppo.safe");
			intent.setClassName("com.oppo.safe", "com.oppo.safe.permission.floatwindow.FloatWindowListActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			intent.setAction("com.color.safecenter");
			intent.setClassName("com.color.safecenter", "com.color.safecenter.permission.floatwindow.FloatWindowListActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			intent.setAction("com.coloros.safecenter");
			intent.setClassName("com.coloros.safecenter", "com.coloros.safecenter.sysfloatwindow.FloatWindowListActivity");
			return this.startSafely(intent);
		},
		"VIVO" : function() {
			// 不支持直接到达悬浮窗设置页，只能到 i管家 首页
			var intent = new android.content.Intent("com.iqoo.secure");
			intent.setClassName("com.iqoo.secure", "com.iqoo.secure.MainActivity");
			return this.startSafely(intent);
		},
		"SMARTISAN" : function() {
			if (this.SYSVER >= 23) {
				return false;
			}
			var intent;
			if (this.SYSVER >= 21) {
				intent = new android.content.Intent("com.smartisanos.security.action.SWITCHED_PERMISSIONS_NEW");
				intent.setClassName("com.smartisanos.security", "com.smartisanos.security.SwitchedPermissions");
				intent.putExtra("index", 17); // 不同版本会不一样
				return this.startSafely(intent);
			} else {
				intent = new android.content.Intent("com.smartisanos.security.action.SWITCHED_PERMISSIONS");
				intent.setClassName("com.smartisanos.security", "com.smartisanos.security.SwitchedPermissions");
				var b = new android.os.Bundle();
				b.putStringArray("permission", [android.Manifest.permission.SYSTEM_ALERT_WINDOW]);
				//intent.putExtra("permission", new String[]{Manifest.permission.SYSTEM_ALERT_WINDOW});
				intent.putExtras(b);
				return this.startSafely(intent);
			}
		},
		"FLYME" : function() {
			var intent = new android.content.Intent("com.meizu.safe.security.SHOW_APPSEC");
			intent.setClassName("com.meizu.safe", "com.meizu.safe.security.AppSecActivity");
			intent.putExtra("packageName", ctx.getPackageName());
			return this.startSafely(intent);
		},
		"QIKU" : function() {
			return this.ShowManager["360"].call(this);
		},
		"360" : function() {
			var intent = new android.content.Intent();
			intent.setClassName("com.android.settings", "com.android.settings.Settings$OverlaySettingsActivity");
			if (this.startSafely(intent)) {
				return true;
			}
			intent.setClassName("com.qihoo360.mobilesafe", "com.qihoo360.mobilesafe.ui.index.AppEnterActivity");
			return this.startSafely(intent);
		}
	},
	RomCheck : {
		"MIUI" : function() {
			return this.getProp("ro.miui.ui.version.name");
		},
		"EMUI" : function() {
			return this.getProp("ro.build.version.emui");
		},
		"OPPO" : function() {
			return this.getProp("ro.build.version.opporom");
		},
		"VIVO" : function() {
			return this.getProp("ro.vivo.os.version");
		},
		"SMARTISAN" : function() {
			return this.getProp("ro.smartisan.version");
		},
		"FLYME" : function() {
			var r = android.os.Build.DISPLAY;
			return r.contains("FLYME") ? r : null;
		}
	},
	onCreate : function() {
		var i, t;
		for (i in this.RomCheck) {
			if (t = this.RomCheck[i].call(this)) {
				this.rom = i;
				this.version = t;
				return;
			}
		}
		this.rom = android.os.Build.MANUFACTURER.toUpperCase();
		this.version = "unknown";
	},
	getProp : function(key) {
		var ln = null, is = null;
		var th = new java.lang.Thread(function() {
			try {
				var p = java.lang.Runtime.getRuntime().exec("getprop " + key);
				is = new java.io.BufferedReader(new java.io.InputStreamReader(p.getInputStream()), 1024);
				ln = is.readLine();
				is.close();
			} catch(e) {}
		});
		th.start();
		th.join(50, 0);
		if (th.getState() != java.lang.Thread.State.TERMINATED) th.interrupt();
		if (is != null) {
			try {
				is.close();
			} catch(e) {}
		}
		return ln ? String(ln) : null;
	}
});

MapScript.loadModule("EasterEgg", {
	onCreate : function() {
		G.ui(this.initIcon);
	},
	start : function self() {G.ui(function() {try {
		if (EasterEgg.view) return;
		if (!self.view) {
			self.view = new G.ImageView(ctx);
			self.view.setPadding(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
			self.view.setBackgroundColor(G.Color.TRANSPARENT);
			self.view.setImageBitmap(EasterEgg.getBitmap(G.screenHeight));
		}
		EasterEgg.view = new G.PopupWindow(self.view, -1, -1);
		EasterEgg.view.setBackgroundDrawable(new G.ColorDrawable(G.Color.TRANSPARENT));
		EasterEgg.view.setFocusable(true);
		EasterEgg.view.setOnDismissListener(new G.PopupWindow.OnDismissListener({onDismiss : function() {try {
			EasterEgg.view = null;
		} catch(e) {erp(e)}}}));
		var anis = new G.AnimationSet(true);
		var ani1 = new G.AlphaAnimation(0, 1);
		ani1.setDuration(200);
		var ani2 = new G.AlphaAnimation(1, 0);
		ani2.setDuration(200);
		ani2.setStartOffset(1800);
		ani2.setAnimationListener(new G.Animation.AnimationListener({
			onAnimationEnd : function(a) {
				EasterEgg.view.dismiss();
			}
		}));
		anis.setInterpolator(new G.LinearInterpolator());
		anis.addAnimation(ani1);
		anis.addAnimation(ani2);
		self.view.startAnimation(anis);
		EasterEgg.view.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
		PWM.addPopup(EasterEgg.view);
	} catch(e) {}})},
	getBitmap : function(w) {
		var zf = new java.util.zip.ZipFile(ctx.getPackageManager().getApplicationInfo("com.mojang.minecraftpe", 128).publicSourceDir);
		var b = zf.getInputStream(zf.getEntry("assets/resource_packs/vanilla/textures/blocks/command_block_front_mipmap.png"));
		var bmp = G.Bitmap.createBitmap(w, w, G.Bitmap.Config.ARGB_8888);
		var cv = new G.Canvas(bmp);
		cv.scale(w / 170, w / 170);
		var pt = new G.Paint();
		pt.setAntiAlias(true);
		pt.setShader(new G.BitmapShader(G.Bitmap.createScaledBitmap(G.BitmapFactory.decodeStream(b), 160, 160, false), G.Shader.TileMode.REPEAT, G.Shader.TileMode.REPEAT));
		cv.drawRect(0, 0, 170, 170, pt);
		pt.setShader(null);
		pt.setTextSize(60);
		var fm = pt.getFontMetrics();
		var th = fm.bottom - fm.top;
		pt.setColor(Common.argbInt(0x80, 0, 0, 0));
		pt.setShadowLayer(1, 0, 0, pt.getColor());
		cv.drawRoundRect(0, 170 - th, 170, 200, 10, 10, pt);
		pt.setColor(G.Color.WHITE);
		pt.setShadowLayer(1, 0, 0, G.Color.BLACK);
		cv.drawText(" CA_", 0, 170 - fm.descent, pt);
		return bmp;
	},
	initIcon : function() {
		var img;
		try {
			img = EasterEgg.getBitmap(480);
		} catch(e) {}
		if (img) {
			CA.Icon.easteregg = function(size) {
				var zp = G.dp * size;
				var frm = new G.FrameLayout(ctx);
				var view = new G.ImageView(ctx);
				view.setImageBitmap(img);
				view.setLayoutParams(new G.FrameLayout.LayoutParams(32 * zp, 32 * zp));
				frm.addView(view);
				return frm;
			};
		}
	}
});

MapScript.loadModule("MCAdapter", {
	targetVersion : 1,
	bundle : null,
	onCreate : function() {
		if (MapScript.host == "Android") {
			this.getInfo = this.getInfo_Android;
			this.available = this.available_Android;
		} else if (MapScript.host == "BlockLauncher") {
			this.getInfo = this.getInfo_ModPE;
			this.available = this.available_ModPE;
		} else if (MapScript.host == "InnerCore") {
			this.getInfo = this.getInfo_IC;
			this.available = this.available_IC;
		}
	},
	initialize : function() {
		this.asked = CA.settings.neverAskAdapter;
	},
	inLevel : false,
	newLevel : function() {
		this.inLevel = true;
	},
	leaveGame : function() {
		this.inLevel = false;
	},
	getInfo_Android : function(id) {
		if (!this.bundle || !this.bundle.containsKey(id)) return null;
		return this.bundle.get(id);
	},
	available_Android : function() {
		if (this.bundle != null) return true;
		return false;
	},
	getInfo_ModPE : function(id) {
		try {
			switch (id) {
				case "playernames":
				return Server.getAllPlayerNames();
				case "playerposition":
				return [Player.getX(), Player.getY(), Player.getZ()];
				case "pointedblockpos":
				return [Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ()];
			}
		} catch(e) {}
		return null;
	},
	available_ModPE : function() {
		return this.inLevel;
	},
	getInfo_IC : function(id) {
		var r;
		try {
			switch (id) {
				case "playernames":
				return [Player.getName()];
				case "playerposition":
				r = Player.getPosition();
				return [r.x, r.y, r.z];
				case "pointedblockpos":
				r = Player.getPointed().pos;
				return [r.x, r.y, r.z];
			}
		} catch(e) {}
		return null;
	},
	available_IC : function() {
		return World.isLoaded;
	},
	getInfo : function(id) {
		return null;
	},
	available : function() {
		return false;
	},
	callHook : function(name, args) {
		if (name in MapScript.global) {
			MapScript.global[name].apply(null, args);
		}
	},
	applySense : function(t) {
		if (MapScript.host != "Android" || CA.settings.neverAskAdapter) return;
		if (!t.input) t.input = [];
		if (!t.menu) t.menu = {};
		t.input.push("（加载适配器以显示更多信息……）");
		t.menu["（加载适配器以显示更多信息……）"] = function() {
			MCAdapter.listAdapters();
		};
	},
	askShortcut : function(name, pkg) {
		var z = {
			title : "是否创建快捷方式？",
			description : "需要给予对应权限",
			canSkip : true,
			skip : function(f) {
				CA.settings.neverAskShortcut = Boolean(f);
			},
			callback : function(id) {
				if (CA.settings.neverAskShortcut) {
					CA.settings.needShortcut = parseInt(id);
				}
				if (id == 0) {
					MCAdapter.createShortcut(name, pkg);
				}
			}
		};
		if (CA.settings.neverAskShortcut) z.callback(CA.settings.needShortcut);
	},
	createShortcut : function(name, pkg) {
		var sc = new android.content.Intent(ScriptActivity.ACTION_START_FROM_SHORTCUT);
		sc.setClassName("com.xero.ca", "com.xero.ca.MainActivity");
		sc.setData(android.net.Uri.fromParts("package", pkg, null));
		var i = new android.content.Intent("com.android.launcher.action.INSTALL_SHORTCUT");
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_NAME, String(name));
		i.putExtra("duplicate", false);
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_INTENT, sc);
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_ICON_RESOURCE, android.content.Intent.ShortcutIconResource.fromContext(ctx, com.xero.ca.R.drawable.icon));
		ctx.sendBroadcast(i);
	},
	adapters : [{
		text : "ModPE适配器（通用）",
		description : "适用于BlockLauncher/BlockLauncher PRO",
		callback : function() {
			var f = new java.io.File(ctx.getExternalFilesDir(null), "ModPE适配器.js");
			this.unpackAssets("adapter/ModPE.js", f);
			var i = new android.content.Intent("net.zhuoweizhang.mcpelauncher.action.IMPORT_SCRIPT");
			if (this.existPackage("net.zhuoweizhang.mcpelauncher.pro")) {
				i.setClassName("net.zhuoweizhang.mcpelauncher.pro", "net.zhuoweizhang.mcpelauncher.api.ImportScriptActivity");
			} else if (this.existPackage("net.zhuoweizhang.mcpelauncher")) {
				i.setClassName("net.zhuoweizhang.mcpelauncher", "net.zhuoweizhang.mcpelauncher.api.ImportScriptActivity");
			} else {
				Common.toast("未找到BlockLauncher/BlockLauncher PRO");
				return;
			}
			i.setDataAndType(android.net.Uri.fromFile(f), "application/x-javascript");
			ctx.startActivity(i);
			this.askShortcut("BlockLauncher", i.getComponent().getPackageName());
		}
	}, {
		text : "ModPE适配器（盒子专版）",
		description : "适用于多玩我的世界盒子",
		callback : function() {
			var f = new java.io.File(ctx.getExternalFilesDir(null), "多玩我的世界盒子适配器.js");
			this.unpackAssets("adapter/ModPE_Sandbox.js", f);
			var i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
			if (this.existPackage("com.duowan.groundhog.mctools")) {
				i.setClassName("com.duowan.groundhog.mctools", "com.duowan.groundhog.mctools.activity.plug.PluginOutsideImportActivity");
			} else {
				Common.toast("未找到多玩我的世界盒子");
				return;
			}
			i.setDataAndType(android.net.Uri.fromFile(f), "application/x-javascript");
			ctx.startActivity(i);
			this.askShortcut("多玩我的世界盒子", i.getComponent().getPackageName());
			Common.showTextDialog("因为多玩我的世界盒子采用了沙盒机制，该适配器可能无法与本体连接。");
		}
	}, {
		text : "InnerCore适配器",
		description : "适用于Inner Core",
		callback : function() {
			if (this.getPackageVersion("com.zhekasmirnov.innercore") > 10) { //这个数字我瞎编的，反正介于1～25之间就好
				var f = new java.io.File(ctx.getExternalFilesDir(null), "InnerCore适配器.icmod");
				this.unpackAssets("adapter/InnerCore.icmod", f);
				var i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
				if (this.existPackage("com.zhekasmirnov.innercore")) {
					i.setClassName("com.zhekasmirnov.innercore", "zhekasmirnov.launcher.core.ExtractModActivity");
				} else {
					Common.toast("未找到InnerCore");
					return;
				}
				i.setDataAndType(android.net.Uri.fromFile(f), "application/icmod");
				ctx.startActivity(i);
			} else {
				var fs = [
					"main.js",
					"mod.info",
					"launcher.js",
					"build.config",
					"mod_icon.png"
				], i;
				new java.io.File("/sdcard/games/com.mojang/mods/ICAdpt").mkdirs();
				for (i in fs) {
					this.unpackAssets("adapter/ICAdpt/" + fs[i], "/sdcard/games/com.mojang/mods/ICAdpt/" + fs[i]);
				}
				Common.toast("Mod文件已释放");
			}
			this.askShortcut("Inner Core", "com.zhekasmirnov.innercore");
		}
	}],
	listAdapters : function() {
		var self = this;
		Common.toast("请选择系统适用的适配器");
		Common.showListChooser(this.adapters, function(id) {
			self.adapters[id].callback.call(self);
		});
	},
	unpackAssets : function(fn, path) {
		const BUFFER_SIZE = 4096;
		var is, os, buf, hr;
		is = ctx.getAssets().open(fn);
		(new java.io.File(path)).getParentFile().mkdirs();
		os = new java.io.FileOutputStream(path);
		buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, BUFFER_SIZE);
		while ((hr = is.read(buf)) > 0) os.write(buf, 0, hr);
		is.close();
		os.close();
	},
	viewFile : function(path, mime) {
		var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
		intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
		intent.addCategory(android.content.Intent.CATEGORY_DEFAULT);
		intent.setDataAndType(android.net.Uri.parse("file://" + path), mime);
		ctx.startActivity(intent);
	},
	existPackage : function(pkg) {
		try {
			if (ctx.getPackageManager().getPackageInfo(pkg, 0)) return true;
		} catch(e) {}
		return false;
	},
	askShortcut : function(name, pkg) {
		var z = {
			title : "是否创建快捷方式？",
			description : "需要给予对应权限",
			canSkip : false,
			skip : function(f) {
				CA.settings.neverAskShortcut = Boolean(f);
				CA.trySave();
			},
			callback : function(id) {
				if (CA.settings.neverAskShortcut) {
					CA.settings.needShortcut = parseInt(id);
				}
				if (id == 0) {
					MCAdapter.createShortcut(name, pkg);
				}
			}
		};
		if (CA.settings.neverAskShortcut) {
			z.callback(CA.settings.needShortcut);
		} else {
			Common.showConfirmDialog(z);
		}
	},
	createShortcut : function(name, pkg) {
		var sc = new android.content.Intent(ScriptActivity.ACTION_START_FROM_SHORTCUT);
		sc.setClassName("com.xero.ca", "com.xero.ca.MainActivity");
		sc.setData(android.net.Uri.fromParts("package", pkg, null));
		var i = new android.content.Intent("com.android.launcher.action.INSTALL_SHORTCUT");
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_NAME, String(name));
		i.putExtra("duplicate", false);
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_INTENT, sc);
		i.putExtra(android.content.Intent.EXTRA_SHORTCUT_ICON_RESOURCE, android.content.Intent.ShortcutIconResource.fromContext(ctx, com.xero.ca.R.drawable.icon));
		ctx.sendBroadcast(i);
	},
	getPackageVersion : function(pkg) {
		try {
			return ctx.getPackageManager().getPackageInfo(pkg, 0).versionCode;
		} catch(e) {}
		return NaN;
	}
});

MapScript.loadModule("AndroidBridge", {
	intentCallback : {},
	onCreate : function() {
		G.ui(this.initIcon);
	},
	initialize : function() {try {
		if (MapScript.host != "Android") return;
		if (CA.RELEASE) gHandler.post(this.verifyApk);
		ScriptActivity.setBridgeListener(new com.xero.ca.MainActivity.BridgeListener({
			applyIntent : function(intent) {try {
				AndroidBridge.callHide();
				return true;
			} catch(e) {erp(e)}},
			onAccessibilitySvcCreate : function() {try {
				AndroidBridge.notifySettings();
			} catch(e) {erp(e)}},
			onAccessibilitySvcDestroy : function() {try {
				AndroidBridge.notifySettings();
			} catch(e) {erp(e)}},
			onActivityResult : function(requestCode, resultCode, data) {try {
				var cb = AndroidBridge.intentCallback[requestCode];
				if (!cb) return;
				PWM.onResume();
				delete AndroidBridge.intentCallback[requestCode];
				cb(resultCode, data);
			} catch(e) {erp(e)}},
			onKeyEvent : function(e) {try {
				if (e.getAction() == e.ACTION_DOWN) {
					var k = e.getKeyCode();
					if (k == e.KEYCODE_HOME || k == e.KEYCODE_MENU || k == e.KEYCODE_ENDCALL || k == e.KEYCODE_POWER || k == e.KEYCODE_NOTIFICATION) {
						AndroidBridge.callHide();
					}
				}
			} catch(e) {erp(e)}},
			onNewIntent : function(intent) {try {
				AndroidBridge.onNewIntent(intent, false);
			} catch(e) {erp(e)}},
			onRemoteEnabled : function() {try {
				Common.toast("正在连接至Minecraft适配器……/\n等待游戏数据传输……");
			} catch(e) {erp(e)}},
			onRemoteMessage : function(msg) {try {
				if (msg.what != 1) return;
				var data = msg.getData();
				if (data.getString("action") != "init" && !MCAdapter.client) {
					var msg2 = android.os.Message.obtain();
					msg2.what = 2;
					msg.replyTo.send(msg2);
					return;
				}
				switch (String(data.getString("action"))) {
					case "init":
					MCAdapter.client = msg.replyTo;
					MCAdapter.connInit = true;
					MCAdapter.version = data.getInt("version", 0);
					AndroidBridge.notifySettings();
					Common.toast("已连接至Minecraft适配器，终端：" + data.getString("platform") + "\n" + (MCAdapter.targetVersion > MCAdapter.version ? "此适配器版本较旧，可能不支持部分提示，请在设置中重新加载适配器" : "当前适配器为最新版本"));
					break;
					case "info":
					MCAdapter.bundle = data.getBundle("info");
					break;
					case "resetMCV":
					NeteaseAdapter.mcVersion = String(data.getString("version"));
					Common.toast("正在切换拓展包版本，请稍候……");
					CA.checkFeatures();
					CA.IntelliSense.initLibrary(function(flag) {
						if (flag) {
							Common.toast("拓展包加载完毕");
						} else {
							Common.toast("有至少1个拓展包无法加载，请在设置中查看详情");
						}
					});
				}
			} catch(e) {erp(e)}},
			onRemoteDisabled : function() {try {
				Common.toast("已断开至Minecraft适配器的连接");
				MCAdapter.bundle = null;
				MCAdapter.client = null;
				MCAdapter.connInit = false;
				AndroidBridge.notifySettings();
			} catch(e) {erp(e)}}
		}));
		this.onNewIntent(ScriptActivity.getIntent(), true);
		if (CA.settings.autoStartAccSvcRoot) AndroidBridge.startAccessibilitySvcByRootAsync(null, true);
		if (CA.settings.watchClipboard) AndroidBridge.startWatchClipboard();
	} catch(e) {erp(e)}},
	onNewIntent : function(intent, startByIntent) {
		function onReturn() {
			if (!CA.trySave()) return;
			if (startByIntent) {
				unload();
				ScriptActivity.finish();
			}
		}
		var t;
		if (!intent) return;
		switch (intent.getAction()) {
			case ScriptActivity.ACTION_ADD_LIBRARY:
			t = AndroidBridge.uriToFile(intent.getData());
			Common.showConfirmDialog({
				title : "确定加载拓展包“" + t + "”？",
				callback : function(id) {
					if (id != 0) return onReturn();
					if (!CA.IntelliSense.enableLibrary(String(t))) {
						Common.toast("无法导入该拓展包，可能文件不存在");
						return onReturn();
					}
					CA.IntelliSense.initLibrary(function() {
						Common.toast("导入成功！");
						CA.showLibraryMan(onReturn);
					});
				}
			});
			break;
			case ScriptActivity.ACTION_EDIT_COMMAND:
			t = intent.getExtras().getString("text", "");
			G.ui(function() {try {
				CA.showGen(true);
				CA.cmd.setText(t);
				CA.showGen.activate(false);
			} catch(e) {erp(e)}});
			break;
			case ScriptActivity.ACTION_START_FROM_SHORTCUT:
			t = ctx.getPackageManager().getLaunchIntentForPackage(intent.getData().getSchemeSpecificPart());
			if (t) {
				ctx.startActivity(t);
			}
			break;
			case ScriptActivity.ACTION_SCRIPT_ACTION:
			if (!startByIntent) AndroidBridge.scriptAction();
			break;
			case ScriptActivity.ACTION_SHOW_DEBUG:
			//ctx.startActivity(new android.content.Intent("com.xero.ca.SHOW_DEBUG").setComponent(new android.content.ComponentName("com.xero.ca", "com.xero.ca.MainActivity")).addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK));
			Common.showDebugDialog();
			break;
			
			default:
			if (startByIntent && CA.settings.chainLaunch) {
				t = ctx.getPackageManager().getLaunchIntentForPackage(CA.settings.chainLaunch);
				if (t) {
					ctx.startActivity(t);
				}
			}
		}
	},
	verifyApk : function() {
		if (ctx.getPackageName() != "com.xero.ca") throw new java.lang.SecurityException();
		AndroidBridge.verifySign();
		//AndroidBridge.verifyDex();
	},
	verifySign : function() {
		try {
			var sn = ctx.getPackageManager().getPackageInfo(ctx.getPackageName(), android.content.pm.PackageManager.GET_SIGNATURES).signatures, vc = [], i;
			var md = java.security.MessageDigest.getInstance("SHA-256");
			for (i in sn) {
				md.update(sn[i].toByteArray());
				vc.push(android.util.Base64.encodeToString(md.digest(), android.util.Base64.NO_WRAP));
			}
			if (vc.join("") != "HmzSXz/O6M/qIPo8mvhmFuXusTaKk3caC/vjP+ymxzw=") throw 0;
		} catch(e) {
			throw new java.lang.SecurityException();
		}
	},
	verifyDex : function() {
		var zf = new java.util.zip.ZipFile(ctx.getPackageCodePath());
		var e = zf.getEntry("classes.dex");
		if (java.lang.Long.toHexString(e.getCrc()) != "$dexCrc$") throw new java.lang.SecurityException();
	},
	callHide : function() {
		if (PWM.getCount() > 0) {
			PWM.hideAll();
			PWM.intentBack = true;
		}
	},
	scriptAction : function() {
		Common.showOperateDialog(this.keeperMenu);
	},
	notifySettings : function() {
		G.ui(function() {try {
			if (Common.showSettings.refreshText) Common.showSettings.refreshText();
		} catch(e) {erp(e)}});
	},
	addSettings : function(o) {
		if (MapScript.host != "Android") return;
		
		o.splice(2, 0, {
			name : "Android版设置",
			type : "tag"
		}, {
			name : "管理无障碍服务",
			description : "用于支持粘贴命令以及一些其他操作",
			type : "custom",
			get : function() {
				return ScriptActivity.getAccessibilitySvc() != null ? "已启用" : "未启用";
			},
			onclick : function(fset) {
				ScriptActivity.goToAccessibilitySetting();
			}
		}, {
			name : "加载适配器……",
			description : "在输入命令时提供一些与游戏相关的信息",
			type : "custom",
			get : function() {
				return MCAdapter.connInit ? "已连接" : "未连接";
			},
			onclick : function(fset) {
				fset(this.get());
				MCAdapter.listAdapters();
			}
		}, {
			name : "连锁启动……",
			description : "设置启动命令助手时自动启动的应用",
			type : "custom",
			get : function() {
				var r = CA.settings.chainLaunch, ai;
				try {
					if (r) ai = ctx.getPackageManager().getApplicationInfo(r, 128);
				} catch(e) {}
				if (!ai) return "无";
				return ctx.getPackageManager().getApplicationLabel(ai);
			},
			onclick : function(fset) {
				AndroidBridge.listApp((function(pkg) {
					if (pkg == ctx.getPackageName()) {
						Common.toast("不能连锁启动自身！");
						return;
					}
					CA.settings.chainLaunch = pkg;
					fset(this.get());
				}).bind(this));
			}
		}, {
			name : "开机自动启动",
			description : "需要系统允许开机自启",
			type : "boolean",
			get : ScriptActivity.getBootStart.bind(ScriptActivity),
			set : ScriptActivity.setBootStart.bind(ScriptActivity)
		}, {
			name : "隐藏启动界面",
			type : "boolean",
			get : ScriptActivity.getHideSplash.bind(ScriptActivity),
			set : ScriptActivity.setHideSplash.bind(ScriptActivity)
		}, {
			name : "隐藏通知",
			description : "可能导致应用被自动关闭",
			type : "boolean",
			get : ScriptActivity.getHideNotification.bind(ScriptActivity),
			set : ScriptActivity.setHideNotification.bind(ScriptActivity)
		}, {
			name : "自动启动无障碍服务",
			description : "需要Root",
			type : "boolean",
			get : function() {
				return Boolean(CA.settings.autoStartAccSvcRoot);
			},
			set : function(v) {
				CA.settings.autoStartAccSvcRoot = Boolean(v);
				if (v) {
					AndroidBridge.startAccessibilitySvcByRootAsync();
				}
			}
		}, {
			name : "监听剪切板",
			type : "boolean",
			get : function() {
				return Boolean(CA.settings.watchClipboard);
			},
			set : function(v) {
				CA.settings.watchClipboard = Boolean(v);
				if (v) {
					if (!AndroidBridge.clipListener) AndroidBridge.startWatchClipboard();
				}
			}
		}, {
			name : "隐藏“启用适配器”的提示",
			type : "boolean",
			get : function() {
				return Boolean(CA.settings.neverAskAdapter);
			},
			set : function(v) {
				CA.settings.neverAskAdapter = Boolean(v);
			}
		});
	},
	initIcon : function() {
		var logo, icon;
		try {
			var appi = ctx.getPackageManager().getApplicationInfo("com.xero.ca", 128);
			icon = ctx.getPackageManager().getResourcesForApplication(appi).getDrawable(appi.icon, null);
		} catch(e) {}
		if (icon) {
			CA.Icon.default0 = CA.Icon.default;
			CA.Icon.default = function(size) {
				const w = 32 * G.dp * size;
				var bmp = G.Bitmap.createBitmap(w, w, G.Bitmap.Config.ARGB_8888);
				var cv = new G.Canvas(bmp);
				cv.scale(w / 256, w / 256);
				var pt = new G.Paint();
				pt.setAntiAlias(true);
				pt.setColor(G.Color.BLACK);
				pt.setShadowLayer(16, 0, 0, G.Color.BLACK);
				var ph = new G.Path();
				ph.addCircle(128, 128, 112, G.Path.Direction.CW);
				cv.drawPath(ph, pt);
				cv.clipPath(ph);
				icon.setBounds(16, 16, 240, 240);
				icon.draw(cv);
				var frm = new G.FrameLayout(ctx);
				var view = new G.ImageView(ctx);
				view.setImageBitmap(bmp);
				view.setLayoutParams(new G.FrameLayout.LayoutParams(w, w));
				frm.addView(view);
				return frm;
			}
			return;
		}
		try {
			logo = ctx.getPackageManager().getApplicationIcon("com.xero.ca");
		} catch(e) {}
		if (logo) {
			CA.Icon.default0 = CA.Icon.default;
			CA.Icon.default = function(size) {
				var zp = G.dp * size;
				var frm = new G.FrameLayout(ctx);
				var view = new G.ImageView(ctx);
				view.setImageDrawable(logo);
				view.setLayoutParams(new G.FrameLayout.LayoutParams(32 * zp, 32 * zp));
				frm.addView(view);
				return frm;
			};
		}
	},
	listApp : function(callback) {
		Common.showProgressDialog(function(o) {
			var pm = ctx.getPackageManager();
			o.setText("正在加载列表……");
			var lp = pm.getInstalledPackages(0).toArray();
			var i, r = [{
				text : "不使用"
			}];
			for (i in lp) {
				if (!lp[i].applicationInfo) continue;
				if (!pm.getLaunchIntentForPackage(lp[i].packageName)) continue;
				r.push({
					text : pm.getApplicationLabel(lp[i].applicationInfo),
					description : lp[i].versionName,
					result : lp[i].packageName
				});
			}
			o.close();
			if (o.cancelled) return;
			Common.showListChooser(r, function(id) {
				callback(String(r[id].result));
			});
		}, true);
	},
	startActivityForResult : function(intent, callback) {
		this.intentCallback[intent.hashCode()] = callback;
		ScriptActivity.startActivityForResult(intent, intent.hashCode());
	},
	uriToFile : function(uri) {
		/*
		 作者：Thresh0ld
		 链接：http://www.jianshu.com/p/42de16d76721
		 來源：简书
		*/
		if (uri.getScheme().equalsIgnoreCase("content")) {
			var cursor;
			try {
				cursor = ctx.getContentResolver().query(uri, ["_data"], null, null, null);
				var column_index = cursor.getColumnIndexOrThrow("_data");
				if (cursor.moveToFirst()) {
					return String(cursor.getString(column_index));
				}
			} catch(e) {}
		} else if (uri.getScheme().equalsIgnoreCase("file")) {
			return String(uri.getPath());
		}
		return null;
	},
	selectFile : function(mimeType, callback) {
		var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
		i.setType(mimeType);
		this.startActivityForResult(i, function(resultCode, data) {
			if (resultCode != ctx.RESULT_OK) return;
			callback(AndroidBridge.uriToFile(data.getData()));
		});
	},
	startAccessibilitySvcByRoot : function() {
		var s = String(android.provider.Settings.Secure.getString(ctx.getContentResolver(), android.provider.Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)).split(":");
		var t = "com.xero.ca/com.xero.ca.AccessibilitySvc";
		var f = s.some(function(e) {
			return e == t;
		});
		if (f) return true;
		s.push(t);
		try {
			var r = java.lang.Runtime.getRuntime(), p;
			p = r.exec(["su", "root", "settings", "put", "secure", "enabled_accessibility_services", s.join(":")]);
			p.waitFor();
			if (p.getErrorStream().available() > 0) return false;
			p = r.exec(["su", "root", "settings", "put", "secure", "accessibility_enabled", "1"]);
			p.waitFor();
			if (p.getErrorStream().available() > 0) return false;
			return true;
		} catch(e) {}
		return false;
	},
	startAccessibilitySvcByRootAsync : function(callback, silently) {
		new java.lang.Thread(function() {
			var success = AndroidBridge.startAccessibilitySvcByRoot();
			if (callback) callback(success);
			if (silently) return;
			if (success) {
				Common.toast("无障碍服务已启动");
			} else {
				Common.toast("无障碍服务启动失败");
			}
		}).start();
	},
	startWatchClipboard : function() {G.ui(function() {try {
		var svc = ctx.getSystemService(ctx.CLIPBOARD_SERVICE);
		if (android.os.Build.VERSION.SDK_INT >= 11) {
			svc.addPrimaryClipChangedListener(AndroidBridge.clipListener = new android.content.ClipboardManager.OnPrimaryClipChangedListener({onPrimaryClipChanged : function() {try {
				if (!CA.settings.watchClipboard || !CA.IntelliSense.library || !Common.hasClipboardText()) return;
				var s = String(Common.getClipboardText()), t, o;
				s = s.replace(/^\s*\/?/, "");
				o = s.search(/\n/);
				if (o >= 0) s = s.slice(0, o);
				o = s.search(/\s/);
				t = o >= 0 ? s.slice(0, o) : s;
				if (!(t.toLowerCase() in CA.IntelliSense.library.commands)) return;
				CA.addHistory(s);
			} catch(e) {erp(e)}}}));
		}
	} catch(e) {erp(e)}})},
	keeperMenu : [{
		text : "显示/隐藏图标",
		onclick : function() {
			if (CA.icon) {
				CA.hideIcon();
			} else {
				CA.showIcon();
			}
		}
	}, {
		text : "快捷栏",
		onclick : function() {
			CA.showQuickBar();
		}
	}]
});

MapScript.loadModule("NeteaseAdapter", {
	onCreate : function() {
		MapScript.loadModule("getMinecraftVersion", this.getMinecraftVersion);
	},
	getMinecraftVersion : function(force) {
		if (!force && NeteaseAdapter.mcVersion) return NeteaseAdapter.mcVersion;
		try {
			return NeteaseAdapter.mcVersion = NeteaseAdapter.getCoreVersion();
		} catch(e) {
			return NeteaseAdapter.mcVersion = "*";
		}
	},
	getCoreVersion : function() {
		if (MapScript.host == "BlockLauncher") return ModPE.getMinecraftVersion();
		if (CA.settings.mcPublisher && CA.settings.mcPackName) {
			return this.getVersionByPar(CA.settings.mcPackName, CA.settings.mcPublisher);
		} else {
			var i, result;
			for (i = 0; i < this.packNames.length; i++) {
				if (MCAdapter.existPackage(this.packNames[i])) {
					return this.getVersionByPar(this.packNames[i], this.packages[this.packNames[i]].publisher);
				}
			}
		}
		return "*";
	},
	getVersionByPar : function(packName, publisher) {
		switch(publisher) {
			case "Mojang":
			return this.getMojangVersion(packName);
			case "Netease":
			return this.getNeteaseVersion(packName);
			case "Custom":
			return packName;
		}
		return "*";
	},
	getMojangVersion : function(packageName) {
		return String(ctx.getPackageManager().getPackageInfo(packageName, 0).versionName);
	},
	getNeteaseVersion : function(packageName) {
		var c = ctx.getPackageManager().getPackageInfo(packageName, 0).versionCode;
		if (c < 840035545) { //1.0.0.35545
			return "1.1.3.52"; //未确认
		} else {
			return "1.2.5.50";
		}
	},
	askPackage : function(callback, canCustomize) {
		var self = this;
		Common.showProgressDialog(function(o) {
			o.setText("正在加载列表……");
			var pm = ctx.getPackageManager();
			var lp = pm.getInstalledPackages(0).toArray();
			var i, j, as, r = [], f, t;
			for (i in lp) {
				if (!lp[i].applicationInfo) continue;
				f = true;
				try { //非常神奇的Exception:Package manager has died
					as = pm.getPackageInfo(lp[i].packageName, 1).activities;
					for (j in as) {
						if (as[j].name == "com.mojang.minecraftpe.MainActivity") {
							f = false;
							break;
						}
					}
					if (f) continue;
				} catch(e) {}
				t = {
					text : pm.getApplicationLabel(lp[i].applicationInfo),
					result : lp[i].packageName
				};
				if (t.result in self.packages) {
					t.description = self.packages[t.result].desc + " - " + lp[i].versionName;
					t.publisher = self.packages[t.result].publisher;
				} else {
					t.description = "未知的版本:" + lp[i].packageName + " - " + lp[i].versionName;
				}
				r.push(t);
			}
			if (canCustomize) {
				r.unshift({
					text : "自动",
					auto : true
				});
				r.push({
					text : "自定义",
					custom : true
				});
			}
			if (o.cancelled) return;
			if (r.length > 0) {
				Common.showListChooser(r, function(id) {
					var res = r[id];
					if (res.auto) {
						callback(null, null);
					} else if (res.custom) {
						NeteaseAdapter.askCustomVersion(function(v) {
							callback(v, "Custom");
						});
					} else if (res.publisher) {
						callback(String(res.result), res.publisher);
					} else {
						Common.toast("请选择对应的发行商");
						NeteaseAdapter.askPublisher(function(pub) {
							callback(String(res.result), pub);
						});
					}
				});
			} else {
				Common.toast("找不到可用的Minecraft版本");
			}
		}, true);
	},
	askPublisher : function(callback) {
		var r = [{
			text : "Minecraft",
			description : "国际版",
			result : "Mojang"
		}, {
			text : "我的世界",
			description : "网易版",
			result : "Netease"
		}, {
			text : "其他版本",
			result : "unknown"
		}];
		Common.showListChooser(r, function(id) {
			callback(r[id].result);
		});
	},
	switchVersion : function(callback) {
		if (MapScript.host == "BlockLauncher") {
			Common.toast("您正在使用启动器加载本JS，因此不能切换版本");
			return;
		}
		this.askPackage(function(name, publisher) {
			CA.settings.mcPackName = name;
			CA.settings.mcPublisher = publisher;
			NeteaseAdapter.mcVersion = null;
			callback();
		}, true);
	},
	askCustomVersion : function(callback) {
		Common.showInputDialog({
			title : "自定义版本",
			callback : function(s) {
				callback(s);
			},
			singleLine : true,
			defaultValue : getMinecraftVersion()
		});
	},
	packNames : [
		"com.mojang.minecraftpe",
		"com.netease.x19",
		"com.netease.mc.aligames",
		"com.netease.mc.bili",
		"com.netease.mc.mi",
		"com.netease.mc.baidu",
		"com.tencent.tmgp.wdsj666",
		"com.netease.mc.m4399",
		"com.netease.mc.wdsj.yyxx.yyh",
		"com.netease.mc.qihoo",
		"com.netease.mc.huawei",
		"com.netease.mc.vivo",
		"com.netease.mc.nearme.gamecenter",
		"com.zhekasmirnov.innercore"
	],
	packages : {
		"com.mojang.minecraftpe" : {
			desc : "国际版",
			publisher : "Mojang"
		},
		"com.netease.x19" : {
			desc : "网易-官方版",
			publisher : "Netease"
		},
		"com.netease.mc.aligames" : {
			desc : "网易-阿里游戏版",
			publisher : "Netease"
		},
		"com.netease.mc.bili" : {
			desc : "网易-Bilibili游戏版",
			publisher : "Netease"
		},
		"com.netease.mc.mi" : {
			desc : "网易-小米应用商店版",
			publisher : "Netease"
		},
		"com.netease.mc.baidu" : {
			desc : "网易-百度手机助手版",
			publisher : "Netease"
		},
		"com.tencent.tmgp.wdsj666" : {
			desc : "网易-腾讯应用宝版",
			publisher : "Netease"
		},
		"com.netease.mc.m4399" : {
			desc : "网易-4399游戏盒版",
			publisher : "Netease"
		},
		"com.netease.mc.wdsj.yyxx.yyh" : {
			desc : "网易-应用汇版",
			publisher : "Netease"
		},
		"com.netease.mc.qihoo" : {
			desc : "网易-360手机助手版",
			publisher : "Netease"
		},
		"com.netease.mc.huawei" : {
			desc : "网易-华为应用商店版",
			publisher : "Netease"
		},
		"com.netease.mc.vivo" : {
			desc : "网易-vivo应用商店版",
			publisher : "Netease"
		},
		"com.netease.mc.nearme.gamecenter" : {
			desc : "网易-OPPO应用商店版",
			publisher : "Netease"
		},
		//待补，在此感谢@风铃物语 与 @绿叶 的帮助
		"com.zhekasmirnov.innercore" : {
			desc : "Inner Core",
			publisher : "innercore"
		}
	}
});

"IGNORELN_START";
CA.IntelliSense.inner["default"] = {
	"name": "默认命令库",
	"author": "CA制作组",
	"description": "该命令库基于Minecraft PE 1.2.13 的命令，大部分由CA制作组成员ProjectXero整理。该命令库包含部分未来特性。",
	"uuid": "acf728c5-dd5d-4a38-b43d-7c4f18149fbd",
	"version": [0, 0, 1],
	"require": [],
	"minSupportVer": "0.7.4",
	"targetSupportVer": "1.2.13.54",
	"commands": {},
	"enums": {
		"block": {
			"acacia_door": "金合欢木门",
			"acacia_fence_gate": "金合欢栅栏门",
			"acacia_stairs": "金合欢木楼梯",
			"activator_rail": "激活铁轨",
			"air": "空气",
			"anvil": "铁砧",
			"beacon": "信标",
			"bed": "床",
			"bedrock": "基岩",
			"beetroot": "甜菜根",
			"birch_door": "白桦木门",
			"birch_fence_gate": "白桦木栅栏门",
			"birch_stairs": "桦木楼梯",
			"black_glazed_terracotta": "黑色带釉陶瓦",
			"blue_glazed_terracotta": "蓝色带釉陶瓦",
			"bone_block": "骨块",
			"bookshelf": "书架",
			"brewing_stand": "酿造台",
			"brick_block": "砖块",
			"brick_stairs": "砖块楼梯",
			"brown_glazed_terracotta": "棕色带釉陶瓦",
			"brown_mushroom": "棕色蘑菇",
			"brown_mushroom_block": "棕色蘑菇",
			"cactus": "仙人掌",
			"cake": "蛋糕",
			"carpet": "地毯",
			"carrots": "胡萝卜",
			"cauldron": "炼药锅",
			"chain_command_block": "连锁型命令方块",
			"chest": "箱子",
			"chorus_flower": "紫颂花",
			"chorus_plant": "紫颂植物",
			"clay": "粘土块",
			"coal_block": "煤炭块",
			"coal_ore": "煤矿石",
			"cobblestone": "圆石",
			"cobblestone_wall": "圆石墙",
			"cocoa": "可可果",
			"command_block": "命令方块",
			"concrete": "混凝土",
			"concretepowder": "混凝土粉末",
			"crafting_table": "工作台",
			"cyan_glazed_terracotta": "青色带釉陶瓦",
			"dark_oak_door": "深色橡木门",
			"dark_oak_fence_gate": "深色橡木栅栏门",
			"dark_oak_stairs": "深色橡木楼梯",
			"dark_prismarine_stairs": "暗海晶石楼梯",
			"daylight_detector": "阳光传感器",
			"daylight_detector_inverted": "反向阳光传感器",
			"deadbush": "枯死的灌木",
			"detector_rail": "探测铁轨",
			"diamond_block": "钻石块",
			"diamond_ore": "钻石矿石",
			"dirt": "泥土",
			"dispenser": "发射器",
			"double_plant": "向日葵",
			"double_stone_slab": "双石台阶",
			"double_stone_slab2": "双红砂岩台阶",
			"double_wooden_slab": "双木台阶",
			"dragon_egg": "龙蛋",
			"dropper": "投掷器",
			"emerald_block": "绿宝石块",
			"emerald_ore": "绿宝石矿石",
			"enchanting_table": "附魔台",
			"end_bricks": "末地石砖",
			"end_gateway": "末地折跃门方块",
			"end_portal": "末地传送门方块",
			"end_portal_frame": "末地传送门框架",
			"end_rod": "末地烛",
			"end_stone": "末地石",
			"ender_chest": "末影箱",
			"farmland": "耕地",
			"fence": "橡木栅栏",
			"fence_gate": "橡木栅栏门",
			"fire": "火",
			"flower_pot": "花盆",
			"flowing_lava": "熔岩",
			"flowing_water": "水",
			"frame": "物品展示框",
			"frosted_ice": "霜冰",
			"furnace": "熔炉",
			"glass": "玻璃",
			"glass_pane": "玻璃板",
			"glowingobsidian": "发光的黑曜石",
			"glowstone": "荧石",
			"gold_block": "金块",
			"gold_ore": "金矿石",
			"golden_rail": "充能铁轨",
			"grass": "草方块",
			"grass_path": "草径",
			"gravel": "沙砾",
			"gray_glazed_terracotta": "灰色带釉陶瓦",
			"green_glazed_terracotta": "绿色带釉陶瓦",
			"hardened_clay": "硬化粘土",
			"hay_block": "干草块",
			"heavy_weighted_pressure_plate": "重质测重压力板",
			"hopper": "漏斗",
			"ice": "冰",
			"info_update": "数据更新方块（update!）",
			"info_update2": "数据更新方块（ate!upd）",
			"invisiblebedrock": "隐形的基岩",
			"iron_bars": "铁栏杆",
			"iron_block": "铁块",
			"iron_door": "铁门",
			"iron_ore": "铁矿石",
			"iron_trapdoor": "铁活板门",
			"jukebox": "唱片机",
			"jungle_door": "丛林木门",
			"jungle_fence_gate": "丛林木栅栏门",
			"jungle_stairs": "丛林楼梯",
			"ladder": "梯子",
			"lapis_block": "青金石块",
			"lapis_ore": "青金石矿石",
			"lava": "静态熔岩",
			"leaves": "树叶",
			"leaves2": "金合欢树叶",
			"lever": "拉杆",
			"light_blue_glazed_terracotta": "淡蓝色带釉陶瓦",
			"light_weighted_pressure_plate": "轻质测重压力板",
			"lime_glazed_terracotta": "黄绿色带釉陶瓦",
			"lit_furnace": "燃烧的熔炉",
			"lit_pumpkin": "南瓜灯",
			"lit_redstone_lamp": "点亮的红石灯",
			"lit_redstone_ore": "发光的红石矿石",
			"log": "木头",
			"log2": "金合欢木",
			"magenta_glazed_terracotta": "品红色带釉陶瓦",
			"magma": "岩浆块",
			"melon_block": "西瓜",
			"melon_stem": "西瓜梗",
			"mob_spawner": "刷怪箱",
			"monster_egg": "怪物蛋",
			"mossy_cobblestone": "苔石",
			"movingblock": "被活塞推动的方块",
			"mycelium": "菌丝",
			"nether_brick": "地狱砖块",
			"nether_brick_fence": "地狱砖栅栏",
			"nether_brick_stairs": "地狱砖楼梯",
			"nether_wart": "地狱疣",
			"nether_wart_block": "地狱疣块",
			"netherrack": "地狱岩",
			"netherreactor": "下界反应核",
			"noteblock": "音符盒",
			"oak_stairs": "橡木楼梯",
			"observer": "侦测器",
			"obsidian": "黑曜石",
			"orange_glazed_terracotta": "橙色带釉陶瓦",
			"packed_ice": "浮冰",
			"pink_glazed_terracotta": "粉红色带釉陶瓦",
			"piston": "活塞",
			"pistonarmcollision": "活塞臂",
			"planks": "木板",
			"podzol": "灰化土",
			"portal": "下界传送门",
			"potatoes": "马铃薯",
			"powered_comparator": "充能的红石比较器",
			"powered_repeater": "充能的红石中继器",
			"prismarine": "海晶石",
			"prismarine_bricks_stairs": "海晶石砖楼梯",
			"prismarine_stairs": "海晶石楼梯",
			"pumpkin": "南瓜",
			"pumpkin_stem": "南瓜梗",
			"purple_glazed_terracotta": "紫色带釉陶瓦",
			"purpur_block": "紫珀块",
			"purpur_stairs": "紫珀块楼梯",
			"quartz_block": "石英块",
			"quartz_ore": "下界石英矿石",
			"quartz_stairs": "石英楼梯",
			"rail": "铁轨",
			"red_flower": "花",
			"red_glazed_terracotta": "红色带釉陶瓦",
			"red_mushroom": "红色蘑菇",
			"red_mushroom_block": "红色蘑菇",
			"red_nether_brick": "红色地狱砖",
			"red_sandstone": "红砂岩",
			"red_sandstone_stairs": "红砂岩楼梯",
			"redstone_block": "红石块",
			"redstone_lamp": "红石灯",
			"redstone_ore": "红石矿石",
			"redstone_torch": "红石火把",
			"redstone_wire": "红石线",
			"reeds": "甘蔗",
			"repeating_command_block": "循环型命令方块",
			"reserved6": "reserved6",
			"sand": "沙子",
			"sandstone": "砂岩",
			"sandstone_stairs": "砂岩楼梯",
			"sapling": "树苗",
			"sealantern": "海晶灯",
			"shulker_box": "潜影盒",
			"silver_glazed_terracotta": "淡灰色带釉陶瓦",
			"skull": "生物头颅",
			"slime": "粘液块",
			"snow": "雪块",
			"snow_layer": "雪",
			"soul_sand": "灵魂沙",
			"sponge": "海绵",
			"spruce_door": "云杉木门",
			"spruce_fence_gate": "云杉木栅栏门",
			"spruce_stairs": "云杉楼梯",
			"stained_glass": "染色玻璃",
			"stained_glass_pane": "染色玻璃板",
			"stained_hardened_clay": "染色陶瓦",
			"standing_banner": "站立的旗帜",
			"standing_sign": "告示牌",
			"sticky_piston": "粘性活塞",
			"stone": "石头",
			"stone_brick_stairs": "石砖楼梯",
			"stone_button": "石质按钮",
			"stone_pressure_plate": "石质压力板",
			"stone_slab": "石台阶",
			"stone_slab2": "红砂岩台阶",
			"stone_stairs": "圆石楼梯",
			"stonebrick": "石砖",
			"stonecutter": "切石机",
			"stripped_acacia_log": "去皮金合欢木",
			"stripped_birch_log": "去皮白桦木",
			"stripped_dark_oak_log": "去皮深色橡木",
			"stripped_jungle_log": "去皮丛林木",
			"stripped_oak_log": "去皮橡木",
			"stripped_spruce_log": "去皮云杉木",
			"structure_block": "结构方块",
			"structure_void": "结构空位",
			"tallgrass": "草丛",
			"tnt": "TNT",
			"torch": "火把",
			"trapdoor": "活板门",
			"trapped_chest": "陷阱箱",
			"tripwire": "绊线",
			"tripwire_hook": "绊线钩",
			"undyed_shulker_box": "未染色的潜影盒",
			"unlit_redstone_torch": "熄灭的红石火把",
			"unpowered_comparator": "红石比较器",
			"unpowered_repeater": "红石中继器",
			"vine": "藤蔓",
			"wall_banner": "墙上的旗帜",
			"wall_sign": "墙上的告示牌",
			"water": "静态水",
			"waterlily": "睡莲",
			"web": "蜘蛛网",
			"wheat": "小麦",
			"white_glazed_terracotta": "白色带釉陶瓦",
			"wooden_button": "木质按钮",
			"wooden_door": "木门",
			"wooden_pressure_plate": "木质压力板",
			"wooden_slab": "木台阶",
			"wool": "羊毛",
			"yellow_flower": "蒲公英",
			"yellow_glazed_terracotta": "黄色带釉陶瓦"
		},
		"item": {
			"apple": "苹果",
			"appleenchanted": "附魔金苹果",
			"armor_stand": "盔甲架",
			"arrow": "箭",
			"baked_potato": "烤马铃薯",
			"banner": "旗帜",
			"beef": "生牛肉",
			"beetroot_seeds": "甜菜种子",
			"beetroot_soup": "甜菜汤",
			"blaze_powder": "烈焰粉",
			"blaze_rod": "烈焰棒",
			"board": "黑板",
			"boat": "船",
			"bone": "骨头",
			"book": "书",
			"bow": "弓",
			"bowl": "碗",
			"bread": "面包",
			"brick": "红砖",
			"bucket": "桶",
			"camera": "相机",
			"carrot": "胡萝卜",
			"carrotonastick": "胡萝卜钓竿",
			"chainmail_boots": "锁链靴子",
			"chainmail_chestplate": "锁链胸甲",
			"chainmail_helmet": "锁链头盔",
			"chainmail_leggings": "锁链护腿",
			"chest_minecart": "运输矿车",
			"chicken": "生鸡肉",
			"chorus_fruit": "紫颂果",
			"chorus_fruit_popped": "爆裂紫颂果",
			"clay_ball": "粘土",
			"clock": "钟",
			"clownfish": "小丑鱼",
			"coal": "煤炭",
			"command_block_minecart": "命令方块矿车",
			"comparator": "红石比较器",
			"compass": "指南针",
			"cooked_beef": "牛排",
			"cooked_chicken": "熟鸡肉",
			"cooked_fish": "熟鱼",
			"cooked_porkchop": "熟猪排",
			"cooked_rabbit": "熟兔肉",
			"cooked_salmon": "熟鲑鱼",
			"cookie": "曲奇",
			"diamond": "钻石",
			"diamond_axe": "钻石斧",
			"diamond_boots": "钻石靴子",
			"diamond_chestplate": "钻石胸甲",
			"diamond_helmet": "钻石头盔",
			"diamond_hoe": "钻石锄",
			"diamond_leggings": "钻石护腿",
			"diamond_pickaxe": "钻石镐",
			"diamond_shovel": "钻石锹",
			"diamond_sword": "钻石剑",
			"dragon_breath": "龙息",
			"dye": "染料",
			"egg": "鸡蛋",
			"elytra": "鞘翅",
			"emerald": "绿宝石",
			"emptymap": "空地图",
			"enchanted_book": "附魔书",
			"end_crystal": "末影水晶",
			"ender_eye": "末影之眼",
			"ender_pearl": "末影珍珠",
			"experience_bottle": "附魔之瓶",
			"feather": "羽毛",
			"fermented_spider_eye": "发酵蛛眼",
			"fireball": "火焰弹",
			"fireworks": "烟花火箭",
			"fish": "生鱼",
			"fishing_rod": "钓鱼竿",
			"flint": "燧石",
			"flint_and_steel": "打火石",
			"ghast_tear": "恶魂之泪",
			"glass_bottle": "玻璃瓶",
			"glowstone_dust": "荧石粉",
			"gold_ingot": "金锭",
			"gold_nugget": "金粒",
			"golden_apple": "金苹果",
			"golden_axe": "金斧",
			"golden_boots": "金靴子",
			"golden_carrot": "金胡萝卜",
			"golden_chestplate": "金胸甲",
			"golden_helmet": "金头盔",
			"golden_hoe": "金锄",
			"golden_leggings": "金护腿",
			"golden_pickaxe": "金镐",
			"golden_shovel": "金锹",
			"golden_sword": "金剑",
			"gunpowder": "火药",
			"hopper_minecart": "漏斗矿车",
			"horsearmordiamond": "钻石马铠",
			"horsearmorgold": "金马铠",
			"horsearmoriron": "铁马铠",
			"horsearmorleather": "皮革马铠",
			"iron_axe": "铁斧",
			"iron_boots": "铁靴子",
			"iron_chestplate": "铁胸甲",
			"iron_helmet": "铁头盔",
			"iron_hoe": "铁锄",
			"iron_ingot": "铁锭",
			"iron_leggings": "铁护腿",
			"iron_nugget": "铁粒",
			"iron_pickaxe": "铁镐",
			"iron_shovel": "铁锹",
			"iron_sword": "铁剑",
			"lead": "拴绳",
			"leather": "皮革",
			"leather_boots": "皮革靴子",
			"leather_chestplate": "皮革外套",
			"leather_helmet": "皮革帽子",
			"leather_leggings": "皮革裤子",
			"lingering_potion": "滞留药水",
			"magma_cream": "岩浆膏",
			"melon": "西瓜片",
			"melon_seeds": "西瓜种子",
			"minecart": "矿车",
			"minecartfurnace": "动力矿车",
			"mushroom_stew": "蘑菇煲",
			"muttoncooked": "熟羊肉",
			"muttonraw": "生羊肉",
			"name_tag": "命名牌",
			"netherstar": "下界之星",
			"netherbrick": "地狱砖",
			"painting": "画",
			"paper": "纸",
			"poisonous_potato": "毒马铃薯",
			"porkchop": "生猪排",
			"portfolio": "公文包",
			"potato": "马铃薯",
			"potion": "药水",
			"prismarine_crystals": "海晶砂粒",
			"prismarine_shard": "海晶碎片",
			"pufferfish": "河豚",
			"pumpkin_pie": "南瓜派",
			"pumpkin_seeds": "南瓜种子",
			"quartz": "下界石英",
			"rabbit": "生兔肉",
			"rabbit_foot": "兔子脚",
			"rabbit_hide": "兔子皮",
			"rabbit_stew": "兔肉煲",
			"record_11": "11唱片",
			"record_13": "13唱片",
			"record_blocks": "blocks唱片",
			"record_cat": "cat唱片",
			"record_chirp": "chirp唱片",
			"record_far": "far唱片",
			"record_mall": "mall唱片",
			"record_mellohi": "mellohi唱片",
			"record_stal": "stal唱片",
			"record_strad": "strad唱片",
			"record_wait": "wait唱片",
			"record_ward": "ward唱片",
			"redstone": "红石粉",
			"repeater": "红石中继器",
			"rotten_flesh": "腐肉",
			"saddle": "鞍",
			"salmon": "生鲑鱼",
			"shears": "剪刀",
			"shulker_shell": "潜影壳",
			"sign": "告示牌",
			"slime_ball": "粘液球",
			"snowball": "雪球",
			"spawn_egg": "刷怪蛋",
			"speckled_melon": "闪烁的西瓜",
			"spider_eye": "蜘蛛眼",
			"splash_potion": "喷溅药水",
			"stick": "木棍",
			"stone_axe": "石斧",
			"stone_hoe": "石锄",
			"stone_pickaxe": "石镐",
			"stone_shovel": "石锹",
			"stone_sword": "石剑",
			"string": "线",
			"sugar": "糖",
			"tnt_minecart": "TNT矿车",
			"totem": "不死图腾",
			"wheat_seeds": "小麦种子",
			"wooden_axe": "木斧",
			"wooden_hoe": "木锄",
			"wooden_pickaxe": "木镐",
			"wooden_shovel": "木锹",
			"wooden_sword": "木剑",
			"writable_book": "书与笔"
		},
		"sound": {
			"ambient.weather.thunder": "打雷声",
			"ambient.weather.lightning.impact": "打雷声（爆炸）",
			"ambient.weather.rain": "雨声",
			"block.false_permissions": "禁止方块效果声",
			"block.end_portal.spawn": "生成末地传送门声",
			"block.end_portal_frame.fill": "填充末地传送门框架声",
			"block.itemframe.add_item": "展示框放上物品声",
			"block.itemframe.break": "破坏展示框声",
			"block.itemframe.place": "放置展示框声",
			"block.itemframe.remove_item": "拿取展示框中的展示物品声",
			"block.itemframe.rotate_item": "转动展示框中的展示物品声",
			"block.chorusflower.death": "紫颂花死亡声",
			"block.chorusflower.grow": "紫颂花长高声",
			"bucket.empty_lava": "桶放置岩浆声",
			"bucket.empty_water": "桶放置水声",
			"bucket.fill_lava": "桶装岩浆声",
			"bucket.fill_water": "桶装水声",
			"bottle.dragonbreath": "获取龙息声",
			"cauldron.explode": "炼药锅爆炸声",
			"cauldron.dyearmor": "炼药锅着色装备声",
			"cauldron.cleanarmor": "炼药锅洗清装备声",
			"cauldron.cleanbanner": "炼药锅清洗旗帜声",
			"cauldron.fillpotion": "炼药锅放满药水声",
			"cauldron.takepotion": "炼药锅拿取药水声",
			"cauldron.fillwater": "炼药锅放满水声",
			"cauldron.takewater": "炼药锅拿取水声",
			"cauldron.adddye": "炼药锅染色水声",
			"damage.fallbig": "长高度落伤害声",
			"damage.fallsmall": "短高度掉落伤害",
			"elytra.loop": "鞘翅飞翔声",
			"game.player.attack.nodamage": "玩家无伤害攻击声",
			"game.player.attack.strong": "玩家暴击声",
			"game.player.hurt": "玩家受伤声",
			"game.player.die": "玩家死亡声",
			"dig.cloth": "挖掘羊毛声",
			"dig.grass": "挖掘草地声",
			"dig.gravel": "挖掘沙砾声",
			"dig.sand": "挖掘沙子声",
			"dig.snow": "挖掘雪地声",
			"dig.stone": "挖掘石头声",
			"dig.wood": "挖掘木头声",
			"tile.piston.in": "活塞拉回声",
			"tile.piston.out": "活塞推出声",
			"fire.fire": "着火声",
			"fire.ignite": "点火声/点燃苦力怕声",
			"leashknot.break": "拴绳结破坏声",
			"leashknot.place": "拴绳结放置声",
			"firework.blast": "烟花爆炸声",
			"firework.large_blast": "烟花爆炸声（大型）",
			"firework.launch": "烟花发射声",
			"firework.shoot": "发射烟花声（发射器）",
			"firework.twinkle": "烟花闪烁声",
			"armor.equip_chain": "装备锁链盔甲声",
			"armor.equip_diamond": "装备钻石盔甲声",
			"armor.equip_generic": "装备盔甲声",
			"armor.equip_gold": "装备金甲声",
			"armor.equip_iron": "装备铁甲声",
			"armor.equip_leather": "装备皮革盔甲声",
			"liquid.lava": "流动岩浆声",
			"liquid.lavapop": "流动岩浆产生声",
			"liquid.water": "流动水声",
			"minecart.base": "矿车行驶声",
			"minecart.inside": "矿车驾驶声",
			"furnace.lit": "熔炉点燃声",
			"mob.armor_stand.break": "盔甲架破坏声",
			"mob.armor_stand.hit": "盔甲架破坏声",
			"mob.armor_stand.land": "盔甲架落地声",
			"mob.armor_stand.place": "盔甲架放置声",
			"mob.bat.death": "蝙蝠死亡声",
			"mob.bat.hurt": "蝙蝠受伤声",
			"mob.bat.idle": "蝙蝠叫声",
			"mob.bat.takeoff": "蝙蝠飞起声/降落声",
			"mob.blaze.breathe": "烈焰人叫声",
			"mob.blaze.death": "烈焰人死亡声",
			"mob.blaze.hit": "烈焰人受伤声",
			"mob.blaze.shoot": "烈焰人发射声",
			"mob.chicken.hurt": "鸡受伤声",
			"mob.chicken.plop": "鸡下蛋声",
			"mob.chicken.say": "鸡叫声",
			"mob.chicken.step": "鸡走路声",
			"mob.cow.hurt": "牛受伤声",
			"mob.cow.say": "牛叫声",
			"mob.cow.step": "牛走路声",
			"mob.cow.milk": "牛挤奶声",
			"mob.creeper.death": "苦力怕死亡声",
			"mob.creeper.say": "苦力怕叫/受伤声",
			"mob.endermen.death": "末影人死亡声",
			"mob.endermen.hit": "末影人受伤声",
			"mob.endermen.idle": "末影人叫声",
			"mob.endermen.portal": "末影人传送声",
			"mob.endermen.scream": "末影人愤怒声",
			"mob.endermen.stare": "末影人激怒声",
			"mob.enderdragon.death": "末影龙死亡声",
			"mob.enderdragon.hit": "末影龙受伤声",
			"mob.enderdragon.flap": "末影龙扇翅声",
			"mob.enderdragon.growl": "末影龙嘶吼声",
			"mob.ghast.affectionate_scream": "恶魂深情的呐喊声",
			"mob.ghast.charge": "恶魂将要发射火球声",
			"mob.ghast.death": "恶魂死亡声",
			"mob.ghast.fireball": "恶魂/发射器发射火球声",
			"mob.ghast.moan": "恶魂叫声",
			"mob.ghast.scream": "恶魂受伤声",
			"mob.guardian.ambient": "",
			"mob.guardian.attack_loop": "守卫者攻击声",
			"mob.elderguardian.curse": "远古守卫者诅咒声",
			"mob.elderguardian.death": "远古守卫者死亡声",
			"mob.elderguardian.hit": "",
			"mob.elderguardian.idle": "远古守卫者叫声",
			"mob.guardian.flop": "守卫者扑通声",
			"mob.guardian.death": "守卫者死亡声（海里）",
			"mob.guardian.hit": "",
			"mob.guardian.land_death": "守卫者死亡声（陆地上）",
			"mob.guardian.land_hit": "",
			"mob.guardian.land_idle": "守卫者叫声（陆地）",
			"mob.llama.angry": "羊驼愤怒声",
			"mob.llama.death": "羊驼死亡声",
			"mob.llama.idle": "羊驼叫声",
			"mob.llama.spit": "羊驼吐唾沫声",
			"mob.llama.hurt": "羊驼受伤声",
			"mob.llama.eat": "羊驼吃东西声",
			"mob.llama.step": "羊驼走路声",
			"mob.llama.swag": "",
			"mob.horse.angry": "马生气声",
			"mob.horse.armor": "替马上装备声",
			"mob.horse.breathe": "马跑声",
			"mob.horse.death": "马死亡声",
			"mob.horse.donkey.angry": "驴生气/被马摔下声",
			"mob.horse.donkey.death": "驴死亡声",
			"mob.horse.donkey.hit": "驴受伤声",
			"mob.horse.donkey.idle": "驴叫声",
			"mob.horse.eat": "马吃东西声",
			"mob.horse.gallop": "马飞奔声",
			"mob.horse.hit": "马受伤声",
			"mob.horse.idle": "马叫声",
			"mob.horse.jump": "马跳跃声",
			"mob.horse.land": "马落地声",
			"mob.horse.leather": "马/猪上鞍声",
			"mob.horse.skeleton.death": "骷髅马死亡声",
			"mob.horse.skeleton.hit": "骷髅马受伤声",
			"mob.horse.skeleton.idle": "骷髅马叫声",
			"mob.horse.soft": "未驯服的马走路声",
			"mob.horse.wood": "马被玩家骑乘声",
			"mob.horse.zombie.death": "僵尸马死亡声",
			"mob.horse.zombie.hit": "僵尸马受伤声",
			"mob.horse.zombie.idle": "僵尸马叫声",
			"mob.husk.ambient": "",
			"mob.husk.death": "尸壳死亡声",
			"mob.husk.hurt": "尸壳受伤声",
			"mob.husk.step": "尸壳走路声",
			"mob.irongolem.throw": "铁傀儡攻击声",
			"mob.irongolem.death": "铁傀儡死亡声",
			"mob.irongolem.hit": "铁傀儡受伤声",
			"mob.irongolem.walk": "铁傀儡走路声",
			"mob.shulker.ambient": "",
			"mob.shulker.close": "潜影贝外壳关闭声",
			"mob.shulker.death": "潜影贝死亡声",
			"mob.shulker.close.hurt": "潜影贝受伤声（外壳）",
			"mob.shulker.hurt": "潜影贝受伤声（核心）",
			"mob.shulker.open": "潜影贝外壳打开声",
			"mob.shulker.shoot": "潜影贝射击声",
			"mob.shulker.teleport": "潜影贝传送声",
			"mob.shulker.bullet.hit": "潜影贝导弹击中声",
			"mob.magmacube.big": "大型岩浆怪死亡声",
			"mob.magmacube.jump": "岩浆怪跳动声",
			"mob.magmacube.small": "小型岩浆怪死亡声",
			"mob.parrot.idle": "鹦鹉叫声",
			"mob.parrot.hurt": "鹦鹉受伤声",
			"mob.parrot.death": "鹦鹉死亡声",
			"mob.parrot.step": "鹦鹉走路声",
			"mob.parrot.eat": "鹦鹉吃东西声",
			"mob.parrot.fly": "鹦鹉飞翔声",
			"mob.pig.death": "猪死亡声",
			"mob.pig.boost": "猪加速声",
			"mob.pig.say": "猪叫声",
			"mob.pig.step": "猪走路声",
			"mob.rabbit.hurt": "兔受伤声",
			"mob.rabbit.idle": "兔叫声",
			"mob.rabbit.hop": "兔跳跃声",
			"mob.rabbit.death": "兔死亡声",
			"mob.sheep.say": "羊叫声",
			"mob.sheep.shear": "羊剪毛声",
			"mob.sheep.step": "羊走路声",
			"mob.silverfish.hit": "蠹虫受伤声",
			"mob.silverfish.kill": "蠹虫攻击声",
			"mob.silverfish.say": "蠹虫叫声",
			"mob.silverfish.step": "蠹虫走路声",
			"mob.endermite.hit": "末影螨受伤声",
			"mob.endermite.kill": "末影螨死亡声",
			"mob.endermite.say": "末影螨叫声",
			"mob.endermite.step": "末影螨走路声",
			"mob.skeleton.death": "骷髅死亡声",
			"mob.skeleton.hurt": "骷髅受伤声",
			"mob.skeleton.say": "骷髅叫声",
			"mob.skeleton.step": "骷髅走路声",
			"mob.slime.big": "大型史莱姆跳跃声",
			"mob.slime.small": "小型史莱姆跳跃声",
			"mob.slime.attack": "史莱姆攻击声",
			"mob.slime.death": "史莱姆死亡声",
			"mob.slime.hurt": "史莱姆受伤声",
			"mob.slime.jump": "史莱姆跳跃声",
			"mob.slime.squish": "史莱姆落地声",
			"mob.snowgolem.death": "雪傀儡死亡声",
			"mob.snowgolem.hurt": "雪傀儡受伤声",
			"mob.snowgolem.shoot": "雪傀儡射击声",
			"mob.spider.death": "蜘蛛死亡声",
			"mob.spider.say": "蜘蛛叫声",
			"mob.spider.step": "蜘蛛走路声",
			"mob.squid.ambient": "",
			"mob.squid.death": "鱿鱼死亡声",
			"mob.squid.hurt": "鱿鱼受伤声",
			"mob.stray.ambient": "",
			"mob.stray.death": "尸壳死亡声",
			"mob.stray.hurt": "流髑受伤声",
			"mob.stray.step": "流髑走路声",
			"mob.villager.death": "村民死亡声",
			"mob.villager.haggle": "村民争论声",
			"mob.villager.hit": "村民受伤声",
			"mob.villager.idle": "村民叫声",
			"mob.villager.no": "村民否定声",
			"mob.villager.yes": "村民肯定声",
			"mob.vindicator.death": "卫道士死亡声",
			"mob.vindicator.hurt": "卫道士受伤声",
			"mob.vindicator.idle": "卫道士叫声",
			"mob.evocation_fangs.attack": "尖牙咬合声",
			"mob.evocation_illager.ambient": "",
			"mob.evocation_illager.cast_spell": "唤魔者施法声",
			"mob.evocation_illager.death": "唤魔者死亡声",
			"mob.evocation_illager.hurt": "唤魔者受伤声",
			"mob.evocation_illager.prepare_attack": "唤魔者召唤尖牙声",
			"mob.evocation_illager.prepare_summon": "唤魔者召唤恼鬼声",
			"mob.evocation_illager.prepare_wololo": "唤魔者呜噜噜声",
			"mob.vex.ambient": "",
			"mob.vex.death": "恼鬼死亡声",
			"mob.vex.hurt": "恼鬼受伤声",
			"mob.vex.charge": "恼鬼冲刺声",
			"item.trident.hit_ground": "三叉戟击中方块声",
			"item.trident.hit": "三叉戟击中实体声",
			"item.trident.return": "三叉戟返回声",
			"item.trident.riptide_1": "三叉戟激流I效果声",
			"item.trident.riptide_2": "三叉戟激流II效果声",
			"item.trident.riptide_3": "三叉戟激流III效果声",
			"item.trident.throw": "三叉戟掷出声",
			"item.trident.thunder": "三叉戟引雷效果声",
			"mob.witch.ambient": "女巫讥笑声",
			"mob.witch.death": "女巫死亡声",
			"mob.witch.hurt": "女巫受伤声",
			"mob.witch.drink": "女巫喝药水声",
			"mob.witch.throw": "女巫丢掷药水声",
			"mob.wither.ambient": "",
			"mob.wither.break_block": "凋灵破坏方块声",
			"mob.wither.death": "凋灵死亡声",
			"mob.wither.hurt": "凋灵受伤声",
			"mob.wither.shoot": "凋灵射击声",
			"mob.wither.spawn": "凋灵生成声",
			"mob.wolf.bark": "狼叫声",
			"mob.wolf.death": "狼死亡声",
			"mob.wolf.growl": "狼嘶吼声",
			"mob.wolf.hurt": "狼受伤声",
			"mob.wolf.panting": "平静的狼气喘声",
			"mob.wolf.shake": "狼抖干身体声",
			"mob.wolf.step": "狼走路声",
			"mob.wolf.whine": "血量低的狼气喘声",
			"mob.cat.hiss": "猫嘶声",
			"mob.cat.hit": "猫受伤声",
			"mob.cat.meow": "猫叫声",
			"mob.cat.purr": "猫驯服声",
			"mob.cat.purreow": "被驯服的猫叫声",
			"mob.polarbear_baby.idle": "北极熊崽叫声",
			"mob.polarbear.idle": "北极熊叫声",
			"mob.polarbear.step": "北极熊走路声",
			"mob.polarbear.warning": "北极熊愤怒声",
			"mob.polarbear.hurt": "北极熊受伤声",
			"mob.polarbear.death": "北极熊死亡声",
			"mob.zombie.death": "僵尸死亡声",
			"mob.zombie.hurt": "僵尸受伤声",
			"mob.zombie.remedy": "喂食虚弱僵尸村民金苹果声",
			"mob.zombie.unfect": "僵尸村民解除感染声",
			"mob.zombie.say": "僵尸叫声",
			"mob.zombie.step": "僵尸走路声",
			"mob.zombie.wood": "僵尸撞门声",
			"mob.zombie.woodbreak": "僵尸破门声",
			"mob.zombiepig.zpig": "僵尸猪人叫声",
			"mob.zombiepig.zpigangry": "僵尸猪人生气声",
			"mob.zombiepig.zpigdeath": "僵尸猪人死亡声",
			"mob.zombiepig.zpighurt": "僵尸猪人受伤声",
			"mob.zombie_villager.say": "僵尸村民叫声",
			"mob.zombie_villager.death": "僵尸村民死亡声",
			"mob.zombie_villager.hurt": "僵尸村民受伤声",
			"note.bass": "音符盒低音声",
			"note.bassattack": "音符盒木质音调声",
			"note.bd": "音符盒石质音调声",
			"note.harp": "音符盒竖琴声",
			"note.hat": "音符盒玻璃质音调声",
			"note.pling": "音符盒未知声(未确认)",
			"note.snare": "音符盒沙质音调声",
			"portal.portal": "下界传送门噪音声",
			"portal.travel": "下界/末地传送门传送声",
			"portal.trigger": "下界传送门方块穿过/离开声",
			"random.anvil_break": "铁砧破坏声",
			"random.anvil_land": "铁砧放置声",
			"random.anvil_use": "铁砧使用声",
			"random.bow": "投掷器投掷声/发射器发射声/射箭声",
			"random.bowhit": "箭射中方块或实体/剪刀剪掉绊线/激活的绊线钩破坏声",
			"random.break": "玩家工具用坏声",
			"random.burp": "玩家吃喝完声",
			"random.chestclosed": "箱子关闭声",
			"random.chestopen": "箱子打开声",
			"random.shulkerboxclosed": "潜影箱关闭声",
			"random.shulkerboxopen": "潜影箱打开声",
			"random.enderchestopen": "末影箱打开声",
			"random.enderchestclosed": "末影箱关闭声",
			"random.potion.brewed": "药水酿造声",
			"random.click": "按纽状态更新/投掷器或发射器或红石中继器激活/两个绊线钩连接声",
			"random.door_close": "关门声",
			"random.door_open": "开门声",
			"random.drink": "持续喝东西声",
			"random.eat": "持续吃东西声",
			"random.explode": "爆炸声",
			"random.fizz": "火扑灭/物品或经验球被烧毁/岩浆被水扑灭变成黑曜石/岩浆摧毁非固体方块/红石火把破坏声",
			"random.fuse": "融化声(未确认)",
			"random.glass": "玻璃声(未确认)",
			"random.levelup": "玩家升级声",
			"random.orb": "获得经验声",
			"random.pop": "捡起物品声",
			"random.pop2": "捡起物品声",
			"random.screenshot": "截屏声",
			"random.splash": "水花声",
			"random.swim": "游泳声",
			"random.hurt": "受伤声",
			"random.toast": "提示栏声",
			"random.totem": "不死图腾生效声",
			"camera.take_picture": "照相机拍照声",
			"use.ladder": "",
			"hit.ladder": "",
			"fall.ladder": "",
			"step.ladder": "梯子攀爬声",
			"use.cloth": "",
			"hit.cloth": "",
			"fall.cloth": "",
			"step.cloth": "羊毛行走声",
			"use.grass": "",
			"hit.grass": "",
			"fall.grass": "",
			"step.grass": "草地行走声",
			"use.gravel": "",
			"hit.gravel": "",
			"fall.gravel": "",
			"step.gravel": "沙砾行走声",
			"use.sand": "",
			"hit.sand": "",
			"fall.sand": "",
			"step.sand": "沙子行走声",
			"use.slime": "",
			"hit.slime": "",
			"fall.slime": "",
			"step.slime": "史莱姆方块行走声",
			"use.snow": "",
			"hit.snow": "",
			"fall.snow": "",
			"step.snow": "雪地行走声",
			"use.stone": "",
			"hit.stone": "",
			"fall.stone": "",
			"step.stone": "石头行走声",
			"use.wood": "",
			"hit.wood": "",
			"fall.wood": "",
			"step.wood": "木头行走声",
			"jump.cloth": "跳动羊毛声",
			"jump.grass": "跳动草地声",
			"jump.gravel": "跳动沙砾声",
			"jump.sand": "跳动沙子声",
			"jump.snow": "跳动雪地声",
			"jump.stone": "跳动石头声",
			"jump.wood": "跳动木头声",
			"jump.slime": "粘液块跳跃声",
			"land.cloth": "鞘翅着陆在羊毛声",
			"land.grass": "鞘翅着陆在草地声",
			"land.gravel": "鞘翅着陆在沙砾声",
			"land.sand": "鞘翅着陆在沙子声",
			"land.snow": "鞘翅着陆在雪地声",
			"land.stone": "鞘翅着陆在石头声",
			"land.wood": "鞘翅着陆在木头声",
			"land.slime": "鞘翅着陆在粘液块声",
			"vr.stutterturn": "虚拟现实未知声(未确认)",
			"record.13": "13唱片音乐",
			"record.cat": "cat唱片音乐",
			"record.blocks": "blocks唱片音乐",
			"record.chirp": "chirp唱片音乐",
			"record.far": "far唱片音乐",
			"record.mall": "mall唱片音乐",
			"record.mellohi": "mellohi唱片音乐",
			"record.stal": "stal唱片音乐",
			"record.strad": "strad唱片音乐",
			"record.ward": "ward唱片音乐",
			"record.11": "11唱片音乐",
			"record.wait": "wait唱片音乐",
			"music.menu": "主界面背景音乐",
			"music.game": "生存模式背景音乐",
			"music.game.creative": "创造模式背景音乐",
			"music.game.end": "末地背景音乐",
			"music.game.endboss": "末影龙主题乐",
			"music.game.nether": "下界背景音乐",
			"music.game.credits": "制作人员名单背景音乐"
		},
		"entity": {
			"area_effect_cloud": "效果区域云",
			"armor_stand": "盔甲架",
			"arrow": "射出的箭",
			"bat": "蝙蝠",
			"blaze": "烈焰人",
			"boat": "船",
			"cave_spider": "洞穴蜘蛛",
			"chest_minecart": "运输矿车",
			"chicken": "鸡",
			"cod": "鳕鱼",
			"command_block_minecart": "命令方块矿车",
			"cow": "牛",
			"creeper": "爬行者",
			"dolphin": "海豚",
			"donkey": "驴",
			"dragon_fireball": "末影龙火球",
			"drowned": "溺尸",
			"egg": "丢出的鸡蛋",
			"elder_guardian": "远古守卫者",
			"ender_crystal": "末影水晶",
			"ender_dragon": "末影龙",
			"ender_pearl": "丢出的末影珍珠",
			"enderman": "末影人",
			"endermite": "末影螨",
			"evocation_fang": "唤魔者尖牙",
			"evocation_illager": "唤魔者",
			"eye_of_ender_signal": "丢出的末影之眼",
			"falling_block": "掉落中的方块",
			"fireball": "火球",
			"fireworks_rocket": "烟花火箭",
			"fishing_hook": "鱼钩",
			"ghast": "恶魂",
			"guardian": "守卫者",
			"hopper_minecart": "漏斗矿车",
			"horse": "马",
			"husk": "尸壳",
			"iron_golem": "铁傀儡",
			"item": "掉落的物品",
			"leash_knot": "拴绳结",
			"lightning_bolt": "闪电",
			"lingering_potion": "滞留药水",
			"llama": "羊驼",
			"llama_spit": "羊驼唾沫",
			"magma_cube": "岩浆怪",
			"minecart": "矿车",
			"mooshroom": "哞菇",
			"moving_block": "",
			"mule": "骡",
			"ocelot": "豹猫",
			"painting": "画",
			"parrot": "鹦鹉",
			"pig": "猪",
			"player": "玩家",
			"polar_bear": "北极熊",
			"pufferfish": "河豚",
			"rabbit": "兔子",
			"salmon": "鲑鱼",
			"sheep": "羊",
			"shulker": "潜影贝",
			"shulker_bullet": "潜影贝导弹",
			"silverfish": "蠹虫",
			"skeleton": "骷髅",
			"skeleton_horse": "骷髅马",
			"slime": "史莱姆",
			"small_fireball": "烈焰人火球/射出的火球",
			"snow_golem": "雪傀儡",
			"snowball": "丢出的雪球",
			"spider": "蜘蛛",
			"splash_potion": "丢出的喷溅药水",
			"squid": "鱿鱼",
			"stray": "流髑",
			"thrown_trident": "掷出的三叉戟",
			"tnt": "已激活的TNT",
			"tnt_minecart": "TNT矿车",
			"tropicalfish": "热带鱼",
			"vex": "恼鬼",
			"villager": "村民",
			"vindicator": "卫道士",
			"witch": "女巫",
			"wither": "凋灵",
			"wither_skeleton": "凋灵骷髅",
			"wither_skull": "黑色凋灵之首",
			"wither_skull_dangerous": "蓝色凋灵之首",
			"wolf": "狼",
			"xp_bottle": "丢出的附魔之瓶",
			"xp_orb": "经验球",
			"zombie": "僵尸",
			"zombie_horse": "僵尸马",
			"zombie_pigman": "僵尸猪人",
			"zombie_villager": "僵尸村民"
		},
		"effect": {
			"speed": "速度",
			"slowness": "缓慢",
			"haste": "急迫",
			"mining_fatigue": "挖掘疲劳",
			"strength": "力量",
			"instant_health": "瞬间治疗",
			"instant_damage": "瞬间伤害",
			"jump_boost": "跳跃提升",
			"nausea": "反胃",
			"regeneration": "生命回复",
			"resistance": "抗性提升",
			"fire_resistance": "防火",
			"water_breathing": "水下呼吸",
			"invisibility": "隐身",
			"blindness": "失明",
			"night_vision": "夜视",
			"hunger": "饥饿",
			"weakness": "虚弱",
			"poison": "中毒",
			"wither": "凋零",
			"health_boost": "生命提升",
			"absorption": "伤害吸收",
			"saturation": "饱和",
			//"glowing": "发光",
			"levitation": "飘浮",
			"fatal_poison": "剧毒"
		},
		"enchant_type": {
			"aqua_affinity": "水下速掘",
			"bane_of_arthropods": "节肢杀手",
			"blast_protection": "爆炸保护",
			"channeling": "引雷",
			"depth_strider": "深海探索者",
			"efficiency": "效率",
			"feather_falling": "摔落保护",
			"fire_aspect": "火焰附加",
			"fire_protection": "火焰保护",
			"flame": "火矢",
			"fortune": "时运",
			"frost_walker": "冰霜行者",
			"impaling": "穿刺",
			"infinity": "无限",
			"knockback": "击退",
			"looting": "抢夺",
			"loyalty": "忠诚",
			"luck_of_the_sea": "海之眷顾",
			"lure": "饵钓",
			"mending": "经验修补",
			"power": "力量",
			"projectile_protection": "弹射物保护",
			"protection": "保护",
			"punch": "冲击",
			"respiration": "水下呼吸",
			"riptide": "激流",
			"sharpness": "锋利",
			"silk_touch": "精准采集",
			"smite": "亡灵杀手",
			"thorns": "荆棘",
			"unbreaking": "耐久"
		},
		"gamerule_string": {},
		"gamerule_int": {},
		"gamerule_bool": {
			"commandblockoutput": "命令执行时是否在控制台进行文本提示",
			"drowningdamage": "是否启用溺水伤害",
			"falldamage": "是否启用掉落伤害",
			"firedamage": "是否启用燃烧伤害",
			"pvp": "是否允许玩家互相攻击",
			"sendcommandfeedback": "聊天栏是否会显示被一个玩家执行一些特殊命令的提示",
			"dofiretick": "火是否传播及自然熄灭",
			"domobspawning": "生物是否自然生成",
			"dotiledrops": "方块被破坏时是否掉落物品",
			"mobgriefing": "生物是否能改变、破坏方块及捡拾物品",
			"doentitydrops": "非生物实体是否掉落物品",
			"keepinventory": "玩家死亡后是否对物品栏和经验进行保存",
			"domobloot": "生物是否掉落物品",
			"dodaylightcycle": "日夜交替效果是否启用",
			"doweathercycle": "天气是否变化",
			"naturalregeneration": "玩家能否在饥饿值足够时自然恢复生命值",
			"tntexplodes": "TNT能否爆炸",
			"showcoordinates": "是否显示坐标"
		},
		"particle": {},
		"difficulty": {
			"peaceful": "和平",
			"easy": "简单",
			"normal": "普通",
			"hard": "困难",
			"p": "",
			"e": "",
			"n": "",
			"h": "",
			"0": "",
			"1": "",
			"2": "",
			"3": ""
		},
		"gamemode": {
			"survival": "生存模式",
			"creative": "创造模式",
			"adventure": "冒险模式",
			"spectator": "旁观模式",
			"s": "",
			"c": "",
			"a": "",
			"sp": "",
			"0": "",
			"1": "",
			"2": "",
			"3": ""
		},
		"bool": {
			"true": "是",
			"false": "否"
		},
		"select_all_enabled": {
			"*": "选择全部"
		}
	},
	"selectors": {
		"x": {
			"type": "relative",
			"name": "x坐标"
		},
		"y": {
			"type": "relative",
			"name": "y坐标"
		},
		"z": {
			"type": "relative",
			"name": "z坐标"
		},
		"r": {
			"type": "float",
			"name": "最大半径"
		},
		"rm": {
			"type": "float",
			"name": "最小半径"
		},
		"m": {
			"type": "enum",
			"name": "游戏模式",
			"list": "gamemode",
			"hasInverted": true
		},
		"c": {
			"type": "int",
			"name": "数量"
		},
		"l": {
			"type": "int",
			"name": "最大经验等级"
		},
		"lm": {
			"type": "int",
			"name": "最小经验等级"
		},
		"name": {
			"type": "string",
			"name": "名称",
			"hasInverted": true
		},
		"dx": {
			"type": "float",
			"name": "x轴方向长度"
		},
		"dy": {
			"type": "float",
			"name": "y轴方向长度"
		},
		"dz": {
			"type": "float",
			"name": "z轴方向长度"
		},
		"rx": {
			"type": "float",
			"name": "最大垂直旋转角度"
		},
		"rxm": {
			"type": "float",
			"name": "最小垂直旋转角度"
		},
		"ry": {
			"type": "float",
			"name": "最大水平旋转角度"
		},
		"rym": {
			"type": "float",
			"name": "最小水平旋转角度"
		},
		"type": {
			"type": "string",
			"name": "实体类型",
			"suggestion": "entity",
			"hasInverted": true
		}
	},
	"json": {
		"block_selector": {
			"type": "object",
			"children": {
				"blocks": {
					"type": "array",
					"name": "方块列表",
					"children": {
						"type": "string",
						"suggestion": "block"
					}
				}
			}
		},
		"item_component": {
			"type": "object",
			"name": "物品组件",
			"children": {
				"minecraft:can_place_on": {
					"name": "冒险模式下仅能放置于……方块上",
					"extends": "block_selector"
				},
				"minecraft:can_destroy": {
					"name": "冒险模式下仅能破坏……方块",
					"extends": "block_selector"
				}
			}
		}
	},
	"help": {
		"command": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4",
		"tilder": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#.E6.B3.A2.E6.B5.AA.E5.8F.B7",
		"selector": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8",
		"nbt": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#.E6.95.B0.E6.8D.AE.E6.A0.87.E7.AD.BE",
		"rawjson": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#.E5.8E.9F.E5.A7.8BJSON.E6.96.87.E6.9C.AC"
	},
	"versionPack": {
		"base": {
			"minSupportVer": "1.2",
			"enums": {
				"item": "block"
			}
		},
		"idtable": {
			"mode": "overwrite",
			"maxSupportVer": "1.1.*",
			"enums": {
				"item": {},
				"block": {},
				"entity": {}
			}
		},
		"0.16.0": {
			"commands": {
				"clone": {
					"description": "在区域间复制方块结构",
					"patterns": {
						"default": {
							"description": "将起点与终点指定的长方体区域内的方块结构复制到目标点",
							"params": [
								{
									"type": "position",
									"name": "起点"
								},
								{
									"type": "position",
									"name": "终点"
								},
								{
									"type": "position",
									"name": "目标点"
								},
								{
									"type": "enum",
									"name": "遮罩模式",
									"list": {
										"masked": "仅复制非空气方块，会保持目的区域中原本会被替换为空气的方块不变",
										"replace": "[默认]复制所有方块，用源区域的方块覆盖整个目标区域"
									},
									"optional": true
								},
								{
									"type": "enum",
									"name": "复制模式",
									"list": {
										"force": "强制复制，即使源区域与目标区域有重叠",
										"move": "将源区域复制到目标区域，并将源区域替换为空气（在filtered遮罩模式下，只有被复制的方块才会被替换为空气）",
										"normal": "[默认]不执行force与move"
									},
									"optional": true
								}
							]
						},
						"filtered": {
							"description": "将起点与终点指定的长方体区域内的方块结构过滤并复制到目标点",
							"params": [
								{
									"type": "position",
									"name": "起点"
								},
								{
									"type": "position",
									"name": "终点"
								},
								{
									"type": "position",
									"name": "目标点"
								},
								{
									"type": "plain",
									"name": "filtered",
									"prompt": "仅复制方块ID符合方块名定义的方块"
								},
								{
									"type": "enum",
									"name": "复制模式",
									"list": {
										"force": "强制复制，即使源区域与目标区域有重叠",
										"move": "将源区域复制到目标区域，并将源区域替换为空气（在filtered遮罩模式下，只有被复制的方块才会被替换为空气）",
										"normal": "[默认]不执行force与move"
									}
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#clone"
				},
				"execute": {
					"description": "让某一实体在某一位置执行一条命令",
					"patterns": {
						"default": {
							"description": "让目标实体在指定坐标执行一条命令",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								},
								{
									"type": "position",
									"name": "坐标"
								},
								{
									"type": "command",
									"name": "命令"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#execute"
				},
				"fill": {
					"description": "用特定方块全部或部分填充一个区域",
					"patterns": {
						"default": {
							"description": "按指定模式在点A与点B指定的长方体区域填充方块",
							"params": [
								{
									"type": "position",
									"name": "点A"
								},
								{
									"type": "position",
									"name": "点B"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值",
									"optional": true
								},
								{
									"type": "enum",
									"name": "旧方块处理方式",
									"list": {
										"destroy": "用指定方块替换填充区域内所有方块(包括空气),以实体掉落被替换的方块及方块内容物就像它们被采掘了",
										"hollow": "仅用指定方块替换填充区域外层的方块。内部方块被改变为空气，以实体掉落它们的内容物但本身不掉落",
										"keep": "仅用指定方块替换填充区域内的空气方块",
										"outline": "仅用指定方块替换填充区域外层的方块。内部方块不被影响",
										"replace": "[默认]用指定方块替换填充区域内所有方块（包括空气）或指定方块，而不以实体形式掉落被替换的方块和方块内容物。"
									},
									"optional": true
								}
							]
						},
						"replace": {
							"description": "替换在点A与点B指定的长方体区域的指定方块",
							"params": [
								{
									"type": "position",
									"name": "点A"
								},
								{
									"type": "position",
									"name": "点B"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值"
								},
								{
									"type": "plain",
									"name": "replace",
									"prompt": "[默认]用指定方块替换填充区域内所有方块（包括空气）或指定方块，而不以实体形式掉落被替换的方块和方块内容物。"
								},
								{
									"type": "string",
									"name": "被替换方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "被替换方块数据值",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#fill"
				},
				"gamemode": {
					"description": "设置某个玩家的游戏模式",
					"patterns": {
						"current": {
							"description": "设置当前玩家的游戏模式",
							"params": [
								{
									"type": "enum",
									"name": "模式",
									"list": "gamemode"
								}
							]
						},
						"default": {
							"description": "设置指定玩家的游戏模式",
							"params": [
								{
									"type": "enum",
									"name": "模式",
									"list": "gamemode"
								},
								{
									"type": "selector",
									"name": "玩家",
									"target": "player"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#gamemode"
				},
				"give": {
					"description": "给一位玩家一种物品",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "string",
									"name": "物品ID",
									"suggestion": "item"
								},
								{
									"type": "uint",
									"name": "数量",
									"optional": true
								},
								{
									"type": "uint",
									"name": "数据值",
									"optional": true
								},
								{
									"type": "json",
									"name": "数据标签",
									"component": "item_component",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#give"
				},
				"help": {
					"description": "显示帮助",
					"content": "help",
					"noparams": {}
				},
				"kill": {
					"description": "清除或杀死实体",
					"noparams": {
						"description": "自杀"
					},
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#kill"
				},
				"msg": {
					"alias": "tell"
				},
				"say": {
					"description": "向所有在线玩家发送信息",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "text",
									"name": "信息"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#say"
				},
				"setblock": {
					"description": "将一个方块更改为另一个方块",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "position",
									"name": "坐标"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值",
									"optional": true
								},
								{
									"type": "enum",
									"name": "旧方块处理方式",
									"list": {
										"destroy": "旧方块掉落本身与其内容物，播放方块碎裂的声音，并显示破坏方块的粒子",
										"keep": "只有空气方块会被改变，非空气方块将被保留不变",
										"replace": "[默认]旧方块不掉落本身与其内容物，没有声音，没有粒子，直接变为新方块"
									},
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#setblock"
				},
				"setworldspawn": {
					"description": "设置世界出生点",
					"noparams": {
						"description": "设置当前位置为世界出生点"
					},
					"patterns": {
						"default": {
							"params": [
								{
									"type": "position",
									"name": "坐标"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#setworldspawn"
				},
				"spawnpoint": {
					"description": "为特定玩家设置出生点",
					"noparams": {
						"description": "设置当前玩家出生点为当前位置"
					},
					"patterns": {
						"current": {
							"description": "设置指定玩家出生点为该玩家当前位置",
							"params": [
								{
									"type": "selector",
									"name": "目标"
								}
							]
						},
						"default": {
							"description": "设置指定玩家出生点为指定位置",
							"params": [
								{
									"type": "selector",
									"name": "目标"
								},
								{
									"type": "position",
									"name": "坐标"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#spawnpoint"
				},
				"summon": {
					"description": "生成一个实体",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "string",
									"name": "实体ID",
									"suggestion": "entity"
								},
								{
									"type": "position",
									"name": "生成位置",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#summon"
				},
				"tell": {
					"description": "发送一条私密信息给一个或多个玩家",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "text",
									"name": "私密信息"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#tell"
				},
				"testforblock": {
					"description": "探测某个方块是否在特定位置",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "position",
									"name": "坐标"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#testforblock"
				},
				"testforblocks": {
					"description": "测试两个区域的方块是否相同",
					"patterns": {
						"default": {
							"description": "将起点与终点指定的长方体区域内的方块结构与对应目标点的方块结构（除NBT）进行比较",
							"params": [
								{
									"type": "position",
									"name": "起点"
								},
								{
									"type": "position",
									"name": "终点"
								},
								{
									"type": "position",
									"name": "目标点"
								},
								{
									"type": "enum",
									"name": "模式",
									"list": {
										"masked": "不检测空气方块：当一个区域的某个坐标格为空气方块，另一区域的相对坐标格可以是任意方块",
										"all": "[默认]两个区域的所有方块必须除NBT外完全相同"
									},
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#testforblocks"
				},
				"time": {
					"description": "更改或查询世界游戏时间",
					"patterns": {
						"add": {
							"description": "加快指定长度的时间",
							"params": [
								{
									"type": "plain",
									"name": "add",
									"prompt": "加快时间"
								},
								{
									"type": "uint",
									"name": "增加时间"
								}
							]
						},
						"query": {
							"description": "查询时间",
							"params": [
								{
									"type": "plain",
									"name": "query",
									"prompt": "查询时间"
								},
								{
									"type": "enum",
									"name": "时间类型",
									"list": {
										"daytime": "这一天的时间（从午夜开始的游戏刻）",
										"gametime": "游戏时间（从世界创建时开始计算的游戏刻）",
										"day": "日期（从世界创建时开始计算的游戏日）"
									}
								}
							]
						},
						"set_uint": {
							"description": "设置时间",
							"params": [
								{
									"type": "plain",
									"name": "set",
									"prompt": "设置时间"
								},
								{
									"type": "uint",
									"name": "时间"
								}
							]
						},
						"set_enum": {
							"description": "设置时间",
							"params": [
								{
									"type": "plain",
									"name": "set",
									"prompt": "设置时间"
								},
								{
									"type": "enum",
									"name": "时间",
									"list": {
										"day": "上午（1000）",
										"midnight": "深夜（18000）",
										"night": "晚上（13000）",
										"noon": "中午（6000）",
										"sunrise": "凌晨（23000）",
										"sunset": "傍晚（12000）"
									}
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#time"
				},
				"toggledownfall": {
					"description": "切换天气",
					"noparams": {
						"description": "如果天气目前晴朗，就会转换成下雨或下雪。如果天气目前是雨雪天气，它将停止下雨下雪。"
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#toggledownfall"
				},
				"tp": {
					"description": "传送实体",
					"patterns": {
						"current_to_entity": {
							"description": "将玩家传送至目的地实体",
							"params": [
								{
									"type": "selector",
									"name": "目的地实体",
									"target": "entity"
								}
							]
						},
						"current_to_position": {
							"description": "将玩家传送至目的地坐标",
							"params": [
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "relative",
									"name": "水平旋转值",
									"optional": true
								},
								{
									"type": "relative",
									"name": "垂直旋转值",
									"optional": true
								}
							]
						},
						"entity_to_entity": {
							"description": "将目标实体传送至目的地实体",
							"params": [
								{
									"type": "selector",
									"name": "目标实体",
									"target": "entity"
								},
								{
									"type": "selector",
									"name": "目的地实体",
									"target": "entity"
								}
							]
						},
						"entity_to_position": {
							"description": "将目标实体传送至目的地坐标",
							"params": [
								{
									"type": "selector",
									"name": "目标实体",
									"target": "entity"
								},
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "relative",
									"name": "水平旋转值",
									"optional": true
								},
								{
									"type": "relative",
									"name": "垂直旋转值",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#tp"
				},
				"teleport": {
					"alias": "tp"
				},
				"w": {
					"alias": "tell"
				},
				"weather": {
					"description": "更改游戏中的天气",
					"patterns": {
						"default": {
							"description": "设置游戏中的天气",
							"params": [
								{
									"type": "enum",
									"name": "天气类型",
									"list": {
										"clear": "晴天",
										"rain": "雨天",
										"thunder": "雷雨天"
									}
								},
								{
									"type": "uint",
									"name": "持续时间",
									"optional": true
								}
							]
						},
						"query": {
							"description": "查询游戏中的天气",
							"params": [
								{
									"type": "plain",
									"name": "query",
									"prompt": "查询当前天气"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#weather"
				},
				"xp": {
					"description": "将经验值给予一个玩家",
					"patterns": {
						"point": {
							"params": [
								{
									"type": "int",
									"name": "数量"
								},
								{
									"type": "selector",
									"name": "目标玩家",
									"target": "player",
									"optional": true
								}
							]
						},
						"level": {
							"params": [
								{
									"type": "custom",
									"name": "等级",
									"vtype": "数值",
									"suffix": "L",
									"input": "^(\\+|-)?(\\d+(L)?)?",
									"finish": "^(\\+|-)?\\d+L"
								},
								{
									"type": "selector",
									"name": "目标玩家",
									"target": "player",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#xp"
				}
			},
			"minSupportVer": "0.15.90.0"
		},
		"0.16.0 build 5": {
			"commands": {
				"enchant": {
					"description": "给一位玩家选中的物品添加附魔",
					"patterns": {
						"par_enum": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "string",
									"name": "附魔ID",
									"suggestion": "enchant_type"
								},
								{
									"type": "uint",
									"name": "等级",
									"optional": true
								}
							]
						},
						"par_uint": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "uint",
									"name": "附魔ID"
								},
								{
									"type": "uint",
									"name": "等级",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#enchant"
				}
			},
			"minSupportVer": "0.15.90.5"
		},
		"1.0.5 build 1": {
			"commands": {
				"clear": {
					"description": "清空玩家物品栏物品",
					"patterns": {
						"allitems": {
							"description": "清空指定玩家背包",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								}
							]
						},
						"specifieditem": {
							"description": "清空指定玩家背包内特定物品",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "string",
									"name": "物品ID",
									"suggestion": "item"
								},
								{
									"type": "int",
									"name": "物品特殊值",
									"optional": true
								},
								{
									"type": "int",
									"name": "最大数量",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#clear"
				},
				"difficulty": {
					"description": "设置游戏难度等级",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "enum",
									"name": "新难度",
									"list": "difficulty"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#difficulty"
				},
				"effect": {
					"description": "设置玩家及实体的状态效果",
					"patterns": {
						"clear": {
							"description": "移除所有状态效果",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								},
								{
									"type": "plain",
									"name": "clear",
									"prompt": "（不是状态效果）清除所有状态效果"
								}
							]
						},
						"give": {
							"description": "给予实体状态效果",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								},
								{
									"type": "string",
									"name": "状态效果",
									"suggestion": "effect"
								},
								{
									"type": "uint",
									"name": "持续秒数",
									"optional": true
								},
								{
									"type": "uint",
									"name": "级别",
									"optional": true
								},
								{
									"type": "enum",
									"name": "是否隐藏粒子",
									"list": "bool",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#effect"
				},
				"gamerule": {
					"description": "设置或查询一条游戏规则的值",
					"patterns": {
						/*"query_int": {
							"description": "查询指定游戏规则的值",
							"params": [
								{
									"type": "enum",
									"name": "规则名",
									"list": "gamerule_int"
								}
							]
						},*/
						"query_bool": {
							"description": "查询指定游戏规则的值",
							"params": [
								{
									"type": "enum",
									"name": "规则名",
									"list": "gamerule_bool"
								}
							]
						},
						/*"query_string": {
							"description": "查询指定游戏规则的值",
							"params": [
								{
									"type": "string",
									"name": "规则名",
									"suggestion": "gamerule_string"
								}
							]
						},
						"set_int": {
							"description": "设置指定游戏规则的值",
							"params": [
								{
									"type": "enum",
									"name": "规则名",
									"list": "gamerule_int"
								},
								{
									"type": "int",
									"name": "值"
								}
							]
						},*/
						"set_bool": {
							"description": "设置指定游戏规则的值",
							"params": [
								{
									"type": "enum",
									"name": "规则名",
									"list": "gamerule_bool"
								},
								{
									"type": "enum",
									"name": "值",
									"list": "bool"
								}
							]
						},
						/*"set_string": {
							"description": "设置指定游戏规则的值",
							"params": [
								{
									"type": "string",
									"name": "规则名",
									"suggestion": "gamerule_string"
								},
								{
									"type": "string",
									"name": "值"
								}
							]
						}*/
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#gamerule"
				},
				"me": {
					"description": "显示一条关于你自己的信息",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "text",
									"name": "信息"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#me"
				},
				"playsound": {
					"description": "对指定玩家播放指定声音",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "string",
									"name": "声音ID",
									"suggestion": "sound"
								},
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "position",
									"name": "位置",
									"optional": true
								},
								{
									"type": "float",
									"name": "音量",
									"optional": true
								},
								{
									"type": "float",
									"name": "音调",
									"optional": true
								},
								{
									"type": "float",
									"name": "最小音量",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#playsound"
				},
				"replaceitem": {
					"description": "用给出的物品替换方块或实体物品栏内的物品",
					"patterns": {
						"block": {
							"description": "用给出的物品替换方块内的物品",
							"params": [
								{
									"type": "plain",
									"name": "block",
									"prompt": "替换方块内物品"
								},
								{
									"type": "position",
									"name": "坐标"
								},
								{
									"type": "enum",
									"name": "格子类型",
									"list": {
										"slot.container": "容器"
									}
								},
								{
									"type": "uint",
									"name": "格子ID"
								},
								{
									"type": "string",
									"name": "物品ID",
									"suggestion": "item"
								},
								{
									"type": "uint",
									"name": "数量",
									"optional": true
								},
								{
									"type": "uint",
									"name": "数据值",
									"optional": true
								},
								{
									"type": "json",
									"name": "数据标签",
									"component": "item_component",
									"optional": true
								}
							]
						},
						"entity": {
							"description": "用给出的物品替换实体物品栏内的物品",
							"params": [
								{
									"type": "plain",
									"name": "entity",
									"prompt": "替换实体内物品"
								},
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								},
								{
									"type": "enum",
									"name": "格子类型",
									"list": {
										"slot.armor": "盔甲",
										"slot.armor.chest": "胸甲",
										"slot.armor.feet": "靴子",
										"slot.armor.head": "头盔",
										"slot.armor.legs": "腿甲",
										"slot.chest": "箱子",
										"slot.enderchest": "末影箱",
										"slot.hotbar": "快捷栏",
										"slot.inventory": "物品栏",
										"slot.saddle": "鞍",
										"slot.weapon.mainhand": "主手持有",
										"slot.weapon.offhand": "副手持有"
									}
								},
								{
									"type": "uint",
									"name": "格子ID"
								},
								{
									"type": "string",
									"name": "物品ID",
									"suggestion": "item"
								},
								{
									"type": "uint",
									"name": "数量",
									"optional": true
								},
								{
									"type": "uint",
									"name": "数据值",
									"optional": true
								},
								{
									"type": "json",
									"name": "数据标签",
									"component": "item_component",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#replaceitem"
				},
				"spreadplayers": {
					"description": "把实体随机传送到区域内地表的某个位置",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "relative",
									"name": "x坐标"
								},
								{
									"type": "relative",
									"name": "z坐标"
								},
								{
									"type": "float",
									"name": "分散间距"
								},
								{
									"type": "float",
									"name": "最大范围"
								},
								{
									"type": "selector",
									"name": "实体",
									"target": "entity",
									"repeat": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#spread"
				},
				"stopsound": {
					"description": "停止音效播放",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "string",
									"name": "声音ID",
									"suggestion": "sound",
									"optional": true
								}
							]
						},
						"custom": {
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "string",
									"name": "声音ID",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#stopsound"
				},
				"testfor": {
					"description": "检测并统计符合指定条件的实体",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "目标实体",
									"target": "entity"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#testfor"
				},
				"title": {
					"description": "标题命令相关",
					"patterns": {
						"clear": {
							"description": "移除标题",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "clear",
									"prompt": "移除标题"
								}
							]
						},
						"reset": {
							"description": "重设标题设置",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "reset",
									"prompt": "重设标题设置"
								}
							]
						},
						"subtitle": {
							"description": "设置副标题",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "subtitle",
									"prompt": "设置副标题"
								},
								{
									"type": "text",
									"name": "副标题"
								}
							]
						},
						"title": {
							"description": "显示标题",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "title",
									"prompt": "显示标题"
								},
								{
									"type": "text",
									"name": "标题"
								}
							]
						},
						"times": {
							"description": "设置标题显示时间",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "times",
									"prompt": "设置标题显示时间"
								},
								{
									"type": "int",
									"name": "淡入时间"
								},
								{
									"type": "int",
									"name": "停留时间"
								},
								{
									"type": "int",
									"name": "淡出时间"
								}
							]
						},
						"actionbar": {
							"description": "在活动栏上显示文字",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "player"
								},
								{
									"type": "plain",
									"name": "actionbar",
									"prompt": "在活动栏上显示文字"
								},
								{
									"type": "text",
									"name": "活动栏文字"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#title"
				}
			},
			"minSupportVer": "1.0.5.0"
		},
		"particle": {
			"commands": {
				"particle": {
					"description": "创建粒子效果",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "string",
									"name": "粒子ID"
								},
								{
									"type": "position",
									"name": "位置"
								},
								{
									"type": "float",
									"name": "生成区域ΔX"
								},
								{
									"type": "float",
									"name": "生成区域ΔY"
								},
								{
									"type": "float",
									"name": "生成区域ΔZ"
								},
								{
									"type": "float",
									"name": "速度"
								},
								{
									"type": "uint",
									"name": "数量",
									"optional": true
								},
								{
									"type": "plain",
									"name": "force",
									"prompt": "将颗粒的可视距离设置为256米，包括将颗粒效果可视距离降至最低的玩家",
									"optional": true
								},
								{
									"type": "int",
									"name": "额外参数",
									"repeat": true,
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#particle"
				}
			},
			"minSupportVer": "1.0.5.0",
			"maxSupportVer": "1.0.5.0"
		},
		"execute_detect": {
			"supportVer": [
				{
					"min": "0.15.90.0",
					"max": "1.1.*"
				},
				{
					"min": "1.2.0.7"
				}
			],
			"commands": {
				"execute": {
					"patterns": {
						"detect": {
							"description": "让目标实体当点B为指定方块时在点A执行一条命令",
							"params": [
								{
									"type": "selector",
									"name": "目标",
									"target": "entity"
								},
								{
									"type": "position",
									"name": "点A"
								},
								{
									"type": "plain",
									"name": "detect",
									"prompt": "（不是命令）检测指定坐标的方块是否符合条件"
								},
								{
									"type": "position",
									"name": "点B"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值"
								},
								{
									"type": "command",
									"name": "命令"
								}
							]
						}
					}
				}
			}
		},
		"detect_global": {
			"supportVer": [
				{
					"min": "1.2.0.2",
					"max": "1.2.0.2"
				}
			],
			"commands": {
				"detect": {
					"description": "当某一方块满足条件时执行一条命令",
					"patterns": {
						"default": {
							"description": "当指定坐标为指定方块时执行一条命令",
							"params": [
								{
									"type": "position",
									"name": "坐标"
								},
								{
									"type": "string",
									"name": "方块ID",
									"suggestion": "block"
								},
								{
									"type": "int",
									"name": "数据值"
								},
								{
									"type": "command",
									"name": "命令"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#detect"
				}
			}
		},
		"1.2": {
			"minSupportVer": "1.2.0.2",
			"commands": {
				"alwaysday": {
					"description": "锁定或解锁日夜交替",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "enum",
									"name": "是否锁定",
									"list": "bool",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#alwaysday"
				},
				"daylock": {
					"alias": "alwaysday"
				},
				"tickingarea": {
					"description": "添加、移除或列出常加载区域",
					"patterns": {
						"add_box": {
							"params": [
								{
									"type": "plain",
									"name": "add",
									"prompt": "添加长方体常加载区域"
								},
								{
									"type": "position",
									"name": "起点"
								},
								{
									"type": "position",
									"name": "终点"
								},
								{
									"type": "text",
									"name": "区域ID"
								}
							]
						},
						"add_sphere": {
							"params": [
								{
									"type": "plain",
									"name": "add circle",
									"prompt": "添加球形常加载区域"
								},
								{
									"type": "position",
									"name": "中心"
								},
								{
									"type": "uint",
									"name": "半径"
								},
								{
									"type": "text",
									"name": "区域ID"
								}
							]
						},
						"remove_pos": {
							"params": [
								{
									"type": "plain",
									"name": "remove",
									"prompt": "移除指定常加载区域"
								},
								{
									"type": "position",
									"name": "Position"
								}
							]
						},
						"remove_id": {
							"params": [
								{
									"type": "plain",
									"name": "remove",
									"prompt": "移除指定常加载区域"
								},
								{
									"type": "text",
									"name": "区域ID"
								}
							]
						},
						"remove_all": {
							"params": [
								{
									"type": "plain",
									"name": "remove_all",
									"prompt": "移除所有常加载区域"
								}
							]
						},
						"list": {
							"params": [
								{
									"type": "plain",
									"name": "list",
									"prompt": "列出所有常加载区域"
								},
								{
									"type": "plain",
									"name": "all-dimensions",
									"prompt": "列出所有维度的常加载区域",
									"optional": true
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#tickingarea"
				},
				"tp": {
					"patterns": {
						"current_to_position_facing_block": {
							"description": "将玩家传送至目的地坐标并使玩家面向指定坐标",
							"params": [
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "plain",
									"name": "facing",
									"prompt": "面向..."
								},
								{
									"type": "position",
									"name": "面向坐标"
								}
							]
						},
						"current_to_position_facing_entity": {
							"description": "将玩家传送至目的地坐标并使玩家面向指定实体",
							"params": [
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "plain",
									"name": "facing",
									"prompt": "面向..."
								},
								{
									"type": "selector",
									"name": "面向实体",
									"target": "entity"
								}
							]
						},
						"entity_to_position_facing_block": {
							"description": "将目标实体传送至目的地坐标并使该实体面向指定坐标",
							"params": [
								{
									"type": "selector",
									"name": "目标实体",
									"target": "entity"
								},
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "plain",
									"name": "facing",
									"prompt": "面向..."
								},
								{
									"type": "position",
									"name": "面向坐标"
								}
							]
						},
						"entity_to_position_facing_entity": {
							"description": "将目标实体传送至目的地坐标并使该实体面向另一指定实体",
							"params": [
								{
									"type": "selector",
									"name": "目标实体",
									"target": "entity"
								},
								{
									"type": "position",
									"name": "目的地坐标"
								},
								{
									"type": "plain",
									"name": "facing",
									"prompt": "面向..."
								},
								{
									"type": "selector",
									"name": "面向实体",
									"target": "entity"
								}
							]
						}
					}
				}
			}
		}
	}
};

CA.IntelliSense.inner["addition"] = {
	"name": "补充命令库",
	"author": "CA制作组",
	"description": "该命令库是默认命令库的补充，包括了只能在多人游戏中使用的命令。",
	"uuid": "590cdcb5-3cdf-42fa-902c-b578779335ab",
	"version": [0, 0, 1],
	"require": ["acf728c5-dd5d-4a38-b43d-7c4f18149fbd"],
	"minSupportVer": "0.16.0",
	"targetSupportVer": "1.2.0.2",
	"commands": {},
	"enums": {
		"structure": {
			"endcity": "末地城",
			"fortress": "下界要塞",
			"mansion": "林地府邸",
			"mineshaft": "废弃矿井",
			"monument": "海底遗迹",
			"stronghold": "要塞",
			"temple": "沙漠神殿/丛林神庙/沼泽小屋/雪屋",
			"village": "村庄"
		}
	},
	"selectors": {},
	"help": {},
	"versionPack": {
		"0.16.0": {
			"commands": {
				"connect": {
					"alias": "wsserver"
				},
				"deop": {
					"description": "撤销玩家的管理员身份",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "玩家",
									"target": "player"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#deop"
				},
				"list": {
					"description": "列出在服务器上的玩家",
					"noparams": true,
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#list"
				},
				"op": {
					"description": "给予一位玩家管理员身份",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "selector",
									"name": "玩家",
									"target": "player"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#op"
				},
				"wsserver": {
					"description": "尝试连接到指定的WebSocket服务器上",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "text",
									"name": "服务器URL"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#wsserver"
				}
			},
			"minSupportVer": "0.15.90.0"
		},
		"1.0": {
			"commands": {
				"locate": {
					"description": "为执行此命令的玩家在聊天窗口里显示给定类型的最近结构的坐标",
					"patterns": {
						"default": {
							"params": [{
								"type": "enum",
								"name": "结构ID",
								"list": "structure"
							}]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#locate"
				}
			},
			"minSupportVer": "0.17"
		},
		"1.0.3 build 1": {
			"commands": {
				"transferserver": {
					"description": "将玩家转送至另一服务器",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "string",
									"name": "服务器地址"
								},
								{
									"type": "uint",
									"name": "端口号"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#transferserver"
				}
			},
			"minSupportVer": "1.0.3.0"
		},
		"1.1": {
			"commands": {
				"setmaxplayers": {
					"description": "设置可加入多人联机游戏的玩家数量上限",
					"patterns": {
						"default": {
							"params": [
								{
									"type": "uint",
									"name": "数量上限"
								}
							]
						}
					},
					"help": "https://minecraft-zh.gamepedia.com/%E5%91%BD%E4%BB%A4#setmaxplayers"
				}
			},
			"minSupportVer": "1.1.0.55"
		},
		"1.2.5": {
			"commands": {
				"mixer": {
					"description": "Mixer交互性控制[需安装Mixer]",
					"patterns": {
						"start": {
							"description": "启动Mixer交互会话",
							"params": [
								{
									"type": "plain",
									"name": "start",
									"prompt": "启动Mixer交互会话"
								},
								{
									"type": "uint",
									"name": "版本ID"
								},
								{
									"type": "string",
									"name": "分享码",
									"optional": true
								}
							]
						},
						"stop": {
							"description": "停止Mixer交互会话",
							"params": [
								{
									"type": "plain",
									"name": "stop",
									"prompt": "停止Mixer交互会话"
								}
							]
						},
						"scene": {
							"description": "切换Mixer交互场景",
							"params": [
								{
									"type": "plain",
									"name": "scene",
									"prompt": "切换Mixer交互场景"
								},
								{
									"type": "string",
									"name": "场景名"
								}
							]
						}
					},
					"help": "https://blog.mixer.com/minecraft"
				}
			},
			"minSupportVer": "1.2.5.12"
		}
	}
};

CA.IntelliSense.inner["basicedu"] = {
	"name": "基本命令教程",
	"author": "ProjectXero",
	"description": "该教程为命令初学者提供了入门级别的教程。",
	"uuid": "8a4cc227-66f4-455c-9be4-7f988f408696",
	"version": [0, 0, 1],
	"require": [],
	"tutorials": [{
		"name": "初识命令",
		"description": "在此，你将了解到什么是命令",
		"id": "xero.firstlesson",
		"type": "tutorial",
		"intro": [
			{
				"text": "请使用基岩版 1.0.5及以上版本或国服最新版",
				"bold": true,
				"color": "criticalcolor"
			},
			"，因为本教程需要以下功能：\n",
			{
				"list": [
					"命令方块",
					"say命令",
					"多人游戏玩家权限设置"
				]
			},
			"\n\n作为一款风靡一时的像素游戏，",
			{
				"text": "Minecraft",
				"bold": true
			},
			"能够长期占据排行榜前列绝非偶然。Minecraft衍生的各种玩法堪称无穷无尽，命令则是大多数玩法中的主要组成部分。",
			"\n\n接下来您将了解本教程的第一条命令：\n",
			{
				"command": "/say §eHello World!",
				"bold": true
			}
		],
		"segments": [{
			"text": [
				"首先，要使用命令，请先切换为创造模式并启用作弊。\n\n",
				{
					"text": "单人模式",
					"bold": true
				},
				"：打开世界设置，启用作弊。\n",
				{
					"text": "多人模式/网易租赁服",
					"bold": true
				},
				"：请让游戏的操作员（OP）给予您操作员权限。\n",
				{
					"text": "服务器",
					"bold": true
				},
				"：",
				{
					"text": "服务器还用啥命令方块？用插件啊",
					"bgcolor": "textcolor"
				}
			],
			"stepMode": "manual"
		}, {
			"text": "首先在聊天框里输入以下命令："
		}, {
			"command": "/give @p command_block"
		}, {
			"text": "如果成功的话，玩家应该可以在物品栏中获得命令方块。",
			"stepMode": "manual"
		}, {
			"text": "将命令方块放置在地面上。点击命令方块进入命令方块设置界面。",
			"stepMode": "manual"
		}, {
			"text": "在命令输入框内输入以下命令并关闭："
		}, {
			"command": "/say §eHello World!",
			"stepMode": "manual"
		}, {
			"text": [
				"现在你可以试试用红石信号激活它了。\n\n",
				"如果成功的话，应当会在聊天栏内显示以下内容："
			]
		}, {
			"text": {
				"command": "§eHello World!"
			},
			"stepMode": "manual"
		}, {
			"text": [
				"恭喜你，成功地完成了你的第一个命令！\n\n",
				"本教程只是一个开始，之后会有更多的教程加入。"
			]
		}]
	}]
};

Common.themelist = {
	"light" : {
		"name" : "默认风格"
	},
	"dark" : {
		"name" : "暗黑风格",
		"bgcolor" : "#202020",
		"float_bgcolor" : "#404040",
		"message_bgcolor" : "#202020",
		"textcolor" : "#FFFFFF",
		"promptcolor" : "#C0C0C0",
		"highlightcolor" : "#FFFF00",
		"criticalcolor" : "#FFB040",
		"go_bgcolor" : "#616161",
		"go_textcolor" : "#FAFAFA",
		"go_touchbgcolor" : "#EEEEEE",
		"go_touchtextcolor" : "#000000"
	}
	/* 新建主题格式
	"light" : {						//主题ID ： light
		"name" : "默认风格",			//主题名称
		"bgcolor" : "#FAFAFA",		//主界面背景色
		"float_bgcolor" : "#F5F5F5",	//浮动栏（即滑动时与屏幕保持静止的栏）背景色
		"message_bgcolor" : "#FAFAFA",	//浮动界面背景色
		"textcolor" : "#212121",		//普通文本颜色
		"promptcolor" : "#9E9E9E",	//提示文本颜色
		"highlightcolor" : "#0000FF",	//高亮文本颜色
		"criticalcolor" : "#FF0000",	//警示文本颜色
		"go_bgcolor" : "#EEEEEE",	//GO按钮（主要动作按钮）背景色
		"go_textcolor" : "#000000",	//GO按钮文本颜色
		"go_touchbgcolor" : "#616161",	//GO按钮按下时背景色
		"go_touchtextcolor" : "#FAFAFA"	//GO按钮按下时文本颜色
	}
	*/
};

CA.tips = [
	//by Yiro
	"不到万不得已不要把execute指令写入重复命令方块！",
	"善用gamerule指令让你的世界更加精彩~",
	"矿车也属于实体！~",
	"夜视+失明能做出很棒的视觉效果！~",
	
	//by o绿叶o
	"混凝土方块没有花纹！",
	"可以试试彩色床，转换一下心情～",
	"萤石太好看，所以需要遮住@_@",
	"PE版里没有红石BUD！",
	"输入/summon ~ ~ ~ TNT有惊喜(ಡωಡ)",
	"log除了日志，还有原木的意思@_@",
	"如果穿着附有冰霜行者的鞋子，高处跳水，水不会结冰。",
	"听说下雨天，钓竿和水塘更配哦～",
	"鸡的模型很小，是1/4个方块。",
	"如果莫名其妙被闪电劈中，要怀疑自己是不是说错了话(ಡωಡ)",
	"射出的箭在水中下落时，会很好看(>﹏<)",
	"PE版里红石会自动连接活塞。",
	"村民都是奸商！！！",
	"亮度太低是种不了作物的(ง •̀_•́)ง",
	"冰会融化，浮冰不会。",
	"女巫不止在沼泽生成。",
	"炼药锅可以在雨天存储水。",
	"马、驴需要金萝卜才能生出骡？自己试试不就知道了。",
	"僵尸马不会自然生成。",
	"尽量不要垂直往下挖，否则后果自负（x_x；）",
	"下雪时，树叶会变白٩(๑^o^๑)۶",
	"音符盒的音色取决于它下面的方块。",
	"混凝土、物品栏的花纹都是沙子的花纹……←_←",
	"石镐可以挖掉青金石。",
	"黄金工具的效率更高，但耐久度很低。",
	
	//by ProjectXero
	"潜影贝只是站错了阵营的好孩子～"
];
"IGNORELN_END";

});
