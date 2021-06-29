import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ color }) => color};
    font-family: ${({ font }) => font};
}

a {
    text-decoration: none;
    color: ${({ color }) => color};
}

p {
    margin: 0;
    color: ${({ color }) => color};
}

* {
    user-select: none;
    cursor: default;
}
`;

export default GlobalStyle;
