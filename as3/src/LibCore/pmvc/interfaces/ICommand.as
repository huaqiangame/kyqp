//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.interfaces {

    public interface ICommand {

        function get type();
        function get recycle():Boolean;
        function get from():IModule;
        function set from(val:IModule):void;
        function get params():Object;
        function setParam(param:String, value):void;
        function getParam(param:String);

    }
}//package LibCore.pmvc.interfaces 
