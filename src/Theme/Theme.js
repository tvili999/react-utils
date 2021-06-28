import React from "react";

import GlobalStyle from "./GlobalStyle";
import defaults from "./defaults";

import createHoc from "react-utils/utils/createHoc";

const { Provider, Consumer } = React.createContext({ });

const Theme = ({ theme, children }) => (
    <Provider value={{...(defaults || {}), ...(theme || {})}}>
        <GlobalStyle />
        {children}
    </Provider>
)

const withTheme = createHoc(Consumer, "theme");

export { Theme, withTheme };
