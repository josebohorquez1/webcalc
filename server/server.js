
//Importing modules
const express = require('express');
const cors = require('cors');
const app = express();

//Setting up server environment
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//main root.
app.get('/', (req, res) => {
    res.send("Welcome to the calculator app.");
});

//Adding the modules need for calculation
const {Lexer} = require('./components/Lexer');
const {Parser} = require('./components/Parser');
const {Evaluator} = require('./components/Evaluator');

/**
 * Calculates the result given an input expression.
 * @param{string} input - The input expression to evaluate.
 * @returns {number} The result of the calculation.
*/
function calculate(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.lex();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const evaluator = new Evaluator();
    const result = evaluator.Evaluate(ast);
    return result;
}

app.post('/calculate', (req, res) => {
    const {expression} = req.body;
    if (!expression || typeof expression !== 'string') res.status(400).json({error: 'Expression must not be an empty string'});
    try {
        const result = calculate(expression);
        return res.status(200).json({expression: expression, result: result});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
