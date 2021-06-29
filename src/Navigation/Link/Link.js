import React from "react";

import { hoc } from "react-utils/utils";
import { withNavigation } from "react-utils/Navigation";

import propTypes from "./Link.props.js";

@hoc(withNavigation)
class Link extends React.Component {
    handleClick = (e, ...args) => {
        this.props.onClick?.(e, ...args);
        if(this.props.to)
            this.props.navigation.navigate(this.props.to);
    };

    handleClickPreventDefault = (e, ...args) => {
        e.preventDefault();
        this.handleClick(e, ...args);
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const { to, navigation, onClick, children, ...props } = this.props;

        const body = typeof children === "function" ? (
            children(this.handleClick)
        ) : (
            children
        );
    
        return to ? (
            <a 
                href={to}
                onClick={this.handleClickPreventDefault}
                {...props}
            >
                {body}
            </a>
        ) : body;
    }
}

Link.propTypes = propTypes;
    
export default Link;
