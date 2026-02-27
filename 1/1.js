function* iterate(list){
    while(true){
        yield* list
    }
}

function consume(time, iterator){
    const start = performance.now()
    while (performance.now() - start < time){
        console.log(iterator.next().value)
    }
}


