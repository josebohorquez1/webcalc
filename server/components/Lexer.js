const {Token, TokenTypes} = require('./Token');

class Lexer {
    constructor(input) {
        this.input = input;
        this.index = 0;
        this.tokens = [];
    }

    peek(regex) {
        return regex.test(this.input[this.index]);
    }

    match(regex) {
        const matched = this.input.slice(this.index).match(regex);
        if (matched) {
            this.index += matched[0].length;
            return matched[0];
        }
        return null;
    }

    lex() {
        while (this.index < this.input.length) {
            if (this.peek(/\s/)) {
                this.index += 1;
                continue;
            }
            else if (this.peek(/[a-zA-Z]/)) {
                const command = this.match(/[a-zA-Z]+/);
                if (command) this.tokens.push(new Token(TokenTypes.COMMAND, command));
            }
            else if (this.peek(/\d/)) {
                let number = this.match(/\d+/);
                if (this.peek(/\./)) {
                    this.match(/\./);
                    number += '.' + this.match(/\d+/);
                }
                this.tokens.push(new Token(TokenTypes.NUMBER, number));
            }
            else {
                const operator = this.match(/[+\-%{}()!^*/]/);
                this.tokens.push(new Token(TokenTypes.OPERATOR, operator));
            }
        }
            return this.tokens;
    }
}

module.exports = {Lexer};
