export function* iterate(list){
    while(true){
        yield* list
    }
}

export function consume(time, iterator){
    const start = performance.now()
    while (performance.now() - start < time*1000){
        console.log(iterator.next().value)
    }
}
