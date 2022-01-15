const keyboard = document.querySelector('.keyboard')
const display = document.querySelector('.display')

let firstInput = ''
let operator = ''
let secondInput = ''
let result = ''

const getResult = (firstInput, operator, secondInput) => {
  const firstNumber = Number(firstInput)
  const secondNumber = Number(secondInput)

  return { 
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '/': firstNumber / secondNumber,
    '*': firstNumber * secondNumber,
    '%': (firstNumber / 100) * secondNumber
  }[operator] || 'Erro'
}

display.textContent = 0

keyboard.addEventListener('click', e => {

  if (e.target.dataset.js === 'number' && !operator) {
    firstInput += e.target.textContent
    display.textContent = `${firstInput} ${operator} ${secondInput}`
  }

  if (e.target.dataset.js === 'operation' && firstInput) {
    operator = e.target.textContent
    display.textContent = `${firstInput} ${operator} ${secondInput}`
  }
  
  if (e.target.dataset.js === 'operation' && secondInput) {
    firstInput = getResult(firstInput, operator, secondInput)
    secondInput = ''
    operator = e.target.textContent
    display.textContent = `${firstInput} ${operator} ${secondInput}`
  }

  if (e.target.dataset.js === 'number' && operator) {
    secondInput += e.target.textContent
    display.textContent = `${firstInput} ${operator} ${secondInput}`
  }

  if (e.target.dataset.js === 'result' && secondInput) {
    firstInput = getResult(firstInput, operator, secondInput)
    secondInput = ''
    operator = ''
    display.textContent = `${firstInput} ${operator} ${secondInput}`
  }

  if (e.target.dataset.js === 'clear') {
    firstInput = ''
    secondInput = ''
    operator = ''
    display.textContent = 0
  }
})