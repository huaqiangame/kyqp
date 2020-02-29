//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.def {

    public class ArgDef {

        public var name:String;
        public var type:String;

        public function ArgDef(def:Object){
            super();
            this.name = def.name;
            this.type = def.type;
        }
        public function toString():String{
            return (((this.name + ":") + this.type));
        }

    }
}//package LibCore.rpc.def 
