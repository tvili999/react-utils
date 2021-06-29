import React from "react";
import merge from "deepmerge";

import createHoc from "react-utils/utils/createHoc";

import GlobalStyle from "./GlobalStyle";
import defaults from "./defaults";
import propTypes from "./Theme.props";

const { Provider, Consumer } = React.createContext({ });

const Theme = ({ theme, children }) => (
    <Provider value={merge(defaults || {}, theme || {})}>
        <Consumer>
            {theme => <GlobalStyle {...theme}/>}
        </Consumer>
        {children}
    </Provider>
);
Theme.propTypes = propTypes;

const withTheme = createHoc(Consumer, "theme");

export { Theme, withTheme };
