const TokenTypes = {
    COMMAND: 'COMMAND',
    NUMBER: 'NUMBER',
    OPERATOR: 'OPERATOR'
};

class Token {
    constructor(type, literal) {
        this.type = type;
        this.literal = literal;
    }
}

module.exports = {Token, TokenTypes};
