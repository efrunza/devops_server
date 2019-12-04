"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
// This is the data formatter class.
// It contains methods that does the following:
//  -   map the database's data types into the typescript data types
//  -   format data into a particular format as it is the case of the date
class DataFormatter {
    static BitToBoolean(value) {
        if (value === "1")
            return true;
        return false;
    }
    static BooleanToBit(value) {
        if (value === true)
            return 1;
        return 0;
    }
    static DateToString(value) {
        return moment(value).format("MM/DD/YYYY");
    }
    static StringToDate(value) {
        return new Date(value);
    }
}
exports.DataFormatter = DataFormatter;
//# sourceMappingURL=dbFormatData.js.map