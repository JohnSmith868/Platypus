/**
 * This class defines a generic data object to use for messaging. It includes recycle methods to encourage reuse.
 *
 * @namespace platypus
 * @class Data
 * @constructor
 * @return {Data} Returns the new Data object.
 * @since 0.7.1
 */
/*global platypus, recycle, springroll */
platypus.Data = (function () {
    'use strict';
    
    var
        Data = function (first) {
            var i = arguments.length,
                key = '';
            
            if (first) {
                if (typeof first === 'string') {
                    if (i % 2) {
                        this[i] = null;
                        i -= 1;
                    }
                    while (i) {
                        this[arguments[i - 2]] = arguments[i - 1];
                        i -= 2;
                    }
                } else {
                    for (key in first) {
                        if (first.hasOwnProperty(key)) {
                            this[key] = first[key];
                        }
                    }
                }
            }
        };
    
    /**
     * Returns Data from cache or creates a new one if none are available.
     *
     * @method Data.setUp
     * @return {platypus.Data} The instantiated Data.
     * @since 0.7.1
     */
    /**
     * Returns Data back to the cache. Prefer the Data's recycle method since it recycles property objects as well.
     *
     * @method Data.recycle
     * @param {platypus.Data} The Data to be recycled.
     * @since 0.7.1
     */
    /**
     * Relinquishes Data properties and recycles it.
     *
     * @method recycle
     * @since 0.7.1
     */
    recycle.add(Data, !!springroll.Debug, 'Data', function () {
        var key = '';
        
        for (key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
        Data.recycle(this);
    });
    
    return Data;
}());