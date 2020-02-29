//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.managers {
    import flash.utils.*;
    import LibCore.pmvc.interfaces.*;
    import avmplus.*;

    public class ModuleManager {

        protected var facade:IFacade;
        protected var assort:String;
        protected var modules:Dictionary;
        protected var moduleAliases:Dictionary;

        public function ModuleManager(facade:IFacade, assort:String="Module"){
            super();
            this.facade = facade;
            this.assort = assort;
            this.modules = new Dictionary();
            this.moduleAliases = new Dictionary();
        }
        public function registerModule(module:IModule, aliases:Array=null):void{
            var type:*;
            var full_name:String;
            var pos:int;
            var short_name:String;
            var alias:*;
            var mdl_alias:Dictionary;
            var mdl_cls:Class = (module["constructor"] as Class);
            if ((mdl_cls in this.modules)){
                throw (new Error(((this.assort + " is already registered: ") + module)));
            };
            this.modules[mdl_cls] = module;
            if (((aliases) && ((aliases.length > 0)))){
                full_name = getQualifiedClassName(mdl_cls);
                pos = full_name.indexOf("::");
                short_name = ((pos < 0)) ? full_name : full_name.slice((pos + 2));
                for each (alias in aliases) {
                    mdl_alias = this.moduleAliases[alias];
                    if (!(mdl_alias)){
                        mdl_alias = new Dictionary();
                        this.moduleAliases[alias] = mdl_alias;
                    };
                    mdl_alias[full_name] = module;
                    mdl_alias[short_name] = module;
                };
            };
            module.facade = this.facade;
            var cmd_types:Array = module.handleableCommandTypes;
            for each (type in cmd_types) {
                this.facade.registerCommandHandler(type, module);
            };
        }
        public function getModule(alias, clsName:String=null):IModule{
            var module:IModule;
            var mdl_alias:Dictionary = this.moduleAliases[alias];
            if (mdl_alias){
                if (clsName != null){
                    return (mdl_alias[clsName]);
                };
                for each (module in mdl_alias) {
                    return (module);
                };
            };
            return (null);
        }

    }
}//package LibCore.pmvc.managers 
