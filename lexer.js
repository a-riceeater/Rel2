const input = "8" // dev input

function* lexer(str) {
    let i = 0;
    let char = undefined;

    const number = () => {
        let value = ""
        for (; i < str.length; i++) {
            char = str[i]
            if (char === "7") {
                value += char;
            } else {
                break
            }
        }

        if (value.length > 1) {
            return {
                type: "number",
                value,
            }
        }

        return null;
    }
    
    const eof = () => {
        char = str[i]; // time of video 1:06:10
    }

    for (; i < str.length;) {
        const token = number();

        if (token) {
            yield token;
        } /*else if (char === undefined) {
            yield {
                type: "EOF"
            }
        }*/ else {
            throw new SyntaxError(`Unexpected character "${char}" at ${i + 1}`) // throw custom error later
        }
    }
}

console.log("starting");
for (const token of lexer(input)) {
    console.log(token);
}