//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.managers {
    import flash.utils.*;
    import LibCore.pmvc.interfaces.*;

    public class PluginManager {

        protected var facade:IFacade;
        protected var plugins:Dictionary;
        protected var commandRequirements:Dictionary;
        protected var loadingPlugins:Dictionary;
        public var pluginLoader:IPluginLoader;

        public function PluginManager(facade:IFacade){
            super();
            this.facade = facade;
            this.plugins = new Dictionary();
            this.commandRequirements = new Dictionary();
            this.loadingPlugins = new Dictionary();
        }
        public function declarePlugin(name:String, cmdTypes:Array=null):void{
            var type:*;
            if (this.hasPlugin(name)){
                throw (new Error(("Plugin is already declared: " + name)));
            };
            this.plugins[name] = null;
            if (cmdTypes){
                for each (type in cmdTypes) {
                    if ((type in this.commandRequirements)){
                        this.commandRequirements[type].push(name);
                    } else {
                        this.commandRequirements[type] = [name];
                    };
                };
            };
        }
        public function registerPlugin(plugin:IPlugin):void{
            var name:String = plugin.pluginName;
            if (this.getPlugin(name)){
                throw (new Error(((("Plugin is already registered: " + name) + " ") + plugin)));
            };
            this.plugins[name] = plugin;
            plugin.facade = this.facade;
            plugin.initialize();
        }
        public function hasPlugin(name:String):Boolean{
            return ((name in this.plugins));
        }
        public function getPlugin(name:String):IPlugin{
            return (this.plugins[name]);
        }
        public function checkRequirements(cmd:ICommand, autoLoad:Boolean=false):Boolean{
            var all_reg:Boolean;
            var name:String;
            var type:* = cmd.type;
            var requirements:Array = this.commandRequirements[type];
            if (requirements){
                all_reg = true;
                for each (name in requirements) {
                    if (this.getPlugin(name)){
                    } else {
                        if (!(autoLoad)){
                            return (false);
                        };
                        all_reg = false;
                        if ((name in this.loadingPlugins)){
                            this.loadingPlugins[name].push(cmd);
                        } else {
                            if (!(this.pluginLoader)){
                                throw (new Error("Plugin loader is not provided"));
                            };
                            this.loadingPlugins[name] = [cmd];
                            setTimeout(this.pluginLoader.loadPlugin, 0, name, this.onLoadPlugin);
                        };
                    };
                };
                if (!(all_reg)){
                    return (false);
                };
                delete this.commandRequirements[type];
            };
            if (autoLoad){
                setTimeout(this.facade.sendCommand, 0, cmd);
            };
            return (true);
        }
        protected function onLoadPlugin(plugin:IPlugin):void{
            var cmd:ICommand;
            var name:String = plugin.pluginName;
            var cmd_queue:Array = this.loadingPlugins[name];
            if (cmd_queue){
                delete this.loadingPlugins[name];
                this.registerPlugin(plugin);
                for each (cmd in cmd_queue) {
                    this.facade.sendCommand(cmd);
                };
            };
        }

    }
}//package LibCore.pmvc.managers 
