import {applyMiddleware, createStore} from 'redux';
import './style.css'
import {rootReducer} from './redux/rootReducer';
import {asyncIncrement, decrement, increment} from "./redux/actions";
import thunk from 'redux-thunk'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

function logger(state) {
    return function(next) {
        return function(action) {
            console.log('State: ', state.getState())
            console.log('Action: ', action)
            return next(action)
        }
    }
}

const store = createStore(
    rootReducer,
    0,
    applyMiddleware(thunk, logger))

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    // document.body.classList.toggle('dark')
})

store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state
})

store.dispatch({type: 'INIT_APP'})