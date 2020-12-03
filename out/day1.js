// import input from '../resources/day-1.json';
var test = [
    1721,
    979,
    366,
    299,
    675,
    1456,
];
/**
 * Specifically, they need you to find the two entries that sum to 2020 and
 * then multiply those two numbers together.
 */
function find2020Multiplier(_a) {
    var input = _a.input, _b = _a.max, max = _b === void 0 ? 1 : _b, _c = _a.target, target = _c === void 0 ? 2020 : _c;
    var pairs = [];
    for (var i = 0; i < input.length; i++) {
        for (var j = i + 1; j < input.length; j++) {
            console.log("Testing (" + i + ") " + input[i] + " against (" + j + ") " + input[j]);
            if (input[i] + input[j] === target) {
                pairs.push([input[i], input[j]]);
                if (pairs.length === max) {
                    return pairs;
                }
            }
        }
    }
    return pairs;
}
function multiply(first) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return a.reduce(function (sum, next) {
        return sum * next;
    }, first);
}
console.log(find2020Multiplier({
    input: test,
}).map(function (p) { return multiply.apply(void 0, p); }));
//# sourceMappingURL=day1.js.map