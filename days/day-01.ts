import loadInput from "../utils/loadInput";
import { sum, multiply } from "../utils/math";

const test = [
    1721,
    979,
    366,
    299,
    675,
    1456,
];

(async () => {
    const input = await loadInput(1);
    const rows = input.split('\n').map(s => parseInt(s));

    for (let i of loopCompare({ array: rows, window: 3 })) {
        if (sum(...i) === 2020) {
            console.log(multiply(...i));
        }
    }
})();


function* loopCompare<T>({ array, from = 0, window = 2 }: { array: T[], from?: number, window?: number }): Generator<T[]> {
    if (window === 0) {
        yield [];
    } else {
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


