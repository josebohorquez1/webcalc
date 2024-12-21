const {Lexer} = require('../components/Lexer');
const {TokenTypes, Token} = require('../components/Token');

describe('Lexer Tests', () => {
    it('Addition with spaces', () => {
        const input = '1 + 1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Simple expression with multiple operators and spaces.', () => {
        const input = '2 + 3 * 5';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '2'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
        ]);
    });

    it('Multilevel parenthesis expression with random spacing', () => {
        const input = '(3    *   (   3   +     5     )   )';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, ')'),
        ]);
    });

    it('Addition', () => {
        const input = '1+1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Subtraction', () => {
        const input = '1-1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Multiplication', () => {
        const input = '1*1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Division', () => {
        const input = '1/1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '/'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Modulus', () => {
        const input = '1%1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '%'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('negative integer', () => {
        const input = '-3';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3'),
        ]);
    });

    it('negative expression', () => {
        const input = '-3+1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('negative decimal expression', () => {
        const input = '-3.5+1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Exponentiation', () => {
        const input = '1^1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '^'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Factorial', () => {
        const input = '1!';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '!'),
        ]);
    });

    it('Simple expression with multiple operators.', () => {
        const input = '2+3*5';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '2'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
        ]);
    });

    it('Simple expression with integer and decimal', () => {
        const input = '1.5+1';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '1.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ]);
    });

    it('Simple decimal expression with multiple operators.', () => {
        const input = '2.5+3.4*5';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.NUMBER, '2.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '3.4'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
        ]);
    });

    it('Simple parenthesis expression', () => {
        const input = '(1+2)';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '2'),
            new Token(TokenTypes.OPERATOR, ')'),
        ]);
    });

    it('Parenthesis expression with multiple operators', () => {
        const input = '(3+5/7)';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, '/'),
            new Token(TokenTypes.NUMBER, '7'),
            new Token(TokenTypes.OPERATOR, ')'),
        ]);
    });

    it('Multilevel parenthesis expression', () => {
        const input = '(3*(3+5))';
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, ')'),
        ]);
    });

    it('Simple square root', () => {
        const input = 'sqrt{3}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

    it('Simple log', () => {
        const input = 'log{3}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'log'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

    it('Square root with simple expression', () => {
        const input = 'sqrt{20*20}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

    it('Square root with parenthesis  expression', () => {
        const input = 'sqrt{(20*20)}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

        it('Square root with simple  expression', () => {
        const input = 'sqrt{20*20}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

    it('Square root with parenthesis  expression', () => {
        const input = 'sqrt{(20*(3*20))}'
        const lexer = new Lexer(input);
        const tokens = lexer.lex();
        expect(tokens).toEqual([
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, '}'),
        ]);
    });

        it('Identifier pie', () => {
            const input = 'PI';
            const lexer = new Lexer(input);
            const tokens = lexer.lex();
            expect(tokens).toEqual([
                new Token(TokenTypes.COMMAND, 'PI')]);
        });

        it('Sin in degrees', () => {
            const input = 'sin{degrees 45}';
            const lexer = new Lexer(input);
            const tokens = lexer.lex();
            expect(tokens).toEqual([new Token(TokenTypes.COMMAND, 'sin'),
                new Token(TokenTypes.OPERATOR, '{'),
                new Token(TokenTypes.COMMAND, 'degrees'),
                new Token(TokenTypes.NUMBER, '45'),
                new Token(TokenTypes.OPERATOR, '}')]);
        });
});
