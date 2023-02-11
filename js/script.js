const calcButtons = document.querySelectorAll('.calc-btn');
const calcClearButton = document.getElementById('calc-clear-btn');
const calcCommunicator = document.getElementById('calc-communicator');
const calcCurrentOperation = document.getElementById('calc-current-operation');
const calcNumberButtons = document.querySelectorAll('.calc-number-btn');
const calcOperatorButtons = document.querySelectorAll('.calc-operator-btn');

let x;
let operator;
let y;

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const factorial = (x) => {
    let product = 1;
    while (x > 0) {
        product *= x;
        --x;
    }
    return product;
};

function operate() {
    let solution;
    console.log(operator);

    switch (operator) {
        case 'x':
            solution = multiply(x, y);

            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
        case '÷':
            solution = divide(x, y);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
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
        // case '!':
        //     solution = factorial(x);
        //     calcCommunicator.textContent = solution;
        //     calcCurrentOperation.textContent = solution;
        //     break;
        // default:         
    }
}

function updateUserFeedBack(e) {
    let clickedBtn = e.target.getAttribute('data-type');

    if (+calcCommunicator.textContent === 0) calcCommunicator.textContent = '';
    if (+calcCurrentOperation.textContent === 0) calcCurrentOperation.textContent = '';

    if (clickedBtn === 'number' || clickedBtn === 'decimal') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;
    }
    
    if (clickedBtn === 'operator') {
        operator = e.target.textContent;
        x = +calcCurrentOperation.textContent;
        
        calcCurrentOperation.textContent += e.target.textContent;
        calcCommunicator.textContent = '0'; 

        // ! disable operator buttons 

    }

    if (clickedBtn === 'clear') {
        calcCommunicator.textContent = '0';
        calcCurrentOperation.textContent = '0';

        x = null;
        y = null;
        operator = null;
    }

    if (clickedBtn === 'factorial') {
        console.log(calcCommunicator.textContent);
        if (calcCommunicator.textContent !== '') {
            alert('there musn\'t be a number before the factorial');
            return;
        }
        calcCommunicator.textContent = '0';
        calcCurrentOperation.textContent += e.target.textContent;
    }

    if (clickedBtn === 'equals') {
        y = +calcCommunicator.textContent;
        console.log(`${x} ${operator} ${y}`);
        operate();

        // ! fix repetitive equal button press functionality

        // ! enable operator buttons
    }
}

calcButtons.forEach(button => button.addEventListener('click', updateUserFeedBack));
// window.addEventListener('keydown', calculate);