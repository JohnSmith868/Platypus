/**
 * This component listens for specified local entity messages and re-broadcasts them on itself as other messages.
 *
 * @namespace platypus.components
 * @class RelaySelf
 * @uses platypus.Component
 */
/*global platypus */
(function () {
    'use strict';

    return platypus.createComponentClass({
        id: 'RelaySelf',
        
        properties: {
            /**
             * This is an object of key/value pairs. The keys are events this component is listening for locally, the value is the new event to be broadcast on this entity. The value can also be an array of events to be fired.
             *
             *      "events": {
             *          "sleeping": "good-night",
             *          "awake": ["alarm", "get-up"]
             *      }
             *
             * @property events
             * @type Object
             * @default null
             */
            events: null
        },

        constructor: function () {
            var event = '',
                events = this.events,
                owner = this.owner;
            
            // Messages that this component listens for and then triggers on itself as a renamed message - useful as a logic place-holder for simple entities.
            if (events) {
                for (event in events) {
                    if (events.hasOwnProperty(event)) {
                        this.addEventListener(event, owner.trigger.bind(owner, events[event]));
                    }
                }
            }
        }
    });
}());
