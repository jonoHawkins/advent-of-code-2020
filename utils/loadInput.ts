import { stat, readFile, writeFile } from 'fs/promises'
import https from 'https';

export async function readSession() {
    const file = './session_id';

    if (await onDisk(file)) {
        return readFile(file, { encoding: 'utf-8' })
    }
}

export function getDiskFilePath(day: number) {
    return `./resources/day-${day}.txt`;
}

export async function loadFromDisk(day: number) {
    const filePath = getDiskFilePath(day);

    if (!await onDisk(filePath)) {
        console.log(`${filePath} no on disk`)
        return;
    }

    return readFile(filePath, { encoding: 'utf-8' });
}

export async function onDisk(filePath: string) {
    try {
        await stat(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export async function saveToDisk(day: number, data: string) {
    await writeFile(getDiskFilePath(day), data, { encoding: 'utf-8' });
}

export async function loadFromServer(day: number) {
    return new Promise<string>(async (ful, rej) => {
        const url = `https://adventofcode.com/2020/day/${day}/input`;

        console.log(url);

        https.get(url, {
            headers: {
                'Cookie': `session=${await readSession()}`,
            },
        }, res => {
            if (res.statusCode !== 200) {
                console.log(res.statusMessage);
                rej(new Error(`Got status code ${res.statusCode}`))
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                ful(rawData);
            });
        })
            .on('error', rej);
    });
}

export default async function loadInput(day: number): Promise<string> {
    const fromDisk = await loadFromDisk(day);

    if (fromDisk) {
        return fromDisk;
    }

    const fromServer = await loadFromServer(day);

    if (fromServer) {
        await saveToDisk(day, fromServer);
        return fromServer;
    }
}