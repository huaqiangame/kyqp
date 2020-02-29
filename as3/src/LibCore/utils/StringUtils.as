//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;

    public class StringUtils {

        private static var _buffer:ByteArray = new ByteArray();
        public static var defaultWhitespaces:String = " 	
";

        public static function trim(s:String, whitespaces:String=null):String{
            return ((s) ? ltrim(rtrim(s, whitespaces), whitespaces) : "");
        }
        public static function ltrim(s:String, whitespaces:String=null):String{
            var len:int;
            var i:int;
            if (s){
                whitespaces = ((whitespaces) || (defaultWhitespaces));
                len = s.length;
                i = 0;
                while (i < len) {
                    if (whitespaces.indexOf(s.charAt(i)) >= 0){
                    } else {
                        return (s.slice(i));
                    };
                    i++;
                };
            };
            return ("");
        }
        public static function rtrim(s:String, whitespaces:String=null):String{
            var i:int;
            if (s){
                whitespaces = ((whitespaces) || (defaultWhitespaces));
                i = (s.length - 1);
                while (i >= 0) {
                    if (whitespaces.indexOf(s.charAt(i)) >= 0){
                    } else {
                        return (s.slice(0, i));
                    };
                    i--;
                };
            };
            return ("");
        }
        public static function fixNewlines(s:String):String{
            return ((s) ? s.replace(/(\r\n|\r)/g, "\n") : "");
        }
        public static function isEqual(s1:String, s2:String, ignoreCase:Boolean=false):Boolean{
            return ((ignoreCase) ? (s1.toLowerCase() == s2.toLowerCase()) : (s1 == s2));
        }
        public static function startsWith(s:String, head:String, ignoreCase:Boolean=false):Boolean{
            return (isEqual(head, s.slice(0, head.length), ignoreCase));
        }
        public static function endsWith(s:String, tail:String, ignoreCase:Boolean=false):Boolean{
            return (isEqual(tail, s.slice(-(tail.length)), ignoreCase));
        }
        public static function repeat(s:String, n:uint=2):String{
            if (((!(s)) || (!(n)))){
                return ("");
            };
            var i:int = 1;
            while (i < n) {
                s = (s + s);
                i++;
            };
            return (s);
        }
        public static function substitute(s:String, args:Object, index:int=0):String{
            var len:uint;
            var i:int;
            var n:String;
            if (((s) && (args))){
                if ((args is Array)){
                    len = args.length;
                    i = 0;
                    while (i < len) {
                        s = s.replace(new RegExp((("\\{" + (i + index)) + "\\}"), "g"), args[i]);
                        i++;
                    };
                } else {
                    for (n in args) {
                        s = s.replace(new RegExp((("\\{" + n) + "\\}"), "g"), args[n]);
                    };
                };
            };
            return (s);
        }
        public static function splitIntegers(s:String):Array{
            var i:Number;
            var arr:Array = [];
            for each (i in s.split(",")) {
                if (isNaN(i)){
                } else {
                    arr.push(int(i));
                };
            };
            return (arr);
        }
        public static function byteLen(s:String, charset:String="gbk"):uint{
            if (!(s)){
                return (0);
            };
            _buffer.length = 0;
            _buffer.position = 0;
            _buffer.writeMultiByte(s, charset);
            return (_buffer.length);
        }
        public static function byteLimit(s:String, maxLen:uint, ellipsis:String="..", ellipsisLen:uint=2, charset:String="gbk"):String{
            var part:String;
            if (!(s)){
                return ("");
            };
            _buffer.length = 0;
            _buffer.position = 0;
            _buffer.writeMultiByte(s, charset);
            if (_buffer.length > maxLen){
                _buffer.position = 0;
                part = ((maxLen > ellipsisLen)) ? _buffer.readMultiByte((maxLen - ellipsisLen), charset) : "";
                if (part.charCodeAt((part.length - 1)) != s.charCodeAt((part.length - 1))){
                    part = part.slice(0, -1);
                };
                return ((part + ((ellipsis) || (""))));
            };
            return (s);
        }
        public static function byteSlice(s:String, start:int=0, end:int=2147483647, charset:String="gbk"):String{
            if (!(s)){
                return ("");
            };
            _buffer.length = 0;
            _buffer.position = 0;
            _buffer.writeMultiByte(s, charset);
            if (start < 0){
                start = Math.max(0, (_buffer.length + start));
            } else {
                if (start >= _buffer.length){
                    return ("");
                };
            };
            if (end < 0){
                end = (_buffer.length + end);
            } else {
                if (end > _buffer.length){
                    end = _buffer.length;
                };
            };
            if (end <= start){
                return ("");
            };
            _buffer.position = start;
            return (_buffer.readMultiByte((end - start), charset));
        }
        public static function getPath(s:String, adjustSlash:Boolean=false):String{
            var pos:int = s.lastIndexOf("/");
            if (pos < 0){
                pos = s.lastIndexOf("\\");
            };
            var path:String = ((pos < 0)) ? "" : s.slice((pos + 1));
            if (((path) && (adjustSlash))){
                return (path.replace(/\\/g, "/"));
            };
            return (path);
        }
        public static function getFilename(s:String, noExt:Boolean=false):String{
            var pos:int = s.lastIndexOf("/");
            if (pos < 0){
                pos = s.lastIndexOf("\\");
            };
            var filename:String = ((pos < 0)) ? s : s.slice((pos + 1));
            if (noExt){
                pos = filename.lastIndexOf(".");
                if (pos >= 0){
                    return (filename.slice(0, pos));
                };
            };
            return (filename);
        }
        public static function getExt(s:String, checkPath:Boolean=false):String{
            var pos:int = s.lastIndexOf(".");
            var ext:String = ((pos < 0)) ? "" : s.slice((pos + 1));
            if (((ext) && (checkPath))){
                if ((((s.indexOf("/") >= 0)) || ((s.indexOf("\\") >= 0)))){
                    return ("");
                };
            };
            return (ext);
        }
        public static function clearBuffer():void{
            _buffer.clear();
        }

    }
}//package LibCore.utils 
