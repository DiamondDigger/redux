import './style.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')

let state = 0

function render(){
    counter.textContent = state.toString()
}

render()

addBtn.addEventListener('click', () => {
    state ++
    render()
})

subBtn.addEventListener('click', () => {
    state --
    render()
})



