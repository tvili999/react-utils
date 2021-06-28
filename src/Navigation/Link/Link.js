import React from "react";

import { withNavigation } from "react-utils/Navigation";

const Link = ({ to, children, onClick, navigation, ...props }) => {
    const handleClick = (e, ...args) => {
        onClick?.(e, ...args);
        if(to)
            navigation.navigate(to);
    }

    const handleClickPreventDefault = (e, ...args) => {
        e.preventDefault();
        handleClick(e, ...args);
    }

    const body = typeof children === "function" ? (
        children(handleClick)
    ) : (
        children
    );

    return to ? (
        <a 
            href={to}
            onClick={handleClickPreventDefault}
            {...props}
        >
            {body}
        </a>
    ) : body;
}

export default withNavigation(Link);