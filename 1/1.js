function* iterate(list){
    while(true){
        yield* list
    }
}

function consume(time, iterator){
    const start = performance.now()
    while (performance.now() - start < time*1000){
        console.log(iterator.next().value)
    }
}


let a = iterate([1, 2, 3, 4])
consume(3, a)