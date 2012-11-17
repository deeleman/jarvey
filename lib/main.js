(function() {
    'use strict';

    var Suite = require('./suite'), suites = [];

    function getSuite(name, callback) {
        var i, len = suites.length, suite;

        for (i = 0; i < len; i += 1) {
            if (suites[i].name === name) {
                suite = suites[i];
                break;
            }
        }
        callback(suite);
    }

    function createSuite(name, callback) {
        var suite;

        getSuite(name, function(suite) {
            if (suite && suite instanceof Suite) {
                  throw new Error('A suite named "' + name + '" already exists since ' + suite.startedOn);
            } else {
                suite = new Suite(name);
                suites.push(suite);
                callback(suite);
            }
        });
    }
    
    function deleteSuite(name, callback) {
        var suite, index;

        getSuite(name, function(suite) {
            if (suite && suite instanceof Suite) {
                index = suites.indexOf(suite);
                if (index >= 0) {
                   suites.splice(index, 1); 
                }
            } 
            callback(suite);
        });
    }

    exports.createSuite = createSuite;
    exports.getSuite = getSuite;
    exports.deleteSuite = deleteSuite;
}()); 