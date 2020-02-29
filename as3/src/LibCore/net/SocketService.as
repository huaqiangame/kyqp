//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {
    import LibCore.utils.*;
    import cmodule.encryption.*;
    import flash.system.*;
    import flash.events.*;

    public class SocketService {

        private var _socket:SocketLittle;
        private var _connInfo:ConnectInfo;
        private var _buffer:ByteArrayLittle;
        private var _encrypter:Object;
        private var _encryptSeed:int;
        private var _encryptBuffer:ByteArrayLittle;
        private var _packetPool:Array;

        private static const ENCRYPT_MASK:uint = 84048153;

        public static var instance:SocketService = new (SocketService);
;

        public function SocketService(){
            super();
            Singleton.set(this);
        }
        public function get connected():Boolean{
            return (((this._socket) && (this._socket.connected)));
        }
        public function get encryptSeed():int{
            return (this._encryptSeed);
        }
        public function set encryptSeed(val:int):void{
            if (this._encryptSeed == val){
                return;
            };
            this._encryptSeed = val;
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Set socket encrypt seed to: " + val))));
            if (val){
                this._encrypter = ((this._encrypter) || (new CLibInit().init()));
                this._encrypter.encodeInit(val, val, ENCRYPT_MASK);
            };
        }
        public function connect(connInfo:ConnectInfo):void{
            var connInfo = connInfo;
            this.disconnect();
            this._connInfo = connInfo;
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Connect to socket: " + this._connInfo))));
            this.initSocket();
            Security.loadPolicyFile(this._connInfo.policyURL);
            this._socket.connect(this._connInfo.host, this._connInfo.port);
            //unresolved jump
            var _slot1 = e;
            ((SocketInterface.errorLog) && (SocketInterface.errorLog(((("Connect to socket error: " + _slot1.name) + "\n") + _slot1.message))));
            ((SocketInterface.onConnectFail) && (SocketInterface.onConnectFail()));
        }
        public function disconnect():void{
            if (!(this._socket)){
                return;
            };
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Disconnect socket: " + this._connInfo))));
            this.clearSocket();
            this.onDisconnect(null);
        }
        public function sendTXTag():void{
            if (!(this.connected)){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog("Socket not connected for sending TXTag")));
                return;
            };
            var tx_tag:String = (((("tgw_l7_forward\r\nHost:" + this._connInfo.host) + ":") + this._connInfo.port) + "\r\n\r\n");
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Sending TXTag: " + tx_tag))));
            this._socket.writeMultiByte(tx_tag, "gbk");
            this._socket.flush();
        }
        public function sendPacket(packet:Packet):void{
            var packet = packet;
            if (!(this.connected)){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog("Socket not connected for sending packet")));
                return;
            };
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Sending packet: " + packet))));
            if (this._encryptSeed){
                this._encryptBuffer.length = 0;
                this._encryptBuffer.position = 0;
                if (!(packet.write(this._encryptBuffer))){
                    return;
                };
                this._encrypter.encodeData(this._encryptBuffer, this._encryptBuffer.length);
                this._socket.writeBytes(this._encryptBuffer);
            } else {
                if (!(packet.write(this._socket))){
                    return;
                };
            };
            this._socket.flush();
            //unresolved jump
            var _slot1 = e;
            ((SocketInterface.errorLog) && (SocketInterface.errorLog(((("Sending packet error: " + _slot1.name) + "\n") + _slot1.message))));
            ((SocketInterface.onSendError) && (SocketInterface.onSendError(packet)));
        }
        protected function initSocket():void{
            if (this._socket){
                return;
            };
            this._socket = new SocketLittle();
            this._socket.addEventListener(Event.CONNECT, this.onConnect);
            this._socket.addEventListener(Event.CLOSE, this.onDisconnect);
            this._socket.addEventListener(ProgressEvent.SOCKET_DATA, this.onData);
            this._socket.addEventListener(IOErrorEvent.IO_ERROR, this.onError);
            this._socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.onError);
            this._buffer = new ByteArrayLittle();
            this._encryptBuffer = new ByteArrayLittle();
            this._packetPool = [];
        }
        protected function clearSocket():void{
            if (!(this._socket)){
                return;
            };
            this._socket.removeEventListener(Event.CONNECT, this.onConnect);
            this._socket.removeEventListener(Event.CLOSE, this.onDisconnect);
            this._socket.removeEventListener(ProgressEvent.SOCKET_DATA, this.onData);
            this._socket.removeEventListener(IOErrorEvent.IO_ERROR, this.onError);
            this._socket.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, this.onError);
            this._socket.close();
            this._socket = null;
            this._buffer.clear();
            this._buffer = null;
            this._encryptSeed = 0;
            this._encryptBuffer.clear();
            this._encryptBuffer = null;
            this._packetPool = null;
        }
        protected function onConnect(evt:Event):void{
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Socket connected with: " + this._connInfo))));
            ((SocketInterface.onConnect) && (SocketInterface.onConnect()));
        }
        protected function onDisconnect(evt:Event):void{
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Socket disconnected from: " + this._connInfo))));
            ((SocketInterface.onDisconnect) && (SocketInterface.onDisconnect()));
        }
        protected function onData(evt:Event):void{
            var packet:Packet;
            var evt = evt;
            ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Receiving socket data: " + this._socket.bytesAvailable))));
            if (this._encryptSeed){
                this._encryptBuffer.length = 0;
                this._encryptBuffer.position = 0;
                this._socket.readBytes(this._encryptBuffer);
                this._encrypter.decodeData(this._encryptBuffer, this._encryptBuffer.length);
                this._encryptBuffer.readBytes(this._buffer, this._buffer.length);
            } else {
                this._socket.readBytes(this._buffer, this._buffer.length);
            };
            packet = this.popPacket(true);
            while (packet.read(this._buffer)) {
                ((SocketInterface.debugLog) && (SocketInterface.debugLog(("Handling packet: " + packet))));
                packet.handle();
            };
            //unresolved jump
            var _slot1 = e;
            ((SocketInterface.errorLog) && (SocketInterface.errorLog(((("Receiving packet error: " + _slot1.name) + "\n") + _slot1.message))));
            SocketInterface.onRecvError(packet, _buffer);
            this.pushPacket(packet);
            if (((this._buffer) && ((this._buffer.bytesAvailable == 0)))){
                this._buffer.length = 0;
                this._buffer.position = 0;
            };
        }
        protected function onError(evt:ErrorEvent):void{
            ((SocketInterface.errorLog) && (SocketInterface.errorLog(((("Socket connection error: " + evt.type) + "\n") + evt.text))));
            if (this.connected){
                ((SocketInterface.onError) && (SocketInterface.onError()));
            } else {
                ((SocketInterface.onConnectFail) && (SocketInterface.onConnectFail()));
            };
        }
        public function popPacket(autoCreate:Boolean=false):Packet{
            if (((this._packetPool) && ((this._packetPool.length > 0)))){
                return ((this._packetPool.pop() as Packet));
            };
            return ((autoCreate) ? SocketInterface.createPacket() : null);
        }
        public function pushPacket(packet:Packet):void{
            if (this._packetPool){
                this._packetPool.push(packet);
            };
        }
        public function clearBuffer():void{
            if (((this._buffer) && ((this._buffer.length == 0)))){
                this._buffer.clear();
            };
            if (this._encryptBuffer){
                this._encryptBuffer.clear();
            };
            this._packetPool = [];
        }

    }
}//package LibCore.net 
