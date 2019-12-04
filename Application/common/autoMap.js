"use strict";
// This class's Map method copies the properties of the source's object into the target's object
// only if the properties exists in both objects.
Object.defineProperty(exports, "__esModule", { value: true });
class AutoMap {
    constructor() { }
    ;
    //test
    static Map(target, source) {
        Object.assign(target, ...Object.keys(target).map((key) => ({ [key]: target[key] })), ...Object.keys(target).map((key) => ({ [key]: source[key] })));
        return target;
    }
}
exports.AutoMap = AutoMap;
//# sourceMappingURL=autoMap.js.map