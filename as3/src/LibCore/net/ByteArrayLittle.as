//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {
    import flash.utils.*;

    public class ByteArrayLittle extends ByteArray {

        public function ByteArrayLittle(){
            super();
            this.endian = Endian.LITTLE_ENDIAN;
        }
    }
}//package LibCore.net 
