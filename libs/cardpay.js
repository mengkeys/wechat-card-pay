/**
 * Created by mengkeys on 16-9-23.
 */

var request= require('request');
var tools  = require('./tools');
var schema = require('./validate');
var _ = require('underscore');

/*
 Object options {
     appId:[string]
     mchId:[string]
 }
 */

var DOMAIN = 'https://api.mch.weixin.qq.com';

// api path list.

var REMOTES = {
    ACCESS_TOKEN:"",
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

function generateApiUrl(path) {
    if(!!path){
        return DOMAIN + path;
    } else {
        throw new Error('check name of apis.');
    }
}

var CardPay = function (options) {
    if(_.isFunction(options)){
        return options(new Error('first param must be a json object.'));
    }

    //var error = schema.option(options);

    this.appid  = options.appid;    // 公众号APP_ID
    this.mch_id = options.mch_id;   // 微信支付商户号
    this.key    = options.key;      // 微信支付密钥
    this.secret = options.secret;   // 公众号APP_SECRET
};


CardPay.prototype.generate = function (options) {
    var self = this;
    options.appid = self.appid;
    options.mch_id = self.mch_id;
    options.nonce_str = tools.nonce();
    options.sign = this.sign(options, self.key);
    return options;
};

// 参数为空不参与签名
CardPay.prototype.sign = function (obj) {
    var stringA = tools.sortstring(obj);
    console.log(stringA);
    var stringSignTemp = stringA+'&key='+ this.key;
    console.log(stringSignTemp);
    var sign =  tools.crypt(stringSignTemp,'md5');
    console.log(sign.toUpperCase());
    return sign.toUpperCase();
};

CardPay.prototype.signature = function (options, callback) {

};

CardPay.prototype.request = function (name, data, callback) {
    var url = generateApiUrl(name);
    console.log(tools.jsToXml(data));
    request({
        url: url,
        method:'POST',
        body: tools.jsToXml(data)
    }, function (err, response, body) {
        if(err) return callback(err, response);
        return tools.xmlToJs(body, function (err, result) {
            return callback(err, response, result);
        });
    });
};

CardPay.prototype.micropay = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide data param.'));
    }
    // 简单校验参数
    //var error = schema.micropay(options);
    //if(error) return callback(error);
    // 提交处理
    this.request(REMOTES.MICRO_PAY, this.generate(options), callback);
};


/* 订单查询接口 */
CardPay.prototype.orderquery = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    this.request(REMOTES.ORDER_QUERY, this.generate(options, callback));
};

/* 撤销订单接口 */
CardPay.prototype.reverse = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.REVERSE, this.generate(options, callback));
};

/* 申请退款接口 */
CardPay.prototype.refund = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.REFUND, this.generate(options, callback));
};

/* 查询退款接口 */
CardPay.prototype.refundquery = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.REFUND_QUERY, this.generate(options, callback));
};

/* 下载对帐单接口 */
CardPay.prototype.downloadbill = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.DOWNLOAD_BILL, this.generate(options, callback));
};


/* 交易保障接口 */
CardPay.prototype.report = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.REPORT, this.generate(options, callback));
};

/* 短链接转换接口 */
CardPay.prototype.shorturl = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.SHORT_URL, this.generate(options, callback));
};

/* 授权码查询接口 */
CardPay.prototype.authcodetoopenid = function (options, callback) {
    if(_.isFunction(options)){
        return options(new Error('please provide transaction_id or out_trade_no.'));
    }

    //
    this.request(REMOTES.AUTH_CODE_TO_OPENID, this.generate(options, callback));
};


module.exports = CardPay;