//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.pmvc.core {
    import LibCore.pmvc.interfaces.*;

    public class Command implements ICommand {

        private var _type;
        private var _recycle:Boolean;
        private var _from:IModule;
        private var _params:Object;

        public function Command(type, recycle:Boolean=false){
            super();
            this._type = type;
            this._recycle = recycle;
        }
        public function get type(){
            return (this._type);
        }
        public function get recycle():Boolean{
            return (this._recycle);
        }
        public function get from():IModule{
            return (this._from);
        }
        public function set from(val:IModule):void{
            this._from = val;
        }
        public function get params():Object{
            return (this._params);
        }
        public function setParam(param:String, value):void{
            this._params = ((this._params) || ({}));
            this._params[param] = value;
        }
        public function getParam(param:String){
            return ((this._params) ? this._params[param] : null);
        }
        public function toString():String{
            return ((((("<Command " + this.type) + " from ") + this.from) + ">"));
        }

    }
}//package LibCore.pmvc.core 
