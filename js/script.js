const C = document.querySelector('#calc-clear-btn > picture');
const calcButtons = document.querySelectorAll('.calc-btn');
const calcClearButton = document.getElementById('calc-clear-btn');
const calcCommunicator = document.getElementById('calc-communicator');
const calcCurrentOperation = document.getElementById('calc-current-operation');
const calcNumberButtons = document.querySelectorAll('.calc-number-btn');
const calcOperatorButtons = document.querySelectorAll('.calc-operator-btn');
const calcEqualsBtn = document.getElementById('calc-equals-btn');

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
    let solution = null;

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

    if (isNaN(solution)) {
        alert('The number is too large 😮');
        calcClearButton.click();

        if (calcEqualsBtn.getAttribute('disabled')) calcEqualsBtn.removeAttribute('disabled', '');
    }
}

function updateUserFeedBack(e) {
    let clickedBtn = e.target.getAttribute('data-type');
    let decimalBtn = document.getElementById('calc-decimal-btn');
    let factorialBtn = document.getElementById('calc-factorial-btn');
    let operatorBtns = document.querySelectorAll('button[data-type="operator"]');
    let toggleBtn = document.querySelector('button[data-type="toggle"]');

    if (+calcCommunicator.textContent === 0) calcCommunicator.textContent = '';
    if (+calcCurrentOperation.textContent === 0) calcCurrentOperation.textContent = '';

    if (clickedBtn === 'number') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;

        calcEqualsBtn.removeAttribute('disabled', '');
        toggleBtn.removeAttribute('disabled', '');
    }

    if (clickedBtn === 'decimal') {
        calcCommunicator.textContent += e.target.textContent;
        calcCurrentOperation.textContent += e.target.textContent;
        decimalBtn.setAttribute('disabled', '');
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
                
                calcCommunicator.textContent = `${numberOnly}!`;
                calcCurrentOperation.textContent = `${numberOnly}!`;

                x = +calcCurrentOperation.textContent.slice(0, calcCurrentOperation.textContent.length - 1)

                decimalBtn.setAttribute('disabled', '');
                calcEqualsBtn.removeAttribute('disabled', '');
                operatorBtns.forEach(button => button.setAttribute('disabled', ''));
                toggleBtn.setAttribute('disabled', '');
                
                if (calcCommunicator.textContent <= 12) calcCommunicator.style.fontSize = '2.1875rem';

                return
            }
        }
        
        operator = e.target.textContent;
        x = +calcCurrentOperation.textContent;
        
        calcCurrentOperation.textContent += e.target.textContent;
        calcCommunicator.textContent = '0'; 

        decimalBtn.removeAttribute('disabled', '');
        calcEqualsBtn.setAttribute('disabled', '');
        operatorBtns.forEach(button => button.setAttribute('disabled', ''));   
        toggleBtn.setAttribute('disabled', '');

        if (calcCommunicator.textContent <= 12) calcCommunicator.style.fontSize = '2.1875rem';
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

            factorialBtn.removeAttribute('disabled', '');


            return;
        }
        
        calcCommunicator.textContent = negativeNumber;
        calcCurrentOperation.textContent = negativeNumber;    
        
        factorialBtn.setAttribute('disabled', '');
    }

    if (clickedBtn === 'equals') {
        if (calcCurrentOperation.textContent === '') {
            calcCommunicator.textContent = '0';
            calcCurrentOperation.textContent = '0';

            return;
        }

        y = +calcCommunicator.textContent;

        operate();
        
        decimalBtn.removeAttribute('disabled', '');
        calcEqualsBtn.setAttribute('disabled', '');
        operatorBtns.forEach((button) => button.removeAttribute('disabled', ''));
        toggleBtn.removeAttribute('disabled', '');
        
        if (calcCommunicator.textContent <= 12) calcCommunicator.style.fontSize = '2.1875rem';

        if (calcCommunicator.textContent.includes('-')) {
            factorialBtn.setAttribute('disabled', '');
        }

        if (calcCommunicator.textContent.includes('.')) {
            decimalBtn.setAttribute('disabled', '');
        }

        if (calcCurrentOperation.textContent.includes(Infinity) || calcCurrentOperation.textContent.includes(-Infinity)) {
            alert('TO iNF1NiTY && B3YOND™ ♾️💭');

            calcEqualsBtn.setAttribute('disabled', '');
            calcNumberButtons.forEach(button => button.setAttribute('disabled', ''));
            calcOperatorButtons.forEach(button => button.setAttribute('disabled', ''));
            decimalBtn.setAttribute('disabled', '');
            factorialBtn.setAttribute('disabled', '');
            toggleBtn.setAttribute('disabled', '');
            
            C.style.transform = 'scale(3.3) rotate(3turn)';
            C.style.filter = 'drop-shadow(0 0 8px var(--color-binky))';
        }
    }

    if (clickedBtn === 'clear') {
        if (calcCurrentOperation.textContent.includes(Infinity) || calcCurrentOperation.textContent.includes(-Infinity)) {
            C.style.transform = 'scale(1) rotate(0)';
            C.style.filter = 'none';
        }

        calcCommunicator.textContent = '0';
        calcCurrentOperation.textContent = '0';

        x = null;
        y = null;
        operator = null;
        solution = null;

        calcButtons.forEach((button) => button.removeAttribute('disabled', ''));

        calcCommunicator.style.fontSize = '2.1875rem';
    }

    if (calcCommunicator.textContent.length > 11) calcCommunicator.style.fontSize = '1.25rem';
}

function simulateClick(e) {
    if (e.key === '*') {
        let multiplyBtn = document.querySelector('button[data-key=\'x\']');

        multiplyBtn.click();

        return;
    }
    
    if (e.key === 'Enter') {
        calcEqualsBtn.click();
        return;
    }

    for (let i = 0; i < calcButtons.length; ++i) {        
        if (e.key === calcButtons[i].getAttribute('data-key')) {
            e.preventDefault();
            calcButtons[i].click();
        } 
    }
}

calcButtons.forEach(button => button.addEventListener('click', updateUserFeedBack));
window.addEventListener('keydown', simulateClick);