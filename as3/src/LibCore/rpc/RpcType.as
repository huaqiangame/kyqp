//Created by Action Script Viewer - http://www.buraks.com/asv
package LibCore.rpc {
    import flash.utils.*;
    import LibCore.net.*;
    import LibCore.rpc.type.*;
    import flash.geom.*;

    public class RpcType {

        private static var _buffer:ByteArray = new ByteArray();

        public static function intWriter(data:ByteArrayLittle, val:int):void{
            data.writeInt(val);
        }
        public static function intReader(data:ByteArrayLittle):int{
            return (data.readInt());
        }
        public static function int8Writer(data:ByteArrayLittle, val:int):void{
            data.writeByte(val);
        }
        public static function int8Reader(data:ByteArrayLittle):int{
            return (data.readByte());
        }
        public static function int16Writer(data:ByteArrayLittle, val:int):void{
            data.writeShort(val);
        }
        public static function int16Reader(data:ByteArrayLittle):int{
            return (data.readShort());
        }
        public static function int48Writer(data:ByteArrayLittle, val):void{
            var v:Int64 = Int64.from(val);
            data.writeUnsignedInt(v.low);
            data.writeShort(v.high);
        }
        public static function int48Reader(data:ByteArrayLittle):Int64{
            return (new Int64(data.readUnsignedInt(), data.readUnsignedShort()));
        }
        public static function uintReader(data:ByteArrayLittle):uint{
            return (data.readUnsignedInt());
        }
        public static function uintWriter(data:ByteArrayLittle, val:uint):void{
            data.writeUnsignedInt(val);
        }
        public static function uint8Writer(data:ByteArrayLittle, val:uint):void{
            data.writeByte(val);
        }
        public static function uint8Reader(data:ByteArrayLittle):uint{
            return (data.readUnsignedByte());
        }
        public static function uint16Writer(data:ByteArrayLittle, val:uint):void{
            data.writeShort(val);
        }
        public static function uint16Reader(data:ByteArrayLittle):uint{
            return (data.readUnsignedShort());
        }
        public static function doubleWriter(data:ByteArrayLittle, val:Number):void{
            data.writeDouble(val);
        }
        public static function doubleReader(data:ByteArrayLittle):Number{
            return (data.readDouble());
        }
        public static function floatWriter(data:ByteArrayLittle, val:Number):void{
            data.writeFloat(val);
        }
        public static function floatReader(data:ByteArrayLittle):Number{
            return (data.readFloat());
        }
        public static function boolWriter(data:ByteArrayLittle, val:Boolean):void{
            data.writeBoolean(val);
        }
        public static function boolReader(data:ByteArrayLittle):Boolean{
            return (data.readBoolean());
        }
        public static function stringWriter(data:ByteArrayLittle, val:String):void{
            _buffer.length = 0;
            _buffer.position = 0;
            _buffer.writeUTFBytes(val);
            if (_buffer.length > 0xFFFF){
                _buffer.length = 0xFFFF;
            };
            data.writeShort(_buffer.length);
            data.writeBytes(_buffer);
        }
        public static function stringReader(data:ByteArrayLittle):String{
            var len:uint = data.readUnsignedShort();
            return (data.readUTFBytes(len));
        }
        public static function lstringWriter(data:ByteArrayLittle, val:String):void{
            _buffer.length = 0;
            _buffer.position = 0;
            _buffer.writeUTFBytes(val);
            data.writeUnsignedInt(_buffer.length);
            data.writeBytes(_buffer);
        }
        public static function lstringReader(data:ByteArrayLittle):String{
            var len:uint = data.readUnsignedInt();
            return (data.readUTFBytes(len));
        }
        public static function arWriter(data:ByteArrayLittle, val:ByteArrayLittle):void{
            data.writeBytes(val);
        }
        public static function arReader(data:ByteArrayLittle):ByteArrayLittle{
            return (data);
        }
        public static function vintWriter(data:ByteArrayLittle, val):void{
            var v:Int64 = Int64.from(val);
            while (((v.high) || ((v.low >= 128)))) {
                data.writeByte((v.low | 128));
                v.ushr(7);
            };
            data.writeByte(v.low);
        }
        public static function vintReader(data:ByteArrayLittle):Int64{
            var ch:int = data.readByte();
            var v:Int64 = new Int64((ch & 127));
            var i:uint = 7;
            while ((((ch & 128)) && (data.bytesAvailable))) {
                ch = data.readByte();
                v.or(new Int64((ch & 127)).shl(i));
                i = (i + 7);
            };
            return (v);
        }
        public static function float2Writer(data:ByteArrayLittle, val:Point):void{
            data.writeFloat(val.x);
            data.writeFloat(val.y);
        }
        public static function float2Reader(data:ByteArrayLittle):Point{
            return (new Point(data.readFloat(), data.readFloat()));
        }
        public static function arrayWriter(data:ByteArrayLittle, val:TypeArray):void{
            var i:*;
            data.writeShort(val.type.id);
            data.writeShort(val.length);
            var writer:Function = RpcDef.getTypeWriter(val.type);
            if (writer == null){
                throw (new TypeError(("Type writer not found: " + val.type.name)));
            };
            for each (i in val) {
                writer(data, i);
            };
        }
        public static function arrayReader(data:ByteArrayLittle):TypeArray{
            var id:int = data.readShort();
            var v:TypeArray = RpcDef.newArray(id);
            if (!(v)){
                throw (new TypeError(("Invalid array type id: " + id)));
            };
            var len:int = data.readShort();
            var reader:Function = RpcDef.getTypeReader(v.type);
            if (reader == null){
                throw (new TypeError(("Type reader not found: " + v.type.name)));
            };
            var i:int;
            while (i < len) {
                v.push(reader(data));
                i++;
            };
            return (v);
        }
        public static function tableWriter(data:ByteArrayLittle, val:Dictionary):void{
        }
        public static function tableReader(data:ByteArrayLittle):Dictionary{
            return (null);
        }
        public static function lzoWriter(data:ByteArrayLittle, val:ByteArrayLittle):void{
        }
        public static function lzoReader(data:ByteArrayLittle):ByteArrayLittle{
            return (null);
        }
        public static function structWriter(data:ByteArrayLittle, val:Struct):void{
            var i:String;
            var writer:Function;
            data.writeShort(val.type.id);
            var defs:Object = val.type.defs;
            for (i in defs) {
                writer = RpcDef.getTypeWriter(defs[i]);
                if (writer == null){
                    throw (new TypeError(((((("Type writer not found: " + val.type.name) + ".") + i) + ":") + defs[i])));
                };
                writer(data, val[i]);
            };
        }
        public static function structReader(data:ByteArrayLittle):Struct{
            var i:String;
            var reader:Function;
            var id:int = data.readShort();
            var v:Struct = RpcDef.newStruct(id);
            if (!(v)){
                throw (new TypeError(("Invalid struct type id: " + id)));
            };
            var defs:Object = v.type.defs;
            for (i in defs) {
                reader = RpcDef.getTypeReader(defs[i]);
                if (reader == null){
                    throw (new TypeError(((((("Type reader not found: " + v.type.name) + ".") + i) + ":") + defs[i])));
                };
                v[i] = reader(data);
            };
            return (v);
        }
        public static function clearBuffer():void{
            _buffer.clear();
        }

    }
}//package LibCore.rpc 
