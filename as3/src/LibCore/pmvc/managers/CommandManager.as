//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.managers {
    import flash.utils.*;
    import LibCore.pmvc.core.*;
    import LibCore.pmvc.interfaces.*;

    public class CommandManager {

        protected var commandClasses:Dictionary;
        protected var commandPool:Dictionary;
        protected var commandHandlers:Dictionary;

        public function CommandManager(){
            super();
            this.commandClasses = new Dictionary();
            this.commandPool = new Dictionary();
            this.commandHandlers = new Dictionary();
        }
        public function registerCommand(type, cmdClass:Class=null):void{
            cmdClass = ((cmdClass) || (Command));
            if ((type in this.commandClasses)){
                throw (new Error(((("Command class is already registered: " + type) + " ") + cmdClass)));
            };
            var cmd:ICommand = (new cmdClass(type) as ICommand);
            if (!(cmd)){
                throw (new Error(((("Command class is invalid: " + type) + " ") + cmdClass)));
            };
            this.commandClasses[type] = cmdClass;
            this.commandPool[type] = [cmd];
            this.commandHandlers[type] = [];
        }
        public function registerCommandHandler(type, handler:ICommandHandler):void{
            if (!(handler)){
                return;
            };
            var handlers:Array = this.commandHandlers[type];
            if (!(handlers)){
                throw (new Error(("Handler command type is not registered: " + type)));
            };
            if (handlers.indexOf(handler) < 0){
                handlers.push(handler);
            };
        }
        public function createCommand(type, recycle:Boolean=false):ICommand{
            var cmd_cls:Class = this.commandClasses[type];
            return ((cmd_cls) ? (new cmd_cls(type, recycle) as ICommand) : null);
        }
        public function popCommand(type):ICommand{
            var pool:Array = this.commandPool[type];
            if (pool){
                if (pool.length > 0){
                    return ((pool.pop() as ICommand));
                };
                return (this.createCommand(type, true));
            };
            return (null);
        }
        public function pushCommand(cmd:ICommand):void{
            var type:* = cmd.type;
            var pool:Array = this.commandPool[type];
            if (!(pool)){
                throw (new Error(("Pushing command type is not registered: " + type)));
            };
            pool.push(cmd);
        }
        public function dispatchCommand(cmd:ICommand):void{
            var handler:ICommandHandler;
            var type:* = cmd.type;
            var handlers:Array = this.commandHandlers[type];
            if (!(handlers)){
                throw (new Error(("Dispatching command type is not registered: " + type)));
            };
            for each (handler in handlers) {
                handler.handleCommand(cmd);
            };
            if (cmd.recycle){
                this.pushCommand(cmd);
            };
        }

    }
}//package LibCore.pmvc.managers 
