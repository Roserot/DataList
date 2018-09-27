class ListenersStore {
    constructor() {
        this.__events = {};
    }

    emit(eventName, data) {
        const event = this.__events[eventName];
        if( event ) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }

    add(eventName, fn) {
        if(!this.__events[eventName]) {
            this.__events[eventName] = [];
        }

        this.__events[eventName].push(fn);
        return () => {
            this.__events[eventName] = this.__events[eventName].filter(eventFn => fn !== eventFn);
        }
    }
}

module.exports = ListenersStore;