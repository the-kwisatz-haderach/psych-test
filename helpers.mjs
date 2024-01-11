const symbols = {
  ArrowRight: '→',
  ArrowLeft: '←',
  cue: '✴',
  neutral: '—',
}

export const createSymbol = (symbol, reverse = false) => {
  const el = document.createElement('div')
  el.innerText = symbols[symbol]
  el.className = `symbol${reverse ? ' reverse' : ''}`
  return el
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const initPositionElements = () => {
  const top = document.getElementById('top')
  const center = document.getElementById('center')
  const bottom = document.getElementById('bottom')

  const clearMarkup = () => {
    top.innerHTML = ''
    center.innerHTML = ''
    bottom.innerHTML = ''
    top.classList.remove('show')
    center.classList.remove('show')
    bottom.classList.remove('show')
  }

  return { top, center, bottom, clearMarkup }
}

export const determineElementPosition = (cue = '') => {
  const elements = []
  switch (cue) {
    case 'none':
      break
    case 'double':
    case 'top': {
      elements.push('top')
      break
    }
    case 'double':
    case 'bottom': {
      elements.push('bottom')
      break
    }
    case 'center': {
      elements.push('center')
      break
    }
  }
  return elements
}

export function setupListener() {
  return new Promise((resolve) => {
    document.addEventListener('keydown', function handleKeypress(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        document.removeEventListener('keydown', handleKeypress)
        resolve(e.key)
      }
    })
  })
}
