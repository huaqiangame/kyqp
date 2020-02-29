//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.type {

    public class Int64 {

        public var low:uint;
        public var high:int;

        public function Int64(low:uint=0, high:int=0){
            super();
            this.low = low;
            this.high = high;
        }
        public function get isZero():Boolean{
            return ((((this.low == 0)) && ((this.high == 0))));
        }
        public function equals(other:Int64):Boolean{
            return ((((this.low == other.low)) && ((this.high == other.high))));
        }
        public function not():Int64{
            this.low = ~(this.low);
            this.high = ~(this.high);
            return (this);
        }
        public function and(other:Int64):Int64{
            this.low = (this.low & other.low);
            this.high = (this.high & other.high);
            return (this);
        }
        public function or(other:Int64):Int64{
            this.low = (this.low | other.low);
            this.high = (this.high | other.high);
            return (this);
        }
        public function xor(other:Int64):Int64{
            this.low = (this.low ^ other.low);
            this.high = (this.high ^ other.high);
            return (this);
        }
        public function shl(bits:uint):Int64{
            if (((bits) && (!(this.isZero)))){
                this.high = ((bits < 32)) ? ((this.high << bits) | (this.low >>> (32 - bits))) : ((bits < 64)) ? (this.low << (bits - 32)) : 0;
                this.low = ((bits < 32)) ? (this.low << bits) : 0;
            };
            return (this);
        }
        public function shr(bits:uint):Int64{
            if (((bits) && (!(this.isZero)))){
                this.low = ((bits < 32)) ? ((this.low >>> bits) | (this.high << (32 - bits))) : ((bits < 64)) ? (this.high >> (bits - 32)) : ((this.high < 0)) ? -1 : 0;
                this.high = ((bits < 32)) ? (this.high >> bits) : ((this.high < 0)) ? -1 : 0;
            };
            return (this);
        }
        public function ushr(bits:uint):Int64{
            if (((bits) && (!(this.isZero)))){
                this.low = ((bits < 32)) ? ((this.low >>> bits) | (this.high << (32 - bits))) : ((bits < 64)) ? (this.high >>> (bits - 32)) : 0;
                this.high = ((bits < 32)) ? (this.high >>> bits) : 0;
            };
            return (this);
        }
        public function clone():Int64{
            return (new Int64(this.low, this.high));
        }
        public function valueOf():Number{
            return (((this.high * 4294967296) + this.low));
        }
        public function toString(radius=10):String{
            return (this.valueOf().toString(radius));
        }

        public static function from(val):Int64{
            if ((val is Int64)){
                return (val.clone());
            };
            var v:Number = Number(val);
            return (new Int64(v, Math.floor((v / 4294967296))));
        }

    }
}//package LibCore.rpc.type 
