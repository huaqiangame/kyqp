//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import LibCore.rpc.def.*;
    import LibCore.net.*;

    public class RpcPacket extends Packet {

        private var _id:uint;
        private var _eid:uint;
        private var _params:Array;
        protected var method:MethodDef;

        public function RpcPacket(id:uint=0, eid:uint=0){
            super();
            this.reset(id, eid);
        }
        public function get id():uint{
            return (this._id);
        }
        public function get eid():uint{
            return (this._eid);
        }
        public function get isStatic():Boolean{
            return (this.method.isStatic);
        }
        public function reset(id:uint=0, eid:uint=0):void{
            this._id = id;
            this._eid = eid;
            this.method = (id) ? RpcDef.getMethodDef(id) : null;
            this._params = (id) ? [] : null;
        }
        public function setParams(params:Array):void{
            var args:Array = this.method.args;
            var len:int = params.length;
            if (args.length != len){
                throw (new ArgumentError(("Setting rpc params with wrong count: " + len)));
            };
            this._params.push.apply(this._params, params);
        }
        override protected function readContent():Boolean{
            var arg:ArgDef;
            var reader:Function;
            this.reset(this.content.readUnsignedInt());
            if (!(this.method)){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Rpc method not found: " + this._id))));
                return (false);
            };
            this._eid = (this.isStatic) ? 0 : this.content.readUnsignedInt();
            var args:Array = this.method.args;
            var i:int;
            while (i < args.length) {
                arg = args[i];
                reader = RpcDef.getTypeReader(arg.type);
                if (reader == null){
                    throw (new TypeError(("Type reader not found: " + arg.type)));
                };
                this._params.push(reader(this.content));
                i++;
            };
            return (true);
        }
        override protected function writeContent():Boolean{
            var arg:ArgDef;
            var writer:Function;
            if (!(this.method)){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Rpc method not found: " + this._id))));
                return (false);
            };
            this.content.writeUnsignedInt(this._id);
            if (!(this.isStatic)){
                this.content.writeUnsignedInt(this._eid);
            };
            var args:Array = this.method.args;
            var i:int;
            while (i < args.length) {
                arg = args[i];
                writer = RpcDef.getTypeWriter(arg.type);
                if (writer == null){
                    throw (new TypeError(("Type writer not found: " + arg.type)));
                };
                writer(this.content, this._params[i]);
                i++;
            };
            return (true);
        }
        override public function handle():void{
            var static_method:Function;
            var entity:Entity;
            var entity_method:Function;
            if (this.isStatic){
                static_method = RpcInterface.getStaticMethod(this.method);
                if (static_method == null){
                    ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Static method not found: " + this.method))));
                    return;
                };
                static_method.apply(null, this._params);
            } else {
                entity = EntityManager.instance.getEntity(this._eid);
                if (!(entity)){
                    ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Entity not found: " + this))));
                    return;
                };
                entity_method = (entity.hasOwnProperty(this.method.name)) ? entity[this.method.name] : null;
                if (entity_method == null){
                    ((RpcInterface.errorLog) && (RpcInterface.errorLog(((("Entity method not found: " + entity) + " ") + this.method))));
                    return;
                };
                entity_method.apply(entity, this._params);
            };
        }
        override public function toString():String{
            return ((((((((("<Packet id=" + this._id) + ",eid=") + this._eid) + ",call=") + this.method) + ",len=") + this.content.length) + ">"));
        }

    }
}//package LibCore.rpc 
