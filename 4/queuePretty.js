class Queue{
    constructor(){
        this.data = [];
        const me = this;
        const indexMethods = Object.keys(this.#index);
        this.peek = {};
        this.pop = {};

        for (let method of indexMethods){
            Object.defineProperty(this.peek, method, {
                get(){
                    return me.data[me.#index[method]()]?.value
                }
            })
            Object.defineProperty(this.pop, method, {
                get(){
                    return me.data.splice(me.#index[method](), 1)[0]?.value
                }
            })
        }

    }

    #index = {
            newest: () => this.data.length - 1,
            oldest: () => 0,
            highest: () => 
                this.data.reduce(
                    (accumulator, currentValue, currentIndex) => 
                        accumulator.priority < currentValue.priority ? {index: currentIndex, priority: currentValue.priority} : accumulator,
                    {priority: -Infinity}).index,
                
            lowest: () => 
                this.data.reduce(
                    (accumulator, currentValue, currentIndex) => 
                        accumulator.priority > currentValue.priority ? {index: currentIndex, priority: currentValue.priority} : accumulator,
                    {priority: Infinity}).index
                
    }

    insert(value, priority = 0){
        this.data.push({value, priority})
    }

    get length(){
        return this.data.length
    }


}
