const calcButtons = document.querySelectorAll('.calc-btn');
const calcCommunicator = document.getElementById('calc-communicator');
const calcCurrentOperation = document.getElementById('calc-current-operation');

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const factorial = (n) => {
    let product = 1;
    while (n > 0) {
        product *= n;
        --n;
    }
    return product;
};

function operate(e) {
    console.log(e);
    // calcCommunicator.textContent += e.target.getAttribute('data-button');
    // calcCurrentOperation.textContent += e.target.getAttribute('data-button');
}

calcButtons.forEach(button => button.addEventListener('click', operate));
// window.addEventListener('keydown', calculate);