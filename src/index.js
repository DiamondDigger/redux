import {applyMiddleware, createStore} from 'redux';
import './style.css'
import {rootReducer} from './redux/rootReducer';
import {asyncIncrement, changeTheme, decrement, increment} from "./redux/actions";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

function customLogger(state) {
    return function (next) {
        return function (action) {
            console.log('_________________________')
            console.log('State: ', state.getState())
            console.log('Action: ', action)
            console.log('_________________________')
            return next(action)
        }
    }
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger, customLogger))

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
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
    // document.body.classList.toggle('dark')
})

store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state.counter

    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn].forEach(btn => btn.disabled = state.theme.disabled)
})

store.dispatch({type: 'INIT_APP'})