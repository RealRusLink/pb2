export function memoize(fn, cache = new Map()){
    return function(...args){
        const key = JSON.stringify(args);
        if (cache.has(key)){
            return cache.get(key);
        } else {
            const value = fn(...args);
            cache.set(key, value);
            return value;
        }
    }
}

export function newCacheLRU(size = Infinity){
    const cache = new Map();
    return {
        set: (key, value) => {
            cache.set(key, value);
            if (size < cache.size){
                cache.delete(cache.keys().next().value)
            }
            return cache.size},
        has: (key) => cache.has(key),
        get: (key) => {
            let value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        },
        all: () => cache,
    }
}


export function newCacheLFU(size = Infinity){
    const cache = new Map();
    return {
        set: (key, value) => {
            if (size < cache.size + 1){ 
                let used = Infinity;
                let lfu_key;
                for (let [item, record] of cache.entries()){
                    if (record.used < used){
                        used = record.used;
                        lfu_key = item;
                    }
                    if (used == 1) break;
                }
                cache.delete(lfu_key)
            }
            cache.set(key, {value, used: 1});
            return cache.size},
        has: (key) => cache.has(key),
        get: (key) => {
            cache.get(key).used += 1;
            return cache.get(key).value;
        },
        all: () => cache,
    }
}


export function newCacheTBE(size = Infinity, timeToLive = 100){
    const cache = new Map();
    return {
        set: (key, value) => {
            cache.set(key, {value, deleteAt: Date.now() + timeToLive * 1000});
            return cache.size
        },
        has: (key) => {
            const now = Date.now();
                for (let [item, record] of cache.entries()) {
                    if (now > record.deleteAt) {
                        cache.delete(item);
                    }
                }
            return cache.has(key);
        },
        get: (key) => {
            return cache.get(key).value;
        },
        all: () => cache,
    }
}