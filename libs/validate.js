/**
 * Created by mengkeys on 16-10-3.
 */


var schema = require('./schema');

exports.option = function(obj){
    return schema.option.validate(obj);
};

exports.micropay = function (obj) {
    return schema.micropay.validate(obj);
};