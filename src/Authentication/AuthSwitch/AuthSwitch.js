import React from "react";

import { withAuthentication } from "react-utils/Authentication";
import { hoc } from "react-utils/utils";

import propTypes from "./AuthSwitch.props.js";

@hoc(withAuthentication)
class AuthSwitch extends React.Component {
    render() {
        const { loggedIn, render, children, authentication } = this.props;
        if(render)
            return (authentication.loggedIn === (!!loggedIn)) ? render(authentication) : null;
        else
            return children(authentication);
    }
}

AuthSwitch.propTypes = propTypes;
    
export default AuthSwitch;

