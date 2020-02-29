//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {
    import flash.utils.*;
    import flash.net.*;

    public class SocketLittle extends Socket {

        public function SocketLittle(){
            super();
            this.endian = Endian.LITTLE_ENDIAN;
        }
    }
}//package LibCore.net 
