import { init } from './init.mjs'

window.onload = () => {
  main()
}

function main() {
  const formContainer = document.querySelector('.start-page')
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const options = [...inputs].reduce(
      (acc, el) => ({
        ...acc,
        [el.name]:
          el.type === 'number'
            ? el.value && Number.parseInt(el.value, 10)
            : el.checked,
      }),
      {}
    )
    formContainer.classList.add('hide')
    const tableBody = document.querySelector('tbody')
    tableBody.innerHTML = ''
    const results = await init(options)

    formContainer.classList.remove('hide')
    results.forEach((res) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${Math.floor(res.duration)} ms</td>
        <td>${res.correct}</td>
        <td>${res.state.targetDirection}</td>
        <td>${res.state.targetCondition}</td>
        <td>${res.hasCue}</td>
      `.trim()
      tableBody.appendChild(row)
    })
  })
}
