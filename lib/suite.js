(function() {
    'use strict';
    
    var Suite, Test = require('./test.js');
        
    Suite = function(name) {
        if (!(this instanceof Suite)) {
            return new Suite(name);
        }
        
        if(!name) {
            throw new Error('A name is mandatory when instancing new suites');
        }

        this.tests = [];
        this.name = name;
        this.startedOn = new Date();
        this.totalImpressions = 0;
        this.lastTestIndex = -1;        
    };
 
    Suite.prototype.control = function(payload) {
        var test = new Test(payload, true);
        this.tests.push(test);
        
    };

    Suite.prototype.test = function(payload) {
        var test = new Test(payload);
        this.tests.push(test);
    };
    
    Suite.prototype.tryOut = function(callback) {
        var now = new Date(), test;
        
        if(now > this.expiredOn || this.totalImpressions >= this.limit) {
            return test;
        }
        
        this.lastTestIndex += 1;
        test = this.tests[this.lastTestIndex];
        test.impressions += 1;
        this.totalImpressions += 1;
        
        if(this.lastTestIndex === this.tests.length) {
            this.lastTestIndex = 0;
        }
        
        callback(null, test.config);
    };
    
    Suite.prototype.limitTestsTo = function(maxAttempts) {
        this.limit = maxAttempts;
    };
    
    Suite.prototype.expiresOn = function(date) {
        this.expiredOn = date;
    };
    
    Suite.prototype.cancel = function() {
        this.expiredOn = new Date();
    };
    
    Suite.prototype.resume = function(date) {
        if(date) {
            this.expiresOn(date);
        } else {
            delete this.expiredOn;
        }
    };
    
    Suite.prototype.getTests = function() {
        return this.tests;
    };

    exports = module.exports = Suite;

}());