//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import flash.utils.*;
    import LibCore.rpc.def.*;
    import LibCore.rpc.type.*;

    public class RpcDef {

        private static const STRUCT_BASE_ID:uint = 20;

        private static var _version:int = 0;
        private static var _methodDefs:Dictionary = new Dictionary();
        private static var _classMethods:Object = {};
        private static var _classProps:Object = {};
        private static var _entityClasses:Dictionary = new Dictionary();
        private static var _typeDefs:Dictionary = new Dictionary();
        private static var _typeWriters:Dictionary = new Dictionary();
        private static var _typeReaders:Dictionary = new Dictionary();

        public static function get version():int{
            return (_version);
        }
        public static function initialize(rpc:Object):void{
            _version = rpc.Digi;
            initMethodList(rpc.MethodList);
            initPropList(rpc.PropList);
            initEntityList(rpc.EntityList);
            initTypeList(rpc.TypeList);
        }
        private static function initMethodList(list:Array):void{
            var item:Object;
            var def:MethodDef;
            for each (item in list) {
                def = new MethodDef(item);
                _methodDefs[def.id] = def;
                _classMethods[def.className] = ((_classMethods[def.className]) || ({}));
                _classMethods[def.className][def.server] = ((_classMethods[def.className][def.server]) || ({}));
                _classMethods[def.className][def.server][def.name] = def;
            };
        }
        private static function initPropList(list:Array):void{
            var item:Object;
            var def:PropDef;
            for each (item in list) {
                def = new PropDef(item);
                _classProps[def.className] = ((_classProps[def.className]) || ({}));
                _classProps[def.className][def.name] = def;
            };
        }
        private static function initEntityList(list:Array):void{
            var item:Object;
            for each (item in list) {
                _entityClasses[item.id] = item.className;
                _entityClasses[item.className] = null;
            };
        }
        private static function initTypeList(list:Array):void{
            var item:Object;
            var def:TypeDef;
            var type:String;
            var writer:Function;
            var reader:Function;
            for each (item in list) {
                def = new TypeDef(item);
                _typeDefs[def.id] = (_typeDefs[def.name] = def);
                type = ((def.id < STRUCT_BASE_ID)) ? def.name : "struct";
                writer = RpcType[(type + "Writer")];
                reader = RpcType[(type + "Reader")];
                _typeWriters[def.id] = writer;
                _typeWriters[def.name] = writer;
                _typeReaders[def.id] = reader;
                _typeReaders[def.name] = reader;
            };
        }
        public static function getMethodDef(id:uint):MethodDef{
            return (_methodDefs[id]);
        }
        public static function getClassMethods(className:String, server:String):Object{
            return ((_classMethods[className]) ? ((_classMethods[className][server]) || ({})) : {});
        }
        public static function getClassProps(className:String):Object{
            return (((_classProps[className]) || ({})));
        }
        public static function registerEntityClass(className:String, entityClass:String):void{
            if (!((className in _entityClasses))){
                throw (new TypeError(("Entity class not defined: " + className)));
            };
            _entityClasses[className] = entityClass;
            _entityClasses[entityClass] = className;
        }
        public static function getEntityClass(type):Class{
            var class_name:String = ((type is int)) ? _entityClasses[type] : String(type);
            return (_entityClasses[class_name]);
        }
        public static function getEntityClassName(entity:Entity):String{
            return (_entityClasses[entity["constructor"]]);
        }
        public static function getTypeDef(type):TypeDef{
            return (_typeDefs[type]);
        }
        public static function getTypeWriter(type):Function{
            return (_typeWriters[((type is TypeDef)) ? type.id : type]);
        }
        public static function getTypeReader(type):Function{
            return (_typeReaders[((type is TypeDef)) ? type.id : type]);
        }
        public static function newStruct(type):Struct{
            var def:TypeDef = _typeDefs[((type is TypeDef)) ? type.id : type];
            if (((def) && ((def.id >= STRUCT_BASE_ID)))){
                return (new Struct(def));
            };
            return (null);
        }
        public static function newArray(type):TypeArray{
            var def:TypeDef = _typeDefs[((type is TypeDef)) ? type.id : type];
            if (def){
                return (new TypeArray(def));
            };
            return (null);
        }

    }
}//package LibCore.rpc 
