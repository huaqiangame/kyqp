var __reflect = this && this.__reflect || function(t, e, n) {
        t.__class__ = e, n ? n.push(e) : n = [e], t.__types__ = t.__types__ ? n.concat(t.__types__) : n
    },
    __extends = this && this.__extends || function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
        n.prototype = e.prototype, t.prototype = new n
    },
    egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function n(o, i) {
            void 0 === o && (o = ""), void 0 === i && (i = 0);
            var s = e.call(this) || this;
            return s._writeMessage = "", s._readMessage = "", s._connected = !1, s._connecting = !1, s._isReadySend = !1, s._bytesWrite = !1, s._type = n.TYPE_STRING, s._connected = !1, s._writeMessage = "", s._readMessage = "", s.socket = new t.ISocket, s.socket.addCallBacks(s.onConnect, s.onClose, s.onSocketData, s.onError, s), s
        }
        return __extends(n, e), n.prototype.connect = function(t, e) {
            this._connecting || this._connected || (this._connecting = !0, this.socket.connect(t, e))
        }, n.prototype.connectByUrl = function(t) {
            this._connecting || this._connected || (this._connecting = !0, this.socket.connectByUrl(t))
        }, n.prototype.close = function() {
            this._connected && this.socket.close()
        }, n.prototype.onConnect = function() {
            this._connected = !0, this._connecting = !1, this.dispatchEventWith(t.Event.CONNECT)
        }, n.prototype.onClose = function() {
            this._connected = !1, this.dispatchEventWith(t.Event.CLOSE)
        }, n.prototype.onError = function() {
            this._connecting && (this._connecting = !1), this.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
        }, n.prototype.onSocketData = function(e) {
            "string" == typeof e ? this._readMessage += e : this._readByte._writeUint8Array(new Uint8Array(e)), t.ProgressEvent.dispatchProgressEvent(this, t.ProgressEvent.SOCKET_DATA)
        }, n.prototype.flush = function() {
            return this._connected ? (this._writeMessage && (this.socket.send(this._writeMessage), this._writeMessage = ""), this._bytesWrite && (this.socket.send(this._writeByte.buffer), this._bytesWrite = !1, this._writeByte.clear()), void(this._isReadySend = !1)) : void t.$warn(3101)
        }, n.prototype.writeUTF = function(e) {
            return this._connected ? (this._type == n.TYPE_BINARY ? (this._bytesWrite = !0, this._writeByte.writeUTF(e)) : this._writeMessage += e, void this.flush()) : void t.$warn(3101)
        }, n.prototype.readUTF = function() {
            var t;
            return this._type == n.TYPE_BINARY ? (this._readByte.position = 0, t = this._readByte.readUTF(), this._readByte.clear()) : (t = this._readMessage, this._readMessage = ""), t
        }, n.prototype.writeBytes = function(e, n, o) {
            return void 0 === n && (n = 0), void 0 === o && (o = 0), this._connected ? this._writeByte ? (this._bytesWrite = !0, this._writeByte.writeBytes(e, n, o), void this.flush()) : void t.$warn(3102) : void t.$warn(3101)
        }, n.prototype.readBytes = function(e, n, o) {
            return void 0 === n && (n = 0), void 0 === o && (o = 0), this._readByte ? (this._readByte.position = 0, this._readByte.readBytes(e, n, o), void this._readByte.clear()) : void t.$warn(3102)
        }, Object.defineProperty(n.prototype, "connected", {
            get: function() {
                return this._connected
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(n.prototype, "type", {
            get: function() {
                return this._type
            },
            set: function(e) {
                this._type = e, e != n.TYPE_BINARY || this._writeByte || (this._readByte = new t.ByteArray, this._writeByte = new t.ByteArray)
            },
            enumerable: !0,
            configurable: !0
        }), n.TYPE_STRING = "webSocketTypeString", n.TYPE_BINARY = "webSocketTypeBinary", n
    }(t.EventDispatcher);
    t.WebSocket = e, __reflect(e.prototype, "egret.WebSocket")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var n = function() {
            function e() {
                this.host = "", this.port = 0, window.WebSocket || t.$error(3100)
            }
            return e.prototype.addCallBacks = function(t, e, n, o, i) {
                this.onConnect = t, this.onClose = e, this.onSocketData = n, this.onError = o, this.thisObject = i
            }, e.prototype.connect = function(t, e) {
                this.host = t, this.port = e;
                var n = "ws://" + this.host + ":" + this.port;
                this.socket = new window.WebSocket(n), this.socket.binaryType = "arraybuffer", this._bindEvent()
            }, e.prototype.connectByUrl = function(t) {
                this.socket = new window.WebSocket(t), this.socket.binaryType = "arraybuffer", this._bindEvent()
            }, e.prototype._bindEvent = function() {
                var t = this,
                    e = this.socket;
                e.onopen = function() {
                    t.onConnect && t.onConnect.call(t.thisObject)
                }, e.onclose = function(e) {
                    t.onClose && t.onClose.call(t.thisObject)
                }, e.onerror = function(e) {
                    t.onError && t.onError.call(t.thisObject)
                }, e.onmessage = function(e) {
                    t.onSocketData && t.onSocketData.call(t.thisObject, e.data)
                }
            }, e.prototype.send = function(t) {
                this.socket.send(t)
            }, e.prototype.close = function() {
                this.socket.close()
            }, e.prototype.disconnect = function() {
                this.socket.disconnect && this.socket.disconnect()
            }, e
        }();
        e.HTML5WebSocket = n, __reflect(n.prototype, "egret.web.HTML5WebSocket", ["egret.ISocket"]), t.ISocket = n
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));