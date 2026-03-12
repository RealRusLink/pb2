export function* iterate(list){
    while(true){
        yield* list
    }
}