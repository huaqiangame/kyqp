//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {

    public class SocketInterface {

        public static var onConnect:Function;
        public static var onConnectFail:Function;
        public static var onDisconnect:Function;
        public static var onError:Function;
        public static var onSendError:Function;
        public static var onRecvError:Function = function (packet:Packet, buffer:ByteArrayLittle):void{
            SocketService.instance.disconnect();
        };
        public static var createPacket:Function = function ():Packet{
            return (new Packet());
        };
        public static var errorLog:Function = trace;
        public static var debugLog:Function = trace;

    }
}//package LibCore.net 
