//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;

    public class Multiton {

        private static var _instances:Dictionary = new Dictionary();

        public static function set(instance:Object, id):void{
            var instance_map:Dictionary;
            var cls:Class = instance.constructor;
            if ((cls in _instances)){
                instance_map = _instances[cls];
                if ((id in instance_map)){
                    throw (Error(((("Multiton instance already exists: " + cls) + ".") + id)));
                };
                instance_map[id] = instance;
                return;
            };
            _add(cls, instance, id);
        }
        private static function _add(cls:Class, instance:Object, id):void{
            var instance_map:Dictionary = new Dictionary();
            instance_map[id] = instance;
            var name:String = getQualifiedClassName(cls);
            _instances[cls] = instance_map;
            _instances[name] = instance_map;
            var pos:int = name.indexOf("::");
            if (pos >= 0){
                _instances[name.slice((pos + 2))] = instance_map;
            };
        }
        public static function get(cls:Class, id):Object{
            var instance:Object;
            var instance_map:Dictionary = _instances[cls];
            if (instance_map){
                instance = instance_map[id];
                if (!(instance)){
                    instance = new cls(id);
                    instance_map[id] = instance;
                };
            } else {
                instance = new cls(id);
                if ((cls in _instances)){
                    _instances[cls][id] = instance;
                } else {
                    _add(cls, instance, id);
                };
            };
            return (instance);
        }
        public static function getByName(clsName:String, id):Object{
            return (((clsName in _instances)) ? _instances[clsName][id] : null);
        }

    }
}//package LibCore.utils 
