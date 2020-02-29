//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.utils {
    import flash.utils.*;
    import flash.globalization.*;

    public class DateTimeUtils {

        public static const WEEK_NAMES:Array = ["å‘¨æ—¥", "å‘¨ä¸€", "å‘¨äºŒ", "å‘¨ä¸‰", "å‘¨å››", "å‘¨äº”", "å‘¨å…­"];

        private static var _startServerTime:Number = 0;
        private static var _formatters:Dictionary = new Dictionary();

        public static function set serverNow(val:Number):void{
            _startServerTime = (val - getTimer());
        }
        public static function get serverNow():Number{
            return ((_startServerTime) ? (_startServerTime + getTimer()) : new Date().time);
        }
        public static function get serverDateTime():Date{
            return ((_startServerTime) ? new Date((_startServerTime + getTimer())) : new Date());
        }
        public static function format(dt:Date=null, pattern:String=""):String{
            dt = ((dt) || (serverDateTime));
            pattern = ((pattern) || (""));
            var formatter:DateTimeFormatter = _formatters[pattern];
            if (!(formatter)){
                formatter = new DateTimeFormatter(LocaleID.DEFAULT);
                _formatters[pattern] = formatter;
                if (pattern){
                    formatter.setDateTimePattern(pattern);
                };
            };
            return (formatter.format(dt));
        }
        public static function formatDigit(dt:Date=null):String{
            return (format(dt, "yyyy-MM-dd HH:mm:ss"));
        }
        public static function formatChinese(dt:Date=null):String{
            return (format(dt, "yyyy'å¹?MM'æœ?dd'æ—?HH'æ—?mm'åˆ?ss'ç§?"));
        }
        public static function formatDigitDate(dt:Date=null):String{
            return (format(dt, "yyyy-MM-dd"));
        }
        public static function formatChineseDate(dt:Date=null):String{
            return (format(dt, "yyyy'å¹?MM'æœ?dd'æ—?"));
        }
        public static function formatDigitTime(dt:Date=null):String{
            return (format(dt, "HH:mm:ss"));
        }
        public static function formatChineseTime(dt:Date=null):String{
            return (format(dt, "HH'æ—?mm'åˆ?ss'ç§?"));
        }
        public static function getWeekName(dt:Date=null):String{
            dt = ((dt) || (serverDateTime));
            return (WEEK_NAMES[dt.getDay()]);
        }

    }
}//package LibCore.utils 
