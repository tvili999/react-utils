import styled from "styled-components";

import { withTheme } from "react-utils/Theme";

const Box = styled.div`
    margin: ${({ theme }) => theme.gap};
`;

export default withTheme.forwardRef(Box);

