//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.def {

    public class TypeDef {

        public var id:uint;
        public var name:String;
        public var defs:Object;

        public function TypeDef(def:Object){
            var item:Object;
            this.defs = {};
            super();
            this.id = def.id;
            this.name = def.name;
            for each (item in def.defs) {
                this.defs[item.name] = item.type;
            };
        }
    }
}//package LibCore.rpc.def 
