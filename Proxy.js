var Proxy = function self(object, handler) {
	var cx = org.mozilla.javascript.Context.getCurrentContext();
	var scope = eval.call(null, "this");
	var old = cx.getWrapFactory().wrapAsJavaObject(cx, scope, object, org.mozilla.javascript.Scriptable);
	handler = Object(handler);
	var r = new org.mozilla.javascript.Function({
		delete : function(name) {
			if (handler.deleteProperty) return handler.deleteProperty(object, name);
			old.delete(name);
		},
		get : function(name, start) {
			if (handler.get) return handler.get(object, name, undefined);
			return old.get(name, start);
		},
		getClassName : function() {
			return "Proxy<" + old.getClassName() + ">";
		},
		getDefaultValue : function(hint) {
			return old.getDefaultValue(hint);
		},
		getIds : function() {
			if (handler.ownKeys) return handler.ownKeys(object);
			return old.getIds();
		},
		getParentScope : function() {
			return old.getParentScope();
		},
		getPrototype : function() {
			if (handler.getPrototypeOf) return handler.getPrototypeOf(object);
			return old.getPrototype();
		},
		has : function(name, start) {
			if (handler.has) return handler.has(object, name);
			return old.has(name, start);
		},
		hasInstance : function(instance) {
			return old.hasInstance(instance);
		},
		put : function(name, start, value) {
			if (handler.set) {
				handler.set(object, name, value, start);
				return;
			}
			old.put(name, start, value);
		},
		setParentScope : function(scope) {
			old.setParentScope(scope);
		},
		setPrototype : function(protptype) {
			if (handler.setPrototypeOf) {
				handler.setPrototypeOf(object, prototype);
				return;
			}
			old.setPrototype(protptype);
		},
		call : function(cx, scope, thisObj, args) {
			if (handler.apply) return handler.apply(object, thisObj, args);
			return old.call(cx, scope, thisObj, args);
		},
		construct : function(cx, scope, args) {
			if (handler.construct) return handler.construct(object, args, undefined);
			return old.construct(cx, scope, args);
		}
	});
	return cx.toObject(r, scope);
}
var a = new Proxy({b:5}, {
	get : function(o, n) {
		if (n == "b") return 6;
	}
});
print(a.b);


