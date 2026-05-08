import * as fs from "node:fs/promises"
import { existsSync } from "node:fs";


async function* createReader(path, chunkSize) {
    if (!existsSync(path)) throw new Error(`File ${path} doesn't exist`);
    const {size} = await fs.stat(path);
    const file = await fs.open(path, "r");
    let offset = 0;
    const buffer = Buffer.alloc(chunkSize);
    while (offset < size) {
        let currentSize = chunkSize <= (size - offset) ? chunkSize : size - offset;
    }
}
