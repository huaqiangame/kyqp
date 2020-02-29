//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import LibCore.rpc.def.*;

    public class Entity {

        private var _eid:int;
        private var _className:String;
        private var _propDefs:Object;

        public function Entity(eid:int=0){
            var i:String;
            var def:PropDef;
            super();
            this._eid = eid;
            this._className = RpcDef.getEntityClassName(this);
            this._propDefs = RpcDef.getClassProps(this._className);
            for (i in this._propDefs) {
                def = this._propDefs[i];
                if (!(hasOwnProperty(i))){
                    ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Entity property not implemented: " + def))));
                } else {
                    this[i] = def.defVal;
                };
            };
        }
        public function get eid():int{
            return (this._eid);
        }
        public function get className():String{
            return (this._className);
        }
        public function onCreate():void{
        }
        public function onRemove():void{
        }
        public function toString():String{
            return ((((("<Entity:" + this._className) + " eid=") + this._eid) + ">"));
        }

    }
}//package LibCore.rpc 
