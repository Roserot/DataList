import objectAssignDeep from 'object-assign-deep';

export class ObjectUtils {
    /**
     * @param {{}} obj
     * @returns {{}|*}
     */
    static getClone(obj) { return JSON.parse(JSON.stringify(obj)); }

    /**
     * @param {...{}} obj
     * @returns {{}}
     */
    static assignDeep(obj) {
        return objectAssignDeep.apply(objectAssignDeep, arguments);
    }
}