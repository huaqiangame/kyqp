/*!
 * screenfull
 * v4.0.0 - 2018-12-15
 * (c) Sindre Sorhus; MIT License
 */

! function() {
    "use strict";
    var u = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
        e = "undefined" != typeof module && module.exports,
        t = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        c = function() {
            for (var e, n = [
                    ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                    ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                    ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                ], r = 0, l = n.length, t = {}; r < l; r++)
                if ((e = n[r]) && e[1] in u) {
                    for (r = 0; r < e.length; r++) t[n[0][r]] = e[r];
                    return t
                }
            return !1
        }(),
        l = {
            change: c.fullscreenchange,
            error: c.fullscreenerror
        },
        n = {
            request: function(l) {
                return new Promise(function(e) {
                    var n = c.requestFullscreen,
                        r = function() {
                            this.off("change", r), e()
                        }.bind(this);
                    l = l || u.documentElement, / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent) ? l[n]() : l[n](t ? Element.ALLOW_KEYBOARD_INPUT : {}), this.on("change", r)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(e) {
                    var n = function() {
                        this.off("change", n), e()
                    }.bind(this);
                    u[c.exitFullscreen](), this.on("change", n)
                }.bind(this))
            },
            toggle: function(e) {
                return this.isFullscreen ? this.exit() : this.request(e)
            },
            onchange: function(e) {
                this.on("change", e)
            },
            onerror: function(e) {
                this.on("error", e)
            },
            on: function(e, n) {
                var r = l[e];
                r && u.addEventListener(r, n, !1)
            },
            off: function(e, n) {
                var r = l[e];
                r && u.removeEventListener(r, n, !1)
            },
            raw: c
        };
    c ? (Object.defineProperties(n, {
        isFullscreen: {
            get: function() {
                return Boolean(u[c.fullscreenElement])
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return u[c.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function() {
                return Boolean(u[c.fullscreenEnabled])
            }
        }
    }), e ? module.exports = n : window.screenfull = n) : e ? module.exports = !1 : window.screenfull = !1
}();