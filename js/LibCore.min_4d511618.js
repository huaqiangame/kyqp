var __reflect = this && this.__reflect || function (e, t, r) {
    e.__class__ = t, r ? r.push(t) : r = [t], e.__types__ = e.__types__ ? r.concat(e.__types__) : r
},
    __extends = this && this.__extends || function () {
        var e = Object.setPrototypeOf || {
            __proto__: []
        }
            instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            };
        return function (t, r) {
            function n() {
                this.constructor = t
            }
            e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
        }
    }(),
    LibCore;
! function (e) {
    var t = function (t) {
        function r() {
            var r = t.call(this) || this;
            return r._content = new e.ByteArrayLittle, r
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "content", {
            get: function () {
                return this._content
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.read = function (t, r) {
            return this.content.length = r, t.readBytes(this.content, 0, r), this.content.position = 0, this.readContent() ? !0 : (e.SocketInterface.errorLog && e.SocketInterface.errorLog("Read packet content error: " + this), !1)
        }, r.prototype.write = function () {
            if (this.content.length = 0, !this.writeContent()) return e.SocketInterface.errorLog && e.SocketInterface.errorLog("Write packet content error: " + this), 0;
            var t = this.content.length;
            return t || e.SocketInterface.errorLog && e.SocketInterface.errorLog("Write packet empty: " + this), t
        }, r.prototype.readContent = function () {
            return !0
        }, r.prototype.writeContent = function () {
            return !0
        }, r.prototype.handle = function () { }, r.prototype.toString = function () {
            return "<Packet len=" + this.content.length + ">"
        }, r
    }(egret.HashObject);
    e.Packet = t, __reflect(t.prototype, "LibCore.Packet")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r() {
            var e = t.call(this) || this;
            return e._packetLen = 0, e.catchRecvErrors = !1, e
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "connected", {
            get: function () {
                return this._socket && this._socket.connected
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "encryptSeed", {
            get: function () {
                return this._encryptSeed
            },
            set: function (t) {
                t = Math.floor(t), this._encryptSeed != t && (this._encryptSeed = t, e.SocketInterface.debugLog && e.SocketInterface.debugLog("Set socket encrypt seed to: " + t), t && (this._encrypter = new e.Ctx(t ^ r.GENIUS_NUMBER), this._decrypter = new e.Ctx(t ^ r.GENIUS_NUMBER)))
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.connect = function (t) {
            this.disconnect();
            try {
                this._connInfo = t, e.SocketInterface.debugLog && e.SocketInterface.debugLog("Connect to socket: " + this._connInfo), this.initSocket();
                var r = -1 != window.location.toString().indexOf("https") ? "wss://" : "wss://";
                0 == this._connInfo.port ? this._socket.connectByUrl(r + this._connInfo.host) : this._socket.connectByUrl(r + this._connInfo.host + ":" + this._connInfo.port)
            } catch (n) {
                e.SocketInterface.errorLog && e.SocketInterface.errorLog("Connect to socket error: " + n), e.SocketInterface.service = this, e.SocketInterface.onConnectFail && e.SocketInterface.onConnectFail()
            }
        }, r.prototype.disconnect = function () {
            this._socket && (e.SocketInterface.debugLog && e.SocketInterface.debugLog("Disconnect socket: " + this._connInfo), this.onDisconnect(null))
        }, r.prototype.initSocket = function () {
            this._socket || (this._socket = new egret.WebSocket, this._socket.type = egret.WebSocket.TYPE_BINARY, this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this), this._socket.addEventListener(egret.Event.CLOSE, this.onDisconnect, this), this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this), this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), this._readBuffer = new e.ByteArrayLittle, this._writeBuffer = new e.ByteArrayLittle)
        }, r.prototype.clearSocket = function () {
            this._socket && (this._socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this), this._socket.removeEventListener(egret.Event.CLOSE, this.onDisconnect, this), this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this), this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), this._socket.connected && this._socket.close(), this._socket = null, this._readBuffer.clear(), this._readBuffer = null, this._writeBuffer.clear(), this._writeBuffer = null, this._packetLen = 0, this._encryptSeed = 0)
        }, r.prototype.onConnect = function (t) {
            e.SocketInterface.debugLog && e.SocketInterface.debugLog("Socket connected with: " + this._connInfo), e.SocketInterface.service = this, e.SocketInterface.onConnect && e.SocketInterface.onConnect()
        }, r.prototype.onDisconnect = function (t) {
            this.clearSocket(), e.SocketInterface.debugLog && e.SocketInterface.debugLog("Socket disconnected from: " + this._connInfo), e.SocketInterface.service = this, e.SocketInterface.onDisconnect && e.SocketInterface.onDisconnect()
        }, r.prototype.onData = function (t) {
            this._socket.readBytes(this._readBuffer, this._readBuffer.length), e.SocketInterface.debugLog && e.SocketInterface.debugLog("Receiving socket data: " + this._readBuffer.length), e.SocketInterface.service = this;
            var r = e.SocketInterface.createRecvPacket();
            if (this.catchRecvErrors) try {
                for (; this._readBuffer && this.readPacket(r);) {
                    e.SocketInterface.debugLog && e.SocketInterface.debugLog("Handling packet: " + r);
                    try {
                        r.handle()
                    } catch (n) {
                        e.SocketInterface.debugLog && e.SocketInterface.debugLog("Handling packet error: " + r)
                    }
                }
            } catch (n) {
                e.SocketInterface.errorLog && e.SocketInterface.errorLog("Receiving packet error: " + n + "\nReceived data: " + this._readBuffer + (this._readBuffer ? " " + this._readBuffer.toHex() : "")), e.SocketInterface.service = this, e.SocketInterface.onRecvError && e.SocketInterface.onRecvError(n, r, this._readBuffer), this._readBuffer.length = 0
            } else
                for (; this._readBuffer && this.readPacket(r);) e.SocketInterface.debugLog && e.SocketInterface.debugLog("Handling packet: " + r), r.handle();
            this._readBuffer && 0 == e.ByteArrayUtils.readAvailable(this._readBuffer) && (this._readBuffer.length = 0)
        }, r.prototype.onError = function (t) {
            e.SocketInterface.errorLog && e.SocketInterface.errorLog("Socket connection error: " + t), this.connected ? (e.SocketInterface.service = this, e.SocketInterface.onError && e.SocketInterface.onError()) : (e.SocketInterface.service = this, e.SocketInterface.onConnectFail && e.SocketInterface.onConnectFail())
        }, r.prototype.readPacket = function (t) {
            var n = this._packetLen;
            if (!n) {
                if (e.ByteArrayUtils.readAvailable(this._readBuffer) < r.INT_SIZE) return !1;
                this._encryptSeed && this._decrypter.encode(this._readBuffer, r.INT_SIZE, this._readBuffer.position), n = this._readBuffer.readUnsignedInt();
                var i = n >> 24 & 255;
                if (n &= 16777215, 0 == n || n > r.BAD_LEN || i != n % 255) throw new Error("Invalid packet size: " + n);
                n > r.MAX_LEN && e.SocketInterface.errorLog && e.SocketInterface.errorLog("Packet too large: " + n), this._packetLen = n
            }
            return e.ByteArrayUtils.readAvailable(this._readBuffer) >= n ? (this._packetLen = 0, this._encryptSeed && this._decrypter.encode(this._readBuffer, n, this._readBuffer.position), t.read(this._readBuffer, n)) : !1
        }, r.prototype.sendPacket = function (t) {
            if (!this.connected) return void (e.SocketInterface.errorLog && e.SocketInterface.errorLog("Socket not connected for sending packet"));
            try {
                var n = t.write();
                if (!n) return;
                if (n > r.BAD_LEN) throw new Error("Invalid packet size: " + n);
                var i = n % 255 << 24 | n;
                this._writeBuffer.length = n + r.INT_SIZE, this._writeBuffer.position = 0, this._writeBuffer.writeUnsignedInt(i), this._writeBuffer.writeBytes(t.content), this._encryptSeed && this._encrypter.encode(this._writeBuffer, this._writeBuffer.length), this._socket.writeBytes(this._writeBuffer), this._socket.flush()
            } catch (o) {
                e.SocketInterface.errorLog && e.SocketInterface.errorLog("Sending packet error: ", o), e.SocketInterface.service = this, e.SocketInterface.onSendError && e.SocketInterface.onSendError(o, t)
            }
        }, r.prototype.clearBuffer = function () {
            this._readBuffer && 0 == this._readBuffer.length && this._readBuffer.clear(), this._writeBuffer && this._writeBuffer.clear()
        }, r.GENIUS_NUMBER = 84048153, r.INT_SIZE = 4, r.MAX_LEN = 65535, r.BAD_LEN = 16776960, r.instance = new r, r
    }(egret.HashObject);
    e.SocketService = t, __reflect(t.prototype, "LibCore.SocketService")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(r, n) {
            void 0 === r && (r = 0), void 0 === n && (n = null);
            var i = t.call(this) || this;
            i._channel = 0, i._eid = r, i._className = e.RpcDef.getEntityClassName(i), i._propDefs = e.RpcDef.getClassProps(i._className), i._isRemoved = !0;
            var o = {};
            if (n)
                for (; e.ByteArrayUtils.readAvailable(n) > 0;) {
                    var s = e.RpcType.vintReader(n),
                        a = i._propDefs[s];
                    if (!a) {
                        e.RpcInterface.errorLog && e.RpcInterface.errorLog(i + " initial property not defined: " + s);
                        break
                    }
                    o[a.name] = a.reader(n)
                }
            for (var c in i._propDefs) parseInt(c).toString() != c && (i[c] = c in o ? o[c] : i._propDefs[c].defVal);
            return i
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "$channel", {
            get: function () {
                return this._channel
            },
            set: function (e) {
                this._channel != e && (this._channel = e, this.onChannelChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$eid", {
            get: function () {
                return this._eid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$className", {
            get: function () {
                return this._className
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$isRemoved", {
            get: function () {
                return this._isRemoved
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.readProp = function (t, r) {
            void 0 === r && (r = !1);
            var n = e.RpcType.vintReader(t),
                i = this._propDefs[n];
            if (!i) return e.RpcInterface.errorLog && e.RpcInterface.errorLog(this + " property not defined: " + (i ? i : n)), void i.reader(t);
            var o = i.reader(t);
            r && e.RpcInterface.debugLog && e.RpcInterface.debugLog("Read property: " + this + "." + i.name + " = " + o), this.setProp(i.name, o)
        }, r.prototype.setProp = function (e, t) {
            var r = this[e];
            t != r && (this[e] = t, this.onPropChange(e, r))
        }, r.prototype.onAdd = function () {
            this._isRemoved = !1
        }, r.prototype.onRemove = function () {
            this._isRemoved = !0
        }, r.prototype.onChannelChange = function () { }, r.prototype.onPropChange = function (e, t) { }, r.prototype.toString = function () {
            return "<Entity " + this._className + "[" + this._channel + "] eid=" + this._eid + ">"
        }, r
    }(egret.EventDispatcher);
    e.Entity = t, __reflect(t.prototype, "LibCore.Entity")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e) {
            void 0 === e && (e = 0);
            var r = t.call(this) || this;
            return r._entities = {}, r._classEntities = {}, r._clientEID = 0, r._channel = e, r
        }
        return __extends(r, t), r.prototype.addEntity = function (t) {
            return this.getEntity(t.$eid) ? (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Entity already exist: " + t), !1) : (t.$channel = this._channel, e.RpcInterface.debugLog && e.RpcInterface.debugLog("Adding entity: " + t), this._entities[t.$eid] = t, this._classEntities[t.$className] || (this._classEntities[t.$className] = {}), this._classEntities[t.$className][t.$eid] = t, t.onAdd(), !0)
        }, r.prototype.getEntity = function (e) {
            return this._entities[e]
        }, r.prototype.removeEntity = function (t) {
            var r = this.getEntity(t);
            return r && (e.RpcInterface.debugLog && e.RpcInterface.debugLog("Removing entity: " + r), delete this._entities[t], delete this._classEntities[r.$className][t], r.onRemove()), r
        }, r.prototype.getEntityCount = function (t) {
            void 0 === t && (t = null);
            var r = t ? this._classEntities[t] : this._entities;
            return r ? e.ObjectUtils.getCount(r) : 0
        }, r.prototype.getEntities = function () {
            var e = [];
            for (var t in this._entities) e.push(this._entities[t]);
            return e
        }, r.prototype.getClassEntities = function (e) {
            var t = [],
                r = this._classEntities[e];
            if (r)
                for (var n in r) t.push(r[n]);
            return t
        }, r.prototype.createEntity = function (t, r, n) {
            void 0 === r && (r = 0), void 0 === n && (n = null);
            var i = e.RpcDef.getEntityClass(t);
            if (!i) throw new TypeError("Entity class not found: " + t);
            e.RpcInterface.debugLog && e.RpcInterface.debugLog("Creating entity: " + egret.getQualifiedClassName(i) + ", eid=" + r + ", props=" + n);
            var o = new i(r || this.genClientEID(), n);
            return this.addEntity(o), o
        }, r.prototype.genClientEID = function () {
            for (; this.getEntity(++this._clientEID););
            return this._clientEID
        }, r.instance = new r, r
    }(egret.HashObject);
    e.EntityManager = t, __reflect(t.prototype, "LibCore.EntityManager")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function t() { }
        return t.intWriter = function (e, t) {
            e.writeInt(t)
        }, t.intReader = function (e) {
            return e.readInt()
        }, t.int8Writer = function (e, t) {
            e.writeByte(t)
        }, t.int8Reader = function (e) {
            return e.readByte()
        }, t.int16Writer = function (e, t) {
            e.writeShort(t)
        }, t.int16Reader = function (e) {
            return e.readShort()
        }, t.int48Writer = function (e, t) {
            e.writeUnsignedInt(t), e.writeShort(Math.floor(t / 4294967296))
        }, t.int48Reader = function (e) {
            return e.readUnsignedInt() + 4294967296 * e.readShort()
        }, t.uintReader = function (e) {
            return e.readUnsignedInt()
        }, t.uintWriter = function (e, t) {
            e.writeUnsignedInt(t)
        }, t.uint8Writer = function (e, t) {
            e.writeByte(t)
        }, t.uint8Reader = function (e) {
            return e.readUnsignedByte()
        }, t.uint16Writer = function (e, t) {
            e.writeUnsignedShort(t)
        }, t.uint16Reader = function (e) {
            return e.readUnsignedShort()
        }, t.doubleWriter = function (e, t) {
            e.writeDouble(t)
        }, t.doubleReader = function (e) {
            return e.readDouble()
        }, t.floatWriter = function (e, t) {
            e.writeFloat(t)
        }, t.floatReader = function (e) {
            return e.readFloat()
        }, t.boolWriter = function (e, t) {
            e.writeBoolean(t)
        }, t.boolReader = function (e) {
            return e.readBoolean()
        }, t.stringWriter = function (e, t) {
            this._buffer.length = 0, this._buffer.writeUTFBytes(t), this._buffer.length > 65535 && (this._buffer.length = 65535), e.writeUnsignedShort(this._buffer.length), e.writeBytes(this._buffer)
        }, t.stringReader = function (e) {
            var t = e.readUnsignedShort();
            return e.readUTFBytes(t)
        }, t.lstringWriter = function (e, r) {
            this._buffer.length = 0, this._buffer.writeUTFBytes(r), t.vintWriter(e, this._buffer.length), e.writeBytes(this._buffer)
        }, t.lstringReader = function (e) {
            var r = t.vintReader(e);
            return e.readUTFBytes(r)
        }, t.arWriter = function (e, t) {
            e.writeBytes(t)
        }, t.arReader = function (e) {
            var t = new e.constructor;
            return e.readBytes(t), t
        }, t.vintWriter = function (e, t) {
            for (; t >= 128;) e.writeByte(128 | t), t = Math.floor(t / 128);
            e.writeByte(t)
        }, t.vintReader = function (t) {
            for (var r = t.readByte(), n = 127 & r, i = 128; 128 & r && e.ByteArrayUtils.readAvailable(t) > 0; i *= 128) r = t.readByte(), n += (127 & r) * i;
            return n
        }, t.float2Writer = function (e, t) {
            e.writeFloat(t.x), e.writeFloat(t.y)
        }, t.float2Reader = function (e) {
            return new egret.Point(e.readFloat(), e.readFloat())
        }, t.arrayWriter = function (t, r) {
            t.writeShort(r.$type.id), t.writeShort(r.length);
            var n = e.RpcDef.getTypeWriter(r.$type.name);
            if (null == n) throw new TypeError("Type writer not found: " + r.$type.name);
            for (var i = 0, o = r; i < o.length; i++) {
                var s = o[i];
                n(t, s)
            }
        }, t.arrayReader = function (t) {
            var r = t.readShort(),
                n = e.RpcDef.newArray(r);
            if (!n) throw new TypeError("Invalid array type id: " + r);
            var i = t.readShort(),
                o = e.RpcDef.getTypeReader(n.$type.name);
            if (null == o) throw new TypeError("Type reader not found: " + n.$type.name);
            for (var s = 0; i > s; s++) n.push(o(t));
            return n
        }, t.tableWriter = function (e, t) { }, t.tableReader = function (e) {
            return null
        }, t.lzoWriter = function (e, t) { }, t.lzoReader = function (e) {
            return null
        }, t.structWriter = function (t, r) {
            t.writeShort(r.$type.id);
            for (var n = r.$type.defs, i = 0, o = r.$type.fields; i < o.length; i++) {
                var s = o[i],
                    a = e.RpcDef.getTypeWriter(n[s]);
                if (null == a) throw new TypeError("Type writer not found: " + r.$type.name + "." + s + ":" + n[s]);
                a(t, r[s])
            }
        }, t.structReader = function (t) {
            var r = t.readShort(),
                n = e.RpcDef.newStruct(r);
            if (!n) throw new TypeError("Invalid struct type id: " + r);
            for (var i = n.$type.defs, o = 0, s = n.$type.fields; o < s.length; o++) {
                var a = s[o],
                    c = e.RpcDef.getTypeReader(i[a]);
                if (null == c) throw new TypeError("Type reader not found: " + n.$type.name + "." + a + ":" + i[a]);
                n[a] = c(t)
            }
            return n
        }, t.clearBuffer = function () {
            this._buffer.clear()
        }, t._buffer = new egret.ByteArray, t
    }();
    e.RpcType = t, __reflect(t.prototype, "LibCore.RpcType")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e) {
            var r = t.call(this) || this;
            return r._valid = !0, r._times = {}, r._eventMap = {}, r._listenInfo = {}, r.owner = e, r.owner._coms[r.hashCode] = r, r.onCreate(), r
        }
        return __extends(r, t), r.prototype.onCreate = function () { }, r.prototype.onDestroy = function () {
            this.clearListener(), this.clearListening(), this.clearTimes(), this.owner && this.owner._coms && this.owner._coms[this.hashCode] && delete this.owner._coms[this.hashCode]
        }, r.prototype.destroy = function () {
            this._valid && (this._valid = !1, this.onDestroy())
        }, r.prototype.addOnceTimer = function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            var i = 0,
                o = this;
            return i = this.owner.addOnceTimer(e, function () {
                t.call(o, r), delete o._times[i]
            }), this._times[i] = 1, i
        }, r.prototype.addLoopTimer = function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            var i = 0,
                o = this;
            return i = this.owner.addLoopTimer(e, function () {
                var e = t.call(o, r);
                e || delete o._times[i]
            }), this._times[i] = 2, i
        }, r.prototype.delTimer = function (e) {
            if (this._times[e]) {
                var t = this.owner.delTimer(e);
                return delete this._times[e], t
            }
            return !1
        }, r.prototype.clearTimes = function () {
            for (var e in this._times) this.owner.delTimer(parseInt(e));
            this._times = {}
        }, r.prototype.addListen = function (e, t, r) {
            var n = this.owner.addListen(e, t, r);
            return n > 0 && (this._eventMap[n] = n), n
        }, r.prototype.removeListen = function (t) {
            return this._eventMap[t] ? (this.owner.removeListen(t), void delete this._eventMap[t]) : void e.LibCore.GameLog.log("removeListen cant have eventId ")
        }, r.prototype.clearListener = function () {
            var e = [];
            for (var t in this._eventMap) e.push(parseInt(t));
            for (var r = 0; r < e.length; r++) this.removeListen(e[r]);
            this._eventMap = {}
        }, r.prototype.clearListening = function () {
            var e = [];
            for (var t in this._listenInfo)
                for (var r in this._listenInfo[t]) e.push(this._listenInfo[t][r]);
            for (var n = 0; n < e.length; n++) e[n].ob.removeListen(e[n].eventId);
            this._listenInfo = {}
        }, r.prototype.clearListeningTarget = function (e) {
            var t = [];
            if (this._listenInfo[e])
                for (var r in this._listenInfo[e]) t.push(this._listenInfo[e][r]);
            for (var n = 0; n < t.length; n++) t[n].ob.removeListen(t[n].eventId);
            this._listenInfo = {}
        }, r.prototype.dispatch = function (e) {
            this.owner.dispatchEvent(e)
        }, r
    }(egret.HashObject);
    e.GameCom = t, __reflect(t.prototype, "LibCore.GameCom")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function t() { }
        return t.createRecvPacket = function () {
            return new e.Packet
        }, t.errorLog = console.log, t.debugLog = console.log, t
    }();
    e.SocketInterface = t, __reflect(t.prototype, "LibCore.SocketInterface")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = e.SocketService,
        r = e.EntityManager,
        n = function (n) {
            function i(e) {
                void 0 === e && (e = 0);
                var i = n.call(this) || this;
                return i._channel = e, i._boundStaticMathods = {}, i._socketSvc = e ? new t : t.instance, i._entityMgr = e ? new r(e) : r.instance, i
            }
            return __extends(i, n), i.get = function (e) {
                if (void 0 === e && (e = 0), e) {
                    var t = this._instances[e];
                    return t || (t = new i(e), this._instances[e] = t, this._socketChannels[t.socketSvc.hashCode] = t.channel), t
                }
                return this.instance
            }, Object.defineProperty(i, "socketChannel", {
                get: function () {
                    return this._socketChannels[e.SocketInterface.service.hashCode]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "channel", {
                get: function () {
                    return this._channel
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "socketSvc", {
                get: function () {
                    return this._socketSvc
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "entityMgr", {
                get: function () {
                    return this._entityMgr
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i, "rpcVersion", {
                get: function () {
                    return e.RpcDef.version
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i, "connInfo", {
                get: function () {
                    return this.instance.connInfo
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "connInfo", {
                get: function () {
                    return this._connInfo
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i, "connected", {
                get: function () {
                    return this.instance.connected
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "connected", {
                get: function () {
                    return this.socketSvc.connected
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i, "gateway", {
                get: function () {
                    return this.instance.gateway
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "gateway", {
                get: function () {
                    return this._gateway || (this._gateway = e.Mailbox.createNew("Gateway", "server", 0, this._channel)), this._gateway
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "staticMethods", {
                get: function () {
                    return this._staticMethods
                },
                set: function (e) {
                    this._staticMethods != e && (this._staticMethods = e, this._boundStaticMathods = {})
                },
                enumerable: !0,
                configurable: !0
            }), i.initialize = function (t, r) {
                void 0 === r && (r = null), e.SocketInterface.createRecvPacket = this.createRecvPacket.bind(this), e.SocketInterface.errorLog = e.GameLog.error.bind(e.GameLog), e.SocketInterface.debugLog = e.GameLog.debug.bind(e.GameLog), e.RpcInterface.sendRpcPacket = this.sendRpcPacket.bind(this), e.RpcInterface.getStaticMethod = this.getStaticMethod.bind(this), e.RpcInterface.getEntity = this.getEntity.bind(this), e.RpcInterface.errorLog = e.GameLog.error.bind(e.GameLog), e.RpcInterface.debugLog = e.GameLog.debug.bind(e.GameLog), e.RpcDef.initialize(t), r && (this.instance.staticMethods = r)
            }, i.createRecvPacket = function () {
                return new e.RpcPacket(0, 0, this.socketChannel)
            }, i.sendRpcPacket = function (e, t) {
                this.get(t).socketSvc.sendPacket(e)
            }, i.getStaticMethod = function (e, t) {
                var r = this.get(t);
                if (!(e.name in r._boundStaticMathods)) {
                    var n = r._staticMethods ? r._staticMethods[e.name] : null;
                    r._boundStaticMathods[e.name] = n ? n.bind(r._staticMethods) : null
                }
                return r._boundStaticMathods[e.name]
            }, i.connect = function (t, r) {
                void 0 === t && (t = 0), void 0 === r && (r = 0);
                var n = this.get(r);
                1 == t && n._connInfo || (n._connInfo = new e.ConnectInfo(e.GameConfig.SVR_HOST, e.GameConfig.SVR_PORT)), n.socketSvc.connect(n._connInfo)
            }, i.disconnect = function (e) {
                void 0 === e && (e = 0), this.get(e).socketSvc.disconnect()
            }, i.setEncryptSeed = function (t, r) {
                void 0 === r && (r = 0), e.GameConfig.CTX_PACKET && (this.get(r).socketSvc.encryptSeed = t)
            }, i.registerEntityClass = function (t, r) {
                e.RpcDef.registerEntityClass(t, r)
            }, i.addEntity = function (e, t) {
                return void 0 === t && (t = 0), this.get(t).entityMgr.addEntity(e)
            }, i.getEntity = function (e, t) {
                return void 0 === t && (t = 0), this.get(t).entityMgr.getEntity(e)
            }, i.removeEntity = function (e, t) {
                return void 0 === t && (t = 0), this.get(t).entityMgr.removeEntity(e)
            }, i.getEntityCount = function (e, t) {
                return void 0 === e && (e = null), void 0 === t && (t = 0), this.get(t).entityMgr.getEntityCount()
            }, i.getEntities = function (e) {
                return void 0 === e && (e = 0), this.get(e).entityMgr.getEntities()
            }, i.getClassEntities = function (e, t) {
                return void 0 === t && (t = 0), this.get(t).entityMgr.getClassEntities(e)
            }, i.removeClassEntities = function (e, t) {
                void 0 === t && (t = 0);
                for (var r = this.get(t).entityMgr, n = 0, i = r.getClassEntities(e); n < i.length; n++) {
                    var o = i[n];
                    r.removeEntity(o.$eid)
                }
            }, i.createEntity = function (e, t, r, n) {
                void 0 === t && (t = 0), void 0 === r && (r = null), void 0 === n && (n = 0);
                var i;
                return i = this.get(n).entityMgr.createEntity(e, t, r)
            }, i.newStruct = function (t) {
                return e.RpcDef.newStruct(t)
            }, i.newArray = function (t) {
                return e.RpcDef.newArray(t)
            }, i.instance = new i, i._instances = {}, i._socketChannels = {}, i
        }(egret.HashObject);
    e.GameService = n, __reflect(n.prototype, "LibCore.GameService")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r() {
            var e = t.call(this) || this;
            return e.endian = egret.Endian.LITTLE_ENDIAN, e
        }
        return __extends(r, t), r.prototype.toHex = function () {
            return e.ByteArrayUtils.toHex(this, " ", ">>>")
        }, r.prototype.toString = function () {
            return "<ByteArrayLittle len=" + this.length + ",pos=" + this.position + ">"
        }, r
    }(egret.ByteArray);
    e.ByteArrayLittle = t, __reflect(t.prototype, "LibCore.ByteArrayLittle")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (e) {
        function t(t, r) {
            void 0 === t && (t = null), void 0 === r && (r = 0);
            var n = e.call(this) || this;
            return n._port = 0, n.host = "127.0.0.1", n.ports = null, t && (n.host = t), r instanceof Array ? n.ports = r : r && (n.port = r), n
        }
        return __extends(t, e), Object.defineProperty(t.prototype, "port", {
            get: function () {
                return !this._port && this.ports && this.ports.length > 0 && (this._port = this.ports[Math.floor(Math.random() * this.ports.length)]), this._port
            },
            set: function (e) {
                this._port = e
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.toString = function () {
            return "host=" + this.host + ",port=" + this.port
        }, t
    }(egret.HashObject);
    e.ConnectInfo = t, __reflect(t.prototype, "LibCore.ConnectInfo")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(r, n, i, o) {
            void 0 === i && (i = 0), void 0 === o && (o = 0);
            var s = t.call(this) || this;
            return s._className = r, s._server = n, s._eid = i, s._channel = o, s.methodDefs || (s.methodDefs = e.RpcDef.getClassMethods(r, n)), s.methodMap = {}, s
        }
        return __extends(r, t), r.createNew = function (t, n, i, o) {
            void 0 === i && (i = 0), void 0 === o && (o = 0);
            var s = t + "@" + n,
                a = this._classMap[s];
            if (!a) {
                a = function (e, t, n, i) {
                    void 0 === n && (n = 0), void 0 === i && (i = 0), r.call(this, e, t, n, i)
                }, __extends(a, this);
                var c = e.RpcDef.getClassMethods(t, n);
                Object.defineProperty(a.prototype, "methodDefs", {
                    value: c
                });
                for (var f in c) Object.defineProperty(a.prototype, f, {
                    get: e.functor(this.prototype.getMethod, null, f),
                    enumerable: !0
                });
                this._classMap[s] = a
            }
            return new a(t, n, i, o)
        }, Object.defineProperty(r.prototype, "$className", {
            get: function () {
                return this._className
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$server", {
            get: function () {
                return this._server
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$eid", {
            get: function () {
                return this._eid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "$channel", {
            get: function () {
                return this._channel
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.getMethod = function (t) {
            var r = this.methodDefs[t];
            if (!r) return e.RpcInterface.errorLog && e.RpcInterface.errorLog("RPC method not defined: " + this + " " + t), null;
            var n = this.methodMap[t];
            return n || (n = this.callRpcMethod.bind(this, r, !0), this.methodMap[t] = n), n
        }, r.prototype.hasMethod = function (e) {
            return null != this.methodDefs[e]
        }, r.prototype.callRpcMethod = function (t, r) {
            for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
            if (r && (e.RpcInterface.debugLog && e.RpcInterface.debugLog("Calling RPC method: " + this + " " + t), e.RpcInterface.simSendDelayTime >= 0)) return void setTimeout(this.callRpcMethod.bind(this, t, !1, n), e.RpcInterface.simSendDelayTime);
            var o = e.RpcInterface.createRpcPacket(t.id, this._eid, this._channel);
            try {
                o.params = r ? n : n[0], e.RpcInterface.sendRpcPacket(o, this._channel)
            } catch (s) {
                e.RpcInterface.errorLog && e.RpcInterface.errorLog("Calling RPC method error: " + this + " " + t + "\n" + s)
            }
        }, r.prototype.toString = function () {
            return "<Mailbox " + this._className + "@" + this._server + "[" + this._channel + "] eid=" + this._eid + ">"
        }, r._classMap = {}, r
    }(egret.HashObject);
    e.Mailbox = t, __reflect(t.prototype, "LibCore.Mailbox")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function t() { }
        return Object.defineProperty(t, "version", {
            get: function () {
                return this._version
            },
            enumerable: !0,
            configurable: !0
        }), t.initialize = function (e) {
            this._version = e.Digi, this.initMethodList(e.MethodList), this.initPropList(e.PropList), this.initEntityList(e.EntityList), this.initTypeList(e.TypeList)
        }, t.initMethodList = function (t) {
            for (var r = 0, n = t; r < n.length; r++) {
                var i = n[r],
                    o = new e.MethodDef(i);
                this._methodDefs[o.id] = o, this._classMethods[o.className] || (this._classMethods[o.className] = {}), this._classMethods[o.className][o.server] || (this._classMethods[o.className][o.server] = {}), this._classMethods[o.className][o.server][o.name] = o
            }
        }, t.initPropList = function (t) {
            for (var r = 0, n = t; r < n.length; r++) {
                var i = n[r];
                if ("CLIENT" == i.flag || "ALLCLIENTS" == i.flag) {
                    var o = new e.PropDef(i);
                    this._propDefs[o.id] = o, this._classProps[o.className] || (this._classProps[o.className] = {}), this._classProps[o.className][o.id] = o, this._classProps[o.className][o.name] = o
                }
            }
        }, t.initEntityList = function (e) {
            for (var t = 0, r = e; t < r.length; t++) {
                var n = r[t];
                this._entityClasses[n.id] = n.className, this._entityClasses[n.className] = null
            }
        }, t.initTypeList = function (r) {
            for (var n = 0, i = r; n < i.length; n++) {
                var o = i[n],
                    s = new e.TypeDef(o);
                this._typeDefs[s.id] = this._typeDefs[s.name] = s;
                var a = s.id < t.STRUCT_BASE_ID ? s.name : "struct",
                    c = e.RpcType[a + "Writer"].bind(e.RpcType),
                    f = e.RpcType[a + "Reader"].bind(e.RpcType);
                this._typeWriters[s.id] = c, this._typeWriters[s.name] = c, this._typeReaders[s.id] = f, this._typeReaders[s.name] = f
            }
        }, t.getMethodDef = function (e) {
            return this._methodDefs[e]
        }, t.getPropDef = function (e) {
            return this._propDefs[e]
        }, t.getClassMethods = function (e, t) {
            return this._classMethods[e] ? this._classMethods[e][t] || {} : {}
        }, t.getClassProps = function (e) {
            return this._classProps[e] || {}
        }, t.registerEntityClass = function (e, t) {
            if (e) {
                if (!(e in this._entityClasses)) throw new TypeError("Entity class not defined: " + e);
                this._entityClasses[e] = t
            } else
                for (var r in this._entityClasses) null == this._entityClasses[r] && (this._entityClasses[r] = t)
        }, t.getEntityClass = function (e) {
            var t = this._entityClasses[e];
            return "string" == typeof t ? this._entityClasses[t] : t
        }, t.getEntityClassName = function (e) {
            var t = e.constructor;
            for (var r in this._entityClasses)
                if (this._entityClasses[r] == t) return r;
            return null
        }, t.getTypeDef = function (e) {
            return this._typeDefs[e]
        }, t.getTypeWriter = function (e) {
            return this._typeWriters[e]
        }, t.getTypeReader = function (e) {
            return this._typeReaders[e]
        }, t.newStruct = function (r) {
            var n = this._typeDefs[r];
            return n && n.id >= t.STRUCT_BASE_ID ? e.Struct.createNew(n) : null
        }, t.newArray = function (t) {
            var r = this._typeDefs[t];
            return r ? new e.TypeArray(r) : null
        }, t.STRUCT_BASE_ID = 20, t._version = 0, t._methodDefs = {}, t._propDefs = {}, t._classMethods = {}, t._classProps = {}, t._entityClasses = {}, t._typeDefs = {}, t._typeWriters = {}, t._typeReaders = {}, t
    }();
    e.RpcDef = t, __reflect(t.prototype, "LibCore.RpcDef")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function t() { }
        return t.simSendDelayTime = -1, t.simRecvDelayTime = -1, t.createRpcPacket = function (t, r, n) {
            return new e.RpcPacket(t, r, n)
        }, t.sendRpcPacket = function (e, r) {
            t.debugLog && t.debugLog("Sending RPC[" + r + "] packet: " + e)
        }, t.getStaticMethod = function (e, t) {
            return null
        }, t.getEntity = function (t, r) {
            return e.EntityManager.instance.getEntity(t)
        }, t.errorLog = console.log, t.debugLog = console.log, t
    }();
    e.RpcInterface = t, __reflect(t.prototype, "LibCore.RpcInterface")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e, r, n) {
            void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === n && (n = 0);
            var i = t.call(this) || this;
            return i.reset(e, r, n), i
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "id", {
            get: function () {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "eid", {
            get: function () {
                return this._eid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "channel", {
            get: function () {
                return this._channel
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "isStatic", {
            get: function () {
                return this.method.isStatic
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "params", {
            get: function () {
                return this._params
            },
            set: function (e) {
                var t = this.method.args,
                    r = e.length;
                if (t.length != r) throw new Error("Setting RPC params with wrong count: " + r);
                this._params = e
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.reset = function (t, r, n) {
            void 0 === t && (t = 0), void 0 === r && (r = 0), void 0 === n && (n = 0), this._id = t, this._eid = r, this._channel = n, this._params = t ? [] : null, this.method = t ? e.RpcDef.getMethodDef(t) : null
        }, r.prototype.readContent = function () {
            if (this.reset(e.RpcType.uintReader(this.content), 0, this._channel), !this.method) return e.RpcInterface.errorLog && e.RpcInterface.errorLog("RPC method not found: " + this._id), !1;
            this._eid = this.isStatic ? 0 : e.RpcType.int48Reader(this.content);
            for (var t = this.method.args, r = 0; r < t.length; r++) {
                var n = t[r],
                    i = e.RpcDef.getTypeReader(n.type);
                if (null == i) throw new TypeError("Type reader not found: " + n.type);
                this._params.push(i(this.content))
            }
            return !0
        }, r.prototype.writeContent = function () {
            if (!this.method) return e.RpcInterface.errorLog && e.RpcInterface.errorLog("RPC method not found: " + this._id), !1;
            e.RpcType.uintWriter(this.content, this._id), this.isStatic || e.RpcType.int48Writer(this.content, this._eid);
            for (var t = this.method.args, r = 0; r < t.length; r++) {
                var n = t[r],
                    i = e.RpcDef.getTypeWriter(n.type);
                if (null == i) throw new TypeError("Type writer not found: " + n.type);
                i(this.content, this._params[r])
            }
            return !0
        }, r.prototype.handle = function () {
            e.RpcInterface.simRecvDelayTime < 0 ? this.realHandle(this._eid, this._channel, this.method, this._params) : (e.RpcInterface.debugLog && e.RpcInterface.debugLog("Receive RPC[" + this._channel + "] method: " + this.method + ", eid=" + this._eid), setTimeout(this.realHandle, e.RpcInterface.simRecvDelayTime, this._eid, this._channel, this.method, this.params))
        }, r.prototype.realHandle = function (t, r, n, i) {
            if (e.RpcInterface.debugLog && e.RpcInterface.debugLog("Handling RPC[" + r + "] method: " + n + " eid=" + t), n.isStatic) {
                var o = e.RpcInterface.getStaticMethod(n, r);
                if (null == o) return void (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Static RPC[" + r + "] method not found: " + n));
                o.apply(null, i)
            } else {
                var s = e.RpcInterface.getEntity(t, r);
                if (!s) return void (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Entity not found: [" + r + "] eid=" + t + " " + n));
                var a = s[n.name];
                if (null == a) return void (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Entity RPC method not found: " + s + " " + n));
                a.apply(s, i)
            }
        }, r.prototype.toString = function () {
            return "<RpcPacket[" + this._channel + "] id=" + this._id + ",eid=" + this._eid + ",method=" + this.method + ",len=" + this.content.length + ">"
        }, r
    }(e.Packet);
    e.RpcPacket = t, __reflect(t.prototype, "LibCore.RpcPacket")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e, r) {
            void 0 === e && (e = 0), void 0 === r && (r = null);
            var n = t.call(this, e, r) || this;
            return n._times = {}, n._coms = {}, n._valid = !0, n._eventId = 1, n._eventMap = {}, n._listenInfo = {}, n
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "gateway", {
            get: function () {
                return this._gateway || (this._gateway = e.Mailbox.createNew(this.$className, "gateway", this.$eid, this.$channel)), this._gateway
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "hall", {
            get: function () {
                return this._hall || (this._hall = e.Mailbox.createNew(this.$className, "hall", this.$eid, this.$channel)), this._hall
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.onChannelChange = function () {
            this._gateway = null, this._hall = null
        }, r.prototype.addOnceTimer = function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            var i = 0,
                o = this;
            return i = setTimeout(function () {
                t.call(o, r), delete o._times[i]
            }, 1e3 * e), o._times[i] = 1, i
        }, r.prototype.addLoopTimer = function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            var i = 0,
                o = this;
            return i = setInterval(function () {
                var e = t.call(o, r);
                e || (clearInterval(i), delete o._times[i])
            }, 1e3 * e), this._times[i] = 2, i
        }, r.prototype.delTimer = function (e) {
            return this._times[e] ? (1 == this._times[e] ? (clearTimeout(e), delete this._times[e]) : (clearInterval(e), delete this._times[e]), !0) : !1
        }, r.prototype.clearTimes = function () {
            for (var e in this._times) 1 == this._times[e] ? clearTimeout(parseInt(e)) : clearInterval(parseInt(e));
            this._times = {}
        }, r.prototype.onAdd = function () {
            t.prototype.onAdd.call(this), this.onCreate()
        }, r.prototype.onRemove = function () {
            t.prototype.onRemove.call(this), this.onDestroy()
        }, r.prototype.onPropChange = function (e, t) {
            var r = "on_" + e;
            this.hasOwnProperty(r) && this[r](t)
        }, r.prototype.destroy = function () {
            this._valid && (this._valid = !1, e.GameService.get(this.$channel).entityMgr.removeEntity(this.$eid))
        }, r.prototype.onCreate = function () { }, r.prototype.onDestroy = function () {
            this.clearListening(), this.clearListener(), this.clearComs(), this.clearTimes()
        }, r.prototype.clearComs = function () {
            var e = [];
            for (var t in this._coms) e.push(this._coms[t]);
            for (var r = 0; r < e.length; r++) e[r].destroy();
            this._coms = {}
        }, r.prototype.addListen = function (t, r, n) {
            var i = this._eventId;
            if (this._eventId = this._eventId + 1, this._eventMap[i] = {
                eventId: i,
                msg: t,
                callback: n,
                target: r
            }, this.addEventListener(t, n, r), r) {
                if (!r.hasOwnProperty("_listenInfo")) return e.GameLog.log("target has not _listenInfo"), i;
                r._listenInfo[this.hashCode] = r._listenInfo[this.hashCode] || {}, r._listenInfo[this.hashCode][i] = {
                    eventId: i,
                    msg: t,
                    ob: this
                }
            }
            return i
        }, r.prototype.removeListen = function (t) {
            if (!this._eventMap[t]) return void e.GameLog.log("removeListen cant have eventId ");
            var r = this._eventMap[t];
            delete this._eventMap[t], this.removeEventListener(r.msg, r.callback, r.target);
            var n = r.target;
            n && n.hasOwnProperty("_listenInfo") && n._listenInfo[this.hashCode] && n._listenInfo[this.hashCode][t] && delete n._listenInfo[this.hashCode][t]
        }, r.prototype.clearListener = function () {
            var e = [];
            for (var t in this._eventMap) e.push(parseInt(t));
            for (var r = 0; r < e.length; r++) this.removeListen(e[r]);
            this._eventMap = {}
        }, r.prototype.clearListening = function () {
            var e = [];
            for (var t in this._listenInfo)
                for (var r in this._listenInfo[t]) e.push(this._listenInfo[t][r]);
            for (var n = 0; n < e.length; n++) e[n].ob.removeListen(e[n].eventId);
            this._listenInfo = {}
        }, r.prototype.clearListeningTarget = function (e) {
            var t = [];
            if (this._listenInfo[e])
                for (var r in this._listenInfo[e]) t.push(this._listenInfo[e][r]);
            for (var n = 0; n < t.length; n++) t[n].ob.removeListen(t[n].eventId);
            this._listenInfo = {}
        }, r.prototype.dispatch = function (e) {
            this.dispatchEvent(e)
        }, r
    }(e.Entity);
    e.GameEntity = t, __reflect(t.prototype, "LibCore.GameEntity")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (e) {
        function t(t) {
            var r = e.call(this) || this;
            return r.name = t.name, r.type = t.type, r
        }
        return __extends(t, e), t.prototype.toString = function () {
            return null == this._info && (this._info = this.name + ":" + this.type), this._info
        }, t
    }(egret.HashObject);
    e.ArgDef = t, __reflect(t.prototype, "LibCore.ArgDef")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(r) {
            var n = t.call(this) || this;
            n.args = [], n.id = r.id, n.name = r.name, n.className = r.className, n.server = r.server, n.isStatic = r.isStatic;
            for (var i = 0, o = r.args; i < o.length; i++) {
                var s = o[i];
                n.args.push(new e.ArgDef(s))
            }
            return n
        }
        return __extends(r, t), r.prototype.toString = function () {
            return null == this._info && (this._info = "<Method " + this.className + "@" + this.server + "." + this.name + "(" + this.args.join(",") + ")" + (this.isStatic ? " static>" : ">")), this._info
        }, r
    }(egret.HashObject);
    e.MethodDef = t, __reflect(t.prototype, "LibCore.MethodDef")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e) {
            var r = t.call(this) || this;
            return r.id = e.id, r.name = e.name, r.className = e.className, r.type = e.type, r._defVal = e.defVal, r
        }
        return __extends(r, t), Object.defineProperty(r.prototype, "defVal", {
            get: function () {
                switch (this.type) {
                    case "float2":
                        return new egret.Point;
                    case "array":
                        return []
                }
                return this._defVal
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "writer", {
            get: function () {
                if (this._writer || (this._writer = e.RpcDef.getTypeWriter(this.type)), null == this._writer) throw new TypeError("Property writer not found: " + this);
                return this._writer
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "reader", {
            get: function () {
                if (this._reader || (this._reader = e.RpcDef.getTypeReader(this.type)), null == this._reader) throw new TypeError("Property reader not found: " + this);
                return this._reader
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.toString = function () {
            return null == this._info && (this._info = "<Prop " + this.className + "." + this.name + ":" + this.type + ">"), this._info
        }, r
    }(egret.HashObject);
    e.PropDef = t, __reflect(t.prototype, "LibCore.PropDef")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (e) {
        function t(t) {
            var r = e.call(this) || this;
            r.defs = {}, r.fields = [], r.id = t.id, r.name = t.name;
            for (var n = 0, i = t.defs; n < i.length; n++) {
                var o = i[n];
                r.fields.push(o.name), r.defs[o.name] = o.type
            }
            return r
        }
        return __extends(t, e), t.prototype.toString = function () {
            if (null == this._info) {
                for (var e = [], t = 0, r = this.fields; t < r.length; t++) {
                    var n = r[t];
                    e.push(n + ":" + this.defs[n])
                }
                this._info = "<Type " + this.name + " {" + e.join(",") + "}>"
            }
            return this._info
        }, t
    }(egret.HashObject);
    e.TypeDef = t, __reflect(t.prototype, "LibCore.TypeDef")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function r(e) {
            var r = t.call(this) || this;
            return r._items = {}, r._type = e, r
        }
        return __extends(r, t), r.createNew = function (t) {
            var n = r._classMap[t.name];
            if (!n) {
                n = function (e) {
                    r.call(this, e)
                }, __extends(n, r);
                for (var i = 0, o = t.fields; i < o.length; i++) {
                    var s = o[i];
                    Object.defineProperty(n.prototype, s, {
                        set: e.functorLeft(r.prototype.setKey, null, s),
                        get: e.functor(r.prototype.getKey, null, s),
                        enumerable: !0
                    })
                }
                r._classMap[t.name] = n
            }
            return new n(t)
        }, Object.defineProperty(r.prototype, "$type", {
            get: function () {
                return this._type
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.hasKey = function (e) {
            return null != this._type.defs[e]
        }, r.prototype.setKey = function (t, r) {
            return this.hasKey(t) ? void (this._items[t] = r) : void (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Setting struct member not defined: " + t))
        }, r.prototype.getKey = function (t) {
            return this.hasKey(t) ? this._items[t] : (e.RpcInterface.errorLog && e.RpcInterface.errorLog("Getting struct member not defined: " + t), null)
        }, r.prototype.toString = function () {
            for (var e = [], t = 0, r = this._type.fields; t < r.length; t++) {
                var n = r[t];
                e.push(n + "=" + this._items[n])
            }
            return "<" + this._type.name + " " + e.join(",") + ">"
        }, r._classMap = {}, r
    }(egret.HashObject);
    e.Struct = t, __reflect(t.prototype, "LibCore.Struct")
}(LibCore || (LibCore = {}));
var LibCore;
! function (LibCore) {
    var TypeArray = function (_super) {
        function TypeArray(type, arr) {
            var _this = _super.call(this) || this,
                t = eval("this");
            return t._type = type, arr && arr.length > 0 && t.push.apply(t, arr), t
        }
        return __extends(TypeArray, _super), Object.defineProperty(TypeArray.prototype, "$type", {
            get: function () {
                return this._type
            },
            enumerable: !0,
            configurable: !0
        }), TypeArray.prototype.concat = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            for (var r = new TypeArray(this._type, this), n = 0, i = e; n < i.length; n++) {
                var o = i[n];
                o instanceof Array ? r.push.apply(r, o) : r.push(o)
            }
            return r
        }, TypeArray.prototype.slice = function (e, t) {
            return void 0 === e && (e = 0), void 0 === t && (t = 16777215), new TypeArray(this._type, _super.prototype.slice.call(this, e, t))
        }, TypeArray.prototype.splice = function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            return void 0 === t ? new TypeArray(this._type, _super.prototype.splice.call(this, e)) : new TypeArray(this._type, _super.prototype.splice.apply(this, [e, t].concat(r)))
        }, TypeArray.prototype.toString = function () {
            return "<TypeArray type=" + this._type.name + " [" + this.join(",") + "]>"
        }, TypeArray
    }(Array);
    LibCore.TypeArray = TypeArray, __reflect(TypeArray.prototype, "LibCore.TypeArray")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function e() { }
        return e.remove = function (e, t) {
            var r = e.indexOf(t);
            return r >= 0 && e.splice(r, 1), r
        }, e.randGet = function (e) {
            return e.length > 0 ? e[Math.floor(e.length * Math.random())] : null
        }, e.swap = function (e, t, r) {
            if (t != r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }
        }, e.find = function (e, t, r) {
            void 0 === r && (r = null);
            for (var n = 0; n < e.length; n++)
                if (r) {
                    if (e[n][r] == t) return n
                } else if (e[n] == t) return n;
            return -1
        }, e.bisectLocate = function (t, r, n, i, o) {
            if (void 0 === n && (n = null), void 0 === i && (i = 0), void 0 === o && (o = 2147483647), i >= t.length) return t.length;
            if (o = Math.min(o, t.length - 1), 6 > o - i) {
                for (var s = o; s >= i; s--)
                    if ((n ? t[s][n] : t[s]) < r) return s + 1;
                return i
            }
            var a = Math.floor((i + o) / 2);
            return (n ? t[a][n] : t[a]) < r ? e.bisectLocate(t, r, n, a + 1, o) : e.bisectLocate(t, r, n, i, a - 1)
        }, e.bisectFind = function (t, r, n) {
            if (void 0 === n && (n = null), t.length > 0) {
                var i = e.bisectLocate(t, r, n);
                if (i < t.length && (n ? t[i][n] : t[i]) == r) return i
            }
            return -1
        }, e.bisectInsert = function (t, r, n, i) {
            void 0 === n && (n = null), void 0 === i && (i = !1);
            var o = n ? r[n] : r,
                s = t.length > 0 ? e.bisectLocate(t, o, n) : 0;
            if (s < t.length) {
                if (i && (n ? t[s][n] : t[s]) == o) return -1;
                t.splice(s, 0, r)
            } else t.push(r);
            return s
        }, e.forEach = function (t, r, n) {
            for (var i = t.length, o = 0; i > o; o++) e.callItem(r, n, t[o], o, t)
        }, e.map = function (t, r, n) {
            for (var i = [], o = t.length, s = 0; o > s; s++) i.push(e.callItem(r, n, t[s], s, t));
            return i
        }, e.filter = function (t, r, n, i, o) {
            void 0 === i && (i = !0), void 0 === o && (o = !1);
            for (var s = [], a = t.length, c = 0; a > c; c++) {
                var f = e.callItem(r, n, t[c], c, t);
                if (("boolean" == typeof i ? f ? !0 : !1 : f) == i) {
                    if (o) continue;
                    s.push(t[c])
                } else o && s.push(t[c])
            }
            return s
        }, e.all = function (t, r, n, i) {
            void 0 === i && (i = !0);
            var o = t.length;
            if (0 == o) return !1;
            for (var s = 0; o > s; s++) {
                var a = e.callItem(r, n, t[s], s, t);
                if (("boolean" == typeof i ? a ? !0 : !1 : a) != i) return !1
            }
            return !0
        }, e.any = function (t, r, n, i) {
            void 0 === i && (i = !0);
            for (var o = t.length, s = 0; o > s; s++) {
                var a = e.callItem(r, n, t[s], s, t);
                if (("boolean" == typeof i ? a ? !0 : !1 : a) == i) return !0
            }
            return !1
        }, e.callItem = function (e, t, r, n, i) {
            return e.length <= 1 ? e.call(t, r) : 2 == e.length ? e.call(t, r, n) : e.call(t, r, n, i)
        }, e
    }();
    e.ArrayUtils = t, __reflect(t.prototype, "LibCore.ArrayUtils")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function e() { }
        return e.isEqual = function (t, r) {
            var n = t.length;
            if (n != r.length) return !1;
            for (var i = e.getBytes(t), o = e.getBytes(r), s = 0; n > s; s++)
                if (i[s] != o[s]) return !1;
            return !0
        }, e.concat = function (e, t, r) {
            void 0 === r && (r = !1);
            var n = r ? new e.constructor : e,
                i = n.length;
            return n.position = i, n.writeBytes(t), n
        }, e.toHex = function (e, t, r, n, i) {
            if (void 0 === t && (t = " "), void 0 === r && (r = ""), void 0 === n && (n = 0), void 0 === i && (i = 0), n = 0 > n ? Math.max(0, e.length + n) : Math.min(n, e.length), i = Math.min(e.length - n, i || 2147483647), i > 0) {
                for (var o = [], s = new Uint8Array(e.buffer), a = 0; i > a; a++) {
                    var c = s[a + n].toString(16);
                    o[a] = (r && a + n == e.position ? r : "") + (1 == c.length ? "0" + c : c)
                }
                return o.join(t)
            }
            return ""
        }, e.readAvailable = function (e) {
            return e.length - e.position
        }, e.getBytes = function (e) {
            return e.bytes ? e.bytes : new Uint8Array(e.buffer)
        }, e
    }();
    e.ByteArrayUtils = t, __reflect(t.prototype, "LibCore.ByteArrayUtils")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function (t) {
        function n(n) {
            var i = t.call(this) || this;
            i._index = 0, i._addikey = [], i._buffer = new e.ByteArrayLittle, i._addikey[0] = new r, i._addikey[0].sd = i.linearity(n), i._addikey[0].dis1 = 55, i._addikey[0].dis2 = 24, i._addikey[1] = new r, i._addikey[1].sd = i.linearity((2863311530 & n) >>> 1 | (1431655765 & n) << 1), i._addikey[1].dis1 = 57, i._addikey[1].dis2 = 7, i._addikey[2] = new r, i._addikey[2].sd = i.linearity(~((4042322160 & n) >>> 4 | (252645135 & n) << 4)), i._addikey[2].dis1 = 58, i._addikey[2].dis2 = 19;
            for (var o = 0; 3 > o; ++o) {
                for (var s = i._addikey[o].sd, a = 0; 64 > a; ++a) {
                    for (var c = 0; 32 > c; ++c) s = i.linearity(s);
                    i._addikey[o].buffer[a] = s
                }
                i._addikey[o].carry = 0, i._addikey[o].index = 63
            }
            return i._index = 4096, i._buffer.length = 4096, i._bufferBytes = e.ByteArrayUtils.getBytes(i._buffer), i
        }
        return __extends(n, t), n.prototype.linearity = function (e) {
            var t = (1 & (e >>> 31 ^ e >>> 6 ^ e >>> 4 ^ e >>> 2 ^ e >>> 1 ^ e)) << 31 | e >>> 1;
            return 0 > t ? 4294967296 + t : t
        }, n.prototype.addikeyNext = function (e) {
            ++e.index, e.index &= 63;
            var t = (64 | e.index) - e.dis1 & 63,
                r = (64 | e.index) - e.dis2 & 63;
            e.buffer[e.index] = (e.buffer[t] + e.buffer[r]) % 4294967296, e.carry = e.buffer[e.index] < e.buffer[t] || e.buffer[e.index] < e.buffer[r] ? 1 : 0
        }, n.prototype.generate = function () {
            this._buffer.position = 0, this._index = 0;
            for (var e = 0; 1024 > e; ++e) {
                var t = this._addikey[0].carry + this._addikey[1].carry + this._addikey[2].carry;
                if (0 == t || 3 == t) this.addikeyNext(this._addikey[0]), this.addikeyNext(this._addikey[1]), this.addikeyNext(this._addikey[2]);
                else {
                    var r = 0;
                    2 == t && (r = 1);
                    for (var n = 0; 3 > n; ++n) this._addikey[n].carry == r && this.addikeyNext(this._addikey[n])
                }
                this._buffer.writeUnsignedInt(this._addikey[0].buffer[this._addikey[0].index] ^ this._addikey[1].buffer[this._addikey[1].index] ^ this._addikey[2].buffer[this._addikey[2].index])
            }
        }, n.prototype.encode = function (t, r, n) {
            if (void 0 === n && (n = 0), t && !(0 >= r)) {
                var i = e.ByteArrayUtils.getBytes(t);
                do {
                    var o = 4096 - this._index;
                    0 >= o && this.generate(), o > r && (o = r), r -= o;
                    for (var s = 0; o > s; ++s, ++n, ++this._index) i[n] ^= this._bufferBytes[this._index]
                } while (r > 0)
            }
        }, n
    }(egret.HashObject);
    e.Ctx = t, __reflect(t.prototype, "LibCore.Ctx");
    var r = function () {
        function e() {
            this.sd = 0, this.dis1 = 0, this.dis2 = 0, this.index = 0, this.carry = 0, this.buffer = []
        }
        return e
    }();
    __reflect(r.prototype, "AddiKey")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function t() { }
        return Object.defineProperty(t, "serverNow", {
            get: function () {
                return this._timeOffset ? this._timeOffset + egret.getTimer() : (new Date).getTime()
            },
            set: function (e) {
                this._timeOffset = e - egret.getTimer()
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "serverDateTime", {
            get: function () {
                return this._timeOffset ? new Date(this._timeOffset + egret.getTimer()) : new Date
            },
            enumerable: !0,
            configurable: !0
        }), t.formatTimespan = function (e, t, r, n) {
            void 0 === r && (r = 0), void 0 === n && (n = !1);
            var i = "";
            if (t[0]) {
                if (i = this.appendTimespanPart(i, Math.floor(e / 86400), t[0]), n && i) return i;
                e %= 86400
            }
            if (t[1]) {
                if (i = this.appendTimespanPart(i, Math.floor(e / 3600), t[1]), n && i) return i;
                e %= 3600
            }
            if (t[2]) {
                if (i = this.appendTimespanPart(i, Math.floor(e / 60), t[2]), n && i) return i;
                e %= 60
            }
            if (t[3]) {
                if (i = this.appendTimespanPart(i, Math.floor(e), t[3]), n && i) return i;
                e %= 1
            }
            return r && (i += e.toFixed(r).split(".")[1]), i
        }, t.appendTimespanPart = function (t, r, n) {
            var i = e.StringUtils.ltrim(n, "#");
            return i != n ? t += e.StringUtils.padLeft(r + "", n.length - i.length, "0") + i : r && (t += r + n), t
        }, t.formatDigitTimespan = function (e) {
            return this.formatTimespan(e, this.DIGIT_TIMESPAN_DELIMS)
        }, t.formatChineseTimespan = function (e) {
            return this.formatTimespan(e, this.CHINESE_TIMESPAN_DELIMS)
        }, t.formatShortDigitTimespan = function (e) {
            return this.formatTimespan(e, this.SHORT_DIGIT_TIMESPAN_DELIMS)
        }, t.formatShortChineseTimespan = function (e) {
            return this.formatTimespan(e, this.SHORT_CHINESE_TIMESPAN_DELIMS)
        }, t.formatFirstChineseTimespan = function (e) {
            return this.formatTimespan(e, this.SHORT_CHINESE_TIMESPAN_DELIMS, 0, !0)
        }, t.getWeekName = function (e, t) {
            return void 0 === e && (e = null), void 0 === t && (t = null), e = e || this.serverDateTime, t = t || this.WEEK_NAMES, t[e.getDay()]
        }, t._timeOffset = 0, t.WEEK_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], t.CHINESE_TIME_FORMAT = "HH'时'mm'分'ss'秒'", t.DIGIT_TIMESPAN_DELIMS = ["", "##:", "##:", "##"], t.CHINESE_TIMESPAN_DELIMS = ["天", "#小时", "##分", "##秒"], t.SHORT_DIGIT_TIMESPAN_DELIMS = ["", ":", "##:", "##"], t.SHORT_CHINESE_TIMESPAN_DELIMS = ["天", "小时", "分", "#秒"], t
    }();
    e.DateTimeUtils = t, __reflect(t.prototype, "LibCore.DateTimeUtils")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    function t(e, t) {
        void 0 === t && (t = null);
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        return function () {
            for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
            return e.apply(t || this, r)
        }
    }

    function r(e, t) {
        void 0 === t && (t = null);
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        return function () {
            for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
            return e.apply(t || this, r.concat(n))
        }
    }

    function n(e, t) {
        void 0 === t && (t = null);
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        return function () {
            for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
            return e.apply(t || this, n.concat(r))
        }
    }

    function i() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return r(o, e)
    }

    function o(e, t) {
        void 0 === t && (t = null);
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        for (var i = 0, o = e; i < o.length; i++) {
            var s = o[i];
            s && s.apply(t, r)
        }
    }

    function s(e, t, r, n) {
        void 0 === t && (t = null), void 0 === r && (r = 10), void 0 === n && (n = 0);
        for (var i = egret.getTimer(); egret.getTimer() - i < r;)
            if (e(t)) return;
        setTimeout(s, Math.max(0, i + n - egret.getTimer()), e, t, r, n)
    }
    e.functor = t, e.functorLeft = r, e.functorRight = n, e.combineMethods = i, e.callMethods = o, e.iterateCall = s
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function e() { }
        return e.isEmpty = function (e) {
            for (var t in e) return !1;
            return !0
        }, e.getCount = function (e) {
            var t = 0;
            for (var r in e) t++;
            return t
        }, e.getKeys = function (e) {
            var t = [];
            for (var r in e) t.push(r);
            return t
        }, e.getValues = function (e, t) {
            void 0 === t && (t = null);
            var r = [];
            for (var n in e) r.push(t ? e[n][t] : e[n]);
            return r
        }, e.clear = function (t) {
            for (var r = 0, n = e.getKeys(t); r < n.length; r++) {
                var i = n[r];
                delete t[i]
            }
        }, e.find = function (e, t, r) {
            void 0 === r && (r = null);
            for (var n in e)
                if (r) {
                    if (e[n][r] == t) return n
                } else if (e[n] == t) return n;
            return null
        }, e.remove = function (e, t, r, n) {
            void 0 === r && (r = null), void 0 === n && (n = !1);
            var i = [];
            for (var o in e) {
                if (r) {
                    if (e[o][r] != t) continue
                } else if (e[o] != t) continue;
                if (!n) return delete e[o], 1;
                i.push(o)
            }
            for (var s = 0, a = i; s < a.length; s++) o = a[s], delete e[o];
            return i.length
        }, e.merge = function (e, t, r) {
            void 0 === r && (r = !1);
            var n = r ? new e.constructor : e;
            for (var i in t) n[i] = t[i];
            return n
        }, e.formatString = function (t, r, n) {
            if (void 0 === r && (r = 0), void 0 === n && (n = !1), null == t) return "null";
            switch (typeof t) {
                case "boolean":
                    return t.toString();
                case "number":
                    return isNaN(t) ? "NaN" : t.toString();
                case "string":
                    return JSON.stringify(t);
                case "function":
                    return "<Function>"
            }
            if (t instanceof Array) {
                if (0 == t.length) return n ? "" : "[]";
                if (0 == r) return n ? ".." : "[..]";
                for (var i = [], o = 0, s = t; o < s.length; o++) {
                    var a = s[o];
                    i.push(e.formatString(a, r - 1))
                }
                return n ? i.join(", ") : "[" + i.join(", ") + "]"
            }
            if (e.isEmpty(t)) return n ? "" : "{}";
            if (0 == r) return n ? ".." : "{..}";
            var c = [];
            for (var f in t) c.push(f + ":" + e.formatString(t[f], r - 1));
            return c.sort(), n ? c.join(", ") : "{" + c.join(", ") + "}"
        }, e
    }();
    e.ObjectUtils = t, __reflect(t.prototype, "LibCore.ObjectUtils")
}(LibCore || (LibCore = {}));
var LibCore;
! function (e) {
    var t = function () {
        function e() { }
        return e.trim = function (t, r) {
            return void 0 === r && (r = null), t ? e.ltrim(e.rtrim(t, r), r) : ""
        }, e.ltrim = function (t, r) {
            if (void 0 === r && (r = null), t) {
                r = r || e.WHITESPACES;
                for (var n = t.length, i = 0; n > i; i++)
                    if (!(r.indexOf(t.charAt(i)) >= 0)) return t.slice(i)
            }
            return ""
        }, e.rtrim = function (t, r) {
            if (void 0 === r && (r = null), t) {
                r = r || e.WHITESPACES;
                for (var n = t.length - 1; n >= 0; n--)
                    if (!(r.indexOf(t.charAt(n)) >= 0)) return t.slice(0, n + 1)
            }
            return ""
        }, e.padLeft = function (t, r, n) {
            void 0 === n && (n = " ");
            var i = r - t.length;
            return i > 0 ? e.repeat(n, i) + t : t
        }, e.padRight = function (t, r, n) {
            void 0 === n && (n = " ");
            var i = r - t.length;
            return i > 0 ? t + e.repeat(n, i) : t
        }, e.fixNewlines = function (e) {
            return e ? e.replace(/(\r\n|\r)/g, "\n") : ""
        }, e.isEqual = function (e, t, r) {
            return void 0 === r && (r = !1), r ? e.toLowerCase() == t.toLowerCase() : e == t
        }, e.startsWith = function (t, r, n) {
            return void 0 === n && (n = !1), e.isEqual(r, t.slice(0, r.length), n)
        }, e.endsWith = function (t, r, n) {
            return void 0 === n && (n = !1), e.isEqual(r, t.slice(-r.length), n)
        }, e.repeat = function (e, t) {
            if (void 0 === t && (t = 2), !e || !t) return "";
            for (var r = e, n = t; n > 1; n--) r += e;
            return r
        }, e.substitute = function (e, t, r) {
            if (void 0 === r && (r = 0), e && t)
                if (t instanceof Array)
                    for (var n = t.length, i = 0; n > i; i++) e = e.replace(new RegExp("\\{" + (i + r) + "\\}", "g"), t[i]);
                else
                    for (var o in t) e = e.replace(new RegExp("\\{" + o + "\\}", "g"), t[o]);
            return e
        }, e.splitIntegers = function (t, r) {
            void 0 === r && (r = ",");
            var n = [];
            if (t = e.trim(t))
                for (var i = r instanceof RegExp ? t.split(r) : t.split(r), o = 0, s = i; o < s.length; o++) {
                    var a = s[o];
                    if (a = e.trim(a)) {
                        var c = parseInt(a);
                        isNaN(c) || n.push(c)
                    }
                }
            return n
        }, e.parseJson = function (e, t) {
            void 0 === t && (t = !1);
            try {
                return t && (e = e.replace(/\/\/.*/g, "")), JSON.parse(e.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3'))
            } catch (r) {
                console.log(r)
            }
            return null
        }, e.strToJson = function (t) {
            var r = t;
            if ("string" == typeof t && (r = JSON.parse(t)), "object" == typeof r)
                if (r._id_) {
                    var n = [];
                    r._v_ ? n.push(e.strToJson(r._v_)) : n.push(e.strToJson(this.getNewObject(r))), r = n
                } else {
                    var i = {};
                    for (var o in r) i[o] = e.strToJson(r[o]);
                    r = i
                }
            return r
        }, e.arrStrToJson = function (e) {
            for (var t = JSON.parse(e), r = {}, n = 0, i = t.length; i > n; n++) {
                var o = t[n];
                o._id_ ? r[o._id_] = o._v_ : r[n] = o
            }
            return r
        }, e.formatJson = function (e, t, r) {
            void 0 === t && (t = null), void 0 === r && (r = !0);
            var n = JSON.stringify(e, null, t);
            return r && (n = n.replace(/([{,]\s*)"(\w+)"(\s*:)/g, "$1$2$3")), n
        }, e.adjustSlash = function (e) {
            return e.replace(/\\/g, "/")
        }, e.getPath = function (e, t) {
            void 0 === t && (t = !1);
            var r = e.lastIndexOf("/");
            0 > r && (r = e.lastIndexOf("\\"));
            var n = 0 > r ? "" : e.slice(0, r);
            return n && t ? this.adjustSlash(n) : n
        }, e.getFilename = function (e, t) {
            void 0 === t && (t = !1);
            var r = e.lastIndexOf("/");
            0 > r && (r = e.lastIndexOf("\\"));
            var n = 0 > r ? e : e.slice(r + 1);
            return t && (r = n.lastIndexOf("."), r >= 0) ? n.slice(0, r) : n
        }, e.getExt = function (e) {
            var t = e.lastIndexOf("."),
                r = 0 > t ? "" : e.slice(t + 1);
            return r && (r.indexOf("/") >= 0 || r.indexOf("\\") >= 0) && (r = ""), r
        }, e.changeExt = function (e, t) {
            void 0 === t && (t = "");
            var r = e.lastIndexOf("."),
                n = 0 > r ? "" : e.slice(r);
            return n && (n.indexOf("/") >= 0 || n.indexOf("\\") >= 0) && (n = ""), e.slice(0, -n.length) + (t ? "." + t : "")
        }, e.getNewObject = function (e) {
            var t = {};
            for (var r in e) "_id_" != r && (t[r] = e[r]);
            return t
        }, e.WHITESPACES = " 	\r\n\f", e
    }();
    e.StringUtils = t, __reflect(t.prototype, "LibCore.StringUtils")
}(LibCore || (LibCore = {}));