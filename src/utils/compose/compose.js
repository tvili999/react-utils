export default (...args) => (Component) => {
    let component = Component;

    args.reverse().forEach((fn) => {
        component = fn(component);
    });

    return component;
};
