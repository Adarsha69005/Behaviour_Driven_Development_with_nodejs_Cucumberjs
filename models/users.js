"use strict";

var BaseModel = require('../models/base_model');

var users_profile = class UserProfile extends BaseModel {
    constructor() {
        super();

        this.users_profile_schema = {
            userid: null,
            username: null,
            name: null,
            created_at: new Date()
        }

        this.users_profile_constraints = {
            userid: {
                presence: true,
                format: this.uuid_pattern
            },
            name: {
                is_string:true
            },
            username: {
                presence: true,
                is_string: true
            },
            created_at: {
                presence: true,
                datetime: true
            }
        }
    }
    populateAddSchemas(user){

        for (let objectKey in this.users_profile_schema){
            if(user.hasOwnProperty(objectKey)){
                this.users_profile_schema[objectKey] = user[objectKey]
            }
        }
    }

    add(user){
        this.populateAddSchemas(user)

        const deferred = this.Q.defer()
        const self = this

        this.isValid(this.users_profile_schema, this.users_profile_constraints).then(function(isValidUserProfile){
            self.db_connection.transaction(function(trx) {
                return self.db_connection.transacting(trx)
                    .insert(self.users_profile_schema)
                    .into('users')
                    .transacting(trx)
                    .then(trx.commit)
                    .catch(function(error) {
                        deferred.reject(new Error("Database transcation aborted due to error:" + error));
                    })
            }).then(function(){
                deferred.resolve(1)
            }).catch(function(error){
                deferred.reject(new Error("Database transation failed due to error:" + error));
            })
        }).catch(function(error){
            deferred.reject(new Error("object does not conform to this hiup-data-model schema"));
        })
        return deferred.promise
    }

    get(user_id){
        const deferred = this.Q.defer()
        const self = this
        let user = {}

        self.db_connection.transaction(function(trx){
            return trx('users')
                .first()
                .where({"userid": user_id})
                .transacting(trx)
        }).then(function(user_profile){
            if(user_profile === undefined){
                deferred.resolve(undefined)
            }
            for(var attribute in user_profile){
                user[attribute] = user_profile[attribute]
                
            }
            if (Object.keys(user).length === 0) {
                deferred.resolve(undefined)
            } else {
                deferred.resolve(user)
            }
        }).catch(function(error){
            console.log(error);
            deferred.reject(new Error("Database transaction aborted due to error:" + error));
        });
        return deferred.promise
    }

    update(user_id, user_profile_json) {
        const self = this

        return self.db_connection.transaction(function(trx) {
            trx('users').where({ 'userid' : user_id}).update(user_profile_json)
                .transacting(trx)
                .then(trx.commit)
                .catch(function(error){
                    throw Error("Database transcation aborted due to error:" +error);
                });
        });
    }

    removeAllUsers() {
        const self = this;
        return self.db_connection.transaction(function(trx){
            trx('users')
                .del()
                .transacting(trx)
                .then(trx.commit)
                .catch(function(error){
                    throw Error("Database transaction aborted due to error:" + error);
                });
        });
    }

    remove(user_id){
        const self = this;
        return self.db_connection.transaction(function(trx){
            trx('users')
                .where({ 'userid' : user_id })
                .del()
                .transacting(trx)
                .then(trx.commit)
                .catch(function(error){
                    throw Error("Database transaction aborted due to error:" + error);
                });
        });
    }

    isValid(obj, constraints){
        const deferred = this.Q.defer()
        let success = function success(attributes){
            deferred.resolve(true);
        }

        let error = function error(validation_errors){
            if(validation_errors instanceof Error){
                console.error("An error occured", validation_errors);
                deferred.reject(new TypeError(JSON.stringify(validation_errors)));

            } else {
                console.log("validation errors", validation_errors);
                deferred.reject(new TypeError(JSON.stringify(validation_errors)));
            }
        }
        this.validator.async(obj, constraints).then(success,error);
        return deferred.promise;
    }
} 

module.exports = users_profile;