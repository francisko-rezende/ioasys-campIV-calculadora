const display = document.querySelector('.display-nums')
const keyboard =document.querySelector('.keyboard')

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
    handleOperation (input) {
      if (!operation) {
        operation = input
        return
      }
      this.handlePartialResult(input)
    },
    handleResult () {
      if (firstInput && secondInput) {
        result = getResult(firstInput, secondInput, operation)
        this.clearOperation()
        firstInput = String(result)
      }
    },
    handlePartialResult(input) {
      if (firstInput && secondInput) {
        this.handleResult()
        operation = input
        return
      }
      operation = input
    },
    updatedDisplayedInfo () {
      const firstInput = this.getFirstInput()
      const operation = this.getOperation()
      const secondInput = this.getSecondInput()
      display.textContent = `${firstInput} ${operation} ${secondInput}`
    },
    clearOperation() {
      firstInput =  ''
      operation = ''
      secondInput =  ''
      this.updatedDisplayedInfo()
      display.textContent = 0
    },
    handleBackspace () {
      if (secondInput) {
        secondInput = secondInput.slice(0, -1)
        this.updatedDisplayedInfo()
        return
      }

      if (operation) {
        operation = ''
        this.updatedDisplayedInfo()
        return
      }

      if (firstInput) {
        firstInput = firstInput.length !== 1 
          ? firstInput.slice(0, -1)
          : '0'
          this.updatedDisplayedInfo()
      }
    }
  }
})()

const getResult = (firstInputStr, secondInputStr, operation) => {
  const firstInput = Number(firstInputStr)
  const secondInput = Number(secondInputStr)

  return { 
    '%': (firstInput / 100) * secondInput,
    '÷': firstInput / secondInput,
    '×': firstInput * secondInput,
    '-': firstInput - secondInput,
    '+': firstInput + secondInput,
    }[operation]
}

keyboard.addEventListener('click', e => {
  const clickedElement = e.target
  const isClickedElementANumber = clickedElement.dataset.js === 'number'
  const isClickedElementAOperation = clickedElement.dataset.js === 'operation'
  const isClickedElementClear = clickedElement.dataset.js === 'clear'
  const isClickedElementResult = clickedElement.dataset.js === 'result'
  


  if (isClickedElementANumber) {
    const number = clickedElement.textContent
    state.setInputs(number)
    state.updatedDisplayedInfo()
  }

  if (isClickedElementAOperation && state.getFirstInput()) {
    const operation = clickedElement.dataset.operation
    state.handleOperation(operation)
    state.updatedDisplayedInfo()
  }

  if (isClickedElementClear) {
    state.clearOperation()
  }

  if (isClickedElementResult) {
    state.handleResult()
    state.updatedDisplayedInfo()
  }

  if (clickedElement.dataset.js === 'delete') {
    state.handleBackspace()
  }

  console.log(clickedElement.textContent)
})