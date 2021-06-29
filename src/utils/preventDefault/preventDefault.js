export default (fn) => (e, ...args) => {
    e.preventDefault();
    fn(e, ...args);
};
