const {TokenTypes, Token} = require('../components/Token');
const {NumberNode, DecimalNode, BinaryOperationNode, UnaryOperationNode, GroupNode, CommandNode} = require('../components/Ast');
const {Parser} = require('../components/Parser');

describe('Parser Tests', () => {
    it('Addition', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expected = new BinaryOperationNode(
            new NumberNode(1), '+',
            new NumberNode(1));
        expect(ast).toEqual(expected);
    });

    it('Subtraction', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(
            new BinaryOperationNode(
                new NumberNode(1), '-',
                new NumberNode(1)));
    });

    it('Multiplication', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(
            new BinaryOperationNode(
                new NumberNode(1), '*',
                new NumberNode(1)));
    });

    it('Devision', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '/'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(
            new BinaryOperationNode(
                new NumberNode(1), '/',
                new NumberNode(1)));
    });

    it('Modulus', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '%'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(
            new BinaryOperationNode(
                new NumberNode(1), '%',
                new NumberNode(1)));
    });

    it('Negative integer', () => {
        const tokens = [
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new UnaryOperationNode('-', 
            new NumberNode(3)));
    });

    it('Negative expression', () => {
        const tokens = [
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new BinaryOperationNode(
            new UnaryOperationNode('-', 
                new NumberNode(3)
            ), '+',
            new NumberNode(1)));
    });

    it('Negative decimal expression', () => {
        const tokens = [
            new Token(TokenTypes.OPERATOR, '-'),
            new Token(TokenTypes.NUMBER, '3.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new BinaryOperationNode(
            new UnaryOperationNode('-', 
                new DecimalNode(3.5)
            ), '+',
            new NumberNode(1)));
    });

    it('Exponentiation', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '^'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new BinaryOperationNode(
            new NumberNode(1),
            '^',
            new NumberNode(1)));
    });

    it('Factorial', () => {
        tokens = [
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '!'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new UnaryOperationNode('!',
            new NumberNode(1)));
    });

    it('Factorial expression', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, '!'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, '!')
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(
            new BinaryOperationNode(
                new UnaryOperationNode('!', 
                    new NumberNode(5)), '*',
                    new UnaryOperationNode('!',
                        new NumberNode(5))));
    });

    it('Simple expression with multiple operators.', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '2'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new BinaryOperationNode(
            new NumberNode(2), '+',
            new BinaryOperationNode(
                new NumberNode(3), '*',
                new NumberNode(5))));
    });

    it('Addition with decimal', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '1.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '1'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expected = new BinaryOperationNode(
            new DecimalNode(1.5), '+',
            new NumberNode(1));
        expect(ast).toEqual(expected);
    });
 
    it('Simple decimal expression with multiple operators.', () => {
        const tokens = [
            new Token(TokenTypes.NUMBER, '2.5'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '3.4'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '5'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new BinaryOperationNode(
            new DecimalNode(2.5), '+',
            new BinaryOperationNode(
                new DecimalNode(3.4), '*',
                new NumberNode(5))));
    });

    it('Simple parenthesis expression', () => {
        const tokens = [
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '1'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '2'),
            new Token(TokenTypes.OPERATOR, ')'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new GroupNode(
            new BinaryOperationNode(
                new NumberNode(1), '+',
                new NumberNode(2))));
    });

    it('Parenthesis expression with multiple operators', () => {
        const tokens = [
                        new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, '/'),
            new Token(TokenTypes.NUMBER, '7'),
            new Token(TokenTypes.OPERATOR, ')'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new GroupNode(
            new BinaryOperationNode(
                new NumberNode(3), '+',
                new BinaryOperationNode(
                    new NumberNode(5), '/',
                    new NumberNode(7)))));
    });

    it('Multilevel parenthesis expression', () => {
        const tokens = [
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '+'),
            new Token(TokenTypes.NUMBER, '5'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, ')'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new GroupNode(
            new BinaryOperationNode(
                new NumberNode(3), '*',
                new GroupNode(
                    new BinaryOperationNode(
                        new NumberNode(3), '+',
                        new NumberNode(5))))));
    });

    it('Simple square root', () => {
        tokens = [
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '}'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new CommandNode('sqrt',
            new NumberNode(3)));
    });

    it('Simple log', () => {
        tokens = [
            new Token(TokenTypes.COMMAND, 'log'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '3'),
            new Token(TokenTypes.OPERATOR, '}'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new CommandNode('log',
            new NumberNode(3)));
    });

    it('Square root with simple expression', () => {
        const tokens = [
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '}'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new CommandNode('sqrt',
            new BinaryOperationNode(
                new NumberNode(20), '*',
                new NumberNode(20))));
    });

    it('Square root with parenthesis  expression', () => {
        const tokens = [
            new Token(TokenTypes.COMMAND, 'sqrt'),
            new Token(TokenTypes.OPERATOR, '{'),
            new Token(TokenTypes.OPERATOR, '('),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, '*'),
            new Token(TokenTypes.NUMBER, '20'),
            new Token(TokenTypes.OPERATOR, ')'),
            new Token(TokenTypes.OPERATOR, '}'),
        ];
        const parser = new Parser(tokens);
        const ast = parser.parse();
        expect(ast).toEqual(new CommandNode('sqrt',
            new GroupNode(
                new BinaryOperationNode(
                    new NumberNode(20), '*',
                    new NumberNode(20)))));
        });

        it('Allgebraic expression', () => {
            const tokens = [
                new Token(TokenTypes.NUMBER, '6'),
                new Token(TokenTypes.OPERATOR, '('),
                new Token(TokenTypes.NUMBER, '1'),
                new Token(TokenTypes.OPERATOR, '+'),
                new Token(TokenTypes.NUMBER, '1'),
                new Token(TokenTypes.OPERATOR, ')')
            ];
            const parser = new Parser(tokens);
            const ast = parser.parse();
            expect(ast).toEqual(new BinaryOperationNode(
                new NumberNode(6), '*',
                new GroupNode(
                    new BinaryOperationNode(
                        new NumberNode(1), '+',
                        new NumberNode(1)))));
        });

        it('Identifier pi', () => {
            const tokens = [new Token(TokenTypes.COMMAND, 'PI')];
            const parser = new Parser(tokens);
            const ast = parser.parse();
            expect(ast).toEqual(new CommandNode('PI'));
        });

        it('sine in degrees', () => {
            const tokens = [new Token(TokenTypes.COMMAND, 'sin'),
                new Token(TokenTypes.OPERATOR, '{'),
                new Token(TokenTypes.COMMAND, 'degrees'),
                new Token(TokenTypes.NUMBER, '45'),
                new Token(TokenTypes.OPERATOR, '}')
            ];
            const parser = new Parser(tokens);
            const ast = parser.parse();
            expect(ast).toEqual(new CommandNode('sin',
                new NumberNode(45), true));
        });
});
