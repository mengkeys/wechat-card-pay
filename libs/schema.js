/**
 * Created by mengkeys on 16-10-3.
 */


var schema = require('validate');

var valid = {
    option:schema({
        appid:{
            type:"string",
            required:true,
            message:"appid invalid."
        },
        mch_id:{
            type:"string",
            required:true,
            message:"mch_id invalid."
        }
    }),
    micropay:schema({
        body:{
            type:"string",
            required:true,
            message:"body invalid."
        },
        out_trade_no:{
            type:"string",
            required:true,
            message:"out_trade_no invalid"
        },
        total_fee:{
            type:"string",
            required:true,
            message:"total_fee invalid"
        },
        spbill_create_ip:{
            type:"string",
            required:true,
            match:/((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
            message:"apbill_create_ip invalid."
        },
        auth_code:{
            type: 'string',
            required:true,
            match:"",
            message:"auth_code invalid."
        }
    }),
    orderquery : schema({

    }),
    reverser : schema({
        out_trade_no:{
            type:"string",
            required:true,
            message:"out_trade_no invalid."
        }
    }),
    refund : schema({
        out_refund_no:{
            type:"string",
            required:true
        },
        total_fee:{
            type:"string",
            required:true
        },
        refund_fee:{
            type:"number",
            required:true
        },
        op_user_id:{
            type:"",
            required:true
        }
    }),
    refundquery : schema({

    }),
    downloadbill : schema({
        bill_date: {
            type: "string",
            match: "",
            required:true,
            message: ""
        },
        bill_type:{
            type:"string",
            match:"",
            required:true,
            message:"bill_type invalid."
        }
    }),
    report : schema({
        interface_url:{
            type:"string",
            match:"",
            required:true,
            message:"interface_url invalid."
        },
        user_ip:{
            type:"string",
            required:true,
            match:/((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
            message:"user_ip invalid."
        }
    }),
    shorturl : schema({
        long_url:{
            type: "string",
            required:true,
            match:"",
            message:"long_url invalid."
        }
    }),
    authcodetoopenid : schema({
        auth_code:{
            type: 'string',
            required:true,
            match:"",
            message:"auth_code invalid."
        }
    })
};

module.exports = valid;

