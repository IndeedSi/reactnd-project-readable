const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('the action' , action);
    const result = next(action);
    console.log('the new state is ', store.getState())
    console.groupEnd()
    return result
}

export default logger;