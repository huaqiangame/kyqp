//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;

    public class Singleton {

        private static var _instances:Dictionary = new Dictionary();

        public static function set(instance:Object):void{
            var cls:Class = instance.constructor;
            if ((cls in _instances)){
                throw (Error(("Singleton instance already exists: " + cls)));
            };
            _add(cls, instance);
        }
        private static function _add(cls:Class, instance:Object):void{
            var name:String = getQualifiedClassName(cls);
            _instances[cls] = instance;
            _instances[name] = instance;
            var pos:int = name.indexOf("::");
            if (pos >= 0){
                _instances[name.slice((pos + 2))] = instance;
            };
        }
        public static function get(cls:Class):Object{
            var instance:Object = _instances[cls];
            if (!(instance)){
                instance = new (cls);
                if (!((cls in _instances))){
                    _add(cls, instance);
                };
            };
            return (instance);
        }
        public static function getByName(clsName:String):Object{
            return (_instances[clsName]);
        }

    }
}//package LibCore.utils 
