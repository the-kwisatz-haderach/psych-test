const cueDirection = ['top', 'bottom', 'double']
const targetDirection = ['ArrowLeft', 'ArrowRight']
const condition = ['congruent', 'incongruent', 'neutral']

export const createStateGenerator = (totalDurationMs) => {
  const endTime = Date.now() + totalDurationMs
  return function* generateState() {
    while (Date.now() < endTime) {
      yield {
        cue: cueDirection[Math.floor(Math.random() * cueDirection.length)],
        targetDirection:
          targetDirection[Math.floor(Math.random() * targetDirection.length)],
        targetCondition:
          condition[Math.floor(Math.random() * condition.length)],
      }
    }
  }
}
