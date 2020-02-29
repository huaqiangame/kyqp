//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.core {
    import LibCore.pmvc.managers.*;
    import LibCore.pmvc.interfaces.*;

    public class Facade implements IFacade {

        protected var commandManager:CommandManager;
        protected var pluginManager:PluginManager;
        protected var modelManager:ModuleManager;
        protected var viewManager:ModuleManager;
        protected var controllerManager:ModuleManager;

        public function Facade(){
            super();
        }
        public function initialize():void{
            this.initializeManager();
            this.initializeCommand();
            this.initializePlugin();
            this.initializeModule();
        }
        protected function initializeManager():void{
            this.commandManager = new CommandManager();
            this.pluginManager = new PluginManager(this);
            this.modelManager = new ModuleManager(this, "Model");
            this.viewManager = new ModuleManager(this, "View");
            this.controllerManager = new ModuleManager(this, "Controller");
        }
        protected function initializeCommand():void{
        }
        protected function initializePlugin():void{
        }
        protected function initializeModule():void{
        }
        public function declarePlugin(name:String, cmdTypes:Array=null):void{
            this.pluginManager.declarePlugin(name, cmdTypes);
        }
        public function registerPlugin(plugin:IPlugin):void{
            this.pluginManager.registerPlugin(plugin);
        }
        public function hasPlugin(name:String):Boolean{
            return (this.pluginManager.hasPlugin(name));
        }
        public function getPlugin(name:String):IPlugin{
            return (this.pluginManager.getPlugin(name));
        }
        public function setPluginLoader(loader:IPluginLoader):void{
            this.pluginManager.pluginLoader = loader;
        }
        public function registerModel(model:IModel):void{
            this.modelManager.registerModule(model, model.availableAliases);
        }
        public function registerView(view:IView):void{
            this.viewManager.registerModule(view);
        }
        public function registerController(controller:IController):void{
            this.controllerManager.registerModule(controller);
        }
        public function getModel(alias, clsName:String=null):IModel{
            return ((this.modelManager.getModule(alias, clsName) as IModel));
        }
        public function registerCommand(type, cmdClass:Class=null):void{
            this.commandManager.registerCommand(type, cmdClass);
        }
        public function registerCommandHandler(type, handler:ICommandHandler):void{
            this.commandManager.registerCommandHandler(type, handler);
        }
        public function createCommand(type):ICommand{
            return (this.commandManager.createCommand(type));
        }
        public function popCommand(type):ICommand{
            return (this.commandManager.popCommand(type));
        }
        public function sendCommand(cmd:ICommand):Boolean{
            var all:Boolean = this.pluginManager.checkRequirements(cmd);
            if (all){
                this.commandManager.dispatchCommand(cmd);
            };
            return (all);
        }
        public function postCommand(cmd:ICommand):Boolean{
            return (this.pluginManager.checkRequirements(cmd, true));
        }

    }
}//package LibCore.pmvc.core 
