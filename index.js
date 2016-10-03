/**
 * Created by mengkeys on 16-9-23.
 */

var request= require('request');
var parser = require('xml2json');
var crypto = require('crypto');
var qs = require('querystring');

/*
  Object options {
    appId:
    appSecret:
    mchId:
  }
 */

var DOMAIN = 'api.mch.weixin.qq.com';

// api path list.

var REMOTES = {
    MICRO_PAY:"/pay/micropay",
    ORDER_QUERY:"/pay/orderquery",
    REVERSE:"/secapi/pay/reverse",
    REFUND:"/secapi/pay/refund",
    REFUND_QUERY:"/pay/refundquery",
    DOWNLOAD_BILL:"/pay/downloadbill",
    REPORT:"/payitil/report",
    SHORT_URL:"/tools/shorturl",
    AUTH_CODE_TO_OPENID:"/tools/authcodetoopenid"
};

function generateApi(name) {
    if(!!remotes[name]){
        return DOMAIN + REMOTES[name]
    } else {
        throw new Error('check name of apis.');
    }
}

var Payment = function (options) {
    if(!Object.isObject(options)){
        options = {};
    }

    if(!options.appId){
        throw new Error('appId is required.');
    }

    if(!options.appSecret){
        throw new Error('appSecret is required');
    }

    if(!options.mchId){
        throw new Error('mchId is required.');
    }
};

/* http请求 */
Payment.prototype._httpRequest = function (uri,options,callback) {
    request.post(uri,callback).form(options);
};

/* https请求 */
Payment.prototype._httpsRequest = function () {

};

/* xml转json */
Payment.prototype._xmlToJson = function (xml) {
    return parser.toJson(xml);
};

/* json转xml */
Payment.prototype._jsonToXml = function (json) {
    return parser.toXml(json,{
        object: false,
        reversible: false,
        coerce: false,
        sanitize: true,
        trim: true,
        arrayNotation: false
    })
};

// 生成微信支付时间戳
Payment.prototype.timestamp = function () {
    return Math.ceil(new Date().getTime() / 1000);
};

// 生成微信支付的随机字符 32位
Payment.prototype.nonce = function (){
    var buf = crypto.randomBytes(32);
    var string = buf.toString('base64');
    string = string.replace(/\//g,'_').replace(/\+/g,'');
    return string.substr(0, 16);
};

Payment.prototype.signature = function (obj) {
    var keys = Object.keys(obj);
    var args = {};
    keys.sort();
    keys.forEach(function (item) {
        args[item] = obj[item];
    });
    // sha1加密
    return crypto.createHash('sha1').update(decodeURIComponent(qs.stringify(args))).digest('hex');
};

Payment.prototype.accessToken = function () {

};




/* 提交刷卡支付接口 */
/*
<xml>
<appid>wx2421b1c4370ec43b</appid>
<attach>订单额外描述</attach>
<auth_code>120269300684844649</auth_code>
<body>刷卡支付测试</body>
<device_info>1000</device_info>
<goods_tag></goods_tag>
<mch_id>10000100</mch_id>
<nonce_str>8aaee146b1dee7cec9100add9b96cbe2</nonce_str>
<out_trade_no>1415757673</out_trade_no>
<spbill_create_ip>14.17.22.52</spbill_create_ip>
<time_expire></time_expire>
<total_fee>1</total_fee>
<sign>C29DB7DB1FD4136B84AE35604756362C</sign>
</xml>

*/
Payment.prototype.micropay = function (options, callback) {
    if(typeof options == 'Function'){

    }
    var self = this;
    options = options || {};
    options.appid = self.appId;
    options.appSecret = self.appSecret;
    options.mch_id = self.mchId;
    options.sign = self._signature();
    options.spbill_create_ip = ips;   // ip
};


/* 订单查询接口 */
Payment.prototype.orderquery = function (callback) {

};

/* 撤销订单接口 */
Payment.prototype.reverse = function (callback) {

};

/* 申请退款接口 */
Payment.prototype.refund = function (callback) {

};

/* 查询退款接口 */
Payment.prototype.refundquery = function (callback) {

};

/* 下载对帐单接口 */
Payment.prototype.downloadbill = function (callback) {

};


/* 交易保障接口 */
Payment.prototype.report = function (callback) {

};

/* 短链接转换接口 */
Payment.prototype.shorturl = function (callback) {

};

/* 授权码查询接口 */
Payment.prototype.authcodetoopenid = function (callback) {

};

/* 生成签名 */
Payment.prototype.signature = function () {
    var self = this;
    return self.signature({});
};


module.exports = Payment;