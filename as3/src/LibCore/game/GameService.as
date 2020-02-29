//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.game {
    import LibCore.net.*;
    import LibCore.rpc.*;
    import flash.system.*;
    import LibCore.rpc.type.*;
    import LibCore.utils.*;
    import LibCore.rpc.def.*;
    import LibCore.pmvc.core.*;

    public class GameService extends Model {

        private var _staticMethods;
        private var _connInfo:ConnectInfo;

        public static var instance:GameService = new (GameService);
;

        public function GameService(){
            super();
            Singleton.set(this);
        }
        private function onConnect():void{
            if (GameConfig.TX_TAG){
                SocketService.instance.sendTXTag();
            };
            sendSimpleCommand(GameCmd.SERVER_CONNECTED);
        }
        private function onConnectFail():void{
            sendSimpleCommand(GameCmd.SERVER_CONNECT_FAIL);
        }
        private function onDisconnect():void{
            sendSimpleCommand(GameCmd.SERVER_DISCONNECTED);
        }
        private function onError():void{
            sendSimpleCommand(GameCmd.CONNECTION_ERROR);
        }
        private function onSendError(packet:Packet):void{
            sendSimpleCommand(GameCmd.SEND_DATA_ERROR);
        }
        private function onRecvError(packet:Packet, buffer:ByteArrayLittle):void{
            sendSimpleCommand(GameCmd.RECV_DATA_ERROR);
            SocketService.instance.disconnect();
        }
        private function createPacket():Packet{
            return (new RpcPacket());
        }
        private function createRpcPacket(id:uint, eid:int):RpcPacket{
            var packet:RpcPacket = (SocketService.instance.popPacket() as RpcPacket);
            ((packet) && (packet.reset(id, eid)));
            return (((packet) || (new RpcPacket(id, eid))));
        }
        private function sendRpcPacket(packet:RpcPacket):void{
            SocketService.instance.sendPacket(packet);
            SocketService.instance.pushPacket(packet);
        }
        private function getStaticMethod(def:MethodDef):Function{
            return (this._staticMethods[def.name]);
        }

        public static function get connected():Boolean{
            return (SocketService.instance.connected);
        }
        public static function get rpcVersion():int{
            return (RpcDef.version);
        }
        public static function initialize(rpc:Object, staticMethods:Object=null):void{
            SocketInterface.onConnect = instance.onConnect;
            SocketInterface.onConnectFail = instance.onConnectFail;
            SocketInterface.onDisconnect = instance.onDisconnect;
            SocketInterface.onError = instance.onError;
            SocketInterface.onSendError = instance.onSendError;
            SocketInterface.onRecvError = instance.onRecvError;
            SocketInterface.createPacket = instance.createPacket;
            SocketInterface.errorLog = GameLog.error;
            SocketInterface.debugLog = GameLog.debug;
            RpcInterface.createRpcPacket = instance.createRpcPacket;
            RpcInterface.sendRpcPacket = instance.sendRpcPacket;
            RpcInterface.getStaticMethod = instance.getStaticMethod;
            RpcInterface.errorLog = GameLog.error;
            RpcInterface.debugLog = GameLog.debug;
            Security.allowDomain(GameConfig.SVR_HOST);
            RpcDef.initialize(rpc);
            instance._staticMethods = ((staticMethods) || ({}));
        }
        public static function connect(mode:int=0):void{
            if (((!((mode == 1))) || (!(instance._connInfo)))){
                instance._connInfo = new ConnectInfo(GameConfig.SVR_HOST, GameConfig.SVR_PORT, GameConfig.POLICY_PORT);
            };
            SocketService.instance.connect(instance._connInfo);
        }
        public static function disconnect():void{
            SocketService.instance.disconnect();
        }
        public static function setEncryptSeed(seed:int):void{
            if (GameConfig.ENCRYPT){
                SocketService.instance.encryptSeed = seed;
            };
        }
        public static function registerEntityClass(className:String, entityClass:String):void{
            RpcDef.registerEntityClass(className, entityClass);
        }
        public static function addEntity(entity:Entity):Boolean{
            return (EntityManager.instance.addEntity(entity));
        }
        public static function getEntity(eid:int):Entity{
            return (EntityManager.instance.getEntity(eid));
        }
        public static function removeEntity(eid:int):Entity{
            return (EntityManager.instance.removeEntity(eid));
        }
        public static function createEntity(type, eid:int=0):Entity{
            return (EntityManager.instance.createEntity(type, eid));
        }
        public static function newStruct(type:String):Struct{
            return (RpcDef.newStruct(type));
        }
        public static function newArray(type:String):TypeArray{
            return (RpcDef.newArray(type));
        }

    }
}//package LibCore.game 
