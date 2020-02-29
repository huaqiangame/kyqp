//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;
    import flash.external.*;

    public class JSExternal {

        private static var _functions:Dictionary = new Dictionary();

        public static function get available():Boolean{
            return (ExternalInterface.available);
        }
        public static function define(name:String, args:String, code:String):Boolean{
            if (!(ExternalInterface.available)){
                return (false);
            };
            _functions[name] = (((("function(" + args) + "){") + code) + "}");
            return (true);
        }
        public static function exists(name:String):Boolean{
            return ((name in _functions));
        }
        public static function call(name:String, ... _args){
            if (!(ExternalInterface.available)){
                return (null);
            };
            _args.unshift(((name in _functions)) ? _functions[name] : name);
            return (ExternalInterface.call.apply(null, _args));
        }
        public static function addCallback(name:String, callback:Function):Boolean{
            if (!(ExternalInterface.available)){
                return (false);
            };
            ExternalInterface.addCallback(name, callback);
            return (true);
        }
        public static function alert(msg:String):void{
            if (!(ExternalInterface.available)){
                return;
            };
            ExternalInterface.call("alert", msg);
        }
        public static function eval(code:String):void{
            if (!(ExternalInterface.available)){
                return;
            };
            ExternalInterface.call("eval", (code + ";void(0);"));
        }

    }
}//package LibCore.utils 
