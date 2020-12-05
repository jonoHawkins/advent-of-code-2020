import loadInput from "../utils/loadInput";

enum PartitionLookup {
    'F' = 0,
    'B' = 1,
    'L' = 0,
    'R' = 1,
}

function partition(command: string, min: number, max: number) {
    const range = max - min;
    const mid = min + Math.ceil(range / 2);

    if (!(command in PartitionLookup)) {
        throw new Error(`Command ${command} not found`);
    }

    return PartitionLookup[command] === 0
        ? { min, max: mid - 1 }
        : { min: mid, max };
}

function loopPartitions(commands: string[], min: number, max: number) {
    let range = { min, max };

    for (const command of commands) {
        range = partition(command, range.min, range.max);
    }

    if (range.max !== range.min) {
        throw new Error(`Could not resolve partitions: ${commands.join(', ')} (${min}, ${max})`)
    }

    return range.max;
}


function findSeatPosition(seatAddress: string) {
    const rowAddr = seatAddress.substr(0, 7);
    const colAddr = seatAddress.substr(7);
    const row = loopPartitions(rowAddr.split(''), 0, 127);
    const col = loopPartitions(colAddr.split(''), 0, 7);
    return { row, col };
}

function getSeatId({ row, col }) {
    return (row * 8) + col;
}

(async () => {
    const data = await loadInput(5);
    const input = data.split('\n').filter(Boolean);
    const ids = input
        .map(addr => getSeatId(findSeatPosition(addr)))
        .sort((a, b) => a - b);

    for (let i = 0; i + 2 < ids.length; i++) {
        const [a, b] = ids.slice(i, i + 2);

        if (a + 1 !== b) {
            console.log(a, b);
        }
    }
})();