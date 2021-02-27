"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_spinner_1 = require("cli-spinner");
var spinner = function (text) {
    if (text === void 0) { text = ''; }
    var spin = new cli_spinner_1.Spinner({
        text: text ? text : 'Loading... %s ',
        stream: process.stderr,
    });
    spin.setSpinnerString(27);
    return spin;
};
exports.default = spinner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFzQztBQUV0QyxJQUFNLE9BQU8sR0FBRyxVQUFDLElBQWlCO0lBQWpCLHFCQUFBLEVBQUEsU0FBaUI7SUFDOUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDO1FBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO1FBQ3BDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtLQUN6QixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIn0=