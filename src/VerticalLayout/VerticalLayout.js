import styled from "styled-components";

import { withTheme } from "react-utils/Theme";

const VerticalLayout = styled.div`
    margin: ${({ theme }) => theme.gap};

    > *:not(:first-child) {
        margin-top: ${({ theme }) => theme.gap};
    }
`;

export default withTheme.forwardRef(VerticalLayout);

