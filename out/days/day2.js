"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadInput_1 = __importDefault(require("../utils/loadInput"));
const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;
(async () => {
    const input = await loadInput_1.default(2);
    // console.log(input);
    console.log(parseInput(input)
        .filter(validatePassword)
        .length);
})();
function parseInput(input) {
    const lines = input.split('\n');
    return lines.map((line) => {
        const [policy, password] = line.split(': ');
        const [range, character] = policy.split(' ');
        const [min, max] = range.split('-').map(n => parseInt(n));
        return {
            password,
            policy: {
                raw: policy,
                character,
                range: { min, max },
            },
        };
    });
}
function validatePassword({ password, policy }) {
    let count = 0;
    for (const char of password) {
        if (char === policy.character) {
            count++;
            if (count > policy.range.max) {
                return false;
            }
        }
    }
    return count >= policy.range.min;
}
//# sourceMappingURL=day2.js.map