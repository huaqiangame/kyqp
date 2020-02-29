//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.interfaces {

    public interface IPlugin {

        function get pluginName():String;
        function get facade():IFacade;
        function set facade(val:IFacade):void;
        function initialize():void;
        function registerModel(model:IModel):void;
        function registerView(view:IView):void;
        function registerController(controller:IController):void;

    }
}//package LibCore.pmvc.interfaces 
