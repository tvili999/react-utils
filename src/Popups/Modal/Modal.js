import React, { Component } from "react";
import styled from "styled-components";

import { withTheme } from "react-utils/Theme";
import { withPopup } from "react-utils/Popups";
import { hoc } from "react-utils/utils";

import propTypes from "./Modal.props.js";

const ModalWrapper = withTheme.forwardRef(styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2147483647;

    background: ${({ theme }) => theme.popup.background};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`);

@hoc(withPopup)
class Modal extends Component {
    static propTypes = propTypes;

    outerRef = React.createRef();

    handleClick = (e) => {
        if(e.target === this.outerRef.current)
            this.props.popup.close();
    }

    render() {
        return (
            <ModalWrapper ref={this.outerRef} onClick={this.handleClick}>
                {this.props.children}
            </ModalWrapper>
        );
    }
}

export default Modal;

