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

        it('#createSuite(name, callback) should return a fresh populated suite through the callback payload', function() {
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
        
        it('#deleteSuite(name, callback) should remove a previously existing suite and return the just removed suite -if any- in the callback payload', function() {         
            // "Fetching Suite test" created in previous test will be leveraged herein
            var removed = jarvey.deleteSuite('Fetching Suite test'), nullSuite = jarvey.getSuite('Fetching Suite test');
            assert.equal(removed.name, 'Fetching Suite test');
            assert(!nullSuite);
        });
    });

    
}); 

/**
 * // Full API example
 *
 var jarvey = require('jarvey');

 jarvey.createSuite('Layout test', function(suite) {
    
     suite.control('Layout A');
     suite.test('Layout B');
     suite.test('Layout C');
    
     suite.limitTestsTo(2500);
     suite.expiresOn(expiratonDate);
 });

 jarvey.get('Layout test', function(suite) {
     var test, testsCollection;    
     
     suite.test('Layout D');
    
     test = suite.tryOut(); // Should be either 'Layout A', 'Layout B', 'Layout C', 'Layout D'
     testsCollection = suite.tests; <---- Refactor into method?
    
     suite.cancel();
     suite.resume(expiratonDate);
 });

 */