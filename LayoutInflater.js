"ui";
var LayoutInflater = (function() {
	const DEFAULT_LP = new android.view.ViewGroup.LayoutParams(-2, -2);
	var cmcache = {}, ids = {},
		skipProp = ["id", "type", "layoutparams"];
	function inflate(ctx, json) {
		if (json.inflate) return json.inflate(ctx);
		
		var view = makeView(findViewClass(json.type), ctx, json.attr ? makeAttr(json.attr) : null);
		applyProp(view, json);
		applyLayout(ctx, view, json);
		if (json.onInflate) json.onInflate(json.VIEW = view);
		return view;
	}
	function findViewClass(type) {
		type = String(type);
		
		//寻找类
		var forName = java.lang.Class.forName;
		try {return forName("android.widget." + type)} catch(e) {}
		try {return forName("android.view." + type)} catch(e) {}
		return forName(type);
	}
	function makeView(clazz, ctx, attr) {
		if (attr) {
			try {return clazz.getConstructor(android.content.Context, android.util.AttributeSet).newInstance(ctx, attr)} catch(e) {}
		}
		try {return clazz.getConstructor(android.content.Context).newInstance(ctx)} catch(e) {}
		return clazz.getConstructor().newInstance();
	}
	function makeAttr(obj) {
		throw "暂未支持";
	}
	function invokeMethod(v, method, json) {
		var jtype = typeof json, name = method.getName(), par = method.getParameterTypes();
		if (par.length == 0) {
			if (jtype == undefined || jtype == "boolean" && json) { //undefined == null
				v[name]();
				return true;
			}
		} else if (par.length == 1) {
			v[name](json);
			return true;
		} else {
			if (Array.isArray(json)) {
				v[name].apply(v, json);
				return true;
			}
		}
		return false;
	}
	function getMethods(clazz, name) {
		var cn = clazz.getName();
		if (cn in cmcache) return cmcache[cn][name.toLowerCase()];
		var a = cmcache[cn] = {};
		var md = clazz.getMethods(), mn, i;
		for (i in md) {
			mn = md[i].getName().toLowerCase();
			if (!mn.startsWith("set")) continue;
			//存在setXXXX形式的函数
			mn = mn.substring(3);
			if (skipProp.indexOf(String(mn)) >= 0) continue;
			if (!(mn in a)) a[mn] = [];
			a[mn].push(md[i]);
		}
		return a[name.toLowerCase()];
	}
	
	function applyProp(v, json) {
		var clazz = v.getClass();
		var md, i;
		
		if (json.id) v.setId(ids[json.id] = android.view.View.generateViewId());
		
		Object.keys(json).forEach(function(e) {
			md = getMethods(clazz, e);
			if (!md) return;
			for (i in md) {
				if (!invokeMethod(v, md[i], json[e])) continue;
				break;
			}
		});
	}
	function getLPClass(v) {
		var cls = v.getClass();
		var method = cls.getMethod("generateLayoutParams", android.util.AttributeSet);
		return method.getReturnType();
	}
	function applyLP(clazz, json) {
		var lp, i;
		if (typeof json == "function") {
			return json();
		} else if (json instanceof Object) {
			lp = clazz.getConstructor(android.view.ViewGroup.LayoutParams).newInstance(DEFAULT_LP);
			for (i in json) {
				clazz.getField(i); //确保存在字段
				lp[i] = json[i];
			}
			return lp;
		} else {
			return json;
		}
	}
	function applyLayout(ctx, v, json) {
		var cs, i;
		if (json.child) {
			cs = [json.child];
		} else if (json.children) {
			cs = json.children;
		} else return;
		
		var lpc = getLPClass(v), lp;
		
		for (i in cs) {
			if (cs[i].layoutParams) {
				lp = applyLP(lpc, cs[i].layoutParams);
				v.addView(inflate(ctx, cs[i]), lp);
			} else {
				v.addView(inflate(ctx, cs[i]));
			}
		}
	}
	return {
		inflate : function(ctx, json) {
			return inflate(ctx, json);
		},
		getId : function(id) {
			return ids[id];
		}
	};
})();


//测试代码
if (!("activity" in this)) activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var ui = {
	type : "LinearLayout",
	orientation : 1, //LinearLayout.VERTICAL
	backgroundColor : -1056964864, //0xc0ffff00
	children : [{
		type : "TextView",
		text : "JSON → Layout",
		textSize : 20,
		textColor : -16776961, //0xff0000ff
		padding : [100, 100, 100, 100],
		layoutParams : {
			width : -1,
			height : -2
		}
	}, {
		type : "Button",
		text : "关闭",
		layoutParams : {
			width : -2,
			height : -2
		},
		onClickListener : {
			onClick : function(v) {
				window.dismiss();
			}
		}
	}]
}, window, layout;
activity.runOnUiThread(function() {
	layout = LayoutInflater.inflate(activity, ui);
	window = new android.widget.PopupWindow(layout, -1, -2);
	window.showAtLocation(activity.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
});



