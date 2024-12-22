import React, { useState, useEffect} from 'react';

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored_history = JSON.parse(localStorage.getItem('calculations')) || [];
        setHistory(stored_history);
    }, []);
    const handleInput = (e) => {
        let input = e.target.value;
        const valid_characters = /^[0-ga-zA-Z+\-*!/.()%^{}\s]*$/;
        if (!input) {
            setResult("Input cannot be empty.");
        }
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            setExpression(input);
            return;
        }
        if (input.length === 1 && (!/\d/.test(input[0]) && !/[a-zA-Z]+/.test(input[0]) && input[0] !== '(' && input[0] !== '-')) {
            setResult("First character must be a number, command,  a -, or parenthesis.");
            return;
        }
        if (!valid_characters.test(input.slice(-1))) {
            setResult("Invalid input.");
            return;
        }
        if (input.slice(-2, -1) === '(' && !/\d|\./.test(input.slice(-1))) {
            setResult('After an opening parenthesis, you must enter a number or a decimal.');
            return;
        }
        if (input.slice(-2, -1) === '.' && !/\d/.test(input.slice(-1))) {
            setResult('After a period, you must enter a number.');
            return;
        }
        if (/\d+\.\d+\./.test(input)) {
            setResult("Invalid decimal format.");
            return;
        }
        if (/[+\-%^*/]{2,}/.test(input)) {
            setResult("You cannot have consecutive operators.");
            return;
        }
        if (/[+\-*%^/]$/.test(input)) {
            setResult("Expression cannot end with an operator.");
            setExpression(input);
            return;
        }
        const openParentheses = (input.match(/\(/g) || []).length;
        const closeParentheses = (input.match(/\)/g) || []).length;
        if (openParentheses !== closeParentheses) {
            setResult("Parentheses must be balanced.");
            setExpression(input);
            return;
        }
        setResult('');
        setExpression(input);
    };

    const sendResult = async () => {
        if (!expression) {
            setResult("Error: input is empty.");
            return;
        }
        if (!/[+\-%^{}*!/]+/.test(expression)) {
            setResult("At least one operator must be present.");
            return;
        }
        if (/[a-zA-Z]+{\}/.test(expression)) {
            setResult("An empty command is present.");
            return;
        }
        const data = {expression: expression};
        try {
            const response = await fetch('http://localhost:5000/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const res = await response.json();
                setResult(res.result.toLocaleString());
                setExpression((Math.round((res.result) * Math.pow(10, 13)) / Math.pow(10, 13)).toLocaleString());
                const new_history = [...history, {expression: res.expression, result: res.result}];
                setHistory(new_history);
                localStorage.setItem('calculations', JSON.stringify(new_history));
            }
            else {
                const res = await response.json();
                setResult(`Error: ${res.message}`);
            }
        }
        catch (error) {
            setResult("Server error.");
        }
    };

    return (
        <div className="card shadow p-4">
            <div className="mb-3">
                <input
                type="text"
                className='form-control'
                placeholder="Enter expression, e.g., 3+5*2"
                value={expression}
                onInput={handleInput}
                required
                autoFocus
                />
                <button className="btn btn-primary w-100 mb-3" onClick={sendResult} disabled={result}>Calculate</button>
                <div className="alert alert-info text-center" role="alert">
                {result !== '' ? `Result: ${result}` : 'Enter an expression and press Calculate'}
                </div>
            </div>
        </div>
    );
};

export default Calculator;