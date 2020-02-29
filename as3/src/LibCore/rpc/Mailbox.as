//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import LibCore.rpc.def.*;
    import flash.utils.*;

    public dynamic class Mailbox extends Proxy {

        private var _className:String;
        private var _server:String;
        private var _eid:uint;
        protected var methodDefs:Object;

        public function Mailbox(className:String, server:String, eid:uint=0){
            super();
            this._server = server;
            this._eid = eid;
            this.methodDefs = RpcDef.getClassMethods(className, server);
        }
        public function get className():String{
            return (this._className);
        }
        public function get server():String{
            return (this._server);
        }
        public function get eid():uint{
            return (this._eid);
        }
        override "http://www.adobe.com/2006/actionscript/flash/proxy"?? function callProperty(name, ... _args){
            var def:MethodDef;
            var name = name;
            var params = _args;
            def = this.methodDefs[name];
            if (!(def)){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Calling rpc method not defined: " + name))));
                return (null);
            };
            ((RpcInterface.debugLog) && (RpcInterface.debugLog(("Calling rpc method: " + def))));
            var packet:RpcPacket = RpcInterface.createRpcPacket(def.id, this._eid);
            packet.setParams(params);
            RpcInterface.sendRpcPacket(packet);
            //unresolved jump
            var _slot1 = e;
            ((RpcInterface.errorLog) && (RpcInterface.errorLog(((((("Calling rpc method error: " + def) + " ") + _slot1.name) + "\n") + _slot1.message))));
            return (null);
        }
        public function toString():String{
            return ((((((("<Mailbox " + this._className) + "@") + this._server) + " eid=") + this._eid) + ">"));
        }

    }
}//package LibCore.rpc 
