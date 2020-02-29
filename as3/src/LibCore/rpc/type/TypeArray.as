//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.type {
    import LibCore.rpc.def.*;

    public class TypeArray extends Array {

        private var _type:TypeDef;

        public function TypeArray(type:TypeDef){
            super();
            this._type = type;
        }
        public function get type():TypeDef{
            return (this._type);
        }

    }
}//package LibCore.rpc.type 
