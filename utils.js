/**
 * Created by mengkeys on 16-9-24.
 */
var parser = require('xml2json');
var data = { appid: 'wx2421b1c4370ec43b',
    bill_date: '20141110',
    bill_type: 'ALL',
    mch_id: '10000100',
    nonce_str: '21df7dc9cd8616b56919f20d9f679233',
    sign: '332F17B766FC787203EBE9D6E40457A1'
};

var body = {};
body.xml = data;

console.log(parser.toXml(parser.toJson(body,{
    reversible: true
}).toString(),{
    sanitize:true
}));

/*var xml =   '<xml>'+
                '<appid>wx2421b1c4370ec43b</appid>'+
                '<bill_date>20141110</bill_date>'+
                '<bill_type>ALL</bill_type>'+
                '<mch_id>10000100</mch_id>'+
                '<nonce_str>21df7dc9cd8616b56919f20d9f679233</nonce_str>'+
                '<sign>332F17B766FC787203EBE9D6E40457A1</sign>'+
            '</xml>';



var toJ = parser.toJson(xml,{
    object: true,
    reversible: false,
    coerce: false,
    sanitize: true,
    trim: true,
    arrayNotation: false
});
var toX = parser.toXml(toJ,{
    sanitize: false
});*/

// 需要将服务器返回数据转成JSON格式
// 需要将客户端提交数据转成XML格式  （独立标签格式）



//console.log(toJ);
//console.log(toX);


var xml1 = '<xml>'+
                '<return_code><![CDATA[SUCCESS]]></return_code>'+
                '<return_msg><![CDATA[OK]]></return_msg>'+
                '<appid><![CDATA[wx2421b1c4370ec43b]]></appid>'+
                '<mch_id><![CDATA[10000100]]></mch_id>'+
                '<device_info><![CDATA[1000]]></device_info>'+
                '<nonce_str><![CDATA[GOp3TRyMXzbMlkun]]></nonce_str>'+
                '<sign><![CDATA[D6C76CB785F07992CDE05494BB7DF7FD]]></sign>'+
                '<result_code><![CDATA[SUCCESS]]></result_code>'+
                '<openid><![CDATA[oUpF8uN95-Ptaags6E_roPHg7AG0]]></openid>'+
                '<is_subscribe><![CDATA[Y]]></is_subscribe>'+
                '<trade_type><![CDATA[MICROPAY]]></trade_type>'+
                '<bank_type><![CDATA[CCB_DEBIT]]></bank_type>'+
                '<total_fee>1</total_fee>'+
                '<coupon_fee>0</coupon_fee>'+
                '<fee_type><![CDATA[CNY]]></fee_type>'+
                '<transaction_id><![CDATA[1008450740201411110005820873]]></transaction_id>'+
                '<out_trade_no><![CDATA[1415757673]]></out_trade_no>'+
                '<attach><![CDATA[订单额外描述]]></attach>'+
                '<time_end><![CDATA[20141111170043]]></time_end>'+
            '</xml>';
console.log(parser.toJson(xml1,{
    object: true
}).xml);

