(function() {
    'use strict';

    var Suite = require('./suite'), suites = [];

    function getSuite(name) {
        var i, len = suites.length, suite;

        for (i = 0; i < len; i += 1) {
            if (suites[i].name === name) {
                suite = suites[i];
                break;
            }
        }
        return suite;
    }

    function createSuite(name) {
        var suite = getSuite(name);
        if (suite && suite instanceof Suite) {
            throw new Error('A suite named "' + name + '" already exists since ' + suite.startedOn);
        } else {
            suite = new Suite(name);
            suites.push(suite);
            return suite;
        }
    }
 
    function deleteSuite(name) {
        var index, suite = getSuite(name);
        
        if (suite && suite instanceof Suite) {
            index = suites.indexOf(suite);
            if (index >= 0) {
                suites.splice(index, 1); 
            }
        } 
        return suite;
    }

    exports.createSuite = createSuite;
    exports.getSuite = getSuite;
    exports.deleteSuite = deleteSuite;
}()); 