function memoize(fn, cache = new Map()){
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

function newCacheLRU(size = Infinity){
    const cache = new Map();
    return {
        set: (key, value) => {
            if (cache.has(key)){
                cache.delete(key);
                }
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
    }
}
