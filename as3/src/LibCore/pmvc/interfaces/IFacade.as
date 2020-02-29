//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.interfaces {

    public interface IFacade extends ICommandSender {

        function initialize():void;
        function declarePlugin(name:String, cmdTypes:Array=null):void;
        function registerPlugin(plugin:IPlugin):void;
        function hasPlugin(name:String):Boolean;
        function getPlugin(name:String):IPlugin;
        function setPluginLoader(loader:IPluginLoader):void;
        function registerModel(model:IModel):void;
        function registerView(view:IView):void;
        function registerController(controller:IController):void;
        function getModel(alias, clsName:String=null):IModel;
        function registerCommand(type, cmdClass:Class=null):void;
        function registerCommandHandler(type, handler:ICommandHandler):void;

    }
}//package LibCore.pmvc.interfaces 
