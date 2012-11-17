var assert = require('assert'), jarvey = require('../lib/main.js');

describe('Jarvey', function() {
    'use strict';
    describe('top method', function() {

        it('#createSuite(name) should require a mandatory name', function() {
            assert.throws(function() {
                jarvey.createSuite('', function(suite) {
                    assert(suite.name)
                });
            }, Error)
        });
        
        it('#createSuite(name) should throw an error if "name" has been already used for a previous suite', function() {
            assert.throws(function() {
                jarvey.createSuite('foo suite', function(suite) {
                    assert(suite.name)
                });
                jarvey.createSuite('foo suite', function(suite) {
                    assert(suite.name)
                });
            }, Error)
        });

        it('#createSuite(name, callback) should return a fresh populated suite through the callback payload', function(done) {
            jarvey.createSuite('Suite test', function(suite) {                
                assert(suite.name);
                assert.equal(suite.tests.length, 0);
                assert(suite.startedOn);
                assert.equal(suite.totalImpressions, 0);
                done();
            });
        });
        
        it('#getSuite(name, callback) should return a null value if there is no existing suite with that name', function(done) {
            jarvey.getSuite('Unexisting Suite test', function(suite) {                
                assert(!suite);
                done();
            });
        });
        
        it('#getSuite(name, callback) should return any matching suite according to that name', function(done) {         
            jarvey.createSuite('Fetching Suite test', function(expected) {                
                jarvey.getSuite('Fetching Suite test', function(actual) {                
                    assert.equal(actual, expected);
                    assert.equal(actual.name, 'Fetching Suite test');
                    done();
                }); 
            });
        });
        
        it('#deleteSuite(name, callback) should remove a previously existing suite and return the just removed suite -if any- in the callback payload', function(done) {         
            // "Fetching Suite test" created in previous test will be leveraged herein
            jarvey.deleteSuite('Fetching Suite test', function(removed) {                
                assert.equal(removed.name, 'Fetching Suite test');
                jarvey.getSuite('Fetching Suite test', function(suite) {                
                    assert(!suite);
                    done();
                });
            }); 
        });
    });

    describe('Suite', function() {
        
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