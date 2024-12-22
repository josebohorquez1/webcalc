const {NumberNode, DecimalNode, CommandNode, BinaryOperationNode, UnaryOperationNode, GroupNode} = require('./Ast');
const {TokenTypes} = require('./Token');

class Parser {
    constructor (tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        return this.expression();
    }

    expression() {
        let node = this.term();
        while (this.match('+', '-')) {
            const operator = this.retrieveToken(-1).literal;
            const right = this.term();
            node = new BinaryOperationNode(node, operator, right);
        }
        return node;
    }

    term() {
        let node = this.factor();
        while (this.match('*', '/', '%')) {
            const operator = this.retrieveToken(-1).literal;
            const right = this.factor();
            node = new BinaryOperationNode(node, operator, right);
        }
        return node;
    }

    factor() {
        let node = this.primary();
        if (this.match('!')) {
            node = new UnaryOperationNode('!', node);
        }
        while (this.match('^')) {
            const operator = this.retrieveToken(-1).literal;
            const right = this.primary();
            node = new BinaryOperationNode(node, operator, right);
        }
        return node;
    }

    primary() {
        let node;
        if (this.match('-')) {
            const right = this.primary();
            node = new UnaryOperationNode('-', right);
        }
        else if (this.match(TokenTypes.NUMBER)) {
            node = this.number();
            if (this.match('(')) {
                const right = this.groupedExpression();
                return new BinaryOperationNode(node, '*', right);
            }
        }
        else if (this.match(TokenTypes.COMMAND)) node = this.command();
        else if (this.match('(')) node = this.groupedExpression();
        else throw new Error(`Unknown token ${this.retrieveToken(0).literal}`);
        return node;
    }

    groupedExpression() {
        const expression = this.expression();
        if (!this.match(')')) throw new Error('Missing right parenthesis in expression');
        return new GroupNode(expression);
    }

    number() {
        const value = this.retrieveToken(-1).literal;
        return value.includes('.') ? new DecimalNode(parseFloat(value)) : new NumberNode(parseInt(value, 10));
    }

    command() {
        const name = this.retrieveToken(-1).literal;
        if (this.match('{')) {
            let is_degrees = false;
            if (this.match('degrees')) is_degrees = true;
            const expression = this.expression();
            if (!this.match('}')) throw new Error('Right brace required at the end of command expression');
            return new CommandNode(name, expression, is_degrees);
            }
        return new CommandNode(name);
    }

    peek(...args) {
        const token = this.tokens[this.current];
        if (args.includes(token.type) || args.includes(token.literal)) return true;
        return false;
    }

    match(...args) {
        const token = this.tokens[this.current];
        if (!token) return false;
        if (args.includes(token.type) || args.includes(token.literal)) {
            this.advance();
            return true;
        }
        return false;
    }

    retrieveToken(offset) {
        if (this.current + offset < this.tokens.length) return this.tokens[this.current + offset];
        return undefined;
    }

    advance() {
        if (this.current < this.tokens.length) {
            this.current++;
        }
        return undefined;
    }
}

module.exports = {Parser};