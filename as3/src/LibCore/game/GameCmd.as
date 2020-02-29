//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.game {
    import LibCore.utils.*;

    public class GameCmd {

        public static const GAME_STARTED:int = NEW_CMD;
        public static const STAGE_RESIZE:int = NEW_CMD;
        public static const SERVER_CONNECTED:uint = NEW_CMD;
        public static const SERVER_CONNECT_FAIL:uint = NEW_CMD;
        public static const SERVER_DISCONNECTED:uint = NEW_CMD;
        public static const CONNECTION_ERROR:uint = NEW_CMD;
        public static const SEND_DATA_ERROR:uint = NEW_CMD;
        public static const RECV_DATA_ERROR:uint = NEW_CMD;
        public static const ERROR_LOG:int = NEW_CMD;
        public static const WARNING_LOG:int = NEW_CMD;
        public static const INFO_LOG:int = NEW_CMD;
        public static const DEBUG_LOG:int = NEW_CMD;

        public static function get NEW_CMD():int{
            return (IDUtils.genID("GameCmd"));
        }

    }
}//package LibCore.game 
