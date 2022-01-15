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
  const isPressedButtonEquals = e.target.dataset.js === 'result'
  const isPressedButtonClear = e.target.dataset.js === 'clear'
  const isPressedButtonDel = e.target.dataset.js === 'delete'

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

  if (isPressedButtonANumber && operator) {
    secondInput += e.target.textContent
    renderCalculation()
  }

  if (isPressedButtonEquals && secondInput) {
    firstInput = getResult(firstInput, operator, secondInput)
    secondInput = ''
    operator = ''
    renderCalculation()
  }

  if (isPressedButtonClear) {
    firstInput = 0
    secondInput = ''
    operator = ''
    display.textContent = firstInput
  }

  if (isPressedButtonDel && operator && secondInput) {
    secondInput = secondInput.length > 1
      ? secondInput.slice(0, -1)
      : ''
      
    renderCalculation()
    return
  }

  if (isPressedButtonDel && operator) {
    operator = ''
    renderCalculation()
    return
  }

  if (isPressedButtonDel) {
    firstInput = String(firstInput)
    firstInput = firstInput.length > 1
      ? firstInput.slice(0, -1)
      : 0
    display.textContent = `${firstInput}`
  }
})