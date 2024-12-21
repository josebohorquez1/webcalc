class NumberNode {
    constructor(value) {
        this.value = value;
    }
}

class DecimalNode {
    constructor(value) {
        this.value = value;
    }
}

class BinaryOperationNode {
    constructor(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

class UnaryOperationNode {
    constructor(operator, operand) {
        this.operator = operator;
        this.operand = operand;
    }
}

class CommandNode {
    constructor(command, expression = null, in_degrees = false) {
        this.command = command;
        this.expression = expression;
        this.in_degrees = in_degrees;
    }
}

class GroupNode {
    constructor(expression) {
        this.expression = expression;
    }
}

module.exports = {NumberNode, DecimalNode, CommandNode, BinaryOperationNode, UnaryOperationNode, GroupNode};
