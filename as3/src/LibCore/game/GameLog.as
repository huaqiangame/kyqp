//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.game {
    import LibCore.utils.*;
    import LibCore.pmvc.core.*;

    public class GameLog extends Model {

        public static var instance:GameLog = new (GameLog);
;
        public static var enabled:Boolean = true;
        public static var outputTrace:Function = trace;
        public static var outputTime:String = "HH:mm:ss ";

        public function GameLog(){
            super();
            Singleton.set(this);
        }
        protected function log(cmdType:int, fields:Array):void{
            if (!(enabled)){
                return;
            };
            if (outputTrace != null){
                this.output(cmdType, fields.join(" "));
            };
            sendSimpleCommand(cmdType, {fields:fields});
        }
        protected function output(cmdType:int, msg:String):void{
            var time:String = "";
            if (outputTime){
                time = DateTimeUtils.format(null, outputTime);
            };
            switch (cmdType){
                case GameCmd.ERROR_LOG:
                    outputTrace(((time + "[**ERROR**] ") + msg));
                    break;
                case GameCmd.WARNING_LOG:
                    outputTrace(((time + "[!WARNING!] ") + msg));
                    break;
                case GameCmd.INFO_LOG:
                    outputTrace(((time + "[INFO] ") + msg));
                    break;
                case GameCmd.DEBUG_LOG:
                    outputTrace(((time + "[DEBUG] ") + msg));
                    break;
                default:
                    outputTrace((time + msg));
                    break;
            };
        }

        public static function error(... _args):void{
            instance.log(GameCmd.ERROR_LOG, _args);
        }
        public static function warning(... _args):void{
            instance.log(GameCmd.WARNING_LOG, _args);
        }
        public static function info(... _args):void{
            instance.log(GameCmd.INFO_LOG, _args);
        }
        public static function debug(... _args):void{
            instance.log(GameCmd.DEBUG_LOG, _args);
        }

    }
}//package LibCore.game 
