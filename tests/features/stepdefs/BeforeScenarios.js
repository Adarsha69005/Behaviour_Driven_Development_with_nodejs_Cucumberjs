'use strict';

var assert = require('chai').assert;

var users = require('../../../models/users');


module.exports = function (){
    
    this.Before({timeout: 120 * 1000}, function(scenario,callback){
        console.log('start before');
        setTimeout(function (){
            new users().removeAllUsers().then(function(){
                console.log("--------------");
                callback();
            }).catch(function (error) {
                assert(false, "Error: Could not clean up before running scenario :" + scenario.getName() + " - " + error)
            })
        },1000);
    })
}