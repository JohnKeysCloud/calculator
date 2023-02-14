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
            solution = factorial(y);
            calcCommunicator.textContent = solution;
            calcCurrentOperation.textContent = solution;
            break;
        
    }
}

function updateUserFeedBack(e) {
    let clickedBtn = e.target.getAttribute('data-type');
    let operatorBtns = document.querySelectorAll('button[data-type=\'operator\']');

    if (+calcCommunicator.textContent === 0) calcCommunicator.textContent = '';
    if (+calcCurrentOperation.textContent === 0) calcCurrentOperation.textContent = '';

    if (clickedBtn === 'number' || clickedBtn === 'decimal') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;
    }
    
    if (clickedBtn === 'operator') {
        let factorialBtn = e.target.textContent === '!';

        if (factorialBtn) {
                operator = e.target.textContent;

            if (calcCommunicator.textContent !== '') {
                let currentCalcText = calcCurrentOperation.textContent;
                
                calcCommunicator.textContent = `-${currentCalcText}`;
                calcCurrentOperation.textContent = `!${currentCalcText}`;
                return
            }
        }
        
        operator = e.target.textContent;
        x = +calcCurrentOperation.textContent;
        
        calcCurrentOperation.textContent += e.target.textContent;
        calcCommunicator.textContent = '0'; 

        operatorBtns.forEach(button => button.setAttribute('disabled', ''));
    }

    if (clickedBtn === 'clear') {
        calcCommunicator.textContent = '0';
        calcCurrentOperation.textContent = '0';

        x = null;
        y = null;
        operator = null;

        operatorBtns.forEach((button) => button.removeAttribute('disabled', ''));
    }

    if (clickedBtn === 'equals') {
        y = +calcCommunicator.textContent;

        console.log(`${x} ${operator} ${y}`);
        // ! fix repetitive equal button press functionality
        // ? counter variable for times clicked maybe?

        operate();

        operatorBtns.forEach((button) => button.removeAttribute('disabled', ''));
    }

    if (clickedBtn === 'toggle') {
        let currentNumber = calcCommunicator.textContent;
        let negativeNumber = `-${calcCommunicator.textContent}`;
        let negativeSymbol = '-';


        if (currentNumber === '') {
            calcCommunicator.textContent = '0';
            calcCurrentOperation.textContent = '0';
            return
        }

        // !
        // ! BELOW
        // !

        if (currentNumber.indexOf(negativeSymbol) === 0) {
            calcCommunicator.textContent = calcCommunicator.textContent.slice(1);
            calcCurrentOperation.textContent = calcCommunicator.textContent;

            return;
        }

        // ? find index of operator by splitting string .. then slice number the after operator and prepend the negative symbol using template literal

        calcCommunicator.textContent = negativeNumber;
        calcCurrentOperation.textContent = negativeNumber;
    }
}

calcButtons.forEach(button => button.addEventListener('click', updateUserFeedBack));
// window.addEventListener('keydown', calculate);