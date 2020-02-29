//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.core {
    import LibCore.pmvc.interfaces.*;

    public class Module implements IModule {

        private var _facade:IFacade;

        public function Module(){
            super();
        }
        public function get facade():IFacade{
            return (this._facade);
        }
        public function set facade(val:IFacade):void{
            this._facade = val;
        }
        public function get handleableCommandTypes():Array{
            return ([]);
        }
        public function createCommand(type):ICommand{
            if (!(this.facade)){
                return (null);
            };
            return (this.facade.createCommand(type));
        }
        public function popCommand(type):ICommand{
            if (!(this.facade)){
                return (null);
            };
            return (this.facade.popCommand(type));
        }
        public function sendCommand(cmd:ICommand):Boolean{
            if (!(this.facade)){
                return (false);
            };
            cmd.from = this;
            return (this.facade.sendCommand(cmd));
        }
        public function postCommand(cmd:ICommand):Boolean{
            if (!(this.facade)){
                return (false);
            };
            cmd.from = this;
            return (this.facade.postCommand(cmd));
        }
        public function handleCommand(cmd:ICommand):void{
        }
        protected function makeCommand(type, params:Object=null):ICommand{
            var i:*;
            var cmd:ICommand = this.popCommand(type);
            if (((cmd) && (params))){
                for (i in params) {
                    cmd.setParam(i, params[i]);
                };
            };
            return (cmd);
        }
        public function sendSimpleCommand(type, params:Object=null):void{
            var cmd:ICommand = this.makeCommand(type, params);
            if (cmd){
                this.sendCommand(cmd);
            };
        }
        public function postSimpleCommand(type, params:Object=null):void{
            var cmd:ICommand = this.makeCommand(type, params);
            if (cmd){
                this.postCommand(cmd);
            };
        }

    }
}//package LibCore.pmvc.core 
