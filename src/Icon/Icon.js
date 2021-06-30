import React, { Component } from "react";
import styled from "styled-components";

import { hoc } from "react-utils/utils";

import { withIcons } from "./Icons";

import propTypes from "./Icon.props.js";

const SvgWrapper = styled.span`
    position: relative;
    box-sizing: border-box;

    > svg {
        width: 100%;
        height: 100%;
    }
`;

const ImgWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
`;

const ImgIcon = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

@hoc(withIcons)
class Icon extends Component {
    state = {
        icon: null
    }

    getIconName = (props) => props.icon || props.type

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if(this.getIconName(prevProps) !== this.getIconName(this.props))
            this.fetch();
    }

    fetch = async () => {
        const iconName = this.getIconName(this.props);
        const icon = (await this.props.icons.get(iconName)) || null;

        this.setState({ icon });
    }

    render() {
        if(!this.state.icon)
            return null;

        // eslint-disable-next-line no-unused-vars
        const { icons, icon, type, size, rotate, className, ...props } = this.props;

        const style = {
            transform: rotate ? `rotate(${rotate})` : undefined,
            width: size ? `${size}px` : undefined,
            height: size ? `${size}px` : undefined
        };

        return this.state.icon.type === "svg" ? (
            <SvgWrapper
                dangerouslySetInnerHTML={{ __html: this.state.icon.icon }}
                className={className}
                style={style}
                {...props}
            />
        ):(
            <ImgWrapper 
                style={style}
                className={className}
            >
                <ImgIcon src={this.state.icon.icon} {...props} />
            </ImgWrapper>
        );
    }
}

Icon.propTypes = propTypes;

export default Icon;

