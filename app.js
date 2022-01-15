const keyboard = document.querySelector('.keyboard')
const display = document.querySelector('.display-nums')

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
  }[operator] ?? 'Erro'
}

display.textContent = 0

const renderCalculation = () => {
  display.textContent = `${firstInput} ${operator} ${secondInput}`
}


keyboard.addEventListener('click', e => {
  const isPressedButtonANumber = e.target.dataset.js === 'number' 
  const isPressedButtonAOperator = e.target.dataset.js === 'operation'

  if (isPressedButtonANumber && !operator) {
    firstInput += e.target.textContent
    firstInput = parseInt(firstInput).toFixed(0)
    renderCalculation()
  }

  if (isPressedButtonAOperator && firstInput) {
    operator = e.target.textContent
    renderCalculation()
  }
  
  if (isPressedButtonAOperator && secondInput) {
    firstInput = getResult(firstInput, operator, secondInput)
    secondInput = ''
    operator = e.target.textContent
    renderCalculation()
  }

  if (e.target.dataset.js === 'number' && operator) {
    secondInput += e.target.textContent
    renderCalculation()
  }

  if (e.target.dataset.js === 'result' && secondInput) {
    firstInput = getResult(firstInput, operator, secondInput)
    console.log(firstInput)
    secondInput = ''
    operator = ''
    renderCalculation()
  }

  if (e.target.dataset.js === 'clear') {
    firstInput = 0
    secondInput = ''
    operator = ''
    display.textContent = firstInput
  }

  if (e.target.dataset.js === 'delete' && operator && secondInput) {
    secondInput = secondInput.length > 1
      ? secondInput.slice(0, -1)
      : ''
      
    renderCalculation()
    return
  }

  if (e.target.dataset.js === 'delete' && operator) {
    operator = ''
    renderCalculation()
    return
  }

  if (e.target.dataset.js === 'delete') {
    firstInput = String(firstInput)
    firstInput = firstInput.length > 1
      ? firstInput.slice(0, -1)
      : 0
    display.textContent = `${firstInput}`
  }
})