const input = `1234567890 7           77` // dev input, add fs.readFile later

function* lexer(str) {
    let line = 0;
    let column = 0;
    let i = 0;
    let char = str[i];

    function next() {
        i++;
        char = str[i];
        column++;
    }

    const number = () => {
        let buffer = "";
        while (/^[0-9]$/.test(char)) {
            buffer += char;
            next()
        }

        if (buffer.length >= 1) {
            return {
                type: "number",
                value: Number(buffer)
            }
        }

        return null;
    }
    
    const eof = () => {
        char = str[i]; // time of video 1:08:16
        if (char == undefined) {
            i++;
            return { type: "EOF" };
        }
        
        return null;
    }

    const eol = () => {
        char = str[i]; // time of video 1:08:16
        if (char == "\n") {
            i++;
            return { type: "EOF" };
        }
        
        return null;
    }

    const whitespace = () => {
        while (char === " " || char === "\t") {
            next();
        }

        while (char === " " || char === "\t") {
            next();
        }
    }

    for (;;) {
        whitespace();
        const token = number() || eol() || eof() || null; // if not a number, or eof, then undefined character

        if (token) {
            if (token.type == "whitespace") continue

            yield token;

            if (token.type === "EOF") break;
        } else {
            throw new SyntaxError(`Unexpected character "${char}" at ${i + 1}`) // throw custom error later
        }
    }
}

console.log([...lexer(input)]);