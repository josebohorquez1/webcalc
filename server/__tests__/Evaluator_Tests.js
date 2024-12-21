const {NumberNode, DecimalNode, CommandNode, BinaryOperationNode, UnaryOperationNode, GroupNode} = require('../components/Ast');
const {Evaluator} = require('../components/Evaluator');

describe('Evaluator tests', () => {
    it('Addition', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '+',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(2);
    });

    it('Subtraction', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '-',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(0);
    });

    it('Multiplication', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '*',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(1);
    });

    it('Division', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '/',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(1);
    });

    it('Modulus', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '%',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(0);
    });

    it('Exponentiation', () => {
        const ast  = new BinaryOperationNode(
            new NumberNode(1), '^',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(1);
    });

    it('Negative integer', () => {
        const ast = new UnaryOperationNode('-', new NumberNode(3));
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(ast);
        expect(res).toEqual(-3);
    });

    it('Negative expression', () => {
        const ast = new BinaryOperationNode(
            new UnaryOperationNode('-', 
                new NumberNode(3)
            ), '+',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(-2);
    });

    it('Negative decimal expression', () => {
        const ast = new BinaryOperationNode(
            new UnaryOperationNode('-', 
                new DecimalNode(3.5)
            ), '+',
            new NumberNode(1));
            const evaluator = new Evaluator;
            const res = evaluator.Evaluate(ast);
            expect(res).toEqual(-2.5);
    });

    it('Factorial', () => {
        const evaluator  = new Evaluator;
        const res = evaluator.Evaluate(new UnaryOperationNode('!',
            new NumberNode(5)));
            expect(res).toEqual(120);
    });

    it('Factorial expression', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new BinaryOperationNode(
            new UnaryOperationNode('!', 
                new NumberNode(5)), '*',
                new UnaryOperationNode('!',
                    new NumberNode(5))));
                    expect(res).toEqual(14400)
    });

    it('Expression with multiple operators', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new BinaryOperationNode(
            new NumberNode(2), '+',
            new BinaryOperationNode(
                new NumberNode(3), '*',
                new NumberNode(5))));
                expect(res).toEqual(17);
    });

    it('Decimal expression with multiple operators', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new BinaryOperationNode(
            new DecimalNode(2.5), '+',
            new BinaryOperationNode(
                new DecimalNode(3.4), '*',
                new NumberNode(5))));
                expect(res).toEqual(19.5);
    });

    it('Simple parenthesis expression', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new GroupNode(
            new BinaryOperationNode(
                new NumberNode(1), '+',
                new NumberNode(2))));
                expect(res).toEqual(3);
    });

    it('Parenthesis expression with multiple operators', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new BinaryOperationNode(
            new GroupNode(
                new BinaryOperationNode(
                    new NumberNode(3), '+',
                    new NumberNode(5))), '/',
            new NumberNode(7)));
            expect(res).toEqual(Math.round((8/ 7) * Math.pow(10, 13)) / Math.pow(10, 13));
    });

    it('Multileve parenthesis expression', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new GroupNode(
            new BinaryOperationNode(
                new NumberNode(3), '*',
                new GroupNode(
                    new BinaryOperationNode(
                        new NumberNode(3), '+',
                        new NumberNode(5))))));
                        expect(res).toEqual(24);
    });

    it('simple square root', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('sqrt', new NumberNode(100)));
        expect(res).toEqual(10);
    });

    it('simple log', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('log', new NumberNode(100)));
        expect(res).toEqual(2);
    });

    it('Simple square root expression', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('sqrt', new BinaryOperationNode(
            new NumberNode(20), '*',
            new NumberNode(20))));
            expect(res).toEqual(20);
    });

    it('Square root expression with parenthesis', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('sqrt', new BinaryOperationNode(
            new NumberNode(3), '*',
            new GroupNode(
                new BinaryOperationNode(
                    new NumberNode(20), '*',
                    new NumberNode(20))))));
                    expect(res).toEqual(Math.sqrt(1200));
    });

    it('Identifier PI', () => {
        const evaluator = new Evaluator;
        const result = evaluator.Evaluate(new CommandNode('PI'));
        expect(result).toEqual(Math.PI);
    });

    it('Identifier E', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('E'));
        expect(res).toEqual(Math.E);
    });

    it('Sin with radians', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('sin',
            new BinaryOperationNode(
                new NumberNode(2), '*',
                new CommandNode('PI'))));
                expect(res).toEqual(0);
    });

    it('Sin in degrees', () => {
        const evaluator = new Evaluator;
        const res = evaluator.Evaluate(new CommandNode('sin', new NumberNode(360), true));
        expect(res).toEqual(0);
    });
});