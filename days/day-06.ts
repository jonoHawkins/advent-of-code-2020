import loadInput from "../utils/loadInput";
import { sum } from "../utils/math";

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

(async () => {
    console.log(
        sum(
            ...(
                await loadInput(6)
                // testInput
            ).split('\n\n')
                .map(group => (
                    countCharsInAll(group.split('\n').filter(Boolean))
                ))
        )
    );
})();

function countCharsInAll(strings: string[]) {
    const requiredCount = strings.length;
    const counts: { [key: string]: number } = {};
    const meetRequirement: string[] = [];

    for (const char of strings.join('').replace(/\W/g,'')) {
        counts[char] = counts[char] ? counts[char] + 1 : 1;

        if (counts[char] === requiredCount) {
            meetRequirement.push(char);
        }
    }

    return meetRequirement.length;
}