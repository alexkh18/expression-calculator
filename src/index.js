function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
   let leftBrackets = 0;
   let rightBrackets = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            leftBrackets += 1;
        }
        if (expr[i] == ')') {
            rightBrackets += 1;
        }
    }

    if (leftBrackets !== rightBrackets) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let brackets;
    while (leftBrackets > 0) {
        if ((brackets = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) {
            for (let i = 0; i < brackets.length; i++) {
                let str = brackets[i].replace('(', '').replace(')', '');
                expr = expr.replace(brackets[i], calculate(str));
            }
        }
        leftBrackets -= 1;
    }
    return calculate(expr);
}

function calculate(expr) {

    function mathOperations(a, b, operationType){
        switch (operationType){
                case '+': return Number(a) + Number(b);
                case '-': return Number(a) - Number(b);
                case '/': return Number(a) / Number(b);
                case '*': return Number(a) * Number(b);
        }
    }

    function deleteEmptyArrCells(arr, i){
        arr.splice(i - 1, 1);
        arr.splice(i, 1);
    };

    let currExprPart = expr.split(' ');
    for (let i = 0; i < currExprPart.length; i++) {
        if (currExprPart[i] === "*") {
            currExprPart[i] = mathOperations( currExprPart[i - 1], currExprPart[i + 1], '*');
            deleteEmptyArrCells(currExprPart, i);
            i = i - 1;
        }
        if (currExprPart[i] === "/") {
            if (currExprPart[i + 1] === '0') {
                throw new TypeError('TypeError: Division by zero.');
            }
            currExprPart[i] = mathOperations( currExprPart[i - 1], currExprPart[i + 1], '/');
            deleteEmptyArrCells(currExprPart, i);
            i = i - 1;
        }
    }
    for (let i = 0; i < currExprPart.length; i++) {
        if (currExprPart[i] === "+") {
            currExprPart[i] = mathOperations( currExprPart[i - 1], currExprPart[i + 1], '+');
            deleteEmptyArrCells(currExprPart, i);
            i -= 1;
        }
        if (currExprPart[i] === "-") {
            currExprPart[i] = mathOperations( currExprPart[i - 1], currExprPart[i + 1], '-');
            deleteEmptyArrCells(currExprPart, i);
            i -= 1;
        }
    }
    return Number(currExprPart[0]);
}

module.exports = {
    expressionCalculator
}

