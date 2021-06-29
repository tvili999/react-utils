import React from "react";

const createHoc = (Consumer, propName, displayName) => {
    const upperCase = propName.charAt(0).toUpperCase() + propName.slice(1);

    const standard = (Component) => {
        const hoc = props => (
            <Consumer>
                {value => (
                    <Component {...props} {...{ [propName]: value }} />
                )}
            </Consumer>
        );

        hoc.displayName = displayName || `with${upperCase}()`;

        return hoc;
    };

    standard.forwardRef = (Component) => {
        const hoc = React.forwardRef((props, ref) => (
            <Consumer>
                {value => (
                    <Component ref={ref} {...props} {...{ [propName]: value }} />
                )}
            </Consumer>
        ));

        hoc.displayName = displayName || `with${upperCase}()`;

        return hoc;
    };
    return standard;
};

export default createHoc;