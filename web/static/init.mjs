import {
  createSymbol,
  wait,
  initPositionElements,
  determineElementPosition,
  setupListener,
} from './helpers.mjs'
import { createStateGenerator } from './state.mjs'

export async function init({
  cueDuration = 100,
  soaDuration = 400,
  fixationDuration = 400,
  testDuration = 20,
  targetMaxTime = 1700,
  withCue = true,
} = {}) {
  const results = []
  const { clearMarkup, ...elements } = initPositionElements()

  const generateState = createStateGenerator(testDuration)

  for (const state of generateState()) {
    const baseElements = determineElementPosition(state.cue)

    // Fixation
    await wait(fixationDuration)

    const hasCue = Math.random() > 0.5
    if (hasCue) {
      // Cue
      baseElements.forEach((el) => {
        elements[el].appendChild(createSymbol('cue'))
      })

      baseElements.forEach((el) => {
        elements[el].classList.add('show')
      })

      await wait(cueDuration)
      clearMarkup()
    }

    // SOA
    switch (state.targetCondition) {
      case 'congruent': {
        baseElements.forEach((el) => {
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol(state.targetDirection))
        })
        break
      }
      case 'incongruent': {
        baseElements.forEach((el) => {
          elements[el].appendChild(createSymbol(state.targetDirection, true))
          elements[el].appendChild(createSymbol(state.targetDirection, true))
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol(state.targetDirection, true))
          elements[el].appendChild(createSymbol(state.targetDirection, true))
        })
        break
      }
      case 'neutral': {
        baseElements.forEach((el) => {
          elements[el].appendChild(createSymbol('neutral'))
          elements[el].appendChild(createSymbol('neutral'))
          elements[el].appendChild(createSymbol(state.targetDirection))
          elements[el].appendChild(createSymbol('neutral'))
          elements[el].appendChild(createSymbol('neutral'))
        })
        break
      }
    }

    await wait(soaDuration)

    baseElements.forEach((el) => {
      elements[el].classList.add('show')
    })

    const start = performance.now()
    const key = await Promise.race([setupListener(), wait(targetMaxTime)])
    const end = performance.now()
    results.push({
      duration: Math.min(end - start, targetMaxTime),
      correct: key === state.targetDirection,
      hasCue,
      state,
    })
    clearMarkup()
  }

  return results
}
