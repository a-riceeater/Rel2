const input = "777" // dev input

function* lexer(str) {
    let i = 0;
    let char = str[i];

    function next() {
        i++;
        char = str[i];
    }

    const number = () => {
        let buffer = "";
        while (char === "7") {
            buffer += char;
            next()
        }

        if (buffer.length >= 1) {
            return {
                type: "number",
                value: buffer
            }
        }
    }
    
    const eof = () => {
        char = str[i]; // time of video 1:08:16
        if (char == undefined) {
            i++;
            return { type: "EOF" };

        }
        
    }

    for (;;) {
        const token = number() || eof() || null; // if not a number, or eof, then undefined character

        if (token) {
            yield token;

            if (token.type === "EOF") break;
        } else {
            throw new SyntaxError(`Unexpected character "${char}" at ${i + 1}`) // throw custom error later
        }
    }
}

console.log([...lexer(input)]);