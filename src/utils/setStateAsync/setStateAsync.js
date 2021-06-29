export const setStateAsync = 
    (component, state) => new Promise(resolve => component.setState(state, resolve));