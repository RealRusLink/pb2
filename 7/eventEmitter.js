import {EventEmitter} from "node:events"

class MovementDetector extends EventEmitter {
    detect(x, y){
        console.log(`Detected movement at (${x}, ${y})`)
        this.emit("movement", {x, y})
    }
}


function callPolice({x, y}){
    console.log(`Calling police to (${x}, ${y})`)
}

function takePhoto({x, y}){
    console.log(`Took photo of (${x}, ${y})`)
}


function landmine(coords, listen){
    const explode = ({x, y}) => {
        if (coords.x === x && coords.y === y){
            console.log("💥")
            listen.off("movement", explode)
        }
    }
    listen.on("movement", explode)
}