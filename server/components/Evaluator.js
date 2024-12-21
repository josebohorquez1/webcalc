const {NumberNode, DecimalNode, CommandNode, BinaryOperationNode, UnaryOperationNode, GroupNode} = require('./Ast');

class Evaluator {
    Evaluate(node) {
        if (node instanceof NumberNode) return node.value;
        if (node instanceof DecimalNode) return Math.round(node.value*100) / 100;
        if (node instanceof UnaryOperationNode) {
            const value = this.Evaluate(node.operand);
            switch (node.operator) {
                case '-':
                    return - value;
                    case '!':
                        return this.factorial(value);
                        default:
                            throw new Error(`Unsupported unary operator ${node.operator}`);
            }
        }
        if (node instanceof BinaryOperationNode) {
            const left = this.Evaluate(node.left);
            const right = this.Evaluate(node.right);
            switch (node.operator) {
                case '+':
                    return left + right;
                    case '-':
                        return left - right;
                        case '*':
                            return Math.round((left * right)* Math.pow(10, 13)) / Math.pow(10, 13);
                            case '/':
                                if (right === 0) throw new Error('Cannot divide by 0.');
                                return Math.round((left / right)* Math.pow(10, 13)) / Math.pow(10, 13);
                                case '%':
                                    return left % right;
                                    case '^':
                                        return Math.pow(left, right);
                                        default:
                                            throw new Error(`Unsupported binary operator: ${node.operator}`);
            }
        }
        if (node instanceof CommandNode) {
            let value;
            (node.expression === null) ? value = null : value = this.Evaluate(node.expression);
            switch (node.command) {
                case 'sqrt':
                    if (value < 0) throw new Error('Cannot compute square root of a negative number');
                    return Math.sqrt(value);
                    case 'log':
                        if (value <= 0) throw new Error('Logarithm is undefined for non-positive values');
                        return Math.log10(value);
                        case 'sin':
                            value = this.indegrees(value, node.in_degrees);
                            return this.handleTrig(Math.sin(value));
                            case 'cos':
                                value = this.indegrees(value, node.in_degrees);
                                return this.handleTrig(Math.cos(value));
                                case 'acos':
                                    value = this.indegrees(value, node.in_degrees);
                                    return this.handleTrig(Math.acos(value));
                                    case 'asin':
                                        value = this.indegrees(value, node.in_degrees);
                                        return this.handleTrig(Math.asin(value));
                                        case 'tan':
                                            value = this.indegrees(value, node.in_degrees);
                                            if (value === (Math.PI / 2) || value === (3 * (Math.PI / 2))) throw new Error('PI/2 and 3PI/2 Undefined for tangent function');
                                            return this.handleTrig(Math.tan(value));
                                            case 'cot':
                                                value = this.indegrees(value, node.in_degrees);
                                                if (value === 0 || value === Math.PI || value === (2 * Math.PI)) throw new Error('Undefined for cotangent function');
                                                return this.handleTrig(Math.cos(value) / Math.sin(value));
                                                case 'sec':
                                                    value = this.indegrees(value, node.in_degrees);
                                                    if (value === (Math.PI / 2) || value === (3 * (Math.PI / 2))) throw new  Error('Undefined for secant.');
                                                    return this.handleTrig(1 / Math.cos(value));
                                                    case 'csc':
                                                        value = this.indegrees(value, node.in_degrees);
                                                        if (value === 0 || value === Math.PI || value === (2 * Math.PI)) throw new Error('Undefined for cosecant function.');
                                                        return this.handleTrig(1 / Math.sin(value));
                                            case 'atan':
                                            value = this.indegrees(value, node.in_degrees);
                                            return this.handleTrig(Math.atan(value));
                                case 'ln':
                                    if (value <= 0) throw new Error('Natural log is undefined for non-positive values');
                                    return Math.log(value);
                                    case 'abs':
                                        return Math.abs(value);
                                    case 'E':
                                        return Math.E;
                                        case 'PI':
                                            return Math.PI;
                            default:
                                throw new Error(`Unsupported command: ${node.command}`);
            }
        }
        if (node instanceof GroupNode) {
            return this.Evaluate(node.expression);
        }
        throw new Error(`Unknown node type: ${node.constructor.name}`);
    }

    factorial(n) {
        if (n < 0) throw new Error('Factorial is not defined for negative numbers');
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    }

    indegrees(value, degree_mode = false) {
        if (degree_mode) {
            return value * (Math.PI / 180);
        }
        return value;
    }

    handleTrig(value) {
        const tollerance = 1e-10;
        return (Math.abs(value) < tollerance) ? 0 : value;
    }

        }

module.exports = {Evaluator};