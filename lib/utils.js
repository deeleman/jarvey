(function() {'use strict';

    exports.serialize = function(str) {
        var hash = 0, len = str.length, charn, i;
        if (len === 0) {
            return hash;
        }
        for ( i = 0; i < len; ++i) {
            charn = str.charCodeAt(i);
            hash = ((hash >> 5) + hash) + charn;
            hash = hash & hash;
            // Convert to 32bit integer
        }
        return hash;
    }

}());
