import styled from "styled-components";

import { withTheme } from "react-utils/Theme";

const FlexRow = styled.div`
    display: flex;
    flex-flow row nowrap;
    box-sizing: border-box;
    padding: ${({ theme }) => theme.gap};
    align-items: ${ props => props.verticalAlign || "center" };
    justify-content: ${ props => props.align || "flex-start" };

    > *:not(:first-child) {
        margin-left: ${({ theme }) => theme.gap};
    }
`;
    
export default withTheme.forwardRef(FlexRow);
