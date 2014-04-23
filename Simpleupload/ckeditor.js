/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */
(function() {
    if (!window.CKEDITOR || !window.CKEDITOR.dom)
        window.CKEDITOR || (window.CKEDITOR = function() {
            var d = {timestamp: "E2BK", version: "4.3.4 DEV", revision: "0", rnd: Math.floor(900 * Math.random()) + 100, _: {pending: []}, status: "unloaded", basePath: function() {
                    var a = window.CKEDITOR_BASEPATH || "";
                    if (!a)
                        for (var b = document.getElementsByTagName("script"), f = 0; f < b.length; f++) {
                            var c = b[f].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                            if (c) {
                                a = c[1];
                                break
                            }
                        }
                    -1 == a.indexOf(":/") && "//" != a.slice(0, 2) &&
                            (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a);
                    if (!a)
                        throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                    return a
                }(), getUrl: function(a) {
                    -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                    this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                    return a
                }, domReady: function() {
                    function a() {
                        try {
                            document.addEventListener ?
                                    (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                        } catch (f) {
                        }
                    }
                    function b() {
                        for (var b; b = f.shift(); )
                            b()
                    }
                    var f = [];
                    return function(b) {
                        f.push(b);
                        "complete" === document.readyState && setTimeout(a, 1);
                        if (1 == f.length)
                            if (document.addEventListener)
                                document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                            else if (document.attachEvent) {
                                document.attachEvent("onreadystatechange",
                                        a);
                                window.attachEvent("onload", a);
                                b = !1;
                                try {
                                    b = !window.frameElement
                                } catch (c) {
                                }
                                if (document.documentElement.doScroll && b) {
                                    var d = function() {
                                        try {
                                            document.documentElement.doScroll("left")
                                        } catch (b) {
                                            setTimeout(d, 1);
                                            return
                                        }
                                        a()
                                    };
                                    d()
                                }
                            }
                    }
                }()}, e = window.CKEDITOR_GETURL;
            if (e) {
                var c = d.getUrl;
                d.getUrl = function(a) {
                    return e.call(d, a) || c.call(d, a)
                }
            }
            return d
        }()), CKEDITOR.event || (CKEDITOR.event = function() {
        }, CKEDITOR.event.implementOn = function(d) {
            var e = CKEDITOR.event.prototype, c;
            for (c in e)
                d[c] == void 0 && (d[c] = e[c])
        }, CKEDITOR.event.prototype =
                function() {
                    function d(a) {
                        var b = e(this);
                        return b[a] || (b[a] = new c(a))
                    }
                    var e = function(a) {
                        a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                        return a.events || (a.events = {})
                    }, c = function(a) {
                        this.name = a;
                        this.listeners = []
                    };
                    c.prototype = {getListenerIndex: function(a) {
                            for (var b = 0, f = this.listeners; b < f.length; b++)
                                if (f[b].fn == a)
                                    return b;
                            return-1
                        }};
                    return{define: function(a, b) {
                            var f = d.call(this, a);
                            CKEDITOR.tools.extend(f, b, true)
                        }, on: function(a, b, f, c, k) {
                            function g(d, j, g, k) {
                                d = {name: a, sender: this, editor: d, data: j, listenerData: c,
                                    stop: g, cancel: k, removeListener: e};
                                return b.call(f, d) === false ? false : d.data
                            }
                            function e() {
                                m.removeListener(a, b)
                            }
                            var j = d.call(this, a);
                            if (j.getListenerIndex(b) < 0) {
                                j = j.listeners;
                                f || (f = this);
                                isNaN(k) && (k = 10);
                                var m = this;
                                g.fn = b;
                                g.priority = k;
                                for (var n = j.length - 1; n >= 0; n--)
                                    if (j[n].priority <= k) {
                                        j.splice(n + 1, 0, g);
                                        return{removeListener: e}
                                    }
                                j.unshift(g)
                            }
                            return{removeListener: e}
                        }, once: function() {
                            var a = arguments[1];
                            arguments[1] = function(b) {
                                b.removeListener();
                                return a.apply(this, arguments)
                            };
                            return this.on.apply(this,
                                    arguments)
                        }, capture: function() {
                            CKEDITOR.event.useCapture = 1;
                            var a = this.on.apply(this, arguments);
                            CKEDITOR.event.useCapture = 0;
                            return a
                        }, fire: function() {
                            var a = 0, b = function() {
                                a = 1
                            }, f = 0, c = function() {
                                f = 1
                            };
                            return function(d, g, i) {
                                var j = e(this)[d], d = a, m = f;
                                a = f = 0;
                                if (j) {
                                    var n = j.listeners;
                                    if (n.length)
                                        for (var n = n.slice(0), q, o = 0; o < n.length; o++) {
                                            if (j.errorProof)
                                                try {
                                                    q = n[o].call(this, i, g, b, c)
                                                } catch (l) {
                                                }
                                            else
                                                q = n[o].call(this, i, g, b, c);
                                            q === false ? f = 1 : typeof q != "undefined" && (g = q);
                                            if (a || f)
                                                break
                                        }
                                }
                                g = f ? false : typeof g == "undefined" ?
                                        true : g;
                                a = d;
                                f = m;
                                return g
                            }
                        }(), fireOnce: function(a, b, f) {
                            b = this.fire(a, b, f);
                            delete e(this)[a];
                            return b
                        }, removeListener: function(a, b) {
                            var f = e(this)[a];
                            if (f) {
                                var c = f.getListenerIndex(b);
                                c >= 0 && f.listeners.splice(c, 1)
                            }
                        }, removeAllListeners: function() {
                            var a = e(this), b;
                            for (b in a)
                                delete a[b]
                        }, hasListeners: function(a) {
                            return(a = e(this)[a]) && a.listeners.length > 0
                        }}
                }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
            CKEDITOR._.pending.push([this, arguments]);
            CKEDITOR.event.call(this)
        }, CKEDITOR.editor.prototype.fire =
                function(d, e) {
                    d in{instanceReady: 1, loaded: 1} && (this[d] = true);
                    return CKEDITOR.event.prototype.fire.call(this, d, e, this)
                }, CKEDITOR.editor.prototype.fireOnce = function(d, e) {
            d in{instanceReady: 1, loaded: 1} && (this[d] = true);
            return CKEDITOR.event.prototype.fireOnce.call(this, d, e, this)
        }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
            var d = navigator.userAgent.toLowerCase(), e = window.opera, c = {ie: d.indexOf("trident/") > -1, opera: !!e && e.version, webkit: d.indexOf(" applewebkit/") >
                        -1, air: d.indexOf(" adobeair/") > -1, mac: d.indexOf("macintosh") > -1, quirks: document.compatMode == "BackCompat" && (!document.documentMode || document.documentMode < 10), mobile: d.indexOf("mobile") > -1, iOS: /(ipad|iphone|ipod)/.test(d), isCustomDomain: function() {
                    if (!this.ie)
                        return false;
                    var b = document.domain, a = window.location.hostname;
                    return b != a && b != "[" + a + "]"
                }, secure: location.protocol == "https:"};
            c.gecko = navigator.product == "Gecko" && !c.webkit && !c.opera && !c.ie;
            if (c.webkit)
                d.indexOf("chrome") > -1 ? c.chrome = true : c.safari =
                        true;
            var a = 0;
            if (c.ie) {
                a = c.quirks || !document.documentMode ? parseFloat(d.match(/msie (\d+)/)[1]) : document.documentMode;
                c.ie9Compat = a == 9;
                c.ie8Compat = a == 8;
                c.ie7Compat = a == 7;
                c.ie6Compat = a < 7 || c.quirks
            }
            if (c.gecko) {
                var b = d.match(/rv:([\d\.]+)/);
                if (b) {
                    b = b[1].split(".");
                    a = b[0] * 1E4 + (b[1] || 0) * 100 + (b[2] || 0) * 1
                }
            }
            c.opera && (a = parseFloat(e.version()));
            c.air && (a = parseFloat(d.match(/ adobeair\/(\d+)/)[1]));
            c.webkit && (a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1]));
            c.version = a;
            c.isCompatible = c.iOS && a >= 534 || !c.mobile &&
                    (c.ie && a > 6 || c.gecko && a >= 10801 || c.opera && a >= 9.5 || c.air && a >= 1 || c.webkit && a >= 522 || false);
            c.hidpi = window.devicePixelRatio >= 2;
            c.needsBrFiller = c.gecko || c.webkit || c.ie && a > 10;
            c.needsNbspFiller = c.ie && a < 11;
            c.cssClass = "cke_browser_" + (c.ie ? "ie" : c.gecko ? "gecko" : c.opera ? "opera" : c.webkit ? "webkit" : "unknown");
            if (c.quirks)
                c.cssClass = c.cssClass + " cke_browser_quirks";
            if (c.ie) {
                c.cssClass = c.cssClass + (" cke_browser_ie" + (c.quirks || c.version < 7 ? "6" : c.version));
                if (c.quirks)
                    c.cssClass = c.cssClass + " cke_browser_iequirks"
            }
            if (c.gecko)
                if (a <
                        10900)
                    c.cssClass = c.cssClass + " cke_browser_gecko18";
                else if (a <= 11E3)
                    c.cssClass = c.cssClass + " cke_browser_gecko19";
            if (c.air)
                c.cssClass = c.cssClass + " cke_browser_air";
            if (c.iOS)
                c.cssClass = c.cssClass + " cke_browser_ios";
            if (c.hidpi)
                c.cssClass = c.cssClass + " cke_hidpi";
            return c
        }()), "unloaded" == CKEDITOR.status && function() {
            CKEDITOR.event.implementOn(CKEDITOR);
            CKEDITOR.loadFullCore = function() {
                if (CKEDITOR.status != "basic_ready")
                    CKEDITOR.loadFullCore._load = 1;
                else {
                    delete CKEDITOR.loadFullCore;
                    var d = document.createElement("script");
                    d.type = "text/javascript";
                    d.src = CKEDITOR.basePath + "ckeditor.js";
                    document.getElementsByTagName("head")[0].appendChild(d)
                }
            };
            CKEDITOR.loadFullCoreTimeout = 0;
            CKEDITOR.add = function(d) {
                (this._.pending || (this._.pending = [])).push(d)
            };
            (function() {
                CKEDITOR.domReady(function() {
                    var d = CKEDITOR.loadFullCore, e = CKEDITOR.loadFullCoreTimeout;
                    if (d) {
                        CKEDITOR.status = "basic_ready";
                        d && d._load ? d() : e && setTimeout(function() {
                            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                        }, e * 1E3)
                    }
                })
            })();
            CKEDITOR.status = "basic_loaded"
        }(), CKEDITOR.dom =
                {}, function() {
            var d = [], e = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
            CKEDITOR.on("reset", function() {
                d = []
            });
            CKEDITOR.tools = {arrayCompare: function(c, a) {
                    if (!c && !a)
                        return true;
                    if (!c || !a || c.length != a.length)
                        return false;
                    for (var b = 0; b < c.length; b++)
                        if (c[b] != a[b])
                            return false;
                    return true
                }, clone: function(c) {
                    var a;
                    if (c && c instanceof Array) {
                        a = [];
                        for (var b = 0; b < c.length; b++)
                            a[b] = CKEDITOR.tools.clone(c[b]);
                        return a
                    }
                    if (c === null || typeof c != "object" ||
                            c instanceof String || c instanceof Number || c instanceof Boolean || c instanceof Date || c instanceof RegExp)
                        return c;
                    a = new c.constructor;
                    for (b in c)
                        a[b] = CKEDITOR.tools.clone(c[b]);
                    return a
                }, capitalize: function(c, a) {
                    return c.charAt(0).toUpperCase() + (a ? c.slice(1) : c.slice(1).toLowerCase())
                }, extend: function(c) {
                    var a = arguments.length, b, f;
                    if (typeof (b = arguments[a - 1]) == "boolean")
                        a--;
                    else if (typeof (b = arguments[a - 2]) == "boolean") {
                        f = arguments[a - 1];
                        a = a - 2
                    }
                    for (var d = 1; d < a; d++) {
                        var k = arguments[d], g;
                        for (g in k)
                            if (b ===
                                    true || c[g] == void 0)
                                if (!f || g in f)
                                    c[g] = k[g]
                    }
                    return c
                }, prototypedCopy: function(c) {
                    var a = function() {
                    };
                    a.prototype = c;
                    return new a
                }, copy: function(c) {
                    var a = {}, b;
                    for (b in c)
                        a[b] = c[b];
                    return a
                }, isArray: function(c) {
                    return Object.prototype.toString.call(c) == "[object Array]"
                }, isEmpty: function(c) {
                    for (var a in c)
                        if (c.hasOwnProperty(a))
                            return false;
                    return true
                }, cssVendorPrefix: function(c, a, b) {
                    if (b)
                        return e + c + ":" + a + ";" + c + ":" + a;
                    b = {};
                    b[c] = a;
                    b[e + c] = a;
                    return b
                }, cssStyleToDomStyle: function() {
                    var c = document.createElement("div").style,
                            a = typeof c.cssFloat != "undefined" ? "cssFloat" : typeof c.styleFloat != "undefined" ? "styleFloat" : "float";
                    return function(b) {
                        return b == "float" ? a : b.replace(/-./g, function(b) {
                            return b.substr(1).toUpperCase()
                        })
                    }
                }(), buildStyleHtml: function(c) {
                    for (var c = [].concat(c), a, b = [], f = 0; f < c.length; f++)
                        if (a = c[f]) / @import | [{}] / .test(a) ? b.push("<style>" + a + "</style>") : b.push('<link type="text/css" rel=stylesheet href="' + a + '">');
                    return b.join("")
                }, htmlEncode: function(c) {
                    return("" + c).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g,
                            "&lt;")
                }, htmlEncodeAttr: function(c) {
                    return c.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }, htmlDecodeAttr: function(c) {
                    return c.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                }, getNextNumber: function() {
                    var c = 0;
                    return function() {
                        return++c
                    }
                }(), getNextId: function() {
                    return"cke_" + this.getNextNumber()
                }, override: function(c, a) {
                    var b = a(c);
                    b.prototype = c.prototype;
                    return b
                }, setTimeout: function(c, a, b, f, d) {
                    d || (d = window);
                    b || (b = d);
                    return d.setTimeout(function() {
                        f ? c.apply(b, [].concat(f)) :
                                c.apply(b)
                    }, a || 0)
                }, trim: function() {
                    var c = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                    return function(a) {
                        return a.replace(c, "")
                    }
                }(), ltrim: function() {
                    var c = /^[ \t\n\r]+/g;
                    return function(a) {
                        return a.replace(c, "")
                    }
                }(), rtrim: function() {
                    var c = /[ \t\n\r]+$/g;
                    return function(a) {
                        return a.replace(c, "")
                    }
                }(), indexOf: function(c, a) {
                    if (typeof a == "function")
                        for (var b = 0, f = c.length; b < f; b++) {
                            if (a(c[b]))
                                return b
                        }
                    else {
                        if (c.indexOf)
                            return c.indexOf(a);
                        b = 0;
                        for (f = c.length; b < f; b++)
                            if (c[b] === a)
                                return b
                    }
                    return-1
                }, search: function(c,
                        a) {
                    var b = CKEDITOR.tools.indexOf(c, a);
                    return b >= 0 ? c[b] : null
                }, bind: function(c, a) {
                    return function() {
                        return c.apply(a, arguments)
                    }
                }, createClass: function(c) {
                    var a = c.$, b = c.base, f = c.privates || c._, d = c.proto, c = c.statics;
                    !a && (a = function() {
                        b && this.base.apply(this, arguments)
                    });
                    if (f)
                        var k = a, a = function() {
                        var b = this._ || (this._ = {}), a;
                        for (a in f) {
                            var c = f[a];
                            b[a] = typeof c == "function" ? CKEDITOR.tools.bind(c, this) : c
                        }
                        k.apply(this, arguments)
                    };
                    if (b) {
                        a.prototype = this.prototypedCopy(b.prototype);
                        a.prototype.constructor = a;
                        a.base =
                                b;
                        a.baseProto = b.prototype;
                        a.prototype.base = function() {
                            this.base = b.prototype.base;
                            b.apply(this, arguments);
                            this.base = arguments.callee
                        }
                    }
                    d && this.extend(a.prototype, d, true);
                    c && this.extend(a, c, true);
                    return a
                }, addFunction: function(c, a) {
                    return d.push(function() {
                        return c.apply(a || this, arguments)
                    }) - 1
                }, removeFunction: function(c) {
                    d[c] = null
                }, callFunction: function(c) {
                    var a = d[c];
                    return a && a.apply(window, Array.prototype.slice.call(arguments, 1))
                }, cssLength: function() {
                    var c = /^-?\d+\.?\d*px$/, a;
                    return function(b) {
                        a =
                                CKEDITOR.tools.trim(b + "") + "px";
                        return c.test(a) ? a : b || ""
                    }
                }(), convertToPx: function() {
                    var c;
                    return function(a) {
                        if (!c) {
                            c = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                            CKEDITOR.document.getBody().append(c)
                        }
                        if (!/%$/.test(a)) {
                            c.setStyle("width", a);
                            return c.$.clientWidth
                        }
                        return a
                    }
                }(), repeat: function(c, a) {
                    return Array(a + 1).join(c)
                }, tryThese: function() {
                    for (var c, a = 0, b = arguments.length; a < b; a++) {
                        var f =
                                arguments[a];
                        try {
                            c = f();
                            break
                        } catch (d) {
                        }
                    }
                    return c
                }, genKey: function() {
                    return Array.prototype.slice.call(arguments).join("-")
                }, defer: function(c) {
                    return function() {
                        var a = arguments, b = this;
                        window.setTimeout(function() {
                            c.apply(b, a)
                        }, 0)
                    }
                }, normalizeCssText: function(c, a) {
                    var b = [], f, d = CKEDITOR.tools.parseCssText(c, true, a);
                    for (f in d)
                        b.push(f + ":" + d[f]);
                    b.sort();
                    return b.length ? b.join(";") + ";" : ""
                }, convertRgbToHex: function(c) {
                    return c.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, f, c) {
                        a =
                                [b, f, c];
                        for (b = 0; b < 3; b++)
                            a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                        return"#" + a.join("")
                    })
                }, parseCssText: function(c, a, b) {
                    var f = {};
                    if (b) {
                        b = new CKEDITOR.dom.element("span");
                        b.setAttribute("style", c);
                        c = CKEDITOR.tools.convertRgbToHex(b.getAttribute("style") || "")
                    }
                    if (!c || c == ";")
                        return f;
                    c.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(b, c, d) {
                        if (a) {
                            c = c.toLowerCase();
                            c == "font-family" && (d = d.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                            d = CKEDITOR.tools.trim(d)
                        }
                        f[c] =
                        d
                    });
                    return f
                }, writeCssText: function(c, a) {
                    var b, f = [];
                    for (b in c)
                        f.push(b + ":" + c[b]);
                    a && f.sort();
                    return f.join("; ")
                }, objectCompare: function(c, a, b) {
                    var f;
                    if (!c && !a)
                        return true;
                    if (!c || !a)
                        return false;
                    for (f in c)
                        if (c[f] != a[f])
                            return false;
                    if (!b)
                        for (f in a)
                            if (c[f] != a[f])
                                return false;
                    return true
                }, objectKeys: function(c) {
                    var a = [], b;
                    for (b in c)
                        a.push(b);
                    return a
                }, convertArrayToObject: function(c, a) {
                    var b = {};
                    arguments.length == 1 && (a = true);
                    for (var f = 0, d = c.length; f < d; ++f)
                        b[c[f]] = a;
                    return b
                }, fixDomain: function() {
                    for (var c; ; )
                        try {
                            c =
                                    window.parent.document.domain;
                            break
                        } catch (a) {
                            c = c ? c.replace(/.+?(?:\.|$)/, "") : document.domain;
                            if (!c)
                                break;
                            document.domain = c
                        }
                    return!!c
                }, eventsBuffer: function(c, a) {
                    function b() {
                        d = (new Date).getTime();
                        f = false;
                        a()
                    }
                    var f, d = 0;
                    return{input: function() {
                            if (!f) {
                                var a = (new Date).getTime() - d;
                                a < c ? f = setTimeout(b, c - a) : b()
                            }
                        }, reset: function() {
                            f && clearTimeout(f);
                            f = d = 0
                        }}
                }, enableHtml5Elements: function(c, a) {
                    for (var b = ["abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer",
                        "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video"], f = b.length, d; f--; ) {
                        d = c.createElement(b[f]);
                        a && c.appendChild(d)
                    }
                }}
        }(), CKEDITOR.dtd = function() {
            var d = CKEDITOR.tools.extend, e = function(b, a) {
                for (var f = CKEDITOR.tools.clone(b), c = 1; c < arguments.length; c++) {
                    var a = arguments[c], d;
                    for (d in a)
                        delete f[d]
                }
                return f
            }, c = {}, a = {}, b = {address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1,
                hr: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1}, f = {command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1}, h = {}, k = {"#": 1}, g = {center: 1, dir: 1, noframes: 1};
            d(c, {a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1,
                "var": 1, video: 1, wbr: 1}, k, {acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1});
            d(a, b, c, g);
            e = {a: e(c, {a: 1, button: 1}), abbr: c, address: a, area: h, article: d({style: 1}, a), aside: d({style: 1}, a), audio: d({source: 1, track: 1}, a), b: c, base: h, bdi: c, bdo: c, blockquote: a, body: a, br: h, button: e(c, {a: 1, button: 1}), canvas: c, caption: a, cite: c, code: c, col: h, colgroup: {col: 1}, command: h, datalist: d({option: 1}, c), dd: a, del: c, details: d({summary: 1}, a), dfn: c, div: d({style: 1}, a), dl: {dt: 1, dd: 1}, dt: a, em: c, embed: h, fieldset: d({legend: 1},
                a), figcaption: a, figure: d({figcaption: 1}, a), footer: a, form: a, h1: c, h2: c, h3: c, h4: c, h5: c, h6: c, head: d({title: 1, base: 1}, f), header: a, hgroup: {h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, hr: h, html: d({head: 1, body: 1}, a, f), i: c, iframe: k, img: h, input: h, ins: c, kbd: c, keygen: h, label: c, legend: c, li: a, link: h, map: a, mark: c, menu: d({li: 1}, a), meta: h, meter: e(c, {meter: 1}), nav: a, noscript: d({link: 1, meta: 1, style: 1}, c), object: d({param: 1}, c), ol: {li: 1}, optgroup: {option: 1}, option: k, output: c, p: c, param: h, pre: c, progress: e(c, {progress: 1}), q: c, rp: c, rt: c,
                ruby: d({rp: 1, rt: 1}, c), s: c, samp: c, script: k, section: d({style: 1}, a), select: {optgroup: 1, option: 1}, small: c, source: h, span: c, strong: c, style: k, sub: c, summary: c, sup: c, table: {caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1}, tbody: {tr: 1}, td: a, textarea: k, tfoot: {tr: 1}, th: a, thead: {tr: 1}, time: e(c, {time: 1}), title: k, tr: {th: 1, td: 1}, track: h, u: c, ul: {li: 1}, "var": c, video: d({source: 1, track: 1}, a), wbr: h, acronym: c, applet: d({param: 1}, a), basefont: h, big: c, center: a, dialog: h, dir: {li: 1}, font: c, isindex: h, noframes: a, strike: c, tt: c};
            d(e, {$block: d({audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1}, b, g), $blockLimit: {article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1}, $cdata: {script: 1, style: 1}, $editable: {address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, nav: 1, p: 1, pre: 1, section: 1}, $empty: {area: 1,
                    base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1}, $inline: c, $list: {dl: 1, ol: 1, ul: 1}, $listItem: {dd: 1, dt: 1, li: 1}, $nonBodyContent: d({body: 1, head: 1, html: 1}, e.head), $nonEditable: {applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1}, $object: {applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1}, $removeEmpty: {abbr: 1, acronym: 1,
                    b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1}, $tabIndex: {a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1}, $tableContent: {caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1}, $transparent: {a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1}, $intermediate: {caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1,
                    li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1}});
            return e
        }(), CKEDITOR.dom.event = function(d) {
            this.$ = d
        }, CKEDITOR.dom.event.prototype = {getKey: function() {
                return this.$.keyCode || this.$.which
            }, getKeystroke: function() {
                var d = this.getKey();
                if (this.$.ctrlKey || this.$.metaKey)
                    d = d + CKEDITOR.CTRL;
                this.$.shiftKey && (d = d + CKEDITOR.SHIFT);
                this.$.altKey && (d = d + CKEDITOR.ALT);
                return d
            }, preventDefault: function(d) {
                var e = this.$;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                d &&
                        this.stopPropagation()
            }, stopPropagation: function() {
                var d = this.$;
                d.stopPropagation ? d.stopPropagation() : d.cancelBubble = true
            }, getTarget: function() {
                var d = this.$.target || this.$.srcElement;
                return d ? new CKEDITOR.dom.node(d) : null
            }, getPhase: function() {
                return this.$.eventPhase || 2
            }, getPageOffset: function() {
                var d = this.getTarget().getDocument().$;
                return{x: this.$.pageX || this.$.clientX + (d.documentElement.scrollLeft || d.body.scrollLeft), y: this.$.pageY || this.$.clientY + (d.documentElement.scrollTop || d.body.scrollTop)}
            }},
        CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(d) {
            if (d)
                this.$ = d
        }, CKEDITOR.dom.domObject.prototype = function() {
            var d = function(d, c) {
                return function(a) {
                    typeof CKEDITOR != "undefined" && d.fire(c, new CKEDITOR.dom.event(a))
                }
            };
            return{getPrivate: function() {
                    var d;
                    if (!(d = this.getCustomData("_")))
                        this.setCustomData("_", d = {});
                    return d
                }, on: function(e) {
                    var c = this.getCustomData("_cke_nativeListeners");
                    if (!c) {
                        c = {};
                        this.setCustomData("_cke_nativeListeners", c)
                    }
                    if (!c[e]) {
                        c = c[e] = d(this, e);
                        this.$.addEventListener ? this.$.addEventListener(e, c, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, c)
                    }
                    return CKEDITOR.event.prototype.on.apply(this, arguments)
                }, removeListener: function(d) {
                    CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                    if (!this.hasListeners(d)) {
                        var c = this.getCustomData("_cke_nativeListeners"), a = c && c[d];
                        if (a) {
                            this.$.removeEventListener ? this.$.removeEventListener(d,
                                    a, false) : this.$.detachEvent && this.$.detachEvent("on" + d, a);
                            delete c[d]
                        }
                    }
                }, removeAllListeners: function() {
                    var d = this.getCustomData("_cke_nativeListeners"), c;
                    for (c in d) {
                        var a = d[c];
                        this.$.detachEvent ? this.$.detachEvent("on" + c, a) : this.$.removeEventListener && this.$.removeEventListener(c, a, false);
                        delete d[c]
                    }
                    CKEDITOR.event.prototype.removeAllListeners.call(this)
                }}
        }(), function(d) {
            var e = {};
            CKEDITOR.on("reset", function() {
                e = {}
            });
            d.equals = function(c) {
                try {
                    return c && c.$ === this.$
                } catch (a) {
                    return false
                }
            };
            d.setCustomData =
                    function(c, a) {
                        var b = this.getUniqueId();
                        (e[b] || (e[b] = {}))[c] = a;
                        return this
                    };
            d.getCustomData = function(c) {
                var a = this.$["data-cke-expando"];
                return(a = a && e[a]) && c in a ? a[c] : null
            };
            d.removeCustomData = function(c) {
                var a = this.$["data-cke-expando"], a = a && e[a], b, f;
                if (a) {
                    b = a[c];
                    f = c in a;
                    delete a[c]
                }
                return f ? b : null
            };
            d.clearCustomData = function() {
                this.removeAllListeners();
                var c = this.$["data-cke-expando"];
                c && delete e[c]
            };
            d.getUniqueId = function() {
                return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
            };
            CKEDITOR.event.implementOn(d)
        }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(d) {
            return d ? new CKEDITOR.dom[d.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : d.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : d.nodeType == CKEDITOR.NODE_TEXT ? "text" : d.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](d) : this
        }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT =
                3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {appendTo: function(d, e) {
                        d.append(this, e);
                        return d
                    }, clone: function(d, e) {
                        var c = this.$.cloneNode(d), a = function(b) {
                            b["data-cke-expando"] && (b["data-cke-expando"] = false);
                            if (b.nodeType == CKEDITOR.NODE_ELEMENT) {
                                e ||
                                        b.removeAttribute("id", false);
                                if (d)
                                    for (var b = b.childNodes, f = 0; f < b.length; f++)
                                        a(b[f])
                            }
                        };
                        a(c);
                        return new CKEDITOR.dom.node(c)
                    }, hasPrevious: function() {
                        return!!this.$.previousSibling
                    }, hasNext: function() {
                        return!!this.$.nextSibling
                    }, insertAfter: function(d) {
                        d.$.parentNode.insertBefore(this.$, d.$.nextSibling);
                        return d
                    }, insertBefore: function(d) {
                        d.$.parentNode.insertBefore(this.$, d.$);
                        return d
                    }, insertBeforeMe: function(d) {
                        this.$.parentNode.insertBefore(d.$, this.$);
                        return d
                    }, getAddress: function(d) {
                        for (var e =
                        [], c = this.getDocument().$.documentElement, a = this.$; a && a != c; ) {
                            var b = a.parentNode;
                            b && e.unshift(this.getIndex.call({$: a}, d));
                            a = b
                        }
                        return e
                    }, getDocument: function() {
                        return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
                    }, getIndex: function(d) {
                        var e = this.$, c = -1, a;
                        if (!this.$.parentNode)
                            return c;
                        do
                            if (!d || !(e != this.$ && e.nodeType == CKEDITOR.NODE_TEXT && (a || !e.nodeValue))) {
                                c++;
                                a = e.nodeType == CKEDITOR.NODE_TEXT
                            }
                        while (e = e.previousSibling);
                        return c
                    }, getNextSourceNode: function(d, e, c) {
                        if (c &&
                                !c.call)
                            var a = c, c = function(b) {
                            return!b.equals(a)
                        };
                        var d = !d && this.getFirst && this.getFirst(), b;
                        if (!d) {
                            if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, true) === false)
                                return null;
                            d = this.getNext()
                        }
                        for (; !d && (b = (b || this).getParent()); ) {
                            if (c && c(b, true) === false)
                                return null;
                            d = b.getNext()
                        }
                        return!d || c && c(d) === false ? null : e && e != d.type ? d.getNextSourceNode(false, e, c) : d
                    }, getPreviousSourceNode: function(d, e, c) {
                        if (c && !c.call)
                            var a = c, c = function(b) {
                            return!b.equals(a)
                        };
                        var d = !d && this.getLast && this.getLast(), b;
                        if (!d) {
                            if (this.type ==
                                    CKEDITOR.NODE_ELEMENT && c && c(this, true) === false)
                                return null;
                            d = this.getPrevious()
                        }
                        for (; !d && (b = (b || this).getParent()); ) {
                            if (c && c(b, true) === false)
                                return null;
                            d = b.getPrevious()
                        }
                        return!d || c && c(d) === false ? null : e && d.type != e ? d.getPreviousSourceNode(false, e, c) : d
                    }, getPrevious: function(d) {
                        var e = this.$, c;
                        do
                            c = (e = e.previousSibling) && e.nodeType != 10 && new CKEDITOR.dom.node(e);
                        while (c && d && !d(c));
                        return c
                    }, getNext: function(d) {
                        var e = this.$, c;
                        do
                            c = (e = e.nextSibling) && new CKEDITOR.dom.node(e);
                        while (c && d && !d(c));
                        return c
                    },
                    getParent: function(d) {
                        var e = this.$.parentNode;
                        return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || d && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null
                    }, getParents: function(d) {
                        var e = this, c = [];
                        do
                            c[d ? "push" : "unshift"](e);
                        while (e = e.getParent());
                        return c
                    }, getCommonAncestor: function(d) {
                        if (d.equals(this))
                            return this;
                        if (d.contains && d.contains(this))
                            return d;
                        var e = this.contains ? this : this.getParent();
                        do
                            if (e.contains(d))
                                return e;
                        while (e = e.getParent());
                        return null
                    }, getPosition: function(d) {
                        var e =
                                this.$, c = d.$;
                        if (e.compareDocumentPosition)
                            return e.compareDocumentPosition(c);
                        if (e == c)
                            return CKEDITOR.POSITION_IDENTICAL;
                        if (this.type == CKEDITOR.NODE_ELEMENT && d.type == CKEDITOR.NODE_ELEMENT) {
                            if (e.contains) {
                                if (e.contains(c))
                                    return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                                if (c.contains(e))
                                    return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                            }
                            if ("sourceIndex"in e)
                                return e.sourceIndex < 0 || c.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING :
                                        CKEDITOR.POSITION_FOLLOWING
                        }
                        for (var e = this.getAddress(), d = d.getAddress(), c = Math.min(e.length, d.length), a = 0; a <= c - 1; a++)
                            if (e[a] != d[a]) {
                                if (a < c)
                                    return e[a] < d[a] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                                break
                            }
                        return e.length < d.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                    }, getAscendant: function(d, e) {
                        var c = this.$, a;
                        if (!e)
                            c = c.parentNode;
                        for (; c; ) {
                            if (c.nodeName && (a = c.nodeName.toLowerCase(), typeof d == "string" ? a == d : a in
                                    d))
                                return new CKEDITOR.dom.node(c);
                            try {
                                c = c.parentNode
                            } catch (b) {
                                c = null
                            }
                        }
                        return null
                    }, hasAscendant: function(d, e) {
                        var c = this.$;
                        if (!e)
                            c = c.parentNode;
                        for (; c; ) {
                            if (c.nodeName && c.nodeName.toLowerCase() == d)
                                return true;
                            c = c.parentNode
                        }
                        return false
                    }, move: function(d, e) {
                        d.append(this.remove(), e)
                    }, remove: function(d) {
                        var e = this.$, c = e.parentNode;
                        if (c) {
                            if (d)
                                for (; d = e.firstChild; )
                                    c.insertBefore(e.removeChild(d), e);
                            c.removeChild(e)
                        }
                        return this
                    }, replace: function(d) {
                        this.insertBefore(d);
                        d.remove()
                    }, trim: function() {
                        this.ltrim();
                        this.rtrim()
                    }, ltrim: function() {
                        for (var d; this.getFirst && (d = this.getFirst()); ) {
                            if (d.type == CKEDITOR.NODE_TEXT) {
                                var e = CKEDITOR.tools.ltrim(d.getText()), c = d.getLength();
                                if (e) {
                                    if (e.length < c) {
                                        d.split(c - e.length);
                                        this.$.removeChild(this.$.firstChild)
                                    }
                                } else {
                                    d.remove();
                                    continue
                                }
                            }
                            break
                        }
                    }, rtrim: function() {
                        for (var d; this.getLast && (d = this.getLast()); ) {
                            if (d.type == CKEDITOR.NODE_TEXT) {
                                var e = CKEDITOR.tools.rtrim(d.getText()), c = d.getLength();
                                if (e) {
                                    if (e.length < c) {
                                        d.split(e.length);
                                        this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                                    }
                                } else {
                                    d.remove();
                                    continue
                                }
                            }
                            break
                        }
                        if (CKEDITOR.env.needsBrFiller)
                            (d = this.$.lastChild) && (d.type == 1 && d.nodeName.toLowerCase() == "br") && d.parentNode.removeChild(d)
                    }, isReadOnly: function() {
                        var d = this;
                        this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent());
                        if (d && typeof d.$.isContentEditable != "undefined")
                            return!(d.$.isContentEditable || d.data("cke-editable"));
                        for (; d; ) {
                            if (d.data("cke-editable"))
                                break;
                            if (d.getAttribute("contentEditable") == "false")
                                return true;
                            if (d.getAttribute("contentEditable") == "true")
                                break;
                            d = d.getParent()
                        }
                        return!d
                    }}),
        CKEDITOR.dom.window = function(d) {
            CKEDITOR.dom.domObject.call(this, d)
        }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {focus: function() {
                this.$.focus()
            }, getViewPaneSize: function() {
                var d = this.$.document, e = d.compatMode == "CSS1Compat";
                return{width: (e ? d.documentElement.clientWidth : d.body.clientWidth) || 0, height: (e ? d.documentElement.clientHeight : d.body.clientHeight) || 0}
            }, getScrollPosition: function() {
                var d = this.$;
                if ("pageXOffset"in d)
                    return{x: d.pageXOffset ||
                        0, y: d.pageYOffset || 0};
                d = d.document;
                return{x: d.documentElement.scrollLeft || d.body.scrollLeft || 0, y: d.documentElement.scrollTop || d.body.scrollTop || 0}
            }, getFrame: function() {
                var d = this.$.frameElement;
                return d ? new CKEDITOR.dom.element.get(d) : null
            }}), CKEDITOR.dom.document = function(d) {
            CKEDITOR.dom.domObject.call(this, d)
        }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function(d) {
                if (this.$.createStyleSheet)
                    this.$.createStyleSheet(d);
                else {
                    var e = new CKEDITOR.dom.element("link");
                    e.setAttributes({rel: "stylesheet", type: "text/css", href: d});
                    this.getHead().append(e)
                }
            }, appendStyleText: function(d) {
                if (this.$.createStyleSheet) {
                    var e = this.$.createStyleSheet("");
                    e.cssText = d
                } else {
                    var c = new CKEDITOR.dom.element("style", this);
                    c.append(new CKEDITOR.dom.text(d, this));
                    this.getHead().append(c)
                }
                return e || c.$.sheet
            }, createElement: function(d, e) {
                var c = new CKEDITOR.dom.element(d, this);
                if (e) {
                    e.attributes && c.setAttributes(e.attributes);
                    e.styles && c.setStyles(e.styles)
                }
                return c
            },
            createText: function(d) {
                return new CKEDITOR.dom.text(d, this)
            }, focus: function() {
                this.getWindow().focus()
            }, getActive: function() {
                return new CKEDITOR.dom.element(this.$.activeElement)
            }, getById: function(d) {
                return(d = this.$.getElementById(d)) ? new CKEDITOR.dom.element(d) : null
            }, getByAddress: function(d, e) {
                for (var c = this.$.documentElement, a = 0; c && a < d.length; a++) {
                    var b = d[a];
                    if (e)
                        for (var f = -1, h = 0; h < c.childNodes.length; h++) {
                            var k = c.childNodes[h];
                            if (!(e === true && k.nodeType == 3 && k.previousSibling && k.previousSibling.nodeType ==
                                    3)) {
                                f++;
                                if (f == b) {
                                    c = k;
                                    break
                                }
                            }
                        }
                    else
                        c = c.childNodes[b]
                }
                return c ? new CKEDITOR.dom.node(c) : null
            }, getElementsByTag: function(d, e) {
                if ((!CKEDITOR.env.ie || document.documentMode > 8) && e)
                    d = e + ":" + d;
                return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(d))
            }, getHead: function() {
                var d = this.$.getElementsByTagName("head")[0];
                return d = d ? new CKEDITOR.dom.element(d) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true)
            }, getBody: function() {
                return new CKEDITOR.dom.element(this.$.body)
            }, getDocumentElement: function() {
                return new CKEDITOR.dom.element(this.$.documentElement)
            },
            getWindow: function() {
                return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
            }, write: function(d) {
                this.$.open("text/html", "replace");
                CKEDITOR.env.ie && (d = d.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>"));
                this.$.write(d);
                this.$.close()
            }, find: function(d) {
                return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(d))
            }, findOne: function(d) {
                return(d = this.$.querySelector(d)) ? new CKEDITOR.dom.element(d) : null
            }, _getHtml5ShivFrag: function() {
                var d =
                        this.getCustomData("html5ShivFrag");
                if (!d) {
                    d = this.$.createDocumentFragment();
                    CKEDITOR.tools.enableHtml5Elements(d, true);
                    this.setCustomData("html5ShivFrag", d)
                }
                return d
            }}), CKEDITOR.dom.nodeList = function(d) {
            this.$ = d
        }, CKEDITOR.dom.nodeList.prototype = {count: function() {
                return this.$.length
            }, getItem: function(d) {
                if (d < 0 || d >= this.$.length)
                    return null;
                return(d = this.$[d]) ? new CKEDITOR.dom.node(d) : null
            }}, CKEDITOR.dom.element = function(d, e) {
            typeof d == "string" && (d = (e ? e.$ : document).createElement(d));
            CKEDITOR.dom.domObject.call(this,
                    d)
        }, CKEDITOR.dom.element.get = function(d) {
            return(d = typeof d == "string" ? document.getElementById(d) || document.getElementsByName(d)[0] : d) && (d.$ ? d : new CKEDITOR.dom.element(d))
        }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(d, e) {
            var c = new CKEDITOR.dom.element("div", e);
            c.setHtml(d);
            return c.getFirst().remove()
        }, CKEDITOR.dom.element.setMarker = function(d, e, c, a) {
            var b = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
                    f = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
            d[b] = e;
            f[c] = 1;
            return e.setCustomData(c, a)
        }, CKEDITOR.dom.element.clearAllMarkers = function(d) {
            for (var e in d)
                CKEDITOR.dom.element.clearMarkers(d, d[e], 1)
        }, CKEDITOR.dom.element.clearMarkers = function(d, e, c) {
            var a = e.getCustomData("list_marker_names"), b = e.getCustomData("list_marker_id"), f;
            for (f in a)
                e.removeCustomData(f);
            e.removeCustomData("list_marker_names");
            if (c) {
                e.removeCustomData("list_marker_id");
                delete d[b]
            }
        }, function() {
            function d(b) {
                var a = true;
                if (!b.$.id) {
                    b.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber();
                    a = false
                }
                return function() {
                    a || b.removeAttribute("id")
                }
            }
            function e(b, a) {
                return"#" + b.$.id + " " + a.split(/,\s*/).join(", #" + b.$.id + " ")
            }
            function c(b) {
                for (var f = 0, c = 0, d = a[b].length; c < d; c++)
                    f = f + (parseInt(this.getComputedStyle(a[b][c]) || 0, 10) || 0);
                return f
            }
            CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {type: CKEDITOR.NODE_ELEMENT, addClass: function(b) {
                    var a = this.$.className;
                    a && (RegExp("(?:^|\\s)" +
                            b + "(?:\\s|$)", "").test(a) || (a = a + (" " + b)));
                    this.$.className = a || b
                }, removeClass: function(b) {
                    var a = this.getAttribute("class");
                    if (a) {
                        b = RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "i");
                        if (b.test(a))
                            (a = a.replace(b, "").replace(/^\s+/, "")) ? this.setAttribute("class", a) : this.removeAttribute("class")
                    }
                    return this
                }, hasClass: function(b) {
                    return RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "").test(this.getAttribute("class"))
                }, append: function(b, a) {
                    typeof b == "string" && (b = this.getDocument().createElement(b));
                    a ? this.$.insertBefore(b.$, this.$.firstChild) :
                            this.$.appendChild(b.$);
                    return b
                }, appendHtml: function(b) {
                    if (this.$.childNodes.length) {
                        var a = new CKEDITOR.dom.element("div", this.getDocument());
                        a.setHtml(b);
                        a.moveChildren(this)
                    } else
                        this.setHtml(b)
                }, appendText: function(b) {
                    this.$.text != void 0 ? this.$.text = this.$.text + b : this.append(new CKEDITOR.dom.text(b))
                }, appendBogus: function(b) {
                    if (b || CKEDITOR.env.needsBrFiller || CKEDITOR.env.opera) {
                        for (b = this.getLast(); b && b.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(b.getText()); )
                            b = b.getPrevious();
                        if (!b || !b.is ||
                                !b.is("br")) {
                            b = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                            CKEDITOR.env.gecko && b.setAttribute("type", "_moz");
                            this.append(b)
                        }
                    }
                }, breakParent: function(b) {
                    var a = new CKEDITOR.dom.range(this.getDocument());
                    a.setStartAfter(this);
                    a.setEndAfter(b);
                    b = a.extractContents();
                    a.insertNode(this.remove());
                    b.insertAfterNode(this)
                }, contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(b) {
                    var a = this.$;
                    return b.type != CKEDITOR.NODE_ELEMENT ? a.contains(b.getParent().$) : a !=
                            b.$ && a.contains(b.$)
                } : function(b) {
                    return!!(this.$.compareDocumentPosition(b.$) & 16)
                }, focus: function() {
                    function b() {
                        try {
                            this.$.focus()
                        } catch (b) {
                        }
                    }
                    return function(a) {
                        a ? CKEDITOR.tools.setTimeout(b, 100, this) : b.call(this)
                    }
                }(), getHtml: function() {
                    var b = this.$.innerHTML;
                    return CKEDITOR.env.ie ? b.replace(/<\?[^>]*>/g, "") : b
                }, getOuterHtml: function() {
                    if (this.$.outerHTML)
                        return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                    var b = this.$.ownerDocument.createElement("div");
                    b.appendChild(this.$.cloneNode(true));
                    return b.innerHTML
                },
                getClientRect: function() {
                    var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                    !b.width && (b.width = b.right - b.left);
                    !b.height && (b.height = b.bottom - b.top);
                    return b
                }, setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(b) {
                    try {
                        var a = this.$;
                        if (this.getParent())
                            return a.innerHTML = b;
                        var c = this.getDocument()._getHtml5ShivFrag();
                        c.appendChild(a);
                        a.innerHTML = b;
                        c.removeChild(a);
                        return b
                    } catch (d) {
                        this.$.innerHTML = "";
                        a = new CKEDITOR.dom.element("body", this.getDocument());
                        a.$.innerHTML = b;
                        for (a = a.getChildren(); a.count(); )
                            this.append(a.getItem(0));
                        return b
                    }
                } : function(b) {
                    return this.$.innerHTML = b
                }, setText: function(b) {
                    CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function(b) {
                        return this.$.innerText = b
                    } : function(b) {
                        return this.$.textContent = b
                    };
                    return this.setText(b)
                }, getAttribute: function() {
                    var b = function(b) {
                        return this.$.getAttribute(b, 2)
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b) {
                        switch (b) {
                            case "class":
                                b = "className";
                                break;
                            case "http-equiv":
                                b = "httpEquiv";
                                break;
                            case "name":
                                return this.$.name;
                            case "tabindex":
                                b = this.$.getAttribute(b, 2);
                                b !== 0 && this.$.tabIndex === 0 && (b = null);
                                return b;
                            case "checked":
                                b = this.$.attributes.getNamedItem(b);
                                return(b.specified ? b.nodeValue : this.$.checked) ? "checked" : null;
                            case "hspace":
                            case "value":
                                return this.$[b];
                            case "style":
                                return this.$.style.cssText;
                            case "contenteditable":
                            case "contentEditable":
                                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                        }
                        return this.$.getAttribute(b, 2)
                    } : b
                }(), getChildren: function() {
                    return new CKEDITOR.dom.nodeList(this.$.childNodes)
                },
                getComputedStyle: CKEDITOR.env.ie ? function(b) {
                    return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(b)]
                } : function(b) {
                    var a = this.getWindow().$.getComputedStyle(this.$, null);
                    return a ? a.getPropertyValue(b) : ""
                }, getDtd: function() {
                    var b = CKEDITOR.dtd[this.getName()];
                    this.getDtd = function() {
                        return b
                    };
                    return b
                }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: CKEDITOR.env.ie ? function() {
                    var b = this.$.tabIndex;
                    b === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"),
                            10) !== 0) && (b = -1);
                    return b
                } : CKEDITOR.env.webkit ? function() {
                    var b = this.$.tabIndex;
                    if (b == void 0) {
                        b = parseInt(this.getAttribute("tabindex"), 10);
                        isNaN(b) && (b = -1)
                    }
                    return b
                } : function() {
                    return this.$.tabIndex
                }, getText: function() {
                    return this.$.textContent || this.$.innerText || ""
                }, getWindow: function() {
                    return this.getDocument().getWindow()
                }, getId: function() {
                    return this.$.id || null
                }, getNameAtt: function() {
                    return this.$.name || null
                }, getName: function() {
                    var b = this.$.nodeName.toLowerCase();
                    if (CKEDITOR.env.ie && !(document.documentMode >
                            8)) {
                        var a = this.$.scopeName;
                        a != "HTML" && (b = a.toLowerCase() + ":" + b)
                    }
                    return(this.getName = function() {
                        return b
                    })()
                }, getValue: function() {
                    return this.$.value
                }, getFirst: function(b) {
                    var a = this.$.firstChild;
                    (a = a && new CKEDITOR.dom.node(a)) && (b && !b(a)) && (a = a.getNext(b));
                    return a
                }, getLast: function(b) {
                    var a = this.$.lastChild;
                    (a = a && new CKEDITOR.dom.node(a)) && (b && !b(a)) && (a = a.getPrevious(b));
                    return a
                }, getStyle: function(b) {
                    return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)]
                }, is: function() {
                    var b = this.getName();
                    if (typeof arguments[0] == "object")
                        return!!arguments[0][b];
                    for (var a = 0; a < arguments.length; a++)
                        if (arguments[a] == b)
                            return true;
                    return false
                }, isEditable: function(b) {
                    var a = this.getName();
                    if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[a] || CKEDITOR.dtd.$empty[a] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount())
                        return false;
                    if (b !== false) {
                        b = CKEDITOR.dtd[a] || CKEDITOR.dtd.span;
                        return!(!b || !b["#"])
                    }
                    return true
                }, isIdentical: function(b) {
                    var a = this.clone(0, 1), b = b.clone(0, 1);
                    a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                    b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                    if (a.$.isEqualNode) {
                        a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                        b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                        return a.$.isEqualNode(b.$)
                    }
                    a = a.getOuterHtml();
                    b = b.getOuterHtml();
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                        var c = this.getParent();
                        if (c.type == CKEDITOR.NODE_ELEMENT) {
                            c = c.clone();
                            c.setHtml(a);
                            a = c.getHtml();
                            c.setHtml(b);
                            b = c.getHtml()
                        }
                    }
                    return a == b
                }, isVisible: function() {
                    var b = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden", a, c;
                    if (b && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                        a = this.getWindow();
                        if (!a.equals(CKEDITOR.document.getWindow()) && (c = a.$.frameElement))
                            b = (new CKEDITOR.dom.element(c)).isVisible()
                    }
                    return!!b
                },
                isEmptyInlineRemoveable: function() {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()])
                        return false;
                    for (var b = this.getChildren(), a = 0, c = b.count(); a < c; a++) {
                        var d = b.getItem(a);
                        if (!(d.type == CKEDITOR.NODE_ELEMENT && d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText())))
                            return false
                    }
                    return true
                }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function() {
                    for (var b = this.$.attributes, a = 0; a <
                            b.length; a++) {
                        var c = b[a];
                        switch (c.nodeName) {
                            case "class":
                                if (this.getAttribute("class"))
                                    return true;
                            case "data-cke-expando":
                                continue;
                            default:
                                if (c.specified)
                                    return true
                            }
                    }
                    return false
                } : function() {
                    var b = this.$.attributes, a = b.length, c = {"data-cke-expando": 1, _moz_dirty: 1};
                    return a > 0 && (a > 2 || !c[b[0].nodeName] || a == 2 && !c[b[1].nodeName])
                }, hasAttribute: function() {
                    function b(b) {
                        b = this.$.attributes.getNamedItem(b);
                        return!(!b || !b.specified)
                    }
                    return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function(a) {
                        return a == "name" ?
                                !!this.$.name : b.call(this, a)
                    } : b
                }(), hide: function() {
                    this.setStyle("display", "none")
                }, moveChildren: function(b, a) {
                    var c = this.$, b = b.$;
                    if (c != b) {
                        var d;
                        if (a)
                            for (; d = c.lastChild; )
                                b.insertBefore(c.removeChild(d), b.firstChild);
                        else
                            for (; d = c.firstChild; )
                                b.appendChild(c.removeChild(d))
                    }
                }, mergeSiblings: function() {
                    function b(b, a, c) {
                        if (a && a.type == CKEDITOR.NODE_ELEMENT) {
                            for (var d = []; a.data("cke-bookmark") || a.isEmptyInlineRemoveable(); ) {
                                d.push(a);
                                a = c ? a.getNext() : a.getPrevious();
                                if (!a || a.type != CKEDITOR.NODE_ELEMENT)
                                    return
                            }
                            if (b.isIdentical(a)) {
                                for (var e =
                                        c ? b.getLast() : b.getFirst(); d.length; )
                                    d.shift().move(b, !c);
                                a.moveChildren(b, !c);
                                a.remove();
                                e && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings()
                            }
                        }
                    }
                    return function(a) {
                        if (a === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                            b(this, this.getNext(), true);
                            b(this, this.getPrevious())
                        }
                    }
                }(), show: function() {
                    this.setStyles({display: "", visibility: ""})
                }, setAttribute: function() {
                    var b = function(b, a) {
                        this.$.setAttribute(b, a);
                        return this
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                            function(a, c) {
                                a == "class" ? this.$.className = c : a == "style" ? this.$.style.cssText = c : a == "tabindex" ? this.$.tabIndex = c : a == "checked" ? this.$.checked = c : a == "contenteditable" ? b.call(this, "contentEditable", c) : b.apply(this, arguments);
                                return this
                            } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(a, c) {
                        if (a == "src" && c.match(/^http:\/\//))
                            try {
                                b.apply(this, arguments)
                            } catch (d) {
                            }
                        else
                            b.apply(this, arguments);
                        return this
                    } : b
                }(), setAttributes: function(b) {
                    for (var a in b)
                        this.setAttribute(a, b[a]);
                    return this
                }, setValue: function(b) {
                    this.$.value =
                            b;
                    return this
                }, removeAttribute: function() {
                    var b = function(b) {
                        this.$.removeAttribute(b)
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b) {
                        b == "class" ? b = "className" : b == "tabindex" ? b = "tabIndex" : b == "contenteditable" && (b = "contentEditable");
                        this.$.removeAttribute(b)
                    } : b
                }(), removeAttributes: function(b) {
                    if (CKEDITOR.tools.isArray(b))
                        for (var a = 0; a < b.length; a++)
                            this.removeAttribute(b[a]);
                    else
                        for (a in b)
                            b.hasOwnProperty(a) && this.removeAttribute(a)
                }, removeStyle: function(b) {
                    var a =
                            this.$.style;
                    if (!a.removeProperty && (b == "border" || b == "margin" || b == "padding")) {
                        var c = ["top", "left", "right", "bottom"], d;
                        b == "border" && (d = ["color", "style", "width"]);
                        for (var a = [], g = 0; g < c.length; g++)
                            if (d)
                                for (var e = 0; e < d.length; e++)
                                    a.push([b, c[g], d[e]].join("-"));
                            else
                                a.push([b, c[g]].join("-"));
                        for (b = 0; b < a.length; b++)
                            this.removeStyle(a[b])
                    } else {
                        a.removeProperty ? a.removeProperty(b) : a.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(b));
                        this.$.style.cssText || this.removeAttribute("style")
                    }
                }, setStyle: function(b,
                        a) {
                    this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)] = a;
                    return this
                }, setStyles: function(b) {
                    for (var a in b)
                        this.setStyle(a, b[a]);
                    return this
                }, setOpacity: function(b) {
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                        b = Math.round(b * 100);
                        this.setStyle("filter", b >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b + ")")
                    } else
                        this.setStyle("opacity", b)
                }, unselectable: function() {
                    this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                    if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                        this.setAttribute("unselectable",
                                "on");
                        for (var b, a = this.getElementsByTag("*"), c = 0, d = a.count(); c < d; c++) {
                            b = a.getItem(c);
                            b.setAttribute("unselectable", "on")
                        }
                    }
                }, getPositionedAncestor: function() {
                    for (var b = this; b.getName() != "html"; ) {
                        if (b.getComputedStyle("position") != "static")
                            return b;
                        b = b.getParent()
                    }
                    return null
                }, getDocumentPosition: function(b) {
                    var a = 0, c = 0, d = this.getDocument(), g = d.getBody(), e = d.$.compatMode == "BackCompat";
                    if (document.documentElement.getBoundingClientRect) {
                        var j = this.$.getBoundingClientRect(), m = d.$.documentElement, n = m.clientTop ||
                                g.$.clientTop || 0, q = m.clientLeft || g.$.clientLeft || 0, o = true;
                        if (CKEDITOR.env.ie) {
                            o = d.getDocumentElement().contains(this);
                            d = d.getBody().contains(this);
                            o = e && d || !e && o
                        }
                        if (o) {
                            a = j.left + (!e && m.scrollLeft || g.$.scrollLeft);
                            a = a - q;
                            c = j.top + (!e && m.scrollTop || g.$.scrollTop);
                            c = c - n
                        }
                    } else {
                        g = this;
                        for (d = null; g && !(g.getName() == "body" || g.getName() == "html"); ) {
                            a = a + (g.$.offsetLeft - g.$.scrollLeft);
                            c = c + (g.$.offsetTop - g.$.scrollTop);
                            if (!g.equals(this)) {
                                a = a + (g.$.clientLeft || 0);
                                c = c + (g.$.clientTop || 0)
                            }
                            for (; d && !d.equals(g); ) {
                                a = a -
                                        d.$.scrollLeft;
                                c = c - d.$.scrollTop;
                                d = d.getParent()
                            }
                            d = g;
                            g = (j = g.$.offsetParent) ? new CKEDITOR.dom.element(j) : null
                        }
                    }
                    if (b) {
                        g = this.getWindow();
                        d = b.getWindow();
                        if (!g.equals(d) && g.$.frameElement) {
                            b = (new CKEDITOR.dom.element(g.$.frameElement)).getDocumentPosition(b);
                            a = a + b.x;
                            c = c + b.y
                        }
                    }
                    if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !e) {
                        a = a + (this.$.clientLeft ? 1 : 0);
                        c = c + (this.$.clientTop ? 1 : 0)
                    }
                    return{x: a, y: c}
                }, scrollIntoView: function(a) {
                    var c = this.getParent();
                    if (c) {
                        do {
                            (c.$.clientWidth && c.$.clientWidth <
                                    c.$.scrollWidth || c.$.clientHeight && c.$.clientHeight < c.$.scrollHeight) && !c.is("body") && this.scrollIntoParent(c, a, 1);
                            if (c.is("html")) {
                                var d = c.getWindow();
                                try {
                                    var e = d.$.frameElement;
                                    e && (c = new CKEDITOR.dom.element(e))
                                } catch (g) {
                                }
                            }
                        } while (c = c.getParent())
                    }
                }, scrollIntoParent: function(a, c, d) {
                    var e, g, i, j;
                    function m(c, d) {
                        if (/body|html/.test(a.getName()))
                            a.getWindow().$.scrollBy(c, d);
                        else {
                            a.$.scrollLeft = a.$.scrollLeft + c;
                            a.$.scrollTop = a.$.scrollTop + d
                        }
                    }
                    function n(a, b) {
                        var c = {x: 0, y: 0};
                        if (!a.is(o ? "body" : "html")) {
                            var d =
                                    a.$.getBoundingClientRect();
                            c.x = d.left;
                            c.y = d.top
                        }
                        d = a.getWindow();
                        if (!d.equals(b)) {
                            d = n(CKEDITOR.dom.element.get(d.$.frameElement), b);
                            c.x = c.x + d.x;
                            c.y = c.y + d.y
                        }
                        return c
                    }
                    function q(a, b) {
                        return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
                    }
                    !a && (a = this.getWindow());
                    i = a.getDocument();
                    var o = i.$.compatMode == "BackCompat";
                    a instanceof CKEDITOR.dom.window && (a = o ? i.getBody() : i.getDocumentElement());
                    i = a.getWindow();
                    g = n(this, i);
                    var l = n(a, i), r = this.$.offsetHeight;
                    e = this.$.offsetWidth;
                    var p = a.$.clientHeight, s =
                            a.$.clientWidth;
                    i = g.x - q(this, "left") - l.x || 0;
                    j = g.y - q(this, "top") - l.y || 0;
                    e = g.x + e + q(this, "right") - (l.x + s) || 0;
                    g = g.y + r + q(this, "bottom") - (l.y + p) || 0;
                    if (j < 0 || g > 0)
                        m(0, c === true ? j : c === false ? g : j < 0 ? j : g);
                    if (d && (i < 0 || e > 0))
                        m(i < 0 ? i : e, 0)
                }, setState: function(a, c, d) {
                    c = c || "cke";
                    switch (a) {
                        case CKEDITOR.TRISTATE_ON:
                            this.addClass(c + "_on");
                            this.removeClass(c + "_off");
                            this.removeClass(c + "_disabled");
                            d && this.setAttribute("aria-pressed", true);
                            d && this.removeAttribute("aria-disabled");
                            break;
                        case CKEDITOR.TRISTATE_DISABLED:
                            this.addClass(c +
                                    "_disabled");
                            this.removeClass(c + "_off");
                            this.removeClass(c + "_on");
                            d && this.setAttribute("aria-disabled", true);
                            d && this.removeAttribute("aria-pressed");
                            break;
                        default:
                            this.addClass(c + "_off");
                            this.removeClass(c + "_on");
                            this.removeClass(c + "_disabled");
                            d && this.removeAttribute("aria-pressed");
                            d && this.removeAttribute("aria-disabled")
                        }
                }, getFrameDocument: function() {
                    var a = this.$;
                    try {
                        a.contentWindow.document
                    } catch (c) {
                        a.src = a.src
                    }
                    return a && new CKEDITOR.dom.document(a.contentWindow.document)
                }, copyAttributes: function(a,
                        c) {
                    for (var d = this.$.attributes, c = c || {}, e = 0; e < d.length; e++) {
                        var g = d[e], i = g.nodeName.toLowerCase(), j;
                        if (!(i in c))
                            if (i == "checked" && (j = this.getAttribute(i)))
                                a.setAttribute(i, j);
                            else if (g.specified || CKEDITOR.env.ie && g.nodeValue && i == "value") {
                                j = this.getAttribute(i);
                                if (j === null)
                                    j = g.nodeValue;
                                a.setAttribute(i, j)
                            }
                    }
                    if (this.$.style.cssText !== "")
                        a.$.style.cssText = this.$.style.cssText
                }, renameNode: function(a) {
                    if (this.getName() != a) {
                        var c = this.getDocument(), a = new CKEDITOR.dom.element(a, c);
                        this.copyAttributes(a);
                        this.moveChildren(a);
                        this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                        a.$["data-cke-expando"] = this.$["data-cke-expando"];
                        this.$ = a.$
                    }
                }, getChild: function() {
                    function a(b, c) {
                        var d = b.childNodes;
                        if (c >= 0 && c < d.length)
                            return d[c]
                    }
                    return function(c) {
                        var d = this.$;
                        if (c.slice)
                            for (; c.length > 0 && d; )
                                d = a(d, c.shift());
                        else
                            d = a(d, c);
                        return d ? new CKEDITOR.dom.node(d) : null
                    }
                }(), getChildCount: function() {
                    return this.$.childNodes.length
                }, disableContextMenu: function() {
                    this.on("contextmenu", function(a) {
                        a.data.getTarget().hasClass("cke_enable_context_menu") ||
                                a.data.preventDefault()
                    })
                }, getDirection: function(a) {
                    return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                }, data: function(a, c) {
                    a = "data-" + a;
                    if (c === void 0)
                        return this.getAttribute(a);
                    c === false ? this.removeAttribute(a) : this.setAttribute(a, c);
                    return null
                }, getEditor: function() {
                    var a = CKEDITOR.instances, c, d;
                    for (c in a) {
                        d = a[c];
                        if (d.element.equals(this) && d.elementMode !=
                                CKEDITOR.ELEMENT_MODE_APPENDTO)
                            return d
                    }
                    return null
                }, find: function(a) {
                    var c = d(this), a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e(this, a)));
                    c();
                    return a
                }, findOne: function(a) {
                    var c = d(this), a = this.$.querySelector(e(this, a));
                    c();
                    return a ? new CKEDITOR.dom.element(a) : null
                }, forEach: function(a, c, d) {
                    if (!d && (!c || this.type == c))
                        var e = a(this);
                    if (e !== false)
                        for (var d = this.getChildren(), g = 0; g < d.count(); g++) {
                            e = d.getItem(g);
                            e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, c) : (!c || e.type == c) && a(e)
                        }
                }});
            var a = {width: ["border-left-width",
                    "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]};
            CKEDITOR.dom.element.prototype.setSize = function(a, d, e) {
                if (typeof d == "number") {
                    if (e && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks))
                        d = d - c.call(this, a);
                    this.setStyle(a, d + "px")
                }
            };
            CKEDITOR.dom.element.prototype.getSize = function(a, d) {
                var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
                d && (e = e - c.call(this, a));
                return e
            }
        }(),
                CKEDITOR.dom.documentFragment = function(d) {
                    d = d || CKEDITOR.document;
                    this.$ = d.type == CKEDITOR.NODE_DOCUMENT ? d.$.createDocumentFragment() : d
                }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function(d) {
                d = d.$;
                d.parentNode.insertBefore(this.$, d.nextSibling)
            }}, !0, {append: 1, appendBogus: 1, getFirst: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1,
            trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1}), function() {
            function d(a, b) {
                var c = this.range;
                if (this._.end)
                    return null;
                if (!this._.start) {
                    this._.start = 1;
                    if (c.collapsed) {
                        this.end();
                        return null
                    }
                    c.optimize()
                }
                var d, j = c.startContainer;
                d = c.endContainer;
                var f = c.startOffset, g = c.endOffset, e, h = this.guard, k = this.type, i = a ? "getPreviousSourceNode" : "getNextSourceNode";
                if (!a && !this._.guardLTR) {
                    var z = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), x = d.type == CKEDITOR.NODE_ELEMENT ?
                            d.getChild(g) : d.getNext();
                    this._.guardLTR = function(a, b) {
                        return(!b || !z.equals(a)) && (!x || !a.equals(x)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                    }
                }
                if (a && !this._.guardRTL) {
                    var y = j.type == CKEDITOR.NODE_ELEMENT ? j : j.getParent(), C = j.type == CKEDITOR.NODE_ELEMENT ? f ? j.getChild(f - 1) : null : j.getPrevious();
                    this._.guardRTL = function(a, b) {
                        return(!b || !y.equals(a)) && (!C || !a.equals(C)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                    }
                }
                var F = a ? this._.guardRTL : this._.guardLTR;
                e = h ? function(a, b) {
                    return F(a,
                            b) === false ? false : h(a, b)
                } : F;
                if (this.current)
                    d = this.current[i](false, k, e);
                else {
                    if (a)
                        d.type == CKEDITOR.NODE_ELEMENT && (d = g > 0 ? d.getChild(g - 1) : e(d, true) === false ? null : d.getPreviousSourceNode(true, k, e));
                    else {
                        d = j;
                        if (d.type == CKEDITOR.NODE_ELEMENT && !(d = d.getChild(f)))
                            d = e(j, true) === false ? null : j.getNextSourceNode(true, k, e)
                    }
                    d && e(d) === false && (d = null)
                }
                for (; d && !this._.end; ) {
                    this.current = d;
                    if (!this.evaluator || this.evaluator(d) !== false) {
                        if (!b)
                            return d
                    } else if (b && this.evaluator)
                        return false;
                    d = d[i](false, k, e)
                }
                this.end();
                return this.current = null
            }
            function e(a) {
                for (var b, c = null; b = d.call(this, a); )
                    c = b;
                return c
            }
            function c(a) {
                if (i(a))
                    return false;
                if (a.type == CKEDITOR.NODE_TEXT)
                    return true;
                if (a.type == CKEDITOR.NODE_ELEMENT) {
                    if (a.is(CKEDITOR.dtd.$inline) || a.getAttribute("contenteditable") == "false")
                        return true;
                    var b;
                    if (b = !CKEDITOR.env.needsBrFiller)
                        if (b = a.is(j))
                            a:{
                                b = 0;
                                for (var c = a.getChildCount(); b < c; ++b)
                                    if (!i(a.getChild(b))) {
                                        b = false;
                                        break a
                                    }
                                b = true
                            }
                    if (b)
                        return true
                }
                return false
            }
            CKEDITOR.dom.walker = CKEDITOR.tools.createClass({$: function(a) {
                    this.range =
                            a;
                    this._ = {}
                }, proto: {end: function() {
                        this._.end = 1
                    }, next: function() {
                        return d.call(this)
                    }, previous: function() {
                        return d.call(this, 1)
                    }, checkForward: function() {
                        return d.call(this, 0, 1) !== false
                    }, checkBackward: function() {
                        return d.call(this, 1, 1) !== false
                    }, lastForward: function() {
                        return e.call(this)
                    }, lastBackward: function() {
                        return e.call(this, 1)
                    }, reset: function() {
                        delete this.current;
                        this._ = {}
                    }}});
            var a = {block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1,
                "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1}, b = {absolute: 1, fixed: 1};
            CKEDITOR.dom.element.prototype.isBlockBoundary = function(c) {
                return this.getComputedStyle("float") == "none" && !(this.getComputedStyle("position")in b) && a[this.getComputedStyle("display")] ? true : !!(this.is(CKEDITOR.dtd.$block) || c && this.is(c))
            };
            CKEDITOR.dom.walker.blockBoundary = function(a) {
                return function(b) {
                    return!(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
                }
            };
            CKEDITOR.dom.walker.listItemBoundary = function() {
                return this.blockBoundary({br: 1})
            };
            CKEDITOR.dom.walker.bookmark = function(a, b) {
                function c(a) {
                    return a && a.getName && a.getName() == "span" && a.data("cke-bookmark")
                }
                return function(d) {
                    var j, f;
                    j = d && d.type != CKEDITOR.NODE_ELEMENT && (f = d.getParent()) && c(f);
                    j = a ? j : j || c(d);
                    return!!(b ^ j)
                }
            };
            CKEDITOR.dom.walker.whitespaces = function(a) {
                return function(b) {
                    var c;
                    b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​");
                    return!!(a ^ c)
                }
            };
            CKEDITOR.dom.walker.invisible = function(a) {
                var b = CKEDITOR.dom.walker.whitespaces();
                return function(c) {
                    if (b(c))
                        c = 1;
                    else {
                        c.type == CKEDITOR.NODE_TEXT && (c = c.getParent());
                        c = !c.$.offsetHeight
                    }
                    return!!(a ^ c)
                }
            };
            CKEDITOR.dom.walker.nodeType = function(a, b) {
                return function(c) {
                    return!!(b ^ c.type == a)
                }
            };
            CKEDITOR.dom.walker.bogus = function(a) {
                function b(a) {
                    return!h(a) && !k(a)
                }
                return function(c) {
                    var d = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && f.test(c.getText());
                    if (d) {
                        d = c.getParent();
                        c = c.getNext(b);
                        d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())
                    }
                    return!!(a ^
                            d)
                }
            };
            CKEDITOR.dom.walker.temp = function(a) {
                return function(b) {
                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                    b = b && b.hasAttribute("data-cke-temp");
                    return!!(a ^ b)
                }
            };
            var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, h = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), g = CKEDITOR.dom.walker.temp();
            CKEDITOR.dom.walker.ignored = function(a) {
                return function(b) {
                    b = h(b) || k(b) || g(b);
                    return!!(a ^ b)
                }
            };
            var i = CKEDITOR.dom.walker.ignored(), j = function(a) {
                var b = {}, c;
                for (c in a)
                    CKEDITOR.dtd[c]["#"] && (b[c] = 1);
                return b
            }(CKEDITOR.dtd.$block);
            CKEDITOR.dom.walker.editable = function(a) {
                return function(b) {
                    return!!(a ^ c(b))
                }
            };
            CKEDITOR.dom.element.prototype.getBogus = function() {
                var a = this;
                do
                    a = a.getPreviousSourceNode();
                while (k(a) || h(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty));
                return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : false
            }
        }(), CKEDITOR.dom.range = function(d) {
            this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
            this.collapsed = true;
            var e = d instanceof CKEDITOR.dom.document;
            this.document = e ? d : d.getDocument();
            this.root = e ? d.getBody() : d
        }, function() {
            function d() {
                var a = false, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(true), d = CKEDITOR.dom.walker.bogus();
                return function(o) {
                    if (c(o) || b(o))
                        return true;
                    if (d(o) && !a)
                        return a = true;
                    return o.type == CKEDITOR.NODE_TEXT && (o.hasAscendant("pre") || CKEDITOR.tools.trim(o.getText()).length) || o.type == CKEDITOR.NODE_ELEMENT && !o.is(f) ? false : true
                }
            }
            function e(a) {
                var b = CKEDITOR.dom.walker.whitespaces(),
                        c = CKEDITOR.dom.walker.bookmark(1);
                return function(d) {
                    return c(d) || b(d) ? true : !a && h(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
                }
            }
            function c(a) {
                return function() {
                    var b;
                    return this[a ? "getPreviousNode" : "getNextNode"](function(a) {
                        !b && i(a) && (b = a);
                        return g(a) && !(h(a) && a.equals(b))
                    })
                }
            }
            var a = function(a) {
                a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
            }, b = function(a, b, c, d) {
                a.optimizeBookmark();
                var o = a.startContainer, f = a.endContainer,
                        g = a.startOffset, e = a.endOffset, h, k;
                if (f.type == CKEDITOR.NODE_TEXT)
                    f = f.split(e);
                else if (f.getChildCount() > 0)
                    if (e >= f.getChildCount()) {
                        f = f.append(a.document.createText(""));
                        k = true
                    } else
                        f = f.getChild(e);
                if (o.type == CKEDITOR.NODE_TEXT) {
                    o.split(g);
                    o.equals(f) && (f = o.getNext())
                } else if (g)
                    if (g >= o.getChildCount()) {
                        o = o.append(a.document.createText(""));
                        h = true
                    } else
                        o = o.getChild(g).getPrevious();
                else {
                    o = o.append(a.document.createText(""), 1);
                    h = true
                }
                var g = o.getParents(), e = f.getParents(), i, v, z;
                for (i = 0; i < g.length; i++) {
                    v =
                            g[i];
                    z = e[i];
                    if (!v.equals(z))
                        break
                }
                for (var x = c, y, C, F, u = i; u < g.length; u++) {
                    y = g[u];
                    x && !y.equals(o) && (C = x.append(y.clone()));
                    for (y = y.getNext(); y; ) {
                        if (y.equals(e[u]) || y.equals(f))
                            break;
                        F = y.getNext();
                        if (b == 2)
                            x.append(y.clone(true));
                        else {
                            y.remove();
                            b == 1 && x.append(y)
                        }
                        y = F
                    }
                    x && (x = C)
                }
                x = c;
                for (c = i; c < e.length; c++) {
                    y = e[c];
                    b > 0 && !y.equals(f) && (C = x.append(y.clone()));
                    if (!g[c] || y.$.parentNode != g[c].$.parentNode)
                        for (y = y.getPrevious(); y; ) {
                            if (y.equals(g[c]) || y.equals(o))
                                break;
                            F = y.getPrevious();
                            if (b == 2)
                                x.$.insertBefore(y.$.cloneNode(true),
                                        x.$.firstChild);
                            else {
                                y.remove();
                                b == 1 && x.$.insertBefore(y.$, x.$.firstChild)
                            }
                            y = F
                        }
                    x && (x = C)
                }
                if (b == 2) {
                    v = a.startContainer;
                    if (v.type == CKEDITOR.NODE_TEXT) {
                        v.$.data = v.$.data + v.$.nextSibling.data;
                        v.$.parentNode.removeChild(v.$.nextSibling)
                    }
                    a = a.endContainer;
                    if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                        a.$.data = a.$.data + a.$.nextSibling.data;
                        a.$.parentNode.removeChild(a.$.nextSibling)
                    }
                } else {
                    if (v && z && (o.$.parentNode != v.$.parentNode || f.$.parentNode != z.$.parentNode)) {
                        b = z.getIndex();
                        h && z.$.parentNode == o.$.parentNode &&
                                b--;
                        if (d && v.type == CKEDITOR.NODE_ELEMENT) {
                            d = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                            d.insertAfter(v);
                            v.mergeSiblings(false);
                            a.moveToBookmark({startNode: d})
                        } else
                            a.setStart(z.getParent(), b)
                    }
                    a.collapse(true)
                }
                h && o.remove();
                k && f.$.parentNode && f.remove()
            }, f = {abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1}, h = CKEDITOR.dom.walker.bogus(),
                    k = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.editable(), i = CKEDITOR.dom.walker.ignored(true);
            CKEDITOR.dom.range.prototype = {clone: function() {
                    var a = new CKEDITOR.dom.range(this.root);
                    a.startContainer = this.startContainer;
                    a.startOffset = this.startOffset;
                    a.endContainer = this.endContainer;
                    a.endOffset = this.endOffset;
                    a.collapsed = this.collapsed;
                    return a
                }, collapse: function(a) {
                    if (a) {
                        this.endContainer = this.startContainer;
                        this.endOffset = this.startOffset
                    } else {
                        this.startContainer = this.endContainer;
                        this.startOffset =
                                this.endOffset
                    }
                    this.collapsed = true
                }, cloneContents: function() {
                    var a = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || b(this, 2, a);
                    return a
                }, deleteContents: function(a) {
                    this.collapsed || b(this, 0, null, a)
                }, extractContents: function(a) {
                    var c = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || b(this, 1, c, a);
                    return c
                }, createBookmark: function(a) {
                    var b, c, d, f, g = this.collapsed;
                    b = this.document.createElement("span");
                    b.data("cke-bookmark", 1);
                    b.setStyle("display", "none");
                    b.setHtml("&nbsp;");
                    if (a) {
                        d = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                        b.setAttribute("id", d + (g ? "C" : "S"))
                    }
                    if (!g) {
                        c = b.clone();
                        c.setHtml("&nbsp;");
                        a && c.setAttribute("id", d + "E");
                        f = this.clone();
                        f.collapse();
                        f.insertNode(c)
                    }
                    f = this.clone();
                    f.collapse(true);
                    f.insertNode(b);
                    if (c) {
                        this.setStartAfter(b);
                        this.setEndBefore(c)
                    } else
                        this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                    return{startNode: a ? d + (g ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: g}
                }, createBookmark2: function() {
                    function a(b) {
                        var c = b.container, d = b.offset,
                                f;
                        f = c;
                        var j = d;
                        f = f.type != CKEDITOR.NODE_ELEMENT || j === 0 || j == f.getChildCount() ? 0 : f.getChild(j - 1).type == CKEDITOR.NODE_TEXT && f.getChild(j).type == CKEDITOR.NODE_TEXT;
                        if (f) {
                            c = c.getChild(d - 1);
                            d = c.getLength()
                        }
                        c.type == CKEDITOR.NODE_ELEMENT && d > 1 && (d = c.getChild(d - 1).getIndex(true) + 1);
                        if (c.type == CKEDITOR.NODE_TEXT) {
                            f = c;
                            for (j = 0; (f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT; )
                                j = j + f.getLength();
                            d = d + j
                        }
                        b.container = c;
                        b.offset = d
                    }
                    return function(b) {
                        var c = this.collapsed, d = {container: this.startContainer, offset: this.startOffset},
                        f = {container: this.endContainer, offset: this.endOffset};
                        if (b) {
                            a(d);
                            c || a(f)
                        }
                        return{start: d.container.getAddress(b), end: c ? null : f.container.getAddress(b), startOffset: d.offset, endOffset: f.offset, normalized: b, collapsed: c, is2: true}
                    }
                }(), moveToBookmark: function(a) {
                    if (a.is2) {
                        var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized), a = a.endOffset;
                        this.setStart(b, c);
                        d ? this.setEnd(d, a) : this.collapse(true)
                    } else {
                        b = (c = a.serializable) ? this.document.getById(a.startNode) :
                                a.startNode;
                        a = c ? this.document.getById(a.endNode) : a.endNode;
                        this.setStartBefore(b);
                        b.remove();
                        if (a) {
                            this.setEndBefore(a);
                            a.remove()
                        } else
                            this.collapse(true)
                    }
                }, getBoundaryNodes: function() {
                    var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, f;
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        f = a.getChildCount();
                        if (f > c)
                            a = a.getChild(c);
                        else if (f < 1)
                            a = a.getPreviousSourceNode();
                        else {
                            for (a = a.$; a.lastChild; )
                                a = a.lastChild;
                            a = new CKEDITOR.dom.node(a);
                            a = a.getNextSourceNode() || a
                        }
                    }
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        f =
                                b.getChildCount();
                        if (f > d)
                            b = b.getChild(d).getPreviousSourceNode(true);
                        else if (f < 1)
                            b = b.getPreviousSourceNode();
                        else {
                            for (b = b.$; b.lastChild; )
                                b = b.lastChild;
                            b = new CKEDITOR.dom.node(b)
                        }
                    }
                    a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                    return{startNode: a, endNode: b}
                }, getCommonAncestor: function(a, b) {
                    var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                    return b && !c.is ? c.getParent() :
                    c
                }, optimize: function() {
                    var a = this.startContainer, b = this.startOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                    a = this.endContainer;
                    b = this.endOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                }, optimizeBookmark: function() {
                    var a = this.startContainer, b = this.endContainer;
                    a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                    b && (b.is && b.is("span") && b.data("cke-bookmark")) &&
                            this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                }, trim: function(a, b) {
                    var c = this.startContainer, d = this.startOffset, f = this.collapsed;
                    if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) {
                        if (d)
                            if (d >= c.getLength()) {
                                d = c.getIndex() + 1;
                                c = c.getParent()
                            } else {
                                var g = c.split(d), d = c.getIndex() + 1, c = c.getParent();
                                if (this.startContainer.equals(this.endContainer))
                                    this.setEnd(g, this.endOffset - this.startOffset);
                                else if (c.equals(this.endContainer))
                                    this.endOffset = this.endOffset + 1
                            }
                        else {
                            d = c.getIndex();
                            c = c.getParent()
                        }
                        this.setStart(c, d);
                        if (f) {
                            this.collapse(true);
                            return
                        }
                    }
                    c = this.endContainer;
                    d = this.endOffset;
                    if (!b && !f && c && c.type == CKEDITOR.NODE_TEXT) {
                        if (d) {
                            d >= c.getLength() || c.split(d);
                            d = c.getIndex() + 1
                        } else
                            d = c.getIndex();
                        c = c.getParent();
                        this.setEnd(c, d)
                    }
                }, enlarge: function(a, b) {
                    function c(a) {
                        return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
                    }
                    var d = RegExp(/[^\s\ufeff]/);
                    switch (a) {
                        case CKEDITOR.ENLARGE_INLINE:
                            var f = 1;
                        case CKEDITOR.ENLARGE_ELEMENT:
                            if (this.collapsed)
                                break;
                            var g = this.getCommonAncestor(), e = this.root,
                                    h, k, i, t, v, z = false, x, y;
                            x = this.startContainer;
                            var C = this.startOffset;
                            if (x.type == CKEDITOR.NODE_TEXT) {
                                if (C) {
                                    x = !CKEDITOR.tools.trim(x.substring(0, C)).length && x;
                                    z = !!x
                                }
                                if (x && !(t = x.getPrevious()))
                                    i = x.getParent()
                            } else {
                                C && (t = x.getChild(C - 1) || x.getLast());
                                t || (i = x)
                            }
                            for (i = c(i); i || t; ) {
                                if (i && !t) {
                                    !v && i.equals(g) && (v = true);
                                    if (f ? i.isBlockBoundary() : !e.contains(i))
                                        break;
                                    if (!z || i.getComputedStyle("display") != "inline") {
                                        z = false;
                                        v ? h = i : this.setStartBefore(i)
                                    }
                                    t = i.getPrevious()
                                }
                                for (; t; ) {
                                    x = false;
                                    if (t.type == CKEDITOR.NODE_COMMENT)
                                        t =
                                                t.getPrevious();
                                    else {
                                        if (t.type == CKEDITOR.NODE_TEXT) {
                                            y = t.getText();
                                            d.test(y) && (t = null);
                                            x = /[\s\ufeff]$/.test(y)
                                        } else if ((t.$.offsetWidth > 0 || b && t.is("br")) && !t.data("cke-bookmark"))
                                            if (z && CKEDITOR.dtd.$removeEmpty[t.getName()]) {
                                                y = t.getText();
                                                if (d.test(y))
                                                    t = null;
                                                else
                                                    for (var C = t.$.getElementsByTagName("*"), F = 0, u; u = C[F++]; )
                                                        if (!CKEDITOR.dtd.$removeEmpty[u.nodeName.toLowerCase()]) {
                                                            t = null;
                                                            break
                                                        }
                                                t && (x = !!y.length)
                                            } else
                                                t = null;
                                        x && (z ? v ? h = i : i && this.setStartBefore(i) : z = true);
                                        if (t) {
                                            x = t.getPrevious();
                                            if (!i && !x) {
                                                i =
                                                        t;
                                                t = null;
                                                break
                                            }
                                            t = x
                                        } else
                                            i = null
                                    }
                                }
                                i && (i = c(i.getParent()))
                            }
                            x = this.endContainer;
                            C = this.endOffset;
                            i = t = null;
                            v = z = false;
                            var D = function(a, b) {
                                var c = new CKEDITOR.dom.range(e);
                                c.setStart(a, b);
                                c.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                                var c = new CKEDITOR.dom.walker(c), f;
                                for (c.guard = function(a) {
                                    return!(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
                                }; f = c.next(); ) {
                                    if (f.type != CKEDITOR.NODE_TEXT)
                                        return false;
                                    y = f != a ? f.getText() : f.substring(b);
                                    if (d.test(y))
                                        return false
                                }
                                return true
                            };
                            if (x.type == CKEDITOR.NODE_TEXT)
                                if (CKEDITOR.tools.trim(x.substring(C)).length)
                                    z =
                                            true;
                                else {
                                    z = !x.getLength();
                                    if (C == x.getLength()) {
                                        if (!(t = x.getNext()))
                                            i = x.getParent()
                                    } else
                                        D(x, C) && (i = x.getParent())
                                }
                            else
                                (t = x.getChild(C)) || (i = x);
                            for (; i || t; ) {
                                if (i && !t) {
                                    !v && i.equals(g) && (v = true);
                                    if (f ? i.isBlockBoundary() : !e.contains(i))
                                        break;
                                    if (!z || i.getComputedStyle("display") != "inline") {
                                        z = false;
                                        v ? k = i : i && this.setEndAfter(i)
                                    }
                                    t = i.getNext()
                                }
                                for (; t; ) {
                                    x = false;
                                    if (t.type == CKEDITOR.NODE_TEXT) {
                                        y = t.getText();
                                        D(t, 0) || (t = null);
                                        x = /^[\s\ufeff]/.test(y)
                                    } else if (t.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((t.$.offsetWidth > 0 ||
                                                b && t.is("br")) && !t.data("cke-bookmark"))
                                            if (z && CKEDITOR.dtd.$removeEmpty[t.getName()]) {
                                                y = t.getText();
                                                if (d.test(y))
                                                    t = null;
                                                else {
                                                    C = t.$.getElementsByTagName("*");
                                                    for (F = 0; u = C[F++]; )
                                                        if (!CKEDITOR.dtd.$removeEmpty[u.nodeName.toLowerCase()]) {
                                                            t = null;
                                                            break
                                                        }
                                                }
                                                t && (x = !!y.length)
                                            } else
                                                t = null
                                    } else
                                        x = 1;
                                    x && z && (v ? k = i : this.setEndAfter(i));
                                    if (t) {
                                        x = t.getNext();
                                        if (!i && !x) {
                                            i = t;
                                            t = null;
                                            break
                                        }
                                        t = x
                                    } else
                                        i = null
                                }
                                i && (i = c(i.getParent()))
                            }
                            if (h && k) {
                                g = h.contains(k) ? k : h;
                                this.setStartBefore(g);
                                this.setEndAfter(g)
                            }
                            break;
                        case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                        case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                            i =
                                    new CKEDITOR.dom.range(this.root);
                            e = this.root;
                            i.setStartAt(e, CKEDITOR.POSITION_AFTER_START);
                            i.setEnd(this.startContainer, this.startOffset);
                            i = new CKEDITOR.dom.walker(i);
                            var I, B, A = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {br: 1} : null), E = null, J = function(a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute("contenteditable") == "false")
                                    if (E) {
                                        if (E.equals(a)) {
                                            E = null;
                                            return
                                        }
                                    } else
                                        E = a;
                                else if (E)
                                    return;
                                var b = A(a);
                                b || (I = a);
                                return b
                            }, f = function(a) {
                                var b = J(a);
                                !b && (a.is && a.is("br")) &&
                                        (B = a);
                                return b
                            };
                            i.guard = J;
                            i = i.lastBackward();
                            I = I || e;
                            this.setStartAt(I, !I.is("br") && (!i && this.checkStartOfBlock() || i && I.contains(i)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                            if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                                i = this.clone();
                                i = new CKEDITOR.dom.walker(i);
                                var G = CKEDITOR.dom.walker.whitespaces(), Y = CKEDITOR.dom.walker.bookmark();
                                i.evaluator = function(a) {
                                    return!G(a) && !Y(a)
                                };
                                if ((i = i.previous()) && i.type == CKEDITOR.NODE_ELEMENT && i.is("br"))
                                    break
                            }
                            i = this.clone();
                            i.collapse();
                            i.setEndAt(e,
                                    CKEDITOR.POSITION_BEFORE_END);
                            i = new CKEDITOR.dom.walker(i);
                            i.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : J;
                            I = null;
                            i = i.lastForward();
                            I = I || e;
                            this.setEndAt(I, !i && this.checkEndOfBlock() || i && I.contains(i) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                            B && this.setEndAfter(B)
                        }
                }, shrink: function(a, b, c) {
                    if (!this.collapsed) {
                        var a = a || CKEDITOR.SHRINK_TEXT, d = this.clone(), f = this.startContainer, g = this.endContainer, e = this.startOffset, i = this.endOffset, h = 1, k = 1;
                        if (f && f.type == CKEDITOR.NODE_TEXT)
                            if (e)
                                if (e >=
                                        f.getLength())
                                    d.setStartAfter(f);
                                else {
                                    d.setStartBefore(f);
                                    h = 0
                                }
                            else
                                d.setStartBefore(f);
                        if (g && g.type == CKEDITOR.NODE_TEXT)
                            if (i)
                                if (i >= g.getLength())
                                    d.setEndAfter(g);
                                else {
                                    d.setEndAfter(g);
                                    k = 0
                                }
                            else
                                d.setEndBefore(g);
                        var d = new CKEDITOR.dom.walker(d), t = CKEDITOR.dom.walker.bookmark();
                        d.evaluator = function(b) {
                            return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                        };
                        var v;
                        d.guard = function(b, d) {
                            if (t(b))
                                return true;
                            if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(v) ||
                                    c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable"))
                                return false;
                            !d && b.type == CKEDITOR.NODE_ELEMENT && (v = b);
                            return true
                        };
                        if (h)
                            (f = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(f, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                        if (k) {
                            d.reset();
                            (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)
                        }
                        return!(!h &&
                                !k)
                    }
                }, insertNode: function(a) {
                    this.optimizeBookmark();
                    this.trim(false, true);
                    var b = this.startContainer, c = b.getChild(this.startOffset);
                    c ? a.insertBefore(c) : b.append(a);
                    a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                    this.setStartBefore(a)
                }, moveToPosition: function(a, b) {
                    this.setStartAt(a, b);
                    this.collapse(true)
                }, moveToRange: function(a) {
                    this.setStart(a.startContainer, a.startOffset);
                    this.setEnd(a.endContainer, a.endOffset)
                }, selectNodeContents: function(a) {
                    this.setStart(a, 0);
                    this.setEnd(a,
                            a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
                }, setStart: function(b, c) {
                    if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) {
                        c = b.getIndex();
                        b = b.getParent()
                    }
                    this.startContainer = b;
                    this.startOffset = c;
                    if (!this.endContainer) {
                        this.endContainer = b;
                        this.endOffset = c
                    }
                    a(this)
                }, setEnd: function(b, c) {
                    if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) {
                        c = b.getIndex() + 1;
                        b = b.getParent()
                    }
                    this.endContainer = b;
                    this.endOffset = c;
                    if (!this.startContainer) {
                        this.startContainer = b;
                        this.startOffset =
                        c
                    }
                    a(this)
                }, setStartAfter: function(a) {
                    this.setStart(a.getParent(), a.getIndex() + 1)
                }, setStartBefore: function(a) {
                    this.setStart(a.getParent(), a.getIndex())
                }, setEndAfter: function(a) {
                    this.setEnd(a.getParent(), a.getIndex() + 1)
                }, setEndBefore: function(a) {
                    this.setEnd(a.getParent(), a.getIndex())
                }, setStartAt: function(b, c) {
                    switch (c) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setStart(b, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setStartBefore(b);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setStartAfter(b)
                    }
                    a(this)
                }, setEndAt: function(b, c) {
                    switch (c) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setEnd(b, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setEndBefore(b);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setEndAfter(b)
                    }
                    a(this)
                }, fixBlock: function(a, b) {
                    var c =
                            this.createBookmark(), d = this.document.createElement(b);
                    this.collapse(a);
                    this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    this.extractContents().appendTo(d);
                    d.trim();
                    d.appendBogus();
                    this.insertNode(d);
                    this.moveToBookmark(c);
                    return d
                }, splitBlock: function(a) {
                    var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = b.block, f = c.block, g = null;
                    if (!b.blockLimit.equals(c.blockLimit))
                        return null;
                    if (a != "br") {
                        if (!d) {
                            d = this.fixBlock(true, a);
                            f =
                                    (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                        }
                        f || (f = this.fixBlock(false, a))
                    }
                    a = d && this.checkStartOfBlock();
                    b = f && this.checkEndOfBlock();
                    this.deleteContents();
                    if (d && d.equals(f))
                        if (b) {
                            g = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                            this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END);
                            f = null
                        } else if (a) {
                            g = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                            this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START);
                            d = null
                        } else {
                            f = this.splitElement(d);
                            d.is("ul", "ol") || d.appendBogus()
                        }
                    return{previousBlock: d,
                        nextBlock: f, wasStartOfBlock: a, wasEndOfBlock: b, elementPath: g}
                }, splitElement: function(a) {
                    if (!this.collapsed)
                        return null;
                    this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                    var b = this.extractContents(), c = a.clone(false);
                    b.appendTo(c);
                    c.insertAfter(a);
                    this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                    return c
                }, removeEmptyBlocksAtEnd: function() {
                    function a(d) {
                        return function(a) {
                            return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || d.is("table") && a.is("caption") ? false : true
                        }
                    }
                    var b = CKEDITOR.dom.walker.whitespaces(),
                            c = CKEDITOR.dom.walker.bookmark(false);
                    return function(b) {
                        for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, g; f && !f.equals(d.root) && !f.getFirst(a(f)); ) {
                            g = f.getParent();
                            this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END);
                            f.remove(1);
                            f = g
                        }
                        this.moveToBookmark(c)
                    }
                }(), startPath: function() {
                    return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
                }, endPath: function() {
                    return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
                }, checkBoundaryOfElement: function(a,
                        b) {
                    var c = b == CKEDITOR.START, d = this.clone();
                    d.collapse(c);
                    d[c ? "setStartAt" : "setEndAt"](a, c ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                    d = new CKEDITOR.dom.walker(d);
                    d.evaluator = e(c);
                    return d[c ? "checkBackward" : "checkForward"]()
                }, checkStartOfBlock: function() {
                    var a = this.startContainer, b = this.startOffset;
                    if (CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT) {
                        a = CKEDITOR.tools.ltrim(a.substring(0, b));
                        k.test(a) && this.trim(0, 1)
                    }
                    this.trim();
                    a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    b = this.clone();
                    b.collapse(true);
                    b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                    a = new CKEDITOR.dom.walker(b);
                    a.evaluator = d();
                    return a.checkBackward()
                }, checkEndOfBlock: function() {
                    var a = this.endContainer, b = this.endOffset;
                    if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) {
                        a = CKEDITOR.tools.rtrim(a.substring(b));
                        k.test(a) && this.trim(1, 0)
                    }
                    this.trim();
                    a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                    b = this.clone();
                    b.collapse(false);
                    b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                    a = new CKEDITOR.dom.walker(b);
                    a.evaluator = d();
                    return a.checkForward()
                }, getPreviousNode: function(a, b, c) {
                    var d = this.clone();
                    d.collapse(1);
                    d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                    c = new CKEDITOR.dom.walker(d);
                    c.evaluator = a;
                    c.guard = b;
                    return c.previous()
                }, getNextNode: function(a, b, c) {
                    var d = this.clone();
                    d.collapse();
                    d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                    c = new CKEDITOR.dom.walker(d);
                    c.evaluator = a;
                    c.guard = b;
                    return c.next()
                }, checkReadOnly: function() {
                    function a(b, c) {
                        for (; b; ) {
                            if (b.type ==
                                    CKEDITOR.NODE_ELEMENT) {
                                if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable"))
                                    return 0;
                                if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c)))
                                    break
                            }
                            b = b.getParent()
                        }
                        return 1
                    }
                    return function() {
                        var b = this.startContainer, c = this.endContainer;
                        return!(a(b, c) && a(c, b))
                    }
                }(), moveToElementEditablePosition: function(a, b) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(false)) {
                        this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        return true
                    }
                    for (var c =
                            0; a; ) {
                        if (a.type == CKEDITOR.NODE_TEXT) {
                            b && this.endContainer && this.checkEndOfBlock() && k.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                            c = 1;
                            break
                        }
                        if (a.type == CKEDITOR.NODE_ELEMENT)
                            if (a.isEditable()) {
                                this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                                c = 1
                            } else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock())
                                this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                            else if (a.getAttribute("contenteditable") == "false" && a.is(CKEDITOR.dtd.$block)) {
                                this.setStartBefore(a);
                                this.setEndAfter(a);
                                return true
                            }
                        var d = a, f = c, g = void 0;
                        d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(false) && (g = d[b ? "getLast" : "getFirst"](i));
                        !f && !g && (g = d[b ? "getPrevious" : "getNext"](i));
                        a = g
                    }
                    return!!c
                }, moveToClosestEditablePosition: function(a, b) {
                    var c = new CKEDITOR.dom.range(this.root), d = 0, f, g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                    c.moveToPosition(a, g[b ? 0 : 1]);
                    if (a.is(CKEDITOR.dtd.$block)) {
                        if (f =
                                c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) {
                            d = 1;
                            if (f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) && f.getAttribute("contenteditable") == "false") {
                                c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START);
                                c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)
                            } else
                                c.moveToPosition(f, g[b ? 1 : 0])
                        }
                    } else
                        d = 1;
                    d && this.moveToRange(c);
                    return!!d
                }, moveToElementEditStart: function(a) {
                    return this.moveToElementEditablePosition(a)
                }, moveToElementEditEnd: function(a) {
                    return this.moveToElementEditablePosition(a, true)
                }, getEnclosedNode: function() {
                    var a =
                            this.clone();
                    a.optimize();
                    if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT)
                        return null;
                    var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(false, true), c = CKEDITOR.dom.walker.whitespaces(true);
                    a.evaluator = function(a) {
                        return c(a) && b(a)
                    };
                    var d = a.next();
                    a.reset();
                    return d && d.equals(a.previous()) ? d : null
                }, getTouchedStartNode: function() {
                    var a = this.startContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                }, getTouchedEndNode: function() {
                    var a =
                            this.endContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
                }, getNextEditableNode: c(), getPreviousEditableNode: c(1), scrollIntoView: function() {
                    var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), b, c, d, f = this.clone();
                    f.optimize();
                    if (d = f.startContainer.type == CKEDITOR.NODE_TEXT) {
                        c = f.startContainer.getText();
                        b = f.startContainer.split(f.startOffset);
                        a.insertAfter(f.startContainer)
                    } else
                        f.insertNode(a);
                    a.scrollIntoView();
                    if (d) {
                        f.startContainer.setText(c);
                        b.remove()
                    }
                    a.remove()
                }}
        }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function() {
            function d(a) {
                if (!(arguments.length < 1)) {
                    this.range = a;
                    this.forceBrBreak = 0;
                    this.enlargeBr = 1;
                    this.enforceRealBlocks = 0;
                    this._ ||
                            (this._ = {})
                }
            }
            function e(a, b, c) {
                for (a = a.getNextSourceNode(b, null, c); !f(a); )
                    a = a.getNextSourceNode(b, null, c);
                return a
            }
            function c(a) {
                var b = [];
                a.forEach(function(a) {
                    if (a.getAttribute("contenteditable") == "true") {
                        b.push(a);
                        return false
                    }
                }, CKEDITOR.NODE_ELEMENT, true);
                return b
            }
            function a(b, d, f, e) {
                a:{
                    e == void 0 && (e = c(f));
                    for (var h; h = e.shift(); )
                        if (h.getDtd().p) {
                            e = {element: h, remaining: e};
                            break a
                        }
                    e = null
                }
                if (!e)
                    return 0;
                if ((h = CKEDITOR.filter.instances[e.element.data("cke-filter")]) && !h.check(d))
                    return a(b, d, f, e.remaining);
                d = new CKEDITOR.dom.range(e.element);
                d.selectNodeContents(e.element);
                d = d.createIterator();
                d.enlargeBr = b.enlargeBr;
                d.enforceRealBlocks = b.enforceRealBlocks;
                d.activeFilter = d.filter = h;
                b._.nestedEditable = {element: e.element, container: f, remaining: e.remaining, iterator: d};
                return 1
            }
            var b = /^[\r\n\t ]+$/, f = CKEDITOR.dom.walker.bookmark(false, true), h = CKEDITOR.dom.walker.whitespaces(true), k = function(a) {
                return f(a) && h(a)
            };
            d.prototype = {getNextParagraph: function(c) {
                    var d, h, m, n, q, c = c || "p";
                    if (this._.nestedEditable) {
                        if (d =
                                this._.nestedEditable.iterator.getNextParagraph(c)) {
                            this.activeFilter = this._.nestedEditable.iterator.activeFilter;
                            return d
                        }
                        this.activeFilter = this.filter;
                        if (a(this, c, this._.nestedEditable.container, this._.nestedEditable.remaining)) {
                            this.activeFilter = this._.nestedEditable.iterator.activeFilter;
                            return this._.nestedEditable.iterator.getNextParagraph(c)
                        }
                        this._.nestedEditable = null
                    }
                    if (!this.range.root.getDtd()[c])
                        return null;
                    if (!this._.started) {
                        var o = this.range.clone();
                        o.shrink(CKEDITOR.SHRINK_ELEMENT, true);
                        h = o.endContainer.hasAscendant("pre", true) || o.startContainer.hasAscendant("pre", true);
                        o.enlarge(this.forceBrBreak && !h || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        if (!o.collapsed) {
                            h = new CKEDITOR.dom.walker(o.clone());
                            var l = CKEDITOR.dom.walker.bookmark(true, true);
                            h.evaluator = l;
                            this._.nextNode = h.next();
                            h = new CKEDITOR.dom.walker(o.clone());
                            h.evaluator = l;
                            h = h.previous();
                            this._.lastNode = h.getNextSourceNode(true);
                            if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT &&
                                    !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                                l = this.range.clone();
                                l.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                                if (l.checkEndOfBlock()) {
                                    l = new CKEDITOR.dom.elementPath(l.endContainer, l.root);
                                    this._.lastNode = (l.block || l.blockLimit).getNextSourceNode(true)
                                }
                            }
                            if (!this._.lastNode || !o.root.contains(this._.lastNode)) {
                                this._.lastNode = this._.docEndMarker = o.document.createText("");
                                this._.lastNode.insertAfter(h)
                            }
                            o = null
                        }
                        this._.started = 1;
                        h = o
                    }
                    l =
                            this._.nextNode;
                    o = this._.lastNode;
                    for (this._.nextNode = null; l; ) {
                        var r = 0, p = l.hasAscendant("pre"), s = l.type != CKEDITOR.NODE_ELEMENT, w = 0;
                        if (s)
                            l.type == CKEDITOR.NODE_TEXT && b.test(l.getText()) && (s = 0);
                        else {
                            var t = l.getName();
                            if (CKEDITOR.dtd.$block[t] && l.getAttribute("contenteditable") == "false") {
                                d = l;
                                a(this, c, d);
                                break
                            } else if (l.isBlockBoundary(this.forceBrBreak && !p && {br: 1})) {
                                if (t == "br")
                                    s = 1;
                                else if (!h && !l.getChildCount() && t != "hr") {
                                    d = l;
                                    m = l.equals(o);
                                    break
                                }
                                if (h) {
                                    h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START);
                                    if (t !=
                                            "br")
                                        this._.nextNode = l
                                }
                                r = 1
                            } else {
                                if (l.getFirst()) {
                                    if (!h) {
                                        h = this.range.clone();
                                        h.setStartAt(l, CKEDITOR.POSITION_BEFORE_START)
                                    }
                                    l = l.getFirst();
                                    continue
                                }
                                s = 1
                            }
                        }
                        if (s && !h) {
                            h = this.range.clone();
                            h.setStartAt(l, CKEDITOR.POSITION_BEFORE_START)
                        }
                        m = (!r || s) && l.equals(o);
                        if (h && !r)
                            for (; !l.getNext(k) && !m; ) {
                                t = l.getParent();
                                if (t.isBlockBoundary(this.forceBrBreak && !p && {br: 1})) {
                                    r = 1;
                                    s = 0;
                                    m || t.equals(o);
                                    h.setEndAt(t, CKEDITOR.POSITION_BEFORE_END);
                                    break
                                }
                                l = t;
                                s = 1;
                                m = l.equals(o);
                                w = 1
                            }
                        s && h.setEndAt(l, CKEDITOR.POSITION_AFTER_END);
                        l =
                                e(l, w, o);
                        if ((m = !l) || r && h)
                            break
                    }
                    if (!d) {
                        if (!h) {
                            this._.docEndMarker && this._.docEndMarker.remove();
                            return this._.nextNode = null
                        }
                        d = new CKEDITOR.dom.elementPath(h.startContainer, h.root);
                        l = d.blockLimit;
                        r = {div: 1, th: 1, td: 1};
                        d = d.block;
                        if (!d && l && !this.enforceRealBlocks && r[l.getName()] && h.checkStartOfBlock() && h.checkEndOfBlock() && !l.equals(h.root))
                            d = l;
                        else if (!d || this.enforceRealBlocks && d.getName() == "li") {
                            d = this.range.document.createElement(c);
                            h.extractContents().appendTo(d);
                            d.trim();
                            h.insertNode(d);
                            n = q = true
                        } else if (d.getName() !=
                                "li") {
                            if (!h.checkStartOfBlock() || !h.checkEndOfBlock()) {
                                d = d.clone(false);
                                h.extractContents().appendTo(d);
                                d.trim();
                                q = h.splitBlock();
                                n = !q.wasStartOfBlock;
                                q = !q.wasEndOfBlock;
                                h.insertNode(d)
                            }
                        } else if (!m)
                            this._.nextNode = d.equals(o) ? null : e(h.getBoundaryNodes().endNode, 1, o)
                    }
                    if (n)
                        (n = d.getPrevious()) && n.type == CKEDITOR.NODE_ELEMENT && (n.getName() == "br" ? n.remove() : n.getLast() && n.getLast().$.nodeName.toLowerCase() == "br" && n.getLast().remove());
                    if (q)
                        (n = d.getLast()) && n.type == CKEDITOR.NODE_ELEMENT && n.getName() == "br" &&
                                (!CKEDITOR.env.needsBrFiller || n.getPrevious(f) || n.getNext(f)) && n.remove();
                    if (!this._.nextNode)
                        this._.nextNode = m || d.equals(o) || !o ? null : e(d, 1, o);
                    return d
                }};
            CKEDITOR.dom.range.prototype.createIterator = function() {
                return new d(this)
            }
        }(), CKEDITOR.command = function(d, e) {
            this.uiItems = [];
            this.exec = function(a) {
                if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed())
                    return false;
                this.editorFocus && d.focus();
                return this.fire("exec") === false ? true : e.exec.call(this, d, a) !== false
            };
            this.refresh = function(a, b) {
                if (!this.readOnly &&
                        a.readOnly)
                    return true;
                if (this.context && !b.isContextFor(this.context)) {
                    this.disable();
                    return true
                }
                if (!this.checkAllowed(true)) {
                    this.disable();
                    return true
                }
                this.startDisabled || this.enable();
                this.modes && !this.modes[a.mode] && this.disable();
                return this.fire("refresh", {editor: a, path: b}) === false ? true : e.refresh && e.refresh.apply(this, arguments) !== false
            };
            var c;
            this.checkAllowed = function(a) {
                return!a && typeof c == "boolean" ? c : c = d.activeFilter.checkFeature(this)
            };
            CKEDITOR.tools.extend(this, e, {modes: {wysiwyg: 1}, editorFocus: 1,
                contextSensitive: !!e.context, state: CKEDITOR.TRISTATE_DISABLED});
            CKEDITOR.event.call(this)
        }, CKEDITOR.command.prototype = {enable: function() {
                this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState)
            }, disable: function() {
                this.setState(CKEDITOR.TRISTATE_DISABLED)
            }, setState: function(d) {
                if (this.state == d || d != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed())
                    return false;
                this.previousState = this.state;
                this.state = d;
                this.fire("state");
                return true
            }, toggleState: function() {
                this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
            }}, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR,
            docType: "<!DOCTYPE html>", bodyId: "", bodyClass: "", fullPage: !1, height: 200, extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + 90, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90]}, function() {
            function d(a, c, d, f, g) {
                var h = c.name;
                if ((f || typeof a.elements != "function" || a.elements(h)) && (!a.match || a.match(c))) {
                    if (f = !g) {
                        a:if (a.nothingRequired)
                            f = true;
                        else {
                            if (g = a.requiredClasses) {
                                h = c.classes;
                                for (f = 0; f < g.length; ++f)
                                    if (CKEDITOR.tools.indexOf(h, g[f]) == -1) {
                                        f = false;
                                        break a
                                    }
                            }
                            f = b(c.styles, a.requiredStyles) && b(c.attributes, a.requiredAttributes)
                        }
                        f = !f
                    }
                    if (!f) {
                        if (!a.propertiesOnly)
                            d.valid = true;
                        if (!d.allAttributes)
                            d.allAttributes = e(a.attributes, c.attributes, d.validAttributes);
                        if (!d.allStyles)
                            d.allStyles = e(a.styles, c.styles, d.validStyles);
                        if (!d.allClasses) {
                            a = a.classes;
                            c = c.classes;
                            f = d.validClasses;
                            if (a)
                                if (a === true)
                                    c = true;
                                else {
                                    for (var g = 0, h = c.length, o; g < h; ++g) {
                                        o = c[g];
                                        f[o] || (f[o] = a(o))
                                    }
                                    c = false
                                }
                            else
                                c =
                                        false;
                            d.allClasses = c
                        }
                    }
                }
            }
            function e(a, b, c) {
                if (!a)
                    return false;
                if (a === true)
                    return true;
                for (var d in b)
                    c[d] || (c[d] = a(d, b[d]));
                return false
            }
            function c(a, b) {
                if (!a)
                    return false;
                if (a === true)
                    return a;
                if (typeof a == "string") {
                    a = z(a);
                    return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b))
                }
                if (CKEDITOR.tools.isArray(a))
                    return a.length ? CKEDITOR.tools.convertArrayToObject(a) : false;
                var c = {}, d = 0, f;
                for (f in a) {
                    c[f] = a[f];
                    d++
                }
                return d ? c : false
            }
            function a(a) {
                if (a._.filterFunction)
                    return a._.filterFunction;
                var b =
                        /^cke:(object|embed|param)$/, c = /^(object|embed|param)$/;
                return a._.filterFunction = function(f, e, h, o, k, u, t) {
                    var s = f.name, w, m = false;
                    if (k)
                        f.name = s = s.replace(b, "$1");
                    if (h = h && h[s]) {
                        g(f);
                        for (s = 0; s < h.length; ++s)
                            l(a, f, h[s]);
                        i(f)
                    }
                    if (e) {
                        var s = f.name, h = e.elements[s], r = e.generic, e = {valid: false, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: false, allClasses: false, allStyles: false};
                        if (!h && !r) {
                            o.push(f);
                            return true
                        }
                        g(f);
                        if (h) {
                            s = 0;
                            for (w = h.length; s < w; ++s)
                                d(h[s], f, e, true, u)
                        }
                        if (r) {
                            s = 0;
                            for (w = r.length; s <
                                    w; ++s)
                                d(r[s], f, e, false, u)
                        }
                        if (!e.valid) {
                            o.push(f);
                            return true
                        }
                        u = e.validAttributes;
                        s = e.validStyles;
                        h = e.validClasses;
                        w = f.attributes;
                        var r = f.styles, x = w["class"], v = w.style, n, D, p = [], C = [], y = /^data-cke-/, I = false;
                        delete w.style;
                        delete w["class"];
                        if (!e.allAttributes)
                            for (n in w)
                                if (!u[n])
                                    if (y.test(n)) {
                                        if (n != (D = n.replace(/^data-cke-saved-/, "")) && !u[D]) {
                                            delete w[n];
                                            I = true
                                        }
                                    } else {
                                        delete w[n];
                                        I = true
                                    }
                        if (e.allStyles) {
                            if (v)
                                w.style = v
                        } else {
                            for (n in r)
                                s[n] ? p.push(n + ":" + r[n]) : I = true;
                            if (p.length)
                                w.style = p.sort().join("; ")
                        }
                        if (e.allClasses)
                            x &&
                                    (w["class"] = x);
                        else {
                            for (n in h)
                                h[n] && C.push(n);
                            C.length && (w["class"] = C.sort().join(" "));
                            x && C.length < x.split(/\s+/).length && (I = true)
                        }
                        I && (m = true);
                        if (!t && !j(f)) {
                            o.push(f);
                            return true
                        }
                    }
                    if (k)
                        f.name = f.name.replace(c, "cke:$1");
                    return m
                }
            }
            function b(a, b) {
                if (!b)
                    return true;
                for (var c = 0; c < b.length; ++c)
                    if (!(b[c]in a))
                        return false;
                return true
            }
            function f(a) {
                if (!a)
                    return{};
                for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length; )
                    b[a.shift()] = x;
                return b
            }
            function h(a) {
                for (var b, c, d, f, g = {}, e = 1, a = z(a); b = a.match(u); ) {
                    if (c =
                            b[2]) {
                        d = k(c, "styles");
                        f = k(c, "attrs");
                        c = k(c, "classes")
                    } else
                        d = f = c = null;
                    g["$" + e++] = {elements: b[1], classes: c, styles: d, attributes: f};
                    a = a.slice(b[0].length)
                }
                return g
            }
            function k(a, b) {
                var c = a.match(D[b]);
                return c ? z(c[1]) : null
            }
            function g(a) {
                if (!a.styles)
                    a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1);
                if (!a.classes)
                    a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) : []
            }
            function i(a) {
                var b = a.attributes, c;
                delete b.style;
                delete b["class"];
                if (c = CKEDITOR.tools.writeCssText(a.styles,
                        true))
                    b.style = c;
                a.classes.length && (b["class"] = a.classes.sort().join(" "))
            }
            function j(a) {
                switch (a.name) {
                    case "a":
                        if (!a.children.length && !a.attributes.name)
                            return false;
                        break;
                    case "img":
                        if (!a.attributes.src)
                            return false
                }
                return true
            }
            function m(a) {
                return!a ? false : a === true ? true : function(b) {
                    return b in a
                }
            }
            function n() {
                return new CKEDITOR.htmlParser.element("br")
            }
            function q(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || t.$block[a.name])
            }
            function o(a, b, c) {
                var d = a.name;
                if (t.$empty[d] || !a.children.length)
                    if (d ==
                            "hr" && b == "br")
                        a.replaceWith(n());
                    else {
                        a.parent && c.push({check: "it", el: a.parent});
                        a.remove()
                    }
                else if (t.$block[d] || d == "tr")
                    if (b == "br") {
                        if (a.previous && !q(a.previous)) {
                            b = n();
                            b.insertBefore(a)
                        }
                        if (a.next && !q(a.next)) {
                            b = n();
                            b.insertAfter(a)
                        }
                        a.replaceWithChildren()
                    } else {
                        var d = a.children, f;
                        b:{
                            f = t[b];
                            for (var g = 0, e = d.length, h; g < e; ++g) {
                                h = d[g];
                                if (h.type == CKEDITOR.NODE_ELEMENT && !f[h.name]) {
                                    f = false;
                                    break b
                                }
                            }
                            f = true
                        }
                        if (f) {
                            a.name = b;
                            a.attributes = {};
                            c.push({check: "parent-down", el: a})
                        } else {
                            f = a.parent;
                            for (var g = f.type ==
                                    CKEDITOR.NODE_DOCUMENT_FRAGMENT || f.name == "body", o, e = d.length; e > 0; ) {
                                h = d[--e];
                                if (g && (h.type == CKEDITOR.NODE_TEXT || h.type == CKEDITOR.NODE_ELEMENT && t.$inline[h.name])) {
                                    if (!o) {
                                        o = new CKEDITOR.htmlParser.element(b);
                                        o.insertAfter(a);
                                        c.push({check: "parent-down", el: o})
                                    }
                                    o.add(h, 0)
                                } else {
                                    o = null;
                                    h.insertAfter(a);
                                    f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && (h.type == CKEDITOR.NODE_ELEMENT && !t[f.name][h.name]) && c.push({check: "el-up", el: h})
                                }
                            }
                            a.remove()
                        }
                    }
                else if (d == "style")
                    a.remove();
                else {
                    a.parent && c.push({check: "it", el: a.parent});
                    a.replaceWithChildren()
                }
            }
            function l(a, b, c) {
                var d, f;
                for (d = 0; d < c.length; ++d) {
                    f = c[d];
                    if ((!f.check || a.check(f.check, false)) && (!f.left || f.left(b))) {
                        f.right(b, I);
                        break
                    }
                }
            }
            function r(a, b) {
                var c = b.getDefinition(), d = c.attributes, f = c.styles, g, e, h, o;
                if (a.name != c.element)
                    return false;
                for (g in d)
                    if (g == "class") {
                        c = d[g].split(/\s+/);
                        for (h = a.classes.join("|"); o = c.pop(); )
                            if (h.indexOf(o) == -1)
                                return false
                    } else if (a.attributes[g] != d[g])
                        return false;
                for (e in f)
                    if (a.styles[e] != f[e])
                        return false;
                return true
            }
            function p(a,
                    b) {
                var c, d;
                if (typeof a == "string")
                    c = a;
                else if (a instanceof CKEDITOR.style)
                    d = a;
                else {
                    c = a[0];
                    d = a[1]
                }
                return[{element: c, left: d, right: function(a, c) {
                            c.transform(a, b)
                        }}]
            }
            function s(a) {
                return function(b) {
                    return r(b, a)
                }
            }
            function w(a) {
                return function(b, c) {
                    c[a](b)
                }
            }
            var t = CKEDITOR.dtd, v = CKEDITOR.tools.copy, z = CKEDITOR.tools.trim, x = "cke-test", y = ["", "p", "br", "div"];
            CKEDITOR.filter = function(a) {
                this.allowedContent = [];
                this.disabled = false;
                this.editor = null;
                this.id = CKEDITOR.tools.getNextNumber();
                this._ = {rules: {}, transformations: {},
                    cachedTests: {}};
                CKEDITOR.filter.instances[this.id] = this;
                if (a instanceof CKEDITOR.editor) {
                    a = this.editor = a;
                    this.customConfig = true;
                    var b = a.config.allowedContent;
                    if (b === true)
                        this.disabled = true;
                    else {
                        if (!b)
                            this.customConfig = false;
                        this.allow(b, "config", 1);
                        this.allow(a.config.extraAllowedContent, "extra", 1);
                        this.allow(y[a.enterMode] + " " + y[a.shiftEnterMode], "default", 1)
                    }
                } else {
                    this.customConfig = false;
                    this.allow(a, "default", 1)
                }
            };
            CKEDITOR.filter.instances = {};
            CKEDITOR.filter.prototype = {allow: function(a, b, d) {
                    if (this.disabled ||
                            this.customConfig && !d || !a)
                        return false;
                    this._.cachedChecks = {};
                    var f, g;
                    if (typeof a == "string")
                        a = h(a);
                    else if (a instanceof CKEDITOR.style) {
                        g = a.getDefinition();
                        d = {};
                        a = g.attributes;
                        d[g.element] = g = {styles: g.styles, requiredStyles: g.styles && CKEDITOR.tools.objectKeys(g.styles)};
                        if (a) {
                            a = v(a);
                            g.classes = a["class"] ? a["class"].split(/\s+/) : null;
                            g.requiredClasses = g.classes;
                            delete a["class"];
                            g.attributes = a;
                            g.requiredAttributes = a && CKEDITOR.tools.objectKeys(a)
                        }
                        a = d
                    } else if (CKEDITOR.tools.isArray(a)) {
                        for (f = 0; f < a.length; ++f)
                            g =
                                    this.allow(a[f], b, d);
                        return g
                    }
                    var e, d = [];
                    for (e in a) {
                        g = a[e];
                        g = typeof g == "boolean" ? {} : typeof g == "function" ? {match: g} : v(g);
                        if (e.charAt(0) != "$")
                            g.elements = e;
                        if (b)
                            g.featureName = b.toLowerCase();
                        var o = g;
                        o.elements = c(o.elements, /\s+/) || null;
                        o.propertiesOnly = o.propertiesOnly || o.elements === true;
                        var i = /\s*,\s*/, k = void 0;
                        for (k in C) {
                            o[k] = c(o[k], i) || null;
                            var l = o, j = F[k], u = c(o[F[k]], i), s = o[k], w = [], t = true, r = void 0;
                            u ? t = false : u = {};
                            for (r in s)
                                if (r.charAt(0) == "!") {
                                    r = r.slice(1);
                                    w.push(r);
                                    u[r] = true;
                                    t = false
                                }
                            for (; r = w.pop(); ) {
                                s[r] =
                                        s["!" + r];
                                delete s["!" + r]
                            }
                            l[j] = (t ? false : u) || null
                        }
                        o.match = o.match || null;
                        this.allowedContent.push(g);
                        d.push(g)
                    }
                    b = this._.rules;
                    e = b.elements || {};
                    a = b.generic || [];
                    g = 0;
                    for (o = d.length; g < o; ++g) {
                        i = v(d[g]);
                        k = i.classes === true || i.styles === true || i.attributes === true;
                        l = i;
                        j = void 0;
                        for (j in C)
                            l[j] = m(l[j]);
                        u = true;
                        for (j in F) {
                            j = F[j];
                            l[j] = CKEDITOR.tools.objectKeys(l[j]);
                            l[j] && (u = false)
                        }
                        l.nothingRequired = u;
                        if (i.elements === true || i.elements === null) {
                            i.elements = m(i.elements);
                            a[k ? "unshift" : "push"](i)
                        } else {
                            l = i.elements;
                            delete i.elements;
                            for (f in l)
                                if (e[f])
                                    e[f][k ? "unshift" : "push"](i);
                                else
                                    e[f] = [i]
                        }
                    }
                    b.elements = e;
                    b.generic = a.length ? a : null;
                    return true
                }, applyTo: function(b, c, d, f) {
                    if (this.disabled)
                        return false;
                    var g = [], e = !d && this._.rules, h = this._.transformations, i = a(this), k = this.editor && this.editor.config.protectedSource, l = false;
                    b.forEach(function(a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) {
                            if (a.attributes["data-cke-filter"] == "off")
                                return false;
                            if (!c || !(a.name == "span" && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-")))
                                i(a,
                                        e, h, g, c) && (l = true)
                        } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var b;
                            a:{
                                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                                b = [];
                                var f, o, E;
                                if (k)
                                    for (o = 0; o < k.length; ++o)
                                        if ((E = d.match(k[o])) && E[0].length == d.length) {
                                            b = true;
                                            break a
                                        }
                                d = CKEDITOR.htmlParser.fragment.fromHtml(d);
                                d.children.length == 1 && (f = d.children[0]).type == CKEDITOR.NODE_ELEMENT && i(f, e, h, b, c);
                                b = !b.length
                            }
                            b || g.push(a)
                        }
                    }, null, true);
                    g.length && (l = true);
                    for (var u, b = [], f = y[f || (this.editor ? this.editor.enterMode :
                            CKEDITOR.ENTER_P)]; d = g.pop(); )
                        d.type == CKEDITOR.NODE_ELEMENT ? o(d, f, b) : d.remove();
                    for (; u = b.pop(); ) {
                        d = u.el;
                        if (d.parent)
                            switch (u.check) {
                                case "it":
                                    t.$removeEmpty[d.name] && !d.children.length ? o(d, f, b) : j(d) || o(d, f, b);
                                    break;
                                case "el-up":
                                    d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !t[d.parent.name][d.name] && o(d, f, b);
                                    break;
                                case "parent-down":
                                    d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !t[d.parent.name][d.name] && o(d.parent, f, b)
                                }
                    }
                    return l
                }, checkFeature: function(a) {
                    if (this.disabled || !a)
                        return true;
                    a.toFeature &&
                            (a = a.toFeature(this.editor));
                    return!a.requiredContent || this.check(a.requiredContent)
                }, disable: function() {
                    this.disabled = true
                }, addContentForms: function(a) {
                    if (!this.disabled && a) {
                        var b, c, d = [], f;
                        for (b = 0; b < a.length && !f; ++b) {
                            c = a[b];
                            if ((typeof c == "string" || c instanceof CKEDITOR.style) && this.check(c))
                                f = c
                        }
                        if (f) {
                            for (b = 0; b < a.length; ++b)
                                d.push(p(a[b], f));
                            this.addTransformations(d)
                        }
                    }
                }, addFeature: function(a) {
                    if (this.disabled || !a)
                        return true;
                    a.toFeature && (a = a.toFeature(this.editor));
                    this.allow(a.allowedContent, a.name);
                    this.addTransformations(a.contentTransformations);
                    this.addContentForms(a.contentForms);
                    return this.customConfig && a.requiredContent ? this.check(a.requiredContent) : true
                }, addTransformations: function(a) {
                    var b, c;
                    if (!this.disabled && a) {
                        var d = this._.transformations, f;
                        for (f = 0; f < a.length; ++f) {
                            b = a[f];
                            var g = void 0, e = void 0, h = void 0, o = void 0, i = void 0, k = void 0;
                            c = [];
                            for (e = 0; e < b.length; ++e) {
                                h = b[e];
                                if (typeof h == "string") {
                                    h = h.split(/\s*:\s*/);
                                    o = h[0];
                                    i = null;
                                    k = h[1]
                                } else {
                                    o = h.check;
                                    i = h.left;
                                    k = h.right
                                }
                                if (!g) {
                                    g = h;
                                    g = g.element ?
                                            g.element : o ? o.match(/^([a-z0-9]+)/i)[0] : g.left.getDefinition().element
                                }
                                i instanceof CKEDITOR.style && (i = s(i));
                                c.push({check: o == g ? null : o, left: i, right: typeof k == "string" ? w(k) : k})
                            }
                            b = g;
                            d[b] || (d[b] = []);
                            d[b].push(c)
                        }
                    }
                }, check: function(b, c, d) {
                    if (this.disabled)
                        return true;
                    if (CKEDITOR.tools.isArray(b)) {
                        for (var g = b.length; g--; )
                            if (this.check(b[g], c, d))
                                return true;
                        return false
                    }
                    var e, o;
                    if (typeof b == "string") {
                        o = b + "<" + (c === false ? "0" : "1") + (d ? "1" : "0") + ">";
                        if (o in this._.cachedChecks)
                            return this._.cachedChecks[o];
                        g =
                                h(b).$1;
                        e = g.styles;
                        var k = g.classes;
                        g.name = g.elements;
                        g.classes = k = k ? k.split(/\s*,\s*/) : [];
                        g.styles = f(e);
                        g.attributes = f(g.attributes);
                        g.children = [];
                        k.length && (g.attributes["class"] = k.join(" "));
                        if (e)
                            g.attributes.style = CKEDITOR.tools.writeCssText(g.styles);
                        e = g
                    } else {
                        g = b.getDefinition();
                        e = g.styles;
                        k = g.attributes || {};
                        if (e) {
                            e = v(e);
                            k.style = CKEDITOR.tools.writeCssText(e, true)
                        } else
                            e = {};
                        e = {name: g.element, attributes: k, classes: k["class"] ? k["class"].split(/\s+/) : [], styles: e, children: []}
                    }
                    var k = CKEDITOR.tools.clone(e),
                            j = [], u;
                    if (c !== false && (u = this._.transformations[e.name])) {
                        for (g = 0; g < u.length; ++g)
                            l(this, e, u[g]);
                        i(e)
                    }
                    a(this)(k, this._.rules, c === false ? false : this._.transformations, j, false, !d, !d);
                    c = j.length > 0 ? false : CKEDITOR.tools.objectCompare(e.attributes, k.attributes, true) ? true : false;
                    typeof b == "string" && (this._.cachedChecks[o] = c);
                    return c
                }, getAllowedEnterMode: function() {
                    var a = ["p", "div", "br"], b = {p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR};
                    return function(c, d) {
                        var f = a.slice(), g;
                        if (this.check(y[c]))
                            return c;
                        for (d || (f = f.reverse()); g = f.pop(); )
                            if (this.check(g))
                                return b[g];
                        return CKEDITOR.ENTER_BR
                    }
                }()};
            var C = {styles: 1, attributes: 1, classes: 1}, F = {styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses"}, u = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, D = {styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/}, I = CKEDITOR.filter.transformationsTools = {sizeToStyle: function(a) {
                    this.lengthToStyle(a, "width");
                    this.lengthToStyle(a,
                            "height")
                }, sizeToAttribute: function(a) {
                    this.lengthToAttribute(a, "width");
                    this.lengthToAttribute(a, "height")
                }, lengthToStyle: function(a, b, c) {
                    c = c || b;
                    if (!(c in a.styles)) {
                        var d = a.attributes[b];
                        if (d) {
                            /^\d+$/.test(d) && (d = d + "px");
                            a.styles[c] = d
                        }
                    }
                    delete a.attributes[b]
                }, lengthToAttribute: function(a, b, c) {
                    c = c || b;
                    if (!(c in a.attributes)) {
                        var d = a.styles[b], f = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                        f ? a.attributes[c] = f[1] : d == x && (a.attributes[c] = x)
                    }
                    delete a.styles[b]
                }, alignmentToStyle: function(a) {
                    if (!("float"in a.styles)) {
                        var b =
                                a.attributes.align;
                        if (b == "left" || b == "right")
                            a.styles["float"] = b
                    }
                    delete a.attributes.align
                }, alignmentToAttribute: function(a) {
                    if (!("align"in a.attributes)) {
                        var b = a.styles["float"];
                        if (b == "left" || b == "right")
                            a.attributes.align = b
                    }
                    delete a.styles["float"]
                }, matchesStyle: r, transform: function(a, b) {
                    if (typeof b == "string")
                        a.name = b;
                    else {
                        var c = b.getDefinition(), d = c.styles, f = c.attributes, g, e, h, o;
                        a.name = c.element;
                        for (g in f)
                            if (g == "class") {
                                c = a.classes.join("|");
                                for (h = f[g].split(/\s+/); o = h.pop(); )
                                    c.indexOf(o) == -1 &&
                                            a.classes.push(o)
                            } else
                                a.attributes[g] = f[g];
                        for (e in d)
                            a.styles[e] = d[e]
                    }
                }}
        }(), function() {
            CKEDITOR.focusManager = function(d) {
                if (d.focusManager)
                    return d.focusManager;
                this.hasFocus = false;
                this.currentActive = null;
                this._ = {editor: d};
                return this
            };
            CKEDITOR.focusManager._ = {blurDelay: 200};
            CKEDITOR.focusManager.prototype = {focus: function(d) {
                    this._.timer && clearTimeout(this._.timer);
                    if (d)
                        this.currentActive = d;
                    if (!this.hasFocus && !this._.locked) {
                        (d = CKEDITOR.currentInstance) && d.focusManager.blur(1);
                        this.hasFocus = true;
                        (d = this._.editor.container) && d.addClass("cke_focus");
                        this._.editor.fire("focus")
                    }
                }, lock: function() {
                    this._.locked = 1
                }, unlock: function() {
                    delete this._.locked
                }, blur: function(d) {
                    function e() {
                        if (this.hasFocus) {
                            this.hasFocus = false;
                            var a = this._.editor.container;
                            a && a.removeClass("cke_focus");
                            this._.editor.fire("blur")
                        }
                    }
                    if (!this._.locked) {
                        this._.timer && clearTimeout(this._.timer);
                        var c = CKEDITOR.focusManager._.blurDelay;
                        d || !c ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                            delete this._.timer;
                            e.call(this)
                        }, c, this)
                    }
                }, add: function(d, e) {
                    var c = d.getCustomData("focusmanager");
                    if (!c || c != this) {
                        c && c.remove(d);
                        var c = "focus", a = "blur";
                        if (e)
                            if (CKEDITOR.env.ie) {
                                c = "focusin";
                                a = "focusout"
                            } else
                                CKEDITOR.event.useCapture = 1;
                        var b = {blur: function() {
                                d.equals(this.currentActive) && this.blur()
                            }, focus: function() {
                                this.focus(d)
                            }};
                        d.on(c, b.focus, this);
                        d.on(a, b.blur, this);
                        if (e)
                            CKEDITOR.event.useCapture = 0;
                        d.setCustomData("focusmanager", this);
                        d.setCustomData("focusmanager_handlers", b)
                    }
                }, remove: function(d) {
                    d.removeCustomData("focusmanager");
                    var e = d.removeCustomData("focusmanager_handlers");
                    d.removeListener("blur", e.blur);
                    d.removeListener("focus", e.focus)
                }}
        }(), CKEDITOR.keystrokeHandler = function(d) {
            if (d.keystrokeHandler)
                return d.keystrokeHandler;
            this.keystrokes = {};
            this.blockedKeystrokes = {};
            this._ = {editor: d};
            return this
        }, function() {
            var d, e = function(a) {
                var a = a.data, b = a.getKeystroke(), c = this.keystrokes[b], e = this._.editor;
                d = e.fire("key", {keyCode: b}) === false;
                if (!d) {
                    c && (d = e.execCommand(c, {from: "keystrokeHandler"}) !== false);
                    d || (d = !!this.blockedKeystrokes[b])
                }
                d &&
                        a.preventDefault(true);
                return!d
            }, c = function(a) {
                if (d) {
                    d = false;
                    a.data.preventDefault(true)
                }
            };
            CKEDITOR.keystrokeHandler.prototype = {attach: function(a) {
                    a.on("keydown", e, this);
                    if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)
                        a.on("keypress", c, this)
                }}
        }(), function() {
            CKEDITOR.lang = {languages: {af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1,
                    ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1}, rtl: {ar: 1, fa: 1, he: 1, ku: 1, ug: 1}, load: function(d, e, c) {
                    if (!d || !CKEDITOR.lang.languages[d])
                        d = this.detect(e, d);
                    this[d] ? c(d, this[d]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + d + ".js"), function() {
                        this[d].dir = this.rtl[d] ? "rtl" : "ltr";
                        c(d, this[d])
                    }, this)
                }, detect: function(d, e) {
                    var c = this.languages, e = e || navigator.userLanguage || navigator.language ||
                            d, a = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), b = a[1], a = a[2];
                    c[b + "-" + a] ? b = b + "-" + a : c[b] || (b = null);
                    CKEDITOR.lang.detect = b ? function() {
                        return b
                    } : function(a) {
                        return a
                    };
                    return b || d
                }}
        }(), CKEDITOR.scriptLoader = function() {
            var d = {}, e = {};
            return{load: function(c, a, b, f) {
                    var h = typeof c == "string";
                    h && (c = [c]);
                    b || (b = CKEDITOR);
                    var k = c.length, g = [], i = [], j = function(c) {
                        a && (h ? a.call(b, c) : a.call(b, g, i))
                    };
                    if (k === 0)
                        j(true);
                    else {
                        var m = function(a, b) {
                            (b ? g : i).push(a);
                            if (--k <= 0) {
                                f && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                                j(b)
                            }
                        }, n = function(a, b) {
                            d[a] = 1;
                            var c = e[a];
                            delete e[a];
                            for (var f = 0; f < c.length; f++)
                                c[f](a, b)
                        }, q = function(b) {
                            if (d[b])
                                m(b, true);
                            else {
                                var c = e[b] || (e[b] = []);
                                c.push(m);
                                if (!(c.length > 1)) {
                                    var f = new CKEDITOR.dom.element("script");
                                    f.setAttributes({type: "text/javascript", src: b});
                                    if (a)
                                        if (CKEDITOR.env.ie && CKEDITOR.env.version < 11)
                                            f.$.onreadystatechange = function() {
                                                if (f.$.readyState == "loaded" || f.$.readyState == "complete") {
                                                    f.$.onreadystatechange = null;
                                                    n(b, true)
                                                }
                                            };
                                        else {
                                            f.$.onload = function() {
                                                setTimeout(function() {
                                                    n(b, true)
                                                },
                                                        0)
                                            };
                                            f.$.onerror = function() {
                                                n(b, false)
                                            }
                                        }
                                    f.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        };
                        f && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                        for (var o = 0; o < k; o++)
                            q(c[o])
                    }
                }, queue: function() {
                    function c() {
                        var b;
                        (b = a[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
                    }
                    var a = [];
                    return function(b, d) {
                        var e = this;
                        a.push({scriptUrl: b, callback: function() {
                                d && d.apply(this, arguments);
                                a.shift();
                                c.call(e)
                            }});
                        a.length == 1 && c.call(this)
                    }
                }()}
        }(), CKEDITOR.resourceManager = function(d, e) {
            this.basePath = d;
            this.fileName =
                    e;
            this.registered = {};
            this.loaded = {};
            this.externals = {};
            this._ = {waitingList: {}}
        }, CKEDITOR.resourceManager.prototype = {add: function(d, e) {
                if (this.registered[d])
                    throw'[CKEDITOR.resourceManager.add] The resource name "' + d + '" is already registered.';
                var c = this.registered[d] = e || {};
                c.name = d;
                c.path = this.getPath(d);
                CKEDITOR.fire(d + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c);
                return this.get(d)
            }, get: function(d) {
                return this.registered[d] || null
            }, getPath: function(d) {
                var e = this.externals[d];
                return CKEDITOR.getUrl(e &&
                        e.dir || this.basePath + d + "/")
            }, getFilePath: function(d) {
                var e = this.externals[d];
                return CKEDITOR.getUrl(this.getPath(d) + (e ? e.file : this.fileName + ".js"))
            }, addExternal: function(d, e, c) {
                for (var d = d.split(","), a = 0; a < d.length; a++) {
                    var b = d[a];
                    c || (e = e.replace(/[^\/]+$/, function(a) {
                        c = a;
                        return""
                    }));
                    this.externals[b] = {dir: e, file: c || this.fileName + ".js"}
                }
            }, load: function(d, e, c) {
                CKEDITOR.tools.isArray(d) || (d = d ? [d] : []);
                for (var a = this.loaded, b = this.registered, f = [], h = {}, k = {}, g = 0; g < d.length; g++) {
                    var i = d[g];
                    if (i)
                        if (!a[i] &&
                                !b[i]) {
                            var j = this.getFilePath(i);
                            f.push(j);
                            j in h || (h[j] = []);
                            h[j].push(i)
                        } else
                            k[i] = this.get(i)
                }
                CKEDITOR.scriptLoader.load(f, function(b, d) {
                    if (d.length)
                        throw'[CKEDITOR.resourceManager.load] Resource name "' + h[d[0]].join(",") + '" was not found at "' + d[0] + '".';
                    for (var f = 0; f < b.length; f++)
                        for (var g = h[b[f]], i = 0; i < g.length; i++) {
                            var j = g[i];
                            k[j] = this.get(j);
                            a[j] = 1
                        }
                    e.call(c, k)
                }, this)
            }}, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load,
                function(d) {
                    var e = {};
                    return function(c, a, b) {
                        var f = {}, h = function(c) {
                            d.call(this, c, function(c) {
                                CKEDITOR.tools.extend(f, c);
                                var d = [], k;
                                for (k in c) {
                                    var m = c[k], n = m && m.requires;
                                    if (!e[k]) {
                                        if (m.icons)
                                            for (var q = m.icons.split(","), o = q.length; o--; )
                                                CKEDITOR.skin.addIcon(q[o], m.path + "icons/" + (CKEDITOR.env.hidpi && m.hidpi ? "hidpi/" : "") + q[o] + ".png");
                                        e[k] = 1
                                    }
                                    if (n) {
                                        n.split && (n = n.split(","));
                                        for (m = 0; m < n.length; m++)
                                            f[n[m]] || d.push(n[m])
                                    }
                                }
                                if (d.length)
                                    h.call(this, d);
                                else {
                                    for (k in f) {
                                        m = f[k];
                                        if (m.onLoad && !m.onLoad._called) {
                                            m.onLoad() ===
                                                    false && delete f[k];
                                            m.onLoad._called = 1
                                        }
                                    }
                                    a && a.call(b || window, f)
                                }
                            }, this)
                        };
                        h.call(this, c)
                    }
                }), CKEDITOR.plugins.setLang = function(d, e, c) {
            var a = this.get(d), d = a.langEntries || (a.langEntries = {}), a = a.lang || (a.lang = []);
            a.split && (a = a.split(","));
            CKEDITOR.tools.indexOf(a, e) == -1 && a.push(e);
            d[e] = c
        }, CKEDITOR.ui = function(d) {
            if (d.ui)
                return d.ui;
            this.items = {};
            this.instances = {};
            this.editor = d;
            this._ = {handlers: {}};
            return this
        }, CKEDITOR.ui.prototype = {add: function(d, e, c) {
                c.name = d.toLowerCase();
                var a = this.items[d] = {type: e,
                    command: c.command || null, args: Array.prototype.slice.call(arguments, 2)};
                CKEDITOR.tools.extend(a, c)
            }, get: function(d) {
                return this.instances[d]
            }, create: function(d) {
                var e = this.items[d], c = e && this._.handlers[e.type], a = e && e.command && this.editor.getCommand(e.command), c = c && c.create.apply(this, e.args);
                this.instances[d] = c;
                a && a.uiItems.push(c);
                if (c && !c.type)
                    c.type = e.type;
                return c
            }, addHandler: function(d, e) {
                this._.handlers[d] = e
            }, space: function(d) {
                return CKEDITOR.document.getById(this.spaceId(d))
            }, spaceId: function(d) {
                return this.editor.id +
                        "_" + d
            }}, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
            function d(a, d, f) {
                CKEDITOR.event.call(this);
                a = a && CKEDITOR.tools.clone(a);
                if (d !== void 0) {
                    if (d instanceof CKEDITOR.dom.element) {
                        if (!f)
                            throw Error("One of the element modes must be specified.");
                    } else
                        throw Error("Expect element of type CKEDITOR.dom.element.");
                    if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE)
                        throw Error("Inline element mode is not supported on IE quirks.");
                    if (!(f == CKEDITOR.ELEMENT_MODE_INLINE ? d.is(CKEDITOR.dtd.$editable) ||
                            d.is("textarea") : f == CKEDITOR.ELEMENT_MODE_REPLACE ? !d.is(CKEDITOR.dtd.$nonBodyContent) : 1))
                        throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
                    this.element = d;
                    this.elementMode = f;
                    this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
                } else
                    this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
                this._ = {};
                this.commands = {};
                this.templates = {};
                this.name = this.name || e();
                this.id = CKEDITOR.tools.getNextId();
                this.status = "unloaded";
                this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
                this.ui = new CKEDITOR.ui(this);
                this.focusManager = new CKEDITOR.focusManager(this);
                this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
                this.on("readOnly", c);
                this.on("selectionChange", function(a) {
                    b(this, a.data.path)
                });
                this.on("activeFilterChange", function() {
                    b(this, this.elementPath(), true)
                });
                this.on("mode", c);
                this.on("instanceReady", function() {
                    this.config.startupFocus && this.focus()
                });
                CKEDITOR.fire("instanceCreated", null, this);
                CKEDITOR.add(this);
                CKEDITOR.tools.setTimeout(function() {
                    h(this, a)
                }, 0, this)
            }
            function e() {
                do
                    var a = "editor" + ++n;
                while (CKEDITOR.instances[a]);
                return a
            }
            function c() {
                var b = this.commands, c;
                for (c in b)
                    a(this, b[c])
            }
            function a(a, b) {
                b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
            }
            function b(a, b, c) {
                if (b) {
                    var d, f, g = a.commands;
                    for (f in g) {
                        d = g[f];
                        (c || d.contextSensitive) && d.refresh(a, b)
                    }
                }
            }
            function f(a) {
                var b = a.config.customConfig;
                if (!b)
                    return false;
                var b = CKEDITOR.getUrl(b), c = q[b] || (q[b] = {});
                if (c.fn) {
                    c.fn.call(a, a.config);
                    (CKEDITOR.getUrl(a.config.customConfig) ==
                            b || !f(a)) && a.fireOnce("customConfigLoaded")
                } else
                    CKEDITOR.scriptLoader.queue(b, function() {
                        c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {
                        };
                        f(a)
                    });
                return true
            }
            function h(a, b) {
                a.on("customConfigLoaded", function() {
                    if (b) {
                        if (b.on)
                            for (var c in b.on)
                                a.on(c, b.on[c]);
                        CKEDITOR.tools.extend(a.config, b, true);
                        delete a.config.on
                    }
                    c = a.config;
                    a.readOnly = !(!c.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") : a.element.isReadOnly() : a.elementMode ==
                            CKEDITOR.ELEMENT_MODE_REPLACE && a.element.hasAttribute("disabled")));
                    a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : false;
                    a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                    a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                    a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                    if (c.skin)
                        CKEDITOR.skinName = c.skin;
                    a.fireOnce("configLoaded");
                    a.dataProcessor =
                            new CKEDITOR.htmlDataProcessor(a);
                    a.filter = a.activeFilter = new CKEDITOR.filter(a);
                    k(a)
                });
                if (b && b.customConfig != void 0)
                    a.config.customConfig = b.customConfig;
                f(a) || a.fireOnce("customConfigLoaded")
            }
            function k(a) {
                CKEDITOR.skin.loadPart("editor", function() {
                    g(a)
                })
            }
            function g(a) {
                CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
                    var d = a.config.title;
                    a.langCode = b;
                    a.lang = CKEDITOR.tools.prototypedCopy(c);
                    a.title = typeof d == "string" || d === false ? d : [a.lang.editor, a.name].join(", ");
                    if (CKEDITOR.env.gecko &&
                            CKEDITOR.env.version < 10900 && a.lang.dir == "rtl")
                        a.lang.dir = "ltr";
                    if (!a.config.contentsLangDirection)
                        a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                    a.fire("langLoaded");
                    i(a)
                })
            }
            function i(a) {
                a.getStylesSet(function(b) {
                    a.once("loaded", function() {
                        a.fire("stylesSet", {styles: b})
                    }, null, null, 1);
                    j(a)
                })
            }
            function j(a) {
                var b = a.config, c = b.plugins, d = b.extraPlugins, f = b.removePlugins;
                if (d)
                    var g = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)",
                            "g"), c = c.replace(g, ""), c = c + ("," + d);
                if (f)
                    var e = RegExp("(?:^|,)(?:" + f.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(e, "");
                CKEDITOR.env.air && (c = c + ",adobeair");
                CKEDITOR.plugins.load(c.split(","), function(c) {
                    var d = [], f = [], g = [];
                    a.plugins = c;
                    for (var h in c) {
                        var k = c[h], i = k.lang, j = null, s = k.requires, B;
                        CKEDITOR.tools.isArray(s) && (s = s.join(","));
                        if (s && (B = s.match(e)))
                            for (; s = B.pop(); )
                                CKEDITOR.tools.setTimeout(function(a, b) {
                                    throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' +
                                            b + '" plugin.');
                                }, 0, null, [s, h]);
                        if (i && !a.lang[h]) {
                            i.split && (i = i.split(","));
                            if (CKEDITOR.tools.indexOf(i, a.langCode) >= 0)
                                j = a.langCode;
                            else {
                                j = a.langCode.replace(/-.*/, "");
                                j = j != a.langCode && CKEDITOR.tools.indexOf(i, j) >= 0 ? j : CKEDITOR.tools.indexOf(i, "en") >= 0 ? "en" : i[0]
                            }
                            if (!k.langEntries || !k.langEntries[j])
                                g.push(CKEDITOR.getUrl(k.path + "lang/" + j + ".js"));
                            else {
                                a.lang[h] = k.langEntries[j];
                                j = null
                            }
                        }
                        f.push(j);
                        d.push(k)
                    }
                    CKEDITOR.scriptLoader.load(g, function() {
                        for (var c = ["beforeInit", "init", "afterInit"], g = 0; g < c.length; g++)
                            for (var e =
                                    0; e < d.length; e++) {
                                var h = d[e];
                                g === 0 && (f[e] && h.lang && h.langEntries) && (a.lang[h.name] = h.langEntries[f[e]]);
                                if (h[c[g]])
                                    h[c[g]](a)
                            }
                        a.fireOnce("pluginsLoaded");
                        b.keystrokes && a.setKeystroke(a.config.keystrokes);
                        for (e = 0; e < a.config.blockedKeystrokes.length; e++)
                            a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] = 1;
                        a.status = "loaded";
                        a.fireOnce("loaded");
                        CKEDITOR.fire("instanceLoaded", null, a)
                    })
                })
            }
            function m() {
                var a = this.element;
                if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                    var b = this.getData();
                    this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                    a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                    return true
                }
                return false
            }
            d.prototype = CKEDITOR.editor.prototype;
            CKEDITOR.editor = d;
            var n = 0, q = {};
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {addCommand: function(b, c) {
                    c.name = b.toLowerCase();
                    var d = new CKEDITOR.command(this, c);
                    this.mode && a(this, d);
                    return this.commands[b] = d
                }, _attachToForm: function() {
                    var a = this, b = a.element, c = new CKEDITOR.dom.element(b.$.form);
                    if (b.is("textarea") && c) {
                        var d = function(c) {
                            a.updateElement();
                            a._.required && (!b.getValue() && a.fire("required") === false) && c.data.preventDefault()
                        };
                        c.on("submit", d);
                        if (c.$.submit && c.$.submit.call && c.$.submit.apply)
                            c.$.submit = CKEDITOR.tools.override(c.$.submit, function(a) {
                                return function() {
                                    d();
                                    a.apply ? a.apply(this) : a()
                                }
                            });
                        a.on("destroy", function() {
                            c.removeListener("submit", d)
                        })
                    }
                }, destroy: function(a) {
                    this.fire("beforeDestroy");
                    !a && m.call(this);
                    this.editable(null);
                    this.status = "destroyed";
                    this.fire("destroy");
                    this.removeAllListeners();
                    CKEDITOR.remove(this);
                    CKEDITOR.fire("instanceDestroyed",
                            null, this)
                }, elementPath: function(a) {
                    if (!a) {
                        a = this.getSelection();
                        if (!a)
                            return null;
                        a = a.getStartElement()
                    }
                    return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
                }, createRange: function() {
                    var a = this.editable();
                    return a ? new CKEDITOR.dom.range(a) : null
                }, execCommand: function(a, b) {
                    var c = this.getCommand(a), d = {name: a, commandData: b, command: c};
                    if (c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== false) {
                        d.returnValue = c.exec(d.commandData);
                        if (!c.async && this.fire("afterCommandExec",
                                d) !== false)
                            return d.returnValue
                    }
                    return false
                }, getCommand: function(a) {
                    return this.commands[a]
                }, getData: function(a) {
                    !a && this.fire("beforeGetData");
                    var b = this._.data;
                    if (typeof b != "string")
                        b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                    b = {dataValue: b};
                    !a && this.fire("getData", b);
                    return b.dataValue
                }, getSnapshot: function() {
                    var a = this.fire("getSnapshot");
                    if (typeof a != "string") {
                        var b = this.element;
                        b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE &&
                                (a = b.is("textarea") ? b.getValue() : b.getHtml())
                    }
                    return a
                }, loadSnapshot: function(a) {
                    this.fire("loadSnapshot", a)
                }, setData: function(a, b, c) {
                    if (b)
                        this.on("dataReady", function(a) {
                            a.removeListener();
                            b.call(a.editor)
                        });
                    a = {dataValue: a};
                    !c && this.fire("setData", a);
                    this._.data = a.dataValue;
                    !c && this.fire("afterSetData", a)
                }, setReadOnly: function(a) {
                    a = a == void 0 || a;
                    if (this.readOnly != a) {
                        this.readOnly = a;
                        this.keystrokeHandler.blockedKeystrokes[8] = +a;
                        this.editable().setReadOnly(a);
                        this.fire("readOnly")
                    }
                }, insertHtml: function(a,
                        b) {
                    this.fire("insertHtml", {dataValue: a, mode: b})
                }, insertText: function(a) {
                    this.fire("insertText", a)
                }, insertElement: function(a) {
                    this.fire("insertElement", a)
                }, focus: function() {
                    this.fire("beforeFocus")
                }, checkDirty: function() {
                    return this.status == "ready" && this._.previousValue !== this.getSnapshot()
                }, resetDirty: function() {
                    this._.previousValue = this.getSnapshot()
                }, updateElement: function() {
                    return m.call(this)
                }, setKeystroke: function() {
                    for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ?
                            arguments[0] : [[].slice.call(arguments, 0)], c, d, f = b.length; f--; ) {
                        c = b[f];
                        d = 0;
                        if (CKEDITOR.tools.isArray(c)) {
                            d = c[1];
                            c = c[0]
                        }
                        d ? a[c] = d : delete a[c]
                    }
                }, addFeature: function(a) {
                    return this.filter.addFeature(a)
                }, setActiveFilter: function(a) {
                    if (!a)
                        a = this.filter;
                    if (this.activeFilter !== a) {
                        this.activeFilter = a;
                        this.fire("activeFilterChange");
                        a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, true))
                    }
                }, setActiveEnterMode: function(a,
                        b) {
                    a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
                    b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                    if (this.activeEnterMode != a || this.activeShiftEnterMode != b) {
                        this.activeEnterMode = a;
                        this.activeShiftEnterMode = b;
                        this.fire("activeEnterModeChange")
                    }
                }})
        }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
            this._ = {htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))",
                        "g")}
        }, function() {
            var d = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, e = {checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1};
            CKEDITOR.htmlParser.prototype = {onTagOpen: function() {
                }, onTagClose: function() {
                }, onText: function() {
                }, onCDATA: function() {
                }, onComment: function() {
                }, parse: function(c) {
                    for (var a, b, f = 0, h; a = this._.htmlPartsRegex.exec(c); ) {
                        b = a.index;
                        if (b > f) {
                            f = c.substring(f, b);
                            if (h)
                                h.push(f);
                            else
                                this.onText(f)
                        }
                        f = this._.htmlPartsRegex.lastIndex;
                        if (b = a[1]) {
                            b = b.toLowerCase();
                            if (h && CKEDITOR.dtd.$cdata[b]) {
                                this.onCDATA(h.join(""));
                                h = null
                            }
                            if (!h) {
                                this.onTagClose(b);
                                continue
                            }
                        }
                        if (h)
                            h.push(a[0]);
                        else if (b = a[3]) {
                            b = b.toLowerCase();
                            if (!/="/.test(b)) {
                                var k = {}, g;
                                a = a[4];
                                var i = !!(a && a.charAt(a.length - 1) == "/");
                                if (a)
                                    for (; g = d.exec(a); ) {
                                        var j = g[1].toLowerCase();
                                        g = g[2] || g[3] || g[4] || "";
                                        k[j] = !g && e[j] ? j : CKEDITOR.tools.htmlDecodeAttr(g)
                                    }
                                this.onTagOpen(b, k, i);
                                !h && CKEDITOR.dtd.$cdata[b] && (h = [])
                            }
                        } else if (b = a[2])
                            this.onComment(b)
                    }
                    if (c.length >
                            f)
                        this.onText(c.substring(f, c.length))
                }}
        }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({$: function() {
                this._ = {output: []}
            }, proto: {openTag: function(d) {
                    this._.output.push("<", d)
                }, openTagClose: function(d, e) {
                    e ? this._.output.push(" />") : this._.output.push(">")
                }, attribute: function(d, e) {
                    typeof e == "string" && (e = CKEDITOR.tools.htmlEncodeAttr(e));
                    this._.output.push(" ", d, '="', e, '"')
                }, closeTag: function(d) {
                    this._.output.push("</", d, ">")
                }, text: function(d) {
                    this._.output.push(d)
                }, comment: function(d) {
                    this._.output.push("<\!--",
                            d, "--\>")
                }, write: function(d) {
                    this._.output.push(d)
                }, reset: function() {
                    this._.output = [];
                    this._.indent = false
                }, getHtml: function(d) {
                    var e = this._.output.join("");
                    d && this.reset();
                    return e
                }}}), "use strict", function() {
            CKEDITOR.htmlParser.node = function() {
            };
            CKEDITOR.htmlParser.node.prototype = {remove: function() {
                    var d = this.parent.children, e = CKEDITOR.tools.indexOf(d, this), c = this.previous, a = this.next;
                    c && (c.next = a);
                    a && (a.previous = c);
                    d.splice(e, 1);
                    this.parent = null
                }, replaceWith: function(d) {
                    var e = this.parent.children,
                            c = CKEDITOR.tools.indexOf(e, this), a = d.previous = this.previous, b = d.next = this.next;
                    a && (a.next = d);
                    b && (b.previous = d);
                    e[c] = d;
                    d.parent = this.parent;
                    this.parent = null
                }, insertAfter: function(d) {
                    var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d), a = d.next;
                    e.splice(c + 1, 0, this);
                    this.next = d.next;
                    this.previous = d;
                    d.next = this;
                    a && (a.previous = this);
                    this.parent = d.parent
                }, insertBefore: function(d) {
                    var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d);
                    e.splice(c, 0, this);
                    this.next = d;
                    (this.previous = d.previous) && (d.previous.next =
                            this);
                    d.previous = this;
                    this.parent = d.parent
                }, getAscendant: function(d) {
                    var e = typeof d == "function" ? d : typeof d == "string" ? function(a) {
                        return a.name == d
                    } : function(a) {
                        return a.name in d
                    }, c = this.parent;
                    for (; c && c.type == CKEDITOR.NODE_ELEMENT; ) {
                        if (e(c))
                            return c;
                        c = c.parent
                    }
                    return null
                }, wrapWith: function(d) {
                    this.replaceWith(d);
                    d.add(this);
                    return d
                }, getIndex: function() {
                    return CKEDITOR.tools.indexOf(this.parent.children, this)
                }, getFilterContext: function(d) {
                    return d || {}
                }}
        }(), "use strict", CKEDITOR.htmlParser.comment =
                function(d) {
                    this.value = d;
                    this._ = {isBlockLike: false}
                }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type: CKEDITOR.NODE_COMMENT, filter: function(d, e) {
                var c = this.value;
                if (!(c = d.onComment(e, c, this))) {
                    this.remove();
                    return false
                }
                if (typeof c != "string") {
                    this.replaceWith(c);
                    return false
                }
                this.value = c;
                return true
            }, writeHtml: function(d, e) {
                e && this.filter(e);
                d.comment(this.value)
            }}), "use strict", function() {
            CKEDITOR.htmlParser.text = function(d) {
                this.value = d;
                this._ = {isBlockLike: false}
            };
            CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type: CKEDITOR.NODE_TEXT, filter: function(d, e) {
                    if (!(this.value = d.onText(e, this.value, this))) {
                        this.remove();
                        return false
                    }
                }, writeHtml: function(d, e) {
                    e && this.filter(e);
                    d.text(this.value)
                }})
        }(), "use strict", function() {
            CKEDITOR.htmlParser.cdata = function(d) {
                this.value = d
            };
            CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type: CKEDITOR.NODE_TEXT, filter: function() {
                }, writeHtml: function(d) {
                    d.write(this.value)
                }})
        }(),
                "use strict", CKEDITOR.htmlParser.fragment = function() {
                    this.children = [];
                    this.parent = null;
                    this._ = {isBlockLike: true, hasInlineStarted: false}
                }, function() {
            function d(a) {
                return a.attributes["data-cke-survive"] ? false : a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
            }
            var e = CKEDITOR.tools.extend({table: 1, ul: 1, ol: 1, dl: 1}, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), c = {ol: 1, ul: 1}, a = CKEDITOR.tools.extend({}, {html: 1}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {style: 1,
                script: 1});
            CKEDITOR.htmlParser.fragment.fromHtml = function(b, f, h) {
                function k(a) {
                    var b;
                    if (l.length > 0)
                        for (var c = 0; c < l.length; c++) {
                            var d = l[c], f = d.name, e = CKEDITOR.dtd[f], h = p.name && CKEDITOR.dtd[p.name];
                            if ((!h || h[f]) && (!a || !e || e[a] || !CKEDITOR.dtd[a])) {
                                if (!b) {
                                    g();
                                    b = 1
                                }
                                d = d.clone();
                                d.parent = p;
                                p = d;
                                l.splice(c, 1);
                                c--
                            } else if (f == p.name) {
                                j(p, p.parent, 1);
                                c--
                            }
                        }
                }
                function g() {
                    for (; r.length; )
                        j(r.shift(), p)
                }
                function i(a) {
                    if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                        var b = a.children.length, c = a.children[b - 1], d;
                        if (c && c.type == CKEDITOR.NODE_TEXT)
                            (d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                    }
                }
                function j(a, b, c) {
                    var b = b || p || o, f = p;
                    if (a.previous === void 0) {
                        if (m(b, a)) {
                            p = b;
                            q.onTagOpen(h, {});
                            a.returnPoint = b = p
                        }
                        i(a);
                        (!d(a) || a.children.length) && b.add(a);
                        a.name == "pre" && (w = false);
                        a.name == "textarea" && (s = false)
                    }
                    if (a.returnPoint) {
                        p = a.returnPoint;
                        delete a.returnPoint
                    } else
                        p = c ? b : f
                }
                function m(a, b) {
                    if ((a == o || a.name == "body") && h && (!a.name || CKEDITOR.dtd[a.name][h])) {
                        var c, d;
                        return(c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ?
                                d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                }
                function n(a, b) {
                    return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false
                }
                var q = new CKEDITOR.htmlParser, o = f instanceof CKEDITOR.htmlParser.element ? f : typeof f == "string" ? new CKEDITOR.htmlParser.element(f) : new CKEDITOR.htmlParser.fragment, l = [], r = [], p = o, s = o.name == "textarea", w = o.name == "pre";
                q.onTagOpen = function(b, f, h, i) {
                    f = new CKEDITOR.htmlParser.element(b,
                            f);
                    if (f.isUnknown && h)
                        f.isEmpty = true;
                    f.isOptionalClose = i;
                    if (d(f))
                        l.push(f);
                    else {
                        if (b == "pre")
                            w = true;
                        else {
                            if (b == "br" && w) {
                                p.add(new CKEDITOR.htmlParser.text("\n"));
                                return
                            }
                            b == "textarea" && (s = true)
                        }
                        if (b == "br")
                            r.push(f);
                        else {
                            for (; ; ) {
                                i = (h = p.name) ? CKEDITOR.dtd[h] || (p._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a;
                                if (!f.isUnknown && !p.isUnknown && !i[b])
                                    if (p.isOptionalClose)
                                        q.onTagClose(h);
                                    else if (b in c && h in c) {
                                        h = p.children;
                                        (h = h[h.length - 1]) && h.name == "li" || j(h = new CKEDITOR.htmlParser.element("li"), p);
                                        !f.returnPoint &&
                                                (f.returnPoint = p);
                                        p = h
                                    } else if (b in CKEDITOR.dtd.$listItem && !n(b, h))
                                        q.onTagOpen(b == "li" ? "ul" : "dl", {}, 0, 1);
                                    else if (h in e && !n(b, h)) {
                                        !f.returnPoint && (f.returnPoint = p);
                                        p = p.parent
                                    } else {
                                        h in CKEDITOR.dtd.$inline && l.unshift(p);
                                        if (p.parent)
                                            j(p, p.parent, 1);
                                        else {
                                            f.isOrphan = 1;
                                            break
                                        }
                                    }
                                else
                                    break
                            }
                            k(b);
                            g();
                            f.parent = p;
                            f.isEmpty ? j(f) : p = f
                        }
                    }
                };
                q.onTagClose = function(a) {
                    for (var b = l.length - 1; b >= 0; b--)
                        if (a == l[b].name) {
                            l.splice(b, 1);
                            return
                        }
                    for (var c = [], d = [], f = p; f != o && f.name != a; ) {
                        f._.isBlockLike || d.unshift(f);
                        c.push(f);
                        f =
                                f.returnPoint || f.parent
                    }
                    if (f != o) {
                        for (b = 0; b < c.length; b++) {
                            var e = c[b];
                            j(e, e.parent)
                        }
                        p = f;
                        f._.isBlockLike && g();
                        j(f, f.parent);
                        if (f == p)
                            p = p.parent;
                        l = l.concat(d)
                    }
                    a == "body" && (h = false)
                };
                q.onText = function(b) {
                    if ((!p._.hasInlineStarted || r.length) && !w && !s) {
                        b = CKEDITOR.tools.ltrim(b);
                        if (b.length === 0)
                            return
                    }
                    var d = p.name, f = d ? CKEDITOR.dtd[d] || (p._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a;
                    if (!s && !f["#"] && d in e) {
                        q.onTagOpen(d in c ? "li" : d == "dl" ? "dd" : d == "table" ? "tr" : d == "tr" ? "td" : "");
                        q.onText(b)
                    } else {
                        g();
                        k();
                        !w &&
                                !s && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                        b = new CKEDITOR.htmlParser.text(b);
                        if (m(p, b))
                            this.onTagOpen(h, {}, 0, 1);
                        p.add(b)
                    }
                };
                q.onCDATA = function(a) {
                    p.add(new CKEDITOR.htmlParser.cdata(a))
                };
                q.onComment = function(a) {
                    g();
                    k();
                    p.add(new CKEDITOR.htmlParser.comment(a))
                };
                q.parse(b);
                for (g(); p != o; )
                    j(p, p.parent, 1);
                i(o);
                return o
            };
            CKEDITOR.htmlParser.fragment.prototype = {type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function(a, c) {
                    isNaN(c) && (c = this.children.length);
                    var d = c > 0 ? this.children[c - 1] : null;
                    if (d) {
                        if (a._.isBlockLike &&
                                d.type == CKEDITOR.NODE_TEXT) {
                            d.value = CKEDITOR.tools.rtrim(d.value);
                            if (d.value.length === 0) {
                                this.children.pop();
                                this.add(a);
                                return
                            }
                        }
                        d.next = a
                    }
                    a.previous = d;
                    a.parent = this;
                    this.children.splice(c, 0, a);
                    if (!this._.hasInlineStarted)
                        this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
                }, filter: function(a, c) {
                    c = this.getFilterContext(c);
                    a.onRoot(c, this);
                    this.filterChildren(a, false, c)
                }, filterChildren: function(a, c, d) {
                    if (this.childrenFilteredBy != a.id) {
                        d = this.getFilterContext(d);
                        if (c && !this.parent)
                            a.onRoot(d, this);
                        this.childrenFilteredBy = a.id;
                        for (c = 0; c < this.children.length; c++)
                            this.children[c].filter(a, d) === false && c--
                    }
                }, writeHtml: function(a, c) {
                    c && this.filter(c);
                    this.writeChildrenHtml(a)
                }, writeChildrenHtml: function(a, c, d) {
                    var e = this.getFilterContext();
                    if (d && !this.parent && c)
                        c.onRoot(e, this);
                    c && this.filterChildren(c, false, e);
                    c = 0;
                    d = this.children;
                    for (e = d.length; c < e; c++)
                        d[c].writeHtml(a)
                }, forEach: function(a, c, d) {
                    if (!d && (!c || this.type == c))
                        var e = a(this);
                    if (e !== false)
                        for (var d = this.children,
                                g = 0; g < d.length; g++) {
                            e = d[g];
                            e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, c) : (!c || e.type == c) && a(e)
                        }
                }, getFilterContext: function(a) {
                    return a || {}
                }}
        }(), "use strict", function() {
            function d() {
                this.rules = []
            }
            function e(c, a, b, f) {
                var e, k;
                for (e in a) {
                    (k = c[e]) || (k = c[e] = new d);
                    k.add(a[e], b, f)
                }
            }
            CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({$: function(c) {
                    this.id = CKEDITOR.tools.getNextNumber();
                    this.elementNameRules = new d;
                    this.attributeNameRules = new d;
                    this.elementsRules = {};
                    this.attributesRules = {};
                    this.textRules =
                            new d;
                    this.commentRules = new d;
                    this.rootRules = new d;
                    c && this.addRules(c, 10)
                }, proto: {addRules: function(c, a) {
                        var b;
                        if (typeof a == "number")
                            b = a;
                        else if (a && "priority"in a)
                            b = a.priority;
                        typeof b != "number" && (b = 10);
                        typeof a != "object" && (a = {});
                        c.elementNames && this.elementNameRules.addMany(c.elementNames, b, a);
                        c.attributeNames && this.attributeNameRules.addMany(c.attributeNames, b, a);
                        c.elements && e(this.elementsRules, c.elements, b, a);
                        c.attributes && e(this.attributesRules, c.attributes, b, a);
                        c.text && this.textRules.add(c.text,
                                b, a);
                        c.comment && this.commentRules.add(c.comment, b, a);
                        c.root && this.rootRules.add(c.root, b, a)
                    }, applyTo: function(c) {
                        c.filter(this)
                    }, onElementName: function(c, a) {
                        return this.elementNameRules.execOnName(c, a)
                    }, onAttributeName: function(c, a) {
                        return this.attributeNameRules.execOnName(c, a)
                    }, onText: function(c, a) {
                        return this.textRules.exec(c, a)
                    }, onComment: function(c, a, b) {
                        return this.commentRules.exec(c, a, b)
                    }, onRoot: function(c, a) {
                        return this.rootRules.exec(c, a)
                    }, onElement: function(c, a) {
                        for (var b = [this.elementsRules["^"],
                            this.elementsRules[a.name], this.elementsRules.$], d, e = 0; e < 3; e++)
                            if (d = b[e]) {
                                d = d.exec(c, a, this);
                                if (d === false)
                                    return null;
                                if (d && d != a)
                                    return this.onNode(c, d);
                                if (a.parent && !a.name)
                                    break
                            }
                        return a
                    }, onNode: function(c, a) {
                        var b = a.type;
                        return b == CKEDITOR.NODE_ELEMENT ? this.onElement(c, a) : b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(c, a.value)) : b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(c, a.value)) : null
                    }, onAttribute: function(c, a, b, d) {
                        return(b = this.attributesRules[b]) ?
                                b.exec(c, d, a, this) : d
                    }}});
            CKEDITOR.htmlParser.filterRulesGroup = d;
            d.prototype = {add: function(c, a, b) {
                    this.rules.splice(this.findIndex(a), 0, {value: c, priority: a, options: b})
                }, addMany: function(c, a, b) {
                    for (var d = [this.findIndex(a), 0], e = 0, k = c.length; e < k; e++)
                        d.push({value: c[e], priority: a, options: b});
                    this.rules.splice.apply(this.rules, d)
                }, findIndex: function(c) {
                    for (var a = this.rules, b = a.length - 1; b >= 0 && c < a[b].priority; )
                        b--;
                    return b + 1
                }, exec: function(c, a) {
                    var b = a instanceof CKEDITOR.htmlParser.node || a instanceof CKEDITOR.htmlParser.fragment,
                            d = Array.prototype.slice.call(arguments, 1), e = this.rules, k = e.length, g, i, j, m;
                    for (m = 0; m < k; m++) {
                        if (b) {
                            g = a.type;
                            i = a.name
                        }
                        j = e[m];
                        if (!(c.nonEditable && !j.options.applyToAll || c.nestedEditable && j.options.excludeNestedEditable)) {
                            j = j.value.apply(null, d);
                            if (j === false || b && j && (j.name != i || j.type != g))
                                return j;
                            j != void 0 && (d[0] = a = j)
                        }
                    }
                    return a
                }, execOnName: function(c, a) {
                    for (var b = 0, d = this.rules, e = d.length, k; a && b < e; b++) {
                        k = d[b];
                        !(c.nonEditable && !k.options.applyToAll || c.nestedEditable && k.options.excludeNestedEditable) && (a =
                                a.replace(k.value[0], k.value[1]))
                    }
                    return a
                }}
        }(), function() {
            function d(d, g) {
                function e(a) {
                    return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {"data-cke-bogus": 1})
                }
                function i(b, d) {
                    return function(g) {
                        if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var h = [], i = c(g), A, j;
                            if (i)
                                for (k(i, 1) && h.push(i); i; ) {
                                    if (f(i) && (A = a(i)) && k(A))
                                        if ((j = a(A)) && !f(j))
                                            h.push(A);
                                        else {
                                            e(o).insertAfter(A);
                                            A.remove()
                                        }
                                    i = i.previous
                                }
                            for (i = 0; i < h.length; i++)
                                h[i].remove();
                            if (h = CKEDITOR.env.opera &&
                                    !b || (typeof d == "function" ? d(g) !== false : d))
                                if (!o && !CKEDITOR.env.needsBrFiller && g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
                                    h = false;
                                else if (!o && !CKEDITOR.env.needsBrFiller && (document.documentMode > 7 || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem))
                                    h = false;
                                else {
                                    h = c(g);
                                    h = !h || g.name == "form" && h.name == "input"
                                }
                            h && g.add(e(b))
                        }
                    }
                }
                function k(a, b) {
                    if ((!o || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"])
                        return true;
                    var c;
                    if (a.type == CKEDITOR.NODE_TEXT &&
                            (c = a.value.match(r))) {
                        if (c.index) {
                            (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a);
                            a.value = c[0]
                        }
                        if (!CKEDITOR.env.needsBrFiller && o && (!b || a.parent.name in j))
                            return true;
                        if (!o)
                            if ((c = a.previous) && c.name == "br" || !c || f(c))
                                return true
                    }
                    return false
                }
                var A = {elements: {}}, o = g == "html", j = CKEDITOR.tools.extend({}, t), E;
                for (E in j)
                    "#"in s[E] || delete j[E];
                for (E in j)
                    A.elements[E] = i(o, d.config.fillEmptyBlocks !== false);
                A.root = i(o);
                A.elements.br = function(c) {
                    return function(d) {
                        if (d.parent.type !=
                                CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var g = d.attributes;
                            if ("data-cke-bogus"in g || "data-cke-eol"in g)
                                delete g["data-cke-bogus"];
                            else {
                                for (g = d.next; g && b(g); )
                                    g = g.next;
                                var i = a(d);
                                !g && f(d.parent) ? h(d.parent, e(c)) : f(g) && (i && !f(i)) && e(c).insertBefore(g)
                            }
                        }
                    }
                }(o);
                return A
            }
            function e(a, b) {
                return a != CKEDITOR.ENTER_BR && b !== false ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : false
            }
            function c(a) {
                for (a = a.children[a.children.length - 1]; a && b(a); )
                    a = a.previous;
                return a
            }
            function a(a) {
                for (a = a.previous; a && b(a); )
                    a = a.previous;
                return a
            }
            function b(a) {
                return a.type ==
                        CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
            }
            function f(a) {
                return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in t || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            }
            function h(a, b) {
                var c = a.children[a.children.length - 1];
                a.children.push(b);
                b.parent = a;
                if (c) {
                    c.next = b;
                    b.previous = c
                }
            }
            function k(a) {
                a = a.attributes;
                a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
                a.contenteditable = "false"
            }
            function g(a) {
                a = a.attributes;
                switch (a["data-cke-editable"]) {
                    case "true":
                        a.contenteditable = "true";
                        break;
                    case "1":
                        delete a.contenteditable
                    }
            }
            function i(a) {
                return a.replace(C, function(a, b, c) {
                    return"<" + b + c.replace(F, function(a, b) {
                        return u.test(b) && c.indexOf("data-cke-saved-" + b) == -1 ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
                    }) + ">"
                })
            }
            function j(a, b) {
                return a.replace(b, function(a, b, c) {
                    a.indexOf("<textarea") === 0 && (a = b + q(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>");
                    return"<cke:encoded>" + encodeURIComponent(a) +
                            "</cke:encoded>"
                })
            }
            function m(a) {
                return a.replace(B, function(a, b) {
                    return decodeURIComponent(b)
                })
            }
            function n(a) {
                return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
                    return"<\!--" + p + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>"
                })
            }
            function q(a) {
                return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) {
                    return decodeURIComponent(b)
                })
            }
            function o(a, b) {
                var c = b._.dataStore;
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                    return decodeURIComponent(b)
                }).replace(/\{cke_protected_(\d+)\}/g,
                        function(a, b) {
                            return c && c[b] || ""
                        })
            }
            function l(a, b) {
                for (var c = [], d = b.config.protectedSource, f = b._.dataStore || (b._.dataStore = {id: 1}), g = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) {
                    return"<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>"
                }), e = 0; e < d.length; e++)
                    a = a.replace(d[e], function(a) {
                        a = a.replace(g, function(a, b, d) {
                            return c[d]
                        });
                        return/cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) -
                                1) + "--\>"
                    });
                a = a.replace(g, function(a, b, d) {
                    return"<\!--" + p + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>"
                });
                return a.replace(/(['"]).*?\1/g, function(a) {
                    return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                        f[f.id] = decodeURIComponent(b);
                        return"{cke_protected_" + f.id++ + "}"
                    })
                })
            }
            CKEDITOR.htmlDataProcessor = function(a) {
                var b, c, f = this;
                this.editor = a;
                this.dataFilter = b = new CKEDITOR.htmlParser.filter;
                this.htmlFilter = c = new CKEDITOR.htmlParser.filter;
                this.writer = new CKEDITOR.htmlParser.basicWriter;
                b.addRules(v);
                b.addRules(z, {applyToAll: true});
                b.addRules(d(a, "data"), {applyToAll: true});
                c.addRules(x);
                c.addRules(y, {applyToAll: true});
                c.addRules(d(a, "html"), {applyToAll: true});
                a.on("toHtml", function(b) {
                    var b = b.data, c = b.dataValue, c = l(c, a), c = j(c, I), c = i(c), c = j(c, D), c = c.replace(A, "$1cke:$2"), c = c.replace(J, "<cke:$1$2></cke:$1>"), c = CKEDITOR.env.opera ? c : c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = b.context || a.editable().getName(), f;
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && d == "pre") {
                        d = "div";
                        c = "<pre>" +
                                c + "</pre>";
                        f = 1
                    }
                    d = a.document.createElement(d);
                    d.setHtml("a" + c);
                    c = d.getHtml().substr(1);
                    c = c.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                    f && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                    c = c.replace(E, "$1$2");
                    c = m(c);
                    c = q(c);
                    b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.context, b.fixForBody === false ? false : e(b.enterMode, a.config.autoParagraph))
                }, null, null, 5);
                a.on("toHtml", function(b) {
                    b.data.filter.applyTo(b.data.dataValue, true, b.data.dontFilter, b.data.enterMode) && a.fire("dataFiltered")
                }, null,
                        null, 6);
                a.on("toHtml", function(a) {
                    a.data.dataValue.filterChildren(f.dataFilter, true)
                }, null, null, 10);
                a.on("toHtml", function(a) {
                    var a = a.data, b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter;
                    b.writeChildrenHtml(c);
                    b = c.getHtml(true);
                    a.dataValue = n(b)
                }, null, null, 15);
                a.on("toDataFormat", function(b) {
                    var c = b.data.dataValue;
                    b.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
                    b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.data.context, e(b.data.enterMode, a.config.autoParagraph))
                },
                        null, null, 5);
                a.on("toDataFormat", function(a) {
                    a.data.dataValue.filterChildren(f.htmlFilter, true)
                }, null, null, 10);
                a.on("toDataFormat", function(a) {
                    a.data.filter.applyTo(a.data.dataValue, false, true)
                }, null, null, 11);
                a.on("toDataFormat", function(b) {
                    var c = b.data.dataValue, d = f.writer;
                    d.reset();
                    c.writeChildrenHtml(d);
                    c = d.getHtml(true);
                    c = q(c);
                    c = o(c, a);
                    b.data.dataValue = c
                }, null, null, 15)
            };
            CKEDITOR.htmlDataProcessor.prototype = {toHtml: function(a, b, c, d) {
                    var f = this.editor, g, e, h;
                    if (b && typeof b == "object") {
                        g = b.context;
                        c = b.fixForBody;
                        d = b.dontFilter;
                        e = b.filter;
                        h = b.enterMode
                    } else
                        g = b;
                    !g && g !== null && (g = f.editable().getName());
                    return f.fire("toHtml", {dataValue: a, context: g, fixForBody: c, dontFilter: d, filter: e || f.filter, enterMode: h || f.enterMode}).dataValue
                }, toDataFormat: function(a, b) {
                    var c, d, f;
                    if (b) {
                        c = b.context;
                        d = b.filter;
                        f = b.enterMode
                    }
                    !c && c !== null && (c = this.editor.editable().getName());
                    return this.editor.fire("toDataFormat", {dataValue: a, filter: d || this.editor.filter, context: c, enterMode: f || this.editor.enterMode}).dataValue
                }};
            var r = /(?:&nbsp;|\xa0)$/, p = "{cke_protected}", s = CKEDITOR.dtd, w = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"], t = CKEDITOR.tools.extend({}, s.$blockLimit, s.$block), v = {elements: {input: k, textarea: k}}, z = {attributeNames: [[/^on/, "data-cke-pa-on"], [/^data-cke-expando$/, ""]]}, x = {elements: {embed: function(a) {
                        var b = a.parent;
                        if (b && b.name == "object") {
                            var c = b.attributes.width, b = b.attributes.height;
                            if (c)
                                a.attributes.width = c;
                            if (b)
                                a.attributes.height = b
                        }
                    }, a: function(a) {
                        if (!a.children.length && !a.attributes.name &&
                                !a.attributes["data-cke-saved-name"])
                            return false
                    }}}, y = {elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {$: function(a) {
                        var b = a.attributes;
                        if (b) {
                            if (b["data-cke-temp"])
                                return false;
                            for (var c = ["name", "href", "src"], d, f = 0; f < c.length; f++) {
                                d = "data-cke-saved-" + c[f];
                                d in b && delete b[c[f]]
                            }
                        }
                        return a
                    }, table: function(a) {
                        a.children.slice(0).sort(function(a, b) {
                            var c, d;
                            if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) {
                                c =
                                        CKEDITOR.tools.indexOf(w, a.name);
                                d = CKEDITOR.tools.indexOf(w, b.name)
                            }
                            if (!(c > -1 && d > -1 && c != d)) {
                                c = a.parent ? a.getIndex() : -1;
                                d = b.parent ? b.getIndex() : -1
                            }
                            return c > d ? 1 : -1
                        })
                    }, param: function(a) {
                        a.children = [];
                        a.isEmpty = true;
                        return a
                    }, span: function(a) {
                        a.attributes["class"] == "Apple-style-span" && delete a.name
                    }, html: function(a) {
                        delete a.attributes.contenteditable;
                        delete a.attributes["class"]
                    }, body: function(a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    }, style: function(a) {
                        var b = a.children[0];
                        if (b && b.value)
                            b.value = CKEDITOR.tools.trim(b.value);
                        if (!a.attributes.type)
                            a.attributes.type = "text/css"
                    }, title: function(a) {
                        var b = a.children[0];
                        !b && h(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    }, input: g, textarea: g}, attributes: {"class": function(a) {
                        return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false
                    }}};
            if (CKEDITOR.env.ie)
                y.attributes.style = function(a) {
                    return a.replace(/(^|;)([^\:]+)/g, function(a) {
                        return a.toLowerCase()
                    })
                };
            var C = /<(a|area|img|input|source)\b([^>]*)>/gi,
                    F = /([\w-]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, u = /^(href|src|name)$/i, D = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, I = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, B = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, A = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, E = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, J = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
        }(), "use strict", CKEDITOR.htmlParser.element = function(d, e) {
            this.name = d;
            this.attributes =
                    e || {};
            this.children = [];
            var c = d || "", a = c.match(/^cke:(.*)/);
            a && (c = a[1]);
            c = !(!CKEDITOR.dtd.$nonBodyContent[c] && !CKEDITOR.dtd.$block[c] && !CKEDITOR.dtd.$listItem[c] && !CKEDITOR.dtd.$tableContent[c] && !(CKEDITOR.dtd.$nonEditable[c] || c == "br"));
            this.isEmpty = !!CKEDITOR.dtd.$empty[d];
            this.isUnknown = !CKEDITOR.dtd[d];
            this._ = {isBlockLike: c, hasInlineStarted: this.isEmpty || !c}
        }, CKEDITOR.htmlParser.cssStyle = function(d) {
            var e = {};
            ((d instanceof CKEDITOR.htmlParser.element ? d.attributes.style : d) || "").replace(/&quot;/g,
                    '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(c, a, b) {
                a == "font-family" && (b = b.replace(/["']/g, ""));
                e[a.toLowerCase()] = b
            });
            return{rules: e, populate: function(c) {
                    var a = this.toString();
                    if (a)
                        c instanceof CKEDITOR.dom.element ? c.setAttribute("style", a) : c instanceof CKEDITOR.htmlParser.element ? c.attributes.style = a : c.style = a
                }, toString: function() {
                    var c = [], a;
                    for (a in e)
                        e[a] && c.push(a, ":", e[a], ";");
                    return c.join("")
                }}
        }, function() {
            function d(a) {
                return function(b) {
                    return b.type == CKEDITOR.NODE_ELEMENT &&
                            (typeof a == "string" ? b.name == a : b.name in a)
                }
            }
            var e = function(a, b) {
                a = a[0];
                b = b[0];
                return a < b ? -1 : a > b ? 1 : 0
            }, c = CKEDITOR.htmlParser.fragment.prototype;
            CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type: CKEDITOR.NODE_ELEMENT, add: c.add, clone: function() {
                    return new CKEDITOR.htmlParser.element(this.name, this.attributes)
                }, filter: function(a, b) {
                    var c = this, d, e, b = c.getFilterContext(b);
                    if (b.off)
                        return true;
                    if (!c.parent)
                        a.onRoot(b, c);
                    for (; ; ) {
                        d = c.name;
                        if (!(e = a.onElementName(b,
                                d))) {
                            this.remove();
                            return false
                        }
                        c.name = e;
                        if (!(c = a.onElement(b, c))) {
                            this.remove();
                            return false
                        }
                        if (c !== this) {
                            this.replaceWith(c);
                            return false
                        }
                        if (c.name == d)
                            break;
                        if (c.type != CKEDITOR.NODE_ELEMENT) {
                            this.replaceWith(c);
                            return false
                        }
                        if (!c.name) {
                            this.replaceWithChildren();
                            return false
                        }
                    }
                    d = c.attributes;
                    var g, i;
                    for (g in d) {
                        i = g;
                        for (e = d[g]; ; )
                            if (i = a.onAttributeName(b, g))
                                if (i != g) {
                                    delete d[g];
                                    g = i
                                } else
                                    break;
                            else {
                                delete d[g];
                                break
                            }
                        i && ((e = a.onAttribute(b, c, i, e)) === false ? delete d[i] : d[i] = e)
                    }
                    c.isEmpty || this.filterChildren(a,
                            false, b);
                    return true
                }, filterChildren: c.filterChildren, writeHtml: function(a, b) {
                    b && this.filter(b);
                    var c = this.name, d = [], k = this.attributes, g, i;
                    a.openTag(c, k);
                    for (g in k)
                        d.push([g, k[g]]);
                    a.sortAttributes && d.sort(e);
                    g = 0;
                    for (i = d.length; g < i; g++) {
                        k = d[g];
                        a.attribute(k[0], k[1])
                    }
                    a.openTagClose(c, this.isEmpty);
                    this.writeChildrenHtml(a);
                    this.isEmpty || a.closeTag(c)
                }, writeChildrenHtml: c.writeChildrenHtml, replaceWithChildren: function() {
                    for (var a = this.children, b = a.length; b; )
                        a[--b].insertAfter(this);
                    this.remove()
                },
                forEach: c.forEach, getFirst: function(a) {
                    if (!a)
                        return this.children.length ? this.children[0] : null;
                    typeof a != "function" && (a = d(a));
                    for (var b = 0, c = this.children.length; b < c; ++b)
                        if (a(this.children[b]))
                            return this.children[b];
                    return null
                }, getHtml: function() {
                    var a = new CKEDITOR.htmlParser.basicWriter;
                    this.writeChildrenHtml(a);
                    return a.getHtml()
                }, setHtml: function(a) {
                    for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children, b = 0, c = a.length; b < c; ++b)
                        a[b].parent = this
                }, getOuterHtml: function() {
                    var a =
                            new CKEDITOR.htmlParser.basicWriter;
                    this.writeHtml(a);
                    return a.getHtml()
                }, split: function(a) {
                    for (var b = this.children.splice(a, this.children.length - a), c = this.clone(), d = 0; d < b.length; ++d)
                        b[d].parent = c;
                    c.children = b;
                    if (b[0])
                        b[0].previous = null;
                    if (a > 0)
                        this.children[a - 1].next = null;
                    this.parent.add(c, this.getIndex() + 1);
                    return c
                }, removeClass: function(a) {
                    var b = this.attributes["class"];
                    if (b)
                        (b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]
                },
                hasClass: function(a) {
                    var b = this.attributes["class"];
                    return!b ? false : RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b)
                }, getFilterContext: function(a) {
                    var b = [];
                    a || (a = {off: false, nonEditable: false, nestedEditable: false});
                    !a.off && this.attributes["data-cke-processor"] == "off" && b.push("off", true);
                    !a.nonEditable && this.attributes.contenteditable == "false" ? b.push("nonEditable", true) : this.name != "body" && (!a.nestedEditable && this.attributes.contenteditable == "true") && b.push("nestedEditable", true);
                    if (b.length)
                        for (var a = CKEDITOR.tools.copy(a),
                                c = 0; c < b.length; c = c + 2)
                            a[b[c]] = b[c + 1];
                    return a
                }}, true)
        }(), function() {
            var d = {}, e = /{([^}]+)}/g, c = /([\\'])/g, a = /\n/g, b = /\r/g;
            CKEDITOR.template = function(f) {
                if (d[f])
                    this.output = d[f];
                else {
                    var h = f.replace(c, "\\$1").replace(a, "\\n").replace(b, "\\r").replace(e, function(a, b) {
                        return"',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'"
                    });
                    this.output = d[f] = Function("data", "buffer", "return buffer?buffer.push('" + h + "'):['" + h + "'].join('');")
                }
            }
        }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document =
                new CKEDITOR.dom.document(document), CKEDITOR.add = function(d) {
            CKEDITOR.instances[d.name] = d;
            d.on("focus", function() {
                if (CKEDITOR.currentInstance != d) {
                    CKEDITOR.currentInstance = d;
                    CKEDITOR.fire("currentInstance")
                }
            });
            d.on("blur", function() {
                if (CKEDITOR.currentInstance == d) {
                    CKEDITOR.currentInstance = null;
                    CKEDITOR.fire("currentInstance")
                }
            });
            CKEDITOR.fire("instance", null, d)
        }, CKEDITOR.remove = function(d) {
            delete CKEDITOR.instances[d.name]
        }, function() {
            var d = {};
            CKEDITOR.addTemplate = function(e, c) {
                var a = d[e];
                if (a)
                    return a;
                a = {name: e, source: c};
                CKEDITOR.fire("template", a);
                return d[e] = new CKEDITOR.template(a.source)
            };
            CKEDITOR.getTemplate = function(e) {
                return d[e]
            }
        }(), function() {
            var d = [];
            CKEDITOR.addCss = function(e) {
                d.push(e)
            };
            CKEDITOR.getCss = function() {
                return d.join("\n")
            }
        }(), CKEDITOR.on("instanceDestroyed", function() {
            CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
        }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function() {
            CKEDITOR.inline = function(d, e) {
                if (!CKEDITOR.env.isCompatible)
                    return null;
                d = CKEDITOR.dom.element.get(d);
                if (d.getEditor())
                    throw'The editor instance "' + d.getEditor().name + '" is already attached to the provided element.';
                var c = new CKEDITOR.editor(e, d, CKEDITOR.ELEMENT_MODE_INLINE), a = d.is("textarea") ? d : null;
                if (a) {
                    c.setData(a.getValue(), null, true);
                    d = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!c.readOnly + '" class="cke_textarea_inline">' + a.getValue() + "</div>", CKEDITOR.document);
                    d.insertAfter(a);
                    a.hide();
                    a.$.form && c._attachToForm()
                } else
                    c.setData(d.getHtml(),
                            null, true);
                c.on("loaded", function() {
                    c.fire("uiReady");
                    c.editable(d);
                    c.container = d;
                    c.setData(c.getData(1));
                    c.resetDirty();
                    c.fire("contentDom");
                    c.mode = "wysiwyg";
                    c.fire("mode");
                    c.status = "ready";
                    c.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, c)
                }, null, null, 1E4);
                c.on("destroy", function() {
                    if (a) {
                        c.container.clearCustomData();
                        c.container.remove();
                        a.show()
                    }
                    c.element.clearCustomData();
                    delete c.element
                });
                return c
            };
            CKEDITOR.inlineAll = function() {
                var d, e, c;
                for (c in CKEDITOR.dtd.$editable)
                    for (var a =
                            CKEDITOR.document.getElementsByTag(c), b = 0, f = a.count(); b < f; b++) {
                        d = a.getItem(b);
                        if (d.getAttribute("contenteditable") == "true") {
                            e = {element: d, config: {}};
                            CKEDITOR.fire("inline", e) !== false && CKEDITOR.inline(d, e.config)
                        }
                    }
            };
            CKEDITOR.domReady(function() {
                !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
            })
        }(), CKEDITOR.replaceClass = "ckeditor", function() {
            function d(a, d, h, k) {
                if (!CKEDITOR.env.isCompatible)
                    return null;
                a = CKEDITOR.dom.element.get(a);
                if (a.getEditor())
                    throw'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
                var g = new CKEDITOR.editor(d, a, k);
                if (k == CKEDITOR.ELEMENT_MODE_REPLACE) {
                    a.setStyle("visibility", "hidden");
                    g._.required = a.hasAttribute("required");
                    a.removeAttribute("required")
                }
                h && g.setData(h, null, true);
                g.on("loaded", function() {
                    c(g);
                    k == CKEDITOR.ELEMENT_MODE_REPLACE && (g.config.autoUpdateElement && a.$.form) && g._attachToForm();
                    g.setMode(g.config.startupMode, function() {
                        g.resetDirty();
                        g.status = "ready";
                        g.fireOnce("instanceReady");
                        CKEDITOR.fire("instanceReady", null, g)
                    })
                });
                g.on("destroy", e);
                return g
            }
            function e() {
                var a =
                        this.container, c = this.element;
                if (a) {
                    a.clearCustomData();
                    a.remove()
                }
                if (c) {
                    c.clearCustomData();
                    if (this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) {
                        c.show();
                        this._.required && c.setAttribute("required", "required")
                    }
                    delete this.element
                }
            }
            function c(b) {
                var c = b.name, d = b.element, e = b.elementMode, g = b.fire("uiSpace", {space: "top", html: ""}).html, i = b.fire("uiSpace", {space: "bottom", html: ""}).html;
                a || (a = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
                        CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'));
                c = CKEDITOR.dom.element.createFromHtml(a.output({id: b.id, name: c, langDir: b.lang.dir, langCode: b.langCode, voiceLabel: [b.lang.editor,
                        b.name].join(", "), topHtml: g ? '<span id="' + b.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + g + "</span>" : "", contentId: b.ui.spaceId("contents"), bottomHtml: i ? '<span id="' + b.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + i + "</span>" : "", outerEl: CKEDITOR.env.ie ? "span" : "div"}));
                if (e == CKEDITOR.ELEMENT_MODE_REPLACE) {
                    d.hide();
                    c.insertAfter(d)
                } else
                    d.append(c);
                b.container = c;
                g && b.ui.space("top").unselectable();
                i && b.ui.space("bottom").unselectable();
                d = b.config.width;
                e = b.config.height;
                d && c.setStyle("width", CKEDITOR.tools.cssLength(d));
                e && b.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(e));
                c.disableContextMenu();
                CKEDITOR.env.webkit && c.on("focus", function() {
                    b.focus()
                });
                b.fireOnce("uiReady")
            }
            CKEDITOR.replace = function(a, c) {
                return d(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE)
            };
            CKEDITOR.appendTo = function(a, c, e) {
                return d(a, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
            };
            CKEDITOR.replaceAll = function() {
                for (var a = document.getElementsByTagName("textarea"),
                        c = 0; c < a.length; c++) {
                    var d = null, e = a[c];
                    if (e.name || e.id) {
                        if (typeof arguments[0] == "string") {
                            if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(e.className))
                                continue
                        } else if (typeof arguments[0] == "function") {
                            d = {};
                            if (arguments[0](e, d) === false)
                                continue
                        }
                        this.replace(e, d)
                    }
                }
            };
            CKEDITOR.editor.prototype.addMode = function(a, c) {
                (this._.modes || (this._.modes = {}))[a] = c
            };
            CKEDITOR.editor.prototype.setMode = function(a, c) {
                var d = this, e = this._.modes;
                if (!(a == d.mode || !e || !e[a])) {
                    d.fire("beforeSetMode", a);
                    if (d.mode) {
                        var g =
                                d.checkDirty();
                        d._.previousMode = d.mode;
                        d.fire("beforeModeUnload");
                        d.editable(0);
                        d.ui.space("contents").setHtml("");
                        d.mode = ""
                    }
                    this._.modes[a](function() {
                        d.mode = a;
                        g !== void 0 && !g && d.resetDirty();
                        setTimeout(function() {
                            d.fire("mode");
                            c && c.call(d)
                        }, 0)
                    })
                }
            };
            CKEDITOR.editor.prototype.resize = function(a, c, d, e) {
                var g = this.container, i = this.ui.space("contents"), j = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, e = e ? g.getChild(1) : g;
                e.setSize("width", a, true);
                j && (j.style.width = "1%");
                i.setStyle("height",
                        Math.max(c - (d ? 0 : (e.$.offsetHeight || 0) - (i.$.clientHeight || 0)), 0) + "px");
                j && (j.style.width = "100%");
                this.fire("resize")
            };
            CKEDITOR.editor.prototype.getResizable = function(a) {
                return a ? this.ui.space("contents") : this.container
            };
            var a;
            CKEDITOR.domReady(function() {
                CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
            })
        }(), CKEDITOR.config.startupMode = "wysiwyg", function() {
            function d(b) {
                var c = b.editor, d = b.data.path, f = d.blockLimit, g = b.data.selection, h = g.getRanges()[0], i;
                if (CKEDITOR.env.gecko || CKEDITOR.env.ie &&
                        CKEDITOR.env.needsBrFiller)
                    if (g = e(g, d)) {
                        g.appendBogus();
                        i = CKEDITOR.env.ie
                    }
                if (c.config.autoParagraph !== false && c.activeEnterMode != CKEDITOR.ENTER_BR && c.editable().equals(f) && !d.block && h.collapsed && !h.getCommonAncestor().isReadOnly()) {
                    d = h.clone();
                    d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    f = new CKEDITOR.dom.walker(d);
                    f.guard = function(b) {
                        return!a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly()
                    };
                    if (!f.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) {
                        c = h.fixBlock(true, c.activeEnterMode == CKEDITOR.ENTER_DIV ?
                                "div" : "p");
                        if (!CKEDITOR.env.needsBrFiller)
                            (c = c.getFirst(a)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove();
                        i = 1;
                        b.cancel()
                    }
                }
                i && h.select()
            }
            function e(b, c) {
                if (b.isFake)
                    return 0;
                var d = c.block || c.blockLimit, f = d && d.getLast(a);
                if (d && d.isBlockBoundary() && (!f || !(f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary())) && !d.is("pre") && !d.getBogus())
                    return d
            }
            function c(a) {
                var b = a.data.getTarget();
                if (b.is("input")) {
                    b = b.getAttribute("type");
                    (b == "submit" || b == "reset") &&
                            a.data.preventDefault()
                }
            }
            function a(a) {
                return j(a) && m(a)
            }
            function b(a, b) {
                return function(c) {
                    var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
                    (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c)
                }
            }
            function f(b) {
                var c, d = b.getRanges()[0], f = b.root, e = {table: 1, ul: 1, ol: 1, dl: 1};
                if (d.startPath().contains(e)) {
                    var b = function(b) {
                        return function(d, f) {
                            f && (d.type == CKEDITOR.NODE_ELEMENT && d.is(e)) && (c = d);
                            if (!f && a(d) && (!b || !g(d)))
                                return false
                        }
                    }, h = d.clone();
                    h.collapse(1);
                    h.setStartAt(f, CKEDITOR.POSITION_AFTER_START);
                    f = new CKEDITOR.dom.walker(h);
                    f.guard = b();
                    f.checkBackward();
                    if (c) {
                        h = d.clone();
                        h.collapse();
                        h.setEndAt(c, CKEDITOR.POSITION_AFTER_END);
                        f = new CKEDITOR.dom.walker(h);
                        f.guard = b(true);
                        c = false;
                        f.checkForward();
                        return c
                    }
                }
                return null
            }
            function h(a) {
                a.editor.focus();
                a.editor.fire("saveSnapshot")
            }
            function k(a, b) {
                var c = a.editor;
                !b && c.getSelection().scrollIntoView();
                setTimeout(function() {
                    c.fire("saveSnapshot")
                }, 0)
            }
            CKEDITOR.editable = CKEDITOR.tools.createClass({base: CKEDITOR.dom.element,
                $: function(a, b) {
                    this.base(b.$ || b);
                    this.editor = a;
                    this.hasFocus = false;
                    this.setup()
                }, proto: {focus: function() {
                        var a;
                        if (CKEDITOR.env.webkit && !this.hasFocus) {
                            a = this.editor._.previousActive || this.getDocument().getActive();
                            if (this.contains(a)) {
                                a.focus();
                                return
                            }
                        }
                        try {
                            this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]()
                        } catch (b) {
                            if (!CKEDITOR.env.ie)
                                throw b;
                        }
                        if (CKEDITOR.env.safari && !this.isInline()) {
                            a = CKEDITOR.document.getActive();
                            a.equals(this.getWindow().getFrame()) ||
                                    this.getWindow().focus()
                        }
                    }, on: function(a, c) {
                        var d = Array.prototype.slice.call(arguments, 0);
                        if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) {
                            a = a == "focus" ? "focusin" : "focusout";
                            c = b(c, this);
                            d[0] = a;
                            d[1] = c
                        }
                        return CKEDITOR.dom.element.prototype.on.apply(this, d)
                    }, attachListener: function(a, b, c, d, f, g) {
                        !this._.listeners && (this._.listeners = []);
                        var e = Array.prototype.slice.call(arguments, 1), e = a.on.apply(a, e);
                        this._.listeners.push(e);
                        return e
                    }, clearListeners: function() {
                        var a = this._.listeners;
                        try {
                            for (; a.length; )
                                a.pop().removeListener()
                        } catch (b) {
                        }
                    },
                    restoreAttrs: function() {
                        var a = this._.attrChanges, b, c;
                        for (c in a)
                            if (a.hasOwnProperty(c)) {
                                b = a[c];
                                b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)
                            }
                    }, attachClass: function(a) {
                        var b = this.getCustomData("classes");
                        if (!this.hasClass(a)) {
                            !b && (b = []);
                            b.push(a);
                            this.setCustomData("classes", b);
                            this.addClass(a)
                        }
                    }, changeAttr: function(a, b) {
                        var c = this.getAttribute(a);
                        if (b !== c) {
                            !this._.attrChanges && (this._.attrChanges = {});
                            a in this._.attrChanges || (this._.attrChanges[a] = c);
                            this.setAttribute(a, b)
                        }
                    }, insertHtml: function(a,
                            b) {
                        h(this);
                        n(this, b || "html", a)
                    }, insertText: function(a) {
                        h(this);
                        var b = this.editor, c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.activeEnterMode, b = c == CKEDITOR.ENTER_BR, d = CKEDITOR.tools, a = d.htmlEncode(a.replace(/\r\n/g, "\n")), a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), c = c == CKEDITOR.ENTER_P ? "p" : "div";
                        if (!b) {
                            var f = /\n{2}/g;
                            if (f.test(a))
                                var g = "<" + c + ">", e = "</" + c + ">", a = g + a.replace(f, function() {
                                return e + g
                            }) + e
                        }
                        a = a.replace(/\n/g, "<br>");
                        b || (a = a.replace(RegExp("<br>(?=</" + c +
                                ">)"), function(a) {
                            return d.repeat(a, 2)
                        }));
                        a = a.replace(/^ | $/g, "&nbsp;");
                        a = a.replace(/(>|\s) /g, function(a, b) {
                            return b + "&nbsp;"
                        }).replace(/ (?=<)/g, "&nbsp;");
                        n(this, "text", a)
                    }, insertElement: function(a, b) {
                        b ? this.insertElementIntoRange(a, b) : this.insertElementIntoSelection(a)
                    }, insertElementIntoRange: function(a, b) {
                        var c = this.editor, d = c.config.enterMode, f = a.getName(), g = CKEDITOR.dtd.$block[f];
                        if (b.checkReadOnly())
                            return false;
                        b.deleteContents(1);
                        b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({tr: 1,
                            table: 1, tbody: 1, thead: 1, tfoot: 1}) && q(b);
                        var e, h;
                        if (g)
                            for (; (e = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[e.getName()]) && (!h || !h[f]); )
                                if (e.getName()in CKEDITOR.dtd.span)
                                    b.splitElement(e);
                                else if (b.checkStartOfBlock() && b.checkEndOfBlock()) {
                                    b.setStartBefore(e);
                                    b.collapse(true);
                                    e.remove()
                                } else
                                    b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                        b.insertNode(a);
                        return true
                    }, insertElementIntoSelection: function(b) {
                        var c = this.editor, d = c.activeEnterMode, c = c.getSelection(), f = c.getRanges()[0], e = b.getName(),
                                e = CKEDITOR.dtd.$block[e];
                        h(this);
                        if (this.insertElementIntoRange(b, f)) {
                            f.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                            if (e)
                                if ((e = b.getNext(function(b) {
                                    return a(b) && !g(b)
                                })) && e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$block))
                                    e.getDtd()["#"] ? f.moveToElementEditStart(e) : f.moveToElementEditEnd(b);
                                else if (!e && d != CKEDITOR.ENTER_BR) {
                                    e = f.fixBlock(true, d == CKEDITOR.ENTER_DIV ? "div" : "p");
                                    f.moveToElementEditStart(e)
                                }
                        }
                        c.selectRanges([f]);
                        k(this, CKEDITOR.env.opera)
                    }, setData: function(a, b) {
                        b || (a = this.editor.dataProcessor.toHtml(a));
                        this.setHtml(a);
                        this.editor.fire("dataReady")
                    }, getData: function(a) {
                        var b = this.getHtml();
                        a || (b = this.editor.dataProcessor.toDataFormat(b));
                        return b
                    }, setReadOnly: function(a) {
                        this.setAttribute("contenteditable", !a)
                    }, detach: function() {
                        this.removeClass("cke_editable");
                        var a = this.editor;
                        this._.detach();
                        delete a.document;
                        delete a.window
                    }, isInline: function() {
                        return this.getDocument().equals(CKEDITOR.document)
                    }, setup: function() {
                        var b = this.editor;
                        this.attachListener(b, "beforeGetData", function() {
                            var a = this.getData();
                            this.is("textarea") || b.config.ignoreEmptyParagraph !== false && (a = a.replace(i, function(a, b) {
                                return b
                            }));
                            b.setData(a, null, 1)
                        }, this);
                        this.attachListener(b, "getSnapshot", function(a) {
                            a.data = this.getData(1)
                        }, this);
                        this.attachListener(b, "afterSetData", function() {
                            this.setData(b.getData(1))
                        }, this);
                        this.attachListener(b, "loadSnapshot", function(a) {
                            this.setData(a.data, 1)
                        }, this);
                        this.attachListener(b, "beforeFocus", function() {
                            var a = b.getSelection();
                            (a = a && a.getNative()) && a.type == "Control" || this.focus()
                        }, this);
                        this.attachListener(b,
                                "insertHtml", function(a) {
                                    this.insertHtml(a.data.dataValue, a.data.mode)
                                }, this);
                        this.attachListener(b, "insertElement", function(a) {
                            this.insertElement(a.data)
                        }, this);
                        this.attachListener(b, "insertText", function(a) {
                            this.insertText(a.data)
                        }, this);
                        this.setReadOnly(b.readOnly);
                        this.attachClass("cke_editable");
                        this.attachClass(b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : b.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || b.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                        this.attachClass("cke_contents_" + b.config.contentsLangDirection);
                        b.keystrokeHandler.blockedKeystrokes[8] = +b.readOnly;
                        b.keystrokeHandler.attach(this);
                        this.on("blur", function(a) {
                            CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false
                        }, null, null, -1);
                        this.on("focus", function() {
                            this.hasFocus = true
                        }, null, null, -1);
                        b.focusManager.add(this);
                        if (this.equals(CKEDITOR.document.getActive())) {
                            this.hasFocus = true;
                            b.once("contentDom",
                                    function() {
                                        b.focusManager.focus()
                                    })
                        }
                        this.isInline() && this.changeAttr("tabindex", b.tabIndex);
                        if (!this.is("textarea")) {
                            b.document = this.getDocument();
                            b.window = this.getWindow();
                            var d = b.document;
                            this.changeAttr("spellcheck", !b.config.disableNativeSpellChecker);
                            var g = b.config.contentsLangDirection;
                            this.getDirection(1) != g && this.changeAttr("dir", g);
                            var e = CKEDITOR.getCss();
                            if (e) {
                                g = d.getHead();
                                if (!g.getCustomData("stylesheet")) {
                                    e = d.appendStyleText(e);
                                    e = new CKEDITOR.dom.element(e.ownerNode || e.owningElement);
                                    g.setCustomData("stylesheet", e);
                                    e.data("cke-temp", 1)
                                }
                            }
                            g = d.getCustomData("stylesheet_ref") || 0;
                            d.setCustomData("stylesheet_ref", g + 1);
                            this.setCustomData("cke_includeReadonly", !b.config.disableReadonlyStyling);
                            this.attachListener(this, "click", function(a) {
                                var a = a.data, b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                                b && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                            });
                            var h = {8: 1, 46: 1};
                            this.attachListener(b, "key", function(a) {
                                if (b.readOnly)
                                    return true;
                                var c = a.data.keyCode, d;
                                if (c in
                                        h) {
                                    var a = b.getSelection(), g, e = a.getRanges()[0], i = e.startPath(), k, m, u, c = c == 8;
                                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (g = a.getSelectedElement()) || (g = f(a))) {
                                        b.fire("saveSnapshot");
                                        e.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START);
                                        g.remove();
                                        e.select();
                                        b.fire("saveSnapshot");
                                        d = 1
                                    } else if (e.collapsed)
                                        if ((k = i.block) && (u = k[c ? "getPrevious" : "getNext"](j)) && u.type == CKEDITOR.NODE_ELEMENT && u.is("table") && e[c ? "checkStartOfBlock" : "checkEndOfBlock"]()) {
                                            b.fire("saveSnapshot");
                                            e[c ? "checkEndOfBlock" : "checkStartOfBlock"]() &&
                                                    k.remove();
                                            e["moveToElementEdit" + (c ? "End" : "Start")](u);
                                            e.select();
                                            b.fire("saveSnapshot");
                                            d = 1
                                        } else if (i.blockLimit && i.blockLimit.is("td") && (m = i.blockLimit.getAscendant("table")) && e.checkBoundaryOfElement(m, c ? CKEDITOR.START : CKEDITOR.END) && (u = m[c ? "getPrevious" : "getNext"](j))) {
                                            b.fire("saveSnapshot");
                                            e["moveToElementEdit" + (c ? "End" : "Start")](u);
                                            e.checkStartOfBlock() && e.checkEndOfBlock() ? u.remove() : e.select();
                                            b.fire("saveSnapshot");
                                            d = 1
                                        } else if ((m = i.contains(["td", "th", "caption"])) && e.checkBoundaryOfElement(m,
                                                c ? CKEDITOR.START : CKEDITOR.END))
                                            d = 1
                                }
                                return!d
                            });
                            b.blockless && (CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && this.attachListener(this, "keyup", function(c) {
                                if (c.data.getKeystroke()in h && !this.getFirst(a)) {
                                    this.appendBogus();
                                    c = b.createRange();
                                    c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START);
                                    c.select()
                                }
                            });
                            this.attachListener(this, "dblclick", function(a) {
                                if (b.readOnly)
                                    return false;
                                a = {element: a.data.getTarget()};
                                b.fire("doubleclick", a)
                            });
                            CKEDITOR.env.ie && this.attachListener(this, "click", c);
                            !CKEDITOR.env.ie &&
                                    !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(a) {
                                        var c = a.data.getTarget();
                                        if (c.is("img", "hr", "input", "textarea", "select")) {
                                            b.getSelection().selectElement(c);
                                            c.is("input", "textarea", "select") && a.data.preventDefault()
                                        }
                                    });
                            CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(a) {
                                if (a.data.$.button == 2) {
                                    a = a.data.getTarget();
                                    if (!a.getOuterHtml().replace(i, "")) {
                                        var c = b.createRange();
                                        c.moveToElementEditStart(a);
                                        c.select(true)
                                    }
                                }
                            });
                            if (CKEDITOR.env.webkit) {
                                this.attachListener(this,
                                        "click", function(a) {
                                            a.data.getTarget().is("input", "select") && a.data.preventDefault()
                                        });
                                this.attachListener(this, "mouseup", function(a) {
                                    a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                                })
                            }
                        }
                    }}, _: {detach: function() {
                        this.editor.setData(this.editor.getData(), 0, 1);
                        this.clearListeners();
                        this.restoreAttrs();
                        var a;
                        if (a = this.removeCustomData("classes"))
                            for (; a.length; )
                                this.removeClass(a.pop());
                        a = this.getDocument();
                        var b = a.getHead();
                        if (b.getCustomData("stylesheet")) {
                            var c = a.getCustomData("stylesheet_ref");
                            if (--c)
                                a.setCustomData("stylesheet_ref", c);
                            else {
                                a.removeCustomData("stylesheet_ref");
                                b.removeCustomData("stylesheet").remove()
                            }
                        }
                        this.editor.fire("contentDomUnload");
                        delete this.editor
                    }}});
            CKEDITOR.editor.prototype.editable = function(a) {
                var b = this._.editable;
                if (b && a)
                    return 0;
                if (arguments.length)
                    b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
                return b
            };
            var g = CKEDITOR.dom.walker.bogus(), i = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                    j = CKEDITOR.dom.walker.whitespaces(true), m = CKEDITOR.dom.walker.bookmark(false, true);
            CKEDITOR.on("instanceLoaded", function(a) {
                var b = a.editor;
                b.on("insertElement", function(a) {
                    a = a.data;
                    if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                        a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                        a.setAttribute("contentEditable", false)
                    }
                });
                b.on("selectionChange", function(a) {
                    if (!b.readOnly) {
                        var c = b.getSelection();
                        if (c && !c.isLocked) {
                            c = b.checkDirty();
                            b.fire("lockSnapshot");
                            d(a);
                            b.fire("unlockSnapshot");
                            !c && b.resetDirty()
                        }
                    }
                })
            });
            CKEDITOR.on("instanceCreated", function(a) {
                var b = a.editor;
                b.on("mode", function() {
                    var a = b.editable();
                    if (a && a.isInline()) {
                        var c = b.title;
                        a.changeAttr("role", "textbox");
                        a.changeAttr("aria-label", c);
                        c && a.changeAttr("title", c);
                        if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                            var d = CKEDITOR.tools.getNextId(), f = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp +
                                    "</span>");
                            c.append(f);
                            a.changeAttr("aria-describedby", d)
                        }
                    }
                })
            });
            CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
            var n = function() {
                function b(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT
                }
                function c(a, d) {
                    var f, g, e, i, k = [], A = d.range.startContainer;
                    f = d.range.startPath();
                    for (var A = h[A.getName()], j = 0, J = a.getChildren(), G = J.count(), m = -1, s = -1, w = 0, n = f.contains(h.$list); j < G; ++j) {
                        f = J.getItem(j);
                        if (b(f)) {
                            e = f.getName();
                            if (n && e in CKEDITOR.dtd.$list)
                                k =
                                        k.concat(c(f, d));
                            else {
                                i = !!A[e];
                                if (e == "br" && f.data("cke-eol") && (!j || j == G - 1)) {
                                    w = (g = j ? k[j - 1].node : J.getItem(j + 1)) && (!b(g) || !g.is("br"));
                                    g = g && b(g) && h.$block[g.getName()]
                                }
                                m == -1 && !i && (m = j);
                                i || (s = j);
                                k.push({isElement: 1, isLineBreak: w, isBlock: f.isBlockBoundary(), hasBlockSibling: g, node: f, name: e, allowed: i});
                                g = w = 0
                            }
                        } else
                            k.push({isElement: 0, node: f, allowed: 1})
                    }
                    if (m > -1)
                        k[m].firstNotAllowed = 1;
                    if (s > -1)
                        k[s].lastNotAllowed = 1;
                    return k
                }
                function d(a, c) {
                    var f = [], g = a.getChildren(), e = g.count(), i, k = 0, A = h[c], j = !a.is(h.$inline) ||
                            a.is("br");
                    for (j && f.push(" "); k < e; k++) {
                        i = g.getItem(k);
                        b(i) && !i.is(A) ? f = f.concat(d(i, c)) : f.push(i)
                    }
                    j && f.push(" ");
                    return f
                }
                function f(a) {
                    return a && b(a) && (a.is(h.$removeEmpty) || a.is("a") && !a.isBlockBoundary())
                }
                function g(a, c, d, f) {
                    var e = a.clone(), h, k;
                    e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                    if ((h = (new CKEDITOR.dom.walker(e)).next()) && b(h) && i[h.getName()] && (k = h.getPrevious()) && b(k) && !k.getParent().equals(a.startContainer) && d.contains(k) && f.contains(h) && h.isIdentical(k)) {
                        h.moveChildren(k);
                        h.remove();
                        g(a, c, d, f)
                    }
                }
                function e(a, c) {
                    function d(a, c) {
                        if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) {
                            a.remove();
                            return 1
                        }
                    }
                    var f = c.endContainer.getChild(c.endOffset), g = c.endContainer.getChild(c.endOffset - 1);
                    f && d(f, a[a.length - 1]);
                    if (g && d(g, a[0])) {
                        c.setEnd(c.endContainer, c.endOffset - 1);
                        c.collapse()
                    }
                }
                var h = CKEDITOR.dtd, i = {p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1}, j = {p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, m = CKEDITOR.tools.extend({}, h.$inline);
                delete m.br;
                return function(i,
                        n, v) {
                    var u = i.editor;
                    i.getDocument();
                    var D = u.getSelection().getRanges()[0], q = false;
                    if (n == "unfiltered_html") {
                        n = "html";
                        q = true
                    }
                    if (!D.checkReadOnly()) {
                        var B = (new CKEDITOR.dom.elementPath(D.startContainer, D.root)).blockLimit || D.root, n = {type: n, dontFilter: q, editable: i, editor: u, range: D, blockLimit: B, mergeCandidates: [], zombies: []}, u = n.range, q = n.mergeCandidates, A, E, J, G;
                        if (n.type == "text" && u.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                            A = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", u.document);
                            u.insertNode(A);
                            u.setStartAfter(A)
                        }
                        E = new CKEDITOR.dom.elementPath(u.startContainer);
                        n.endPath = J = new CKEDITOR.dom.elementPath(u.endContainer);
                        if (!u.collapsed) {
                            var B = J.block || J.blockLimit, Y = u.getCommonAncestor();
                            B && (!B.equals(Y) && !B.contains(Y) && u.checkEndOfBlock()) && n.zombies.push(B);
                            u.deleteContents()
                        }
                        for (; (G = b(u.startContainer) && u.startContainer.getChild(u.startOffset - 1)) && b(G) && G.isBlockBoundary() && E.contains(G); )
                            u.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END);
                        g(u, n.blockLimit, E, J);
                        if (A) {
                            u.setEndBefore(A);
                            u.collapse();
                            A.remove()
                        }
                        A = u.startPath();
                        if (B = A.contains(f, false, 1)) {
                            u.splitElement(B);
                            n.inlineStylesRoot = B;
                            n.inlineStylesPeak = A.lastElement
                        }
                        A = u.createBookmark();
                        (B = A.startNode.getPrevious(a)) && b(B) && f(B) && q.push(B);
                        (B = A.startNode.getNext(a)) && b(B) && f(B) && q.push(B);
                        for (B = A.startNode; (B = B.getParent()) && f(B); )
                            q.push(B);
                        u.moveToBookmark(A);
                        if (A = v) {
                            A = n.range;
                            if (n.type == "text" && n.inlineStylesRoot) {
                                G = n.inlineStylesPeak;
                                u = G.getDocument().createText("{cke-peak}");
                                for (q = n.inlineStylesRoot.getParent(); !G.equals(q); ) {
                                    u = u.appendTo(G.clone());
                                    G = G.getParent()
                                }
                                v = u.getOuterHtml().split("{cke-peak}").join(v)
                            }
                            G = n.blockLimit.getName();
                            if (/^\s+|\s+$/.test(v) && "span"in CKEDITOR.dtd[G])
                                var P = '<span data-cke-marker="1">&nbsp;</span>', v = P + v + P;
                            v = n.editor.dataProcessor.toHtml(v, {context: null, fixForBody: false, dontFilter: n.dontFilter, filter: n.editor.activeFilter, enterMode: n.editor.activeEnterMode});
                            G = A.document.createElement("body");
                            G.setHtml(v);
                            if (P) {
                                G.getFirst().remove();
                                G.getLast().remove()
                            }
                            if ((P = A.startPath().block) && !(P.getChildCount() == 1 && P.getBogus()))
                                a:{
                                    var K;
                                    if (G.getChildCount() == 1 && b(K = G.getFirst()) && K.is(j)) {
                                        P = K.getElementsByTag("*");
                                        A = 0;
                                        for (q = P.count(); A < q; A++) {
                                            u = P.getItem(A);
                                            if (!u.is(m))
                                                break a
                                        }
                                        K.moveChildren(K.getParent(1));
                                        K.remove()
                                    }
                                }
                            n.dataWrapper = G;
                            A = v
                        }
                        if (A) {
                            K = n.range;
                            var P = K.document, H, v = n.blockLimit;
                            A = 0;
                            var M;
                            G = [];
                            var L, Q, q = u = 0, N, T;
                            E = K.startContainer;
                            var B = n.endPath.elements[0], U;
                            J = B.getPosition(E);
                            Y = !!B.getCommonAncestor(E) && J != CKEDITOR.POSITION_IDENTICAL && !(J & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                            E = c(n.dataWrapper, n);
                            for (e(E, K); A < E.length; A++) {
                                J = E[A];
                                if (H = J.isLineBreak) {
                                    H = K;
                                    N = v;
                                    var O = void 0, V = void 0;
                                    if (J.hasBlockSibling)
                                        H = 1;
                                    else {
                                        O = H.startContainer.getAscendant(h.$block, 1);
                                        if (!O || !O.is({div: 1, p: 1}))
                                            H = 0;
                                        else {
                                            V = O.getPosition(N);
                                            if (V == CKEDITOR.POSITION_IDENTICAL || V == CKEDITOR.POSITION_CONTAINS)
                                                H = 0;
                                            else {
                                                N = H.splitElement(O);
                                                H.moveToPosition(N, CKEDITOR.POSITION_AFTER_START);
                                                H = 1
                                            }
                                        }
                                    }
                                }
                                if (H)
                                    q = A > 0;
                                else {
                                    H = K.startPath();
                                    if (!J.isBlock && n.editor.config.autoParagraph !== false && (n.editor.activeEnterMode != CKEDITOR.ENTER_BR && n.editor.editable().equals(H.blockLimit) &&
                                            !H.block) && (Q = n.editor.activeEnterMode != CKEDITOR.ENTER_BR && n.editor.config.autoParagraph !== false ? n.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false)) {
                                        Q = P.createElement(Q);
                                        Q.appendBogus();
                                        K.insertNode(Q);
                                        CKEDITOR.env.needsBrFiller && (M = Q.getBogus()) && M.remove();
                                        K.moveToPosition(Q, CKEDITOR.POSITION_BEFORE_END)
                                    }
                                    if ((H = K.startPath().block) && !H.equals(L)) {
                                        if (M = H.getBogus()) {
                                            M.remove();
                                            G.push(H)
                                        }
                                        L = H
                                    }
                                    J.firstNotAllowed && (u = 1);
                                    if (u && J.isElement) {
                                        H = K.startContainer;
                                        for (N = null; H && !h[H.getName()][J.name]; ) {
                                            if (H.equals(v)) {
                                                H =
                                                        null;
                                                break
                                            }
                                            N = H;
                                            H = H.getParent()
                                        }
                                        if (H) {
                                            if (N) {
                                                T = K.splitElement(N);
                                                n.zombies.push(T);
                                                n.zombies.push(N)
                                            }
                                        } else {
                                            N = v.getName();
                                            U = !A;
                                            H = A == E.length - 1;
                                            N = d(J.node, N);
                                            for (var O = [], V = N.length, W = 0, Z = void 0, R = 0, ba = -1; W < V; W++) {
                                                Z = N[W];
                                                if (Z == " ") {
                                                    if (!R && (!U || W)) {
                                                        O.push(new CKEDITOR.dom.text(" "));
                                                        ba = O.length
                                                    }
                                                    R = 1
                                                } else {
                                                    O.push(Z);
                                                    R = 0
                                                }
                                            }
                                            H && ba == O.length && O.pop();
                                            U = O
                                        }
                                    }
                                    if (U) {
                                        for (; H = U.pop(); )
                                            K.insertNode(H);
                                        U = 0
                                    } else
                                        K.insertNode(J.node);
                                    if (J.lastNotAllowed && A < E.length - 1) {
                                        (T = Y ? B : T) && K.setEndAt(T, CKEDITOR.POSITION_AFTER_START);
                                        u = 0
                                    }
                                    K.collapse()
                                }
                            }
                            n.dontMoveCaret = q;
                            n.bogusNeededBlocks = G
                        }
                        M = n.range;
                        var $;
                        T = n.bogusNeededBlocks;
                        for (U = M.createBookmark(); L = n.zombies.pop(); )
                            if (L.getParent()) {
                                Q = M.clone();
                                Q.moveToElementEditStart(L);
                                Q.removeEmptyBlocksAtEnd()
                            }
                        if (T)
                            for (; L = T.pop(); )
                                CKEDITOR.env.needsBrFiller ? L.appendBogus() : L.append(M.document.createText(" "));
                        for (; L = n.mergeCandidates.pop(); )
                            L.mergeSiblings();
                        M.moveToBookmark(U);
                        if (!n.dontMoveCaret) {
                            for (L = b(M.startContainer) && M.startContainer.getChild(M.startOffset - 1); L && b(L) && !L.is(h.$empty); ) {
                                if (L.isBlockBoundary())
                                    M.moveToPosition(L,
                                            CKEDITOR.POSITION_BEFORE_END);
                                else {
                                    if (f(L) && L.getHtml().match(/(\s|&nbsp;)$/g)) {
                                        $ = null;
                                        break
                                    }
                                    $ = M.clone();
                                    $.moveToPosition(L, CKEDITOR.POSITION_BEFORE_END)
                                }
                                L = L.getLast(a)
                            }
                            $ && M.moveToRange($)
                        }
                        D.select();
                        k(i)
                    }
                }
            }(), q = function() {
                function a(b) {
                    b = new CKEDITOR.dom.walker(b);
                    b.guard = function(a, b) {
                        if (b)
                            return false;
                        if (a.type == CKEDITOR.NODE_ELEMENT)
                            return a.is(CKEDITOR.dtd.$tableContent)
                    };
                    b.evaluator = function(a) {
                        return a.type == CKEDITOR.NODE_ELEMENT
                    };
                    return b
                }
                function b(a, c, d) {
                    c = a.getDocument().createElement(c);
                    a.append(c, d);
                    return c
                }
                function c(a) {
                    var b = a.count(), d;
                    for (b; b-- > 0; ) {
                        d = a.getItem(b);
                        if (!CKEDITOR.tools.trim(d.getHtml())) {
                            d.appendBogus();
                            CKEDITOR.env.ie && (CKEDITOR.env.version < 9 && d.getChildCount()) && d.getFirst().remove()
                        }
                    }
                }
                return function(d) {
                    var f = d.startContainer, g = f.getAscendant("table", 1), e = false;
                    c(g.getElementsByTag("td"));
                    c(g.getElementsByTag("th"));
                    g = d.clone();
                    g.setStart(f, 0);
                    g = a(g).lastBackward();
                    if (!g) {
                        g = d.clone();
                        g.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
                        g = a(g).lastForward();
                        e = true
                    }
                    g ||
                            (g = f);
                    if (g.is("table")) {
                        d.setStartAt(g, CKEDITOR.POSITION_BEFORE_START);
                        d.collapse(true);
                        g.remove()
                    } else {
                        g.is({tbody: 1, thead: 1, tfoot: 1}) && (g = b(g, "tr", e));
                        g.is("tr") && (g = b(g, g.getParent().is("thead") ? "th" : "td", e));
                        (f = g.getBogus()) && f.remove();
                        d.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END)
                    }
                }
            }()
        }(), function() {
            function d() {
                var a = this._.fakeSelection, b;
                if (a) {
                    b = this.getSelection(1);
                    if (!b || !b.isHidden()) {
                        a.reset();
                        a = 0
                    }
                }
                if (!a) {
                    a = b || this.getSelection(1);
                    if (!a || a.getType() ==
                            CKEDITOR.SELECTION_NONE)
                        return
                }
                this.fire("selectionCheck", a);
                b = this.elementPath();
                if (!b.compare(this._.selectionPreviousPath)) {
                    if (CKEDITOR.env.webkit)
                        this._.previousActive = this.document.getActive();
                    this._.selectionPreviousPath = b;
                    this.fire("selectionChange", {selection: a, path: b})
                }
            }
            function e() {
                n = true;
                if (!m) {
                    c.call(this);
                    m = CKEDITOR.tools.setTimeout(c, 200, this)
                }
            }
            function c() {
                m = null;
                if (n) {
                    CKEDITOR.tools.setTimeout(d, 0, this);
                    n = false
                }
            }
            function a(a) {
                function b(c, d) {
                    return!c || c.type == CKEDITOR.NODE_TEXT ? false :
                            a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
                }
                if (!(a.root instanceof CKEDITOR.editable))
                    return false;
                var c = a.startContainer, d = a.getPreviousNode(q, null, c), f = a.getNextNode(q, null, c);
                return b(d) || b(f, 1) || !d && !f && !(c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? true : false
            }
            function b(a) {
                return a.getCustomData("cke-fillingChar")
            }
            function f(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar");
                if (c) {
                    if (b !== false) {
                        var d, f = a.getDocument().getSelection().getNative(), g = f && f.type != "None" &&
                                f.getRangeAt(0);
                        if (c.getLength() > 1 && g && g.intersectsNode(c.$)) {
                            d = [f.anchorOffset, f.focusOffset];
                            g = f.focusNode == c.$ && f.focusOffset > 0;
                            f.anchorNode == c.$ && f.anchorOffset > 0 && d[0]--;
                            g && d[1]--;
                            var e;
                            g = f;
                            if (!g.isCollapsed) {
                                e = g.getRangeAt(0);
                                e.setStart(g.anchorNode, g.anchorOffset);
                                e.setEnd(g.focusNode, g.focusOffset);
                                e = e.collapsed
                            }
                            e && d.unshift(d.pop())
                        }
                    }
                    c.setText(h(c.getText()));
                    if (d) {
                        c = f.getRangeAt(0);
                        c.setStart(c.startContainer, d[0]);
                        c.setEnd(c.startContainer, d[1]);
                        f.removeAllRanges();
                        f.addRange(c)
                    }
                }
            }
            function h(a) {
                return a.replace(/\u200B( )?/g,
                        function(a) {
                            return a[1] ? " " : ""
                        })
            }
            function k(a, b, c) {
                var d = a.on("focus", function(a) {
                    a.cancel()
                }, null, null, -100);
                if (CKEDITOR.env.ie)
                    var f = a.getDocument().on("selectionchange", function(a) {
                        a.cancel()
                    }, null, null, -100);
                else {
                    var g = new CKEDITOR.dom.range(a);
                    g.moveToElementEditStart(a);
                    var e = a.getDocument().$.createRange();
                    e.setStart(g.startContainer.$, g.startOffset);
                    e.collapse(1);
                    b.removeAllRanges();
                    b.addRange(e)
                }
                c && a.focus();
                d.removeListener();
                f && f.removeListener()
            }
            function g(a) {
                var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' +
                        (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document);
                a.fire("lockSnapshot");
                a.editable().append(b);
                var c = a.getSelection(1), d = a.createRange(), f = c.root.on("selectionchange", function(a) {
                    a.cancel()
                }, null, null, 0);
                d.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
                d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                c.selectRanges([d]);
                f.removeListener();
                a.fire("unlockSnapshot");
                a._.hiddenSelectionContainer = b
            }
            function i(a) {
                var b = {37: 1, 39: 1, 8: 1, 46: 1};
                return function(c) {
                    var d =
                            c.data.getKeystroke();
                    if (b[d]) {
                        var f = a.getSelection().getRanges(), g = f[0];
                        if (f.length == 1 && g.collapsed)
                            if ((d = g[d < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && d.getAttribute("contenteditable") == "false") {
                                a.getSelection().fake(d);
                                c.data.preventDefault();
                                c.cancel()
                            }
                    }
                }
            }
            function j(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
                    if (!c.collapsed) {
                        if (c.startContainer.isReadOnly())
                            for (var d = c.startContainer, f; d; ) {
                                if ((f = d.type ==
                                        CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly())
                                    break;
                                f && d.getAttribute("contentEditable") == "false" && c.setStartAfter(d);
                                d = d.getParent()
                            }
                        d = c.startContainer;
                        f = c.endContainer;
                        var g = c.startOffset, e = c.endOffset, h = c.clone();
                        d && d.type == CKEDITOR.NODE_TEXT && (g >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d));
                        f && f.type == CKEDITOR.NODE_TEXT && (e ? h.setEndAfter(f) : h.setEndBefore(f));
                        d = new CKEDITOR.dom.walker(h);
                        d.evaluator = function(d) {
                            if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
                                var f = c.clone();
                                c.setEndBefore(d);
                                c.collapsed && a.splice(b--, 1);
                                if (!(d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                    f.setStartAfter(d);
                                    f.collapsed || a.splice(b + 1, 0, f)
                                }
                                return true
                            }
                            return false
                        };
                        d.next()
                    }
                }
                return a
            }
            var m, n, q = CKEDITOR.dom.walker.invisible(1), o = function() {
                function a(b) {
                    return function(a) {
                        var c = a.editor.createRange();
                        c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                        return false
                    }
                }
                function b(a) {
                    return function(b) {
                        var c = b.editor, d = c.createRange(), f;
                        if (!(f =
                                d.moveToClosestEditablePosition(b.selected, a)))
                            f = d.moveToClosestEditablePosition(b.selected, !a);
                        f && c.getSelection().selectRanges([d]);
                        c.fire("saveSnapshot");
                        b.selected.remove();
                        if (!f) {
                            d.moveToElementEditablePosition(c.editable());
                            c.getSelection().selectRanges([d])
                        }
                        c.fire("saveSnapshot");
                        return false
                    }
                }
                var c = a(), d = a(1);
                return{37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1)}
            }();
            CKEDITOR.on("instanceCreated", function(a) {
                function b() {
                    var a = c.getSelection();
                    a && a.removeAllRanges()
                }
                var c = a.editor;
                c.on("contentDom", function() {
                    var a =
                            c.document, b = CKEDITOR.document, g = c.editable(), h = a.getBody(), k = a.getDocumentElement(), j = g.isInline(), u, m;
                    CKEDITOR.env.gecko && g.attachListener(g, "focus", function(a) {
                        a.removeListener();
                        if (u !== 0)
                            if ((a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$) {
                                a = c.createRange();
                                a.moveToElementEditStart(g);
                                a.select()
                            }
                    }, null, null, -2);
                    g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                        u && CKEDITOR.env.webkit && (u = c._.previousActive && c._.previousActive.equals(a.getActive()));
                        c.unlockSelection(u);
                        u = 0
                    }, null, null, -1);
                    g.attachListener(g, "mousedown", function() {
                        u = 0
                    });
                    if (CKEDITOR.env.ie || CKEDITOR.env.opera || j) {
                        var o = function() {
                            m = new CKEDITOR.dom.selection(c.getSelection());
                            m.lock()
                        };
                        l ? g.attachListener(g, "beforedeactivate", o, null, null, -1) : g.attachListener(c, "selectionCheck", o, null, null, -1);
                        g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
                            c.lockSelection(m);
                            u = 1
                        }, null, null, -1);
                        g.attachListener(g, "mousedown", function() {
                            u = 0
                        })
                    }
                    if (CKEDITOR.env.ie && !j) {
                        var B;
                        g.attachListener(g, "mousedown",
                                function(a) {
                                    if (a.data.$.button == 2) {
                                        a = c.document.getSelection();
                                        if (!a || a.getType() == CKEDITOR.SELECTION_NONE)
                                            B = c.window.getScrollPosition()
                                    }
                                });
                        g.attachListener(g, "mouseup", function(a) {
                            if (a.data.$.button == 2 && B) {
                                c.document.$.documentElement.scrollLeft = B.x;
                                c.document.$.documentElement.scrollTop = B.y
                            }
                            B = null
                        });
                        if (a.$.compatMode != "BackCompat") {
                            if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)
                                k.on("mousedown", function(a) {
                                    function c(a) {
                                        a = a.data.$;
                                        if (f) {
                                            var b = h.$.createTextRange();
                                            try {
                                                b.moveToPoint(a.x, a.y)
                                            } catch (d) {
                                            }
                                            f.setEndPoint(e.compareEndPoints("StartToStart",
                                                    b) < 0 ? "EndToEnd" : "StartToStart", b);
                                            f.select()
                                        }
                                    }
                                    function d() {
                                        k.removeListener("mousemove", c);
                                        b.removeListener("mouseup", d);
                                        k.removeListener("mouseup", d);
                                        f.select()
                                    }
                                    a = a.data;
                                    if (a.getTarget().is("html") && a.$.y < k.$.clientHeight && a.$.x < k.$.clientWidth) {
                                        var f = h.$.createTextRange();
                                        try {
                                            f.moveToPoint(a.$.x, a.$.y)
                                        } catch (g) {
                                        }
                                        var e = f.duplicate();
                                        k.on("mousemove", c);
                                        b.on("mouseup", d);
                                        k.on("mouseup", d)
                                    }
                                });
                            if (CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11) {
                                k.on("mousedown", function(a) {
                                    if (a.data.getTarget().is("html")) {
                                        b.on("mouseup",
                                                A);
                                        k.on("mouseup", A)
                                    }
                                });
                                var A = function() {
                                    b.removeListener("mouseup", A);
                                    k.removeListener("mouseup", A);
                                    var c = CKEDITOR.document.$.selection, d = c.createRange();
                                    c.type != "None" && d.parentElement().ownerDocument == a.$ && d.select()
                                }
                            }
                        }
                    }
                    g.attachListener(g, "selectionchange", d, c);
                    g.attachListener(g, "keyup", e, c);
                    g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                        c.forceNextSelectionCheck();
                        c.selectionChange(1)
                    });
                    if (j ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                        var E;
                        g.attachListener(g,
                                "mousedown", function() {
                                    E = 1
                                });
                        g.attachListener(a.getDocumentElement(), "mouseup", function() {
                            E && e.call(c);
                            E = 0
                        })
                    } else
                        g.attachListener(CKEDITOR.env.ie ? g : a.getDocumentElement(), "mouseup", e, c);
                    CKEDITOR.env.webkit && g.attachListener(a, "keydown", function(a) {
                        switch (a.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                f(g)
                            }
                    }, null, null, -1);
                    g.attachListener(g, "keydown", i(c), null, null, -1)
                });
                c.on("contentDomUnload", c.forceNextSelectionCheck, c);
                c.on("dataReady", function() {
                    delete c._.fakeSelection;
                    delete c._.hiddenSelectionContainer;
                    c.selectionChange(1)
                });
                c.on("loadSnapshot", function() {
                    var a = c.editable().getLast(function(a) {
                        return a.type == CKEDITOR.NODE_ELEMENT
                    });
                    a && a.hasAttribute("data-cke-hidden-sel") && a.remove()
                }, null, null, 100);
                CKEDITOR.env.ie9Compat && c.on("beforeDestroy", b, null, null, 9);
                CKEDITOR.env.webkit && c.on("setData", b);
                c.on("contentDomUnload", function() {
                    c.unlockSelection()
                });
                c.on("key", function(a) {
                    if (c.mode == "wysiwyg") {
                        var b = c.getSelection();
                        if (b.isFake) {
                            var d = o[a.data.keyCode];
                            if (d)
                                return d({editor: c,
                                    selected: b.getSelectedElement(), selection: b, keyEvent: a})
                        }
                    }
                })
            });
            CKEDITOR.on("instanceReady", function(a) {
                var c = a.editor;
                if (CKEDITOR.env.webkit) {
                    c.on("selectionChange", function() {
                        var a = c.editable(), d = b(a);
                        d && (d.getCustomData("ready") ? f(a) : d.setCustomData("ready", 1))
                    }, null, null, -1);
                    c.on("beforeSetMode", function() {
                        f(c.editable())
                    }, null, null, -1);
                    var d, g, a = function() {
                        var a = c.editable();
                        if (a)
                            if (a = b(a)) {
                                var f = c.document.$.defaultView.getSelection();
                                f.type == "Caret" && f.anchorNode == a.$ && (g = 1);
                                d = a.getText();
                                a.setText(h(d))
                            }
                    },
                            e = function() {
                                var a = c.editable();
                                if (a)
                                    if (a = b(a)) {
                                        a.setText(d);
                                        if (g) {
                                            c.document.$.defaultView.getSelection().setPosition(a.$, a.getLength());
                                            g = 0
                                        }
                                    }
                            };
                    c.on("beforeUndoImage", a);
                    c.on("afterUndoImage", e);
                    c.on("beforeGetData", a, null, null, 0);
                    c.on("getData", e)
                }
            });
            CKEDITOR.editor.prototype.selectionChange = function(a) {
                (a ? d : e).call(this)
            };
            CKEDITOR.editor.prototype.getSelection = function(a) {
                if ((this._.savedSelection || this._.fakeSelection) && !a)
                    return this._.savedSelection || this._.fakeSelection;
                return(a = this.editable()) &&
                        this.mode == "wysiwyg" ? new CKEDITOR.dom.selection(a) : null
            };
            CKEDITOR.editor.prototype.lockSelection = function(a) {
                a = a || this.getSelection(1);
                if (a.getType() != CKEDITOR.SELECTION_NONE) {
                    !a.isLocked && a.lock();
                    this._.savedSelection = a;
                    return true
                }
                return false
            };
            CKEDITOR.editor.prototype.unlockSelection = function(a) {
                var b = this._.savedSelection;
                if (b) {
                    b.unlock(a);
                    delete this._.savedSelection;
                    return true
                }
                return false
            };
            CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
                delete this._.selectionPreviousPath
            };
            CKEDITOR.dom.document.prototype.getSelection = function() {
                return new CKEDITOR.dom.selection(this)
            };
            CKEDITOR.dom.range.prototype.select = function() {
                var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
                a.selectRanges([this]);
                return a
            };
            CKEDITOR.SELECTION_NONE = 1;
            CKEDITOR.SELECTION_TEXT = 2;
            CKEDITOR.SELECTION_ELEMENT = 3;
            var l = typeof window.getSelection != "function", r = 1;
            CKEDITOR.dom.selection = function(a) {
                if (a instanceof CKEDITOR.dom.selection)
                    var b =
                            a, a = a.root;
                var c = a instanceof CKEDITOR.dom.element;
                this.rev = b ? b.rev : r++;
                this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
                this.root = a = c ? a : this.document.getBody();
                this.isLocked = 0;
                this._ = {cache: {}};
                if (b) {
                    CKEDITOR.tools.extend(this._.cache, b._.cache);
                    this.isFake = b.isFake;
                    this.isLocked = b.isLocked;
                    return this
                }
                b = l ? this.document.$.selection : this.document.getWindow().$.getSelection();
                if (CKEDITOR.env.webkit)
                    (b.type == "None" && this.document.getActive().equals(a) || b.type == "Caret" && b.anchorNode.nodeType ==
                            CKEDITOR.NODE_DOCUMENT) && k(a, b);
                else if (CKEDITOR.env.gecko)
                    b && (this.document.getActive().equals(a) && b.anchorNode && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && k(a, b, true);
                else if (CKEDITOR.env.ie) {
                    var d;
                    try {
                        d = this.document.getActive()
                    } catch (f) {
                    }
                    if (l)
                        b.type == "None" && (d && d.equals(this.document.getDocumentElement())) && k(a, null, true);
                    else {
                        (b = b && b.anchorNode) && (b = new CKEDITOR.dom.node(b));
                        d && (d.equals(this.document.getDocumentElement()) && b && (a.equals(b) || a.contains(b))) && k(a, null, true)
                    }
                }
                d = this.getNative();
                var g, e;
                if (d)
                    if (d.getRangeAt)
                        g = (e = d.rangeCount && d.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer);
                    else {
                        try {
                            e = d.createRange()
                        } catch (h) {
                        }
                        g = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement())
                    }
                if (!g || !(g.type == CKEDITOR.NODE_ELEMENT || g.type == CKEDITOR.NODE_TEXT) || !this.root.equals(g) && !this.root.contains(g)) {
                    this._.cache.type = CKEDITOR.SELECTION_NONE;
                    this._.cache.startElement = null;
                    this._.cache.selectedElement = null;
                    this._.cache.selectedText = "";
                    this._.cache.ranges = new CKEDITOR.dom.rangeList
                }
                return this
            };
            var p = {img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1};
            CKEDITOR.dom.selection.prototype = {getNative: function() {
                    return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = l ? this.document.$.selection : this.document.getWindow().$.getSelection()
                }, getType: l ? function() {
                    var a = this._.cache;
                    if (a.type)
                        return a.type;
                    var b = CKEDITOR.SELECTION_NONE;
                    try {
                        var c = this.getNative(), d = c.type;
                        if (d == "Text")
                            b =
                                    CKEDITOR.SELECTION_TEXT;
                        if (d == "Control")
                            b = CKEDITOR.SELECTION_ELEMENT;
                        if (c.createRange().parentElement())
                            b = CKEDITOR.SELECTION_TEXT
                    } catch (f) {
                    }
                    return a.type = b
                } : function() {
                    var a = this._.cache;
                    if (a.type)
                        return a.type;
                    var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
                    if (!c || !c.rangeCount)
                        b = CKEDITOR.SELECTION_NONE;
                    else if (c.rangeCount == 1) {
                        var c = c.getRangeAt(0), d = c.startContainer;
                        if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && p[d.childNodes[c.startOffset].nodeName.toLowerCase()])
                            b = CKEDITOR.SELECTION_ELEMENT
                    }
                    return a.type =
                    b
                }, getRanges: function() {
                    var a = l ? function() {
                        function a(b) {
                            return(new CKEDITOR.dom.node(b)).getIndex()
                        }
                        var b = function(b, c) {
                            b = b.duplicate();
                            b.collapse(c);
                            var d = b.parentElement();
                            if (!d.hasChildNodes())
                                return{container: d, offset: 0};
                            for (var f = d.children, g, e, h = b.duplicate(), i = 0, k = f.length - 1, j = -1, A, E; i <= k; ) {
                                j = Math.floor((i + k) / 2);
                                g = f[j];
                                h.moveToElementText(g);
                                A = h.compareEndPoints("StartToStart", b);
                                if (A > 0)
                                    k = j - 1;
                                else if (A < 0)
                                    i = j + 1;
                                else
                                    return{container: d, offset: a(g)}
                            }
                            if (j == -1 || j == f.length - 1 && A < 0) {
                                h.moveToElementText(d);
                                h.setEndPoint("StartToStart", b);
                                h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                                f = d.childNodes;
                                if (!h) {
                                    g = f[f.length - 1];
                                    return g.nodeType != CKEDITOR.NODE_TEXT ? {container: d, offset: f.length} : {container: g, offset: g.nodeValue.length}
                                }
                                for (d = f.length; h > 0 && d > 0; ) {
                                    e = f[--d];
                                    if (e.nodeType == CKEDITOR.NODE_TEXT) {
                                        E = e;
                                        h = h - e.nodeValue.length
                                    }
                                }
                                return{container: E, offset: -h}
                            }
                            h.collapse(A > 0 ? true : false);
                            h.setEndPoint(A > 0 ? "StartToStart" : "EndToStart", b);
                            h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                            if (!h)
                                return{container: d, offset: a(g) +
                                            (A > 0 ? 0 : 1)};
                            for (; h > 0; )
                                try {
                                    e = g[A > 0 ? "previousSibling" : "nextSibling"];
                                    if (e.nodeType == CKEDITOR.NODE_TEXT) {
                                        h = h - e.nodeValue.length;
                                        E = e
                                    }
                                    g = e
                                } catch (J) {
                                    return{container: d, offset: a(g)}
                                }
                            return{container: E, offset: A > 0 ? -h : E.nodeValue.length + h}
                        };
                        return function() {
                            var a = this.getNative(), c = a && a.createRange(), d = this.getType();
                            if (!a)
                                return[];
                            if (d == CKEDITOR.SELECTION_TEXT) {
                                a = new CKEDITOR.dom.range(this.root);
                                d = b(c, true);
                                a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                                d = b(c);
                                a.setEnd(new CKEDITOR.dom.node(d.container),
                                        d.offset);
                                a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                                return[a]
                            }
                            if (d == CKEDITOR.SELECTION_ELEMENT) {
                                for (var d = [], f = 0; f < c.length; f++) {
                                    for (var g = c.item(f), e = g.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < e.childNodes.length && e.childNodes[h] != g; h++)
                                        ;
                                    a.setStart(new CKEDITOR.dom.node(e), h);
                                    a.setEnd(new CKEDITOR.dom.node(e), h + 1);
                                    d.push(a)
                                }
                                return d
                            }
                            return[]
                        }
                    }() : function() {
                        var a = [], b, c = this.getNative();
                        if (!c)
                            return a;
                        for (var d = 0; d < c.rangeCount; d++) {
                            var f = c.getRangeAt(d);
                            b = new CKEDITOR.dom.range(this.root);
                            b.setStart(new CKEDITOR.dom.node(f.startContainer), f.startOffset);
                            b.setEnd(new CKEDITOR.dom.node(f.endContainer), f.endOffset);
                            a.push(b)
                        }
                        return a
                    };
                    return function(b) {
                        var c = this._.cache, d = c.ranges;
                        if (!d)
                            c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this));
                        return!b ? d : j(new CKEDITOR.dom.rangeList(d.slice()))
                    }
                }(), getStartElement: function() {
                    var a = this._.cache;
                    if (a.startElement !== void 0)
                        return a.startElement;
                    var b;
                    switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT:
                            return this.getSelectedElement();
                        case CKEDITOR.SELECTION_TEXT:
                            var c = this.getRanges()[0];
                            if (c) {
                                if (c.collapsed) {
                                    b = c.startContainer;
                                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                                } else {
                                    for (c.optimize(); ; ) {
                                        b = c.startContainer;
                                        if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary())
                                            c.setStartAfter(b);
                                        else
                                            break
                                    }
                                    b = c.startContainer;
                                    if (b.type != CKEDITOR.NODE_ELEMENT)
                                        return b.getParent();
                                    b = b.getChild(c.startOffset);
                                    if (!b || b.type != CKEDITOR.NODE_ELEMENT)
                                        b = c.startContainer;
                                    else
                                        for (c = b.getFirst(); c && c.type ==
                                                CKEDITOR.NODE_ELEMENT; ) {
                                            b = c;
                                            c = c.getFirst()
                                        }
                                }
                                b = b.$
                            }
                    }
                    return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                }, getSelectedElement: function() {
                    var a = this._.cache;
                    if (a.selectedElement !== void 0)
                        return a.selectedElement;
                    var b = this, c = CKEDITOR.tools.tryThese(function() {
                        return b.getNative().createRange().item(0)
                    }, function() {
                        for (var a = b.getRanges()[0].clone(), c, d, f = 2; f && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && p[c.getName()] && (d = c))); f--)
                            a.shrink(CKEDITOR.SHRINK_ELEMENT);
                        return d && d.$
                    });
                    return a.selectedElement =
                            c ? new CKEDITOR.dom.element(c) : null
                }, getSelectedText: function() {
                    var a = this._.cache;
                    if (a.selectedText !== void 0)
                        return a.selectedText;
                    var b = this.getNative(), b = l ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                    return a.selectedText = b
                }, lock: function() {
                    this.getRanges();
                    this.getStartElement();
                    this.getSelectedElement();
                    this.getSelectedText();
                    this._.cache.nativeSel = null;
                    this.isLocked = 1
                }, unlock: function(a) {
                    if (this.isLocked) {
                        if (a)
                            var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake;
                        this.isLocked =
                                0;
                        this.reset();
                        if (a)
                            (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                    }
                }, reset: function() {
                    this._.cache = {};
                    this.isFake = 0;
                    var a = this.root.editor;
                    if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) {
                        delete a._.fakeSelection;
                        var b = a._.hiddenSelectionContainer;
                        if (b) {
                            a.fire("lockSnapshot");
                            b.remove();
                            a.fire("unlockSnapshot")
                        }
                        delete a._.hiddenSelectionContainer
                    }
                    this.rev = r++
                }, selectElement: function(a) {
                    var b = new CKEDITOR.dom.range(this.root);
                    b.setStartBefore(a);
                    b.setEndAfter(a);
                    this.selectRanges([b])
                }, selectRanges: function(b) {
                    var c = this.root.editor, c = c && c._.hiddenSelectionContainer;
                    this.reset();
                    if (c)
                        for (var c = this.root, d, g = 0; g < b.length; ++g) {
                            d = b[g];
                            if (d.endContainer.equals(c))
                                d.endOffset = Math.min(d.endOffset, c.getChildCount())
                        }
                    if (b.length)
                        if (this.isLocked) {
                            var e = CKEDITOR.document.getActive();
                            this.unlock();
                            this.selectRanges(b);
                            this.lock();
                            !e.equals(this.root) && e.focus()
                        } else {
                            var h;
                            a:{
                                var i, k;
                                if (b.length == 1 && !(k = b[0]).collapsed && (h = k.getEnclosedNode()) &&
                                        h.type == CKEDITOR.NODE_ELEMENT) {
                                    k = k.clone();
                                    k.shrink(CKEDITOR.SHRINK_ELEMENT, true);
                                    if ((i = k.getEnclosedNode()) && i.type == CKEDITOR.NODE_ELEMENT)
                                        h = i;
                                    if (h.getAttribute("contenteditable") == "false")
                                        break a
                                }
                                h = void 0
                            }
                            if (h)
                                this.fake(h);
                            else {
                                if (l) {
                                    k = CKEDITOR.dom.walker.whitespaces(true);
                                    i = /\ufeff|\u00a0/;
                                    c = {table: 1, tbody: 1, tr: 1};
                                    if (b.length > 1) {
                                        h = b[b.length - 1];
                                        b[0].setEnd(h.endContainer, h.endOffset)
                                    }
                                    h = b[0];
                                    var b = h.collapsed, j, u, m;
                                    if ((d = h.getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName()in p && (!d.is("a") ||
                                            !d.getText()))
                                        try {
                                            m = d.$.createControlRange();
                                            m.addElement(d.$);
                                            m.select();
                                            return
                                        } catch (o) {
                                        }
                                    (h.startContainer.type == CKEDITOR.NODE_ELEMENT && h.startContainer.getName()in c || h.endContainer.type == CKEDITOR.NODE_ELEMENT && h.endContainer.getName()in c) && h.shrink(CKEDITOR.NODE_ELEMENT, true);
                                    m = h.createBookmark();
                                    c = m.startNode;
                                    if (!b)
                                        e = m.endNode;
                                    m = h.document.$.body.createTextRange();
                                    m.moveToElementText(c.$);
                                    m.moveStart("character", 1);
                                    if (e) {
                                        i = h.document.$.body.createTextRange();
                                        i.moveToElementText(e.$);
                                        m.setEndPoint("EndToEnd",
                                                i);
                                        m.moveEnd("character", -1)
                                    } else {
                                        j = c.getNext(k);
                                        u = c.hasAscendant("pre");
                                        j = !(j && j.getText && j.getText().match(i)) && (u || !c.hasPrevious() || c.getPrevious().is && c.getPrevious().is("br"));
                                        u = h.document.createElement("span");
                                        u.setHtml("&#65279;");
                                        u.insertBefore(c);
                                        j && h.document.createText("﻿").insertBefore(c)
                                    }
                                    h.setStartBefore(c);
                                    c.remove();
                                    if (b) {
                                        if (j) {
                                            m.moveStart("character", -1);
                                            m.select();
                                            h.document.$.selection.clear()
                                        } else
                                            m.select();
                                        h.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START);
                                        u.remove()
                                    } else {
                                        h.setEndBefore(e);
                                        e.remove();
                                        m.select()
                                    }
                                } else {
                                    e = this.getNative();
                                    if (!e)
                                        return;
                                    if (CKEDITOR.env.opera) {
                                        m = this.document.$.createRange();
                                        m.selectNodeContents(this.root.$);
                                        e.addRange(m)
                                    }
                                    this.removeAllRanges();
                                    for (m = 0; m < b.length; m++) {
                                        if (m < b.length - 1) {
                                            h = b[m];
                                            j = b[m + 1];
                                            i = h.clone();
                                            i.setStart(h.endContainer, h.endOffset);
                                            i.setEnd(j.startContainer, j.startOffset);
                                            if (!i.collapsed) {
                                                i.shrink(CKEDITOR.NODE_ELEMENT, true);
                                                u = i.getCommonAncestor();
                                                i = i.getEnclosedNode();
                                                if (u.isReadOnly() || i && i.isReadOnly()) {
                                                    j.setStart(h.startContainer,
                                                            h.startOffset);
                                                    b.splice(m--, 1);
                                                    continue
                                                }
                                            }
                                        }
                                        h = b[m];
                                        u = this.document.$.createRange();
                                        j = h.startContainer;
                                        if (CKEDITOR.env.opera && h.collapsed && j.type == CKEDITOR.NODE_ELEMENT) {
                                            i = j.getChild(h.startOffset - 1);
                                            k = j.getChild(h.startOffset);
                                            if (!i && !k && j.is(CKEDITOR.dtd.$removeEmpty) || i && i.type == CKEDITOR.NODE_ELEMENT || k && k.type == CKEDITOR.NODE_ELEMENT) {
                                                h.insertNode(this.document.createText(""));
                                                h.collapse(1)
                                            }
                                        }
                                        if (h.collapsed && CKEDITOR.env.webkit && a(h)) {
                                            j = this.root;
                                            f(j, false);
                                            i = j.getDocument().createText("​");
                                            j.setCustomData("cke-fillingChar",
                                                    i);
                                            h.insertNode(i);
                                            if ((j = i.getNext()) && !i.getPrevious() && j.type == CKEDITOR.NODE_ELEMENT && j.getName() == "br") {
                                                f(this.root);
                                                h.moveToPosition(j, CKEDITOR.POSITION_BEFORE_START)
                                            } else
                                                h.moveToPosition(i, CKEDITOR.POSITION_AFTER_END)
                                        }
                                        u.setStart(h.startContainer.$, h.startOffset);
                                        try {
                                            u.setEnd(h.endContainer.$, h.endOffset)
                                        } catch (B) {
                                            if (B.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                                h.collapse(1);
                                                u.setEnd(h.endContainer.$, h.endOffset)
                                            } else
                                                throw B;
                                        }
                                        e.addRange(u)
                                    }
                                }
                                this.reset();
                                this.root.fire("selectionchange")
                            }
                        }
                },
                fake: function(a) {
                    var b = this.root.editor;
                    this.reset();
                    g(b);
                    var c = this._.cache, d = new CKEDITOR.dom.range(this.root);
                    d.setStartBefore(a);
                    d.setEndAfter(a);
                    c.ranges = new CKEDITOR.dom.rangeList(d);
                    c.selectedElement = c.startElement = a;
                    c.type = CKEDITOR.SELECTION_ELEMENT;
                    c.selectedText = c.nativeSel = null;
                    this.isFake = 1;
                    this.rev = r++;
                    b._.fakeSelection = this;
                    this.root.fire("selectionchange")
                }, isHidden: function() {
                    var a = this.getCommonAncestor();
                    a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
                    return!(!a || !a.data("cke-hidden-sel"))
                },
                createBookmarks: function(a) {
                    a = this.getRanges().createBookmarks(a);
                    this.isFake && (a.isFake = 1);
                    return a
                }, createBookmarks2: function(a) {
                    a = this.getRanges().createBookmarks2(a);
                    this.isFake && (a.isFake = 1);
                    return a
                }, selectBookmarks: function(a) {
                    for (var b = [], c = 0; c < a.length; c++) {
                        var d = new CKEDITOR.dom.range(this.root);
                        d.moveToBookmark(a[c]);
                        b.push(d)
                    }
                    a.isFake ? this.fake(b[0].getEnclosedNode()) : this.selectRanges(b);
                    return this
                }, getCommonAncestor: function() {
                    var a = this.getRanges();
                    return!a.length ? null : a[0].startContainer.getCommonAncestor(a[a.length -
                    1].endContainer)
                }, scrollIntoView: function() {
                    this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
                }, removeAllRanges: function() {
                    if (this.getType() != CKEDITOR.SELECTION_NONE) {
                        var a = this.getNative();
                        try {
                            a && a[l ? "empty" : "removeAllRanges"]()
                        } catch (b) {
                        }
                        this.reset()
                    }
                }}
        }(), "use strict", CKEDITOR.editor.prototype.attachStyleStateChange = function(d, e) {
            var c = this._.styleStateChangeCallbacks;
            if (!c) {
                c = this._.styleStateChangeCallbacks = [];
                this.on("selectionChange", function(a) {
                    for (var b = 0; b < c.length; b++) {
                        var d =
                                c[b], e = d.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                        d.fn.call(this, e)
                    }
                })
            }
            c.push({style: d, fn: e})
        }, CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function() {
            function d(a, b) {
                for (var c, d; a = a.getParent(); ) {
                    if (a.equals(b))
                        break;
                    if (a.getAttribute("data-nostyle"))
                        c = a;
                    else if (!d) {
                        var f = a.getAttribute("contentEditable");
                        f == "false" ? c = a : f == "true" && (d = 1)
                    }
                }
                return c
            }
            function e(b) {
                var c = b.document;
                if (b.collapsed) {
                    c = r(this, c);
                    b.insertNode(c);
                    b.moveToPosition(c,
                            CKEDITOR.POSITION_BEFORE_END)
                } else {
                    var f = this.element, g = this._.definition, h, i = g.ignoreReadonly, k = i || g.includeReadonly;
                    k == void 0 && (k = b.root.getCustomData("cke_includeReadonly"));
                    var j = CKEDITOR.dtd[f];
                    if (!j) {
                        h = true;
                        j = CKEDITOR.dtd.span
                    }
                    b.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                    b.trim();
                    var m = b.createBookmark(), u = m.startNode, o = m.endNode, n = u, l;
                    if (!i) {
                        var p = b.getCommonAncestor(), i = d(u, p), p = d(o, p);
                        i && (n = i.getNextSourceNode(true));
                        p && (o = p)
                    }
                    for (n.getPosition(o) == CKEDITOR.POSITION_FOLLOWING && (n = 0); n; ) {
                        i = false;
                        if (n.equals(o)) {
                            n =
                                    null;
                            i = true
                        } else {
                            var s = n.type == CKEDITOR.NODE_ELEMENT ? n.getName() : null, p = s && n.getAttribute("contentEditable") == "false", C = s && n.getAttribute("data-nostyle");
                            if (s && n.data("cke-bookmark")) {
                                n = n.getNextSourceNode(true);
                                continue
                            }
                            if (p && k && CKEDITOR.dtd.$block[s])
                                for (var t = n, w = a(t), v = void 0, R = w.length, x = 0, t = R && new CKEDITOR.dom.range(t.getDocument()); x < R; ++x) {
                                    var v = w[x], y = CKEDITOR.filter.instances[v.data("cke-filter")];
                                    if (y ? y.check(this) : 1) {
                                        t.selectNodeContents(v);
                                        e.call(this, t)
                                    }
                                }
                            w = s ? !j[s] || C ? 0 : p && !k ? 0 : (n.getPosition(o) |
                                    D) == D && (!g.childRule || g.childRule(n)) : 1;
                            if (w)
                                if ((w = n.getParent()) && ((w.getDtd() || CKEDITOR.dtd.span)[f] || h) && (!g.parentRule || g.parentRule(w))) {
                                    if (!l && (!s || !CKEDITOR.dtd.$removeEmpty[s] || (n.getPosition(o) | D) == D)) {
                                        l = b.clone();
                                        l.setStartBefore(n)
                                    }
                                    s = n.type;
                                    if (s == CKEDITOR.NODE_TEXT || p || s == CKEDITOR.NODE_ELEMENT && !n.getChildCount()) {
                                        for (var s = n, z; (i = !s.getNext(F)) && (z = s.getParent(), j[z.getName()]) && (z.getPosition(u) | I) == I && (!g.childRule || g.childRule(z)); )
                                            s = z;
                                        l.setEndAfter(s)
                                    }
                                } else
                                    i = true;
                            else
                                i = true;
                            n = n.getNextSourceNode(C ||
                                    p)
                        }
                        if (i && l && !l.collapsed) {
                            for (var i = r(this, c), p = i.hasAttributes(), C = l.getCommonAncestor(), s = {}, w = {}, v = {}, R = {}, X, S, aa; i && C; ) {
                                if (C.getName() == f) {
                                    for (X in g.attributes)
                                        if (!R[X] && (aa = C.getAttribute(S)))
                                            i.getAttribute(X) == aa ? w[X] = 1 : R[X] = 1;
                                    for (S in g.styles)
                                        if (!v[S] && (aa = C.getStyle(S)))
                                            i.getStyle(S) == aa ? s[S] = 1 : v[S] = 1
                                }
                                C = C.getParent()
                            }
                            for (X in w)
                                i.removeAttribute(X);
                            for (S in s)
                                i.removeStyle(S);
                            p && !i.hasAttributes() && (i = null);
                            if (i) {
                                l.extractContents().appendTo(i);
                                l.insertNode(i);
                                q.call(this, i);
                                i.mergeSiblings();
                                CKEDITOR.env.ie || i.$.normalize()
                            } else {
                                i = new CKEDITOR.dom.element("span");
                                l.extractContents().appendTo(i);
                                l.insertNode(i);
                                q.call(this, i);
                                i.remove(true)
                            }
                            l = null
                        }
                    }
                    b.moveToBookmark(m);
                    b.shrink(CKEDITOR.SHRINK_TEXT);
                    b.shrink(CKEDITOR.NODE_ELEMENT, true)
                }
            }
            function c(a) {
                function b() {
                    for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(k.getParent()), f = null, g = null, e = 0; e < a.elements.length; e++) {
                        var h = a.elements[e];
                        if (h == a.block || h == a.blockLimit)
                            break;
                        j.checkElementRemovable(h) &&
                                (f = h)
                    }
                    for (e = 0; e < c.elements.length; e++) {
                        h = c.elements[e];
                        if (h == c.block || h == c.blockLimit)
                            break;
                        j.checkElementRemovable(h) && (g = h)
                    }
                    g && k.breakParent(g);
                    f && d.breakParent(f)
                }
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                var c = a.createBookmark(), d = c.startNode;
                if (a.collapsed) {
                    for (var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, e = 0, h; e < f.elements.length && (h = f.elements[e]); e++) {
                        if (h == f.block || h == f.blockLimit)
                            break;
                        if (this.checkElementRemovable(h)) {
                            var i;
                            if (a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) ||
                                    (i = a.checkBoundaryOfElement(h, CKEDITOR.START)))) {
                                g = h;
                                g.match = i ? "start" : "end"
                            } else {
                                h.mergeSiblings();
                                h.is(this.element) ? n.call(this, h) : o(h, w(this)[h.getName()])
                            }
                        }
                    }
                    if (g) {
                        h = d;
                        for (e = 0; ; e++) {
                            i = f.elements[e];
                            if (i.equals(g))
                                break;
                            else if (i.match)
                                continue;
                            else
                                i = i.clone();
                            i.append(h);
                            h = i
                        }
                        h[g.match == "start" ? "insertBefore" : "insertAfter"](g)
                    }
                } else {
                    var k = c.endNode, j = this;
                    b();
                    for (f = d; !f.equals(k); ) {
                        g = f.getNextSourceNode();
                        if (f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f)) {
                            f.getName() == this.element ?
                                    n.call(this, f) : o(f, w(this)[f.getName()]);
                            if (g.type == CKEDITOR.NODE_ELEMENT && g.contains(d)) {
                                b();
                                g = d.getNext()
                            }
                        }
                        f = g
                    }
                }
                a.moveToBookmark(c);
                a.shrink(CKEDITOR.NODE_ELEMENT, true)
            }
            function a(a) {
                var b = [];
                a.forEach(function(a) {
                    if (a.getAttribute("contenteditable") == "true") {
                        b.push(a);
                        return false
                    }
                }, CKEDITOR.NODE_ELEMENT, true);
                return b
            }
            function b(a) {
                var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
                (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && p(a, this)
            }
            function f(a) {
                var b =
                        a.getCommonAncestor(true, true);
                if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                    var b = this._.definition, c = b.attributes;
                    if (c)
                        for (var d in c)
                            a.removeAttribute(d, c[d]);
                    if (b.styles)
                        for (var f in b.styles)
                            b.styles.hasOwnProperty(f) && a.removeStyle(f)
                }
            }
            function h(a) {
                var b = a.createBookmark(true), c = a.createIterator();
                c.enforceRealBlocks = true;
                if (this._.enterMode)
                    c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var d, f = a.document, e; d = c.getNextParagraph(); )
                    if (!d.isReadOnly() && (c.activeFilter ?
                            c.activeFilter.check(this) : 1)) {
                        e = r(this, f, d);
                        g(d, e)
                    }
                a.moveToBookmark(b)
            }
            function k(a) {
                var b = a.createBookmark(1), c = a.createIterator();
                c.enforceRealBlocks = true;
                c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var d, f; d = c.getNextParagraph(); )
                    if (this.checkElementRemovable(d))
                        if (d.is("pre")) {
                            (f = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(f);
                            g(d, f)
                        } else
                            n.call(this, d);
                a.moveToBookmark(b)
            }
            function g(a, b) {
                var c = !b;
                if (c) {
                    b =
                            a.getDocument().createElement("div");
                    a.copyAttributes(b)
                }
                var d = b && b.is("pre"), f = a.is("pre"), g = !d && f;
                if (d && !f) {
                    f = b;
                    (g = a.getBogus()) && g.remove();
                    g = a.getHtml();
                    g = j(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                    g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                    g = g.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                    g = g.replace(/<br\b[^>]*>/gi, "\n");
                    if (CKEDITOR.env.ie) {
                        var e = a.getDocument().createElement("div");
                        e.append(f);
                        f.$.outerHTML = "<pre>" + g + "</pre>";
                        f.copyAttributes(e.getFirst());
                        f = e.getFirst().remove()
                    } else
                        f.setHtml(g);
                    b = f
                } else
                    g ? b = m(c ? [a.getHtml()] : i(a), b) : a.moveChildren(b);
                b.replace(a);
                if (d) {
                    var c = b, h;
                    if ((h = c.getPrevious(u)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre")) {
                        d = j(h.getHtml(), /\n$/, "") + "\n\n" + j(c.getHtml(), /^\n/, "");
                        CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d);
                        h.remove()
                    }
                } else
                    c && l(b)
            }
            function i(a) {
                a.getName();
                var b = [];
                j(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
                    return b + "</pre>" + c + "<pre>"
                }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,
                        function(a, c) {
                            b.push(c)
                        });
                return b
            }
            function j(a, b, c) {
                var d = "", f = "", a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                    b && (d = b);
                    c && (f = c);
                    return""
                });
                return d + a.replace(b, c) + f
            }
            function m(a, b) {
                var c;
                a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
                for (var d = 0; d < a.length; d++) {
                    var f = a[d], f = f.replace(/(\r\n|\r)/g, "\n"), f = j(f, /^[ \t]*\n/, ""), f = j(f, /\n$/, ""), f = j(f, /^[ \t]+|[ \t]+$/g, function(a, b) {
                        return a.length == 1 ? "&nbsp;" : b ?
                                " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                    }), f = f.replace(/\n/g, "<br>"), f = f.replace(/[ \t]{2,}/g, function(a) {
                        return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                    });
                    if (c) {
                        var g = b.clone();
                        g.setHtml(f);
                        c.append(g)
                    } else
                        b.setHtml(f)
                }
                return c || b
            }
            function n(a, b) {
                var c = this._.definition, d = c.attributes, c = c.styles, f = w(this)[a.getName()], g = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c), e;
                for (e in d)
                    if (!((e == "class" || this._.definition.fullMatch) && a.getAttribute(e) !=
                            t(e, d[e])) && !(b && e.slice(0, 5) == "data-")) {
                        g = a.hasAttribute(e);
                        a.removeAttribute(e)
                    }
                for (var h in c)
                    if (!(this._.definition.fullMatch && a.getStyle(h) != t(h, c[h], true))) {
                        g = g || !!a.getStyle(h);
                        a.removeStyle(h)
                    }
                o(a, f, z[a.getName()]);
                g && (this._.definition.alwaysRemoveElement ? l(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? l(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            }
            function q(a) {
                for (var b = w(this), c = a.getElementsByTag(this.element), d, f = c.count(); --f >=
                        0; ) {
                    d = c.getItem(f);
                    d.isReadOnly() || n.call(this, d, true)
                }
                for (var g in b)
                    if (g != this.element) {
                        c = a.getElementsByTag(g);
                        for (f = c.count() - 1; f >= 0; f--) {
                            d = c.getItem(f);
                            d.isReadOnly() || o(d, b[g])
                        }
                    }
            }
            function o(a, b, c) {
                if (b = b && b.attributes)
                    for (var d = 0; d < b.length; d++) {
                        var f = b[d][0], g;
                        if (g = a.getAttribute(f)) {
                            var e = b[d][1];
                            (e === null || e.test && e.test(g) || typeof e == "string" && g == e) && a.removeAttribute(f)
                        }
                    }
                c || l(a)
            }
            function l(a, b) {
                if (!a.hasAttributes() || b)
                    if (CKEDITOR.dtd.$block[a.getName()]) {
                        var c = a.getPrevious(u), d = a.getNext(u);
                        c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({br: 1})) && a.append("br", 1);
                        d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({br: 1})) && a.append("br");
                        a.remove(true)
                    } else {
                        c = a.getFirst();
                        d = a.getLast();
                        a.remove(true);
                        if (c) {
                            c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                            d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings()
                        }
                    }
            }
            function r(a, b, c) {
                var d;
                d = a.element;
                d == "*" && (d = "span");
                d = new CKEDITOR.dom.element(d, b);
                c && c.copyAttributes(d);
                d = p(d, a);
                b.getCustomData("doc_processing_style") &&
                        d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
                return d
            }
            function p(a, b) {
                var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
                if (d)
                    for (var f in d)
                        a.setAttribute(f, d[f]);
                c && a.setAttribute("style", c);
                return a
            }
            function s(a, b) {
                for (var c in a)
                    a[c] = a[c].replace(C, function(a, c) {
                        return b[c]
                    })
            }
            function w(a) {
                if (a._.overrides)
                    return a._.overrides;
                var b = a._.overrides = {}, c = a._.definition.overrides;
                if (c) {
                    CKEDITOR.tools.isArray(c) || (c = [c]);
                    for (var d = 0; d < c.length; d++) {
                        var f =
                                c[d], g, e;
                        if (typeof f == "string")
                            g = f.toLowerCase();
                        else {
                            g = f.element ? f.element.toLowerCase() : a.element;
                            e = f.attributes
                        }
                        f = b[g] || (b[g] = {});
                        if (e) {
                            var f = f.attributes = f.attributes || [], h;
                            for (h in e)
                                f.push([h.toLowerCase(), e[h]])
                        }
                    }
                }
                return b
            }
            function t(a, b, c) {
                var d = new CKEDITOR.dom.element("span");
                d[c ? "setStyle" : "setAttribute"](a, b);
                return d[c ? "getStyle" : "getAttribute"](a)
            }
            function v(a, b) {
                for (var c = a.document, d = a.getRanges(), f = b ? this.removeFromRange : this.applyToRange, g, e = d.createIterator(); g = e.getNextRange(); )
                    f.call(this,
                            g);
                a.selectRanges(d);
                c.removeCustomData("doc_processing_style")
            }
            var z = {address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1}, x = {a: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1}, y = /\s*(?:;\s*|$)/, C = /#\((.+?)\)/g, F = CKEDITOR.dom.walker.bookmark(0, 1), u = CKEDITOR.dom.walker.whitespaces(1);
            CKEDITOR.style = function(a, b) {
                var c = a.attributes;
                if (c && c.style) {
                    a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                    delete c.style
                }
                if (b) {
                    a = CKEDITOR.tools.clone(a);
                    s(a.attributes, b);
                    s(a.styles, b)
                }
                c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
                this.type = a.type || (z[c] ? CKEDITOR.STYLE_BLOCK : x[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
                if (typeof this.element == "object")
                    this.type = CKEDITOR.STYLE_OBJECT;
                this._ = {definition: a}
            };
            CKEDITOR.editor.prototype.applyStyle =
                    function(a) {
                        a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection())
                    };
            CKEDITOR.editor.prototype.removeStyle = function(a) {
                a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection(), 1)
            };
            CKEDITOR.style.prototype = {apply: function(a) {
                    v.call(this, a.getSelection())
                }, remove: function(a) {
                    v.call(this, a.getSelection(), 1)
                }, applyToRange: function(a) {
                    return(this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? e : this.type == CKEDITOR.STYLE_BLOCK ? h : this.type == CKEDITOR.STYLE_OBJECT ? b : null).call(this,
                            a)
                }, removeFromRange: function(a) {
                    return(this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? k : this.type == CKEDITOR.STYLE_OBJECT ? f : null).call(this, a)
                }, applyToObject: function(a) {
                    p(a, this)
                }, checkActive: function(a) {
                    switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK:
                            return this.checkElementRemovable(a.block || a.blockLimit, true);
                        case CKEDITOR.STYLE_OBJECT:
                        case CKEDITOR.STYLE_INLINE:
                            for (var b = a.elements, c = 0, d; c < b.length; c++) {
                                d = b[c];
                                if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block ||
                                        d == a.blockLimit))) {
                                    if (this.type == CKEDITOR.STYLE_OBJECT) {
                                        var f = d.getName();
                                        if (!(typeof this.element == "string" ? f == this.element : f in this.element))
                                            continue
                                    }
                                    if (this.checkElementRemovable(d, true))
                                        return true
                                }
                            }
                    }
                    return false
                }, checkApplicable: function(a, b) {
                    if (b && !b.check(this))
                        return false;
                    switch (this.type) {
                        case CKEDITOR.STYLE_OBJECT:
                            return!!a.contains(this.element);
                        case CKEDITOR.STYLE_BLOCK:
                            return!!a.blockLimit.getDtd()[this.element]
                    }
                    return true
                }, checkElementMatch: function(a, b) {
                    var c = this._.definition;
                    if (!a ||
                            !c.ignoreReadonly && a.isReadOnly())
                        return false;
                    var d = a.getName();
                    if (typeof this.element == "string" ? d == this.element : d in this.element) {
                        if (!b && !a.hasAttributes())
                            return true;
                        if (d = c._AC)
                            c = d;
                        else {
                            var d = {}, f = 0, g = c.attributes;
                            if (g)
                                for (var e in g) {
                                    f++;
                                    d[e] = g[e]
                                }
                            if (e = CKEDITOR.style.getStyleText(c)) {
                                d.style || f++;
                                d.style = e
                            }
                            d._length = f;
                            c = c._AC = d
                        }
                        if (c._length) {
                            for (var h in c)
                                if (h != "_length") {
                                    f = a.getAttribute(h) || "";
                                    if (h == "style")
                                        a:{
                                            d = c[h];
                                            typeof d == "string" && (d = CKEDITOR.tools.parseCssText(d));
                                            typeof f == "string" &&
                                                    (f = CKEDITOR.tools.parseCssText(f, true));
                                            e = void 0;
                                            for (e in d)
                                                if (!(e in f && (f[e] == d[e] || d[e] == "inherit" || f[e] == "inherit"))) {
                                                    d = false;
                                                    break a
                                                }
                                            d = true
                                        }
                                    else
                                        d = c[h] == f;
                                    if (d) {
                                        if (!b)
                                            return true
                                    } else if (b)
                                        return false
                                }
                            if (b)
                                return true
                        } else
                            return true
                    }
                    return false
                }, checkElementRemovable: function(a, b) {
                    if (this.checkElementMatch(a, b))
                        return true;
                    var c = w(this)[a.getName()];
                    if (c) {
                        var d;
                        if (!(c = c.attributes))
                            return true;
                        for (var f = 0; f < c.length; f++) {
                            d = c[f][0];
                            if (d = a.getAttribute(d)) {
                                var g = c[f][1];
                                if (g === null || typeof g ==
                                        "string" && d == g || g.test(d))
                                    return true
                            }
                        }
                    }
                    return false
                }, buildPreview: function(a) {
                    var b = this._.definition, c = [], d = b.element;
                    d == "bdo" && (d = "span");
                    var c = ["<", d], f = b.attributes;
                    if (f)
                        for (var g in f)
                            c.push(" ", g, '="', f[g], '"');
                    (f = CKEDITOR.style.getStyleText(b)) && c.push(' style="', f, '"');
                    c.push(">", a || b.name, "</", d, ">");
                    return c.join("")
                }, getDefinition: function() {
                    return this._.definition
                }};
            CKEDITOR.style.getStyleText = function(a) {
                var b = a._ST;
                if (b)
                    return b;
                var b = a.styles, c = a.attributes && a.attributes.style || "",
                        d = "";
                c.length && (c = c.replace(y, ";"));
                for (var f in b) {
                    var g = b[f], e = (f + ":" + g).replace(y, ";");
                    g == "inherit" ? d = d + e : c = c + e
                }
                c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
                return a._ST = c + d
            };
            var D = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, I = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        }(), CKEDITOR.styleCommand = function(d, e) {
            this.requiredContent = this.allowedContent = this.style = d;
            CKEDITOR.tools.extend(this, e, true)
        }, CKEDITOR.styleCommand.prototype.exec =
                function(d) {
                    d.focus();
                    this.state == CKEDITOR.TRISTATE_OFF ? d.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && d.removeStyle(this.style)
                }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(d, e, c) {
            CKEDITOR.stylesSet.addExternal(d, e, "");
            CKEDITOR.stylesSet.load(d, c)
        }, CKEDITOR.editor.prototype.getStylesSet = function(d) {
            if (this._.stylesDefinitions)
                d(this._.stylesDefinitions);
            else {
                var e = this, c = e.config.stylesCombo_stylesSet || e.config.stylesSet;
                if (c === false)
                    d(null);
                else if (c instanceof Array) {
                    e._.stylesDefinitions = c;
                    d(c)
                } else {
                    c || (c = "default");
                    var c = c.split(":"), a = c[0];
                    CKEDITOR.stylesSet.addExternal(a, c[1] ? c.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                    CKEDITOR.stylesSet.load(a, function(b) {
                        e._.stylesDefinitions = b[a];
                        d(e._.stylesDefinitions)
                    })
                }
            }
        }, CKEDITOR.dom.comment = function(d, e) {
            typeof d == "string" && (d = (e ? e.$ : document).createComment(d));
            CKEDITOR.dom.domObject.call(this,
                    d)
        }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {type: CKEDITOR.NODE_COMMENT, getOuterHtml: function() {
                return"<\!--" + this.$.nodeValue + "--\>"
            }}), "use strict", function() {
            var d = {}, e = {}, c;
            for (c in CKEDITOR.dtd.$blockLimit)
                c in CKEDITOR.dtd.$list || (d[c] = 1);
            for (c in CKEDITOR.dtd.$block)
                c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (e[c] = 1);
            CKEDITOR.dom.elementPath = function(a, b) {
                var c = null, h = null, k = [], g = a, i, b = b || a.getDocument().getBody();
                do
                    if (g.type == CKEDITOR.NODE_ELEMENT) {
                        k.push(g);
                        if (!this.lastElement) {
                            this.lastElement = g;
                            if (g.is(CKEDITOR.dtd.$object) || g.getAttribute("contenteditable") == "false")
                                continue
                        }
                        if (g.equals(b))
                            break;
                        if (!h) {
                            i = g.getName();
                            g.getAttribute("contenteditable") == "true" ? h = g : !c && e[i] && (c = g);
                            if (d[i]) {
                                var j;
                                if (j = !c) {
                                    if (i = i == "div") {
                                        a:{
                                            i = g.getChildren();
                                            j = 0;
                                            for (var m = i.count(); j < m; j++) {
                                                var n = i.getItem(j);
                                                if (n.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[n.getName()]) {
                                                    i = true;
                                                    break a
                                                }
                                            }
                                            i = false
                                        }
                                        i = !i
                                    }
                                    j = i
                                }
                                j ? c = g : h = g
                            }
                        }
                    }
                while (g =
                        g.getParent());
                h || (h = b);
                this.block = c;
                this.blockLimit = h;
                this.root = b;
                this.elements = k
            }
        }(), CKEDITOR.dom.elementPath.prototype = {compare: function(d) {
                var e = this.elements, d = d && d.elements;
                if (!d || e.length != d.length)
                    return false;
                for (var c = 0; c < e.length; c++)
                    if (!e[c].equals(d[c]))
                        return false;
                return true
            }, contains: function(d, e, c) {
                var a;
                typeof d == "string" && (a = function(a) {
                    return a.getName() == d
                });
                d instanceof CKEDITOR.dom.element ? a = function(a) {
                    return a.equals(d)
                } : CKEDITOR.tools.isArray(d) ? a = function(a) {
                    return CKEDITOR.tools.indexOf(d,
                            a.getName()) > -1
                } : typeof d == "function" ? a = d : typeof d == "object" && (a = function(a) {
                    return a.getName()in d
                });
                var b = this.elements, f = b.length;
                e && f--;
                if (c) {
                    b = Array.prototype.slice.call(b, 0);
                    b.reverse()
                }
                for (e = 0; e < f; e++)
                    if (a(b[e]))
                        return b[e];
                return null
            }, isContextFor: function(d) {
                var e;
                if (d in CKEDITOR.dtd.$block) {
                    e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit;
                    return!!e.getDtd()[d]
                }
                return true
            }, direction: function() {
                return(this.block || this.blockLimit || this.root).getDirection(1)
            }},
        CKEDITOR.dom.text = function(d, e) {
            typeof d == "string" && (d = (e ? e.$ : document).createTextNode(d));
            this.$ = d
        }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {type: CKEDITOR.NODE_TEXT, getLength: function() {
                return this.$.nodeValue.length
            }, getText: function() {
                return this.$.nodeValue
            }, setText: function(d) {
                this.$.nodeValue = d
            }, split: function(d) {
                var e = this.$.parentNode, c = e.childNodes.length, a = this.getLength(), b = this.getDocument(), f = new CKEDITOR.dom.text(this.$.splitText(d),
                        b);
                if (e.childNodes.length == c)
                    if (d >= a) {
                        f = b.createText("");
                        f.insertAfter(this)
                    } else {
                        d = b.createText("");
                        d.insertAfter(f);
                        d.remove()
                    }
                return f
            }, substring: function(d, e) {
                return typeof e != "number" ? this.$.nodeValue.substr(d) : this.$.nodeValue.substring(d, e)
            }}), function() {
            function d(c, a, b) {
                var d = c.serializable, e = a[b ? "endContainer" : "startContainer"], k = b ? "endOffset" : "startOffset", g = d ? a.document.getById(c.startNode) : c.startNode, c = d ? a.document.getById(c.endNode) : c.endNode;
                if (e.equals(g.getPrevious())) {
                    a.startOffset =
                            a.startOffset - e.getLength() - c.getPrevious().getLength();
                    e = c.getNext()
                } else if (e.equals(c.getPrevious())) {
                    a.startOffset = a.startOffset - e.getLength();
                    e = c.getNext()
                }
                e.equals(g.getParent()) && a[k]++;
                e.equals(c.getParent()) && a[k]++;
                a[b ? "endContainer" : "startContainer"] = e;
                return a
            }
            CKEDITOR.dom.rangeList = function(c) {
                if (c instanceof CKEDITOR.dom.rangeList)
                    return c;
                c ? c instanceof CKEDITOR.dom.range && (c = [c]) : c = [];
                return CKEDITOR.tools.extend(c, e)
            };
            var e = {createIterator: function() {
                    var c = this, a = CKEDITOR.dom.walker.bookmark(),
                            b = [], d;
                    return{getNextRange: function(e) {
                            d = d == void 0 ? 0 : d + 1;
                            var k = c[d];
                            if (k && c.length > 1) {
                                if (!d)
                                    for (var g = c.length - 1; g >= 0; g--)
                                        b.unshift(c[g].createBookmark(true));
                                if (e)
                                    for (var i = 0; c[d + i + 1]; ) {
                                        for (var j = k.document, e = 0, g = j.getById(b[i].endNode), j = j.getById(b[i + 1].startNode); ; ) {
                                            g = g.getNextSourceNode(false);
                                            if (j.equals(g))
                                                e = 1;
                                            else if (a(g) || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary())
                                                continue;
                                            break
                                        }
                                        if (!e)
                                            break;
                                        i++
                                    }
                                for (k.moveToBookmark(b.shift()); i--; ) {
                                    g = c[++d];
                                    g.moveToBookmark(b.shift());
                                    k.setEnd(g.endContainer,
                                            g.endOffset)
                                }
                            }
                            return k
                        }}
                }, createBookmarks: function(c) {
                    for (var a = [], b, f = 0; f < this.length; f++) {
                        a.push(b = this[f].createBookmark(c, true));
                        for (var e = f + 1; e < this.length; e++) {
                            this[e] = d(b, this[e]);
                            this[e] = d(b, this[e], true)
                        }
                    }
                    return a
                }, createBookmarks2: function(c) {
                    for (var a = [], b = 0; b < this.length; b++)
                        a.push(this[b].createBookmark2(c));
                    return a
                }, moveToBookmarks: function(c) {
                    for (var a = 0; a < this.length; a++)
                        this[a].moveToBookmark(c[a])
                }}
        }(), function() {
            function d() {
                return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] ||
                        "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
            }
            function e(a) {
                var b = CKEDITOR.skin["ua_" + a], c = CKEDITOR.env;
                if (b)
                    for (var b = b.split(",").sort(function(a, b) {
                        return a > b ? -1 : 1
                    }), f = 0, g; f < b.length; f++) {
                        g = b[f];
                        if (c.ie && (g.replace(/^ie/, "") == c.version || c.quirks && g == "iequirks"))
                            g = "ie";
                        if (c[g]) {
                            a = a + ("_" + b[f]);
                            break
                        }
                    }
                return CKEDITOR.getUrl(d() + a + ".css")
            }
            function c(a, b) {
                if (!f[a]) {
                    CKEDITOR.document.appendStyleSheet(e(a));
                    f[a] = 1
                }
                b && b()
            }
            function a(a) {
                var b = a.getById(h);
                if (!b) {
                    b = a.getHead().append("style");
                    b.setAttribute("id",
                            h);
                    b.setAttribute("type", "text/css")
                }
                return b
            }
            function b(a, b, c) {
                var d, f, g;
                if (CKEDITOR.env.webkit) {
                    b = b.split("}").slice(0, -1);
                    for (f = 0; f < b.length; f++)
                        b[f] = b[f].split("{")
                }
                for (var e = 0; e < a.length; e++)
                    if (CKEDITOR.env.webkit)
                        for (f = 0; f < b.length; f++) {
                            g = b[f][1];
                            for (d = 0; d < c.length; d++)
                                g = g.replace(c[d][0], c[d][1]);
                            a[e].$.sheet.addRule(b[f][0], g)
                        }
                    else {
                        g = b;
                        for (d = 0; d < c.length; d++)
                            g = g.replace(c[d][0], c[d][1]);
                        CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a[e].$.styleSheet.cssText = a[e].$.styleSheet.cssText + g : a[e].$.innerHTML =
                                a[e].$.innerHTML + g
                    }
            }
            var f = {};
            CKEDITOR.skin = {path: d, loadPart: function(a, b) {
                    CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d() + "skin.js"), function() {
                        c(a, b)
                    }) : c(a, b)
                }, getPath: function(a) {
                    return CKEDITOR.getUrl(e(a))
                }, icons: {}, addIcon: function(a, b, c, d) {
                    a = a.toLowerCase();
                    this.icons[a] || (this.icons[a] = {path: b, offset: c || 0, bgsize: d || "16px"})
                }, getIconStyle: function(a, b, c, d, f) {
                    var g;
                    if (a) {
                        a = a.toLowerCase();
                        b && (g = this.icons[a + "-rtl"]);
                        g || (g = this.icons[a])
                    }
                    a = c ||
                            g && g.path || "";
                    d = d || g && g.offset;
                    f = f || g && g.bgsize || "16px";
                    return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + f + ";"
                }};
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {getUiColor: function() {
                    return this.uiColor
                }, setUiColor: function(c) {
                    var d = a(CKEDITOR.document);
                    return(this.setUiColor = function(a) {
                        var c = CKEDITOR.skin.chameleon, f = [[g, a]];
                        this.uiColor = a;
                        b([d], c(this, "editor"), f);
                        b(k, c(this, "panel"), f)
                    }).call(this, c)
                }});
            var h = "cke_ui_color", k = [], g = /\$color/g;
            CKEDITOR.on("instanceLoaded", function(c) {
                if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                    var d = c.editor, c = function(c) {
                        c = (c.data[0] || c.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                        if (!c.getById("cke_ui_color")) {
                            c = a(c);
                            k.push(c);
                            var f = d.getUiColor();
                            f && b([c], CKEDITOR.skin.chameleon(d, "panel"), [[g, f]])
                        }
                    };
                    d.on("panelShow", c);
                    d.on("menuShow", c);
                    d.config.uiColor && d.setUiColor(d.config.uiColor)
                }
            })
        }(), function() {
            if (CKEDITOR.env.webkit)
                CKEDITOR.env.hc = false;
            else {
                var d = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>',
                        CKEDITOR.document);
                d.appendTo(CKEDITOR.document.getHead());
                try {
                    var e = d.getComputedStyle("border-top-color"), c = d.getComputedStyle("border-right-color");
                    CKEDITOR.env.hc = !!(e && e == c)
                } catch (a) {
                    CKEDITOR.env.hc = false
                }
                d.remove()
            }
            if (CKEDITOR.env.hc)
                CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
            CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
            CKEDITOR.status = "loaded";
            CKEDITOR.fireOnce("loaded");
            if (d = CKEDITOR._.pending) {
                delete CKEDITOR._.pending;
                for (e = 0; e < d.length; e++) {
                    CKEDITOR.editor.prototype.constructor.apply(d[e][0],
                            d[e][1]);
                    CKEDITOR.add(d[e][0])
                }
            }
        }(), CKEDITOR.skin.name = "alive", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera", CKEDITOR.skin.chameleon = function() {
            var d = function() {
                return function(a, b) {
                    for (var c = a.match(/[^#]./g), d = 0; d < 3; d++) {
                        var e = c, g = d, i;
                        i = parseInt(c[d], 16);
                        i = ("0" + (b < 0 ? 0 | i * (1 + b) : 0 | i + (255 - i) * b).toString(16)).slice(-2);
                        e[g] = i
                    }
                    return"#" + c.join("")
                }
            }(), e = function() {
                var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
                return function(b, c) {
                    return a.output({from: b, to: c})
                }
            }(), c = {editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
            return function(a, b) {
                var f = a.uiColor, f = {id: "." + a.id, defaultBorder: d(f, -0.1), defaultGradient: e(d(f, 0.9), f), lightGradient: e(d(f, 1), d(f, 0.7)), mediumGradient: e(d(f, 0.8), d(f, 0.5)), ckeButtonOn: e(d(f, 0.6), d(f, 0.7)), ckeResizer: d(f, -0.4), ckeToolbarSeparator: d(f, 0.5), ckeColorauto: d(f, 0.8), dialogBody: d(f, 0.7), dialogTabSelected: e("#FFFFFF", "#FFFFFF"), dialogTabSelectedBorder: "#FFF", elementsPathColor: d(f, -0.6), elementsPathBg: f, menubuttonIcon: d(f, 0.5), menubuttonIconHover: d(f, 0.3)};
                return c[b].output(f).replace(/\[/g,
                        "{").replace(/\]/g, "}")
            }
        }(), CKEDITOR.plugins.add("basicstyles", {init: function(d) {
                var e = 0, c = function(b, c, f, i) {
                    if (i) {
                        var i = new CKEDITOR.style(i), j = a[f];
                        j.unshift(i);
                        d.attachStyleStateChange(i, function(a) {
                            !d.readOnly && d.getCommand(f).setState(a)
                        });
                        d.addCommand(f, new CKEDITOR.styleCommand(i, {contentForms: j}));
                        d.ui.addButton && d.ui.addButton(b, {label: c, command: f, toolbar: "basicstyles," + (e = e + 10)})
                    }
                }, a = {bold: ["strong", "b", ["span", function(a) {
                                a = a.styles["font-weight"];
                                return a == "bold" || +a >= 700
                            }]], italic: ["em",
                        "i", ["span", function(a) {
                                return a.styles["font-style"] == "italic"
                            }]], underline: ["u", ["span", function(a) {
                                return a.styles["text-decoration"] == "underline"
                            }]], strike: ["s", "strike", ["span", function(a) {
                                return a.styles["text-decoration"] == "line-through"
                            }]], subscript: ["sub"], superscript: ["sup"]}, b = d.config, f = d.lang.basicstyles;
                c("Bold", f.bold, "bold", b.coreStyles_bold);
                c("Italic", f.italic, "italic", b.coreStyles_italic);
                c("Underline", f.underline, "underline", b.coreStyles_underline);
                c("Strike", f.strike, "strike",
                        b.coreStyles_strike);
                c("Subscript", f.subscript, "subscript", b.coreStyles_subscript);
                c("Superscript", f.superscript, "superscript", b.coreStyles_superscript);
                d.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
            }}), CKEDITOR.config.coreStyles_bold = {element: "strong", overrides: "b"}, CKEDITOR.config.coreStyles_italic = {element: "em", overrides: "i"}, CKEDITOR.config.coreStyles_underline = {element: "u"}, CKEDITOR.config.coreStyles_strike = {element: "s", overrides: "strike"},
        CKEDITOR.config.coreStyles_subscript = {element: "sub"}, CKEDITOR.config.coreStyles_superscript = {element: "sup"}, CKEDITOR.plugins.add("dialogui", {onLoad: function() {
                var d = function(a) {
                    this._ || (this._ = {});
                    this._["default"] = this._.initValue = a["default"] || "";
                    this._.required = a.required || false;
                    for (var b = [this._], c = 1; c < arguments.length; c++)
                        b.push(arguments[c]);
                    b.push(true);
                    CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
                    return this._
                }, e = {build: function(a, b, c) {
                        return new CKEDITOR.ui.dialog.textInput(a, b, c)
                    }}, c = {build: function(a,
                            b, c) {
                        return new CKEDITOR.ui.dialog[b.type](a, b, c)
                    }}, a = {isChanged: function() {
                        return this.getValue() != this.getInitValue()
                    }, reset: function(a) {
                        this.setValue(this.getInitValue(), a)
                    }, setInitValue: function() {
                        this._.initValue = this.getValue()
                    }, resetInitValue: function() {
                        this._.initValue = this._["default"]
                    }, getInitValue: function() {
                        return this._.initValue
                    }}, b = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {onChange: function(a, b) {
                        if (!this._.domOnChangeRegistered) {
                            a.on("load", function() {
                                this.getInputElement().on("change",
                                        function() {
                                            a.parts.dialog.isVisible() && this.fire("change", {value: this.getValue()})
                                        }, this)
                            }, this);
                            this._.domOnChangeRegistered = true
                        }
                        this.on("change", b)
                    }}, true), f = /^on([A-Z]\w+)/, h = function(a) {
                    for (var b in a)
                        (f.test(b) || b == "title" || b == "type") && delete a[b];
                    return a
                };
                CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {labeledElement: function(a, b, c, f) {
                        if (!(arguments.length < 4)) {
                            var e = d.call(this, b);
                            e.labelId = CKEDITOR.tools.getNextId() + "_label";
                            this._.children = [];
                            CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "div",
                                    null, {role: "presentation"}, function() {
                                var c = [], d = b.required ? " cke_required" : "";
                                if (b.labelLayout != "horizontal")
                                    c.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + e.labelId + '"', e.inputId ? ' for="' + e.inputId + '"' : "", (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", b.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', b.controlStyle ? ' style="' + b.controlStyle + '"' : "", ' role="radiogroup" aria-labelledby="' + e.labelId + '">', f.call(this, a, b), "</div>");
                                else {
                                    d = {type: "hbox", widths: b.widths,
                                        padding: 0, children: [{type: "html", html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + e.labelId + '" for="' + e.inputId + '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(b.label) + "</span>"}, {type: "html", html: '<span class="cke_dialog_ui_labeled_content"' + (b.controlStyle ? ' style="' + b.controlStyle + '"' : "") + ">" + f.call(this, a, b) + "</span>"}]};
                                    CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, d, c)
                                }
                                return c.join("")
                            })
                        }
                    }, textInput: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            d.call(this,
                                    b);
                            var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", e = {"class": "cke_dialog_ui_input_" + b.type, id: f, type: b.type};
                            if (b.validate)
                                this.validate = b.validate;
                            if (b.maxLength)
                                e.maxlength = b.maxLength;
                            if (b.size)
                                e.size = b.size;
                            if (b.inputStyle)
                                e.style = b.inputStyle;
                            var h = this, q = false;
                            a.on("load", function() {
                                h.getInputElement().on("keydown", function(a) {
                                    a.data.getKeystroke() == 13 && (q = true)
                                });
                                h.getInputElement().on("keyup", function(b) {
                                    if (b.data.getKeystroke() == 13 && q) {
                                        a.getButton("ok") && setTimeout(function() {
                                            a.getButton("ok").click()
                                        },
                                                0);
                                        q = false
                                    }
                                }, null, null, 1E3)
                            });
                            CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
                                var a = ['<div class="cke_dialog_ui_input_', b.type, '" role="presentation"'];
                                b.width && a.push('style="width:' + b.width + '" ');
                                a.push("><input ");
                                e["aria-labelledby"] = this._.labelId;
                                this._.required && (e["aria-required"] = this._.required);
                                for (var c in e)
                                    a.push(c + '="' + e[c] + '" ');
                                a.push(" /></div>");
                                return a.join("")
                            })
                        }
                    }, textarea: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            d.call(this, b);
                            var f = this, e = this._.inputId = CKEDITOR.tools.getNextId() +
                                    "_textarea", h = {};
                            if (b.validate)
                                this.validate = b.validate;
                            h.rows = b.rows || 5;
                            h.cols = b.cols || 20;
                            h["class"] = "cke_dialog_ui_input_textarea " + (b["class"] || "");
                            if (typeof b.inputStyle != "undefined")
                                h.style = b.inputStyle;
                            if (b.dir)
                                h.dir = b.dir;
                            CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
                                h["aria-labelledby"] = this._.labelId;
                                this._.required && (h["aria-required"] = this._.required);
                                var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', e, '" '], b;
                                for (b in h)
                                    a.push(b + '="' +
                                            CKEDITOR.tools.htmlEncode(h[b]) + '" ');
                                a.push(">", CKEDITOR.tools.htmlEncode(f._["default"]), "</textarea></div>");
                                return a.join("")
                            })
                        }
                    }, checkbox: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            var f = d.call(this, b, {"default": !!b["default"]});
                            if (b.validate)
                                this.validate = b.validate;
                            CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "span", null, null, function() {
                                var c = CKEDITOR.tools.extend({}, b, {id: b.id ? b.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"}, true), d = [], e = CKEDITOR.tools.getNextId() + "_label", i = {"class": "cke_dialog_ui_checkbox_input",
                                    type: "checkbox", "aria-labelledby": e};
                                h(c);
                                if (b["default"])
                                    i.checked = "checked";
                                if (typeof c.inputStyle != "undefined")
                                    c.style = c.inputStyle;
                                f.checkbox = new CKEDITOR.ui.dialog.uiElement(a, c, d, "input", null, i);
                                d.push(' <label id="', e, '" for="', i.id, '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(b.label), "</label>");
                                return d.join("")
                            })
                        }
                    }, radio: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            d.call(this, b);
                            if (!this._["default"])
                                this._["default"] = this._.initValue = b.items[0][1];
                            if (b.validate)
                                this.validate =
                                        b.valdiate;
                            var f = [], e = this;
                            CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
                                for (var c = [], d = [], i = (b.id ? b.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < b.items.length; l++) {
                                    var r = b.items[l], p = r[2] !== void 0 ? r[2] : r[0], s = r[1] !== void 0 ? r[1] : r[0], w = CKEDITOR.tools.getNextId() + "_radio_input", t = w + "_label", w = CKEDITOR.tools.extend({}, b, {id: w, title: null, type: null}, true), p = CKEDITOR.tools.extend({}, w, {title: p}, true), v = {type: "radio", "class": "cke_dialog_ui_radio_input", name: i, value: s, "aria-labelledby": t},
                                    z = [];
                                    if (e._["default"] == s)
                                        v.checked = "checked";
                                    h(w);
                                    h(p);
                                    if (typeof w.inputStyle != "undefined")
                                        w.style = w.inputStyle;
                                    w.keyboardFocusable = true;
                                    f.push(new CKEDITOR.ui.dialog.uiElement(a, w, z, "input", null, v));
                                    z.push(" ");
                                    new CKEDITOR.ui.dialog.uiElement(a, p, z, "label", null, {id: t, "for": v.id}, r[0]);
                                    c.push(z.join(""))
                                }
                                new CKEDITOR.ui.dialog.hbox(a, f, c, d);
                                return d.join("")
                            });
                            this._.children = f
                        }
                    }, button: function(a, b, c) {
                        if (arguments.length) {
                            typeof b == "function" && (b = b(a.getParentEditor()));
                            d.call(this, b, {disabled: b.disabled ||
                                false});
                            CKEDITOR.event.implementOn(this);
                            var f = this;
                            a.on("load", function() {
                                var a = this.getElement();
                                (function() {
                                    a.on("click", function(a) {
                                        f.click();
                                        a.data.preventDefault()
                                    });
                                    a.on("keydown", function(a) {
                                        if (a.data.getKeystroke()in{32: 1}) {
                                            f.click();
                                            a.data.preventDefault()
                                        }
                                    })
                                })();
                                a.unselectable()
                            }, this);
                            var e = CKEDITOR.tools.extend({}, b);
                            delete e.style;
                            var h = CKEDITOR.tools.getNextId() + "_label";
                            CKEDITOR.ui.dialog.uiElement.call(this, a, e, c, "a", null, {style: b.style, href: "javascript:void(0)", title: b.label, hidefocus: "true",
                                "class": b["class"], role: "button", "aria-labelledby": h}, '<span id="' + h + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(b.label) + "</span>")
                        }
                    }, select: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            var f = d.call(this, b);
                            if (b.validate)
                                this.validate = b.validate;
                            f.inputId = CKEDITOR.tools.getNextId() + "_select";
                            CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
                                var c = CKEDITOR.tools.extend({}, b, {id: b.id ? b.id + "_select" : CKEDITOR.tools.getNextId() + "_select"}, true), d = [], e = [], i = {id: f.inputId, "class": "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId};
                                d.push('<div class="cke_dialog_ui_input_', b.type, '" role="presentation"');
                                b.width && d.push('style="width:' + b.width + '" ');
                                d.push(">");
                                if (b.size != void 0)
                                    i.size = b.size;
                                if (b.multiple != void 0)
                                    i.multiple = b.multiple;
                                h(c);
                                for (var l = 0, r; l < b.items.length && (r = b.items[l]); l++)
                                    e.push('<option value="', CKEDITOR.tools.htmlEncode(r[1] !== void 0 ? r[1] : r[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(r[0]));
                                if (typeof c.inputStyle != "undefined")
                                    c.style = c.inputStyle;
                                f.select =
                                        new CKEDITOR.ui.dialog.uiElement(a, c, d, "select", null, i, e.join(""));
                                d.push("</div>");
                                return d.join("")
                            })
                        }
                    }, file: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            b["default"] === void 0 && (b["default"] = "");
                            var f = CKEDITOR.tools.extend(d.call(this, b), {definition: b, buttons: []});
                            if (b.validate)
                                this.validate = b.validate;
                            a.on("load", function() {
                                CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file")
                            });
                            CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
                                f.frameId = CKEDITOR.tools.getNextId() +
                                        "_fileInput";
                                var a = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', f.frameId, '" title="', b.label, '" src="javascript:void('];
                                a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                                a.push(')"></iframe>');
                                return a.join("")
                            })
                        }
                    }, fileButton: function(a, b, c) {
                        if (!(arguments.length < 3)) {
                            d.call(this, b);
                            var f = this;
                            if (b.validate)
                                this.validate = b.validate;
                            var e = CKEDITOR.tools.extend({},
                                    b), h = e.onClick;
                            e.className = (e.className ? e.className + " " : "") + "cke_dialog_ui_button";
                            e.onClick = function(c) {
                                var d = b["for"];
                                if (!h || h.call(this, c) !== false) {
                                    a.getContentElement(d[0], d[1]).submit();
                                    this.disable()
                                }
                            };
                            a.on("load", function() {
                                a.getContentElement(b["for"][0], b["for"][1])._.buttons.push(f)
                            });
                            CKEDITOR.ui.dialog.button.call(this, a, e, c)
                        }
                    }, html: function() {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/;
                        return function(d, f, e) {
                            if (!(arguments.length < 3)) {
                                var h = [],
                                        o = f.html;
                                o.charAt(0) != "<" && (o = "<span>" + o + "</span>");
                                var l = f.focus;
                                if (l) {
                                    var r = this.focus;
                                    this.focus = function() {
                                        (typeof l == "function" ? l : r).call(this);
                                        this.fire("focus")
                                    };
                                    if (f.isFocusable)
                                        this.isFocusable = this.isFocusable;
                                    this.keyboardFocusable = true
                                }
                                CKEDITOR.ui.dialog.uiElement.call(this, d, f, h, "span", null, null, "");
                                h = h.join("").match(a);
                                o = o.match(b) || ["", "", ""];
                                if (c.test(o[1])) {
                                    o[1] = o[1].slice(0, -1);
                                    o[2] = "/" + o[2]
                                }
                                e.push([o[1], " ", h[1] || "", o[2]].join(""))
                            }
                        }
                    }(), fieldset: function(a, b, c, d, f) {
                        var e = f.label;
                        this._ = {children: b};
                        CKEDITOR.ui.dialog.uiElement.call(this, a, f, d, "fieldset", null, null, function() {
                            var a = [];
                            e && a.push("<legend" + (f.labelStyle ? ' style="' + f.labelStyle + '"' : "") + ">" + e + "</legend>");
                            for (var b = 0; b < c.length; b++)
                                a.push(c[b]);
                            return a.join("")
                        })
                    }}, true);
                CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
                CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {setLabel: function(a) {
                        var b = CKEDITOR.document.getById(this._.labelId);
                        b.getChildCount() <
                                1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
                        return this
                    }, getLabel: function() {
                        var a = CKEDITOR.document.getById(this._.labelId);
                        return!a || a.getChildCount() < 1 ? "" : a.getChild(0).getText()
                    }, eventProcessors: b}, true);
                CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {click: function() {
                        return!this._.disabled ? this.fire("click", {dialog: this._.dialog}) : false
                    }, enable: function() {
                        this._.disabled = false;
                        var a = this.getElement();
                        a && a.removeClass("cke_disabled")
                    },
                    disable: function() {
                        this._.disabled = true;
                        this.getElement().addClass("cke_disabled")
                    }, isVisible: function() {
                        return this.getElement().getFirst().isVisible()
                    }, isEnabled: function() {
                        return!this._.disabled
                    }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {onClick: function(a, b) {
                            this.on("click", function() {
                                b.apply(this, arguments)
                            })
                        }}, true), accessKeyUp: function() {
                        this.click()
                    }, accessKeyDown: function() {
                        this.focus()
                    }, keyboardFocusable: true}, true);
                CKEDITOR.ui.dialog.textInput.prototype =
                        CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {getInputElement: function() {
                                return CKEDITOR.document.getById(this._.inputId)
                            }, focus: function() {
                                var a = this.selectParentTab();
                                setTimeout(function() {
                                    var b = a.getInputElement();
                                    b && b.$.focus()
                                }, 0)
                            }, select: function() {
                                var a = this.selectParentTab();
                                setTimeout(function() {
                                    var b = a.getInputElement();
                                    if (b) {
                                        b.$.focus();
                                        b.$.select()
                                    }
                                }, 0)
                            }, accessKeyUp: function() {
                                this.select()
                            }, setValue: function(a) {
                                !a && (a = "");
                                return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,
                                        arguments)
                            }, keyboardFocusable: true}, a, true);
                CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
                CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {getInputElement: function() {
                        return this._.select.getElement()
                    }, add: function(a, b, c) {
                        var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), f = this.getInputElement().$;
                        d.$.text = a;
                        d.$.value = b === void 0 || b === null ? a : b;
                        c === void 0 || c === null ? CKEDITOR.env.ie ? f.add(d.$) : f.add(d.$,
                                null) : f.add(d.$, c);
                        return this
                    }, remove: function(a) {
                        this.getInputElement().$.remove(a);
                        return this
                    }, clear: function() {
                        for (var a = this.getInputElement().$; a.length > 0; )
                            a.remove(0);
                        return this
                    }, keyboardFocusable: true}, a, true);
                CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {getInputElement: function() {
                        return this._.checkbox.getElement()
                    }, setValue: function(a, b) {
                        this.getInputElement().$.checked = a;
                        !b && this.fire("change", {value: a})
                    }, getValue: function() {
                        return this.getInputElement().$.checked
                    },
                    accessKeyUp: function() {
                        this.setValue(!this.getValue())
                    }, eventProcessors: {onChange: function(a, c) {
                            if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8)
                                return b.onChange.apply(this, arguments);
                            a.on("load", function() {
                                var a = this._.checkbox.getElement();
                                a.on("propertychange", function(b) {
                                    b = b.data.$;
                                    b.propertyName == "checked" && this.fire("change", {value: a.$.checked})
                                }, this)
                            }, this);
                            this.on("change", c);
                            return null
                        }}, keyboardFocusable: true}, a, true);
                CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                        {setValue: function(a, b) {
                                for (var c = this._.children, d, f = 0; f < c.length && (d = c[f]); f++)
                                    d.getElement().$.checked = d.getValue() == a;
                                !b && this.fire("change", {value: a})
                            }, getValue: function() {
                                for (var a = this._.children, b = 0; b < a.length; b++)
                                    if (a[b].getElement().$.checked)
                                        return a[b].getValue();
                                return null
                            }, accessKeyUp: function() {
                                var a = this._.children, b;
                                for (b = 0; b < a.length; b++)
                                    if (a[b].getElement().$.checked) {
                                        a[b].getElement().focus();
                                        return
                                    }
                                a[0].getElement().focus()
                            }, eventProcessors: {onChange: function(a, c) {
                                    if (CKEDITOR.env.ie) {
                                        a.on("load",
                                                function() {
                                                    for (var a = this._.children, b = this, c = 0; c < a.length; c++)
                                                        a[c].getElement().on("propertychange", function(a) {
                                                            a = a.data.$;
                                                            a.propertyName == "checked" && this.$.checked && b.fire("change", {value: this.getAttribute("value")})
                                                        })
                                                }, this);
                                        this.on("change", c)
                                    } else
                                        return b.onChange.apply(this, arguments);
                                    return null
                                }}}, a, true);
                CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, a, {getInputElement: function() {
                        var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                        return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement()
                    }, submit: function() {
                        this.getInputElement().getParent().$.submit();
                        return this
                    }, getAction: function() {
                        return this.getInputElement().getParent().$.action
                    }, registerEvents: function(a) {
                        var b = /^on([A-Z]\w+)/, c, d = function(a, b, c, d) {
                            a.on("formLoaded", function() {
                                a.getInputElement().on(c, d, a)
                            })
                        }, f;
                        for (f in a)
                            if (c = f.match(b))
                                this.eventProcessors[f] ? this.eventProcessors[f].call(this, this._.dialog, a[f]) : d(this, this._.dialog,
                                        c[1].toLowerCase(), a[f]);
                        return this
                    }, reset: function() {
                        function a() {
                            c.$.open();
                            var k = "";
                            d.size && (k = d.size - (CKEDITOR.env.ie ? 7 : 0));
                            var p = b.frameId + "_input";
                            c.$.write(['<html dir="' + o + '" lang="' + l + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + o + '" lang="' + l + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', p, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label),
                                '</label><input style="width:100%" id="', p, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(k > 0 ? k : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}", "<\/script>"].join(""));
                            c.$.close();
                            for (k = 0; k < f.length; k++)
                                f[k].enable()
                        }
                        var b =
                                this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, f = b.buttons, e = this.formLoadedNumber, h = this.formUnloadNumber, o = b.dialog._.editor.lang.dir, l = b.dialog._.editor.langCode;
                        if (!e) {
                            e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                                this.fire("formLoaded")
                            }, this);
                            h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                                this.getInputElement().clearCustomData()
                            }, this);
                            this.getDialog()._.editor.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(e);
                                CKEDITOR.tools.removeFunction(h)
                            })
                        }
                        CKEDITOR.env.gecko ?
                                setTimeout(a, 500) : a()
                    }, getValue: function() {
                        return this.getInputElement().$.value || ""
                    }, setInitValue: function() {
                        this._.initValue = ""
                    }, eventProcessors: {onChange: function(a, b) {
                            if (!this._.domOnChangeRegistered) {
                                this.on("formLoaded", function() {
                                    this.getInputElement().on("change", function() {
                                        this.fire("change", {value: this.getValue()})
                                    }, this)
                                }, this);
                                this._.domOnChangeRegistered = true
                            }
                            this.on("change", b)
                        }}, keyboardFocusable: true}, true);
                CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
                CKEDITOR.ui.dialog.fieldset.prototype =
                        CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
                CKEDITOR.dialog.addUIElement("text", e);
                CKEDITOR.dialog.addUIElement("password", e);
                CKEDITOR.dialog.addUIElement("textarea", c);
                CKEDITOR.dialog.addUIElement("checkbox", c);
                CKEDITOR.dialog.addUIElement("radio", c);
                CKEDITOR.dialog.addUIElement("button", c);
                CKEDITOR.dialog.addUIElement("select", c);
                CKEDITOR.dialog.addUIElement("file", c);
                CKEDITOR.dialog.addUIElement("fileButton", c);
                CKEDITOR.dialog.addUIElement("html", c);
                CKEDITOR.dialog.addUIElement("fieldset",
                        {build: function(a, b, c) {
                                for (var d = b.children, f, e = [], h = [], o = 0; o < d.length && (f = d[o]); o++) {
                                    var l = [];
                                    e.push(l);
                                    h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, l))
                                }
                                return new CKEDITOR.ui.dialog[b.type](a, h, e, c, b)
                            }})
            }}), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, function() {
            function d() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
                    if (this._.tabs[this._.tabIdList[c %
                    a]][0].$.offsetHeight)
                        return this._.tabIdList[c % a];
                return null
            }
            function e() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
                    if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)
                        return this._.tabIdList[c % a];
                return null
            }
            function c(a, b) {
                for (var c = a.$.getElementsByTagName("input"), d = 0, f = c.length; d < f; d++) {
                    var e = new CKEDITOR.dom.element(c[d]);
                    if (e.getAttribute("type").toLowerCase() == "text")
                        if (b) {
                            e.setAttribute("value", e.getCustomData("fake_value") ||
                                    "");
                            e.removeCustomData("fake_value")
                        } else {
                            e.setCustomData("fake_value", e.getAttribute("value"));
                            e.setAttribute("value", "")
                        }
                }
            }
            function a(a, b) {
                var c = this.getInputElement();
                c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true));
                a || (this.select ? this.select() : this.focus());
                b && alert(b);
                this.fire("validated", {valid: a, msg: b})
            }
            function b() {
                var a = this.getInputElement();
                a && a.removeAttribute("aria-invalid")
            }
            function f(a) {
                var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",
                        l).output({id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""})), b = a.getChild([0, 0, 0, 0, 0]), c = b.getChild(0), d = b.getChild(1);
                if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                    var f = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                    CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' +
                            f + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
                }
                c.unselectable();
                d.unselectable();
                return{element: a, parts: {dialog: a.getChild(0), title: c, close: d, tabs: b.getChild(2), contents: b.getChild([3, 0, 0, 0]), footer: b.getChild([3, 0, 1, 0])}}
            }
            function h(a, b, c) {
                this.element = b;
                this.focusIndex = c;
                this.tabIndex = 0;
                this.isFocusable = function() {
                    return!b.getAttribute("disabled") && b.isVisible()
                };
                this.focus = function() {
                    a._.currentFocusIndex = this.focusIndex;
                    this.element.focus()
                };
                b.on("keydown", function(a) {
                    a.data.getKeystroke()in
                            {32: 1, 13: 1} && this.fire("click")
                });
                b.on("focus", function() {
                    this.fire("mouseover")
                });
                b.on("blur", function() {
                    this.fire("mouseout")
                })
            }
            function k(a) {
                function b() {
                    a.layout()
                }
                var c = CKEDITOR.document.getWindow();
                c.on("resize", b);
                a.on("hide", function() {
                    c.removeListener("resize", b)
                })
            }
            function g(a, b) {
                this._ = {dialog: a};
                CKEDITOR.tools.extend(this, b)
            }
            function i(a) {
                function b(c) {
                    var i = a.getSize(), k = CKEDITOR.document.getWindow().getViewPaneSize(), j = c.data.$.screenX, u = c.data.$.screenY, o = j - d.x, E = u - d.y;
                    d = {x: j, y: u};
                    f.x = f.x + o;
                    f.y = f.y + E;
                    a.move(f.x + h[3] < g ? -h[3] : f.x - h[1] > k.width - i.width - g ? k.width - i.width + (e.lang.dir == "rtl" ? 0 : h[1]) : f.x, f.y + h[0] < g ? -h[0] : f.y - h[2] > k.height - i.height - g ? k.height - i.height + h[2] : f.y, 1);
                    c.data.preventDefault()
                }
                function c() {
                    CKEDITOR.document.removeListener("mousemove", b);
                    CKEDITOR.document.removeListener("mouseup", c);
                    if (CKEDITOR.env.ie6Compat) {
                        var a = x.getChild(0).getFrameDocument();
                        a.removeListener("mousemove", b);
                        a.removeListener("mouseup", c)
                    }
                }
                var d = null, f = null;
                a.getElement().getFirst();
                var e =
                        a.getParentEditor(), g = e.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0];
                typeof g == "undefined" && (g = 20);
                a.parts.title.on("mousedown", function(e) {
                    d = {x: e.data.$.screenX, y: e.data.$.screenY};
                    CKEDITOR.document.on("mousemove", b);
                    CKEDITOR.document.on("mouseup", c);
                    f = a.getPosition();
                    if (CKEDITOR.env.ie6Compat) {
                        var g = x.getChild(0).getFrameDocument();
                        g.on("mousemove", b);
                        g.on("mouseup", c)
                    }
                    e.data.preventDefault()
                }, a)
            }
            function j(a) {
                var b, c;
                function d(f) {
                    var o = h.lang.dir == "rtl", m = u.width, l = u.height,
                            n = m + (f.data.$.screenX - b) * (o ? -1 : 1) * (a._.moved ? 1 : 2), D = l + (f.data.$.screenY - c) * (a._.moved ? 1 : 2), G = a._.element.getFirst(), G = o && G.getComputedStyle("right"), B = a.getPosition();
                    B.y + D > j.height && (D = j.height - B.y);
                    if ((o ? G : B.x) + n > j.width)
                        n = j.width - (o ? G : B.x);
                    if (g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH)
                        m = Math.max(e.minWidth || 0, n - i);
                    if (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH)
                        l = Math.max(e.minHeight || 0, D - k);
                    a.resize(m, l);
                    a._.moved || a.layout();
                    f.data.preventDefault()
                }
                function f() {
                    CKEDITOR.document.removeListener("mouseup",
                            f);
                    CKEDITOR.document.removeListener("mousemove", d);
                    if (o) {
                        o.remove();
                        o = null
                    }
                    if (CKEDITOR.env.ie6Compat) {
                        var a = x.getChild(0).getFrameDocument();
                        a.removeListener("mouseup", f);
                        a.removeListener("mousemove", d)
                    }
                }
                var e = a.definition, g = e.resizable;
                if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var h = a.getParentEditor(), i, k, j, u, o, m = CKEDITOR.tools.addFunction(function(e) {
                        u = a.getSize();
                        var g = a.parts.contents;
                        if (g.$.getElementsByTagName("iframe").length) {
                            o = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                            g.append(o)
                        }
                        k = u.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        i = u.width - a.parts.contents.getSize("width", 1);
                        b = e.screenX;
                        c = e.screenY;
                        j = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", d);
                        CKEDITOR.document.on("mouseup", f);
                        if (CKEDITOR.env.ie6Compat) {
                            g = x.getChild(0).getFrameDocument();
                            g.on("mousemove", d);
                            g.on("mouseup", f)
                        }
                        e.preventDefault && e.preventDefault()
                    });
                    a.on("load", function() {
                        var b = "";
                        g ==
                                CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                        b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + m + ', event )">' + (h.lang.dir == "ltr" ? "◢" : "◣") + "</div>");
                        a.parts.footer.append(b, 1)
                    });
                    h.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(m)
                    })
                }
            }
            function m(a) {
                a.data.preventDefault(1)
            }
            function n(a) {
                var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", f = c.dialog_backgroundCoverOpacity, e = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, f, e), g = z[c];
                if (g)
                    g.show();
                else {
                    e = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", e, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">'];
                    if (CKEDITOR.env.ie6Compat) {
                        d = "<html><body style=\\'background-color:" +
                                d + ";\\'></body></html>";
                        e.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                        e.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())");
                        e.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                    }
                    e.push("</div>");
                    g = CKEDITOR.dom.element.createFromHtml(e.join(""));
                    g.setOpacity(f !=
                            void 0 ? f : 0.5);
                    g.on("keydown", m);
                    g.on("keypress", m);
                    g.on("keyup", m);
                    g.appendTo(CKEDITOR.document.getBody());
                    z[c] = g
                }
                a.focusManager.add(g);
                x = g;
                var a = function() {
                    var a = b.getViewPaneSize();
                    g.setStyles({width: a.width + "px", height: a.height + "px"})
                }, h = function() {
                    var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
                    g.setStyles({left: a.x + "px", top: a.y + "px"});
                    if (c) {
                        do {
                            a = c.getPosition();
                            c.move(a.x, a.y)
                        } while (c = c._.parentDialog)
                    }
                };
                v = a;
                b.on("resize", a);
                a();
                (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && g.focus();
                if (CKEDITOR.env.ie6Compat) {
                    var i = function() {
                        h();
                        arguments.callee.prevScrollHandler.apply(this, arguments)
                    };
                    b.$.setTimeout(function() {
                        i.prevScrollHandler = window.onscroll || function() {
                        };
                        window.onscroll = i
                    }, 0);
                    h()
                }
            }
            function q(a) {
                if (x) {
                    a.focusManager.remove(x);
                    a = CKEDITOR.document.getWindow();
                    x.hide();
                    a.removeListener("resize", v);
                    CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
                        window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
                    }, 0);
                    v = null
                }
            }
            var o = CKEDITOR.tools.cssLength, l = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' +
                    CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
            CKEDITOR.dialog = function(c, g) {
                function h() {
                    var a = q._.focusList;
                    a.sort(function(a, b) {
                        return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                    });
                    for (var b = a.length, c = 0; c < b; c++)
                        a[c].focusIndex = c
                }
                function k(a) {
                    var b = q._.focusList, a = a || 0;
                    if (!(b.length < 1)) {
                        var c = q._.currentFocusIndex;
                        try {
                            b[c].getInputElement().$.blur()
                        } catch (d) {
                        }
                        for (var f = c = (c + a + b.length) % b.length; a && !b[f].isFocusable(); ) {
                            f = (f + a + b.length) % b.length;
                            if (f == c)
                                break
                        }
                        b[f].focus();
                        b[f].type == "text" && b[f].select()
                    }
                }
                function u(a) {
                    if (q ==
                            CKEDITOR.dialog._.currentTop) {
                        var b = a.data.getKeystroke(), f = c.lang.dir == "rtl";
                        s = p = 0;
                        if (b == 9 || b == CKEDITOR.SHIFT + 9) {
                            b = b == CKEDITOR.SHIFT + 9;
                            if (q._.tabBarMode) {
                                b = b ? d.call(q) : e.call(q);
                                q.selectPage(b);
                                q._.tabs[b][0].focus()
                            } else
                                k(b ? -1 : 1);
                            s = 1
                        } else if (b == CKEDITOR.ALT + 121 && !q._.tabBarMode && q.getPageCount() > 1) {
                            q._.tabBarMode = true;
                            q._.tabs[q._.currentTabId][0].focus();
                            s = 1
                        } else if ((b == 37 || b == 39) && q._.tabBarMode) {
                            b = b == (f ? 39 : 37) ? d.call(q) : e.call(q);
                            q.selectPage(b);
                            q._.tabs[b][0].focus();
                            s = 1
                        } else if ((b == 13 || b ==
                                32) && q._.tabBarMode) {
                            this.selectPage(this._.currentTabId);
                            this._.tabBarMode = false;
                            this._.currentFocusIndex = -1;
                            k(1);
                            s = 1
                        } else if (b == 13) {
                            b = a.data.getTarget();
                            if (!b.is("a", "button", "select", "textarea") && (!b.is("input") || b.$.type != "button")) {
                                (b = this.getButton("ok")) && CKEDITOR.tools.setTimeout(b.click, 0, b);
                                s = 1
                            }
                            p = 1
                        } else if (b == 27) {
                            (b = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(b.click, 0, b) : this.fire("cancel", {hide: true}).hide !== false && this.hide();
                            p = 1
                        } else
                            return;
                        o(a)
                    }
                }
                function o(a) {
                    s ? a.data.preventDefault(1) :
                            p && a.data.stopPropagation()
                }
                var m = CKEDITOR.dialog._.dialogDefinitions[g], l = CKEDITOR.tools.clone(r), n = c.config.dialog_buttonsOrder || "OS", D = c.lang.dir, B = {}, s, p;
                (n == "OS" && CKEDITOR.env.mac || n == "rtl" && D == "ltr" || n == "ltr" && D == "rtl") && l.buttons.reverse();
                m = CKEDITOR.tools.extend(m(c), l);
                m = CKEDITOR.tools.clone(m);
                m = new t(this, m);
                l = f(c);
                this._ = {editor: c, element: l.element, name: g, contentSize: {width: 0, height: 0}, size: {width: 0, height: 0}, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null,
                    currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: false, focusList: [], currentFocusIndex: 0, hasFocus: false};
                this.parts = l.parts;
                CKEDITOR.tools.setTimeout(function() {
                    c.fire("ariaWidget", this.parts.contents)
                }, 0, this);
                l = {position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden"};
                l[D == "rtl" ? "right" : "left"] = 0;
                this.parts.dialog.setStyles(l);
                CKEDITOR.event.call(this);
                this.definition = m = CKEDITOR.fire("dialogDefinition", {name: g, definition: m}, c).definition;
                if (!("removeDialogTabs"in c._) &&
                        c.config.removeDialogTabs) {
                    l = c.config.removeDialogTabs.split(";");
                    for (D = 0; D < l.length; D++) {
                        n = l[D].split(":");
                        if (n.length == 2) {
                            var I = n[0];
                            B[I] || (B[I] = []);
                            B[I].push(n[1])
                        }
                    }
                    c._.removeDialogTabs = B
                }
                if (c._.removeDialogTabs && (B = c._.removeDialogTabs[g]))
                    for (D = 0; D < B.length; D++)
                        m.removeContents(B[D]);
                if (m.onLoad)
                    this.on("load", m.onLoad);
                if (m.onShow)
                    this.on("show", m.onShow);
                if (m.onHide)
                    this.on("hide", m.onHide);
                if (m.onOk)
                    this.on("ok", function(a) {
                        c.fire("saveSnapshot");
                        setTimeout(function() {
                            c.fire("saveSnapshot")
                        },
                                0);
                        if (m.onOk.call(this, a) === false)
                            a.data.hide = false
                    });
                if (m.onCancel)
                    this.on("cancel", function(a) {
                        if (m.onCancel.call(this, a) === false)
                            a.data.hide = false
                    });
                var q = this, C = function(a) {
                    var b = q._.contents, c = false, d;
                    for (d in b)
                        for (var f in b[d])
                            if (c = a.call(this, b[d][f]))
                                return
                };
                this.on("ok", function(b) {
                    C(function(c) {
                        if (c.validate) {
                            var d = c.validate(this), f = typeof d == "string" || d === false;
                            if (f) {
                                b.data.hide = false;
                                b.stop()
                            }
                            a.call(c, !f, typeof d == "string" ? d : void 0);
                            return f
                        }
                    })
                }, this, null, 0);
                this.on("cancel", function(a) {
                    C(function(b) {
                        if (b.isChanged()) {
                            if (!c.config.dialog_noConfirmCancel &&
                                    !confirm(c.lang.common.confirmCancel))
                                a.data.hide = false;
                            return true
                        }
                    })
                }, this, null, 0);
                this.parts.close.on("click", function(a) {
                    this.fire("cancel", {hide: true}).hide !== false && this.hide();
                    a.data.preventDefault()
                }, this);
                this.changeFocus = k;
                var w = this._.element;
                c.focusManager.add(w, 1);
                this.on("show", function() {
                    w.on("keydown", u, this);
                    if (CKEDITOR.env.opera || CKEDITOR.env.gecko)
                        w.on("keypress", o, this)
                });
                this.on("hide", function() {
                    w.removeListener("keydown", u);
                    (CKEDITOR.env.opera || CKEDITOR.env.gecko) && w.removeListener("keypress",
                            o);
                    C(function(a) {
                        b.apply(a)
                    })
                });
                this.on("iframeAdded", function(a) {
                    (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", u, this, null, 0)
                });
                this.on("show", function() {
                    h();
                    if (c.config.dialog_startupFocusTab && q._.pageCount > 1) {
                        q._.tabBarMode = true;
                        q._.tabs[q._.currentTabId][0].focus()
                    } else if (!this._.hasFocus) {
                        this._.currentFocusIndex = -1;
                        if (m.onFocus) {
                            var a = m.onFocus.call(this);
                            a && a.focus()
                        } else
                            k(1)
                    }
                }, this, null, 4294967295);
                if (CKEDITOR.env.ie6Compat)
                    this.on("load", function() {
                        var a =
                                this.getElement(), b = a.getFirst();
                        b.remove();
                        b.appendTo(a)
                    }, this);
                i(this);
                j(this);
                (new CKEDITOR.dom.text(m.title, CKEDITOR.document)).appendTo(this.parts.title);
                for (D = 0; D < m.contents.length; D++)
                    (B = m.contents[D]) && this.addPage(B);
                this.parts.tabs.on("click", function(a) {
                    var b = a.data.getTarget();
                    if (b.hasClass("cke_dialog_tab")) {
                        b = b.$.id;
                        this.selectPage(b.substring(4, b.lastIndexOf("_")));
                        if (this._.tabBarMode) {
                            this._.tabBarMode = false;
                            this._.currentFocusIndex = -1;
                            k(1)
                        }
                        a.data.preventDefault()
                    }
                }, this);
                D = [];
                B =
                        CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: m.buttons}, D).getChild();
                this.parts.footer.setHtml(D.join(""));
                for (D = 0; D < B.length; D++)
                    this._.buttons[B[D].id] = B[D]
            };
            CKEDITOR.dialog.prototype = {destroy: function() {
                    this.hide();
                    this._.element.remove()
                }, resize: function() {
                    return function(a, b) {
                        if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                            CKEDITOR.dialog.fire("resize", {dialog: this, width: a, height: b},
                            this._.editor);
                            this.fire("resize", {width: a, height: b}, this._.editor);
                            this.parts.contents.setStyles({width: a + "px", height: b + "px"});
                            if (this._.editor.lang.dir == "rtl" && this._.position)
                                this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10);
                            this._.contentSize = {width: a, height: b}
                        }
                    }
                }(), getSize: function() {
                    var a = this._.element.getFirst();
                    return{width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0}
                }, move: function(a,
                        b, c) {
                    var d = this._.element.getFirst(), f = this._.editor.lang.dir == "rtl", e = d.getComputedStyle("position") == "fixed";
                    CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                    if (!e || !this._.position || !(this._.position.x == a && this._.position.y == b)) {
                        this._.position = {x: a, y: b};
                        if (!e) {
                            e = CKEDITOR.document.getWindow().getScrollPosition();
                            a = a + e.x;
                            b = b + e.y
                        }
                        if (f) {
                            e = this.getSize();
                            a = CKEDITOR.document.getWindow().getViewPaneSize().width - e.width - a
                        }
                        b = {top: (b > 0 ? b : 0) + "px"};
                        b[f ? "right" : "left"] = (a > 0 ? a : 0) + "px";
                        d.setStyles(b);
                        c && (this._.moved =
                                1)
                    }
                }, getPosition: function() {
                    return CKEDITOR.tools.extend({}, this._.position)
                }, show: function() {
                    var a = this._.element, b = this.definition;
                    !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                    if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) {
                        var c = this.parts.dialog;
                        c.setStyle("position", "absolute");
                        setTimeout(function() {
                            c.setStyle("position", "fixed")
                        }, 0)
                    }
                    this.resize(this._.contentSize && this._.contentSize.width || b.width ||
                            b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                    this.reset();
                    this.selectPage(this.definition.contents[0].id);
                    if (CKEDITOR.dialog._.currentZIndex === null)
                        CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                    this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10);
                    if (CKEDITOR.dialog._.currentTop === null) {
                        CKEDITOR.dialog._.currentTop = this;
                        this._.parentDialog = null;
                        n(this._.editor)
                    } else {
                        this._.parentDialog =
                                CKEDITOR.dialog._.currentTop;
                        this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2);
                        CKEDITOR.dialog._.currentTop = this
                    }
                    a.on("keydown", C);
                    a.on(CKEDITOR.env.opera ? "keypress" : "keyup", F);
                    this._.hasFocus = false;
                    for (var d in b.contents)
                        if (b.contents[d]) {
                            var a = b.contents[d], f = this._.tabs[a.id], e = a.requiredContent, g = 0;
                            if (f) {
                                for (var h in this._.contents[a.id]) {
                                    var i = this._.contents[a.id][h];
                                    if (!(i.type == "hbox" || i.type == "vbox" || !i.getInputElement()))
                                        if (i.requiredContent &&
                                                !this._.editor.activeFilter.check(i.requiredContent))
                                            i.disable();
                                        else {
                                            i.enable();
                                            g++
                                        }
                                }
                                !g || e && !this._.editor.activeFilter.check(e) ? f[0].addClass("cke_dialog_tab_disabled") : f[0].removeClass("cke_dialog_tab_disabled")
                            }
                        }
                    CKEDITOR.tools.setTimeout(function() {
                        this.layout();
                        k(this);
                        this.parts.dialog.setStyle("visibility", "");
                        this.fireOnce("load", {});
                        CKEDITOR.ui.fire("ready", this);
                        this.fire("show", {});
                        this._.editor.fire("dialogShow", this);
                        this._.parentDialog || this._.editor.focusManager.lock();
                        this.foreach(function(a) {
                            a.setInitValue &&
                                    a.setInitValue()
                        })
                    }, 100, this)
                }, layout: function() {
                    var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, f = (c.height - b.height) / 2;
                    CKEDITOR.env.ie6Compat || (b.height + (f > 0 ? f : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                    this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : f)
                }, foreach: function(a) {
                    for (var b in this._.contents)
                        for (var c in this._.contents[b])
                            a.call(this,
                                    this._.contents[b][c]);
                    return this
                }, reset: function() {
                    var a = function(a) {
                        a.reset && a.reset(1)
                    };
                    return function() {
                        this.foreach(a);
                        return this
                    }
                }(), setupContent: function() {
                    var a = arguments;
                    this.foreach(function(b) {
                        b.setup && b.setup.apply(b, a)
                    })
                }, commitContent: function() {
                    var a = arguments;
                    this.foreach(function(b) {
                        CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                        b.commit && b.commit.apply(b, a)
                    })
                }, hide: function() {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {});
                        this._.editor.fire("dialogHide",
                                this);
                        this.selectPage(this._.tabIdList[0]);
                        var a = this._.element;
                        a.setStyle("display", "none");
                        this.parts.dialog.setStyle("visibility", "hidden");
                        for (D(this); CKEDITOR.dialog._.currentTop != this; )
                            CKEDITOR.dialog._.currentTop.hide();
                        if (this._.parentDialog) {
                            var b = this._.parentDialog.getElement().getFirst();
                            b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                        } else
                            q(this._.editor);
                        if (CKEDITOR.dialog._.currentTop = this._.parentDialog)
                            CKEDITOR.dialog._.currentZIndex =
                                    CKEDITOR.dialog._.currentZIndex - 10;
                        else {
                            CKEDITOR.dialog._.currentZIndex = null;
                            a.removeListener("keydown", C);
                            a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", F);
                            var c = this._.editor;
                            c.focus();
                            setTimeout(function() {
                                c.focusManager.unlock()
                            }, 0)
                        }
                        delete this._.parentDialog;
                        this.foreach(function(a) {
                            a.resetInitValue && a.resetInitValue()
                        })
                    }
                }, addPage: function(a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' :
                                "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;"}, b), f = this._.contents[a.id] = {}, e = d.getChild(), g = 0; d = e.shift(); ) {
                            !d.notAllowed && (d.type != "hbox" && d.type != "vbox") && g++;
                            f[d.id] = d;
                            typeof d.getChild == "function" && e.push.apply(e, d.getChild())
                        }
                        if (!g)
                            a.hidden = true;
                        b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                        b.setAttribute("role", "tabpanel");
                        d = CKEDITOR.env;
                        f =
                                "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                        c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', f, '"', d.gecko && d.version >= 10900 && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join(""));
                        b.setAttribute("aria-labelledby", f);
                        this._.tabs[a.id] = [c, b];
                        this._.tabIdList.push(a.id);
                        !a.hidden && this._.pageCount++;
                        this._.lastTab = c;
                        this.updateStyle();
                        b.setAttribute("name",
                                a.id);
                        b.appendTo(this.parts.contents);
                        c.unselectable();
                        this.parts.tabs.append(c);
                        if (a.accessKey) {
                            u(this, this, "CTRL+" + a.accessKey, B, I);
                            this._.accessKeyMap["CTRL+" + a.accessKey] = a.id
                        }
                    }
                }, selectPage: function(a) {
                    if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && this.fire("selectPage", {page: a, currentPage: this._.currentTabId}) !== false) {
                        for (var b in this._.tabs) {
                            var d = this._.tabs[b][0], f = this._.tabs[b][1];
                            if (b != a) {
                                d.removeClass("cke_dialog_tab_selected");
                                f.hide()
                            }
                            f.setAttribute("aria-hidden",
                                    b != a)
                        }
                        var e = this._.tabs[a];
                        e[0].addClass("cke_dialog_tab_selected");
                        if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) {
                            c(e[1]);
                            e[1].show();
                            setTimeout(function() {
                                c(e[1], 1)
                            }, 0)
                        } else
                            e[1].show();
                        this._.currentTabId = a;
                        this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                }, updateStyle: function() {
                    this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page")
                }, hidePage: function(a) {
                    var b = this._.tabs[a] && this._.tabs[a][0];
                    if (b && this._.pageCount != 1 && b.isVisible()) {
                        a == this._.currentTabId &&
                                this.selectPage(d.call(this));
                        b.hide();
                        this._.pageCount--;
                        this.updateStyle()
                    }
                }, showPage: function(a) {
                    if (a = this._.tabs[a] && this._.tabs[a][0]) {
                        a.show();
                        this._.pageCount++;
                        this.updateStyle()
                    }
                }, getElement: function() {
                    return this._.element
                }, getName: function() {
                    return this._.name
                }, getContentElement: function(a, b) {
                    var c = this._.contents[a];
                    return c && c[b]
                }, getValueOf: function(a, b) {
                    return this.getContentElement(a, b).getValue()
                }, setValueOf: function(a, b, c) {
                    return this.getContentElement(a, b).setValue(c)
                }, getButton: function(a) {
                    return this._.buttons[a]
                },
                click: function(a) {
                    return this._.buttons[a].click()
                }, disableButton: function(a) {
                    return this._.buttons[a].disable()
                }, enableButton: function(a) {
                    return this._.buttons[a].enable()
                }, getPageCount: function() {
                    return this._.pageCount
                }, getParentEditor: function() {
                    return this._.editor
                }, getSelectedElement: function() {
                    return this.getParentEditor().getSelection().getSelectedElement()
                }, addFocusable: function(a, b) {
                    if (typeof b == "undefined") {
                        b = this._.focusList.length;
                        this._.focusList.push(new h(this, a, b))
                    } else {
                        this._.focusList.splice(b,
                                0, new h(this, a, b));
                        for (var c = b + 1; c < this._.focusList.length; c++)
                            this._.focusList[c].focusIndex++
                    }
                }};
            CKEDITOR.tools.extend(CKEDITOR.dialog, {add: function(a, b) {
                    if (!this._.dialogDefinitions[a] || typeof b == "function")
                        this._.dialogDefinitions[a] = b
                }, exists: function(a) {
                    return!!this._.dialogDefinitions[a]
                }, getCurrent: function() {
                    return CKEDITOR.dialog._.currentTop
                }, isTabEnabled: function(a, b, c) {
                    a = a.config.removeDialogTabs;
                    return!(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
                }, okButton: function() {
                    var a =
                            function(a, b) {
                                b = b || {};
                                return CKEDITOR.tools.extend({id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function(a) {
                                        a = a.data.dialog;
                                        a.fire("ok", {hide: true}).hide !== false && a.hide()
                                    }}, b, true)
                            };
                    a.type = "button";
                    a.override = function(b) {
                        return CKEDITOR.tools.extend(function(c) {
                            return a(c, b)
                        }, {type: "button"}, true)
                    };
                    return a
                }(), cancelButton: function() {
                    var a = function(a, b) {
                        b = b || {};
                        return CKEDITOR.tools.extend({id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel",
                            onClick: function(a) {
                                a = a.data.dialog;
                                a.fire("cancel", {hide: true}).hide !== false && a.hide()
                            }}, b, true)
                    };
                    a.type = "button";
                    a.override = function(b) {
                        return CKEDITOR.tools.extend(function(c) {
                            return a(c, b)
                        }, {type: "button"}, true)
                    };
                    return a
                }(), addUIElement: function(a, b) {
                    this._.uiElementBuilders[a] = b
                }});
            CKEDITOR.dialog._ = {uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null};
            CKEDITOR.event.implementOn(CKEDITOR.dialog);
            CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
            var r = {resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
                minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]}, p = function(a, b, c) {
                for (var d = 0, f; f = a[d]; d++) {
                    if (f.id == b)
                        return f;
                    if (c && f[c])
                        if (f = p(f[c], b, c))
                            return f
                }
                return null
            }, s = function(a, b, c, d, f) {
                if (c) {
                    for (var e = 0, g; g = a[e]; e++) {
                        if (g.id == c) {
                            a.splice(e, 0, b);
                            return b
                        }
                        if (d && g[d])
                            if (g = s(g[d], b, c, d, true))
                                return g
                    }
                    if (f)
                        return null
                }
                a.push(b);
                return b
            }, w = function(a, b, c) {
                for (var d = 0, f; f = a[d]; d++) {
                    if (f.id == b)
                        return a.splice(d, 1);
                    if (c && f[c])
                        if (f = w(f[c], b, c))
                            return f
                }
                return null
            },
                    t = function(a, b) {
                        this.dialog = a;
                        for (var c = b.contents, d = 0, f; f = c[d]; d++)
                            c[d] = f && new g(a, f);
                        CKEDITOR.tools.extend(this, b)
                    };
            t.prototype = {getContents: function(a) {
                    return p(this.contents, a)
                }, getButton: function(a) {
                    return p(this.buttons, a)
                }, addContents: function(a, b) {
                    return s(this.contents, a, b)
                }, addButton: function(a, b) {
                    return s(this.buttons, a, b)
                }, removeContents: function(a) {
                    w(this.contents, a)
                }, removeButton: function(a) {
                    w(this.buttons, a)
                }};
            g.prototype = {get: function(a) {
                    return p(this.elements, a, "children")
                }, add: function(a,
                        b) {
                    return s(this.elements, a, b, "children")
                }, remove: function(a) {
                    w(this.elements, a, "children")
                }};
            var v, z = {}, x, y = {}, C = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, f = String.fromCharCode(a.data.$.keyCode);
                if ((b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                    b = b[b.length - 1];
                    b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key);
                    a.data.preventDefault()
                }
            }, F = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey,
                        f = String.fromCharCode(a.data.$.keyCode);
                if ((b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                    b = b[b.length - 1];
                    if (b.keyup) {
                        b.keyup.call(b.uiElement, b.dialog, b.key);
                        a.data.preventDefault()
                    }
                }
            }, u = function(a, b, c, d, f) {
                (y[c] || (y[c] = [])).push({uiElement: a, dialog: b, key: c, keyup: f || a.accessKeyUp, keydown: d || a.accessKeyDown})
            }, D = function(a) {
                for (var b in y) {
                    for (var c = y[b], d = c.length - 1; d >= 0; d--)
                        (c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                    c.length === 0 && delete y[b]
                }
            }, I = function(a, b) {
                a._.accessKeyMap[b] &&
                        a.selectPage(a._.accessKeyMap[b])
            }, B = function() {
            };
            (function() {
                CKEDITOR.ui.dialog = {uiElement: function(a, b, c, d, f, e, g) {
                        if (!(arguments.length < 4)) {
                            var h = (d.call ? d(b) : d) || "div", i = ["<", h, " "], k = (f && f.call ? f(b) : f) || {}, j = (e && e.call ? e(b) : e) || {}, o = (g && g.call ? g.call(this, a, b) : g) || "", m = this.domId = j.id || CKEDITOR.tools.getNextId() + "_uiElement";
                            this.id = b.id;
                            if (b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent)) {
                                k.display = "none";
                                this.notAllowed = true
                            }
                            j.id = m;
                            var l = {};
                            b.type && (l["cke_dialog_ui_" +
                                    b.type] = 1);
                            b.className && (l[b.className] = 1);
                            b.disabled && (l.cke_disabled = 1);
                            for (var n = j["class"] && j["class"].split ? j["class"].split(" ") : [], m = 0; m < n.length; m++)
                                n[m] && (l[n[m]] = 1);
                            n = [];
                            for (m in l)
                                n.push(m);
                            j["class"] = n.join(" ");
                            if (b.title)
                                j.title = b.title;
                            l = (b.style || "").split(";");
                            if (b.align) {
                                n = b.align;
                                k["margin-left"] = n == "left" ? 0 : "auto";
                                k["margin-right"] = n == "right" ? 0 : "auto"
                            }
                            for (m in k)
                                l.push(m + ":" + k[m]);
                            b.hidden && l.push("display:none");
                            for (m = l.length - 1; m >= 0; m--)
                                l[m] === "" && l.splice(m, 1);
                            if (l.length > 0)
                                j.style =
                                        (j.style ? j.style + "; " : "") + l.join("; ");
                            for (m in j)
                                i.push(m + '="' + CKEDITOR.tools.htmlEncode(j[m]) + '" ');
                            i.push(">", o, "</", h, ">");
                            c.push(i.join(""));
                            (this._ || (this._ = {})).dialog = a;
                            if (typeof b.isChanged == "boolean")
                                this.isChanged = function() {
                                    return b.isChanged
                                };
                            if (typeof b.isChanged == "function")
                                this.isChanged = b.isChanged;
                            if (typeof b.setValue == "function")
                                this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                                    return function(c) {
                                        a.call(this, b.setValue.call(this, c))
                                    }
                                });
                            if (typeof b.getValue == "function")
                                this.getValue =
                                        CKEDITOR.tools.override(this.getValue, function(a) {
                                            return function() {
                                                return b.getValue.call(this, a.call(this))
                                            }
                                        });
                            CKEDITOR.event.implementOn(this);
                            this.registerEvents(b);
                            this.accessKeyUp && (this.accessKeyDown && b.accessKey) && u(this, a, "CTRL+" + b.accessKey);
                            var D = this;
                            a.on("load", function() {
                                var b = D.getInputElement();
                                if (b) {
                                    var c = D.type in{checkbox: 1, ratio: 1} && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                    b.on("focus", function() {
                                        a._.tabBarMode = false;
                                        a._.hasFocus = true;
                                        D.fire("focus");
                                        c && this.addClass(c)
                                    });
                                    b.on("blur", function() {
                                        D.fire("blur");
                                        c && this.removeClass(c)
                                    })
                                }
                            });
                            CKEDITOR.tools.extend(this, b);
                            if (this.keyboardFocusable) {
                                this.tabIndex = b.tabIndex || 0;
                                this.focusIndex = a._.focusList.push(this) - 1;
                                this.on("focus", function() {
                                    a._.currentFocusIndex = D.focusIndex
                                })
                            }
                        }
                    }, hbox: function(a, b, c, d, f) {
                        if (!(arguments.length < 4)) {
                            this._ || (this._ = {});
                            var e = this._.children = b, g = f && f.widths || null, h = f && f.height || null, i, k = {role: "presentation"};
                            f && f.align && (k.align = f.align);
                            CKEDITOR.ui.dialog.uiElement.call(this,
                                    a, f || {type: "hbox"}, d, "table", {}, k, function() {
                                var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                                for (i = 0; i < c.length; i++) {
                                    var b = "cke_dialog_ui_hbox_child", d = [];
                                    i === 0 && (b = "cke_dialog_ui_hbox_first");
                                    i == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                    a.push('<td class="', b, '" role="presentation" ');
                                    g ? g[i] && d.push("width:" + o(g[i])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                    h && d.push("height:" + o(h));
                                    f && f.padding != void 0 && d.push("padding:" + o(f.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[i].align) && d.push("text-align:" +
                                            e[i].align);
                                    d.length > 0 && a.push('style="' + d.join("; ") + '" ');
                                    a.push(">", c[i], "</td>")
                                }
                                a.push("</tr></tbody>");
                                return a.join("")
                            })
                        }
                    }, vbox: function(a, b, c, d, f) {
                        if (!(arguments.length < 3)) {
                            this._ || (this._ = {});
                            var e = this._.children = b, g = f && f.width || null, h = f && f.heights || null;
                            CKEDITOR.ui.dialog.uiElement.call(this, a, f || {type: "vbox"}, d, "div", null, {role: "presentation"}, function() {
                                var b = ['<table role="presentation" cellspacing="0" border="0" '];
                                b.push('style="');
                                f && f.expand && b.push("height:100%;");
                                b.push("width:" +
                                        o(g || "100%"), ";");
                                CKEDITOR.env.webkit && b.push("float:none;");
                                b.push('"');
                                b.push('align="', CKEDITOR.tools.htmlEncode(f && f.align || (a.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" ');
                                b.push("><tbody>");
                                for (var d = 0; d < c.length; d++) {
                                    var i = [];
                                    b.push('<tr><td role="presentation" ');
                                    g && i.push("width:" + o(g || "100%"));
                                    h ? i.push("height:" + o(h[d])) : f && f.expand && i.push("height:" + Math.floor(100 / c.length) + "%");
                                    f && f.padding != void 0 && i.push("padding:" + o(f.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[d].align) &&
                                            i.push("text-align:" + e[d].align);
                                    i.length > 0 && b.push('style="', i.join("; "), '" ');
                                    b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                                }
                                b.push("</tbody></table>");
                                return b.join("")
                            })
                        }
                    }}
            })();
            CKEDITOR.ui.dialog.uiElement.prototype = {getElement: function() {
                    return CKEDITOR.document.getById(this.domId)
                }, getInputElement: function() {
                    return this.getElement()
                }, getDialog: function() {
                    return this._.dialog
                }, setValue: function(a, b) {
                    this.getInputElement().setValue(a);
                    !b && this.fire("change", {value: a});
                    return this
                },
                getValue: function() {
                    return this.getInputElement().getValue()
                }, isChanged: function() {
                    return false
                }, selectParentTab: function() {
                    for (var a = this.getInputElement(); (a = a.getParent()) && a.$.className.search("cke_dialog_page_contents") == - 1; )
                        ;
                    if (!a)
                        return this;
                    a = a.getAttribute("name");
                    this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                    return this
                }, focus: function() {
                    this.selectParentTab().getInputElement().focus();
                    return this
                }, registerEvents: function(a) {
                    var b = /^on([A-Z]\w+)/, c, d = function(a, b, c, d) {
                        b.on("load",
                                function() {
                                    a.getInputElement().on(c, d, a)
                                })
                    }, f;
                    for (f in a)
                        if (c = f.match(b))
                            this.eventProcessors[f] ? this.eventProcessors[f].call(this, this._.dialog, a[f]) : d(this, this._.dialog, c[1].toLowerCase(), a[f]);
                    return this
                }, eventProcessors: {onLoad: function(a, b) {
                        a.on("load", b, this)
                    }, onShow: function(a, b) {
                        a.on("show", b, this)
                    }, onHide: function(a, b) {
                        a.on("hide", b, this)
                    }}, accessKeyDown: function() {
                    this.focus()
                }, accessKeyUp: function() {
                }, disable: function() {
                    var a = this.getElement();
                    this.getInputElement().setAttribute("disabled",
                            "true");
                    a.addClass("cke_disabled")
                }, enable: function() {
                    var a = this.getElement();
                    this.getInputElement().removeAttribute("disabled");
                    a.removeClass("cke_disabled")
                }, isEnabled: function() {
                    return!this.getElement().hasClass("cke_disabled")
                }, isVisible: function() {
                    return this.getInputElement().isVisible()
                }, isFocusable: function() {
                    return!this.isEnabled() || !this.isVisible() ? false : true
                }};
            CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {getChild: function(a) {
                    if (arguments.length <
                            1)
                        return this._.children.concat();
                    a.splice || (a = [a]);
                    return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
                }}, true);
            CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
            (function() {
                var a = {build: function(a, b, c) {
                        for (var d = b.children, f, e = [], g = [], h = 0; h < d.length && (f = d[h]); h++) {
                            var i = [];
                            e.push(i);
                            g.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, i))
                        }
                        return new CKEDITOR.ui.dialog[b.type](a,
                                g, e, c, b)
                    }};
                CKEDITOR.dialog.addUIElement("hbox", a);
                CKEDITOR.dialog.addUIElement("vbox", a)
            })();
            CKEDITOR.dialogCommand = function(a, b) {
                this.dialogName = a;
                CKEDITOR.tools.extend(this, b, true)
            };
            CKEDITOR.dialogCommand.prototype = {exec: function(a) {
                    CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function() {
                        a.openDialog(this.dialogName)
                    }, 0, this) : a.openDialog(this.dialogName)
                }, canUndo: false, editorFocus: 1};
            (function() {
                var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, f = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                        e = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
                CKEDITOR.VALIDATE_OR = 1;
                CKEDITOR.VALIDATE_AND = 2;
                CKEDITOR.dialog.validate = {functions: function() {
                        var a = arguments;
                        return function() {
                            var b = this && this.getValue ? this.getValue() : a[0], c = void 0, d = CKEDITOR.VALIDATE_AND, f = [], e;
                            for (e = 0; e < a.length; e++)
                                if (typeof a[e] == "function")
                                    f.push(a[e]);
                                else
                                    break;
                            if (e < a.length && typeof a[e] == "string") {
                                c = a[e];
                                e++
                            }
                            e < a.length && typeof a[e] == "number" && (d = a[e]);
                            var g = d == CKEDITOR.VALIDATE_AND ? true : false;
                            for (e = 0; e < f.length; e++)
                                g = d == CKEDITOR.VALIDATE_AND ?
                                        g && f[e](b) : g || f[e](b);
                            return!g ? c : true
                        }
                    }, regex: function(a, b) {
                        return function(c) {
                            c = this && this.getValue ? this.getValue() : c;
                            return!a.test(c) ? b : true
                        }
                    }, notEmpty: function(b) {
                        return this.regex(a, b)
                    }, integer: function(a) {
                        return this.regex(b, a)
                    }, number: function(a) {
                        return this.regex(c, a)
                    }, cssLength: function(a) {
                        return this.functions(function(a) {
                            return f.test(CKEDITOR.tools.trim(a))
                        }, a)
                    }, htmlLength: function(a) {
                        return this.functions(function(a) {
                            return d.test(CKEDITOR.tools.trim(a))
                        }, a)
                    }, inlineStyle: function(a) {
                        return this.functions(function(a) {
                            return e.test(CKEDITOR.tools.trim(a))
                        },
                                a)
                    }, equals: function(a, b) {
                        return this.functions(function(b) {
                            return b == a
                        }, b)
                    }, notEqual: function(a, b) {
                        return this.functions(function(b) {
                            return b != a
                        }, b)
                    }};
                CKEDITOR.on("instanceDestroyed", function(a) {
                    if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                        for (var b; b = CKEDITOR.dialog._.currentTop; )
                            b.hide();
                        for (var c in z)
                            z[c].remove();
                        z = {}
                    }
                    var a = a.editor._.storedDialogs, d;
                    for (d in a)
                        a[d].destroy()
                })
            })();
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {openDialog: function(a, b) {
                    var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                    CKEDITOR.dialog._.currentTop === null && n(this);
                    if (typeof d == "function") {
                        c = this._.storedDialogs || (this._.storedDialogs = {});
                        c = c[a] || (c[a] = new CKEDITOR.dialog(this, a));
                        b && b.call(c, c);
                        c.show()
                    } else {
                        if (d == "failed") {
                            q(this);
                            throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                        }
                        typeof d == "string" && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
                            typeof CKEDITOR.dialog._.dialogDefinitions[a] != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                            this.openDialog(a,
                                    b)
                        }, this, 0, 1)
                    }
                    CKEDITOR.skin.loadPart("dialog");
                    return c
                }})
        }(), CKEDITOR.plugins.add("dialog", {requires: "dialogui", init: function(d) {
                d.on("doubleclick", function(e) {
                    e.data.dialog && d.openDialog(e.data.dialog)
                }, null, null, 999)
            }}), CKEDITOR.plugins.colordialog = {requires: "dialog", init: function(d) {
                var e = new CKEDITOR.dialogCommand("colordialog");
                e.editorFocus = false;
                d.addCommand("colordialog", e);
                CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
                d.getColorFromDialog = function(c, a) {
                    var b = function(d) {
                        this.removeListener("ok",
                                b);
                        this.removeListener("cancel", b);
                        d = d.name == "ok" ? this.getValueOf("picker", "selectedColor") : null;
                        c.call(a, d)
                    }, f = function(a) {
                        a.on("ok", b);
                        a.on("cancel", b)
                    };
                    d.execCommand("colordialog");
                    if (d._.storedDialogs && d._.storedDialogs.colordialog)
                        f(d._.storedDialogs.colordialog);
                    else
                        CKEDITOR.on("dialogDefinition", function(a) {
                            if (a.data.name == "colordialog") {
                                var b = a.data.definition;
                                a.removeListener();
                                b.onLoad = CKEDITOR.tools.override(b.onLoad, function(a) {
                                    return function() {
                                        f(this);
                                        b.onLoad = a;
                                        typeof a == "function" &&
                                                a.call(this)
                                    }
                                })
                            }
                        })
                }
            }}, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog), "use strict", function() {
            function d(a) {
                function b() {
                    var c = a.editable();
                    c.on(y, function(a) {
                        (!CKEDITOR.env.ie || !v) && s(a)
                    });
                    CKEDITOR.env.ie && c.on("paste", function(b) {
                        if (!z) {
                            f();
                            b.data.preventDefault();
                            s(b);
                            n("paste") || a.openDialog("paste")
                        }
                    });
                    if (CKEDITOR.env.ie) {
                        c.on("contextmenu", e, null, null, 0);
                        c.on("beforepaste", function(a) {
                            a.data && !a.data.$.ctrlKey && e()
                        }, null, null, 0)
                    }
                    c.on("beforecut", function() {
                        !v && o(a)
                    });
                    var d;
                    c.attachListener(CKEDITOR.env.ie ? c : a.document.getDocumentElement(), "mouseup", function() {
                        d = setTimeout(function() {
                            w()
                        }, 0)
                    });
                    a.on("destroy", function() {
                        clearTimeout(d)
                    });
                    c.on("keyup", w)
                }
                function c(b) {
                    return{type: b, canUndo: b == "cut", startDisabled: true, exec: function() {
                            this.type == "cut" && o();
                            var b;
                            var c = this.type;
                            if (CKEDITOR.env.ie)
                                b = n(c);
                            else
                                try {
                                    b = a.document.$.execCommand(c, false, null)
                                } catch (d) {
                                    b = false
                                }
                            b || alert(a.lang.clipboard[this.type + "Error"]);
                            return b
                        }}
                }
                function d() {
                    return{canUndo: false, async: true,
                        exec: function(a, b) {
                            var c = function(b, c) {
                                b && q(b.type, b.dataValue, !!c);
                                a.fire("afterCommandExec", {name: "paste", command: d, returnValue: !!b})
                            }, d = this;
                            typeof b == "string" ? c({type: "auto", dataValue: b}, 1) : a.getClipboardData(c)
                        }}
                }
                function f() {
                    z = 1;
                    setTimeout(function() {
                        z = 0
                    }, 100)
                }
                function e() {
                    v = 1;
                    setTimeout(function() {
                        v = 0
                    }, 10)
                }
                function n(b) {
                    var c = a.document, d = c.getBody(), f = false, e = function() {
                        f = true
                    };
                    d.on(b, e);
                    (CKEDITOR.env.version > 7 ? c.$ : c.$.selection.createRange()).execCommand(b);
                    d.removeListener(b, e);
                    return f
                }
                function q(b, c, d) {
                    b = {type: b};
                    if (d && a.fire("beforePaste", b) === false || !c)
                        return false;
                    b.dataValue = c;
                    return a.fire("paste", b)
                }
                function o() {
                    if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                        var b = a.getSelection(), c, d, f;
                        if (b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement())) {
                            d = b.getRanges()[0];
                            f = a.document.createText("");
                            f.insertBefore(c);
                            d.setStartBefore(f);
                            d.setEndAfter(c);
                            b.selectRanges([d]);
                            setTimeout(function() {
                                if (c.getParent()) {
                                    f.remove();
                                    b.selectElement(c)
                                }
                            }, 0)
                        }
                    }
                }
                function l(b, c) {
                    var d = a.document,
                            f = a.editable(), e = function(a) {
                        a.cancel()
                    }, g = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902, i;
                    if (!d.getById("cke_pastebin")) {
                        var k = a.getSelection(), j = k.createBookmarks(), m = new CKEDITOR.dom.element((CKEDITOR.env.webkit || f.is("body")) && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", d);
                        m.setAttributes({id: "cke_pastebin", "data-cke-temp": "1"});
                        CKEDITOR.env.opera && m.appendBogus();
                        var o = 0, d = d.getWindow();
                        if (g) {
                            m.insertAfter(j[0].startNode);
                            m.setStyle("display", "inline")
                        } else {
                            if (CKEDITOR.env.webkit) {
                                f.append(m);
                                m.addClass("cke_editable");
                                if (!f.is("body")) {
                                    g = f.getComputedStyle("position") != "static" ? f : CKEDITOR.dom.element.get(f.$.offsetParent);
                                    o = g.getDocumentPosition().y
                                }
                            } else
                                f.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(m);
                            m.setStyles({position: "absolute", top: d.getScrollPosition().y - o + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0})
                        }
                        if (g = m.getParent().isReadOnly()) {
                            m.setOpacity(0);
                            m.setAttribute("contenteditable",
                                    true)
                        } else
                            m.setStyle(a.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
                        a.on("selectionChange", e, null, null, 0);
                        if (CKEDITOR.env.webkit || CKEDITOR.env.gecko)
                            i = f.once("blur", e, null, null, -100);
                        g && m.focus();
                        g = new CKEDITOR.dom.range(m);
                        g.selectNodeContents(m);
                        var l = g.select();
                        CKEDITOR.env.ie && (i = f.once("blur", function() {
                            a.lockSelection(l)
                        }));
                        var n = CKEDITOR.document.getWindow().getScrollPosition().y;
                        setTimeout(function() {
                            if (CKEDITOR.env.webkit || CKEDITOR.env.opera)
                                CKEDITOR.document[CKEDITOR.env.webkit ?
                                        "getBody" : "getDocumentElement"]().$.scrollTop = n;
                            i && i.removeListener();
                            CKEDITOR.env.ie && f.focus();
                            k.selectBookmarks(j);
                            m.remove();
                            var b;
                            if (CKEDITOR.env.webkit && (b = m.getFirst()) && b.is && b.hasClass("Apple-style-span"))
                                m = b;
                            a.removeListener("selectionChange", e);
                            c(m.getHtml())
                        }, 0)
                    }
                }
                function r() {
                    if (CKEDITOR.env.ie) {
                        a.focus();
                        f();
                        var b = a.focusManager;
                        b.lock();
                        if (a.editable().fire(y) && !n("paste")) {
                            b.unlock();
                            return false
                        }
                        b.unlock()
                    } else
                        try {
                            if (a.editable().fire(y) && !a.document.$.execCommand("Paste", false, null))
                                throw 0;
                        } catch (c) {
                            return false
                        }
                    return true
                }
                function p(b) {
                    if (a.mode == "wysiwyg")
                        switch (b.data.keyCode) {
                            case CKEDITOR.CTRL + 86:
                            case CKEDITOR.SHIFT + 45:
                                b = a.editable();
                                f();
                                !CKEDITOR.env.ie && b.fire("beforepaste");
                                (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste");
                                break;
                            case CKEDITOR.CTRL + 88:
                            case CKEDITOR.SHIFT + 46:
                                a.fire("saveSnapshot");
                                setTimeout(function() {
                                    a.fire("saveSnapshot")
                                }, 50)
                            }
                }
                function s(b) {
                    var c = {type: "auto"}, d = a.fire("beforePaste", c);
                    l(b, function(a) {
                        a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,
                                "");
                        d && q(c.type, a, 0, 1)
                    })
                }
                function w() {
                    if (a.mode == "wysiwyg") {
                        var b = t("paste");
                        a.getCommand("cut").setState(t("cut"));
                        a.getCommand("copy").setState(t("copy"));
                        a.getCommand("paste").setState(b);
                        a.fire("pasteState", b)
                    }
                }
                function t(b) {
                    if (x && b in{paste: 1, cut: 1})
                        return CKEDITOR.TRISTATE_DISABLED;
                    if (b == "paste")
                        return CKEDITOR.TRISTATE_OFF;
                    var b = a.getSelection(), c = b.getRanges();
                    return b.getType() == CKEDITOR.SELECTION_NONE || c.length == 1 && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
                }
                var v = 0,
                        z = 0, x = 0, y = CKEDITOR.env.ie ? "beforepaste" : "paste";
                (function() {
                    a.on("key", p);
                    a.on("contentDom", b);
                    a.on("selectionChange", function(a) {
                        x = a.data.selection.getRanges()[0].checkReadOnly();
                        w()
                    });
                    a.contextMenu && a.contextMenu.addListener(function(a, b) {
                        x = b.getRanges()[0].checkReadOnly();
                        return{cut: t("cut"), copy: t("copy"), paste: t("paste")}
                    })
                })();
                (function() {
                    function b(c, d, f, e, g) {
                        var i = a.lang.clipboard[d];
                        a.addCommand(d, f);
                        a.ui.addButton && a.ui.addButton(c, {label: i, command: d, toolbar: "clipboard," + e});
                        a.addMenuItems &&
                                a.addMenuItem(d, {label: i, command: d, group: "clipboard", order: g})
                    }
                    b("Cut", "cut", c("cut"), 10, 1);
                    b("Copy", "copy", c("copy"), 20, 4);
                    b("Paste", "paste", d(), 30, 8)
                })();
                a.getClipboardData = function(b, c) {
                    function d(a) {
                        a.removeListener();
                        a.cancel();
                        c(a.data)
                    }
                    function f(a) {
                        a.removeListener();
                        a.cancel();
                        k = true;
                        c({type: i, dataValue: a.data})
                    }
                    function e() {
                        this.customTitle = b && b.title
                    }
                    var g = false, i = "auto", k = false;
                    if (!c) {
                        c = b;
                        b = null
                    }
                    a.on("paste", d, null, null, 0);
                    a.on("beforePaste", function(a) {
                        a.removeListener();
                        g = true;
                        i = a.data.type
                    },
                            null, null, 1E3);
                    if (r() === false) {
                        a.removeListener("paste", d);
                        if (g && a.fire("pasteDialog", e)) {
                            a.on("pasteDialogCommit", f);
                            a.on("dialogHide", function(a) {
                                a.removeListener();
                                a.data.removeListener("pasteDialogCommit", f);
                                setTimeout(function() {
                                    k || c(null)
                                }, 10)
                            })
                        } else
                            c(null)
                    }
                }
            }
            function e(a) {
                if (CKEDITOR.env.webkit) {
                    if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))
                        return"html"
                } else if (CKEDITOR.env.ie) {
                    if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))
                        return"html"
                } else if (CKEDITOR.env.gecko ||
                        CKEDITOR.env.opera) {
                    if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi))
                        return"html"
                } else
                    return"html";
                return"htmlifiedtext"
            }
            function c(a, b) {
                function c(a) {
                    return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "")
                }
                b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
                b = b.replace(/<\/?[A-Z]+>/g, function(a) {
                    return a.toLowerCase()
                });
                if (b.match(/^[^<]$/))
                    return b;
                if (CKEDITOR.env.webkit && b.indexOf("<div>") > -1) {
                    b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,
                            "<div></div>");
                    b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
                        return c(a.split("</div><div>").length + 1)
                    }) + "</p>");
                    b = b.replace(/<\/div><div>/g, "<br>");
                    b = b.replace(/<\/?div>/g, "")
                }
                if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) {
                    CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>"));
                    b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) {
                        return c(a.length / 4)
                    }) + "</p>")
                }
                return f(a, b)
            }
            function a() {
                var a = new CKEDITOR.htmlParser.filter,
                        b = {blockquote: 1, dl: 1, fieldset: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ol: 1, p: 1, table: 1, ul: 1}, c = CKEDITOR.tools.extend({br: 0}, CKEDITOR.dtd.$inline), d = {p: 1, br: 1, "cke:br": 1}, f = CKEDITOR.dtd, e = CKEDITOR.tools.extend({area: 1, basefont: 1, embed: 1, iframe: 1, map: 1, object: 1, param: 1}, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), n = function(a) {
                    delete a.name;
                    a.add(new CKEDITOR.htmlParser.text(" "))
                }, q = function(a) {
                    for (var b = a, c; (b = b.next) && b.name && b.name.match(/^h\d$/); ) {
                        c = new CKEDITOR.htmlParser.element("cke:br");
                        c.isEmpty =
                                true;
                        for (a.add(c); c = b.children.shift(); )
                            a.add(c)
                    }
                };
                a.addRules({elements: {h1: q, h2: q, h3: q, h4: q, h5: q, h6: q, img: function(a) {
                            var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " ";
                            a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] ");
                            return new CKEDITOR.htmlParser.text(b)
                        }, td: n, th: n, $: function(a) {
                            var h = a.name, n;
                            if (e[h])
                                return false;
                            a.attributes = {};
                            if (h == "br")
                                return a;
                            if (b[h])
                                a.name = "p";
                            else if (c[h])
                                delete a.name;
                            else if (f[h]) {
                                n = new CKEDITOR.htmlParser.element("cke:br");
                                n.isEmpty = true;
                                if (CKEDITOR.dtd.$empty[h])
                                    return n;
                                a.add(n, 0);
                                n = n.clone();
                                n.isEmpty = true;
                                a.add(n);
                                delete a.name
                            }
                            d[a.name] || delete a.name;
                            return a
                        }}}, {applyToAll: true});
                return a
            }
            function b(a, b, c) {
                var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), d = new CKEDITOR.htmlParser.basicWriter;
                b.writeHtml(d, c);
                var b = d.getHtml(), b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g,
                        ""), e = 0, b = b.replace(/<\/?p>/g, function(a) {
                    if (a == "<p>") {
                        if (++e > 1)
                            return"</p><p>"
                    } else if (--e > 0)
                        return"</p><p>";
                    return a
                }).replace(/<p><\/p>/g, "");
                return f(a, b)
            }
            function f(a, b) {
                a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
                    return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2)
                }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
                return b
            }
            CKEDITOR.plugins.add("clipboard", {requires: "dialog", init: function(f) {
                    var k;
                    d(f);
                    CKEDITOR.dialog.add("paste",
                            CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                    f.on("paste", function(a) {
                        var b = a.data.dataValue, c = CKEDITOR.dtd.$block;
                        if (b.indexOf("Apple-") > -1) {
                            b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
                            a.data.type != "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
                                return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                            }));
                            if (b.indexOf('<br class="Apple-interchange-newline">') > -1) {
                                a.data.startsWithEOL = 1;
                                a.data.preSniffing = "html";
                                b = b.replace(/<br class="Apple-interchange-newline">/,
                                        "")
                            }
                            b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                        }
                        if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var d, f, e = new CKEDITOR.dom.element("div");
                            for (e.setHtml(b); e.getChildCount() == 1 && (d = e.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents")); )
                                e = f = d;
                            f && (b = f.getHtml().replace(/<br>$/i, ""))
                        }
                        CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
                            if (d.toLowerCase()in c) {
                                a.data.preSniffing = "html";
                                return"<" + d
                            }
                            return b
                        }) : CKEDITOR.env.webkit ? b =
                                b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
                                    if (d in c) {
                                        a.data.endsWithEOL = 1;
                                        return"</" + d + ">"
                                    }
                                    return b
                                }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                        a.data.dataValue = b
                    }, null, null, 3);
                    f.on("paste", function(d) {
                        var d = d.data, i = d.type, j = d.dataValue, m, n = f.config.clipboard_defaultContentType || "html";
                        m = i == "html" || d.preSniffing == "html" ? "html" : e(j);
                        m == "htmlifiedtext" ? j = c(f.config, j) : i == "text" && m == "html" && (j = b(f.config, j, k || (k = a(f))));
                        d.startsWithEOL && (j = '<br data-cke-eol="1">' + j);
                        d.endsWithEOL &&
                                (j = j + '<br data-cke-eol="1">');
                        i == "auto" && (i = m == "html" || n == "html" ? "html" : "text");
                        d.type = i;
                        d.dataValue = j;
                        delete d.preSniffing;
                        delete d.startsWithEOL;
                        delete d.endsWithEOL
                    }, null, null, 6);
                    f.on("paste", function(a) {
                        a = a.data;
                        f.insertHtml(a.dataValue, a.type);
                        setTimeout(function() {
                            f.fire("afterPaste")
                        }, 0)
                    }, null, null, 1E3);
                    f.on("pasteDialog", function(a) {
                        setTimeout(function() {
                            f.openDialog("paste", a.data)
                        }, 0)
                    })
                }})
        }(), function() {
            CKEDITOR.plugins.add("panel", {beforeInit: function(a) {
                    a.ui.addHandler(CKEDITOR.UI_PANEL,
                            CKEDITOR.ui.panel.handler)
                }});
            CKEDITOR.UI_PANEL = "panel";
            CKEDITOR.ui.panel = function(a, b) {
                b && CKEDITOR.tools.extend(this, b);
                CKEDITOR.tools.extend(this, {className: "", css: []});
                this.id = CKEDITOR.tools.getNextId();
                this.document = a;
                this.isFramed = this.forceIFrame || this.css.length;
                this._ = {blocks: {}}
            };
            CKEDITOR.ui.panel.handler = {create: function(a) {
                    return new CKEDITOR.ui.panel(a)
                }};
            var d = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
                    e = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'), c = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
            CKEDITOR.ui.panel.prototype = {render: function(a, b) {
                    this.getHolderElement = function() {
                        var a = this._.holder;
                        if (!a) {
                            if (this.isFramed) {
                                var a =
                                        this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument();
                                CKEDITOR.env.iOS && b.setStyles({overflow: "scroll", "-webkit-overflow-scrolling": "touch"});
                                b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                                    this.isLoaded = true;
                                    if (this.onLoad)
                                        this.onLoad()
                                }, this));
                                a.write(c.output(CKEDITOR.tools.extend({css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");"}, f)));
                                a.getWindow().$.CKEDITOR = CKEDITOR;
                                a.on("key" + (CKEDITOR.env.opera ? "press" :
                                        "down"), function(a) {
                                    var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir");
                                    this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault()
                                }, this);
                                a = a.getBody();
                                a.unselectable();
                                CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                            } else
                                a = this.document.getById(this.id);
                            this._.holder = a
                        }
                        return a
                    };
                    var f = {editorId: a.id, id: this.id, langCode: a.langCode, dir: a.lang.dir, cls: this.className,
                        frame: "", env: CKEDITOR.env.cssClass, "z-index": a.config.baseFloatZIndex + 1};
                    if (this.isFramed) {
                        var h = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                        f.frame = e.output({id: this.id + "_frame", src: h})
                    }
                    h = d.output(f);
                    b && b.push(h);
                    return h
                }, addBlock: function(a, b) {
                    b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
                    this._.currentBlock ||
                            this.showBlock(a);
                    return b
                }, getBlock: function(a) {
                    return this._.blocks[a]
                }, showBlock: function(a) {
                    var a = this._.blocks[a], b = this._.currentBlock, c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                    b && b.hide();
                    this._.currentBlock = a;
                    CKEDITOR.fire("ariaWidget", c);
                    a._.focusIndex = -1;
                    this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                    a.show();
                    return a
                }, destroy: function() {
                    this.element && this.element.remove()
                }};
            CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({$: function(a,
                        b) {
                    this.element = a.append(a.getDocument().createElement("div", {attributes: {tabindex: -1, "class": "cke_panel_block"}, styles: {display: "none"}}));
                    b && CKEDITOR.tools.extend(this, b);
                    this.element.setAttributes({role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"]});
                    this.keys = {};
                    this._.focusIndex = -1;
                    this.element.disableContextMenu()
                }, _: {markItem: function(a) {
                        if (a != -1) {
                            a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                                    a);
                            (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus();
                            a.focus();
                            this.onMark && this.onMark(a)
                        }
                    }}, proto: {show: function() {
                        this.element.setStyle("display", "")
                    }, hide: function() {
                        (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none")
                    }, onKeyDown: function(a, b) {
                        var c = this.keys[a];
                        switch (c) {
                            case "next":
                                for (var d = this._.focusIndex, c = this.element.getElementsByTag("a"), e; e = c.getItem(++d); )
                                    if (e.getAttribute("_cke_focus") && e.$.offsetWidth) {
                                        this._.focusIndex =
                                                d;
                                        e.focus();
                                        break
                                    }
                                if (!e && !b) {
                                    this._.focusIndex = -1;
                                    return this.onKeyDown(a, 1)
                                }
                                return false;
                            case "prev":
                                d = this._.focusIndex;
                                for (c = this.element.getElementsByTag("a"); d > 0 && (e = c.getItem(--d)); ) {
                                    if (e.getAttribute("_cke_focus") && e.$.offsetWidth) {
                                        this._.focusIndex = d;
                                        e.focus();
                                        break
                                    }
                                    e = null
                                }
                                if (!e && !b) {
                                    this._.focusIndex = c.count();
                                    return this.onKeyDown(a, 1)
                                }
                                return false;
                            case "click":
                            case "mouseup":
                                d = this._.focusIndex;
                                (e = d >= 0 && this.element.getElementsByTag("a").getItem(d)) && (e.$[c] ? e.$[c]() : e.$["on" + c]());
                                return false
                        }
                        return true
                    }}})
        }(),
                CKEDITOR.plugins.add("floatpanel", {requires: "panel"}), function() {
            function d(c, a, b, d, h) {
                var h = CKEDITOR.tools.genKey(a.getUniqueId(), b.getUniqueId(), c.lang.dir, c.uiColor || "", d.css || "", h || ""), k = e[h];
                if (!k) {
                    k = e[h] = new CKEDITOR.ui.panel(a, d);
                    k.element = b.append(CKEDITOR.dom.element.createFromHtml(k.render(c), a));
                    k.element.setStyles({display: "none", position: "absolute"})
                }
                return k
            }
            var e = {};
            CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({$: function(c, a, b, f) {
                    function e() {
                        j.hide()
                    }
                    b.forceIFrame = 1;
                    b.toolbarRelated &&
                            c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a = CKEDITOR.document.getById("cke_" + c.name));
                    var k = a.getDocument(), f = d(c, k, a, b, f || 0), g = f.element, i = g.getFirst(), j = this;
                    g.disableContextMenu();
                    this.element = g;
                    this._ = {editor: c, panel: f, parentElement: a, definition: b, document: k, iframe: i, children: [], dir: c.lang.dir};
                    c.on("mode", e);
                    c.on("resize", e);
                    k.getWindow().on("resize", e)
                }, proto: {addBlock: function(c, a) {
                        return this._.panel.addBlock(c, a)
                    }, addListBlock: function(c, a) {
                        return this._.panel.addListBlock(c, a)
                    }, getBlock: function(c) {
                        return this._.panel.getBlock(c)
                    },
                    showBlock: function(c, a, b, d, e, k) {
                        var g = this._.panel, i = g.showBlock(c);
                        this.allowBlur(false);
                        c = this._.editor.editable();
                        this._.returnFocus = c.hasFocus ? c : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                        var j = this.element, c = this._.iframe, c = CKEDITOR.env.ie ? c : new CKEDITOR.dom.window(c.$.contentWindow), m = j.getDocument(), n = this._.parentElement.getPositionedAncestor(), q = a.getDocumentPosition(m), m = n ? n.getDocumentPosition(m) : {x: 0, y: 0}, o = this._.dir == "rtl", l = q.x + (d || 0) - m.x, r = q.y + (e || 0) - m.y;
                        if (o && (b ==
                                1 || b == 4))
                            l = l + a.$.offsetWidth;
                        else if (!o && (b == 2 || b == 3))
                            l = l + (a.$.offsetWidth - 1);
                        if (b == 3 || b == 4)
                            r = r + (a.$.offsetHeight - 1);
                        this._.panel._.offsetParentId = a.getId();
                        j.setStyles({top: r + "px", left: 0, display: ""});
                        j.setOpacity(0);
                        j.getFirst().removeStyle("width");
                        this._.editor.focusManager.add(c);
                        if (!this._.blurSet) {
                            CKEDITOR.event.useCapture = true;
                            c.on("blur", function(a) {
                                if (this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild) {
                                    delete this._.returnFocus;
                                    this.hide()
                                }
                            },
                                    this);
                            c.on("focus", function() {
                                this._.focused = true;
                                this.hideChild();
                                this.allowBlur(true)
                            }, this);
                            CKEDITOR.event.useCapture = false;
                            this._.blurSet = 1
                        }
                        g.onEscape = CKEDITOR.tools.bind(function(a) {
                            if (this.onEscape && this.onEscape(a) === false)
                                return false
                        }, this);
                        CKEDITOR.tools.setTimeout(function() {
                            var a = CKEDITOR.tools.bind(function() {
                                j.removeStyle("width");
                                if (i.autoSize) {
                                    var a = i.element.getDocument(), a = (CKEDITOR.env.webkit ? i.element : a.getBody()).$.scrollWidth;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a +
                                            ((j.$.offsetWidth || 0) - (j.$.clientWidth || 0) + 3));
                                    j.setStyle("width", a + 10 + "px");
                                    a = i.element.$.scrollHeight;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((j.$.offsetHeight || 0) - (j.$.clientHeight || 0) + 3));
                                    j.setStyle("height", a + "px");
                                    g._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                } else
                                    j.removeStyle("height");
                                o && (l = l - j.$.offsetWidth);
                                j.setStyle("left", l + "px");
                                var b = g.element.getWindow(), a = j.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height ||
                                        a.bottom - a.top, f = o ? a.right : b.width - a.left, e = o ? b.width - a.right : a.left;
                                o ? f < c && (l = e > c ? l + c : b.width > c ? l - a.left : l - a.right + b.width) : f < c && (l = e > c ? l - c : b.width > c ? l - a.right + b.width : l - a.left);
                                c = a.top;
                                b.height - a.top < d && (r = c > d ? r - d : b.height > d ? r - a.bottom + b.height : r - a.top);
                                if (CKEDITOR.env.ie) {
                                    b = a = new CKEDITOR.dom.element(j.$.offsetParent);
                                    b.getName() == "html" && (b = b.getDocument().getBody());
                                    b.getComputedStyle("direction") == "rtl" && (l = CKEDITOR.env.ie8Compat ? l - j.getDocument().getDocumentElement().$.scrollLeft * 2 : l - (a.$.scrollWidth -
                                            a.$.clientWidth))
                                }
                                var a = j.getFirst(), h;
                                (h = a.getCustomData("activePanel")) && h.onHide && h.onHide.call(this, 1);
                                a.setCustomData("activePanel", this);
                                j.setStyles({top: r + "px", left: l + "px"});
                                j.setOpacity(1);
                                k && k()
                            }, this);
                            g.isLoaded ? a() : g.onLoad = a;
                            CKEDITOR.tools.setTimeout(function() {
                                var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                                this.focus();
                                i.element.focus();
                                if (CKEDITOR.env.webkit)
                                    CKEDITOR.document.getBody().$.scrollTop = a;
                                this.allowBlur(true);
                                this._.editor.fire("panelShow",
                                        this)
                            }, 0, this)
                        }, CKEDITOR.env.air ? 200 : 0, this);
                        this.visible = 1;
                        this.onShow && this.onShow.call(this)
                    }, focus: function() {
                        if (CKEDITOR.env.webkit) {
                            var c = CKEDITOR.document.getActive();
                            !c.equals(this._.iframe) && c.$.blur()
                        }
                        (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                    }, blur: function() {
                        var c = this._.iframe.getFrameDocument().getActive();
                        c.is("a") && (this._.lastFocused = c)
                    }, hide: function(c) {
                        if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                            this.hideChild();
                            CKEDITOR.env.gecko &&
                                    this._.iframe.getFrameDocument().$.activeElement.blur();
                            this.element.setStyle("display", "none");
                            this.visible = 0;
                            this.element.getFirst().removeCustomData("activePanel");
                            if (c = c && this._.returnFocus) {
                                CKEDITOR.env.webkit && c.type && c.getWindow().$.focus();
                                c.focus()
                            }
                            delete this._.lastFocused;
                            this._.editor.fire("panelHide", this)
                        }
                    }, allowBlur: function(c) {
                        var a = this._.panel;
                        if (c != void 0)
                            a.allowBlur = c;
                        return a.allowBlur
                    }, showAsChild: function(c, a, b, d, e, k) {
                        if (!(this._.activeChild == c && c._.panel._.offsetParentId ==
                                b.getId())) {
                            this.hideChild();
                            c.onHide = CKEDITOR.tools.bind(function() {
                                CKEDITOR.tools.setTimeout(function() {
                                    this._.focused || this.hide()
                                }, 0, this)
                            }, this);
                            this._.activeChild = c;
                            this._.focused = false;
                            c.showBlock(a, b, d, e, k);
                            this.blur();
                            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
                                c.element.getChild(0).$.style.cssText += ""
                            }, 100)
                        }
                    }, hideChild: function(c) {
                        var a = this._.activeChild;
                        if (a) {
                            delete a.onHide;
                            delete this._.activeChild;
                            a.hide();
                            c && this.focus()
                        }
                    }}});
            CKEDITOR.on("instanceDestroyed",
                    function() {
                        var c = CKEDITOR.tools.isEmpty(CKEDITOR.instances), a;
                        for (a in e) {
                            var b = e[a];
                            c ? b.destroy() : b.element.hide()
                        }
                        c && (e = {})
                    })
        }(), CKEDITOR.plugins.add("menu", {requires: "floatpanel", beforeInit: function(d) {
                for (var e = d.config.menu_groups.split(","), c = d._.menuGroups = {}, a = d._.menuItems = {}, b = 0; b < e.length; b++)
                    c[e[b]] = b + 1;
                d.addMenuGroup = function(a, b) {
                    c[a] = b || 100
                };
                d.addMenuItem = function(b, d) {
                    c[d.group] && (a[b] = new CKEDITOR.menuItem(this, b, d))
                };
                d.addMenuItems = function(a) {
                    for (var b in a)
                        this.addMenuItem(b, a[b])
                };
                d.getMenuItem = function(b) {
                    return a[b]
                };
                d.removeMenuItem = function(b) {
                    delete a[b]
                }
            }}), function() {
            function d(a) {
                a.sort(function(a, b) {
                    return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
                })
            }
            var e = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}';
            if (CKEDITOR.env.opera ||
                    CKEDITOR.env.gecko && CKEDITOR.env.mac)
                e = e + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (e = e + ' onblur="this.style.cssText = this.style.cssText;"');
            var e = e + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'), c = CKEDITOR.addTemplate("menuItem", e + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
                    a = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
            CKEDITOR.menu = CKEDITOR.tools.createClass({$: function(a, c) {
                    c = this._.definition = c || {};
                    this.id = CKEDITOR.tools.getNextId();
                    this.editor = a;
                    this.items = [];
                    this._.listeners = [];
                    this._.level = c.level || 1;
                    var d = CKEDITOR.tools.extend({}, c.panel, {css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {}}), e = d.block.attributes = d.attributes || {};
                    !e.role && (e.role = "menu");
                    this._.panelDefinition = d
                }, _: {onShow: function() {
                        var a =
                                this.editor.getSelection(), c = a && a.getStartElement(), d = this.editor.elementPath(), e = this._.listeners;
                        this.removeAll();
                        for (var g = 0; g < e.length; g++) {
                            var i = e[g](c, a, d);
                            if (i)
                                for (var j in i) {
                                    var m = this.editor.getMenuItem(j);
                                    if (m && (!m.command || this.editor.getCommand(m.command).state)) {
                                        m.state = i[j];
                                        this.add(m)
                                    }
                                }
                        }
                    }, onClick: function(a) {
                        this.hide();
                        if (a.onClick)
                            a.onClick();
                        else
                            a.command && this.editor.execCommand(a.command)
                    }, onEscape: function(a) {
                        var c = this.parent;
                        c ? c._.panel.hideChild(1) : a == 27 && this.hide(1);
                        return false
                    },
                    onHide: function() {
                        this.onHide && this.onHide()
                    }, showSubMenu: function(a) {
                        var c = this._.subMenu, d = this.items[a];
                        if (d = d.getItems && d.getItems()) {
                            if (c)
                                c.removeAll();
                            else {
                                c = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {level: this._.level + 1}, true));
                                c.parent = this;
                                c._.onClick = CKEDITOR.tools.bind(this._.onClick, this)
                            }
                            for (var e in d) {
                                var g = this.editor.getMenuItem(e);
                                if (g) {
                                    g.state = d[e];
                                    c.add(g)
                                }
                            }
                            var i = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                                    ("" + a));
                            setTimeout(function() {
                                c.show(i, 2)
                            }, 0)
                        } else
                            this._.panel.hideChild(1)
                    }}, proto: {add: function(a) {
                        if (!a.order)
                            a.order = this.items.length;
                        this.items.push(a)
                    }, removeAll: function() {
                        this.items = []
                    }, show: function(a, c, e, k) {
                        if (!this.parent) {
                            this._.onShow();
                            if (!this.items.length)
                                return
                        }
                        var c = c || (this.editor.lang.dir == "rtl" ? 2 : 1), g = this.items, i = this.editor, j = this._.panel, m = this._.element;
                        if (!j) {
                            j = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                            j.onEscape = CKEDITOR.tools.bind(function(a) {
                                if (this._.onEscape(a) === false)
                                    return false
                            }, this);
                            j.onShow = function() {
                                j._.panel.getHolderElement().getParent().addClass("cke cke_reset_all")
                            };
                            j.onHide = CKEDITOR.tools.bind(function() {
                                this._.onHide && this._.onHide()
                            }, this);
                            m = j.addBlock(this.id, this._.panelDefinition.block);
                            m.autoSize = true;
                            var n = m.keys;
                            n[40] = "next";
                            n[9] = "next";
                            n[38] = "prev";
                            n[CKEDITOR.SHIFT + 9] = "prev";
                            n[i.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                            n[32] = CKEDITOR.env.ie ? "mouseup" :
                                    "click";
                            CKEDITOR.env.ie && (n[13] = "mouseup");
                            m = this._.element = m.element;
                            n = m.getDocument();
                            n.getBody().setStyle("overflow", "hidden");
                            n.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                            this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
                                clearTimeout(this._.showSubTimeout);
                                this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, i.config.menu_subMenuDelay || 400, this, [a])
                            }, this);
                            this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                                clearTimeout(this._.showSubTimeout)
                            }, this);
                            this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                                var b = this.items[a];
                                if (b.state == CKEDITOR.TRISTATE_DISABLED)
                                    this.hide(1);
                                else if (b.getItems)
                                    this._.showSubMenu(a);
                                else
                                    this._.onClick(b)
                            }, this)
                        }
                        d(g);
                        for (var n = i.elementPath(), n = ['<div class="cke_menu' + (n && n.direction() != i.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], q = g.length, o = q && g[0].group, l = 0; l < q; l++) {
                            var r = g[l];
                            if (o != r.group) {
                                n.push('<div class="cke_menuseparator" role="separator"></div>');
                                o = r.group
                            }
                            r.render(this, l, n)
                        }
                        n.push("</div>");
                        m.setHtml(n.join(""));
                        CKEDITOR.ui.fire("ready", this);
                        this.parent ? this.parent._.panel.showAsChild(j, this.id, a, c, e, k) : j.showBlock(this.id, a, c, e, k);
                        i.fire("menuShow", [j])
                    }, addListener: function(a) {
                        this._.listeners.push(a)
                    }, hide: function(a) {
                        this._.onHide && this._.onHide();
                        this._.panel && this._.panel.hide(a)
                    }}});
            CKEDITOR.menuItem = CKEDITOR.tools.createClass({$: function(a, c, d) {
                    CKEDITOR.tools.extend(this, d, {order: 0, className: "cke_menubutton__" + c});
                    this.group = a._.menuGroups[this.group];
                    this.editor = a;
                    this.name =
                    c
                }, proto: {render: function(b, d, e) {
                        var k = b.id + ("" + d), g = typeof this.state == "undefined" ? CKEDITOR.TRISTATE_OFF : this.state, i = "", j = g == CKEDITOR.TRISTATE_ON ? "on" : g == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                        this.role in{menuitemcheckbox: 1, menuitemradio: 1} && (i = ' aria-checked="' + (g == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                        var m = this.getItems, n = "&#" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";", q = this.name;
                        if (this.icon && !/\./.test(this.icon))
                            q = this.icon;
                        b = {id: k, name: this.name, iconName: q, label: this.label,
                            cls: this.className || "", state: j, hasPopup: m ? "true" : "false", disabled: g == CKEDITOR.TRISTATE_DISABLED, title: this.label, href: "javascript:void('" + (this.label || "").replace("'") + "')", hoverFn: b._.itemOverFn, moveOutFn: b._.itemOutFn, clickFn: b._.itemClickFn, index: d, iconStyle: CKEDITOR.skin.getIconStyle(q, this.editor.lang.dir == "rtl", q == this.icon ? null : this.icon, this.iconOffset), arrowHtml: m ? a.output({label: n}) : "", role: this.role ? this.role : "menuitem", ariaChecked: i};
                        c.output(b, e)
                    }}})
        }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
                CKEDITOR.plugins.add("contextmenu", {requires: "menu", onLoad: function() {
                        CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({base: CKEDITOR.menu, $: function(d) {
                                this.base.call(this, d, {panel: {className: "cke_menu_panel", attributes: {"aria-label": d.lang.contextmenu.options}}})
                            }, proto: {addTarget: function(d, e) {
                                    d.on("contextmenu", function(a) {
                                        var a = a.data, d = CKEDITOR.env.webkit ? c : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                                        if (!e || !d) {
                                            a.preventDefault();
                                            var h = a.getTarget().getDocument(), k = a.getTarget().getDocument().getDocumentElement(),
                                                    d = !h.equals(CKEDITOR.document), h = h.getWindow().getScrollPosition(), g = d ? a.$.clientX : a.$.pageX || h.x + a.$.clientX, i = d ? a.$.clientY : a.$.pageY || h.y + a.$.clientY;
                                            CKEDITOR.tools.setTimeout(function() {
                                                this.open(k, null, g, i)
                                            }, CKEDITOR.env.ie ? 200 : 0, this)
                                        }
                                    }, this);
                                    if (CKEDITOR.env.webkit) {
                                        var c, a = function() {
                                            c = 0
                                        };
                                        d.on("keydown", function(a) {
                                            c = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
                                        });
                                        d.on("keyup", a);
                                        d.on("contextmenu", a)
                                    }
                                }, open: function(d, e, c, a) {
                                    this.editor.focus();
                                    d = d || CKEDITOR.document.getDocumentElement();
                                    this.editor.selectionChange(1);
                                    this.show(d, e, c, a)
                                }}})
                    }, beforeInit: function(d) {
                        var e = d.contextMenu = new CKEDITOR.plugins.contextMenu(d);
                        d.on("contentDom", function() {
                            e.addTarget(d.editable(), d.config.browserContextMenuOnCtrl !== false)
                        });
                        d.addCommand("contextMenu", {exec: function() {
                                d.contextMenu.open(d.document.getBody())
                            }});
                        d.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
                        d.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
                    }}), function() {
            var d;
            function e(a, e) {
                function k(b) {
                    b = m.list[b];
                    if (b.equals(a.editable()) ||
                            b.getAttribute("contenteditable") == "true") {
                        var c = a.createRange();
                        c.selectNodeContents(b);
                        c.select()
                    } else
                        a.getSelection().selectElement(b);
                    a.focus()
                }
                function g() {
                    j && j.setHtml(c);
                    delete m.list
                }
                var i = a.ui.spaceId("path"), j, m = a._.elementsPath, n = m.idBase;
                e.html = e.html + ('<span id="' + i + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' + i + '" class="cke_path" role="group" aria-labelledby="' + i + '_label">' + c + "</span>");
                a.on("uiReady", function() {
                    var b = a.ui.space("path");
                    b && a.focusManager.add(b,
                            1)
                });
                m.onClick = k;
                var q = CKEDITOR.tools.addFunction(k), o = CKEDITOR.tools.addFunction(function(b, c) {
                    var d = m.idBase, e, c = new CKEDITOR.dom.event(c);
                    e = a.lang.dir == "rtl";
                    switch (c.getKeystroke()) {
                        case e ? 39 : 37:
                        case 9:
                            (e = CKEDITOR.document.getById(d + (b + 1))) || (e = CKEDITOR.document.getById(d + "0"));
                            e.focus();
                            return false;
                        case e ? 37 : 39:
                        case CKEDITOR.SHIFT + 9:
                            (e = CKEDITOR.document.getById(d + (b - 1))) || (e = CKEDITOR.document.getById(d + (m.list.length - 1)));
                            e.focus();
                            return false;
                        case 27:
                            a.focus();
                            return false;
                        case 13:
                        case 32:
                            k(b);
                            return false
                    }
                    return true
                });
                a.on("selectionChange", function() {
                    a.editable();
                    for (var d = [], e = m.list = [], g = [], h = m.filters, k = true, t = a.elementPath().elements, v, z = t.length; z--; ) {
                        var x = t[z], y = 0;
                        v = x.data("cke-display-name") ? x.data("cke-display-name") : x.data("cke-real-element-type") ? x.data("cke-real-element-type") : x.getName();
                        k = x.hasAttribute("contenteditable") ? x.getAttribute("contenteditable") == "true" : k;
                        !k && !x.hasAttribute("contenteditable") && (y = 1);
                        for (var C = 0; C < h.length; C++) {
                            var F = h[C](x, v);
                            if (F === false) {
                                y =
                                        1;
                                break
                            }
                            v = F || v
                        }
                        if (!y) {
                            e.unshift(x);
                            g.unshift(v)
                        }
                    }
                    e = e.length;
                    for (h = 0; h < e; h++) {
                        v = g[h];
                        k = a.lang.elementspath.eleTitle.replace(/%1/, v);
                        v = b.output({id: n + h, label: k, text: v, jsTitle: "javascript:void('" + v + "')", index: h, keyDownFn: o, clickFn: q});
                        d.unshift(v)
                    }
                    j || (j = CKEDITOR.document.getById(i));
                    g = j;
                    g.setHtml(d.join("") + c);
                    a.fire("elementsPathUpdate", {space: g})
                });
                a.on("readOnly", g);
                a.on("contentDomUnload", g);
                a.addCommand("elementsPathFocus", d);
                a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            }
            d = {editorFocus: false,
                readOnly: 1, exec: function(a) {
                    (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
                }};
            var c = '<span class="cke_path_empty">&nbsp;</span>', a = "";
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)
                a = a + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
            var b = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko &&
                    CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + a + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
            CKEDITOR.plugins.add("elementspath", {init: function(a) {
                    a._.elementsPath = {idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: []};
                    a.on("uiSpace", function(b) {
                        b.data.space == "bottom" && e(a, b.data)
                    })
                }})
        }(),
                function() {
                    function d(a, b, c) {
                        c = a.config.forceEnterMode || c;
                        if (a.mode == "wysiwyg") {
                            if (!b)
                                b = a.activeEnterMode;
                            if (!a.elementPath().isContextFor("p")) {
                                b = CKEDITOR.ENTER_BR;
                                c = 1
                            }
                            a.fire("saveSnapshot");
                            b == CKEDITOR.ENTER_BR ? f(a, b, null, c) : h(a, b, null, c);
                            a.fire("saveSnapshot")
                        }
                    }
                    function e(a) {
                        for (var a = a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--)
                            a[b].deleteContents();
                        return a[0]
                    }
                    CKEDITOR.plugins.add("enterkey", {init: function(a) {
                            a.addCommand("enter", {modes: {wysiwyg: 1}, editorFocus: false, exec: function(a) {
                                    d(a)
                                }});
                            a.addCommand("shiftEnter", {modes: {wysiwyg: 1}, editorFocus: false, exec: function(a) {
                                    d(a, a.activeShiftEnterMode, 1)
                                }});
                            a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
                        }});
                    var c = CKEDITOR.dom.walker.whitespaces(), a = CKEDITOR.dom.walker.bookmark();
                    CKEDITOR.plugins.enterkey = {enterBlock: function(b, d, h, m) {
                            if (h = h || e(b)) {
                                var n = h.document, q = h.checkStartOfBlock(), o = h.checkEndOfBlock(), l = b.elementPath(h.startContainer).block, r = d == CKEDITOR.ENTER_DIV ? "div" : "p", p;
                                if (q && o) {
                                    if (l && (l.is("li") || l.getParent().is("li"))) {
                                        h =
                                                l.getParent();
                                        p = h.getParent();
                                        var m = !l.hasPrevious(), s = !l.hasNext(), r = b.getSelection(), w = r.createBookmarks(), q = l.getDirection(1), o = l.getAttribute("class"), t = l.getAttribute("style"), v = p.getDirection(1) != q, b = b.enterMode != CKEDITOR.ENTER_BR || v || t || o;
                                        if (p.is("li"))
                                            if (m || s)
                                                l[m ? "insertBefore" : "insertAfter"](p);
                                            else
                                                l.breakParent(p);
                                        else {
                                            if (b) {
                                                p = n.createElement(d == CKEDITOR.ENTER_P ? "p" : "div");
                                                v && p.setAttribute("dir", q);
                                                t && p.setAttribute("style", t);
                                                o && p.setAttribute("class", o);
                                                l.moveChildren(p);
                                                if (m || s)
                                                    p[m ?
                                                            "insertBefore" : "insertAfter"](h);
                                                else {
                                                    l.breakParent(h);
                                                    p.insertAfter(h)
                                                }
                                            } else {
                                                l.appendBogus(true);
                                                if (m || s)
                                                    for (; n = l[m?"getFirst":"getLast"](); )
                                                        n[m ? "insertBefore" : "insertAfter"](h);
                                                else
                                                    for (l.breakParent(h); n = l.getLast(); )
                                                        n.insertAfter(h)
                                            }
                                            l.remove()
                                        }
                                        r.selectBookmarks(w);
                                        return
                                    }
                                    if (l && l.getParent().is("blockquote")) {
                                        l.breakParent(l.getParent());
                                        l.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || l.getPrevious().remove();
                                        l.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || l.getNext().remove();
                                        h.moveToElementEditStart(l);
                                        h.select();
                                        return
                                    }
                                } else if (l && l.is("pre") && !o) {
                                    f(b, d, h, m);
                                    return
                                }
                                if (o = h.splitBlock(r)) {
                                    d = o.previousBlock;
                                    l = o.nextBlock;
                                    b = o.wasStartOfBlock;
                                    q = o.wasEndOfBlock;
                                    if (l) {
                                        w = l.getParent();
                                        if (w.is("li")) {
                                            l.breakParent(w);
                                            l.move(l.getNext(), 1)
                                        }
                                    } else if (d && (w = d.getParent()) && w.is("li")) {
                                        d.breakParent(w);
                                        w = d.getNext();
                                        h.moveToElementEditStart(w);
                                        d.move(d.getPrevious())
                                    }
                                    if (!b && !q) {
                                        if (l.is("li")) {
                                            p = h.clone();
                                            p.selectNodeContents(l);
                                            p = new CKEDITOR.dom.walker(p);
                                            p.evaluator = function(b) {
                                                return!(a(b) ||
                                                        c(b) || b.type == CKEDITOR.NODE_ELEMENT && b.getName()in CKEDITOR.dtd.$inline && !(b.getName()in CKEDITOR.dtd.$empty))
                                            };
                                            (w = p.next()) && (w.type == CKEDITOR.NODE_ELEMENT && w.is("ul", "ol")) && (CKEDITOR.env.needsBrFiller ? n.createElement("br") : n.createText(" ")).insertBefore(w)
                                        }
                                        l && h.moveToElementEditStart(l)
                                    } else {
                                        if (d) {
                                            if (d.is("li") || !k.test(d.getName()) && !d.is("pre"))
                                                p = d.clone()
                                        } else
                                            l && (p = l.clone());
                                        if (p)
                                            m && !p.is("li") && p.renameNode(r);
                                        else if (w && w.is("li"))
                                            p = w;
                                        else {
                                            p = n.createElement(r);
                                            d && (s = d.getDirection()) &&
                                                    p.setAttribute("dir", s)
                                        }
                                        if (n = o.elementPath) {
                                            m = 0;
                                            for (r = n.elements.length; m < r; m++) {
                                                w = n.elements[m];
                                                if (w.equals(n.block) || w.equals(n.blockLimit))
                                                    break;
                                                if (CKEDITOR.dtd.$removeEmpty[w.getName()]) {
                                                    w = w.clone();
                                                    p.moveChildren(w);
                                                    p.append(w)
                                                }
                                            }
                                        }
                                        p.appendBogus();
                                        p.getParent() || h.insertNode(p);
                                        p.is("li") && p.removeAttribute("value");
                                        if (CKEDITOR.env.ie && b && (!q || !d.getChildCount())) {
                                            h.moveToElementEditStart(q ? d : p);
                                            h.select()
                                        }
                                        h.moveToElementEditStart(b && !q ? l : p)
                                    }
                                    h.select();
                                    h.scrollIntoView()
                                }
                            }
                        }, enterBr: function(a,
                                b, c, d) {
                            if (c = c || e(a)) {
                                var f = c.document, q = c.checkEndOfBlock(), o = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), l = o.block, o = l && o.block.getName();
                                if (!d && o == "li")
                                    h(a, b, c, d);
                                else {
                                    if (!d && q && k.test(o))
                                        if (q = l.getDirection()) {
                                            f = f.createElement("div");
                                            f.setAttribute("dir", q);
                                            f.insertAfter(l);
                                            c.setStart(f, 0)
                                        } else {
                                            f.createElement("br").insertAfter(l);
                                            CKEDITOR.env.gecko && f.createText("").insertAfter(l);
                                            c.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)
                                        }
                                    else {
                                        l =
                                                o == "pre" && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? f.createText("\r") : f.createElement("br");
                                        c.deleteContents();
                                        c.insertNode(l);
                                        if (CKEDITOR.env.needsBrFiller) {
                                            f.createText("﻿").insertAfter(l);
                                            q && l.getParent().appendBogus();
                                            l.getNext().$.nodeValue = "";
                                            c.setStartAt(l.getNext(), CKEDITOR.POSITION_AFTER_START)
                                        } else
                                            c.setStartAt(l, CKEDITOR.POSITION_AFTER_END)
                                    }
                                    c.collapse(true);
                                    c.select();
                                    c.scrollIntoView()
                                }
                            }
                        }};
                    var b = CKEDITOR.plugins.enterkey, f = b.enterBr, h = b.enterBlock, k = /^h[1-6]$/
                }(), function() {
            function d(d,
                    c) {
                var a = {}, b = [], f = {nbsp: " ", shy: "­", gt: ">", lt: "<", amp: "&", apos: "'", quot: '"'}, d = d.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(d, e) {
                    var g = c ? "&" + e + ";" : f[e];
                    a[g] = c ? f[e] : "&" + e + ";";
                    b.push(g);
                    return""
                });
                if (!c && d) {
                    var d = d.split(","), h = document.createElement("div"), k;
                    h.innerHTML = "&" + d.join(";&") + ";";
                    k = h.innerHTML;
                    h = null;
                    for (h = 0; h < k.length; h++) {
                        var g = k.charAt(h);
                        a[g] = "&" + d[h] + ";";
                        b.push(g)
                    }
                }
                a.regex = b.join(c ? "|" : "");
                return a
            }
            CKEDITOR.plugins.add("entities", {afterInit: function(e) {
                    var c = e.config;
                    if (e = (e = e.dataProcessor) && e.htmlFilter) {
                        var a = [];
                        c.basicEntities !== false && a.push("nbsp,gt,lt,amp");
                        if (c.entities) {
                            a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                            c.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml");
                            c.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                            c.entities_additional && a.push(c.entities_additional)
                        }
                        var b = d(a.join(",")), f = b.regex ? "[" + b.regex + "]" : "a^";
                        delete b.regex;
                        c.entities && c.entities_processNumerical && (f = "[^ -~]|" + f);
                        var f = RegExp(f, "g"), h = function(a) {
                            return c.entities_processNumerical == "force" || !b[a] ? "&#" + a.charCodeAt(0) + ";" : b[a]
                        }, k = d("nbsp,gt,lt,amp,shy", true), g = RegExp(k.regex, "g"), i = function(a) {
                            return k[a]
                        };
                        e.addRules({text: function(a) {
                                return a.replace(g, i).replace(f, h)
                            }}, {applyToAll: true, excludeNestedEditable: true})
                    }
                }})
        }(), CKEDITOR.config.basicEntities =
                !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {popup: function(d, e, c, a) {
                e = e || "80%";
                c = c || "70%";
                typeof e == "string" && (e.length > 1 && e.substr(e.length - 1, 1) == "%") && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10));
                typeof c == "string" && (c.length > 1 && c.substr(c.length - 1, 1) == "%") && (c = parseInt(window.screen.height * parseInt(c, 10) / 100, 10));
                e < 640 && (e = 640);
                c < 420 && (c = 420);
                var b = parseInt((window.screen.height - c) / 2, 10), f = parseInt((window.screen.width - e) / 2, 10), a = (a || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + e + ",height=" + c + ",top=" + b + ",left=" + f, h = window.open("", null, a, true);
                if (!h)
                    return false;
                try {
                    if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) {
                        h.moveTo(f, b);
                        h.resizeTo(e, c)
                    }
                    h.focus();
                    h.location.href = d
                } catch (k) {
                    window.open(d, null, a, true)
                }
                return true
            }}),
        function() {
            function d(a, b) {
                var c = [];
                if (b)
                    for (var d in b)
                        c.push(d + "=" + encodeURIComponent(b[d]));
                else
                    return a;
                return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&")
            }
            function e(a) {
                a = a + "";
                return a.charAt(0).toUpperCase() + a.substr(1)
            }
            function c() {
                var a = this.getDialog(), b = a.getParentEditor();
                b._.filebrowserSe = this;
                var c = b.config["filebrowser" + e(a.getName()) + "WindowWidth"] || b.config.filebrowserWindowWidth || "80%", a = b.config["filebrowser" + e(a.getName()) + "WindowHeight"] || b.config.filebrowserWindowHeight || "70%",
                        f = this.filebrowser.params || {};
                f.CKEditor = b.name;
                f.CKEditorFuncNum = b._.filebrowserFn;
                if (!f.langCode)
                    f.langCode = b.langCode;
                f = d(this.filebrowser.url, f);
                b.popup(f, c, a, b.config.filebrowserWindowFeatures || b.config.fileBrowserWindowFeatures)
            }
            function a() {
                var a = this.getDialog();
                a.getParentEditor()._.filebrowserSe = this;
                return!a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true
            }
            function b(a, b, c) {
                var f = c.params ||
                        {};
                f.CKEditor = a.name;
                f.CKEditorFuncNum = a._.filebrowserFn;
                if (!f.langCode)
                    f.langCode = a.langCode;
                b.action = d(c.url, f);
                b.filebrowser = c
            }
            function f(d, h, k, m) {
                if (m && m.length)
                    for (var n, q = m.length; q--; ) {
                        n = m[q];
                        (n.type == "hbox" || n.type == "vbox" || n.type == "fieldset") && f(d, h, k, n.children);
                        if (n.filebrowser) {
                            if (typeof n.filebrowser == "string")
                                n.filebrowser = {action: n.type == "fileButton" ? "QuickUpload" : "Browse", target: n.filebrowser};
                            if (n.filebrowser.action == "Browse") {
                                var o = n.filebrowser.url;
                                if (o === void 0) {
                                    o = d.config["filebrowser" +
                                            e(h) + "BrowseUrl"];
                                    if (o === void 0)
                                        o = d.config.filebrowserBrowseUrl
                                }
                                if (o) {
                                    n.onClick = c;
                                    n.filebrowser.url = o;
                                    n.hidden = false
                                }
                            } else if (n.filebrowser.action == "QuickUpload" && n["for"]) {
                                o = n.filebrowser.url;
                                if (o === void 0) {
                                    o = d.config["filebrowser" + e(h) + "UploadUrl"];
                                    if (o === void 0)
                                        o = d.config.filebrowserUploadUrl
                                }
                                if (o) {
                                    var l = n.onClick;
                                    n.onClick = function(b) {
                                        var c = b.sender;
                                        return l && l.call(c, b) === false ? false : a.call(c, b)
                                    };
                                    n.filebrowser.url = o;
                                    n.hidden = false;
                                    b(d, k.getContents(n["for"][0]).get(n["for"][1]), n.filebrowser)
                                }
                            }
                        }
                    }
            }
            function h(a, b, c) {
                if (c.indexOf(";") !== -1) {
                    for (var c = c.split(";"), d = 0; d < c.length; d++)
                        if (h(a, b, c[d]))
                            return true;
                    return false
                }
                return(a = a.getContents(b).get(c).filebrowser) && a.url
            }
            function k(a, b) {
                var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"], f = this._.filebrowserSe.filebrowser.onSelect;
                d && c.getContentElement(d[0], d[1]).reset();
                if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(f && f.call(this._.filebrowserSe, a, b) === false)) {
                    typeof b == "string" && b && alert(b);
                    if (a) {
                        d =
                                this._.filebrowserSe;
                        c = d.getDialog();
                        if (d = d.filebrowser.target || null) {
                            d = d.split(":");
                            if (f = c.getContentElement(d[0], d[1])) {
                                f.setValue(a);
                                c.selectPage(d[0])
                            }
                        }
                    }
                }
            }
            CKEDITOR.plugins.add("filebrowser", {requires: "popup", init: function(a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(k, a);
                    a.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                    })
                }});
            CKEDITOR.on("dialogDefinition", function(a) {
                if (a.editor.plugins.filebrowser)
                    for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)
                        if (c = b.contents[d]) {
                            f(a.editor,
                                    a.data.name, b, c.elements);
                            if (c.hidden && c.filebrowser)
                                c.hidden = !h(b, c.id, c.filebrowser)
                        }
            })
        }(), function() {
            function d(b) {
                var d = b.config, h = b.fire("uiSpace", {space: "top", html: ""}).html, k = function() {
                    function e(b, c, d) {
                        g.setStyle(c, a(d));
                        g.setStyle("position", b)
                    }
                    function h(a) {
                        var b = j.getDocumentPosition();
                        switch (a) {
                            case "top":
                                e("absolute", "top", b.y - s - v);
                                break;
                            case "pin":
                                e("fixed", "top", x);
                                break;
                            case "bottom":
                                e("absolute", "top", b.y + (r.height || r.bottom - r.top) + v)
                        }
                        i = a
                    }
                    var i, j, l, r, p, s, w, t = d.floatSpaceDockedOffsetX ||
                            0, v = d.floatSpaceDockedOffsetY || 0, z = d.floatSpacePinnedOffsetX || 0, x = d.floatSpacePinnedOffsetY || 0;
                    return function(d) {
                        if (j = b.editable()) {
                            d && d.name == "focus" && g.show();
                            g.removeStyle("left");
                            g.removeStyle("right");
                            l = g.getClientRect();
                            r = j.getClientRect();
                            p = c.getViewPaneSize();
                            s = l.height;
                            w = "pageXOffset"in c.$ ? c.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                            if (i) {
                                s + v <= r.top ? h("top") : s + v > p.height - r.bottom ? h("pin") : h("bottom");
                                var d = p.width / 2, d = r.left > 0 && r.right < p.width && r.width > l.width ? b.config.contentsLangDirection ==
                                        "rtl" ? "right" : "left" : d - r.left > r.right - d ? "left" : "right", f;
                                if (l.width > p.width) {
                                    d = "left";
                                    f = 0
                                } else {
                                    f = d == "left" ? r.left > 0 ? r.left : 0 : r.right < p.width ? p.width - r.right : 0;
                                    if (f + l.width > p.width) {
                                        d = d == "left" ? "right" : "left";
                                        f = 0
                                    }
                                }
                                g.setStyle(d, a((i == "pin" ? z : t) + f + (i == "pin" ? 0 : d == "left" ? w : -w)))
                            } else {
                                i = "pin";
                                h("pin");
                                k(d)
                            }
                        }
                    }
                }();
                if (h) {
                    var g = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(e.output({content: h, id: b.id, langDir: b.lang.dir, langCode: b.langCode, name: b.name, style: "display:none;z-index:" + (d.baseFloatZIndex -
                                1), topId: b.ui.spaceId("top"), voiceLabel: b.lang.editorPanel + ", " + b.name}))), i = CKEDITOR.tools.eventsBuffer(500, k), j = CKEDITOR.tools.eventsBuffer(100, k);
                    g.unselectable();
                    g.on("mousedown", function(a) {
                        a = a.data;
                        a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                    });
                    b.on("focus", function(a) {
                        k(a);
                        b.on("change", i.input);
                        c.on("scroll", j.input);
                        c.on("resize", j.input)
                    });
                    b.on("blur", function() {
                        g.hide();
                        b.removeListener("change", i.input);
                        c.removeListener("scroll", j.input);
                        c.removeListener("resize", j.input)
                    });
                    b.on("destroy",
                            function() {
                                c.removeListener("scroll", j.input);
                                c.removeListener("resize", j.input);
                                g.clearCustomData();
                                g.remove()
                            });
                    b.focusManager.hasFocus && g.show();
                    b.focusManager.add(g, 1)
                }
            }
            var e = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),
                    c = CKEDITOR.document.getWindow(), a = CKEDITOR.tools.cssLength;
            CKEDITOR.plugins.add("floatingspace", {init: function(a) {
                    a.on("loaded", function() {
                        d(this)
                    }, null, null, 20)
                }})
        }(), CKEDITOR.plugins.add("htmlwriter", {init: function(d) {
                var e = new CKEDITOR.htmlWriter;
                e.forceSimpleAmpersand = d.config.forceSimpleAmpersand;
                e.indentationChars = d.config.dataIndentationChars || "\t";
                d.dataProcessor.writer = e
            }}), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({base: CKEDITOR.htmlParser.basicWriter, $: function() {
                this.base();
                this.indentationChars =
                        "\t";
                this.selfClosingEnd = " />";
                this.lineBreakChars = "\n";
                this.sortAttributes = 1;
                this._.indent = 0;
                this._.indentation = "";
                this._.inPre = 0;
                this._.rules = {};
                var d = CKEDITOR.dtd, e;
                for (e in CKEDITOR.tools.extend({}, d.$nonBodyContent, d.$block, d.$listItem, d.$tableContent))
                    this.setRules(e, {indent: !d[e]["#"], breakBeforeOpen: 1, breakBeforeClose: !d[e]["#"], breakAfterClose: 1, needsSpace: e in d.$block && !(e in{li: 1, dt: 1, dd: 1})});
                this.setRules("br", {breakAfterOpen: 1});
                this.setRules("title", {indent: 0, breakAfterOpen: 0});
                this.setRules("style",
                        {indent: 0, breakBeforeClose: 1});
                this.setRules("pre", {breakAfterOpen: 1, indent: 0})
            }, proto: {openTag: function(d) {
                    var e = this._.rules[d];
                    this._.afterCloser && (e && e.needsSpace && this._.needsSpace) && this._.output.push("\n");
                    if (this._.indent)
                        this.indentation();
                    else if (e && e.breakBeforeOpen) {
                        this.lineBreak();
                        this.indentation()
                    }
                    this._.output.push("<", d);
                    this._.afterCloser = 0
                }, openTagClose: function(d, e) {
                    var c = this._.rules[d];
                    if (e) {
                        this._.output.push(this.selfClosingEnd);
                        if (c && c.breakAfterClose)
                            this._.needsSpace = c.needsSpace
                    } else {
                        this._.output.push(">");
                        if (c && c.indent)
                            this._.indentation = this._.indentation + this.indentationChars
                    }
                    c && c.breakAfterOpen && this.lineBreak();
                    d == "pre" && (this._.inPre = 1)
                }, attribute: function(d, e) {
                    if (typeof e == "string") {
                        this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "&"));
                        e = CKEDITOR.tools.htmlEncodeAttr(e)
                    }
                    this._.output.push(" ", d, '="', e, '"')
                }, closeTag: function(d) {
                    var e = this._.rules[d];
                    if (e && e.indent)
                        this._.indentation = this._.indentation.substr(this.indentationChars.length);
                    if (this._.indent)
                        this.indentation();
                    else if (e && e.breakBeforeClose) {
                        this.lineBreak();
                        this.indentation()
                    }
                    this._.output.push("</", d, ">");
                    d == "pre" && (this._.inPre = 0);
                    if (e && e.breakAfterClose) {
                        this.lineBreak();
                        this._.needsSpace = e.needsSpace
                    }
                    this._.afterCloser = 1
                }, text: function(d) {
                    if (this._.indent) {
                        this.indentation();
                        !this._.inPre && (d = CKEDITOR.tools.ltrim(d))
                    }
                    this._.output.push(d)
                }, comment: function(d) {
                    this._.indent && this.indentation();
                    this._.output.push("<\!--", d, "--\>")
                }, lineBreak: function() {
                    !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars);
                    this._.indent = 1
                },
                indentation: function() {
                    !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                    this._.indent = 0
                }, reset: function() {
                    this._.output = [];
                    this._.indent = 0;
                    this._.indentation = "";
                    this._.afterCloser = 0;
                    this._.inPre = 0
                }, setRules: function(d, e) {
                    var c = this._.rules[d];
                    c ? CKEDITOR.tools.extend(c, e, true) : this._.rules[d] = e
                }}}), function() {
            function d(c, a) {
                a || (a = c.getSelection().getSelectedElement());
                if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly())
                    return a
            }
            function e(c) {
                var a = c.getStyle("float");
                if (a == "inherit" || a == "none")
                    a = 0;
                a || (a = c.getAttribute("align"));
                return a
            }
            CKEDITOR.plugins.add("image", {requires: "dialog", init: function(c) {
                    if (!c.plugins.image2) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                        var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                        CKEDITOR.dialog.isTabEnabled(c, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                        c.addCommand("image", new CKEDITOR.dialogCommand("image",
                                {allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]]}));
                        c.ui.addButton && c.ui.addButton("Image", {label: c.lang.common.image, command: "image", toolbar: "insert,10"});
                        c.on("doubleclick", function(a) {
                            var c = a.data.element;
                            if (c.is("img") && !c.data("cke-realelement") && !c.isReadOnly())
                                a.data.dialog = "image"
                        });
                        c.addMenuItems && c.addMenuItems({image: {label: c.lang.image.menu,
                                command: "image", group: "image"}});
                        c.contextMenu && c.contextMenu.addListener(function(a) {
                            if (d(c, a))
                                return{image: CKEDITOR.TRISTATE_OFF}
                        })
                    }
                }, afterInit: function(c) {
                    function a(a) {
                        var f = c.getCommand("justify" + a);
                        if (f) {
                            if (a == "left" || a == "right")
                                f.on("exec", function(f) {
                                    var k = d(c), g;
                                    if (k) {
                                        g = e(k);
                                        if (g == a) {
                                            k.removeStyle("float");
                                            a == e(k) && k.removeAttribute("align")
                                        } else
                                            k.setStyle("float", a);
                                        f.cancel()
                                    }
                                });
                            f.on("refresh", function(f) {
                                var k = d(c);
                                if (k) {
                                    k = e(k);
                                    this.setState(k == a ? CKEDITOR.TRISTATE_ON : a == "right" || a == "left" ?
                                            CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    f.cancel()
                                }
                            })
                        }
                    }
                    if (!c.plugins.image2) {
                        a("left");
                        a("right");
                        a("center");
                        a("block")
                    }
                }})
        }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function() {
            function d(a, b) {
                var b = b === void 0 || b, c;
                if (b)
                    c = a.getComputedStyle("text-align");
                else {
                    for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align"); ) {
                        c = a.getParent();
                        if (!c)
                            break;
                        a = c
                    }
                    c = a.getStyle("text-align") || a.getAttribute("align") || ""
                }
                c && (c = c.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
                !c && b && (c = a.getComputedStyle("direction") == "rtl" ? "right" : "left");
                return c
            }
            function e(a, b, c) {
                this.editor = a;
                this.name = b;
                this.value = c;
                this.context = "p";
                var b = a.config.justifyClasses, d = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
                if (b) {
                    switch (c) {
                        case "left":
                            this.cssClassName = b[0];
                            break;
                        case "center":
                            this.cssClassName = b[1];
                            break;
                        case "right":
                            this.cssClassName = b[2];
                            break;
                        case "justify":
                            this.cssClassName = b[3]
                    }
                    this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?=$|\\s)");
                    this.requiredContent = d + "(" +
                            this.cssClassName + ")"
                } else
                    this.requiredContent = d + "{text-align}";
                this.allowedContent = {"caption div h1 h2 h3 h4 h5 h6 p pre td th li": {propertiesOnly: true, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null}};
                if (a.config.enterMode == CKEDITOR.ENTER_BR)
                    this.allowedContent.div = true
            }
            function c(a) {
                var b = a.editor, c = b.createRange();
                c.setStartBefore(a.data.node);
                c.setEndAfter(a.data.node);
                for (var d = new CKEDITOR.dom.walker(c), e; e = d.next(); )
                    if (e.type == CKEDITOR.NODE_ELEMENT)
                        if (!e.equals(a.data.node) &&
                                e.getDirection()) {
                            c.setStartAfter(e);
                            d = new CKEDITOR.dom.walker(c)
                        } else {
                            var g = b.config.justifyClasses;
                            if (g)
                                if (e.hasClass(g[0])) {
                                    e.removeClass(g[0]);
                                    e.addClass(g[2])
                                } else if (e.hasClass(g[2])) {
                                    e.removeClass(g[2]);
                                    e.addClass(g[0])
                                }
                            g = e.getStyle("text-align");
                            g == "left" ? e.setStyle("text-align", "right") : g == "right" && e.setStyle("text-align", "left")
                        }
            }
            e.prototype = {exec: function(a) {
                    var b = a.getSelection(), c = a.config.enterMode;
                    if (b) {
                        for (var e = b.createBookmarks(), k = b.getRanges(), g = this.cssClassName, i, j, m = a.config.useComputedState,
                                m = m === void 0 || m, n = k.length - 1; n >= 0; n--) {
                            i = k[n].createIterator();
                            for (i.enlargeBr = c != CKEDITOR.ENTER_BR; j = i.getNextParagraph(c == CKEDITOR.ENTER_P?"p":"div"); )
                                if (!j.isReadOnly()) {
                                    j.removeAttribute("align");
                                    j.removeStyle("text-align");
                                    var q = g && (j.$.className = CKEDITOR.tools.ltrim(j.$.className.replace(this.cssClassRegex, ""))), o = this.state == CKEDITOR.TRISTATE_OFF && (!m || d(j, true) != this.value);
                                    g ? o ? j.addClass(g) : q || j.removeAttribute("class") : o && j.setStyle("text-align", this.value)
                                }
                        }
                        a.focus();
                        a.forceNextSelectionCheck();
                        b.selectBookmarks(e)
                    }
                }, refresh: function(a, b) {
                    var c = b.block || b.blockLimit;
                    this.setState(c.getName() != "body" && d(c, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                }};
            CKEDITOR.plugins.add("justify", {init: function(a) {
                    if (!a.blockless) {
                        var b = new e(a, "justifyleft", "left"), d = new e(a, "justifycenter", "center"), h = new e(a, "justifyright", "right"), k = new e(a, "justifyblock", "justify");
                        a.addCommand("justifyleft", b);
                        a.addCommand("justifycenter", d);
                        a.addCommand("justifyright",
                                h);
                        a.addCommand("justifyblock", k);
                        if (a.ui.addButton) {
                            a.ui.addButton("JustifyLeft", {label: a.lang.justify.left, command: "justifyleft", toolbar: "align,10"});
                            a.ui.addButton("JustifyCenter", {label: a.lang.justify.center, command: "justifycenter", toolbar: "align,20"});
                            a.ui.addButton("JustifyRight", {label: a.lang.justify.right, command: "justifyright", toolbar: "align,30"});
                            a.ui.addButton("JustifyBlock", {label: a.lang.justify.block, command: "justifyblock", toolbar: "align,40"})
                        }
                        a.on("dirChanged", c)
                    }
                }})
        }(), function() {
            function d(b,
                    c) {
                var d = a.exec(b), f = a.exec(c);
                if (d) {
                    if (!d[2] && f[2] == "px")
                        return f[1];
                    if (d[2] == "px" && !f[2])
                        return f[1] + "px"
                }
                return c
            }
            var e = CKEDITOR.htmlParser.cssStyle, c = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, b = {elements: {$: function(a) {
                        var b = a.attributes;
                        if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                            var c = (new e(a)).rules, a = b.attributes, f = c.width, c = c.height;
                            f && (a.width = d(a.width,
                                    f));
                            c && (a.height = d(a.height, c))
                        }
                        return b
                    }}}, f = CKEDITOR.plugins.add("fakeobjects", {init: function(a) {
                    a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
                }, afterInit: function(a) {
                    (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(b)
                }});
            CKEDITOR.editor.prototype.createFakeElement = function(a, b, d, i) {
                var j = this.lang.fakeobjects, j = j[d] || j.unknown, b = {"class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: j, title: j, align: a.getAttribute("align") ||
                            ""};
                if (!CKEDITOR.env.hc)
                    b.src = CKEDITOR.getUrl(f.path + "images/spacer.gif");
                d && (b["data-cke-real-element-type"] = d);
                if (i) {
                    b["data-cke-resizable"] = i;
                    d = new e;
                    i = a.getAttribute("width");
                    a = a.getAttribute("height");
                    i && (d.rules.width = c(i));
                    a && (d.rules.height = c(a));
                    d.populate(b)
                }
                return this.document.createElement("img", {attributes: b})
            };
            CKEDITOR.editor.prototype.createFakeParserElement = function(a, b, d, i) {
                var j = this.lang.fakeobjects, j = j[d] || j.unknown, m;
                m = new CKEDITOR.htmlParser.basicWriter;
                a.writeHtml(m);
                m = m.getHtml();
                b = {"class": b, "data-cke-realelement": encodeURIComponent(m), "data-cke-real-node-type": a.type, alt: j, title: j, align: a.attributes.align || ""};
                if (!CKEDITOR.env.hc)
                    b.src = CKEDITOR.getUrl(f.path + "images/spacer.gif");
                d && (b["data-cke-real-element-type"] = d);
                if (i) {
                    b["data-cke-resizable"] = i;
                    i = a.attributes;
                    a = new e;
                    d = i.width;
                    i = i.height;
                    d != void 0 && (a.rules.width = c(d));
                    i != void 0 && (a.rules.height = c(i));
                    a.populate(b)
                }
                return new CKEDITOR.htmlParser.element("img", b)
            };
            CKEDITOR.editor.prototype.restoreRealElement = function(a) {
                if (a.data("cke-real-node-type") !=
                        CKEDITOR.NODE_ELEMENT)
                    return null;
                var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
                if (a.data("cke-resizable")) {
                    var c = a.getStyle("width"), a = a.getStyle("height");
                    c && b.setAttribute("width", d(b.getAttribute("width"), c));
                    a && b.setAttribute("height", d(b.getAttribute("height"), a))
                }
                return b
            }
        }(), CKEDITOR.plugins.add("link", {requires: "dialog,fakeobjects", onLoad: function() {
                function d(a) {
                    return c.replace(/%1/g, a == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" +
                            a)
                }
                var e = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + e + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.plugins.link.synAnchorSelector ? "a.cke_anchor_empty{display:inline-block;" + (CKEDITOR.env.ie && CKEDITOR.env.version > 10 ? "min-height:16px;vertical-align:middle" : "") + "}" : "") +
                        ".%2 img.cke_anchor{" + e + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
                CKEDITOR.addCss(d("ltr") + d("rtl"))
            }, init: function(d) {
                var e = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(d, "link", "advanced") && (e = e.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
                CKEDITOR.dialog.isTabEnabled(d, "link", "target") && (e = e.replace("]", ",target,onclick]"));
                d.addCommand("link", new CKEDITOR.dialogCommand("link", {allowedContent: e, requiredContent: "a[href]"}));
                d.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {allowedContent: "a[!name,id]", requiredContent: "a[name]"}));
                d.addCommand("unlink", new CKEDITOR.unlinkCommand);
                d.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                d.setKeystroke(CKEDITOR.CTRL + 76, "link");
                if (d.ui.addButton) {
                    d.ui.addButton("Link", {label: d.lang.link.toolbar, command: "link", toolbar: "links,10"});
                    d.ui.addButton("Unlink", {label: d.lang.link.unlink, command: "unlink", toolbar: "links,20"});
                    d.ui.addButton("Anchor", {label: d.lang.link.anchor.toolbar,
                        command: "anchor", toolbar: "links,30"})
                }
                CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                d.on("doubleclick", function(c) {
                    var a = CKEDITOR.plugins.link.getSelectedLink(d) || c.data.element;
                    if (!a.isReadOnly())
                        if (a.is("a")) {
                            c.data.dialog = a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()) ? "anchor" : "link";
                            d.getSelection().selectElement(a)
                        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a))
                            c.data.dialog = "anchor"
                });
                d.addMenuItems &&
                        d.addMenuItems({anchor: {label: d.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1}, removeAnchor: {label: d.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5}, link: {label: d.lang.link.menu, command: "link", group: "link", order: 1}, unlink: {label: d.lang.link.unlink, command: "unlink", group: "link", order: 5}});
                d.contextMenu && d.contextMenu.addListener(function(c) {
                    if (!c || c.isReadOnly())
                        return null;
                    c = CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, c);
                    if (!c && !(c = CKEDITOR.plugins.link.getSelectedLink(d)))
                        return null;
                    var a = {};
                    c.getAttribute("href") && c.getChildCount() && (a = {link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF});
                    if (c && c.hasAttribute("name"))
                        a.anchor = a.removeAnchor = CKEDITOR.TRISTATE_OFF;
                    return a
                })
            }, afterInit: function(d) {
                var e = d.dataProcessor, c = e && e.dataFilter, e = e && e.htmlFilter, a = d._.elementsPath && d._.elementsPath.filters;
                c && c.addRules({elements: {a: function(a) {
                            var c = a.attributes;
                            if (!c.name)
                                return null;
                            var e = !a.children.length;
                            if (CKEDITOR.plugins.link.synAnchorSelector) {
                                var a = e ? "cke_anchor_empty" :
                                        "cke_anchor", k = c["class"];
                                if (c.name && (!k || k.indexOf(a) < 0))
                                    c["class"] = (k || "") + " " + a;
                                if (e && CKEDITOR.plugins.link.emptyAnchorFix) {
                                    c.contenteditable = "false";
                                    c["data-cke-editable"] = 1
                                }
                            } else if (CKEDITOR.plugins.link.fakeAnchor && e)
                                return d.createFakeParserElement(a, "cke_anchor", "anchor");
                            return null
                        }}});
                CKEDITOR.plugins.link.emptyAnchorFix && e && e.addRules({elements: {a: function(a) {
                            delete a.attributes.contenteditable
                        }}});
                a && a.push(function(a, c) {
                    if (c == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) || a.getAttribute("name") &&
                            (!a.getAttribute("href") || !a.getChildCount())))
                        return"anchor"
                })
            }}), CKEDITOR.plugins.link = {getSelectedLink: function(d) {
                var e = d.getSelection(), c = e.getSelectedElement();
                if (c && c.is("a"))
                    return c;
                if (e = e.getRanges()[0]) {
                    e.shrink(CKEDITOR.SHRINK_TEXT);
                    return d.elementPath(e.getCommonAncestor()).contains("a", 1)
                }
                return null
            }, getEditorAnchors: function(d) {
                for (var e = d.editable(), c = e.isInline() && !d.plugins.divarea ? d.document : e, a = c.getElementsByTag("a"), e = [], b = 0, f; f = a.getItem(b++); )
                    if (f.data("cke-saved-name") ||
                            f.hasAttribute("name"))
                        e.push({name: f.data("cke-saved-name") || f.getAttribute("name"), id: f.getAttribute("id")});
                if (this.fakeAnchor) {
                    c = c.getElementsByTag("img");
                    for (b = 0; f = c.getItem(b++); )
                        (f = this.tryRestoreFakeAnchor(d, f)) && e.push({name: f.getAttribute("name"), id: f.getAttribute("id")})
                }
                return e
            }, fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit, synAnchorSelector: CKEDITOR.env.ie, emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version, tryRestoreFakeAnchor: function(d, e) {
                if (e && e.data("cke-real-element-type") &&
                        e.data("cke-real-element-type") == "anchor") {
                    var c = d.restoreRealElement(e);
                    if (c.data("cke-saved-name"))
                        return c
                }
            }}, CKEDITOR.unlinkCommand = function() {
        }, CKEDITOR.unlinkCommand.prototype = {exec: function(d) {
                var e = new CKEDITOR.style({element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1});
                d.removeStyle(e)
            }, refresh: function(d, e) {
                var c = e.lastElement && e.lastElement.getAscendant("a", true);
                c && c.getName() == "a" && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]"}, CKEDITOR.removeAnchorCommand = function() {
        }, CKEDITOR.removeAnchorCommand.prototype = {exec: function(d) {
                var e = d.getSelection(), c = e.createBookmarks(), a;
                if (e && (a = e.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !a.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) : a.is("a")))
                    a.remove(1);
                else if (a = CKEDITOR.plugins.link.getSelectedLink(d))
                    if (a.hasAttribute("href")) {
                        a.removeAttributes({name: 1, "data-cke-saved-name": 1});
                        a.removeClass("cke_anchor")
                    } else
                        a.remove(1);
                e.selectBookmarks(c)
            }, requiredContent: "a[name]"}, CKEDITOR.tools.extend(CKEDITOR.config, {linkShowAdvancedTab: !0, linkShowTargetTab: !0}), function() {
            function d(a) {
                if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form")
                    return[];
                for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
                    var e = a.$.elements.namedItem(c[d]);
                    if (e) {
                        e = new CKEDITOR.dom.element(e);
                        b.push([e, e.nextSibling]);
                        e.remove()
                    }
                }
                return b
            }
            function e(a, b) {
                if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") && b.length > 0)
                    for (var c = b.length -
                            1; c >= 0; c--) {
                        var d = b[c][0], e = b[c][1];
                        e ? d.insertBefore(e) : d.appendTo(a)
                    }
            }
            function c(a, b) {
                var c = d(a), g = {}, i = a.$;
                if (!b) {
                    g["class"] = i.className || "";
                    i.className = ""
                }
                g.inline = i.style.cssText || "";
                if (!b)
                    i.style.cssText = "position: static; overflow: visible";
                e(c);
                return g
            }
            function a(a, b) {
                var c = d(a), g = a.$;
                if ("class"in b)
                    g.className = b["class"];
                if ("inline"in b)
                    g.style.cssText = b.inline;
                e(c)
            }
            function b(a) {
                if (!a.editable().isInline()) {
                    var b = CKEDITOR.instances, c;
                    for (c in b) {
                        var d = b[c];
                        if (d.mode == "wysiwyg" && !d.readOnly) {
                            d =
                                    d.document.getBody();
                            d.setAttribute("contentEditable", false);
                            d.setAttribute("contentEditable", true)
                        }
                    }
                    if (a.editable().hasFocus) {
                        a.toolbox.focus();
                        a.focus()
                    }
                }
            }
            CKEDITOR.plugins.add("maximize", {init: function(d) {
                    function e() {
                        var a = i.getViewPaneSize();
                        d.resize(a.width, a.height, null, true)
                    }
                    if (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var k = d.lang, g = CKEDITOR.document, i = g.getWindow(), j, m, n, q = CKEDITOR.TRISTATE_OFF;
                        d.addCommand("maximize", {modes: {wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS}, readOnly: 1,
                            editorFocus: false, exec: function() {
                                var o = d.container.getChild(1), l = d.ui.space("contents");
                                if (d.mode == "wysiwyg") {
                                    var r = d.getSelection();
                                    j = r && r.getRanges();
                                    m = i.getScrollPosition()
                                } else {
                                    var p = d.editable().$;
                                    j = !CKEDITOR.env.ie && [p.selectionStart, p.selectionEnd];
                                    m = [p.scrollLeft, p.scrollTop]
                                }
                                if (this.state == CKEDITOR.TRISTATE_OFF) {
                                    i.on("resize", e);
                                    n = i.getScrollPosition();
                                    for (r = d.container; r = r.getParent(); ) {
                                        r.setCustomData("maximize_saved_styles", c(r));
                                        r.setStyle("z-index", d.config.baseFloatZIndex - 5)
                                    }
                                    l.setCustomData("maximize_saved_styles",
                                            c(l, true));
                                    o.setCustomData("maximize_saved_styles", c(o, true));
                                    l = {overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0};
                                    g.getDocumentElement().setStyles(l);
                                    !CKEDITOR.env.gecko && g.getDocumentElement().setStyle("position", "fixed");
                                    (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && g.getBody().setStyles(l);
                                    CKEDITOR.env.ie ? setTimeout(function() {
                                        i.$.scrollTo(0, 0)
                                    }, 0) : i.$.scrollTo(0, 0);
                                    o.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                    o.$.offsetLeft;
                                    o.setStyles({"z-index": d.config.baseFloatZIndex -
                                        5, left: "0px", top: "0px"});
                                    o.addClass("cke_maximized");
                                    e();
                                    l = o.getDocumentPosition();
                                    o.setStyles({left: -1 * l.x + "px", top: -1 * l.y + "px"});
                                    CKEDITOR.env.gecko && b(d)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    i.removeListener("resize", e);
                                    l = [l, o];
                                    for (r = 0; r < l.length; r++) {
                                        a(l[r], l[r].getCustomData("maximize_saved_styles"));
                                        l[r].removeCustomData("maximize_saved_styles")
                                    }
                                    for (r = d.container; r = r.getParent(); ) {
                                        a(r, r.getCustomData("maximize_saved_styles"));
                                        r.removeCustomData("maximize_saved_styles")
                                    }
                                    CKEDITOR.env.ie ? setTimeout(function() {
                                        i.$.scrollTo(n.x,
                                                n.y)
                                    }, 0) : i.$.scrollTo(n.x, n.y);
                                    o.removeClass("cke_maximized");
                                    if (CKEDITOR.env.webkit) {
                                        o.setStyle("display", "inline");
                                        setTimeout(function() {
                                            o.setStyle("display", "block")
                                        }, 0)
                                    }
                                    d.fire("resize")
                                }
                                this.toggleState();
                                if (r = this.uiItems[0]) {
                                    l = this.state == CKEDITOR.TRISTATE_OFF ? k.maximize.maximize : k.maximize.minimize;
                                    r = CKEDITOR.document.getById(r._.id);
                                    r.getChild(1).setHtml(l);
                                    r.setAttribute("title", l);
                                    r.setAttribute("href", 'javascript:void("' + l + '");')
                                }
                                if (d.mode == "wysiwyg")
                                    if (j) {
                                        CKEDITOR.env.gecko && b(d);
                                        d.getSelection().selectRanges(j);
                                        (p = d.getSelection().getStartElement()) && p.scrollIntoView(true)
                                    } else
                                        i.$.scrollTo(m.x, m.y);
                                else {
                                    if (j) {
                                        p.selectionStart = j[0];
                                        p.selectionEnd = j[1]
                                    }
                                    p.scrollLeft = m[0];
                                    p.scrollTop = m[1]
                                }
                                j = m = null;
                                q = this.state;
                                d.fire("maximize", this.state)
                            }, canUndo: false});
                        d.ui.addButton && d.ui.addButton("Maximize", {label: k.maximize.maximize, command: "maximize", toolbar: "tools,10"});
                        d.on("mode", function() {
                            var a = d.getCommand("maximize");
                            a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q)
                        }, null, null, 100)
                    }
                }})
        }(),
                function() {
                    var d, e = {modes: {wysiwyg: 1, source: 1}, canUndo: false, readOnly: 1, exec: function(c) {
                            var a, b = c.config, e = b.baseHref ? '<base href="' + b.baseHref + '"/>' : "";
                            if (b.fullPage)
                                a = c.getData().replace(/<head>/, "$&" + e).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + c.lang.preview.preview);
                            else {
                                var b = "<body ", h = c.document && c.document.getBody();
                                if (h) {
                                    h.getAttribute("id") && (b = b + ('id="' + h.getAttribute("id") + '" '));
                                    h.getAttribute("class") && (b = b + ('class="' + h.getAttribute("class") + '" '))
                                }
                                a = c.config.docType + '<html dir="' +
                                        c.config.contentsLangDirection + '"><head>' + e + "<title>" + c.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss) + "</head>" + (b + ">") + c.getData() + "</body></html>"
                            }
                            e = 640;
                            b = 420;
                            h = 80;
                            try {
                                var k = window.screen, e = Math.round(k.width * 0.8), b = Math.round(k.height * 0.7), h = Math.round(k.width * 0.1)
                            } catch (g) {
                            }
                            if (c.fire("contentPreview", c = {dataValue: a}) === false)
                                return false;
                            var k = "", i;
                            if (CKEDITOR.env.ie) {
                                window._cke_htmlToLoad = c.dataValue;
                                i = "javascript:void( (function(){document.open();" + ("(" +
                                        CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )";
                                k = ""
                            }
                            if (CKEDITOR.env.gecko) {
                                window._cke_htmlToLoad = c.dataValue;
                                k = d + "preview.html"
                            }
                            k = window.open(k, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + e + ",height=" + b + ",left=" + h);
                            if (CKEDITOR.env.ie)
                                k.location = i;
                            if (!CKEDITOR.env.ie && !CKEDITOR.env.gecko) {
                                i = k.document;
                                i.open();
                                i.write(c.dataValue);
                                i.close()
                            }
                            return true
                        }};
                    CKEDITOR.plugins.add("preview", {init: function(c) {
                            if (c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                d = this.path;
                                c.addCommand("preview", e);
                                c.ui.addButton && c.ui.addButton("Preview", {label: c.lang.preview.preview, command: "preview", toolbar: "document,40"})
                            }
                        }})
                }(), CKEDITOR.plugins.add("resize", {init: function(d) {
                var e, c, a, b, f = d.config, h = d.ui.spaceId("resizer"), k = d.element ? d.element.getDirection(1) : "ltr";
                !f.resize_dir && (f.resize_dir = "vertical");
                f.resize_maxWidth ==
                        void 0 && (f.resize_maxWidth = 3E3);
                f.resize_maxHeight == void 0 && (f.resize_maxHeight = 3E3);
                f.resize_minWidth == void 0 && (f.resize_minWidth = 750);
                f.resize_minHeight == void 0 && (f.resize_minHeight = 250);
                if (f.resize_enabled !== false) {
                    var g = null, i = (f.resize_dir == "both" || f.resize_dir == "horizontal") && f.resize_minWidth != f.resize_maxWidth, j = (f.resize_dir == "both" || f.resize_dir == "vertical") && f.resize_minHeight != f.resize_maxHeight, m = function(g) {
                        var h = e, m = c, n = h + (g.data.$.screenX - a) * (k == "rtl" ? -1 : 1), g = m + (g.data.$.screenY - b);
                        i && (h = Math.max(f.resize_minWidth, Math.min(n, f.resize_maxWidth)));
                        j && (m = Math.max(f.resize_minHeight, Math.min(g, f.resize_maxHeight)));
                        d.resize(i ? h : null, m)
                    }, n = function() {
                        CKEDITOR.document.removeListener("mousemove", m);
                        CKEDITOR.document.removeListener("mouseup", n);
                        if (d.document) {
                            d.document.removeListener("mousemove", m);
                            d.document.removeListener("mouseup", n)
                        }
                    }, q = CKEDITOR.tools.addFunction(function(h) {
                        g || (g = d.getResizable());
                        e = g.$.offsetWidth || 0;
                        c = g.$.offsetHeight || 0;
                        a = h.screenX;
                        b = h.screenY;
                        f.resize_minWidth >
                                e && (f.resize_minWidth = e);
                        f.resize_minHeight > c && (f.resize_minHeight = c);
                        CKEDITOR.document.on("mousemove", m);
                        CKEDITOR.document.on("mouseup", n);
                        if (d.document) {
                            d.document.on("mousemove", m);
                            d.document.on("mouseup", n)
                        }
                        h.preventDefault && h.preventDefault()
                    });
                    d.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(q)
                    });
                    d.on("uiSpace", function(a) {
                        if (a.data.space == "bottom") {
                            var b = "";
                            i && !j && (b = " cke_resizer_horizontal");
                            !i && j && (b = " cke_resizer_vertical");
                            var c = '<span id="' + h + '" class="cke_resizer' + b + " cke_resizer_" +
                                    k + '" title="' + CKEDITOR.tools.htmlEncode(d.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + q + ', event)">' + (k == "ltr" ? "◢" : "◣") + "</span>";
                            k == "ltr" && b == "ltr" ? a.data.html = a.data.html + c : a.data.html = c + a.data.html
                        }
                    }, d, null, 100);
                    d.on("maximize", function(a) {
                        d.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                    })
                }
            }}), function() {
            CKEDITOR.plugins.add("selectall", {init: function(d) {
                    d.addCommand("selectAll", {modes: {wysiwyg: 1, source: 1}, exec: function(d) {
                            var c = d.editable();
                            if (c.is("textarea")) {
                                d =
                                        c.$;
                                if (CKEDITOR.env.ie)
                                    d.createTextRange().execCommand("SelectAll");
                                else {
                                    d.selectionStart = 0;
                                    d.selectionEnd = d.value.length
                                }
                                d.focus()
                            } else {
                                if (c.is("body"))
                                    d.document.$.execCommand("SelectAll", false, null);
                                else {
                                    var a = d.createRange();
                                    a.selectNodeContents(c);
                                    a.select()
                                }
                                d.forceNextSelectionCheck();
                                d.selectionChange()
                            }
                        }, canUndo: false});
                    d.ui.addButton && d.ui.addButton("SelectAll", {label: d.lang.selectall.toolbar, command: "selectAll", toolbar: "selection,10"})
                }})
        }(), function() {
            CKEDITOR.plugins.add("sourcearea",
                    {init: function(e) {
                            function c() {
                                this.hide();
                                this.setStyle("height", this.getParent().$.clientHeight + "px");
                                this.setStyle("width", this.getParent().$.clientWidth + "px");
                                this.show()
                            }
                            if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var a = CKEDITOR.plugins.sourcearea;
                                e.addMode("source", function(a) {
                                    var f = e.ui.space("contents").getDocument().createElement("textarea");
                                    f.setStyles(CKEDITOR.tools.extend({width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left"}, CKEDITOR.tools.cssVendorPrefix("tab-size",
                                            e.config.sourceAreaTabSize || 4)));
                                    f.setAttribute("dir", "ltr");
                                    f.addClass("cke_source cke_reset cke_enable_context_menu");
                                    e.ui.space("contents").append(f);
                                    f = e.editable(new d(e, f));
                                    f.setData(e.getData(1));
                                    if (CKEDITOR.env.ie) {
                                        f.attachListener(e, "resize", c, f);
                                        f.attachListener(CKEDITOR.document.getWindow(), "resize", c, f);
                                        CKEDITOR.tools.setTimeout(c, 0, f)
                                    }
                                    e.fire("ariaWidget", this);
                                    a()
                                });
                                e.addCommand("source", a.commands.source);
                                e.ui.addButton && e.ui.addButton("Source", {label: e.lang.sourcearea.toolbar, command: "source",
                                    toolbar: "mode,10"});
                                e.on("mode", function() {
                                    e.getCommand("source").setState(e.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                                })
                            }
                        }});
            var d = CKEDITOR.tools.createClass({base: CKEDITOR.editable, proto: {setData: function(d) {
                        this.setValue(d);
                        this.editor.fire("dataReady")
                    }, getData: function() {
                        return this.getValue()
                    }, insertHtml: function() {
                    }, insertElement: function() {
                    }, insertText: function() {
                    }, setReadOnly: function(d) {
                        this[(d ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
                    }, detach: function() {
                        d.baseProto.detach.call(this);
                        this.clearCustomData();
                        this.remove()
                    }}})
        }(), CKEDITOR.plugins.sourcearea = {commands: {source: {modes: {wysiwyg: 1, source: 1}, editorFocus: !1, readOnly: 1, exec: function(d) {
                        d.mode == "wysiwyg" && d.fire("saveSnapshot");
                        d.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                        d.setMode(d.mode == "source" ? "wysiwyg" : "source")
                    }, canUndo: !1}}}, function() {
            var d = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") +
                    ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)
                d = d + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (d = d + ' onblur="this.style.cssText = this.style.cssText;"');
            var d = d + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' +
                    (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'), d = d + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', e = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"), c = CKEDITOR.addTemplate("button", d);
            CKEDITOR.plugins.add("button",
                    {beforeInit: function(a) {
                            a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
                        }});
            CKEDITOR.UI_BUTTON = "button";
            CKEDITOR.ui.button = function(a) {
                CKEDITOR.tools.extend(this, a, {title: a.label, click: a.click || function(b) {
                        b.execCommand(a.command)
                    }});
                this._ = {}
            };
            CKEDITOR.ui.button.handler = {create: function(a) {
                    return new CKEDITOR.ui.button(a)
                }};
            CKEDITOR.ui.button.prototype = {render: function(a, b) {
                    var d = CKEDITOR.env, h = this._.id = CKEDITOR.tools.getNextId(), k = "", g = this.command, i;
                    this._.editor = a;
                    var j = {id: h, button: this,
                        editor: a, focus: function() {
                            CKEDITOR.document.getById(h).focus()
                        }, execute: function() {
                            this.button.click(a)
                        }, attach: function(a) {
                            this.button.attach(a)
                        }}, m = CKEDITOR.tools.addFunction(function(a) {
                        if (j.onkey) {
                            a = new CKEDITOR.dom.event(a);
                            return j.onkey(j, a.getKeystroke()) !== false
                        }
                    }), n = CKEDITOR.tools.addFunction(function(a) {
                        var b;
                        j.onfocus && (b = j.onfocus(j, new CKEDITOR.dom.event(a)) !== false);
                        CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble();
                        return b
                    }), q = 0, o = CKEDITOR.tools.addFunction(function() {
                        if (CKEDITOR.env.opera) {
                            var b =
                                    a.editable();
                            if (b.isInline() && b.hasFocus) {
                                a.lockSelection();
                                q = 1
                            }
                        }
                    });
                    j.clickFn = i = CKEDITOR.tools.addFunction(function() {
                        if (q) {
                            a.unlockSelection(1);
                            q = 0
                        }
                        j.execute()
                    });
                    if (this.modes) {
                        var l = {}, r = function() {
                            var b = a.mode;
                            if (b) {
                                b = this.modes[b] ? l[b] != void 0 ? l[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                                b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b;
                                this.setState(b);
                                this.refresh && this.refresh()
                            }
                        };
                        a.on("beforeModeUnload", function() {
                            if (a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED)
                                l[a.mode] =
                                        this._.state
                        }, this);
                        a.on("activeFilterChange", r, this);
                        a.on("mode", r, this);
                        !this.readOnly && a.on("readOnly", r, this)
                    } else if (g)
                        if (g = a.getCommand(g)) {
                            g.on("state", function() {
                                this.setState(g.state)
                            }, this);
                            k = k + (g.state == CKEDITOR.TRISTATE_ON ? "on" : g.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off")
                        }
                    if (this.directional)
                        a.on("contentDirChanged", function(b) {
                            var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), b = b.data;
                            b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                            d.setAttribute("style", CKEDITOR.skin.getIconStyle(p, b == "rtl", this.icon, this.iconOffset))
                        }, this);
                    g || (k = k + "off");
                    var p = r = this.name || this.command;
                    if (this.icon && !/\./.test(this.icon)) {
                        p = this.icon;
                        this.icon = null
                    }
                    d = {id: h, name: r, iconName: p, label: this.label, cls: this.className || "", state: k, ariaDisabled: k == "disabled" ? "true" : "false", title: this.title, titleJs: d.gecko && d.version >= 10900 && !d.hc ? "" : (this.title || "").replace("'", ""), hasArrow: this.hasArrow ? "true" : "false", keydownFn: m, mousedownFn: o, focusFn: n, clickFn: i,
                        style: CKEDITOR.skin.getIconStyle(p, a.lang.dir == "rtl", this.icon, this.iconOffset), arrowHtml: this.hasArrow ? e.output() : ""};
                    c.output(d, b);
                    if (this.onRender)
                        this.onRender();
                    return j
                }, setState: function(a) {
                    if (this._.state == a)
                        return false;
                    this._.state = a;
                    var b = CKEDITOR.document.getById(this._.id);
                    if (b) {
                        b.setState(a, "cke_button");
                        a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled");
                        if (this.hasArrow) {
                            a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g,
                                    this.label) : this.label;
                            CKEDITOR.document.getById(this._.id + "_label").setText(a)
                        } else
                            a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", true) : b.removeAttribute("aria-pressed");
                        return true
                    }
                    return false
                }, getState: function() {
                    return this._.state
                }, toFeature: function(a) {
                    if (this._.feature)
                        return this._.feature;
                    var b = this;
                    !this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b);
                    return this._.feature = b
                }};
            CKEDITOR.ui.prototype.addButton = function(a, b) {
                this.add(a, CKEDITOR.UI_BUTTON,
                        b)
            }
        }(), function() {
            function d(a) {
                function c() {
                    for (var f = d(), g = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), i = 0; i < g.length; i++) {
                        var j = g[i];
                        if (j != "/") {
                            typeof j == "string" && (j = g[i] = {name: j});
                            var l, r = j.groups;
                            if (r)
                                for (var p = 0; p < r.length; p++) {
                                    l = r[p];
                                    (l = f[l]) && k(j, l)
                                }
                            (l = f[j.name]) && k(j, l)
                        }
                    }
                    return g
                }
                function d() {
                    var c = {}, e, f, g;
                    for (e in a.ui.items) {
                        f = a.ui.items[e];
                        g = f.toolbar || "others";
                        g = g.split(",");
                        f = g[0];
                        g = parseInt(g[1] || -1, 10);
                        c[f] || (c[f] = []);
                        c[f].push({name: e, order: g})
                    }
                    for (f in c)
                        c[f] = c[f].sort(function(a,
                                b) {
                            return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ? -1 : 1
                        });
                    return c
                }
                function k(c, d) {
                    if (d.length) {
                        c.items ? c.items.push(a.ui.create("-")) : c.items = [];
                        for (var e; e = d.shift(); ) {
                            e = typeof e == "string" ? e : e.name;
                            if (!i || CKEDITOR.tools.indexOf(i, e) == -1)
                                (e = a.ui.create(e)) && a.addFeature(e) && c.items.push(e)
                        }
                    }
                }
                function g(a) {
                    var b = [], c, d, e;
                    for (c = 0; c < a.length; ++c) {
                        d = a[c];
                        e = {};
                        if (d == "/")
                            b.push(d);
                        else if (CKEDITOR.tools.isArray(d)) {
                            k(e, CKEDITOR.tools.clone(d));
                            b.push(e)
                        } else if (d.items) {
                            k(e, CKEDITOR.tools.clone(d.items));
                            e.name = d.name;
                            b.push(e)
                        }
                    }
                    return b
                }
                var i = a.config.removeButtons, i = i && i.split(","), j = a.config.toolbar;
                typeof j == "string" && (j = a.config["toolbar_" + j]);
                return a.toolbar = j ? g(j) : c()
            }
            function e(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{name: "document", groups: ["mode", "document", "doctools"]}, {name: "clipboard", groups: ["clipboard", "undo"]}, {name: "editing", groups: ["find", "selection", "spellchecker"]}, {name: "forms"}, "/", {name: "basicstyles", groups: ["basicstyles", "cleanup"]}, {name: "paragraph", groups: ["list",
                            "indent", "blocks", "align", "bidi"]}, {name: "links"}, {name: "insert"}, "/", {name: "styles"}, {name: "colors"}, {name: "tools"}, {name: "others"}, {name: "about"}])
            }
            var c = function() {
                this.toolbars = [];
                this.focusCommandExecuted = false
            };
            c.prototype.focus = function() {
                for (var a = 0, c; c = this.toolbars[a++]; )
                    for (var d = 0, e; e = c.items[d++]; )
                        if (e.focus) {
                            e.focus();
                            return
                        }
            };
            var a = {modes: {wysiwyg: 1, source: 1}, readOnly: 1, exec: function(a) {
                    if (a.toolbox) {
                        a.toolbox.focusCommandExecuted = true;
                        CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
                            a.toolbox.focus()
                        },
                                100) : a.toolbox.focus()
                    }
                }};
            CKEDITOR.plugins.add("toolbar", {requires: "button", init: function(b) {
                    var e, h = function(a, c) {
                        var d, j = b.lang.dir == "rtl", m = b.config.toolbarGroupCycling, n = j ? 37 : 39, j = j ? 39 : 37, m = m === void 0 || m;
                        switch (c) {
                            case 9:
                            case CKEDITOR.SHIFT + 9:
                                for (; !d || !d.items.length; ) {
                                    d = c == 9 ? (d ? d.next : a.toolbar.next) || b.toolbox.toolbars[0] : (d ? d.previous : a.toolbar.previous) || b.toolbox.toolbars[b.toolbox.toolbars.length - 1];
                                    if (d.items.length)
                                        for (a = d.items[e?d.items.length - 1:0]; a && !a.focus; )
                                            (a = e ? a.previous : a.next) ||
                                                    (d = 0)
                                }
                                a && a.focus();
                                return false;
                            case n:
                                d = a;
                                do {
                                    d = d.next;
                                    !d && m && (d = a.toolbar.items[0])
                                } while (d && !d.focus);
                                d ? d.focus() : h(a, 9);
                                return false;
                            case 40:
                                if (a.button && a.button.hasArrow) {
                                    b.once("panelShow", function(a) {
                                        a.data._.panel._.currentBlock.onKeyDown(40)
                                    });
                                    a.execute()
                                } else
                                    h(a, c == 40 ? n : j);
                                return false;
                            case j:
                            case 38:
                                d = a;
                                do {
                                    d = d.previous;
                                    !d && m && (d = a.toolbar.items[a.toolbar.items.length - 1])
                                } while (d && !d.focus);
                                if (d)
                                    d.focus();
                                else {
                                    e = 1;
                                    h(a, CKEDITOR.SHIFT + 9);
                                    e = 0
                                }
                                return false;
                            case 27:
                                b.focus();
                                return false;
                            case 13:
                            case 32:
                                a.execute();
                                return false
                        }
                        return true
                    };
                    b.on("uiSpace", function(a) {
                        if (a.data.space == b.config.toolbarLocation) {
                            a.removeListener();
                            b.toolbox = new c;
                            var e = CKEDITOR.tools.getNextId(), f = ['<span id="', e, '" class="cke_voice_label">', b.lang.toolbar.toolbars, "</span>", '<span id="' + b.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', e, '" onmousedown="return false;">'], e = b.config.toolbarStartupExpanded !== false, j, m;
                            b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && f.push('<span class="cke_toolbox_main"' +
                                    (e ? ">" : ' style="display:none">'));
                            for (var n = b.toolbox.toolbars, q = d(b), o = 0; o < q.length; o++) {
                                var l, r = 0, p, s = q[o], w;
                                if (s) {
                                    if (j) {
                                        f.push("</span>");
                                        m = j = 0
                                    }
                                    if (s === "/")
                                        f.push('<span class="cke_toolbar_break"></span>');
                                    else {
                                        w = s.items || s;
                                        for (var t = 0; t < w.length; t++) {
                                            var v = w[t], z;
                                            if (v)
                                                if (v.type == CKEDITOR.UI_SEPARATOR)
                                                    m = j && v;
                                                else {
                                                    z = v.canGroup !== false;
                                                    if (!r) {
                                                        l = CKEDITOR.tools.getNextId();
                                                        r = {id: l, items: []};
                                                        p = s.name && (b.lang.toolbar.toolbarGroups[s.name] || s.name);
                                                        f.push('<span id="', l, '" class="cke_toolbar"', p ? ' aria-labelledby="' +
                                                                l + '_label"' : "", ' role="toolbar">');
                                                        p && f.push('<span id="', l, '_label" class="cke_voice_label">', p, "</span>");
                                                        f.push('<span class="cke_toolbar_start"></span>');
                                                        var x = n.push(r) - 1;
                                                        if (x > 0) {
                                                            r.previous = n[x - 1];
                                                            r.previous.next = r
                                                        }
                                                    }
                                                    if (z) {
                                                        if (!j) {
                                                            f.push('<span class="cke_toolgroup" role="presentation">');
                                                            j = 1
                                                        }
                                                    } else if (j) {
                                                        f.push("</span>");
                                                        j = 0
                                                    }
                                                    l = function(a) {
                                                        a = a.render(b, f);
                                                        x = r.items.push(a) - 1;
                                                        if (x > 0) {
                                                            a.previous = r.items[x - 1];
                                                            a.previous.next = a
                                                        }
                                                        a.toolbar = r;
                                                        a.onkey = h;
                                                        a.onfocus = function() {
                                                            b.toolbox.focusCommandExecuted ||
                                                                    b.focus()
                                                        }
                                                    };
                                                    if (m) {
                                                        l(m);
                                                        m = 0
                                                    }
                                                    l(v)
                                                }
                                        }
                                        if (j) {
                                            f.push("</span>");
                                            m = j = 0
                                        }
                                        r && f.push('<span class="cke_toolbar_end"></span></span>')
                                    }
                                }
                            }
                            b.config.toolbarCanCollapse && f.push("</span>");
                            if (b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var y = CKEDITOR.tools.addFunction(function() {
                                    b.execCommand("toolbarCollapse")
                                });
                                b.on("destroy", function() {
                                    CKEDITOR.tools.removeFunction(y)
                                });
                                b.addCommand("toolbarCollapse", {readOnly: 1, exec: function(a) {
                                        var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(),
                                                d = a.ui.space("contents"), e = c.getParent(), f = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
                                        if (h) {
                                            c.show();
                                            b.removeClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarCollapse)
                                        } else {
                                            c.hide();
                                            b.addClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarExpand)
                                        }
                                        b.getFirst().setText(h ? "▲" : "◀");
                                        d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
                                        a.fire("resize")
                                    }, modes: {wysiwyg: 1, source: 1}});
                                b.setKeystroke(CKEDITOR.ALT +
                                        (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                                f.push('<a title="' + (e ? b.lang.toolbar.toolbarCollapse : b.lang.toolbar.toolbarExpand) + '" id="' + b.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                                e || f.push(" cke_toolbox_collapser_min");
                                f.push('" onclick="CKEDITOR.tools.callFunction(' + y + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                            }
                            f.push("</span>");
                            a.data.html = a.data.html + f.join("")
                        }
                    });
                    b.on("destroy", function() {
                        if (this.toolbox) {
                            var a, b = 0, c, d, e;
                            for (a = this.toolbox.toolbars; b < a.length; b++) {
                                d = a[b].items;
                                for (c = 0; c < d.length; c++) {
                                    e = d[c];
                                    e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn);
                                    e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn)
                                }
                            }
                        }
                    });
                    b.on("uiReady", function() {
                        var a = b.ui.space("toolbox");
                        a && b.focusManager.add(a, 1)
                    });
                    b.addCommand("toolbarFocus", a);
                    b.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                    b.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                    b.ui.addHandler(CKEDITOR.UI_SEPARATOR, {create: function() {
                            return{render: function(a, b) {
                                    b.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                    return{}
                                }}
                        }})
                }});
            CKEDITOR.ui.prototype.addToolbarGroup = function(a, c, d) {
                var k = e(this.editor), g = c === 0, i = {name: a};
                if (d) {
                    if (d = CKEDITOR.tools.search(k, function(a) {
                        return a.name == d
                    })) {
                        !d.groups && (d.groups = []);
                        if (c) {
                            c = CKEDITOR.tools.indexOf(d.groups, c);
                            if (c >= 0) {
                                d.groups.splice(c + 1, 0, a);
                                return
                            }
                        }
                        g ? d.groups.splice(0, 0, a) : d.groups.push(a);
                        return
                    }
                    c = null
                }
                c && (c = CKEDITOR.tools.indexOf(k, function(a) {
                    return a.name == c
                }));
                g ? k.splice(0, 0, a) : typeof c == "number" ? k.splice(c + 1, 0, i) : k.push(a)
            }
        }(), CKEDITOR.UI_SEPARATOR = "separator",
                CKEDITOR.config.toolbarLocation = "top", function() {
                    function d(a) {
                        this.editor = a;
                        this.reset()
                    }
                    CKEDITOR.plugins.add("undo", {init: function(a) {
                            function b(a) {
                                e.enabled && a.data.command.canUndo !== false && e.save()
                            }
                            function c() {
                                e.enabled = a.readOnly ? false : a.mode == "wysiwyg";
                                e.onChange()
                            }
                            var e = a.undoManager = new d(a), k = a.addCommand("undo", {exec: function() {
                                    if (e.undo()) {
                                        a.selectionChange();
                                        this.fire("afterUndo")
                                    }
                                }, startDisabled: true, canUndo: false}), g = a.addCommand("redo", {exec: function() {
                                    if (e.redo()) {
                                        a.selectionChange();
                                        this.fire("afterRedo")
                                    }
                                }, startDisabled: true, canUndo: false});
                            a.setKeystroke([[CKEDITOR.CTRL + 90, "undo"], [CKEDITOR.CTRL + 89, "redo"], [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]]);
                            e.onChange = function() {
                                k.setState(e.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                g.setState(e.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                            };
                            a.on("beforeCommandExec", b);
                            a.on("afterCommandExec", b);
                            a.on("saveSnapshot", function(a) {
                                e.save(a.data && a.data.contentOnly)
                            });
                            a.on("contentDom", function() {
                                a.editable().on("keydown",
                                        function(a) {
                                            a = a.data.getKey();
                                            (a == 8 || a == 46) && e.type(a, 0)
                                        });
                                a.editable().on("keypress", function(a) {
                                    e.type(a.data.getKey(), 1)
                                })
                            });
                            a.on("beforeModeUnload", function() {
                                a.mode == "wysiwyg" && e.save(true)
                            });
                            a.on("mode", c);
                            a.on("readOnly", c);
                            if (a.ui.addButton) {
                                a.ui.addButton("Undo", {label: a.lang.undo.undo, command: "undo", toolbar: "undo,10"});
                                a.ui.addButton("Redo", {label: a.lang.undo.redo, command: "redo", toolbar: "undo,20"})
                            }
                            a.resetUndo = function() {
                                e.reset();
                                a.fire("saveSnapshot")
                            };
                            a.on("updateSnapshot", function() {
                                e.currentImage &&
                                        e.update()
                            });
                            a.on("lockSnapshot", function(a) {
                                e.lock(a.data && a.data.dontUpdate)
                            });
                            a.on("unlockSnapshot", e.unlock, e)
                        }});
                    CKEDITOR.plugins.undo = {};
                    var e = CKEDITOR.plugins.undo.Image = function(a, b) {
                        this.editor = a;
                        a.fire("beforeUndoImage");
                        var c = a.getSnapshot();
                        CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                        this.contents = c;
                        if (!b)
                            this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(true);
                        a.fire("afterUndoImage")
                    }, c = /\b(?:href|src|name)="[^"]*?"/gi;
                    e.prototype = {equalsContent: function(a) {
                            var b =
                                    this.contents, a = a.contents;
                            if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) {
                                b = b.replace(c, "");
                                a = a.replace(c, "")
                            }
                            return b != a ? false : true
                        }, equalsSelection: function(a) {
                            var b = this.bookmarks, a = a.bookmarks;
                            if (b || a) {
                                if (!b || !a || b.length != a.length)
                                    return false;
                                for (var c = 0; c < b.length; c++) {
                                    var d = b[c], e = a[c];
                                    if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end))
                                        return false
                                }
                            }
                            return true
                        }};
                    d.prototype =
                            {type: function(a, b) {
                                    var c = !b && a != this.lastKeystroke, d = this.editor;
                                    if (!this.typing || b && !this.wasCharacter || c) {
                                        var k = new e(d), g = this.snapshots.length;
                                        CKEDITOR.tools.setTimeout(function() {
                                            var a = d.getSnapshot();
                                            CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, ""));
                                            if (k.contents != a && g == this.snapshots.length) {
                                                this.typing = true;
                                                this.save(false, k, false) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1);
                                                this.hasUndo = true;
                                                this.hasRedo = false;
                                                this.modifiersCount = this.typesCount =
                                                        1;
                                                this.onChange()
                                            }
                                        }, 0, this)
                                    }
                                    this.lastKeystroke = a;
                                    if (this.wasCharacter = b) {
                                        this.modifiersCount = 0;
                                        this.typesCount++;
                                        if (this.typesCount > 25) {
                                            this.save(false, null, false);
                                            this.typesCount = 1
                                        } else
                                            setTimeout(function() {
                                                d.fire("change")
                                            }, 0)
                                    } else {
                                        this.typesCount = 0;
                                        this.modifiersCount++;
                                        if (this.modifiersCount > 25) {
                                            this.save(false, null, false);
                                            this.modifiersCount = 1
                                        } else
                                            setTimeout(function() {
                                                d.fire("change")
                                            }, 0)
                                    }
                                }, reset: function() {
                                    this.lastKeystroke = 0;
                                    this.snapshots = [];
                                    this.index = -1;
                                    this.limit = this.editor.config.undoStackSize ||
                                            20;
                                    this.currentImage = null;
                                    this.hasRedo = this.hasUndo = false;
                                    this.locked = null;
                                    this.resetType()
                                }, resetType: function() {
                                    this.typing = false;
                                    delete this.lastKeystroke;
                                    this.modifiersCount = this.typesCount = 0
                                }, fireChange: function() {
                                    this.hasUndo = !!this.getNextImage(true);
                                    this.hasRedo = !!this.getNextImage(false);
                                    this.resetType();
                                    this.onChange()
                                }, save: function(a, b, c) {
                                    if (this.locked)
                                        return false;
                                    var d = this.snapshots;
                                    b || (b = new e(this.editor));
                                    if (b.contents === false)
                                        return false;
                                    if (this.currentImage)
                                        if (b.equalsContent(this.currentImage)) {
                                            if (a ||
                                                    b.equalsSelection(this.currentImage))
                                                return false
                                        } else
                                            this.editor.fire("change");
                                    d.splice(this.index + 1, d.length - this.index - 1);
                                    d.length == this.limit && d.shift();
                                    this.index = d.push(b) - 1;
                                    this.currentImage = b;
                                    c !== false && this.fireChange();
                                    return true
                                }, restoreImage: function(a) {
                                    var b = this.editor, c;
                                    if (a.bookmarks) {
                                        b.focus();
                                        c = b.getSelection()
                                    }
                                    this.locked = 1;
                                    this.editor.loadSnapshot(a.contents);
                                    if (a.bookmarks)
                                        c.selectBookmarks(a.bookmarks);
                                    else if (CKEDITOR.env.ie) {
                                        c = this.editor.document.getBody().$.createTextRange();
                                        c.collapse(true);
                                        c.select()
                                    }
                                    this.locked = 0;
                                    this.index = a.index;
                                    this.currentImage = this.snapshots[this.index];
                                    this.update();
                                    this.fireChange();
                                    b.fire("change")
                                }, getNextImage: function(a) {
                                    var b = this.snapshots, c = this.currentImage, d;
                                    if (c)
                                        if (a)
                                            for (d = this.index - 1; d >= 0; d--) {
                                                a = b[d];
                                                if (!c.equalsContent(a)) {
                                                    a.index = d;
                                                    return a
                                                }
                                            }
                                        else
                                            for (d = this.index + 1; d < b.length; d++) {
                                                a = b[d];
                                                if (!c.equalsContent(a)) {
                                                    a.index = d;
                                                    return a
                                                }
                                            }
                                    return null
                                }, redoable: function() {
                                    return this.enabled && this.hasRedo
                                }, undoable: function() {
                                    return this.enabled &&
                                            this.hasUndo
                                }, undo: function() {
                                    if (this.undoable()) {
                                        this.save(true);
                                        var a = this.getNextImage(true);
                                        if (a)
                                            return this.restoreImage(a), true
                                    }
                                    return false
                                }, redo: function() {
                                    if (this.redoable()) {
                                        this.save(true);
                                        if (this.redoable()) {
                                            var a = this.getNextImage(false);
                                            if (a)
                                                return this.restoreImage(a), true
                                        }
                                    }
                                    return false
                                }, update: function(a) {
                                    if (!this.locked) {
                                        a || (a = new e(this.editor));
                                        for (var b = this.index, c = this.snapshots; b > 0 && this.currentImage.equalsContent(c[b - 1]); )
                                            b = b - 1;
                                        c.splice(b, this.index - b + 1, a);
                                        this.index = b;
                                        this.currentImage =
                                        a
                                    }
                                }, lock: function(a) {
                                    if (this.locked)
                                        this.locked.level++;
                                    else if (a)
                                        this.locked = {level: 1};
                                    else {
                                        a = new e(this.editor, true);
                                        this.locked = {update: this.currentImage && this.currentImage.equalsContent(a) ? a : null, level: 1}
                                    }
                                }, unlock: function() {
                                    if (this.locked && !--this.locked.level) {
                                        var a = this.locked.update, b = a && new e(this.editor, true);
                                        this.locked = null;
                                        a && !a.equalsContent(b) && this.update()
                                    }
                                }}
                }(), function() {
            function d(a) {
                var b = this.editor, c = a.document, d = c.body;
                (a = c.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a);
                (a = c.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a);
                if (CKEDITOR.env.gecko) {
                    d.contentEditable = false;
                    if (CKEDITOR.env.version < 2E4) {
                        d.innerHTML = d.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, "");
                        setTimeout(function() {
                            var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c));
                            a.setStart(new CKEDITOR.dom.node(d), 0);
                            b.getSelection().selectRanges([a])
                        }, 0)
                    }
                }
                d.contentEditable = true;
                if (CKEDITOR.env.ie) {
                    d.hideFocus = true;
                    d.disabled = true;
                    d.removeAttribute("disabled")
                }
                delete this._.isLoadingData;
                this.$ = d;
                c = new CKEDITOR.dom.document(c);
                this.setup();
                if (CKEDITOR.env.ie) {
                    c.getDocumentElement().addClass(c.$.compatMode);
                    b.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(c, "selectionchange", function() {
                        var a = c.getBody(), d = b.getSelection(), e = d && d.getRanges()[0];
                        e && (a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && e.startContainer.equals(a)) && setTimeout(function() {
                            e = b.getSelection().getRanges()[0];
                            if (!e.startContainer.equals("body")) {
                                a.getFirst().remove(1);
                                e.moveToElementEditEnd(a);
                                e.select()
                            }
                        },
                                0)
                    })
                }
                if (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version > 10)
                    c.getDocumentElement().on("mousedown", function(a) {
                        a.data.getTarget().is("html") && setTimeout(function() {
                            b.editable().focus()
                        })
                    });
                try {
                    b.document.$.execCommand("2D-position", false, true)
                } catch (e) {
                }
                try {
                    b.document.$.execCommand("enableInlineTableEditing", false, !b.config.disableNativeTableHandles)
                } catch (g) {
                }
                if (b.config.disableObjectResizing)
                    try {
                        this.getDocument().$.execCommand("enableObjectResizing", false, false)
                    } catch (i) {
                        this.attachListener(this,
                                CKEDITOR.env.ie ? "resizestart" : "resize", function(a) {
                                    a.data.preventDefault()
                                })
                    }
                (CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode == "CSS1Compat") && this.attachListener(this, "keydown", function(a) {
                    var c = a.data.getKeystroke();
                    if (c == 33 || c == 34)
                        if (CKEDITOR.env.ie)
                            setTimeout(function() {
                                b.getSelection().scrollIntoView()
                            }, 0);
                        else if (b.window.$.innerHeight > this.$.offsetHeight) {
                            var d = b.createRange();
                            d[c == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                            d.select();
                            a.data.preventDefault()
                        }
                });
                CKEDITOR.env.ie &&
                        this.attachListener(c, "blur", function() {
                            try {
                                c.$.selection.empty()
                            } catch (a) {
                            }
                        });
                b.document.getElementsByTag("title").getItem(0).data("cke-title", b.document.$.title);
                if (CKEDITOR.env.ie)
                    b.document.$.title = this._.docTitle;
                CKEDITOR.tools.setTimeout(function() {
                    b.fire("contentDom");
                    if (this._.isPendingFocus) {
                        b.focus();
                        this._.isPendingFocus = false
                    }
                    setTimeout(function() {
                        b.fire("dataReady")
                    }, 0);
                    CKEDITOR.env.ie && setTimeout(function() {
                        if (b.document) {
                            var a = b.document.$.body;
                            a.runtimeStyle.marginBottom = "0px";
                            a.runtimeStyle.marginBottom =
                                    ""
                        }
                    }, 1E3)
                }, 0, this)
            }
            function e() {
                var a = [];
                if (CKEDITOR.document.$.documentMode >= 8) {
                    a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                    var b = [], c;
                    for (c in CKEDITOR.dtd.$removeEmpty)
                        b.push("html.CSS1Compat " + c + "[contenteditable=false]");
                    a.push(b.join(",") + "{display:inline-block}")
                } else if (CKEDITOR.env.gecko) {
                    a.push("html{height:100% !important}");
                    a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
                }
                a.push("html{cursor:text;*cursor:auto}");
                a.push("img,input,textarea{cursor:default}");
                return a.join("\n")
            }
            CKEDITOR.plugins.add("wysiwygarea", {init: function(a) {
                    a.config.fullPage && a.addFeature({allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body"});
                    a.addMode("wysiwyg", function(b) {
                        function d(e) {
                            e && e.removeListener();
                            a.editable(new c(a, k.$.contentWindow.document.body));
                            a.setData(a.getData(1), b)
                        }
                        var e = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", e = CKEDITOR.env.air ? "javascript:void(0)" :
                                CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(e) + "}())" : "", k = CKEDITOR.dom.element.createFromHtml('<iframe src="' + e + '" frameBorder="0"></iframe>');
                        k.setStyles({width: "100%", height: "100%"});
                        k.addClass("cke_wysiwyg_frame cke_reset");
                        var g = a.ui.space("contents");
                        g.append(k);
                        if (e = CKEDITOR.env.ie || CKEDITOR.env.gecko)
                            k.on("load", d);
                        var i = a.title, j = a.lang.common.editorHelp;
                        if (i) {
                            CKEDITOR.env.ie && (i = i + (", " + j));
                            k.setAttribute("title", i)
                        }
                        var i = CKEDITOR.tools.getNextId(), m = CKEDITOR.dom.element.createFromHtml('<span id="' +
                                i + '" class="cke_voice_label">' + j + "</span>");
                        g.append(m, 1);
                        a.on("beforeModeUnload", function(a) {
                            a.removeListener();
                            m.remove()
                        });
                        k.setAttributes({"aria-describedby": i, tabIndex: a.tabIndex, allowTransparency: "true"});
                        !e && d();
                        if (CKEDITOR.env.webkit) {
                            e = function() {
                                g.setStyle("width", "100%");
                                k.hide();
                                k.setSize("width", g.getSize("width"));
                                g.removeStyle("width");
                                k.show()
                            };
                            k.setCustomData("onResize", e);
                            CKEDITOR.document.getWindow().on("resize", e)
                        }
                        a.fire("ariaWidget", k)
                    })
                }});
            var c = CKEDITOR.tools.createClass({$: function(a) {
                    this.base.apply(this,
                            arguments);
                    this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) {
                        CKEDITOR.tools.setTimeout(d, 0, this, a)
                    }, this);
                    this._.docTitle = this.getWindow().getFrame().getAttribute("title")
                }, base: CKEDITOR.editable, proto: {setData: function(a, b) {
                        var c = this.editor;
                        if (b) {
                            this.setHtml(a);
                            c.fire("dataReady")
                        } else {
                            this._.isLoadingData = true;
                            c._.dataStore = {id: 1};
                            var d = c.config, k = d.fullPage, g = d.docType, i = CKEDITOR.tools.buildStyleHtml(e()).replace(/<style>/, '<style data-cke-temp="1">');
                            k || (i = i + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss));
                            var j = d.baseHref ? '<base href="' + d.baseHref + '" data-cke-temp="1" />' : "";
                            k && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                                c.docType = g = a;
                                return""
                            }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                                c.xmlDeclaration = a;
                                return""
                            }));
                            a = c.dataProcessor.toHtml(a);
                            if (k) {
                                /<body[\s|>]/.test(a) || (a = "<body>" + a);
                                /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>");
                                /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>");
                                j && (a = a.replace(/<head>/,
                                        "$&" + j));
                                a = a.replace(/<\/head\s*>/, i + "$&");
                                a = g + a
                            } else
                                a = d.docType + '<html dir="' + d.contentsLangDirection + '" lang="' + (d.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + j + i + "</head><body" + (d.bodyId ? ' id="' + d.bodyId + '"' : "") + (d.bodyClass ? ' class="' + d.bodyClass + '"' : "") + ">" + a + "</body></html>";
                            if (CKEDITOR.env.gecko) {
                                a = a.replace(/<body/, '<body contenteditable="true" ');
                                CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>"))
                            }
                            d = '<script id="cke_actscrpt" type="text/javascript"' +
                                    (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                            CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (d = d + '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>');
                            a = a.replace(/(?=\s*<\/(:?head)>)/, d);
                            this.clearCustomData();
                            this.clearListeners();
                            c.fire("contentDomUnload");
                            var m = this.getDocument();
                            try {
                                m.write(a)
                            } catch (n) {
                                setTimeout(function() {
                                    m.write(a)
                                }, 0)
                            }
                        }
                    }, getData: function(a) {
                        if (a)
                            return this.getHtml();
                        var a = this.editor, b = a.config, c = b.fullPage, d = c && a.docType, e = c && a.xmlDeclaration, g = this.getDocument(), c = c ? g.getDocumentElement().getOuterHtml() : g.getBody().getHtml();
                        CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                        c = a.dataProcessor.toDataFormat(c);
                        e && (c = e + "\n" + c);
                        d && (c = d + "\n" + c);
                        return c
                    },
                    focus: function() {
                        this._.isLoadingData ? this._.isPendingFocus = true : c.baseProto.focus.call(this)
                    }, detach: function() {
                        var a = this.editor, b = a.document, a = a.window.getFrame();
                        c.baseProto.detach.call(this);
                        this.clearCustomData();
                        b.getDocumentElement().clearCustomData();
                        a.clearCustomData();
                        CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                        (b = a.removeCustomData("onResize")) && b.removeListener();
                        a.remove()
                    }}})
        }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker =
                !0, CKEDITOR.config.contentsCss = CKEDITOR.getUrl("contents.css"), function() {
            function d(a) {
                a = a.data;
                if (/\.bmp$/.test(a.name)) {
                    var b = a.image, c = document.createElement("canvas");
                    c.width = b.width;
                    c.height = b.height;
                    c.getContext("2d").drawImage(b, 0, 0);
                    a.file = c.toDataURL("image/png");
                    a.name = a.name.replace(/\.bmp$/, ".png")
                }
            }
            function e(a) {
                var b = a.editor, c = b.config.simpleuploads_maximumDimensions, d = a.data.image;
                if (c.width && d.width > c.width) {
                    alert(b.lang.simpleuploads.imageTooWide);
                    a.cancel()
                } else if (c.height && d.height >
                        c.height) {
                    alert(b.lang.simpleuploads.imageTooTall);
                    a.cancel()
                }
            }
            function c(a) {
                var b = "span.SimpleUploadsTmpWrapper>span { top: 50%; margin-top: -0.5em; width: 100%; text-align: center; color: #fff; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-size: 50px; font-family: Calibri,Arial,Sans-serif; pointer-events: none; position: absolute; display: inline-block;}";
                a.simpleuploads_hideImageProgress && (b = "span.SimpleUploadsTmpWrapper { color:#333; background-color:#fff; padding:4px; border:1px solid #EEE;}");
                return".SimpleUploadsOverEditor { " + (a.simpleuploads_editorover || "box-shadow: 0 0 10px 1px #999999 inset !important;") + " }a.SimpleUploadsTmpWrapper { color:#333; background-color:#fff; padding:4px; border:1px solid #EEE;}.SimpleUploadsTmpWrapper { display: inline-block; position: relative; pointer-events: none;}" + b + ".uploadRect {display: inline-block;height: 0.9em;vertical-align: middle;width: 20px;}.uploadRect span {background-color: #999;display: inline-block;height: 100%;vertical-align: top;}.SimpleUploadsTmpWrapper .uploadCancel { background-color: #333333;border-radius: 0.5em;color: #FFFFFF;cursor: pointer !important;display: inline-block;height: 1em;line-height: 0.8em;margin-left: 4px;padding-left: 0.18em;pointer-events: auto;position: relative; text-decoration:none; top: -2px;width: 0.7em;}.SimpleUploadsTmpWrapper span uploadCancel { width:1em; padding-left:0}"
            }
            function a(a, c, d, e) {
                if (y)
                    alert("Please, wait to finish the current upload");
                else {
                    x = !c;
                    z = a;
                    if (typeof FormData == "undefined") {
                        var g = document.getElementById("simpleUploadsTarget");
                        if (!g) {
                            g = document.createElement("iframe");
                            g.style.display = "none";
                            g.id = "simpleUploadsTarget";
                            document.body.appendChild(g)
                        }
                        C = d;
                        F = e;
                        d = a._.simpleuploadsFormUploadFn;
                        e = a._.simpleuploadsFormInitFn;
                        if (!d) {
                            a._.simpleuploadsFormUploadFn = d = CKEDITOR.tools.addFunction(f, a);
                            a._.simpleuploadsFormInitFn = e = CKEDITOR.tools.addFunction(function() {
                                window.setTimeout(function() {
                                    var a =
                                            document.getElementById("simpleUploadsTarget").contentWindow.document.getElementById("upload");
                                    a.onchange = function() {
                                        var a = {name: this.value, url: this.form.action, context: C, id: "IEUpload", requiresImage: c}, b = a.name.match(/\\([^\\]*)$/);
                                        if (b)
                                            a.name = b[1];
                                        if (typeof z.fire("simpleuploads.startUpload", a) != "boolean")
                                            if (a.requiresImage && !CKEDITOR.plugins.simpleuploads.isImageExtension(z, a.name))
                                                alert(z.lang.simpleuploads.nonImageExtension);
                                            else {
                                                F && F.start && F.start(a);
                                                y = this.value;
                                                this.form.action = a.url;
                                                if (a.extraFields) {
                                                    var a =
                                                            a.extraFields, b = this.ownerDocument, d;
                                                    for (d in a)
                                                        if (a.hasOwnProperty(d)) {
                                                            var e = b.createElement("input");
                                                            e.type = "hidden";
                                                            e.name = d;
                                                            e.value = a[d];
                                                            this.form.appendChild(e)
                                                        }
                                                }
                                                this.form.submit()
                                            }
                                    };
                                    a.click()
                                }, 100)
                            }, a);
                            a.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(this._.simpleuploadsFormUploadFn);
                                CKEDITOR.tools.removeFunction(this._.simpleuploadsFormInitFn)
                            })
                        }
                        a = 'document.open(); document.write("' + ("<form method='post' enctype='multipart/form-data' action='" + b(a, d, c) + "'><input type='file' name='upload' id='upload'></form>") +
                                '");document.close();window.parent.CKEDITOR.tools.callFunction(' + e + ");";
                        g.src = "javascript:void(function(){" + encodeURIComponent(a) + "}())";
                        g.onreadystatechange = function() {
                            g.readyState == "complete" && window.setTimeout(function() {
                                if (y) {
                                    alert("The file upload has failed");
                                    y = null
                                }
                            }, 100)
                        };
                        v = null
                    } else {
                        a = {context: d, callback: e, requiresImage: c};
                        if (!v) {
                            v = document.createElement("input");
                            v.type = "file";
                            v.style.overflow = "hidden";
                            v.style.width = "1px";
                            v.style.height = "1px";
                            v.style.opacity = 0.1;
                            v.multiple = "multiple";
                            document.body.appendChild(v);
                            v.addEventListener("change", function() {
                                var a = v.files.length;
                                if (a) {
                                    z.fire("saveSnapshot");
                                    for (var b = 0; b < a; b++) {
                                        var c = v.files[b], d = CKEDITOR.tools.extend({}, v.simpleUploadData);
                                        d.file = c;
                                        d.name = c.name;
                                        d.id = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                                        d.forceLink = x;
                                        d.mode = {type: "selectedFile", i: b, count: a};
                                        CKEDITOR.plugins.simpleuploads.insertSelectedFile(z, d)
                                    }
                                }
                            })
                        }
                        v.value = "";
                        v.simpleUploadData = a;
                        v.click()
                    }
                }
            }
            function b(a, b, c) {
                var d = {};
                d.CKEditor = a.name;
                d.CKEditorFuncNum = b;
                d.langCode = a.langCode;
                return h(c ?
                        a.config.filebrowserImageUploadUrl : a.config.filebrowserUploadUrl, d)
            }
            function f(a, b) {
                typeof b == "string" && (b && !a) && alert(b);
                var c = z;
                c.fire("simpleuploads.endUpload", {name: y, ok: !!a});
                if (F) {
                    F.upload(a, b, {context: C});
                    F = y = null
                } else {
                    if (a) {
                        var d, e;
                        if (x) {
                            d = new CKEDITOR.dom.element("a", c.document);
                            d.setText(a.match(/\/([^\/]+)$/)[1]);
                            e = "href"
                        } else {
                            d = new CKEDITOR.dom.element("img", c.document);
                            e = "src";
                            d.on("load", function(a) {
                                a.removeListener();
                                d.removeListener("error", g);
                                d.setAttribute("width", d.$.width);
                                d.setAttribute("height",
                                        d.$.height);
                                c.fire("simpleuploads.finishedUpload", {name: y, element: d})
                            });
                            d.on("error", g, null, d)
                        }
                        d.setAttribute(e, a);
                        d.data("cke-saved-" + e, a);
                        c.insertElement(d);
                        x && z.fire("simpleuploads.finishedUpload", {name: y, element: d})
                    }
                    y = null
                }
                C = null
            }
            function h(a, b) {
                var c = [];
                if (b)
                    for (var d in b)
                        c.push(d + "=" + encodeURIComponent(b[d]));
                else
                    return a;
                return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&")
            }
            function k(a) {
                a = a.data.$.dataTransfer;
                return!a || !a.types ? false : a.types.contains && a.types.contains("Files") && !a.types.contains("text/html") ||
                        a.types.indexOf && a.types.indexOf("Files") != -1 ? true : false
            }
            function g(a) {
                a.removeListener();
                alert("Failed to load the image with the provided URL: '" + a.sender.data("cke-saved-src") + "'");
                a.listenerData.remove()
            }
            function i(a, b, c, d) {
                if (a.$.naturalWidth === 0)
                    window.setTimeout(function() {
                        i(a, b, c, d)
                    }, 50);
                else {
                    a.replace(c);
                    a.setAttribute("width", a.$.width);
                    a.setAttribute("height", a.$.height);
                    b.fire("simpleuploads.finishedUpload", {name: d, element: a});
                    b.fire("updateSnapshot")
                }
            }
            function j(a, c) {
                var d = CKEDITOR.plugins.simpleuploads.isImageExtension(a,
                        c.name), e = "href", f = false;
                if (!c.forceLink && d) {
                    e = "src";
                    f = true
                }
                c.callback && c.callback.setup(c);
                if (!c.url)
                    c.url = b(a, 2, f);
                if (c.requiresImage && !d) {
                    alert(a.lang.simpleuploads.nonImageExtension);
                    return null
                }
                if (typeof a.fire("simpleuploads.startUpload", c) == "boolean")
                    return null;
                var h = new XMLHttpRequest;
                if (d = h.upload)
                    d.onprogress = function(b) {
                        n(a, c.id, b)
                    };
                c.xhr = h;
                h.open("POST", c.url);
                h.onload = function() {
                    var b = h.responseText.match(/\(\d+,\s*("|')(.*?[^\\]?)\1(?:,\s*(.*?))?\s*\)\s*;?\s*<\/script>/), d = b && b[2],
                            f = b && b[3], k = c.id, j = a.document.getById(k);
                    if (f) {
                        var m = f.match(/function\(\)\s*\{(.*)\}/);
                        if (m)
                            f = new Function(m[1]);
                        else {
                            m = f.substring(0, 1);
                            if (m == "'" || m == '"')
                                f = f.substring(1, f.length - 1)
                        }
                    }
                    n(a, k, null);
                    a.fire("updateSnapshot");
                    a.fire("simpleuploads.endUpload", {name: c.name, ok: !!d});
                    if (h.status != 200) {
                        h.status == 413 ? alert(a.lang.simpleuploads.fileTooBig) : alert("Error posting the file to " + c.url + "\r\nResponse status: " + h.status);
                        window.console && console.log(h)
                    } else if (!b) {
                        f = "Error posting the file to " + c.url +
                                "\r\nInvalid data returned (check console)";
                        window.console && console.log(h.responseText)
                    }
                    if (c.callback) {
                        !d && f && alert(f);
                        c.callback.upload(d, f, c)
                    } else if (j) {
                        if (d) {
                            d = d.replace(/\\'/g, "'");
                            if (j.$.nodeName.toLowerCase() == "span") {
                                var l;
                                if (c.originalNode) {
                                    l = c.originalNode.cloneNode(true);
                                    l.removeAttribute("width");
                                    l.removeAttribute("height");
                                    l.style.width = "";
                                    l.style.height = "";
                                    l = new CKEDITOR.dom.element(l)
                                } else
                                    l = new CKEDITOR.dom.element("img", a.document);
                                l.data("cke-saved-src", d);
                                l.setAttribute("src", d);
                                l.on("load", function(b) {
                                    b.removeListener();
                                    l.removeListener("error", g);
                                    i(l, a, j, c.name)
                                });
                                l.on("error", g, null, j);
                                j.data("cke-real-element-type", "img");
                                j.data("cke-realelement", encodeURIComponent(l.getOuterHtml()));
                                j.data("cke-real-node-type", CKEDITOR.NODE_ELEMENT);
                                return
                            }
                            if (c.originalNode) {
                                b = c.originalNode.cloneNode(true);
                                j.$.parentNode.replaceChild(b, j.$);
                                j = new CKEDITOR.dom.element(b)
                            } else {
                                j.removeAttribute("id");
                                j.removeAttribute("class");
                                j.removeAttribute("contentEditable");
                                j.setHtml(j.getFirst().getHtml())
                            }
                            j.data("cke-saved-" +
                                    e, d);
                            j.setAttribute(e, d);
                            a.fire("simpleuploads.finishedUpload", {name: c.name, element: j})
                        } else {
                            c.originalNode ? j.$.parentNode.replaceChild(c.originalNode, j.$) : j.remove();
                            f && alert(f)
                        }
                        a.fire("updateSnapshot")
                    }
                };
                h.onerror = function(b) {
                    alert("Error posting the file to " + c.url);
                    window.console && console.log(b);
                    (b = a.document.getById(c.id)) && (c.originalNode ? b.$.parentNode.replaceChild(c.originalNode, b.$) : b.remove());
                    a.fire("updateSnapshot")
                };
                h.onabort = function() {
                    if (c.callback)
                        c.callback.upload(null);
                    else {
                        var b =
                                a.document.getById(c.id);
                        b && (c.originalNode ? b.$.parentNode.replaceChild(c.originalNode, b.$) : b.remove());
                        a.fire("updateSnapshot")
                    }
                };
                h.withCredentials = true;
                return h
            }
            function m(a, b) {
                if (!b.callback) {
                    var c = CKEDITOR.plugins.simpleuploads.isImageExtension(a, b.name), d = !a.config.simpleuploads_hideImageProgress;
                    if (!b.forceLink && c && d)
                        c = q(b.file, b.id, a);
                    else {
                        c = c && !b.forceLink ? new CKEDITOR.dom.element("span", a.document) : new CKEDITOR.dom.element("a", a.document);
                        c.setAttribute("id", b.id);
                        c.setAttribute("class",
                                "SimpleUploadsTmpWrapper");
                        c.setHtml("<span class='uploadName'>" + b.name + "</span> <span class='uploadRect'><span id='rect" + b.id + "'></span></span> <span id='text" + b.id + "' class='uploadText'> </span><span class='uploadCancel'>x</span>")
                    }
                    c.setAttribute("contentEditable", false);
                    b.element = c
                }
                c = j(a, b);
                if (!c) {
                    b.result = b.result || "";
                    return false
                }
                b.callback && b.callback.start && b.callback.start(b);
                if (typeof b.file == "string") {
                    var e = "-----------------------------1966284435497298061834782736", d = b.name.match(/\.(\w+)$/)[1],
                            e = e + ('\r\nContent-Disposition: form-data; name="upload"; filename="' + b.name + '"'), e = e + ("\r\nContent-type: image/" + d) + ("\r\n\r\n" + window.atob(b.file.split(",")[1])), e = e + "\r\n-----------------------------1966284435497298061834782736";
                    if (b.extraFields) {
                        var d = b.extraFields, f;
                        for (f in d) {
                            e = e + ('\r\nContent-Disposition: form-data; name="' + unescape(encodeURIComponent(f)).replace(/=/g, "\\=") + '"');
                            e = e + ("\r\n\r\n" + unescape(encodeURIComponent(d[f])));
                            e = e + "\r\n-----------------------------1966284435497298061834782736"
                        }
                    }
                    e =
                            e + "--";
                    c.setRequestHeader("Content-Type", "multipart/form-data; boundary=---------------------------1966284435497298061834782736");
                    if (c.sendAsBinary)
                        c.sendAsBinary(e);
                    else {
                        f = new ArrayBuffer(e.length);
                        f = new Uint8Array(f, 0);
                        for (d = 0; d < e.length; d++)
                            f[d] = e.charCodeAt(d) & 255;
                        c.send(f)
                    }
                } else {
                    f = new FormData;
                    f.append("upload", b.file, b.name);
                    if (b.extraFields) {
                        d = b.extraFields;
                        for (e in d)
                            d.hasOwnProperty(e) && f.append(e, d[e])
                    }
                    c.send(f)
                }
                return true
            }
            function n(a, b, c) {
                if (a.document && a.document.$) {
                    var d = (CKEDITOR.dialog.getCurrent() ?
                            CKEDITOR : a).document.$, e = d.getElementById("rect" + b), b = d.getElementById("text" + b);
                    if (c) {
                        if (!c.lengthComputable)
                            return;
                        d = (100 * c.loaded / c.total).toFixed(2) + "%";
                        a = (100 * c.loaded / c.total).toFixed() + "%"
                    } else {
                        a = a.lang.simpleuploads.processing;
                        d = "100%"
                    }
                    if (e) {
                        e.setAttribute("width", d);
                        e.style.width = d;
                        if (!c)
                            (e = e.parentNode) && e.className == "uploadRect" && e.parentNode.removeChild(e)
                    }
                    if (b) {
                        b.firstChild.nodeValue = a;
                        if (!c)
                            (c = b.nextSibling) && c.nodeName.toLowerCase() == "a" && c.parentNode.removeChild(c)
                    }
                }
            }
            function q(a,
                    b, c) {
                var d = new CKEDITOR.dom.element("span", c.document), e = d.$, f, g = c.document.$, c = g.createElement("span");
                d.setAttribute("id", b);
                d.setAttribute("class", "SimpleUploadsTmpWrapper");
                var h = g.createElement("span");
                h.setAttribute("id", "text" + b);
                h.appendChild(g.createTextNode("0 %"));
                e.appendChild(c);
                c.appendChild(h);
                h = g.createElement("span");
                h.appendChild(g.createTextNode("x"));
                c.appendChild(h);
                if (typeof a != "string") {
                    f = window.URL || window.webkitURL;
                    if (!f || !f.revokeObjectURL)
                        return d
                }
                c = g.createElementNS("http://www.w3.org/2000/svg",
                        "svg");
                c.setAttribute("id", "svg" + b);
                h = g.createElement("img");
                if (f) {
                    h.onload = function() {
                        if (this.onload) {
                            f.revokeObjectURL(this.src);
                            this.onload = null
                        }
                        var a = g.getElementById("svg" + b);
                        if (a) {
                            a.setAttribute("width", this.width + "px");
                            a.setAttribute("height", this.height + "px")
                        }
                        if (a = g.getElementById(b))
                            a.style.width = this.width + "px"
                    };
                    h.src = f.createObjectURL(a)
                } else {
                    h.src = a;
                    h.onload = function() {
                        this.onload = null;
                        var a = g.getElementById("svg" + b);
                        if (a) {
                            a.setAttribute("width", this.width + "px");
                            a.setAttribute("height",
                                    this.height + "px")
                        }
                    };
                    c.setAttribute("width", h.width + "px");
                    c.setAttribute("height", h.height + "px")
                }
                e.appendChild(c);
                e = g.createElementNS("http://www.w3.org/2000/svg", "filter");
                e.setAttribute("id", "SVGdesaturate");
                c.appendChild(e);
                h = g.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
                h.setAttribute("type", "saturate");
                h.setAttribute("values", "0");
                e.appendChild(h);
                e = g.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                e.setAttribute("id", "SVGprogress" + b);
                c.appendChild(e);
                h = g.createElementNS("http://www.w3.org/2000/svg",
                        "rect");
                h.setAttribute("id", "rect" + b);
                h.setAttribute("width", "0");
                h.setAttribute("height", "100%");
                e.appendChild(h);
                var i = g.createElementNS("http://www.w3.org/2000/svg", "image");
                i.setAttribute("width", "100%");
                i.setAttribute("height", "100%");
                if (f) {
                    i.setAttributeNS("http://www.w3.org/1999/xlink", "href", f.createObjectURL(a));
                    var j = function() {
                        f.revokeObjectURL(i.getAttributeNS("http://www.w3.org/1999/xlink", "href"));
                        i.removeEventListener("load", j, false)
                    };
                    i.addEventListener("load", j, false)
                } else
                    i.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", a);
                a = i.cloneNode(true);
                i.setAttribute("filter", "url(#SVGdesaturate)");
                i.style.opacity = "0.5";
                c.appendChild(i);
                a.setAttribute("clip-path", "url(#SVGprogress" + b + ")");
                c.appendChild(a);
                return d
            }
            function o(b, c, d, e) {
                if (e.type != "file") {
                    var f = c.substr(0, 5) == "image", g = e.filebrowser.target.split(":"), i = {setup: function(a) {
                            if (d.uploadUrl) {
                                if (f)
                                    a.requiresImage = true;
                                var c = {};
                                c.CKEditor = b.name;
                                c.CKEditorFuncNum = 2;
                                c.langCode = b.langCode;
                                a.url = h(d.uploadUrl, c)
                            }
                        }, start: function(a) {
                            var b = CKEDITOR.dialog.getCurrent();
                            b.showThrobber();
                            var c = b.throbber;
                            if (a.xhr) {
                                c.throbberTitle.setHtml("<span class='uploadName'>" + a.name + "</span> <span class='uploadRect'><span id='rect" + a.id + "'></span></span> <span id='text" + a.id + "' class='uploadText'> </span><a>x</a>");
                                var d = c.throbberCover, e = a.xhr;
                                if (d.timer) {
                                    clearInterval(d.timer);
                                    d.timer = null
                                }
                                c.throbberParent.setStyle("display", "none");
                                c.throbberTitle.getLast().on("click", function() {
                                    e.abort()
                                });
                                b.on("hide", function() {
                                    e.readyState == 1 && e.abort()
                                })
                            }
                            c.center()
                        }, upload: function(a,
                                b, c) {
                            var e = CKEDITOR.dialog.getCurrent();
                            e.throbber.hide();
                            if (!(typeof b == "function" && b.call(c.context.sender) === false) && !(d.onFileSelect && d.onFileSelect.call(c.context.sender, a, b) === false) && a) {
                                e.getContentElement(g[0], g[1]).setValue(a);
                                e.selectPage(g[0])
                            }
                        }};
                    if (e.filebrowser.action == "QuickUpload") {
                        d.hasQuickUpload = true;
                        d.onFileSelect = null;
                        if (!b.config.simpleuploads_respectDialogUploads) {
                            e.label = f ? b.lang.simpleuploads.addImage : b.lang.simpleuploads.addFile;
                            e.onClick = function(c) {
                                a(b, f, c, i);
                                return false
                            };
                            d.getContents(e["for"][0]).get(e["for"][1]).hidden = true
                        }
                    } else {
                        if (d.hasQuickUpload)
                            return;
                        if (e.filebrowser.onSelect)
                            d.onFileSelect = e.filebrowser.onSelect
                    }
                    if (b.plugins.fileDropHandler) {
                        if (e.filebrowser.action == "QuickUpload")
                            d.uploadUrl = e.filebrowser.url;
                        d.onShow = CKEDITOR.tools.override(d.onShow, function(a) {
                            return function() {
                                typeof a == "function" && a.call(this);
                                if (!(e.filebrowser.action != "QuickUpload" && d.hasQuickUpload) && !this.handleFileDrop) {
                                    this.handleFileDrop = true;
                                    this.getParentEditor().plugins.fileDropHandler.addTarget(this.parts.contents,
                                            i)
                                }
                            }
                        })
                    }
                }
            }
            function l(a, b, c, d) {
                for (var e in d) {
                    var f = d[e];
                    (f.type == "hbox" || f.type == "vbox" || f.type == "fieldset") && l(a, b, c, f.children);
                    f.filebrowser && f.filebrowser.url && o(a, b, c, f)
                }
            }
            function r(a, b) {
                var c = a.document.getById(b.id);
                if (c) {
                    var d = c.$.getElementsByTagName("a");
                    if (!d || !d.length) {
                        d = c.$.getElementsByTagName("span");
                        if (!d || !d.length)
                            return
                    }
                    for (c = 0; c < d.length; c++) {
                        var e = d[c];
                        if (e.innerHTML == "x") {
                            e.className = "uploadCancel";
                            e.onclick = function() {
                                b.xhr && b.xhr.abort()
                            }
                        }
                    }
                }
            }
            function p(a) {
                var b = a.listenerData.editor,
                        c = a.listenerData.dialog, d, e;
                if (d = a.data && a.data.$.clipboardData || b.config.forcePasteAsPlainText && window.clipboardData)
                    if (CKEDITOR.env.gecko && b.config.forcePasteAsPlainText && d.types.length === 0)
                        b.on("beforePaste", function(a) {
                            a.removeListener();
                            a.data.type = "html"
                        });
                    else {
                        var f = d.items || d.files;
                        if (f && f.length) {
                            if (f[0].kind)
                                for (d = 0; d < f.length; d++) {
                                    e = f[d];
                                    if (e.kind == "string" && (e.type == "text/html" || e.type == "text/plain"))
                                        return
                                }
                            for (d = 0; d < f.length; d++) {
                                e = f[d];
                                if (!(e.kind && e.kind != "file")) {
                                    a.data.preventDefault();
                                    var g = e.getAsFile ? e.getAsFile() : e;
                                    CKEDITOR.env.ie || b.config.forcePasteAsPlainText ? setTimeout(function() {
                                        s(g, a)
                                    }, 100) : s(g, a)
                                }
                            }
                            c && a.data.$.defaultPrevented && c.hide()
                        }
                    }
            }
            function s(a, b) {
                var c = b.listenerData.editor, d = b.listenerData.dialog, e = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                CKEDITOR.plugins.simpleuploads.insertPastedFile(c, {context: b.data.$, name: a.name || e + ".png", file: a, forceLink: false, id: e, mode: {type: "pastedFile", dialog: d}})
            }
            function w(a) {
                var b = a.getFrameDocument(), c = b.getBody();
                if (!c || !c.$ ||
                        c.$.contentEditable != "true" && b.$.designMode != "on")
                    setTimeout(function() {
                        w(a)
                    }, 100);
                else {
                    c = CKEDITOR.dialog.getCurrent();
                    b.on("paste", p, null, {dialog: c, editor: c.getParentEditor()})
                }
            }
            var t = {elements: {$: function(a) {
                        a = a.attributes;
                        if ((a && a["class"]) == "SimpleUploadsTmpWrapper")
                            return false
                    }}}, v, z, x, y, C, F;
            CKEDITOR.plugins.add("simpleuploads", {lang: ["en", "ar", "cs", "de", "es", "fr", "he", "hu", "it", "ja", "ko", "nl", "pl", "pt-br", "ru", "tr", "zh-cn"], onLoad: function() {
                    CKEDITOR.addCss && CKEDITOR.addCss(c(CKEDITOR.config));
                    var a = CKEDITOR.document.getHead().append("style");
                    a.setAttribute("type", "text/css");
                    var b = ".SimpleUploadsOverContainer {" + (CKEDITOR.config.simpleuploads_containerover || "box-shadow: 0 0 10px 1px #99DD99 !important;") + "} .SimpleUploadsOverDialog {" + (CKEDITOR.config.simpleuploads_dialogover || "box-shadow: 0 0 10px 4px #999999 inset !important;") + "} .SimpleUploadsOverCover {" + (CKEDITOR.config.simpleuploads_coverover || "box-shadow: 0 0 10px 4px #99DD99 !important;") + "} ", b = b + ".cke_throbber {margin: 0 auto; width: 100px;} .cke_throbber div {float: left; width: 8px; height: 9px; margin-left: 2px; margin-right: 2px; font-size: 1px;} .cke_throbber .cke_throbber_1 {background-color: #737357;} .cke_throbber .cke_throbber_2 {background-color: #8f8f73;} .cke_throbber .cke_throbber_3 {background-color: #abab8f;} .cke_throbber .cke_throbber_4 {background-color: #c7c7ab;} .cke_throbber .cke_throbber_5 {background-color: #e3e3c7;} .uploadRect {display: inline-block;height: 11px;vertical-align: middle;width: 50px;} .uploadRect span {background-color: #999;display: inline-block;height: 100%;vertical-align: top;} .uploadName {display: inline-block;max-width: 180px;overflow: hidden;text-overflow: ellipsis;vertical-align: top;white-space: pre;} .uploadText {font-size:80%;} .cke_throbberMain a {cursor: pointer; font-size: 14px; font-weight:bold; padding: 4px 5px;position: absolute;right:0; text-decoration:none; top: -2px;} .cke_throbberMain {background-color: #FFF; border:1px solid #e5e5e5; padding:4px 14px 4px 4px; min-width:250px; position:absolute;}";
                    CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a.$.styleSheet.cssText = b : a.$.innerHTML = b
                }, init: function(b) {
                    var f = b.config;
                    if (typeof f.simpleuploads_imageExtensions == "undefined")
                        f.simpleuploads_imageExtensions = "jpe?g|gif|png";
                    b.addCss && b.addCss(c(f));
                    if (!f.filebrowserImageUploadUrl)
                        f.filebrowserImageUploadUrl = f.filebrowserUploadUrl;
                    if (!f.filebrowserUploadUrl && !f.filebrowserImageUploadUrl) {
                        if (window.console && console.log) {
                            console.log("The editor is missing the 'config.filebrowserUploadUrl' entry to know the url that will handle uploaded files.\r\nIt should handle the posted file as shown in Example 3: http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_%28Uploader%29/Custom_File_Browser#Example_3\r\nMore info: http://alfonsoml.blogspot.com/2009/12/using-your-own-uploader-in-ckeditor.html");
                            console[console.warn ? "warn" : "log"]("The 'SimpleUploads' plugin now is disabled.")
                        }
                    } else {
                        b.addFeature && b.addFeature({allowedContent: "img[!src,width,height];a[!href];span[id](SimpleUploadsTmpWrapper);"});
                        CKEDITOR.dialog.prototype.showThrobber = function() {
                            if (!this.throbber)
                                this.throbber = {update: function() {
                                        for (var a = this.throbberParent.$, b = a.childNodes, a = a.lastChild.className, c = b.length - 1; c > 0; c--)
                                            b[c].className = b[c - 1].className;
                                        b[0].className = a
                                    }, create: function(a) {
                                        if (!this.throbberCover) {
                                            var b = CKEDITOR.dom.element.createFromHtml('<div style="background-color:rgba(255,255,255,0.95);width:100%;height:100%;top:0;left:0; position:absolute; visibility:none;z-index:100;"></div>');
                                            a.parts.close.setStyle("z-index", 101);
                                            if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                                                b.setStyle("zoom", 1);
                                                b.setStyle("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#EEFFFFFF,endColorstr=#EEFFFFFF)")
                                            }
                                            b.appendTo(a.parts.dialog);
                                            this.throbberCover = b;
                                            var c = new CKEDITOR.dom.element("div");
                                            this.mainThrobber = c;
                                            var d = new CKEDITOR.dom.element("div");
                                            this.throbberParent = d;
                                            var e = new CKEDITOR.dom.element("div");
                                            this.throbberTitle = e;
                                            b.append(c).addClass("cke_throbberMain");
                                            c.append(e).addClass("cke_throbberTitle");
                                            c.append(d).addClass("cke_throbber");
                                            for (b = [1, 2, 3, 4, 5, 4, 3, 2]; b.length > 0; )
                                                d.append(new CKEDITOR.dom.element("div")).addClass("cke_throbber_" + b.shift());
                                            this.center();
                                            a.on("hide", this.hide, this)
                                        }
                                    }, center: function() {
                                        var a = this.mainThrobber, b = this.throbberCover, c = (b.$.offsetHeight - a.$.offsetHeight) / 2;
                                        a.setStyle("left", ((b.$.offsetWidth - a.$.offsetWidth) / 2).toFixed() + "px");
                                        a.setStyle("top", c.toFixed() + "px")
                                    }, show: function() {
                                        this.create(CKEDITOR.dialog.getCurrent());
                                        this.throbberCover.setStyle("visibility",
                                                "");
                                        this.timer = setInterval(CKEDITOR.tools.bind(this.update, this), 100)
                                    }, hide: function() {
                                        if (this.timer) {
                                            clearInterval(this.timer);
                                            this.timer = null
                                        }
                                        this.throbberCover && this.throbberCover.setStyle("visibility", "hidden")
                                    }};
                            this.throbber.show()
                        };
                        b.on("simpleuploads.startUpload", function(a) {
                            var b = a.editor, c = b.config, d = a.data && a.data.file;
                            if (c.simpleuploads_maxFileSize && d && d.size && d.size > c.simpleuploads_maxFileSize) {
                                alert(b.lang.simpleuploads.fileTooBig);
                                a.cancel()
                            }
                            d = a.data.name;
                            if (c.simpleuploads_invalidExtensions &&
                                    RegExp(".(?:" + c.simpleuploads_invalidExtensions + ")$", "i").test(d)) {
                                alert(b.lang.simpleuploads.invalidExtension);
                                a.cancel()
                            }
                            if (c.simpleuploads_acceptedExtensions && !RegExp(".(?:" + c.simpleuploads_acceptedExtensions + ")$", "i").test(d)) {
                                alert(b.lang.simpleuploads.nonAcceptedExtension.replace("%0", c.simpleuploads_acceptedExtensions));
                                a.cancel()
                            }
                        });
                        b.on("simpleuploads.startUpload", function(a) {
                            var b = a.data, c = a.editor;
                            if (!b.image && !b.forceLink && CKEDITOR.plugins.simpleuploads.isImageExtension(c, b.name) && b.mode &&
                                    b.mode.type && c.hasListeners("simpleuploads.localImageReady")) {
                                a.cancel();
                                if (b.mode.type == "base64paste") {
                                    var d = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                                    b.result = "<span id='" + d + "' class='SimpleUploadsTmpWrapper'>&nbsp</span>";
                                    b.mode.id = d
                                }
                                var e = new Image;
                                e.onload = function() {
                                    var d = CKEDITOR.tools.extend({}, b);
                                    d.image = e;
                                    typeof c.fire("simpleuploads.localImageReady", d) != "boolean" && CKEDITOR.plugins.simpleuploads.insertProcessedFile(a.editor, d)
                                };
                                e.src = typeof b.file == "string" ? b.file : URL.createObjectURL(b.file)
                            }
                        });
                        if (f.simpleuploads_convertBmp)
                            b.on("simpleuploads.localImageReady", d);
                        if (f.simpleuploads_maximumDimensions)
                            b.on("simpleuploads.localImageReady", e);
                        b.on("simpleuploads.finishedUpload", function(a) {
                            if (b.widgets && b.plugins.image2) {
                                a = a.data.element;
                                if (a.getName() == "img") {
                                    var c = b.widgets.getByElement(a);
                                    if (c) {
                                        c.data.src = a.data("cke-saved-src");
                                        c.data.width = a.$.width;
                                        c.data.height = a.$.height
                                    } else {
                                        b.widgets.initOn(a, "image2");
                                        b.widgets.initOn(a, "image")
                                    }
                                }
                            }
                        });
                        b.on("paste", function(a) {
                            var c = a.data;
                            if (c = c.html ||
                                    c.type && c.type == "html" && c.dataValue) {
                                if (CKEDITOR.env.webkit && c.indexOf("webkit-fake-url") > 0) {
                                    alert("Sorry, the images pasted with Safari aren't usable");
                                    window.open("https://bugs.webkit.org/show_bug.cgi?id=49141");
                                    c = c.replace(/<img src="webkit-fake-url:.*?">/g, "")
                                }
                                c = c.replace(/<img(.*?) src="data:image\/.{3,4};base64,.*?"(.*?)>/g, function(a) {
                                    if (!b.config.filebrowserImageUploadUrl)
                                        return"";
                                    var c = a.match(/"(data:image\/(.{3,4});base64,.*?)"/), d = c[1], c = c[2].toLowerCase(), e = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                                    if (d.length < 128)
                                        return a;
                                    c == "jpeg" && (c = "jpg");
                                    var f = {context: "pastedimage", name: e + "." + c, id: e, forceLink: false, file: d, mode: {type: "base64paste"}};
                                    if (!m(b, f))
                                        return f.result;
                                    var a = f.element, g = a.$.innerHTML;
                                    a.$.innerHTML = "&nbsp;";
                                    b.on("afterPaste", function(a) {
                                        a.removeListener();
                                        if (a = b.document.$.getElementById(e)) {
                                            a.innerHTML = g;
                                            r(b, f)
                                        }
                                    });
                                    return a.getOuterHtml()
                                });
                                a.data.html ? a.data.html = c : a.data.dataValue = c
                            }
                        });
                        var f = function(a) {
                            if (b.mode == "wysiwyg") {
                                var c = b.document;
                                b.editable && (c = b.editable());
                                if (c.$.querySelector(".SimpleUploadsTmpWrapper")) {
                                    a =
                                            a.name.substr(5).toLowerCase();
                                    a == "redo" && b.getCommand(a).state == CKEDITOR.TRISTATE_DISABLED && (a = "undo");
                                    b.execCommand(a)
                                }
                            }
                        }, g = b.getCommand("undo");
                        g && g.on("afterUndo", f);
                        (g = b.getCommand("redo")) && b.getCommand("redo").on("afterRedo", f);
                        b.on("afterUndo", f);
                        b.on("afterRedo", f);
                        b.addCommand("addFile", {exec: function(b) {
                                a(b, false, this)
                            }});
                        b.ui.addButton("addFile", {label: b.lang.simpleuploads.addFile, command: "addFile", toolbar: "insert", allowedContent: "a[!href];span[id](SimpleUploadsTmpWrapper);", requiredContent: "a[!href]"});
                        b.addCommand("addImage", {exec: function(b) {
                                a(b, true, this)
                            }});
                        b.ui.addButton && b.ui.addButton("addImage", {label: b.lang.simpleuploads.addImage, command: "addImage", toolbar: "insert", allowedContent: "img[!src,width,height];span[id](SimpleUploadsTmpWrapper);", requiredContent: "img[!src]"});
                        if (typeof FormData != "undefined") {
                            var h, i, j, l = -1, n, o, q, s = -1, t, v, w, x = function() {
                                var a = CKEDITOR.dialog.getCurrent();
                                a ? a.parts.title.getParent().removeClass("SimpleUploadsOverCover") : b.container.removeClass("SimpleUploadsOverContainer")
                            };
                            b.on("destroy", function() {
                                CKEDITOR.removeListener("simpleuploads.droppedFile", x);
                                CKEDITOR.document.removeListener("dragenter", z);
                                CKEDITOR.document.removeListener("dragleave", C);
                                y()
                            });
                            var y = function() {
                                if (h && h.removeListener) {
                                    j.removeListener("paste", p);
                                    h.removeListener("dragenter", V);
                                    h.removeListener("dragleave", W);
                                    h.removeListener("dragover", Z);
                                    h.removeListener("drop", F);
                                    i = h = j = null
                                }
                            };
                            CKEDITOR.on("simpleuploads.droppedFile", x);
                            var z = function(a) {
                                if (s == -1 && k(a)) {
                                    if (a = CKEDITOR.dialog.getCurrent()) {
                                        if (!a.handleFileDrop)
                                            return;
                                        a.parts.title.getParent().addClass("SimpleUploadsOverCover")
                                    } else
                                        b.readOnly || b.container.addClass("SimpleUploadsOverContainer");
                                    t = s = 0;
                                    v = CKEDITOR.document.$.body.parentNode.clientWidth;
                                    w = CKEDITOR.document.$.body.parentNode.clientHeight
                                }
                            }, C = function(a) {
                                if (s != -1) {
                                    a = a.data.$;
                                    if (a.clientX <= s || a.clientY <= t || a.clientX >= v || a.clientY >= w) {
                                        x();
                                        s = -1
                                    }
                                }
                            };
                            CKEDITOR.document.on("dragenter", z);
                            CKEDITOR.document.on("dragleave", C);
                            var F = function(a) {
                                i.removeClass("SimpleUploadsOverEditor");
                                l = -1;
                                CKEDITOR.fire("simpleuploads.droppedFile");
                                s = -1;
                                if (b.readOnly) {
                                    a.data.preventDefault();
                                    return false
                                }
                                var c = a.data.$, d = c.dataTransfer;
                                if (d && d.files && d.files.length > 0) {
                                    b.fire("saveSnapshot");
                                    a.data.preventDefault();
                                    for (var a = {ev: c, range: false, count: d.files.length, rangeParent: c.rangeParent, rangeOffset: c.rangeOffset}, e = 0; e < d.files.length; e++) {
                                        var f = d.files[e], g = CKEDITOR.tools.getNextId();
                                        CKEDITOR.plugins.simpleuploads.insertDroppedFile(b, {context: c, name: f.name, file: f, forceLink: c.shiftKey, id: g, mode: {type: "droppedFile", dropLocation: a}})
                                    }
                                }
                            }, V = function(a) {
                                if (l ==
                                        -1 && k(a)) {
                                    b.readOnly || i.addClass("SimpleUploadsOverEditor");
                                    a = i.$.getBoundingClientRect();
                                    l = a.left;
                                    n = a.top;
                                    o = l + i.$.clientWidth;
                                    q = n + i.$.clientHeight
                                }
                            }, W = function(a) {
                                if (l != -1) {
                                    a = a.data.$;
                                    if (a.clientX <= l || a.clientY <= n || a.clientX >= o || a.clientY >= q) {
                                        i.removeClass("SimpleUploadsOverEditor");
                                        l = -1
                                    }
                                }
                            }, Z = function(a) {
                                if (l != -1) {
                                    if (b.readOnly) {
                                        a.data.$.dataTransfer.dropEffect = "none";
                                        a.data.preventDefault();
                                        return false
                                    }
                                    a.data.$.dataTransfer.dropEffect = "copy";
                                    CKEDITOR.env.gecko || a.data.preventDefault()
                                }
                            };
                            b.on("contentDom",
                                    function() {
                                        h = b.document;
                                        i = h.getBody().getParent();
                                        if (b.elementMode == 3)
                                            i = h = b.element;
                                        if (b.elementMode == 1 && "divarea"in b.plugins)
                                            i = h = b.editable();
                                        j = b.editable ? b.editable() : h;
                                        if (CKEDITOR.env.ie && CKEDITOR.env.version >= 11 && b.config.forcePasteAsPlainText && b.editable().isInline())
                                            j.attachListener(j, "beforepaste", function() {
                                                b.document.on("paste", function(a) {
                                                    a.removeListener();
                                                    p(a)
                                                }, null, {editor: b})
                                            });
                                        else
                                            j.on("paste", p, null, {editor: b}, 8);
                                        h.on("dragenter", V);
                                        h.on("dragleave", W);
                                        if (!CKEDITOR.env.gecko)
                                            h.on("dragover",
                                                    Z);
                                        h.on("drop", F)
                                    });
                            b.on("contentDomUnload", y);
                            b.plugins.fileDropHandler = {addTarget: function(a, c) {
                                    a.on("dragenter", function(b) {
                                        if (l == -1 && k(b)) {
                                            a.addClass("SimpleUploadsOverDialog");
                                            b = a.$.getBoundingClientRect();
                                            l = b.left;
                                            n = b.top;
                                            o = l + a.$.clientWidth;
                                            q = n + a.$.clientHeight
                                        }
                                    });
                                    a.on("dragleave", function(b) {
                                        if (l != -1) {
                                            b = b.data.$;
                                            if (b.clientX <= l || b.clientY <= n || b.clientX >= o || b.clientY >= q) {
                                                a.removeClass("SimpleUploadsOverDialog");
                                                l = -1
                                            }
                                        }
                                    });
                                    a.on("dragover", function(a) {
                                        if (l != -1) {
                                            a.data.$.dataTransfer.dropEffect =
                                                    "copy";
                                            a.data.preventDefault()
                                        }
                                    });
                                    a.on("drop", function(d) {
                                        a.removeClass("SimpleUploadsOverDialog");
                                        l = -1;
                                        CKEDITOR.fire("simpleuploads.droppedFile");
                                        s = -1;
                                        var e = d.data.$, f = e.dataTransfer;
                                        if (f && f.files && f.files.length > 0) {
                                            d.data.preventDefault();
                                            for (d = 0; d < 1; d++) {
                                                var g = f.files[d], g = {context: e, name: g.name, file: g, id: CKEDITOR.tools.getNextId(), forceLink: false, callback: c, mode: {type: "callback"}};
                                                CKEDITOR.plugins.simpleuploads.processFileWithCallback(b, g)
                                            }
                                        }
                                    })
                                }}
                        }
                    }
                }, afterInit: function(a) {
                    (a = (a = a.dataProcessor) &&
                            a.htmlFilter) && a.addRules(t, {applyToAll: true})
                }});
            CKEDITOR.plugins.simpleuploads = {getTimeStampId: function() {
                    var a = 0;
                    return function() {
                        a++;
                        return(new Date).toISOString().replace(/\..*/, "").replace(/\D/g, "_") + a
                    }
                }(), isImageExtension: function(a, b) {
                    return!a.config.simpleuploads_imageExtensions ? false : RegExp(".(?:" + a.config.simpleuploads_imageExtensions + ")$", "i").test(b)
                }, insertProcessedFile: function(a, b) {
                    b.element = null;
                    b.id = this.getTimeStampId();
                    switch (b.mode.type) {
                        case "selectedFile":
                            this.insertSelectedFile(a,
                                    b);
                            break;
                        case "pastedFile":
                            this.insertPastedFile(a, b);
                            break;
                        case "callback":
                            this.processFileWithCallback(a, b);
                            break;
                        case "droppedFile":
                            this.insertDroppedFile(a, b);
                            break;
                        case "base64paste":
                            this.insertBase64File(a, b);
                            break;
                        default:
                            alert("Error, no valid type", b.mode)
                        }
                }, insertSelectedFile: function(a, b) {
                    var c = b.mode, d = c.i, e = c.count;
                    if (m(a, b))
                        if (c = b.element) {
                            if (e == 1) {
                                var f = a.getSelection(), e = f.getSelectedElement(), g;
                                if (e && e.getName() == "img" && c.getName() == "span")
                                    g = e.$;
                                if (c.getName() == "a") {
                                    var h = e, i = f.getRanges(),
                                            f = i && i[0];
                                    if (!h && i && i.length == 1) {
                                        h = f.startContainer.$;
                                        if (h.nodeType == document.TEXT_NODE)
                                            h = h.parentNode
                                    }
                                    for (; h && h.nodeType == document.ELEMENT_NODE && h.nodeName.toLowerCase() != "a"; )
                                        h = h.parentNode;
                                    h && (h.nodeName && h.nodeName.toLowerCase() == "a") && (g = h);
                                    if (!g && f && (e || !f.collapsed)) {
                                        g = new CKEDITOR.style({element: "a", attributes: {href: "#"}});
                                        g.type = CKEDITOR.STYLE_INLINE;
                                        g.applyToRange(f);
                                        h = f.startContainer.$;
                                        if (h.nodeType == document.TEXT_NODE)
                                            h = h.parentNode;
                                        g = h
                                    }
                                }
                                if (g) {
                                    g.parentNode.replaceChild(c.$, g);
                                    b.originalNode =
                                            g;
                                    a.fire("saveSnapshot");
                                    return
                                }
                            }
                            d > 0 && c.getName() == "a" && a.insertHtml("&nbsp;");
                            a.insertElement(c);
                            r(a, b)
                        }
                }, insertPastedFile: function(a, b) {
                    if (m(a, b)) {
                        var c = b.element;
                        if (b.mode.dialog) {
                            a.fire("updateSnapshot");
                            a.insertElement(c);
                            a.fire("updateSnapshot")
                        } else {
                            var d = function() {
                                if (a.getSelection().getRanges().length) {
                                    a.fire("updateSnapshot");
                                    a.insertElement(c);
                                    a.fire("updateSnapshot");
                                    r(a, b)
                                } else
                                    window.setTimeout(d, 0)
                            };
                            window.setTimeout(d, 0)
                        }
                    }
                }, processFileWithCallback: function(a, b) {
                    m(a, b)
                }, insertDroppedFile: function(a,
                        b) {
                    if (m(a, b)) {
                        var c = b.element, d = b.mode.dropLocation, e = d.range, f = d.ev, g = d.count;
                        e && c.getName() == "a" && (e.pasteHTML ? e.pasteHTML("&nbsp;") : e.insertNode(a.document.$.createTextNode(" ")));
                        var h = f.target;
                        if (!e) {
                            var i = a.document.$;
                            if (d.rangeParent) {
                                var f = d.rangeParent, j = d.rangeOffset, e = i.createRange();
                                e.setStart(f, j);
                                e.collapse(true)
                            } else if (document.caretRangeFromPoint)
                                e = i.caretRangeFromPoint(f.clientX, f.clientY);
                            else if (h.nodeName.toLowerCase() == "img") {
                                e = i.createRange();
                                e.selectNode(h)
                            } else if (document.body.createTextRange) {
                                j =
                                        i.body.createTextRange();
                                try {
                                    j.moveToPoint(f.clientX, f.clientY);
                                    e = j
                                } catch (k) {
                                    e = i.createRange();
                                    e.setStartAfter(i.body.lastChild);
                                    e.collapse(true)
                                }
                            }
                            d.range = e
                        }
                        i = c.getName();
                        d = false;
                        if (g == 1) {
                            if (h.nodeName.toLowerCase() == "img" && i == "span") {
                                h.parentNode.replaceChild(c.$, h);
                                b.originalNode = h;
                                d = true
                            }
                            if (i == "a") {
                                if (e.startContainer) {
                                    g = e.startContainer;
                                    g.nodeType == document.TEXT_NODE ? g = g.parentNode : e.startOffset < g.childNodes.length && (g = g.childNodes[e.startOffset])
                                } else
                                    g = e.parentElement();
                                if (!g || h.nodeName.toLowerCase() ==
                                        "img")
                                    g = h;
                                for (h = g; h && h.nodeType == document.ELEMENT_NODE && h.nodeName.toLowerCase() != "a"; )
                                    h = h.parentNode;
                                if (h && h.nodeName && h.nodeName.toLowerCase() == "a") {
                                    h.parentNode.replaceChild(c.$, h);
                                    b.originalNode = h;
                                    d = true
                                }
                                if (!d && g.nodeName.toLowerCase() == "img") {
                                    h = g.ownerDocument.createElement("a");
                                    h.href = "#";
                                    g.parentNode.replaceChild(h, g);
                                    h.appendChild(g);
                                    h.parentNode.replaceChild(c.$, h);
                                    b.originalNode = h;
                                    d = true
                                }
                            }
                        }
                        d || (e ? e.pasteHTML ? e.pasteHTML(c.$.outerHTML) : e.insertNode(c.$) : a.insertElement(c));
                        r(a, b);
                        a.fire("saveSnapshot")
                    }
                },
                insertBase64File: function(a, b) {
                    delete b.result;
                    var c = a.document.getById(b.mode.id);
                    if (m(a, b)) {
                        a.getSelection().selectElement(c);
                        a.insertElement(b.element);
                        r(a, b)
                    } else {
                        c.remove();
                        b.result && a.insertHTML(b.result)
                    }
                }};
            if (CKEDITOR.skins)
                CKEDITOR.plugins.setLang = CKEDITOR.tools.override(CKEDITOR.plugins.setLang, function(a) {
                    return function(b, c, d) {
                        if (b != "devtools" && typeof d[b] != "object") {
                            var e = {};
                            e[b] = d;
                            d = e
                        }
                        a.call(this, b, c, d)
                    }
                });
            CKEDITOR.on("dialogDefinition", function(a) {
                if (a.editor.plugins.simpleuploads) {
                    var b =
                            a.data.definition, c;
                    for (c in b.contents) {
                        var d = b.contents[c];
                        d && l(a.editor, a.data.name, b, d.elements)
                    }
                    if (a.data.name == "paste")
                        b.onShow = CKEDITOR.tools.override(b.onShow, function(a) {
                            return function() {
                                typeof a == "function" && a.call(this);
                                w(this.getContentElement("general", "editing_area").getInputElement())
                            }
                        })
                }
            }, null, null, 30)
        }(), CKEDITOR.config.plugins = "basicstyles,dialogui,dialog,colordialog,clipboard,panel,floatpanel,menu,contextmenu,elementspath,enterkey,entities,popup,filebrowser,floatingspace,htmlwriter,image,justify,fakeobjects,link,maximize,preview,resize,selectall,sourcearea,button,toolbar,undo,wysiwygarea,simpleuploads",
                CKEDITOR.config.skin = "alive", function() {
                    var d = function(d, c) {
                        for (var a = CKEDITOR.getUrl("plugins/" + c), d = d.split(","), b = 0; b < d.length; b++)
                            CKEDITOR.skin.icons[d[b]] = {path: a, offset: -d[++b], bgsize: d[++b]}
                    };
                    CKEDITOR.env.hidpi ? d("bold,0,,italic,24,,strike,48,,subscript,72,,superscript,96,,underline,120,,copy-rtl,144,,copy,168,,cut-rtl,192,,cut,216,,paste-rtl,240,,paste,264,,image,288,,justifyblock,312,,justifycenter,336,,justifyleft,360,,justifyright,384,,anchor-rtl,408,,anchor,432,,link,456,,unlink,480,,maximize,504,,preview-rtl,528,,preview,552,,selectall,576,,addfile,1200,auto,addimage,1248,auto,source-rtl,648,,source,672,,redo-rtl,696,,redo,720,,undo-rtl,744,,undo,768,",
                            "icons_hidpi.png") : d("bold,0,auto,italic,24,auto,strike,48,auto,subscript,72,auto,superscript,96,auto,underline,120,auto,copy-rtl,144,auto,copy,168,auto,cut-rtl,192,auto,cut,216,auto,paste-rtl,240,auto,paste,264,auto,image,288,auto,justifyblock,312,auto,justifycenter,336,auto,justifyleft,360,auto,justifyright,384,auto,anchor-rtl,408,auto,anchor,432,auto,link,456,auto,unlink,480,auto,maximize,504,auto,preview-rtl,528,auto,preview,552,auto,selectall,576,auto,addfile,600,auto,addimage,624,auto,source-rtl,648,auto,source,672,auto,redo-rtl,696,auto,redo,720,auto,undo-rtl,744,auto,undo,768,auto",
                            "icons.png")
                }(), CKEDITOR.lang.languages = {en: 1, ar: 1, cs: 1, de: 1, es: 1, fr: 1, he: 1, hu: 1, it: 1, ja: 1, ko: 1, nl: 1, pl: 1, "pt-br": 1, ru: 1, tr: 1, "zh-cn": 1}
})();
CKEDITOR.editorConfig = function(d) {
    d.toolbarGroups = [{name: "document", groups: ["mode", "document", "doctools"]}, {name: "clipboard", groups: ["clipboard", "undo"]}, {name: "basicstyles", groups: ["basicstyles", "cleanup"]}, {name: "links"}, {name: "insert"}, {name: "tools"}, {name: "others"}, {name: "about"}]
};