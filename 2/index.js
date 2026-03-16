import { iterate, consume } from "iterlib"

process.stdin.setEncoding("utf8");

const state = {
    array: [],
    timeout: 0
};

const commands = {
    array: (args) => {
        state.array = args.split(" ").filter((symb) => symb !== " "); 
        console.log("Output is set to", state.array);
    },
    timeout: (args) => {
        state.timeout = Number(args) || 0;
        console.log("Timeout is set to", state.timeout);
    },
    run: () => {
        console.log("Running..");
        consume(state.timeout, iterate(state.array));
        console.log("Done");
    },
    state: () => {
        console.log(state)
    },
    exit: () => {
        console.log("Exit");
        process.exit();
    }
};

process.stdin.on("data", (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    const firstSpaceIndex = input.indexOf(" ");
    const commandName = firstSpaceIndex === -1 ? input : input.slice(0, firstSpaceIndex);
    const args = firstSpaceIndex === -1 ? "" : input.slice(firstSpaceIndex + 1);

    if (commands[commandName]) {
        commands[commandName](args);
    } else {
        console.log(`Unknown command ${commandName}`);
    }
});