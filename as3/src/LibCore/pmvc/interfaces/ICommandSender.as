//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.interfaces {

    public interface ICommandSender {

        function createCommand(type):ICommand;
        function popCommand(type):ICommand;
        function sendCommand(cmd:ICommand):Boolean;
        function postCommand(cmd:ICommand):Boolean;

    }
}//package LibCore.pmvc.interfaces 
