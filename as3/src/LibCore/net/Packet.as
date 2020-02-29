//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {
    import flash.utils.*;

    public class Packet {

        protected var content:ByteArrayLittle;

        public static const INT_SIZE:uint = 4;
        public static const MAX_LEN:uint = 0xFFFF;
        public static const BAD_LEN:uint = 655350;

        public function Packet(){
            super();
            this.content = new ByteArrayLittle();
        }
        public function read(buffer:ByteArrayLittle):Boolean{
            if (buffer.bytesAvailable < INT_SIZE){
                return (false);
            };
            var old_pos:int = buffer.position;
            var len:uint = buffer.readUnsignedInt();
            var flag:uint = ((len >> 24) & 0xFF);
            len = (len & 0xFFFFFF);
            if ((((((len == 0)) || ((len > BAD_LEN)))) || (!((flag == (len % 0xFF)))))){
                throw (new Error(("Invalid packet size: " + len)));
            };
            if (len > MAX_LEN){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog(("Packet too large: " + len))));
            };
            if (buffer.bytesAvailable < len){
                buffer.position = old_pos;
                return (false);
            };
            this.content.length = len;
            buffer.readBytes(this.content, 0, len);
            this.content.position = 0;
            if (!(this.readContent())){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog(("Read packet content error: " + this))));
                return (false);
            };
            return (true);
        }
        public function write(buffer:IDataOutput):Boolean{
            this.content.length = 0;
            this.content.position = 0;
            if (!(this.writeContent())){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog(("Write packet content error: " + this))));
                return (false);
            };
            var len:uint = this.content.length;
            if (len == 0){
                ((SocketInterface.errorLog) && (SocketInterface.errorLog(("Write packet empty: " + this))));
                return (false);
            };
            len = (((len % 0xFF) << 24) | (len & 0xFFFFFF));
            buffer.writeUnsignedInt(len);
            buffer.writeBytes(this.content);
            return (true);
        }
        protected function readContent():Boolean{
            return (true);
        }
        protected function writeContent():Boolean{
            return (true);
        }
        public function handle():void{
        }
        public function toString():String{
            return ((("<Packet len=" + this.content.length) + ">"));
        }

    }
}//package LibCore.net 
