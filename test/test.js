var assert = require('assert'), jarvey = require('../lib/main.js');

describe('Jarvey', function() {
    'use strict';
    describe('top method', function() {

        it('#createSuite(name) should require a mandatory name', function() {
            assert.throws(function() {
                var suite = jarvey.createSuite();
                assert(suite.name)
            }, Error);
            assert.throws(function() {
                var suite = jarvey.createSuite('');
                assert(suite.name)
            }, Error)
        });
        
        it('#createSuite(name) should throw an error if "name" has been already used for a previous suite', function() {
            assert.throws(function() {
                var suite1 = jarvey.createSuite('foo suite'), suite2 = jarvey.createSuite('foo suite');
            }, Error)
        });

        it('#createSuite(name, callback) should return a fresh populated suite', function() {
            var suite = jarvey.createSuite('Suite test');
            assert(suite.name);
            assert.equal(suite.tests.length, 0);
            assert(suite.startedOn);
            assert.equal(suite.totalImpressions, 0);
        });
        
        it('#getSuite(name, callback) should return a null value if there is no existing suite with that name', function() {
            var suite = jarvey.getSuite('Unexisting Suite test');
            assert(!suite);
        });
        
        it('#getSuite(name, callback) should return any matching suite according to that name', function() {         
            var expected = jarvey.createSuite('Fetching Suite test'), actual = jarvey.getSuite('Fetching Suite test');
            assert.equal(actual, expected);
            assert.equal(actual.name, 'Fetching Suite test');
        });
        
        it('#deleteSuite(name, callback) should remove a previously existing suite and return the just removed suite, if any', function() {         
            // "Fetching Suite test" created in previous test will be leveraged herein
            var deletedSuite = jarvey.deleteSuite('Fetching Suite test'), nullSuite = jarvey.getSuite('Fetching Suite test');
            assert.equal(deletedSuite.name, 'Fetching Suite test');
            assert(!nullSuite);
        });
    });

    
}); 

/**
 * // Full API example
 *
 var jarvey = require('jarvey'), suite, testsCollection, test;

     suite = jarvey.createSuite('Layout test');
    
     suite.control('Layout A');
     suite.test('Layout B');
     suite.test('Layout C');
    
     suite.limitTestsTo(2500);
     suite.expiresOn(expiratonDate);


     suite = jarvey.getSuite('Layout test');     
     
     suite.test('Layout D');
     testsCollection = suite.tests; 
     
     test = suite.tryOut(function(err, data) {
         // 'data' should be either 'Layout A', 'Layout B', 'Layout C', 'Layout D'
     }); 
    
     suite.cancel();
     suite.resume(expiratonDate);
     
     deletedSuite = jarvey.deleteSuite('Layout test'); 

 */