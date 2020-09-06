export function rootReducer(state, action) {
    if (action.type === 'INCREMENT') {
        return state ++
    } else if (action.type === 'DECREMENT') {
        return state --
    }
    return state
}