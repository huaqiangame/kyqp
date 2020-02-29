//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.net.*;
    import flash.display.*;
    import flash.events.*;
    import flash.errors.*;

    public class WebUtils {

        public static function gotoURL(url:String, blank:Boolean=false):void{
            navigateToURL(new URLRequest(url), (blank) ? "_blank" : "_self");
        }
        public static function getParam(target:DisplayObject, name:String):String{
            return (target.loaderInfo.parameters[name]);
            //unresolved jump
            var _slot1 = e;
            return ("");
        }
        public static function getPortParam(target:DisplayObject, name:String){
            var ports:Array;
            var port:String = getParam(target, name);
            if (port){
                ports = StringUtils.splitIntegers(port);
                if (ports.length > 0){
                    return (((ports.length > 1)) ? ports : ports[0]);
                };
            };
            return (0);
        }
        public static function request(url:String, callback:Function):void{
            var loader:URLLoader;
            var listener:Function;
            var url = url;
            var callback = callback;
            listener = function (e):void{
                if ((e is IOErrorEvent)){
                    e = new IOError(("Request IO error: " + url), (e as IOErrorEvent).errorID);
                } else {
                    if ((e is SecurityErrorEvent)){
                        e = new SecurityError(("Request security error: " + url), (e as SecurityErrorEvent).errorID);
                    } else {
                        if ((e is Event)){
                            e = loader.data;
                        };
                    };
                };
                callback(e);
            };
            loader = new URLLoader();
            if (callback != null){
                loader.addEventListener(Event.COMPLETE, listener);
                loader.addEventListener(IOErrorEvent.IO_ERROR, listener);
                loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, listener);
            };
            loader.load(new URLRequest(url));
            //unresolved jump
            var _slot1 = e;
            ((callback) && (listener(_slot1)));
        }

    }
}//package LibCore.utils 
