/**
 * Created by mengkeys on 16-10-4.
 */

var qs = require('querystring');
var parser = require('xml2js');
var crypto = require('crypto');

// 开放对象
module.exports =  tools = {};


// 将XML对象解析成JS对象
tools.xmlToJs = function (xml,callback) {
    parser.parseString(xml,{
        trim:true,
        explicitArray:false
    }, function (err, result) {
        return callback(err, result.xml);
    });
};

// 将JS对象转换成XML对象
tools.jsToXml = function (obj) {
    var builder = new parser.Builder({
        allowSurrogateChars: true
    });
    return builder.buildObject({
        xml:obj
    });
};

tools.timestamp = function () {
    return Math.ceil(new Date().getTime() / 1000);
};

// 生成微信支付的随机字符 32位
tools.nonce = function (){
    var buf = crypto.randomBytes(32);
    var string = buf.toString('base64');
    string = string.replace(/\//g,'').replace(/\+/g,'');
    return string.substr(0, 16);
};

// 加密
tools.crypt = function (string, type) {
    type = type || 'md5';
    return crypto.createHash(type).update(string).digest('hex');
};

// 对象排序(属性名字段的ASCII码从小到大排序：字典排序)
tools.sortstring = function (obj) {
    var self = this;
    var keys = Object.keys(obj).sort();
    var newObj = {};
    keys.forEach(function (item) {
        // 空的选项不参与加密
        var str = self.trim(obj[item]);
        if(str!=""){
            newObj[item] = obj[item];
        }
    });

    return decodeURIComponent(qs.stringify(newObj));
};

tools.trim = function (str) {
    if(typeof str === 'string'){
        return str.replace(/\s+/g,"");
    } else {
        return str;
    }
};

tools.gbkEncodeURIComponent = function (string) {

};

