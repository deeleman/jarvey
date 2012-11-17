(function() {
    'use strict';

    var Test = function(payload, isControl) {
        if (!(this instanceof Test)) {
            return new Test(payload);
        }

        this.config = payload;
        this.impressions = 0;
        this.isControl = isControl || false;
    };

    exports = module.exports = Test;

}());