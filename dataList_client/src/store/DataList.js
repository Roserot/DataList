import {ReduceStore} from 'flux/utils';
import {Dispatcher as DispatcherBase} from 'flux';
import {EventEmitter} from 'fbemitter';
import {ObjectUtils} from "../lib/ObjectUtils";

/**
 * Helps to dispatch events.
 * @author
 * @version 1.0.0
 */
export class Dispatcher {
    /**
     * @returns {Dispatcher}
     */
    static get() {
        return this.instance || (this.instance = new DispatcherBase());
    }

    /**
     * @type {null|Dispatcher}
     * @private
     */
    static instance;
}

/**
 * @type {string}
 * @static
 */
Dispatcher.UPDATE_DATA_LIST = 'updateDataList';

/**
 * Data store for 'DataList' component.
 * @author
 * @version 1.0.0
 */
export class DataList extends ReduceStore {
    /**
     * @returns {DataList}
     */
    static get() {
        return this.instance || (this.instance = new DataList());
    }

    /**
     * @param {{type:string, data:Array<{}>}} payload
     */
    doReduce(payload) {
        this.reduce(
            this.getState(),
            ObjectUtils.getClone(payload)
        );
    }

    /**
     * @returns {{dataList:Array<{}>}}
     * @protected
     */
    getInitialState() {
        return {
            dataList: []
        };
    }

    /**
     * @param {{dataList:Array<{}>}} state
     * @param {{type:string, data:Array<{}>}} payload
     * @returns {{dataList:Array<{}>}}
     */
    reduce(state, payload) {
        try {
            state = state ? ObjectUtils.getClone(state) : {};
            const eventType = payload.type;

            switch (eventType) {
                case Dispatcher.UPDATE_DATA_LIST:
                    const data = ObjectUtils.getClone(payload.data);
                    state.dataList = state.dataList.concat(data);
                    return state;

                default: return state;
            }
        } catch (e) {
            console.warn(`Failed to reduce 'DataList' store.`, e);
            return state;
        }
    }

    /**
     * @returns {DataList}
     * @private
     */
    constructor() {
        if (DataList.instance) return DataList.instance;
        super(Dispatcher.get());
        DataList.instance = this;
    }

    /**
     * @type {null|DataList}
     * @private
     */
    static instance;
}

Dispatcher.get().register(payload => {
    try {
        DataList.get().doReduce(payload);
    } catch (e) {
        console.warn(`Failed to register dispatcher for 'DataList' store.`, e);
        return false;
    }
});