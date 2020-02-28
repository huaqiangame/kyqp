"use strict";
var __extends = this && this.__extends || function() {
    var t = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(t, e) {
        t.__proto__ = e
    } || function(t, e) {
        for (var a in e)
            if (e.hasOwnProperty(a)) t[a] = e[a]
    };
    return function(e, a) {
        t(e, a);

        function r() {
            this.constructor = e
        }
        e.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r)
    }
}();
var dragonBones;
(function(t) {})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function e(a) {
            this._clock = new t.WorldClock;
            this._events = [];
            this._objects = [];
            this._eventManager = null;
            this._eventManager = a;
            console.info("DragonBones: " + e.VERSION + "\nWebsite: http://dragonbones.com/\nSource and Demo: https://github.com/DragonBones/")
        }
        e.prototype.advanceTime = function(e) {
            if (this._objects.length > 0) {
                for (var a = 0, r = this._objects; a < r.length; a++) {
                    var i = r[a];
                    i.returnToPool()
                }
                this._objects.length = 0
            }
            this._clock.advanceTime(e);
            if (this._events.length > 0) {
                for (var n = 0; n < this._events.length; ++n) {
                    var s = this._events[n];
                    var o = s.armature;
                    if (o._armatureData !== null) {
                        o.eventDispatcher.dispatchDBEvent(s.type, s);
                        if (s.type === t.EventObject.SOUND_EVENT) {
                            this._eventManager.dispatchDBEvent(s.type, s)
                        }
                    }
                    this.bufferObject(s)
                }
                this._events.length = 0
            }
        };
        e.prototype.bufferEvent = function(t) {
            if (this._events.indexOf(t) < 0) {
                this._events.push(t)
            }
        };
        e.prototype.bufferObject = function(t) {
            if (this._objects.indexOf(t) < 0) {
                this._objects.push(t)
            }
        };
        Object.defineProperty(e.prototype, "clock", {
            get: function() {
                return this._clock
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "eventManager", {
            get: function() {
                return this._eventManager
            },
            enumerable: true,
            configurable: true
        });
        e.VERSION = "5.6.300";
        e.yDown = true;
        e.debug = false;
        e.debugDraw = false;
        e.webAssembly = false;
        return e
    }();
    t.DragonBones = e
})(dragonBones || (dragonBones = {}));
if (typeof global === "undefined") {
    var global = window
}
if (!console.warn) {
    console.warn = function() {}
}
if (!console.assert) {
    console.assert = function() {}
}
if (!Date.now) {
    Date.now = function t() {
        return (new Date).getTime()
    }
}
var __extends = function(t, e) {
    function a() {
        this.constructor = t
    }
    for (var r in e) {
        if (e.hasOwnProperty(r)) {
            t[r] = e[r]
        }
    }
    a.prototype = e.prototype, t.prototype = new a
};
var dragonBones;
(function(t) {
    var e = function() {
        function t() {
            this.hashCode = t._hashCode++;
            this._isInPool = false
        }
        t._returnObject = function(e) {
            var a = String(e.constructor);
            var r = a in t._maxCountMap ? t._maxCountMap[a] : t._defaultMaxCount;
            var i = t._poolsMap[a] = t._poolsMap[a] || [];
            if (i.length < r) {
                if (!e._isInPool) {
                    e._isInPool = true;
                    i.push(e)
                } else {
                    console.warn("The object is already in the pool.")
                }
            } else {}
        };
        t.toString = function() {
            throw new Error
        };
        t.setMaxCount = function(e, a) {
            if (a < 0 || a !== a) {
                a = 0
            }
            if (e !== null) {
                var r = String(e);
                var i = r in t._poolsMap ? t._poolsMap[r] : null;
                if (i !== null && i.length > a) {
                    i.length = a
                }
                t._maxCountMap[r] = a
            } else {
                t._defaultMaxCount = a;
                for (var r in t._poolsMap) {
                    var i = t._poolsMap[r];
                    if (i.length > a) {
                        i.length = a
                    }
                    if (r in t._maxCountMap) {
                        t._maxCountMap[r] = a
                    }
                }
            }
        };
        t.clearPool = function(e) {
            if (e === void 0) {
                e = null
            }
            if (e !== null) {
                var a = String(e);
                var r = a in t._poolsMap ? t._poolsMap[a] : null;
                if (r !== null && r.length > 0) {
                    r.length = 0
                }
            } else {
                for (var i in t._poolsMap) {
                    var r = t._poolsMap[i];
                    r.length = 0
                }
            }
        };
        t.borrowObject = function(e) {
            var a = String(e);
            var r = a in t._poolsMap ? t._poolsMap[a] : null;
            if (r !== null && r.length > 0) {
                var i = r.pop();
                i._isInPool = false;
                return i
            }
            var n = new e;
            n._onClear();
            return n
        };
        t.prototype.returnToPool = function() {
            this._onClear();
            t._returnObject(this)
        };
        t._hashCode = 0;
        t._defaultMaxCount = 3e3;
        t._maxCountMap = {};
        t._poolsMap = {};
        return t
    }();
    t.BaseObject = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t, e, a, r, i, n) {
            if (t === void 0) {
                t = 1
            }
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = 0
            }
            if (r === void 0) {
                r = 1
            }
            if (i === void 0) {
                i = 0
            }
            if (n === void 0) {
                n = 0
            }
            this.a = t;
            this.b = e;
            this.c = a;
            this.d = r;
            this.tx = i;
            this.ty = n
        }
        t.prototype.toString = function() {
            return "[object dragonBones.Matrix] a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty
        };
        t.prototype.copyFrom = function(t) {
            this.a = t.a;
            this.b = t.b;
            this.c = t.c;
            this.d = t.d;
            this.tx = t.tx;
            this.ty = t.ty;
            return this
        };
        t.prototype.copyFromArray = function(t, e) {
            if (e === void 0) {
                e = 0
            }
            this.a = t[e];
            this.b = t[e + 1];
            this.c = t[e + 2];
            this.d = t[e + 3];
            this.tx = t[e + 4];
            this.ty = t[e + 5];
            return this
        };
        t.prototype.identity = function() {
            this.a = this.d = 1;
            this.b = this.c = 0;
            this.tx = this.ty = 0;
            return this
        };
        t.prototype.concat = function(t) {
            var e = this.a * t.a;
            var a = 0;
            var r = 0;
            var i = this.d * t.d;
            var n = this.tx * t.a + t.tx;
            var s = this.ty * t.d + t.ty;
            if (this.b !== 0 || this.c !== 0) {
                e += this.b * t.c;
                a += this.b * t.d;
                r += this.c * t.a;
                i += this.c * t.b
            }
            if (t.b !== 0 || t.c !== 0) {
                a += this.a * t.b;
                r += this.d * t.c;
                n += this.ty * t.c;
                s += this.tx * t.b
            }
            this.a = e;
            this.b = a;
            this.c = r;
            this.d = i;
            this.tx = n;
            this.ty = s;
            return this
        };
        t.prototype.invert = function() {
            var t = this.a;
            var e = this.b;
            var a = this.c;
            var r = this.d;
            var i = this.tx;
            var n = this.ty;
            if (e === 0 && a === 0) {
                this.b = this.c = 0;
                if (t === 0 || r === 0) {
                    this.a = this.b = this.tx = this.ty = 0
                } else {
                    t = this.a = 1 / t;
                    r = this.d = 1 / r;
                    this.tx = -t * i;
                    this.ty = -r * n
                }
                return this
            }
            var s = t * r - e * a;
            if (s === 0) {
                this.a = this.d = 1;
                this.b = this.c = 0;
                this.tx = this.ty = 0;
                return this
            }
            s = 1 / s;
            var o = this.a = r * s;
            e = this.b = -e * s;
            a = this.c = -a * s;
            r = this.d = t * s;
            this.tx = -(o * i + a * n);
            this.ty = -(e * i + r * n);
            return this
        };
        t.prototype.transformPoint = function(t, e, a, r) {
            if (r === void 0) {
                r = false
            }
            a.x = this.a * t + this.c * e;
            a.y = this.b * t + this.d * e;
            if (!r) {
                a.x += this.tx;
                a.y += this.ty
            }
        };
        t.prototype.transformRectangle = function(t, e) {
            if (e === void 0) {
                e = false
            }
            var a = this.a;
            var r = this.b;
            var i = this.c;
            var n = this.d;
            var s = e ? 0 : this.tx;
            var o = e ? 0 : this.ty;
            var l = t.x;
            var h = t.y;
            var f = l + t.width;
            var u = h + t.height;
            var _ = a * l + i * h + s;
            var c = r * l + n * h + o;
            var p = a * f + i * h + s;
            var m = r * f + n * h + o;
            var d = a * f + i * u + s;
            var v = r * f + n * u + o;
            var y = a * l + i * u + s;
            var g = r * l + n * u + o;
            var b = 0;
            if (_ > p) {
                b = _;
                _ = p;
                p = b
            }
            if (d > y) {
                b = d;
                d = y;
                y = b
            }
            t.x = Math.floor(_ < d ? _ : d);
            t.width = Math.ceil((p > y ? p : y) - t.x);
            if (c > m) {
                b = c;
                c = m;
                m = b
            }
            if (v > g) {
                b = v;
                v = g;
                g = b
            }
            t.y = Math.floor(c < v ? c : v);
            t.height = Math.ceil((m > g ? m : g) - t.y)
        };
        return t
    }();
    t.Matrix = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t, e, a, r, i, n) {
            if (t === void 0) {
                t = 0
            }
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = 0
            }
            if (r === void 0) {
                r = 0
            }
            if (i === void 0) {
                i = 1
            }
            if (n === void 0) {
                n = 1
            }
            this.x = t;
            this.y = e;
            this.skew = a;
            this.rotation = r;
            this.scaleX = i;
            this.scaleY = n
        }
        t.normalizeRadian = function(t) {
            t = (t + Math.PI) % (Math.PI * 2);
            t += t > 0 ? -Math.PI : Math.PI;
            return t
        };
        t.prototype.toString = function() {
            return "[object dragonBones.Transform] x:" + this.x + " y:" + this.y + " skewX:" + this.skew * 180 / Math.PI + " skewY:" + this.rotation * 180 / Math.PI + " scaleX:" + this.scaleX + " scaleY:" + this.scaleY
        };
        t.prototype.copyFrom = function(t) {
            this.x = t.x;
            this.y = t.y;
            this.skew = t.skew;
            this.rotation = t.rotation;
            this.scaleX = t.scaleX;
            this.scaleY = t.scaleY;
            return this
        };
        t.prototype.identity = function() {
            this.x = this.y = 0;
            this.skew = this.rotation = 0;
            this.scaleX = this.scaleY = 1;
            return this
        };
        t.prototype.add = function(t) {
            this.x += t.x;
            this.y += t.y;
            this.skew += t.skew;
            this.rotation += t.rotation;
            this.scaleX *= t.scaleX;
            this.scaleY *= t.scaleY;
            return this
        };
        t.prototype.minus = function(t) {
            this.x -= t.x;
            this.y -= t.y;
            this.skew -= t.skew;
            this.rotation -= t.rotation;
            this.scaleX /= t.scaleX;
            this.scaleY /= t.scaleY;
            return this
        };
        t.prototype.fromMatrix = function(e) {
            var a = this.scaleX,
                r = this.scaleY;
            var i = t.PI_Q;
            this.x = e.tx;
            this.y = e.ty;
            this.rotation = Math.atan(e.b / e.a);
            var n = Math.atan(-e.c / e.d);
            this.scaleX = this.rotation > -i && this.rotation < i ? e.a / Math.cos(this.rotation) : e.b / Math.sin(this.rotation);
            this.scaleY = n > -i && n < i ? e.d / Math.cos(n) : -e.c / Math.sin(n);
            if (a >= 0 && this.scaleX < 0) {
                this.scaleX = -this.scaleX;
                this.rotation = this.rotation - Math.PI
            }
            if (r >= 0 && this.scaleY < 0) {
                this.scaleY = -this.scaleY;
                n = n - Math.PI
            }
            this.skew = n - this.rotation;
            return this
        };
        t.prototype.toMatrix = function(t) {
            if (this.rotation === 0) {
                t.a = 1;
                t.b = 0
            } else {
                t.a = Math.cos(this.rotation);
                t.b = Math.sin(this.rotation)
            }
            if (this.skew === 0) {
                t.c = -t.b;
                t.d = t.a
            } else {
                t.c = -Math.sin(this.skew + this.rotation);
                t.d = Math.cos(this.skew + this.rotation)
            }
            if (this.scaleX !== 1) {
                t.a *= this.scaleX;
                t.b *= this.scaleX
            }
            if (this.scaleY !== 1) {
                t.c *= this.scaleY;
                t.d *= this.scaleY
            }
            t.tx = this.x;
            t.ty = this.y;
            return this
        };
        t.PI = Math.PI;
        t.PI_D = Math.PI * 2;
        t.PI_H = Math.PI / 2;
        t.PI_Q = Math.PI / 4;
        t.RAD_DEG = 180 / Math.PI;
        t.DEG_RAD = Math.PI / 180;
        return t
    }();
    t.Transform = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t, e, a, r, i, n, s, o) {
            if (t === void 0) {
                t = 1
            }
            if (e === void 0) {
                e = 1
            }
            if (a === void 0) {
                a = 1
            }
            if (r === void 0) {
                r = 1
            }
            if (i === void 0) {
                i = 0
            }
            if (n === void 0) {
                n = 0
            }
            if (s === void 0) {
                s = 0
            }
            if (o === void 0) {
                o = 0
            }
            this.alphaMultiplier = t;
            this.redMultiplier = e;
            this.greenMultiplier = a;
            this.blueMultiplier = r;
            this.alphaOffset = i;
            this.redOffset = n;
            this.greenOffset = s;
            this.blueOffset = o
        }
        t.prototype.copyFrom = function(t) {
            this.alphaMultiplier = t.alphaMultiplier;
            this.redMultiplier = t.redMultiplier;
            this.greenMultiplier = t.greenMultiplier;
            this.blueMultiplier = t.blueMultiplier;
            this.alphaOffset = t.alphaOffset;
            this.redOffset = t.redOffset;
            this.greenOffset = t.greenOffset;
            this.blueOffset = t.blueOffset
        };
        t.prototype.identity = function() {
            this.alphaMultiplier = this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 1;
            this.alphaOffset = this.redOffset = this.greenOffset = this.blueOffset = 0
        };
        return t
    }();
    t.ColorTransform = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t, e) {
            if (t === void 0) {
                t = 0
            }
            if (e === void 0) {
                e = 0
            }
            this.x = t;
            this.y = e
        }
        t.prototype.copyFrom = function(t) {
            this.x = t.x;
            this.y = t.y
        };
        t.prototype.clear = function() {
            this.x = this.y = 0
        };
        return t
    }();
    t.Point = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t, e, a, r) {
            if (t === void 0) {
                t = 0
            }
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = 0
            }
            if (r === void 0) {
                r = 0
            }
            this.x = t;
            this.y = e;
            this.width = a;
            this.height = r
        }
        t.prototype.copyFrom = function(t) {
            this.x = t.x;
            this.y = t.y;
            this.width = t.width;
            this.height = t.height
        };
        t.prototype.clear = function() {
            this.x = this.y = 0;
            this.width = this.height = 0
        };
        return t
    }();
    t.Rectangle = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.ints = [];
            e.floats = [];
            e.strings = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.UserData]"
        };
        e.prototype._onClear = function() {
            this.ints.length = 0;
            this.floats.length = 0;
            this.strings.length = 0
        };
        e.prototype.addInt = function(t) {
            this.ints.push(t)
        };
        e.prototype.addFloat = function(t) {
            this.floats.push(t)
        };
        e.prototype.addString = function(t) {
            this.strings.push(t)
        };
        e.prototype.getInt = function(t) {
            if (t === void 0) {
                t = 0
            }
            return t >= 0 && t < this.ints.length ? this.ints[t] : 0
        };
        e.prototype.getFloat = function(t) {
            if (t === void 0) {
                t = 0
            }
            return t >= 0 && t < this.floats.length ? this.floats[t] : 0
        };
        e.prototype.getString = function(t) {
            if (t === void 0) {
                t = 0
            }
            return t >= 0 && t < this.strings.length ? this.strings[t] : ""
        };
        return e
    }(t.BaseObject);
    t.UserData = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.data = null;
            return e
        }
        e.toString = function() {
            return "[class dragonBones.ActionData]"
        };
        e.prototype._onClear = function() {
            if (this.data !== null) {
                this.data.returnToPool()
            }
            this.type = 0;
            this.name = "";
            this.bone = null;
            this.slot = null;
            this.data = null
        };
        return e
    }(t.BaseObject);
    t.ActionData = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.frameIndices = [];
            e.cachedFrames = [];
            e.armatureNames = [];
            e.armatures = {};
            e.userData = null;
            return e
        }
        e.toString = function() {
            return "[class dragonBones.DragonBonesData]"
        };
        e.prototype._onClear = function() {
            for (var t in this.armatures) {
                this.armatures[t].returnToPool();
                delete this.armatures[t]
            }
            if (this.userData !== null) {
                this.userData.returnToPool()
            }
            this.autoSearch = false;
            this.frameRate = 0;
            this.version = "";
            this.name = "";
            this.stage = null;
            this.frameIndices.length = 0;
            this.cachedFrames.length = 0;
            this.armatureNames.length = 0;
            this.binary = null;
            this.intArray = null;
            this.floatArray = null;
            this.frameIntArray = null;
            this.frameFloatArray = null;
            this.frameArray = null;
            this.timelineArray = null;
            this.userData = null
        };
        e.prototype.addArmature = function(t) {
            if (t.name in this.armatures) {
                console.warn("Same armature: " + t.name);
                return
            }
            t.parent = this;
            this.armatures[t.name] = t;
            this.armatureNames.push(t.name)
        };
        e.prototype.getArmature = function(t) {
            return t in this.armatures ? this.armatures[t] : null
        };
        e.prototype.dispose = function() {
            console.warn("已废弃");
            this.returnToPool()
        };
        return e
    }(t.BaseObject);
    t.DragonBonesData = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.aabb = new t.Rectangle;
            a.animationNames = [];
            a.sortedBones = [];
            a.sortedSlots = [];
            a.defaultActions = [];
            a.actions = [];
            a.bones = {};
            a.slots = {};
            a.constraints = {};
            a.skins = {};
            a.animations = {};
            a.canvas = null;
            a.userData = null;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.ArmatureData]"
        };
        a.prototype._onClear = function() {
            for (var t = 0, e = this.defaultActions; t < e.length; t++) {
                var a = e[t];
                a.returnToPool()
            }
            for (var r = 0, i = this.actions; r < i.length; r++) {
                var a = i[r];
                a.returnToPool()
            }
            for (var n in this.bones) {
                this.bones[n].returnToPool();
                delete this.bones[n]
            }
            for (var n in this.slots) {
                this.slots[n].returnToPool();
                delete this.slots[n]
            }
            for (var n in this.constraints) {
                this.constraints[n].returnToPool();
                delete this.constraints[n]
            }
            for (var n in this.skins) {
                this.skins[n].returnToPool();
                delete this.skins[n]
            }
            for (var n in this.animations) {
                this.animations[n].returnToPool();
                delete this.animations[n]
            }
            if (this.canvas !== null) {
                this.canvas.returnToPool()
            }
            if (this.userData !== null) {
                this.userData.returnToPool()
            }
            this.type = 0;
            this.frameRate = 0;
            this.cacheFrameRate = 0;
            this.scale = 1;
            this.name = "";
            this.aabb.clear();
            this.animationNames.length = 0;
            this.sortedBones.length = 0;
            this.sortedSlots.length = 0;
            this.defaultActions.length = 0;
            this.actions.length = 0;
            this.defaultSkin = null;
            this.defaultAnimation = null;
            this.canvas = null;
            this.userData = null;
            this.parent = null
        };
        a.prototype.sortBones = function() {
            var t = this.sortedBones.length;
            if (t <= 0) {
                return
            }
            var e = this.sortedBones.concat();
            var a = 0;
            var r = 0;
            this.sortedBones.length = 0;
            while (r < t) {
                var i = e[a++];
                if (a >= t) {
                    a = 0
                }
                if (this.sortedBones.indexOf(i) >= 0) {
                    continue
                }
                var n = false;
                for (var s in this.constraints) {
                    var o = this.constraints[s];
                    if (o.root === i && this.sortedBones.indexOf(o.target) < 0) {
                        n = true;
                        break
                    }
                }
                if (n) {
                    continue
                }
                if (i.parent !== null && this.sortedBones.indexOf(i.parent) < 0) {
                    continue
                }
                this.sortedBones.push(i);
                r++
            }
        };
        a.prototype.cacheFrames = function(t) {
            if (this.cacheFrameRate > 0) {
                return
            }
            this.cacheFrameRate = t;
            for (var e in this.animations) {
                this.animations[e].cacheFrames(this.cacheFrameRate)
            }
        };
        a.prototype.setCacheFrame = function(t, e) {
            var a = this.parent.cachedFrames;
            var r = a.length;
            a.length += 10;
            a[r] = t.a;
            a[r + 1] = t.b;
            a[r + 2] = t.c;
            a[r + 3] = t.d;
            a[r + 4] = t.tx;
            a[r + 5] = t.ty;
            a[r + 6] = e.rotation;
            a[r + 7] = e.skew;
            a[r + 8] = e.scaleX;
            a[r + 9] = e.scaleY;
            return r
        };
        a.prototype.getCacheFrame = function(t, e, a) {
            var r = this.parent.cachedFrames;
            t.a = r[a];
            t.b = r[a + 1];
            t.c = r[a + 2];
            t.d = r[a + 3];
            t.tx = r[a + 4];
            t.ty = r[a + 5];
            e.rotation = r[a + 6];
            e.skew = r[a + 7];
            e.scaleX = r[a + 8];
            e.scaleY = r[a + 9];
            e.x = t.tx;
            e.y = t.ty
        };
        a.prototype.addBone = function(t) {
            if (t.name in this.bones) {
                console.warn("Same bone: " + t.name);
                return
            }
            this.bones[t.name] = t;
            this.sortedBones.push(t)
        };
        a.prototype.addSlot = function(t) {
            if (t.name in this.slots) {
                console.warn("Same slot: " + t.name);
                return
            }
            this.slots[t.name] = t;
            this.sortedSlots.push(t)
        };
        a.prototype.addConstraint = function(t) {
            if (t.name in this.constraints) {
                console.warn("Same constraint: " + t.name);
                return
            }
            this.constraints[t.name] = t
        };
        a.prototype.addSkin = function(t) {
            if (t.name in this.skins) {
                console.warn("Same skin: " + t.name);
                return
            }
            t.parent = this;
            this.skins[t.name] = t;
            if (this.defaultSkin === null) {
                this.defaultSkin = t
            }
            if (t.name === "default") {
                this.defaultSkin = t
            }
        };
        a.prototype.addAnimation = function(t) {
            if (t.name in this.animations) {
                console.warn("Same animation: " + t.name);
                return
            }
            t.parent = this;
            this.animations[t.name] = t;
            this.animationNames.push(t.name);
            if (this.defaultAnimation === null) {
                this.defaultAnimation = t
            }
        };
        a.prototype.addAction = function(t, e) {
            if (e) {
                this.defaultActions.push(t)
            } else {
                this.actions.push(t)
            }
        };
        a.prototype.getBone = function(t) {
            return t in this.bones ? this.bones[t] : null
        };
        a.prototype.getSlot = function(t) {
            return t in this.slots ? this.slots[t] : null
        };
        a.prototype.getConstraint = function(t) {
            return t in this.constraints ? this.constraints[t] : null
        };
        a.prototype.getSkin = function(t) {
            return t in this.skins ? this.skins[t] : null
        };
        a.prototype.getMesh = function(t, e, a) {
            var r = this.getSkin(t);
            if (r === null) {
                return null
            }
            return r.getDisplay(e, a)
        };
        a.prototype.getAnimation = function(t) {
            return t in this.animations ? this.animations[t] : null
        };
        return a
    }(t.BaseObject);
    t.ArmatureData = e;
    var a = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.transform = new t.Transform;
            a.userData = null;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.BoneData]"
        };
        a.prototype._onClear = function() {
            if (this.userData !== null) {
                this.userData.returnToPool()
            }
            this.inheritTranslation = false;
            this.inheritRotation = false;
            this.inheritScale = false;
            this.inheritReflection = false;
            this.type = 0;
            this.length = 0;
            this.name = "";
            this.transform.identity();
            this.userData = null;
            this.parent = null
        };
        return a
    }(t.BaseObject);
    t.BoneData = a;
    var r = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.vertices = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.SurfaceData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 1;
            this.segmentX = 0;
            this.segmentY = 0;
            this.vertices.length = 0
        };
        return e
    }(a);
    t.SurfaceData = r;
    var i = function(e) {
        __extends(a, e);

        function a() {
            var t = e !== null && e.apply(this, arguments) || this;
            t.color = null;
            t.userData = null;
            return t
        }
        a.createColor = function() {
            return new t.ColorTransform
        };
        a.toString = function() {
            return "[class dragonBones.SlotData]"
        };
        a.prototype._onClear = function() {
            if (this.userData !== null) {
                this.userData.returnToPool()
            }
            this.blendMode = 0;
            this.displayIndex = 0;
            this.zOrder = 0;
            this.name = "";
            this.color = null;
            this.userData = null;
            this.parent = null
        };
        a.DEFAULT_COLOR = new t.ColorTransform;
        return a
    }(t.BaseObject);
    t.SlotData = i
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.CanvasData]"
        };
        e.prototype._onClear = function() {
            this.hasBackground = false;
            this.color = 0;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0
        };
        return e
    }(t.BaseObject);
    t.CanvasData = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.displays = {};
            return e
        }
        e.toString = function() {
            return "[class dragonBones.SkinData]"
        };
        e.prototype._onClear = function() {
            for (var t in this.displays) {
                var e = this.displays[t];
                for (var a = 0, r = e; a < r.length; a++) {
                    var i = r[a];
                    if (i !== null) {
                        i.returnToPool()
                    }
                }
                delete this.displays[t]
            }
            this.name = "";
            this.parent = null
        };
        e.prototype.addDisplay = function(t, e) {
            if (!(t in this.displays)) {
                this.displays[t] = []
            }
            if (e !== null) {
                e.parent = this
            }
            var a = this.displays[t];
            a.push(e)
        };
        e.prototype.getDisplay = function(t, e) {
            var a = this.getDisplays(t);
            if (a !== null) {
                for (var r = 0, i = a; r < i.length; r++) {
                    var n = i[r];
                    if (n !== null && n.name === e) {
                        return n
                    }
                }
            }
            return null
        };
        e.prototype.getDisplays = function(t) {
            if (!(t in this.displays)) {
                return null
            }
            return this.displays[t]
        };
        return e
    }(t.BaseObject);
    t.SkinData = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            this.order = 0;
            this.name = "";
            this.type = 0;
            this.target = null;
            this.root = null;
            this.bone = null
        };
        return e
    }(t.BaseObject);
    t.ConstraintData = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.IKConstraintData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.scaleEnabled = false;
            this.bendPositive = false;
            this.weight = 1
        };
        return e
    }(e);
    t.IKConstraintData = a;
    var r = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.bones = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.PathConstraintData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.pathSlot = null;
            this.pathDisplayData = null;
            this.bones.length = 0;
            this.positionMode = 0;
            this.spacingMode = 1;
            this.rotateMode = 1;
            this.position = 0;
            this.spacing = 0;
            this.rotateOffset = 0;
            this.rotateMix = 0;
            this.translateMix = 0
        };
        e.prototype.AddBone = function(t) {
            this.bones.push(t)
        };
        return e
    }(e);
    t.PathConstraintData = r
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t() {
            this.weight = null
        }
        t.prototype.clear = function() {
            if (!this.isShared && this.weight !== null) {
                this.weight.returnToPool()
            }
            this.isShared = false;
            this.inheritDeform = false;
            this.offset = 0;
            this.data = null;
            this.weight = null
        };
        t.prototype.shareFrom = function(t) {
            this.isShared = true;
            this.offset = t.offset;
            this.weight = t.weight
        };
        return t
    }();
    t.VerticesData = e;
    var a = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.transform = new t.Transform;
            return a
        }
        a.prototype._onClear = function() {
            this.name = "";
            this.path = "";
            this.transform.identity();
            this.parent = null
        };
        return a
    }(t.BaseObject);
    t.DisplayData = a;
    var r = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.pivot = new t.Point;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.ImageDisplayData]"
        };
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            this.type = 0;
            this.pivot.clear();
            this.texture = null
        };
        return a
    }(a);
    t.ImageDisplayData = r;
    var i = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.actions = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.ArmatureDisplayData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            for (var e = 0, a = this.actions; e < a.length; e++) {
                var r = a[e];
                r.returnToPool()
            }
            this.type = 1;
            this.inheritAnimation = false;
            this.actions.length = 0;
            this.armature = null
        };
        e.prototype.addAction = function(t) {
            this.actions.push(t)
        };
        return e
    }(a);
    t.ArmatureDisplayData = i;
    var n = function(t) {
        __extends(a, t);

        function a() {
            var a = t !== null && t.apply(this, arguments) || this;
            a.vertices = new e;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.MeshDisplayData]"
        };
        a.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 2;
            this.vertices.clear();
            this.texture = null
        };
        return a
    }(a);
    t.MeshDisplayData = n;
    var s = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.boundingBox = null;
            return e
        }
        e.toString = function() {
            return "[class dragonBones.BoundingBoxDisplayData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            if (this.boundingBox !== null) {
                this.boundingBox.returnToPool()
            }
            this.type = 3;
            this.boundingBox = null
        };
        return e
    }(a);
    t.BoundingBoxDisplayData = s;
    var o = function(t) {
        __extends(a, t);

        function a() {
            var a = t !== null && t.apply(this, arguments) || this;
            a.vertices = new e;
            a.curveLengths = [];
            return a
        }
        a.toString = function() {
            return "[class dragonBones.PathDisplayData]"
        };
        a.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 4;
            this.closed = false;
            this.constantSpeed = false;
            this.vertices.clear();
            this.curveLengths.length = 0
        };
        return a
    }(a);
    t.PathDisplayData = o;
    var l = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.bones = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.WeightData]"
        };
        e.prototype._onClear = function() {
            this.count = 0;
            this.offset = 0;
            this.bones.length = 0
        };
        e.prototype.addBone = function(t) {
            this.bones.push(t)
        };
        return e
    }(t.BaseObject);
    t.WeightData = l
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            this.color = 0;
            this.width = 0;
            this.height = 0
        };
        return e
    }(t.BaseObject);
    t.BoundingBoxData = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.RectangleBoundingBoxData]"
        };
        e._computeOutCode = function(t, e, a, r, i, n) {
            var s = 0;
            if (t < a) {
                s |= 1
            } else if (t > i) {
                s |= 2
            }
            if (e < r) {
                s |= 4
            } else if (e > n) {
                s |= 8
            }
            return s
        };
        e.rectangleIntersectsSegment = function(t, a, r, i, n, s, o, l, h, f, u) {
            if (h === void 0) {
                h = null
            }
            if (f === void 0) {
                f = null
            }
            if (u === void 0) {
                u = null
            }
            var _ = t > n && t < o && a > s && a < l;
            var c = r > n && r < o && i > s && i < l;
            if (_ && c) {
                return -1
            }
            var p = 0;
            var m = e._computeOutCode(t, a, n, s, o, l);
            var d = e._computeOutCode(r, i, n, s, o, l);
            while (true) {
                if ((m | d) === 0) {
                    p = 2;
                    break
                } else if ((m & d) !== 0) {
                    break
                }
                var v = 0;
                var y = 0;
                var g = 0;
                var b = m !== 0 ? m : d;
                if ((b & 4) !== 0) {
                    v = t + (r - t) * (s - a) / (i - a);
                    y = s;
                    if (u !== null) {
                        g = -Math.PI * .5
                    }
                } else if ((b & 8) !== 0) {
                    v = t + (r - t) * (l - a) / (i - a);
                    y = l;
                    if (u !== null) {
                        g = Math.PI * .5
                    }
                } else if ((b & 2) !== 0) {
                    y = a + (i - a) * (o - t) / (r - t);
                    v = o;
                    if (u !== null) {
                        g = 0
                    }
                } else if ((b & 1) !== 0) {
                    y = a + (i - a) * (n - t) / (r - t);
                    v = n;
                    if (u !== null) {
                        g = Math.PI
                    }
                }
                if (b === m) {
                    t = v;
                    a = y;
                    m = e._computeOutCode(t, a, n, s, o, l);
                    if (u !== null) {
                        u.x = g
                    }
                } else {
                    r = v;
                    i = y;
                    d = e._computeOutCode(r, i, n, s, o, l);
                    if (u !== null) {
                        u.y = g
                    }
                }
            }
            if (p) {
                if (_) {
                    p = 2;
                    if (h !== null) {
                        h.x = r;
                        h.y = i
                    }
                    if (f !== null) {
                        f.x = r;
                        f.y = r
                    }
                    if (u !== null) {
                        u.x = u.y + Math.PI
                    }
                } else if (c) {
                    p = 1;
                    if (h !== null) {
                        h.x = t;
                        h.y = a
                    }
                    if (f !== null) {
                        f.x = t;
                        f.y = a
                    }
                    if (u !== null) {
                        u.y = u.x + Math.PI
                    }
                } else {
                    p = 3;
                    if (h !== null) {
                        h.x = t;
                        h.y = a
                    }
                    if (f !== null) {
                        f.x = r;
                        f.y = i
                    }
                }
            }
            return p
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 0
        };
        e.prototype.containsPoint = function(t, e) {
            var a = this.width * .5;
            if (t >= -a && t <= a) {
                var r = this.height * .5;
                if (e >= -r && e <= r) {
                    return true
                }
            }
            return false
        };
        e.prototype.intersectsSegment = function(t, a, r, i, n, s, o) {
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = null
            }
            if (o === void 0) {
                o = null
            }
            var l = this.width * .5;
            var h = this.height * .5;
            var f = e.rectangleIntersectsSegment(t, a, r, i, -l, -h, l, h, n, s, o);
            return f
        };
        return e
    }(e);
    t.RectangleBoundingBoxData = a;
    var r = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.EllipseData]"
        };
        e.ellipseIntersectsSegment = function(t, e, a, r, i, n, s, o, l, h, f) {
            if (l === void 0) {
                l = null
            }
            if (h === void 0) {
                h = null
            }
            if (f === void 0) {
                f = null
            }
            var u = s / o;
            var _ = u * u;
            e *= u;
            r *= u;
            var c = a - t;
            var p = r - e;
            var m = Math.sqrt(c * c + p * p);
            var d = c / m;
            var v = p / m;
            var y = (i - t) * d + (n - e) * v;
            var g = y * y;
            var b = t * t + e * e;
            var D = s * s;
            var T = D - b + g;
            var A = 0;
            if (T >= 0) {
                var x = Math.sqrt(T);
                var P = y - x;
                var O = y + x;
                var S = P < 0 ? -1 : P <= m ? 0 : 1;
                var E = O < 0 ? -1 : O <= m ? 0 : 1;
                var M = S * E;
                if (M < 0) {
                    return -1
                } else if (M === 0) {
                    if (S === -1) {
                        A = 2;
                        a = t + O * d;
                        r = (e + O * v) / u;
                        if (l !== null) {
                            l.x = a;
                            l.y = r
                        }
                        if (h !== null) {
                            h.x = a;
                            h.y = r
                        }
                        if (f !== null) {
                            f.x = Math.atan2(r / D * _, a / D);
                            f.y = f.x + Math.PI
                        }
                    } else if (E === 1) {
                        A = 1;
                        t = t + P * d;
                        e = (e + P * v) / u;
                        if (l !== null) {
                            l.x = t;
                            l.y = e
                        }
                        if (h !== null) {
                            h.x = t;
                            h.y = e
                        }
                        if (f !== null) {
                            f.x = Math.atan2(e / D * _, t / D);
                            f.y = f.x + Math.PI
                        }
                    } else {
                        A = 3;
                        if (l !== null) {
                            l.x = t + P * d;
                            l.y = (e + P * v) / u;
                            if (f !== null) {
                                f.x = Math.atan2(l.y / D * _, l.x / D)
                            }
                        }
                        if (h !== null) {
                            h.x = t + O * d;
                            h.y = (e + O * v) / u;
                            if (f !== null) {
                                f.y = Math.atan2(h.y / D * _, h.x / D)
                            }
                        }
                    }
                }
            }
            return A
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 1
        };
        e.prototype.containsPoint = function(t, e) {
            var a = this.width * .5;
            if (t >= -a && t <= a) {
                var r = this.height * .5;
                if (e >= -r && e <= r) {
                    e *= a / r;
                    return Math.sqrt(t * t + e * e) <= a
                }
            }
            return false
        };
        e.prototype.intersectsSegment = function(t, a, r, i, n, s, o) {
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = null
            }
            if (o === void 0) {
                o = null
            }
            var l = e.ellipseIntersectsSegment(t, a, r, i, 0, 0, this.width * .5, this.height * .5, n, s, o);
            return l
        };
        return e
    }(e);
    t.EllipseBoundingBoxData = r;
    var i = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.vertices = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.PolygonBoundingBoxData]"
        };
        e.polygonIntersectsSegment = function(t, e, a, r, i, n, s, o) {
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = null
            }
            if (o === void 0) {
                o = null
            }
            if (t === a) {
                t = a + 1e-6
            }
            if (e === r) {
                e = r + 1e-6
            }
            var l = i.length;
            var h = t - a;
            var f = e - r;
            var u = t * r - e * a;
            var _ = 0;
            var c = i[l - 2];
            var p = i[l - 1];
            var m = 0;
            var d = 0;
            var v = 0;
            var y = 0;
            var g = 0;
            var b = 0;
            for (var D = 0; D < l; D += 2) {
                var T = i[D];
                var A = i[D + 1];
                if (c === T) {
                    c = T + 1e-4
                }
                if (p === A) {
                    p = A + 1e-4
                }
                var x = c - T;
                var P = p - A;
                var O = c * A - p * T;
                var S = h * P - f * x;
                var E = (u * x - h * O) / S;
                if ((E >= c && E <= T || E >= T && E <= c) && (h === 0 || E >= t && E <= a || E >= a && E <= t)) {
                    var M = (u * P - f * O) / S;
                    if ((M >= p && M <= A || M >= A && M <= p) && (f === 0 || M >= e && M <= r || M >= r && M <= e)) {
                        if (s !== null) {
                            var B = E - t;
                            if (B < 0) {
                                B = -B
                            }
                            if (_ === 0) {
                                m = B;
                                d = B;
                                v = E;
                                y = M;
                                g = E;
                                b = M;
                                if (o !== null) {
                                    o.x = Math.atan2(A - p, T - c) - Math.PI * .5;
                                    o.y = o.x
                                }
                            } else {
                                if (B < m) {
                                    m = B;
                                    v = E;
                                    y = M;
                                    if (o !== null) {
                                        o.x = Math.atan2(A - p, T - c) - Math.PI * .5
                                    }
                                }
                                if (B > d) {
                                    d = B;
                                    g = E;
                                    b = M;
                                    if (o !== null) {
                                        o.y = Math.atan2(A - p, T - c) - Math.PI * .5
                                    }
                                }
                            }
                            _++
                        } else {
                            v = E;
                            y = M;
                            g = E;
                            b = M;
                            _++;
                            if (o !== null) {
                                o.x = Math.atan2(A - p, T - c) - Math.PI * .5;
                                o.y = o.x
                            }
                            break
                        }
                    }
                }
                c = T;
                p = A
            }
            if (_ === 1) {
                if (n !== null) {
                    n.x = v;
                    n.y = y
                }
                if (s !== null) {
                    s.x = v;
                    s.y = y
                }
                if (o !== null) {
                    o.y = o.x + Math.PI
                }
            } else if (_ > 1) {
                _++;
                if (n !== null) {
                    n.x = v;
                    n.y = y
                }
                if (s !== null) {
                    s.x = g;
                    s.y = b
                }
            }
            return _
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.type = 2;
            this.x = 0;
            this.y = 0;
            this.vertices.length = 0
        };
        e.prototype.containsPoint = function(t, e) {
            var a = false;
            if (t >= this.x && t <= this.width && e >= this.y && e <= this.height) {
                for (var r = 0, i = this.vertices.length, n = i - 2; r < i; r += 2) {
                    var s = this.vertices[n + 1];
                    var o = this.vertices[r + 1];
                    if (o < e && s >= e || s < e && o >= e) {
                        var l = this.vertices[n];
                        var h = this.vertices[r];
                        if ((e - o) * (l - h) / (s - o) + h < t) {
                            a = !a
                        }
                    }
                    n = r
                }
            }
            return a
        };
        e.prototype.intersectsSegment = function(t, r, i, n, s, o, l) {
            if (s === void 0) {
                s = null
            }
            if (o === void 0) {
                o = null
            }
            if (l === void 0) {
                l = null
            }
            var h = 0;
            if (a.rectangleIntersectsSegment(t, r, i, n, this.x, this.y, this.x + this.width, this.y + this.height, null, null, null) !== 0) {
                h = e.polygonIntersectsSegment(t, r, i, n, this.vertices, s, o, l)
            }
            return h
        };
        return e
    }(e);
    t.PolygonBoundingBoxData = i
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.cachedFrames = [];
            e.boneTimelines = {};
            e.surfaceTimelines = {};
            e.slotTimelines = {};
            e.constraintTimelines = {};
            e.animationTimelines = {};
            e.boneCachedFrameIndices = {};
            e.slotCachedFrameIndices = {};
            e.actionTimeline = null;
            e.zOrderTimeline = null;
            return e
        }
        e.toString = function() {
            return "[class dragonBones.AnimationData]"
        };
        e.prototype._onClear = function() {
            for (var t in this.boneTimelines) {
                for (var e = 0, a = this.boneTimelines[t]; e < a.length; e++) {
                    var r = a[e];
                    r.returnToPool()
                }
                delete this.boneTimelines[t]
            }
            for (var t in this.surfaceTimelines) {
                for (var i = 0, n = this.surfaceTimelines[t]; i < n.length; i++) {
                    var r = n[i];
                    r.returnToPool()
                }
                delete this.surfaceTimelines[t]
            }
            for (var t in this.slotTimelines) {
                for (var s = 0, o = this.slotTimelines[t]; s < o.length; s++) {
                    var r = o[s];
                    r.returnToPool()
                }
                delete this.slotTimelines[t]
            }
            for (var t in this.constraintTimelines) {
                for (var l = 0, h = this.constraintTimelines[t]; l < h.length; l++) {
                    var r = h[l];
                    r.returnToPool()
                }
                delete this.constraintTimelines[t]
            }
            for (var t in this.animationTimelines) {
                for (var f = 0, u = this.animationTimelines[t]; f < u.length; f++) {
                    var r = u[f];
                    r.returnToPool()
                }
                delete this.animationTimelines[t]
            }
            for (var t in this.boneCachedFrameIndices) {
                delete this.boneCachedFrameIndices[t]
            }
            for (var t in this.slotCachedFrameIndices) {
                delete this.slotCachedFrameIndices[t]
            }
            if (this.actionTimeline !== null) {
                this.actionTimeline.returnToPool()
            }
            if (this.zOrderTimeline !== null) {
                this.zOrderTimeline.returnToPool()
            }
            this.frameIntOffset = 0;
            this.frameFloatOffset = 0;
            this.frameOffset = 0;
            this.frameCount = 0;
            this.playTimes = 0;
            this.duration = 0;
            this.scale = 1;
            this.fadeInTime = 0;
            this.cacheFrameRate = 0;
            this.name = "";
            this.cachedFrames.length = 0;
            this.actionTimeline = null;
            this.zOrderTimeline = null;
            this.parent = null
        };
        e.prototype.cacheFrames = function(t) {
            if (this.cacheFrameRate > 0) {
                return
            }
            this.cacheFrameRate = Math.max(Math.ceil(t * this.scale), 1);
            var e = Math.ceil(this.cacheFrameRate * this.duration) + 1;
            this.cachedFrames.length = e;
            for (var a = 0, r = this.cacheFrames.length; a < r; ++a) {
                this.cachedFrames[a] = false
            }
            for (var i = 0, n = this.parent.sortedBones; i < n.length; i++) {
                var s = n[i];
                var o = new Array(e);
                for (var a = 0, r = o.length; a < r; ++a) {
                    o[a] = -1
                }
                this.boneCachedFrameIndices[s.name] = o
            }
            for (var l = 0, h = this.parent.sortedSlots; l < h.length; l++) {
                var f = h[l];
                var o = new Array(e);
                for (var a = 0, r = o.length; a < r; ++a) {
                    o[a] = -1
                }
                this.slotCachedFrameIndices[f.name] = o
            }
        };
        e.prototype.addBoneTimeline = function(t, e) {
            var a = t.name in this.boneTimelines ? this.boneTimelines[t.name] : this.boneTimelines[t.name] = [];
            if (a.indexOf(e) < 0) {
                a.push(e)
            }
        };
        e.prototype.addSurfaceTimeline = function(t, e) {
            var a = t.name in this.surfaceTimelines ? this.surfaceTimelines[t.name] : this.surfaceTimelines[t.name] = [];
            if (a.indexOf(e) < 0) {
                a.push(e)
            }
        };
        e.prototype.addSlotTimeline = function(t, e) {
            var a = t.name in this.slotTimelines ? this.slotTimelines[t.name] : this.slotTimelines[t.name] = [];
            if (a.indexOf(e) < 0) {
                a.push(e)
            }
        };
        e.prototype.addConstraintTimeline = function(t, e) {
            var a = t.name in this.constraintTimelines ? this.constraintTimelines[t.name] : this.constraintTimelines[t.name] = [];
            if (a.indexOf(e) < 0) {
                a.push(e)
            }
        };
        e.prototype.addAnimationTimeline = function(t, e) {
            var a = t in this.animationTimelines ? this.animationTimelines[t] : this.animationTimelines[t] = [];
            if (a.indexOf(e) < 0) {
                a.push(e)
            }
        };
        e.prototype.getBoneTimelines = function(t) {
            return t in this.boneTimelines ? this.boneTimelines[t] : null
        };
        e.prototype.getSurfaceTimelines = function(t) {
            return t in this.surfaceTimelines ? this.surfaceTimelines[t] : null
        };
        e.prototype.getSlotTimelines = function(t) {
            return t in this.slotTimelines ? this.slotTimelines[t] : null
        };
        e.prototype.getConstraintTimelines = function(t) {
            return t in this.constraintTimelines ? this.constraintTimelines[t] : null
        };
        e.prototype.getAnimationTimelines = function(t) {
            return t in this.animationTimelines ? this.animationTimelines[t] : null
        };
        e.prototype.getBoneCachedFrameIndices = function(t) {
            return t in this.boneCachedFrameIndices ? this.boneCachedFrameIndices[t] : null
        };
        e.prototype.getSlotCachedFrameIndices = function(t) {
            return t in this.slotCachedFrameIndices ? this.slotCachedFrameIndices[t] : null
        };
        return e
    }(t.BaseObject);
    t.AnimationData = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.TimelineData]"
        };
        e.prototype._onClear = function() {
            this.type = 10;
            this.offset = 0;
            this.frameIndicesOffset = -1
        };
        return e
    }(t.BaseObject);
    t.TimelineData = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.boneMask = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.AnimationConfig]"
        };
        e.prototype._onClear = function() {
            this.pauseFadeOut = true;
            this.fadeOutMode = 4;
            this.fadeOutTweenType = 1;
            this.fadeOutTime = -1;
            this.actionEnabled = true;
            this.additiveBlending = false;
            this.displayControl = true;
            this.pauseFadeIn = true;
            this.resetToPose = true;
            this.fadeInTweenType = 1;
            this.playTimes = -1;
            this.layer = 0;
            this.position = 0;
            this.duration = -1;
            this.timeScale = -100;
            this.weight = 1;
            this.fadeInTime = -1;
            this.autoFadeOutTime = -1;
            this.name = "";
            this.animation = "";
            this.group = "";
            this.boneMask.length = 0
        };
        e.prototype.clear = function() {
            this._onClear()
        };
        e.prototype.copyFrom = function(t) {
            this.pauseFadeOut = t.pauseFadeOut;
            this.fadeOutMode = t.fadeOutMode;
            this.autoFadeOutTime = t.autoFadeOutTime;
            this.fadeOutTweenType = t.fadeOutTweenType;
            this.actionEnabled = t.actionEnabled;
            this.additiveBlending = t.additiveBlending;
            this.displayControl = t.displayControl;
            this.pauseFadeIn = t.pauseFadeIn;
            this.resetToPose = t.resetToPose;
            this.playTimes = t.playTimes;
            this.layer = t.layer;
            this.position = t.position;
            this.duration = t.duration;
            this.timeScale = t.timeScale;
            this.fadeInTime = t.fadeInTime;
            this.fadeOutTime = t.fadeOutTime;
            this.fadeInTweenType = t.fadeInTweenType;
            this.weight = t.weight;
            this.name = t.name;
            this.animation = t.animation;
            this.group = t.group;
            this.boneMask.length = t.boneMask.length;
            for (var e = 0, a = this.boneMask.length; e < a; ++e) {
                this.boneMask[e] = t.boneMask[e]
            }
        };
        e.prototype.containsBoneMask = function(t) {
            return this.boneMask.length === 0 || this.boneMask.indexOf(t) >= 0
        };
        e.prototype.addBoneMask = function(t, e, a) {
            if (a === void 0) {
                a = true
            }
            var r = t.getBone(e);
            if (r === null) {
                return
            }
            if (this.boneMask.indexOf(e) < 0) {
                this.boneMask.push(e)
            }
            if (a) {
                for (var i = 0, n = t.getBones(); i < n.length; i++) {
                    var s = n[i];
                    if (this.boneMask.indexOf(s.name) < 0 && r.contains(s)) {
                        this.boneMask.push(s.name)
                    }
                }
            }
        };
        e.prototype.removeBoneMask = function(t, e, a) {
            if (a === void 0) {
                a = true
            }
            var r = this.boneMask.indexOf(e);
            if (r >= 0) {
                this.boneMask.splice(r, 1)
            }
            if (a) {
                var i = t.getBone(e);
                if (i !== null) {
                    if (this.boneMask.length > 0) {
                        for (var n = 0, s = t.getBones(); n < s.length; n++) {
                            var o = s[n];
                            var l = this.boneMask.indexOf(o.name);
                            if (l >= 0 && i.contains(o)) {
                                this.boneMask.splice(l, 1)
                            }
                        }
                    } else {
                        for (var h = 0, f = t.getBones(); h < f.length; h++) {
                            var o = f[h];
                            if (o === i) {
                                continue
                            }
                            if (!i.contains(o)) {
                                this.boneMask.push(o.name)
                            }
                        }
                    }
                }
            }
        };
        return e
    }(t.BaseObject);
    t.AnimationConfig = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.textures = {};
            return e
        }
        e.prototype._onClear = function() {
            for (var t in this.textures) {
                this.textures[t].returnToPool();
                delete this.textures[t]
            }
            this.autoSearch = false;
            this.width = 0;
            this.height = 0;
            this.scale = 1;
            this.name = "";
            this.imagePath = ""
        };
        e.prototype.copyFrom = function(t) {
            this.autoSearch = t.autoSearch;
            this.scale = t.scale;
            this.width = t.width;
            this.height = t.height;
            this.name = t.name;
            this.imagePath = t.imagePath;
            for (var e in this.textures) {
                this.textures[e].returnToPool();
                delete this.textures[e]
            }
            for (var e in t.textures) {
                var a = this.createTexture();
                a.copyFrom(t.textures[e]);
                this.textures[e] = a
            }
        };
        e.prototype.addTexture = function(t) {
            if (t.name in this.textures) {
                console.warn("Same texture: " + t.name);
                return
            }
            t.parent = this;
            this.textures[t.name] = t
        };
        e.prototype.getTexture = function(t) {
            return t in this.textures ? this.textures[t] : null
        };
        return e
    }(t.BaseObject);
    t.TextureAtlasData = e;
    var a = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.region = new t.Rectangle;
            a.frame = null;
            return a
        }
        a.createRectangle = function() {
            return new t.Rectangle
        };
        a.prototype._onClear = function() {
            this.rotated = false;
            this.name = "";
            this.region.clear();
            this.parent = null;
            this.frame = null
        };
        a.prototype.copyFrom = function(t) {
            this.rotated = t.rotated;
            this.name = t.name;
            this.region.copyFrom(t.region);
            this.parent = t.parent;
            if (this.frame === null && t.frame !== null) {
                this.frame = a.createRectangle()
            } else if (this.frame !== null && t.frame === null) {
                this.frame = null
            }
            if (this.frame !== null && t.frame !== null) {
                this.frame.copyFrom(t.frame)
            }
        };
        return a
    }(t.BaseObject);
    t.TextureData = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.vertices = [];
            e.bones = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.DeformVertices]"
        };
        e.prototype._onClear = function() {
            this.verticesDirty = false;
            this.vertices.length = 0;
            this.bones.length = 0;
            this.verticesData = null
        };
        e.prototype.init = function(t, e) {
            this.verticesData = t;
            if (this.verticesData !== null) {
                var a = 0;
                if (this.verticesData.weight !== null) {
                    a = this.verticesData.weight.count * 2
                } else {
                    a = this.verticesData.data.intArray[this.verticesData.offset + 0] * 2
                }
                this.verticesDirty = true;
                this.vertices.length = a;
                this.bones.length = 0;
                for (var r = 0, i = this.vertices.length; r < i; ++r) {
                    this.vertices[r] = 0
                }
                if (this.verticesData.weight !== null) {
                    for (var r = 0, i = this.verticesData.weight.bones.length; r < i; ++r) {
                        var n = e.getBone(this.verticesData.weight.bones[r].name);
                        this.bones.push(n)
                    }
                }
            } else {
                this.verticesDirty = false;
                this.vertices.length = 0;
                this.bones.length = 0;
                this.verticesData = null
            }
        };
        e.prototype.isBonesUpdate = function() {
            for (var t = 0, e = this.bones; t < e.length; t++) {
                var a = e[t];
                if (a !== null && a._childrenTransformDirty) {
                    return true
                }
            }
            return false
        };
        return e
    }(t.BaseObject);
    t.DeformVertices = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._bones = [];
            t._slots = [];
            t._constraints = [];
            t._actions = [];
            t._animation = null;
            t._proxy = null;
            t._replaceTextureAtlasData = null;
            t._clock = null;
            return t
        }
        a.toString = function() {
            return "[class dragonBones.Armature]"
        };
        a._onSortSlots = function(t, e) {
            return t._zOrder > e._zOrder ? 1 : -1
        };
        a.prototype._onClear = function() {
            if (this._clock !== null) {
                this._clock.remove(this)
            }
            for (var t = 0, e = this._bones; t < e.length; t++) {
                var a = e[t];
                a.returnToPool()
            }
            for (var r = 0, i = this._slots; r < i.length; r++) {
                var n = i[r];
                n.returnToPool()
            }
            for (var s = 0, o = this._constraints; s < o.length; s++) {
                var l = o[s];
                l.returnToPool()
            }
            for (var h = 0, f = this._actions; h < f.length; h++) {
                var u = f[h];
                u.returnToPool()
            }
            if (this._animation !== null) {
                this._animation.returnToPool()
            }
            if (this._proxy !== null) {
                this._proxy.dbClear()
            }
            if (this._replaceTextureAtlasData !== null) {
                this._replaceTextureAtlasData.returnToPool()
            }
            this.inheritAnimation = true;
            this.userData = null;
            this._lockUpdate = false;
            this._slotsDirty = true;
            this._zOrderDirty = false;
            this._flipX = false;
            this._flipY = false;
            this._cacheFrameIndex = -1;
            this._bones.length = 0;
            this._slots.length = 0;
            this._constraints.length = 0;
            this._actions.length = 0;
            this._armatureData = null;
            this._animation = null;
            this._proxy = null;
            this._display = null;
            this._replaceTextureAtlasData = null;
            this._replacedTexture = null;
            this._dragonBones = null;
            this._clock = null;
            this._parent = null
        };
        a.prototype._sortZOrder = function(t, e) {
            var a = this._armatureData.sortedSlots;
            var r = t === null;
            if (this._zOrderDirty || !r) {
                for (var i = 0, n = a.length; i < n; ++i) {
                    var s = r ? i : t[e + i];
                    if (s < 0 || s >= n) {
                        continue
                    }
                    var o = a[s];
                    var l = this.getSlot(o.name);
                    if (l !== null) {
                        l._setZorder(i)
                    }
                }
                this._slotsDirty = true;
                this._zOrderDirty = !r
            }
        };
        a.prototype._addBone = function(t) {
            if (this._bones.indexOf(t) < 0) {
                this._bones.push(t)
            }
        };
        a.prototype._addSlot = function(t) {
            if (this._slots.indexOf(t) < 0) {
                this._slots.push(t)
            }
        };
        a.prototype._addConstraint = function(t) {
            if (this._constraints.indexOf(t) < 0) {
                this._constraints.push(t)
            }
        };
        a.prototype._bufferAction = function(t, e) {
            if (this._actions.indexOf(t) < 0) {
                if (e) {
                    this._actions.push(t)
                } else {
                    this._actions.unshift(t)
                }
            }
        };
        a.prototype.dispose = function() {
            if (this._armatureData !== null) {
                this._lockUpdate = true;
                this._dragonBones.bufferObject(this)
            }
        };
        a.prototype.init = function(e, a, r, i) {
            if (this._armatureData !== null) {
                return
            }
            this._armatureData = e;
            this._animation = t.BaseObject.borrowObject(t.Animation);
            this._proxy = a;
            this._display = r;
            this._dragonBones = i;
            this._proxy.dbInit(this);
            this._animation.init(this);
            this._animation.animations = this._armatureData.animations
        };
        a.prototype.advanceTime = function(t) {
            if (this._lockUpdate) {
                return
            }
            if (this._armatureData === null) {
                console.warn("The armature has been disposed.");
                return
            } else if (this._armatureData.parent === null) {
                console.warn("The armature data has been disposed.\nPlease make sure dispose armature before call factory.clear().");
                return
            }
            var e = this._cacheFrameIndex;
            this._animation.advanceTime(t);
            if (this._slotsDirty) {
                this._slotsDirty = false;
                this._slots.sort(a._onSortSlots)
            }
            if (this._cacheFrameIndex < 0 || this._cacheFrameIndex !== e) {
                var r = 0,
                    i = 0;
                for (r = 0, i = this._bones.length; r < i; ++r) {
                    this._bones[r].update(this._cacheFrameIndex)
                }
                for (r = 0, i = this._slots.length; r < i; ++r) {
                    this._slots[r].update(this._cacheFrameIndex)
                }
            }
            if (this._actions.length > 0) {
                this._lockUpdate = true;
                for (var n = 0, s = this._actions; n < s.length; n++) {
                    var o = s[n];
                    var l = o.actionData;
                    if (l !== null) {
                        if (l.type === 0) {
                            if (o.slot !== null) {
                                var h = o.slot.childArmature;
                                if (h !== null) {
                                    h.animation.fadeIn(l.name)
                                }
                            } else if (o.bone !== null) {
                                for (var f = 0, u = this.getSlots(); f < u.length; f++) {
                                    var _ = u[f];
                                    if (_.parent === o.bone) {
                                        var h = _.childArmature;
                                        if (h !== null) {
                                            h.animation.fadeIn(l.name)
                                        }
                                    }
                                }
                            } else {
                                this._animation.fadeIn(l.name)
                            }
                        }
                    }
                    o.returnToPool()
                }
                this._actions.length = 0;
                this._lockUpdate = false
            }
            this._proxy.dbUpdate()
        };
        a.prototype.invalidUpdate = function(t, e) {
            if (t === void 0) {
                t = null
            }
            if (e === void 0) {
                e = false
            }
            if (t !== null && t.length > 0) {
                var a = this.getBone(t);
                if (a !== null) {
                    a.invalidUpdate();
                    if (e) {
                        for (var r = 0, i = this._slots; r < i.length; r++) {
                            var n = i[r];
                            if (n.parent === a) {
                                n.invalidUpdate()
                            }
                        }
                    }
                }
            } else {
                for (var s = 0, o = this._bones; s < o.length; s++) {
                    var a = o[s];
                    a.invalidUpdate()
                }
                if (e) {
                    for (var l = 0, h = this._slots; l < h.length; l++) {
                        var n = h[l];
                        n.invalidUpdate()
                    }
                }
            }
        };
        a.prototype.containsPoint = function(t, e) {
            for (var a = 0, r = this._slots; a < r.length; a++) {
                var i = r[a];
                if (i.containsPoint(t, e)) {
                    return i
                }
            }
            return null
        };
        a.prototype.intersectsSegment = function(t, e, a, r, i, n, s) {
            if (i === void 0) {
                i = null
            }
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = null
            }
            var o = t === a;
            var l = 0;
            var h = 0;
            var f = 0;
            var u = 0;
            var _ = 0;
            var c = 0;
            var p = 0;
            var m = 0;
            var d = null;
            var v = null;
            for (var y = 0, g = this._slots; y < g.length; y++) {
                var b = g[y];
                var D = b.intersectsSegment(t, e, a, r, i, n, s);
                if (D > 0) {
                    if (i !== null || n !== null) {
                        if (i !== null) {
                            var T = o ? i.y - e : i.x - t;
                            if (T < 0) {
                                T = -T
                            }
                            if (d === null || T < l) {
                                l = T;
                                f = i.x;
                                u = i.y;
                                d = b;
                                if (s) {
                                    p = s.x
                                }
                            }
                        }
                        if (n !== null) {
                            var T = n.x - t;
                            if (T < 0) {
                                T = -T
                            }
                            if (v === null || T > h) {
                                h = T;
                                _ = n.x;
                                c = n.y;
                                v = b;
                                if (s !== null) {
                                    m = s.y
                                }
                            }
                        }
                    } else {
                        d = b;
                        break
                    }
                }
            }
            if (d !== null && i !== null) {
                i.x = f;
                i.y = u;
                if (s !== null) {
                    s.x = p
                }
            }
            if (v !== null && n !== null) {
                n.x = _;
                n.y = c;
                if (s !== null) {
                    s.y = m
                }
            }
            return d
        };
        a.prototype.getBone = function(t) {
            for (var e = 0, a = this._bones; e < a.length; e++) {
                var r = a[e];
                if (r.name === t) {
                    return r
                }
            }
            return null
        };
        a.prototype.getBoneByDisplay = function(t) {
            var e = this.getSlotByDisplay(t);
            return e !== null ? e.parent : null
        };
        a.prototype.getSlot = function(t) {
            for (var e = 0, a = this._slots; e < a.length; e++) {
                var r = a[e];
                if (r.name === t) {
                    return r
                }
            }
            return null
        };
        a.prototype.getSlotByDisplay = function(t) {
            if (t !== null) {
                for (var e = 0, a = this._slots; e < a.length; e++) {
                    var r = a[e];
                    if (r.display === t) {
                        return r
                    }
                }
            }
            return null
        };
        a.prototype.getBones = function() {
            return this._bones
        };
        a.prototype.getSlots = function() {
            return this._slots
        };
        Object.defineProperty(a.prototype, "flipX", {
            get: function() {
                return this._flipX
            },
            set: function(t) {
                if (this._flipX === t) {
                    return
                }
                this._flipX = t;
                this.invalidUpdate()
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "flipY", {
            get: function() {
                return this._flipY
            },
            set: function(t) {
                if (this._flipY === t) {
                    return
                }
                this._flipY = t;
                this.invalidUpdate()
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "cacheFrameRate", {
            get: function() {
                return this._armatureData.cacheFrameRate
            },
            set: function(t) {
                if (this._armatureData.cacheFrameRate !== t) {
                    this._armatureData.cacheFrames(t);
                    for (var e = 0, a = this._slots; e < a.length; e++) {
                        var r = a[e];
                        var i = r.childArmature;
                        if (i !== null) {
                            i.cacheFrameRate = t
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "name", {
            get: function() {
                return this._armatureData.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "armatureData", {
            get: function() {
                return this._armatureData
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animation", {
            get: function() {
                return this._animation
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "proxy", {
            get: function() {
                return this._proxy
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "eventDispatcher", {
            get: function() {
                return this._proxy
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "display", {
            get: function() {
                return this._display
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "replacedTexture", {
            get: function() {
                return this._replacedTexture
            },
            set: function(t) {
                if (this._replacedTexture === t) {
                    return
                }
                if (this._replaceTextureAtlasData !== null) {
                    this._replaceTextureAtlasData.returnToPool();
                    this._replaceTextureAtlasData = null
                }
                this._replacedTexture = t;
                for (var e = 0, a = this._slots; e < a.length; e++) {
                    var r = a[e];
                    r.invalidUpdate();
                    r.update(-1)
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "clock", {
            get: function() {
                return this._clock
            },
            set: function(t) {
                if (this._clock === t) {
                    return
                }
                if (this._clock !== null) {
                    this._clock.remove(this)
                }
                this._clock = t;
                if (this._clock) {
                    this._clock.add(this)
                }
                for (var e = 0, a = this._slots; e < a.length; e++) {
                    var r = a[e];
                    var i = r.childArmature;
                    if (i !== null) {
                        i.clock = this._clock
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "parent", {
            get: function() {
                return this._parent
            },
            enumerable: true,
            configurable: true
        });
        a.prototype.replaceTexture = function(t) {
            this.replacedTexture = t
        };
        a.prototype.hasEventListener = function(t) {
            console.warn("Deprecated.");
            return this._proxy.hasDBEventListener(t)
        };
        a.prototype.addEventListener = function(t, e, a) {
            console.warn("Deprecated.");
            this._proxy.addDBEventListener(t, e, a)
        };
        a.prototype.removeEventListener = function(t, e, a) {
            console.warn("Deprecated.");
            this._proxy.removeDBEventListener(t, e, a)
        };
        a.prototype.enableAnimationCache = function(t) {
            console.warn("Deprecated.");
            this.cacheFrameRate = t
        };
        a.prototype.getDisplay = function() {
            return this._display
        };
        return a
    }(t.BaseObject);
    t.Armature = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.globalTransformMatrix = new t.Matrix;
            a.global = new t.Transform;
            a.offset = new t.Transform;
            return a
        }
        a.prototype._onClear = function() {
            this.globalTransformMatrix.identity();
            this.global.identity();
            this.offset.identity();
            this.origin = null;
            this.userData = null;
            this._globalDirty = false;
            this._armature = null
        };
        a.prototype.updateGlobalTransform = function() {
            if (this._globalDirty) {
                this._globalDirty = false;
                this.global.fromMatrix(this.globalTransformMatrix)
            }
        };
        Object.defineProperty(a.prototype, "armature", {
            get: function() {
                return this._armature
            },
            enumerable: true,
            configurable: true
        });
        a._helpMatrix = new t.Matrix;
        a._helpTransform = new t.Transform;
        a._helpPoint = new t.Point;
        return a
    }(t.BaseObject);
    t.TransformObject = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.animationPose = new t.Transform;
            a._blendState = new t.BlendState;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.Bone]"
        };
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            this.offsetMode = 1;
            this.animationPose.identity();
            this._transformDirty = false;
            this._childrenTransformDirty = false;
            this._localDirty = true;
            this._hasConstraint = false;
            this._visible = true;
            this._cachedFrameIndex = -1;
            this._blendState.clear();
            this._boneData = null;
            this._parent = null;
            this._cachedFrameIndices = null
        };
        a.prototype._updateGlobalTransformMatrix = function(e) {
            var a = this._boneData;
            var r = this.global;
            var i = this.globalTransformMatrix;
            var n = this.origin;
            var s = this.offset;
            var o = this.animationPose;
            var l = this._parent;
            var h = this._armature.flipX;
            var f = this._armature.flipY === t.DragonBones.yDown;
            var u = l !== null;
            var _ = 0;
            if (this.offsetMode === 1) {
                if (n !== null) {
                    r.x = n.x + s.x + o.x;
                    r.y = n.y + s.y + o.y;
                    r.skew = n.skew + s.skew + o.skew;
                    r.rotation = n.rotation + s.rotation + o.rotation;
                    r.scaleX = n.scaleX * s.scaleX * o.scaleX;
                    r.scaleY = n.scaleY * s.scaleY * o.scaleY
                } else {
                    r.copyFrom(s).add(o)
                }
            } else if (this.offsetMode === 0) {
                if (n !== null) {
                    r.copyFrom(n).add(o)
                } else {
                    r.copyFrom(o)
                }
            } else {
                u = false;
                r.copyFrom(s)
            }
            if (u) {
                var c = l._boneData.type === 0 ? l.globalTransformMatrix : l._getGlobalTransformMatrix(r.x, r.y);
                if (a.inheritScale) {
                    if (!a.inheritRotation) {
                        l.updateGlobalTransform();
                        if (h && f) {
                            _ = r.rotation - (l.global.rotation + Math.PI)
                        } else if (h) {
                            _ = r.rotation + l.global.rotation + Math.PI
                        } else if (f) {
                            _ = r.rotation + l.global.rotation
                        } else {
                            _ = r.rotation - l.global.rotation
                        }
                        r.rotation = _
                    }
                    r.toMatrix(i);
                    i.concat(c);
                    if (a.inheritTranslation) {
                        r.x = i.tx;
                        r.y = i.ty
                    } else {
                        i.tx = r.x;
                        i.ty = r.y
                    }
                    if (e) {
                        r.fromMatrix(i)
                    } else {
                        this._globalDirty = true
                    }
                } else {
                    if (a.inheritTranslation) {
                        var p = r.x;
                        var m = r.y;
                        r.x = c.a * p + c.c * m + c.tx;
                        r.y = c.b * p + c.d * m + c.ty
                    } else {
                        if (h) {
                            r.x = -r.x
                        }
                        if (f) {
                            r.y = -r.y
                        }
                    }
                    if (a.inheritRotation) {
                        l.updateGlobalTransform();
                        if (l.global.scaleX < 0) {
                            _ = r.rotation + l.global.rotation + Math.PI
                        } else {
                            _ = r.rotation + l.global.rotation
                        }
                        if (c.a * c.d - c.b * c.c < 0) {
                            _ -= r.rotation * 2;
                            if (h !== f || a.inheritReflection) {
                                r.skew += Math.PI
                            }
                        }
                        r.rotation = _
                    } else if (h || f) {
                        if (h && f) {
                            _ = r.rotation + Math.PI
                        } else {
                            if (h) {
                                _ = Math.PI - r.rotation
                            } else {
                                _ = -r.rotation
                            }
                            r.skew += Math.PI
                        }
                        r.rotation = _
                    }
                    r.toMatrix(i)
                }
            } else {
                if (h || f) {
                    if (h) {
                        r.x = -r.x
                    }
                    if (f) {
                        r.y = -r.y
                    }
                    if (h && f) {
                        _ = r.rotation + Math.PI
                    } else {
                        if (h) {
                            _ = Math.PI - r.rotation
                        } else {
                            _ = -r.rotation
                        }
                        r.skew += Math.PI
                    }
                    r.rotation = _
                }
                r.toMatrix(i)
            }
        };
        a.prototype.init = function(t, e) {
            if (this._boneData !== null) {
                return
            }
            this._boneData = t;
            this._armature = e;
            if (this._boneData.parent !== null) {
                this._parent = this._armature.getBone(this._boneData.parent.name)
            }
            this._armature._addBone(this);
            this.origin = this._boneData.transform
        };
        a.prototype.update = function(t) {
            this._blendState.dirty = false;
            if (t >= 0 && this._cachedFrameIndices !== null) {
                var e = this._cachedFrameIndices[t];
                if (e >= 0 && this._cachedFrameIndex === e) {
                    this._transformDirty = false
                } else if (e >= 0) {
                    this._transformDirty = true;
                    this._cachedFrameIndex = e
                } else {
                    if (this._hasConstraint) {
                        for (var a = 0, r = this._armature._constraints; a < r.length; a++) {
                            var i = r[a];
                            if (i._root === this) {
                                i.update()
                            }
                        }
                    }
                    if (this._transformDirty || this._parent !== null && this._parent._childrenTransformDirty) {
                        this._transformDirty = true;
                        this._cachedFrameIndex = -1
                    } else if (this._cachedFrameIndex >= 0) {
                        this._transformDirty = false;
                        this._cachedFrameIndices[t] = this._cachedFrameIndex
                    } else {
                        this._transformDirty = true;
                        this._cachedFrameIndex = -1
                    }
                }
            } else {
                if (this._hasConstraint) {
                    for (var n = 0, s = this._armature._constraints; n < s.length; n++) {
                        var i = s[n];
                        if (i._root === this) {
                            i.update()
                        }
                    }
                }
                if (this._transformDirty || this._parent !== null && this._parent._childrenTransformDirty) {
                    t = -1;
                    this._transformDirty = true;
                    this._cachedFrameIndex = -1
                }
            }
            if (this._transformDirty) {
                this._transformDirty = false;
                this._childrenTransformDirty = true;
                if (this._cachedFrameIndex < 0) {
                    var o = t >= 0;
                    if (this._localDirty) {
                        this._updateGlobalTransformMatrix(o)
                    }
                    if (o && this._cachedFrameIndices !== null) {
                        this._cachedFrameIndex = this._cachedFrameIndices[t] = this._armature._armatureData.setCacheFrame(this.globalTransformMatrix, this.global)
                    }
                } else {
                    this._armature._armatureData.getCacheFrame(this.globalTransformMatrix, this.global, this._cachedFrameIndex)
                }
            } else if (this._childrenTransformDirty) {
                this._childrenTransformDirty = false
            }
            this._localDirty = true
        };
        a.prototype.updateByConstraint = function() {
            if (this._localDirty) {
                this._localDirty = false;
                if (this._transformDirty || this._parent !== null && this._parent._childrenTransformDirty) {
                    this._updateGlobalTransformMatrix(true)
                }
                this._transformDirty = true
            }
        };
        a.prototype.invalidUpdate = function() {
            this._transformDirty = true
        };
        a.prototype.contains = function(t) {
            if (t === this) {
                return false
            }
            var e = t;
            while (e !== this && e !== null) {
                e = e.parent
            }
            return e === this
        };
        Object.defineProperty(a.prototype, "boneData", {
            get: function() {
                return this._boneData
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "visible", {
            get: function() {
                return this._visible
            },
            set: function(t) {
                if (this._visible === t) {
                    return
                }
                this._visible = t;
                for (var e = 0, a = this._armature.getSlots(); e < a.length; e++) {
                    var r = a[e];
                    if (r.parent === this) {
                        r._updateVisible()
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "name", {
            get: function() {
                return this._boneData.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "parent", {
            get: function() {
                return this._parent
            },
            enumerable: true,
            configurable: true
        });
        a.prototype.getBones = function() {
            console.warn("Deprecated.");
            var t = new Array;
            for (var e = 0, a = this._armature.getBones(); e < a.length; e++) {
                var r = a[e];
                if (r.parent === this) {
                    t.push(r)
                }
            }
            return t
        };
        a.prototype.getSlots = function() {
            console.warn("Deprecated.");
            var t = new Array;
            for (var e = 0, a = this._armature.getSlots(); e < a.length; e++) {
                var r = a[e];
                if (r.parent === this) {
                    t.push(r)
                }
            }
            return t
        };
        Object.defineProperty(a.prototype, "slot", {
            get: function() {
                console.warn("Deprecated.");
                for (var t = 0, e = this._armature.getSlots(); t < e.length; t++) {
                    var a = e[t];
                    if (a.parent === this) {
                        return a
                    }
                }
                return null
            },
            enumerable: true,
            configurable: true
        });
        return a
    }(t.TransformObject);
    t.Bone = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e._vertices = [];
            e._deformVertices = [];
            e._hullCache = [];
            e._matrixCahce = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.Surface]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this._dX = 0;
            this._dY = 0;
            this._k = 0;
            this._kX = 0;
            this._kY = 0;
            this._vertices.length = 0;
            this._deformVertices.length = 0;
            this._matrixCahce.length = 0;
            this._hullCache.length = 0
        };
        e.prototype._getAffineTransform = function(t, e, a, r, i, n, s, o, l, h, f, u, _) {
            var c = s - i;
            var p = o - n;
            var m = l - i;
            var d = h - n;
            f.rotation = Math.atan2(p, c);
            f.skew = Math.atan2(d, m) - Math.PI * .5 - f.rotation;
            if (_) {
                f.rotation += Math.PI
            }
            f.scaleX = Math.sqrt(c * c + p * p) / a;
            f.scaleY = Math.sqrt(m * m + d * d) / r;
            f.toMatrix(u);
            f.x = u.tx = i - (u.a * t + u.c * e);
            f.y = u.ty = n - (u.b * t + u.d * e)
        };
        e.prototype._updateVertices = function() {
            var t = this._boneData.vertices;
            var e = this._vertices;
            var a = this._deformVertices;
            if (this._parent !== null) {
                if (this._parent._boneData.type === 1) {
                    for (var r = 0, i = t.length; r < i; r += 2) {
                        var n = t[r] + a[r];
                        var s = t[r + 1] + a[r];
                        var o = this._parent._getGlobalTransformMatrix(n, s);
                        e[r] = o.a * n + o.c * s + o.tx;
                        e[r + 1] = o.b * n + o.d * s + o.ty
                    }
                } else {
                    var l = this._parent.globalTransformMatrix;
                    for (var r = 0, i = t.length; r < i; r += 2) {
                        var n = t[r] + a[r];
                        var s = t[r + 1] + a[r + 1];
                        e[r] = l.a * n + l.c * s + l.tx;
                        e[r + 1] = l.b * n + l.d * s + l.ty
                    }
                }
            } else {
                for (var r = 0, i = t.length; r < i; r += 2) {
                    e[r] = t[r] + a[r];
                    e[r + 1] = t[r + 1] + a[r + 1]
                }
            }
        };
        e.prototype._updateGlobalTransformMatrix = function(t) {
            t;
            var e = this._boneData.segmentX * 2;
            var a = this._vertices.length - 2;
            var r = 200;
            var i = this._vertices[0];
            var n = this._vertices[1];
            var s = this._vertices[e];
            var o = this._vertices[e + 1];
            var l = this._vertices[a];
            var h = this._vertices[a + 1];
            var f = this._vertices[a - e];
            var u = this._vertices[a - e + 1];
            var _ = i + (l - i) * .5;
            var c = n + (h - n) * .5;
            var p = s + (f - s) * .5;
            var m = o + (u - o) * .5;
            var d = _ + (p - _) * .5;
            var v = c + (m - c) * .5;
            var y = s + (l - s) * .5;
            var g = o + (h - o) * .5;
            var b = f + (l - f) * .5;
            var D = u + (h - u) * .5;
            this._globalDirty = false;
            this._getAffineTransform(0, 0, r, r, d, v, y, g, b, D, this.global, this.globalTransformMatrix, false)
        };
        e.prototype._getGlobalTransformMatrix = function(t, a) {
            var r = 1e3;
            if (t < -r || r < t || a < -r || r < a) {
                return this.globalTransformMatrix
            }
            var i = false;
            var n = 200;
            var s = this._boneData;
            var o = s.segmentX;
            var l = s.segmentY;
            var h = s.segmentX * 2;
            var f = this._dX;
            var u = this._dY;
            var _ = Math.floor((t + n) / f);
            var c = Math.floor((a + n) / u);
            var p = 0;
            var m = _ * f - n;
            var d = c * u - n;
            var v = this._matrixCahce;
            var y = e._helpMatrix;
            if (t < -n) {
                if (a < -n || a >= n) {
                    return this.globalTransformMatrix
                }
                i = a > this._kX * (t + n) + d;
                p = ((o * (l + 1) + o * 2 + l + c) * 2 + (i ? 1 : 0)) * 7;
                if (this._matrixCahce[p] > 0) {
                    y.copyFromArray(v, p + 1)
                } else {
                    var g = c * (h + 2);
                    var b = this._hullCache[4];
                    var D = this._hullCache[5];
                    var T = this._hullCache[2] - (l - c) * b;
                    var A = this._hullCache[3] - (l - c) * D;
                    var x = this._vertices;
                    if (i) {
                        this._getAffineTransform(-n, d + u, r - n, u, x[g + h + 2], x[g + h + 3], T + b, A + D, x[g], x[g + 1], e._helpTransform, y, true)
                    } else {
                        this._getAffineTransform(-r, d, r - n, u, T, A, x[g], x[g + 1], T + b, A + D, e._helpTransform, y, false)
                    }
                    v[p] = 1;
                    v[p + 1] = y.a;
                    v[p + 2] = y.b;
                    v[p + 3] = y.c;
                    v[p + 4] = y.d;
                    v[p + 5] = y.tx;
                    v[p + 6] = y.ty
                }
            } else if (t >= n) {
                if (a < -n || a >= n) {
                    return this.globalTransformMatrix
                }
                i = a > this._kX * (t - r) + d;
                p = ((o * (l + 1) + o + c) * 2 + (i ? 1 : 0)) * 7;
                if (this._matrixCahce[p] > 0) {
                    y.copyFromArray(v, p + 1)
                } else {
                    var g = (c + 1) * (h + 2) - 2;
                    var b = this._hullCache[4];
                    var D = this._hullCache[5];
                    var T = this._hullCache[0] + c * b;
                    var A = this._hullCache[1] + c * D;
                    var x = this._vertices;
                    if (i) {
                        this._getAffineTransform(r, d + u, r - n, u, T + b, A + D, x[g + h + 2], x[g + h + 3], T, A, e._helpTransform, y, true)
                    } else {
                        this._getAffineTransform(n, d, r - n, u, x[g], x[g + 1], T, A, x[g + h + 2], x[g + h + 3], e._helpTransform, y, false)
                    }
                    v[p] = 1;
                    v[p + 1] = y.a;
                    v[p + 2] = y.b;
                    v[p + 3] = y.c;
                    v[p + 4] = y.d;
                    v[p + 5] = y.tx;
                    v[p + 6] = y.ty
                }
            } else if (a < -n) {
                if (t < -n || t >= n) {
                    return this.globalTransformMatrix
                }
                i = a > this._kY * (t - m - f) - r;
                p = (o * (l + 1) + _ * 2 + (i ? 1 : 0)) * 7;
                if (this._matrixCahce[p] > 0) {
                    y.copyFromArray(v, p + 1)
                } else {
                    var g = _ * 2;
                    var b = this._hullCache[10];
                    var D = this._hullCache[11];
                    var T = this._hullCache[8] + _ * b;
                    var A = this._hullCache[9] + _ * D;
                    var x = this._vertices;
                    if (i) {
                        this._getAffineTransform(m + f, -n, f, r - n, x[g + 2], x[g + 3], x[g], x[g + 1], T + b, A + D, e._helpTransform, y, true)
                    } else {
                        this._getAffineTransform(m, -r, f, r - n, T, A, T + b, A + D, x[g], x[g + 1], e._helpTransform, y, false)
                    }
                    v[p] = 1;
                    v[p + 1] = y.a;
                    v[p + 2] = y.b;
                    v[p + 3] = y.c;
                    v[p + 4] = y.d;
                    v[p + 5] = y.tx;
                    v[p + 6] = y.ty
                }
            } else if (a >= n) {
                if (t < -n || t >= n) {
                    return this.globalTransformMatrix
                }
                i = a > this._kY * (t - m - f) + n;
                p = ((o * (l + 1) + o + l + c) * 2 + (i ? 1 : 0)) * 7;
                if (this._matrixCahce[p] > 0) {
                    y.copyFromArray(v, p + 1)
                } else {
                    var g = l * (h + 2) + _ * 2;
                    var b = this._hullCache[10];
                    var D = this._hullCache[11];
                    var T = this._hullCache[6] - (o - _) * b;
                    var A = this._hullCache[7] - (o - _) * D;
                    var x = this._vertices;
                    if (i) {
                        this._getAffineTransform(m + f, r, f, r - n, T + b, A + D, T, A, x[g + 2], x[g + 3], e._helpTransform, y, true)
                    } else {
                        this._getAffineTransform(m, n, f, r - n, x[g], x[g + 1], x[g + 2], x[g + 3], T, A, e._helpTransform, y, false)
                    }
                    v[p] = 1;
                    v[p + 1] = y.a;
                    v[p + 2] = y.b;
                    v[p + 3] = y.c;
                    v[p + 4] = y.d;
                    v[p + 5] = y.tx;
                    v[p + 6] = y.ty
                }
            } else {
                i = a > this._k * (t - m - f) + d;
                p = ((o * c + _) * 2 + (i ? 1 : 0)) * 7;
                if (this._matrixCahce[p] > 0) {
                    y.copyFromArray(v, p + 1)
                } else {
                    var g = _ * 2 + c * (h + 2);
                    var x = this._vertices;
                    if (i) {
                        this._getAffineTransform(m + f, d + u, f, u, x[g + h + 4], x[g + h + 5], x[g + h + 2], x[g + h + 3], x[g + 2], x[g + 3], e._helpTransform, y, true)
                    } else {
                        this._getAffineTransform(m, d, f, u, x[g], x[g + 1], x[g + 2], x[g + 3], x[g + h + 2], x[g + h + 3], e._helpTransform, y, false)
                    }
                    v[p] = 1;
                    v[p + 1] = y.a;
                    v[p + 2] = y.b;
                    v[p + 3] = y.c;
                    v[p + 4] = y.d;
                    v[p + 5] = y.tx;
                    v[p + 6] = y.ty
                }
            }
            return y
        };
        e.prototype.init = function(e, a) {
            if (this._boneData !== null) {
                return
            }
            t.prototype.init.call(this, e, a);
            var r = e.segmentX;
            var i = e.segmentY;
            var n = e.vertices.length;
            var s = 1e3;
            var o = 200;
            this._dX = o * 2 / r;
            this._dY = o * 2 / i;
            this._k = -this._dY / this._dX;
            this._kX = -this._dY / (s - o);
            this._kY = -(s - o) / this._dX;
            this._vertices.length = n;
            this._deformVertices.length = n;
            this._matrixCahce.length = (r * i + r * 2 + i * 2) * 2 * 7;
            this._hullCache.length = 10;
            for (var l = 0; l < n; ++l) {
                this._deformVertices[l] = 0
            }
        };
        e.prototype.update = function(t) {
            this._blendState.dirty = false;
            if (t >= 0 && this._cachedFrameIndices !== null) {
                var a = this._cachedFrameIndices[t];
                if (a >= 0 && this._cachedFrameIndex === a) {
                    this._transformDirty = false
                } else if (a >= 0) {
                    this._transformDirty = true;
                    this._cachedFrameIndex = a
                } else {
                    if (this._hasConstraint) {
                        for (var r = 0, i = this._armature._constraints; r < i.length; r++) {
                            var n = i[r];
                            if (n._root === this) {
                                n.update()
                            }
                        }
                    }
                    if (this._transformDirty || this._parent !== null && this._parent._childrenTransformDirty) {
                        this._transformDirty = true;
                        this._cachedFrameIndex = -1
                    } else if (this._cachedFrameIndex >= 0) {
                        this._transformDirty = false;
                        this._cachedFrameIndices[t] = this._cachedFrameIndex
                    } else {
                        this._transformDirty = true;
                        this._cachedFrameIndex = -1
                    }
                }
            } else {
                if (this._hasConstraint) {
                    for (var s = 0, o = this._armature._constraints; s < o.length; s++) {
                        var n = o[s];
                        if (n._root === this) {
                            n.update()
                        }
                    }
                }
                if (this._transformDirty || this._parent !== null && this._parent._childrenTransformDirty) {
                    t = -1;
                    this._transformDirty = true;
                    this._cachedFrameIndex = -1
                }
            }
            if (this._transformDirty) {
                this._transformDirty = false;
                this._childrenTransformDirty = true;
                for (var l = 0, h = this._matrixCahce.length; l < h; l += 7) {
                    this._matrixCahce[l] = -1
                }
                this._updateVertices();
                if (this._cachedFrameIndex < 0) {
                    var f = t >= 0;
                    if (this._localDirty) {
                        this._updateGlobalTransformMatrix(f)
                    }
                    if (f && this._cachedFrameIndices !== null) {
                        this._cachedFrameIndex = this._cachedFrameIndices[t] = this._armature._armatureData.setCacheFrame(this.globalTransformMatrix, this.global)
                    }
                } else {
                    this._armature._armatureData.getCacheFrame(this.globalTransformMatrix, this.global, this._cachedFrameIndex)
                }
                var u = 1e3;
                var _ = 200;
                var c = 2 * this.global.x;
                var p = 2 * this.global.y;
                var m = e._helpPoint;
                this.globalTransformMatrix.transformPoint(u, -_, m);
                this._hullCache[0] = m.x;
                this._hullCache[1] = m.y;
                this._hullCache[2] = c - m.x;
                this._hullCache[3] = p - m.y;
                this.globalTransformMatrix.transformPoint(0, this._dY, m, true);
                this._hullCache[4] = m.x;
                this._hullCache[5] = m.y;
                this.globalTransformMatrix.transformPoint(_, u, m);
                this._hullCache[6] = m.x;
                this._hullCache[7] = m.y;
                this._hullCache[8] = c - m.x;
                this._hullCache[9] = p - m.y;
                this.globalTransformMatrix.transformPoint(this._dX, 0, m, true);
                this._hullCache[10] = m.x;
                this._hullCache[11] = m.y
            } else if (this._childrenTransformDirty) {
                this._childrenTransformDirty = false
            }
            this._localDirty = true
        };
        return e
    }(t.Bone);
    t.Surface = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a._localMatrix = new t.Matrix;
            a._colorTransform = new t.ColorTransform;
            a._displayDatas = [];
            a._displayList = [];
            a._deformVertices = null;
            a._rawDisplay = null;
            a._meshDisplay = null;
            return a
        }
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            var a = [];
            for (var r = 0, i = this._displayList; r < i.length; r++) {
                var n = i[r];
                if (n !== null && n !== this._rawDisplay && n !== this._meshDisplay && a.indexOf(n) < 0) {
                    a.push(n)
                }
            }
            for (var s = 0, o = a; s < o.length; s++) {
                var n = o[s];
                if (n instanceof t.Armature) {
                    n.dispose()
                } else {
                    this._disposeDisplay(n, true)
                }
            }
            if (this._deformVertices !== null) {
                this._deformVertices.returnToPool()
            }
            if (this._meshDisplay !== null && this._meshDisplay !== this._rawDisplay) {
                this._disposeDisplay(this._meshDisplay, false)
            }
            if (this._rawDisplay !== null) {
                this._disposeDisplay(this._rawDisplay, false)
            }
            this.displayController = null;
            this._displayDirty = false;
            this._zOrderDirty = false;
            this._blendModeDirty = false;
            this._colorDirty = false;
            this._transformDirty = false;
            this._visible = true;
            this._blendMode = 0;
            this._displayIndex = -1;
            this._animationDisplayIndex = -1;
            this._zOrder = 0;
            this._cachedFrameIndex = -1;
            this._pivotX = 0;
            this._pivotY = 0;
            this._localMatrix.identity();
            this._colorTransform.identity();
            this._displayList.length = 0;
            this._displayDatas.length = 0;
            this._slotData = null;
            this._rawDisplayDatas = null;
            this._displayData = null;
            this._boundingBoxData = null;
            this._textureData = null;
            this._deformVertices = null;
            this._rawDisplay = null;
            this._meshDisplay = null;
            this._display = null;
            this._childArmature = null;
            this._parent = null;
            this._cachedFrameIndices = null
        };
        a.prototype._getDefaultRawDisplayData = function(t) {
            var e = this._armature._armatureData.defaultSkin;
            if (e !== null) {
                var a = e.getDisplays(this._slotData.name);
                if (a !== null) {
                    return t < a.length ? a[t] : null
                }
            }
            return null
        };
        a.prototype._updateDisplayData = function() {
            var e = this._displayData;
            var r = this._deformVertices !== null ? this._deformVertices.verticesData : null;
            var i = this._textureData;
            var n = null;
            var s = null;
            this._displayData = null;
            this._boundingBoxData = null;
            this._textureData = null;
            if (this._displayIndex >= 0) {
                if (this._rawDisplayDatas !== null) {
                    n = this._displayIndex < this._rawDisplayDatas.length ? this._rawDisplayDatas[this._displayIndex] : null
                }
                if (n === null) {
                    n = this._getDefaultRawDisplayData(this._displayIndex)
                }
                if (this._displayIndex < this._displayDatas.length) {
                    this._displayData = this._displayDatas[this._displayIndex]
                }
            }
            if (this._displayData !== null) {
                if (this._displayData.type === 2) {
                    s = this._displayData.vertices
                } else if (this._displayData.type === 4) {
                    s = this._displayData.vertices
                } else if (n !== null) {
                    if (n.type === 2) {
                        s = n.vertices
                    } else if (n.type === 4) {
                        s = n.vertices
                    }
                }
                if (this._displayData.type === 3) {
                    this._boundingBoxData = this._displayData.boundingBox
                } else if (n !== null) {
                    if (n.type === 3) {
                        this._boundingBoxData = n.boundingBox
                    }
                }
                if (this._displayData.type === 0) {
                    this._textureData = this._displayData.texture
                } else if (this._displayData.type === 2) {
                    this._textureData = this._displayData.texture
                }
            }
            if (this._displayData !== e || s !== r || this._textureData !== i) {
                if (s === null && this._textureData !== null) {
                    var o = this._displayData;
                    var l = this._textureData.parent.scale * this._armature._armatureData.scale;
                    var h = this._textureData.frame;
                    this._pivotX = o.pivot.x;
                    this._pivotY = o.pivot.y;
                    var f = h !== null ? h : this._textureData.region;
                    var u = f.width;
                    var _ = f.height;
                    if (this._textureData.rotated && h === null) {
                        u = f.height;
                        _ = f.width
                    }
                    this._pivotX *= u * l;
                    this._pivotY *= _ * l;
                    if (h !== null) {
                        this._pivotX += h.x * l;
                        this._pivotY += h.y * l
                    }
                    if (this._displayData !== null && n !== null && this._displayData !== n) {
                        n.transform.toMatrix(a._helpMatrix);
                        a._helpMatrix.invert();
                        a._helpMatrix.transformPoint(0, 0, a._helpPoint);
                        this._pivotX -= a._helpPoint.x;
                        this._pivotY -= a._helpPoint.y;
                        this._displayData.transform.toMatrix(a._helpMatrix);
                        a._helpMatrix.invert();
                        a._helpMatrix.transformPoint(0, 0, a._helpPoint);
                        this._pivotX += a._helpPoint.x;
                        this._pivotY += a._helpPoint.y
                    }
                    if (!t.DragonBones.yDown) {
                        this._pivotY = (this._textureData.rotated ? this._textureData.region.width : this._textureData.region.height) * l - this._pivotY
                    }
                } else {
                    this._pivotX = 0;
                    this._pivotY = 0
                }
                if (n !== null) {
                    this.origin = n.transform
                } else if (this._displayData !== null) {
                    this.origin = this._displayData.transform
                } else {
                    this.origin = null
                }
                if (s !== r) {
                    if (this._deformVertices === null) {
                        this._deformVertices = t.BaseObject.borrowObject(t.DeformVertices)
                    }
                    this._deformVertices.init(s, this._armature)
                } else if (this._deformVertices !== null && this._textureData !== i) {
                    this._deformVertices.verticesDirty = true
                }
                this._displayDirty = true;
                this._transformDirty = true
            }
        };
        a.prototype._updateDisplay = function() {
            var e = this._display !== null ? this._display : this._rawDisplay;
            var a = this._childArmature;
            if (this._displayIndex >= 0 && this._displayIndex < this._displayList.length) {
                this._display = this._displayList[this._displayIndex];
                if (this._display !== null && this._display instanceof t.Armature) {
                    this._childArmature = this._display;
                    this._display = this._childArmature.display
                } else {
                    this._childArmature = null
                }
            } else {
                this._display = null;
                this._childArmature = null
            }
            var r = this._display !== null ? this._display : this._rawDisplay;
            if (r !== e) {
                this._onUpdateDisplay();
                this._replaceDisplay(e);
                this._transformDirty = true;
                this._visibleDirty = true;
                this._blendModeDirty = true;
                this._colorDirty = true
            }
            if (r === this._rawDisplay || r === this._meshDisplay) {
                this._updateFrame()
            }
            if (this._childArmature !== a) {
                if (a !== null) {
                    a._parent = null;
                    a.clock = null;
                    if (a.inheritAnimation) {
                        a.animation.reset()
                    }
                }
                if (this._childArmature !== null) {
                    this._childArmature._parent = this;
                    this._childArmature.clock = this._armature.clock;
                    if (this._childArmature.inheritAnimation) {
                        if (this._childArmature.cacheFrameRate === 0) {
                            var i = this._armature.cacheFrameRate;
                            if (i !== 0) {
                                this._childArmature.cacheFrameRate = i
                            }
                        }
                        var n = null;
                        if (this._displayData !== null && this._displayData.type === 1) {
                            n = this._displayData.actions
                        } else if (this._displayIndex >= 0 && this._rawDisplayDatas !== null) {
                            var s = this._displayIndex < this._rawDisplayDatas.length ? this._rawDisplayDatas[this._displayIndex] : null;
                            if (s === null) {
                                s = this._getDefaultRawDisplayData(this._displayIndex)
                            }
                            if (s !== null && s.type === 1) {
                                n = s.actions
                            }
                        }
                        if (n !== null && n.length > 0) {
                            for (var o = 0, l = n; o < l.length; o++) {
                                var h = l[o];
                                var f = t.BaseObject.borrowObject(t.EventObject);
                                t.EventObject.actionDataToInstance(h, f, this._armature);
                                f.slot = this;
                                this._armature._bufferAction(f, false)
                            }
                        } else {
                            this._childArmature.animation.play()
                        }
                    }
                }
            }
        };
        a.prototype._updateGlobalTransformMatrix = function(t) {
            var e = this._parent._boneData.type === 0 ? this._parent.globalTransformMatrix : this._parent._getGlobalTransformMatrix(this.global.x, this.global.y);
            this.globalTransformMatrix.copyFrom(this._localMatrix);
            this.globalTransformMatrix.concat(e);
            if (t) {
                this.global.fromMatrix(this.globalTransformMatrix)
            } else {
                this._globalDirty = true
            }
        };
        a.prototype._setDisplayIndex = function(t, e) {
            if (e === void 0) {
                e = false
            }
            if (e) {
                if (this._animationDisplayIndex === t) {
                    return false
                }
                this._animationDisplayIndex = t
            }
            if (this._displayIndex === t) {
                return false
            }
            this._displayIndex = t;
            this._displayDirty = true;
            this._updateDisplayData();
            return this._displayDirty
        };
        a.prototype._setZorder = function(t) {
            if (this._zOrder === t) {}
            this._zOrder = t;
            this._zOrderDirty = true;
            return this._zOrderDirty
        };
        a.prototype._setColor = function(t) {
            this._colorTransform.copyFrom(t);
            this._colorDirty = true;
            return this._colorDirty
        };
        a.prototype._setDisplayList = function(e) {
            if (e !== null && e.length > 0) {
                if (this._displayList.length !== e.length) {
                    this._displayList.length = e.length
                }
                for (var a = 0, r = e.length; a < r; ++a) {
                    var i = e[a];
                    if (i !== null && i !== this._rawDisplay && i !== this._meshDisplay && !(i instanceof t.Armature) && this._displayList.indexOf(i) < 0) {
                        this._initDisplay(i, true)
                    }
                    this._displayList[a] = i
                }
            } else if (this._displayList.length > 0) {
                this._displayList.length = 0
            }
            if (this._displayIndex >= 0 && this._displayIndex < this._displayList.length) {
                this._displayDirty = this._display !== this._displayList[this._displayIndex]
            } else {
                this._displayDirty = this._display !== null
            }
            this._updateDisplayData();
            return this._displayDirty
        };
        a.prototype.init = function(t, e, a, r) {
            if (this._slotData !== null) {
                return
            }
            this._slotData = t;
            this._visibleDirty = true;
            this._blendModeDirty = true;
            this._colorDirty = true;
            this._blendMode = this._slotData.blendMode;
            this._zOrder = this._slotData.zOrder;
            this._colorTransform.copyFrom(this._slotData.color);
            this._rawDisplay = a;
            this._meshDisplay = r;
            this._armature = e;
            var i = this._armature.getBone(this._slotData.parent.name);
            if (i !== null) {
                this._parent = i
            } else {}
            this._armature._addSlot(this);
            this._initDisplay(this._rawDisplay, false);
            if (this._rawDisplay !== this._meshDisplay) {
                this._initDisplay(this._meshDisplay, false)
            }
            this._onUpdateDisplay();
            this._addDisplay()
        };
        a.prototype.update = function(t) {
            if (this._displayDirty) {
                this._displayDirty = false;
                this._updateDisplay();
                if (this._transformDirty) {
                    if (this.origin !== null) {
                        this.global.copyFrom(this.origin).add(this.offset).toMatrix(this._localMatrix)
                    } else {
                        this.global.copyFrom(this.offset).toMatrix(this._localMatrix)
                    }
                }
            }
            if (this._zOrderDirty) {
                this._zOrderDirty = false;
                this._updateZOrder()
            }
            if (t >= 0 && this._cachedFrameIndices !== null) {
                var e = this._cachedFrameIndices[t];
                if (e >= 0 && this._cachedFrameIndex === e) {
                    this._transformDirty = false
                } else if (e >= 0) {
                    this._transformDirty = true;
                    this._cachedFrameIndex = e
                } else if (this._transformDirty || this._parent._childrenTransformDirty) {
                    this._transformDirty = true;
                    this._cachedFrameIndex = -1
                } else if (this._cachedFrameIndex >= 0) {
                    this._transformDirty = false;
                    this._cachedFrameIndices[t] = this._cachedFrameIndex
                } else {
                    this._transformDirty = true;
                    this._cachedFrameIndex = -1
                }
            } else if (this._transformDirty || this._parent._childrenTransformDirty) {
                t = -1;
                this._transformDirty = true;
                this._cachedFrameIndex = -1
            }
            if (this._display === null) {
                return
            }
            if (this._visibleDirty) {
                this._visibleDirty = false;
                this._updateVisible()
            }
            if (this._blendModeDirty) {
                this._blendModeDirty = false;
                this._updateBlendMode()
            }
            if (this._colorDirty) {
                this._colorDirty = false;
                this._updateColor()
            }
            if (this._deformVertices !== null && this._deformVertices.verticesData !== null && this._display === this._meshDisplay) {
                var a = this._deformVertices.verticesData.weight !== null;
                var r = this._parent._boneData.type !== 0;
                if (this._deformVertices.verticesDirty || a && this._deformVertices.isBonesUpdate() || r && this._parent._childrenTransformDirty) {
                    this._deformVertices.verticesDirty = false;
                    this._updateMesh()
                }
                if (a || r) {
                    return
                }
            }
            if (this._transformDirty) {
                this._transformDirty = false;
                if (this._cachedFrameIndex < 0) {
                    var i = t >= 0;
                    this._updateGlobalTransformMatrix(i);
                    if (i && this._cachedFrameIndices !== null) {
                        this._cachedFrameIndex = this._cachedFrameIndices[t] = this._armature._armatureData.setCacheFrame(this.globalTransformMatrix, this.global)
                    }
                } else {
                    this._armature._armatureData.getCacheFrame(this.globalTransformMatrix, this.global, this._cachedFrameIndex)
                }
                this._updateTransform()
            }
        };
        a.prototype.updateTransformAndMatrix = function() {
            if (this._transformDirty) {
                this._transformDirty = false;
                this._updateGlobalTransformMatrix(false)
            }
        };
        a.prototype.replaceDisplayData = function(t, e) {
            if (e === void 0) {
                e = -1
            }
            if (e < 0) {
                if (this._displayIndex < 0) {
                    e = 0
                } else {
                    e = this._displayIndex
                }
            }
            if (this._displayDatas.length <= e) {
                this._displayDatas.length = e + 1;
                for (var a = 0, r = this._displayDatas.length; a < r; ++a) {
                    if (!this._displayDatas[a]) {
                        this._displayDatas[a] = null
                    }
                }
            }
            this._displayDatas[e] = t
        };
        a.prototype.containsPoint = function(t, e) {
            if (this._boundingBoxData === null) {
                return false
            }
            this.updateTransformAndMatrix();
            a._helpMatrix.copyFrom(this.globalTransformMatrix);
            a._helpMatrix.invert();
            a._helpMatrix.transformPoint(t, e, a._helpPoint);
            return this._boundingBoxData.containsPoint(a._helpPoint.x, a._helpPoint.y)
        };
        a.prototype.intersectsSegment = function(t, e, r, i, n, s, o) {
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = null
            }
            if (o === void 0) {
                o = null
            }
            if (this._boundingBoxData === null) {
                return 0
            }
            this.updateTransformAndMatrix();
            a._helpMatrix.copyFrom(this.globalTransformMatrix);
            a._helpMatrix.invert();
            a._helpMatrix.transformPoint(t, e, a._helpPoint);
            t = a._helpPoint.x;
            e = a._helpPoint.y;
            a._helpMatrix.transformPoint(r, i, a._helpPoint);
            r = a._helpPoint.x;
            i = a._helpPoint.y;
            var l = this._boundingBoxData.intersectsSegment(t, e, r, i, n, s, o);
            if (l > 0) {
                if (l === 1 || l === 2) {
                    if (n !== null) {
                        this.globalTransformMatrix.transformPoint(n.x, n.y, n);
                        if (s !== null) {
                            s.x = n.x;
                            s.y = n.y
                        }
                    } else if (s !== null) {
                        this.globalTransformMatrix.transformPoint(s.x, s.y, s)
                    }
                } else {
                    if (n !== null) {
                        this.globalTransformMatrix.transformPoint(n.x, n.y, n)
                    }
                    if (s !== null) {
                        this.globalTransformMatrix.transformPoint(s.x, s.y, s)
                    }
                }
                if (o !== null) {
                    this.globalTransformMatrix.transformPoint(Math.cos(o.x), Math.sin(o.x), a._helpPoint, true);
                    o.x = Math.atan2(a._helpPoint.y, a._helpPoint.x);
                    this.globalTransformMatrix.transformPoint(Math.cos(o.y), Math.sin(o.y), a._helpPoint, true);
                    o.y = Math.atan2(a._helpPoint.y, a._helpPoint.x)
                }
            }
            return l
        };
        a.prototype.invalidUpdate = function() {
            this._displayDirty = true;
            this._transformDirty = true
        };
        Object.defineProperty(a.prototype, "visible", {
            get: function() {
                return this._visible
            },
            set: function(t) {
                if (this._visible === t) {
                    return
                }
                this._visible = t;
                this._updateVisible()
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "displayIndex", {
            get: function() {
                return this._displayIndex
            },
            set: function(t) {
                if (this._setDisplayIndex(t)) {
                    this.update(-1)
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "name", {
            get: function() {
                return this._slotData.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "displayList", {
            get: function() {
                return this._displayList.concat()
            },
            set: function(e) {
                var a = this._displayList.concat();
                var r = new Array;
                if (this._setDisplayList(e)) {
                    this.update(-1)
                }
                for (var i = 0, n = a; i < n.length; i++) {
                    var s = n[i];
                    if (s !== null && s !== this._rawDisplay && s !== this._meshDisplay && this._displayList.indexOf(s) < 0 && r.indexOf(s) < 0) {
                        r.push(s)
                    }
                }
                for (var o = 0, l = r; o < l.length; o++) {
                    var s = l[o];
                    if (s instanceof t.Armature) {} else {
                        this._disposeDisplay(s, true)
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "slotData", {
            get: function() {
                return this._slotData
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "rawDisplayDatas", {
            get: function() {
                return this._rawDisplayDatas
            },
            set: function(t) {
                if (this._rawDisplayDatas === t) {
                    return
                }
                this._displayDirty = true;
                this._rawDisplayDatas = t;
                if (this._rawDisplayDatas !== null) {
                    this._displayDatas.length = this._rawDisplayDatas.length;
                    for (var e = 0, a = this._displayDatas.length; e < a; ++e) {
                        var r = this._rawDisplayDatas[e];
                        if (r === null) {
                            r = this._getDefaultRawDisplayData(e)
                        }
                        this._displayDatas[e] = r
                    }
                } else {
                    this._displayDatas.length = 0
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "displayData", {
            get: function() {
                return this._displayData
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "boundingBoxData", {
            get: function() {
                return this._boundingBoxData
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "rawDisplay", {
            get: function() {
                return this._rawDisplay
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "meshDisplay", {
            get: function() {
                return this._meshDisplay
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "display", {
            get: function() {
                return this._display
            },
            set: function(t) {
                if (this._display === t) {
                    return
                }
                var e = this._displayList.length;
                if (this._displayIndex < 0 && e === 0) {
                    this._displayIndex = 0
                }
                if (this._displayIndex < 0) {
                    return
                } else {
                    var a = this.displayList;
                    if (e <= this._displayIndex) {
                        a.length = this._displayIndex + 1
                    }
                    a[this._displayIndex] = t;
                    this.displayList = a
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "childArmature", {
            get: function() {
                return this._childArmature
            },
            set: function(t) {
                if (this._childArmature === t) {
                    return
                }
                this.display = t
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "parent", {
            get: function() {
                return this._parent
            },
            enumerable: true,
            configurable: true
        });
        a.prototype.getDisplay = function() {
            return this._display
        };
        a.prototype.setDisplay = function(t) {
            this.display = t
        };
        return a
    }(t.TransformObject);
    t.Slot = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.prototype._onClear = function() {
            this._armature = null;
            this._target = null;
            this._root = null;
            this._bone = null
        };
        Object.defineProperty(a.prototype, "name", {
            get: function() {
                return this._constraintData.name
            },
            enumerable: true,
            configurable: true
        });
        a._helpMatrix = new t.Matrix;
        a._helpTransform = new t.Transform;
        a._helpPoint = new t.Point;
        return a
    }(t.BaseObject);
    t.Constraint = e;
    var a = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.toString = function() {
            return "[class dragonBones.IKConstraint]"
        };
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            this._scaleEnabled = false;
            this._bendPositive = false;
            this._weight = 1;
            this._constraintData = null
        };
        a.prototype._computeA = function() {
            var e = this._target.global;
            var a = this._root.global;
            var r = this._root.globalTransformMatrix;
            var i = Math.atan2(e.y - a.y, e.x - a.x);
            if (a.scaleX < 0) {
                i += Math.PI
            }
            a.rotation += t.Transform.normalizeRadian(i - a.rotation) * this._weight;
            a.toMatrix(r)
        };
        a.prototype._computeB = function() {
            var e = this._bone._boneData.length;
            var a = this._root;
            var r = this._target.global;
            var i = a.global;
            var n = this._bone.global;
            var s = this._bone.globalTransformMatrix;
            var o = s.a * e;
            var l = s.b * e;
            var h = o * o + l * l;
            var f = Math.sqrt(h);
            var u = n.x - i.x;
            var _ = n.y - i.y;
            var c = u * u + _ * _;
            var p = Math.sqrt(c);
            var m = n.rotation;
            var d = i.rotation;
            var v = Math.atan2(_, u);
            u = r.x - i.x;
            _ = r.y - i.y;
            var y = u * u + _ * _;
            var g = Math.sqrt(y);
            var b = 0;
            if (f + p <= g || g + f <= p || g + p <= f) {
                b = Math.atan2(r.y - i.y, r.x - i.x);
                if (f + p <= g) {} else if (p < f) {
                    b += Math.PI
                }
            } else {
                var D = (c - h + y) / (2 * y);
                var T = Math.sqrt(c - D * D * y) / g;
                var A = i.x + u * D;
                var x = i.y + _ * D;
                var P = -_ * T;
                var O = u * T;
                var S = false;
                var E = a.parent;
                if (E !== null) {
                    var M = E.globalTransformMatrix;
                    S = M.a * M.d - M.b * M.c < 0
                }
                if (S !== this._bendPositive) {
                    n.x = A - P;
                    n.y = x - O
                } else {
                    n.x = A + P;
                    n.y = x + O
                }
                b = Math.atan2(n.y - i.y, n.x - i.x)
            }
            var B = t.Transform.normalizeRadian(b - v);
            i.rotation = d + B * this._weight;
            i.toMatrix(a.globalTransformMatrix);
            var C = v + B * this._weight;
            n.x = i.x + Math.cos(C) * p;
            n.y = i.y + Math.sin(C) * p;
            var w = Math.atan2(r.y - n.y, r.x - n.x);
            if (n.scaleX < 0) {
                w += Math.PI
            }
            n.rotation = i.rotation + m - d + t.Transform.normalizeRadian(w - B - m) * this._weight;
            n.toMatrix(s)
        };
        a.prototype.init = function(t, e) {
            if (this._constraintData !== null) {
                return
            }
            this._constraintData = t;
            this._armature = e;
            this._target = this._armature.getBone(this._constraintData.target.name);
            this._root = this._armature.getBone(this._constraintData.root.name);
            this._bone = this._constraintData.bone !== null ? this._armature.getBone(this._constraintData.bone.name) : null; {
                var a = this._constraintData;
                this._scaleEnabled = a.scaleEnabled;
                this._bendPositive = a.bendPositive;
                this._weight = a.weight
            }
            this._root._hasConstraint = true
        };
        a.prototype.update = function() {
            this._root.updateByConstraint();
            if (this._bone !== null) {
                this._bone.updateByConstraint();
                this._computeB()
            } else {
                this._computeA()
            }
        };
        a.prototype.invalidUpdate = function() {
            this._root.invalidUpdate();
            if (this._bone !== null) {
                this._bone.invalidUpdate()
            }
        };
        return a
    }(e);
    t.IKConstraint = a;
    var r = function(e) {
        __extends(a, e);

        function a() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._bones = [];
            t._spaces = [];
            t._positions = [];
            t._curves = [];
            t._boneLengths = [];
            t._pathGlobalVertices = [];
            t._segments = [10];
            return t
        }
        a.toString = function() {
            return "[class dragonBones.PathConstraint]"
        };
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            this.dirty = false;
            this.pathOffset = 0;
            this.position = 0;
            this.spacing = 0;
            this.rotateOffset = 0;
            this.rotateMix = 1;
            this.translateMix = 1;
            this._pathSlot = null;
            this._bones.length = 0;
            this._spaces.length = 0;
            this._positions.length = 0;
            this._curves.length = 0;
            this._boneLengths.length = 0;
            this._pathGlobalVertices.length = 0
        };
        a.prototype._updatePathVertices = function(t) {
            var e = this._armature;
            var a = e.armatureData.parent;
            var r = e.armatureData.scale;
            var i = a.intArray;
            var n = a.floatArray;
            var s = t.offset;
            var o = i[s + 0];
            var l = i[s + 2];
            this._pathGlobalVertices.length = o * 2;
            var h = t.weight;
            if (h === null) {
                var f = this._pathSlot.parent;
                f.updateByConstraint();
                var u = f.globalTransformMatrix;
                for (var _ = 0, c = l; _ < o; _ += 2) {
                    var p = n[c++] * r;
                    var m = n[c++] * r;
                    var d = u.a * p + u.c * m + u.tx;
                    var v = u.b * p + u.d * m + u.ty;
                    this._pathGlobalVertices[_] = d;
                    this._pathGlobalVertices[_ + 1] = v
                }
                return
            }
            var y = this._pathSlot._deformVertices.bones;
            var g = h.bones.length;
            var b = h.offset;
            var D = i[b + 1];
            var T = D;
            var A = b + 2 + g;
            for (var _ = 0, x = 0; _ < o; _++) {
                var P = i[A++];
                var O = 0,
                    S = 0;
                for (var E = 0, M = P; E < M; E++) {
                    var B = i[A++];
                    var C = y[B];
                    if (C === null) {
                        continue
                    }
                    C.updateByConstraint();
                    var u = C.globalTransformMatrix;
                    var w = n[T++];
                    var p = n[T++] * r;
                    var m = n[T++] * r;
                    O += (u.a * p + u.c * m + u.tx) * w;
                    S += (u.b * p + u.d * m + u.ty) * w
                }
                this._pathGlobalVertices[x++] = O;
                this._pathGlobalVertices[x++] = S
            }
        };
        a.prototype._computeVertices = function(t, e, a, r) {
            for (var i = a, n = t; i < e; i += 2) {
                r[i] = this._pathGlobalVertices[n++];
                r[i + 1] = this._pathGlobalVertices[n++]
            }
        };
        a.prototype._computeBezierCurve = function(t, e, a, r, i) {
            var n = this._armature;
            var s = n.armatureData.parent.intArray;
            var o = s[t.vertices.offset + 0];
            var l = this._positions;
            var h = this._spaces;
            var f = t.closed;
            var u = Array();
            var _ = o * 2;
            var c = _ / 6;
            var p = -1;
            var m = this.position;
            l.length = e * 3 + 2;
            var d = 0;
            if (!t.constantSpeed) {
                var v = t.curveLengths;
                c -= f ? 1 : 2;
                d = v[c];
                if (r) {
                    m *= d
                }
                if (i) {
                    for (var y = 0; y < e; y++) {
                        h[y] *= d
                    }
                }
                u.length = 8;
                for (var y = 0, g = 0, b = 0; y < e; y++, g += 3) {
                    var D = h[y];
                    m += D;
                    if (f) {
                        m %= d;
                        if (m < 0) {
                            m += d
                        }
                        b = 0
                    } else if (m < 0) {
                        continue
                    } else if (m > d) {
                        continue
                    }
                    var T = 0;
                    for (;; b++) {
                        var A = v[b];
                        if (m > A) {
                            continue
                        }
                        if (b === 0) {
                            T = m / A
                        } else {
                            var x = v[b - 1];
                            T = (m - x) / (A - x)
                        }
                        break
                    }
                    if (b !== p) {
                        p = b;
                        if (f && b === c) {
                            this._computeVertices(_ - 4, 4, 0, u);
                            this._computeVertices(0, 4, 4, u)
                        } else {
                            this._computeVertices(b * 6 + 2, 8, 0, u)
                        }
                    }
                    this.addCurvePosition(T, u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], l, g, a)
                }
                return
            }
            if (f) {
                _ += 2;
                u.length = o;
                this._computeVertices(2, _ - 4, 0, u);
                this._computeVertices(0, 2, _ - 4, u);
                u[_ - 2] = u[0];
                u[_ - 1] = u[1]
            } else {
                c--;
                _ -= 4;
                u.length = _;
                this._computeVertices(2, _, 0, u)
            }
            var P = new Array(c);
            d = 0;
            var O = u[0],
                S = u[1],
                E = 0,
                M = 0,
                B = 0,
                C = 0,
                w = 0,
                I = 0;
            var F, N, R, k, j, L, V, U;
            for (var y = 0, Y = 2; y < c; y++, Y += 6) {
                E = u[Y];
                M = u[Y + 1];
                B = u[Y + 2];
                C = u[Y + 3];
                w = u[Y + 4];
                I = u[Y + 5];
                F = (O - E * 2 + B) * .1875;
                N = (S - M * 2 + C) * .1875;
                R = ((E - B) * 3 - O + w) * .09375;
                k = ((M - C) * 3 - S + I) * .09375;
                j = F * 2 + R;
                L = N * 2 + k;
                V = (E - O) * .75 + F + R * .16666667;
                U = (M - S) * .75 + N + k * .16666667;
                d += Math.sqrt(V * V + U * U);
                V += j;
                U += L;
                j += R;
                L += k;
                d += Math.sqrt(V * V + U * U);
                V += j;
                U += L;
                d += Math.sqrt(V * V + U * U);
                V += j + R;
                U += L + k;
                d += Math.sqrt(V * V + U * U);
                P[y] = d;
                O = w;
                S = I
            }
            if (r) {
                m *= d
            }
            if (i) {
                for (var y = 0; y < e; y++) {
                    h[y] *= d
                }
            }
            var X = this._segments;
            var H = 0;
            for (var y = 0, g = 0, b = 0, $ = 0; y < e; y++, g += 3) {
                var D = h[y];
                m += D;
                var G = m;
                if (f) {
                    G %= d;
                    if (G < 0) G += d;
                    b = 0
                } else if (G < 0) {
                    continue
                } else if (G > d) {
                    continue
                }
                for (;; b++) {
                    var W = P[b];
                    if (G > W) continue;
                    if (b === 0) G /= W;
                    else {
                        var z = P[b - 1];
                        G = (G - z) / (W - z)
                    }
                    break
                }
                if (b !== p) {
                    p = b;
                    var K = b * 6;
                    O = u[K];
                    S = u[K + 1];
                    E = u[K + 2];
                    M = u[K + 3];
                    B = u[K + 4];
                    C = u[K + 5];
                    w = u[K + 6];
                    I = u[K + 7];
                    F = (O - E * 2 + B) * .03;
                    N = (S - M * 2 + C) * .03;
                    R = ((E - B) * 3 - O + w) * .006;
                    k = ((M - C) * 3 - S + I) * .006;
                    j = F * 2 + R;
                    L = N * 2 + k;
                    V = (E - O) * .3 + F + R * .16666667;
                    U = (M - S) * .3 + N + k * .16666667;
                    H = Math.sqrt(V * V + U * U);
                    X[0] = H;
                    for (K = 1; K < 8; K++) {
                        V += j;
                        U += L;
                        j += R;
                        L += k;
                        H += Math.sqrt(V * V + U * U);
                        X[K] = H
                    }
                    V += j;
                    U += L;
                    H += Math.sqrt(V * V + U * U);
                    X[8] = H;
                    V += j + R;
                    U += L + k;
                    H += Math.sqrt(V * V + U * U);
                    X[9] = H;
                    $ = 0
                }
                G *= H;
                for (;; $++) {
                    var Z = X[$];
                    if (G > Z) continue;
                    if ($ === 0) G /= Z;
                    else {
                        var z = X[$ - 1];
                        G = $ + (G - z) / (Z - z)
                    }
                    break
                }
                this.addCurvePosition(G * .1, O, S, E, M, B, C, w, I, l, g, a)
            }
        };
        a.prototype.addCurvePosition = function(t, e, a, r, i, n, s, o, l, h, f, u) {
            if (t === 0) {
                h[f] = e;
                h[f + 1] = a;
                h[f + 2] = 0;
                return
            }
            if (t === 1) {
                h[f] = o;
                h[f + 1] = l;
                h[f + 2] = 0;
                return
            }
            var _ = 1 - t;
            var c = _ * _;
            var p = t * t;
            var m = c * _;
            var d = c * t * 3;
            var v = _ * p * 3;
            var y = t * p;
            var g = m * e + d * r + v * n + y * o;
            var b = m * a + d * i + v * s + y * l;
            h[f] = g;
            h[f + 1] = b;
            if (u) {
                h[f + 2] = Math.atan2(b - (m * a + d * i + v * s), g - (m * e + d * r + v * n))
            } else {
                h[f + 2] = 0
            }
        };
        a.prototype.init = function(t, e) {
            this._constraintData = t;
            this._armature = e;
            var a = t;
            this.pathOffset = a.pathDisplayData.vertices.offset;
            this.position = a.position;
            this.spacing = a.spacing;
            this.rotateOffset = a.rotateOffset;
            this.rotateMix = a.rotateMix;
            this.translateMix = a.translateMix;
            this._root = this._armature.getBone(a.root.name);
            this._target = this._armature.getBone(a.target.name);
            this._pathSlot = this._armature.getSlot(a.pathSlot.name);
            for (var r = 0, i = a.bones.length; r < i; r++) {
                var n = this._armature.getBone(a.bones[r].name);
                if (n !== null) {
                    this._bones.push(n)
                }
            }
            if (a.rotateMode === 2) {
                this._boneLengths.length = this._bones.length
            }
            this._root._hasConstraint = true
        };
        a.prototype.update = function() {
            var e = this._pathSlot;
            if (e._deformVertices === null || e._deformVertices.verticesData === null || e._deformVertices.verticesData.offset !== this.pathOffset) {
                return
            }
            var a = this._constraintData;
            var r = e._displayData;
            var i = false;
            var n = e._deformVertices;
            if (this._root._childrenTransformDirty) {
                this._updatePathVertices(r.vertices);
                i = true
            } else if (n !== null && (n.verticesDirty || n.isBonesUpdate())) {
                this._updatePathVertices(r.vertices);
                n.verticesDirty = false;
                i = true
            }
            if (!i && !this.dirty) {
                return
            }
            var s = a.positionMode;
            var o = a.spacingMode;
            var l = a.rotateMode;
            var h = this._bones;
            var f = o === 0;
            var u = l === 2;
            var _ = l === 0;
            var c = h.length;
            var p = _ ? c : c + 1;
            var m = this.spacing;
            var d = this._spaces;
            d.length = p;
            if (u || f) {
                d[0] = 0;
                for (var v = 0, y = p - 1; v < y; v++) {
                    var g = h[v];
                    g.updateByConstraint();
                    var b = g._boneData.length;
                    var D = g.globalTransformMatrix;
                    var T = b * D.a;
                    var A = b * D.b;
                    var x = Math.sqrt(T * T + A * A);
                    if (u) {
                        this._boneLengths[v] = x
                    }
                    d[v + 1] = (b + m) * x / b
                }
            } else {
                for (var v = 0; v < p; v++) {
                    d[v] = m
                }
            }
            this._computeBezierCurve(r, p, _, s === 1, o === 2);
            var P = this._positions;
            var O = this.rotateOffset;
            var S = P[0],
                E = P[1];
            var M;
            if (O === 0) {
                M = l === 1
            } else {
                M = false;
                var g = e.parent;
                if (g !== null) {
                    var D = g.globalTransformMatrix;
                    O *= D.a * D.d - D.b * D.c > 0 ? t.Transform.DEG_RAD : -t.Transform.DEG_RAD
                }
            }
            var B = this.rotateMix;
            var C = this.translateMix;
            for (var v = 0, w = 3; v < c; v++, w += 3) {
                var g = h[v];
                g.updateByConstraint();
                var D = g.globalTransformMatrix;
                D.tx += (S - D.tx) * C;
                D.ty += (E - D.ty) * C;
                var T = P[w],
                    A = P[w + 1];
                var I = T - S,
                    F = A - E;
                if (u) {
                    var N = this._boneLengths[v];
                    var R = (Math.sqrt(I * I + F * F) / N - 1) * B + 1;
                    D.a *= R;
                    D.b *= R
                }
                S = T;
                E = A;
                if (B > 0) {
                    var k = D.a,
                        j = D.b,
                        L = D.c,
                        V = D.d,
                        U = void 0,
                        Y = void 0,
                        X = void 0;
                    if (_) {
                        U = P[w - 1]
                    } else {
                        U = Math.atan2(F, I)
                    }
                    U -= Math.atan2(j, k);
                    if (M) {
                        Y = Math.cos(U);
                        X = Math.sin(U);
                        var H = g._boneData.length;
                        S += (H * (Y * k - X * j) - I) * B;
                        E += (H * (X * k + Y * j) - F) * B
                    } else {
                        U += O
                    }
                    if (U > t.Transform.PI) {
                        U -= t.Transform.PI_D
                    } else if (U < -t.Transform.PI) {
                        U += t.Transform.PI_D
                    }
                    U *= B;
                    Y = Math.cos(U);
                    X = Math.sin(U);
                    D.a = Y * k - X * j;
                    D.b = X * k + Y * j;
                    D.c = Y * L - X * V;
                    D.d = X * L + Y * V
                }
                g.global.fromMatrix(D)
            }
            this.dirty = false
        };
        a.prototype.invalidUpdate = function() {};
        return a
    }(e);
    t.PathConstraint = r
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function t(t) {
            if (t === void 0) {
                t = 0
            }
            this.time = 0;
            this.timeScale = 1;
            this._systemTime = 0;
            this._animatebles = [];
            this._clock = null;
            this.time = t;
            this._systemTime = (new Date).getTime() * .001
        }
        t.prototype.advanceTime = function(t) {
            if (t !== t) {
                t = 0
            }
            var e = Date.now() * .001;
            if (t < 0) {
                t = e - this._systemTime
            }
            this._systemTime = e;
            if (this.timeScale !== 1) {
                t *= this.timeScale
            }
            if (t === 0) {
                return
            }
            if (t < 0) {
                this.time -= t
            } else {
                this.time += t
            }
            var a = 0,
                r = 0,
                i = this._animatebles.length;
            for (; a < i; ++a) {
                var n = this._animatebles[a];
                if (n !== null) {
                    if (r > 0) {
                        this._animatebles[a - r] = n;
                        this._animatebles[a] = null
                    }
                    n.advanceTime(t)
                } else {
                    r++
                }
            }
            if (r > 0) {
                i = this._animatebles.length;
                for (; a < i; ++a) {
                    var s = this._animatebles[a];
                    if (s !== null) {
                        this._animatebles[a - r] = s
                    } else {
                        r++
                    }
                }
                this._animatebles.length -= r
            }
        };
        t.prototype.contains = function(t) {
            if (t === this) {
                return false
            }
            var e = t;
            while (e !== this && e !== null) {
                e = e.clock
            }
            return e === this
        };
        t.prototype.add = function(t) {
            if (this._animatebles.indexOf(t) < 0) {
                this._animatebles.push(t);
                t.clock = this
            }
        };
        t.prototype.remove = function(t) {
            var e = this._animatebles.indexOf(t);
            if (e >= 0) {
                this._animatebles[e] = null;
                t.clock = null
            }
        };
        t.prototype.clear = function() {
            for (var t = 0, e = this._animatebles; t < e.length; t++) {
                var a = e[t];
                if (a !== null) {
                    a.clock = null
                }
            }
        };
        Object.defineProperty(t.prototype, "clock", {
            get: function() {
                return this._clock
            },
            set: function(t) {
                if (this._clock === t) {
                    return
                }
                if (this._clock !== null) {
                    this._clock.remove(this)
                }
                this._clock = t;
                if (this._clock !== null) {
                    this._clock.add(this)
                }
            },
            enumerable: true,
            configurable: true
        });
        t.clock = new t;
        return t
    }();
    t.WorldClock = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._animationNames = [];
            t._animationStates = [];
            t._animations = {};
            t._animationConfig = null;
            return t
        }
        a.toString = function() {
            return "[class dragonBones.Animation]"
        };
        a.prototype._onClear = function() {
            for (var t = 0, e = this._animationStates; t < e.length; t++) {
                var a = e[t];
                a.returnToPool()
            }
            for (var r in this._animations) {
                delete this._animations[r]
            }
            if (this._animationConfig !== null) {
                this._animationConfig.returnToPool()
            }
            this.timeScale = 1;
            this._lockUpdate = false;
            this._animationDirty = false;
            this._inheritTimeScale = 1;
            this._animationNames.length = 0;
            this._animationStates.length = 0;
            this._armature = null;
            this._animationConfig = null;
            this._lastAnimationState = null
        };
        a.prototype._fadeOut = function(t) {
            switch (t.fadeOutMode) {
                case 1:
                    for (var e = 0, a = this._animationStates; e < a.length; e++) {
                        var r = a[e];
                        if (r._parent !== null) {
                            continue
                        }
                        if (r.layer === t.layer) {
                            r.fadeOut(t.fadeOutTime, t.pauseFadeOut)
                        }
                    }
                    break;
                case 2:
                    for (var i = 0, n = this._animationStates; i < n.length; i++) {
                        var r = n[i];
                        if (r._parent !== null) {
                            continue
                        }
                        if (r.group === t.group) {
                            r.fadeOut(t.fadeOutTime, t.pauseFadeOut)
                        }
                    }
                    break;
                case 3:
                    for (var s = 0, o = this._animationStates; s < o.length; s++) {
                        var r = o[s];
                        if (r._parent !== null) {
                            continue
                        }
                        if (r.layer === t.layer && r.group === t.group) {
                            r.fadeOut(t.fadeOutTime, t.pauseFadeOut)
                        }
                    }
                    break;
                case 4:
                    for (var l = 0, h = this._animationStates; l < h.length; l++) {
                        var r = h[l];
                        if (r._parent !== null) {
                            continue
                        }
                        r.fadeOut(t.fadeOutTime, t.pauseFadeOut)
                    }
                    break;
                case 0:
                case 5:
                default:
                    break
            }
        };
        a.prototype.init = function(e) {
            if (this._armature !== null) {
                return
            }
            this._armature = e;
            this._animationConfig = t.BaseObject.borrowObject(t.AnimationConfig)
        };
        a.prototype.advanceTime = function(t) {
            if (t < 0) {
                t = -t
            }
            if (this._armature.inheritAnimation && this._armature._parent !== null) {
                this._inheritTimeScale = this._armature._parent._armature.animation._inheritTimeScale * this.timeScale
            } else {
                this._inheritTimeScale = this.timeScale
            }
            if (this._inheritTimeScale !== 1) {
                t *= this._inheritTimeScale
            }
            var e = this._animationStates.length;
            if (e === 1) {
                var a = this._animationStates[0];
                if (a._fadeState > 0 && a._subFadeState > 0) {
                    this._armature._dragonBones.bufferObject(a);
                    this._animationStates.length = 0;
                    this._lastAnimationState = null
                } else {
                    var r = a._animationData;
                    var i = r.cacheFrameRate;
                    if (this._animationDirty && i > 0) {
                        this._animationDirty = false;
                        for (var n = 0, s = this._armature.getBones(); n < s.length; n++) {
                            var o = s[n];
                            o._cachedFrameIndices = r.getBoneCachedFrameIndices(o.name)
                        }
                        for (var l = 0, h = this._armature.getSlots(); l < h.length; l++) {
                            var f = h[l];
                            var u = f.rawDisplayDatas;
                            if (u !== null && u.length > 0) {
                                var _ = u[0];
                                if (_ !== null) {
                                    if (_.parent === this._armature.armatureData.defaultSkin) {
                                        f._cachedFrameIndices = r.getSlotCachedFrameIndices(f.name);
                                        continue
                                    }
                                }
                            }
                            f._cachedFrameIndices = null
                        }
                    }
                    a.advanceTime(t, i)
                }
            } else if (e > 1) {
                for (var c = 0, p = 0; c < e; ++c) {
                    var a = this._animationStates[c];
                    if (a._fadeState > 0 && a._subFadeState > 0) {
                        p++;
                        this._armature._dragonBones.bufferObject(a);
                        this._animationDirty = true;
                        if (this._lastAnimationState === a) {
                            this._lastAnimationState = null
                        }
                    } else {
                        if (p > 0) {
                            this._animationStates[c - p] = a
                        }
                        a.advanceTime(t, 0)
                    }
                    if (c === e - 1 && p > 0) {
                        this._animationStates.length -= p;
                        if (this._lastAnimationState === null && this._animationStates.length > 0) {
                            this._lastAnimationState = this._animationStates[this._animationStates.length - 1]
                        }
                    }
                }
                this._armature._cacheFrameIndex = -1
            } else {
                this._armature._cacheFrameIndex = -1
            }
        };
        a.prototype.reset = function() {
            for (var t = 0, e = this._animationStates; t < e.length; t++) {
                var a = e[t];
                a.returnToPool()
            }
            this._animationDirty = false;
            this._animationConfig.clear();
            this._animationStates.length = 0;
            this._lastAnimationState = null
        };
        a.prototype.stop = function(t) {
            if (t === void 0) {
                t = null
            }
            if (t !== null) {
                var e = this.getState(t);
                if (e !== null) {
                    e.stop()
                }
            } else {
                for (var a = 0, r = this._animationStates; a < r.length; a++) {
                    var e = r[a];
                    e.stop()
                }
            }
        };
        a.prototype.playConfig = function(e) {
            var a = e.animation;
            if (!(a in this._animations)) {
                console.warn("Non-existent animation.\n", "DragonBones name: " + this._armature.armatureData.parent.name, "Armature name: " + this._armature.name, "Animation name: " + a);
                return null
            }
            var r = this._animations[a];
            if (e.fadeOutMode === 5) {
                for (var i = 0, n = this._animationStates; i < n.length; i++) {
                    var s = n[i];
                    if (s._animationData === r) {
                        return s
                    }
                }
            }
            if (this._animationStates.length === 0) {
                e.fadeInTime = 0
            } else if (e.fadeInTime < 0) {
                e.fadeInTime = r.fadeInTime
            }
            if (e.fadeOutTime < 0) {
                e.fadeOutTime = e.fadeInTime
            }
            if (e.timeScale <= -100) {
                e.timeScale = 1 / r.scale
            }
            if (r.frameCount > 1) {
                if (e.position < 0) {
                    e.position %= r.duration;
                    e.position = r.duration - e.position
                } else if (e.position === r.duration) {
                    e.position -= 1e-6
                } else if (e.position > r.duration) {
                    e.position %= r.duration
                }
                if (e.duration > 0 && e.position + e.duration > r.duration) {
                    e.duration = r.duration - e.position
                }
                if (e.playTimes < 0) {
                    e.playTimes = r.playTimes
                }
            } else {
                e.playTimes = 1;
                e.position = 0;
                if (e.duration > 0) {
                    e.duration = 0
                }
            }
            if (e.duration === 0) {
                e.duration = -1
            }
            this._fadeOut(e);
            var o = t.BaseObject.borrowObject(t.AnimationState);
            o.init(this._armature, r, e);
            this._animationDirty = true;
            this._armature._cacheFrameIndex = -1;
            if (this._animationStates.length > 0) {
                var l = false;
                for (var h = 0, f = this._animationStates.length; h < f; ++h) {
                    if (o.layer > this._animationStates[h].layer) {
                        l = true;
                        this._animationStates.splice(h, 0, o);
                        break
                    } else if (h !== f - 1 && o.layer > this._animationStates[h + 1].layer) {
                        l = true;
                        this._animationStates.splice(h + 1, 0, o);
                        break
                    }
                }
                if (!l) {
                    this._animationStates.push(o)
                }
            } else {
                this._animationStates.push(o)
            }
            for (var u = 0, _ = this._armature.getSlots(); u < _.length; u++) {
                var c = _[u];
                var p = c.childArmature;
                if (p !== null && p.inheritAnimation && p.animation.hasAnimation(a) && p.animation.getState(a) === null) {
                    p.animation.fadeIn(a)
                }
            }
            var m = false;
            for (var d in r.animationTimelines) {
                if (!this._lockUpdate) {
                    m = true;
                    this._lockUpdate = true
                }
                var v = this.fadeIn(d, e.fadeInTime, 1, o.layer, null, 0);
                if (v !== null) {
                    v.resetToPose = false;
                    v._parent = o;
                    v.stop()
                }
            }
            if (m) {
                this._lockUpdate = false
            }
            if (!this._lockUpdate) {
                if (e.fadeInTime <= 0) {
                    this._armature.advanceTime(0)
                }
                this._lastAnimationState = o
            }
            return o
        };
        a.prototype.play = function(t, e) {
            if (t === void 0) {
                t = null
            }
            if (e === void 0) {
                e = -1
            }
            this._animationConfig.clear();
            this._animationConfig.resetToPose = true;
            this._animationConfig.playTimes = e;
            this._animationConfig.fadeInTime = 0;
            this._animationConfig.animation = t !== null ? t : "";
            if (t !== null && t.length > 0) {
                this.playConfig(this._animationConfig)
            } else if (this._lastAnimationState === null) {
                var a = this._armature.armatureData.defaultAnimation;
                if (a !== null) {
                    this._animationConfig.animation = a.name;
                    this.playConfig(this._animationConfig)
                }
            } else if (!this._lastAnimationState.isPlaying && !this._lastAnimationState.isCompleted) {
                this._lastAnimationState.play()
            } else {
                this._animationConfig.animation = this._lastAnimationState.name;
                this.playConfig(this._animationConfig)
            }
            return this._lastAnimationState
        };
        a.prototype.fadeIn = function(t, e, a, r, i, n) {
            if (e === void 0) {
                e = -1
            }
            if (a === void 0) {
                a = -1
            }
            if (r === void 0) {
                r = 0
            }
            if (i === void 0) {
                i = null
            }
            if (n === void 0) {
                n = 3
            }
            this._animationConfig.clear();
            this._animationConfig.fadeOutMode = n;
            this._animationConfig.playTimes = a;
            this._animationConfig.layer = r;
            this._animationConfig.fadeInTime = e;
            this._animationConfig.animation = t;
            this._animationConfig.group = i !== null ? i : "";
            return this.playConfig(this._animationConfig)
        };
        a.prototype.gotoAndPlayByTime = function(t, e, a) {
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = -1
            }
            this._animationConfig.clear();
            this._animationConfig.resetToPose = true;
            this._animationConfig.playTimes = a;
            this._animationConfig.position = e;
            this._animationConfig.fadeInTime = 0;
            this._animationConfig.animation = t;
            return this.playConfig(this._animationConfig)
        };
        a.prototype.gotoAndPlayByFrame = function(t, e, a) {
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = -1
            }
            this._animationConfig.clear();
            this._animationConfig.resetToPose = true;
            this._animationConfig.playTimes = a;
            this._animationConfig.fadeInTime = 0;
            this._animationConfig.animation = t;
            var r = t in this._animations ? this._animations[t] : null;
            if (r !== null) {
                this._animationConfig.position = r.duration * e / r.frameCount
            }
            return this.playConfig(this._animationConfig)
        };
        a.prototype.gotoAndPlayByProgress = function(t, e, a) {
            if (e === void 0) {
                e = 0
            }
            if (a === void 0) {
                a = -1
            }
            this._animationConfig.clear();
            this._animationConfig.resetToPose = true;
            this._animationConfig.playTimes = a;
            this._animationConfig.fadeInTime = 0;
            this._animationConfig.animation = t;
            var r = t in this._animations ? this._animations[t] : null;
            if (r !== null) {
                this._animationConfig.position = r.duration * (e > 0 ? e : 0)
            }
            return this.playConfig(this._animationConfig)
        };
        a.prototype.gotoAndStopByTime = function(t, e) {
            if (e === void 0) {
                e = 0
            }
            var a = this.gotoAndPlayByTime(t, e, 1);
            if (a !== null) {
                a.stop()
            }
            return a
        };
        a.prototype.gotoAndStopByFrame = function(t, e) {
            if (e === void 0) {
                e = 0
            }
            var a = this.gotoAndPlayByFrame(t, e, 1);
            if (a !== null) {
                a.stop()
            }
            return a
        };
        a.prototype.gotoAndStopByProgress = function(t, e) {
            if (e === void 0) {
                e = 0
            }
            var a = this.gotoAndPlayByProgress(t, e, 1);
            if (a !== null) {
                a.stop()
            }
            return a
        };
        a.prototype.getState = function(t) {
            var e = this._animationStates.length;
            while (e--) {
                var a = this._animationStates[e];
                if (a.name === t) {
                    return a
                }
            }
            return null
        };
        a.prototype.hasAnimation = function(t) {
            return t in this._animations
        };
        a.prototype.getStates = function() {
            return this._animationStates
        };
        Object.defineProperty(a.prototype, "isPlaying", {
            get: function() {
                for (var t = 0, e = this._animationStates; t < e.length; t++) {
                    var a = e[t];
                    if (a.isPlaying) {
                        return true
                    }
                }
                return false
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "isCompleted", {
            get: function() {
                for (var t = 0, e = this._animationStates; t < e.length; t++) {
                    var a = e[t];
                    if (!a.isCompleted) {
                        return false
                    }
                }
                return this._animationStates.length > 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "lastAnimationName", {
            get: function() {
                return this._lastAnimationState !== null ? this._lastAnimationState.name : ""
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animationNames", {
            get: function() {
                return this._animationNames
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animations", {
            get: function() {
                return this._animations
            },
            set: function(t) {
                if (this._animations === t) {
                    return
                }
                this._animationNames.length = 0;
                for (var e in this._animations) {
                    delete this._animations[e]
                }
                for (var e in t) {
                    this._animationNames.push(e);
                    this._animations[e] = t[e]
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animationConfig", {
            get: function() {
                this._animationConfig.clear();
                return this._animationConfig
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "lastAnimationState", {
            get: function() {
                return this._lastAnimationState
            },
            enumerable: true,
            configurable: true
        });
        a.prototype.gotoAndPlay = function(t, e, a, r, i, n, s, o, l) {
            if (e === void 0) {
                e = -1
            }
            if (a === void 0) {
                a = -1
            }
            if (r === void 0) {
                r = -1
            }
            if (i === void 0) {
                i = 0
            }
            if (n === void 0) {
                n = null
            }
            if (s === void 0) {
                s = 3
            }
            if (o === void 0) {
                o = true
            }
            if (l === void 0) {
                l = true
            }
            console.warn("Deprecated.");
            o;
            l;
            this._animationConfig.clear();
            this._animationConfig.resetToPose = true;
            this._animationConfig.fadeOutMode = s;
            this._animationConfig.playTimes = r;
            this._animationConfig.layer = i;
            this._animationConfig.fadeInTime = e;
            this._animationConfig.animation = t;
            this._animationConfig.group = n !== null ? n : "";
            var h = this._animations[t];
            if (h && a > 0) {
                this._animationConfig.timeScale = h.duration / a
            }
            return this.playConfig(this._animationConfig)
        };
        a.prototype.gotoAndStop = function(t, e) {
            if (e === void 0) {
                e = 0
            }
            console.warn("Deprecated.");
            return this.gotoAndStopByTime(t, e)
        };
        Object.defineProperty(a.prototype, "animationList", {
            get: function() {
                console.warn("Deprecated.");
                return this._animationNames
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animationDataList", {
            get: function() {
                console.warn("Deprecated.");
                var t = [];
                for (var e = 0, a = this._animationNames.length; e < a; ++e) {
                    t.push(this._animations[this._animationNames[e]])
                }
                return t
            },
            enumerable: true,
            configurable: true
        });
        return a
    }(t.BaseObject);
    t.Animation = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(i, e);

        function i() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._blendState = new r;
            t._boneMask = [];
            t._boneTimelines = [];
            t._surfaceTimelines = [];
            t._slotTimelines = [];
            t._constraintTimelines = [];
            t._animationTimelines = [];
            t._poseTimelines = [];
            t._bonePoses = {};
            t._actionTimeline = null;
            t._zOrderTimeline = null;
            t._parent = null;
            return t
        }
        i.toString = function() {
            return "[class dragonBones.AnimationState]"
        };
        i.prototype._onClear = function() {
            for (var t = 0, e = this._boneTimelines; t < e.length; t++) {
                var a = e[t];
                a.returnToPool()
            }
            for (var r = 0, i = this._surfaceTimelines; r < i.length; r++) {
                var a = i[r];
                a.returnToPool()
            }
            for (var n = 0, s = this._slotTimelines; n < s.length; n++) {
                var a = s[n];
                a.returnToPool()
            }
            for (var o = 0, l = this._constraintTimelines; o < l.length; o++) {
                var a = l[o];
                a.returnToPool()
            }
            for (var h = 0, f = this._animationTimelines; h < f.length; h++) {
                var a = f[h];
                a.returnToPool()
            }
            for (var u in this._bonePoses) {
                this._bonePoses[u].returnToPool();
                delete this._bonePoses[u]
            }
            if (this._actionTimeline !== null) {
                this._actionTimeline.returnToPool()
            }
            if (this._zOrderTimeline !== null) {
                this._zOrderTimeline.returnToPool()
            }
            this.actionEnabled = false;
            this.additiveBlending = false;
            this.displayControl = false;
            this.resetToPose = false;
            this.playTimes = 1;
            this.layer = 0;
            this.timeScale = 1;
            this.weight = 1;
            this.autoFadeOutTime = 0;
            this.fadeTotalTime = 0;
            this.name = "";
            this.group = "";
            this._timelineDirty = 2;
            this._playheadState = 0;
            this._fadeState = -1;
            this._subFadeState = -1;
            this._position = 0;
            this._duration = 0;
            this._fadeTime = 0;
            this._time = 0;
            this._fadeProgress = 0;
            this._weightResult = 0;
            this._blendState.clear();
            this._boneMask.length = 0;
            this._boneTimelines.length = 0;
            this._surfaceTimelines.length = 0;
            this._slotTimelines.length = 0;
            this._constraintTimelines.length = 0;
            this._animationTimelines.length = 0;
            this._poseTimelines.length = 0;
            this._animationData = null;
            this._armature = null;
            this._actionTimeline = null;
            this._zOrderTimeline = null;
            this._parent = null
        };
        i.prototype._updateTimelines = function() {
            {
                for (var e = 0, a = this._armature._constraints; e < a.length; e++) {
                    var r = a[e];
                    var i = this._animationData.getConstraintTimelines(r.name);
                    if (i !== null) {
                        for (var n = 0, s = i; n < s.length; n++) {
                            var o = s[n];
                            switch (o.type) {
                                case 30:
                                    {
                                        var l = t.BaseObject.borrowObject(t.IKConstraintTimelineState);l.constraint = r;l.init(this._armature, this, o);this._constraintTimelines.push(l);
                                        break
                                    }
                                default:
                                    break
                            }
                        }
                    } else if (this.resetToPose) {
                        var l = t.BaseObject.borrowObject(t.IKConstraintTimelineState);
                        l.constraint = r;
                        l.init(this._armature, this, null);
                        this._constraintTimelines.push(l);
                        this._poseTimelines.push(l)
                    }
                }
            } {
                for (var h = 0, f = this._armature.animation.getStates(); h < f.length; h++) {
                    var u = f[h];
                    if (u._parent !== this) {
                        continue
                    }
                    var i = this._animationData.getAnimationTimelines(u.name);
                    if (i === null) {
                        continue
                    }
                    for (var _ = 0, c = i; _ < c.length; _++) {
                        var o = c[_];
                        switch (o.type) {
                            case 40:
                                {
                                    var l = t.BaseObject.borrowObject(t.AnimationTimelineState);l.animationState = u;l.init(this._armature, this, o);this._animationTimelines.push(l);
                                    break
                                }
                            default:
                                break
                        }
                    }
                }
            }
        };
        i.prototype._updateBoneAndSlotTimelines = function() {
            {
                var e = {};
                for (var r = 0, i = this._boneTimelines; r < i.length; r++) {
                    var n = i[r];
                    var s = n.bone.name;
                    if (!(s in e)) {
                        e[s] = []
                    }
                    e[s].push(n)
                }
                for (var o = 0, l = this._armature.getBones(); o < l.length; o++) {
                    var h = l[o];
                    var s = h.name;
                    if (!this.containsBoneMask(s)) {
                        continue
                    }
                    if (s in e) {
                        delete e[s]
                    } else if (h._boneData.type === 0) {
                        var f = this._animationData.getBoneTimelines(s);
                        var u = s in this._bonePoses ? this._bonePoses[s] : this._bonePoses[s] = t.BaseObject.borrowObject(a);
                        if (f !== null) {
                            for (var _ = 0, c = f; _ < c.length; _++) {
                                var p = c[_];
                                switch (p.type) {
                                    case 10:
                                        {
                                            var n = t.BaseObject.borrowObject(t.BoneAllTimelineState);n.bone = h;n.bonePose = u;n.init(this._armature, this, p);this._boneTimelines.push(n);
                                            break
                                        }
                                    case 11:
                                        {
                                            var n = t.BaseObject.borrowObject(t.BoneTranslateTimelineState);n.bone = h;n.bonePose = u;n.init(this._armature, this, p);this._boneTimelines.push(n);
                                            break
                                        }
                                    case 12:
                                        {
                                            var n = t.BaseObject.borrowObject(t.BoneRotateTimelineState);n.bone = h;n.bonePose = u;n.init(this._armature, this, p);this._boneTimelines.push(n);
                                            break
                                        }
                                    case 13:
                                        {
                                            var n = t.BaseObject.borrowObject(t.BoneScaleTimelineState);n.bone = h;n.bonePose = u;n.init(this._armature, this, p);this._boneTimelines.push(n);
                                            break
                                        }
                                    default:
                                        break
                                }
                            }
                        } else if (this.resetToPose) {
                            var n = t.BaseObject.borrowObject(t.BoneAllTimelineState);
                            n.bone = h;
                            n.bonePose = u;
                            n.init(this._armature, this, null);
                            this._boneTimelines.push(n);
                            this._poseTimelines.push(n)
                        }
                    } else if (h._boneData.type === 1) {
                        var f = this._animationData.getSurfaceTimelines(s);
                        if (f !== null) {
                            for (var m = 0, d = f; m < d.length; m++) {
                                var p = d[m];
                                switch (p.type) {
                                    case 50:
                                        {
                                            var n = t.BaseObject.borrowObject(t.SurfaceTimelineState);n.surface = h;n.init(this._armature, this, p);this._surfaceTimelines.push(n);
                                            break
                                        }
                                    default:
                                        break
                                }
                            }
                        } else if (this.resetToPose) {
                            var n = t.BaseObject.borrowObject(t.SurfaceTimelineState);
                            n.surface = h;
                            n.init(this._armature, this, null);
                            this._surfaceTimelines.push(n);
                            this._poseTimelines.push(n)
                        }
                    }
                }
                for (var v in e) {
                    for (var y = 0, g = e[v]; y < g.length; y++) {
                        var n = g[y];
                        this._boneTimelines.splice(this._boneTimelines.indexOf(n), 1);
                        n.returnToPool()
                    }
                }
            } {
                var b = {};
                var D = [];
                for (var T = 0, A = this._slotTimelines; T < A.length; T++) {
                    var n = A[T];
                    var s = n.slot.name;
                    if (!(s in b)) {
                        b[s] = []
                    }
                    b[s].push(n)
                }
                for (var x = 0, P = this._armature.getSlots(); x < P.length; x++) {
                    var O = P[x];
                    var S = O.parent.name;
                    if (!this.containsBoneMask(S)) {
                        continue
                    }
                    var s = O.name;
                    var f = this._animationData.getSlotTimelines(s);
                    if (s in b) {
                        delete b[s]
                    } else {
                        var E = false;
                        var M = false;
                        D.length = 0;
                        if (f !== null) {
                            for (var B = 0, C = f; B < C.length; B++) {
                                var p = C[B];
                                switch (p.type) {
                                    case 20:
                                        {
                                            var n = t.BaseObject.borrowObject(t.SlotDislayTimelineState);n.slot = O;n.init(this._armature, this, p);this._slotTimelines.push(n);E = true;
                                            break
                                        }
                                    case 21:
                                        {
                                            var n = t.BaseObject.borrowObject(t.SlotColorTimelineState);n.slot = O;n.init(this._armature, this, p);this._slotTimelines.push(n);M = true;
                                            break
                                        }
                                    case 22:
                                        {
                                            var n = t.BaseObject.borrowObject(t.DeformTimelineState);n.slot = O;n.init(this._armature, this, p);this._slotTimelines.push(n);D.push(n.vertexOffset);
                                            break
                                        }
                                    default:
                                        break
                                }
                            }
                        }
                        if (this.resetToPose) {
                            if (!E) {
                                var n = t.BaseObject.borrowObject(t.SlotDislayTimelineState);
                                n.slot = O;
                                n.init(this._armature, this, null);
                                this._slotTimelines.push(n);
                                this._poseTimelines.push(n)
                            }
                            if (!M) {
                                var n = t.BaseObject.borrowObject(t.SlotColorTimelineState);
                                n.slot = O;
                                n.init(this._armature, this, null);
                                this._slotTimelines.push(n);
                                this._poseTimelines.push(n)
                            }
                            if (O.rawDisplayDatas !== null) {
                                for (var w = 0, I = O.rawDisplayDatas; w < I.length; w++) {
                                    var F = I[w];
                                    if (F !== null && F.type === 2) {
                                        var N = F.vertices.offset;
                                        if (D.indexOf(N) < 0) {
                                            var n = t.BaseObject.borrowObject(t.DeformTimelineState);
                                            n.vertexOffset = N;
                                            n.slot = O;
                                            n.init(this._armature, this, null);
                                            this._slotTimelines.push(n);
                                            this._poseTimelines.push(n)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (var v in b) {
                    for (var R = 0, k = b[v]; R < k.length; R++) {
                        var n = k[R];
                        this._slotTimelines.splice(this._slotTimelines.indexOf(n), 1);
                        n.returnToPool()
                    }
                }
            }
        };
        i.prototype._advanceFadeTime = function(e) {
            var a = this._fadeState > 0;
            if (this._subFadeState < 0) {
                this._subFadeState = 0;
                var r = a ? t.EventObject.FADE_OUT : t.EventObject.FADE_IN;
                if (this._armature.eventDispatcher.hasDBEventListener(r)) {
                    var i = t.BaseObject.borrowObject(t.EventObject);
                    i.type = r;
                    i.armature = this._armature;
                    i.animationState = this;
                    this._armature._dragonBones.bufferEvent(i)
                }
            }
            if (e < 0) {
                e = -e
            }
            this._fadeTime += e;
            if (this._fadeTime >= this.fadeTotalTime) {
                this._subFadeState = 1;
                this._fadeProgress = a ? 0 : 1
            } else if (this._fadeTime > 0) {
                this._fadeProgress = a ? 1 - this._fadeTime / this.fadeTotalTime : this._fadeTime / this.fadeTotalTime
            } else {
                this._fadeProgress = a ? 1 : 0
            }
            if (this._subFadeState > 0) {
                if (!a) {
                    this._playheadState |= 1;
                    this._fadeState = 0
                }
                var r = a ? t.EventObject.FADE_OUT_COMPLETE : t.EventObject.FADE_IN_COMPLETE;
                if (this._armature.eventDispatcher.hasDBEventListener(r)) {
                    var i = t.BaseObject.borrowObject(t.EventObject);
                    i.type = r;
                    i.armature = this._armature;
                    i.animationState = this;
                    this._armature._dragonBones.bufferEvent(i)
                }
            }
        };
        i.prototype.init = function(e, a, r) {
            if (this._armature !== null) {
                return
            }
            this._armature = e;
            this._animationData = a;
            this.resetToPose = r.resetToPose;
            this.additiveBlending = r.additiveBlending;
            this.displayControl = r.displayControl;
            this.actionEnabled = r.actionEnabled;
            this.layer = r.layer;
            this.playTimes = r.playTimes;
            this.timeScale = r.timeScale;
            this.fadeTotalTime = r.fadeInTime;
            this.autoFadeOutTime = r.autoFadeOutTime;
            this.weight = r.weight;
            this.name = r.name.length > 0 ? r.name : r.animation;
            this.group = r.group;
            if (r.pauseFadeIn) {
                this._playheadState = 2
            } else {
                this._playheadState = 3
            }
            if (r.duration < 0) {
                this._position = 0;
                this._duration = this._animationData.duration;
                if (r.position !== 0) {
                    if (this.timeScale >= 0) {
                        this._time = r.position
                    } else {
                        this._time = r.position - this._duration
                    }
                } else {
                    this._time = 0
                }
            } else {
                this._position = r.position;
                this._duration = r.duration;
                this._time = 0
            }
            if (this.timeScale < 0 && this._time === 0) {
                this._time = -1e-6
            }
            if (this.fadeTotalTime <= 0) {
                this._fadeProgress = .999999
            }
            if (r.boneMask.length > 0) {
                this._boneMask.length = r.boneMask.length;
                for (var i = 0, n = this._boneMask.length; i < n; ++i) {
                    this._boneMask[i] = r.boneMask[i]
                }
            }
            this._actionTimeline = t.BaseObject.borrowObject(t.ActionTimelineState);
            this._actionTimeline.init(this._armature, this, this._animationData.actionTimeline);
            this._actionTimeline.currentTime = this._time;
            if (this._actionTimeline.currentTime < 0) {
                this._actionTimeline.currentTime = this._duration - this._actionTimeline.currentTime
            }
            if (this._animationData.zOrderTimeline !== null) {
                this._zOrderTimeline = t.BaseObject.borrowObject(t.ZOrderTimelineState);
                this._zOrderTimeline.init(this._armature, this, this._animationData.zOrderTimeline)
            }
        };
        i.prototype.advanceTime = function(e, a) {
            this._blendState.dirty = false;
            if (this._fadeState !== 0 || this._subFadeState !== 0) {
                this._advanceFadeTime(e)
            }
            if (this._playheadState === 3) {
                if (this.timeScale !== 1) {
                    e *= this.timeScale
                }
                this._time += e
            }
            if (this._timelineDirty !== 0) {
                if (this._timelineDirty === 2) {
                    this._updateTimelines()
                }
                this._timelineDirty = 0;
                this._updateBoneAndSlotTimelines()
            }
            if (this.weight === 0) {
                return
            }
            var r = this._fadeState === 0 && a > 0;
            var i = true;
            var n = true;
            var s = this._time;
            this._weightResult = this.weight * this._fadeProgress;
            if (this._parent !== null) {
                this._weightResult *= this._parent._weightResult / this._parent._fadeProgress
            }
            if (this._actionTimeline.playState <= 0) {
                this._actionTimeline.update(s)
            }
            if (r) {
                var o = a * 2;
                this._actionTimeline.currentTime = Math.floor(this._actionTimeline.currentTime * o) / o
            }
            if (this._zOrderTimeline !== null && this._zOrderTimeline.playState <= 0) {
                this._zOrderTimeline.update(s)
            }
            if (r) {
                var l = Math.floor(this._actionTimeline.currentTime * a);
                if (this._armature._cacheFrameIndex === l) {
                    i = false;
                    n = false
                } else {
                    this._armature._cacheFrameIndex = l;
                    if (this._animationData.cachedFrames[l]) {
                        n = false
                    } else {
                        this._animationData.cachedFrames[l] = true
                    }
                }
            }
            if (i) {
                if (n) {
                    for (var h = 0, f = this._boneTimelines.length; h < f; ++h) {
                        var u = this._boneTimelines[h];
                        if (u.playState <= 0) {
                            u.update(s)
                        }
                        if (h === f - 1 || u.bone !== this._boneTimelines[h + 1].bone) {
                            var _ = u.bone._blendState.update(this._weightResult, this.layer);
                            if (_ !== 0) {
                                u.blend(_)
                            }
                        }
                    }
                }
                for (var h = 0, f = this._surfaceTimelines.length; h < f; ++h) {
                    var u = this._surfaceTimelines[h];
                    var _ = u.surface._blendState.update(this._weightResult, this.layer);
                    if (u.playState <= 0) {
                        u.update(s)
                    }
                    if (_ !== 0) {
                        u.blend(_)
                    }
                }
                if (this.displayControl) {
                    for (var h = 0, f = this._slotTimelines.length; h < f; ++h) {
                        var u = this._slotTimelines[h];
                        var c = u.slot.displayController;
                        if (c === null || c === this.name || c === this.group) {
                            if (u.playState <= 0) {
                                u.update(s)
                            }
                        }
                    }
                }
                for (var h = 0, f = this._constraintTimelines.length; h < f; ++h) {
                    var u = this._constraintTimelines[h];
                    if (u.playState <= 0) {
                        u.update(s)
                    }
                }
                for (var h = 0, f = this._animationTimelines.length; h < f; ++h) {
                    var u = this._animationTimelines[h];
                    var _ = u.animationState._blendState.update(this._weightResult, this.layer);
                    if (u.playState <= 0) {
                        u.update(s)
                    }
                    if (_ !== 0) {
                        u.blend(_)
                    }
                }
            }
            if (this._fadeState === 0) {
                if (this._subFadeState > 0) {
                    this._subFadeState = 0;
                    if (this._poseTimelines.length > 0) {
                        for (var p = 0, m = this._poseTimelines; p < m.length; p++) {
                            var u = m[p];
                            if (u instanceof t.BoneTimelineState) {
                                this._boneTimelines.splice(this._boneTimelines.indexOf(u), 1)
                            } else if (u instanceof t.SurfaceTimelineState) {
                                this._surfaceTimelines.splice(this._surfaceTimelines.indexOf(u), 1)
                            } else if (u instanceof t.SlotTimelineState) {
                                this._slotTimelines.splice(this._slotTimelines.indexOf(u), 1)
                            } else if (u instanceof t.ConstraintTimelineState) {
                                this._constraintTimelines.splice(this._constraintTimelines.indexOf(u), 1)
                            }
                            u.returnToPool()
                        }
                        this._poseTimelines.length = 0
                    }
                }
                if (this._actionTimeline.playState > 0) {
                    if (this.autoFadeOutTime >= 0) {
                        this.fadeOut(this.autoFadeOutTime)
                    }
                }
            }
        };
        i.prototype.play = function() {
            this._playheadState = 3
        };
        i.prototype.stop = function() {
            this._playheadState &= 1
        };
        i.prototype.fadeOut = function(t, e) {
            if (e === void 0) {
                e = true
            }
            if (t < 0) {
                t = 0
            }
            if (e) {
                this._playheadState &= 2
            }
            if (this._fadeState > 0) {
                if (t > this.fadeTotalTime - this._fadeTime) {
                    return
                }
            } else {
                this._fadeState = 1;
                this._subFadeState = -1;
                if (t <= 0 || this._fadeProgress <= 0) {
                    this._fadeProgress = 1e-6
                }
                for (var a = 0, r = this._boneTimelines; a < r.length; a++) {
                    var i = r[a];
                    i.fadeOut()
                }
                for (var n = 0, s = this._surfaceTimelines; n < s.length; n++) {
                    var i = s[n];
                    i.fadeOut()
                }
                for (var o = 0, l = this._slotTimelines; o < l.length; o++) {
                    var i = l[o];
                    i.fadeOut()
                }
                for (var h = 0, f = this._constraintTimelines; h < f.length; h++) {
                    var i = f[h];
                    i.fadeOut()
                }
                for (var u = 0, _ = this._animationTimelines; u < _.length; u++) {
                    var i = _[u];
                    i.animationState.fadeOut(t, e);
                    i.fadeOut()
                }
            }
            this.displayControl = false;
            this.fadeTotalTime = this._fadeProgress > 1e-6 ? t / this._fadeProgress : 0;
            this._fadeTime = this.fadeTotalTime * (1 - this._fadeProgress)
        };
        i.prototype.containsBoneMask = function(t) {
            return this._boneMask.length === 0 || this._boneMask.indexOf(t) >= 0
        };
        i.prototype.addBoneMask = function(t, e) {
            if (e === void 0) {
                e = true
            }
            var a = this._armature.getBone(t);
            if (a === null) {
                return
            }
            if (this._boneMask.indexOf(t) < 0) {
                this._boneMask.push(t)
            }
            if (e) {
                for (var r = 0, i = this._armature.getBones(); r < i.length; r++) {
                    var n = i[r];
                    if (this._boneMask.indexOf(n.name) < 0 && a.contains(n)) {
                        this._boneMask.push(n.name)
                    }
                }
            }
            this._timelineDirty = 1
        };
        i.prototype.removeBoneMask = function(t, e) {
            if (e === void 0) {
                e = true
            }
            var a = this._boneMask.indexOf(t);
            if (a >= 0) {
                this._boneMask.splice(a, 1)
            }
            if (e) {
                var r = this._armature.getBone(t);
                if (r !== null) {
                    var i = this._armature.getBones();
                    if (this._boneMask.length > 0) {
                        for (var n = 0, s = i; n < s.length; n++) {
                            var o = s[n];
                            var l = this._boneMask.indexOf(o.name);
                            if (l >= 0 && r.contains(o)) {
                                this._boneMask.splice(l, 1)
                            }
                        }
                    } else {
                        for (var h = 0, f = i; h < f.length; h++) {
                            var o = f[h];
                            if (o === r) {
                                continue
                            }
                            if (!r.contains(o)) {
                                this._boneMask.push(o.name)
                            }
                        }
                    }
                }
            }
            this._timelineDirty = 1
        };
        i.prototype.removeAllBoneMask = function() {
            this._boneMask.length = 0;
            this._timelineDirty = 1
        };
        Object.defineProperty(i.prototype, "isFadeIn", {
            get: function() {
                return this._fadeState < 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "isFadeOut", {
            get: function() {
                return this._fadeState > 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "isFadeComplete", {
            get: function() {
                return this._fadeState === 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "isPlaying", {
            get: function() {
                return (this._playheadState & 2) !== 0 && this._actionTimeline.playState <= 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "isCompleted", {
            get: function() {
                return this._actionTimeline.playState > 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "currentPlayTimes", {
            get: function() {
                return this._actionTimeline.currentPlayTimes
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "totalTime", {
            get: function() {
                return this._duration
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "currentTime", {
            get: function() {
                return this._actionTimeline.currentTime
            },
            set: function(t) {
                var e = this._actionTimeline.currentPlayTimes - (this._actionTimeline.playState > 0 ? 1 : 0);
                if (t < 0 || this._duration < t) {
                    t = t % this._duration + e * this._duration;
                    if (t < 0) {
                        t += this._duration
                    }
                }
                if (this.playTimes > 0 && e === this.playTimes - 1 && t === this._duration) {
                    t = this._duration - 1e-6
                }
                if (this._time === t) {
                    return
                }
                this._time = t;
                this._actionTimeline.setCurrentTime(this._time);
                if (this._zOrderTimeline !== null) {
                    this._zOrderTimeline.playState = -1
                }
                for (var a = 0, r = this._boneTimelines; a < r.length; a++) {
                    var i = r[a];
                    i.playState = -1
                }
                for (var n = 0, s = this._slotTimelines; n < s.length; n++) {
                    var i = s[n];
                    i.playState = -1
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "animationData", {
            get: function() {
                return this._animationData
            },
            enumerable: true,
            configurable: true
        });
        return i
    }(t.BaseObject);
    t.AnimationState = e;
    var a = function(e) {
        __extends(a, e);

        function a() {
            var a = e !== null && e.apply(this, arguments) || this;
            a.current = new t.Transform;
            a.delta = new t.Transform;
            a.result = new t.Transform;
            return a
        }
        a.toString = function() {
            return "[class dragonBones.BonePose]"
        };
        a.prototype._onClear = function() {
            this.current.identity();
            this.delta.identity();
            this.result.identity()
        };
        return a
    }(t.BaseObject);
    t.BonePose = a;
    var r = function() {
        function t() {}
        t.prototype.update = function(t, e) {
            if (this.dirty) {
                if (this.leftWeight > 0) {
                    if (this.layer !== e) {
                        if (this.layerWeight >= this.leftWeight) {
                            this.leftWeight = 0;
                            return 0
                        } else {
                            this.layer = e;
                            this.leftWeight -= this.layerWeight;
                            this.layerWeight = 0
                        }
                    }
                } else {
                    return 0
                }
                t *= this.leftWeight;
                this.layerWeight += t;
                this.blendWeight = t;
                return 2
            }
            this.dirty = true;
            this.layer = e;
            this.layerWeight = t;
            this.leftWeight = 1;
            this.blendWeight = t;
            return 1
        };
        t.prototype.clear = function() {
            this.dirty = false;
            this.layer = 0;
            this.leftWeight = 0;
            this.layerWeight = 0;
            this.blendWeight = 0
        };
        return t
    }();
    t.BlendState = r
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            this.playState = -1;
            this.currentPlayTimes = -1;
            this.currentTime = -1;
            this._tweenState = 0;
            this._frameRate = 0;
            this._frameValueOffset = 0;
            this._frameCount = 0;
            this._frameOffset = 0;
            this._frameIndex = -1;
            this._frameRateR = 0;
            this._position = 0;
            this._duration = 0;
            this._timeScale = 1;
            this._timeOffset = 0;
            this._dragonBonesData = null;
            this._animationData = null;
            this._timelineData = null;
            this._armature = null;
            this._animationState = null;
            this._actionTimeline = null;
            this._frameArray = null;
            this._frameIntArray = null;
            this._frameFloatArray = null;
            this._timelineArray = null;
            this._frameIndices = null
        };
        e.prototype._setCurrentTime = function(t) {
            var e = this.playState;
            var a = this.currentPlayTimes;
            var r = this.currentTime;
            if (this._actionTimeline !== null && this._frameCount <= 1) {
                this.playState = this._actionTimeline.playState >= 0 ? 1 : -1;
                this.currentPlayTimes = 1;
                this.currentTime = this._actionTimeline.currentTime
            } else if (this._actionTimeline === null || this._timeScale !== 1 || this._timeOffset !== 0) {
                var i = this._animationState.playTimes;
                var n = i * this._duration;
                t *= this._timeScale;
                if (this._timeOffset !== 0) {
                    t += this._timeOffset * this._animationData.duration
                }
                if (i > 0 && (t >= n || t <= -n)) {
                    if (this.playState <= 0 && this._animationState._playheadState === 3) {
                        this.playState = 1
                    }
                    this.currentPlayTimes = i;
                    if (t < 0) {
                        this.currentTime = 0
                    } else {
                        this.currentTime = this._duration + 1e-6
                    }
                } else {
                    if (this.playState !== 0 && this._animationState._playheadState === 3) {
                        this.playState = 0
                    }
                    if (t < 0) {
                        t = -t;
                        this.currentPlayTimes = Math.floor(t / this._duration);
                        this.currentTime = this._duration - t % this._duration
                    } else {
                        this.currentPlayTimes = Math.floor(t / this._duration);
                        this.currentTime = t % this._duration
                    }
                }
                this.currentTime += this._position
            } else {
                this.playState = this._actionTimeline.playState;
                this.currentPlayTimes = this._actionTimeline.currentPlayTimes;
                this.currentTime = this._actionTimeline.currentTime
            }
            if (this.currentPlayTimes === a && this.currentTime === r) {
                return false
            }
            if (e < 0 && this.playState !== e || this.playState <= 0 && this.currentPlayTimes !== a) {
                this._frameIndex = -1
            }
            return true
        };
        e.prototype.init = function(t, e, a) {
            this._armature = t;
            this._animationState = e;
            this._timelineData = a;
            this._actionTimeline = this._animationState._actionTimeline;
            if (this === this._actionTimeline) {
                this._actionTimeline = null
            }
            this._animationData = this._animationState._animationData;
            this._frameRate = this._animationData.parent.frameRate;
            this._frameRateR = 1 / this._frameRate;
            this._position = this._animationState._position;
            this._duration = this._animationState._duration;
            this._dragonBonesData = this._animationData.parent.parent;
            if (this._timelineData !== null) {
                this._frameIntArray = this._dragonBonesData.frameIntArray;
                this._frameFloatArray = this._dragonBonesData.frameFloatArray;
                this._frameArray = this._dragonBonesData.frameArray;
                this._timelineArray = this._dragonBonesData.timelineArray;
                this._frameIndices = this._dragonBonesData.frameIndices;
                this._frameCount = this._timelineArray[this._timelineData.offset + 2];
                this._frameValueOffset = this._timelineArray[this._timelineData.offset + 4];
                this._timeScale = 100 / this._timelineArray[this._timelineData.offset + 0];
                this._timeOffset = this._timelineArray[this._timelineData.offset + 1] * .01
            }
        };
        e.prototype.fadeOut = function() {};
        e.prototype.update = function(t) {
            if (this._setCurrentTime(t)) {
                if (this._frameCount > 1) {
                    var e = Math.floor(this.currentTime * this._frameRate);
                    var a = this._frameIndices[this._timelineData.frameIndicesOffset + e];
                    if (this._frameIndex !== a) {
                        this._frameIndex = a;
                        this._frameOffset = this._animationData.frameOffset + this._timelineArray[this._timelineData.offset + 5 + this._frameIndex];
                        this._onArriveAtFrame()
                    }
                } else if (this._frameIndex < 0) {
                    this._frameIndex = 0;
                    if (this._timelineData !== null) {
                        this._frameOffset = this._animationData.frameOffset + this._timelineArray[this._timelineData.offset + 5]
                    }
                    this._onArriveAtFrame()
                }
                if (this._tweenState !== 0) {
                    this._onUpdateFrame()
                }
            }
        };
        return e
    }(t.BaseObject);
    t.TimelineState = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e._getEasingValue = function(t, e, a) {
            var r = e;
            switch (t) {
                case 3:
                    r = Math.pow(e, 2);
                    break;
                case 4:
                    r = 1 - Math.pow(1 - e, 2);
                    break;
                case 5:
                    r = .5 * (1 - Math.cos(e * Math.PI));
                    break
            }
            return (r - e) * a + e
        };
        e._getEasingCurveValue = function(t, e, a, r) {
            if (t <= 0) {
                return 0
            } else if (t >= 1) {
                return 1
            }
            var i = a + 1;
            var n = Math.floor(t * i);
            var s = n === 0 ? 0 : e[r + n - 1];
            var o = n === i - 1 ? 1e4 : e[r + n];
            return (s + (o - s) * (t * i - n)) * 1e-4
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this._tweenType = 0;
            this._curveCount = 0;
            this._framePosition = 0;
            this._frameDurationR = 0;
            this._tweenProgress = 0;
            this._tweenEasing = 0
        };
        e.prototype._onArriveAtFrame = function() {
            if (this._frameCount > 1 && (this._frameIndex !== this._frameCount - 1 || this._animationState.playTimes === 0 || this._animationState.currentPlayTimes < this._animationState.playTimes - 1)) {
                this._tweenType = this._frameArray[this._frameOffset + 1];
                this._tweenState = this._tweenType === 0 ? 1 : 2;
                if (this._tweenType === 2) {
                    this._curveCount = this._frameArray[this._frameOffset + 2]
                } else if (this._tweenType !== 0 && this._tweenType !== 1) {
                    this._tweenEasing = this._frameArray[this._frameOffset + 2] * .01
                }
                this._framePosition = this._frameArray[this._frameOffset] * this._frameRateR;
                if (this._frameIndex === this._frameCount - 1) {
                    this._frameDurationR = 1 / (this._animationData.duration - this._framePosition)
                } else {
                    var t = this._animationData.frameOffset + this._timelineArray[this._timelineData.offset + 5 + this._frameIndex + 1];
                    var e = this._frameArray[t] * this._frameRateR - this._framePosition;
                    if (e > 0) {
                        this._frameDurationR = 1 / e
                    } else {
                        this._frameDurationR = 0
                    }
                }
            } else {
                this._tweenState = 1
            }
        };
        e.prototype._onUpdateFrame = function() {
            if (this._tweenState === 2) {
                this._tweenProgress = (this.currentTime - this._framePosition) * this._frameDurationR;
                if (this._tweenType === 2) {
                    this._tweenProgress = e._getEasingCurveValue(this._tweenProgress, this._frameArray, this._curveCount, this._frameOffset + 3)
                } else if (this._tweenType !== 1) {
                    this._tweenProgress = e._getEasingValue(this._tweenType, this._tweenProgress, this._tweenEasing)
                }
            } else {
                this._tweenProgress = 0
            }
        };
        return e
    }(e);
    t.TweenTimelineState = a;
    var r = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.bone = null;
            this.bonePose = null
        };
        e.prototype.blend = function(t) {
            var e = this.bone._blendState.blendWeight;
            var a = this.bone.animationPose;
            var r = this.bonePose.result;
            if (t === 2) {
                a.x += r.x * e;
                a.y += r.y * e;
                a.rotation += r.rotation * e;
                a.skew += r.skew * e;
                a.scaleX += (r.scaleX - 1) * e;
                a.scaleY += (r.scaleY - 1) * e
            } else if (e !== 1) {
                a.x = r.x * e;
                a.y = r.y * e;
                a.rotation = r.rotation * e;
                a.skew = r.skew * e;
                a.scaleX = (r.scaleX - 1) * e + 1;
                a.scaleY = (r.scaleY - 1) * e + 1
            } else {
                a.x = r.x;
                a.y = r.y;
                a.rotation = r.rotation;
                a.skew = r.skew;
                a.scaleX = r.scaleX;
                a.scaleY = r.scaleY
            }
            if (this._animationState._fadeState !== 0 || this._animationState._subFadeState !== 0) {
                this.bone._transformDirty = true
            }
        };
        return e
    }(a);
    t.BoneTimelineState = r;
    var i = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.slot = null
        };
        return e
    }(a);
    t.SlotTimelineState = i;
    var n = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.constraint = null
        };
        return e
    }(a);
    t.ConstraintTimelineState = n
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.toString = function() {
            return "[class dragonBones.ActionTimelineState]"
        };
        a.prototype._onCrossFrame = function(e) {
            var a = this._armature.eventDispatcher;
            if (this._animationState.actionEnabled) {
                var r = this._animationData.frameOffset + this._timelineArray[this._timelineData.offset + 5 + e];
                var i = this._frameArray[r + 1];
                var n = this._animationData.parent.actions;
                for (var s = 0; s < i; ++s) {
                    var o = this._frameArray[r + 2 + s];
                    var l = n[o];
                    if (l.type === 0) {
                        var h = t.BaseObject.borrowObject(t.EventObject);
                        h.time = this._frameArray[r] / this._frameRate;
                        h.animationState = this._animationState;
                        t.EventObject.actionDataToInstance(l, h, this._armature);
                        this._armature._bufferAction(h, true)
                    } else {
                        var f = l.type === 10 ? t.EventObject.FRAME_EVENT : t.EventObject.SOUND_EVENT;
                        if (l.type === 11 || a.hasDBEventListener(f)) {
                            var h = t.BaseObject.borrowObject(t.EventObject);
                            h.time = this._frameArray[r] / this._frameRate;
                            h.animationState = this._animationState;
                            t.EventObject.actionDataToInstance(l, h, this._armature);
                            this._armature._dragonBones.bufferEvent(h)
                        }
                    }
                }
            }
        };
        a.prototype._onArriveAtFrame = function() {};
        a.prototype._onUpdateFrame = function() {};
        a.prototype.update = function(e) {
            var a = this.playState;
            var r = this.currentPlayTimes;
            var i = this.currentTime;
            if (this._setCurrentTime(e)) {
                var n = this._armature.eventDispatcher;
                if (a < 0) {
                    if (this.playState !== a) {
                        if (this._animationState.displayControl && this._animationState.resetToPose) {
                            this._armature._sortZOrder(null, 0)
                        }
                        r = this.currentPlayTimes;
                        if (n.hasDBEventListener(t.EventObject.START)) {
                            var s = t.BaseObject.borrowObject(t.EventObject);
                            s.type = t.EventObject.START;
                            s.armature = this._armature;
                            s.animationState = this._animationState;
                            this._armature._dragonBones.bufferEvent(s)
                        }
                    } else {
                        return
                    }
                }
                var o = this._animationState.timeScale < 0;
                var l = null;
                var h = null;
                if (this.currentPlayTimes !== r) {
                    if (n.hasDBEventListener(t.EventObject.LOOP_COMPLETE)) {
                        l = t.BaseObject.borrowObject(t.EventObject);
                        l.type = t.EventObject.LOOP_COMPLETE;
                        l.armature = this._armature;
                        l.animationState = this._animationState
                    }
                    if (this.playState > 0) {
                        if (n.hasDBEventListener(t.EventObject.COMPLETE)) {
                            h = t.BaseObject.borrowObject(t.EventObject);
                            h.type = t.EventObject.COMPLETE;
                            h.armature = this._armature;
                            h.animationState = this._animationState
                        }
                    }
                }
                if (this._frameCount > 1) {
                    var f = this._timelineData;
                    var u = Math.floor(this.currentTime * this._frameRate);
                    var _ = this._frameIndices[f.frameIndicesOffset + u];
                    if (this._frameIndex !== _) {
                        var c = this._frameIndex;
                        this._frameIndex = _;
                        if (this._timelineArray !== null) {
                            this._frameOffset = this._animationData.frameOffset + this._timelineArray[f.offset + 5 + this._frameIndex];
                            if (o) {
                                if (c < 0) {
                                    var p = Math.floor(i * this._frameRate);
                                    c = this._frameIndices[f.frameIndicesOffset + p];
                                    if (this.currentPlayTimes === r) {
                                        if (c === _) {
                                            c = -1
                                        }
                                    }
                                }
                                while (c >= 0) {
                                    var m = this._animationData.frameOffset + this._timelineArray[f.offset + 5 + c];
                                    var d = this._frameArray[m] / this._frameRate;
                                    if (this._position <= d && d <= this._position + this._duration) {
                                        this._onCrossFrame(c)
                                    }
                                    if (l !== null && c === 0) {
                                        this._armature._dragonBones.bufferEvent(l);
                                        l = null
                                    }
                                    if (c > 0) {
                                        c--
                                    } else {
                                        c = this._frameCount - 1
                                    }
                                    if (c === _) {
                                        break
                                    }
                                }
                            } else {
                                if (c < 0) {
                                    var p = Math.floor(i * this._frameRate);
                                    c = this._frameIndices[f.frameIndicesOffset + p];
                                    var m = this._animationData.frameOffset + this._timelineArray[f.offset + 5 + c];
                                    var d = this._frameArray[m] / this._frameRate;
                                    if (this.currentPlayTimes === r) {
                                        if (i <= d) {
                                            if (c > 0) {
                                                c--
                                            } else {
                                                c = this._frameCount - 1
                                            }
                                        } else if (c === _) {
                                            c = -1
                                        }
                                    }
                                }
                                while (c >= 0) {
                                    if (c < this._frameCount - 1) {
                                        c++
                                    } else {
                                        c = 0
                                    }
                                    var m = this._animationData.frameOffset + this._timelineArray[f.offset + 5 + c];
                                    var d = this._frameArray[m] / this._frameRate;
                                    if (this._position <= d && d <= this._position + this._duration) {
                                        this._onCrossFrame(c)
                                    }
                                    if (l !== null && c === 0) {
                                        this._armature._dragonBones.bufferEvent(l);
                                        l = null
                                    }
                                    if (c === _) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                } else if (this._frameIndex < 0) {
                    this._frameIndex = 0;
                    if (this._timelineData !== null) {
                        this._frameOffset = this._animationData.frameOffset + this._timelineArray[this._timelineData.offset + 5];
                        var d = this._frameArray[this._frameOffset] / this._frameRate;
                        if (this.currentPlayTimes === r) {
                            if (i <= d) {
                                this._onCrossFrame(this._frameIndex)
                            }
                        } else if (this._position <= d) {
                            if (!o && l !== null) {
                                this._armature._dragonBones.bufferEvent(l);
                                l = null
                            }
                            this._onCrossFrame(this._frameIndex)
                        }
                    }
                }
                if (l !== null) {
                    this._armature._dragonBones.bufferEvent(l)
                }
                if (h !== null) {
                    this._armature._dragonBones.bufferEvent(h)
                }
            }
        };
        a.prototype.setCurrentTime = function(t) {
            this._setCurrentTime(t);
            this._frameIndex = -1
        };
        return a
    }(t.TimelineState);
    t.ActionTimelineState = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.ZOrderTimelineState]"
        };
        e.prototype._onArriveAtFrame = function() {
            if (this.playState >= 0) {
                var t = this._frameArray[this._frameOffset + 1];
                if (t > 0) {
                    this._armature._sortZOrder(this._frameArray, this._frameOffset + 2)
                } else {
                    this._armature._sortZOrder(null, 0)
                }
            }
        };
        e.prototype._onUpdateFrame = function() {};
        return e
    }(t.TimelineState);
    t.ZOrderTimelineState = a;
    var r = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.toString = function() {
            return "[class dragonBones.BoneAllTimelineState]"
        };
        a.prototype._onArriveAtFrame = function() {
            e.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var t = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * 6;
                var a = this._armature._armatureData.scale;
                var r = this._frameFloatArray;
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.x = r[t++] * a;
                i.y = r[t++] * a;
                i.rotation = r[t++];
                i.skew = r[t++];
                i.scaleX = r[t++];
                i.scaleY = r[t++];
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        t = this._animationData.frameFloatOffset + this._frameValueOffset
                    }
                    n.x = r[t++] * a - i.x;
                    n.y = r[t++] * a - i.y;
                    n.rotation = r[t++] - i.rotation;
                    n.skew = r[t++] - i.skew;
                    n.scaleX = r[t++] - i.scaleX;
                    n.scaleY = r[t++] - i.scaleY
                } else {
                    n.x = 0;
                    n.y = 0;
                    n.rotation = 0;
                    n.skew = 0;
                    n.scaleX = 0;
                    n.scaleY = 0
                }
            } else {
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.x = 0;
                i.y = 0;
                i.rotation = 0;
                i.skew = 0;
                i.scaleX = 1;
                i.scaleY = 1;
                n.x = 0;
                n.y = 0;
                n.rotation = 0;
                n.skew = 0;
                n.scaleX = 0;
                n.scaleY = 0
            }
        };
        a.prototype._onUpdateFrame = function() {
            e.prototype._onUpdateFrame.call(this);
            var t = this.bonePose.current;
            var a = this.bonePose.delta;
            var r = this.bonePose.result;
            this.bone._transformDirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            r.x = t.x + a.x * this._tweenProgress;
            r.y = t.y + a.y * this._tweenProgress;
            r.rotation = t.rotation + a.rotation * this._tweenProgress;
            r.skew = t.skew + a.skew * this._tweenProgress;
            r.scaleX = t.scaleX + a.scaleX * this._tweenProgress;
            r.scaleY = t.scaleY + a.scaleY * this._tweenProgress
        };
        a.prototype.fadeOut = function() {
            var e = this.bonePose.result;
            e.rotation = t.Transform.normalizeRadian(e.rotation);
            e.skew = t.Transform.normalizeRadian(e.skew)
        };
        return a
    }(t.BoneTimelineState);
    t.BoneAllTimelineState = r;
    var i = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.BoneTranslateTimelineState]"
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var e = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * 2;
                var a = this._armature._armatureData.scale;
                var r = this._frameFloatArray;
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.x = r[e++] * a;
                i.y = r[e++] * a;
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        e = this._animationData.frameFloatOffset + this._frameValueOffset
                    }
                    n.x = r[e++] * a - i.x;
                    n.y = r[e++] * a - i.y
                } else {
                    n.x = 0;
                    n.y = 0
                }
            } else {
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.x = 0;
                i.y = 0;
                n.x = 0;
                n.y = 0
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            var e = this.bonePose.current;
            var a = this.bonePose.delta;
            var r = this.bonePose.result;
            this.bone._transformDirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            r.x = e.x + a.x * this._tweenProgress;
            r.y = e.y + a.y * this._tweenProgress
        };
        return e
    }(t.BoneTimelineState);
    t.BoneTranslateTimelineState = i;
    var n = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.toString = function() {
            return "[class dragonBones.BoneRotateTimelineState]"
        };
        a.prototype._onArriveAtFrame = function() {
            e.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var a = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * 2;
                var r = this._frameFloatArray;
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.rotation = r[a++];
                i.skew = r[a++];
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        a = this._animationData.frameFloatOffset + this._frameValueOffset;
                        n.rotation = t.Transform.normalizeRadian(r[a++] - i.rotation)
                    } else {
                        n.rotation = r[a++] - i.rotation
                    }
                    n.skew = r[a++] - i.skew
                } else {
                    n.rotation = 0;
                    n.skew = 0
                }
            } else {
                var i = this.bonePose.current;
                var n = this.bonePose.delta;
                i.rotation = 0;
                i.skew = 0;
                n.rotation = 0;
                n.skew = 0
            }
        };
        a.prototype._onUpdateFrame = function() {
            e.prototype._onUpdateFrame.call(this);
            var t = this.bonePose.current;
            var a = this.bonePose.delta;
            var r = this.bonePose.result;
            this.bone._transformDirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            r.rotation = t.rotation + a.rotation * this._tweenProgress;
            r.skew = t.skew + a.skew * this._tweenProgress
        };
        a.prototype.fadeOut = function() {
            var e = this.bonePose.result;
            e.rotation = t.Transform.normalizeRadian(e.rotation);
            e.skew = t.Transform.normalizeRadian(e.skew)
        };
        return a
    }(t.BoneTimelineState);
    t.BoneRotateTimelineState = n;
    var s = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.BoneScaleTimelineState]"
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var e = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * 2;
                var a = this._frameFloatArray;
                var r = this.bonePose.current;
                var i = this.bonePose.delta;
                r.scaleX = a[e++];
                r.scaleY = a[e++];
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        e = this._animationData.frameFloatOffset + this._frameValueOffset
                    }
                    i.scaleX = a[e++] - r.scaleX;
                    i.scaleY = a[e++] - r.scaleY
                } else {
                    i.scaleX = 0;
                    i.scaleY = 0
                }
            } else {
                var r = this.bonePose.current;
                var i = this.bonePose.delta;
                r.scaleX = 1;
                r.scaleY = 1;
                i.scaleX = 0;
                i.scaleY = 0
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            var e = this.bonePose.current;
            var a = this.bonePose.delta;
            var r = this.bonePose.result;
            this.bone._transformDirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            r.scaleX = e.scaleX + a.scaleX * this._tweenProgress;
            r.scaleY = e.scaleY + a.scaleY * this._tweenProgress
        };
        return e
    }(t.BoneTimelineState);
    t.BoneScaleTimelineState = s;
    var o = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e._current = [];
            e._delta = [];
            e._result = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.SurfaceTimelineState]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.surface = null;
            this._frameFloatOffset = 0;
            this._valueCount = 0;
            this._deformCount = 0;
            this._valueOffset = 0;
            this._current.length = 0;
            this._delta.length = 0;
            this._result.length = 0
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var e = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * this._valueCount;
                var a = this._armature._armatureData.scale;
                var r = this._frameFloatArray;
                if (this._tweenState === 2) {
                    var i = e + this._valueCount;
                    if (this._frameIndex === this._frameCount - 1) {
                        i = this._animationData.frameFloatOffset + this._frameValueOffset
                    }
                    for (var n = 0; n < this._valueCount; ++n) {
                        this._delta[n] = r[i + n] * a - (this._current[n] = r[e + n] * a)
                    }
                } else {
                    for (var n = 0; n < this._valueCount; ++n) {
                        this._current[n] = r[e + n] * a
                    }
                }
            } else {
                for (var n = 0; n < this._valueCount; ++n) {
                    this._current[n] = 0
                }
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            this.surface._transformDirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            for (var e = 0; e < this._valueCount; ++e) {
                this._result[e] = this._current[e] + this._delta[e] * this._tweenProgress
            }
        };
        e.prototype.init = function(e, a, r) {
            t.prototype.init.call(this, e, a, r);
            if (this._timelineData !== null) {
                var i = this._animationData.frameIntOffset + this._timelineArray[this._timelineData.offset + 3];
                this._deformCount = this._frameIntArray[i + 1];
                this._valueCount = this._frameIntArray[i + 2];
                this._valueOffset = this._frameIntArray[i + 3];
                this._frameFloatOffset = this._frameIntArray[i + 4] + this._animationData.frameFloatOffset
            } else {
                this._deformCount = this.surface._deformVertices.length;
                this._valueCount = this._deformCount;
                this._valueOffset = 0;
                this._frameFloatOffset = 0
            }
            this._current.length = this._valueCount;
            this._delta.length = this._valueCount;
            this._result.length = this._valueCount;
            for (var n = 0; n < this._valueCount; ++n) {
                this._delta[n] = 0
            }
        };
        e.prototype.blend = function(t) {
            var e = this.surface._blendState.blendWeight;
            var a = this.surface._deformVertices;
            for (var r = 0; r < this._deformCount; ++r) {
                var i = 0;
                if (r < this._valueOffset) {
                    i = this._frameFloatArray[this._frameFloatOffset + r]
                } else if (r < this._valueOffset + this._valueCount) {
                    i = this._result[r - this._valueOffset]
                } else {
                    i = this._frameFloatArray[this._frameFloatOffset + r - this._valueCount]
                }
                if (t === 2) {
                    a[r] += i * e
                } else if (e !== 1) {
                    a[r] = i * e
                } else {
                    a[r] = i
                }
            }
            if (this._animationState._fadeState !== 0 || this._animationState._subFadeState !== 0) {
                this.surface._transformDirty = true
            }
        };
        return e
    }(t.TweenTimelineState);
    t.SurfaceTimelineState = o;
    var l = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.SlotDislayTimelineState]"
        };
        e.prototype._onArriveAtFrame = function() {
            if (this.playState >= 0) {
                var t = this._timelineData !== null ? this._frameArray[this._frameOffset + 1] : this.slot._slotData.displayIndex;
                if (this.slot.displayIndex !== t) {
                    this.slot._setDisplayIndex(t, true)
                }
            }
        };
        return e
    }(t.SlotTimelineState);
    t.SlotDislayTimelineState = l;
    var h = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e._current = [0, 0, 0, 0, 0, 0, 0, 0];
            e._delta = [0, 0, 0, 0, 0, 0, 0, 0];
            e._result = [0, 0, 0, 0, 0, 0, 0, 0];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.SlotColorTimelineState]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this._dirty = false
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var e = this._dragonBonesData.intArray;
                var a = this._frameIntArray;
                var r = this._animationData.frameIntOffset + this._frameValueOffset + this._frameIndex * 1;
                var i = a[r];
                if (i < 0) {
                    i += 65536
                }
                this._current[0] = e[i++];
                this._current[1] = e[i++];
                this._current[2] = e[i++];
                this._current[3] = e[i++];
                this._current[4] = e[i++];
                this._current[5] = e[i++];
                this._current[6] = e[i++];
                this._current[7] = e[i++];
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        i = a[this._animationData.frameIntOffset + this._frameValueOffset]
                    } else {
                        i = a[r + 1 * 1]
                    }
                    if (i < 0) {
                        i += 65536
                    }
                    this._delta[0] = e[i++] - this._current[0];
                    this._delta[1] = e[i++] - this._current[1];
                    this._delta[2] = e[i++] - this._current[2];
                    this._delta[3] = e[i++] - this._current[3];
                    this._delta[4] = e[i++] - this._current[4];
                    this._delta[5] = e[i++] - this._current[5];
                    this._delta[6] = e[i++] - this._current[6];
                    this._delta[7] = e[i++] - this._current[7]
                }
            } else {
                var n = this.slot._slotData.color;
                this._current[0] = n.alphaMultiplier * 100;
                this._current[1] = n.redMultiplier * 100;
                this._current[2] = n.greenMultiplier * 100;
                this._current[3] = n.blueMultiplier * 100;
                this._current[4] = n.alphaOffset;
                this._current[5] = n.redOffset;
                this._current[6] = n.greenOffset;
                this._current[7] = n.blueOffset
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            this._dirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            this._result[0] = (this._current[0] + this._delta[0] * this._tweenProgress) * .01;
            this._result[1] = (this._current[1] + this._delta[1] * this._tweenProgress) * .01;
            this._result[2] = (this._current[2] + this._delta[2] * this._tweenProgress) * .01;
            this._result[3] = (this._current[3] + this._delta[3] * this._tweenProgress) * .01;
            this._result[4] = this._current[4] + this._delta[4] * this._tweenProgress;
            this._result[5] = this._current[5] + this._delta[5] * this._tweenProgress;
            this._result[6] = this._current[6] + this._delta[6] * this._tweenProgress;
            this._result[7] = this._current[7] + this._delta[7] * this._tweenProgress
        };
        e.prototype.fadeOut = function() {
            this._tweenState = 0;
            this._dirty = false
        };
        e.prototype.update = function(e) {
            t.prototype.update.call(this, e);
            if (this._tweenState !== 0 || this._dirty) {
                var a = this.slot._colorTransform;
                if (this._animationState._fadeState !== 0 || this._animationState._subFadeState !== 0) {
                    if (a.alphaMultiplier !== this._result[0] || a.redMultiplier !== this._result[1] || a.greenMultiplier !== this._result[2] || a.blueMultiplier !== this._result[3] || a.alphaOffset !== this._result[4] || a.redOffset !== this._result[5] || a.greenOffset !== this._result[6] || a.blueOffset !== this._result[7]) {
                        var r = Math.pow(this._animationState._fadeProgress, 4);
                        a.alphaMultiplier += (this._result[0] - a.alphaMultiplier) * r;
                        a.redMultiplier += (this._result[1] - a.redMultiplier) * r;
                        a.greenMultiplier += (this._result[2] - a.greenMultiplier) * r;
                        a.blueMultiplier += (this._result[3] - a.blueMultiplier) * r;
                        a.alphaOffset += (this._result[4] - a.alphaOffset) * r;
                        a.redOffset += (this._result[5] - a.redOffset) * r;
                        a.greenOffset += (this._result[6] - a.greenOffset) * r;
                        a.blueOffset += (this._result[7] - a.blueOffset) * r;
                        this.slot._colorDirty = true
                    }
                } else if (this._dirty) {
                    this._dirty = false;
                    if (a.alphaMultiplier !== this._result[0] || a.redMultiplier !== this._result[1] || a.greenMultiplier !== this._result[2] || a.blueMultiplier !== this._result[3] || a.alphaOffset !== this._result[4] || a.redOffset !== this._result[5] || a.greenOffset !== this._result[6] || a.blueOffset !== this._result[7]) {
                        a.alphaMultiplier = this._result[0];
                        a.redMultiplier = this._result[1];
                        a.greenMultiplier = this._result[2];
                        a.blueMultiplier = this._result[3];
                        a.alphaOffset = this._result[4];
                        a.redOffset = this._result[5];
                        a.greenOffset = this._result[6];
                        a.blueOffset = this._result[7];
                        this.slot._colorDirty = true
                    }
                }
            }
        };
        return e
    }(t.SlotTimelineState);
    t.SlotColorTimelineState = h;
    var f = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e._current = [];
            e._delta = [];
            e._result = [];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.DeformTimelineState]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.vertexOffset = 0;
            this._dirty = false;
            this._frameFloatOffset = 0;
            this._valueCount = 0;
            this._deformCount = 0;
            this._valueOffset = 0;
            this._current.length = 0;
            this._delta.length = 0;
            this._result.length = 0
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData !== null) {
                var e = this._animationData.frameFloatOffset + this._frameValueOffset + this._frameIndex * this._valueCount;
                var a = this._armature._armatureData.scale;
                var r = this._frameFloatArray;
                if (this._tweenState === 2) {
                    var i = e + this._valueCount;
                    if (this._frameIndex === this._frameCount - 1) {
                        i = this._animationData.frameFloatOffset + this._frameValueOffset
                    }
                    for (var n = 0; n < this._valueCount; ++n) {
                        this._delta[n] = r[i + n] * a - (this._current[n] = r[e + n] * a)
                    }
                } else {
                    for (var n = 0; n < this._valueCount; ++n) {
                        this._current[n] = r[e + n] * a
                    }
                }
            } else {
                for (var n = 0; n < this._valueCount; ++n) {
                    this._current[n] = 0
                }
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            this._dirty = true;
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            for (var e = 0; e < this._valueCount; ++e) {
                this._result[e] = this._current[e] + this._delta[e] * this._tweenProgress
            }
        };
        e.prototype.init = function(e, a, r) {
            t.prototype.init.call(this, e, a, r);
            if (this._timelineData !== null) {
                var i = this._animationData.frameIntOffset + this._timelineArray[this._timelineData.offset + 3];
                this.vertexOffset = this._frameIntArray[i + 0];
                if (this.vertexOffset < 0) {
                    this.vertexOffset += 65536
                }
                this._deformCount = this._frameIntArray[i + 1];
                this._valueCount = this._frameIntArray[i + 2];
                this._valueOffset = this._frameIntArray[i + 3];
                this._frameFloatOffset = this._frameIntArray[i + 4] + this._animationData.frameFloatOffset
            } else {
                var n = this.slot._deformVertices;
                this._deformCount = n !== null ? n.vertices.length : 0;
                this._valueCount = this._deformCount;
                this._valueOffset = 0;
                this._frameFloatOffset = 0
            }
            this._current.length = this._valueCount;
            this._delta.length = this._valueCount;
            this._result.length = this._valueCount;
            for (var s = 0; s < this._valueCount; ++s) {
                this._delta[s] = 0
            }
        };
        e.prototype.fadeOut = function() {
            this._tweenState = 0;
            this._dirty = false
        };
        e.prototype.update = function(e) {
            var a = this.slot._deformVertices;
            if (a === null || a.verticesData === null || a.verticesData.offset !== this.vertexOffset) {
                return
            }
            t.prototype.update.call(this, e);
            if (this._tweenState !== 0 || this._dirty) {
                var r = a.vertices;
                if (this._animationState._fadeState !== 0 || this._animationState._subFadeState !== 0) {
                    var i = Math.pow(this._animationState._fadeProgress, 2);
                    for (var n = 0; n < this._deformCount; ++n) {
                        if (n < this._valueOffset) {
                            r[n] += (this._frameFloatArray[this._frameFloatOffset + n] - r[n]) * i
                        } else if (n < this._valueOffset + this._valueCount) {
                            r[n] += (this._result[n - this._valueOffset] - r[n]) * i
                        } else {
                            r[n] += (this._frameFloatArray[this._frameFloatOffset + n - this._valueCount] - r[n]) * i
                        }
                    }
                    a.verticesDirty = true
                } else if (this._dirty) {
                    this._dirty = false;
                    for (var n = 0; n < this._deformCount; ++n) {
                        if (n < this._valueOffset) {
                            r[n] = this._frameFloatArray[this._frameFloatOffset + n]
                        } else if (n < this._valueOffset + this._valueCount) {
                            r[n] = this._result[n - this._valueOffset]
                        } else {
                            r[n] = this._frameFloatArray[this._frameFloatOffset + n - this._valueCount]
                        }
                    }
                    a.verticesDirty = true
                }
            }
        };
        return e
    }(t.SlotTimelineState);
    t.DeformTimelineState = f;
    var u = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.toString = function() {
            return "[class dragonBones.IKConstraintTimelineState]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this._current = 0;
            this._delta = 0
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            var e = this.constraint;
            if (this._timelineData !== null) {
                var a = this._animationData.frameIntOffset + this._frameValueOffset + this._frameIndex * 2;
                var r = this._frameIntArray;
                var i = r[a++] !== 0;
                this._current = r[a++] * .01;
                if (this._tweenState === 2) {
                    if (this._frameIndex === this._frameCount - 1) {
                        a = this._animationData.frameIntOffset + this._frameValueOffset
                    }
                    this._delta = r[a + 1] * .01 - this._current
                } else {
                    this._delta = 0
                }
                e._bendPositive = i
            } else {
                var n = e._constraintData;
                this._current = n.weight;
                this._delta = 0;
                e._bendPositive = n.bendPositive
            }
            e.invalidUpdate()
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            var e = this.constraint;
            e._weight = this._current + this._delta * this._tweenProgress;
            e.invalidUpdate()
        };
        return e
    }(t.ConstraintTimelineState);
    t.IKConstraintTimelineState = u;
    var _ = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e._floats = [0, 0, 0, 0, 0, 0];
            return e
        }
        e.toString = function() {
            return "[class dragonBones.AnimationTimelineState]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            this.animationState = null
        };
        e.prototype._onArriveAtFrame = function() {
            t.prototype._onArriveAtFrame.call(this);
            if (this._timelineData === null) {
                return
            }
            var e = this._animationData.frameIntOffset + this._frameValueOffset + this._frameIndex * 2;
            var a = 1 / this.animationState._animationData.parent.frameRate;
            var r = this._frameIntArray;
            this._floats[0] = r[e++] * a;
            this._floats[3] = r[e++] * .01;
            if (this._tweenState === 2) {
                if (this._frameIndex === this._frameCount - 1) {
                    e = this._animationData.frameIntOffset + this._frameValueOffset
                }
                this._floats[1] = r[e++] * a - this._floats[0];
                this._floats[4] = r[e++] * .01 - this._floats[3]
            } else {
                this._floats[1] = 0;
                this._floats[4] = 0
            }
        };
        e.prototype._onUpdateFrame = function() {
            t.prototype._onUpdateFrame.call(this);
            if (this._tweenState !== 2) {
                this._tweenState = 0
            }
            if (this._floats[0] >= 0) {
                this._floats[2] = this._floats[0] + this._floats[1] * this._tweenProgress
            }
            this._floats[5] = this._floats[3] + this._floats[4] * this._tweenProgress
        };
        e.prototype.blend = function(t) {
            var e = this.animationState;
            var a = e._blendState.blendWeight;
            if (t === 2) {
                e.weight += this._floats[5] * a;
                e.currentTime += this._floats[2] * a
            } else {
                e.weight = this._floats[5] * a;
                e.currentTime = this._floats[2] * a
            }
        };
        return e
    }(t.TweenTimelineState);
    t.AnimationTimelineState = _
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        e.actionDataToInstance = function(t, a, r) {
            if (t.type === 0) {
                a.type = e.FRAME_EVENT
            } else {
                a.type = t.type === 10 ? e.FRAME_EVENT : e.SOUND_EVENT
            }
            a.name = t.name;
            a.armature = r;
            a.actionData = t;
            a.data = t.data;
            if (t.bone !== null) {
                a.bone = r.getBone(t.bone.name)
            }
            if (t.slot !== null) {
                a.slot = r.getSlot(t.slot.name)
            }
        };
        e.toString = function() {
            return "[class dragonBones.EventObject]"
        };
        e.prototype._onClear = function() {
            this.time = 0;
            this.type = "";
            this.name = "";
            this.armature = null;
            this.bone = null;
            this.slot = null;
            this.animationState = null;
            this.actionData = null;
            this.data = null
        };
        e.START = "start";
        e.LOOP_COMPLETE = "loopComplete";
        e.COMPLETE = "complete";
        e.FADE_IN = "fadeIn";
        e.FADE_IN_COMPLETE = "fadeInComplete";
        e.FADE_OUT = "fadeOut";
        e.FADE_OUT_COMPLETE = "fadeOutComplete";
        e.FRAME_EVENT = "frameEvent";
        e.SOUND_EVENT = "soundEvent";
        return e
    }(t.BaseObject);
    t.EventObject = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function e() {}
        e._getArmatureType = function(t) {
            switch (t.toLowerCase()) {
                case "stage":
                    return 2;
                case "armature":
                    return 0;
                case "movieclip":
                    return 1;
                default:
                    return 0
            }
        };
        e._getBoneType = function(t) {
            switch (t.toLowerCase()) {
                case "bone":
                    return 0;
                case "surface":
                    return 1;
                default:
                    return 0
            }
        };
        e._getDisplayType = function(t) {
            switch (t.toLowerCase()) {
                case "image":
                    return 0;
                case "mesh":
                    return 2;
                case "armature":
                    return 1;
                case "boundingbox":
                    return 3;
                case "path":
                    return 4;
                default:
                    return 0
            }
        };
        e._getBoundingBoxType = function(t) {
            switch (t.toLowerCase()) {
                case "rectangle":
                    return 0;
                case "ellipse":
                    return 1;
                case "polygon":
                    return 2;
                default:
                    return 0
            }
        };
        e._getActionType = function(t) {
            switch (t.toLowerCase()) {
                case "play":
                    return 0;
                case "frame":
                    return 10;
                case "sound":
                    return 11;
                default:
                    return 0
            }
        };
        e._getBlendMode = function(t) {
            switch (t.toLowerCase()) {
                case "normal":
                    return 0;
                case "add":
                    return 1;
                case "alpha":
                    return 2;
                case "darken":
                    return 3;
                case "difference":
                    return 4;
                case "erase":
                    return 5;
                case "hardlight":
                    return 6;
                case "invert":
                    return 7;
                case "layer":
                    return 8;
                case "lighten":
                    return 9;
                case "multiply":
                    return 10;
                case "overlay":
                    return 11;
                case "screen":
                    return 12;
                case "subtract":
                    return 13;
                default:
                    return 0
            }
        };
        e._getPositionMode = function(t) {
            switch (t.toLocaleLowerCase()) {
                case "percent":
                    return 1;
                case "fixed":
                    return 0;
                default:
                    return 1
            }
        };
        e._getSpacingMode = function(t) {
            switch (t.toLocaleLowerCase()) {
                case "length":
                    return 0;
                case "percent":
                    return 2;
                case "fixed":
                    return 1;
                default:
                    return 0
            }
        };
        e._getRotateMode = function(t) {
            switch (t.toLocaleLowerCase()) {
                case "tangent":
                    return 0;
                case "chain":
                    return 1;
                case "chainscale":
                    return 2;
                default:
                    return 0
            }
        };
        e.parseDragonBonesData = function(e) {
            console.warn("Deprecated.");
            if (e instanceof ArrayBuffer) {
                return t.BinaryDataParser.getInstance().parseDragonBonesData(e)
            } else {
                return t.ObjectDataParser.getInstance().parseDragonBonesData(e)
            }
        };
        e.parseTextureAtlasData = function(a, r) {
            if (r === void 0) {
                r = 1
            }
            console.warn("已废弃");
            var i = {};
            var n = a[e.SUB_TEXTURE];
            for (var s = 0, o = n.length; s < o; s++) {
                var l = n[s];
                var h = l[e.NAME];
                var f = new t.Rectangle;
                var u = null;
                f.x = l[e.X] / r;
                f.y = l[e.Y] / r;
                f.width = l[e.WIDTH] / r;
                f.height = l[e.HEIGHT] / r;
                if (e.FRAME_WIDTH in l) {
                    u = new t.Rectangle;
                    u.x = l[e.FRAME_X] / r;
                    u.y = l[e.FRAME_Y] / r;
                    u.width = l[e.FRAME_WIDTH] / r;
                    u.height = l[e.FRAME_HEIGHT] / r
                }
                i[h] = {
                    region: f,
                    frame: u,
                    rotated: false
                }
            }
            return i
        };
        e.DATA_VERSION_2_3 = "2.3";
        e.DATA_VERSION_3_0 = "3.0";
        e.DATA_VERSION_4_0 = "4.0";
        e.DATA_VERSION_4_5 = "4.5";
        e.DATA_VERSION_5_0 = "5.0";
        e.DATA_VERSION_5_5 = "5.5";
        e.DATA_VERSION = e.DATA_VERSION_5_5;
        e.DATA_VERSIONS = [e.DATA_VERSION_4_0, e.DATA_VERSION_4_5, e.DATA_VERSION_5_0, e.DATA_VERSION_5_5];
        e.TEXTURE_ATLAS = "textureAtlas";
        e.SUB_TEXTURE = "SubTexture";
        e.FORMAT = "format";
        e.IMAGE_PATH = "imagePath";
        e.WIDTH = "width";
        e.HEIGHT = "height";
        e.ROTATED = "rotated";
        e.FRAME_X = "frameX";
        e.FRAME_Y = "frameY";
        e.FRAME_WIDTH = "frameWidth";
        e.FRAME_HEIGHT = "frameHeight";
        e.DRADON_BONES = "dragonBones";
        e.USER_DATA = "userData";
        e.ARMATURE = "armature";
        e.BONE = "bone";
        e.SURFACE = "surface";
        e.SLOT = "slot";
        e.CONSTRAINT = "constraint";
        e.IK = "ik";
        e.PATH_CONSTRAINT = "path";
        e.SKIN = "skin";
        e.DISPLAY = "display";
        e.ANIMATION = "animation";
        e.Z_ORDER = "zOrder";
        e.FFD = "ffd";
        e.FRAME = "frame";
        e.TRANSLATE_FRAME = "translateFrame";
        e.ROTATE_FRAME = "rotateFrame";
        e.SCALE_FRAME = "scaleFrame";
        e.DISPLAY_FRAME = "displayFrame";
        e.COLOR_FRAME = "colorFrame";
        e.DEFAULT_ACTIONS = "defaultActions";
        e.ACTIONS = "actions";
        e.EVENTS = "events";
        e.INTS = "ints";
        e.FLOATS = "floats";
        e.STRINGS = "strings";
        e.CANVAS = "canvas";
        e.TRANSFORM = "transform";
        e.PIVOT = "pivot";
        e.AABB = "aabb";
        e.COLOR = "color";
        e.VERSION = "version";
        e.COMPATIBLE_VERSION = "compatibleVersion";
        e.FRAME_RATE = "frameRate";
        e.TYPE = "type";
        e.SUB_TYPE = "subType";
        e.NAME = "name";
        e.PARENT = "parent";
        e.TARGET = "target";
        e.STAGE = "stage";
        e.SHARE = "share";
        e.PATH = "path";
        e.LENGTH = "length";
        e.DISPLAY_INDEX = "displayIndex";
        e.BLEND_MODE = "blendMode";
        e.INHERIT_TRANSLATION = "inheritTranslation";
        e.INHERIT_ROTATION = "inheritRotation";
        e.INHERIT_SCALE = "inheritScale";
        e.INHERIT_REFLECTION = "inheritReflection";
        e.INHERIT_ANIMATION = "inheritAnimation";
        e.INHERIT_DEFORM = "inheritDeform";
        e.SEGMENT_X = "segmentX";
        e.SEGMENT_Y = "segmentY";
        e.BEND_POSITIVE = "bendPositive";
        e.CHAIN = "chain";
        e.WEIGHT = "weight";
        e.FADE_IN_TIME = "fadeInTime";
        e.PLAY_TIMES = "playTimes";
        e.SCALE = "scale";
        e.OFFSET = "offset";
        e.POSITION = "position";
        e.DURATION = "duration";
        e.TWEEN_EASING = "tweenEasing";
        e.TWEEN_ROTATE = "tweenRotate";
        e.TWEEN_SCALE = "tweenScale";
        e.CLOCK_WISE = "clockwise";
        e.CURVE = "curve";
        e.SOUND = "sound";
        e.EVENT = "event";
        e.ACTION = "action";
        e.X = "x";
        e.Y = "y";
        e.SKEW_X = "skX";
        e.SKEW_Y = "skY";
        e.SCALE_X = "scX";
        e.SCALE_Y = "scY";
        e.VALUE = "value";
        e.ROTATE = "rotate";
        e.SKEW = "skew";
        e.ALPHA_OFFSET = "aO";
        e.RED_OFFSET = "rO";
        e.GREEN_OFFSET = "gO";
        e.BLUE_OFFSET = "bO";
        e.ALPHA_MULTIPLIER = "aM";
        e.RED_MULTIPLIER = "rM";
        e.GREEN_MULTIPLIER = "gM";
        e.BLUE_MULTIPLIER = "bM";
        e.UVS = "uvs";
        e.VERTICES = "vertices";
        e.TRIANGLES = "triangles";
        e.WEIGHTS = "weights";
        e.SLOT_POSE = "slotPose";
        e.BONE_POSE = "bonePose";
        e.GLUE_WEIGHTS = "glueWeights";
        e.GLUE_MESHES = "glueMeshes";
        e.BONES = "bones";
        e.POSITION_MODE = "positionMode";
        e.SPACING_MODE = "spacingMode";
        e.ROTATE_MODE = "rotateMode";
        e.SPACING = "spacing";
        e.ROTATE_OFFSET = "rotateOffset";
        e.ROTATE_MIX = "rotateMix";
        e.TRANSLATE_MIX = "translateMix";
        e.TARGET_DISPLAY = "targetDisplay";
        e.CLOSED = "closed";
        e.CONSTANT_SPEED = "constantSpeed";
        e.VERTEX_COUNT = "vertexCount";
        e.LENGTHS = "lengths";
        e.GOTO_AND_PLAY = "gotoAndPlay";
        e.DEFAULT_NAME = "default";
        return e
    }();
    t.DataParser = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(r, e);

        function r() {
            var a = e !== null && e.apply(this, arguments) || this;
            a._rawTextureAtlasIndex = 0;
            a._rawBones = [];
            a._data = null;
            a._armature = null;
            a._bone = null;
            a._surface = null;
            a._slot = null;
            a._skin = null;
            a._mesh = null;
            a._animation = null;
            a._timeline = null;
            a._rawTextureAtlases = null;
            a._defaultColorOffset = -1;
            a._prevClockwise = 0;
            a._prevRotation = 0;
            a._helpMatrixA = new t.Matrix;
            a._helpMatrixB = new t.Matrix;
            a._helpTransform = new t.Transform;
            a._helpColorTransform = new t.ColorTransform;
            a._helpPoint = new t.Point;
            a._helpArray = [];
            a._intArray = [];
            a._floatArray = [];
            a._frameIntArray = [];
            a._frameFloatArray = [];
            a._frameArray = [];
            a._timelineArray = [];
            a._cacheRawMeshes = [];
            a._cacheMeshes = [];
            a._actionFrames = [];
            a._weightSlotPose = {};
            a._weightBonePoses = {};
            a._cacheBones = {};
            a._slotChildActions = {};
            return a
        }
        r._getBoolean = function(t, e, a) {
            if (e in t) {
                var r = t[e];
                var i = typeof r;
                if (i === "boolean") {
                    return r
                } else if (i === "string") {
                    switch (r) {
                        case "0":
                        case "NaN":
                        case "":
                        case "false":
                        case "null":
                        case "undefined":
                            return false;
                        default:
                            return true
                    }
                } else {
                    return !!r
                }
            }
            return a
        };
        r._getNumber = function(t, e, a) {
            if (e in t) {
                var r = t[e];
                if (r === null || r === "NaN") {
                    return a
                }
                return +r || 0
            }
            return a
        };
        r._getString = function(e, a, r) {
            if (a in e) {
                var i = e[a];
                var n = typeof i;
                if (n === "string") {
                    if (t.DragonBones.webAssembly) {
                        for (var s = 0, o = i.length; s < o; ++s) {
                            if (i.charCodeAt(s) > 255) {
                                return encodeURI(i)
                            }
                        }
                    }
                    return i
                }
                return String(i)
            }
            return r
        };
        r.prototype._getCurvePoint = function(t, e, a, r, i, n, s, o, l, h) {
            var f = 1 - l;
            var u = f * f;
            var _ = l * l;
            var c = f * u;
            var p = 3 * l * u;
            var m = 3 * f * _;
            var d = l * _;
            h.x = c * t + p * a + m * i + d * s;
            h.y = c * e + p * r + m * n + d * o
        };
        r.prototype._samplingEasingCurve = function(t, e) {
            var a = t.length;
            var r = -2;
            for (var i = 0, n = e.length; i < n; ++i) {
                var s = (i + 1) / (n + 1);
                while ((r + 6 < a ? t[r + 6] : 1) < s) {
                    r += 6
                }
                var o = r >= 0 && r + 6 < a;
                var l = o ? t[r] : 0;
                var h = o ? t[r + 1] : 0;
                var f = t[r + 2];
                var u = t[r + 3];
                var _ = t[r + 4];
                var c = t[r + 5];
                var p = o ? t[r + 6] : 1;
                var m = o ? t[r + 7] : 1;
                var d = 0;
                var v = 1;
                while (v - d > 1e-4) {
                    var y = (v + d) * .5;
                    this._getCurvePoint(l, h, f, u, _, c, p, m, y, this._helpPoint);
                    if (s - this._helpPoint.x > 0) {
                        d = y
                    } else {
                        v = y
                    }
                }
                e[i] = this._helpPoint.y
            }
        };
        r.prototype._parseActionDataInFrame = function(e, a, r, i) {
            if (t.DataParser.EVENT in e) {
                this._mergeActionFrame(e[t.DataParser.EVENT], a, 10, r, i)
            }
            if (t.DataParser.SOUND in e) {
                this._mergeActionFrame(e[t.DataParser.SOUND], a, 11, r, i)
            }
            if (t.DataParser.ACTION in e) {
                this._mergeActionFrame(e[t.DataParser.ACTION], a, 0, r, i)
            }
            if (t.DataParser.EVENTS in e) {
                this._mergeActionFrame(e[t.DataParser.EVENTS], a, 10, r, i)
            }
            if (t.DataParser.ACTIONS in e) {
                this._mergeActionFrame(e[t.DataParser.ACTIONS], a, 0, r, i)
            }
        };
        r.prototype._mergeActionFrame = function(e, r, i, n, s) {
            var o = t.DragonBones.webAssembly ? this._armature.actions.size() : this._armature.actions.length;
            var l = this._parseActionData(e, i, n, s);
            var h = 0;
            var f = null;
            for (var u = 0, _ = l; u < _.length; u++) {
                var c = _[u];
                this._armature.addAction(c, false)
            }
            if (this._actionFrames.length === 0) {
                f = new a;
                f.frameStart = 0;
                this._actionFrames.push(f);
                f = null
            }
            for (var p = 0, m = this._actionFrames; p < m.length; p++) {
                var d = m[p];
                if (d.frameStart === r) {
                    f = d;
                    break
                } else if (d.frameStart > r) {
                    break
                }
                h++
            }
            if (f === null) {
                f = new a;
                f.frameStart = r;
                this._actionFrames.splice(h + 1, 0, f)
            }
            for (var v = 0; v < l.length; ++v) {
                f.actions.push(o + v)
            }
        };
        r.prototype._parseArmature = function(e, a) {
            var i = t.BaseObject.borrowObject(t.ArmatureData);
            i.name = r._getString(e, t.DataParser.NAME, "");
            i.frameRate = r._getNumber(e, t.DataParser.FRAME_RATE, this._data.frameRate);
            i.scale = a;
            if (t.DataParser.TYPE in e && typeof e[t.DataParser.TYPE] === "string") {
                i.type = t.DataParser._getArmatureType(e[t.DataParser.TYPE])
            } else {
                i.type = r._getNumber(e, t.DataParser.TYPE, 0)
            }
            if (i.frameRate === 0) {
                i.frameRate = 24
            }
            this._armature = i;
            if (t.DataParser.CANVAS in e) {
                var n = e[t.DataParser.CANVAS];
                var s = t.BaseObject.borrowObject(t.CanvasData);
                if (t.DataParser.COLOR in n) {
                    s.hasBackground = true
                } else {
                    s.hasBackground = false
                }
                s.color = r._getNumber(n, t.DataParser.COLOR, 0);
                s.x = r._getNumber(n, t.DataParser.X, 0) * i.scale;
                s.y = r._getNumber(n, t.DataParser.Y, 0) * i.scale;
                s.width = r._getNumber(n, t.DataParser.WIDTH, 0) * i.scale;
                s.height = r._getNumber(n, t.DataParser.HEIGHT, 0) * i.scale;
                i.canvas = s
            }
            if (t.DataParser.AABB in e) {
                var o = e[t.DataParser.AABB];
                i.aabb.x = r._getNumber(o, t.DataParser.X, 0) * i.scale;
                i.aabb.y = r._getNumber(o, t.DataParser.Y, 0) * i.scale;
                i.aabb.width = r._getNumber(o, t.DataParser.WIDTH, 0) * i.scale;
                i.aabb.height = r._getNumber(o, t.DataParser.HEIGHT, 0) * i.scale
            }
            if (t.DataParser.BONE in e) {
                var l = e[t.DataParser.BONE];
                for (var h = 0, f = l; h < f.length; h++) {
                    var u = f[h];
                    var _ = r._getString(u, t.DataParser.PARENT, "");
                    var c = this._parseBone(u);
                    if (_.length > 0) {
                        var p = i.getBone(_);
                        if (p !== null) {
                            c.parent = p
                        } else {
                            if (!(_ in this._cacheBones)) {
                                this._cacheBones[_] = []
                            }
                            this._cacheBones[_].push(c)
                        }
                    }
                    if (c.name in this._cacheBones) {
                        for (var m = 0, d = this._cacheBones[c.name]; m < d.length; m++) {
                            var v = d[m];
                            v.parent = c
                        }
                        delete this._cacheBones[c.name]
                    }
                    i.addBone(c);
                    this._rawBones.push(c)
                }
            }
            if (t.DataParser.IK in e) {
                var y = e[t.DataParser.IK];
                for (var g = 0, b = y; g < b.length; g++) {
                    var D = b[g];
                    var T = this._parseIKConstraint(D);
                    if (T) {
                        i.addConstraint(T)
                    }
                }
            }
            i.sortBones();
            if (t.DataParser.SLOT in e) {
                var A = 0;
                var x = e[t.DataParser.SLOT];
                for (var P = 0, O = x; P < O.length; P++) {
                    var S = O[P];
                    i.addSlot(this._parseSlot(S, A++))
                }
            }
            if (t.DataParser.SKIN in e) {
                var E = e[t.DataParser.SKIN];
                for (var M = 0, B = E; M < B.length; M++) {
                    var C = B[M];
                    i.addSkin(this._parseSkin(C))
                }
            }
            if (t.DataParser.PATH_CONSTRAINT in e) {
                var w = e[t.DataParser.PATH_CONSTRAINT];
                for (var I = 0, F = w; I < F.length; I++) {
                    var N = F[I];
                    var T = this._parsePathConstraint(N);
                    if (T) {
                        i.addConstraint(T)
                    }
                }
            }
            for (var R = 0, k = this._cacheRawMeshes.length; R < k; ++R) {
                var j = this._cacheRawMeshes[R];
                if (!(t.DataParser.GLUE_WEIGHTS in j) || !(t.DataParser.GLUE_MESHES in j)) {
                    continue
                }
                this._parseMeshGlue(j, this._cacheMeshes[R])
            }
            for (var R = 0, k = this._cacheRawMeshes.length; R < k; ++R) {
                var L = this._cacheRawMeshes[R];
                var V = r._getString(L, t.DataParser.SHARE, "");
                if (V.length === 0) {
                    continue
                }
                var U = r._getString(L, t.DataParser.SKIN, t.DataParser.DEFAULT_NAME);
                if (U.length === 0) {
                    U = t.DataParser.DEFAULT_NAME
                }
                var Y = i.getMesh(U, "", V);
                if (Y === null) {
                    continue
                }
                var X = this._cacheMeshes[R];
                X.vertices.shareFrom(Y.vertices)
            }
            if (t.DataParser.ANIMATION in e) {
                var H = e[t.DataParser.ANIMATION];
                for (var $ = 0, G = H; $ < G.length; $++) {
                    var W = G[$];
                    var z = this._parseAnimation(W);
                    i.addAnimation(z)
                }
            }
            if (t.DataParser.DEFAULT_ACTIONS in e) {
                var K = this._parseActionData(e[t.DataParser.DEFAULT_ACTIONS], 0, null, null);
                for (var Z = 0, q = K; Z < q.length; Z++) {
                    var J = q[Z];
                    i.addAction(J, true);
                    if (J.type === 0) {
                        var z = i.getAnimation(J.name);
                        if (z !== null) {
                            i.defaultAnimation = z
                        }
                    }
                }
            }
            if (t.DataParser.ACTIONS in e) {
                var K = this._parseActionData(e[t.DataParser.ACTIONS], 0, null, null);
                for (var Q = 0, tt = K; Q < tt.length; Q++) {
                    var J = tt[Q];
                    i.addAction(J, false)
                }
            }
            this._rawBones.length = 0;
            this._cacheRawMeshes.length = 0;
            this._cacheMeshes.length = 0;
            this._armature = null;
            for (var et in this._weightSlotPose) {
                delete this._weightSlotPose[et]
            }
            for (var et in this._weightBonePoses) {
                delete this._weightBonePoses[et]
            }
            for (var et in this._cacheBones) {
                delete this._cacheBones[et]
            }
            for (var et in this._slotChildActions) {
                delete this._slotChildActions[et]
            }
            return i
        };
        r.prototype._parseBone = function(e) {
            var a = 0;
            var i = this._armature.scale;
            if (t.DataParser.TYPE in e && typeof e[t.DataParser.TYPE] === "string") {
                a = t.DataParser._getBoneType(e[t.DataParser.TYPE])
            } else {
                a = r._getNumber(e, t.DataParser.TYPE, 0)
            }
            if (a === 0) {
                var n = t.BaseObject.borrowObject(t.BoneData);
                n.inheritTranslation = r._getBoolean(e, t.DataParser.INHERIT_TRANSLATION, true);
                n.inheritRotation = r._getBoolean(e, t.DataParser.INHERIT_ROTATION, true);
                n.inheritScale = r._getBoolean(e, t.DataParser.INHERIT_SCALE, true);
                n.inheritReflection = r._getBoolean(e, t.DataParser.INHERIT_REFLECTION, true);
                n.length = r._getNumber(e, t.DataParser.LENGTH, 0) * i;
                n.name = r._getString(e, t.DataParser.NAME, "");
                if (t.DataParser.TRANSFORM in e) {
                    this._parseTransform(e[t.DataParser.TRANSFORM], n.transform, i)
                }
                return n
            }
            var s = t.BaseObject.borrowObject(t.SurfaceData);
            s.name = r._getString(e, t.DataParser.NAME, "");
            s.segmentX = r._getNumber(e, t.DataParser.SEGMENT_X, 0);
            s.segmentY = r._getNumber(e, t.DataParser.SEGMENT_Y, 0);
            s.vertices.length = (s.segmentX + 1) * (s.segmentY + 1) * 2;
            if (t.DataParser.VERTICES in e) {
                var o = e[t.DataParser.VERTICES];
                for (var l = 0, h = s.vertices.length; l < h; ++l) {
                    if (l < o.length) {
                        s.vertices[l] = o[l] * i
                    } else {
                        s.vertices[l] = 0
                    }
                }
            }
            return s
        };
        r.prototype._parseIKConstraint = function(e) {
            var a = this._armature.getBone(r._getString(e, t.DataParser.BONE, ""));
            if (a === null) {
                return null
            }
            var i = this._armature.getBone(r._getString(e, t.DataParser.TARGET, ""));
            if (i === null) {
                return null
            }
            var n = t.BaseObject.borrowObject(t.IKConstraintData);
            n.scaleEnabled = r._getBoolean(e, t.DataParser.SCALE, false);
            n.bendPositive = r._getBoolean(e, t.DataParser.BEND_POSITIVE, true);
            n.weight = r._getNumber(e, t.DataParser.WEIGHT, 1);
            n.name = r._getString(e, t.DataParser.NAME, "");
            n.type = 0;
            n.target = i;
            var s = r._getNumber(e, t.DataParser.CHAIN, 0);
            if (s > 0 && a.parent !== null) {
                n.root = a.parent;
                n.bone = a
            } else {
                n.root = a;
                n.bone = null
            }
            return n
        };
        r.prototype._parsePathConstraint = function(e) {
            var a = this._armature.getSlot(r._getString(e, t.DataParser.TARGET, ""));
            if (a === null) {
                return null
            }
            var i = this._armature.defaultSkin;
            if (i === null) {
                return null
            }
            var n = i.getDisplay(a.name, r._getString(e, t.DataParser.TARGET_DISPLAY, a.name));
            if (n === null || !(n instanceof t.PathDisplayData)) {
                return null
            }
            var s = e[t.DataParser.BONES];
            if (s === null || s.length === 0) {
                return null
            }
            var o = t.BaseObject.borrowObject(t.PathConstraintData);
            o.name = r._getString(e, t.DataParser.NAME, "");
            o.type = 1;
            o.pathSlot = a;
            o.pathDisplayData = n;
            o.target = a.parent;
            o.positionMode = t.DataParser._getPositionMode(r._getString(e, t.DataParser.POSITION_MODE, ""));
            o.spacingMode = t.DataParser._getSpacingMode(r._getString(e, t.DataParser.SPACING_MODE, ""));
            o.rotateMode = t.DataParser._getRotateMode(r._getString(e, t.DataParser.ROTATE_MODE, ""));
            o.position = r._getNumber(e, t.DataParser.POSITION, 0);
            o.spacing = r._getNumber(e, t.DataParser.SPACING, 0);
            o.rotateOffset = r._getNumber(e, t.DataParser.ROTATE_OFFSET, 0);
            o.rotateMix = r._getNumber(e, t.DataParser.ROTATE_MIX, 1);
            o.translateMix = r._getNumber(e, t.DataParser.TRANSLATE_MIX, 1);
            for (var l = 0, h = s; l < h.length; l++) {
                var f = h[l];
                var u = this._armature.getBone(f);
                if (u !== null) {
                    o.AddBone(u);
                    if (o.root === null) {
                        o.root = u
                    }
                }
            }
            return o
        };
        r.prototype._parseSlot = function(e, a) {
            var i = t.BaseObject.borrowObject(t.SlotData);
            i.displayIndex = r._getNumber(e, t.DataParser.DISPLAY_INDEX, 0);
            i.zOrder = a;
            i.name = r._getString(e, t.DataParser.NAME, "");
            i.parent = this._armature.getBone(r._getString(e, t.DataParser.PARENT, ""));
            if (t.DataParser.BLEND_MODE in e && typeof e[t.DataParser.BLEND_MODE] === "string") {
                i.blendMode = t.DataParser._getBlendMode(e[t.DataParser.BLEND_MODE])
            } else {
                i.blendMode = r._getNumber(e, t.DataParser.BLEND_MODE, 0)
            }
            if (t.DataParser.COLOR in e) {
                i.color = t.SlotData.createColor();
                this._parseColorTransform(e[t.DataParser.COLOR], i.color)
            } else {
                i.color = t.SlotData.DEFAULT_COLOR
            }
            if (t.DataParser.ACTIONS in e) {
                this._slotChildActions[i.name] = this._parseActionData(e[t.DataParser.ACTIONS], 0, null, null)
            }
            return i
        };
        r.prototype._parseSkin = function(e) {
            var a = t.BaseObject.borrowObject(t.SkinData);
            a.name = r._getString(e, t.DataParser.NAME, t.DataParser.DEFAULT_NAME);
            if (a.name.length === 0) {
                a.name = t.DataParser.DEFAULT_NAME
            }
            if (t.DataParser.SLOT in e) {
                var i = e[t.DataParser.SLOT];
                this._skin = a;
                for (var n = 0, s = i; n < s.length; n++) {
                    var o = s[n];
                    var l = r._getString(o, t.DataParser.NAME, "");
                    var h = this._armature.getSlot(l);
                    if (h !== null) {
                        this._slot = h;
                        if (t.DataParser.DISPLAY in o) {
                            var f = o[t.DataParser.DISPLAY];
                            for (var u = 0, _ = f; u < _.length; u++) {
                                var c = _[u];
                                if (c) {
                                    a.addDisplay(l, this._parseDisplay(c))
                                } else {
                                    a.addDisplay(l, null)
                                }
                            }
                        }
                        this._slot = null
                    }
                }
                this._skin = null
            }
            return a
        };
        r.prototype._parseDisplay = function(e) {
            var a = r._getString(e, t.DataParser.NAME, "");
            var i = r._getString(e, t.DataParser.PATH, "");
            var n = 0;
            var s = null;
            if (t.DataParser.TYPE in e && typeof e[t.DataParser.TYPE] === "string") {
                n = t.DataParser._getDisplayType(e[t.DataParser.TYPE])
            } else {
                n = r._getNumber(e, t.DataParser.TYPE, n)
            }
            switch (n) {
                case 0:
                    var o = s = t.BaseObject.borrowObject(t.ImageDisplayData);
                    o.name = a;
                    o.path = i.length > 0 ? i : a;
                    this._parsePivot(e, o);
                    break;
                case 1:
                    var l = s = t.BaseObject.borrowObject(t.ArmatureDisplayData);
                    l.name = a;
                    l.path = i.length > 0 ? i : a;
                    l.inheritAnimation = true;
                    if (t.DataParser.ACTIONS in e) {
                        var h = this._parseActionData(e[t.DataParser.ACTIONS], 0, null, null);
                        for (var f = 0, u = h; f < u.length; f++) {
                            var _ = u[f];
                            l.addAction(_)
                        }
                    } else if (this._slot.name in this._slotChildActions) {
                        var c = this._skin.getDisplays(this._slot.name);
                        if (c === null ? this._slot.displayIndex === 0 : this._slot.displayIndex === c.length) {
                            for (var p = 0, m = this._slotChildActions[this._slot.name]; p < m.length; p++) {
                                var _ = m[p];
                                l.addAction(_)
                            }
                            delete this._slotChildActions[this._slot.name]
                        }
                    }
                    break;
                case 2:
                    var d = s = t.BaseObject.borrowObject(t.MeshDisplayData);
                    d.vertices.inheritDeform = r._getBoolean(e, t.DataParser.INHERIT_DEFORM, true);
                    d.name = a;
                    d.path = i.length > 0 ? i : a;
                    d.vertices.data = this._data;
                    if (t.DataParser.SHARE in e) {
                        this._cacheRawMeshes.push(e);
                        this._cacheMeshes.push(d)
                    } else {
                        this._parseMesh(e, d)
                    }
                    if (t.DataParser.GLUE_WEIGHTS in e && t.DataParser.GLUE_MESHES in e) {
                        this._cacheRawMeshes.push(e);
                        this._cacheMeshes.push(d)
                    }
                    break;
                case 3:
                    var v = this._parseBoundingBox(e);
                    if (v !== null) {
                        var y = s = t.BaseObject.borrowObject(t.BoundingBoxDisplayData);
                        y.name = a;
                        y.path = i.length > 0 ? i : a;
                        y.boundingBox = v
                    }
                    break;
                case 4:
                    var g = e[t.DataParser.LENGTHS];
                    var b = s = t.BaseObject.borrowObject(t.PathDisplayData);
                    b.closed = r._getBoolean(e, t.DataParser.CLOSED, false);
                    b.constantSpeed = r._getBoolean(e, t.DataParser.CONSTANT_SPEED, false);
                    b.name = a;
                    b.path = i.length > 0 ? i : a;
                    b.vertices.data = this._data;
                    b.curveLengths.length = g.length;
                    for (var D = 0, T = g.length; D < T; ++D) {
                        b.curveLengths[D] = g[D]
                    }
                    this._parsePath(e, b);
                    break
            }
            if (s !== null && t.DataParser.TRANSFORM in e) {
                this._parseTransform(e[t.DataParser.TRANSFORM], s.transform, this._armature.scale)
            }
            return s
        };
        r.prototype._parsePath = function(e, a) {
            var i = e[t.DataParser.VERTICES];
            var n = r._getNumber(e, t.DataParser.VERTEX_COUNT, 0);
            var s = this._floatArray.length;
            var o = this._intArray.length;
            a.vertices.offset = o;
            this._intArray.length += 1 + 1;
            this._intArray[o + 0] = n;
            this._intArray[o + 2] = s;
            if (!(t.DataParser.WEIGHTS in e)) {
                this._floatArray.length += i.length;
                for (var l = 0, h = i.length; l < h; ++l) {
                    this._floatArray[s + l] = i[l]
                }
            } else {
                var f = e[t.DataParser.WEIGHTS];
                var u = e[t.DataParser.BONES];
                var _ = u.length;
                var c = Math.floor(f.length - n) / 2;
                var p = this._intArray.length;
                var m = this._floatArray.length;
                var d = this._armature.sortedBones;
                var v = t.BaseObject.borrowObject(t.WeightData);
                v.count = c;
                v.offset = p;
                this._intArray.length += 1 + 1 + _ + n + c;
                this._intArray[p + 0] = _;
                this._intArray[p + 1] = m;
                for (var l = 0; l < _; l++) {
                    var y = u[l];
                    var g = this._rawBones[y];
                    v.addBone(g);
                    this._intArray[p + 2 + l] = d.indexOf(g)
                }
                this._floatArray.length += c * 3;
                for (var l = 0, b = 0, D = 0, T = p + 2 + _, A = m; l < c; l++) {
                    var x = f[b++];
                    this._intArray[T++] = x;
                    for (var P = 0; P < x; P++) {
                        var O = f[b++];
                        var S = f[b++];
                        var E = i[D++];
                        var M = i[D++];
                        this._intArray[T++] = u.indexOf(O);
                        this._floatArray[A++] = S;
                        this._floatArray[A++] = E;
                        this._floatArray[A++] = M
                    }
                }
                a.vertices.weight = v
            }
        };
        r.prototype._parsePivot = function(e, a) {
            if (t.DataParser.PIVOT in e) {
                var i = e[t.DataParser.PIVOT];
                a.pivot.x = r._getNumber(i, t.DataParser.X, 0);
                a.pivot.y = r._getNumber(i, t.DataParser.Y, 0)
            } else {
                a.pivot.x = .5;
                a.pivot.y = .5
            }
        };
        r.prototype._parseMesh = function(e, a) {
            var r = e[t.DataParser.VERTICES];
            var i = e[t.DataParser.UVS];
            var n = e[t.DataParser.TRIANGLES];
            var s = Math.floor(r.length / 2);
            var o = Math.floor(n.length / 3);
            var l = this._floatArray.length;
            var h = l + s * 2;
            var f = this._intArray.length;
            var u = this._skin.name + "_" + this._slot.name + "_" + a.name;
            a.vertices.offset = f;
            this._intArray.length += 1 + 1 + 1 + 1 + o * 3;
            this._intArray[f + 0] = s;
            this._intArray[f + 1] = o;
            this._intArray[f + 2] = l;
            for (var _ = 0, c = o * 3; _ < c; ++_) {
                this._intArray[f + 4 + _] = n[_]
            }
            this._floatArray.length += s * 2 + s * 2;
            for (var _ = 0, c = s * 2; _ < c; ++_) {
                this._floatArray[l + _] = r[_];
                this._floatArray[h + _] = i[_]
            }
            if (t.DataParser.WEIGHTS in e) {
                var p = e[t.DataParser.WEIGHTS];
                var m = e[t.DataParser.SLOT_POSE];
                var d = e[t.DataParser.BONE_POSE];
                var v = this._armature.sortedBones;
                var y = new Array;
                var g = Math.floor(d.length / 7);
                var b = this._floatArray.length;
                var D = Math.floor(p.length - s) / 2;
                var T = this._intArray.length;
                var A = t.BaseObject.borrowObject(t.WeightData);
                A.count = D;
                A.offset = T;
                y.length = g;
                this._intArray.length += 1 + 1 + g + s + D;
                this._intArray[T + 1] = b;
                for (var _ = 0; _ < g; ++_) {
                    var x = d[_ * 7];
                    var P = this._rawBones[x];
                    A.addBone(P);
                    y[_] = x;
                    this._intArray[T + 2 + _] = v.indexOf(P)
                }
                this._floatArray.length += D * 3;
                this._helpMatrixA.copyFromArray(m, 0);
                for (var _ = 0, O = 0, S = T + 2 + g, E = b; _ < s; ++_) {
                    var M = _ * 2;
                    var B = this._intArray[S++] = p[O++];
                    var C = this._floatArray[l + M];
                    var w = this._floatArray[l + M + 1];
                    this._helpMatrixA.transformPoint(C, w, this._helpPoint);
                    C = this._helpPoint.x;
                    w = this._helpPoint.y;
                    for (var I = 0; I < B; ++I) {
                        var x = p[O++];
                        var F = y.indexOf(x);
                        this._helpMatrixB.copyFromArray(d, F * 7 + 1);
                        this._helpMatrixB.invert();
                        this._helpMatrixB.transformPoint(C, w, this._helpPoint);
                        this._intArray[S++] = F;
                        this._floatArray[E++] = p[O++];
                        this._floatArray[E++] = this._helpPoint.x;
                        this._floatArray[E++] = this._helpPoint.y
                    }
                }
                a.vertices.weight = A;
                this._weightSlotPose[u] = m;
                this._weightBonePoses[u] = d
            }
        };
        r.prototype._parseMeshGlue = function(t, e) {
            t;
            e
        };
        r.prototype._parseBoundingBox = function(e) {
            var a = null;
            var i = 0;
            if (t.DataParser.SUB_TYPE in e && typeof e[t.DataParser.SUB_TYPE] === "string") {
                i = t.DataParser._getBoundingBoxType(e[t.DataParser.SUB_TYPE])
            } else {
                i = r._getNumber(e, t.DataParser.SUB_TYPE, i)
            }
            switch (i) {
                case 0:
                    a = t.BaseObject.borrowObject(t.RectangleBoundingBoxData);
                    break;
                case 1:
                    a = t.BaseObject.borrowObject(t.EllipseBoundingBoxData);
                    break;
                case 2:
                    a = this._parsePolygonBoundingBox(e);
                    break
            }
            if (a !== null) {
                a.color = r._getNumber(e, t.DataParser.COLOR, 0);
                if (a.type === 0 || a.type === 1) {
                    a.width = r._getNumber(e, t.DataParser.WIDTH, 0);
                    a.height = r._getNumber(e, t.DataParser.HEIGHT, 0)
                }
            }
            return a
        };
        r.prototype._parsePolygonBoundingBox = function(e) {
            var a = t.BaseObject.borrowObject(t.PolygonBoundingBoxData);
            if (t.DataParser.VERTICES in e) {
                var r = this._armature.scale;
                var i = e[t.DataParser.VERTICES];
                var n = a.vertices;
                if (t.DragonBones.webAssembly) {
                    n.resize(i.length, 0)
                } else {
                    n.length = i.length
                }
                for (var s = 0, o = i.length; s < o; s += 2) {
                    var l = i[s] * r;
                    var h = i[s + 1] * r;
                    if (t.DragonBones.webAssembly) {
                        n.set(s, l);
                        n.set(s + 1, h)
                    } else {
                        n[s] = l;
                        n[s + 1] = h
                    }
                    if (s === 0) {
                        a.x = l;
                        a.y = h;
                        a.width = l;
                        a.height = h
                    } else {
                        if (l < a.x) {
                            a.x = l
                        } else if (l > a.width) {
                            a.width = l
                        }
                        if (h < a.y) {
                            a.y = h
                        } else if (h > a.height) {
                            a.height = h
                        }
                    }
                }
                a.width -= a.x;
                a.height -= a.y
            } else {
                console.warn("Data error.\n Please reexport DragonBones Data to fixed the bug.")
            }
            return a
        };
        r.prototype._parseAnimation = function(e) {
            var a = t.BaseObject.borrowObject(t.AnimationData);
            a.frameCount = Math.max(r._getNumber(e, t.DataParser.DURATION, 1), 1);
            a.playTimes = r._getNumber(e, t.DataParser.PLAY_TIMES, 1);
            a.duration = a.frameCount / this._armature.frameRate;
            a.fadeInTime = r._getNumber(e, t.DataParser.FADE_IN_TIME, 0);
            a.scale = r._getNumber(e, t.DataParser.SCALE, 1);
            a.name = r._getString(e, t.DataParser.NAME, t.DataParser.DEFAULT_NAME);
            if (a.name.length === 0) {
                a.name = t.DataParser.DEFAULT_NAME
            }
            a.frameIntOffset = this._frameIntArray.length;
            a.frameFloatOffset = this._frameFloatArray.length;
            a.frameOffset = this._frameArray.length;
            this._animation = a;
            if (t.DataParser.FRAME in e) {
                var i = e[t.DataParser.FRAME];
                var n = i.length;
                if (n > 0) {
                    for (var s = 0, o = 0; s < n; ++s) {
                        var l = i[s];
                        this._parseActionDataInFrame(l, o, null, null);
                        o += r._getNumber(l, t.DataParser.DURATION, 1)
                    }
                }
            }
            if (t.DataParser.Z_ORDER in e) {
                this._animation.zOrderTimeline = this._parseTimeline(e[t.DataParser.Z_ORDER], null, t.DataParser.FRAME, 1, false, false, 0, this._parseZOrderFrame)
            }
            if (t.DataParser.BONE in e) {
                var h = e[t.DataParser.BONE];
                for (var f = 0, u = h; f < u.length; f++) {
                    var _ = u[f];
                    this._parseBoneTimeline(_)
                }
            }
            if (t.DataParser.SURFACE in e) {
                var h = e[t.DataParser.SURFACE];
                for (var c = 0, p = h; c < p.length; c++) {
                    var _ = p[c];
                    var m = r._getString(_, t.DataParser.NAME, "");
                    this._surface = this._armature.getBone(m);
                    if (this._surface === null) {
                        continue
                    }
                    var d = this._parseTimeline(_, null, t.DataParser.FRAME, 50, false, true, 0, this._parseSurfaceFrame);
                    if (d !== null) {
                        this._animation.addSurfaceTimeline(this._surface, d)
                    }
                    this._surface = null
                }
            }
            if (t.DataParser.SLOT in e) {
                var h = e[t.DataParser.SLOT];
                for (var v = 0, y = h; v < y.length; v++) {
                    var _ = y[v];
                    this._parseSlotTimeline(_)
                }
            }
            if (t.DataParser.FFD in e) {
                var h = e[t.DataParser.FFD];
                for (var g = 0, b = h; g < b.length; g++) {
                    var _ = b[g];
                    var D = r._getString(_, t.DataParser.SKIN, t.DataParser.DEFAULT_NAME);
                    var T = r._getString(_, t.DataParser.SLOT, "");
                    var A = r._getString(_, t.DataParser.NAME, "");
                    if (D.length === 0) {
                        D = t.DataParser.DEFAULT_NAME
                    }
                    this._slot = this._armature.getSlot(T);
                    this._mesh = this._armature.getMesh(D, T, A);
                    if (this._slot === null || this._mesh === null) {
                        continue
                    }
                    var d = this._parseTimeline(_, null, t.DataParser.FRAME, 22, false, true, 0, this._parseSlotFFDFrame);
                    if (d !== null) {
                        this._animation.addSlotTimeline(this._slot, d)
                    }
                    this._slot = null;
                    this._mesh = null
                }
            }
            if (t.DataParser.IK in e) {
                var h = e[t.DataParser.IK];
                for (var x = 0, P = h; x < P.length; x++) {
                    var _ = P[x];
                    var O = r._getString(_, t.DataParser.NAME, "");
                    var S = this._armature.getConstraint(O);
                    if (S === null) {
                        continue
                    }
                    var d = this._parseTimeline(_, null, t.DataParser.FRAME, 30, true, false, 2, this._parseIKConstraintFrame);
                    if (d !== null) {
                        this._animation.addConstraintTimeline(S, d)
                    }
                }
            }
            if (t.DataParser.ANIMATION in e) {
                var h = e[t.DataParser.ANIMATION];
                for (var E = 0, M = h; E < M.length; E++) {
                    var _ = M[E];
                    var B = r._getString(_, t.DataParser.NAME, "");
                    var d = this._parseTimeline(_, null, t.DataParser.FRAME, 40, true, false, 2, this._parseAnimationFrame);
                    if (d !== null) {
                        this._animation.addAnimationTimeline(B, d)
                    }
                }
            }
            if (this._actionFrames.length > 0) {
                this._animation.actionTimeline = this._parseTimeline(null, this._actionFrames, "", 0, false, false, 0, this._parseActionFrame);
                this._actionFrames.length = 0
            }
            this._animation = null;
            return a
        };
        r.prototype._parseTimeline = function(e, i, n, s, o, l, h, f) {
            if (e !== null && n.length > 0 && n in e) {
                i = e[n]
            }
            if (i === null) {
                return null
            }
            var u = i.length;
            if (u === 0) {
                return null
            }
            var _ = this._frameIntArray.length;
            var c = this._frameFloatArray.length;
            var p = t.BaseObject.borrowObject(t.TimelineData);
            var m = this._timelineArray.length;
            this._timelineArray.length += 1 + 1 + 1 + 1 + 1 + u;
            if (e !== null) {
                this._timelineArray[m + 0] = Math.round(r._getNumber(e, t.DataParser.SCALE, 1) * 100);
                this._timelineArray[m + 1] = Math.round(r._getNumber(e, t.DataParser.OFFSET, 0) * 100)
            } else {
                this._timelineArray[m + 0] = 100;
                this._timelineArray[m + 1] = 0
            }
            this._timelineArray[m + 2] = u;
            this._timelineArray[m + 3] = h;
            if (o) {
                this._timelineArray[m + 4] = _ - this._animation.frameIntOffset
            } else if (l) {
                this._timelineArray[m + 4] = c - this._animation.frameFloatOffset
            } else {
                this._timelineArray[m + 4] = 0
            }
            this._timeline = p;
            p.type = s;
            p.offset = m;
            if (u === 1) {
                p.frameIndicesOffset = -1;
                this._timelineArray[m + 5 + 0] = f.call(this, i[0], 0, 0) - this._animation.frameOffset
            } else {
                var d = this._animation.frameCount + 1;
                var v = this._data.frameIndices;
                var y = 0;
                if (t.DragonBones.webAssembly) {
                    y = v.size();
                    v.resize(y + d, 0)
                } else {
                    y = v.length;
                    v.length += d
                }
                p.frameIndicesOffset = y;
                for (var g = 0, b = 0, D = 0, T = 0; g < d; ++g) {
                    if (D + T <= g && b < u) {
                        var A = i[b];
                        D = g;
                        if (b === u - 1) {
                            T = this._animation.frameCount - D
                        } else {
                            if (A instanceof a) {
                                T = this._actionFrames[b + 1].frameStart - D
                            } else {
                                T = r._getNumber(A, t.DataParser.DURATION, 1)
                            }
                        }
                        this._timelineArray[m + 5 + b] = f.call(this, A, D, T) - this._animation.frameOffset;
                        b++
                    }
                    if (t.DragonBones.webAssembly) {
                        v.set(y + g, b - 1)
                    } else {
                        v[y + g] = b - 1
                    }
                }
            }
            this._timeline = null;
            return p
        };
        r.prototype._parseBoneTimeline = function(e) {
            var a = this._armature.getBone(r._getString(e, t.DataParser.NAME, ""));
            if (a === null) {
                return
            }
            this._bone = a;
            this._slot = this._armature.getSlot(this._bone.name);
            if (t.DataParser.TRANSLATE_FRAME in e) {
                var i = this._parseTimeline(e, null, t.DataParser.TRANSLATE_FRAME, 11, false, true, 2, this._parseBoneTranslateFrame);
                if (i !== null) {
                    this._animation.addBoneTimeline(a, i)
                }
            }
            if (t.DataParser.ROTATE_FRAME in e) {
                var i = this._parseTimeline(e, null, t.DataParser.ROTATE_FRAME, 12, false, true, 2, this._parseBoneRotateFrame);
                if (i !== null) {
                    this._animation.addBoneTimeline(a, i)
                }
            }
            if (t.DataParser.SCALE_FRAME in e) {
                var i = this._parseTimeline(e, null, t.DataParser.SCALE_FRAME, 13, false, true, 2, this._parseBoneScaleFrame);
                if (i !== null) {
                    this._animation.addBoneTimeline(a, i)
                }
            }
            if (t.DataParser.FRAME in e) {
                var i = this._parseTimeline(e, null, t.DataParser.FRAME, 10, false, true, 6, this._parseBoneAllFrame);
                if (i !== null) {
                    this._animation.addBoneTimeline(a, i)
                }
            }
            this._bone = null;
            this._slot = null
        };
        r.prototype._parseSlotTimeline = function(e) {
            var a = this._armature.getSlot(r._getString(e, t.DataParser.NAME, ""));
            if (a === null) {
                return
            }
            this._slot = a;
            var i = null;
            if (t.DataParser.DISPLAY_FRAME in e) {
                i = this._parseTimeline(e, null, t.DataParser.DISPLAY_FRAME, 20, false, false, 0, this._parseSlotDisplayFrame)
            } else {
                i = this._parseTimeline(e, null, t.DataParser.FRAME, 20, false, false, 0, this._parseSlotDisplayFrame)
            }
            if (i !== null) {
                this._animation.addSlotTimeline(a, i)
            }
            var n = null;
            if (t.DataParser.COLOR_FRAME in e) {
                n = this._parseTimeline(e, null, t.DataParser.COLOR_FRAME, 21, true, false, 1, this._parseSlotColorFrame)
            } else {
                n = this._parseTimeline(e, null, t.DataParser.FRAME, 21, true, false, 1, this._parseSlotColorFrame)
            }
            if (n !== null) {
                this._animation.addSlotTimeline(a, n)
            }
            this._slot = null
        };
        r.prototype._parseFrame = function(t, e, a) {
            t;
            a;
            var r = this._frameArray.length;
            this._frameArray.length += 1;
            this._frameArray[r + 0] = e;
            return r
        };
        r.prototype._parseTweenFrame = function(e, a, i) {
            var n = this._parseFrame(e, a, i);
            if (i > 0) {
                if (t.DataParser.CURVE in e) {
                    var s = i + 1;
                    this._helpArray.length = s;
                    this._samplingEasingCurve(e[t.DataParser.CURVE], this._helpArray);
                    this._frameArray.length += 1 + 1 + this._helpArray.length;
                    this._frameArray[n + 1] = 2;
                    this._frameArray[n + 2] = s;
                    for (var o = 0; o < s; ++o) {
                        this._frameArray[n + 3 + o] = Math.round(this._helpArray[o] * 1e4)
                    }
                } else {
                    var l = -2;
                    var h = l;
                    if (t.DataParser.TWEEN_EASING in e) {
                        h = r._getNumber(e, t.DataParser.TWEEN_EASING, l)
                    }
                    if (h === l) {
                        this._frameArray.length += 1;
                        this._frameArray[n + 1] = 0
                    } else if (h === 0) {
                        this._frameArray.length += 1;
                        this._frameArray[n + 1] = 1
                    } else if (h < 0) {
                        this._frameArray.length += 1 + 1;
                        this._frameArray[n + 1] = 3;
                        this._frameArray[n + 2] = Math.round(-h * 100)
                    } else if (h <= 1) {
                        this._frameArray.length += 1 + 1;
                        this._frameArray[n + 1] = 4;
                        this._frameArray[n + 2] = Math.round(h * 100)
                    } else {
                        this._frameArray.length += 1 + 1;
                        this._frameArray[n + 1] = 5;
                        this._frameArray[n + 2] = Math.round(h * 100 - 100)
                    }
                }
            } else {
                this._frameArray.length += 1;
                this._frameArray[n + 1] = 0
            }
            return n
        };
        r.prototype._parseActionFrame = function(t, e, a) {
            a;
            var r = this._frameArray.length;
            var i = t.actions.length;
            this._frameArray.length += 1 + 1 + i;
            this._frameArray[r + 0] = e;
            this._frameArray[r + 0 + 1] = i;
            for (var n = 0; n < i; ++n) {
                this._frameArray[r + 0 + 2 + n] = t.actions[n]
            }
            return r
        };
        r.prototype._parseZOrderFrame = function(e, a, r) {
            var i = this._parseFrame(e, a, r);
            if (t.DataParser.Z_ORDER in e) {
                var n = e[t.DataParser.Z_ORDER];
                if (n.length > 0) {
                    var s = this._armature.sortedSlots.length;
                    var o = new Array(s - n.length / 2);
                    var l = new Array(s);
                    for (var h = 0; h < o.length; ++h) {
                        o[h] = 0
                    }
                    for (var f = 0; f < s; ++f) {
                        l[f] = -1
                    }
                    var u = 0;
                    var _ = 0;
                    for (var c = 0, p = n.length; c < p; c += 2) {
                        var m = n[c];
                        var d = n[c + 1];
                        while (u !== m) {
                            o[_++] = u++
                        }
                        var v = u + d;
                        l[v] = u++
                    }
                    while (u < s) {
                        o[_++] = u++
                    }
                    this._frameArray.length += 1 + s;
                    this._frameArray[i + 1] = s;
                    var y = s;
                    while (y--) {
                        if (l[y] === -1) {
                            this._frameArray[i + 2 + y] = o[--_] || 0
                        } else {
                            this._frameArray[i + 2 + y] = l[y] || 0
                        }
                    }
                    return i
                }
            }
            this._frameArray.length += 1;
            this._frameArray[i + 1] = 0;
            return i
        };
        r.prototype._parseBoneAllFrame = function(e, a, i) {
            this._helpTransform.identity();
            if (t.DataParser.TRANSFORM in e) {
                this._parseTransform(e[t.DataParser.TRANSFORM], this._helpTransform, 1)
            }
            var n = this._helpTransform.rotation;
            if (a !== 0) {
                if (this._prevClockwise === 0) {
                    n = this._prevRotation + t.Transform.normalizeRadian(n - this._prevRotation)
                } else {
                    if (this._prevClockwise > 0 ? n >= this._prevRotation : n <= this._prevRotation) {
                        this._prevClockwise = this._prevClockwise > 0 ? this._prevClockwise - 1 : this._prevClockwise + 1
                    }
                    n = this._prevRotation + n - this._prevRotation + t.Transform.PI_D * this._prevClockwise
                }
            }
            this._prevClockwise = r._getNumber(e, t.DataParser.TWEEN_ROTATE, 0);
            this._prevRotation = n;
            var s = this._parseTweenFrame(e, a, i);
            var o = this._frameFloatArray.length;
            this._frameFloatArray.length += 6;
            this._frameFloatArray[o++] = this._helpTransform.x;
            this._frameFloatArray[o++] = this._helpTransform.y;
            this._frameFloatArray[o++] = n;
            this._frameFloatArray[o++] = this._helpTransform.skew;
            this._frameFloatArray[o++] = this._helpTransform.scaleX;
            this._frameFloatArray[o++] = this._helpTransform.scaleY;
            this._parseActionDataInFrame(e, a, this._bone, this._slot);
            return s
        };
        r.prototype._parseBoneTranslateFrame = function(e, a, i) {
            var n = this._parseTweenFrame(e, a, i);
            var s = this._frameFloatArray.length;
            this._frameFloatArray.length += 2;
            this._frameFloatArray[s++] = r._getNumber(e, t.DataParser.X, 0);
            this._frameFloatArray[s++] = r._getNumber(e, t.DataParser.Y, 0);
            return n
        };
        r.prototype._parseBoneRotateFrame = function(e, a, i) {
            var n = r._getNumber(e, t.DataParser.ROTATE, 0) * t.Transform.DEG_RAD;
            if (a !== 0) {
                if (this._prevClockwise === 0) {
                    n = this._prevRotation + t.Transform.normalizeRadian(n - this._prevRotation)
                } else {
                    if (this._prevClockwise > 0 ? n >= this._prevRotation : n <= this._prevRotation) {
                        this._prevClockwise = this._prevClockwise > 0 ? this._prevClockwise - 1 : this._prevClockwise + 1
                    }
                    n = this._prevRotation + n - this._prevRotation + t.Transform.PI_D * this._prevClockwise
                }
            }
            this._prevClockwise = r._getNumber(e, t.DataParser.CLOCK_WISE, 0);
            this._prevRotation = n;
            var s = this._parseTweenFrame(e, a, i);
            var o = this._frameFloatArray.length;
            this._frameFloatArray.length += 2;
            this._frameFloatArray[o++] = n;
            this._frameFloatArray[o++] = r._getNumber(e, t.DataParser.SKEW, 0) * t.Transform.DEG_RAD;
            return s
        };
        r.prototype._parseBoneScaleFrame = function(e, a, i) {
            var n = this._parseTweenFrame(e, a, i);
            var s = this._frameFloatArray.length;
            this._frameFloatArray.length += 2;
            this._frameFloatArray[s++] = r._getNumber(e, t.DataParser.X, 1);
            this._frameFloatArray[s++] = r._getNumber(e, t.DataParser.Y, 1);
            return n
        };
        r.prototype._parseSurfaceFrame = function(e, a, i) {
            var n = this._frameFloatArray.length;
            var s = this._parseTweenFrame(e, a, i);
            var o = e[t.DataParser.VERTICES];
            var l = r._getNumber(e, t.DataParser.OFFSET, 0);
            var h = this._surface.vertices.length / 2;
            var f = 0;
            var u = 0;
            this._frameFloatArray.length += h * 2;
            for (var _ = 0; _ < h * 2; _ += 2) {
                if (_ < l || _ - l >= o.length) {
                    f = 0
                } else {
                    f = o[_ - l]
                }
                if (_ + 1 < l || _ + 1 - l >= o.length) {
                    u = 0
                } else {
                    u = o[_ + 1 - l]
                }
                this._frameFloatArray[n + _] = f;
                this._frameFloatArray[n + _ + 1] = u
            }
            if (a === 0) {
                var c = this._frameIntArray.length;
                this._frameIntArray.length += 1 + 1 + 1 + 1 + 1;
                this._frameIntArray[c + 0] = 0;
                this._frameIntArray[c + 1] = this._frameFloatArray.length - n;
                this._frameIntArray[c + 2] = this._frameFloatArray.length - n;
                this._frameIntArray[c + 3] = 0;
                this._frameIntArray[c + 4] = n - this._animation.frameFloatOffset;
                this._timelineArray[this._timeline.offset + 3] = c - this._animation.frameIntOffset
            }
            return s
        };
        r.prototype._parseSlotDisplayFrame = function(e, a, i) {
            var n = this._parseFrame(e, a, i);
            this._frameArray.length += 1;
            if (t.DataParser.VALUE in e) {
                this._frameArray[n + 1] = r._getNumber(e, t.DataParser.VALUE, 0)
            } else {
                this._frameArray[n + 1] = r._getNumber(e, t.DataParser.DISPLAY_INDEX, 0)
            }
            this._parseActionDataInFrame(e, a, this._slot.parent, this._slot);
            return n
        };
        r.prototype._parseSlotColorFrame = function(e, a, r) {
            var i = this._parseTweenFrame(e, a, r);
            var n = -1;
            if (t.DataParser.VALUE in e || t.DataParser.COLOR in e) {
                var s = t.DataParser.VALUE in e ? e[t.DataParser.VALUE] : e[t.DataParser.COLOR];
                for (var o in s) {
                    o;
                    this._parseColorTransform(s, this._helpColorTransform);
                    n = this._intArray.length;
                    this._intArray.length += 8;
                    this._intArray[n++] = Math.round(this._helpColorTransform.alphaMultiplier * 100);
                    this._intArray[n++] = Math.round(this._helpColorTransform.redMultiplier * 100);
                    this._intArray[n++] = Math.round(this._helpColorTransform.greenMultiplier * 100);
                    this._intArray[n++] = Math.round(this._helpColorTransform.blueMultiplier * 100);
                    this._intArray[n++] = Math.round(this._helpColorTransform.alphaOffset);
                    this._intArray[n++] = Math.round(this._helpColorTransform.redOffset);
                    this._intArray[n++] = Math.round(this._helpColorTransform.greenOffset);
                    this._intArray[n++] = Math.round(this._helpColorTransform.blueOffset);
                    n -= 8;
                    break
                }
            }
            if (n < 0) {
                if (this._defaultColorOffset < 0) {
                    this._defaultColorOffset = n = this._intArray.length;
                    this._intArray.length += 8;
                    this._intArray[n++] = 100;
                    this._intArray[n++] = 100;
                    this._intArray[n++] = 100;
                    this._intArray[n++] = 100;
                    this._intArray[n++] = 0;
                    this._intArray[n++] = 0;
                    this._intArray[n++] = 0;
                    this._intArray[n++] = 0
                }
                n = this._defaultColorOffset
            }
            var l = this._frameIntArray.length;
            this._frameIntArray.length += 1;
            this._frameIntArray[l] = n;
            return i
        };
        r.prototype._parseSlotFFDFrame = function(e, a, i) {
            var n = this._frameFloatArray.length;
            var s = this._parseTweenFrame(e, a, i);
            var o = t.DataParser.VERTICES in e ? e[t.DataParser.VERTICES] : null;
            var l = r._getNumber(e, t.DataParser.OFFSET, 0);
            var h = this._intArray[this._mesh.vertices.offset + 0];
            var f = this._mesh.parent.name + "_" + this._slot.name + "_" + this._mesh.name;
            var u = this._mesh.vertices.weight;
            var _ = 0;
            var c = 0;
            var p = 0;
            var m = 0;
            if (u !== null) {
                var d = this._weightSlotPose[f];
                this._helpMatrixA.copyFromArray(d, 0);
                this._frameFloatArray.length += u.count * 2;
                p = u.offset + 2 + u.bones.length
            } else {
                this._frameFloatArray.length += h * 2
            }
            for (var v = 0; v < h * 2; v += 2) {
                if (o === null) {
                    _ = 0;
                    c = 0
                } else {
                    if (v < l || v - l >= o.length) {
                        _ = 0
                    } else {
                        _ = o[v - l]
                    }
                    if (v + 1 < l || v + 1 - l >= o.length) {
                        c = 0
                    } else {
                        c = o[v + 1 - l]
                    }
                }
                if (u !== null) {
                    var y = this._weightBonePoses[f];
                    var g = this._intArray[p++];
                    this._helpMatrixA.transformPoint(_, c, this._helpPoint, true);
                    _ = this._helpPoint.x;
                    c = this._helpPoint.y;
                    for (var b = 0; b < g; ++b) {
                        var D = this._intArray[p++];
                        this._helpMatrixB.copyFromArray(y, D * 7 + 1);
                        this._helpMatrixB.invert();
                        this._helpMatrixB.transformPoint(_, c, this._helpPoint, true);
                        this._frameFloatArray[n + m++] = this._helpPoint.x;
                        this._frameFloatArray[n + m++] = this._helpPoint.y
                    }
                } else {
                    this._frameFloatArray[n + v] = _;
                    this._frameFloatArray[n + v + 1] = c
                }
            }
            if (a === 0) {
                var T = this._frameIntArray.length;
                this._frameIntArray.length += 1 + 1 + 1 + 1 + 1;
                this._frameIntArray[T + 0] = this._mesh.vertices.offset;
                this._frameIntArray[T + 1] = this._frameFloatArray.length - n;
                this._frameIntArray[T + 2] = this._frameFloatArray.length - n;
                this._frameIntArray[T + 3] = 0;
                this._frameIntArray[T + 4] = n - this._animation.frameFloatOffset;
                this._timelineArray[this._timeline.offset + 3] = T - this._animation.frameIntOffset
            }
            return s
        };
        r.prototype._parseIKConstraintFrame = function(e, a, i) {
            var n = this._parseTweenFrame(e, a, i);
            var s = this._frameIntArray.length;
            this._frameIntArray.length += 2;
            this._frameIntArray[s++] = r._getBoolean(e, t.DataParser.BEND_POSITIVE, true) ? 1 : 0;
            this._frameIntArray[s++] = Math.round(r._getNumber(e, t.DataParser.WEIGHT, 1) * 100);
            return n
        };
        r.prototype._parseAnimationFrame = function(e, a, i) {
            var n = this._parseTweenFrame(e, a, i);
            var s = this._frameIntArray.length;
            this._frameIntArray.length += 2;
            this._frameIntArray[s++] = r._getNumber(e, t.DataParser.VALUE, 0);
            this._frameIntArray[s++] = Math.round(r._getNumber(e, t.DataParser.WEIGHT, 1) * 100);
            return n
        };
        r.prototype._parseActionData = function(e, a, i, n) {
            var s = new Array;
            if (typeof e === "string") {
                var o = t.BaseObject.borrowObject(t.ActionData);
                o.type = a;
                o.name = e;
                o.bone = i;
                o.slot = n;
                s.push(o)
            } else if (e instanceof Array) {
                for (var l = 0, h = e; l < h.length; l++) {
                    var f = h[l];
                    var o = t.BaseObject.borrowObject(t.ActionData);
                    if (t.DataParser.GOTO_AND_PLAY in f) {
                        o.type = 0;
                        o.name = r._getString(f, t.DataParser.GOTO_AND_PLAY, "")
                    } else {
                        if (t.DataParser.TYPE in f && typeof f[t.DataParser.TYPE] === "string") {
                            o.type = t.DataParser._getActionType(f[t.DataParser.TYPE])
                        } else {
                            o.type = r._getNumber(f, t.DataParser.TYPE, a)
                        }
                        o.name = r._getString(f, t.DataParser.NAME, "")
                    }
                    if (t.DataParser.BONE in f) {
                        var u = r._getString(f, t.DataParser.BONE, "");
                        o.bone = this._armature.getBone(u)
                    } else {
                        o.bone = i
                    }
                    if (t.DataParser.SLOT in f) {
                        var _ = r._getString(f, t.DataParser.SLOT, "");
                        o.slot = this._armature.getSlot(_)
                    } else {
                        o.slot = n
                    }
                    var c = null;
                    if (t.DataParser.INTS in f) {
                        if (c === null) {
                            c = t.BaseObject.borrowObject(t.UserData)
                        }
                        var p = f[t.DataParser.INTS];
                        for (var m = 0, d = p; m < d.length; m++) {
                            var v = d[m];
                            c.addInt(v)
                        }
                    }
                    if (t.DataParser.FLOATS in f) {
                        if (c === null) {
                            c = t.BaseObject.borrowObject(t.UserData)
                        }
                        var y = f[t.DataParser.FLOATS];
                        for (var g = 0, b = y; g < b.length; g++) {
                            var v = b[g];
                            c.addFloat(v)
                        }
                    }
                    if (t.DataParser.STRINGS in f) {
                        if (c === null) {
                            c = t.BaseObject.borrowObject(t.UserData)
                        }
                        var D = f[t.DataParser.STRINGS];
                        for (var T = 0, A = D; T < A.length; T++) {
                            var v = A[T];
                            c.addString(v)
                        }
                    }
                    o.data = c;
                    s.push(o)
                }
            }
            return s
        };
        r.prototype._parseTransform = function(e, a, i) {
            a.x = r._getNumber(e, t.DataParser.X, 0) * i;
            a.y = r._getNumber(e, t.DataParser.Y, 0) * i;
            if (t.DataParser.ROTATE in e || t.DataParser.SKEW in e) {
                a.rotation = t.Transform.normalizeRadian(r._getNumber(e, t.DataParser.ROTATE, 0) * t.Transform.DEG_RAD);
                a.skew = t.Transform.normalizeRadian(r._getNumber(e, t.DataParser.SKEW, 0) * t.Transform.DEG_RAD)
            } else if (t.DataParser.SKEW_X in e || t.DataParser.SKEW_Y in e) {
                a.rotation = t.Transform.normalizeRadian(r._getNumber(e, t.DataParser.SKEW_Y, 0) * t.Transform.DEG_RAD);
                a.skew = t.Transform.normalizeRadian(r._getNumber(e, t.DataParser.SKEW_X, 0) * t.Transform.DEG_RAD) - a.rotation
            }
            a.scaleX = r._getNumber(e, t.DataParser.SCALE_X, 1);
            a.scaleY = r._getNumber(e, t.DataParser.SCALE_Y, 1)
        };
        r.prototype._parseColorTransform = function(e, a) {
            a.alphaMultiplier = r._getNumber(e, t.DataParser.ALPHA_MULTIPLIER, 100) * .01;
            a.redMultiplier = r._getNumber(e, t.DataParser.RED_MULTIPLIER, 100) * .01;
            a.greenMultiplier = r._getNumber(e, t.DataParser.GREEN_MULTIPLIER, 100) * .01;
            a.blueMultiplier = r._getNumber(e, t.DataParser.BLUE_MULTIPLIER, 100) * .01;
            a.alphaOffset = r._getNumber(e, t.DataParser.ALPHA_OFFSET, 0);
            a.redOffset = r._getNumber(e, t.DataParser.RED_OFFSET, 0);
            a.greenOffset = r._getNumber(e, t.DataParser.GREEN_OFFSET, 0);
            a.blueOffset = r._getNumber(e, t.DataParser.BLUE_OFFSET, 0)
        };
        r.prototype._parseArray = function(t) {
            t;
            this._intArray.length = 0;
            this._floatArray.length = 0;
            this._frameIntArray.length = 0;
            this._frameFloatArray.length = 0;
            this._frameArray.length = 0;
            this._timelineArray.length = 0
        };
        r.prototype._modifyArray = function() {
            if (this._intArray.length % Int16Array.BYTES_PER_ELEMENT !== 0) {
                this._intArray.push(0)
            }
            if (this._frameIntArray.length % Int16Array.BYTES_PER_ELEMENT !== 0) {
                this._frameIntArray.push(0)
            }
            if (this._frameArray.length % Int16Array.BYTES_PER_ELEMENT !== 0) {
                this._frameArray.push(0)
            }
            if (this._timelineArray.length % Uint16Array.BYTES_PER_ELEMENT !== 0) {
                this._timelineArray.push(0)
            }
            var e = this._intArray.length * Int16Array.BYTES_PER_ELEMENT;
            var a = this._floatArray.length * Float32Array.BYTES_PER_ELEMENT;
            var r = this._frameIntArray.length * Int16Array.BYTES_PER_ELEMENT;
            var i = this._frameFloatArray.length * Float32Array.BYTES_PER_ELEMENT;
            var n = this._frameArray.length * Int16Array.BYTES_PER_ELEMENT;
            var s = this._timelineArray.length * Uint16Array.BYTES_PER_ELEMENT;
            var o = e + a + r + i + n + s;
            if (t.DragonBones.webAssembly) {
                var l = t.webAssemblyModule.HEAP16.buffer;
                var h = t.webAssemblyModule._malloc(o);
                var f = new Int16Array(l, h, this._intArray.length);
                var u = new Float32Array(l, h + e, this._floatArray.length);
                var _ = new Int16Array(l, h + e + a, this._frameIntArray.length);
                var c = new Float32Array(l, h + e + a + r, this._frameFloatArray.length);
                var p = new Int16Array(l, h + e + a + r + i, this._frameArray.length);
                var m = new Uint16Array(l, h + e + a + r + i + n, this._timelineArray.length);
                for (var d = 0, v = this._intArray.length; d < v; ++d) {
                    f[d] = this._intArray[d]
                }
                for (var d = 0, v = this._floatArray.length; d < v; ++d) {
                    u[d] = this._floatArray[d]
                }
                for (var d = 0, v = this._frameIntArray.length; d < v; ++d) {
                    _[d] = this._frameIntArray[d]
                }
                for (var d = 0, v = this._frameFloatArray.length; d < v; ++d) {
                    c[d] = this._frameFloatArray[d]
                }
                for (var d = 0, v = this._frameArray.length; d < v; ++d) {
                    p[d] = this._frameArray[d]
                }
                for (var d = 0, v = this._timelineArray.length; d < v; ++d) {
                    m[d] = this._timelineArray[d]
                }
                t.webAssemblyModule.setDataBinary(this._data, h, e, a, r, i, n, s)
            } else {
                var y = new ArrayBuffer(o);
                var f = new Int16Array(y, 0, this._intArray.length);
                var u = new Float32Array(y, e, this._floatArray.length);
                var _ = new Int16Array(y, e + a, this._frameIntArray.length);
                var c = new Float32Array(y, e + a + r, this._frameFloatArray.length);
                var p = new Int16Array(y, e + a + r + i, this._frameArray.length);
                var m = new Uint16Array(y, e + a + r + i + n, this._timelineArray.length);
                for (var d = 0, v = this._intArray.length; d < v; ++d) {
                    f[d] = this._intArray[d]
                }
                for (var d = 0, v = this._floatArray.length; d < v; ++d) {
                    u[d] = this._floatArray[d]
                }
                for (var d = 0, v = this._frameIntArray.length; d < v; ++d) {
                    _[d] = this._frameIntArray[d]
                }
                for (var d = 0, v = this._frameFloatArray.length; d < v; ++d) {
                    c[d] = this._frameFloatArray[d]
                }
                for (var d = 0, v = this._frameArray.length; d < v; ++d) {
                    p[d] = this._frameArray[d]
                }
                for (var d = 0, v = this._timelineArray.length; d < v; ++d) {
                    m[d] = this._timelineArray[d]
                }
                this._data.binary = y;
                this._data.intArray = f;
                this._data.floatArray = u;
                this._data.frameIntArray = _;
                this._data.frameFloatArray = c;
                this._data.frameArray = p;
                this._data.timelineArray = m
            }
            this._defaultColorOffset = -1
        };
        r.prototype.parseDragonBonesData = function(e, a) {
            if (a === void 0) {
                a = 1
            }
            console.assert(e !== null && e !== undefined, "Data error.");
            var i = r._getString(e, t.DataParser.VERSION, "");
            var n = r._getString(e, t.DataParser.COMPATIBLE_VERSION, "");
            if (t.DataParser.DATA_VERSIONS.indexOf(i) >= 0 || t.DataParser.DATA_VERSIONS.indexOf(n) >= 0) {
                var s = t.BaseObject.borrowObject(t.DragonBonesData);
                s.version = i;
                s.name = r._getString(e, t.DataParser.NAME, "");
                s.frameRate = r._getNumber(e, t.DataParser.FRAME_RATE, 24);
                if (s.frameRate === 0) {
                    s.frameRate = 24
                }
                if (t.DataParser.ARMATURE in e) {
                    this._data = s;
                    this._parseArray(e);
                    var o = e[t.DataParser.ARMATURE];
                    for (var l = 0, h = o; l < h.length; l++) {
                        var f = h[l];
                        s.addArmature(this._parseArmature(f, a))
                    }
                    if (!this._data.binary) {
                        this._modifyArray()
                    }
                    if (t.DataParser.STAGE in e) {
                        s.stage = s.getArmature(r._getString(e, t.DataParser.STAGE, ""))
                    } else if (s.armatureNames.length > 0) {
                        s.stage = s.getArmature(s.armatureNames[0])
                    }
                    this._data = null
                }
                if (t.DataParser.TEXTURE_ATLAS in e) {
                    this._rawTextureAtlases = e[t.DataParser.TEXTURE_ATLAS]
                }
                return s
            } else {
                console.assert(false, "Nonsupport data version: " + i + "\n" + "Please convert DragonBones data to support version.\n" + "Read more: https://github.com/DragonBones/Tools/")
            }
            return null
        };
        r.prototype.parseTextureAtlasData = function(e, a, i) {
            if (i === void 0) {
                i = 1
            }
            console.assert(e !== undefined);
            if (e === null) {
                if (this._rawTextureAtlases === null || this._rawTextureAtlases.length === 0) {
                    return false
                }
                var n = this._rawTextureAtlases[this._rawTextureAtlasIndex++];
                this.parseTextureAtlasData(n, a, i);
                if (this._rawTextureAtlasIndex >= this._rawTextureAtlases.length) {
                    this._rawTextureAtlasIndex = 0;
                    this._rawTextureAtlases = null
                }
                return true
            }
            a.width = r._getNumber(e, t.DataParser.WIDTH, 0);
            a.height = r._getNumber(e, t.DataParser.HEIGHT, 0);
            a.scale = i === 1 ? 1 / r._getNumber(e, t.DataParser.SCALE, 1) : i;
            a.name = r._getString(e, t.DataParser.NAME, "");
            a.imagePath = r._getString(e, t.DataParser.IMAGE_PATH, "");
            if (t.DataParser.SUB_TEXTURE in e) {
                var s = e[t.DataParser.SUB_TEXTURE];
                for (var o = 0, l = s.length; o < l; ++o) {
                    var h = s[o];
                    var f = a.createTexture();
                    f.rotated = r._getBoolean(h, t.DataParser.ROTATED, false);
                    f.name = r._getString(h, t.DataParser.NAME, "");
                    f.region.x = r._getNumber(h, t.DataParser.X, 0);
                    f.region.y = r._getNumber(h, t.DataParser.Y, 0);
                    f.region.width = r._getNumber(h, t.DataParser.WIDTH, 0);
                    f.region.height = r._getNumber(h, t.DataParser.HEIGHT, 0);
                    var u = r._getNumber(h, t.DataParser.FRAME_WIDTH, -1);
                    var _ = r._getNumber(h, t.DataParser.FRAME_HEIGHT, -1);
                    if (u > 0 && _ > 0) {
                        f.frame = t.TextureData.createRectangle();
                        f.frame.x = r._getNumber(h, t.DataParser.FRAME_X, 0);
                        f.frame.y = r._getNumber(h, t.DataParser.FRAME_Y, 0);
                        f.frame.width = u;
                        f.frame.height = _
                    }
                    a.addTexture(f)
                }
            }
            return true
        };
        r.getInstance = function() {
            if (r._objectDataParserInstance === null) {
                r._objectDataParserInstance = new r
            }
            return r._objectDataParserInstance
        };
        r._objectDataParserInstance = null;
        return r
    }(t.DataParser);
    t.ObjectDataParser = e;
    var a = function() {
        function t() {
            this.frameStart = 0;
            this.actions = []
        }
        return t
    }();
    t.ActionFrame = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        a.prototype._inRange = function(t, e, a) {
            return e <= t && t <= a
        };
        a.prototype._decodeUTF8 = function(t) {
            var e = -1;
            var a = -1;
            var r = 65533;
            var i = 0;
            var n = "";
            var s;
            var o = 0;
            var l = 0;
            var h = 0;
            var f = 0;
            while (t.length > i) {
                var u = t[i++];
                if (u === e) {
                    if (l !== 0) {
                        s = r
                    } else {
                        s = a
                    }
                } else {
                    if (l === 0) {
                        if (this._inRange(u, 0, 127)) {
                            s = u
                        } else {
                            if (this._inRange(u, 194, 223)) {
                                l = 1;
                                f = 128;
                                o = u - 192
                            } else if (this._inRange(u, 224, 239)) {
                                l = 2;
                                f = 2048;
                                o = u - 224
                            } else if (this._inRange(u, 240, 244)) {
                                l = 3;
                                f = 65536;
                                o = u - 240
                            } else {}
                            o = o * Math.pow(64, l);
                            s = null
                        }
                    } else if (!this._inRange(u, 128, 191)) {
                        o = 0;
                        l = 0;
                        h = 0;
                        f = 0;
                        i--;
                        s = u
                    } else {
                        h += 1;
                        o = o + (u - 128) * Math.pow(64, l - h);
                        if (h !== l) {
                            s = null
                        } else {
                            var _ = o;
                            var c = f;
                            o = 0;
                            l = 0;
                            h = 0;
                            f = 0;
                            if (this._inRange(_, c, 1114111) && !this._inRange(_, 55296, 57343)) {
                                s = _
                            } else {
                                s = u
                            }
                        }
                    }
                }
                if (s !== null && s !== a) {
                    if (s <= 65535) {
                        if (s > 0) n += String.fromCharCode(s)
                    } else {
                        s -= 65536;
                        n += String.fromCharCode(55296 + (s >> 10 & 1023));
                        n += String.fromCharCode(56320 + (s & 1023))
                    }
                }
            }
            return n
        };
        a.prototype._getUTF16Key = function(t) {
            for (var e = 0, a = t.length; e < a; ++e) {
                if (t.charCodeAt(e) > 255) {
                    return encodeURI(t)
                }
            }
            return t
        };
        a.prototype._parseBinaryTimeline = function(e, a, r) {
            if (r === void 0) {
                r = null
            }
            var i = r !== null ? r : t.BaseObject.borrowObject(t.TimelineData);
            i.type = e;
            i.offset = a;
            this._timeline = i;
            var n = this._timelineArrayBuffer[i.offset + 2];
            if (n === 1) {
                i.frameIndicesOffset = -1
            } else {
                var s = 0;
                var o = this._animation.frameCount + 1;
                var l = this._data.frameIndices;
                if (t.DragonBones.webAssembly) {
                    s = l.size();
                    l.resize(s + o, 0)
                } else {
                    s = l.length;
                    l.length += o
                }
                i.frameIndicesOffset = s;
                for (var h = 0, f = 0, u = 0, _ = 0; h < o; ++h) {
                    if (u + _ <= h && f < n) {
                        u = this._frameArrayBuffer[this._animation.frameOffset + this._timelineArrayBuffer[i.offset + 5 + f]];
                        if (f === n - 1) {
                            _ = this._animation.frameCount - u
                        } else {
                            _ = this._frameArrayBuffer[this._animation.frameOffset + this._timelineArrayBuffer[i.offset + 5 + f + 1]] - u
                        }
                        f++
                    }
                    if (t.DragonBones.webAssembly) {
                        l.set(s + h, f - 1)
                    } else {
                        l[s + h] = f - 1
                    }
                }
            }
            this._timeline = null;
            return i
        };
        a.prototype._parseVertices = function(e, a) {
            a.offset = e[t.DataParser.OFFSET];
            var r = this._intArrayBuffer[a.offset + 3];
            if (r >= 0) {
                var i = t.BaseObject.borrowObject(t.WeightData);
                var n = this._intArrayBuffer[a.offset + 0];
                var s = this._intArrayBuffer[r + 0];
                i.offset = r;
                for (var o = 0; o < s; ++o) {
                    var l = this._intArrayBuffer[r + 2 + o];
                    i.addBone(this._rawBones[l])
                }
                var h = r + 2 + s;
                var f = 0;
                for (var o = 0, u = n; o < u; ++o) {
                    var _ = this._intArrayBuffer[h++];
                    f += _;
                    h += _
                }
                i.count = f;
                a.weight = i
            }
        };
        a.prototype._parseMesh = function(t, e) {
            this._parseVertices(t, e.vertices)
        };
        a.prototype._parsePath = function(t, e) {
            this._parseVertices(t, e.vertices)
        };
        a.prototype._parseAnimation = function(e) {
            var a = t.BaseObject.borrowObject(t.AnimationData);
            a.frameCount = Math.max(t.ObjectDataParser._getNumber(e, t.DataParser.DURATION, 1), 1);
            a.playTimes = t.ObjectDataParser._getNumber(e, t.DataParser.PLAY_TIMES, 1);
            a.duration = a.frameCount / this._armature.frameRate;
            a.fadeInTime = t.ObjectDataParser._getNumber(e, t.DataParser.FADE_IN_TIME, 0);
            a.scale = t.ObjectDataParser._getNumber(e, t.DataParser.SCALE, 1);
            a.name = t.ObjectDataParser._getString(e, t.DataParser.NAME, t.DataParser.DEFAULT_NAME);
            if (a.name.length === 0) {
                a.name = t.DataParser.DEFAULT_NAME
            }
            var r = e[t.DataParser.OFFSET];
            a.frameIntOffset = r[0];
            a.frameFloatOffset = r[1];
            a.frameOffset = r[2];
            this._animation = a;
            if (t.DataParser.ACTION in e) {
                a.actionTimeline = this._parseBinaryTimeline(0, e[t.DataParser.ACTION])
            }
            if (t.DataParser.Z_ORDER in e) {
                a.zOrderTimeline = this._parseBinaryTimeline(1, e[t.DataParser.Z_ORDER])
            }
            if (t.DataParser.BONE in e) {
                var i = e[t.DataParser.BONE];
                for (var n in i) {
                    var s = i[n];
                    if (t.DragonBones.webAssembly) {
                        n = this._getUTF16Key(n)
                    }
                    var o = this._armature.getBone(n);
                    if (o === null) {
                        continue
                    }
                    for (var l = 0, h = s.length; l < h; l += 2) {
                        var f = s[l];
                        var u = s[l + 1];
                        var _ = this._parseBinaryTimeline(f, u);
                        this._animation.addBoneTimeline(o, _)
                    }
                }
            }
            if (t.DataParser.SURFACE in e) {
                var i = e[t.DataParser.SURFACE];
                for (var n in i) {
                    var s = i[n];
                    if (t.DragonBones.webAssembly) {
                        n = this._getUTF16Key(n)
                    }
                    var c = this._armature.getBone(n);
                    if (c === null) {
                        continue
                    }
                    for (var l = 0, h = s.length; l < h; l += 2) {
                        var f = s[l];
                        var u = s[l + 1];
                        var _ = this._parseBinaryTimeline(f, u);
                        this._animation.addSurfaceTimeline(c, _)
                    }
                }
            }
            if (t.DataParser.SLOT in e) {
                var i = e[t.DataParser.SLOT];
                for (var n in i) {
                    var s = i[n];
                    if (t.DragonBones.webAssembly) {
                        n = this._getUTF16Key(n)
                    }
                    var p = this._armature.getSlot(n);
                    if (p === null) {
                        continue
                    }
                    for (var l = 0, h = s.length; l < h; l += 2) {
                        var f = s[l];
                        var u = s[l + 1];
                        var _ = this._parseBinaryTimeline(f, u);
                        this._animation.addSlotTimeline(p, _)
                    }
                }
            }
            if (t.DataParser.CONSTRAINT in e) {
                var i = e[t.DataParser.CONSTRAINT];
                for (var n in i) {
                    var s = i[n];
                    if (t.DragonBones.webAssembly) {
                        n = this._getUTF16Key(n)
                    }
                    var m = this._armature.getConstraint(n);
                    if (m === null) {
                        continue
                    }
                    for (var l = 0, h = s.length; l < h; l += 2) {
                        var f = s[l];
                        var u = s[l + 1];
                        var _ = this._parseBinaryTimeline(f, u);
                        this._animation.addConstraintTimeline(m, _)
                    }
                }
            }
            if (t.DataParser.ANIMATION in e) {
                var i = e[t.DataParser.ANIMATION];
                for (var n in i) {
                    var s = i[n];
                    if (t.DragonBones.webAssembly) {
                        n = this._getUTF16Key(n)
                    }
                    for (var l = 0, h = s.length; l < h; l += 2) {
                        var f = s[l];
                        var u = s[l + 1];
                        var _ = this._parseBinaryTimeline(f, u);
                        this._animation.addAnimationTimeline(n, _)
                    }
                }
            }
            this._animation = null;
            return a
        };
        a.prototype._parseArray = function(e) {
            var a = e[t.DataParser.OFFSET];
            var r = a[1];
            var i = a[3];
            var n = a[5];
            var s = a[7];
            var o = a[9];
            var l = a[11];
            var h = new Int16Array(this._binary, this._binaryOffset + a[0], r / Int16Array.BYTES_PER_ELEMENT);
            var f = new Float32Array(this._binary, this._binaryOffset + a[2], i / Float32Array.BYTES_PER_ELEMENT);
            var u = new Int16Array(this._binary, this._binaryOffset + a[4], n / Int16Array.BYTES_PER_ELEMENT);
            var _ = new Float32Array(this._binary, this._binaryOffset + a[6], s / Float32Array.BYTES_PER_ELEMENT);
            var c = new Int16Array(this._binary, this._binaryOffset + a[8], o / Int16Array.BYTES_PER_ELEMENT);
            var p = new Uint16Array(this._binary, this._binaryOffset + a[10], l / Uint16Array.BYTES_PER_ELEMENT);
            if (t.DragonBones.webAssembly) {
                var m = r + i + n + s + o + l;
                var d = t.webAssemblyModule._malloc(m);
                var v = new Uint8Array(this._binary, this._binaryOffset, m / Uint8Array.BYTES_PER_ELEMENT);
                var y = new Uint8Array(t.webAssemblyModule.HEAP16.buffer, d, v.length);
                for (var g = 0, b = v.length; g < b; ++g) {
                    y[g] = v[g]
                }
                t.webAssemblyModule.setDataBinary(this._data, d, r, i, n, s, o, l);
                this._intArrayBuffer = h;
                this._floatArrayBuffer = f;
                this._frameIntArrayBuffer = u;
                this._frameFloatArrayBuffer = _;
                this._frameArrayBuffer = c;
                this._timelineArrayBuffer = p
            } else {
                this._data.binary = this._binary;
                this._data.intArray = this._intArrayBuffer = h;
                this._data.floatArray = this._floatArrayBuffer = f;
                this._data.frameIntArray = this._frameIntArrayBuffer = u;
                this._data.frameFloatArray = this._frameFloatArrayBuffer = _;
                this._data.frameArray = this._frameArrayBuffer = c;
                this._data.timelineArray = this._timelineArrayBuffer = p
            }
        };
        a.prototype.parseDragonBonesData = function(t, a) {
            if (a === void 0) {
                a = 1
            }
            console.assert(t !== null && t !== undefined && t instanceof ArrayBuffer, "Data error.");
            var r = new Uint8Array(t, 0, 8);
            if (r[0] !== "D".charCodeAt(0) || r[1] !== "B".charCodeAt(0) || r[2] !== "D".charCodeAt(0) || r[3] !== "T".charCodeAt(0)) {
                console.assert(false, "Nonsupport data.");
                return null
            }
            var i = new Uint32Array(t, 8, 1)[0];
            var n = new Uint8Array(t, 8 + 4, i);
            var s = this._decodeUTF8(n);
            var o = JSON.parse(s);
            this._binaryOffset = 8 + 4 + i;
            this._binary = t;
            return e.prototype.parseDragonBonesData.call(this, o, a)
        };
        a.getInstance = function() {
            if (a._binaryDataParserInstance === null) {
                a._binaryDataParserInstance = new a
            }
            return a._binaryDataParserInstance
        };
        a._binaryDataParserInstance = null;
        return a
    }(t.ObjectDataParser);
    t.BinaryDataParser = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function() {
        function e(a) {
            if (a === void 0) {
                a = null
            }
            this.autoSearch = false;
            this._dragonBonesDataMap = {};
            this._textureAtlasDataMap = {};
            this._dragonBones = null;
            this._dataParser = null;
            if (e._objectParser === null) {
                e._objectParser = new t.ObjectDataParser
            }
            if (e._binaryParser === null) {
                e._binaryParser = new t.BinaryDataParser
            }
            this._dataParser = a !== null ? a : e._objectParser
        }
        e.prototype._isSupportMesh = function() {
            return true
        };
        e.prototype._getTextureData = function(t, e) {
            if (t in this._textureAtlasDataMap) {
                for (var a = 0, r = this._textureAtlasDataMap[t]; a < r.length; a++) {
                    var i = r[a];
                    var n = i.getTexture(e);
                    if (n !== null) {
                        return n
                    }
                }
            }
            if (this.autoSearch) {
                for (var s in this._textureAtlasDataMap) {
                    for (var o = 0, l = this._textureAtlasDataMap[s]; o < l.length; o++) {
                        var i = l[o];
                        if (i.autoSearch) {
                            var n = i.getTexture(e);
                            if (n !== null) {
                                return n
                            }
                        }
                    }
                }
            }
            return null
        };
        e.prototype._fillBuildArmaturePackage = function(t, e, a, r, i) {
            var n = null;
            var s = null;
            if (e.length > 0) {
                if (e in this._dragonBonesDataMap) {
                    n = this._dragonBonesDataMap[e];
                    s = n.getArmature(a)
                }
            }
            if (s === null && (e.length === 0 || this.autoSearch)) {
                for (var o in this._dragonBonesDataMap) {
                    n = this._dragonBonesDataMap[o];
                    if (e.length === 0 || n.autoSearch) {
                        s = n.getArmature(a);
                        if (s !== null) {
                            e = o;
                            break
                        }
                    }
                }
            }
            if (s !== null) {
                t.dataName = e;
                t.textureAtlasName = i;
                t.data = n;
                t.armature = s;
                t.skin = null;
                if (r.length > 0) {
                    t.skin = s.getSkin(r);
                    if (t.skin === null && this.autoSearch) {
                        for (var o in this._dragonBonesDataMap) {
                            var l = this._dragonBonesDataMap[o];
                            var h = l.getArmature(r);
                            if (h !== null) {
                                t.skin = h.defaultSkin;
                                break
                            }
                        }
                    }
                }
                if (t.skin === null) {
                    t.skin = s.defaultSkin
                }
                return true
            }
            return false
        };
        e.prototype._buildBones = function(e, a) {
            for (var r = 0, i = e.armature.sortedBones; r < i.length; r++) {
                var n = i[r];
                var s = t.BaseObject.borrowObject(n.type === 0 ? t.Bone : t.Surface);
                s.init(n, a)
            }
        };
        e.prototype._buildSlots = function(e, a) {
            var r = e.skin;
            var i = e.armature.defaultSkin;
            if (r === null || i === null) {
                return
            }
            var n = {};
            for (var s in i.displays) {
                var o = i.getDisplays(s);
                n[s] = o
            }
            if (r !== i) {
                for (var s in r.displays) {
                    var o = r.getDisplays(s);
                    n[s] = o
                }
            }
            for (var l = 0, h = e.armature.sortedSlots; l < h.length; l++) {
                var f = h[l];
                var u = f.name in n ? n[f.name] : null;
                var _ = this._buildSlot(e, f, a);
                _.rawDisplayDatas = u;
                if (u !== null) {
                    var c = new Array;
                    for (var p = 0, m = t.DragonBones.webAssembly ? u.size() : u.length; p < m; ++p) {
                        var d = t.DragonBones.webAssembly ? u.get(p) : u[p];
                        if (d !== null) {
                            c.push(this._getSlotDisplay(e, d, null, _))
                        } else {
                            c.push(null)
                        }
                    }
                    _._setDisplayList(c)
                }
                _._setDisplayIndex(f.displayIndex, true)
            }
        };
        e.prototype._buildConstraints = function(e, a) {
            var r = e.armature.constraints;
            for (var i in r) {
                var n = r[i];
                switch (n.type) {
                    case 0:
                        var s = t.BaseObject.borrowObject(t.IKConstraint);
                        s.init(n, a);
                        a._addConstraint(s);
                        break;
                    case 1:
                        var o = t.BaseObject.borrowObject(t.PathConstraint);
                        o.init(n, a);
                        a._addConstraint(o);
                        break;
                    default:
                        var l = t.BaseObject.borrowObject(t.IKConstraint);
                        l.init(n, a);
                        a._addConstraint(l);
                        break
                }
            }
        };
        e.prototype._buildChildArmature = function(t, e, a) {
            e;
            return this.buildArmature(a.path, t !== null ? t.dataName : "", "", t !== null ? t.textureAtlasName : "")
        };
        e.prototype._getSlotDisplay = function(e, a, r, i) {
            var n = e !== null ? e.dataName : a.parent.parent.parent.name;
            var s = null;
            switch (a.type) {
                case 0:
                    {
                        var o = a;
                        if (o.texture === null) {
                            o.texture = this._getTextureData(n, a.path)
                        } else if (e !== null && e.textureAtlasName.length > 0) {
                            o.texture = this._getTextureData(e.textureAtlasName, a.path)
                        }
                        if (r !== null && r.type === 2 && this._isSupportMesh()) {
                            s = i.meshDisplay
                        } else {
                            s = i.rawDisplay
                        }
                        break
                    }
                case 2:
                    {
                        var l = a;
                        if (l.texture === null) {
                            l.texture = this._getTextureData(n, l.path)
                        } else if (e !== null && e.textureAtlasName.length > 0) {
                            l.texture = this._getTextureData(e.textureAtlasName, l.path)
                        }
                        if (this._isSupportMesh()) {
                            s = i.meshDisplay
                        } else {
                            s = i.rawDisplay
                        }
                        break
                    }
                case 1:
                    {
                        var h = a;
                        var f = this._buildChildArmature(e, i, a);
                        if (f !== null) {
                            f.inheritAnimation = h.inheritAnimation;
                            if (!f.inheritAnimation) {
                                var u = h.actions.length > 0 ? h.actions : f.armatureData.defaultActions;
                                if (u.length > 0) {
                                    for (var _ = 0, c = u; _ < c.length; _++) {
                                        var p = c[_];
                                        var m = t.BaseObject.borrowObject(t.EventObject);
                                        t.EventObject.actionDataToInstance(p, m, i.armature);
                                        m.slot = i;
                                        i.armature._bufferAction(m, false)
                                    }
                                } else {
                                    f.animation.play()
                                }
                            }
                            h.armature = f.armatureData
                        }
                        s = f;
                        break
                    }
                case 3:
                    break;
                default:
                    break
            }
            return s
        };
        e.prototype.parseDragonBonesData = function(t, a, r) {
            if (a === void 0) {
                a = null
            }
            if (r === void 0) {
                r = 1
            }
            var i = t instanceof ArrayBuffer ? e._binaryParser : this._dataParser;
            var n = i.parseDragonBonesData(t, r);
            while (true) {
                var s = this._buildTextureAtlasData(null, null);
                if (i.parseTextureAtlasData(null, s, r)) {
                    this.addTextureAtlasData(s, a)
                } else {
                    s.returnToPool();
                    break
                }
            }
            if (n !== null) {
                this.addDragonBonesData(n, a)
            }
            return n
        };
        e.prototype.parseTextureAtlasData = function(t, e, a, r) {
            if (a === void 0) {
                a = null
            }
            if (r === void 0) {
                r = 1
            }
            var i = this._buildTextureAtlasData(null, null);
            this._dataParser.parseTextureAtlasData(t, i, r);
            this._buildTextureAtlasData(i, e || null);
            this.addTextureAtlasData(i, a);
            return i
        };
        e.prototype.updateTextureAtlasData = function(t, e) {
            var a = this.getTextureAtlasData(t);
            if (a !== null) {
                for (var r = 0, i = a.length; r < i; ++r) {
                    if (r < e.length) {
                        this._buildTextureAtlasData(a[r], e[r])
                    }
                }
            }
        };
        e.prototype.getDragonBonesData = function(t) {
            return t in this._dragonBonesDataMap ? this._dragonBonesDataMap[t] : null
        };
        e.prototype.addDragonBonesData = function(t, e) {
            if (e === void 0) {
                e = null
            }
            e = e !== null ? e : t.name;
            if (e in this._dragonBonesDataMap) {
                if (this._dragonBonesDataMap[e] === t) {
                    return
                }
                console.warn("Can not add same name data: " + e);
                return
            }
            this._dragonBonesDataMap[e] = t
        };
        e.prototype.removeDragonBonesData = function(t, e) {
            if (e === void 0) {
                e = true
            }
            if (t in this._dragonBonesDataMap) {
                if (e) {
                    this._dragonBones.bufferObject(this._dragonBonesDataMap[t])
                }
                delete this._dragonBonesDataMap[t]
            }
        };
        e.prototype.getTextureAtlasData = function(t) {
            return t in this._textureAtlasDataMap ? this._textureAtlasDataMap[t] : null
        };
        e.prototype.addTextureAtlasData = function(t, e) {
            if (e === void 0) {
                e = null
            }
            e = e !== null ? e : t.name;
            var a = e in this._textureAtlasDataMap ? this._textureAtlasDataMap[e] : this._textureAtlasDataMap[e] = [];
            if (a.indexOf(t) < 0) {
                a.push(t)
            }
        };
        e.prototype.removeTextureAtlasData = function(t, e) {
            if (e === void 0) {
                e = true
            }
            if (t in this._textureAtlasDataMap) {
                var a = this._textureAtlasDataMap[t];
                if (e) {
                    for (var r = 0, i = a; r < i.length; r++) {
                        var n = i[r];
                        this._dragonBones.bufferObject(n)
                    }
                }
                delete this._textureAtlasDataMap[t]
            }
        };
        e.prototype.getArmatureData = function(t, e) {
            if (e === void 0) {
                e = ""
            }
            var r = new a;
            if (!this._fillBuildArmaturePackage(r, e, t, "", "")) {
                return null
            }
            return r.armature
        };
        e.prototype.clear = function(t) {
            if (t === void 0) {
                t = true
            }
            for (var e in this._dragonBonesDataMap) {
                if (t) {
                    this._dragonBones.bufferObject(this._dragonBonesDataMap[e])
                }
                delete this._dragonBonesDataMap[e]
            }
            for (var e in this._textureAtlasDataMap) {
                if (t) {
                    var a = this._textureAtlasDataMap[e];
                    for (var r = 0, i = a; r < i.length; r++) {
                        var n = i[r];
                        this._dragonBones.bufferObject(n)
                    }
                }
                delete this._textureAtlasDataMap[e]
            }
        };
        e.prototype.buildArmature = function(t, e, r, i) {
            if (e === void 0) {
                e = ""
            }
            if (r === void 0) {
                r = ""
            }
            if (i === void 0) {
                i = ""
            }
            var n = new a;
            if (!this._fillBuildArmaturePackage(n, e || "", t, r || "", i || "")) {
                console.warn("No armature data: " + t + ", " + (e !== null ? e : ""));
                return null
            }
            var s = this._buildArmature(n);
            this._buildBones(n, s);
            this._buildSlots(n, s);
            this._buildConstraints(n, s);
            s.invalidUpdate(null, true);
            s.advanceTime(0);
            return s
        };
        e.prototype.replaceDisplay = function(e, a, r) {
            if (r === void 0) {
                r = -1
            }
            if (r < 0) {
                r = e.displayIndex
            }
            if (r < 0) {
                r = 0
            }
            e.replaceDisplayData(a, r);
            var i = e.displayList;
            if (i.length <= r) {
                i.length = r + 1;
                for (var n = 0, s = i.length; n < s; ++n) {
                    if (!i[n]) {
                        i[n] = null
                    }
                }
            }
            if (a !== null) {
                var o = e.rawDisplayDatas;
                var l = null;
                if (o) {
                    if (t.DragonBones.webAssembly) {
                        if (r < o.size()) {
                            l = o.get(r)
                        }
                    } else {
                        if (r < o.length) {
                            l = o[r]
                        }
                    }
                }
                i[r] = this._getSlotDisplay(null, a, l, e)
            } else {
                i[r] = null
            }
            e.displayList = i
        };
        e.prototype.replaceSlotDisplay = function(t, e, a, r, i, n) {
            if (n === void 0) {
                n = -1
            }
            var s = this.getArmatureData(e, t || "");
            if (!s || !s.defaultSkin) {
                return false
            }
            var o = s.defaultSkin.getDisplay(a, r);
            if (!o) {
                return false
            }
            this.replaceDisplay(i, o, n);
            return true
        };
        e.prototype.replaceSlotDisplayList = function(e, a, r, i) {
            var n = this.getArmatureData(a, e || "");
            if (!n || !n.defaultSkin) {
                return false
            }
            var s = n.defaultSkin.getDisplays(r);
            if (!s) {
                return false
            }
            var o = 0;
            for (var l = 0, h = t.DragonBones.webAssembly ? s.size() : s.length; l < h; ++l) {
                var f = t.DragonBones.webAssembly ? s.get(l) : s[l];
                this.replaceDisplay(i, f, o++)
            }
            return true
        };
        e.prototype.replaceSkin = function(e, a, r, i) {
            if (r === void 0) {
                r = false
            }
            if (i === void 0) {
                i = null
            }
            var n = false;
            var s = a.parent.defaultSkin;
            for (var o = 0, l = e.getSlots(); o < l.length; o++) {
                var h = l[o];
                if (i !== null && i.indexOf(h.name) >= 0) {
                    continue
                }
                var f = a.getDisplays(h.name);
                if (!f) {
                    if (s !== null && a !== s) {
                        f = s.getDisplays(h.name)
                    }
                    if (!f) {
                        if (r) {
                            h.rawDisplayDatas = null;
                            h.displayList = []
                        }
                        continue
                    }
                }
                var u = t.DragonBones.webAssembly ? f.size() : f.length;
                var _ = h.displayList;
                _.length = u;
                for (var c = 0, p = u; c < p; ++c) {
                    var m = t.DragonBones.webAssembly ? f.get(c) : f[c];
                    if (m !== null) {
                        _[c] = this._getSlotDisplay(null, m, null, h)
                    } else {
                        _[c] = null
                    }
                }
                n = true;
                h.rawDisplayDatas = f;
                h.displayList = _
            }
            return n
        };
        e.prototype.replaceAnimation = function(e, a, r) {
            if (r === void 0) {
                r = true
            }
            var i = a.defaultSkin;
            if (i === null) {
                return false
            }
            if (r) {
                e.animation.animations = a.animations
            } else {
                var n = e.animation.animations;
                var s = {};
                for (var o in n) {
                    s[o] = n[o]
                }
                for (var o in a.animations) {
                    s[o] = a.animations[o]
                }
                e.animation.animations = s
            }
            for (var l = 0, h = e.getSlots(); l < h.length; l++) {
                var f = h[l];
                var u = 0;
                for (var _ = 0, c = f.displayList; _ < c.length; _++) {
                    var p = c[_];
                    if (p instanceof t.Armature) {
                        var m = i.getDisplays(f.name);
                        if (m !== null && u < (t.DragonBones.webAssembly ? m.size() : m.length)) {
                            var d = t.DragonBones.webAssembly ? m.get(u) : m[u];
                            if (d !== null && d.type === 1) {
                                var v = this.getArmatureData(d.path, d.parent.parent.parent.name);
                                if (v) {
                                    this.replaceAnimation(p, v, r)
                                }
                            }
                        }
                    }
                    u++
                }
            }
            return true
        };
        e.prototype.getAllDragonBonesData = function() {
            return this._dragonBonesDataMap
        };
        e.prototype.getAllTextureAtlasData = function() {
            return this._textureAtlasDataMap
        };
        Object.defineProperty(e.prototype, "clock", {
            get: function() {
                return this._dragonBones.clock
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "dragonBones", {
            get: function() {
                return this._dragonBones
            },
            enumerable: true,
            configurable: true
        });
        e.prototype.changeSkin = function(t, e, a) {
            if (a === void 0) {
                a = null
            }
            return this.replaceSkin(t, e, false, a)
        };
        e.prototype.copyAnimationsToArmature = function(t, e, a, r, i) {
            if (a === void 0) {
                a = ""
            }
            if (r === void 0) {
                r = ""
            }
            if (i === void 0) {
                i = true
            }
            a;
            var n = this.getArmatureData(e, r);
            if (!n) {
                return false
            }
            return this.replaceAnimation(t, n, i)
        };
        e._objectParser = null;
        e._binaryParser = null;
        return e
    }();
    t.BaseFactory = e;
    var a = function() {
        function t() {
            this.dataName = "";
            this.textureAtlasName = "";
            this.skin = null
        }
        return t
    }();
    t.BuildArmaturePackage = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(r, e);

        function r() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._renderTexture = null;
            return t
        }
        r.toString = function() {
            return "[class dragonBones.EgretTextureAtlasData]"
        };
        r.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            if (this.disposeEnabled && this._renderTexture !== null) {
                this._renderTexture.dispose()
            }
            this.disposeEnabled = false;
            this._renderTexture = null
        };
        r.prototype.createTexture = function() {
            return t.BaseObject.borrowObject(a)
        };
        Object.defineProperty(r.prototype, "renderTexture", {
            get: function() {
                return this._renderTexture
            },
            set: function(t) {
                if (this._renderTexture === t) {
                    return
                }
                this._renderTexture = t;
                if (this._renderTexture !== null) {
                    var e = this._renderTexture.bitmapData;
                    var a = this.width > 0 ? this.width : e.width;
                    var r = this.height > 0 ? this.height : e.height;
                    for (var i in this.textures) {
                        var n = egret.$TextureScaleFactor;
                        var s = this.textures[i];
                        var o = s.region.width;
                        var l = s.region.height;
                        if (s.renderTexture === null) {
                            s.renderTexture = new egret.Texture
                        }
                        s.renderTexture.bitmapData = e;
                        if (s.rotated) {
                            s.renderTexture.$initData(s.region.x * n, s.region.y * n, l * n, o * n, 0, 0, l * n, o * n, a, r, s.rotated)
                        } else {
                            s.renderTexture.$initData(s.region.x * n, s.region.y * n, o * n, l * n, 0, 0, o * n, l * n, a, r)
                        }
                    }
                } else {
                    for (var i in this.textures) {
                        var s = this.textures[i];
                        s.renderTexture = null
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        r.prototype.dispose = function() {
            console.warn("已废弃。");
            this.returnToPool()
        };
        Object.defineProperty(r.prototype, "texture", {
            get: function() {
                console.warn("已废弃。");
                return this.renderTexture
            },
            enumerable: true,
            configurable: true
        });
        return r
    }(t.TextureAtlasData);
    t.EgretTextureAtlasData = e;
    var a = function(t) {
        __extends(e, t);

        function e() {
            var e = t !== null && t.apply(this, arguments) || this;
            e.renderTexture = null;
            return e
        }
        e.toString = function() {
            return "[class dragonBones.EgretTextureData]"
        };
        e.prototype._onClear = function() {
            t.prototype._onClear.call(this);
            if (this.renderTexture !== null) {}
            this.renderTexture = null
        };
        return e
    }(t.TextureData);
    t.EgretTextureData = a
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            return e !== null && e.apply(this, arguments) || this
        }
        Object.defineProperty(a.prototype, "eventObject", {
            get: function() {
                return this.data
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animationName", {
            get: function() {
                var t = this.eventObject.animationState;
                return t !== null ? t.name : ""
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "armature", {
            get: function() {
                return this.eventObject.armature
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "bone", {
            get: function() {
                return this.eventObject.bone
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "slot", {
            get: function() {
                return this.eventObject.slot
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "animationState", {
            get: function() {
                return this.eventObject.animationState
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "frameLabel", {
            get: function() {
                return this.eventObject.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "sound", {
            get: function() {
                return this.eventObject.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a.prototype, "movementID", {
            get: function() {
                return this.animationName
            },
            enumerable: true,
            configurable: true
        });
        a.START = t.EventObject.START;
        a.LOOP_COMPLETE = t.EventObject.LOOP_COMPLETE;
        a.COMPLETE = t.EventObject.COMPLETE;
        a.FADE_IN = t.EventObject.FADE_IN;
        a.FADE_IN_COMPLETE = t.EventObject.FADE_IN_COMPLETE;
        a.FADE_OUT = t.EventObject.FADE_OUT;
        a.FADE_OUT_COMPLETE = t.EventObject.FADE_OUT_COMPLETE;
        a.FRAME_EVENT = t.EventObject.FRAME_EVENT;
        a.SOUND_EVENT = t.EventObject.SOUND_EVENT;
        a.ANIMATION_FRAME_EVENT = t.EventObject.FRAME_EVENT;
        a.BONE_FRAME_EVENT = t.EventObject.FRAME_EVENT;
        a.MOVEMENT_FRAME_EVENT = t.EventObject.FRAME_EVENT;
        a.SOUND = t.EventObject.SOUND_EVENT;
        return a
    }(egret.Event);
    t.EgretEvent = e;
    var a = function(a) {
        __extends(r, a);

        function r() {
            var t = a !== null && a.apply(this, arguments) || this;
            t.debugDraw = false;
            t._batchEnabled = !(global["nativeRender"] || global["bricks"]);
            t._childDirty = true;
            t._debugDraw = false;
            t._armature = null;
            t._bounds = null;
            t._debugDrawer = null;
            return t
        }
        r._cleanBeforeRender = function() {};
        r.prototype.dbInit = function(t) {
            this._armature = t;
            if (this._batchEnabled) {
                this.$renderNode = new egret.sys.GroupNode;
                this.$renderNode.cleanBeforeRender = r._cleanBeforeRender
            }
        };
        r.prototype.dbClear = function() {
            this._armature = null;
            this._bounds = null;
            this._debugDrawer = null
        };
        r.prototype.dbUpdate = function() {
            var e = t.DragonBones.debugDraw || this.debugDraw;
            if (e || this._debugDraw) {
                this._debugDraw = e;
                if (this._debugDraw) {
                    if (this._debugDrawer === null) {
                        this._debugDrawer = new egret.Sprite
                    }
                    if (this._debugDrawer.parent !== this) {
                        this.addChild(this._debugDrawer)
                    }
                    var a = 2;
                    var r = this._debugDrawer.graphics;
                    r.clear();
                    for (var i = 0, n = this._armature.getBones(); i < n.length; i++) {
                        var s = n[i];
                        if (s.boneData.type === 0) {
                            var o = Math.max(s.boneData.length, a);
                            var l = s.globalTransformMatrix.tx;
                            var h = s.globalTransformMatrix.ty;
                            var f = l - s.globalTransformMatrix.a * a;
                            var u = h - s.globalTransformMatrix.b * a;
                            var _ = l + s.globalTransformMatrix.a * o;
                            var c = h + s.globalTransformMatrix.b * o;
                            var p = l + u - h;
                            var m = h + f - l;
                            var d = l - u + h;
                            var v = h - f + l;
                            r.lineStyle(2, 65535, .7);
                            r.moveTo(f, u);
                            r.lineTo(_, c);
                            r.moveTo(p, m);
                            r.lineTo(d, v)
                        } else {
                            var y = s;
                            var g = y._boneData;
                            var b = g.segmentX;
                            var D = g.segmentY;
                            var T = y._vertices;
                            r.lineStyle(2, 16776960, .7);
                            for (var A = 0; A < D; ++A) {
                                for (var x = 0; x < b; ++x) {
                                    var P = (x + A * (b + 1)) * 2;
                                    var O = T[P];
                                    var S = T[P + 1];
                                    r.moveTo(O, S);
                                    r.lineTo(T[P + 2], T[P + 3]);
                                    r.moveTo(O, S);
                                    r.lineTo(T[P + (b + 1) * 2], T[P + (b + 1) * 2 + 1]);
                                    if (x === b - 1) {
                                        r.moveTo(T[P + 2], T[P + 3]);
                                        r.lineTo(T[P + (b + 2) * 2], T[P + (b + 2) * 2 + 1])
                                    }
                                    if (A === D - 1) {
                                        r.moveTo(T[P + (b + 1) * 2], T[P + (b + 1) * 2 + 1]);
                                        r.lineTo(T[P + (b + 2) * 2], T[P + (b + 2) * 2 + 1])
                                    }
                                }
                            }
                        }
                    }
                    for (var E = 0, M = this._armature.getSlots(); E < M.length; E++) {
                        var B = M[E];
                        var C = B.boundingBoxData;
                        if (C !== null) {
                            var w = this._debugDrawer.getChildByName(B.name);
                            if (w === null) {
                                w = new egret.Shape;
                                w.name = B.name;
                                this._debugDrawer.addChild(w)
                            }
                            w.graphics.clear();
                            w.graphics.lineStyle(2, 16711935, .7);
                            switch (C.type) {
                                case 0:
                                    w.graphics.drawRect(-C.width * .5, -C.height * .5, C.width, C.height);
                                    break;
                                case 1:
                                    w.graphics.drawEllipse(-C.width * .5, -C.height * .5, C.width, C.height);
                                    break;
                                case 2:
                                    var T = C.vertices;
                                    for (var I = 0; I < T.length; I += 2) {
                                        var O = T[I];
                                        var S = T[I + 1];
                                        if (I === 0) {
                                            w.graphics.moveTo(O, S)
                                        } else {
                                            w.graphics.lineTo(O, S)
                                        }
                                    }
                                    w.graphics.lineTo(T[0], T[1]);
                                    break;
                                default:
                                    break
                            }
                            B.updateTransformAndMatrix();
                            B.updateGlobalTransform();
                            w.$setMatrix(B.globalTransformMatrix, false)
                        } else {
                            var w = this._debugDrawer.getChildByName(B.name);
                            if (w !== null) {
                                this._debugDrawer.removeChild(w)
                            }
                        }
                    }
                } else if (this._debugDrawer !== null && this._debugDrawer.parent === this) {
                    this.removeChild(this._debugDrawer)
                }
            }
            if (!t.isV5 && this._batchEnabled && this._childDirty) {
                this.$invalidateContentBounds()
            }
        };
        r.prototype.dispose = function(t) {
            if (t === void 0) {
                t = true
            }
            t;
            if (this._armature !== null) {
                this._armature.dispose();
                this._armature = null
            }
        };
        r.prototype.dispatchDBEvent = function(t, r) {
            var i = egret.Event.create(e, t);
            i.data = r;
            a.prototype.dispatchEvent.call(this, i);
            egret.Event.release(i)
        };
        r.prototype.hasDBEventListener = function(t) {
            return this.hasEventListener(t)
        };
        r.prototype.addDBEventListener = function(t, e, a) {
            this.addEventListener(t, e, a)
        };
        r.prototype.removeDBEventListener = function(t, e, a) {
            this.removeEventListener(t, e, a)
        };
        r.prototype.disableBatch = function() {
            if (!this._batchEnabled || !this._armature) {
                return
            }
            for (var t = 0, e = this._armature.getSlots(); t < e.length; t++) {
                var a = e[t];
                var r = a._deformVertices && a._deformVertices.verticesData ? a.meshDisplay : a.rawDisplay;
                if (!a.display && r === a.meshDisplay) {
                    r = a.rawDisplay
                }
                var i = r.$renderNode;
                if (i.matrix) {
                    r.$setMatrix(a.globalTransformMatrix, false)
                }
                this.addChild(r)
            }
            this._batchEnabled = false;
            this.$renderNode.cleanBeforeRender = null;
            this.$renderNode = null;
            this.armature.invalidUpdate(null, true)
        };
        Object.defineProperty(r.prototype, "armature", {
            get: function() {
                return this._armature
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(r.prototype, "animation", {
            get: function() {
                return this._armature.animation
            },
            enumerable: true,
            configurable: true
        });
        r.prototype.$measureContentBounds = function(e) {
            if (this._batchEnabled && this._armature) {
                if (this._childDirty) {
                    this._childDirty = false;
                    var r = true;
                    var i = new egret.Rectangle;
                    for (var n = 0, s = this._armature.getSlots(); n < s.length; n++) {
                        var o = s[n];
                        var l = o.display;
                        if (!l || !l.$renderNode || !l.$renderNode.image) {
                            continue
                        }
                        var h = l.$renderNode.matrix;
                        if (l === o.meshDisplay) {
                            var f = l.$renderNode.vertices;
                            if (f && f.length > 0) {
                                i.setTo(999999, 999999, -999999, -999999);
                                for (var u = 0, _ = f.length; u < _; u += 2) {
                                    var c = f[u];
                                    var p = f[u + 1];
                                    if (i.x > c) i.x = c;
                                    if (i.width < c) i.width = c;
                                    if (i.y > p) i.y = p;
                                    if (i.height < p) i.height = p
                                }
                                i.width -= i.x;
                                i.height -= i.y
                            } else {
                                continue
                            }
                        } else {
                            var m = o.displayData;
                            if (m && m instanceof t.ImageDisplayData && m.texture) {
                                var d = m.texture.parent.scale;
                                i.x = 0;
                                i.y = 0;
                                i.width = m.texture.region.width * d;
                                i.height = m.texture.region.height * d
                            } else {
                                continue
                            }
                        }
                        h.$transformBounds(i);
                        var v = i.x;
                        var y = i.y;
                        var g = i.x + i.width;
                        var b = i.y + i.height;
                        if (r) {
                            r = false;
                            e.x = v;
                            e.y = y;
                            e.width = g;
                            e.height = b
                        } else {
                            if (v < e.x) {
                                e.x = v
                            }
                            if (y < e.y) {
                                e.y = y
                            }
                            if (g > e.width) {
                                e.width = g
                            }
                            if (b > e.height) {
                                e.height = b
                            }
                        }
                    }
                    e.width -= e.x;
                    e.height -= e.y;
                    if (t.isV5) {
                        if (this._bounds === null) {
                            this._bounds = new egret.Rectangle
                        }
                        this._bounds.copyFrom(e)
                    }
                } else if (t.isV5) {
                    if (this._bounds === null) {
                        this._bounds = new egret.Rectangle
                    }
                    e.copyFrom(this._bounds)
                }
                return e
            }
            return a.prototype.$measureContentBounds.call(this, e)
        };
        r.prototype.hasEvent = function(t) {
            return this.hasDBEventListener(t)
        };
        r.prototype.addEvent = function(t, e, a) {
            this.addDBEventListener(t, e, a)
        };
        r.prototype.removeEvent = function(t, e, a) {
            this.removeDBEventListener(t, e, a)
        };
        r.prototype.advanceTimeBySelf = function(e) {
            if (e) {
                this._armature.clock = t.EgretFactory.factory.clock
            } else {
                this._armature.clock = null
            }
        };
        return r
    }(egret.DisplayObjectContainer);
    t.EgretArmatureDisplay = a;
    var r = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(e);
    t.Event = r;
    var i = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(e);
    t.ArmatureEvent = i;
    var n = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(e);
    t.AnimationEvent = n;
    var s = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(e);
    t.FrameEvent = s;
    var o = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(e);
    t.SoundEvent = o;
    var l = function(e) {
        __extends(a, e);

        function a(a, r, i) {
            if (i === void 0) {
                i = 1
            }
            var n = e.call(this) || this;
            console.warn("已废弃");
            n._onClear();
            t.ObjectDataParser.getInstance().parseTextureAtlasData(r, n, i);
            n.renderTexture = a;
            return n
        }
        a.toString = function() {
            return "[class dragonBones.EgretTextureAtlas]"
        };
        return a
    }(t.EgretTextureAtlasData);
    t.EgretTextureAtlas = l;
    var h = function(t) {
        __extends(e, t);

        function e() {
            return t !== null && t.apply(this, arguments) || this
        }
        return e
    }(l);
    t.EgretSheetAtlas = h;
    var f = function() {
        function e() {}
        e.getInstance = function() {
            console.warn("已废弃");
            return t.EgretFactory.factory.soundEventManager
        };
        return e
    }();
    t.SoundEventManager = f;
    var u = function() {
        function t() {
            console.warn("已废弃")
        }
        return t
    }();
    t.AnimationCacheManager = u
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = function(e) {
        __extends(a, e);

        function a() {
            var t = e !== null && e.apply(this, arguments) || this;
            t.transformUpdateEnabled = false;
            t._armatureDisplay = null;
            t._renderDisplay = null;
            t._colorFilter = null;
            return t
        }
        a.toString = function() {
            return "[class dragonBones.EgretSlot]"
        };
        a.prototype.init = function(a, r, i, n) {
            e.prototype.init.call(this, a, r, i, n);
            if (t.isV5) {
                this._updateTransform = this._updateTransformV5
            } else {
                this._updateTransform = this._updateTransformV4
            }
        };
        a.prototype._onClear = function() {
            e.prototype._onClear.call(this);
            this._armatureDisplay = null;
            this._renderDisplay = null;
            this._colorFilter = null
        };
        a.prototype._initDisplay = function(t, e) {
            t;
            e
        };
        a.prototype._disposeDisplay = function(t, e) {
            t;
            e
        };
        a.prototype._onUpdateDisplay = function() {
            this._armatureDisplay = this._armature.display;
            this._renderDisplay = this._display !== null ? this._display : this._rawDisplay;
            if (t.isV5 && this._armatureDisplay._batchEnabled) {
                if (this._renderDisplay === this._rawDisplay && !(this._renderDisplay.$renderNode instanceof egret.sys.BitmapNode)) {
                    this._renderDisplay.$renderNode = new egret.sys.BitmapNode
                }
            }
            if (this._armatureDisplay._batchEnabled) {
                if (this._renderDisplay !== this._rawDisplay && this._renderDisplay !== this._meshDisplay) {
                    this._armatureDisplay.disableBatch()
                } else {
                    var e = this._renderDisplay.$renderNode;
                    if (!e.matrix) {
                        e.matrix = new egret.Matrix
                    }
                }
            }
        };
        a.prototype._addDisplay = function() {
            if (this._armatureDisplay._batchEnabled) {
                this._armatureDisplay.$renderNode.addNode(this._renderDisplay.$renderNode)
            } else {
                this._armatureDisplay.addChild(this._renderDisplay)
            }
        };
        a.prototype._replaceDisplay = function(t) {
            var e = t;
            if (this._armatureDisplay._batchEnabled) {
                var a = this._armatureDisplay.$renderNode.drawData;
                a[a.indexOf(e.$renderNode)] = this._renderDisplay.$renderNode
            } else {
                this._armatureDisplay.addChild(this._renderDisplay);
                this._armatureDisplay.swapChildren(this._renderDisplay, e);
                this._armatureDisplay.removeChild(e)
            }
        };
        a.prototype._removeDisplay = function() {
            if (this._armatureDisplay._batchEnabled) {
                var t = this._armatureDisplay.$renderNode.drawData;
                t.splice(t.indexOf(this._renderDisplay.$renderNode), 1)
            } else {
                this._renderDisplay.parent.removeChild(this._renderDisplay)
            }
        };
        a.prototype._updateZOrder = function() {
            if (this._armatureDisplay._batchEnabled) {
                var t = this._armatureDisplay.$renderNode.drawData;
                t[this._zOrder] = this._renderDisplay.$renderNode
            } else {
                var e = this._armatureDisplay.getChildIndex(this._renderDisplay);
                if (e === this._zOrder) {
                    return
                }
                this._armatureDisplay.addChildAt(this._renderDisplay, this._zOrder)
            }
        };
        a.prototype._updateVisible = function() {
            var t = this._parent.visible && this._visible;
            if (this._armatureDisplay._batchEnabled) {
                var e = this._renderDisplay.$renderNode;
                e.alpha = t ? 1 : 0
            } else {
                this._renderDisplay.visible = t
            }
        };
        a.prototype._updateBlendMode = function() {
            switch (this._blendMode) {
                case 0:
                    this._renderDisplay.blendMode = egret.BlendMode.NORMAL;
                    break;
                case 1:
                    this._renderDisplay.blendMode = egret.BlendMode.ADD;
                    break;
                case 5:
                    this._renderDisplay.blendMode = egret.BlendMode.ERASE;
                    break;
                default:
                    break
            }
            if (this._armatureDisplay._batchEnabled) {
                var t = this._renderDisplay.$renderNode;
                t.blendMode = egret.sys.blendModeToNumber(this._renderDisplay.blendMode)
            }
        };
        a.prototype._updateColor = function() {
            if (this._colorTransform.redMultiplier !== 1 || this._colorTransform.greenMultiplier !== 1 || this._colorTransform.blueMultiplier !== 1 || this._colorTransform.redOffset !== 0 || this._colorTransform.greenOffset !== 0 || this._colorTransform.blueOffset !== 0 || this._colorTransform.alphaOffset !== 0) {
                if (this._colorFilter === null) {
                    this._colorFilter = new egret.ColorMatrixFilter
                }
                var t = this._colorFilter.matrix;
                t[0] = this._colorTransform.redMultiplier;
                t[6] = this._colorTransform.greenMultiplier;
                t[12] = this._colorTransform.blueMultiplier;
                t[18] = this._colorTransform.alphaMultiplier;
                t[4] = this._colorTransform.redOffset;
                t[9] = this._colorTransform.greenOffset;
                t[14] = this._colorTransform.blueOffset;
                t[19] = this._colorTransform.alphaOffset;
                this._colorFilter.matrix = t;
                if (this._armatureDisplay._batchEnabled) {
                    var e = this._renderDisplay.$renderNode;
                    e.filter = this._colorFilter;
                    e.alpha = 1
                }
                var a = this._renderDisplay.filters;
                if (!a) {
                    a = []
                }
                if (a.indexOf(this._colorFilter) < 0) {
                    a.push(this._colorFilter)
                }
                this._renderDisplay.filters = a;
                this._renderDisplay.alpha = 1
            } else {
                if (this._armatureDisplay._batchEnabled) {
                    var e = this._renderDisplay.$renderNode;
                    e.filter = null;
                    e.alpha = this._colorTransform.alphaMultiplier
                }
                this._renderDisplay.filters = null;
                this._renderDisplay.alpha = this._colorTransform.alphaMultiplier
            }
        };
        a.prototype._updateFrame = function() {
            var e = this._deformVertices !== null && this._display === this._meshDisplay ? this._deformVertices.verticesData : null;
            var a = this._textureData;
            if (this._displayIndex >= 0 && this._display !== null && a !== null) {
                if (this._armature.replacedTexture !== null && this._rawDisplayDatas !== null && this._rawDisplayDatas.indexOf(this._displayData) >= 0) {
                    var r = a.parent;
                    if (this._armature._replaceTextureAtlasData === null) {
                        r = t.BaseObject.borrowObject(t.EgretTextureAtlasData);
                        r.copyFrom(a.parent);
                        r.renderTexture = this._armature.replacedTexture;
                        this._armature._replaceTextureAtlasData = r
                    } else {
                        r = this._armature._replaceTextureAtlasData
                    }
                    a = r.getTexture(a.name)
                }
                if (a.renderTexture !== null) {
                    if (e !== null) {
                        var i = e.data;
                        var n = i.intArray;
                        var s = i.floatArray;
                        var o = n[e.offset + 0];
                        var l = n[e.offset + 1];
                        var h = n[e.offset + 2];
                        if (h < 0) {
                            h += 65536
                        }
                        var f = h + o * 2;
                        var u = this._armature._armatureData.scale;
                        var _ = this._renderDisplay;
                        var c = _.$renderNode;
                        c.uvs.length = o * 2;
                        c.vertices.length = o * 2;
                        c.indices.length = l * 3;
                        for (var p = 0, m = o * 2; p < m; ++p) {
                            c.vertices[p] = s[h + p] * u;
                            c.uvs[p] = s[f + p]
                        }
                        for (var p = 0; p < l * 3; ++p) {
                            c.indices[p] = n[e.offset + 4 + p]
                        }
                        if (this._armatureDisplay._batchEnabled) {
                            var d = a.renderTexture;
                            var v = this._renderDisplay.$renderNode;
                            egret.sys.RenderNode.prototype.cleanBeforeRender.call(v);
                            v.image = d.bitmapData;
                            if (t.isV5) {
                                v.drawMesh(d.$bitmapX, d.$bitmapY, d.$bitmapWidth, d.$bitmapHeight, d.$offsetX, d.$offsetY, d.textureWidth, d.textureHeight);
                                v.imageWidth = d.$sourceWidth;
                                v.imageHeight = d.$sourceHeight
                            } else {
                                var y = d;
                                v.drawMesh(y._bitmapX, y._bitmapY, y._bitmapWidth, y._bitmapHeight, y._offsetX, y._offsetY, y.textureWidth, y.textureHeight);
                                v.imageWidth = y._sourceWidth;
                                v.imageHeight = y._sourceHeight
                            }
                            this._blendModeDirty = true;
                            this._colorDirty = true
                        }
                        _.texture = a.renderTexture;
                        _.anchorOffsetX = this._pivotX;
                        _.anchorOffsetY = this._pivotY;
                        _.$updateVertices();
                        if (!t.isV5) {
                            _.$invalidateTransform()
                        }
                        var g = e.weight !== null;
                        var b = this._parent._boneData.type !== 0;
                        if (g || b) {
                            this._identityTransform()
                        }
                    } else {
                        var u = a.parent.scale * this._armature._armatureData.scale;
                        var D = (a.rotated ? a.region.height : a.region.width) * u;
                        var T = (a.rotated ? a.region.width : a.region.height) * u;
                        var A = this._renderDisplay;
                        var d = a.renderTexture;
                        A.texture = d;
                        if (this._armatureDisplay._batchEnabled) {
                            var v = this._renderDisplay.$renderNode;
                            egret.sys.RenderNode.prototype.cleanBeforeRender.call(v);
                            v.image = d.bitmapData;
                            if (t.isV5) {
                                v.drawImage(d.$bitmapX, d.$bitmapY, d.$bitmapWidth, d.$bitmapHeight, d.$offsetX, d.$offsetY, D, T);
                                v.imageWidth = d.$sourceWidth;
                                v.imageHeight = d.$sourceHeight
                            } else {
                                var y = d;
                                v.drawImage(y._bitmapX, y._bitmapY, y._bitmapWidth, y._bitmapHeight, y._offsetX, y._offsetY, D, T);
                                v.imageWidth = y._sourceWidth;
                                v.imageHeight = y._sourceHeight
                            }
                            this._blendModeDirty = true;
                            this._colorDirty = true
                        } else {
                            A.width = D;
                            A.height = T
                        }
                        A.anchorOffsetX = this._pivotX;
                        A.anchorOffsetY = this._pivotY
                    }
                    this._visibleDirty = true;
                    return
                }
            }
            if (this._armatureDisplay._batchEnabled) {
                this._renderDisplay.$renderNode.image = null
            }
            var x = this._renderDisplay;
            x.texture = null;
            x.x = 0;
            x.y = 0;
            x.visible = false
        };
        a.prototype._updateMesh = function() {
            var e = this._armature._armatureData.scale;
            var a = this._deformVertices.vertices;
            var r = this._deformVertices.bones;
            var i = this._deformVertices.verticesData;
            var n = i.weight;
            var s = a.length > 0 && i.inheritDeform;
            var o = this._renderDisplay;
            var l = o.$renderNode;
            if (n !== null) {
                var h = i.data;
                var f = h.intArray;
                var u = h.floatArray;
                var _ = f[i.offset + 0];
                var c = f[n.offset + 1];
                if (c < 0) {
                    c += 65536
                }
                for (var p = 0, m = 0, d = n.offset + 2 + r.length, v = c, y = 0; p < _; ++p) {
                    var g = f[d++];
                    var b = 0,
                        D = 0;
                    for (var T = 0; T < g; ++T) {
                        var A = f[d++];
                        var x = r[A];
                        if (x !== null) {
                            var P = x.globalTransformMatrix;
                            var O = u[v++];
                            var S = u[v++] * e;
                            var E = u[v++] * e;
                            if (s) {
                                S += a[y++];
                                E += a[y++]
                            }
                            b += (P.a * S + P.c * E + P.tx) * O;
                            D += (P.b * S + P.d * E + P.ty) * O
                        }
                    }
                    l.vertices[m++] = b;
                    l.vertices[m++] = D
                }
                o.$updateVertices();
                if (!t.isV5) {
                    o.$invalidateTransform()
                }
            } else if (s) {
                var M = this._parent._boneData.type !== 0;
                var h = i.data;
                var f = h.intArray;
                var u = h.floatArray;
                var _ = f[i.offset + 0];
                var B = f[i.offset + 2];
                if (B < 0) {
                    B += 65536
                }
                for (var p = 0, C = _ * 2; p < C; p += 2) {
                    var w = u[B + p] * e + a[p];
                    var I = u[B + p + 1] * e + a[p + 1];
                    if (M) {
                        var P = this._parent._getGlobalTransformMatrix(w, I);
                        l.vertices[p] = P.a * w + P.c * I + P.tx;
                        l.vertices[p + 1] = P.b * w + P.d * I + P.ty
                    } else {
                        l.vertices[p] = w;
                        l.vertices[p + 1] = I
                    }
                }
                o.$updateVertices();
                if (!t.isV5) {
                    o.$invalidateTransform()
                }
            }
            if (this._armatureDisplay._batchEnabled) {
                this._armatureDisplay._childDirty = true
            }
        };
        a.prototype._updateGlueMesh = function() {};
        a.prototype._updateTransform = function() {
            throw new Error
        };
        a.prototype._identityTransform = function() {
            if (this._armatureDisplay._batchEnabled) {
                this._armatureDisplay._childDirty = true;
                var t = this._renderDisplay.$renderNode.matrix;
                t.a = 1;
                t.b = 0;
                t.c = 0;
                t.d = 1;
                t.tx = 0;
                t.ty = 0
            } else {
                egret.$TempMatrix.identity();
                this._renderDisplay.$setMatrix(egret.$TempMatrix, this.transformUpdateEnabled)
            }
        };
        a.prototype._updateTransformV4 = function() {
            var t = this.globalTransformMatrix;
            if (this._armatureDisplay._batchEnabled) {
                this._armatureDisplay._childDirty = true;
                var e = this._renderDisplay.$renderNode.matrix;
                e.a = t.a;
                e.b = t.b;
                e.c = t.c;
                e.d = t.d;
                e.tx = this.globalTransformMatrix.tx - (this.globalTransformMatrix.a * this._pivotX + this.globalTransformMatrix.c * this._pivotY);
                e.ty = this.globalTransformMatrix.ty - (this.globalTransformMatrix.b * this._pivotX + this.globalTransformMatrix.d * this._pivotY)
            } else if (this.transformUpdateEnabled) {
                this._renderDisplay.$setMatrix(t, true)
            } else {
                var a = this._renderDisplay.$DisplayObject;
                var e = a[6];
                e.a = this.globalTransformMatrix.a;
                e.b = this.globalTransformMatrix.b;
                e.c = this.globalTransformMatrix.c;
                e.d = this.globalTransformMatrix.d;
                e.tx = this.globalTransformMatrix.tx;
                e.ty = this.globalTransformMatrix.ty;
                this._renderDisplay.$removeFlags(8);
                this._renderDisplay.$invalidatePosition()
            }
        };
        a.prototype._updateTransformV5 = function() {
            var t = this.globalTransformMatrix;
            if (this._armatureDisplay._batchEnabled) {
                this._armatureDisplay._childDirty = true;
                var e = this._renderDisplay.$renderNode.matrix;
                e.a = t.a;
                e.b = t.b;
                e.c = t.c;
                e.d = t.d;
                e.tx = this.globalTransformMatrix.tx - (this.globalTransformMatrix.a * this._pivotX + this.globalTransformMatrix.c * this._pivotY);
                e.ty = this.globalTransformMatrix.ty - (this.globalTransformMatrix.b * this._pivotX + this.globalTransformMatrix.d * this._pivotY)
            } else {
                this._renderDisplay.$setMatrix(t, this.transformUpdateEnabled)
            }
        };
        return a
    }(t.Slot);
    t.EgretSlot = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    t.isV5 = Number(egret.Capabilities.engineVersion.substr(0, 3)) >= 5.1;
    var e = function(e) {
        __extends(a, e);

        function a(r) {
            if (r === void 0) {
                r = null
            }
            var i = e.call(this, r) || this;
            if (a._dragonBonesInstance === null) {
                var n = new t.EgretArmatureDisplay;
                a._dragonBonesInstance = new t.DragonBones(n);
                a._time = egret.getTimer() * .001;
                egret.startTick(a._clockHandler, a)
            }
            i._dragonBones = a._dragonBonesInstance;
            return i
        }
        a._clockHandler = function(t) {
            t *= .001;
            var e = t - this._time;
            a._dragonBonesInstance.advanceTime(e);
            this._time = t;
            return false
        };
        Object.defineProperty(a, "factory", {
            get: function() {
                if (a._factory === null) {
                    a._factory = new a
                }
                return a._factory
            },
            enumerable: true,
            configurable: true
        });
        a.prototype._isSupportMesh = function() {
            if (egret.Capabilities.renderMode === "webgl" || egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
                return true
            }
            console.warn("Canvas can not support mesh, please change renderMode to webgl.");
            return false
        };
        a.prototype._buildTextureAtlasData = function(e, a) {
            if (e !== null) {
                if (a instanceof egret.Texture) {
                    e.renderTexture = a
                } else {
                    var r = new egret.Texture;
                    r.bitmapData = new egret.BitmapData(a);
                    e.disposeEnabled = true;
                    e.renderTexture = r
                }
            } else {
                e = t.BaseObject.borrowObject(t.EgretTextureAtlasData)
            }
            return e
        };
        a.prototype._buildArmature = function(e) {
            var a = t.BaseObject.borrowObject(t.Armature);
            var r = new t.EgretArmatureDisplay;
            a.init(e.armature, r, r, this._dragonBones);
            return a
        };
        a.prototype._buildSlot = function(e, a, r) {
            e;
            var i = t.BaseObject.borrowObject(t.EgretSlot);
            i.init(a, r, new egret.Bitmap, new egret.Mesh);
            return i
        };
        a.prototype.buildArmatureDisplay = function(t, e, a, r) {
            if (e === void 0) {
                e = ""
            }
            if (a === void 0) {
                a = ""
            }
            if (r === void 0) {
                r = ""
            }
            var i = this.buildArmature(t, e || "", a || "", r || "");
            if (i !== null) {
                this._dragonBones.clock.add(i);
                return i.display
            }
            return null
        };
        a.prototype.getTextureDisplay = function(t, e) {
            if (e === void 0) {
                e = null
            }
            var a = this._getTextureData(e !== null ? e : "", t);
            if (a !== null && a.renderTexture !== null) {
                var r = a.renderTexture;
                var i = new egret.Bitmap(r);
                i.width = r.textureWidth * a.parent.scale;
                i.height = r.textureHeight * a.parent.scale;
                return i
            }
            return null
        };
        Object.defineProperty(a.prototype, "soundEventManager", {
            get: function() {
                return this._dragonBones.eventManager
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(a, "clock", {
            get: function() {
                return a.factory.clock
            },
            enumerable: true,
            configurable: true
        });
        a.prototype.addSkeletonData = function(t, e) {
            if (e === void 0) {
                e = null
            }
            console.warn("已废弃");
            this.addDragonBonesData(t, e)
        };
        a.prototype.getSkeletonData = function(t) {
            console.warn("已废弃");
            return this.getDragonBonesData(t)
        };
        a.prototype.removeSkeletonData = function(t) {
            console.warn("已废弃");
            this.removeDragonBonesData(t)
        };
        a.prototype.addTextureAtlas = function(t, e) {
            if (e === void 0) {
                e = null
            }
            console.warn("已废弃");
            this.addTextureAtlasData(t, e)
        };
        a.prototype.getTextureAtlas = function(t) {
            console.warn("已废弃");
            return this.getTextureAtlasData(t)
        };
        a.prototype.removeTextureAtlas = function(t) {
            console.warn("已废弃");
            this.removeTextureAtlasData(t)
        };
        a.prototype.buildFastArmature = function(t, e, a) {
            if (e === void 0) {
                e = ""
            }
            if (a === void 0) {
                a = ""
            }
            console.warn("已废弃");
            return this.buildArmature(t, e || "", a || "")
        };
        a.prototype.dispose = function() {
            console.warn("已废弃");
            this.clear()
        };
        a._time = 0;
        a._dragonBonesInstance = null;
        a._factory = null;
        return a
    }(t.BaseFactory);
    t.EgretFactory = e
})(dragonBones || (dragonBones = {}));
var dragonBones;
(function(t) {
    var e = new egret.Rectangle;
    var a = new egret.Matrix;
    var r = {};

    function i(t, e) {
        for (var a = 0, r = t.length; a < r; ++a) {
            var i = t[a];
            if (i.name === e) {
                return i
            }
        }
        return null
    }

    function n(t) {
        if (t.groupName) {
            var e = r[t.groupName];
            if (e) {
                var a = i(e.movie || e.animation, t.movieName);
                if (a) {
                    t.groupConfig = e;
                    t.movieConfig = a;
                    return true
                }
            }
        }
        if (!t.groupName) {
            for (var n in r) {
                var e = r[n];
                if (!t.groupName) {
                    var a = i(e.movie || e.animation, t.movieName);
                    if (a) {
                        t.groupName = n;
                        t.groupConfig = e;
                        t.movieConfig = a;
                        return true
                    }
                }
            }
        }
        return false
    }

    function s(t) {
        return t in r
    }
    t.hasMovieGroup = s;

    function o(t, e, a) {
        if (a === void 0) {
            a = null
        }
        if (t) {
            var i = new egret.ByteArray(t);
            i.endian = egret.Endian.LITTLE_ENDIAN;
            i.position = 8;
            var n = JSON.parse(i.readUTF());
            n.offset = i.position;
            n.arrayBuffer = t;
            n.textures = [];
            var s = n.offset % 4;
            if (s) {
                n.offset += 4 - s
            }
            for (var o = 0, l = n.position.length; o < l; o += 3) {
                switch (o / 3) {
                    case 1:
                        n.displayFrameArray = new Int16Array(n.arrayBuffer, n.offset + n.position[o], n.position[o + 1] / n.position[o + 2]);
                        break;
                    case 2:
                        n.rectangleArray = new Float32Array(n.arrayBuffer, n.offset + n.position[o], n.position[o + 1] / n.position[o + 2]);
                        break;
                    case 3:
                        n.transformArray = new Float32Array(n.arrayBuffer, n.offset + n.position[o], n.position[o + 1] / n.position[o + 2]);
                        break;
                    case 4:
                        n.colorArray = new Int16Array(n.arrayBuffer, n.offset + n.position[o], n.position[o + 1] / n.position[o + 2]);
                        break
                }
            }
            a = a || n.name;
            if (r[a]) {
                console.warn("Replace group: " + a)
            }
            r[a] = n;
            if (e instanceof Array) {
                for (var o = 0, l = e.length; o < l; ++o) {
                    var h = e[o];
                    n.textures.push(h)
                }
            } else {
                n.textures.push(e)
            }
        } else {
            throw new Error
        }
    }
    t.addMovieGroup = o;

    function l(t) {
        var e = r[t];
        if (e) {
            delete r[t]
        }
    }
    t.removeMovieGroup = l;

    function h() {
        for (var t in r) {
            delete r[t]
        }
    }
    t.removeAllMovieGroup = h;

    function f(e, a) {
        if (a === void 0) {
            a = null
        }
        var r = {
            movieName: e,
            groupName: a
        };
        if (n(r)) {
            var i = new p(r);
            i.clock = t.EgretFactory.factory.clock;
            return i
        } else {
            console.warn("No movie named: " + e)
        }
        return null
    }
    t.buildMovie = f;

    function u(t) {
        var e = r[t];
        if (e) {
            var a = [];
            var i = e.movie || e.animation;
            for (var n = 0, s = i.length; n < s; ++n) {
                a.push(i[n].name)
            }
            return a
        } else {
            console.warn("No group named: " + t)
        }
        return null
    }
    t.getMovieNames = u;
    var _ = function(t) {
        __extends(e, t);

        function e(e) {
            var a = t.call(this, e) || this;
            a.name = "";
            a.slotName = "";
            a.clipName = "";
            return a
        }
        Object.defineProperty(e.prototype, "armature", {
            get: function() {
                return this.movie
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "bone", {
            get: function() {
                return null
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "animationState", {
            get: function() {
                return {
                    name: this.clipName
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "frameLabel", {
            get: function() {
                return this.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "movementID", {
            get: function() {
                return this.clipName
            },
            enumerable: true,
            configurable: true
        });
        e.START = "start";
        e.LOOP_COMPLETE = "loopComplete";
        e.COMPLETE = "complete";
        e.FRAME_EVENT = "frameEvent";
        e.SOUND_EVENT = "soundEvent";
        return e
    }(egret.Event);
    t.MovieEvent = _;
    var c = function(t) {
        __extends(e, t);

        function e(e) {
            var a = t.call(this) || this;
            a.displayIndex = -1;
            a.colorIndex = -1;
            a.transformIndex = -1;
            a.rawDisplay = new egret.Bitmap;
            a.childMovies = {};
            a.displayConfig = null;
            a.childMovie = null;
            a.colorFilter = null;
            a.display = a.rawDisplay;
            a.config = e;
            a.rawDisplay.name = a.config.name;
            if (!a.config.blendMode) {
                a.config.blendMode = 0
            }
            return a
        }
        e.prototype.dispose = function() {
            this.rawDisplay = null;
            this.childMovies = null;
            this.config = null;
            this.displayConfig = null;
            this.display = null;
            this.childMovie = null;
            this.colorFilter = null
        };
        return e
    }(egret.HashObject);
    var p = function(r) {
        __extends(i, r);

        function i(t) {
            var e = r.call(this) || this;
            e.timeScale = 1;
            e.clipTimeScale = 1;
            e._batchEnabled = true;
            e._isLockDispose = false;
            e._isDelayDispose = false;
            e._isStarted = false;
            e._isPlaying = false;
            e._isReversing = false;
            e._isCompleted = false;
            e._playTimes = 0;
            e._time = 0;
            e._currentTime = 0;
            e._currentPlayTimes = 0;
            e._cacheFrameIndex = 0;
            e._frameSize = 0;
            e._cacheRectangle = null;
            e._clock = null;
            e._currentFrameConfig = null;
            e._clipNames = [];
            e._slots = [];
            e._childMovies = [];
            e._groupConfig = t.groupConfig;
            e._config = t.movieConfig;
            e._batchEnabled = !(e._config.isNested || e._config.hasChildAnimation);
            if (e._batchEnabled) {
                e.$renderNode = new egret.sys.GroupNode;
                e.$renderNode.cleanBeforeRender = i._cleanBeforeRender
            }
            e._clipNames.length = 0;
            for (var a = 0, n = e._config.clip.length; a < n; ++a) {
                e._clipNames.push(e._config.clip[a].name)
            }
            for (var a = 0, n = e._config.slot.length; a < n; ++a) {
                var s = new c(e._config.slot[a]);
                e._updateSlotBlendMode(s);
                e._slots.push(s);
                if (e._batchEnabled) {
                    e.$renderNode.addNode(s.rawDisplay.$renderNode)
                } else {
                    e.addChild(s.rawDisplay)
                }
            }
            e._frameSize = (1 + 1) * e._slots.length;
            e.name = e._config.name;
            e.play();
            e.advanceTime(1e-6);
            e.stop();
            return e
        }
        i._cleanBeforeRender = function() {};
        i.prototype._configToEvent = function(t, e) {
            e.movie = this;
            e.clipName = this._clipConfig.name;
            e.name = t.name;
            e.slotName = t.slot || ""
        };
        i.prototype._onCrossFrame = function(e) {
            for (var a = 0, r = e.actionAndEvent.length; a < r; ++a) {
                var i = e.actionAndEvent[a];
                if (i) {
                    switch (i.type) {
                        case 11:
                            if (t.EgretFactory.factory.soundEventManager.hasEventListener(_.SOUND_EVENT)) {
                                var n = egret.Event.create(_, _.SOUND_EVENT);
                                this._configToEvent(i, n);
                                t.EgretFactory.factory.soundEventManager.dispatchEvent(n);
                                egret.Event.release(n)
                            }
                            break;
                        case 10:
                            if (this.hasEventListener(_.FRAME_EVENT)) {
                                var s = egret.Event.create(_, _.FRAME_EVENT);
                                this._configToEvent(i, s);
                                this.dispatchEvent(s);
                                egret.Event.release(s)
                            }
                            break;
                        case 0:
                            if (i.slot) {
                                var o = this._getSlot(i.slot);
                                if (o && o.childMovie) {
                                    o.childMovie.play(i.name)
                                }
                            } else {
                                this.play(i.name)
                            }
                            break
                    }
                }
            }
        };
        i.prototype._updateSlotBlendMode = function(t) {
            var e = "";
            switch (t.config.blendMode) {
                case 0:
                    e = egret.BlendMode.NORMAL;
                    break;
                case 1:
                    e = egret.BlendMode.ADD;
                    break;
                case 5:
                    e = egret.BlendMode.ERASE;
                    break;
                default:
                    break
            }
            if (e) {
                if (this._batchEnabled) {
                    t.display.$renderNode.blendMode = egret.sys.blendModeToNumber(e)
                } else {
                    t.display.blendMode = e
                }
            }
        };
        i.prototype._updateSlotColor = function(t, e, a, r, i, n, s, o, l) {
            if (a !== 1 || r !== 1 || i !== 1 || s !== 0 || o !== 0 || l !== 0 || n !== 0) {
                if (!t.colorFilter) {
                    t.colorFilter = new egret.ColorMatrixFilter
                }
                var h = t.colorFilter.matrix;
                h[0] = a;
                h[6] = r;
                h[12] = i;
                h[18] = e;
                h[4] = s;
                h[9] = o;
                h[14] = l;
                h[19] = n;
                t.colorFilter.matrix = h;
                if (this._batchEnabled) {
                    t.display.$renderNode.filter = t.colorFilter;
                    t.display.$renderNode.alpha = 1
                } else {
                    var f = t.display.filters;
                    if (!f) {
                        f = []
                    }
                    if (f.indexOf(t.colorFilter) < 0) {
                        f.push(t.colorFilter)
                    }
                    t.display.filters = f;
                    t.display.$setAlpha(1)
                }
            } else {
                if (t.colorFilter) {
                    t.colorFilter = null
                }
                if (this._batchEnabled) {
                    t.display.$renderNode.filter = null;
                    t.display.$renderNode.alpha = e
                } else {
                    t.display.filters = null;
                    t.display.$setAlpha(e)
                }
            }
        };
        i.prototype._updateSlotDisplay = function(e) {
            var a = e.display || e.rawDisplay;
            var r = e.childMovie;
            if (e.displayIndex >= 0) {
                e.displayConfig = this._groupConfig.display[e.displayIndex];
                if (e.displayConfig.type === 1) {
                    var i = e.displayConfig.name in e.childMovies ? e.childMovies[e.displayConfig.name] : null;
                    if (!i) {
                        i = f(e.displayConfig.name, this._groupConfig.name);
                        if (i) {
                            e.childMovies[e.displayConfig.name] = i
                        }
                    }
                    if (i) {
                        e.display = i;
                        e.childMovie = i
                    } else {
                        e.display = e.rawDisplay;
                        e.childMovie = null
                    }
                } else {
                    e.display = e.rawDisplay;
                    e.childMovie = null
                }
            } else {
                e.displayConfig = null;
                e.display = e.rawDisplay;
                e.childMovie = null
            }
            if (e.display !== a) {
                if (a) {
                    this.addChild(e.display);
                    this.swapChildren(e.display, a);
                    this.removeChild(a)
                }
                this._updateSlotBlendMode(e)
            }
            if (e.display === e.rawDisplay) {
                if (e.displayConfig && e.displayConfig.regionIndex !== null && e.displayConfig.regionIndex !== undefined) {
                    if (!e.displayConfig.texture) {
                        var n = this._groupConfig.textures[e.displayConfig.textureIndex || 0];
                        var s = e.displayConfig.regionIndex * 4;
                        var o = this._groupConfig.rectangleArray[s];
                        var l = this._groupConfig.rectangleArray[s + 1];
                        var h = this._groupConfig.rectangleArray[s + 2];
                        var u = this._groupConfig.rectangleArray[s + 3];
                        e.displayConfig.texture = new egret.Texture;
                        e.displayConfig.texture.bitmapData = n.bitmapData;
                        e.displayConfig.texture.$initData(o, l, Math.min(h, n.textureWidth - o), Math.min(u, n.textureHeight - l), 0, 0, Math.min(h, n.textureWidth - o), Math.min(u, n.textureHeight - l), n.textureWidth, n.textureHeight)
                    }
                    if (this._batchEnabled) {
                        var _ = e.displayConfig.texture;
                        var c = e.rawDisplay.$renderNode;
                        egret.sys.RenderNode.prototype.cleanBeforeRender.call(e.rawDisplay.$renderNode);
                        c.image = _.bitmapData;
                        if (t.isV5) {
                            c.drawImage(_.$bitmapX, _.$bitmapY, _.$bitmapWidth, _.$bitmapHeight, _.$offsetX, _.$offsetY, _.textureWidth, _.textureHeight);
                            c.imageWidth = _._sourceWidth;
                            c.imageHeight = _._sourceHeight
                        } else {
                            var p = _;
                            c.drawImage(p._bitmapX, p._bitmapY, p._bitmapWidth, p._bitmapHeight, p._offsetX, p._offsetY, _.textureWidth, _.textureHeight);
                            c.imageWidth = p._sourceWidth;
                            c.imageHeight = p._sourceHeight
                        }
                    } else {
                        e.rawDisplay.visible = true;
                        e.rawDisplay.$setBitmapData(e.displayConfig.texture)
                    }
                } else {
                    if (this._batchEnabled) {
                        e.rawDisplay.$renderNode.image = null
                    } else {
                        e.rawDisplay.visible = false;
                        e.rawDisplay.$setBitmapData(null)
                    }
                }
            }
            if (e.childMovie !== r) {
                if (r) {
                    r.stop();
                    this._childMovies.slice(this._childMovies.indexOf(r), 1)
                }
                if (e.childMovie) {
                    if (this._childMovies.indexOf(e.childMovie) < 0) {
                        this._childMovies.push(e.childMovie)
                    }
                    if (e.config.action) {
                        e.childMovie.play(e.config.action)
                    } else {
                        e.childMovie.play(e.childMovie._config.action)
                    }
                }
            }
        };
        i.prototype._getSlot = function(t) {
            for (var e = 0, a = this._slots.length; e < a; ++e) {
                var r = this._slots[e];
                if (r.config.name === t) {
                    return r
                }
            }
            return null
        };
        i.prototype.$render = function() {
            if (this._batchEnabled) {} else {
                r.prototype.$render.call(this)
            }
        };
        i.prototype.$updateRenderNode = function() {
            if (this._batchEnabled) {} else {
                r.prototype.$updateRenderNode.call(this)
            }
        };
        i.prototype.$measureContentBounds = function(t) {
            if (this._batchEnabled && this._cacheRectangle) {
                t.setTo(this._cacheRectangle.x, this._cacheRectangle.y, this._cacheRectangle.width - this._cacheRectangle.x, this._cacheRectangle.height - this._cacheRectangle.y)
            } else {
                r.prototype.$measureContentBounds.call(this, t)
            }
        };
        i.prototype.$doAddChild = function(t, e, a) {
            if (this._batchEnabled) {
                console.warn("Can not add child.");
                return null
            }
            return r.prototype.$doAddChild.call(this, t, e, a)
        };
        i.prototype.$doRemoveChild = function(t, e) {
            if (this._batchEnabled) {
                console.warn("Can not remove child.");
                return null
            }
            return r.prototype.$doRemoveChild.call(this, t, e)
        };
        i.prototype.dispose = function() {
            if (this._isLockDispose) {
                this._isDelayDispose = true
            } else {
                if (this._clock) {
                    this._clock.remove(this)
                }
                if (this._slots) {
                    for (var t = 0, e = this._slots.length; t < e; ++t) {
                        this._slots[t].dispose()
                    }
                }
                this._isPlaying = false;
                this._cacheRectangle = null;
                this._clock = null;
                this._groupConfig = null;
                this._config = null;
                this._clipConfig = null;
                this._currentFrameConfig = null;
                this._clipArray = null;
                this._clipNames = null;
                this._slots = null;
                this._childMovies = null
            }
        };
        i.prototype.advanceTime = function(r) {
            if (this._isPlaying) {
                this._isLockDispose = true;
                if (r < 0) {
                    r = -r
                }
                r *= this.timeScale;
                this._time += r * this.clipTimeScale;
                var i = this._clipConfig.duration;
                var n = i * this._playTimes;
                var s = this._time;
                var o = this._currentPlayTimes;
                if (this._playTimes > 0 && (s >= n || s <= -n)) {
                    this._isCompleted = true;
                    o = this._playTimes;
                    if (s < 0) {
                        s = 0
                    } else {
                        s = i
                    }
                } else {
                    this._isCompleted = false;
                    if (s < 0) {
                        o = Math.floor(-s / i);
                        s = i - -s % i
                    } else {
                        o = Math.floor(s / i);
                        s %= i
                    }
                    if (this._playTimes > 0 && o > this._playTimes) {
                        o = this._playTimes
                    }
                }
                if (this._currentTime === s) {
                    return
                }
                var l = Math.floor(s * this._clipConfig.cacheTimeToFrameScale);
                if (this._cacheFrameIndex !== l) {
                    this._cacheFrameIndex = l;
                    var h = this._groupConfig.displayFrameArray;
                    var f = this._groupConfig.transformArray;
                    var u = this._groupConfig.colorArray;
                    var c = true;
                    var p = false;
                    var m = false;
                    var d = this._cacheRectangle;
                    this._cacheRectangle = this._clipConfig.cacheRectangles[this._cacheFrameIndex];
                    if (this._batchEnabled && !this._cacheRectangle) {
                        m = true;
                        this._cacheRectangle = new egret.Rectangle;
                        this._clipConfig.cacheRectangles[this._cacheFrameIndex] = this._cacheRectangle
                    }
                    for (var v = 0, y = this._slots.length; v < y; ++v) {
                        var g = this._slots[v];
                        var b = this._frameSize * this._cacheFrameIndex + v * 2;
                        if (b >= this._clipArray.length) {
                            b = this._frameSize * (this._cacheFrameIndex - 1) + v * 2
                        }
                        var D = this._clipArray[b] * 2;
                        if (D >= 0) {
                            var T = h[D];
                            var A = h[D + 1] * 8;
                            var x = this._clipArray[b + 1] * 6;
                            var P = false;
                            if (g.displayIndex !== T) {
                                g.displayIndex = T;
                                P = true;
                                this._updateSlotDisplay(g)
                            }
                            if (g.colorIndex !== A || P) {
                                g.colorIndex = A;
                                if (g.colorIndex >= 0) {
                                    this._updateSlotColor(g, u[A] * .01, u[A + 1] * .01, u[A + 2] * .01, u[A + 3] * .01, u[A + 4], u[A + 5], u[A + 6], u[A + 7])
                                } else {
                                    this._updateSlotColor(g, 1, 1, 1, 1, 0, 0, 0, 0)
                                }
                            }
                            p = true;
                            if (g.transformIndex !== x) {
                                g.transformIndex = x;
                                if (this._batchEnabled) {
                                    var O = g.display.$renderNode.matrix;
                                    if (!O) {
                                        O = g.display.$renderNode.matrix = new egret.Matrix
                                    }
                                    O.a = f[x];
                                    O.b = f[x + 1];
                                    O.c = f[x + 2];
                                    O.d = f[x + 3];
                                    O.tx = f[x + 4];
                                    O.ty = f[x + 5]
                                } else {
                                    a.a = f[x];
                                    a.b = f[x + 1];
                                    a.c = f[x + 2];
                                    a.d = f[x + 3];
                                    a.tx = f[x + 4];
                                    a.ty = f[x + 5];
                                    g.display.$setMatrix(a)
                                }
                            }
                            if (this._batchEnabled && m && g.displayConfig) {
                                var O = g.display.$renderNode.matrix;
                                e.x = 0;
                                e.y = 0;
                                e.width = g.displayConfig.texture.textureWidth;
                                e.height = g.displayConfig.texture.textureHeight;
                                O.$transformBounds(e);
                                if (c) {
                                    c = false;
                                    this._cacheRectangle.x = e.x;
                                    this._cacheRectangle.width = e.x + e.width;
                                    this._cacheRectangle.y = e.y;
                                    this._cacheRectangle.height = e.y + e.height
                                } else {
                                    this._cacheRectangle.x = Math.min(this._cacheRectangle.x, e.x);
                                    this._cacheRectangle.width = Math.max(this._cacheRectangle.width, e.x + e.width);
                                    this._cacheRectangle.y = Math.min(this._cacheRectangle.y, e.y);
                                    this._cacheRectangle.height = Math.max(this._cacheRectangle.height, e.y + e.height)
                                }
                            }
                        } else if (g.displayIndex !== -1) {
                            g.displayIndex = -1;
                            this._updateSlotDisplay(g)
                        }
                    }
                    if (this._cacheRectangle) {
                        if (p && m && c && d) {
                            this._cacheRectangle.x = d.x;
                            this._cacheRectangle.y = d.y;
                            this._cacheRectangle.width = d.width;
                            this._cacheRectangle.height = d.height
                        }
                        if (!t.isV5) {
                            this.$invalidateContentBounds()
                        }
                    }
                }
                if (this._isCompleted) {
                    this._isPlaying = false
                }
                if (!this._isStarted) {
                    this._isStarted = true;
                    if (this.hasEventListener(_.START)) {
                        var S = egret.Event.create(_, _.START);
                        S.movie = this;
                        S.clipName = this._clipConfig.name;
                        S.name = "";
                        S.slotName = "";
                        this.dispatchEvent(S)
                    }
                }
                this._isReversing = this._currentTime > s && this._currentPlayTimes === o;
                this._currentTime = s;
                var E = this._clipConfig.frame ? this._clipConfig.frame.length : 0;
                if (E > 0) {
                    var M = Math.floor(this._currentTime * this._config.frameRate);
                    var B = this._groupConfig.frame[this._clipConfig.frame[M]];
                    if (this._currentFrameConfig !== B) {
                        if (E > 1) {
                            var C = this._currentFrameConfig;
                            this._currentFrameConfig = B;
                            if (!C) {
                                var w = Math.floor(this._currentTime * this._config.frameRate);
                                C = this._groupConfig.frame[this._clipConfig.frame[w]];
                                if (this._isReversing) {} else {
                                    if (this._currentTime <= C.position || this._currentPlayTimes !== o) {
                                        C = this._groupConfig.frame[C.prev]
                                    }
                                }
                            }
                            if (this._isReversing) {
                                while (C !== B) {
                                    this._onCrossFrame(C);
                                    C = this._groupConfig.frame[C.prev]
                                }
                            } else {
                                while (C !== B) {
                                    C = this._groupConfig.frame[C.next];
                                    this._onCrossFrame(C)
                                }
                            }
                        } else {
                            this._currentFrameConfig = B;
                            if (this._currentFrameConfig) {
                                this._onCrossFrame(this._currentFrameConfig)
                            }
                        }
                    }
                }
                if (this._currentPlayTimes !== o) {
                    this._currentPlayTimes = o;
                    if (this.hasEventListener(_.LOOP_COMPLETE)) {
                        var I = egret.Event.create(_, _.LOOP_COMPLETE);
                        I.movie = this;
                        I.clipName = this._clipConfig.name;
                        I.name = "";
                        I.slotName = "";
                        this.dispatchEvent(I);
                        egret.Event.release(I)
                    }
                    if (this._isCompleted && this.hasEventListener(_.COMPLETE)) {
                        var F = egret.Event.create(_, _.COMPLETE);
                        F.movie = this;
                        F.clipName = this._clipConfig.name;
                        F.name = "";
                        F.slotName = "";
                        this.dispatchEvent(F);
                        egret.Event.release(F)
                    }
                }
            }
            this._isLockDispose = false;
            if (this._isDelayDispose) {
                this.dispose()
            }
        };
        i.prototype.play = function(t, e) {
            if (t === void 0) {
                t = null
            }
            if (e === void 0) {
                e = -1
            }
            if (t) {
                var a = null;
                for (var r = 0, i = this._config.clip.length; r < i; ++r) {
                    var n = this._config.clip[r];
                    if (n.name === t) {
                        a = n
                    }
                }
                if (a) {
                    this._clipConfig = a;
                    this._clipArray = new Int16Array(this._groupConfig.arrayBuffer, this._groupConfig.offset + this._groupConfig.position[0] + this._clipConfig.p, this._clipConfig.s / this._groupConfig.position[2]);
                    if (!this._clipConfig.cacheRectangles) {
                        this._clipConfig.cacheRectangles = []
                    }
                    this._isPlaying = true;
                    this._isStarted = false;
                    this._isCompleted = false;
                    if (e < 0 || e !== e) {
                        this._playTimes = this._clipConfig.playTimes
                    } else {
                        this._playTimes = e
                    }
                    this._time = 0;
                    this._currentTime = 0;
                    this._currentPlayTimes = 0;
                    this._cacheFrameIndex = -1;
                    this._currentFrameConfig = null;
                    this._cacheRectangle = null;
                    this.clipTimeScale = 1 / this._clipConfig.scale
                } else {
                    console.warn("No clip in movie.", this._config.name, t)
                }
            } else if (this._clipConfig) {
                if (this._isPlaying || this._isCompleted) {
                    this.play(this._clipConfig.name, this._playTimes)
                } else {
                    this._isPlaying = true
                }
            } else if (this._config.action) {
                this.play(this._config.action, e)
            }
        };
        i.prototype.stop = function() {
            this._isPlaying = false
        };
        i.prototype.gotoAndPlay = function(t, e, a) {
            if (t === void 0) {
                t = null
            }
            if (a === void 0) {
                a = -1
            }
            e %= this._clipConfig.duration;
            if (e < 0) {
                e += this._clipConfig.duration
            }
            this.play(t, a);
            this._time = e;
            this._currentTime = e
        };
        i.prototype.gotoAndStop = function(t, e) {
            if (t === void 0) {
                t = null
            }
            e %= this._clipConfig.duration;
            if (e < 0) {
                e += this._clipConfig.duration
            }
            this.play(t, 1);
            this._time = e;
            this._currentTime = e;
            this.advanceTime(.001);
            this.stop()
        };
        i.prototype.hasClip = function(t) {
            for (var e = 0, a = this._config.clip.length; e < a; ++e) {
                var r = this._config.clip[e];
                if (r.name === t) {
                    return true
                }
            }
            return false
        };
        Object.defineProperty(i.prototype, "isPlaying", {
            get: function() {
                return this._isPlaying && !this._isCompleted
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "isComplete", {
            get: function() {
                return this._isCompleted
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "currentTime", {
            get: function() {
                return this._currentTime
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "totalTime", {
            get: function() {
                return this._clipConfig ? this._clipConfig.duration : 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "currentPlayTimes", {
            get: function() {
                return this._currentPlayTimes
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "playTimes", {
            get: function() {
                return this._playTimes
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "groupName", {
            get: function() {
                return this._groupConfig.name
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "clipName", {
            get: function() {
                return this._clipConfig ? this._clipConfig.name : ""
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "clipNames", {
            get: function() {
                return this._clipNames
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "clock", {
            get: function() {
                return this._clock
            },
            set: function(t) {
                if (this._clock === t) {
                    return
                }
                var e = this._clock;
                if (e) {
                    e.remove(this)
                }
                this._clock = t;
                if (this._clock) {
                    this._clock.add(this)
                }
            },
            enumerable: true,
            configurable: true
        });
        i.prototype.advanceTimeBySelf = function(e) {
            if (e) {
                this.clock = t.EgretFactory.clock
            } else {
                this.clock = null
            }
        };
        Object.defineProperty(i.prototype, "display", {
            get: function() {
                return this
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "animation", {
            get: function() {
                return this
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "armature", {
            get: function() {
                return this
            },
            enumerable: true,
            configurable: true
        });
        i.prototype.getAnimation = function() {
            return this
        };
        i.prototype.getArmature = function() {
            return this
        };
        i.prototype.getDisplay = function() {
            return this
        };
        i.prototype.hasAnimation = function(t) {
            return this.hasClip(t)
        };
        i.prototype.invalidUpdate = function() {
            var t = [];
            for (var e = 0; e < arguments.length; e++) {
                t[e] = arguments[e]
            }
            t
        };
        Object.defineProperty(i.prototype, "lastAnimationName", {
            get: function() {
                return this.clipName
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "animationNames", {
            get: function() {
                return this.clipNames
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(i.prototype, "animationList", {
            get: function() {
                return this.clipNames
            },
            enumerable: true,
            configurable: true
        });
        return i
    }(egret.DisplayObjectContainer);
    t.Movie = p
})(dragonBones || (dragonBones = {}));