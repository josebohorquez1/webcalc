const {Lexer} = require('../components/Lexer');
const {Parser} = require('../components/Parser');
const {Evaluator} = require('../components/Evaluator');

/**
 * Creates a test callback function for Jest.
 * @param {string} input - The input expression to evaluate.
 * @param {number} expected - The expected result of the evaluation.
 * @returns {Function} A function to be executed by Jest.
 */
const test = (input, expected) => () => {
    const lexer = new Lexer(input);
    const tokens = lexer.lex();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const evaluator = new Evaluator;
    const res = evaluator.Evaluate(ast);
    expect(res).toEqual(expected);
};

describe('End-to-End Solution Tests', () => {
    it('Addition', test('1+1', 2));
    it('Subtraction', test('1-1', 0));
    it('Multiplication', test('20*20', 400));
    it('Division', test('20/5', 4));
    it('Modulus', test('16%2', 0));
    it('Exponentiation', test('5^3', 125));
    it('Negative expression', test('-3+1', -2));
    it('Complete negative expression', test('-5-3', -8));
    it('Complete negative subtraction expression', test('-5--4', -1));
    it('Decimal addition', test('3.4+5.5', 8.9));
    it('Decimal subtraction', test('3.4-5.5', -2.1));
    it('Decimal multiplication', test('3.4*5.5', 18.7));
    it('Decimal division', test('3.4/5.5', Math.round((3.4 / 5.5) * Math.pow(10, 13)) / Math.pow(10, 13)));
    it('Decimal negative expression', test('-3.4+5.5', 2.1));
    it('Factorial', test('5!', 120));
    it('Factorial addition', test('5!+5!', 240));
    it('Factorial multiplication', test('5!*5!', 14400));
    it('Factorial devision', test('5!/5!', 1));
    it('Expression with multiple operators', test('3+4*5', 23));
    it('Decimal expression with multiple operators', test('3.3+4.4*5.5', 27.5));
    it('Division including floating percision', test('2/3', 0.6666666666667));
    it('Simple parenthesis expression', test('(2+1)', 3));
    it('Parenthesis expression with multiple operators', test('(3+5)/7', Math.round((8 / 7) * Math.pow(10, 13)) / Math.pow(10, 13)));
    it('Multilevel parenthesis expression', test('(3*(3+5))', 24));
    it('Simple square root', test('sqrt{25}', 5));
    it('Simple log', test('log{10}', 1));
    it('Log with differing base', test('log{9}/log{3}', 2));
    it('Square root expression', test('\sqrt{20*5}', 10));
    it('Identifier PI', test('PI', Math.PI));
    it('Identifier E', test('E', Math.E));
    it('Sin with radians', test('sin{2*PI}', 0));
    it('Cos with radians', test('cos{2*PI}', 1));
    it('Sin in degrees', test('sin{degrees 0}', 0));
    it('Cos in degrees', test('cos{degrees 0}', 1));
    it('Simple natural log', test('ln{1}', 0));
    it('Natural log and E', test('ln{E}', 1));
    it('Absolute value', test('abs{-5}', 5));
});