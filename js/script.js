const calcButtons = document.querySelectorAll('.calc-btn');
const calcClearButton = document.getElementById('calc-clear-btn');
const calcCommunicator = document.getElementById('calc-communicator');
const calcCurrentOperation = document.getElementById('calc-current-operation');
const calcNumberButtons = document.querySelectorAll('.calc-number-btn');
const calcOperatorButtons = document.querySelectorAll('.calc-operator-btn');

let x;
let operator;
let y;
let counter = 0;

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const factorial = (y) => {
    let product = 1;
    while (y > 0) {
        product *= y;
        --y;
    }
    return product;
};

function operate() {
    let solution;

    switch (operator) {
        case 'x':
            solution = multiply(x, y);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
        case '÷':
            if (y === 0) {
                alert('You can\'t do that mf 😤');
                calcCommunicator.textContent = '0';
                calcCurrentOperation.textContent = '0';
            } else {
                solution = divide(x, y);
                calcCommunicator.textContent = solution;
                calcCurrentOperation.textContent = solution;
            }
            break;
        
        case '+':
            solution = add(x, y);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
        case '-':
            solution = subtract(x, y);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
        case '!':
            solution = factorial(x);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
    }
}

function updateUserFeedBack(e) {
    let clickedBtn = e.target.getAttribute('data-type');
    let operatorBtns = document.querySelectorAll('button[data-type="operator"]');
    let toggleBtn = document.querySelector('button[data-type="toggle"]');

    if (+calcCommunicator.textContent === 0) calcCommunicator.textContent = '';
    if (+calcCurrentOperation.textContent === 0) calcCurrentOperation.textContent = '';

    // * REFACTOR: make switch statement using clickedBtn
    // * REFACTOR: make switch statement using clickedBtn
    // * REFACTOR: make switch statement using clickedBtn

    if (clickedBtn === 'number') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;

        toggleBtn.removeAttribute('disabled', '');
    }

    if (clickedBtn === 'decimal') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;
    }
    
    if (clickedBtn === 'operator') {
        let factorialBtn = e.target.textContent === '!';

        if (calcCommunicator.textContent === '') {
            calcCommunicator.textContent = '0';
            calcCurrentOperation.textContent = '0';
            return;
        } 

        if (factorialBtn) {
            operator = e.target.textContent;

            if (calcCommunicator.textContent === '0') return;

            if (calcCommunicator.textContent !== '') {
                let numberOnly = calcCurrentOperation.textContent;
                
                calcCommunicator.textContent = `!${numberOnly}`;
                calcCurrentOperation.textContent = `!${numberOnly}`;

                x = +calcCurrentOperation.textContent.slice(1);

                operatorBtns.forEach(button => button.setAttribute('disabled', ''));
                toggleBtn.setAttribute('disabled', '');
                return
            }
        }
        
        operator = e.target.textContent;
        x = +calcCurrentOperation.textContent;
        
        calcCurrentOperation.textContent += e.target.textContent;
        calcCommunicator.textContent = '0'; 

        toggleBtn.setAttribute('disabled', '');
        operatorBtns.forEach(button => button.setAttribute('disabled', ''));   
    }

    if (clickedBtn === 'toggle') {
        let currentNumber = calcCommunicator.textContent;
        let negativeNumber = `-${calcCommunicator.textContent}`;
        let negativeSymbol = '-';

        if (currentNumber === '') {
            calcCommunicator.textContent = '0';
            calcCurrentOperation.textContent = '0';
            return;
        }

        if (calcCurrentOperation.textContent.indexOf(operator) !== -1) {
            let slicedExpression = calcCurrentOperation.textContent.slice(0, calcCurrentOperation.textContent.indexOf(operator) + 1);
            let concatenatedExpression = `${slicedExpression}${negativeNumber}`;
            
            if (calcCommunicator.textContent.indexOf(negativeSymbol) === 0) { 
                calcCommunicator.textContent = calcCommunicator.textContent.slice(1);
                calcCurrentOperation.textContent = `${slicedExpression}${currentNumber.slice(1)}`;

                return;
            };

            calcCommunicator.textContent = negativeNumber;
            calcCurrentOperation.textContent = concatenatedExpression;

            return;
        }

        if (calcCurrentOperation.textContent.indexOf(negativeSymbol) === 0) {
            let positiveNumber = calcCommunicator.textContent.slice(1);
            calcCommunicator.textContent = positiveNumber;
            calcCurrentOperation.textContent = calcCommunicator.textContent;

            return;
        }

        calcCommunicator.textContent = negativeNumber;
        calcCurrentOperation.textContent = negativeNumber;
    }

    if (clickedBtn === 'equals') {
        if (calcCurrentOperation.textContent === '') {
            calcCommunicator.textContent = '0';
            calcCurrentOperation.textContent = '0';

            return;
        }

        y = +calcCommunicator.textContent;

        
        // ! FIX: repetitive equal button press functionality
        // ! FIX: repetitive equal button press functionality
        // ! FIX: repetitive equal button press functionality
        // ? USING COUNTER VARIABLE?
        console.log(`${x} ${operator} ${y}`);

        operate();

        operatorBtns.forEach((button) => button.removeAttribute('disabled', ''));
    }

    if (clickedBtn === 'clear') {
        calcCommunicator.textContent = '0';
        calcCurrentOperation.textContent = '0';

        x = null;
        y = null;
        operator = null;

        operatorBtns.forEach((button) => button.removeAttribute('disabled', ''));
    }
}

calcButtons.forEach(button => button.addEventListener('click', updateUserFeedBack));
// window.addEventListener('keydown', calculate);