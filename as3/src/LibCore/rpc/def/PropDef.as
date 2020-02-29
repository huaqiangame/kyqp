//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.def {
    import flash.geom.*;

    public class PropDef {

        public var id:uint;
        public var name:String;
        public var className:String;
        public var type:String;
        public var defVal;

        public function PropDef(def:Object){
            super();
            this.id = def.id;
            this.name = def.name;
            this.className = def.className;
            this.type = def.type;
            this.defVal = ((this.type == "float2")) ? new Point(def.defVal[1], def.defVal[2]) : def.defVal;
        }
        public function toString():String{
            return ((((((("<Prop " + this.className) + ".") + this.name) + ":") + this.type) + ">"));
        }

    }
}//package LibCore.rpc.def 
