//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.net {

    public class ConnectInfo {

        public var host:String;// = "127.0.0.1"
        public var ports:Array;// = null
        public var policyPort:int;// = 0
        private var _port:int;// = 0

        public function ConnectInfo(host:String=null, port=0, policyPort:int=0){
            super();
            if (host){
                this.host = host;
            };
            if ((port is Array)){
                this.ports = port;
            } else {
                if (port){
                    this.port = port;
                };
            };
            if (policyPort){
                this.policyPort = policyPort;
            };
        }
        public function get port():int{
            if (((((!(this._port)) && (this.ports))) && ((this.ports.length > 0)))){
                this._port = this.ports[int((Math.random() * this.ports.length))];
            };
            return (this._port);
        }
        public function set port(val:int):void{
            this._port = val;
        }
        public function get policyURL():String{
            return (((("xmlsocket://" + this.host) + ":") + this.policyPort));
        }
        public function toString():String{
            return (((((("host=" + this.host) + ",port=") + this.port) + ",policyPort=") + this.policyPort));
        }

    }
}//package LibCore.net 
