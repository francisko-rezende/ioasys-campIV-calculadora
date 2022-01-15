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
      if (firstInput && secondInput) {
        result = getResult(firstInput, secondInput, operation)
        firstInput = String(result)
        operation = input
        secondInput = ''
        return
      }
      operation = input
      this.renderOperation()
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
    handleBackspace () {
      if (secondInput) {
        secondInput = secondInput.slice(0, -1)
        this.renderOperation()
        return
      }

      if (operation) {
        operation = ''
        this.renderOperation()
        return
      }

      if (firstInput) {
        firstInput = firstInput.length !== 1 
          ? firstInput.slice(0, -1)
          : '0'
          this.renderOperation()
      }
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
  const isClickedElementANumber = clickedElement.dataset.js === 'number'
  const isClickedElementAOperation = clickedElement.dataset.js === 'operation'
  const isClickedElementClear = clickedElement.dataset.js === 'clear'
  const isClickedElementResult = clickedElement.dataset.js === 'result'
  


  if (isClickedElementANumber) {
    const number = clickedElement.textContent
    state.setInputs(number)
    state.renderOperation()
  }

  if (isClickedElementAOperation && state.getFirstInput()) {
    const operation = clickedElement.dataset.operation
    state.setOperation(operation)
    state.renderOperation()
  }

  if (isClickedElementClear) {
    state.clearOperation()
  }

  if (isClickedElementResult) {
    state.renderResult()
  }

  if (clickedElement.dataset.js === 'delete') {
    state.handleBackspace()
  }

  state.logVars()

  console.log(clickedElement.textContent)
})