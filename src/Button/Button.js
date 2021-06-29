/* eslint-disable indent */
import styled from "styled-components";

import { withTheme } from "react-utils/Theme";

const Button = styled.button`
    outline: none;
    border: none;
    border-radius: ${({ theme }) => theme.button.borderRadius};
    padding: ${({ theme, size }) => theme.button.padding[size || "medium"]};
    font-size: ${({ theme, size }) => theme.button.fontSize[size || "medium"]};
    box-shadow: ${({ theme }) => theme.button.boxShadow || theme.boxShadow};

    background-color: ${({ theme }) => theme.button.background};
    color: ${({ theme }) => theme.button.color};

    &:hover {
        background-color: ${({ theme }) => (
            theme.button.hover?.background || theme.button.background
        )};
        color: ${({ theme }) => (
            theme.button.hover?.color || theme.button.color
        )};
    }
    &:active {
        background-color: ${({ theme }) => (
            theme.button.active?.background || theme.button.background
        )};
        color: ${({ theme }) => (
            theme.button.active?.color || theme.button.color
        )};
    }
`;
    
export default withTheme.forwardRef(Button);

