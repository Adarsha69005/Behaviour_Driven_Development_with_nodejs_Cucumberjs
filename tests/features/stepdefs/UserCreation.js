'use strict';

var assert = require('chai').assert;
var should = require('chai').should;
var expect = require('chai').expect;
var uuid = require('uuid');
var Promise = require('bluebird');

var db_connection = require('../../../connection/connection.js');
var UserProfile = require('../../../models/users');


module.exports = function(){

    this.Given(/^that I have set up User Profile$/, function(callback) {
        this.userprofile = new UserProfile();
        callback();
    });

    this.When(/^I store a user profile into the database$/, function(callback){
        const self = this
        var test = 5
        this.user_id = uuid.v4()
        self.userprofile.users_profile_schema = {
            userid: this.user_id,
            username: "test",
            name: "Test Test",
            created_at: new Date()
        };
        Promise.resolve()
            .then(function(){ return self.userprofile.add(self.userprofile.users_profile_schema)})
            .then(function() { callback() }).catch(function(error){ assert(false, error.message) })
    });

    this.When(/^I update that user profile$/, function(callback){
        const self = this
        let user_profile_update = {
            userid : self.user_id,
            username: "oliveMedia",
            name: "Olive"
        }
        Promise.resolve()
            .then(function() { return self.userprofile.update(self.user_id,user_profile_update) })
            .then(function() { callback() }).catch(function(error) { assert(false, error.message) })
    });

    this.When(/^I delete that user profile$/, function(callback){
        const self = this

        Promise.resolve()
            .then(function() { return self.userprofile.remove(self.user_id) })
            .then(function() { callback() }).catch(function(error){ assert(false, error.message)})
    });

    this.Then(/^I should be able to retrieve that user profile using it's ID$/, function(callback){
        const self = this
        Promise.resolve()
            .then(function() { return self.userprofile.get(self.user_id)})
            .then(function(user){
                self.user = user
                assert.isDefined(self.user, 'user is undefined');
                assert.isObject(self.user, 'user is not an object')
                callback()
            })
            .catch(function(error) {assert(false, error.message)})
        // callback();
    });
    this.Then(/^The user should contain the set of required information$/, function(callback){
        assert.property(this.user, 'userid');
        assert.property(this.user, 'username');
        assert.property(this.user, 'name');
        assert.property(this.user, 'created_at');
        
        callback();
    });

    this.Then(/^The user should contain the updated information$/, function(callback){
        assert.propertyVal(this.user, 'username', 'oliveMedia');
        assert.propertyVal(this.user, 'name', 'Olive');
        callback()
    });

    this.Then(/^I should not be able to retrieve that user profile from the users using it's ID$/, function(callback){
        const self = this

        Promise.resolve()
            .then(function() { return self.userprofile.get(self.user_id) })
            .then(function(user){
                self.user = user
                assert.isUndefined(self.user, 'User is defined');
                callback()
            })
            .catch(function(error) { assert(false, error.message) })
    });

}


