const display = document.querySelector('.display')
const buttons =document.querySelector('.buttons')

const state = (() => {
  let firstInput =  ''
  let operation = ''
  let secondInput =  ''
  let result = ''

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
      if (!operation) {
        firstInput += input
        this.renderOperation()
        return
      }

      secondInput += input
      this.renderOperation()
    },
    setOperation (input) {
      if (!operation) {
        operation = input
        this.renderOperation()
        return
      }

      firstInput = getResult(firstInput, secondInput, operation)
      operation = input
      secondInput = ''
      this.renderOperation()
    },
    renderOperation () {
      const firstInput = this.getFirstInput()
      const operation = this.getOperation()
      const secondInput = this.getSecondInput()
      display.textContent = `${firstInput} ${operation} ${secondInput}`
    },
    renderResult () {
      result = getResult(firstInput, secondInput, operation)
      display.textContent = result
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
    '/': firstInput / 2,
    '*': firstInput * secondInput,
    '-': firstInput - secondInput,
    '+': firstInput + secondInput,
    }[operation]
}

buttons.addEventListener('click', e => {
  const clickedElement = e.target

  if (clickedElement.dataset.js === 'number') {
    state.setInputs(clickedElement.textContent)
  }

  if (clickedElement.dataset.js === 'operation') {
    state.setOperation(clickedElement.dataset.operation)
  }

  if (clickedElement.dataset.js === 'clear') {
    state.clearOperation()
  }

  if (clickedElement.dataset.js === 'result') {
    state.renderResult()
  }
  
})