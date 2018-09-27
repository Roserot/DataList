import {ObjectUtils} from "../../lib/ObjectUtils";
import {Config} from "../../Config";
import App from "../../components/App";

/**
 * Gets data for DataList component.
 */
export class Getter {
    /**
     * @param {{}} [params]
     * @return {Promise<{}>}
     */
    static get(params) {
        return (new Getter(params)).get();
    }

    /**
     * Returns API URL.
     * @returns {string}
     * @private
     */
    static getUrl() {
        return Config.model().serverUrl;
    }

    static wsConnect() {
        const url = Getter.getUrl();
        const socket = new WebSocket(url);

        // socket.onopen = function() {
        //     socket.send(Getter.hashIDGen());
        // };

        socket.onmessage = function(event) {
            App.addChanges(JSON.parse(event.data));
        };
    }
    /**
     * @param {{}} [params]
     * @private
     */
    constructor(params) {
        /**
         * @type {{}}
         * @private
         */
        this.params = Getter.prepareParams(params);

    }

    /**
     * Returns default parameters.
     * @returns {{}}
     * @private
     */
    static getDefParams() {
        return {};
    }

    /**
     * Prepares parameters for instance.
     * @param {{}} [params]
     * @returns {{}}
     * @private
     */
    static prepareParams(params) {
        return ObjectUtils.assignDeep(
            ObjectUtils.getClone(params || {}),
            this.getDefParams()
        );
    }
}