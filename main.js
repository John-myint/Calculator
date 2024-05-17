document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelector('.calculator-keys');
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let shouldResetDisplay = false;

    keys.addEventListener('click', function(event) {
        const target = event.target;
        const action = target.dataset.action;
        const value = target.textContent;

        if (!target.matches('button')) {
            return;
        }

        if (!action) {
            appendNumber(value);
        } else if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteNumber();
        } else if (action === 'operation') {
            setOperation(value);
        } else if (action === 'equal') {
            calculate();
        }
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (!isNaN(key) || key === '.') {
            appendNumber(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // Prevent form submission if inside a form
            calculate();
        } else if (key === 'Backspace') {
            deleteNumber();
        } else if (key === 'Escape') {
            clear();
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperation(key);
        }
    });

    function appendNumber(number) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function clear() {
        currentInput = '0';
        operator = null;
        previousInput = '';
        shouldResetDisplay = false;
        updateDisplay();
    }

    function deleteNumber() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    function setOperation(operation) {
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        operator = operation;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                currentInput = (prev + current).toString();
                break;
            case '-':
                currentInput = (prev - current).toString();
                break;
            case '*':
                currentInput = (prev * current).toString();
                break;
            case '/':
                currentInput = (prev / current).toString();
                break;
            default:
                return;
        }
        operator = null;
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    clear(); // Initialize display
});
