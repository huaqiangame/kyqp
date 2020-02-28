var __reflect = this && this.__reflect || function(e, t, o) {
    e.__class__ = t, o ? o.push(t) : o = [t], e.__types__ = e.__types__ ? o.concat(e.__types__) : o
};
egret.DisplayObject.prototype.$getConcatenatedVisible = function() {
    if (this.$parent) {
        var e = this.$parent.$getConcatenatedVisible();
        return e && this.$visible
    }
    return this.$visible
};
var mouse;
! function(e) {
    var t, o, n, s = 0 / 0,
        u = 0 / 0,
        r = !1,
        i = !1,
        c = !1,
        a = function(s, u, r, i) {
            if (s != e.MouseEvent.ROLL_OVER || !t.isRollOver) {
                if (s == e.MouseEvent.ROLL_OVER ? t.isRollOver = !0 : s == e.MouseEvent.ROLL_OUT && delete t.isRollOver, n && t.buttonModeForMouse) try {
                    var c = o.$displayList.renderBuffer.surface;
                    s == e.MouseEvent.ROLL_OVER ? c.style.cursor = "pointer" : s == e.MouseEvent.ROLL_OUT && (c.style.cursor = "auto")
                } catch (a) {}
                egret.TouchEvent.dispatchTouchEvent(t, s, u, !1, r, i, null)
            }
        };
    e.enable = function(t) {
        if (!i) {
            i = !0, n = "Windows PC" == egret.Capabilities.os || "Mac OS" == egret.Capabilities.os, o = t, n && O();
            var a = egret.sys.TouchHandler.prototype.onTouchMove;
            egret.sys.TouchHandler.prototype.onTouchMove = function(t, n, r) {
                if (s = t, u = n, a.call(this, t, n, r), l) {
                    var i = o.$hitTest(t, n);
                    i || (i = o), egret.TouchEvent.dispatchTouchEvent(i, e.MouseEvent.MOUSE_MOVE, !0, !0, t, n, r, !0)
                }
                v(t, n)
            };
            var h = egret.sys.TouchHandler.prototype.onTouchBegin;
            egret.sys.TouchHandler.prototype.onTouchBegin = function(e, t, o) {
                h.call(this, e, t, o), v(e, t)
            };
            var M = egret.web.WebTouchHandler.prototype.getLocation;
            egret.web.WebTouchHandler.prototype.getLocation = function(e) {
                return 0 == e.buttons && (r = !0), M.call(this, e)
            };
            var _ = egret.sys.TouchHandler.prototype.onTouchEnd;
            egret.sys.TouchHandler.prototype.onTouchEnd = function(t, n, i) {
                if (r) {
                    if (r = !1, s = t, u = n, _.call(this, t, n, i), l) {
                        var c = o.$hitTest(t, n);
                        c || (c = o), egret.TouchEvent.dispatchTouchEvent(c, e.MouseEvent.MOUSE_MOVE, !0, !0, t, n, i, !0)
                    }
                } else _.call(this, t, n, i), v(t, n)
            }
        }
        c || (o.addEventListener(egret.Event.ENTER_FRAME, E, this), c = !0)
    }, e.disable = function() {
        c && (o && o.removeEventListener(egret.Event.ENTER_FRAME, E, this), c = !1)
    }, e.setButtonMode = function(e, t) {
        e.buttonModeForMouse = t
    };
    var l = !1;
    e.setMouseMoveEnabled = function(e) {
        l = e
    };
    var E = function() {
            0 / 0 != s && 0 / 0 != u && v(s, u)
        },
        v = function(n, s) {
            t && !t.$stage && (a(e.MouseEvent.MOUSE_OUT, !0, n, s), a(e.MouseEvent.ROLL_OUT, !1, n, s), t = null);
            var u = o.$hitTest(n, s);
            null != u && u != o ? t ? u != t && (a(e.MouseEvent.MOUSE_OUT, !0, n, s), t.$getConcatenatedVisible() && t.hitTestPoint(n, s, !0) || a(e.MouseEvent.ROLL_OUT, !1, n, s), t = u, a(e.MouseEvent.ROLL_OVER, !1, n, s), a(e.MouseEvent.MOUSE_OVER, !0, n, s)) : (t = u, a(e.MouseEvent.ROLL_OVER, !1, n, s), a(e.MouseEvent.MOUSE_OVER, !0, n, s)) : t && (a(e.MouseEvent.MOUSE_OUT, !0, n, s), a(e.MouseEvent.ROLL_OUT, !1, n, s), t = null)
        },
        O = function() {
            var t = "mousewheel",
                n = function(t) {
                    var n = t.type;
                    ("DOMMouseScroll" == n || "mousewheel" == n) && (t.delta = t.wheelDelta ? t.wheelDelta : -(t.detail || 0), o.dispatchEventWith(e.MouseEvent.MOUSE_WHEEL, !1, t.delta))
                };
            window.addEventListener ? ("mousewheel" === t && void 0 !== document.mozFullScreen && (t = "DOMMouseScroll"), window.addEventListener(t, function(e) {
                n(e)
            }, !1)) : window.attachEvent && window.attachEvent("on" + t, function(e) {
                e = e || window.event, n(e)
            })
        }
}(mouse || (mouse = {}));
var mouse;
! function(e) {
    var t = function() {
        function e() {}
        return e.MOUSE_MOVE = "mouseMove", e.MOUSE_OVER = "mouseOver", e.MOUSE_OUT = "mouseOut", e.ROLL_OVER = "rollOver", e.ROLL_OUT = "rollOut", e.MOUSE_WHEEL = "mouseWheel", e
    }();
    e.MouseEvent = t, __reflect(t.prototype, "mouse.MouseEvent")
}(mouse || (mouse = {}));