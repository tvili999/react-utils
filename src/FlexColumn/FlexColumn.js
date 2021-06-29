import styled from "styled-components";

import { withTheme } from "react-utils/Theme";

const FlexColumn = styled.div`
    display: flex;
    flex-flow column nowrap;
    box-sizing: border-box;
    padding: ${({ theme }) => theme.gap};
    align-items: ${ props => props.horizontalAlign || "stretch" };
    justify-content: ${ props => props.align || "flex-start" };

    > *:not(:first-child) {
        margin-left: ${({ theme }) => theme.gap};
    }
`;
    
export default withTheme.forwardRef(FlexColumn);

