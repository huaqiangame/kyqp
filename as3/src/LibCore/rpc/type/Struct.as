//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc.type {
    import LibCore.rpc.def.*;
    import LibCore.rpc.*;
    import flash.utils.*;

    public dynamic class Struct extends Proxy {

        private var _type:TypeDef;
        private var _items:Object;

        public function Struct(type:TypeDef){
            this._items = {};
            super();
            this._type = type;
        }
        public function get type():TypeDef{
            return (this._type);
        }
        public function hasKey(name):Boolean{
            return (this._type.defs.hasOwnProperty(name));
        }
        override "http://www.adobe.com/2006/actionscript/flash/proxy"?? function setProperty(name, value):void{
            if (!(this.hasKey(name))){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Setting struct member not defined: " + name))));
                return;
            };
            this._items[name] = value;
        }
        override "http://www.adobe.com/2006/actionscript/flash/proxy"?? function getProperty(name){
            if (!(this.hasKey(name))){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Getting struct member not defined: " + name))));
                return (null);
            };
            return (this._items[name]);
        }
        public function toString():String{
            var i:String;
            var arr:Array = [];
            for (i in this._type.defs) {
                arr.push(((i + "=") + this._items[i]));
            };
            return ((((("<" + this._type.name) + " ") + arr.join(",")) + ">"));
        }

    }
}//package LibCore.rpc.type 
