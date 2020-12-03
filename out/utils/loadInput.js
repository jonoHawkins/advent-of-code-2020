"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromServer = exports.saveToDisk = exports.onDisk = exports.loadFromDisk = exports.getDiskFilePath = void 0;
const promises_1 = require("fs/promises");
const https_1 = __importDefault(require("https"));
function getDiskFilePath(day) {
    return `./resources/day-${day}.txt`;
}
exports.getDiskFilePath = getDiskFilePath;
async function loadFromDisk(day) {
    const filePath = getDiskFilePath(day);
    if (!await onDisk(filePath)) {
        console.log(`${filePath} no on disk`);
        return;
    }
    return promises_1.readFile(filePath, { encoding: 'utf-8' });
}
exports.loadFromDisk = loadFromDisk;
async function onDisk(filePath) {
    try {
        await promises_1.stat(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.onDisk = onDisk;
async function saveToDisk(day, data) {
    await promises_1.writeFile(getDiskFilePath(day), data, { encoding: 'utf-8' });
}
exports.saveToDisk = saveToDisk;
async function loadFromServer(day) {
    return new Promise((ful, rej) => {
        const url = `https://adventofcode.com/2020/day/${day}/input`;
        console.log(url);
        https_1.default.get(url, {
            headers: {
                'Cookie': `session=${process.env.ADVENT_OF_CODE_SESSION}`,
            },
        }, res => {
            if (res.statusCode !== 200) {
                console.log(res.statusMessage);
                rej(new Error(`Got status code ${res.statusCode}`));
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
exports.loadFromServer = loadFromServer;
async function loadInput(day) {
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
exports.default = loadInput;
//# sourceMappingURL=loadInput.js.map