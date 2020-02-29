//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {

    public class Functor {

        public var method:Function;
        public var args:Array;

        public function Functor(method:Function, args:Array){
            super();
            this.method = method;
            this.args = args;
        }
        public function call(... _args){
            return (this.method.apply(null, this.args));
        }
        public function callLeft(... _args){
            return (this.method.apply(null, _args.concat(this.args)));
        }
        public function callRight(... _args){
            return (this.method.apply(null, this.args.concat(_args)));
        }

        public static function create(method:Function, ... _args):Function{
            return (new Functor(method, _args).call);
        }
        public static function createLeft(method:Function, ... _args):Function{
            return (new Functor(method, _args).callLeft);
        }
        public static function createRight(method:Function, ... _args):Function{
            return (new Functor(method, _args).callRight);
        }

    }
}//package LibCore.utils 
