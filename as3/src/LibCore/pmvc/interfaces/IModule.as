//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.interfaces {

    public interface IModule extends ICommandSender, ICommandHandler {

        function get facade():IFacade;
        function set facade(val:IFacade):void;
        function get handleableCommandTypes():Array;
        function sendSimpleCommand(type, params:Object=null):void;
        function postSimpleCommand(type, params:Object=null):void;

    }
}//package LibCore.pmvc.interfaces 
