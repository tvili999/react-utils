import compose from "react-utils/utils/compose";

export default (...wrappers) => {
    return (descriptor) => ({
        ...descriptor,
        finisher: (Class) => compose(...wrappers)(Class)
    });
};
