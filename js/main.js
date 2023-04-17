const monitor = document.getElementsByClassName("result-value")[0];
const clearAllBtn = document.getElementsByClassName("clear")[0];
const number = document.getElementsByClassName("numbers");
const operator = document.getElementsByClassName("operator-btn");
const equal = document.getElementsByClassName("equal")[0];



let firstValue = "";
let secondValue = "";
let operatorValue = "";
let resultValue = "";
let isClearmonitor = false;
let isClearAll = false;

const clearAll = () => {
    firstValue = "";
    secondValue = "";
    operatorValue = "";
    resultValue = "";
    monitor.textContent = "0";
    isClearmonitor = false;
    isClearAll = false;
};

clearAllBtn.addEventListener("click", clearAll);

Array.from(number).forEach(numberButton => {
    numberButton.addEventListener("click", (e) => {
        const value = e.target.textContent;
        let currentmonitorText = monitor.textContent;

        if (isClearAll) {
            clearAll();
            currentmonitorText = "0";
        }

        if (isClearmonitor) {
            currentmonitorText = "0";
            isClearmonitor = false;
        }

        if (currentmonitorText === "0") {
            if (value === "0") {
                return;
            }

            if (value === ".") {
                monitor.textContent = "0.";
                return;
            }

            if (value !== "0") {
                monitor.textContent = value;
                return;
            }
        }

        if (currentmonitorText.includes(".") && value === ".") {
            return;
        }

        monitor.textContent += value;
    });
});

Array.from(operator).forEach(operatorButton => {
    operatorButton.addEventListener("click", (e) => {
        const value = monitor.textContent;
        //operatorValue = e.target.textContent;

        if (resultValue) {
            firstValue = resultValue;
            secondValue = "0";
            resultValue = "";
            isClearAll = false;
        }

        else if (firstValue === "") {
            firstValue = parseFloat(value);
        }

        else {
            firstValue = calculate(firstValue, parseFloat(value), operatorValue);
            monitor.textContent = firstValue;
        }

        operatorValue = e.target.textContent;
        console.log(operatorValue);
        isClearmonitor = true;
    });
});

equal.addEventListener("click", (e) => {

    if (firstValue) {
        secondValue = parseFloat(monitor.textContent);

        if (operatorValue === "") {
            secondValue = firstValue;
        }

        resultValue = calculate(firstValue, secondValue, operatorValue);
    }

    else {
        resultValue = firstValue;
    }

    monitor.textContent = resultValue;
    isClearAll = true;
});

const calculate = (firstNumber, secondNumber, operator) => {
    let result = null;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    if (operator === "-") {
        result = firstNumber - secondNumber;
    }

    if (operator === "*") {
        result = firstNumber * secondNumber;
    }

    if (operator === "/") {
        result = firstNumber / secondNumber;
    }

    console.log(firstNumber, operator, secondNumber, result);
    return result;
};