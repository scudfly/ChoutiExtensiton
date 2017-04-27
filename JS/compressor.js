(function(A, w) {
	function ma() {
		if (!c.isReady) {
			try {
				s.documentElement.doScroll("left")
			} catch (a) {
				setTimeout(ma, 1);
				return
			}
			c.ready()
		}
	}

	function Qa(a, b) {
		b.src ? c.ajax({
			url: b.src,
			async: false,
			dataType: "script"
		}) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
		b.parentNode && b.parentNode.removeChild(b)
	}

	function X(a, b, d, f, e, j) {
		var i = a.length;
		if (typeof b === "object") {
			for (var o in b) {
				X(a, o, b[o], f, e, d);
			}
			return a
		}
		if (d !== w) {
			f = !j && f && c.isFunction(d);
			for (o = 0; o < i; o++) {
				e(a[o], b, f ? d.call(a[o], o, e(a[o], b)) : d, j)
			}
			return a
		}
		return i ? e(a[0], b) : w
	}

	function J() {
		return (new Date).getTime()
	}

	function Y() {
		return false
	}

	function Z() {
		return true
	}

	function na(a, b, d) {
		d[0].type = a;
		return c.event.handle.apply(b, d)
	}

	function oa(a) {
		var b, d = [],
			f = [],
			e = arguments,
			j, i, o, k, n, r;
		i = c.data(this, "events");
		if (!(a.liveFired === this || !i || !i.live || a.button && a.type === "click")) {
			a.liveFired = this;
			var u = i.live.slice(0);
			for (k = 0; k < u.length; k++) {
				i = u[k];
				i.origType.replace(O, "") === a.type ? f.push(i.selector) : u.splice(k--, 1)
			}
			j = c(a.target).closest(f, a.currentTarget);
			n = 0;
			for (r = j.length; n < r; n++) {
				for (k = 0; k < u.length; k++) {
					i = u[k];
					if (j[n].selector === i.selector) {
						o = j[n].elem;
						f = null;
						if (i.preType === "mouseenter" || i.preType === "mouseleave") {
							f = c(a.relatedTarget).closest(i.selector)[0]
						}
						if (!f || f !== o) {
							d.push({
								elem: o,
								handleObj: i
							})
						}
					}
				}
			}
			n = 0;
			for (r = d.length; n < r; n++) {
				j = d[n];
				a.currentTarget = j.elem;
				a.data = j.handleObj.data;
				a.handleObj = j.handleObj;
				if (j.handleObj.origHandler.apply(j.elem, e) === false) {
					b = false;
					break
				}
			}
			return b
		}
	}

	function pa(a, b) {
		return "live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
	}

	function qa(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}

	function ra(a, b) {
		var d = 0;
		b.each(function() {
			if (this.nodeName === (a[d] && a[d].nodeName)) {
				var f = c.data(a[d++]),
					e = c.data(this, f);
				if (f = f && f.events) {
					delete e.handle;
					e.events = {};
					for (var j in f) {
						for (var i in f[j]) {
							c.event.add(this, j, f[j][i], f[j][i].data)
						}
					}
				}
			}
		})
	}

	function sa(a, b, d) {
		var f, e, j;
		b = b && b[0] ? b[0].ownerDocument || b[0] : s;
		if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === s && !ta.test(a[0]) && (c.support.checkClone || !ua.test(a[0]))) {
			e = true;
			if (j = c.fragments[a[0]]) {
				if (j !== 1) {
					f = j
				}
			}
		}
		if (!f) {
			f = b.createDocumentFragment();
			c.clean(a, b, f, d)
		}
		if (e) {
			c.fragments[a[0]] = j ? f : 1
		}
		return {
			fragment: f,
			cacheable: e
		}
	}

	function K(a, b) {
		var d = {};
		c.each(va.concat.apply([], va.slice(0, b)), function() {
			d[this] = a
		});
		return d
	}

	function wa(a) {
		return "scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
	}
	var c = function(a, b) {
			return new c.fn.init(a, b)
		},
		Ra = A.jQuery,
		Sa = A.$,
		s = A.document,
		T, Ta = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
		Ua = /^.[^:#\[\.,]*$/,
		Va = /\S/,
		Wa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
		Xa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
		P = navigator.userAgent,
		xa = false,
		Q = [],
		L, $ = Object.prototype.toString,
		aa = Object.prototype.hasOwnProperty,
		ba = Array.prototype.push,
		R = Array.prototype.slice,
		ya = Array.prototype.indexOf;
	c.fn = c.prototype = {
		init: function(a, b) {
			var d, f;
			if (!a) {
				return this
			}
			if (a.nodeType) {
				this.context = this[0] = a;
				this.length = 1;
				return this
			}
			if (a === "body" && !b) {
				this.context = s;
				this[0] = s.body;
				this.selector = "body";
				this.length = 1;
				return this
			}
			if (typeof a === "string") {
				if ((d = Ta.exec(a)) && (d[1] || !b)) {
					if (d[1]) {
						f = b ? b.ownerDocument || b : s;
						if (a = Xa.exec(a)) {
							if (c.isPlainObject(b)) {
								a = [s.createElement(a[1])];
								c.fn.attr.call(a, b, true)
							} else {
								a = [f.createElement(a[1])]
							}
						} else {
							a = sa([d[1]], [f]);
							a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
						}
						return c.merge(this, a)
					} else {
						if (b = s.getElementById(d[2])) {
							if (b.id !== d[2]) {
								return T.find(a)
							}
							this.length = 1;
							this[0] = b
						}
						this.context = s;
						this.selector = a;
						return this
					}
				} else {
					if (!b && /^\w+$/.test(a)) {
						this.selector = a;
						this.context = s;
						a = s.getElementsByTagName(a);
						return c.merge(this, a)
					} else {
						return !b || b.jquery ? (b || T).find(a) : c(b).find(a)
					}
				}
			} else {
				if (c.isFunction(a)) {
					return T.ready(a)
				}
			} if (a.selector !== w) {
				this.selector = a.selector;
				this.context = a.context
			}
			return c.makeArray(a, this)
		},
		selector: "",
		jquery: "1.4.2",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return R.call(this, 0)
		},
		get: function(a) {
			return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
		},
		pushStack: function(a, b, d) {
			var f = c();
			c.isArray(a) ? ba.apply(f, a) : c.merge(f, a);
			f.prevObject = this;
			f.context = this.context;
			if (b === "find") {
				f.selector = this.selector + (this.selector ? " " : "") + d
			} else {
				if (b) {
					f.selector = this.selector + "." + b + "(" + d + ")"
				}
			}
			return f
		},
		each: function(a, b) {
			return c.each(this, a, b)
		},
		ready: function(a) {
			c.bindReady();
			if (c.isReady) {
				a.call(s, c)
			} else {
				Q && Q.push(a)
			}
			return this
		},
		eq: function(a) {
			return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function() {
			return this.pushStack(R.apply(this, arguments), "slice", R.call(arguments).join(","))
		},
		map: function(a) {
			return this.pushStack(c.map(this, function(b, d) {
				return a.call(b, d, b)
			}))
		},
		end: function() {
			return this.prevObject || c(null)
		},
		push: ba,
		sort: [].sort,
		splice: [].splice
	};
	c.fn.init.prototype = c.fn;
	c.extend = c.fn.extend = function() {
		var a = arguments[0] || {},
			b = 1,
			d = arguments.length,
			f = false,
			e, j, i, o;
		if (typeof a === "boolean") {
			f = a;
			a = arguments[1] || {};
			b = 2
		}
		if (typeof a !== "object" && !c.isFunction(a)) {
			a = {}
		}
		if (d === b) {
			a = this;
			--b
		}
		for (; b < d; b++) {
			if ((e = arguments[b]) != null) {
				for (j in e) {
					i = a[j];
					o = e[j];
					if (a !== o) {
						if (f && o && (c.isPlainObject(o) || c.isArray(o))) {
							i = i && (c.isPlainObject(i) || c.isArray(i)) ? i : c.isArray(o) ? [] : {};
							a[j] = c.extend(f, i, o)
						} else {
							if (o !== w) {
								a[j] = o
							}
						}
					}
				}
			}
		}
		return a
	};
	c.extend({
		noConflict: function(a) {
			A.$ = Sa;
			if (a) {
				A.jQuery = Ra
			}
			return c
		},
		isReady: false,
		ready: function() {
			if (!c.isReady) {
				if (!s.body) {
					return setTimeout(c.ready, 13)
				}
				c.isReady = true;
				if (Q) {
					for (var a, b = 0; a = Q[b++];) {
						a.call(s, c)
					}
					Q = null
				}
				c.fn.triggerHandler && c(s).triggerHandler("ready")
			}
		},
		bindReady: function() {
			if (!xa) {
				xa = true;
				if (s.readyState === "complete") {
					return c.ready()
				}
				if (s.addEventListener) {
					s.addEventListener("DOMContentLoaded", L, false);
					A.addEventListener("load", c.ready, false)
				} else {
					if (s.attachEvent) {
						s.attachEvent("onreadystatechange", L);
						A.attachEvent("onload", c.ready);
						var a = false;
						try {
							a = A.frameElement == null
						} catch (b) {}
						s.documentElement.doScroll && a && ma()
					}
				}
			}
		},
		isFunction: function(a) {
			return $.call(a) === "[object Function]"
		},
		isArray: function(a) {
			return $.call(a) === "[object Array]"
		},
		isPlainObject: function(a) {
			if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval) {
				return false
			}
			if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype, "isPrototypeOf")) {
				return false
			}
			var b;
			for (b in a) {}
			return b === w || aa.call(a, b)
		},
		isEmptyObject: function(a) {
			for (var b in a) {
				return false
			}
			return true
		},
		error: function(a) {
			throw a
		},
		parseJSON: function(a) {
			if (typeof a !== "string" || !a) {
				return null
			}
			a = c.trim(a);
			if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				return A.JSON && A.JSON.parse ? A.JSON.parse(a) : (new Function("return " + a))()
			} else {
				c.error("Invalid JSON: " + a)
			}
		},
		noop: function() {},
		globalEval: function(a) {
			if (a && Va.test(a)) {
				var b = s.getElementsByTagName("head")[0] || s.documentElement,
					d = s.createElement("script");
				d.type = "text/javascript";
				if (c.support.scriptEval) {
					d.appendChild(s.createTextNode(a))
				} else {
					d.text = a
				}
				b.insertBefore(d, b.firstChild);
				b.removeChild(d)
			}
		},
		nodeName: function(a, b) {
			return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
		},
		each: function(a, b, d) {
			var f, e = 0,
				j = a.length,
				i = j === w || c.isFunction(a);
			if (d) {
				if (i) {
					for (f in a) {
						if (b.apply(a[f], d) === false) {
							break
						}
					}
				} else {
					for (; e < j;) {
						if (b.apply(a[e++], d) === false) {
							break
						}
					}
				}
			} else {
				if (i) {
					for (f in a) {
						if (b.call(a[f], f, a[f]) === false) {
							break
						}
					}
				} else {
					for (d = a[0]; e < j && b.call(d, e, d) !== false; d = a[++e]) {}
				}
			}
			return a
		},
		trim: function(a) {
			return (a || "").replace(Wa, "")
		},
		makeArray: function(a, b) {
			b = b || [];
			if (a != null) {
				a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a)
			}
			return b
		},
		inArray: function(a, b) {
			if (b.indexOf) {
				return b.indexOf(a)
			}
			for (var d = 0, f = b.length; d < f; d++) {
				if (b[d] === a) {
					return d
				}
			}
			return -1
		},
		merge: function(a, b) {
			var d = a.length,
				f = 0;
			if (typeof b.length === "number") {
				for (var e = b.length; f < e; f++) {
					a[d++] = b[f]
				}
			} else {
				for (; b[f] !== w;) {
					a[d++] = b[f++]
				}
			}
			a.length = d;
			return a
		},
		grep: function(a, b, d) {
			for (var f = [], e = 0, j = a.length; e < j; e++) {
				!d !== !b(a[e], e) && f.push(a[e])
			}
			return f
		},
		map: function(a, b, d) {
			for (var f = [], e, j = 0, i = a.length; j < i; j++) {
				e = b(a[j], j, d);
				if (e != null) {
					f[f.length] = e
				}
			}
			return f.concat.apply([], f)
		},
		guid: 1,
		proxy: function(a, b, d) {
			if (arguments.length === 2) {
				if (typeof b === "string") {
					d = a;
					a = d[b];
					b = w
				} else {
					if (b && !c.isFunction(b)) {
						d = b;
						b = w
					}
				}
			}
			if (!b && a) {
				b = function() {
					return a.apply(d || this, arguments)
				}
			}
			if (a) {
				b.guid = a.guid = a.guid || b.guid || c.guid++
			}
			return b
		},
		uaMatch: function(a) {
			a = a.toLowerCase();
			a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
			return {
				browser: a[1] || "",
				version: a[2] || "0"
			}
		},
		browser: {}
	});
	P = c.uaMatch(P);
	if (P.browser) {
		c.browser[P.browser] = true;
		c.browser.version = P.version
	}
	if (c.browser.webkit) {
		c.browser.safari = true
	}
	if (ya) {
		c.inArray = function(a, b) {
			return ya.call(b, a)
		}
	}
	T = c(s);
	if (s.addEventListener) {
		L = function() {
			s.removeEventListener("DOMContentLoaded", L, false);
			c.ready()
		}
	} else {
		if (s.attachEvent) {
			L = function() {
				if (s.readyState === "complete") {
					s.detachEvent("onreadystatechange", L);
					c.ready()
				}
			}
		}
	}(function() {
		c.support = {};
		var a = s.documentElement,
			b = s.createElement("script"),
			d = s.createElement("div"),
			f = "script" + J();
		d.style.display = "none";
		d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		var e = d.getElementsByTagName("*"),
			j = d.getElementsByTagName("a")[0];
		if (!(!e || !e.length || !j)) {
			c.support = {
				leadingWhitespace: d.firstChild.nodeType === 3,
				tbody: !d.getElementsByTagName("tbody").length,
				htmlSerialize: !!d.getElementsByTagName("link").length,
				style: /red/.test(j.getAttribute("style")),
				hrefNormalized: j.getAttribute("href") === "/a",
				opacity: /^0.55$/.test(j.style.opacity),
				cssFloat: !!j.style.cssFloat,
				checkOn: d.getElementsByTagName("input")[0].value === "on",
				optSelected: s.createElement("select").appendChild(s.createElement("option")).selected,
				parentNode: d.removeChild(d.appendChild(s.createElement("div"))).parentNode === null,
				deleteExpando: true,
				checkClone: false,
				scriptEval: false,
				noCloneEvent: true,
				boxModel: null
			};
			b.type = "text/javascript";
			try {
				b.appendChild(s.createTextNode("window." + f + "=1;"))
			} catch (i) {}
			//a.insertBefore(b, a.firstChild);
			if (A[f]) {
				c.support.scriptEval = true;
				delete A[f]
			}
			try {
				delete b.test
			} catch (o) {
				c.support.deleteExpando = false
			}
			//a.removeChild(b);
			if (d.attachEvent && d.fireEvent) {
				d.attachEvent("onclick", function k() {
					c.support.noCloneEvent = false;
					d.detachEvent("onclick", k)
				});
				d.cloneNode(true).fireEvent("onclick")
			}
			d = s.createElement("div");
			d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
			a = s.createDocumentFragment();
			a.appendChild(d.firstChild);
			c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
			c(function() {
				var k = s.createElement("div");
				k.style.width = k.style.paddingLeft = "1px";
				s.body.appendChild(k);
				c.boxModel = c.support.boxModel = k.offsetWidth === 2;
				s.body.removeChild(k).style.display = "none"
			});
			a = function(k) {
				var n = s.createElement("div");
				k = "on" + k;
				var r = k in n;
				if (!r) {
					n.setAttribute(k, "return;");
					r = typeof n[k] === "function"
				}
				return r
			};
			c.support.submitBubbles = a("submit");
			c.support.changeBubbles = a("change");
			a = b = d = e = j = null
		}
	})();
	c.props = {
		"for": "htmlFor",
		"class": "className",
		readonly: "readOnly",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		rowspan: "rowSpan",
		colspan: "colSpan",
		tabindex: "tabIndex",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	var G = "jQuery" + J(),
		Ya = 0,
		za = {};
	c.extend({
		cache: {},
		expando: G,
		noData: {
			embed: true,
			object: true,
			applet: true
		},
		data: function(a, b, d) {
			if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
				a = a == A ? za : a;
				var f = a[G],
					e = c.cache;
				if (!f && typeof b === "string" && d === w) {
					return null
				}
				f || (f = ++Ya);
				if (typeof b === "object") {
					a[G] = f;
					e[f] = c.extend(true, {}, b)
				} else {
					if (!e[f]) {
						a[G] = f;
						e[f] = {}
					}
				}
				a = e[f];
				if (d !== w) {
					a[b] = d
				}
				return typeof b === "string" ? a[b] : a
			}
		},
		removeData: function(a, b) {
			if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
				a = a == A ? za : a;
				var d = a[G],
					f = c.cache,
					e = f[d];
				if (b) {
					if (e) {
						delete e[b];
						c.isEmptyObject(e) && c.removeData(a)
					}
				} else {
					if (c.support.deleteExpando) {
						delete a[c.expando]
					} else {
						a.removeAttribute && a.removeAttribute(c.expando)
					}
					delete f[d]
				}
			}
		}
	});
	c.fn.extend({
		data: function(a, b) {
			if (typeof a === "undefined" && this.length) {
				return c.data(this[0])
			} else {
				if (typeof a === "object") {
					return this.each(function() {
						c.data(this, a)
					})
				}
			}
			var d = a.split(".");
			d[1] = d[1] ? "." + d[1] : "";
			if (b === w) {
				var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
				if (f === w && this.length) {
					f = c.data(this[0], a)
				}
				return f === w && d[1] ? this.data(d[0]) : f
			} else {
				return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function() {
					c.data(this, a, b)
				})
			}
		},
		removeData: function(a) {
			return this.each(function() {
				c.removeData(this, a)
			})
		}
	});
	c.extend({
		queue: function(a, b, d) {
			if (a) {
				b = (b || "fx") + "queue";
				var f = c.data(a, b);
				if (!d) {
					return f || []
				}
				if (!f || c.isArray(d)) {
					f = c.data(a, b, c.makeArray(d))
				} else {
					f.push(d)
				}
				return f
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var d = c.queue(a, b),
				f = d.shift();
			if (f === "inprogress") {
				f = d.shift()
			}
			if (f) {
				b === "fx" && d.unshift("inprogress");
				f.call(a, function() {
					c.dequeue(a, b)
				})
			}
		}
	});
	c.fn.extend({
		queue: function(a, b) {
			if (typeof a !== "string") {
				b = a;
				a = "fx"
			}
			if (b === w) {
				return c.queue(this[0], a)
			}
			return this.each(function() {
				var d = c.queue(this, a, b);
				a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				c.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = c.fx ? c.fx.speeds[a] || a : a;
			b = b || "fx";
			return this.queue(b, function() {
				var d = this;
				setTimeout(function() {
					c.dequeue(d, b)
				}, a)
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		}
	});
	var Aa = /[\n\t]/g,
		ca = /\s+/,
		Za = /\r/g,
		$a = /href|src|style/,
		ab = /(button|input)/i,
		bb = /(button|input|object|select|textarea)/i,
		cb = /^(a|area)$/i,
		Ba = /radio|checkbox/;
	c.fn.extend({
		attr: function(a, b) {
			return X(this, a, b, true, c.attr)
		},
		removeAttr: function(a) {
			return this.each(function() {
				c.attr(this, a, "");
				this.nodeType === 1 && this.removeAttribute(a)
			})
		},
		addClass: function(a) {
			if (c.isFunction(a)) {
				return this.each(function(n) {
					var r = c(this);
					r.addClass(a.call(this, n, r.attr("class")))
				})
			}
			if (a && typeof a === "string") {
				for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
					var e = this[d];
					if (e.nodeType === 1) {
						if (e.className) {
							for (var j = " " + e.className + " ", i = e.className, o = 0, k = b.length; o < k; o++) {
								if (j.indexOf(" " + b[o] + " ") < 0) {
									i += " " + b[o]
								}
							}
							e.className = c.trim(i)
						} else {
							e.className = a
						}
					}
				}
			}
			return this
		},
		removeClass: function(a) {
			if (c.isFunction(a)) {
				return this.each(function(k) {
					var n = c(this);
					n.removeClass(a.call(this, k, n.attr("class")))
				})
			}
			if (a && typeof a === "string" || a === w) {
				for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
					var e = this[d];
					if (e.nodeType === 1 && e.className) {
						if (a) {
							for (var j = (" " + e.className + " ").replace(Aa, " "), i = 0, o = b.length; i < o; i++) {
								j = j.replace(" " + b[i] + " ", " ")
							}
							e.className = c.trim(j)
						} else {
							e.className = ""
						}
					}
				}
			}
			return this
		},
		toggleClass: function(a, b) {
			var d = typeof a,
				f = typeof b === "boolean";
			if (c.isFunction(a)) {
				return this.each(function(e) {
					var j = c(this);
					j.toggleClass(a.call(this, e, j.attr("class"), b), b)
				})
			}
			return this.each(function() {
				if (d === "string") {
					for (var e, j = 0, i = c(this), o = b, k = a.split(ca); e = k[j++];) {
						o = f ? o : !i.hasClass(e);
						i[o ? "addClass" : "removeClass"](e)
					}
				} else {
					if (d === "undefined" || d === "boolean") {
						this.className && c.data(this, "__className__", this.className);
						this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
					}
				}
			})
		},
		hasClass: function(a) {
			a = " " + a + " ";
			for (var b = 0, d = this.length; b < d; b++) {
				if ((" " + this[b].className + " ").replace(Aa, " ").indexOf(a) > -1) {
					return true
				}
			}
			return false
		},
		val: function(a) {
			if (a === w) {
				var b = this[0];
				if (b) {
					if (c.nodeName(b, "option")) {
						return (b.attributes.value || {}).specified ? b.value : b.text
					}
					if (c.nodeName(b, "select")) {
						var d = b.selectedIndex,
							f = [],
							e = b.options;
						b = b.type === "select-one";
						if (d < 0) {
							return null
						}
						var j = b ? d : 0;
						for (d = b ? d + 1 : e.length; j < d; j++) {
							var i = e[j];
							if (i.selected) {
								a = c(i).val();
								if (b) {
									return a
								}
								f.push(a)
							}
						}
						return f
					}
					if (Ba.test(b.type) && !c.support.checkOn) {
						return b.getAttribute("value") === null ? "on" : b.value
					}
					return (b.value || "").replace(Za, "")
				}
				return w
			}
			var o = c.isFunction(a);
			return this.each(function(k) {
				var n = c(this),
					r = a;
				if (this.nodeType === 1) {
					if (o) {
						r = a.call(this, k, n.val())
					}
					if (typeof r === "number") {
						r += ""
					}
					if (c.isArray(r) && Ba.test(this.type)) {
						this.checked = c.inArray(n.val(), r) >= 0
					} else {
						if (c.nodeName(this, "select")) {
							var u = c.makeArray(r);
							c("option", this).each(function() {
								this.selected = c.inArray(c(this).val(), u) >= 0
							});
							if (!u.length) {
								this.selectedIndex = -1
							}
						} else {
							this.value = r
						}
					}
				}
			})
		}
	});
	c.extend({
		attrFn: {
			val: true,
			css: true,
			html: true,
			text: true,
			data: true,
			width: true,
			height: true,
			offset: true
		},
		attr: function(a, b, d, f) {
			if (!a || a.nodeType === 3 || a.nodeType === 8) {
				return w
			}
			if (f && b in c.attrFn) {
				return c(a)[b](d)
			}
			f = a.nodeType !== 1 || !c.isXMLDoc(a);
			var e = d !== w;
			b = f && c.props[b] || b;
			if (a.nodeType === 1) {
				var j = $a.test(b);
				if (b in a && f && !j) {
					if (e) {
						b === "type" && ab.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
						a[b] = d
					}
					if (c.nodeName(a, "form") && a.getAttributeNode(b)) {
						return a.getAttributeNode(b).nodeValue
					}
					if (b === "tabIndex") {
						return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : bb.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : w
					}
					return a[b]
				}
				if (!c.support.style && f && b === "style") {
					if (e) {
						a.style.cssText = "" + d
					}
					return a.style.cssText
				}
				e && a.setAttribute(b, "" + d);
				a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b);
				return a === null ? w : a
			}
			return c.style(a, b, d)
		}
	});
	var O = /\.(.*)$/,
		db = function(a) {
			return a.replace(/[^\w\s\.\|`]/g, function(b) {
				return "\\" + b
			})
		};
	c.event = {
		add: function(a, b, d, f) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				if (a.setInterval && a !== A && !a.frameElement) {
					a = A
				}
				var e, j;
				if (d.handler) {
					e = d;
					d = e.handler
				}
				if (!d.guid) {
					d.guid = c.guid++
				}
				if (j = c.data(a)) {
					var i = j.events = j.events || {},
						o = j.handle;
					if (!o) {
						j.handle = o = function() {
							return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : w
						}
					}
					o.elem = a;
					b = b.split(" ");
					for (var k, n = 0, r; k = b[n++];) {
						j = e ? c.extend({}, e) : {
							handler: d,
							data: f
						};
						if (k.indexOf(".") > -1) {
							r = k.split(".");
							k = r.shift();
							j.namespace = r.slice(0).sort().join(".")
						} else {
							r = [];
							j.namespace = ""
						}
						j.type = k;
						j.guid = d.guid;
						var u = i[k],
							z = c.event.special[k] || {};
						if (!u) {
							u = i[k] = [];
							if (!z.setup || z.setup.call(a, f, r, o) === false) {
								if (a.addEventListener) {
									a.addEventListener(k, o, false)
								} else {
									a.attachEvent && a.attachEvent("on" + k, o)
								}
							}
						}
						if (z.add) {
							z.add.call(a, j);
							if (!j.handler.guid) {
								j.handler.guid = d.guid
							}
						}
						u.push(j);
						c.event.global[k] = true
					}
					a = null
				}
			}
		},
		global: {},
		remove: function(a, b, d, f) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				var e, j = 0,
					i, o, k, n, r, u, z = c.data(a),
					C = z && z.events;
				if (z && C) {
					if (b && b.type) {
						d = b.handler;
						b = b.type
					}
					if (!b || typeof b === "string" && b.charAt(0) === ".") {
						b = b || "";
						for (e in C) {
							c.event.remove(a, e + b)
						}
					} else {
						for (b = b.split(" "); e = b[j++];) {
							n = e;
							i = e.indexOf(".") < 0;
							o = [];
							if (!i) {
								o = e.split(".");
								e = o.shift();
								k = new RegExp("(^|\\.)" + c.map(o.slice(0).sort(), db).join("\\.(?:.*\\.)?") + "(\\.|$)")
							}
							if (r = C[e]) {
								if (d) {
									n = c.event.special[e] || {};
									for (B = f || 0; B < r.length; B++) {
										u = r[B];
										if (d.guid === u.guid) {
											if (i || k.test(u.namespace)) {
												f == null && r.splice(B--, 1);
												n.remove && n.remove.call(a, u)
											}
											if (f != null) {
												break
											}
										}
									}
									if (r.length === 0 || f != null && r.length === 1) {
										if (!n.teardown || n.teardown.call(a, o) === false) {
											Ca(a, e, z.handle)
										}
										delete C[e]
									}
								} else {
									for (var B = 0; B < r.length; B++) {
										u = r[B];
										if (i || k.test(u.namespace)) {
											c.event.remove(a, n, u.handler, B);
											r.splice(B--, 1)
										}
									}
								}
							}
						}
						if (c.isEmptyObject(C)) {
							if (b = z.handle) {
								b.elem = null
							}
							delete z.events;
							delete z.handle;
							c.isEmptyObject(z) && c.removeData(a)
						}
					}
				}
			}
		},
		trigger: function(a, b, d, f) {
			var e = a.type || a;
			if (!f) {
				a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e);
				if (e.indexOf("!") >= 0) {
					a.type = e = e.slice(0, -1);
					a.exclusive = true
				}
				if (!d) {
					a.stopPropagation();
					c.event.global[e] && c.each(c.cache, function() {
						this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
					})
				}
				if (!d || d.nodeType === 3 || d.nodeType === 8) {
					return w
				}
				a.result = w;
				a.target = d;
				b = c.makeArray(b);
				b.unshift(a)
			}
			a.currentTarget = d;
			(f = c.data(d, "handle")) && f.apply(d, b);
			f = d.parentNode || d.ownerDocument;
			try {
				if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) {
					if (d["on" + e] && d["on" + e].apply(d, b) === false) {
						a.result = false
					}
				}
			} catch (j) {}
			if (!a.isPropagationStopped() && f) {
				c.event.trigger(a, b, f, true)
			} else {
				if (!a.isDefaultPrevented()) {
					f = a.target;
					var i, o = c.nodeName(f, "a") && e === "click",
						k = c.event.special[e] || {};
					if ((!k._default || k._default.call(d, a) === false) && !o && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) {
						try {
							if (f[e]) {
								if (i = f["on" + e]) {
									f["on" + e] = null
								}
								c.event.triggered = true;
								f[e]()
							}
						} catch (n) {}
						if (i) {
							f["on" + e] = i
						}
						c.event.triggered = false
					}
				}
			}
		},
		handle: function(a) {
			var b, d, f, e;
			a = arguments[0] = c.event.fix(a || A.event);
			a.currentTarget = this;
			b = a.type.indexOf(".") < 0 && !a.exclusive;
			if (!b) {
				d = a.type.split(".");
				a.type = d.shift();
				f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
			}
			e = c.data(this, "events");
			d = e[a.type];
			if (e && d) {
				d = d.slice(0);
				e = 0;
				for (var j = d.length; e < j; e++) {
					var i = d[e];
					if (b || f.test(i.namespace)) {
						a.handler = i.handler;
						a.data = i.data;
						a.handleObj = i;
						i = i.handler.apply(this, arguments);
						if (i !== w) {
							a.result = i;
							if (i === false) {
								a.preventDefault();
								a.stopPropagation()
							}
						}
						if (a.isImmediatePropagationStopped()) {
							break
						}
					}
				}
			}
			return a.result
		},
		props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
		fix: function(a) {
			if (a[G]) {
				return a
			}
			var b = a;
			a = c.Event(b);
			for (var d = this.props.length, f; d;) {
				f = this.props[--d];
				a[f] = b[f]
			}
			if (!a.target) {
				a.target = a.srcElement || s
			}
			if (a.target.nodeType === 3) {
				a.target = a.target.parentNode
			}
			if (!a.relatedTarget && a.fromElement) {
				a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement
			}
			if (a.pageX == null && a.clientX != null) {
				b = s.documentElement;
				d = s.body;
				a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
				a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
			}
			if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) {
				a.which = a.charCode || a.keyCode
			}
			if (!a.metaKey && a.ctrlKey) {
				a.metaKey = a.ctrlKey
			}
			if (!a.which && a.button !== w) {
				a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0
			}
			return a
		},
		guid: 100000000,
		proxy: c.proxy,
		special: {
			ready: {
				setup: c.bindReady,
				teardown: c.noop
			},
			live: {
				add: function(a) {
					c.event.add(this, a.origType, c.extend({}, a, {
						handler: oa
					}))
				},
				remove: function(a) {
					var b = true,
						d = a.origType.replace(O, "");
					c.each(c.data(this, "events").live || [], function() {
						if (d === this.origType.replace(O, "")) {
							return b = false
						}
					});
					b && c.event.remove(this, a.origType, oa)
				}
			},
			beforeunload: {
				setup: function(a, b, d) {
					if (this.setInterval) {
						this.onbeforeunload = d
					}
					return false
				},
				teardown: function(a, b) {
					if (this.onbeforeunload === b) {
						this.onbeforeunload = null
					}
				}
			}
		}
	};
	var Ca = s.removeEventListener ? function(a, b, d) {
		a.removeEventListener(b, d, false)
	} : function(a, b, d) {
		a.detachEvent("on" + b, d)
	};
	c.Event = function(a) {
		if (!this.preventDefault) {
			return new c.Event(a)
		}
		if (a && a.type) {
			this.originalEvent = a;
			this.type = a.type
		} else {
			this.type = a
		}
		this.timeStamp = J();
		this[G] = true
	};
	c.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = Z;
			var a = this.originalEvent;
			if (a) {
				a.preventDefault && a.preventDefault();
				a.returnValue = false
			}
		},
		stopPropagation: function() {
			this.isPropagationStopped = Z;
			var a = this.originalEvent;
			if (a) {
				a.stopPropagation && a.stopPropagation();
				a.cancelBubble = true
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = Z;
			this.stopPropagation()
		},
		isDefaultPrevented: Y,
		isPropagationStopped: Y,
		isImmediatePropagationStopped: Y
	};
	var Da = function(a) {
			var b = a.relatedTarget;
			try {
				for (; b && b !== this;) {
					b = b.parentNode
				}
				if (b !== this) {
					a.type = a.data;
					c.event.handle.apply(this, arguments)
				}
			} catch (d) {}
		},
		Ea = function(a) {
			a.type = a.data;
			c.event.handle.apply(this, arguments)
		};
	c.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		c.event.special[a] = {
			setup: function(d) {
				c.event.add(this, b, d && d.selector ? Ea : Da, a)
			},
			teardown: function(d) {
				c.event.remove(this, b, d && d.selector ? Ea : Da)
			}
		}
	});
	if (!c.support.submitBubbles) {
		c.event.special.submit = {
			setup: function() {
				if (this.nodeName.toLowerCase() !== "form") {
					c.event.add(this, "click.specialSubmit", function(a) {
						var b = a.target,
							d = b.type;
						if ((d === "submit" || d === "image") && c(b).closest("form").length) {
							return na("submit", this, arguments)
						}
					});
					c.event.add(this, "keypress.specialSubmit", function(a) {
						var b = a.target,
							d = b.type;
						if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
							return na("submit", this, arguments)
						}
					})
				} else {
					return false
				}
			},
			teardown: function() {
				c.event.remove(this, ".specialSubmit")
			}
		}
	}
	if (!c.support.changeBubbles) {
		var da = /textarea|input|select/i,
			ea, Fa = function(a) {
				var b = a.type,
					d = a.value;
				if (b === "radio" || b === "checkbox") {
					d = a.checked
				} else {
					if (b === "select-multiple") {
						d = a.selectedIndex > -1 ? c.map(a.options, function(f) {
							return f.selected
						}).join("-") : ""
					} else {
						if (a.nodeName.toLowerCase() === "select") {
							d = a.selectedIndex
						}
					}
				}
				return d
			},
			fa = function(a, b) {
				var d = a.target,
					f, e;
				if (!(!da.test(d.nodeName) || d.readOnly)) {
					f = c.data(d, "_change_data");
					e = Fa(d);
					if (a.type !== "focusout" || d.type !== "radio") {
						c.data(d, "_change_data", e)
					}
					if (!(f === w || e === f)) {
						if (f != null || e) {
							a.type = "change";
							return c.event.trigger(a, b, d)
						}
					}
				}
			};
		c.event.special.change = {
			filters: {
				focusout: fa,
				click: function(a) {
					var b = a.target,
						d = b.type;
					if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") {
						return fa.call(this, a)
					}
				},
				keydown: function(a) {
					var b = a.target,
						d = b.type;
					if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") {
						return fa.call(this, a)
					}
				},
				beforeactivate: function(a) {
					a = a.target;
					c.data(a, "_change_data", Fa(a))
				}
			},
			setup: function() {
				if (this.type === "file") {
					return false
				}
				for (var a in ea) {
					c.event.add(this, a + ".specialChange", ea[a])
				}
				return da.test(this.nodeName)
			},
			teardown: function() {
				c.event.remove(this, ".specialChange");
				return da.test(this.nodeName)
			}
		};
		ea = c.event.special.change.filters
	}
	s.addEventListener && c.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		function d(f) {
			f = c.event.fix(f);
			f.type = b;
			return c.event.handle.call(this, f)
		}
		c.event.special[b] = {
			setup: function() {
				this.addEventListener(a, d, true)
			},
			teardown: function() {
				this.removeEventListener(a, d, true)
			}
		}
	});
	c.each(["bind", "one"], function(a, b) {
		c.fn[b] = function(d, f, e) {
			if (typeof d === "object") {
				for (var j in d) {
					this[b](j, f, d[j], e)
				}
				return this
			}
			if (c.isFunction(f)) {
				e = f;
				f = w
			}
			var i = b === "one" ? c.proxy(e, function(k) {
				c(this).unbind(k, i);
				return e.apply(this, arguments)
			}) : e;
			if (d === "unload" && b !== "one") {
				this.one(d, f, e)
			} else {
				j = 0;
				for (var o = this.length; j < o; j++) {
					c.event.add(this[j], d, i, f)
				}
			}
			return this
		}
	});
	c.fn.extend({
		unbind: function(a, b) {
			if (typeof a === "object" && !a.preventDefault) {
				for (var d in a) {
					this.unbind(d, a[d])
				}
			} else {
				d = 0;
				for (var f = this.length; d < f; d++) {
					c.event.remove(this[d], a, b)
				}
			}
			return this
		},
		delegate: function(a, b, d, f) {
			return this.live(b, d, f, a)
		},
		undelegate: function(a, b, d) {
			return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
		},
		trigger: function(a, b) {
			return this.each(function() {
				c.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) {
				a = c.Event(a);
				a.preventDefault();
				a.stopPropagation();
				c.event.trigger(a, b, this[0]);
				return a.result
			}
		},
		toggle: function(a) {
			for (var b = arguments, d = 1; d < b.length;) {
				c.proxy(a, b[d++])
			}
			return this.click(c.proxy(a, function(f) {
				var e = (c.data(this, "lastToggle" + a.guid) || 0) % d;
				c.data(this, "lastToggle" + a.guid, e + 1);
				f.preventDefault();
				return b[e].apply(this, arguments) || false
			}))
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	});
	var Ga = {
		focus: "focusin",
		blur: "focusout",
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	};
	c.each(["live", "die"], function(a, b) {
		c.fn[b] = function(d, f, e, j) {
			var i, o = 0,
				k, n, r = j || this.selector,
				u = j ? this : c(this.context);
			if (c.isFunction(f)) {
				e = f;
				f = w
			}
			for (d = (d || "").split(" ");
				(i = d[o++]) != null;) {
				j = O.exec(i);
				k = "";
				if (j) {
					k = j[0];
					i = i.replace(O, "")
				}
				if (i === "hover") {
					d.push("mouseenter" + k, "mouseleave" + k)
				} else {
					n = i;
					if (i === "focus" || i === "blur") {
						d.push(Ga[i] + k);
						i += k
					} else {
						i = (Ga[i] || i) + k
					}
					b === "live" ? u.each(function() {
						c.event.add(this, pa(i, r), {
							data: f,
							selector: r,
							handler: e,
							origType: i,
							origHandler: e,
							preType: n
						})
					}) : u.unbind(pa(i, r), e)
				}
			}
			return this
		}
	});
	c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
		c.fn[b] = function(d) {
			return d ? this.bind(b, d) : this.trigger(b)
		};
		if (c.attrFn) {
			c.attrFn[b] = true
		}
	});
	A.attachEvent && !A.addEventListener && A.attachEvent("onunload", function() {
		for (var a in c.cache) {
			if (c.cache[a].handle) {
				try {
					c.event.remove(c.cache[a].handle.elem)
				} catch (b) {}
			}
		}
	});
	(function() {
		function a(g) {
			for (var h = "", l, m = 0; g[m]; m++) {
				l = g[m];
				if (l.nodeType === 3 || l.nodeType === 4) {
					h += l.nodeValue
				} else {
					if (l.nodeType !== 8) {
						h += a(l.childNodes)
					}
				}
			}
			return h
		}

		function b(g, h, l, m, q, p) {
			q = 0;
			for (var v = m.length; q < v; q++) {
				var t = m[q];
				if (t) {
					t = t[g];
					for (var y = false; t;) {
						if (t.sizcache === l) {
							y = m[t.sizset];
							break
						}
						if (t.nodeType === 1 && !p) {
							t.sizcache = l;
							t.sizset = q
						}
						if (t.nodeName.toLowerCase() === h) {
							y = t;
							break
						}
						t = t[g]
					}
					m[q] = y
				}
			}
		}

		function d(g, h, l, m, q, p) {
			q = 0;
			for (var v = m.length; q < v; q++) {
				var t = m[q];
				if (t) {
					t = t[g];
					for (var y = false; t;) {
						if (t.sizcache === l) {
							y = m[t.sizset];
							break
						}
						if (t.nodeType === 1) {
							if (!p) {
								t.sizcache = l;
								t.sizset = q
							}
							if (typeof h !== "string") {
								if (t === h) {
									y = true;
									break
								}
							} else {
								if (k.filter(h, [t]).length > 0) {
									y = t;
									break
								}
							}
						}
						t = t[g]
					}
					m[q] = y
				}
			}
		}
		var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			e = 0,
			j = Object.prototype.toString,
			i = false,
			o = true;
		[0, 0].sort(function() {
			o = false;
			return 0
		});
		var k = function(g, h, l, m) {
			l = l || [];
			var q = h = h || s;
			if (h.nodeType !== 1 && h.nodeType !== 9) {
				return []
			}
			if (!g || typeof g !== "string") {
				return l
			}
			for (var p = [], v, t, y, S, H = true, M = x(h), I = g;
				(f.exec(""), v = f.exec(I)) !== null;) {
				I = v[3];
				p.push(v[1]);
				if (v[2]) {
					S = v[3];
					break
				}
			}
			if (p.length > 1 && r.exec(g)) {
				if (p.length === 2 && n.relative[p[0]]) {
					t = ga(p[0] + p[1], h)
				} else {
					for (t = n.relative[p[0]] ? [h] : k(p.shift(), h); p.length;) {
						g = p.shift();
						if (n.relative[g]) {
							g += p.shift()
						}
						t = ga(g, t)
					}
				}
			} else {
				if (!m && p.length > 1 && h.nodeType === 9 && !M && n.match.ID.test(p[0]) && !n.match.ID.test(p[p.length - 1])) {
					v = k.find(p.shift(), h, M);
					h = v.expr ? k.filter(v.expr, v.set)[0] : v.set[0]
				}
				if (h) {
					v = m ? {
						expr: p.pop(),
						set: z(m)
					} : k.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M);
					t = v.expr ? k.filter(v.expr, v.set) : v.set;
					if (p.length > 0) {
						y = z(t)
					} else {
						H = false
					}
					for (; p.length;) {
						var D = p.pop();
						v = D;
						if (n.relative[D]) {
							v = p.pop()
						} else {
							D = ""
						} if (v == null) {
							v = h
						}
						n.relative[D](y, v, M)
					}
				} else {
					y = []
				}
			}
			y || (y = t);
			y || k.error(D || g);
			if (j.call(y) === "[object Array]") {
				if (H) {
					if (h && h.nodeType === 1) {
						for (g = 0; y[g] != null; g++) {
							if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g]))) {
								l.push(t[g])
							}
						}
					} else {
						for (g = 0; y[g] != null; g++) {
							y[g] && y[g].nodeType === 1 && l.push(t[g])
						}
					}
				} else {
					l.push.apply(l, y)
				}
			} else {
				z(y, l)
			} if (S) {
				k(S, q, l, m);
				k.uniqueSort(l)
			}
			return l
		};
		k.uniqueSort = function(g) {
			if (B) {
				i = o;
				g.sort(B);
				if (i) {
					for (var h = 1; h < g.length; h++) {
						g[h] === g[h - 1] && g.splice(h--, 1)
					}
				}
			}
			return g
		};
		k.matches = function(g, h) {
			return k(g, null, null, h)
		};
		k.find = function(g, h, l) {
			var m, q;
			if (!g) {
				return []
			}
			for (var p = 0, v = n.order.length; p < v; p++) {
				var t = n.order[p];
				if (q = n.leftMatch[t].exec(g)) {
					var y = q[1];
					q.splice(1, 1);
					if (y.substr(y.length - 1) !== "\\") {
						q[1] = (q[1] || "").replace(/\\/g, "");
						m = n.find[t](q, h, l);
						if (m != null) {
							g = g.replace(n.match[t], "");
							break
						}
					}
				}
			}
			m || (m = h.getElementsByTagName("*"));
			return {
				set: m,
				expr: g
			}
		};
		k.filter = function(g, h, l, m) {
			for (var q = g, p = [], v = h, t, y, S = h && h[0] && x(h[0]); g && h.length;) {
				for (var H in n.filter) {
					if ((t = n.leftMatch[H].exec(g)) != null && t[2]) {
						var M = n.filter[H],
							I, D;
						D = t[1];
						y = false;
						t.splice(1, 1);
						if (D.substr(D.length - 1) !== "\\") {
							if (v === p) {
								p = []
							}
							if (n.preFilter[H]) {
								if (t = n.preFilter[H](t, v, l, p, m, S)) {
									if (t === true) {
										continue
									}
								} else {
									y = I = true
								}
							}
							if (t) {
								for (var U = 0;
									(D = v[U]) != null; U++) {
									if (D) {
										I = M(D, t, U, v);
										var Ha = m ^ !!I;
										if (l && I != null) {
											if (Ha) {
												y = true
											} else {
												v[U] = false
											}
										} else {
											if (Ha) {
												p.push(D);
												y = true
											}
										}
									}
								}
							}
							if (I !== w) {
								l || (v = p);
								g = g.replace(n.match[H], "");
								if (!y) {
									return []
								}
								break
							}
						}
					}
				}
				if (g === q) {
					if (y == null) {
						k.error(g)
					} else {
						break
					}
				}
				q = g
			}
			return v
		};
		k.error = function(g) {
			throw "Syntax error, unrecognized expression: " + g
		};
		var n = k.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function(g) {
						return g.getAttribute("href")
					}
				},
				relative: {
					"+": function(g, h) {
						var l = typeof h === "string",
							m = l && !/\W/.test(h);
						l = l && !m;
						if (m) {
							h = h.toLowerCase()
						}
						m = 0;
						for (var q = g.length, p; m < q; m++) {
							if (p = g[m]) {
								for (;
									(p = p.previousSibling) && p.nodeType !== 1;) {}
								g[m] = l || p && p.nodeName.toLowerCase() === h ? p || false : p === h
							}
						}
						l && k.filter(h, g, true)
					},
					">": function(g, h) {
						var l = typeof h === "string";
						if (l && !/\W/.test(h)) {
							h = h.toLowerCase();
							for (var m = 0, q = g.length; m < q; m++) {
								var p = g[m];
								if (p) {
									l = p.parentNode;
									g[m] = l.nodeName.toLowerCase() === h ? l : false
								}
							}
						} else {
							m = 0;
							for (q = g.length; m < q; m++) {
								if (p = g[m]) {
									g[m] = l ? p.parentNode : p.parentNode === h
								}
							}
							l && k.filter(h, g, true)
						}
					},
					"": function(g, h, l) {
						var m = e++,
							q = d;
						if (typeof h === "string" && !/\W/.test(h)) {
							var p = h = h.toLowerCase();
							q = b
						}
						q("parentNode", h, m, g, p, l)
					},
					"~": function(g, h, l) {
						var m = e++,
							q = d;
						if (typeof h === "string" && !/\W/.test(h)) {
							var p = h = h.toLowerCase();
							q = b
						}
						q("previousSibling", h, m, g, p, l)
					}
				},
				find: {
					ID: function(g, h, l) {
						if (typeof h.getElementById !== "undefined" && !l) {
							return (g = h.getElementById(g[1])) ? [g] : []
						}
					},
					NAME: function(g, h) {
						if (typeof h.getElementsByName !== "undefined") {
							var l = [];
							h = h.getElementsByName(g[1]);
							for (var m = 0, q = h.length; m < q; m++) {
								h[m].getAttribute("name") === g[1] && l.push(h[m])
							}
							return l.length === 0 ? null : l
						}
					},
					TAG: function(g, h) {
						return h.getElementsByTagName(g[1])
					}
				},
				preFilter: {
					CLASS: function(g, h, l, m, q, p) {
						g = " " + g[1].replace(/\\/g, "") + " ";
						if (p) {
							return g
						}
						p = 0;
						for (var v;
							(v = h[p]) != null; p++) {
							if (v) {
								if (q ^ (v.className && (" " + v.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) {
									l || m.push(v)
								} else {
									if (l) {
										h[p] = false
									}
								}
							}
						}
						return false
					},
					ID: function(g) {
						return g[1].replace(/\\/g, "")
					},
					TAG: function(g) {
						return g[1].toLowerCase()
					},
					CHILD: function(g) {
						if (g[1] === "nth") {
							var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
							g[2] = h[1] + (h[2] || 1) - 0;
							g[3] = h[3] - 0
						}
						g[0] = e++;
						return g
					},
					ATTR: function(g, h, l, m, q, p) {
						h = g[1].replace(/\\/g, "");
						if (!p && n.attrMap[h]) {
							g[1] = n.attrMap[h]
						}
						if (g[2] === "~=") {
							g[4] = " " + g[4] + " "
						}
						return g
					},
					PSEUDO: function(g, h, l, m, q) {
						if (g[1] === "not") {
							if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) {
								g[3] = k(g[3], null, null, h)
							} else {
								g = k.filter(g[3], h, l, true ^ q);
								l || m.push.apply(m, g);
								return false
							}
						} else {
							if (n.match.POS.test(g[0]) || n.match.CHILD.test(g[0])) {
								return true
							}
						}
						return g
					},
					POS: function(g) {
						g.unshift(true);
						return g
					}
				},
				filters: {
					enabled: function(g) {
						return g.disabled === false && g.type !== "hidden"
					},
					disabled: function(g) {
						return g.disabled === true
					},
					checked: function(g) {
						return g.checked === true
					},
					selected: function(g) {
						return g.selected === true
					},
					parent: function(g) {
						return !!g.firstChild
					},
					empty: function(g) {
						return !g.firstChild
					},
					has: function(g, h, l) {
						return !!k(l[3], g).length
					},
					header: function(g) {
						return /h\d/i.test(g.nodeName)
					},
					text: function(g) {
						return "text" === g.type
					},
					radio: function(g) {
						return "radio" === g.type
					},
					checkbox: function(g) {
						return "checkbox" === g.type
					},
					file: function(g) {
						return "file" === g.type
					},
					password: function(g) {
						return "password" === g.type
					},
					submit: function(g) {
						return "submit" === g.type
					},
					image: function(g) {
						return "image" === g.type
					},
					reset: function(g) {
						return "reset" === g.type
					},
					button: function(g) {
						return "button" === g.type || g.nodeName.toLowerCase() === "button"
					},
					input: function(g) {
						return /input|select|textarea|button/i.test(g.nodeName)
					}
				},
				setFilters: {
					first: function(g, h) {
						return h === 0
					},
					last: function(g, h, l, m) {
						return h === m.length - 1
					},
					even: function(g, h) {
						return h % 2 === 0
					},
					odd: function(g, h) {
						return h % 2 === 1
					},
					lt: function(g, h, l) {
						return h < l[3] - 0
					},
					gt: function(g, h, l) {
						return h > l[3] - 0
					},
					nth: function(g, h, l) {
						return l[3] - 0 === h
					},
					eq: function(g, h, l) {
						return l[3] - 0 === h
					}
				},
				filter: {
					PSEUDO: function(g, h, l, m) {
						var q = h[1],
							p = n.filters[q];
						if (p) {
							return p(g, l, h, m)
						} else {
							if (q === "contains") {
								return (g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0
							} else {
								if (q === "not") {
									h = h[3];
									l = 0;
									for (m = h.length; l < m; l++) {
										if (h[l] === g) {
											return false
										}
									}
									return true
								} else {
									k.error("Syntax error, unrecognized expression: " + q)
								}
							}
						}
					},
					CHILD: function(g, h) {
						var l = h[1],
							m = g;
						switch (l) {
							case "only":
							case "first":
								for (; m = m.previousSibling;) {
									if (m.nodeType === 1) {
										return false
									}
								}
								if (l === "first") {
									return true
								}
								m = g;
							case "last":
								for (; m = m.nextSibling;) {
									if (m.nodeType === 1) {
										return false
									}
								}
								return true;
							case "nth":
								l = h[2];
								var q = h[3];
								if (l === 1 && q === 0) {
									return true
								}
								h = h[0];
								var p = g.parentNode;
								if (p && (p.sizcache !== h || !g.nodeIndex)) {
									var v = 0;
									for (m = p.firstChild; m; m = m.nextSibling) {
										if (m.nodeType === 1) {
											m.nodeIndex = ++v
										}
									}
									p.sizcache = h
								}
								g = g.nodeIndex - q;
								return l === 0 ? g === 0 : g % l === 0 && g / l >= 0
						}
					},
					ID: function(g, h) {
						return g.nodeType === 1 && g.getAttribute("id") === h
					},
					TAG: function(g, h) {
						return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
					},
					CLASS: function(g, h) {
						return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
					},
					ATTR: function(g, h) {
						var l = h[1];
						g = n.attrHandle[l] ? n.attrHandle[l](g) : g[l] != null ? g[l] : g.getAttribute(l);
						l = g + "";
						var m = h[2];
						h = h[4];
						return g == null ? m === "!=" : m === "=" ? l === h : m === "*=" ? l.indexOf(h) >= 0 : m === "~=" ? (" " + l + " ").indexOf(h) >= 0 : !h ? l && g !== false : m === "!=" ? l !== h : m === "^=" ? l.indexOf(h) === 0 : m === "$=" ? l.substr(l.length - h.length) === h : m === "|=" ? l === h || l.substr(0, h.length + 1) === h + "-" : false
					},
					POS: function(g, h, l, m) {
						var q = n.setFilters[h[2]];
						if (q) {
							return q(g, l, h, m)
						}
					}
				}
			},
			r = n.match.POS;
		for (var u in n.match) {
			n.match[u] = new RegExp(n.match[u].source + /(?![^\[]*\])(?![^\(]*\))/.source);
			n.leftMatch[u] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[u].source.replace(/\\(\d+)/g, function(g, h) {
				return "\\" + (h - 0 + 1)
			}))
		}
		var z = function(g, h) {
			g = Array.prototype.slice.call(g, 0);
			if (h) {
				h.push.apply(h, g);
				return h
			}
			return g
		};
		try {
			Array.prototype.slice.call(s.documentElement.childNodes, 0)
		} catch (C) {
			z = function(g, h) {
				h = h || [];
				if (j.call(g) === "[object Array]") {
					Array.prototype.push.apply(h, g)
				} else {
					if (typeof g.length === "number") {
						for (var l = 0, m = g.length; l < m; l++) {
							h.push(g[l])
						}
					} else {
						for (l = 0; g[l]; l++) {
							h.push(g[l])
						}
					}
				}
				return h
			}
		}
		var B;
		if (s.documentElement.compareDocumentPosition) {
			B = function(g, h) {
				if (!g.compareDocumentPosition || !h.compareDocumentPosition) {
					if (g == h) {
						i = true
					}
					return g.compareDocumentPosition ? -1 : 1
				}
				g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
				if (g === 0) {
					i = true
				}
				return g
			}
		} else {
			if ("sourceIndex" in s.documentElement) {
				B = function(g, h) {
					if (!g.sourceIndex || !h.sourceIndex) {
						if (g == h) {
							i = true
						}
						return g.sourceIndex ? -1 : 1
					}
					g = g.sourceIndex - h.sourceIndex;
					if (g === 0) {
						i = true
					}
					return g
				}
			} else {
				if (s.createRange) {
					B = function(g, h) {
						if (!g.ownerDocument || !h.ownerDocument) {
							if (g == h) {
								i = true
							}
							return g.ownerDocument ? -1 : 1
						}
						var l = g.ownerDocument.createRange(),
							m = h.ownerDocument.createRange();
						l.setStart(g, 0);
						l.setEnd(g, 0);
						m.setStart(h, 0);
						m.setEnd(h, 0);
						g = l.compareBoundaryPoints(Range.START_TO_END, m);
						if (g === 0) {
							i = true
						}
						return g
					}
				}
			}
		}(function() {
			var g = s.createElement("div"),
				h = "script" + (new Date).getTime();
			g.innerHTML = "<a name='" + h + "'/>";
			var l = s.documentElement;
			l.insertBefore(g, l.firstChild);
			if (s.getElementById(h)) {
				n.find.ID = function(m, q, p) {
					if (typeof q.getElementById !== "undefined" && !p) {
						return (q = q.getElementById(m[1])) ? q.id === m[1] || typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id").nodeValue === m[1] ? [q] : w : []
					}
				};
				n.filter.ID = function(m, q) {
					var p = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
					return m.nodeType === 1 && p && p.nodeValue === q
				}
			}
			l.removeChild(g);
			l = g = null
		})();
		(function() {
			var g = s.createElement("div");
			g.appendChild(s.createComment(""));
			if (g.getElementsByTagName("*").length > 0) {
				n.find.TAG = function(h, l) {
					l = l.getElementsByTagName(h[1]);
					if (h[1] === "*") {
						h = [];
						for (var m = 0; l[m]; m++) {
							l[m].nodeType === 1 && h.push(l[m])
						}
						l = h
					}
					return l
				}
			}
			g.innerHTML = "<a href='#'></a>";
			if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") {
				n.attrHandle.href = function(h) {
					return h.getAttribute("href", 2)
				}
			}
			g = null
		})();
		s.querySelectorAll && function() {
			var g = k,
				h = s.createElement("div");
			h.innerHTML = "<p class='TEST'></p>";
			if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
				k = function(m, q, p, v) {
					q = q || s;
					if (!v && q.nodeType === 9 && !x(q)) {
						try {
							return z(q.querySelectorAll(m), p)
						} catch (t) {}
					}
					return g(m, q, p, v)
				};
				for (var l in g) {
					k[l] = g[l]
				}
				h = null
			}
		}();
		(function() {
			var g = s.createElement("div");
			g.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
				g.lastChild.className = "e";
				if (g.getElementsByClassName("e").length !== 1) {
					n.order.splice(1, 0, "CLASS");
					n.find.CLASS = function(h, l, m) {
						if (typeof l.getElementsByClassName !== "undefined" && !m) {
							return l.getElementsByClassName(h[1])
						}
					};
					g = null
				}
			}
		})();
		var E = s.compareDocumentPosition ? function(g, h) {
				return !!(g.compareDocumentPosition(h) & 16)
			} : function(g, h) {
				return g !== h && (g.contains ? g.contains(h) : true)
			},
			x = function(g) {
				return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
			},
			ga = function(g, h) {
				var l = [],
					m = "",
					q;
				for (h = h.nodeType ? [h] : h; q = n.match.PSEUDO.exec(g);) {
					m += q[0];
					g = g.replace(n.match.PSEUDO, "")
				}
				g = n.relative[g] ? g + "*" : g;
				q = 0;
				for (var p = h.length; q < p; q++) {
					k(g, h[q], l)
				}
				return k.filter(m, l)
			};
		c.find = k;
		c.expr = k.selectors;
		c.expr[":"] = c.expr.filters;
		c.unique = k.uniqueSort;
		c.text = a;
		c.isXMLDoc = x;
		c.contains = E
	})();
	var eb = /Until$/,
		fb = /^(?:parents|prevUntil|prevAll)/,
		gb = /,/;
	R = Array.prototype.slice;
	var Ia = function(a, b, d) {
		if (c.isFunction(b)) {
			return c.grep(a, function(e, j) {
				return !!b.call(e, j, e) === d
			})
		} else {
			if (b.nodeType) {
				return c.grep(a, function(e) {
					return e === b === d
				})
			} else {
				if (typeof b === "string") {
					var f = c.grep(a, function(e) {
						return e.nodeType === 1
					});
					if (Ua.test(b)) {
						return c.filter(b, f, !d)
					} else {
						b = c.filter(b, f)
					}
				}
			}
		}
		return c.grep(a, function(e) {
			return c.inArray(e, b) >= 0 === d
		})
	};
	c.fn.extend({
		find: function(a) {
			for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
				d = b.length;
				c.find(a, this[f], b);
				if (f > 0) {
					for (var j = d; j < b.length; j++) {
						for (var i = 0; i < d; i++) {
							if (b[i] === b[j]) {
								b.splice(j--, 1);
								break
							}
						}
					}
				}
			}
			return b
		},
		has: function(a) {
			var b = c(a);
			return this.filter(function() {
				for (var d = 0, f = b.length; d < f; d++) {
					if (c.contains(this, b[d])) {
						return true
					}
				}
			})
		},
		not: function(a) {
			return this.pushStack(Ia(this, a, false), "not", a)
		},
		filter: function(a) {
			return this.pushStack(Ia(this, a, true), "filter", a)
		},
		is: function(a) {
			return !!a && c.filter(a, this).length > 0
		},
		closest: function(a, b) {
			if (c.isArray(a)) {
				var d = [],
					f = this[0],
					e, j = {},
					i;
				if (f && a.length) {
					e = 0;
					for (var o = a.length; e < o; e++) {
						i = a[e];
						j[i] || (j[i] = c.expr.match.POS.test(i) ? c(i, b || this.context) : i)
					}
					for (; f && f.ownerDocument && f !== b;) {
						for (i in j) {
							e = j[i];
							if (e.jquery ? e.index(f) > -1 : c(f).is(e)) {
								d.push({
									selector: i,
									elem: f
								});
								delete j[i]
							}
						}
						f = f.parentNode
					}
				}
				return d
			}
			var k = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
			return this.map(function(n, r) {
				for (; r && r.ownerDocument && r !== b;) {
					if (k ? k.index(r) > -1 : c(r).is(a)) {
						return r
					}
					r = r.parentNode
				}
				return null
			})
		},
		index: function(a) {
			if (!a || typeof a === "string") {
				return c.inArray(this[0], a ? c(a) : this.parent().children())
			}
			return c.inArray(a.jquery ? a[0] : a, this)
		},
		add: function(a, b) {
			a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
			b = c.merge(this.get(), a);
			return this.pushStack(qa(a[0]) || qa(b[0]) ? b : c.unique(b))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	});
	c.each({
		parent: function(a) {
			return (a = a.parentNode) && a.nodeType !== 11 ? a : null
		},
		parents: function(a) {
			return c.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, d) {
			return c.dir(a, "parentNode", d)
		},
		next: function(a) {
			return c.nth(a, 2, "nextSibling")
		},
		prev: function(a) {
			return c.nth(a, 2, "previousSibling")
		},
		nextAll: function(a) {
			return c.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return c.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, d) {
			return c.dir(a, "nextSibling", d)
		},
		prevUntil: function(a, b, d) {
			return c.dir(a, "previousSibling", d)
		},
		siblings: function(a) {
			return c.sibling(a.parentNode.firstChild, a)
		},
		children: function(a) {
			return c.sibling(a.firstChild)
		},
		contents: function(a) {
			return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
		}
	}, function(a, b) {
		c.fn[a] = function(d, f) {
			var e = c.map(this, b, d);
			eb.test(a) || (f = d);
			if (f && typeof f === "string") {
				e = c.filter(f, e)
			}
			e = this.length > 1 ? c.unique(e) : e;
			if ((this.length > 1 || gb.test(f)) && fb.test(a)) {
				e = e.reverse()
			}
			return this.pushStack(e, a, R.call(arguments).join(","))
		}
	});
	c.extend({
		filter: function(a, b, d) {
			if (d) {
				a = ":not(" + a + ")"
			}
			return c.find.matches(a, b)
		},
		dir: function(a, b, d) {
			var f = [];
			for (a = a[b]; a && a.nodeType !== 9 && (d === w || a.nodeType !== 1 || !c(a).is(d));) {
				a.nodeType === 1 && f.push(a);
				a = a[b]
			}
			return f
		},
		nth: function(a, b, d) {
			b = b || 1;
			for (var f = 0; a; a = a[d]) {
				if (a.nodeType === 1 && ++f === b) {
					break
				}
			}
			return a
		},
		sibling: function(a, b) {
			for (var d = []; a; a = a.nextSibling) {
				a.nodeType === 1 && a !== b && d.push(a)
			}
			return d
		}
	});
	var Ja = / jQuery\d+="(?:\d+|null)"/g,
		V = /^\s+/,
		Ka = /(<([\w:]+)[^>]*?)\/>/g,
		hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
		La = /<([\w:]+)/,
		ib = /<tbody/i,
		jb = /<|&#?\w+;/,
		ta = /<script|<object|<embed|<option|<style/i,
		ua = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Ma = function(a, b, d) {
			return hb.test(d) ? a : b + "></" + d + ">"
		},
		F = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		};
	F.optgroup = F.option;
	F.tbody = F.tfoot = F.colgroup = F.caption = F.thead;
	F.th = F.td;
	if (!c.support.htmlSerialize) {
		F._default = [1, "div<div>", "</div>"]
	}
	c.fn.extend({
		text: function(a) {
			if (c.isFunction(a)) {
				return this.each(function(b) {
					var d = c(this);
					d.text(a.call(this, b, d.text()))
				})
			}
			if (typeof a !== "object" && a !== w) {
				return this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a))
			}
			return c.text(this)
		},
		wrapAll: function(a) {
			if (c.isFunction(a)) {
				return this.each(function(d) {
					c(this).wrapAll(a.call(this, d))
				})
			}
			if (this[0]) {
				var b = c(a, this[0].ownerDocument).eq(0).clone(true);
				this[0].parentNode && b.insertBefore(this[0]);
				b.map(function() {
					for (var d = this; d.firstChild && d.firstChild.nodeType === 1;) {
						d = d.firstChild
					}
					return d
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			if (c.isFunction(a)) {
				return this.each(function(b) {
					c(this).wrapInner(a.call(this, b))
				})
			}
			return this.each(function() {
				var b = c(this),
					d = b.contents();
				d.length ? d.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			return this.each(function() {
				c(this).wrapAll(a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, true, function(a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, true, function(a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function(b) {
					this.parentNode.insertBefore(b, this)
				})
			} else {
				if (arguments.length) {
					var a = c(arguments[0]);
					a.push.apply(a, this.toArray());
					return this.pushStack(a, "before", arguments)
				}
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function(b) {
					this.parentNode.insertBefore(b, this.nextSibling)
				})
			} else {
				if (arguments.length) {
					var a = this.pushStack(this, "after", arguments);
					a.push.apply(a, c(arguments[0]).toArray());
					return a
				}
			}
		},
		remove: function(a, b) {
			for (var d = 0, f;
				(f = this[d]) != null; d++) {
				if (!a || c.filter(a, [f]).length) {
					if (!b && f.nodeType === 1) {
						c.cleanData(f.getElementsByTagName("*"));
						c.cleanData([f])
					}
					f.parentNode && f.parentNode.removeChild(f)
				}
			}
			return this
		},
		empty: function() {
			for (var a = 0, b;
				(b = this[a]) != null; a++) {
				for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) {
					b.removeChild(b.firstChild)
				}
			}
			return this
		},
		clone: function(a) {
			var b = this.map(function() {
				if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
					var d = this.outerHTML,
						f = this.ownerDocument;
					if (!d) {
						d = f.createElement("div");
						d.appendChild(this.cloneNode(true));
						d = d.innerHTML
					}
					return c.clean([d.replace(Ja, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(V, "")], f)[0]
				} else {
					return this.cloneNode(true)
				}
			});
			if (a === true) {
				ra(this, b);
				ra(this.find("*"), b.find("*"))
			}
			return b
		},
		html: function(a) {
			if (a === w) {
				return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ja, "") : null
			} else {
				if (typeof a === "string" && !ta.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(La.exec(a) || ["", ""])[1].toLowerCase()]) {
					a = a.replace(Ka, Ma);
					try {
						for (var b = 0, d = this.length; b < d; b++) {
							if (this[b].nodeType === 1) {
								c.cleanData(this[b].getElementsByTagName("*"));
								this[b].innerHTML = a
							}
						}
					} catch (f) {
						this.empty().append(a)
					}
				} else {
					c.isFunction(a) ? this.each(function(e) {
						var j = c(this),
							i = j.html();
						j.empty().append(function() {
							return a.call(this, e, i)
						})
					}) : this.empty().append(a)
				}
			}
			return this
		},
		replaceWith: function(a) {
			if (this[0] && this[0].parentNode) {
				if (c.isFunction(a)) {
					return this.each(function(b) {
						var d = c(this),
							f = d.html();
						d.replaceWith(a.call(this, b, f))
					})
				}
				if (typeof a !== "string") {
					a = c(a).detach()
				}
				return this.each(function() {
					var b = this.nextSibling,
						d = this.parentNode;
					c(this).remove();
					b ? c(b).before(a) : c(d).append(a)
				})
			} else {
				return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
			}
		},
		detach: function(a) {
			return this.remove(a, true)
		},
		domManip: function(a, b, d) {
			function f(u) {
				return c.nodeName(u, "table") ? u.getElementsByTagName("tbody")[0] || u.appendChild(u.ownerDocument.createElement("tbody")) : u
			}
			var e, j, i = a[0],
				o = [],
				k;
			if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && ua.test(i)) {
				return this.each(function() {
					c(this).domManip(a, b, d, true)
				})
			}
			if (c.isFunction(i)) {
				return this.each(function(u) {
					var z = c(this);
					a[0] = i.call(this, u, b ? z.html() : w);
					z.domManip(a, b, d)
				})
			}
			if (this[0]) {
				e = i && i.parentNode;
				e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
					fragment: e
				} : sa(a, this, o);
				k = e.fragment;
				if (j = k.childNodes.length === 1 ? (k = k.firstChild) : k.firstChild) {
					b = b && c.nodeName(j, "tr");
					for (var n = 0, r = this.length; n < r; n++) {
						d.call(b ? f(this[n], j) : this[n], n > 0 || e.cacheable || this.length > 1 ? k.cloneNode(true) : k)
					}
				}
				o.length && c.each(o, Qa)
			}
			return this
		}
	});
	c.fragments = {};
	c.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		c.fn[a] = function(d) {
			var f = [];
			d = c(d);
			var e = this.length === 1 && this[0].parentNode;
			if (e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
				d[b](this[0]);
				return this
			} else {
				e = 0;
				for (var j = d.length; e < j; e++) {
					var i = (e > 0 ? this.clone(true) : this).get();
					c.fn[b].apply(c(d[e]), i);
					f = f.concat(i)
				}
				return this.pushStack(f, a, d.selector)
			}
		}
	});
	c.extend({
		clean: function(a, b, d, f) {
			b = b || s;
			if (typeof b.createElement === "undefined") {
				b = b.ownerDocument || b[0] && b[0].ownerDocument || s
			}
			for (var e = [], j = 0, i;
				(i = a[j]) != null; j++) {
				if (typeof i === "number") {
					i += ""
				}
				if (i) {
					if (typeof i === "string" && !jb.test(i)) {
						i = b.createTextNode(i)
					} else {
						if (typeof i === "string") {
							i = i.replace(Ka, Ma);
							var o = (La.exec(i) || ["", ""])[1].toLowerCase(),
								k = F[o] || F._default,
								n = k[0],
								r = b.createElement("div");
							for (r.innerHTML = k[1] + i + k[2]; n--;) {
								r = r.lastChild
							}
							if (!c.support.tbody) {
								n = ib.test(i);
								o = o === "table" && !n ? r.firstChild && r.firstChild.childNodes : k[1] === "<table>" && !n ? r.childNodes : [];
								for (k = o.length - 1; k >= 0; --k) {
									c.nodeName(o[k], "tbody") && !o[k].childNodes.length && o[k].parentNode.removeChild(o[k])
								}
							}!c.support.leadingWhitespace && V.test(i) && r.insertBefore(b.createTextNode(V.exec(i)[0]), r.firstChild);
							i = r.childNodes
						}
					} if (i.nodeType) {
						e.push(i)
					} else {
						e = c.merge(e, i)
					}
				}
			}
			if (d) {
				for (j = 0; e[j]; j++) {
					if (f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript")) {
						f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j])
					} else {
						e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script"))));
						d.appendChild(e[j])
					}
				}
			}
			return e
		},
		cleanData: function(a) {
			for (var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, i = 0, o;
				(o = a[i]) != null; i++) {
				if (d = o[c.expando]) {
					b = f[d];
					if (b.events) {
						for (var k in b.events) {
							e[k] ? c.event.remove(o, k) : Ca(o, k, b.handle)
						}
					}
					if (j) {
						delete o[c.expando]
					} else {
						o.removeAttribute && o.removeAttribute(c.expando)
					}
					delete f[d]
				}
			}
		}
	});
	var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i,
		Na = /alpha\([^)]*\)/,
		Oa = /opacity=([^)]*)/,
		ha = /float/i,
		ia = /-([a-z])/ig,
		lb = /([A-Z])/g,
		mb = /^-?\d+(?:px)?$/i,
		nb = /^-?\d/,
		ob = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		pb = ["Left", "Right"],
		qb = ["Top", "Bottom"],
		rb = s.defaultView && s.defaultView.getComputedStyle,
		Pa = c.support.cssFloat ? "cssFloat" : "styleFloat",
		ja = function(a, b) {
			return b.toUpperCase()
		};
	c.fn.css = function(a, b) {
		return X(this, a, b, true, function(d, f, e) {
			if (e === w) {
				return c.curCSS(d, f)
			}
			if (typeof e === "number" && !kb.test(f)) {
				e += "px"
			}
			c.style(d, f, e)
		})
	};
	c.extend({
		style: function(a, b, d) {
			if (!a || a.nodeType === 3 || a.nodeType === 8) {
				return w
			}
			if ((b === "width" || b === "height") && parseFloat(d) < 0) {
				d = w
			}
			var f = a.style || a,
				e = d !== w;
			if (!c.support.opacity && b === "opacity") {
				if (e) {
					f.zoom = 1;
					b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
					a = f.filter || c.curCSS(a, "filter") || "";
					f.filter = Na.test(a) ? a.replace(Na, b) : b
				}
				return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Oa.exec(f.filter)[1]) / 100 + "" : ""
			}
			if (ha.test(b)) {
				b = Pa
			}
			b = b.replace(ia, ja);
			if (e) {
				f[b] = d
			}
			return f[b]
		},
		css: function(a, b, d, f) {
			if (b === "width" || b === "height") {
				var e, j = b === "width" ? pb : qb;

				function i() {
					e = b === "width" ? a.offsetWidth : a.offsetHeight;
					f !== "border" && c.each(j, function() {
						f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
						if (f === "margin") {
							e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0
						} else {
							e -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
						}
					})
				}
				a.offsetWidth !== 0 ? i() : c.swap(a, ob, i);
				return Math.max(0, Math.round(e))
			}
			return c.curCSS(a, b, d)
		},
		curCSS: function(a, b, d) {
			var f, e = a.style;
			if (!c.support.opacity && b === "opacity" && a.currentStyle) {
				f = Oa.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
				return f === "" ? "1" : f
			}
			if (ha.test(b)) {
				b = Pa
			}
			if (!d && e && e[b]) {
				f = e[b]
			} else {
				if (rb) {
					if (ha.test(b)) {
						b = "float"
					}
					b = b.replace(lb, "-$1").toLowerCase();
					e = a.ownerDocument.defaultView;
					if (!e) {
						return null
					}
					if (a = e.getComputedStyle(a, null)) {
						f = a.getPropertyValue(b)
					}
					if (b === "opacity" && f === "") {
						f = "1"
					}
				} else {
					if (a.currentStyle) {
						d = b.replace(ia, ja);
						f = a.currentStyle[b] || a.currentStyle[d];
						if (!mb.test(f) && nb.test(f)) {
							b = e.left;
							var j = a.runtimeStyle.left;
							a.runtimeStyle.left = a.currentStyle.left;
							e.left = d === "fontSize" ? "1em" : f || 0;
							f = e.pixelLeft + "px";
							e.left = b;
							a.runtimeStyle.left = j
						}
					}
				}
			}
			return f
		},
		swap: function(a, b, d) {
			var f = {};
			for (var e in b) {
				f[e] = a.style[e];
				a.style[e] = b[e]
			}
			d.call(a);
			for (e in b) {
				a.style[e] = f[e]
			}
		}
	});
	if (c.expr && c.expr.filters) {
		c.expr.filters.hidden = function(a) {
			var b = a.offsetWidth,
				d = a.offsetHeight,
				f = a.nodeName.toLowerCase() === "tr";
			return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
		};
		c.expr.filters.visible = function(a) {
			return !c.expr.filters.hidden(a)
		}
	}
	var sb = J(),
		tb = /<script(.|\s)*?\/script>/gi,
		ub = /select|textarea/i,
		vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
		N = /=\?(&|$)/,
		ka = /\?/,
		wb = /(\?|&)_=.*?(&|$)/,
		xb = /^(\w+:)?\/\/([^\/?#]+)/,
		yb = /%20/g,
		zb = c.fn.load;
	c.fn.extend({
		load: function(a, b, d) {
			if (typeof a !== "string") {
				return zb.call(this, a)
			} else {
				if (!this.length) {
					return this
				}
			}
			var f = a.indexOf(" ");
			if (f >= 0) {
				var e = a.slice(f, a.length);
				a = a.slice(0, f)
			}
			f = "GET";
			if (b) {
				if (c.isFunction(b)) {
					d = b;
					b = null
				} else {
					if (typeof b === "object") {
						b = c.param(b, c.ajaxSettings.traditional);
						f = "POST"
					}
				}
			}
			var j = this;
			c.ajax({
				url: a,
				type: f,
				dataType: "html",
				data: b,
				complete: function(i, o) {
					if (o === "success" || o === "notmodified") {
						j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText)
					}
					d && j.each(d, [i.responseText, o, i])
				}
			});
			return this
		},
		serialize: function() {
			return c.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? c.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type))
			}).map(function(a, b) {
				a = c(this).val();
				return a == null ? null : c.isArray(a) ? c.map(a, function(d) {
					return {
						name: b.name,
						value: d
					}
				}) : {
					name: b.name,
					value: a
				}
			}).get()
		}
	});
	c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		c.fn[b] = function(d) {
			return this.bind(b, d)
		}
	});
	c.extend({
		get: function(a, b, d, f) {
			if (c.isFunction(b)) {
				f = f || d;
				d = b;
				b = null
			}
			return c.ajax({
				type: "GET",
				url: a,
				data: b,
				success: d,
				dataType: f
			})
		},
		getScript: function(a, b) {
			return c.get(a, null, b, "script")
		},
		getJSON: function(a, b, d) {
			return c.get(a, b, d, "json")
		},
		post: function(a, b, d, f) {
			if (c.isFunction(b)) {
				f = f || d;
				d = b;
				b = {}
			}
			return c.ajax({
				type: "POST",
				url: a,
				data: b,
				success: d,
				dataType: f
			})
		},
		ajaxSetup: function(a) {
			c.extend(c.ajaxSettings, a)
		},
		ajaxSettings: {
			url: location.href,
			global: true,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: true,
			async: true,
			xhr: A.XMLHttpRequest && (A.location.protocol !== "file:" || !A.ActiveXObject) ? function() {
				return new A.XMLHttpRequest
			} : function() {
				try {
					return new A.ActiveXObject("Microsoft.XMLHTTP")
				} catch (a) {}
			},
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				script: "text/javascript, application/javascript",
				json: "application/json, text/javascript",
				text: "text/plain",
				_default: "*/*"
			}
		},
		lastModified: {},
		etag: {},
		ajax: function(a) {
			function b() {
				e.success && e.success.call(k, o, i, x);
				e.global && f("ajaxSuccess", [x, e])
			}

			function d() {
				e.complete && e.complete.call(k, x, i);
				e.global && f("ajaxComplete", [x, e]);
				e.global && !--c.active && c.event.trigger("ajaxStop")
			}

			function f(q, p) {
				(e.context ? c(e.context) : c.event).trigger(q, p)
			}
			var e = c.extend(true, {}, c.ajaxSettings, a),
				j, i, o, k = a && a.context || e,
				n = e.type.toUpperCase();
			if (e.data && e.processData && typeof e.data !== "string") {
				e.data = c.param(e.data, e.traditional)
			}
			if (e.dataType === "jsonp") {
				if (n === "GET") {
					N.test(e.url) || (e.url += (ka.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?")
				} else {
					if (!e.data || !N.test(e.data)) {
						e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?"
					}
				}
				e.dataType = "json"
			}
			if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) {
				j = e.jsonpCallback || "jsonp" + sb++;
				if (e.data) {
					e.data = (e.data + "").replace(N, "=" + j + "$1")
				}
				e.url = e.url.replace(N, "=" + j + "$1");
				e.dataType = "script";
				A[j] = A[j] || function(q) {
					o = q;
					b();
					d();
					A[j] = w;
					try {
						delete A[j]
					} catch (p) {}
					z && z.removeChild(C)
				}
			}
			if (e.dataType === "script" && e.cache === null) {
				e.cache = false
			}
			if (e.cache === false && n === "GET") {
				var r = J(),
					u = e.url.replace(wb, "$1_=" + r + "$2");
				e.url = u + (u === e.url ? (ka.test(e.url) ? "&" : "?") + "_=" + r : "")
			}
			if (e.data && n === "GET") {
				e.url += (ka.test(e.url) ? "&" : "?") + e.data
			}
			e.global && !c.active++ && c.event.trigger("ajaxStart");
			r = (r = xb.exec(e.url)) && (r[1] && r[1] !== location.protocol || r[2] !== location.host);
			if (e.dataType === "script" && n === "GET" && r) {
				var z = s.getElementsByTagName("head")[0] || s.documentElement,
					C = s.createElement("script");
				C.src = e.url;
				if (e.scriptCharset) {
					C.charset = e.scriptCharset
				}
				if (!j) {
					var B = false;
					C.onload = C.onreadystatechange = function() {
						if (!B && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
							B = true;
							b();
							d();
							C.onload = C.onreadystatechange = null;
							z && C.parentNode && z.removeChild(C)
						}
					}
				}
				z.insertBefore(C, z.firstChild);
				return w
			}
			var E = false,
				x = e.xhr();
			if (x) {
				e.username ? x.open(n, e.url, e.async, e.username, e.password) : x.open(n, e.url, e.async);
				try {
					if (e.data || a && a.contentType) {
						x.setRequestHeader("Content-Type", e.contentType)
					}
					if (e.ifModified) {
						c.lastModified[e.url] && x.setRequestHeader("If-Modified-Since", c.lastModified[e.url]);
						c.etag[e.url] && x.setRequestHeader("If-None-Match", c.etag[e.url])
					}
					r || x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					x.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
				} catch (ga) {}
				if (e.beforeSend && e.beforeSend.call(k, x, e) === false) {
					e.global && !--c.active && c.event.trigger("ajaxStop");
					x.abort();
					return false
				}
				e.global && f("ajaxSend", [x, e]);
				var g = x.onreadystatechange = function(q) {
					if (!x || x.readyState === 0 || q === "abort") {
						E || d();
						E = true;
						if (x) {
							x.onreadystatechange = c.noop
						}
					} else {
						if (!E && x && (x.readyState === 4 || q === "timeout")) {
							E = true;
							x.onreadystatechange = c.noop;
							i = q === "timeout" ? "timeout" : !c.httpSuccess(x) ? "error" : e.ifModified && c.httpNotModified(x, e.url) ? "notmodified" : "success";
							var p;
							if (i === "success") {
								try {
									o = c.httpData(x, e.dataType, e)
								} catch (v) {
									i = "parsererror";
									p = v
								}
							}
							if (i === "success" || i === "notmodified") {
								j || b()
							} else {
								c.handleError(e, x, i, p)
							}
							d();
							q === "timeout" && x.abort();
							if (e.async) {
								x = null
							}
						}
					}
				};
				try {
					var h = x.abort;
					x.abort = function() {
						x && h.call(x);
						g("abort")
					}
				} catch (l) {}
				e.async && e.timeout > 0 && setTimeout(function() {
					x && !E && g("timeout")
				}, e.timeout);
				try {
					x.send(n === "POST" || n === "PUT" || n === "DELETE" ? e.data : null)
				} catch (m) {
					c.handleError(e, x, null, m);
					d()
				}
				e.async || g();
				return x
			}
		},
		handleError: function(a, b, d, f) {
			if (a.error) {
				a.error.call(a.context || a, b, d, f)
			}
			if (a.global) {
				(a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
			}
		},
		active: 0,
		httpSuccess: function(a) {
			try {
				return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223 || a.status === 0
			} catch (b) {}
			return false
		},
		httpNotModified: function(a, b) {
			var d = a.getResponseHeader("Last-Modified"),
				f = a.getResponseHeader("Etag");
			if (d) {
				c.lastModified[b] = d
			}
			if (f) {
				c.etag[b] = f
			}
			return a.status === 304 || a.status === 0
		},
		httpData: function(a, b, d) {
			var f = a.getResponseHeader("content-type") || "",
				e = b === "xml" || !b && f.indexOf("xml") >= 0;
			a = e ? a.responseXML : a.responseText;
			e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
			if (d && d.dataFilter) {
				a = d.dataFilter(a, b)
			}
			if (typeof a === "string") {
				if (b === "json" || !b && f.indexOf("json") >= 0) {
					a = c.parseJSON(a)
				} else {
					if (b === "script" || !b && f.indexOf("javascript") >= 0) {
						c.globalEval(a)
					}
				}
			}
			return a
		},
		param: function(a, b) {
			function d(i, o) {
				if (c.isArray(o)) {
					c.each(o, function(k, n) {
						b || /\[\]$/.test(i) ? f(i, n) : d(i + "[" + (typeof n === "object" || c.isArray(n) ? k : "") + "]", n)
					})
				} else {
					!b && o != null && typeof o === "object" ? c.each(o, function(k, n) {
						d(i + "[" + k + "]", n)
					}) : f(i, o)
				}
			}

			function f(i, o) {
				o = c.isFunction(o) ? o() : o;
				e[e.length] = encodeURIComponent(i) + "=" + encodeURIComponent(o)
			}
			var e = [];
			if (b === w) {
				b = c.ajaxSettings.traditional
			}
			if (c.isArray(a) || a.jquery) {
				c.each(a, function() {
					f(this.name, this.value)
				})
			} else {
				for (var j in a) {
					d(j, a[j])
				}
			}
			return e.join("&").replace(yb, "+")
		}
	});
	var la = {},
		Ab = /toggle|show|hide/,
		Bb = /^([+-]=)?([\d+-.]+)(.*)$/,
		W, va = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		];
	c.fn.extend({
		show: function(a, b) {
			if (a || a === 0) {
				return this.animate(K("show", 3), a, b)
			} else {
				a = 0;
				for (b = this.length; a < b; a++) {
					var d = c.data(this[a], "olddisplay");
					this[a].style.display = d || "";
					if (c.css(this[a], "display") === "none") {
						d = this[a].nodeName;
						var f;
						if (la[d]) {
							f = la[d]
						} else {
							var e = c("<" + d + " />").appendTo("body");
							f = e.css("display");
							if (f === "none") {
								f = "block"
							}
							e.remove();
							la[d] = f
						}
						c.data(this[a], "olddisplay", f)
					}
				}
				a = 0;
				for (b = this.length; a < b; a++) {
					this[a].style.display = c.data(this[a], "olddisplay") || ""
				}
				return this
			}
		},
		hide: function(a, b) {
			if (a || a === 0) {
				return this.animate(K("hide", 3), a, b)
			} else {
				a = 0;
				for (b = this.length; a < b; a++) {
					var d = c.data(this[a], "olddisplay");
					!d && d !== "none" && c.data(this[a], "olddisplay", c.css(this[a], "display"))
				}
				a = 0;
				for (b = this.length; a < b; a++) {
					this[a].style.display = "none"
				}
				return this
			}
		},
		_toggle: c.fn.toggle,
		toggle: function(a, b) {
			var d = typeof a === "boolean";
			if (c.isFunction(a) && c.isFunction(b)) {
				this._toggle.apply(this, arguments)
			} else {
				a == null || d ? this.each(function() {
					var f = d ? a : c(this).is(":hidden");
					c(this)[f ? "show" : "hide"]()
				}) : this.animate(K("toggle", 3), a, b)
			}
			return this
		},
		fadeTo: function(a, b, d) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: b
			}, a, d)
		},
		animate: function(a, b, d, f) {
			var e = c.speed(b, d, f);
			if (c.isEmptyObject(a)) {
				return this.each(e.complete)
			}
			return this[e.queue === false ? "each" : "queue"](function() {
				var j = c.extend({}, e),
					i, o = this.nodeType === 1 && c(this).is(":hidden"),
					k = this;
				for (i in a) {
					var n = i.replace(ia, ja);
					if (i !== n) {
						a[n] = a[i];
						delete a[i];
						i = n
					}
					if (a[i] === "hide" && o || a[i] === "show" && !o) {
						return j.complete.call(this)
					}
					if ((i === "height" || i === "width") && this.style) {
						j.display = c.css(this, "display");
						j.overflow = this.style.overflow
					}
					if (c.isArray(a[i])) {
						(j.specialEasing = j.specialEasing || {})[i] = a[i][1];
						a[i] = a[i][0]
					}
				}
				if (j.overflow != null) {
					this.style.overflow = "hidden"
				}
				j.curAnim = c.extend({}, a);
				c.each(a, function(r, u) {
					var z = new c.fx(k, j, r);
					if (Ab.test(u)) {
						z[u === "toggle" ? o ? "show" : "hide" : u](a)
					} else {
						var C = Bb.exec(u),
							B = z.cur(true) || 0;
						if (C) {
							u = parseFloat(C[2]);
							var E = C[3] || "px";
							if (E !== "px") {
								k.style[r] = (u || 1) + E;
								B = (u || 1) / z.cur(true) * B;
								k.style[r] = B + E
							}
							if (C[1]) {
								u = (C[1] === "-=" ? -1 : 1) * u + B
							}
							z.custom(B, u, E)
						} else {
							z.custom(B, u, "")
						}
					}
				});
				return true
			})
		},
		stop: function(a, b) {
			var d = c.timers;
			a && this.queue([]);
			this.each(function() {
				for (var f = d.length - 1; f >= 0; f--) {
					if (d[f].elem === this) {
						b && d[f](true);
						d.splice(f, 1)
					}
				}
			});
			b || this.dequeue();
			return this
		}
	});
	c.each({
		slideDown: K("show", 1),
		slideUp: K("hide", 1),
		slideToggle: K("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		}
	}, function(a, b) {
		c.fn[a] = function(d, f) {
			return this.animate(b, d, f)
		}
	});
	c.extend({
		speed: function(a, b, d) {
			var f = a && typeof a === "object" ? a : {
				complete: d || !d && b || c.isFunction(a) && a,
				duration: a,
				easing: d && b || b && !c.isFunction(b) && b
			};
			f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
			f.old = f.complete;
			f.complete = function() {
				f.queue !== false && c(this).dequeue();
				c.isFunction(f.old) && f.old.call(this)
			};
			return f
		},
		easing: {
			linear: function(a, b, d, f) {
				return d + f * a
			},
			swing: function(a, b, d, f) {
				return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
			}
		},
		timers: [],
		fx: function(a, b, d) {
			this.options = b;
			this.elem = a;
			this.prop = d;
			if (!b.orig) {
				b.orig = {}
			}
		}
	});
	c.fx.prototype = {
		update: function() {
			this.options.step && this.options.step.call(this.elem, this.now, this);
			(c.fx.step[this.prop] || c.fx.step._default)(this);
			if ((this.prop === "height" || this.prop === "width") && this.elem.style) {
				this.elem.style.display = "block"
			}
		},
		cur: function(a) {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
				return this.elem[this.prop]
			}
			return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
		},
		custom: function(a, b, d) {
			function f(j) {
				return e.step(j)
			}
			this.startTime = J();
			this.start = a;
			this.end = b;
			this.unit = d || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			var e = this;
			f.elem = this.elem;
			if (f() && c.timers.push(f) && !W) {
				W = setInterval(c.fx.tick, 13)
			}
		},
		show: function() {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.show = true;
			this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
			c(this.elem).show()
		},
		hide: function() {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step: function(a) {
			var b = J(),
				d = true;
			if (a || b >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				for (var f in this.options.curAnim) {
					if (this.options.curAnim[f] !== true) {
						d = false
					}
				}
				if (d) {
					if (this.options.display != null) {
						this.elem.style.overflow = this.options.overflow;
						a = c.data(this.elem, "olddisplay");
						this.elem.style.display = a ? a : this.options.display;
						if (c.css(this.elem, "display") === "none") {
							this.elem.style.display = "block"
						}
					}
					this.options.hide && c(this.elem).hide();
					if (this.options.hide || this.options.show) {
						for (var e in this.options.curAnim) {
							c.style(this.elem, e, this.options.orig[e])
						}
					}
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				e = b - this.startTime;
				this.state = e / this.options.duration;
				a = this.options.easing || (c.easing.swing ? "swing" : "linear");
				this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
				this.update()
			}
			return true
		}
	};
	c.extend(c.fx, {
		tick: function() {
			for (var a = c.timers, b = 0; b < a.length; b++) {
				a[b]() || a.splice(b--, 1)
			}
			a.length || c.fx.stop()
		},
		stop: function() {
			clearInterval(W);
			W = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function(a) {
				c.style(a.elem, "opacity", a.now)
			},
			_default: function(a) {
				if (a.elem.style && a.elem.style[a.prop] != null) {
					a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit
				} else {
					a.elem[a.prop] = a.now
				}
			}
		}
	});
	if (c.expr && c.expr.filters) {
		c.expr.filters.animated = function(a) {
			return c.grep(c.timers, function(b) {
				return a === b.elem
			}).length
		}
	}
	c.fn.offset = "getBoundingClientRect" in s.documentElement ? function(a) {
		var b = this[0];
		if (a) {
			return this.each(function(e) {
				c.offset.setOffset(this, a, e)
			})
		}
		if (!b || !b.ownerDocument) {
			return null
		}
		if (b === b.ownerDocument.body) {
			return c.offset.bodyOffset(b)
		}
		var d = b.getBoundingClientRect(),
			f = b.ownerDocument;
		b = f.body;
		f = f.documentElement;
		return {
			top: d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0),
			left: d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)
		}
	} : function(a) {
		var b = this[0];
		if (a) {
			return this.each(function(r) {
				c.offset.setOffset(this, a, r)
			})
		}
		if (!b || !b.ownerDocument) {
			return null
		}
		if (b === b.ownerDocument.body) {
			return c.offset.bodyOffset(b)
		}
		c.offset.initialize();
		var d = b.offsetParent,
			f = b,
			e = b.ownerDocument,
			j, i = e.documentElement,
			o = e.body;
		f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
		for (var k = b.offsetTop, n = b.offsetLeft;
			(b = b.parentNode) && b !== o && b !== i;) {
			if (c.offset.supportsFixedPosition && f.position === "fixed") {
				break
			}
			j = e ? e.getComputedStyle(b, null) : b.currentStyle;
			k -= b.scrollTop;
			n -= b.scrollLeft;
			if (b === d) {
				k += b.offsetTop;
				n += b.offsetLeft;
				if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
					k += parseFloat(j.borderTopWidth) || 0;
					n += parseFloat(j.borderLeftWidth) || 0
				}
				f = d;
				d = b.offsetParent
			}
			if (c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") {
				k += parseFloat(j.borderTopWidth) || 0;
				n += parseFloat(j.borderLeftWidth) || 0
			}
			f = j
		}
		if (f.position === "relative" || f.position === "static") {
			k += o.offsetTop;
			n += o.offsetLeft
		}
		if (c.offset.supportsFixedPosition && f.position === "fixed") {
			k += Math.max(i.scrollTop, o.scrollTop);
			n += Math.max(i.scrollLeft, o.scrollLeft)
		}
		return {
			top: k,
			left: n
		}
	};
	c.offset = {
		initialize: function() {
			var a = s.body,
				b = s.createElement("div"),
				d, f, e, j = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
			c.extend(b.style, {
				position: "absolute",
				top: 0,
				left: 0,
				margin: 0,
				border: 0,
				width: "1px",
				height: "1px",
				visibility: "hidden"
			});
			b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			a.insertBefore(b, a.firstChild);
			d = b.firstChild;
			f = d.firstChild;
			e = d.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = f.offsetTop !== 5;
			this.doesAddBorderForTableAndCells = e.offsetTop === 5;
			f.style.position = "fixed";
			f.style.top = "20px";
			this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
			f.style.position = f.style.top = "";
			d.style.overflow = "hidden";
			d.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
			this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j;
			a.removeChild(b);
			c.offset.initialize = c.noop
		},
		bodyOffset: function(a) {
			var b = a.offsetTop,
				d = a.offsetLeft;
			c.offset.initialize();
			if (c.offset.doesNotIncludeMarginInBodyOffset) {
				b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
				d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
			}
			return {
				top: b,
				left: d
			}
		},
		setOffset: function(a, b, d) {
			if (/static/.test(c.curCSS(a, "position"))) {
				a.style.position = "relative"
			}
			var f = c(a),
				e = f.offset(),
				j = parseInt(c.curCSS(a, "top", true), 10) || 0,
				i = parseInt(c.curCSS(a, "left", true), 10) || 0;
			if (c.isFunction(b)) {
				b = b.call(a, d, e)
			}
			d = {
				top: b.top - e.top + j,
				left: b.left - e.left + i
			};
			"using" in b ? b.using.call(a, d) : f.css(d)
		}
	};
	c.fn.extend({
		position: function() {
			if (!this[0]) {
				return null
			}
			var a = this[0],
				b = this.offsetParent(),
				d = this.offset(),
				f = /^body|html$/i.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				} : b.offset();
			d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
			d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
			f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
			f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
			return {
				top: d.top - f.top,
				left: d.left - f.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var a = this.offsetParent || s.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static";) {
					a = a.offsetParent
				}
				return a
			})
		}
	});
	c.each(["Left", "Top"], function(a, b) {
		var d = "scroll" + b;
		c.fn[d] = function(f) {
			var e = this[0],
				j;
			if (!e) {
				return null
			}
			if (f !== w) {
				return this.each(function() {
					if (j = wa(this)) {
						j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop())
					} else {
						this[d] = f
					}
				})
			} else {
				return (j = wa(e)) ? "pageXOffset" in j ? j[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
			}
		}
	});
	c.each(["Height", "Width"], function(a, b) {
		var d = b.toLowerCase();
		c.fn["inner" + b] = function() {
			return this[0] ? c.css(this[0], d, false, "padding") : null
		};
		c.fn["outer" + b] = function(f) {
			return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
		};
		c.fn[d] = function(f) {
			var e = this[0];
			if (!e) {
				return f == null ? null : this
			}
			if (c.isFunction(f)) {
				return this.each(function(j) {
					var i = c(this);
					i[d](f.call(this, j, i[d]()))
				})
			}
			return "scrollTo" in e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === w ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
		}
	});
	A.jQuery = A.$ = c
})(window);
(function($) {
	if (!$.gozap) {
		$.gozap = {}
	}
	G = $.gozap;
	var toString = Object.prototype.toString,
		class2type = {};
	$.extend(G, {
		TIPS_TYPE: {
			success: "0",
			error: "1",
			loading: "2",
			warning: "3"
		},
		RESULT_CODE: {
			success: "9999"
		},
		type: function(o) {
			return o == null ? String(o) : class2type[toString.call(o)] || "object"
		},
		clone: function(o) {
			var ret = o,
				b, k;
			if (o && ((b = $.isArray(o)) || $.isPlainObject(o))) {
				ret = b ? [] : {};
				for (k in o) {
					if (o.hasOwnProperty(k)) {
						ret[k] = G.clone(o[k])
					}
				}
			}
			return ret
		},
		namespace: function(ns, host, value) {
			var ds = ns.split("."),
				d, cd = host || $,
				i, l = ds.length;
			for (i = 0; i < l; i++) {
				d = ds[i];
				if (!cd[d]) {
					if (value && i === l - 1) {
						cd[d] == value
					} else {
						cd[d] = {}
					}
				}
				cd = cd[d]
			}
			return cd
		},
		now: function() {
			return new Date().getTime()
		},
		getRandomId: function(n) {
			var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			var id = "",
				index;
			for (var i = 0; i < n; i++) {
				index = Math.floor(Math.random() * 35);
				id += chars[index]
			}
			return id
		},
		containsAll: function(array1, array2) {
			if (array2.length > array1.length) {
				return false
			}
			var elem;
			for (var i = 0, len = array2.length; i < len; i++) {
				elem = array2[i];
				if ($.inArray(elem, array1) < 0) {
					return false
				}
			}
			return true
		},
		isEqualArray: function(array1, array2) {
			if (array1.length !== array2.length) {
				return false
			}
			array1 = array1.concat();
			array2 = array2.concat();
			var i, elem1, j, len2 = array2.length;
			for (i = array1.length - 1; i >= 0; i--) {
				elem1 = array1[i];
				if ((j = $.inArray(elem1, array2)) > -1) {
					array1.splice(i, 1);
					array2.splice(j, 1)
				} else {
					return false
				}
			}
			return true
		},
		unique: function(array, fn) {
			fn = fn || function(a, b) {
				return a === b
			};
			var i, j, len = array.length;
			for (i = len - 1; i > 0; i--) {
				for (j = i - 1; j >= 0; j--) {
					if (fn(array[i], array[j])) {
						array.splice(i, 1);
						break
					}
				}
			}
		},
		deleteAttribute: function(o, k) {
			if (o[k] !== undefined) {
				o[k] = null;
				delete o[k]
			}
		},
		toArray: function(elem) {
			if (!elem && elem !== "" && elem !== 0) {
				return []
			}
			return G.isArray(elem) ? elem : [elem]
		}
	});
	$.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, v) {
		var t = v.toLowerCase();
		class2type["[object " + v + "]"] = t;
		G["is" + v] = function(o) {
			return G.type(o) == t
		}
	});
	G.namespace("gozap.labi");
	G.namespace("gozap.datoutie");
	G.namespace("gozap.digg")
})(jQuery);
(function($) {
	var G = $.gozap;
	$.extend(G, {
		imageZoomMethods: {
			DEFAULT: 0,
			LOCKED_RATIO_SMALL: 1,
			LOCKED_RATIO_BIG: 2,
			UNLOCKED_RATIO: 3,
			LOCKED_RATIO_SMALL_NARROW: 4,
			LOCKED_RATIO_SMALL_ENLARGE: 5,
			LOCKED_RATIO_BIG_NARROW: 6,
			LOCKED_RATIO_BIG_ENLARGE: 7,
			UNLOCKED_RATIO_NARROW: 8,
			UNLOCKED_RATIO_ENLARGE: 9
		},
		getImageZoomUrl: function(url, width, height, method) {
			var targetUrl = "",
				pos = url.lastIndexOf(".");
			method = method || G.imageZoomMethods.DEFAULT;
			targetUrl += url.substring(0, pos);
			targetUrl += "=" + width + "x" + height;
			if (G.imageZoomMethods.LOCKED_RATIO_SMALL_NARROW === method) {
				targetUrl += ")"
			}
			targetUrl += url.substring(pos);
			return targetUrl
		}
	})
})(jQuery);
(function($) {
	var G = $.gozap,
		encode = encodeURIComponent;
	$.extend(G, {
		ajax: function(options) {
			options = options || {};
			var fn = options.success,
				success;
			success = function(data) {
				if (!data || (!data.result && !data.code)) {
					return
				}
				var result = data.result || data,
					code = result.code,
					type;
				if (code == "1002") {
					return
				} else {
					if (code == G.RESULT_CODE.success) {
						type = G.TIPS_TYPE.success
					} else {
						type = G.TIPS_TYPE.error
					}
				} if (result.message && $.isFunction(options.tipsHandler)) {
					options.tipsHandler.apply(null, [type, result.message])
				}
				if (result.data && result.data.query && result.data.query.item) {
					result.data.query.item = G.toArray(result.data.query.item)
				}
				if ($.isFunction(fn)) {
					fn(result)
				}
			};
			$.extend(options, {
				dataType: "json",
				success: success
			});
			options.success = success;
			$.ajax(options)
		},
		serialize: function(container, beanName) {
			if (!beanName) {
				return container.serialize()
			}
			return G.param(container.serializeArray(), beanName)
		},
		param: function(o, beanName) {
			var target = {};
			if (beanName && !G.isArray(o)) {
				$.each(o, function(n, v) {
					n = beanName + "." + n;
					target[n] = v
				})
			} else {
				target = o
			}
			return param(target, beanName)
		},
		unparam: function() {}
	});

	function param(obj, beanName) {
		var ret = [],
			add = function(key, value) {
				value = $.isFunction(value) ? value() : value;
				ret.push(encode(key) + "=" + encode(value))
			};
		if (G.isArray(obj)) {
			$.each(obj, function(i, v) {
				var name = beanName ? beanName + "." + v.name : v.name;
				add(name, v.value)
			})
		} else {
			for (var prefix in obj) {
				buildParams(prefix, obj[prefix], add)
			}
		}
		return ret.join("&")
	}

	function buildParams(prefix, obj, add) {
		if (G.isArray(obj)) {
			$.each(obj, function(i, v) {
				buildParams(prefix + "[" + i + "]", v, add)
			})
		} else {
			if (obj != null && typeof obj === "object") {
				for (var name in obj) {
					buildParams(prefix + "." + name, obj[name], add)
				}
			} else {
				add(prefix, obj)
			}
		}
	}
	$.ajaxSetup({
		type: "POST",
		traditional: true,
		timeout: 30000
	})
})(jQuery);
(function($) {
	var G = $.gozap,
		PATTERN = {
			url: "((?:https|http)://)?(?:[0-9a-z_!~*'()-]+\\.)*(?:[0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\.[a-z]{2,6}(?::[0-9]{1,4})?(?:/[0-9A-Za-z_!~*'().;?:@&=+$,%#-]*)*",
			email: "[_a-zA-Z0-9.]+@(?:[_a-z0-9]+\\.)+[a-z0-9]{2,4}",
			phone: "\\+?[0-9]+-?[0-9]{3,18}",
			cn: "[\u4e00-\u9fa5]+",
			mobile: "(12593|12520|10193|17900|17911|17951|125930|125200|101930|179000|179110|179510|(\\+?86))?1(3|4|5|7|8)([0-9]{9})"
		};
	$.extend(G, {
		regExp: {}
	});
	$.each("Url Email Phone CN Mobile".split(" "), function(i, v) {
		var k = v.toLowerCase(),
			p = PATTERN[k];
		G.regExp["is" + v] = function(s) {
			return new RegExp("^" + p + "$").test(s)
		}
	})
})(jQuery);
(function($) {
	var G = $.gozap;
	G.DOM = {};
	$.extend(G.DOM, {
		addStyleSheet: function(style, id) {
			id = id || "style-" + G.now();
			if (!$.browser.msie) {
				$("<style type='text/css' id='" + id + "'></style>").html(style).appendTo("head")
			} else {
				var oStyle = document.createElement("style");
				oStyle.type = "text/css";
				oStyle.id = id;
				var oHead = document.getElementsByTagName("head")[0];
				if (oHead.firstChild) {
					oHead.insertBefore(oStyle, oHead.firstChild)
				} else {
					oHead.appendChild(oStyle)
				}
				oStyle.styleSheet.cssText = style
			}
		},
		setPosition: function(elem, options) {
			var defaults = {
					target: null,
					offset: {
						left: 0,
						top: 0
					},
					container: $(document.body),
					position: "bottom"
				},
				opts = $.extend({}, defaults, options),
				left, top;
			if (null !== opts.target) {
				var offset = opts.target.offset(),
					position = opts.position;
				if (position === "left") {
					left = offset.left - elem.width();
					top = offset.top
				} else {
					if (position === "right") {
						left = offset.left + opts.target.outerWidth();
						top = offset.top
					} else {
						if (position === "top") {
							left = offset.left;
							top = offset.top - elem.height()
						} else {
							left = offset.left;
							top = offset.top + opts.target.outerHeight() + (opts.container ? opts.container.scrollTop() : 0)
						}
					}
				}
				left += opts.offset.left;
				top += opts.offset.top
			} else {
				var cwidth = document.documentElement.clientWidth,
					cheight = document.documentElement.clientHeight,
					width = elem.width(),
					height = elem.height();
				left = Math.max(0, (cwidth - width) / 2) + document.documentElement.scrollLeft + document.body.scrollLeft;
				top = Math.max(0, (cheight - height) / 2) + document.documentElement.scrollTop + document.body.scrollTop
			}
			elem.css({
				position: "absolute",
				zIndex: "100",
				left: left,
				top: top
			})
		}
	})
})(jQuery);
(function($) {
	var G = $.gozap;
	G.namespace("gozap.swf");
	$.extend(G.swf, {
		version: (function() {
			var n = navigator;
			if (n.plugins && n.mimeTypes.length) {
				var plugin = n.plugins["Shockwave Flash"];
				if (plugin && plugin.description) {
					return plugin.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
				}
			} else {
				if (window.ActiveXObject && !window.opera) {
					for (var i = 10; i >= 2; i--) {
						try {
							var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
							if (c) {
								var version = c.GetVariable("$version");
								return version.replace(/WIN/g, "").replace(/,/g, ".")
							}
						} catch (e) {}
					}
				}
			}
		})()
	})
})(jQuery);
(function($) {
	$.fn.extend({
		getRegion: function() {
			var offset = this.offset();
			return {
				left: offset.left,
				top: offset.top,
				right: offset.left + this.outerWidth(),
				bottom: offset.top - this.outerHeight()
			}
		}
	});
	$.extend({
		isUndefined: function(o) {
			return o === undefined
		},
		isBoolean: function(o) {
			return typeof o === "boolean"
		},
		isString: function(o) {
			return typeof o === "string"
		},
		isNumber: function(o) {
			return typeof o === "number" && isFinite(o)
		},
		addStyleSheet: function(style, styleId) {
			styleId = styleId || "labi-style";
			if (!$.browser.msie) {
				$("<style type='text/css' id='" + styleId + "'></style>").html(style).appendTo("head")
			} else {
				var oStyle = document.createElement("style");
				oStyle.type = "text/css";
				oStyle.id = styleId;
				var oHead = document.getElementsByTagName("head")[0];
				if (oHead.firstChild) {
					oHead.insertBefore(oStyle, oHead.firstChild)
				} else {
					oHead.appendChild(oStyle)
				}
				oStyle.styleSheet.cssText = style
			}
		},
		limitTextarea: function(o, length) {
			var fn = function() {
				var $this = $(this);
				if ($this.val().length > length) {
					$this.val($this.val().substring(0, length))
				}
			};
			o.bind("keydown", fn).bind("change", fn)
		},
		bindTipsEvent: function(o) {
			return o.focus(function() {
				var $this = $(this);
				var id = $this.attr("id"),
					label = $this.siblings("label[for='" + id + "']");
				label.hide()
			}).blur(function() {
				var $this = $(this);
				var id = $this.attr("id"),
					label = $this.siblings("label[for='" + id + "']");
				if ($.trim($this.val()) === "") {
					label.show()
				}
			})
		},
		bindInputTipsEvent: function(o, offset) {
			return o.focus(function() {
				var $this = $(this);
				var value = $.trim($this.val());
				if (value === "") {
					var text = $this.attr("tips");
					var tips_o = $("<span></span>").text(text).addClass("input_tips").appendTo(document.body);
					$.setPosition(tips_o, {
						target: $this,
						offset: offset
					});
					$this.data("tips", tips_o)
				}
			}).blur(function() {
				var $this = $(this);
				if ($this.data("tips")) {
					$this.data("tips").remove()
				}
			}).keyup(function() {
				var $this = $(this);
				if ($.trim($this.val()) !== "" && $this.data("tips")) {
					$this.data("tips").remove();
					$this.removeData("tips")
				}
			}).change(function() {
				var $this = $(this);
				if ($.trim($this.val()) !== "" && $this.data("tips")) {
					$this.data("tips").remove();
					$this.removeData("tips")
				}
			})
		},
		setPosition: function($elem, options) {
			var defaults = {
				target: null,
				offset: {
					left: 0,
					top: 0
				},
				container: $(document.body)
			};
			var opts = $.extend({}, defaults, options);
			if (null !== opts.target) {
				var position = opts.target.offset(),
					left = position.left + opts.offset.left,
					top = position.top + opts.target.outerHeight() + (opts.container ? opts.container.scrollTop() : 0) + opts.offset.top;
				$elem.css({
					position: "absolute",
					zIndex: "100",
					left: left,
					top: top
				})
			} else {
				var cwidth = document.documentElement.clientWidth,
					cheight = document.documentElement.clientHeight,
					width = $elem.width(),
					height = $elem.height(),
					left = Math.max(0, (cwidth - width) / 2) + document.documentElement.scrollLeft,
					top = Math.max(0, (cheight - height) / 2) + document.documentElement.scrollTop;
				$elem.css({
					left: left,
					top: top
				})
			}
		},
		getWeekOfMonth: function(date) {
			var d = date.getDate(),
				wd = date.getDay();
			if (wd === 0) {
				wd = 7
			}
			if (d > wd) {
				return Math.ceil((d - wd) / 7) + 1
			} else {
				return 1
			}
			return Math.floor((d - wd) / 7) + 1
		},
		getWeekDayOfMonth: function(date) {
			var wom = $.getWeekOfMonth(date),
				wd = date.getDay(),
				fwd = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
			if (wd !== 0 && fwd > wd) {
				wom--
			}
			return wom
		}
	});
	$.fn.extend({
		getData: function(key) {
			return this.attr("data-" + key)
		},
		setData: function(key, value) {
			return this.attr("data-" + key, value)
		},
		autoRemove: function(options) {
			var defaults = {
				hideMask: false
			};
			var opts = $.extend({}, defaults, options);
			var $this = this;
			var removeObj = function() {
				$this.remove();
				if ($this.data("shim")) {
					$this.data("shim").remove()
				}
				if (opts.hideMask) {
					L.hideMask()
				}
				unbind()
			};
			var bind = function() {
				var w = window;
				while (w) {
					$(w.document).unbind("click", removeObj).bind("click", removeObj);
					if (w === w.parent) {
						break
					}
					w = w.parent
				}
			};
			var unbind = function() {
				var w = window;
				while (w) {
					$(w.document).unbind("click", removeObj);
					if (w === w.parent) {
						break
					}
					w = w.parent
				}
			};
			setTimeout(function() {
				bind();
				$this.hover(function() {
					unbind()
				}, function() {
					bind()
				})
			}, 1)
		},
		bindTipsEvent: function() {
			return $.bindTipsEvent(this)
		},
		bindInputTipsEvent: function(offset) {
			return $.bindInputTipsEvent(this, offset)
		}
	});
	$.extend($.browser, {
		chrome: (function() {
			return /chrome\/(\d+\.\d)/i.test(navigator.userAgent)
		})()
	})
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi;
	var i18n = {
		common: {
			httpError: {
				"5": "本地网络异常，请稍候再试",
				"6": "请求超时，请稍候再试",
				"0": "本地网络异常，请稍候再试"
			},
			topTips: {
				loading: "数据加载中..."
			},
			inputTips: {
				searchContacts: "搜索联系人..."
			},
			buttonText: {
				confirm: "确定",
				cancel: "取消"
			},
			close: "关闭",
			year: "年",
			month: "月",
			date: "日",
			add: "添加",
			remove: "删除",
			set: "修改",
			create: "创建",
			restore: "恢复",
			mobile: "手机",
			website: "站点",
			contact: "联系人",
			"new": "新",
			old: "旧",
			sendMail: "发邮件",
			operateTips: {
				setSuccess: "设置成功",
				failed: "操作失败"
			},
			basicErrorTips: {
				"400": "操作请求出错，请联系客服！",
				"403": "您没有权限执行此操作！",
				"404": "目前服务不可用，请稍后再试！",
				"500": "内部服务器出错，请稍后再试！",
				"502": "服务器处理超时，请稍后再试！",
				"503": "目前服务不可用，请稍后再试！",
				noPacketBack: "服务器处理超时，请稍后再试！"
			},
			inactive: "未激活",
			allPnum: "所有号码"
		},
		ui: {}
	};
	if (!L.i18n) {
		L.i18n = {}
	}
	$.extend(L.i18n, i18n)
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		TOP_TIPS_DELAY = 3000,
		tipsTimeout, mainContext = window.top.document;
	currentPage = {};
	$.extend(L, {
		TIPS_TYPE: G.TIPS_TYPE,
		RESULT_CODE: G.RESULT_CODE,
		buttonType: {
			BTN_TYPE_LEAD: "1",
			BTN_TYPE_NON_LEAD: "2",
			BIN_TYPE_NORMAL: "3",
			BTN_TYPE_TOOL: "4",
			BTN_TYPE_PNUM: "5"
		},
		show: function(o) {
			return o.show()
		},
		hide: function(o) {
			return o.hide()
		},
		formatDate: function(s) {
			var t = new Date(parseInt(s) / 1000);
			var h = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
			var m = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
			return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + "  " + h + ":" + m
		},
		showTopTips: function(type, text, delay) {
			var t = L.TIPS_TYPE,
				container = $("#tips_top_container"),
				o = container.children(),
				closeBtn = o.find("a"),
				span = o.find("span"),
				type = type || t.loading;
			delay = delay || TOP_TIPS_DELAY;
			if (type === t.loading) {
				span.css("margin", "0 20px");
				closeBtn.hide();
				text = text || i18n.common.topTips.loading;
				o.css({
					borderColor: "#99ccff",
					backgroundColor: "#cae1fe"
				})
			} else {
				span.css("margin", "0 30px 0 10px");
				closeBtn.show().removeClass().addClass("icon-common");
				if (type === t.success) {
					o.css({
						borderColor: "#34cb00",
						backgroundColor: "#ccffcc"
					});
					closeBtn.addClass("icon-close-success")
				} else {
					if (type === t.error) {
						o.css({
							borderColor: "#ff9999",
							backgroundColor: "#ffcccc"
						});
						closeBtn.addClass("icon-close-fail")
					} else {
						if (type === t.warning) {
							o.css({
								borderColor: "#f3c302",
								backgroundColor: "#ffffd5"
							});
							closeBtn.addClass("icon-close-warning")
						}
					}
				} if (tipsTimeout) {
					tipsTimeout = clearTimeout(tipsTimeout)
				}
				tipsTimeout = setTimeout(function() {
					container.hide();
					tipsTimeout = null
				}, delay)
			}
			o.find("span").html(text);
			container.show()
		},
		hideTopTips: function() {
			if (tipsTimeout) {
				tipsTimeout = clearTimeout(tipsTimeout)
			}
			$("#tips_top_container").hide()
		},
		isAvailable: function(s) {
			return s && !(s instanceof Object) && s != "[object Object]"
		},
		toArray: G.toArray,
		getReturnPage: function(lastPage, pages, totalItems, items) {
			lastPage = parseInt(lastPage);
			pages = parseInt(pages);
			totalItems = parseInt(totalItems);
			items = parseInt(items);
			var tp = Math.ceil(totalItems / pages);
			if (lastPage == tp && lastPage > 1 && (items == pages || items == (totalItems % pages))) {
				return lastPage - 1
			}
			return lastPage
		},
		resizeLabiFrame: function() {
			$("#main_frame, #main_content").height($("#main_frame").contents().find("#content").height())
		},
		goTop: function() {
			$(window).scrollTop(0)
		},
		changeMainNavStyle: function(module) {
			var currentModule = currentPage.module;
			if (currentModule === "crc") {
				currentModule = "sms"
			}
			if (module === "crc") {
				module = "sms"
			}
			if (module == currentModule) {
				return
			}
			var $nav_last = $("#nav_" + currentModule);
			if ($nav_last.length > 0) {
				$nav_last.removeClass("nav-" + currentModule + "-active").removeClass("nav-" + currentModule + "-mouseover")
			}
			var $nav_now = $("#nav_" + module);
			if ($nav_now.length > 0) {
				$nav_now.addClass("nav-" + module + "-active")
			}
		},
		initModule: function(module, info) {
			L.changeMainNavStyle(module);
			currentPage.module = module;
			if (info) {
				currentPage.info = info
			} else {
				delete currentPage.info
			}
		},
		showMask: function() {
			$("#mask").css({
				width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
				height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
			}).show()
		},
		hideMask: function() {
			$("#mask").hide()
		},
		compareVersion: function(version, target) {
			var vs = version.split("."),
				ts = target.split("."),
				len = Math.min(vs.length, ts.length),
				v, t;
			for (var i = 0; i < len; i++) {
				v = parseInt(vs[i]);
				t = parseInt(ts[i]);
				if (v !== t) {
					return v - t
				}
			}
			return vs.length - ts.length
		},
		highlight: function(s, q) {
			if (!q) {
				return s
			}
			return s.replace(new RegExp(q, "g"), function(w) {
				return "<b>" + w + "</b>"
			})
		},
		cutOff: function(s, n) {
			if (s.length > n) {
				return s.substring(0, n) + "..."
			}
			return s
		},
		viewPhone: function(imei, flag) {
			var info = parent.statusInfo[imei],
				pnum = info.pnum;
			if (!pnum) {
				if (!flag && info.brand) {
					return info.brand + " " + info.model
				} else {
					return i18nCommon.inactive
				}
			}
			return pnum
		},
		getImgPath: function(src) {
			if (src) {
				var url = "http://img.labi.com",
					relative, absolute, defaultPath = DEFAULT_USER_IMAGE_PATH;
				if (src.indexOf(defaultPath) == 0) {
					absolute = src;
					relative = src.replace(defaultPath, "")
				} else {
					if (src.indexOf(url) == 0) {
						relative = src.replace(url, "");
						absolute = defaultPath + relative
					} else {
						if (src.substring(0, 1) != "/") {
							src = "/" + src
						}
						relative = src;
						absolute = defaultPath + relative
					}
				}
				return {
					absolute: absolute,
					relative: relative
				}
			} else {
				return {
					absolute: "",
					relative: ""
				}
			}
		},
		getImageAbsolutePath: function(relativeUrl) {
			return L.getImgPath(relativeUrl).absolute
		},
		setButtonDisabled: function(obj, buttonType) {
			var type = buttonType;
			if (parseInt(type)) {
				obj.removeAttr("abled-status");
				obj.addClass("button-disabled-" + type).css({
					cursor: "default",
					outline: "none"
				}).find("span").css("cursor", "default")
			} else {
				return
			}
		},
		setButtonAbled: function(obj, buttonType) {
			var type = buttonType;
			if (parseInt(type)) {
				obj.attr("abled-status", true);
				obj.removeClass("button-disabled-" + type).css("cursor", "pointer").find("span").css("cursor", "pointer")
			} else {
				return
			}
		},
		buttonCanAbled: function(obj) {
			if (obj.attr("abled-status")) {
				return true
			} else {
				return false
			}
		}
	})
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n;
	$.extend(L, {
		ajax: function(options) {
			options = options || {};
			G.ajax(options)
		}
	});
	$.ajaxSetup({
		error: function(xmlHttp, textStatus) {
			textStatus = textStatus.toLowerCase();
			if (textStatus === "error") {
				var status = xmlHttp.status.toString().substring(0, 1);
				if (status === "5") {
					L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[status])
				}
			} else {
				if (textStatus === "timeout") {}
			}
		}
	})
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		LC = L.contact,
		i18n = L.i18n,
		i18nCommon = i18n.common,
		i18nAvaUpload = i18n.avaUpload,
		DEFAULT_BIG_AVATAR_SRC = "",
		IMAGE_ORIGINAL_ID = "image-original",
		IMAGE_PREVIEW_ID = "image-preview",
		IMAGE_MAX_WIDTH = 300,
		IMAGE_MAX_HEIGHT = 300,
		ias, RESOURCEPATH = "/images/",
		FILE_TYPE_ERROR = "fileTypeError",
		FILE_SIZE_ERROR = "fileSizeError",
		MASK_ID = "labi-mask",
		imgw = null,
		imgh = null,
		ie6 = $.browser.msie && $.browser.version < 7,
		iframeSrc = ie6 ? "blank.html" : "about:blank",
		contactGuid;
	var init = function(guid, src) {
		if (G.swf.version && parseInt(G.swf.version.substring(0, G.swf.version.indexOf("."))) > 9 && !$.browser.chrome) {
			contactGuid = guid;
			showFlashDialog();
			return
		}
		var content = $("<div></div>").addClass("avaupload-dialog-content"),
			iframe = $('<iframe name="uploadIframe"></iframe>').css("display", "none").attr({
				src: iframeSrc
			}).appendTo(content),
			form = $('<form enctype="multipart/form-data" method="post"></form>').attr({
				target: "uploadIframe",
				action: "imageUpload!insertImageNotConfirm.action?t=1"
			}).html('<input type="hidden" name="x1" value="0" /><input type="hidden" name="y1" value="0" /><input type="hidden" name="width" value="0" /><input type="hidden" name="height" value="0" /><input type="hidden" name="guid" value="' + guid + '" /><input type="hidden" name="fileName" value="" />').appendTo(content),
			inputFile = $('<input type="file" name="upload" />').addClass("file").attr({
				size: "37"
			}).bind("change", function() {
				$("#H-avaupload-dialog a.btn" + BTN_TYPE_LEAD).attr("disabled", "disabled");
				imageDefault.hide();
				imageLoading.show();
				form.attr("action", "imageUpload!insertImageNotConfirm.action?t=1").submit()
			}).appendTo(form),
			table = $("<table></table>").attr({
				cellspacing: "0",
				cellpadding: "0",
				width: "100%"
			}).appendTo(content),
			tr = $("<tr></tr>").appendTo(table),
			td1 = $('<td width="330" valign="top"></td>').appendTo(tr),
			td2 = $('<td valign="top"></td>').appendTo(tr),
			tips1 = $("<div></div>").addClass("picture-dialog-content-uploadtips").text(i18nAvaUpload.imageUploadTips).appendTo(td1),
			imageContainer = $("<div></div>").addClass("picture-dialog-content-imagecontainer").appendTo(td1),
			image = $('<img src="" />').attr({
				id: "H-ava-upload"
			}).css("display", "none").appendTo(imageContainer),
			imageDefault = $('<img src="http://dig.chouti.com/image/upload-default.png" />').addClass("upload-image-default").attr({
				id: "H-upload-image-default"
			}).appendTo(imageContainer),
			imageLoading = $('<img src="http://dig.chouti.com/image/upload-loading.gif" />').addClass("upload-image-loading").attr({
				id: "H-upload-ava-loading"
			}).appendTo(imageContainer),
			tips2 = $("<div></div>").addClass("picture-dialog-content-uploadtips").text(i18nAvaUpload.tips).appendTo(td2),
			preview1 = $('<div><img src="" style="position:relative;display:none;" /></div>').addClass("ava-preview-140").attr({
				id: "H-image-preview-140"
			}).appendTo(td2),
			preview1Size = $("<div></div>").addClass("ava-preview-size").text("140x140").appendTo(td2),
			preview2 = $('<div><img src="" style="position:relative;display:none;" /></div>').addClass("ava-preview-48").attr({
				id: "H-image-preview-48"
			}).appendTo(td2),
			preview2Size = $("<div></div>").addClass("ava-preview-size").text("48x48").appendTo(td2),
			options = {
				id: "H-avaupload-dialog",
				dialogClass: "avaupload-dialog",
				title: i18nAvaUpload.title,
				titleImgClass: "avaupload-dialog-icon",
				content: content,
				container: $(document.body),
				buttons: {}
			};
		options.buttons[i18nAvaUpload.upload] = function() {
			if ($("#H-avaupload-dialog input[name='fileName']").val() == "") {
				L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.select);
				return false
			}
			form.attr("action", "imageUpload!uploadAvatar.action").submit();
			return false
		};
		options.buttons[i18nCommon.buttonText.cancel] = "";
		$.dialog(options)
	};

	function showFlashDialog() {
		var content = '<object id="swf_ava_upload" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="541" height="451"><param name="movie" value="' + RESOURCEPATH + 'GozapToolComponentTest.swf" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /><param name="FlashVars" value="swfId=swf_ava_upload&showStyle=0&uploadDataFieldName=upload&uploadSvrURL=imageUpload!flashUpload.action"><embed src="' + RESOURCEPATH + 'GozapToolComponentTest.swf" id="GozapToolComponentTest" allowscriptaccess="always" swliveconnect="true" quality="high" type="application/x-shockwave-flash" flashvars="swfId=swf_ava_upload&showStyle=0&uploadDataFieldName=upload&uploadSvrURL=imageUpload!flashUpload.action" width="541" height="451"></embed></object>';
		var options = {
			id: "H-avaupload-dialog",
			dialogClass: "avaupload-dialog",
			title: i18nAvaUpload.title,
			titleImgClass: "avaupload-dialog-icon",
			content: content,
			contentClass: "flash-dialog-content",
			container: $(document.body),
			buttons: {}
		};
		$.dialog(options)
	}
	var preview = function(img, selection) {
		var scaleX = 48 / (selection.width || 1),
			scaleY = 48 / (selection.height || 1),
			$img = $(img);
		if (imgw === null) {
			imgw = $img.width()
		}
		if (imgh === null) {
			imgh = $img.height()
		}
		$("#H-image-preview-48>img").css({
			width: Math.round(scaleX * imgw) + "px",
			height: Math.round(scaleY * imgh) + "px",
			marginLeft: "-" + Math.round(scaleX * selection.x1) + "px",
			marginTop: "-" + Math.round(scaleY * selection.y1) + "px"
		});
		scaleX = 140 / (selection.width || 1);
		scaleY = 140 / (selection.height || 1);
		$("#H-image-preview-140>img").css({
			width: Math.round(scaleX * imgw) + "px",
			height: Math.round(scaleY * imgh) + "px",
			marginLeft: "-" + Math.round(scaleX * selection.x1) + "px",
			marginTop: "-" + Math.round(scaleY * selection.y1) + "px"
		})
	};
	var avaUploadCallback = function(src, fileName, width, height) {
		$("#H-avaupload-dialog a.btn" + BTN_TYPE_LEAD).removeAttr("disabled");
		$("#H-upload-ava-loading").hide();
		$("#H-ava-upload").show();
		if (src == "error") {
			L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.failed)
		} else {
			if (src == FILE_TYPE_ERROR) {
				L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.fileTypeError)
			} else {
				if (src == FILE_SIZE_ERROR) {
					L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.fileSizeError)
				} else {
					imgw = null;
					imgh = null;
					width = parseInt(width);
					height = parseInt(height);
					var x1, y1, x2, y2;
					if (width < height) {
						x1 = 0;
						x2 = width - 1;
						y1 = parseInt((height - width) / 2);
						y2 = y1 + width - 1
					} else {
						x1 = parseInt((width - height) / 2);
						x2 = x1 + height - 1;
						y1 = 0;
						y2 = height - 1
					}
					$("#H-ava-upload").attr("src", src).css({
						position: "absolute",
						left: (IMAGE_MAX_WIDTH - width) / 2,
						top: (IMAGE_MAX_HEIGHT - height) / 2
					}).show().imgAreaSelect({
						handles: true,
						parent: $("#H-avaupload-dialog"),
						aspectRatio: "1:1",
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						onInit: preview,
						onSelectEnd: function(img, selection) {
							$("#H-avaupload-dialog input[name=x1]").val(selection.x1);
							$("#H-avaupload-dialog input[name=y1]").val(selection.y1);
							$("#H-avaupload-dialog input[name=width]").val(selection.width);
							$("#H-avaupload-dialog input[name=height]").val(selection.height)
						},
						onSelectChange: preview
					});
					$("#H-image-preview-48>img, #H-image-preview-140>img").attr("src", src).show();
					$("#H-avaupload-dialog input:file").val("");
					$("#H-avaupload-dialog input[name=fileName]").val(fileName);
					$("#H-avaupload-dialog input[name=width]").val(Math.min(width, height));
					$("#H-avaupload-dialog input[name=height]").val(Math.min(width, height));
					$("#H-avaupload-dialog input[name=x1]").val(x1);
					$("#H-avaupload-dialog input[name=y1]").val(y1)
				}
			}
		}
	};
	var avaUploadFinish = function(src_url, small_url, middle_url, guid, code) {
		var ava = L.getImgPath(small_url);
		var iframe = $("#main_frame").contents();
		if (guid == "") {
			if (code == common.RESULT) {
				if (getContentWindow().cardItem) {
					getContentWindow().cardItem.ava = ava.relative
				}
				$("#head_ava").attr("src", ava.absolute);
				if (currentPage.module == "setting") {
					iframe.find("#contact-ava").attr("src", ava.absolute)
				}
				$("#H-avaupload-dialog").remove();
				L.hideMask();
				L.showTopTips(L.TIPS_TYPE.success, labiTips.setAvaSuccess)
			} else {
				L.showTopTips(L.TIPS_TYPE.error, i18nCommon.basicErrorTips[code])
			}
		} else {
			if (guid == "add") {
				if (code == common.RESULT) {
					iframe.find("#contact-ava").attr("src", ava.absolute);
					$("#H-avaupload-dialog").remove();
					L.hideMask();
					getContentWindow().contact.setAvaForAdd(small_url)
				} else {
					L.showTopTips(L.TIPS_TYPE.error, i18nCommon.basicErrorTips[code])
				}
			} else {
				if (code == common.RESULT) {
					iframe.find("#contact-ava").attr("src", ava.absolute);
					var allData = LC.getAllData(),
						cntItems = allData.cnt;
					for (var i = 0; i < cntItems.length; i++) {
						if (cntItems[i].guid == guid) {
							cntItems[i].ava = ava.relative;
							break
						}
					}
					$("#H-avaupload-dialog").remove();
					L.hideMask();
					L.showTopTips(L.TIPS_TYPE.success, labiTips.setAvaSuccess)
				} else {
					L.showTopTips(L.TIPS_TYPE.error, i18nCommon.basicErrorTips[code])
				}
			}
		}
	};

	function getGuid() {
		return contactGuid
	}

	function flashUploadCallback(url) {
		if (url == "-1") {
			L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.failed)
		} else {
			if (url == "IOError") {
				L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.failed)
			} else {
				$("#H-avaupload-dialog").remove();
				L.hideMask();
				var ava = L.getImgPath(url);
				var iframe = $("#main_frame").contents();
				if (contactGuid == "") {
					$.ajax({
						type: "POST",
						url: "labiCard!setCardAttr.action",
						data: "ava=" + ava.relative,
						error: function(xmlHttp, textStatus) {
							treatError(xmlHttp, textStatus)
						},
						success: function(data) {
							if (data == SESSION_TIMEOUT) {
								treatSessionTimeout();
								return
							}
							if (data == common.RESULT) {
								if (getContentWindow().cardItem) {
									getContentWindow().cardItem.ava = ava.relative
								}
								$("#head_ava").attr("src", ava.absolute);
								if (currentPage.module == "setting") {
									iframe.find("#contact-ava").attr("src", ava.absolute)
								}
								L.showTopTips(L.TIPS_TYPE.success, labiTips.setAvaSuccess)
							} else {
								L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.failed)
							}
						}
					})
				} else {
					if (contactGuid == "add") {
						iframe.find("#contact-ava").attr("src", ava.absolute);
						getContentWindow().contact.setAvaForAdd(url)
					} else {
						$.ajax({
							type: "POST",
							url: "labiContacts!setContactAttr.action",
							data: "guid=" + contactGuid + "&ava=" + ava.relative,
							error: function(xmlHttp, textStatus) {
								treatError(xmlHttp, textStatus)
							},
							success: function(data) {
								if (data == SESSION_TIMEOUT) {
									treatSessionTimeout();
									return
								}
								if (data == common.RESULT) {
									iframe.find("#contact-ava").attr("src", ava.absolute);
									var allData = LC.getAllData(),
										cntItems = allData.cnt;
									for (var i = 0; i < cntItems.length; i++) {
										if (cntItems[i].guid == contactGuid) {
											cntItems[i].ava = ava.relative;
											break
										}
									}
									L.showTopTips(L.TIPS_TYPE.success, labiTips.setAvaSuccess)
								} else {
									L.showTopTips(L.TIPS_TYPE.error, i18nAvaUpload.failed)
								}
							}
						})
					}
				}
			}
		}
	}
	NS_avaUpload = {
		init: init,
		avaUploadCallback: avaUploadCallback,
		avaUploadFinish: avaUploadFinish,
		flashUploadCallback: flashUploadCallback,
		getGuid: getGuid
	}
})(jQuery);
(function($) {
	var defaults = {
		enable: true,
		target: null,
		callback: {
			onMove: function(e) {},
			onDrop: function(e) {}
		}
	};
	$.fn.drag = function(options) {
		var opts = $.extend({}, defaults, options);
		return this.each(function() {
			if (opts.enable) {
				var $this = $(this);
				$this.bind("mousedown", function(e) {
					var target = opts.target || $this.parent().parent(),
						height = target.outerHeight(),
						width = target.outerWidth(),
						offset = target.offset(),
						left = offset.left,
						top = offset.top,
						lastElemLeft = left,
						lastElemTop = top,
						data = {
							left: left,
							top: top,
							pageX: e.pageX,
							pageY: e.pageY
						},
						help = $("<div></div>").appendTo(document.body),
						$d = $(document),
						body = document.documentElement || document.body,
						cw = Math.max(body.scrollWidth, body.clientWidth),
						ch = Math.max(body.scrollHeight, body.clientHeight),
						handler = {
							move: function(e) {
								window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
								left = lastElemLeft + e.pageX - e.data.pageX;
								top = lastElemTop + e.pageY - e.data.pageY;
								if (parseInt(left) < 0) {
									left = 0
								}
								if (parseInt(top) < 0) {
									top = 0
								}
								if (top > ch - height) {
									top = ch - height
								}
								if (left > cw - width) {
									left = cw - width
								}
								help.css({
									left: left,
									top: top
								});
								opts.callback.onMove(e)
							},
							drop: function(e) {
								help.remove();
								target.css({
									left: left,
									top: top
								});
								var shim = target.data("shim");
								if (shim) {
									shim.css({
										left: left,
										top: top
									})
								}
								$d.unbind("mousemove", handler.move).css("cursor", "");
								opts.callback.onDrop(e)
							}
						};
					$d.css("cursor", "move");
					help.css({
						height: target.outerHeight(),
						width: target.outerWidth(),
						border: "1px dotted #333",
						cursor: "move",
						position: "absolute",
						zIndex: parseInt(target.css("z-index")) + 1,
						left: left,
						top: top
					});
					$d.bind("mousemove", data, handler.move).bind("mouseup", data, handler.drop)
				})
			}
		})
	}
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nCommon = i18n.common,
		i18nSMS = i18n.sms,
		i18nDialog = i18n.ui.dialog,
		commonDialogClasses = "dialog ",
		dialog, MASK_ID = "labi-mask",
		shim = null,
		defaults = {
			id: "labi-dialog",
			title: "",
			titleImgClass: "",
			closeText: i18nCommon.close,
			content: "",
			height: "auto",
			width: 300,
			maxHeight: false,
			maxWidth: false,
			minHeight: 150,
			minWidth: 150,
			position: "center",
			zIndex: 100,
			dialogClass: "",
			draggable: true,
			showMask: true,
			buttons: {},
			otherButtonPaneElem: false,
			target: null,
			autoClose: false,
			closeButtonHandler: null,
			container: false,
			closeDialogCallback: false,
			showCloseButton: true,
			contentClass: ""
		};
	var opts;
	$.dialog = function(options) {
		opts = $.extend({}, defaults, options);
		return create(opts)
	};
	var create = function(options) {
		if ($("#" + options.id).length > 0) {
			$("#" + options.id).remove()
		}
		var container = options.container || $(document.body);
		dialog = $("<div></div>").appendTo(container).css({
			zIndex: options.zIndex
		}).addClass(commonDialogClasses + options.dialogClass).attr("id", options.id);
		var dialogTitlebar = $("<div></div>").addClass("dialog-titlebar").prependTo(dialog),
			dialogTitle = $("<div></div>").addClass("dialog-title ").append($("<div></div>").addClass(options.titleImgClass)).append($("<span></span>").html(options.title)).appendTo(dialogTitlebar),
			dialogContent = $("<div></div>").html(options.content).addClass("dialog-content " + options.contentClass).appendTo(dialog),
			id = options.id;
		createButtons(options.buttons, options.showMask, id);
		if (options.showCloseButton) {
			$("<div></div>").addClass("dialog-titlebar-close").click(function() {
				var fn = options.buttons[i18nCommon.buttonText.cancel],
					result;
				if (!fn || false !== (result = fn.apply(this, arguments))) {
					closeDialog(options.showMask, options.id)
				}
				if (result === MASK_HOLD) {
					_showMask()
				}
			}).hover(function() {
				$(this).css("background-position", "-17px -32px")
			}, function() {
				$(this).css("background-position", "0 -32px")
			}).appendTo(dialogTitlebar)
		}
		if (options.showMask) {
			_showMask(options.zIndex - 1)
		}
		$.setPosition(dialog, {
			target: options.target,
			container: options.container
		});
		dialog.show();
		if (options.autoClose) {
			dialog.autoRemove()
		}
		if (options.draggable) {
			dialogTitle.drag()
		}
		return dialog
	};
	var _showMask = function(zIndex) {
		L.showMask()
	};
	var _hideMask = function() {
		L.hideMask()
	};
	var createButtons = function(buttons, showMask, id) {
		var hasButtons = false;
		if (typeof buttons === "object" && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true)
			})
		}
		if (hasButtons) {
			var dialogButtonPane = $("<div></div>").addClass("dialog-buttonpane");
			if (opts.otherButtonPaneElem) {
				dialogButtonPane.append(opts.otherButtonPaneElem)
			}
			var buttonContainer = $("<div></div>").addClass("button-container").appendTo(dialogButtonPane);
			if (id === "H-sms-send-dialog") {
				var tips = $("<span></span>").addClass("cost-tips").text(i18nSMS.smsCostTips).appendTo(dialogButtonPane);
				$.each(buttons, function(name, fn) {
					var button;
					if (name == i18nCommon.buttonText.cancel) {
						button = $('<a href="javascript:;" class="btn-cancel">' + name + "</a>").click(function() {
							if ($(this).attr("disabled") != "disabled") {
								if (fn) {
									fn.apply(this, arguments)
								}
								closeDialog(showMask, id)
							}
						}).appendTo(buttonContainer)
					} else {
						button = $(common.genButtonHtml(name, "3", "sms_sender_button_send")).bind("click", function() {
							if ($(this).attr("disabled") != "disabled") {
								fn.apply(this, arguments)
							}
						}).appendTo(buttonContainer)
					}
				});
				var loadImage = $('<img src="http://dig.chouti.com/' + parent.DEFAULT_SYSTEM_IMAGE_PATH + 'loading_16_16.gif" />').addClass("sms-send-load-img").appendTo(buttonContainer)
			} else {
				$.each(buttons, function(name, fn) {
					var button;
					if (name == i18nCommon.buttonText.cancel) {
						button = $(common.genButtonHtml(name, BTN_TYPE_NON_LEAD)).click(function() {
							if ($(this).attr("disabled") != "disabled") {
								var result;
								if (!fn || false !== (result = fn.apply(this, arguments))) {
									closeDialog(showMask, id)
								}
								if (result === MASK_HOLD) {
									_showMask()
								}
							}
						}).appendTo(buttonContainer)
					} else {
						button = $(common.genButtonHtml(name, BTN_TYPE_LEAD)).bind("click", function() {
							if ($(this).attr("disabled") != "disabled") {
								var result;
								if (false !== (result = fn.apply(this, arguments))) {
									closeDialog(showMask, id)
								}
								if (result === MASK_HOLD) {
									_showMask()
								}
							}
						}).appendTo(buttonContainer)
					}
				})
			}
			dialogButtonPane.appendTo(dialog)
		}
	};
	var closeDialog = function(showMask, id) {
		if (showMask) {
			_hideMask()
		}
		$("#" + id).remove();
		if (opts.closeDialogCallback) {
			opts.closeDialogCallback()
		}
	}
})(jQuery);
(function() {
	var z$ = function(obj) {
		return typeof(obj) == "string" ? document.getElementById(obj) : obj
	};
	var appStr = navigator.userAgent.toLowerCase();
	var browser = {
		msie: /msie/.test(appStr) && !/opera/.test(appStr),
		mozilla: /mozilla/.test(appStr) && !/(compatible|webkit)/.test(appStr),
		safari: /webkit/.test(appStr),
		opera: /opera/.test(appStr),
		firefox: /firefox/.test(appStr)
	};
	var time_radio_url_path = "https://www.labi.com/image/";

	function time_radio_get_html(width, num, id) {
		var col = "#6598CD";
		var div_str = '<div><div style="position:absolute;top:' + (num * 25 + 8) + "px;font-size:9pt;font-family:tohuma,Arial;font-weight: bold;width:15px;color:" + col + ';" align="right">' + (num * 6) + '</div><div style="width:' + width + "px;left:20px;position:absolute;top:" + (num * 25) + 'px;"><table width="100%" height="22" border="0" cellspacing="0" cellpadding="0" id="list_' + id + "_" + num + '"><tr>';
		for (var i = 0; i <= 72; i++) {
			var border_str = "border-bottom: 1px solid " + col + ";font-size:1pt;";
			if (72 == i) {
				border_str = "font-size:1pt;"
			}
			var bgCol = " style='" + border_str + "'";
			if (!(i % 2)) {
				var img_name = "time_x3_1_5.jpg";
				if (i % 12) {
					img_name = "time_x4_1_2.jpg"
				}
				bgCol = " style='background-image: url(" + time_radio_url_path + img_name + ");background-repeat: no-repeat;background-position: left bottom;font-size:1pt;" + border_str + "'"
			}
			div_str += "<td" + bgCol + ' type_i="' + i + '" num="' + num + '">' + (browser.msie ? "&nbsp;" : "") + "</td>"
		}
		div_str += '</tr></table></div><div style="position:absolute;top:' + (num * 25 + 8) + "px;font-size:9pt;font-family:tohuma,Arial;font-weight: bold;width:15px;color:" + col + ";left:" + (width + 20) + 'px;" align="left">' + ((num * 6) + 6) + "</div></div>";
		return div_str
	}

	function time_radio(id, w, ok_fun) {
		if (null == w) {
			w = 500
		}
		var o = z$(id);
		if (!o) {
			alert("没有找到对象" + id)
		}
		var key_num = 0;
		var key_time = 0;
		var key_find;
		time_radio_global_val[id] = new Object();
		time_radio_global_val[id].hour = 0;
		time_radio_global_val[id].o = o;
		time_radio_global_val[id].ok_fun = ok_fun;
		var div_str = '<div style="position:absolute;"><div style="position:absolute;left:10px;top:5px;">' + time_radio_get_html((w - 60), 0, id) + time_radio_get_html((w - 60), 1, id) + time_radio_get_html((w - 60), 2, id) + time_radio_get_html((w - 60), 3, id) + '</div><div style="position:absolute"><div style="position:absolute;left:10px;top:0px;z-index:1000;background-color:#ff0000;filter:alpha(opacity=0);opacity:0;width:' + (w - 20) + 'px;height:112px;" id="' + id + '_radio_listener"></div><input type="text" id="' + id + '_key_listener" style="width:1px;height:1px;filter:alpha(opacity=0);opacity:0;"/></div></div><div style="width:' + w + 'px;height:112px;"></div>';
		o.innerHTML = div_str;
		z$(id + "_radio_listener").innerHTML = o.firstChild.firstChild.innerHTML;
		var div = document.createElement("div");
		div.style.cssText = "position:absolute;width:0px;height:20px;border-right:2px solid #FF6503;left:20px;top:10px;";
		div.innerHTML = '<div id="' + id + '_radio_hand"></div>';
		var div2 = document.createElement("div");
		div2.style.cssText = "left:-3px;top:25px;border:1px solid #FF6503;position:absolute;";
		div2.innerHTML = '<div id="' + id + '_radio_time" align="center" style="font-size:9pt;font-family:tohuma,Arial;line-height:26px;font-weight: bold;width:46px;height:26px;background-color:#FFFFCB;cursor: default;">0:00</div>';
		var div3 = document.createElement("div");
		div3.style.cssText = "position:absolute;";
		div3.innerHTML = '<div id="' + id + '_radio_ok_time" align="center" style="font-size:9pt;font-family:tohuma,Arial;background-color:#CC0000;width:38px;height:18px;color:#fff;line-height:18px;display:none;">0:00</div>';
		var div4 = document.createElement("div");
		div4.style.cssText = "position:absolute;border-right:2px solid #CC0000;width:0px;height:7px;display:none;";
		div4.innerHTML = '<div id="' + id + '_radio_ok_heand"></div>';
		var child_nodes = o.firstChild.firstChild.childNodes;
		for (var i = child_nodes.length - 1; i >= 0; i--) {
			time_radio_init_tds(child_nodes[i].getElementsByTagName("td"), z$("list_" + id + "_" + i).parentNode, (i * 6) + 6, id, i)
		}
		child_nodes = z$(id + "_radio_listener").childNodes;
		for (var i = child_nodes.length - 1; i >= 0; i--) {
			time_radio_init_td_listener(child_nodes[i].getElementsByTagName("td"), id)
		}
		o.firstChild.firstChild.appendChild(div);
		o.firstChild.firstChild.appendChild(div3);
		o.firstChild.firstChild.appendChild(div4);
		o.firstChild.firstChild.appendChild(div2);
		z$(id + "_key_listener").onkeyup = function(e) {
			if (null == e) {
				e = window.event
			}
			if (13 == e.keyCode) {
				time_radio_ok_click(id)
			} else {
				if (!key_find) {
					var c = this.value;
					this.value = "";
					if (!isNaN(c)) {
						if (500 > new Date().getTime() - key_time) {
							if (24 >= parseInt(key_num + "" + c)) {
								setTime(key_num + "" + c + ":00", true);
								return
							}
						}
						key_num = c;
						key_time = new Date().getTime();
						setTime(c + ":00", true)
					}
				}
			}
		};
		z$(id + "_key_listener").onkeydown = function(e) {
			key_find = false;
			if (null == e) {
				e = window.event
			}
			if (39 != e.keyCode && 68 != e.keyCode && 37 != e.keyCode && 65 != e.keyCode && 38 != e.keyCode && 87 != e.keyCode && 40 != e.keyCode && 83 != e.keyCode) {
				if (13 != e.keyCode) {
					var c = String.fromCharCode(e.keyCode);
					if (!isNaN(c)) {
						if (500 > new Date().getTime() - key_time) {
							if (24 >= parseInt(key_num + "" + c)) {
								setTime(key_num + "" + c + ":00", true);
								key_find = true;
								return
							}
						}
						key_num = c;
						key_time = new Date().getTime();
						setTime(c + ":00", true);
						key_find = true
					}
				}
				return
			}
			time_radio_global_val[id].mousemove = false;
			try {
				if (null == time_radio_global_val[id].curr_o) {
					time_radio_global_val[id].curr_o = child_nodes[0].getElementsByTagName("td")[0];
					time_radio_global_val[id].curr_i = 0;
					time_radio_global_val[id].curr_num = 0
				}
				var arr = child_nodes[time_radio_global_val[id].curr_num].getElementsByTagName("td");
				for (var i = arr.length - 1; i >= 0; i--) {
					if (arr[i] == time_radio_global_val[id].curr_o) {
						var addNum = 0;
						if (39 == e.keyCode || 68 == e.keyCode) {
							addNum = 1;
							if (time_radio_global_val[id].curr_i % 2) {
								addNum = 2
							}
						} else {
							if (37 == e.keyCode || 65 == e.keyCode) {
								addNum = -1;
								if (!(time_radio_global_val[id].curr_i % 2)) {
									addNum = -2
								}
							} else {
								if (38 == e.keyCode || 87 == e.keyCode) {
									time_radio_global_val[id].curr_num--;
									if (0 > time_radio_global_val[id].curr_num) {
										time_radio_global_val[id].curr_num = 3
									}
									arr = child_nodes[time_radio_global_val[id].curr_num].getElementsByTagName("td")
								} else {
									if (40 == e.keyCode || 83 == e.keyCode) {
										time_radio_global_val[id].curr_num++;
										if (3 < time_radio_global_val[id].curr_num) {
											time_radio_global_val[id].curr_num = 0
										}
										arr = child_nodes[time_radio_global_val[id].curr_num].getElementsByTagName("td")
									}
								}
							}
						}
						var to_num = i + addNum;
						if (to_num >= arr.length) {
							to_num = 0;
							time_radio_global_val[id].curr_num++;
							if (3 < time_radio_global_val[id].curr_num) {
								time_radio_global_val[id].curr_num = 0
							}
							arr = child_nodes[time_radio_global_val[id].curr_num].getElementsByTagName("td")
						} else {
							if (to_num < 0) {
								time_radio_global_val[id].curr_num--;
								if (0 > time_radio_global_val[id].curr_num) {
									time_radio_global_val[id].curr_num = 3
								}
								arr = child_nodes[time_radio_global_val[id].curr_num].getElementsByTagName("td");
								to_num = arr.length - 1
							}
						}
						time_radio_move_to(id, arr[to_num].getAttribute("type_i"), arr[to_num], arr[to_num].getAttribute("num"));
						key_find = true;
						break
					}
				}
			} catch (err) {
				alert(err)
			}
		};
		var time_out;
		z$(id + "_radio_listener").onmouseout = function(a) {
			time_out = setTimeout(outFunction, 100)
		};
		z$(id + "_radio_listener").onmouseover = function(a) {
			clearTimeout(time_out)
		};

		function outFunction() {
			if ("" == z$(id + "_radio_ok_time").style.display) {
				setTime(z$(id + "_radio_ok_time").innerHTML, true)
			}
		}
		z$(id + "_radio_listener").onmousemove = function(a) {
			try {
				time_radio_global_val[id].mousemove = true
			} catch (err) {}
		};
		z$(id + "_radio_listener").onmouseup = function() {
			time_radio_ok_click(id)
		};
		time_radio.prototype.focus = function() {
			z$(id + "_key_listener").focus()
		};
		time_radio.prototype.setTime = function(time, isMoveOnly) {
			setTime(time, isMoveOnly)
		};

		function setTime(time, isMoveOnly) {
			try {
				var time_arr = time.split(":");
				var num = Math.floor(time_arr[0] / 6);
				var arr = child_nodes[num].getElementsByTagName("td");
				var to_num = ((time_arr[0] - (num * 6)) * 12) + (Math.floor(time_arr[1] / 10) * 2);
				time_radio_move_to(id, arr[to_num].getAttribute("type_i"), arr[to_num], arr[to_num].getAttribute("num"));
				if (!isMoveOnly) {
					time_radio_ok_click(id)
				}
			} catch (err) {}
		}
	}

	function zring_get_obj_xy(o) {
		var x = y = 0;
		while ("body" != o.nodeName.toLowerCase()) {
			x += o.offsetLeft;
			y += o.offsetTop;
			o = o.parentNode
		}
		return {
			x: x,
			y: y
		}
	}

	function zring_getBody() {
		if (document.compatMode == "CSS1Compat") {
			return document.documentElement
		} else {
			return document.body
		}
	}

	function getOffset(evt) {
		var target = evt.target;
		if (target.offsetLeft == undefined) {
			target = target.parentNode
		}
		var pageCoord = getPageCoord(target);
		var eventCoord = {
			x: window.pageXOffset + evt.clientX,
			y: window.pageYOffset + evt.clientY
		};
		var offset = {
			offsetX: eventCoord.x - pageCoord.x,
			offsetY: eventCoord.y - pageCoord.y
		};
		return offset
	}

	function getPageCoord(element) {
		var coord = {
			x: 0,
			y: 0
		};
		while (element) {
			coord.x += element.offsetLeft;
			coord.y += element.offsetTop;
			element = element.offsetParent
		}
		return coord
	}

	function time_radio_hs_keyup(e, id) {
		if (13 == e.keyCode) {
			time_radio_ok_click(id)
		} else {
			if (67 == e.keyCode) {
				time_radio_hidden_mask(id)
			}
		}
	}

	function time_radio_ok_click(id) {
		z$(id + "_radio_ok_time").style.display = "";
		z$(id + "_radio_ok_time").innerHTML = z$(id + "_radio_time").innerHTML;
		z$(id + "_radio_ok_time").parentNode.style.left = (z$(id + "_radio_hand").parentNode.offsetLeft - z$(id + "_radio_ok_time").offsetWidth / 2) + "px";
		z$(id + "_radio_ok_time").parentNode.style.top = (z$(id + "_radio_time").parentNode.offsetTop - 33) + "px";
		z$(id + "_radio_ok_heand").parentNode.style.display = "";
		z$(id + "_radio_ok_heand").parentNode.style.left = z$(id + "_radio_hand").parentNode.offsetLeft + "px";
		z$(id + "_radio_ok_heand").parentNode.style.top = (z$(id + "_radio_ok_time").parentNode.offsetTop + z$(id + "_radio_ok_time").offsetHeight) + "px";
		if (null != time_radio_global_val[id].ok_fun) {
			try {
				time_radio_global_val[id].ok_fun(z$(id + "_radio_time").innerHTML)
			} catch (err) {}
		}
	}

	function time_radio_key_down(e, type, o) {
		if (9 == e.keyCode || 8 == e.keyCode || 46 == e.keyCode || 39 == e.keyCode || 37 == e.keyCode) {
			return true
		}
		if (38 == e.keyCode || 87 == e.keyCode || 40 == e.keyCode || 83 == e.keyCode) {
			if (0 == type) {
				if (38 == e.keyCode || 87 == e.keyCode) {
					var val = parseInt(o.value) + 1;
					if (val > 24) {
						val = 0
					}
					o.value = val
				} else {
					var val = parseInt(o.value) - 1;
					if (val < 0) {
						val = 24
					}
					o.value = val
				}
			} else {
				if (38 == e.keyCode || 87 == e.keyCode) {
					var val = parseInt(o.value) + 1;
					if (val > 60) {
						val = 0
					}
					o.value = val
				} else {
					var val = parseInt(o.value) - 1;
					if (val < 0) {
						val = 60
					}
					o.value = val
				}
			}
		}
	}

	function time_radio_format_hour(o) {
		if (isNaN(o.value) || "" == o.value) {
			o.value = "0"
		} else {
			if (24 < parseInt(o.value)) {
				o.value = "0"
			}
		}
	}

	function time_radio_format_second(o) {
		if (isNaN(o.value) || "" == o.value) {
			o.value = "00"
		} else {
			var i = parseInt(o.value);
			if (60 < i) {
				o.value = "00"
			} else {
				if (i < 10) {
					o.value = "0" + i
				} else {
					o.value = i
				}
			}
		}
	}

	function time_radio_init_td_listener(tds, id) {
		for (var i = tds.length - 1; i >= 0; i--) {
			tds[i].onmouseover = function() {
				z$(id + "_key_listener").focus();
				if (time_radio_global_val[id].mousemove) {
					time_radio_move_to(id, this.getAttribute("type_i"), this, this.getAttribute("num"))
				}
			}
		}
	}

	function time_radio_init_tds(tds, o, endNum, id, i) {
		var col_num = "#6598CD";
		endNum--;
		for (var i = tds.length - 1; i >= 0; i--) {
			if (!(i % 2) && !(i % 12) && 0 != i && tds.length - 1 != i) {
				var div = document.createElement("div");
				div.innerHTML = (endNum--);
				with(div.style) {
					position = "absolute";
					left = tds[i].offsetLeft + "px";
					top = "0px";
					fontSize = "9pt";
					color = col_num;
					cursor = "default"
				}
				o.appendChild(div)
			}
		}
	}

	function time_radio_move_to(id, type_i, o, num) {
		var obj = z$(id + "_radio_hand").parentNode;
		var obj2 = z$(id + "_radio_time").parentNode;
		var l = !(type_i % 2) ? o.offsetLeft + 20 : o.offsetLeft + o.offsetWidth + 19;
		obj.style.left = l + "px";
		obj2.style.left = (l - 23) + "px";
		obj.style.top = (num * 25) + 10 + "px";
		obj2.style.top = ((num * 25) + 30) + "px";
		time_radio_global_val[id].hour = num * 6;
		time_radio_global_val[id].curr_o = o;
		time_radio_global_val[id].curr_i = type_i;
		time_radio_global_val[id].curr_num = num;
		time_radio_get_time(id, type_i)
	}
	var time_radio_global_val = {};

	function time_radio_get_time(id, num) {
		var g_h = time_radio_global_val[id].hour;
		minute = Math.ceil(num / 2) * 10;
		second = minute % 60;
		second_str = second < 10 ? "0" + second : second;
		var hour = Math.floor(g_h + minute / 60);
		if (10 > hour) {
			hour = "0" + hour
		}
		z$(id + "_radio_time").innerHTML = hour + ":" + second_str
	}

	function init(id, width, fn) {
		var tr = new time_radio(id, width, fn);
		tr.focus();
		return tr
	}
	NS_timeRadio = {
		init: init,
		setPath: function(url) {
			time_radio_url_path = url
		}
	}
})();
jQuery.cookie = function(name, value, options) {
	if (typeof value != "undefined") {
		options = options || {};
		if (value === null) {
			value = "";
			options.expires = -1
		}
		var expires = "";
		if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == "number") {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
			} else {
				date = options.expires
			}
			expires = "; expires=" + date.toUTCString()
		}
		var path = options.path ? "; path=" + options.path : "";
		var domain = options.domain ? "; domain=" + options.domain : "";
		var secure = options.secure ? "; secure" : "";
		document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + "=")) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break
				}
			}
		}
		return cookieValue
	}
};
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nfeedback = i18n.feedback;
	var ResultCodeSuccess = L.RESULT_CODE.success;
	var timePool = null,
		oldTime = "",
		htimePool = null,
		qita = 1,
		jubaoTime1 = null;
	chouti = {
		Init: function() {
			NS_publish_dialog.init();
			chouti.showLoginDialog();
			chouti.showQuanZhang();
			chouti.addTopTips();
			chouti.showSearchBox();
			chouti.playVido();
			chouti.initTopNews();
			chouti.initImgClickEvent();
			if ($.browser.msie && $.browser.version == "6.0") {
				$("a.discus-a b, a.user-a b, span.time-into a, a.collect-a b").hover(function() {
					$(this).css({
						"text-decoration": "underline",
						color: "#336699"
					})
				}, function() {
					$(this).css({
						"text-decoration": "none",
						color: "#99AECB"
					})
				});
				$("a.discus-a, a.user-a, a.collect-a").hover(function() {
					$(this).children("b").css({
						"text-decoration": "underline",
						color: "#336699"
					})
				}, function() {
					$(this).children("b").css({
						"text-decoration": "none",
						color: "#99AECB"
					})
				})
			}
			$("a.digg-a").hover(function() {
				$(this).attr("title", "推荐")
			}, function() {
				$(this).attr("title", "")
			});
			$("a.discus-a").hover(function() {
				$(this).attr("title", "评论")
			}, function() {
				$(this).attr("title", "")
			});
			$("a.isVoted").hover(function() {
				$(this).attr("title", "取消推荐")
			}, function() {
				$(this).attr("title", "")
			});
			$(window).resize(function() {
				var mainContent = $(".main-content");
				if (mainContent.length <= 0) {
					return
				}
				var left = parseInt(mainContent.outerWidth() + mainContent.offset().left + 20);
				var left2 = $("html").width();
				if (left2 < 1024) {
					left = left2 - 300
				}
				$("#gotop").css("left", left + "px")
			})
		},
		initTopNews: function() {
			var $titleNews = $("#top-title-news");
			var $titleComments = $("#top-title-comments");
			var $contentNews = $("#top-content-news");
			var $contentCommnets = $("#top-content-comments");
			$contentCommnets.hide();
			var $topArrow = $("#top-bandArrow");
			$("#top-title-news").hover(function() {
				$titleNews.removeClass("top-band-title-default").addClass("top-band-title-select");
				$titleComments.removeClass("top-band-title-select").addClass("top-band-title-default");
				$contentNews.show();
				$contentCommnets.hide();
				$topArrow.css("left", "70px");
				chouti.fixedAdvert()
			});
			$titleComments.hover(function() {
				$titleComments.removeClass("top-band-title-default").addClass("top-band-title-select");
				$titleNews.removeClass("top-band-title-select").addClass("top-band-title-default");
				$contentCommnets.show();
				$contentNews.hide();
				$topArrow.css("left", "220px");
				chouti.fixedAdvert()
			});
			chouti.oprateDigg()
		},
		oprateDigg: function() {
			$("a.ding, a.cai").click(function() {
				var $this = $(this);
				if ($this.attr("class").indexOf("ding") >= 0) {
					var vote = 1
				} else {
					var vote = -1
				}
				//var linkId = $this.attr("linkid");
				var linkId = $this.attr("lang");
				//var jid = $this.attr("jid");
				var jid = $(".collect-a").attr("destjid");
				//var id = $this.attr("lang");
				
				var id = $this.siblings().filter("input:hidden").val()
				
				var submitUrl = "http://dig.chouti.com/comments/vote";
				var options = {
					url: submitUrl,
					type: "POST",
					data: G.param({
						linkId: linkId,
						id: id,
						jid: jid,
						vote: vote
					}),
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							if (vote == 1) {
								$($this).html("已顶[" + info.data + "]");
								$($this).removeClass("top-comm-operate-pre").addClass("top-comm-operate-after");
								$($this).siblings(".hot-comment-cai").removeClass("top-comm-operate-pre").addClass("top-comm-operate-after");
								$($this).unbind("click");
								$($this).siblings(".hot-comment-cai").unbind("click")
							} else {
								$($this).html("已踩[" + info.data + "]");
								$($this).removeClass("top-comm-operate-pre").addClass("top-comm-operate-after");
								$($this).siblings(".hot-comment-ding").removeClass("top-comm-operate-pre").addClass("top-comm-operate-after");
								$($this).unbind("click");
								$($this).siblings(".hot-comment-ding").unbind("click")
							}
							chouti.executeBeforOprate(true)
						} else {
							if (!chouti.reponseNoLogin(info.code, info.message, "投票成功")) {
								return false
							}
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							return
						}
					}
				};
				$("#isAjax").data("ajax", options);
				L.ajax(options)
			})
		},
		showHomePageNotice: function() {
			$("#btnNotShw").click(function() {
				var $noticeBox = $("#user_notice_page");
				if ($noticeBox.css("display") == "block") {
					$noticeBox.hide();
					return
				}
				if ($(this).find("em").html() == "") {
					location.href = "/message/1"
				}
				var left = $("#btnNotShw").offset().left - 195;
				$noticeBox.css("left", left + "px").show();
				$("#userOprBox").hide();
				var submitUrl = "/message/topShow";
				L.ajax({
					url: submitUrl,
					type: "GET",
					dataType: "json",
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							if (info.data.items <= 0) {
								location.href = "/message/1";
								return
							}
							var source = $("#homeNotice-template").html();
							var template = Handlebars.compile(source);
							var html = template(info.data);
							$("#notice_box").html(html);
							chouti.chgNoticeTag();
							$(".f-close").click(function(e) {
								var ids = $(this).attr("lang");
								chouti.setNoticeRead(ids, "", left)
							});
							$(".f-list .f-t .f-href").click(function() {
								var ids = $(this).parent().attr("lang");
								chouti.setNoticeRead(ids, "", left)
							});
							$("#btnReadAll").click(function() {
								chouti.setNoticeRead("", "all", left)
							});
							$(".f-list .f-t .f-href, .f-list .f-t .a-jid").click(function() {
								$noticeBox.hide()
							});
							chouti.homePageNotice();
							chouti.listerDocu("#user_notice_page", "btnNotShw", "notice-num-title")
						}
					}
				})
			})
		},
		chatMskIframe: function($isow, wih, left) {
			if ($isow == "hide") {
				$(wih).hide();
				$("#maskIframe").hide()
			} else {
				$(wih).show();
				chouti.changeMskIframeHe(wih, left)
			}
		},
		changeMskIframeHe: function(wih, left) {
			var h = $(wih).height();
			var w = $(wih).width();
			if (wih == "#userOprBox") {
				h = h + 2;
				w = w + 2
			}
			$("#maskIframe").css({
				display: "block",
				width: w + "px",
				height: h + "px",
				left: left + "px"
			})
		},
		listerDocu: function(bigBox, clickObj, clickObj2, left) {
			$(document).unbind().click(function(event) {
				var $noticeBox = $(bigBox);
				var e = event || window.event;
				var elem = e.srcElement || e.target;
				if (elem && elem.id && elem.id != clickObj) {
					if ($noticeBox.find("#" + elem.id).length > 0) {
						$noticeBox.show();
						return
					}
				}
				if (elem.id != clickObj && elem.id != "notice-em") {
					$noticeBox.hide()
				}
			})
		},
		chgNoticeTag: function() {
			$("#user_notice_page .f-list").each(function() {
				var $this = $(this);
				var tag = $this.attr("messageid");
				var id = $this.attr("id");
				if (tag == 2 || tag == 3) {
					switch (tag) {
						case "2":
							$this.find("#bs_" + id).removeClass("f-bs-s").addClass("f-bs-p");
							break;
						case "3":
							$this.find("#bs_" + id).removeClass("f-bs-s").addClass("f-bs-h");
							break
					}
				}
			})
		},
		setNoticeRead: function(ids, bs, left) {
			if (bs == "") {
				var submitUrl = "/message/read?" + G.param({
					id: ids
				})
			} else {
				var submitUrl = "/message/read?" + G.param({
					isAll: true
				})
			}
			L.ajax({
				url: submitUrl,
				type: "POST",
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						var num = info.data;
						chouti.chgNoticeNum(num);
						if (bs == "") {
							$("#" + ids).remove()
						} else {
							$("#user_notice_page").hide()
						}
					} else {
						L.showTopTips(L.TIPS_TYPE.error, info.message);
						return
					}
				}
			})
		},
		homePageNotice: function() {
			$("#user_notice_page .f-list").hover(function() {
				$(this).find(".f-close").show()
			}, function() {
				$(this).find(".f-close").hide()
			})
		},
		chgNoticeNum: function(newsCount) {
			var $notice = $("#notice-num-title");
			if (newsCount < 0) {
				return
			}
			if (newsCount == 0) {
				$notice.hide().children("em").text("");
				return
			}
			if (newsCount > 99) {
				$notice.css("display", "inline-block").children("em").text("99");
				$notice.children("i").css("display", "inline-block");
				return
			}
			$notice.css("display", "inline-block").children("em").text(newsCount);
			$notice.children("i").hide()
		},
		chgMailNum: function(chgNoticeNums) {
			var $notice = $("#mail-num-title");
			if (chgNoticeNums < 0) {
				return
			}
			if (chgNoticeNums == 0) {
				$notice.hide().children("em").text("");
				return
			}
			if (chgNoticeNums > 99) {
				$notice.css("display", "inline-block").children("em").text("99");
				$notice.children("i").css("display", "inline-block");
				return
			}
			$notice.css("display", "inline-block").children("em").text(chgNoticeNums);
			$notice.children("i").hide()
		},
		countNumShare: function(linksId, siteId, state) {
			var submitUrl = "/share/site/stat?" + G.param({
				linksId: linksId,
				siteId: siteId,
				state: state
			});
			L.ajax({
				url: submitUrl,
				type: "POST",
				success: function(info) {
					if (info.code == ResultCodeSuccess) {}
				}
			})
		},
		attention: function(ifshow) {
			if (ifshow) {
				var mainContent = $(".main-content");
				if (mainContent.length <= 0) {
					return
				}
				var left = parseInt(mainContent.outerWidth() + mainContent.offset().left);
				$("#attention-area").css("left", (left + 1) + "px").show()
			} else {
				$("#attention-area").css("z-index", "-1")
			}
		},
		returnShareVal: function($shaIco) {
			var $parNode = $shaIco.parent().parent().parent(".part2");
			var title = $parNode.attr("share-title");
			var linksId = $parNode.attr("share-linkid");
			var url = "http://" + window.location.host + "/link/" + linksId;
			var pic = $parNode.attr("share-pic");
			var summary = $parNode.attr("share-summary");
			var subject = $parNode.attr("share-subject");
			if (pic == "" || pic == undefined) {
				pic = ""
			}
			var tempArr = [];
			tempArr[0] = title;
			tempArr[1] = url;
			tempArr[2] = pic;
			tempArr[3] = summary;
			tempArr[4] = linksId;
			tempArr[5] = subject;
			return tempArr
		},
		shareToSina: function(title, url, pic) {
			var param = {
				url: url,
				appkey: "579273896",
				title: title,
				pic: pic.replace("=C60x60", ""),
				ralateUid: "1821459487",
				searchPic: "false"
			};
			var temp = [];
			for (var p in param) {
				temp.push(p + "=" + encodeURIComponent(param[p] || ""))
			}
			var _u = "http://service.weibo.com/share/share.php?" + temp.join("&");
			window.open(_u, "", "width=700, height=480, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
		},
		shareToDouban: function(title, url, pic, text) {
			var d = document,
				e = encodeURIComponent,
				s1 = window.getSelection,
				s2 = d.getSelection,
				s3 = d.selection,
				s = s1 ? s1() : s2 ? s2() : s3 ? s3.createRange().text : "",
				r = "http://www.douban.com/recommend/?url=" + e(url) + "&title=" + e(title) + "&image=" + e(pic.replace("=C60x60", "")) + "&text=" + e(text) + "&sel=" + e(s) + "&v=1",
				x = function() {
					if (!window.open(r, "douban", "toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330")) {
						location.href = r + "&r=1"
					}
				};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(x, 0)
			} else {
				x()
			}
		},
		shareToqqzone: function(title, url, pic, summary) {
			var p = {
				url: url,
				desc: "",
				summary: summary,
				title: title,
				site: "抽屉新热榜",
				pics: pic.replace("=C60x60", "")
			};
			var s = [];
			for (var i in p) {
				s.push(i + "=" + encodeURIComponent(p[i] || ""))
			}
			var _u = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join("&");
			window.open(_u, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
		},
		shareToTenxun: function(title, url, pic) {
			var _url = encodeURIComponent(url) + " (分享自@choutixinrebang)";
			var _pic = encodeURI(pic.replace("=C60x60", ""));
			var _t = title;
			var metainfo = document.getElementsByTagName("meta");
			if (_t.length > 120) {
				_t = _t.substr(0, 117) + "..."
			}
			_t = encodeURI(_t);
			var _u = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + _url + "&appkey=801059706&pic=" + _pic + "&assname=抽屉新热榜&title=" + _t;
			window.open(_u, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
		},
		shareToRenren: function(title, url, pic, summary) {
			var rrShareParam = {
				resourceUrl: url,
				pic: pic.replace("=C60x60", ""),
				title: title,
				description: summary
			};
			rrShareOnclick(rrShareParam)
		},
		shareToMail: function(content, url, $this) {
			if ($("#MailShare-dialog").length <= 0) {
				$("#footer-band").append($("#sendMail-model").html())
			}
			chouti.showMask("#MailShare-dialog", "top");
			var offsetH = $this.offset().top - $("#MailShare-dialog").height() / 2 + 30;
			if (offsetH <= 0) {
				offsetH = 30
			}
			$("#mask").show();
			$("#MailShare-dialog").show().css("top", offsetH + "px");
			$("#chatIframe").css({
				height: "0px",
				width: "0px"
			});
			chouti.initMailDialog(content, url);
			chouti.sendMail(content, url)
		},
		bindShareWeibo: function(w) {
			var $sharePra = $(".part2 .share-site-to .share-icon");
			$sharePra.find(".icon-sina").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this), w);
				var title = returnValue[0];
				var url = returnValue[1];
				var pic = returnValue[2];
				var summary = returnValue[3];
				var linksId = returnValue[4];
				chouti.shareToSina(title, url, pic, summary);
				chouti.countNumShare(linksId, 1, 1)
			});
			$sharePra.find(".icon-douban").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this));
				var title = returnValue[0];
				var url = returnValue[1];
				var pic = returnValue[2];
				var summary = returnValue[3];
				var linksId = returnValue[4];
				chouti.shareToDouban(title, url, pic, summary);
				chouti.countNumShare(linksId, 2, 1)
			});
			$sharePra.find(".icon-qqzone").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this));
				var title = returnValue[0];
				var url = returnValue[1];
				var pic = returnValue[2];
				var summary = returnValue[3];
				var linksId = returnValue[4];
				chouti.shareToqqzone(title, url, pic, summary);
				chouti.countNumShare(linksId, 3, 1)
			});
			$sharePra.find(".icon-tenxun").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this));
				var title = returnValue[0];
				var url = returnValue[1];
				var pic = returnValue[2];
				var summary = returnValue[3];
				var linksId = returnValue[4];
				chouti.shareToTenxun(title, url, pic, summary);
				chouti.countNumShare(linksId, 4, 1)
			});
			$sharePra.find(".icon-renren").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this));
				var title = returnValue[0];
				var url = returnValue[1];
				var pic = returnValue[2];
				var summary = returnValue[3];
				var linksId = returnValue[4];
				chouti.shareToRenren(title, url, pic, summary);
				chouti.countNumShare(linksId, 5, 1)
			});
			$sharePra.find(".icon-mail").die().live("click", function() {
				var returnValue = chouti.returnShareVal($(this));
				var content = returnValue[0] + " （分享自 @抽屉新热榜）";
				var url = returnValue[1];
				var linksId = returnValue[4];
				var subject = returnValue[5];
				if (subject == "段子") {
					content = "【段子】" + content
				}
				chouti.shareToMail(content, url, $(this));
				chouti.countNumShare(linksId, 6, 1)
			})
		},
		initMailDialog: function(content, url) {
			$("#receiveName").val("");
			$("#mailTitle").val("");
			$("#MailErrDesc").html("");
			$("#mailContent").val(content + "\n" + url);
			$("#sendMailBtn").addClass("new-pub-btn-unvalid").removeClass("new-pub-btn-valid");
			$("#MailShare-dialog :text, #MailShare-dialog textarea").focus(function() {
				$(this).css("border", "1px solid #88afd5")
			}).blur(function() {
				$(this).css("border", "1px solid #bdc9d2")
			});
			$("#receiveName").focus();
			$.extend({
				inputMail: function(objs, fun) {
					var element = document.getElementById(objs);
					if (element != null) {
						if ("\v" == "v") {
							element.attachEvent("onpropertychange", fun)
						} else {
							element.addEventListener("input", fun, false)
						}
					}
				}
			});
			$.inputMail("receiveName", function() {
				chouti.listenMailTxt("receiveName", "mailTitle")
			});
			$.inputMail("mailTitle", function() {
				chouti.listenMailTxt("mailTitle", "receiveName")
			});
			$("#dialog-mail-close, #clear-btn-mail").click(function() {
				$("#MailShare-dialog").hide();
				$("#mask").hide().remove();
				$("#chatIframe").css({
					height: "475px",
					width: "300px"
				})
			})
		},
		listenMailTxt: function(bj1, bj2) {
			var duanzi = $("#" + bj1).val();
			var duanzi2 = $.trim($("#" + bj2).val());
			if ($.trim(duanzi) == "") {
				$("#sendMailBtn").addClass("new-pub-btn-unvalid").removeClass("new-pub-btn-valid");
				return
			} else {
				if (duanzi2 != "") {
					$("#sendMailBtn").addClass("new-pub-btn-valid").removeClass("new-pub-btn-unvalid")
				}
			}
		},
		sendMail: function(nr, url) {
			$("#sendMailBtn").unbind().click(function() {
				var txtRecer = $.trim($("#receiveName").val());
				var txtTitle = $.trim($("#mailTitle").val());
				if ((txtRecer == "" || txtTitle == "") && $("#sendMailBtn").hasClass("new-pub-btn-unvalid")) {
					return
				}
				if (!gozapCommon.isEmail(txtRecer)) {
					$("#MailErrDesc").html("邮箱格式不合法，请重新输入").show();
					return
				}
				$("#sendMailBtn").hide();
				$("#mailSend-loading").css("display", "inline-block");
				var content = $("#mailContent").val();
				var submitUrl = "/share/mail";
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: {
						receiver: txtRecer,
						subject: txtTitle,
						content: nr,
						url: url
					},
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							L.showTopTips(L.TIPS_TYPE.success, info.message);
							$("#sendMailBtn").show().addClass("new-pub-btn-unvalid").removeClass("new-pub-btn-valid");
							$("#mailSend-loading").css("display", "none");
							$("#dialog-mail-close").click();
							return
						} else {
							var errMsg = info.message;
							$("#MailErrDesc").html(errMsg).show();
							$("#sendMailBtn").show();
							$("#mailSend-loading").css("display", "none");
							ispublishing = false;
							return
						}
					}
				})
			})
		},
		shareweibo: function(w) {
			chouti.bindShareWeibo(w);
			var shareInfo = "<span class='share-site-to' style='visibility:visible'><i>分享到</i><span class='share-icon'><a class='icon-sina' id='icon-sina' title='分享到新浪微博' href='javascript:;' hidefocus='true'></a><a class='icon-douban' id='icon-douban' title='分享到豆瓣' href='javascript:;' hidefocus='true'></a><a class='icon-qqzone' id='icon-qqzone' title='分享到QQ空间' href='javascript:;' hidefocus='true'></a><a class='icon-tenxun' id='icon-tenxun' title='分享到腾讯微博' href='javascript:;' hidefocus='true'></a><a class='icon-renren' id='icon-renren' title='分享到人人网' href='javascript:;' hidefocus='true'></a><a class='share-none'> </a></span></span>";
			if (!chouti.checkserAgent()) {
				$("#content-list .item").hover(function(e) {
					if ($(this).find(".show-content-grey, .show-content").length > 0) {
						var $part2 = $(this).find(".part2");
						var $share = $part2.find(".share-site-to");
						if ($share.length <= 0) {
							$part2.append(shareInfo)
						}
						$share.css({
							visibility: "visible"
						})
					}
				}, function() {
					$(this).find(".share-site-to").css("visibility", "hidden")
				})
			} else {
				$("#content-list .item").each(function() {
					$(this).find(".part2").append(shareInfo)
				})
			}
		},
		showItemDomain: function() {
			$("#content-list .item").hover(function() {
				$(this).find("span.content-source").show()
			}, function() {
				$(this).find("span.content-source").hide()
			})
		},
		addTopTips: function() {
			var toast = "<div id='tips_top_container' style='display: none;'>";
			toast += "<div class='inline-block tips-top'>";
			toast += "<span class='tips-top-text' style='margin: 0pt 30px 0pt 10px;'></span>";
			toast += "<a class='icon-common icon-close-success' href='javascript:;' style='display: block;'></a>";
			toast += "</div></div>";
			$("body").append(toast);
			$(".icon-close-success").click(function() {
				$("#tips_top_container").hide()
			})
		},
		showStreamNotice: function() {
			var submitUrl = "/message/unread/count";
			L.ajax({
				url: submitUrl,
				type: "GET",
				cache: false,
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						chouti.showNoticeCount(parseInt(info.data), $("#notice-num-title"))
					}
				}
			})
		},
		showStreamMail: function() {
			var submitUrl = "/letter/noread/count.do";
			L.ajax({
				url: submitUrl,
				type: "GET",
				cache: false,
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						chouti.showNoticeCount(parseInt(info.data), $("#mail-num-title"))
					}
				}
			})
		},
		getNewIntoHot: function(re, thg) {
			var submitUrl = "/comet/channel/" + re;
			L.ajax({
				url: submitUrl,
				type: "GET",
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						$(thg).attr("src", info.data)
					} else {
						return
					}
				}
			})
		},
		showNoticeCount: function(str, $numTitle) {
			if (typeof(str) == "number") {
				var num = str;
				var numStr = num;
				if (num < 1) {
					numStr = "";
					$numTitle.hide();
					return
				} else {
					$numTitle.css("display", "inline-block")
				} if (num > 99) {
					var numStr = "99";
					$numTitle.children("i").css("display", "inline-block")
				}
				$numTitle.children("em").text(numStr)
			}
		},
		showQuanZhang: function() {
			$("#quan_li").hover(function() {
				if ($(this).children("span.quan-noli").length <= 0) {
					$("#quan_li_big").show()
				}
			}, function() {
				$("#quan_li_big").hide()
			})
		},
		logout: function() {
			$(".logout").click(function() {
				var submitUrl = "/logout";
				L.ajax({
					url: submitUrl,
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							var her = window.location.href;
							if (her.indexOf("user/link/saved") > 0) {
								var name = $("#i_jid").text();
								window.location.href = "/user/" + name + "/submitted/1"
							}
							if (her.indexOf("/letter") > 0) {
								window.location.href = "/"
							} else {
								window.location.reload()
							}
						}
					}
				})
			})
		},
		tabsNavPage: function() {
			$("#tabs-nav .tb").click(function() {
				window.location.href = $(this).children("a").attr("href")
			});
			$("#person-tabs-nav .tb").click(function() {
				window.location.href = $(this).children("a").attr("href")
			})
		},
		showMask: function(dialogObj, ju) {
			var bodyHeight = $("body").height();
			var bodyWidth = $("body").width();
			var left = parseInt(bodyWidth / 2) - parseInt($(dialogObj).width() / 2);
			var clientH = document.documentElement.clientHeight || document.body.clientHeight;
			var top = parseInt(clientH / 2) - parseInt($(dialogObj).height() / 2) + parseInt($(window).scrollTop());
			if (ju == "") {
				$(dialogObj).css({
					left: left,
					top: top
				})
			} else {
				$(dialogObj).css({
					left: left
				})
			}
			bodyHeight = parseInt($("body").height());
			clientH = parseInt(clientH);
			bodyHeight = bodyHeight > clientH ? bodyHeight : clientH;
			mask = "<div class='op mask' id='mask' style='width: " + bodyWidth + "px; height: " + bodyHeight + "px;filter: alpha(opacity=50)'></div>";
			$("body").append(mask)
		},
		showUploadImgDialog: function() {
			$("#modifyPersonPhoto").click(function() {
				chouti.showMask("#H-avaupload-dialog", "");
				$("#mask").show();
				$("#H-avaupload-dialog").show()
			})
		},
		hidPublishWindow: function() {
			$("#publishBtn").hide()
		},
		clearTimeInterval: function() {
			window.clearInterval(timePool);
			window.clearInterval(htimePool)
		},
		timeChange: function() {
			timePool = window.setInterval(function() {
				$("#content-list .item").each(function() {
					var actionTime = $(this).find(".timeIntoPool").html();
					var datas = $(this).data("nowTotalTime");
					if (datas == undefined || datas == null) {
						var nowTotalTime = actionTime.substring(actionTime.indexOf(",") + 1);
						nowTotalTime = parseFloat(nowTotalTime / 1000) + 60 * 1000 + 60 * 1000;
						$(this).data("nowTotalTime", nowTotalTime + 60 * 1000)
					} else {
						var nowTotalTime = parseFloat($(this).data("nowTotalTime"));
						$(this).data("nowTotalTime", nowTotalTime + 60 * 1000)
					}
					oldTime = actionTime.substring(0, actionTime.indexOf(","));
					oldTime = parseFloat(oldTime / 1000) + 60 * 1000;
					var timePoolStr = chouti.getDifferTime(nowTotalTime, oldTime);
					$(this).children(".news-content").children(".part2").children(".time-into").children(".time-a").children("b").html(timePoolStr)
				})
			}, 60000)
		},
		HttimeChange: function() {
			htimePool = window.setInterval(function() {
				$(".topic-c-box").each(function() {
					var $item = $(this).find(".detail-c").find(".item");
					var actionTime = $item.find(".timeIntoPool").html();
					var datas = $(this).data("nowTotalTime");
					if (datas == undefined || datas == null) {
						var nowTotalTime = actionTime.substring(actionTime.indexOf(",") + 1);
						nowTotalTime = parseFloat(nowTotalTime / 1000) + 60 * 1000 + 60 * 1000;
						$(this).data("nowTotalTime", nowTotalTime + 60 * 1000)
					} else {
						var nowTotalTime = parseFloat($(this).data("nowTotalTime"));
						$(this).data("nowTotalTime", nowTotalTime + 60 * 1000)
					}
					oldTime = actionTime.substring(0, actionTime.indexOf(","));
					oldTime = parseFloat(oldTime / 1000) + 60 * 1000;
					var timePoolStr = chouti.getDifferTime(nowTotalTime, oldTime);
					$(this).children(".time-p").children(".pb").children("i").html(timePoolStr)
				})
			}, 60000)
		},
		getDifferTime: function(nowTotalTime, actionTime) {
			if (actionTime == "") {
				return
			}
			var rate = 1000;
			var oldTotalTime = actionTime;
			if (nowTotalTime - oldTotalTime <= 60 * rate) {
				return "小于1分钟前"
			} else {
				if (nowTotalTime > oldTotalTime && nowTotalTime - oldTotalTime < 60 * 60 * rate) {
					return (parseInt((nowTotalTime - oldTotalTime) / (60 * rate))) + "分钟前"
				} else {
					if (nowTotalTime > oldTotalTime && (nowTotalTime - oldTotalTime) < 60 * 60 * 24 * rate) {
						var h = parseInt((nowTotalTime - oldTotalTime) / (60 * 60 * rate));
						var min = parseInt((nowTotalTime - oldTotalTime - h * 60 * 60 * rate) / (60 * rate));
						if (min < 59) {
							min = min + 1
						}
						return h + "小时" + min + "分钟前"
					} else {
						if (nowTotalTime > oldTotalTime && nowTotalTime - oldTotalTime < 60 * 60 * 24 * 30 * rate) {
							var d = parseInt((nowTotalTime - oldTotalTime) / (60 * 60 * 24 * rate));
							var h = parseInt((nowTotalTime - oldTotalTime - d * 60 * 60 * 24 * rate) / (60 * 60 * rate));
							if (h < 23) {
								h = h + 1
							}
							return d + "天" + h + "小时前"
						} else {}
					}
				}
			}
		},
		showPublishWindow: function(tbid) {
			$("#publishBtn").click(chouti.pubNews)
		},
		pubNews: function(isHt) {
			var submitUrl = "/link/share";
			var options = {
				url: submitUrl,
				type: "POST",
				success: function(info) {
					var code = info.code;
					if (code == ResultCodeSuccess) {
						if ($("#login_ajaxInfo").val() != "publish") {
							$("#chatIframe").css({
								height: "0px",
								width: "0px"
							});
							if ($("#digg-dialog-publish").length <= 0) {
								$("#footer-band").append($("#publish-dialog-code").html());
								NS_publish_dialog.init();
								if (isHt == "huati") {
									chouti.initHtInfo()
								}
								$(".dialog-title").drag()
							}
							NS_publish_dialog.clearAllTextInput();
							chouti.showMask("#digg-dialog-publish", "top");
							$("#mask").show();
							$("#digg-dialog-publish").show().css("top", "130px");
							$("#pubTabZixun").click();
							var leiStyle = $("#publishBtn").attr("lang");
							chouti.showOrHidePubtoBox(leiStyle)
						}
						chouti.executeBeforOprate(false)
					} else {
						if (!chouti.reponseNoLogin(code, info.message, "publish")) {
							return false
						}
						L.showTopTips(L.TIPS_TYPE.error, info.message);
						return
					}
				}
			};
			$("#isAjax").data("ajax", options);
			L.ajax(options)
		},
		showOrHidePubtoBox: function(lei) {
			switch (lei) {
				case "news":
					$("#pubTabDuanzi").hide();
					$("#pubTabPic").hide();
					$("#to-btn-zixun").show().siblings("a").hide();
					break;
				case "scoff":
					$("#pubTabPic").hide();
					$("#to-btn-duanzi").show().click().siblings("a").hide();
					$("#to-btn-duanzi2").show().siblings("a").hide();
					break;
				case "pic":
					$("#pubTabDuanzi").hide();
					$("#to-btn-pic").show().click().siblings("a").hide();
					$("#to-btn-pic2").show().siblings("a").hide();
					break;
				case "tec":
					$("#pubTabDuanzi").hide();
					$("#pubTabPic").hide();
					$("#to-btn-tec").show().click().siblings("a").hide();
					break;
				case "pub":
					$("#pubTabDuanzi").hide();
					$("#to-btn-unfavor").show().click().siblings("a").hide();
					$("#to-btn-unfavor2").show().click().siblings("a").hide();
					break;
				case "ask":
					$("#pubTabZixun").show();
					$("#pubTabDuanzi").show();
					$("#pubTabPic").show();
					$("#to-btn-ask").show().click().siblings("a").hide();
					$("#to-btn-ask2, #to-btn-ask3").show().click().siblings("a").hide();
					break;
				default:
					$("#pubTabZixun").show();
					$("#pubTabDuanzi").show();
					$("#pubTabPic").show()
			}
		},
		initHtInfo: function() {
			var $ht = $("#htPubBtn");
			var topicId = $ht.attr("lang");
			var htTag = $ht.attr("htTag");
			var htTitle = $ht.attr("title");
			$("#shareTitle").html(htTitle);
			$("#hidHtTag").val("huati").attr("topicId", topicId)
		},
		showLoginBox: function(re) {
			$("#chatIframe").css({
				height: "0px",
				width: "0px"
			});
			if ($("#digg-dialog-login").length <= 0) {
				$("#footer-band").append($("#login-dialog-code").html());
				NS_login.init();
				$(".dialog-title").drag()
			}
			chouti.showMask("#digg-dialog-login", "");
			$("#mask").show();
			$("#digg-dialog-login").show();
			if (re == "reg") {
				$("#reg_destJid").focus()
			} else {
				$("#destJid").focus()
			}
		},
		showLoginDialog: function() {
			$("#reg-link-a, #reg-link-a-a").click(function() {
				chouti.showLoginBox("reg")
			});
			$("#login-link-a, #login-link-a-a").click(function() {
				chouti.showLoginBox()
			})
		},
		isVideoUrl: function(url) {
			var videoSiteRegex = "^(http://)(\\S){0,}((v.youku.com)|(player.youku.com)|(static.youku.com)|(tudou.com)|(js.tudouui.com)|(iqiyi.com)|(video.qiyi.com)|(17173.tv.sohu.com)|(tv.sohu.com)|(vrs.sohu.com)|(v.qq.com)|(video.qq.com)|(imgcache.qq.com)|(v.ku6.com)|(player.ku6.com)|(player.ku6cdn.com)|(v.pptv.com)|(player.pptv.com)|(player.pplive.cn)|(video.sina.com.cn)|(56.com)|(v.163.com)|(swf.ws.126.net)|(v.ent.163.com)|(joy.cn)|(letv.com)|(yinyuetai.com)|(vod.kankan.com)|(video.kankan.com)|(kankan.com/vod)|(mv.baidu.com)|(tieba.baidu.com/shipin/bw/video)|(v.pps.tv)|(player.pps.tv)|(v.ifeng.com)|(img.ifeng.com/swf)|(player.cntv.cn)|(xiyou.cntv.cn)|(m1905.com/vod/play)|(m1905.com/video/play)|(jstv.com)|(btv.com.cn/video/VID)|(v.iqilu.com)|(xinhuanet.com[\\S]{0,}video)|(movie.mtime.com)|(v1.cn)|(v.zol.com)|(tv.tom.com[\\S]{1,}video_id=[\\d]{1,})|(tv.tom.com[\\S]{1,}\\.swf[\\S]{1,}video=)|(boosj.com\\/[\\d]{4,})|(static.boosj.com)|(video.baomihua.com)|(acfun.tv/v/ac[\\d]{4,})|(bilibili.smgbb.cn/video/av[\\d]{4,})|(video6.smgbb.cn)|(kugou.com[\\S]{1,}mv_[\\d]{3,})|(weiphone.com[\\S]{1,}weplayer.swf)|(art.china))(\\S){0,}";
			var reg = new RegExp(videoSiteRegex, "g");
			if (url.match(reg) != null) {
				return true
			}
			return false
		},
		playVido: function() {
			$("a.vidio-a").unbind().bind("click", function() {
				var $spaniCon = $(this).find("span");
				var id = $(this).attr("lang");
				var flashUrl = $(this).attr("flashUrl");
				$("#comment-box-area-" + id).hide();
				var $parent = $(this).parent().parent();
				var $videoBox = $("#videoBox" + id);
				if ($videoBox.css("display") == "block") {
					chouti.hidePlayVido(id);
					return
				}
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/iphone/) || ua.match(/ipad/)) {
					if (($("#videoBox" + id).length > 0)) {
						return
					}
					try {
						var loading = "<a class='loading-ico flash-loading' href='javascript:;' id='loadingF" + id + "'></a>";
						$parent.append(loading);
						var xmlhttp = new XMLHttpRequest();
						var url = $parent.find("div").first().find("a").first().attr("href");
						if (!chouti.isVideoUrl(url)) {
							url = flashUrl
						}
						url = "http://" + window.location.host + "/link/videoinfo.do?url=" + encodeURIComponent(url) + "&t=" + Math.random();
						xmlhttp.onreadystatechange = function() {
							if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
								$("#loadingF" + id).remove();
								var json = "";
								var img = "";
								var video = "";
								try {
									json = eval("(" + xmlhttp.responseText + ")");
									video = json.data.videoUrlArray[0];
									img = json.data.imgUrl
								} catch (e) {
									$("#loadingF" + id).remove()
								}
								if (video.length > 0) {
									if (!($("#videoBox" + id).length > 0)) {
										var str = "<div class='video-box' id='videoBox" + id + "'>";
										str += "<video controls='controls' width='450' height='366' >";
										str += "<source src='" + video + "'/>";
										str += "</video>";
										str += "</div>";
										$parent.append(str);
										$("#videoBox" + id).show();
										$spaniCon.removeClass("vidio-s").addClass("vidio-e");
										$("#vidio-a-" + id).attr("title", "收起视频")
									}
								} else {
									alert("此站点不支持ios设备")
								}
							} else {
								if (xmlhttp.status >= 400) {
									$("#loadingF" + id).remove();
									alert("此站点不支持ios设备")
								}
							}
						};
						xmlhttp.open("GET", url, true);
						xmlhttp.send();
						return
					} catch (e) {
						$("#loadingF" + id).remove();
						alert("此站点不支持ios设备")
					}
				} else {
					chouti.requestFlashUrl(id, $parent, $spaniCon, flashUrl)
				}
			})
		},
		hidePlayVido: function(id) {
			var $vidioA = $("#vidio-a-" + id);
			var $spaniCon = $vidioA.find("span");
			$spaniCon.removeClass("vidio-e").addClass("vidio-s");
			$("#videoBox" + id).remove();
			$vidioA.attr("title", "展开视频")
		},
		requestFlashUrl: function(id, $parent, $spaniCon, flashUrl) {
			var str = "<div class='video-box' id='videoBox" + id + "'>";
			str += "<object width='450' height='366' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' name='FlashObj" + id + "' id='FlashObj" + id + "'>";
			str += "<param value='" + flashUrl + "' name='movie'>";
			str += "<param value='high' name='quality'>";
			str += "<param value='always' name='allowscriptaccess'>";
			str += "<param value='Opaque' name='wmode'>";
			str += "<param value='true' name='allowfullscreen'>";
			str += "<embed width='450' height='366' src='" + flashUrl + "' quality='high' pluginspage='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash' wmode='Opaque' allowscriptaccess='always' allowfullscreen='true' name='FlashObj" + id + "'>";
			str += "</object>";
			str += "</div>";
			$parent.append(str);
			$("#videoBox" + id).show();
			$spaniCon.removeClass("vidio-s").addClass("vidio-e");
			$("#vidio-a-" + id).attr("title", "收起视频")
		},
		addCollect: function() {
			$("a.collect-a").unbind().bind("click", function(e) {
				var $obj = $(this);
				var id = $obj.attr("lang");
				var submitUrl = "http://dig.chouti.com/link/self/add?" + G.param({
					linksId: id
				});
				var $pare = $obj.parent().parent().parent();
				var options = {
					url: submitUrl,
					type: "GET",
					error: function(xmlHttp, textStatus) {
						textStatus = textStatus.toLowerCase();
						if (textStatus === "error") {
							var status = xmlHttp.status.toString().substring(0, 1);
							if (status === "5") {
								L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[status])
							}
							return
						}
					},
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							var ju = parseInt($($obj).parent().css("padding-top").replace("px", ""));
							var $span = $("<img>", {
								src: "http://dig.chouti.com//images/add-save.gif?v=2.13"
							}).css({
								top: parseInt($($obj).parent().position().top + ju - 25) + "px",
								left: parseInt($($obj).position().left - 9) + "px"
							}).addClass("add-coll-img").appendTo($pare);
							$span.animate({
								top: "-=" + 10
							}, 400, function() {});
							window.setTimeout(function() {
								$span.remove()
							}, 800);
							var destjid = $obj.attr("destjid");
							var jid = $obj.attr("jid");
							var siBtn = "<a href='javascript:;' class='remove-col-a' id='collect-a-" + id + "' lang='" + id + "' title='移出私藏' destjid='" + destjid + "' jid='" + jid + "'><span class='hand-icon icon-collect collect-actived'></span><b>私藏</b></a>";
							$obj.before(siBtn);
							$obj.remove();
							$("#shu_collect").html(info.data);
							chouti.removeCollect();
							chouti.executeBeforOprate(true)
						} else {
							if (!chouti.reponseNoLogin(info.code, info.message, "添加收藏已成功")) {
								return false
							}
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							return
						}
					}
				};
				$("#isAjax").data("ajax", options);
				L.ajax(options);
				return false
			})
		},
		removeCollect: function() {
			$("a.remove-col-a, a.del-coll-btn").unbind().bind("click", function(e) {
				var $obj = $(this);
				var id = $obj.attr("lang");
				var submitUrl = "http://dig.chouti.com/link/self/del?" + G.param({
					linksId: id
				});
				var $pare = $obj.parent().parent().parent();
				var options = {
					url: submitUrl,
					type: "GET",
					error: function(xmlHttp, textStatus) {
						textStatus = textStatus.toLowerCase();
						if (textStatus === "error") {
							var status = xmlHttp.status.toString().substring(0, 1);
							if (status === "5") {
								L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[status])
							}
							return
						}
					},
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							var destjid = $obj.attr("destjid");
							var jid = $obj.attr("jid");
							var ju = parseInt($($obj).parent().css("padding-top").replace("px", ""));
							if ($obj.hasClass("remove-col-a")) {
								var $span = $("<img>", {
									src: "http://dig.chouti.com/images/del-save.gif?v=2.13"
								}).css({
									top: parseInt($($obj).parent().position().top + ju - 25) + "px",
									left: parseInt($($obj).position().left - 9) + "px"
								}).addClass("mov-coll-img").appendTo($pare);
								$span.animate({
									top: "-=" + 10
								}, 400, function() {});
								window.setTimeout(function() {
									$span.remove()
								}, 900);
								var siBtn = "<a href='javascript:;' class='collect-a' id='collect-a-" + id + "' lang='" + id + "' title='加入私藏' destjid='" + destjid + "' jid='" + jid + "'><span class='hand-icon icon-collect'></span><b>私藏</b></a>";
								$obj.before(siBtn);
								$obj.remove()
							}
							if ($obj.hasClass("del-coll-btn")) {
								$obj.parent().slideUp("400").remove()
							}
							$("#shu_collect").html(info.data);
							$(".show-items #person_collect_count").html(info.data);
							chouti.addCollect();
							chouti.executeBeforOprate(true)
						} else {
							if (!chouti.reponseNoLogin(info.code, info.message, "移出收藏已成功")) {
								return false
							}
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							return
						}
					}
				};
				$("#isAjax").data("ajax", options);
				L.ajax(options);
				return false
			})
		},
		vote: function(ch) {
			$("a.digg-a").unbind().bind("click",
				function(e) {
					var $obj = $(this);
					$obj.hide();
					var $part = $obj.parent();
					var tempid = $obj.children("b").html();
					var temp_digg_a = "<span class='digg-a' href='javascript:;' id='temp-a'><span class='hand-icon icon-digg'></span><b class='green'>" + tempid + "</b><i style='display:none'></i></span>";
					$obj.before(temp_digg_a);
					var $pare = $obj.parent().parent().parent();
					var id = $obj.children("i").html();
					var submitUrl = "http://dig.chouti.com/link/vote?" + G.param({
						linksId: id
					});
					var options = {
						url: submitUrl,
						type: "POST",
						error: function(xmlHttp, textStatus) {
							textStatus = textStatus.toLowerCase();
							if (textStatus === "error") {
								var status = xmlHttp.status.toString().substring(0, 1);
								if (status === "5") {
									L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[status])
								};
								$obj.css("display", "inline-block");
								$("#temp-a").remove();
								return;
							}
						},
						success: function(info) {
							$obj.css("display", "inline-block");
							$("#temp-a").remove();
							if (info.code == ResultCodeSuccess) {
								chouti.showDiggMove($pare, e, $obj);
								$obj.children("span").addClass("vote-actived");
								$obj.children("b").html(info.data.lvCount).css("color", "#9add7f").unbind();
								var destjid = $("#i_destjid").html();
								var jid = $("#i_jid").html();
								if (destjid == jid) {
									$("#shu_digg").html(info.data.uvCount)
								}
								if (jid == "") {
									$("#shu_digg").html(info.data.uvCount)
								}
								$obj.hover(function() {
										$obj.children("span").css("background-position", "0 -20px");
										$obj.attr("title", "推荐")
									},
									function() {
										$obj.children("span").css("background-position", "0 -20px");
										$obj.attr("title", "推荐")
									}).addClass("isVoted").removeClass("digg-a").attr("title", "取消推荐").unbind();
								chouti.cancelVote();
								chouti.executeBeforOprate(true)
							} else {
								if (!chouti.reponseNoLogin(info.code, info.message, "推荐已成功")) {
									return false
								}
								$obj.children("span").removeClass("vote-actived");
								L.showTopTips(L.TIPS_TYPE.error, info.message);
								if (info.code == "30010" && $("#isAjax").val() == 1) {
									window.location.reload();
									$("#isAjax").val(0)
								}
								return
							}
						}
					};
					$("#isAjax").data("ajax", options);
					L.ajax(options);
					return false
				})
		},
		cancelVote: function(ch) {
			$("a.isVoted").unbind().bind("click", function(e) {
				var $obj = $(this);
				$obj.hide();
				var $part = $obj.parent();
				var tempid = $obj.children("b").html();
				var temp_digg_a = "<span class='digg-a' href='javascript:;' id='temp-a'><span class='hand-icon icon-digg'></span><b class='green'>" + tempid + "</b><i style='display:none'></i></span>";
				$obj.before(temp_digg_a);
				var $pare = $obj.parent().parent().parent();
				var id = $obj.children("i").html();
				var submitUrl = "http://dig.chouti.com/vote/cancel/vote.do";
				var options = {
					url: submitUrl,
					type: "POST",
					data: G.param({
						linksId: id
					}),
					error: function(xmlHttp, textStatus) {
						textStatus = textStatus.toLowerCase();
						if (textStatus === "error") {
							var status = xmlHttp.status.toString().substring(0, 1);
							if (status === "5") {
								L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[status])
							}
							$obj.css("display", "inline-block");
							$("#temp-a").remove();
							return
						}
					},
					success: function(info) {
						$obj.css("display", "inline-block");
						$("#temp-a").remove();
						if (info.code == ResultCodeSuccess) {
							chouti.showLessMove($pare, e, $obj);
							$obj.children("span").removeClass("vote-actived");
							$obj.children("b").html(info.data.lvCount).css("color", "#99AECB");
							var destjid = $("#i_destjid").html();
							var jid = $("#i_jid").html();
							if (destjid == jid) {
								$("#shu_digg").html(info.data.uvCount)
							}
							if (jid == "") {
								$("#shu_digg").html(info.data.uvCount)
							}
							$obj.hover(function() {
								$obj.children("span").css("background-position", "0 0");
								$obj.attr("title", "推荐")
							}, function() {
								$obj.children("span").css("background-position", "0 -40px");
								$obj.attr("title", "")
							}).removeClass("isVoted").addClass("digg-a").attr("title", "推荐").unbind();
							chouti.vote("");
							chouti.executeBeforOprate(true)
						} else {
							if (!chouti.reponseNoLogin(info.code, info.message, "取消推荐已成功")) {
								return false
							}
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							if (info.code == "30010" && $("#isAjax").val() == 1) {
								window.location.reload();
								$("#isAjax").val(0)
							}
							return
						}
					}
				};
				$("#isAjax").data("ajax", options);
				L.ajax(options);
				return false
			})
		},
		executeBeforOprate: function(ti) {
			var aj = $("#isAjax").val();
			if (aj == 1) {
				var msg = $("#login_ajaxInfo").val();
				if (ti && msg != "share") {
					L.showTopTips(L.TIPS_TYPE.success, msg)
				}
				$("#isAjax").val(0);
				$("#login_ajaxInfo").val("");
				$("#isAjax").data("ajax", null);
				window.location.reload()
			}
			$("#isAjax").data("ajax", null)
		},
		reponseNoLogin: function(code, msg, tipinfo) {
			if (code == "-1" || code == "20006") {
				chouti.showLoginBox();
				if (code == "20006") {
					msg = "您需要先登录才能继续刚才的操作"
				}
				$("#login-wrong-info").html(msg);
				$(".login-er-icon").css("display", "inline-block");
				$("#isAjax").val(1);
				$("#login_ajaxInfo").val(tipinfo);
				return false
			}
			return true
		},
		showDiggMove: function(objParent, e, $this) {
			var $span = $("<span></span>", {
				css: {
					"font-weight": "bold",
					color: "#4fc416",
					"font-size": "20px",
					position: "absolute",
					"z-index": "6",
					left: "25px",
					top: $($this).parent().position().top + "px"
				}
			}).text("+1").appendTo(objParent);
			$span.animate({
				top: "-=" + 70,
				left: "+=" + 3,
				"font-size": 60,
				opacity: 0
			}, 600, function() {
				$span.remove()
			})
		},
		showLessMove: function(objParent, e, $this) {
			var $span = $("<span></span>", {
				css: {
					"font-weight": "bold",
					color: "#99AECB",
					"font-size": "20px",
					position: "absolute",
					"z-index": "6",
					left: "25px",
					top: $($this).parent().position().top + "px"
				}
			}).text("-1").appendTo(objParent);
			$span.animate({
				top: "-=" + 70,
				left: "+=" + 18,
				"font-size": 60,
				opacity: 0
			}, 600, function() {
				$span.remove()
			})
		},
		showMsgPanel: function(info, objParent) {
			var aj = $("#isAjax").val();
			if (aj == 1) {
				var msg = $("#login_ajaxInfo").val();
				$("#isAjax").val(0);
				$("#login_ajaxInfo").val("");
				$("#isAjax").data("ajax", null);
				window.location.reload();
				L.showTopTips(L.TIPS_TYPE.error, info);
				return
			}
			var msg = $("<div class='yellow-msg-box corner' id='yellow-msg-box'></div>").html("<span>" + info + "</span>").css({
				top: $(objParent).position().top + $(objParent).height() + 12
			}).appendTo("#content-list");
			if ($(msg).position().top + 32 > $("#content-list").height()) {
				$(msg).css("top", $("#content-list").height() - 32)
			}
			$(".msg-close-a, body").click(function() {
				$(msg).hide().remove()
			});
			window.setTimeout(function() {
				$(msg).hide().remove()
			}, 3000)
		},
		showSearchBox: function() {
			var str = "搜索关键字";
			$("#txtSearch2").focus(function() {
				$("#txtSearch2").css({
					"background-color": "#fff"
				})
			}).blur(function() {
				$("#txtSearch2").css({
					"background-color": "#f4f4f4"
				})
			});
			$("#searchBtn_3").click(function() {
				var value = $.trim($("#txtSearch2").val());
				if (value == str || value == "") {
					return
				}
				$("#searchFrm2").submit();
				return false
			})
		},
		clearEditorContent: function() {
			$("#clearFeedback").click(function() {
				ze.clear()
			})
		},
		clickClear: function() {
			$("#txt-duanzi").bindTipsEvent();
			$("#txt-yaoyan").bindTipsEvent();
			$("#txt-zixun").bindTipsEvent();
			$("#txt-img").bindTipsEvent();
			$("#txt-comment").bindTipsEvent();
			$("#reg_destJid").bindTipsEvent();
			$("#reg_password").bindTipsEvent();
			$("#reg_confirm_password").bindTipsEvent();
			$("#reg_secret_mail").bindTipsEvent();
			$("#phoneCode").bindTipsEvent();
			$("#verify_code").bindTipsEvent();
			$("#sms_code").bindTipsEvent();
			$("#feedback_content").bindTipsEvent();
			$("#txtSearch2").bindTipsEvent()
		},
		top10name: function(typename) {
			$(".top-band-type em").html(typename)
		},
		shake: function(ele, cls, times) {
			var i = 0,
				t = false,
				o = ele.attr("class") + " ",
				c = "",
				times = times || 2;
			if (t) {
				return
			}
			t = setInterval(function() {
				i++;
				c = i % 2 ? o + cls : o;
				ele.attr("class", c);
				if (i == 2 * times) {
					clearInterval(t);
					ele.removeClass(cls)
				}
			}, 200)
		},
		flashErrorTip: function(thisobj) {
			var $moreNumeError = thisobj;
			if ($moreNumeError.css("display") == "block") {
				chouti.shake($moreNumeError, "flash", 3);
				return false
			}
			return true
		},
		showGoTop: function() {
			var mainContent = $(".main-content");
			if (mainContent.length <= 0) {
				return
			}
			var left = parseInt(mainContent.outerWidth() + mainContent.offset().left + 20);
			var left2 = $("html").width();
			if (left2 < 1024) {
				left = left2 - 300
			}
			var topBtn = "<a href='javascript:;' title='回到顶部' class='icon-main' id='gotop' style='left:" + left + "px'></a>";
			$("body").append(topBtn);
			$("#gotop").click(function() {
				$("body,html").animate({
					scrollTop: 0
				}, 200)
			});
			$(window).scroll(function() {
				var $scrollTop = $(window).scrollTop();
				if ($(window).scrollTop() > 0) {
					$("#gotop").css("display", "block")
				} else {
					if ($(window).scrollTop() <= 0) {
						$("#gotop").hide()
					}
				}
			})
		},
		isEmail: function(s) {
			if (/^[_a-zA-Z0-9.]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/.test(s)) {
				return true
			}
			return false
		},
		Head_Pic_Rece_URL_info: function(str, swfId) {
			if (str == "IOError") {
				L.showTopTips(L.TIPS_TYPE.error, "图片上传失败，请稍候再试");
				return
			} else {
				var p1 = str.lastIndexOf(".");
				str = str.substring(0, p1) + "=48x48." + str.substring(p1 + 1);
				$(".my-photo #personImgUrl").attr("src", str);
				$("#hidImgUrl").val(str);
				Head_Pic_Cancel()
			}
		},
		Head_Pic_Cancel_info: function() {
			$("#H-avaupload-dialog").hide();
			$("#mask").hide().remove()
		},
		hoverItems: function() {
			$(".list-item").hover(function() {
				$(this).data("backColor", $(this).css("background-color"));
				$(this).css({
					backgroundColor: "#e9f0f8"
				})
			}, function() {
				var bkColor = $(this).data("backColor");
				$(this).css("background-color", bkColor)
			})
		},
		showDelDialog: function() {
			$("#del_a").click(function() {
				chouti.showMask("#del-dialog", "");
				$("#mask").fadeIn("500", function() {
					$("#del-dialog").show()
				})
			})
		},
		checkserAgent: function() {
			var userAgentInfo = navigator.userAgent;
			var userAgentKeywords = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "MQQBrowser");
			var flag = false;
			if (userAgentInfo.indexOf("Windows NT") < 0 || userAgentInfo.indexOf("Macintosh") < 0 || userAgentInfo.indexOf("Mac OS") < 0 || ((userAgentInfo.indexOf("Linux") < 0) && (userAgentInfo.indexOf("Android") < 0))) {
				for (var i = 0; i < userAgentKeywords.length; i++) {
					if (userAgentInfo.indexOf(userAgentKeywords[i]) >= 0) {
						flag = true
					}
				}
			}
			return flag
		},
		showChatSwf: function(parentdiv, loginid, loginuser, imgurl) {
			var zhb = new JsMucChat(parentdiv, loginid, loginuser, imgurl);
			if ($(".isBan").val() == "0") {
				banChat()
			}
		},
		lazyLoadImg: function($this) {
			$($this).lazyload({
				placeholder: "/images/bai.png",
				effect: "show"
			})
		},
		initImgClickEvent: function() {
			try {
				$("img.big-img-load").remove();
				$("img.big-img").remove();
				$(window).unbind("click")
			} catch (err) {}
			var $img = $("#content-list .item .news-pic img");
			$img.click(function() {
				chouti.showBigImg($(this));
				return false
			});
			$img.hover(function() {
				var prefix = chouti.prefix();
				if (prefix != null) {
					var cursor = "-" + prefix + "-zoom-in";
					$(this).css("cursor", cursor)
				} else {
					$(this).css("cursor", "url(/images/cursor/zoom_in.cur),auto")
				}
			})
		},
		prefix: function() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf("webkit") >= 0) {
				return "webkit"
			} else {
				if (ua.indexOf("firefox") >= 0) {
					return "moz"
				} else {
					if (ua.indexOf("opera") >= 0) {
						return "o"
					}
				}
			}
		},



		showBigImg: function($img) {
			var id = $img.attr("lang") + "";
			try {
				$("img.big-img[id!=bigImg" + id + "]").animate({
					width: "60px",
					height: "60px"
				}, function() {
					$(this).remove()
				});
				$("img.big-img-load[id!=bigImgLoading" + id + "]").remove()
			} catch (err) {}

			if ($("#bigImg" + id).length > 0) {
				return
			}

			var imgUrl = $img.attr("original") + "";
			bigImgUrl = imgUrl.substring(0, imgUrl.lastIndexOf("=")) + "=C200x200" + imgUrl.substring(imgUrl.lastIndexOf("."), imgUrl.length);
			var str = "<img class='big-img' id='bigImg" + id + "' width='200px' height='200px' src='" + imgUrl + "' alt='抽屉新热榜' />";
			$(document.body).append(str);
			var $bigImg = $("#bigImg" + id);
			docWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
			$bigImg.hover(function() {
				var prefix = chouti.prefix();
				if (prefix != null) {
					var cursor = "-" + prefix + "-zoom-out";
					$(this).css("cursor", cursor)
				} else {
					$(this).css("cursor", "url(/images/cursor/zoom_out.cur),auto")
				}
			});
			$bigImg.css({
				position: "absolute",
				top: ($img.offset().top) + "px",
				right: (docWidth - $img.offset().left - 64) + "px",
				"z-index": 2,
				"background-color": "#fff",
				border: "1px solid #ccc",
				padding: "1px",
				"vertical-align": "top"
			});
			$bigImg.css({
				width: "60px",
				height: "60px"
			});
			var bigImgOb = new Image();
			bigImgOb.src = bigImgUrl;
			if (bigImgOb.width > 0) {
				$bigImg.attr("src", bigImgUrl)
			};
			$bigImg.animate({
				width: "200px",
				height: "200px"
			}, function() {
				if (bigImgOb.width > 0) {
					$bigImg.attr("src", bigImgUrl)
				} else {
					var str = "<img class='big-img-load' id='bigImgLoading" + id + "' width='16px' height='16px' src='http://dig.chouti.com/images/loading.gif'/>";
					$(document.body).append(str);
					$("#bigImgLoading" + id).css({
						position: "absolute",
						top: ($img.offset().top + 92) + "px",
						right: (docWidth - $img.offset().left - 64 + 92) + "px",
						"z-index": 3
					});
					bigImgOb.onload = function() {
						$("#bigImgLoading" + id).remove();
						$bigImg.attr("src", bigImgUrl)
					}
				}
			});
			$(document).click(function(id) {
				$bigImg.animate({
					width: "60px",
					height: "60px"
				}, function() {
					$("#bigImgLoading" + id).remove();
					$bigImg.remove();
					var $img = $("#content-list .item .news-pic img");
					var prefix = chouti.prefix();
					if (prefix != null) {
						var cursor = "-" + prefix + "-zoom-out";
						$img.css("cursor", cursor)
					} else {
						$img.css("cursor", "url(/images/cursor/zoom_out.cur),pointer")
					}
				})
			})
		},
		oprateJuBao: function() {
			$("a.jubao").unbind().click(function() {
				var $this = $(this);
				var id = $this.attr("lang");
				var goJubao = chouti.checkLogin($this, id);
				if (!goJubao) {
					return
				}
				chouti.showJubaoDialog($this, id)
			})
		},
		checkLogin: function($this, id) {
			var submitUrl = "/link/share";
			L.ajax({
				url: submitUrl,
				success: function(info) {
					var code = info.code;
					if (code == "9999") {
						chouti.showJubaoDialog($this, id)
					} else {
						var msg = info.message;
						if (code == "-1" || code == "20006") {
							chouti.showLoginBox();
							return
						} else {
							L.showTopTips(L.TIPS_TYPE.error, msg);
							return false
						}
					}
				}
			})
		},
		repeatJubao: function() {
			var jubaoTimeStr = $("#hidJubaoTime").val();
			jubaoTime1 = new Date().getTime();
			if (jubaoTimeStr == "") {
				$("#hidJubaoTime").val(jubaoTime1);
				return true
			} else {
				var timeOff = parseInt((jubaoTime1 - jubaoTimeStr) / 1000);
				if (timeOff <= 10) {
					L.showTopTips(L.TIPS_TYPE.error, "您举报过于频繁，请稍候重新举报");
					return false
				} else {
					$("#hidJubaoTime").val(jubaoTime1);
					return true
				}
			}
		},
		closeJubaoBox: function() {
			$("#Jubao-dialog").hide();
			$("#mask").hide().remove();
			$("#chatIframe").css({
				height: "475px",
				width: "300px"
			})
		},
		showJubaoDialog: function($this, id) {
			if ($("#Jubao-dialog").length <= 0) {
				$("#footer-band").append($("#jubao-dialog-code").html())
			}
			chouti.showMask("#Jubao-dialog", "top");
			var offsetH = $this.offset().top - $("#Jubao-dialog").height() / 2;
			if (offsetH <= 0) {
				offsetH = 30
			}
			$("#mask").show();
			$("#Jubao-dialog").show().css("top", offsetH + "px");
			$("#chatIframe").css({
				height: "0px",
				width: "0px"
			});
			$("#dialog-jubao-close, #clear-btn-jubao").click(function() {
				chouti.closeJubaoBox()
			});
			$(":radio:first[name=radio_bad]").attr("checked", "checked");
			$("#trJubao").hide();
			qita = 1;
			$("#otherReson").val("");
			$(":radio[name=radio_bad]").click(function() {
				if ($(this).attr("id") == "qita") {
					$("#trJubao").show();
					$("#otherReson").focus();
					qita = 0
				} else {
					$("#trJubao").hide();
					qita = 1
				}
			});
			chouti.clsJubaoResBox($this, id)
		},
		submitJubaoInfo: function(id, $this) {
			var submitUrl = "/comments/report";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					id: id
				}),
				success: function(info) {
					var code = info.code;
					if (code == "9999") {
						chouti.closeJubaoBox();
						L.showTopTips(L.TIPS_TYPE.success, "举报成功");
						$($this).css({
							cursor: "default",
							color: "#B4B4B4",
							"text-decoration": "none"
						}).unbind();
						$($this).hover(function() {
							$(this).css("text-decoration", "none")
						})
					} else {
						var msg = info.message;
						L.showTopTips(L.TIPS_TYPE.error, msg);
						return false
					}
				}
			})
		},
		clsJubaoResBox: function($this, id) {
			$("#sendJubaoBtn").unbind().click(function() {
				var otherReson = $.trim($("#otherReson").val());
				if (qita == 0 && otherReson == "") {
					$("#otherReson").focus();
					return
				}
				chouti.submitJubaoInfo(id, $this)
			})
		},
		showUserOprBox: function() {
			$("#loginUserNc").hover(function() {
					var $userBox = $("#userOprBox");
					var left = $(".key-sera").offset().left;
					left = left - 118;
					$userBox.css("left", left + "px").show();
					$("#user_notice_page").hide()
				},
				function() {
					$userBox.hide()
				});
			var $userBox = $("#userOprBox");
			$userBox.hover(function() {
					$userBox.show()
				},
				function() {
					$userBox.hide()
				})
		},
		changeAdPositon: function(ua, $ad, $adTop) {
			var $windTop = $(window).scrollTop();
			if ($windTop > $adTop) {
				$ad.addClass("advertIframe");
				var manConWidth = $(".content-R").offset().left - document.body.scrollLeft;
				var userAgentInfo = navigator.userAgent.toLowerCase();
				if (userAgentInfo.indexOf("firefox") > 0) {
					var manConWidth = $(".content-R").offset().left - document.documentElement.scrollLeft
				};
				if ("\v" == "v") {
					var manConWidth = $(".content-R").offset().left - document.documentElement.scrollLeft;
				}
				$ad.css("left", manConWidth + "px")
			} else {
				$ad.removeClass("advertIframe")
			}
		},
		subNickLength: function(str, countsum) {
			var len = 0,
				subtr = "",
				result = 0,
				strs = str;
			str = str.split("");
			for (var i = 0; i < str.length; i++) {
				if (result <= 4) {
					subtr += str[i]
				} else {
					subtr += "...";
					break
				}
				var c = strs.charCodeAt(i);
				if ((c >= 1 && c <= 126) || (65376 <= c && c <= 65439)) {
					len++
				} else {
					len += 2
				}
				result = parseInt(len / 2);
				var mod = len % 2;
				if (mod != 0) {
					result += 1
				}
			}
			return subtr
		},
		lahei: function() {
			$("#laHeiBtn").unbind().click(function() {
				var otherNick = $(this).attr("otherNick");
				if (!confirm("确定把" + otherNick + "拉入黑名单吗？")) {
					return
				}
				var submitUrl = "/letter/add/blacklist.do";
				var otherJid = $(this).attr("otherJid");
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: G.param({
						jid: otherJid
					}),
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							L.showTopTips(L.TIPS_TYPE.success, "拉黑成功");
							var str1 = "<span class='removeLahe'><span class='heimdan'></span>已加入黑名单</span><a id='laHeiRemoveBtn' otherJid='" + otherJid + "' otherNick='" + otherNick + "'>解除</a>";
							$("#laheiBox").html(str1);
							chouti.laHeiRemove()
						} else {
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							return
						}
					}
				})
			})
		},
		laHeiRemove: function() {
			$("#laHeiRemoveBtn").unbind().click(function() {
				var submitUrl = "/letter/del/blacklist.do";
				var otherJid = $(this).attr("otherJid");
				var otherNick = $(this).attr("otherNick");
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: G.param({
						jid: otherJid
					}),
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							L.showTopTips(L.TIPS_TYPE.success, "解除成功");
							var str1 = "<a id='laHeiBtn' otherJid='" + otherJid + "' otherNick='" + otherNick + "'><span class='heimdan'></span>拉入黑名单</a>";
							$("#laheiBox").html(str1);
							chouti.lahei()
						} else {
							L.showTopTips(L.TIPS_TYPE.error, info.message);
							return
						}
					}
				})
			})
		},
		fixedAdvert: function() {
			var ua = navigator.userAgent.toLowerCase();
			var $ad = $("#advertIframe");
			if ($ad.length <= 0) {
				return
			}
			var $adTop = $ad.offset().top;
			$(window).scroll(function() {
				chouti.changeAdPositon(ua, $ad, $adTop)
			});
			$(window).resize(function() {
				chouti.changeAdPositon(ua, $ad, $adTop)
			})
		}
	}
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n;
	var register = {
		StateMessage: {
			loading: "注册中，请稍候...",
			success: "注册成功",
			fail: "注册失败"
		},
		warnInfo: {
			username: {
				nullContent: "请输入用户名",
				errorStyle: "用户名格式不正确，请重新输入"
			},
			oldpassword: {
				nullContent: "请输入密码",
				errorStyle: "密码长度必须为6-16位字符，请重新输入"
			},
			password: {
				nullContent: "请输入密码",
				errorStyle: "密码长度必须为6-16位字符，请重新输入"
			},
			confirmPassword: {
				nullContent: "请输入确认密码",
				errorStyle: "两次密码不一致，请重新输入"
			},
			mail: {
				nullContent: "请输入联系邮箱",
				errorStyle: "邮箱格式不合法，请重新输入"
			},
			bindphone: {
				nullContent: "请输入手机号",
				errorStyle: "手机号不合法，请重新输入"
			},
			verifycode: {
				nullContent: "请输入验证码",
				errorStyle: ""
			},
			usernick: {
				nullContent: "请输入用户昵称",
				errorStyle: "支持中英文、数字、下划线",
				errorLengthStyle: "不能超过20个字符或10个汉字"
			}
		}
	};
	if (!i18n.register) {
		i18n.register = {}
	}
	$.extend(i18n.register, register)
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n;
	var resetpassword = {
		StateMessage: {
			loading: "注册中，请稍候...",
			success: "注册成功",
			fail: "注册失败"
		},
		showTipTitle: {
			title: "内容：",
			date: "时间：",
			location: "地点：",
			notes: "说明：",
			priority: "优先级：",
			fb: "状态：",
			clock: "闹钟："
		}
	};
	if (!i18n.resetpassword) {
		i18n.resetpassword = {}
	}
	$.extend(i18n.resetpassword, resetpassword)
})(jQuery);
var userNameCorss = false,
	userNickCorss = false,
	userPassCorss = false,
	userOldPassCorss = false,
	userPhoneCorss = false,
	userSamePassCorss = false,
	userMailCorss = false,
	userVertifyCorss = false,
	allSubmit = false;
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nregister = i18n.register;
	var warnInfo = i18nregister.warnInfo;
	var ResultCodeSuccess = L.RESULT_CODE.success;
	regCheckRule = {
		checkVerfifyCodeRule: function() {
			var verfifyCodeValue = $.trim($("#verify_code").val());
			if (gozapCommon.isEmpty(verfifyCodeValue)) {
				regCheckRule.inputTextChangeClass("add", "#verify_code", tipsObjs.verify_code.errorTip, tipsObjs.verify_code.successTip);
				$(".tips-info", "#tips_verifyCodeError").html(warnInfo.verifycode.nullContent);
				userVertifyCorss = false;
				return false
			}
			verfifyCodeValue = MD5(verfifyCodeValue);
			var submitUrl = "/passport/valAccessCode.do";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					code: verfifyCodeValue
				}),
				async: false,
				success: function(info) {
					if (info.code != ResultCodeSuccess) {
						regCheckRule.inputTextChangeClass("add", "#verify_code", tipsObjs.verify_code.errorTip, tipsObjs.verify_code.successTip);
						tipsObjs.verify_code.errorTip.show();
						$(".tips-info", "#tips_verifyCodeError").html(info.message);
						if (info.code == "24000") {
							$("#authImg").attr("src", "/gozapIdentifyCode?t=" + Math.random())
						}
						userVertifyCorss = false;
						return false
					} else {
						tipsObjs.verify_code.successTip.show();
						tipsObjs.verify_code.errorTip.hide();
						userVertifyCorss = true;
						return true
					}
				}
			})
		},
		checkUSerSamePassRule: function() {
			var passwordValue = $.trim($("#confirm_password").val());
			if (gozapCommon.isEmpty(passwordValue)) {
				regCheckRule.inputTextChangeClass("add", "#confirm_password", tipsObjs.confirm_password.errorTip, tipsObjs.confirm_password.successTip);
				$(".tips-info", "#tips_userPassSameError").html(warnInfo.confirmPassword.nullContent);
				userSamePassCorss = false;
				return false
			}
			if (passwordValue != $.trim($("#new_password").val())) {
				regCheckRule.inputTextChangeClass("add", "#confirm_password", tipsObjs.confirm_password.errorTip, tipsObjs.confirm_password.successTip);
				$(".tips-info", "#tips_userPassSameError").html(warnInfo.confirmPassword.errorStyle);
				userSamePassCorss = false;
				return false
			} else {
				userSamePassCorss = true;
				return true
			}
		},
		checkUSerSecretMailRule: function() {
			var mailValue = $.trim($("#secret_mail").val());
			if (gozapCommon.isEmpty(mailValue)) {
				regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				$(".tips-info", "#tips_userSecretMailError").html(warnInfo.mail.nullContent);
				userMailCorss = false;
				return false
			}
			if (!gozapCommon.isEmail(mailValue)) {
				regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				$(".tips-info", "#tips_userSecretMailError").html(warnInfo.mail.errorStyle);
				userMailCorss = false;
				return false
			}
			userMailCorss = true;
			return true
		},
		checkUSerSecretMailExist: function(wh) {
			var mailValue = $.trim($("#secret_mail").val());
			if (gozapCommon.isEmpty(mailValue)) {
				regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				$(".tips-info", "#tips_userSecretMailError").html(warnInfo.mail.nullContent);
				userMailCorss = false;
				return false
			}
			if (!gozapCommon.isEmail(mailValue)) {
				regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				$(".tips-info", "#tips_userSecretMailError").html(warnInfo.mail.errorStyle);
				userMailCorss = false;
				return false
			}
			if (wh == "") {
				var submitUrl = "/profile/email/exist";
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: G.param({
						email: mailValue
					}),
					async: false,
					success: function(info) {
						if (info.code != ResultCodeSuccess) {
							regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
							$(".tips-info", "#tips_userSecretMailError").html(info.message);
							userMailCorss = false;
							return false
						} else {
							tipsObjs.secret_mail.successTip.show();
							tipsObjs.secret_mail.errorTip.hide();
							userMailCorss = true;
							return true
						}
					}
				})
			} else {
				var submitUrl = "/profile/email/notexist";
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: G.param({
						email: mailValue
					}),
					async: false,
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							tipsObjs.secret_mail.successTip.show();
							tipsObjs.secret_mail.errorTip.hide();
							userMailCorss = true;
							return true
						} else {
							regCheckRule.inputTextChangeClass("add", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
							$(".tips-info", "#tips_userSecretMailError").html(info.message);
							userMailCorss = false;
							return false
						}
					}
				})
			}
		},
		checkUSerPassRule: function() {
			var passwordValue = $.trim($("#new_password").val());
			if (gozapCommon.isEmpty(passwordValue)) {
				regCheckRule.inputTextChangeClass("add", "#new_password", tipsObjs.password.errorTip, tipsObjs.password.successTip);
				$(".tips-info", "#tips_userPassError").html(warnInfo.password.nullContent);
				userPassCorss = false;
				return false
			}
			if (!gozapCommon.isBetweenLength(passwordValue, 6, 16)) {
				regCheckRule.inputTextChangeClass("add", "#new_password", tipsObjs.password.errorTip, tipsObjs.password.successTip);
				$(".tips-info", "#tips_userPassError").html(warnInfo.password.errorStyle);
				$("#new_password").val("");
				userPassCorss = false;
				return false
			}
			userPassCorss = true;
			return true
		},
		checkUSerOldPassRule: function() {
			var passwordValue = $.trim($("#old_password").val());
			if (gozapCommon.isEmpty(passwordValue)) {
				regCheckRule.inputTextChangeClass("add", "#old_password", tipsObjs.oldpassword.errorTip, tipsObjs.oldpassword.successTip);
				$(".tips-info", "#tips_userOldPassError").html(warnInfo.oldpassword.nullContent);
				userOldPassCorss = false;
				return false
			}
			if (!gozapCommon.isBetweenLength(passwordValue, 6, 16)) {
				regCheckRule.inputTextChangeClass("add", "#old_password", tipsObjs.oldpassword.errorTip, tipsObjs.oldpassword.successTip);
				$(".tips-info", "#tips_userOldPassError").html(warnInfo.oldpassword.errorStyle);
				userOldPassCorss = false;
				return false
			}
			userOldPassCorss = true;
			return true
		},
		checkUSerNickRule: function() {
			var nickValue = $.trim($("#nick").val());
			if (gozapCommon.isEmpty(nickValue)) {
				regCheckRule.inputTextChangeClass("add", "#nick", tipsObjs.usernick.errorTip, tipsObjs.usernick.successTip);
				$(".tips-info", "#tips_userNickError").html(warnInfo.usernick.nullContent);
				userNickCorss = false;
				return false
			}
			if (/^[\u4e00-\u9fa5\w]+$/.test(nickValue)) {
				userNickCorss = true
			} else {
				regCheckRule.inputTextChangeClass("add", "#nick", tipsObjs.usernick.errorTip, tipsObjs.usernick.successTip);
				$(".tips-info", "#tips_userNickError").html(warnInfo.usernick.errorStyle);
				userNickCorss = false;
				return false
			} if (!regCheckRule.countNickLength(nickValue, 10)) {
				regCheckRule.inputTextChangeClass("add", "#nick", tipsObjs.usernick.errorTip, tipsObjs.usernick.successTip);
				$(".tips-info", "#tips_userNickError").html(warnInfo.usernick.errorLengthStyle);
				userNickCorss = false;
				return false
			} else {
				userNickCorss = true;
				return true
			}
		},
		countNickLength: function(str, countsum) {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if ((c >= 1 && c <= 126) || (65376 <= c && c <= 65439)) {
					len++
				} else {
					len += 2
				}
			}
			var result = parseInt(len / 2);
			var mod = len % 2;
			if (mod != 0) {
				result += 1
			}
			var haveLength = countsum - result;
			if (haveLength < 0) {
				return false
			} else {
				return true
			}
		},
		checkUSerNameRule: function() {
			var userNameValue = $.trim($("#destJid").val());
			if (gozapCommon.isEmpty(userNameValue)) {
				regCheckRule.inputTextChangeClass("add", "#destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
				$(".tips-info", "#tips_userNameError").html(warnInfo.username.nullContent);
				userNameCorss = false;
				return false
			}
			if (!gozapCommon.isUserName(userNameValue) || !gozapCommon.isBetweenLength(userNameValue, 5, 20)) {
				regCheckRule.inputTextChangeClass("add", "#destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
				$(".tips-info", "#tips_userNameError").html(warnInfo.username.errorStyle);
				userNameCorss = false;
				return false
			}
			L.ajax({
				url: "userReg!selUser.action",
				data: "profile.destJid=" + userNameValue + "",
				success: function(info) {
					if (info.code != ResultCodeSuccess) {
						regCheckRule.inputTextChangeClass("add", "#destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
						$(".tips-info", "#tips_userNameError").html(info.ext.msg);
						userNameCorss = false;
						return false
					} else {
						tipsObjs.destJid.successTip.show();
						tipsObjs.destJid.errorTip.hide();
						userNameCorss = true;
						return true
					}
				}
			})
		},
		checkUSerNameExsit: function() {
			var userNameValue = $.trim($("#user_destJid").val());
			if (gozapCommon.isEmpty(userNameValue)) {
				regCheckRule.inputTextChangeClass("add", "#user_destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
				$(".tips-info", "#tips_userNameError").html(warnInfo.username.nullContent);
				userNameCorss = false;
				return false
			}
			if (!gozapCommon.isUserName(userNameValue) || !gozapCommon.isBetweenLength(userNameValue, 5, 20)) {
				regCheckRule.inputTextChangeClass("add", "#user_destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
				$(".tips-info", "#tips_userNameError").html(warnInfo.username.errorStyle);
				userNameCorss = false;
				return false
			}
			var submitUrl = "/profile/user/exist";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					jid: userNameValue
				}),
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						tipsObjs.destJid.successTip.show();
						tipsObjs.destJid.errorTip.hide();
						userNameCorss = true;
						return true
					} else {
						regCheckRule.inputTextChangeClass("add", "#user_destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
						$(".tips-info", "#tips_userNameError").html(info.message);
						userNameCorss = false;
						return false
					}
				}
			})
		},
		checkUSerOldPassExsit: function() {
			var oldPassword = $.trim($("#old_password").val());
			var submitUrl = "/profile/password/auth";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					password: oldPassword
				}),
				async: false,
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						tipsObjs.oldpassword.successTip.show();
						tipsObjs.oldpassword.errorTip.hide();
						userOldPassCorss = true;
						return true
					} else {
						regCheckRule.inputTextChangeClass("add", "#old_password", tipsObjs.oldpassword.errorTip, tipsObjs.oldpassword.successTip);
						$(".tips-info", "#tips_userOldPassError").html(info.message);
						userOldPassCorss = false;
						return false
					}
				}
			})
		},
		checkUSerPhoneRule: function() {
			var phoneValue = $.trim($("#phoneCode").val());
			if (gozapCommon.isEmpty(phoneValue)) {
				regCheckRule.inputTextChangeClass("add", "#phoneCode", tipsObjs.bindphone.errorTip, tipsObjs.bindphone.successTip);
				$(".tips-info", "#tips_userPhoneError").html(warnInfo.bindphone.nullContent);
				userPhoneCorss = false;
				return false
			}
			if (!G.regExp.isMobile(phoneValue)) {
				regCheckRule.inputTextChangeClass("add", "#phoneCode", tipsObjs.bindphone.errorTip, tipsObjs.bindphone.successTip);
				$(".tips-info", "#tips_userPhoneError").html(warnInfo.bindphone.errorStyle);
				userPhoneCorss = false;
				return false
			}
			userPhoneCorss = true;
			return true
		},
		inputTextChangeClass: function(sel, thisObj, tipsError, tipsSuccess) {
			if (sel == "add") {
				$(thisObj).addClass("text-error");
				tipsError.show();
				tipsSuccess.hide()
			} else {
				$(thisObj).removeClass("text-error");
				tipsError.hide();
				tipsSuccess.show()
			}
		},
		destJidBlurTips: function(re) {
			$("#user_destJid").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#user_destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip);
				tipsObjs.destJid.normalTip.show();
				tipsObjs.destJid.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.destJid.normalTip.hide();
				if (re == "resetpassword") {
					if (!regCheckRule.checkUSerNameExsit()) {
						return
					}
				} else {
					if (!regCheckRule.checkUSerNameRule()) {
						return
					}
				}
				regCheckRule.inputTextChangeClass("remove", "#user_destJid", tipsObjs.destJid.errorTip, tipsObjs.destJid.successTip)
			})
		},
		oldpasswordBlurTips: function(re) {
			$("#old_password").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#old_password", tipsObjs.oldpassword.errorTip, tipsObjs.oldpassword.successTip);
				tipsObjs.oldpassword.normalTip.show();
				tipsObjs.oldpassword.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.oldpassword.normalTip.hide();
				if (!regCheckRule.checkUSerOldPassRule()) {
					userOldPassCorss = false;
					return false
				}
				if (!regCheckRule.checkUSerOldPassExsit()) {
					return
				}
				regCheckRule.inputTextChangeClass("remove", "#old_password", tipsObjs.oldpassword.errorTip, tipsObjs.oldpassword.successTip)
			})
		},
		passwordBlurTips: function(re) {
			$("#new_password").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#new_password", tipsObjs.password.errorTip, tipsObjs.password.successTip);
				tipsObjs.password.normalTip.show();
				tipsObjs.password.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.password.normalTip.hide();
				if (!regCheckRule.checkUSerPassRule()) {
					return false
				}
				regCheckRule.inputTextChangeClass("remove", "#new_password", tipsObjs.password.errorTip, tipsObjs.password.successTip);
				if ($.trim($("#confirm_password").val()) != "") {
					$("#confirm_password").blur()
				}
			}).keyup(function() {
				var value = $.trim($(this).val());
				if (value == "") {
					return
				}
				var points = passwordStrength.policy(value);
				passwordStrength.changePS(points, "#password_strong_line")
			})
		},
		confirmpasswordBlurTips: function() {
			$("#confirm_password").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#confirm_password", tipsObjs.confirm_password.errorTip, tipsObjs.confirm_password.successTip);
				tipsObjs.confirm_password.normalTip.show();
				tipsObjs.confirm_password.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.confirm_password.normalTip.hide();
				if (!regCheckRule.checkUSerSamePassRule()) {
					return
				}
				regCheckRule.inputTextChangeClass("remove", "#confirm_password", tipsObjs.confirm_password.errorTip, tipsObjs.confirm_password.successTip);
				tipsObjs.confirm_password.successTip.show()
			})
		},
		secretmailBlurNotTips: function(re) {
			$("#secret_mail").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				tipsObjs.secret_mail.normalTip.show();
				tipsObjs.secret_mail.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.secret_mail.normalTip.hide();
				if (!regCheckRule.checkUSerSecretMailExist("exsit")) {
					return
				}
				regCheckRule.inputTextChangeClass("remove", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip)
			})
		},
		secretmailBlurTips: function(re) {
			$("#secret_mail").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip);
				tipsObjs.secret_mail.normalTip.show();
				tipsObjs.secret_mail.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.secret_mail.normalTip.hide();
				if (re == "finduser") {
					if (!regCheckRule.checkUSerSecretMailExist("")) {
						return
					}
				} else {
					if (re == "exsit") {
						if (!regCheckRule.checkUSerSecretMailExist(re)) {
							return
						}
					}
					if (!regCheckRule.checkUSerSecretMailRule()) {
						return
					}
				}
				regCheckRule.inputTextChangeClass("remove", "#secret_mail", tipsObjs.secret_mail.errorTip, tipsObjs.secret_mail.successTip)
			})
		},
		verifycodeBlurTips: function(btn) {
			$("#verify_code").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#verify_code", tipsObjs.verify_code.errorTip, tipsObjs.verify_code.successTip);
				tipsObjs.verify_code.normalTip.show();
				tipsObjs.verify_code.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.verify_code.normalTip.hide();
				if (!regCheckRule.checkVerfifyCodeRule()) {
					return
				}
				regCheckRule.inputTextChangeClass("remove", "#verify_code", tipsObjs.verify_code.errorTip, tipsObjs.verify_code.successTip)
			}).keydown(function(event) {
				if (event.keyCode == 13) {
					$("#verify_code").blur();
					if (userVertifyCorss) {
						$(btn).click()
					}
				}
			})
		},
		phoneBlurTips: function() {
			$("#phoneCode").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#phoneCode", tipsObjs.bindphone.errorTip, tipsObjs.bindphone.successTip);
				tipsObjs.bindphone.normalTip.show();
				tipsObjs.bindphone.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.bindphone.normalTip.hide();
				if (!regCheckRule.checkUSerPhoneRule()) {
					return
				}
				regCheckRule.inputTextChangeClass("remove", "#phoneCode", tipsObjs.bindphone.errorTip, tipsObjs.bindphone.successTip)
			})
		},
		userNickBlurTips: function() {
			$("#nick").focus(function() {
				regCheckRule.inputTextChangeClass("remove", "#nick", tipsObjs.usernick.errorTip, tipsObjs.usernick.successTip);
				tipsObjs.usernick.normalTip.show();
				tipsObjs.usernick.successTip.hide()
			}).blur(function() {
				$(this).removeClass("text-active");
				tipsObjs.usernick.normalTip.hide();
				if (!regCheckRule.checkUSerNickRule()) {
					userNickCorss = false;
					return false
				}
				regCheckRule.inputTextChangeClass("remove", "#nick", tipsObjs.usernick.errorTip, tipsObjs.usernick.successTip)
			})
		},
		loginTextFocusorBlur: function(re) {
			$(re).focus(function() {
				$(this).parent().addClass("text-box-active")
			}).blur(function() {
				$(this).parent().removeClass("text-box-active")
			})
		},
		initTipsBind: function() {
			tipsObjs = {
				destJid: {
					normalTip: $("#tips_userNameNormal"),
					errorTip: $("#tips_userNameError"),
					successTip: $("#username_sucess_ico")
				},
				oldpassword: {
					normalTip: $("#tips_userOldPassNormal"),
					errorTip: $("#tips_userOldPassError"),
					successTip: $("#userOldpass_sucess_ico")
				},
				password: {
					normalTip: $("#tips_userPassNormal"),
					errorTip: $("#tips_userPassError"),
					successTip: $("#userpass_sucess_ico")
				},
				confirm_password: {
					normalTip: $("#tips_userPassSameNormal"),
					errorTip: $("#tips_userPassSameError"),
					successTip: $("#userpasssame_sucess_ico")
				},
				secret_mail: {
					normalTip: $("#tips_userSecretMailNormal"),
					errorTip: $("#tips_userSecretMailError"),
					successTip: $("#usersecretmail_sucess_ico")
				},
				bindphone: {
					normalTip: $("#tips_userPhoneNormal"),
					errorTip: $("#tips_userPhoneError"),
					successTip: $("#userphone_sucess_ico")
				},
				verify_code: {
					normalTip: $("#tips_verifyCodeNormal"),
					errorTip: $("#tips_verifyCodeError"),
					successTip: $("#verfycode_sucess_ico")
				},
				usernick: {
					normalTip: $("#tips_userNick"),
					errorTip: $("#tips_userNickError"),
					successTip: $("#usernick_sucess_ico")
				}
			}
		},
		inputTextFocusorBlur: function() {
			$(":text, :password").focus(function() {
				$(this).addClass("text-active")
			}).blur(function() {
				$(this).removeClass("text-active")
			})
		}
	}
})(jQuery);
(function($, undefined) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nregister = i18n.register;
	var ResultCodeSuccess = L.RESULT_CODE.success;

	function submitLoginForm() {
		$("#login_btn").click(function() {
			loginWin.login_submit()
		})
	}

	function submitRegForm() {
		$("#reg_btn").click(function() {
			regWin.reg_submit()
		});
		$(".reg_code").click(function() {
			$(this).attr("src", "/gozapIdentifyCode?v=" + Math.random())
		})
	}

	function closeDialog() {
		$("#login-dialog-btn-close").click(function() {
			$("#login-wrong-info").html("");
			$("#destJid").val("");
			$("#password").val("");
			$("#reg-wrong-info").html("");
			$("#reg_destJid").val("");
			$("#reg_password").val("");
			$("#reg_confirm_password").val("");
			$("#reg_secret_mail").val("");
			$(".reg-lab").show();
			$("#regFrm .sucess-ico").hide();
			reguserNameCorss = false;
			passCorss = false;
			conpassCorss = false;
			mailCorss = false;
			$("#digg-dialog-login").hide();
			$("#mask").hide().remove();
			$("#chatIframe").css({
				height: "475px",
				width: "300px"
			})
		})
	}
	loginWin = {
		enterIn: function(evt) {
			var evt = evt ? evt : (window.event ? window.event : null);
			if (evt.keyCode == 13) {
				loginWin.login_submit()
			}
		},
		login_submit: function() {
			var msg = $("#login-wrong-info");
			var un = $("#destJid");
			var pwd = $("#password");
			if ($.trim(un.val()) == "") {
				msg.html("请输入您的用户名");
				un.focus();
				return false
			}
			if (pwd.val() == "") {
				msg.html("请输入您的密码");
				pwd.focus();
				return false
			}
			var lw_ck = $("#autologin");
			if (lw_ck.attr("checked")) {
				lw_ck.val("1")
			} else {
				lw_ck.val("0")
			}
			var submitUrl = "/passport/login.do";
			$("#login_btn").hide();
			$("#info_loading_ico").show();
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					jid: $.trim(un.val()),
					password: pwd.val(),
					oneMonth: lw_ck.val()
				}),
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						$("#login-dialog-btn-close").click();
						$.cookie("puid", info.data.puid);
						if ($("#isAjax").val() == 1) {
							var comit = $("#isAjax").data("ajax");
							var diggComit = $("#isAjax").data("ajax");
							var jid = info.data.destJid;
							comitUrl = comit.data + "&" + G.param({
								jid: jid
							});
							comitUrl = comitUrl.replace("jid=&", "");
							comitUrl = comitUrl.replace("jid=undefined&", "");
							comit.data = comitUrl;
							if ($("#login_ajaxInfo").val() == "投票成功") {
								L.ajax(comit);
								return
							}
							if ($("#login_ajaxInfo").val() == "推荐已成功") {
								L.ajax(diggComit);
								return
							}
							if ($("#login_ajaxInfo").val() == "publish") {
								window.location.reload();
								return
							}
							var templinkId = $("#isComment").data("isComment");
							if (templinkId != "" && templinkId != null) {
								L.showTopTips(L.TIPS_TYPE.success, "发表评论成功");
								window.location.reload();
								L.ajax(comit);
								$("discus-a-" + templinkId).click()
							}
						} else {
							$("#login-dialog-btn-close").click();
							window.location.reload();
							if ($.trim($("#txt-comment").val()) != "") {
								$("#hidjid").val(info.data.destJid);
								$("#pub-btn4").click()
							}
						}
					} else {
						var extMst = info.data.extMst;
						if (extMst == "") {
							$("#login-wrong-info").html(info.message)
						} else {
							L.showTopTips(L.TIPS_TYPE.error, extMst)
						}
						$("#login_btn").css("display", "inline-block");
						$("#info_loading_ico").hide();
						return false
					}
				}
			})
		}
	};
	var RegtipsObjs = {
		destJid: {
			normalTip: $("#tips_userNameNormal"),
			errorTip: function() {
				$("#reg_username_sucess_ico").css("background-position", "0px -630px")
			},
			successTip: function() {
				$("#reg_username_sucess_ico").css("background-position", "0px -615px")
			}
		},
		password: {
			normalTip: $("#tips_userPassNormal"),
			errorTip: function() {
				$("#reg_userpassword_sucess_ico").css("background-position", "0px -630px")
			},
			successTip: function() {
				$("#reg_userpassword_sucess_ico").css("background-position", "0px -615px")
			}
		},
		confirm_password: {
			normalTip: $("#tips_userPassSameNormal"),
			errorTip: function() {
				$("#reg_userpasswordconfir_sucess_ico").css("background-position", "0px -630px")
			},
			successTip: function() {
				$("#reg_userpasswordconfir_sucess_ico").css("background-position", "0px -615px")
			}
		},
		secret_mail: {
			normalTip: $("#tips_userSecretMailNormal"),
			errorTip: function() {
				$("#reg_usermail_sucess_ico").css("background-position", "0px -630px")
			},
			successTip: function() {
				$("#reg_usermail_sucess_ico").css("background-position", "0px -615px")
			}
		},
		verify_code: {
			normalTip: $("#tips_verifyCodeNormal"),
			errorTip: $("#tips_verifyCodeError"),
			successTip: $("#verfycode_sucess_ico")
		}
	};
	regWin = {
		enterIn: function(evt) {
			var evt = evt ? evt : (window.event ? window.event : null);
			if (evt.keyCode == 13) {
				regWin.reg_submit()
			}
		},
		tipshowInfo: function(msg) {
			$("#reg-wrong-info").html(msg)
		},
		checkUSerSecretMailRule: function() {
			var mailValue = $.trim($("#reg_secret_mail").val());
			if (gozapCommon.isEmpty(mailValue)) {
				mailCorss = false;
				return false
			}
			if (!gozapCommon.isEmail(mailValue)) {
				regWin.tipshowInfo("邮箱格式不合法，请重新输入");
				RegtipsObjs.secret_mail.errorTip();
				$("#reg_usermail_sucess_ico").show();
				mailCorss = false;
				return false
			}
			var submitUrl = "/profile/email/notexist";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					email: mailValue
				}),
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						$("#reg_usermail_sucess_ico").show();
						RegtipsObjs.secret_mail.successTip();
						mailCorss = true;
						return true
					} else {
						regWin.tipshowInfo(info.message);
						$("#reg_usermail_sucess_ico").show();
						RegtipsObjs.secret_mail.errorTip();
						mailCorss = false;
						return false
					}
				}
			})
		},
		checkUSerSamePassRule: function() {
			var conpasswordValue = $.trim($("#reg_confirm_password").val());
			if (gozapCommon.isEmpty(conpasswordValue)) {
				conpassCorss = false;
				return false
			}
			if (conpasswordValue != $.trim($("#reg_password").val())) {
				regWin.tipshowInfo("两次密码不一致，请重新输入");
				RegtipsObjs.confirm_password.errorTip();
				$("#reg_userpasswordconfir_sucess_ico").show();
				conpassCorss = false;
				return false
			}
			return true
		},
		checkUSerPassRule: function() {
			var passwordValue = $.trim($("#reg_password").val());
			if (gozapCommon.isEmpty(passwordValue)) {
				passCorss = false;
				return false
			}
			if (!gozapCommon.isBetweenLength(passwordValue, 6, 16)) {
				regWin.tipshowInfo("密码长度必须为6-16位字符，请重新输入");
				RegtipsObjs.password.errorTip();
				$("#reg_userpassword_sucess_ico").show();
				passCorss = false;
				return false
			}
			if ($.trim($("#reg_confirm_password").val()) != "") {
				if (!regWin.checkUSerSamePassRule()) {
					return false
				}
			}
			return true
		},
		checkUSerNameExsit: function() {
			var userNameValue = $.trim($("#reg_destJid").val());
			if (gozapCommon.isEmpty(userNameValue)) {
				reguserNameCorss = false;
				return false
			}
			if (!gozapCommon.isUserName(userNameValue) || !gozapCommon.isBetweenLength(userNameValue, 5, 20)) {
				regWin.tipshowInfo("用户名格式不正确，请重新输入");
				RegtipsObjs.destJid.errorTip();
				$("#reg_username_sucess_ico").show();
				reguserNameCorss = false;
				return false
			}
			var submitUrl = "/profile/user/notexist";
			L.ajax({
				url: submitUrl,
				type: "POST",
				data: G.param({
					jid: userNameValue
				}),
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						$("#reg_username_sucess_ico").show();
						RegtipsObjs.destJid.successTip();
						reguserNameCorss = true;
						return true
					} else {
						regWin.tipshowInfo(info.message);
						$("#reg_username_sucess_ico").show();
						RegtipsObjs.destJid.errorTip();
						reguserNameCorss = false;
						return false
					}
				}
			})
		},
		destJidBlurTips: function(re) {
			$("#reg_destJid").focus(function() {
				$(this).parent().addClass("text-box-active")
			}).blur(function() {
				$(this).parent().removeClass("text-box-active");
				regWin.tipshowInfo("");
				if (!regWin.checkUSerNameExsit()) {
					return false
				}
				reguserNameCorss = true;
				RegtipsObjs.destJid.successTip();
				$("#reg_username_sucess_ico").show()
			})
		},
		passwordBlurTips: function(re) {
			$("#reg_password").focus(function() {
				$(this).parent().addClass("text-box-active")
			}).blur(function() {
				$(this).parent().removeClass("text-box-active");
				regWin.tipshowInfo("");
				if (!regWin.checkUSerPassRule()) {
					return false
				}
				passCorss = true;
				RegtipsObjs.password.successTip();
				$("#reg_userpassword_sucess_ico").show()
			})
		},
		confirmpasswordBlurTips: function(re) {
			$("#reg_confirm_password").focus(function() {
				$(this).parent().addClass("text-box-active")
			}).blur(function() {
				$(this).parent().removeClass("text-box-active");
				regWin.tipshowInfo("");
				if (!regWin.checkUSerSamePassRule()) {
					conpassCorss = false;
					return false
				}
				conpassCorss = true;
				RegtipsObjs.confirm_password.successTip();
				$("#reg_userpasswordconfir_sucess_ico").show()
			})
		},
		secretmailBlurTips: function() {
			$("#reg_secret_mail").focus(function() {
				$(this).parent().addClass("text-box-active")
			}).blur(function() {
				$(this).parent().removeClass("text-box-active");
				regWin.tipshowInfo("");
				if (!regWin.checkUSerSecretMailRule()) {
					return false
				}
				mailCorss = true;
				RegtipsObjs.secret_mail.successTip();
				$("#reg_usermail_sucess_ico").show()
			})
		},
		reg_submit: function() {
			var msg = $("#reg-wrong-info");
			var un = $("#reg_destJid");
			var pwd = $("#reg_password");
			var confirmPwd = $("#reg_confirm_password");
			var mail = $("#reg_secret_mail");
			var code = $("#reg_code");
			if ($.trim(un.val()) == "") {
				msg.html("请输入用户名");
				RegtipsObjs.destJid.errorTip();
				$("#reg_username_sucess_ico").show();
				return false
			}
			regWin.checkUSerNameExsit();
			if (pwd.val() == "") {
				msg.html("请输入密码");
				RegtipsObjs.password.errorTip();
				$("#reg_userpassword_sucess_ico").show();
				return false
			}
			regWin.checkUSerPassRule();
			if (confirmPwd.val() == "") {
				msg.html("请输入确认密码");
				RegtipsObjs.confirm_password.errorTip();
				$("#reg_userpasswordconfir_sucess_ico").show();
				return false
			}
			regWin.checkUSerSamePassRule();
			if ($.trim(mail.val()) == "") {
				msg.html("请输入联系邮箱");
				RegtipsObjs.secret_mail.errorTip();
				$("#reg_usermail_sucess_ico").show();
				mail.focus();
				return false
			}
			regWin.checkUSerSecretMailRule();
			if (reguserNameCorss && passCorss && conpassCorss && mailCorss) {
				if (!$("#readPl").attr("checked")) {
					regWin.tipshowInfo("请阅读并接受服务条款和隐私政策");
					return
				}
				$("#reg_btn").hide();
				$("#reg_info_loading_ico").show();
				var regName = $.trim(un.val());
				var regPassword = pwd.val();
				var regConPassword = confirmPwd.val();
				var regMail = $.trim(mail.val());
				var submitUrl = "/passport/register.do";
				L.ajax({
					url: submitUrl,
					type: "POST",
					data: G.param({
						jid: regName,
						password: regPassword,
						email: regMail,
						code: MD5($.trim(code.val()))
					}),
					success: function(info) {
						if (info.code == ResultCodeSuccess) {
							$("#reg_btn").css("display", "inline-block");
							$("#reg_info_loading_ico").hide();
							L.showTopTips(L.TIPS_TYPE.success, info.data.extMst);
							window.location.reload()
						} else {
							$("#reg_btn").css("display", "inline-block");
							$("#reg_info_loading_ico").hide();
							L.showTopTips(L.TIPS_TYPE.error, info.data.extMst);
							return false
						}
					}
				})
			}
		}
	};

	function init(regState) {
		regCheckRule.loginTextFocusorBlur("#destJid");
		regCheckRule.loginTextFocusorBlur("#password");
		submitLoginForm();
		chouti.clickClear();
		reguserNameCorss = false;
		passCorss = false;
		conpassCorss = false;
		mailCorss = false;
		regWin.destJidBlurTips();
		regWin.passwordBlurTips();
		regWin.confirmpasswordBlurTips();
		regWin.secretmailBlurTips();
		submitRegForm();
		closeDialog()
	}
	NS_login = {
		init: init
	}
})(jQuery);
var gozapCommon = {
	isEmpty: function(obj) {
		if (null == obj || "" == $.trim(obj) || "undefined" == obj) {
			return true
		}
		return false
	},
	isBetweenLength: function(obj, start, end) {
		if (obj.length >= start && obj.length <= end) {
			return true
		}
		return false
	},
	isUserName: function(s) {
		if (/^[0-9A-Za-z_]*$/.test(s)) {
			return true
		}
		return false
	},
	isEmail: function(s) {
		if (/^[_a-zA-Z0-9.]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/.test(s)) {
			return true
		}
		return false
	},
	isPhone: function(s) {
		var myreg = /^1[3|4|5|8][0-9]\d{4,8}$/;
		if (myreg.test(s)) {
			return true
		}
		return false
	},
	isOpenCapsLock: function(event) {
		var e = event || window.event;
		var o = e.target || e.srcElement;
		var oTip = o.nextSibling;
		var keyCode = e.keyCode || e.which;
		var isShift = e.shifKey || (keyCode == 16) || false;
		if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
			return true
		} else {
			return false
		}
	},
	isCookieEnabled: function() {
		return navigator.cookieEnabled ? true : false
	},
	goTop: function() {
		window.scrollTo(0, 0)
	},
	goBottom: function() {
		window.scrollTo(0, document.body.scrollHeight)
	}
};
var passwordStrength = {
	changePS: function(p, thisObj) {
		if (p == 0) {
			$(thisObj).css({
				width: "88px",
				"background-color": "#fff"
			})
		} else {
			if (p <= 25 && p > 0) {
				$(thisObj).css({
					width: "22px",
					"background-color": "#ff0000"
				})
			} else {
				if (p > 25 && p <= 50) {
					$(thisObj).css({
						width: "44px",
						"background-color": "#ff9900"
					})
				} else {
					if (p > 50 && p <= 75) {
						$(thisObj).css({
							width: "66px",
							"background-color": "#0099ff"
						})
					} else {
						if (p > 75 && p <= 100) {
							$(thisObj).css({
								width: "88px",
								"background-color": "#009933"
							})
						}
					}
				}
			}
		}
	},
	policy: function(s) {
		var points = 0;
		if (s.length >= 6) {
			if (s.length >= 6 && s.length <= 8) {
				points += 5
			} else {
				if (s.length >= 9 && s.length <= 12) {
					points += 10
				} else {
					if (s.length >= 13 && s.length <= 16) {
						points += 25
					}
				}
			} if (/^[a-z]+$/.test(s)) {
				points += 10
			}
			if (/[a-z]+/.test(s) && /[A-Z]+/.test(s)) {
				points += 20
			}
			if (/\d{2,}|(\d(\w+)\d)+/.test(s)) {
				points += 20
			} else {
				if (/\d{1}/.test(s)) {
					points += 10
				}
			} if (/\W{2,}|\W(\w+)\W/.test(s)) {
				points += 25
			} else {
				if (/\W{1}/.test(s)) {
					points += 10
				}
			} if (/[a-z]/.test(s) && /[A-Z]/.test(s) && /\d/.test(s) && /\W/.test(s)) {
				points += 5
			} else {
				if (/[a-z|A-Z]/.test(s) && /\d/.test(s) && /\W/.test(s)) {
					points += 3
				} else {
					if (/[a-z|A-Z]/.test(s) && /\d/.test(s)) {
						points += 2
					}
				}
			}
		} else {
			if (s.length > 0 && s.length < 6) {
				points += 1
			}
		}
		return points
	}
};
var labi_view = {
	sms: {
		send: {
			title: "发短信",
			content: "内容",
			cont_tooLong_tips_a: "您的短信过长，将分成",
			cont_tooLong_tips_b: "条发送，是否继续发送？",
			loading: {
				cont_a: "短信正在发送：",
				cont_b: "条",
				complete_a: "短信发送完成，2秒后返回",
				complete_b: "短信发送完毕",
				to: "致",
				error: "短信发送失败！",
				success: "短信已送达"
			},
			faces: "表情",
			link: "网址",
			picture: "图片",
			contact: "联系人"
		},
		tips: {
			remove_success: "删除成功",
			addPnumToCnt: "添加到联系人",
			addPnum_title: "您可以将此号码添加到新联系人或现有联系人",
			addPnum_noChoice: "请选择要添加到的联系人",
			off: "您的手机蜡笔离线，请登录手机蜡笔后使用此功能",
			search: "搜索短信...",
			contentInput: "请输入短信内容...",
			pnumInput: "请点击左侧收件人，或直接输入姓名或号码（按Ctrl+Enter键发送）",
			sendMethod: "按Ctrl+Enter键发送",
			illegalOperation: {
				noSearchCondition: "请输入搜索条件",
				noRemoveOption: "请选择要删除的短信",
				noInputContent: "请输入短信内容",
				tooLongContent: "您所发的短信长度过长",
				noInputPnum: "请输入要发送的手机号码",
				unValidPnum: "请输入有效的手机号码",
				noReSendPnum: "请选择要重发的号码"
			},
			confirm: {
				removeOneSms: "您确定要将这条短信放到回收站吗?\n注意：这条短信将在手机上被删除！（黑莓手机除外）",
				removeSms: function(num) {
					return "您确定要将这“" + num + "”条短信放到回收站吗?\n注意：这条短信将在手机上被删除！（黑莓手机除外）"
				}
			}
		},
		search: {
			tips: "搜索短信...",
			result_a: "符合“",
			result_b: "”的短信搜索结果",
			no_result: "<strong>没有符合您搜索条件的短信</strong><br />您可以通过姓名、电话号码、短信内容进行搜索"
		},
		remove: "删除",
		noData: "此分类下没有短信",
		recipient: "收件人",
		addresser: "发件人",
		op: {
			reply: {
				title: "回复"
			},
			forward: {
				title: "转发"
			},
			remove: {
				title: "删除"
			},
			dialog: {
				title: "查看对话"
			}
		},
		sendTo: "发送至",
		name: {
			"1": "收件箱",
			"2": "已发短信",
			"": "全部短信"
		},
		sendError: {
			"404": "手机蜡笔不在线，请登录手机蜡笔后重试！",
			"500": "手机蜡笔短信发送失败，请稍后重试！",
			"100": "手机蜡笔短信发送失败，请稍后重试！",
			"503": "手机蜡笔短信发送失败，请稍后重试！",
			"101": "手机蜡笔短信发送失败，请稍后重试！",
			"504": "手机蜡笔短信发送超时，请稍后重试！"
		}
	},
	contact: {
		Address_Book: "蜡笔通讯录",
		info: "联系人信息",
		addTr: "添加",
		removeTr: "删除",
		group_add_title: "新建分组名称",
		group_add_opName: "新建分组",
		group_set_opName: "重命名组",
		group_remove_opName: "删除该组",
		ava_remove_opName: "删除头像",
		groupName: {
			"": "全部联系人",
			"-10": "未分类"
		},
		opName: {
			add: "新建联系人",
			set: "编辑联系人",
			imp: "导入",
			exp: "导出",
			print: "打印"
		},
		search_tips: "搜索联系人...",
		noData: {
			noGroup: "您没有未分组的联系人",
			inGroup: "此分组下没有联系人",
			addCnt: "添加成员",
			search: "<strong>没有符合您搜索条件的联系人</strong><br />您可以通过姓名、电话号码、公司名称、备注等信息进行搜索",
			print: "您没有联系人可供打印",
			favorite: {
				title: "常用联系人为空",
				tips: "常用联系人使用提示：",
				content: ["把您最常使用的联系人设为常用联系人，有助于更方便的使用联系人", "点击单个联系人右上角的星标记，把单个联系人设为常用联系人，再次点击取消设置"]
			}
		},
		groupInto: "分组",
		groupTo: "添加到...",
		remove: "删除",
		elemName: {
			name: "姓名",
			ln: "姓",
			fn: "名",
			nts: "备注",
			jt: "头衔",
			com: "公司",
			birth: "生日",
			ava: "头像",
			group: "分组"
		},
		attrName: {
			ph: {
				MP: "手机",
				HM: "手机(家庭)",
				WM: "手机(工作)",
				PH: "电话",
				HP: "电话(家庭)",
				WP: "电话(工作)",
				FX: "传真",
				HF: "传真(家庭)",
				WF: "传真(工作)",
				PP: "寻呼机",
				"": "其它电话"
			},
			im: {
				QQ: "QQ",
				MSN: "MSN",
				GTA: "Google Talk",
				SKY: "Skype",
				ICQ: "ICQ",
				AIM: "AIM",
				YAH: "YAH",
				JAB: "Jabber"
			},
			em: {
				HE: "邮箱(家庭)",
				WE: "邮箱(工作)",
				"": "其它邮箱"
			},
			addr: {
				HA: "地址(家庭)",
				WA: "地址(工作)",
				OA: "其它地址"
			},
			wp: {
				"": "网址",
				HW: "网址(家庭)",
				WW: "网址(工作)"
			},
			nts: {
				"": "备注"
			}
		},
		set: "编辑",
		tips: {
			noName: "请输入姓名",
			noGroupName: "请输入分组名",
			groupIsExist: "该分组名已存在",
			addGrp_success: "成功创建新分组",
			setGrp_success: "修改成功",
			confirm: {
				removeOneCnt: "您确定要删除此联系人？\n注意：删除后，此联系人在手机上也将被删除！",
				removeCnts: function(num) {
					return "您确定要删除这 " + num + " 个联系人？\n注意：删除后，这些联系人在手机上也将被删除！"
				},
				removeGrp: "您确定要删除这个联系人分组吗?\n(保留该分组中的联系人)"
			},
			noChoice_remove: "请选择要删除的联系人",
			noChoice_group: "请选择要分组的联系人",
			cnt_remove_success: "删除成功",
			addCntsToGrp_success: "已将所选联系人添加到",
			removeCntsFromGrp_success_a: "已从",
			removeCntsFromGrp_success_b: "删除所选联系人",
			search: "搜索联系人..."
		},
		addInto: "添加到...",
		removeFrom: "从以下组中删除...",
		history: {
			viewSMSSess: "查看短信记录",
			viewCRCSess: "查看通话记录",
			view: "查看修改历史",
			tips: {
				noData_1: "此联系人没有历史修改记录",
				noData_2: "后续您对此联系人的任何修改可在此查看"
			}
		},
		favorite: {
			"0": {
				title: "设置为常用联系人"
			},
			"1": {
				title: "从常用联系人中删除"
			}
		}
	},
	recipient: {
		tips: "点击选择收件人",
		title: "从联系人中添加",
		middle_left: "短信联系人",
		search: "搜索联系人...",
		middle_right_a: "收件人",
		middle_right_b: "（已添加0人）",
		noData: "您没有联系人",
		opName_remove: "移除"
	},
	status: {
		online: "手机蜡笔在线",
		off: "手机蜡笔离线",
		dnd: "数据读取中",
		off_tips: "本手机蜡笔不在线<br/>请启动您的手机蜡笔",
		model_set: "设置手机型号",
		status_set: "切换同步状态",
		sync_close: "手机蜡笔服务状态为”关闭同步”时将无法发送短信，是否需要开启手机蜡笔的同步服务？",
		sync_close_virtSms: "手机蜡笔服务状态为”关闭同步”时将无法创建虚拟短信，是否需要开启手机蜡笔的同步服务？",
		smsSync_manual: "手机蜡笔短信同步模式为”手动同步”时站点将无法立刻显示您已发送的短信，是否需要将其设置为“自动同步”",
		op: {
			success: "设置成功",
			remove_success: "删除成功",
			error: "操作失败,请稍后再试"
		},
		confirm_remove: "确定解除绑定？\n解除绑定后，此手机的相关信息及同步状态将被清理！",
		tips_client_remove: function(imei) {
			return "注：如果已不再使用此手机，您可以“<span onclick=\"removeClient('" + imei + "');\">解除此手机和本帐号的绑定</span>”！"
		}
	},
	notice: {
		title: "公告",
		user: {
			win_close: "[知道了，关闭窗口吧]"
		}
	},
	recycle: {
		title: "联系人回收站",
		removeOn: "删除于：",
		opName: {
			remove: "彻底删除",
			removeOne: "彻底删除",
			restore: "还原",
			restoreCnts: "还原"
		},
		tips: {
			confirm: {
				removeOne: "您确定要永久删除此联系人吗?\n此操作不可撤销！",
				remove: function(num) {
					return "您确定要永久删除这“" + num + "”个联系人吗?\n此操作不可撤销！"
				}
			},
			noChoice_remove: "请选择要永久删除的联系人",
			noChoice_restore: "请选择要还原的联系人",
			remove_success: "删除成功",
			restore_success: "还原成功"
		},
		noData: {
			title: "联系人回收站为空",
			tips: "回收站使用提示：",
			content: ["联系人回收站会保存您在手机上或站点上删除的联系人数据", "如果您误删了联系人数据，可在回收站内选择“还原”该联系人", "如果您想彻底删除联系人数据，可在回收站内选择联系人后“清除”该数据即可"]
		}
	},
	clearDouble: {
		title: "联系人去重",
		tips: {
			noCondition: "请选择去重条件",
			noDouble: "没有找到您联系人中的重复项",
			noCntToMerge: "您没有选择要合并的联系人"
		},
		exact: "完全匹配",
		approximate: "近似匹配",
		similar_entries: "近似条目",
		condition: {
			name: "姓名",
			ph: "电话",
			em: "邮件"
		},
		init_a: "您联系人中找到",
		init_b: "个数据重复内容",
		init_c: "的重复内容",
		init_exact: "在此过程中，这些内容会经过您同意安全的删除。",
		init_approximate: "当点击下一步时，您将有机会合并这些重复内容，以便完全控制您想要保留的详细信息",
		process_a: "重复联系人合并处理中",
		process_ba: "将合并",
		process_bb: "个近似匹配数据",
		process_c: "建议合并的重复数据内容",
		process_d: "预览合并后的结果",
		rightInfo: "这是正确的联系人信息",
		last_aa: "将从您的联系人数据中合并以下",
		last_ab: "项重复内容，点击“完成”将更改应用于联系人。",
		last_b: "请查阅将要删除和合并的联系人",
		last_ca: "将从您的联系人数据中删除下列",
		last_cb: "个重复内容",
		last_da: "将合并下列",
		last_db: "个近似匹配内容",
		finish_a: "正在处理您的联系人数据，请稍后...",
		finish_b: "正在删除完全匹配项",
		finish_c: "正在合并近似匹配项：",
		finish_d: "当前处理进度：",
		finish_e: "您的联系人重复数据已成功去除！",
		finish_f: "3秒后页面将自动跳转到蜡笔主页面，您也可以手动",
		finish_g: "点击这里跳转"
	},
	cntSel: {
		title: "选择联系人到此分组",
		cnt: "联系人",
		top_a: "（已添加",
		top_b: "人）"
	},
	dialog: {
		tips: {
			noData: "您没有与此人的对话",
			hideDialog: "收起对话",
			remove_success: "删除成功",
			confirm_remove: "您确定要将与此人的对话放到回收站吗？\n注意：与此人的对话将在手机上被删除！（黑莓手机除外）"
		},
		opName: {
			ex: "导出对话",
			remove: "删除对话"
		},
		ex_a: "请输入验证码后再导出对话",
		code: "验证码",
		code_tips: "(请输入图片中的数字)",
		code_change: "看不清换一张",
		me: "我："
	},
	tools: {
		title: "工具",
		ex_help_title: "如何将导出文件导入到以下服务："
	},
	set: {
		title: "设置",
		card: {
			title: "我的名片",
			nts: "自我介绍",
			set: "名片设置"
		},
		phone: {
			title: "我的手机",
			tips: {
				noData: {
					a: "您的帐号还没有绑定手机！请下载安装手机蜡笔后使用",
					b: "手机蜡笔是一款安装并运行在手机上的软件。没有它，我们将无法为您提供服务",
					c: "立即下载手机蜡笔>>"
				},
				brand_sel: "请选择手机品牌",
				model_sel: "请选择手机型号",
				noModelSel: "请选择您要设置的手机型号"
			},
			opName_change: "更改",
			noModel: "未知型号",
			brand: "品牌",
			model: "手机型号",
			model_a: "型号",
			model_change: "更改手机型号",
			pnum: "手机号码",
			timezone: "手机时区",
			version: "软件版本",
			remind: "站点登录提醒",
			state: "同步服务",
			sync: "同步状态",
			sync_auto: "自动同步",
			sync_manual: "手动同步",
			sync_open: "开启同步",
			sync_close: "关闭同步",
			open: "开启",
			close: "关闭",
			sms: "短信",
			contact: "联系人",
			crc: "通话记录",
			labiSet: "手机蜡笔设置",
			blackBerry: "黑莓"
		},
		account: {
			title: "帐号密码",
			password_change: "修改密码",
			email_change: "修改保密邮箱",
			data_clear: "清除帐号数据",
			button_clear: "一键清除帐号数据",
			username: "用户名",
			password: "密码",
			a: "如果不是您的帐号请点击此处",
			tips: {
				noPasswordInput: "请输入密码",
				confirm_clear: "您确定要一键清除您在蜡笔站点的所有数据吗？\n此操作不可恢复！",
				finish_a: "您在蜡笔站点的所有数据已经全部清除。\n3秒钟后页面将自动跳转到蜡笔首页，您可以手动",
				finish_b: "点击此链接跳转"
			},
			check: {
				labi_logout: "请确保您手机上的手机蜡笔软件已退出",
				data_exist: "请确保您手机上的短信、联系人数据依然存在"
			}
		},
		no_active: "此手机蜡笔未激活！",
		no_active_tips: "请打开此手机上的手机蜡笔软件“激活”后进行相关设置。"
	},
	newUser: {
		sms: {
			title: "您的帐号没有短信记录",
			opTitle: "如果您想把手机短信同步到蜡笔页面请按以下步骤操作：",
			opStep1: "1.绑定手机",
			opStep2: "2.同步数据",
			opStep1_cont_a: "立即下载手机蜡笔",
			opStep1_cont_b: "安装后按提示绑定蜡笔帐号",
			opStep2_cont: "手机功能表里打开“安装”文件夹 > 点击蜡笔图标登录，登录后您可以按照个人需求将手机数据自动同步到蜡笔页面"
		}
	},
	button: {
		value: {
			send: "发送",
			confirm: "确定",
			cancel: "取消",
			reSend: "重发失败短信",
			save: "保存",
			next: "下一步",
			back: "返回",
			skip: "跳过",
			merge: "审批",
			skipAll: "全部跳过",
			mergeAll: "全部审批",
			finish: "完成",
			ex: "导出",
			newCnt: "新建",
			addToCnt: "添加到现有",
			save_and_continue: "保存并新建",
			insert: "插入"
		}
	},
	goTop: "回到顶部",
	selectAll: "全选",
	nextPage: "下页",
	smsTips: {
		title: "蜡笔提示您：",
		a: "您有",
		b: "条新短信，点击查看"
	},
	code: {
		timeout: "验证码已超时",
		error: "您输入的数字与图片数字不符"
	},
	noName: "未命名",
	pleaseSelect: "请选择",
	please_select_group: "分组到",
	avatar_upload: "头像上传",
	tips: {
		off: "您的手机蜡笔离线，请登录手机蜡笔后使用此功能",
		op_fail: "操作失败，请稍后再试"
	},
	search_result: "搜索结果",
	a: "个",
	back: "<< 返回",
	sort: "排序",
	eachPage: "/页",
	year: "年",
	month: "月",
	day: "日"
};
var labiTips = {
	removeSmsSuccess: "成功删除1条短信",
	removeSmsFailed: "短信删除失败，请稍后再试",
	sendSmsSuccess: "短信发送成功",
	issueSmsSuccess: "短信已下发到手机蜡笔",
	sendSmsFailed: "短信发送失败，请稍后再试",
	removeSmsDlgSuccess: "删除成功",
	removeSmsDlgFailed: "删除对话失败，请稍后再试",
	addCntSuccess: "联系人新建成功",
	addCntFailed: "保存信息时出错，操作失败，请稍后再试",
	setCntSuccess: "联系人信息修改成功",
	setCntFailed: "保存信息时出错，操作失败，请稍后再试",
	removeCntSuccess: "成功删除1个联系人",
	removeCntFailed: "联系人删除失败，请稍后再试",
	removeGrpSuccess: "成功删除该分组",
	operationFailed: "操作失败，请稍后再试",
	setCardSuccess: "您的名片修改成功",
	setCardFailed: "名片修改失败，请稍后再试",
	netError: "本地网络异常，请检查后重试",
	timeoutError: "网络超时，请检查本地网络后重试",
	loading: "数据加载中…",
	cntDataLoading: "联系人数据加载中…",
	emptyRecycleFailed: "操作失败，请稍后再试",
	restoreCntsFailed: "操作失败，请稍后再试",
	setPHModelSuccess: "手机型号修改成功",
	setPHModelFailed: "手机型号修改失败，请稍后再试",
	phNotValid: "手机号格式不合法",
	emNotValid: "邮件格式不合法",
	setAvaSuccess: "头像更新成功",
	setAvaFailed: "头像更新失败，请稍后再试",
	addVirtualSmsSuccess: "虚拟短信创建成功",
	addVirtualSmsFailed: "虚拟短信创建失败",
	noEnterName: "请输入姓名",
	noEnterPnum: "请输入号码",
	noEnterMsg: "请输入短信内容",
	noSelDt: "请选择时间"
};
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n;
	var notice = {
		confirmTips: function(num) {
			if (num > 0) {
				return "您确定要删除这" + num + "条通知吗？"
			} else {
				return "您确定要删除这条通知吗？"
			}
		},
		topTips: "请选择要删除的通知",
		readTips: "请选择要标记为已读的通知",
		allReadSuccessTips: "已标记为已读",
		allReadFailTips: "标记失败，请稍候再试！",
		allDelFailTips: "删除失败，请稍候再试！"
	};
	if (!i18n.notice) {
		i18n.notice = {}
	}
	$.extend(i18n.notice, notice)
})(jQuery);

function linksClickStat(id, source) {
	if (source == undefined) {
		source = ""
	}
	var G = $.gozap,
		L = G.labi;
	var submitUrl = "/link/clickcount/update?" + G.param({
		linksId: id,
		source: source
	});
	L.ajax({
		url: submitUrl,
		success: function(info) {
			if (info.code == "9999") {} else {}
		}
	})
}

function versionStat() {
	var G = $.gozap,
		L = G.labi;
	var submitUrl = "/version/stat";
	L.ajax({
		url: submitUrl,
		type: "POST",
		data: G.param({
			version: "2.0"
		}),
		success: function(info) {
			window.location.reload();
			if (info.code == "9999") {} else {}
		}
	})
}(function($) {
	var TYPES = "broadcast,service".split(",");
	var defaults = {
		logLevel: "warn"
	};

	function GozapComet(settings) {
		$.extend(this, defaults, settings);
		this._init()
	}
	GozapComet.prototype = {
		_init: function() {
			var self = this,
				i = 0,
				IFRAME_ID = "comet_proxy_iframe",
				iframe = document.getElementById(IFRAME_ID);
			if (null == iframe) {
				$("body").append('<iframe style="display:none;" id="' + IFRAME_ID + '" src="' + self.iframeUrl + '"></iframe>');
				iframe = document.getElementById(IFRAME_ID)
			}
			this.iframe = iframe;
			if (window.attachEvent) {
				iframe.attachEvent("onload", function() {
					self.iframeOnload.call(self)
				})
			} else {
				iframe.addEventListener("load", function() {
					self.iframeOnload.call(self)
				}, false)
			}
		},
		broadcast: function(callback) {
			if (this._isReady) {
				if (this.cometd.isDisconnected()) {
					this.cometd.handshake()
				}
				this.cometd.subscribe(GozapComet.generateChannel("broadcast", this.appId), callback)
			} else {
				this.addReadyListener(function() {
					this.broadcast(callback)
				})
			}
		},
		deliver: function(callback) {
			if (this._isReady) {
				if (this.cometd.isDisconnected()) {
					this.cometd.handshake()
				}
				this.cometd.subscribe(GozapComet.generateChannel("service", this.appId), callback)
			} else {
				this.addReadyListener(function() {
					this.deliver(callback)
				})
			}
		},
		iframeOnload: function() {
			var self = this,
				iframe = self.iframe,
				cometd = iframe.contentWindow.cometd;
			self.cometd = cometd;
			cometd.configure({
				url: self.serviceUrl,
				logLevel: self.logLevel
			});
			if (!this._isReady) {
				this._isReady = true;
				if (this._onReadyArray) {
					for (var i = 0; i < this._onReadyArray.length; i++) {
						this._onReadyArray[i].call(self)
					}
				}
			}
		},
		addReadyListener: function(listener) {
			if (!listener) {
				throw new Error("invalid param: listener[" + listener + "]")
			}
			if (!this._onReadyArray) {
				this._onReadyArray = new Array()
			}
			this._onReadyArray.push(listener)
		}
	};
	$.extend(GozapComet, {
		generateChannel: function(type, appId) {
			if ($.inArray(type, TYPES) < 0) {
				throw new Error("invalid param: type")
			}
			if (null == appId || appId.indexOf("/") > -1) {
				throw new Error("invalid param: appId")
			}
			return "/" + type + "/" + appId
		}
	});
	window.GozapComet = GozapComet
})(jQuery);
var Renren = Renren || {};
if (!Renren.share) {
	Renren.share = function() {
		var isIE = navigator.userAgent.match(/(msie) ([\w.]+)/i);
		var hl = location.href.indexOf("#");
		var resUrl = (hl == -1 ? location.href : location.href.substr(0, hl));
		var shareImgs = "";
		var sl = function(str) {
			var placeholder = new Array(23).join("x");
			str = str.replace(/(https?|ftp|gopher|telnet|prospero|wais|nntp){1}:\/\/\w*[\u4E00-\u9FA5]*((?![\"| |\t|\r|\n]).)+/ig, function(match) {
				return placeholder + match.substr(171)
			}).replace(/[^\u0000-\u00ff]/g, "xx");
			return Math.ceil(str.length / 2)
		};
		var cssImport = function() {
			var static_url = "http://xnimg.cn/xnapp/share/css/v2/rrshare.css";
			var b = document.createElement("link");
			b.rel = "stylesheet";
			b.type = "text/css";
			b.href = static_url;
			(document.getElementsByTagName("head")[0] || document.body).appendChild(b)
		};
		var getShareType = function(dom) {
			return dom.getAttribute("type") || "button"
		};
		var opts = {};
		if (typeof(imgMinWidth) != "undefined") {
			opts.imgMinWidth = imgMinWidth || 60
		} else {
			opts.imgMinWidth = 60
		} if (typeof(imgMinHeight) != "undefined") {
			opts.imgMinHeight = imgMinHeight || 60
		} else {
			opts.imgMinHeight = 60
		}
		var renderShareButton = function(btn, index) {
			if (btn.rendered) {
				return
			}
			btn.paramIndex = index;
			var shareType = getShareType(btn).split("_");
			var showType = shareType[0] == "icon" ? "icon" : "button";
			var size = shareType[1] || "small";
			var shs = "xn_share_" + showType + "_" + size;
			var innerHtml = ['<span class="xn_share_wrapper ', shs, '"></span>'];
			btn.innerHTML = innerHtml.join("");
			btn.rendered = true
		};
		var postTarget = function(opts) {
			var form = document.createElement("form");
			form.action = opts.url;
			form.target = opts.target;
			form.method = "POST";
			form.acceptCharset = "UTF-8";
			for (var key in opts.params) {
				var val = opts.params[key];
				if (val !== null && val !== undefined) {
					var input = document.createElement("textarea");
					input.name = key;
					input.value = val;
					form.appendChild(input)
				}
			}
			var hidR = document.getElementById("renren-root-hidden");
			if (!hidR) {
				hidR = document.createElement("div"), syl = hidR.style;
				syl.positon = "absolute";
				syl.top = "-10000px";
				syl.width = syl.height = "0px";
				hidR.id = "renren-root-hidden";
				(document.body || document.getElementsByTagName("body")[0]).appendChild(hidR)
			}
			hidR.appendChild(form);
			try {
				var cst = null;
				if (isIE && document.charset.toUpperCase() != "UTF-8") {
					cst = document.charset;
					document.charset = "UTF-8"
				}
				form.submit()
			} finally {
				form.parentNode.removeChild(form);
				if (cst) {
					document.charset = cst
				}
			}
		};
		var getCharSet = function() {
			if (document.charset) {
				return document.charset.toUpperCase()
			} else {
				var metas = document.getElementsByTagName("meta");
				for (var i = 0; i < metas.length; i++) {
					var meta = metas[i];
					var metaCharset = meta.getAttribute("charset");
					if (metaCharset) {
						return meta.getAttribute("charset")
					}
					var metaContent = meta.getAttribute("content");
					if (metaContent) {
						var contenxt = metaContent.toLowerCase();
						var begin = contenxt.indexOf("charset=");
						if (begin != -1) {
							var end = contenxt.indexOf(";", begin + "charset=".length);
							if (end != -1) {
								return contenxt.substring(begin + "charset=".length, end)
							}
							return contenxt.substring(begin + "charset=".length)
						}
					}
				}
			}
			return ""
		};
		var charset = getCharSet();
		var getParam = function(param) {
			param = param || {};
			param.api_key = param.api_key || "";
			param.resourceUrl = param.resourceUrl || resUrl;
			param.title = param.title || "";
			param.pic = param.pic || "";
			param.description = param.description || "";
			if (resUrl == param.resourceUrl) {
				param.images = param.images || shareImgs
			}
			param.charset = param.charset || charset || "";
			return param
		};
		var onclick = function(data) {
			var submitUrl = "http://widget.renren.com/dialog/share";
			var p = getParam(data);
			var prm = [];
			for (var i in p) {
				if (p[i]) {
					prm.push(i + "=" + encodeURIComponent(p[i]))
				}
			}
			var url = submitUrl + "?" + prm.join("&"),
				maxLgh = (isIE ? 2048 : 4100),
				wa = "width=700,height=650,left=0,top=0,resizable=yes,scrollbars=1";
			if (url.length > maxLgh) {
				window.open("about:blank", "fwd", wa);
				postTarget({
					url: submitUrl,
					target: "fwd",
					params: p
				})
			} else {
				window.open(url, "fwd", wa)
			}
			return false
		};
		window.rrShareOnclick = onclick;
		var init = function() {
			if (Renren.share.isReady || document.readyState !== "complete") {
				return
			}
			var imgs = document.getElementsByTagName("img"),
				imga = [];
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].width >= opts.imgMinWidth && imgs[i].height >= opts.imgMinHeight) {
					imga.push(imgs[i].src)
				}
			}
			window.rrShareImgs = imga;
			if (imga.length > 0) {
				shareImgs = imga.join("|")
			}
			if (document.addEventListener) {
				document.removeEventListener("DOMContentLoaded", init, false)
			} else {
				document.detachEvent("onreadystatechange", init)
			}
			cssImport();
			var shareBtn = document.getElementsByName("xn_share");
			var len = shareBtn ? shareBtn.length : 0;
			for (var b = 0; b < len; b++) {
				var a = shareBtn[b];
				renderShareButton(a, b)
			}
			Renren.share.isReady = true
		};
		if (document.readyState === "complete") {
			init()
		} else {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", init, false);
				window.addEventListener("load", init, false)
			} else {
				document.attachEvent("onreadystatechange", init);
				window.attachEvent("onload", init)
			}
		}
	};
	Renren.share()
}
var hex_chr = "0123456789abcdef";

function rhex(num) {
	str = "";
	for (j = 0; j <= 3; j++) {
		str += hex_chr.charAt((num >> (j * 8 + 4)) & 15) + hex_chr.charAt((num >> (j * 8)) & 15)
	}
	return str
}

function str2blks_MD5(str) {
	nblk = ((str.length + 8) >> 6) + 1;
	blks = new Array(nblk * 16);
	for (i = 0; i < nblk * 16; i++) {
		blks[i] = 0
	}
	for (i = 0; i < str.length; i++) {
		blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8)
	}
	blks[i >> 2] |= 128 << ((i % 4) * 8);
	blks[nblk * 16 - 2] = str.length * 8;
	return blks
}

function add(x, y) {
	var lsw = (x & 65535) + (y & 65535);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 65535)
}

function rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt))
}

function cmn(q, a, b, x, s, t) {
	return add(rol(add(add(a, q), add(x, t)), s), b)
}

function ff(a, b, c, d, x, s, t) {
	return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function gg(a, b, c, d, x, s, t) {
	return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function hh(a, b, c, d, x, s, t) {
	return cmn(b ^ c ^ d, a, b, x, s, t)
}

function ii(a, b, c, d, x, s, t) {
	return cmn(c ^ (b | (~d)), a, b, x, s, t)
}

function MD5(str) {
	x = str2blks_MD5(str);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	for (i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		a = ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i + 10], 17, -42063);
		b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
		a = gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
		a = hh(a, b, c, d, x[i + 5], 4, -378558);
		d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = hh(b, c, d, a, x[i + 2], 23, -995338651);
		a = ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = ii(b, c, d, a, x[i + 9], 21, -343485551);
		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd)
	}
	return rhex(a) + rhex(b) + rhex(c) + rhex(d)
};