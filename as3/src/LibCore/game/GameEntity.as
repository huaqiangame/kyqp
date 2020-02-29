//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.game {
    import LibCore.rpc.*;

    public class GameEntity extends Entity {

        private var _gateway:Mailbox;
        private var _hall:Mailbox;

        public function GameEntity(eid:int=0){
            super(eid);
        }
        public function get gateway():Mailbox{
            this._gateway = ((this._gateway) || (new Mailbox(this.className, ServerType.GATEWAY, eid)));
            return (this._gateway);
        }
        public function get hall():Mailbox{
            this._hall = ((this._hall) || (new Mailbox(this.className, ServerType.HALL, eid)));
            return (this._hall);
        }

    }
}//package LibCore.game 
