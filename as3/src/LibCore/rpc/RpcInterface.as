//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import LibCore.rpc.def.*;

    public class RpcInterface {

        public static var createRpcPacket:Function = function (id:uint, eid:uint):RpcPacket{
            return (new RpcPacket(id, eid));
        };
        public static var sendRpcPacket:Function = function (packet:RpcPacket):void{
            ((debugLog) && (debugLog(("Sending rpc packet: " + packet))));
        };
        public static var getStaticMethod:Function = function (def:MethodDef):Function{
            return (null);
        };
        public static var errorLog:Function = trace;
        public static var debugLog:Function = trace;

    }
}//package LibCore.rpc 
