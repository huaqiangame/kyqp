//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.core {
    import LibCore.pmvc.interfaces.*;
    import flash.display.*;

    public class Plugin extends Sprite implements IPlugin {

        private var _facade:IFacade;

        public function Plugin(){
            super();
        }
        public function get pluginName():String{
            return ("");
        }
        public function get facade():IFacade{
            return (this._facade);
        }
        public function set facade(val:IFacade):void{
            this._facade = val;
        }
        public function initialize():void{
        }
        public function registerModel(model:IModel):void{
            this.facade.registerModel(model);
        }
        public function registerView(view:IView):void{
            this.facade.registerView(view);
        }
        public function registerController(controller:IController):void{
            this.facade.registerController(controller);
        }

    }
}//package LibCore.pmvc.core 
