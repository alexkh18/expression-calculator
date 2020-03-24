function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {    
    function getSubExprFromPriorityBrackets() {
        const endIndex = expr.search(/\)/);
        let startIndex = expr.split(/\)/)[0];
            startIndex = endIndex - startIndex.split('').reverse().join('').search(/\(/);
        return expr.slice(startIndex, endIndex);
    }
    
    let openingBrackets = 0;
    let closingBrackets = 0;
    for (let i = 0; i < expr.length; i++) {
        switch (true) {
            case (expr[i] === '('): openingBrackets += 1;
                break;
            case (expr[i] === ')'): closingBrackets += 1;
                break;
        }
    }

    let priorityExpr = expr;
    if(openingBrackets !== closingBrackets){
        throw new Error("ExpressionError: Brackets must be paired");
    } else if (openingBrackets > 0) {
        priorityExpr = getSubExprFromPriorityBrackets();
        const calculatedExpr = calculate(priorityExpr);
        expr = expr.replace(`(${priorityExpr})`, calculatedExpr)
        return expressionCalculator(expr)
    }
    const result = calculate(priorityExpr);
    
    function calculate(currExprPart) {
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

        if(currExprPart.trim().includes(' ') === false) {
            currExprPart = currExprPart.replace(/(\*|\/|\+|\-)/g, ' $& ');
        }
        currExprPart = currExprPart.split(' ');
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
        return Number(currExprPart.join('').trim());
    }

return result
}

module.exports = {
    expressionCalculator
}

