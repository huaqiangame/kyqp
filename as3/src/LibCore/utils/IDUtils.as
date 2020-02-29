//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;

    public class IDUtils {

        private static var _idMap:Dictionary = new Dictionary();

        public static function genID(assort=""):int{
            var id:int = _idMap[assort];
            ++id;
            _idMap[assort] = id;
            return (id);
        }
        public static function genTag(assort="", prefix:String=""):String{
            var id:int = _idMap[assort];
            ++id;
            _idMap[assort] = id;
            return ((prefix + id));
        }

    }
}//package LibCore.utils 
