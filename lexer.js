const input = "d7" // dev input

function trace(name, v) {
    console.log(name);
    return v;
}

function* lexer(str) {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];


        if (trace("checking 7", char === "7")) {
            yield {
                type: "number",
                value: "7",
                //loc: {
                  //  begin: i,
                    //end: i + 1
                //}
            }
        } else if (char === undefined) {
            yield {
                type: "EOF"
            }
        } else {
            throw new SyntaxError(`Unexpected character "${char}" at ${i + 1}`) // throw custom error later
        }
    }
}

console.log("starting");
for (const token of lexer(input)) {
    console.log(token);
}