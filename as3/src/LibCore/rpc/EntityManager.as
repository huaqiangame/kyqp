//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import flash.utils.*;
    import LibCore.utils.*;

    public class EntityManager {

        private var _entities:Dictionary;
        private var _clientEID:int;// = 0

        public static var instance:EntityManager = new (EntityManager);
;

        public function EntityManager(){
            this._entities = new Dictionary();
            super();
            Singleton.set(this);
        }
        public function addEntity(entity:Entity):Boolean{
            if (this.getEntity(entity.eid)){
                ((RpcInterface.errorLog) && (RpcInterface.errorLog(("Entity already exist: " + entity))));
                return (false);
            };
            ((RpcInterface.debugLog) && (RpcInterface.debugLog(("Adding entity: " + entity))));
            this._entities[entity.eid] = entity;
            return (true);
        }
        public function getEntity(eid:int):Entity{
            return (this._entities[eid]);
        }
        public function removeEntity(eid:int):Entity{
            var entity:Entity = this.getEntity(eid);
            if (entity){
                ((RpcInterface.debugLog) && (RpcInterface.debugLog(("Removing entity: " + entity))));
                delete this._entities[eid];
                entity.onRemove();
            };
            return (entity);
        }
        public function createEntity(type, eid:int=0):Entity{
            var entity_class:Class = RpcDef.getEntityClass(type);
            if (!(entity_class)){
                throw (new TypeError(("Entity class not found: " + type)));
            };
            ((RpcInterface.debugLog) && (RpcInterface.debugLog(("Creating entity: " + entity_class))));
            var entity:Entity = new entity_class(((eid) || (this.genClientEID())));
            this.addEntity(entity);
            entity.onCreate();
            return (entity);
        }
        protected function genClientEID():int{
            do  {
            } while (this.getEntity(--this._clientEID));
            return (this._clientEID);
        }

    }
}//package LibCore.rpc 
