//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.core {
    import LibCore.pmvc.interfaces.*;

    public class Controller extends Module implements IController {

        public function Controller(){
            super();
        }
        public function getModel(alias, clsName:String=null):IModel{
            if (!(this.facade)){
                return (null);
            };
            return (this.facade.getModel(alias, clsName));
        }

    }
}//package LibCore.pmvc.core 
