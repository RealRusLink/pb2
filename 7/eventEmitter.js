import {EventEmitter} from "node:events"

class MovementDetector extends EventEmitter {
    detect(x, y){
        console.log(`Detected movement at (${x}, ${y})`)
        this.emit("movement", {x, y})
    }
}


function callPolice(coordinates){
    console.log(`Calling police to (${x}, ${y})`)
}