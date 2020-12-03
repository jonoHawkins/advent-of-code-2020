"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadInput_1 = __importDefault(require("../utils/loadInput"));
const test = [
    1721,
    979,
    366,
    299,
    675,
    1456,
];
(async () => {
    const input = await loadInput_1.default(1);
    const rows = input.split('\n').map(s => parseInt(s));
    for (let i of loopCompare({ array: rows, window: 3 })) {
        if (sum(...i) === 2020) {
            console.log(multiply(...i));
        }
    }
})();
function* loopCompare({ array, from = 0, window = 2 }) {
    if (window === 0) {
        yield [];
    }
    else {
        for (let i = from; i < array.length; i++) {
            const subGenerator = loopCompare({
                array,
                from: i + 1,
                window: window - 1
            });
            for (const values of subGenerator) {
                yield [array[i], ...values];
            }
        }
    }
}
function sum(...a) {
    return a.reduce((sum, next) => sum + next, 0);
}
function multiply(...a) {
    const [first, ...rest] = a;
    return rest.reduce((sum, next) => {
        return sum * next;
    }, first);
}
//# sourceMappingURL=day1.js.map