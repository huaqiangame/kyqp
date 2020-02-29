//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {

    public class SoundPlayer {

        public function SoundPlayer(){
            super();
            Singleton.set(this);
        }
        public static function get instance():SoundPlayer{
            return ((Singleton.get(_slot1) as _slot1));
        }

    }
}//package LibCore.utils 
