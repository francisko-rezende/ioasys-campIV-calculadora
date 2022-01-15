const display = document.querySelector('.display')
const buttons =document.querySelector('.buttons')

const state = (() => {
  let firstInput =  ''
  let operation = ''
  let secondInput =  ''
  let result = 0

  return {
    getFirstInput () {
      return firstInput
    },
    getOperation () {
      return operation
    },
    getSecondInput () {
      return secondInput
    },
    setInputs (input) {
      if (firstInput === '0') {
        firstInput = input
        return
      }

      if (!operation) {
        firstInput +=input
        return
      }

      secondInput += input
    },
    setOperation (input) {
      if (!operation) {
        operation = input
        return
      }
      this.renderPartialResult(input)
    },
    renderResult () {
      if (firstInput && secondInput) {
        result = getResult(firstInput, secondInput, operation)
        this.clearOperation()
        firstInput = String(result)
        display.textContent = firstInput
      }
    },
    renderPartialResult(input) {
      result = getResult(firstInput, secondInput, operation)
      firstInput = String(result)
      operation = input
      secondInput = ''
    },
    renderOperation () {
      const firstInput = this.getFirstInput()
      const operation = this.getOperation()
      const secondInput = this.getSecondInput()
      display.textContent = `${firstInput} ${operation} ${secondInput}`
    },
    clearOperation() {
      firstInput =  ''
      operation = ''
      secondInput =  ''
      this.renderOperation()
      display.textContent = 0
    },
    logVars() {
      console.log(
        firstInput,
        operation,
        secondInput,
        result)
    }
  }
})()

const getResult = (firstInputStr, secondInputStr, operation) => {
  const firstInput = Number(firstInputStr)
  const secondInput = Number(secondInputStr)

  return { 
    '%': (firstInput / 100) * secondInput,
    '/': firstInput / secondInput,
    '*': firstInput * secondInput,
    '-': firstInput - secondInput,
    '+': firstInput + secondInput,
    }[operation]
}

buttons.addEventListener('click', e => {
  const clickedElement = e.target

  if (clickedElement.dataset.js === 'number') {
    state.setInputs(clickedElement.textContent)
    state.renderOperation()
  }

  if (clickedElement.dataset.js === 'operation') {
    state.setOperation(clickedElement.dataset.operation)
    state.renderOperation()
  }

  if (clickedElement.dataset.js === 'clear') {
    state.clearOperation()
  }

  if (clickedElement.dataset.js === 'result') {
    state.renderResult()
  }
  state.logVars()

  console.log(clickedElement.textContent)
})