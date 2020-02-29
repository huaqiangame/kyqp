//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.def {

    public class MethodDef {

        public var id:uint;
        public var name:String;
        public var className:String;
        public var server:String;
        public var isStatic:Boolean;
        public var args:Array;

        public function MethodDef(def:Object){
            var item:Object;
            this.args = [];
            super();
            this.id = def.id;
            this.name = def.name;
            this.className = def.className;
            this.server = def.server;
            this.isStatic = def.isStatic;
            for each (item in def.args) {
                this.args.push(new ArgDef(item));
            };
        }
        public function toString():String{
            return (((((((((("<Method " + this.className) + "@") + this.server) + ".") + this.name) + "(") + this.args.join(",")) + ")") + (this.isStatic) ? " static>" : ">"));
        }

    }
}//package LibCore.rpc.def 
