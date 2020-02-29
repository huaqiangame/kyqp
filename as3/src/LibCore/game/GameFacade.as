//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.game {
    import LibCore.pmvc.core.*;

    public class GameFacade extends Facade {

        public function GameFacade(){
            super();
        }
        override protected function initializeCommand():void{
            registerCommand(GameCmd.GAME_STARTED);
            registerCommand(GameCmd.STAGE_RESIZE);
            registerCommand(GameCmd.SERVER_CONNECTED);
            registerCommand(GameCmd.SERVER_CONNECT_FAIL);
            registerCommand(GameCmd.SERVER_DISCONNECTED);
        }
        override protected function initializeModule():void{
            registerModel(GameLog.instance);
            registerModel(GameService.instance);
        }

    }
}//package LibCore.game 
