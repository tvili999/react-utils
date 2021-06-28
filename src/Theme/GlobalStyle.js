import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    font-family: ${({ font }) => font};
}

a {
    text-decoration: none;
    color: ${({ textColor }) => textColor};
}

p {
    margin: 0;
    color: ${({ textColor }) => textColor};
}

* {
    user-select: none;
    cursor: default;
}
`;

export default GlobalStyle;
