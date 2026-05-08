import * as fs from "node:fs/promises"
import { existsSync } from "node:fs";


async function createReader(path){
    if (!existsSync(path)) throw new Error(`File ${path} doesn't exist`);
    const file = await fs.open(path);
}

