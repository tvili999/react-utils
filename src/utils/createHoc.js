import React from "react";

export default (Consumer, propName, displayName) => (Component) => {
    const hoc = ({children, ...props}) => (
        <Consumer>
            {value => (
                <Component {...props} {...{ [propName]: value }}>
                    {children}
                </Component>
            )}
        </Consumer>
    );

    hoc.displayName = displayName || `with${propName.charAt(0).toUpperCase() + propName.slice(1)}()`;

    return hoc;
}
