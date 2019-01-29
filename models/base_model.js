"use strict";

var db = require('../connection/connection.js');
var validate = require("validate.js");
var moment = require('moment');
var Q = require('q');

validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
        return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
        return moment.utc(value).format(format);
    }
});

validate.validators.is_string = function(value, options, key, attributes) {
    if (value) {
        if (typeof value !== 'string') {
            return value + ": " + "element is not a string";
        }
    }
    return null;
};

var uuid_pattern = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;

var base_model = class BaseModel {

    constructor(){
        this.db_connection = db;
        this.validator = validate;
        this.Q = Q;
        this.uuid_pattern = uuid_pattern;
    }
    
}



module.exports = base_model;