const valueElement = document.getElementById("value");

const acButton = document.getElementById("clear");

const addButton = document.getElementById("addition");
const subButton = document.getElementById("subtraction");
const mulButton = document.getElementById("multiplication");
const divButton = document.getElementById("division");
const equalButton = document.getElementById("equal");

const decimalButton = document.getElementById("decimal");

const number0 = document.getElementById("number_0");
const number1 = document.getElementById("number_1");
const number2 = document.getElementById("number_2");
const number3 = document.getElementById("number_3");
const number4 = document.getElementById("number_4");
const number5 = document.getElementById("number_5");
const number6 = document.getElementById("number_6");
const number7 = document.getElementById("number_7");
const number8 = document.getElementById("number_8");
const number9 = document.getElementById("number_9");

const numberArray = [number0, number1, number2, number3, number4, number5, number6, number7, number8, number9];

//variables
let valueStrInMemory = null;
let operatorInMemory = null;

//functions
const getValueAsStr = () => valueElement.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueElement.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalNumStr] = valueStr.split('.');
    //console.log(wholeNumStr, decimalNumStr);

    if (decimalNumStr) {
        valueElement.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalNumStr;
    }
    else {
        valueElement.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
}

const handleNumberClick = (numStr) => {
    //console.log(numStr);
    const currentValueStr = getValueAsStr();
    if (currentValueStr === "0") {
        setStrAsValue(numStr);
    }
    else {
        setStrAsValue(currentValueStr + numStr);
    }
};

const getResultofOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    }
    else if (operatorInMemory === 'subtraction') {
        newValueNum = valueNumInMemory - currentValueNum;
    }
    else if (operatorInMemory === 'multiplication') {
        newValueNum = valueNumInMemory * currentValueNum;
    }
    else if (operatorInMemory === 'division') {
        newValueNum = valueNumInMemory / currentValueNum;
    }
    console.log(newValueNum);
    return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueStrInMemory = getResultofOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
};


//Add event listener to functions
acButton.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

//Add event listener to operator
addButton.addEventListener('click', () => {
    handleOperatorClick('addition');
});
subButton.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});
mulButton.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});
divButton.addEventListener('click', () => {
    handleOperatorClick('division');
});
equalButton.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultofOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});


//Add event listener to numbers & decimal
for (let i = 0; i < numberArray.length; i++) {
    const numberElement = numberArray[i];
    numberElement.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalButton.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
})