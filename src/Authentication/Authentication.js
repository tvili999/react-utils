import React, { Component } from "react";

import propTypes from "./Authentication.props.js";
import { createHoc } from "react-utils/utils";

const { Provider, Consumer } = React.createContext();

class AuthenticationProvider extends Component {
    static propTypes = propTypes;

    // this.props.persist.set(auth);
    // this.props.persist.get() == auth;

    // this.props.api.refresh(auth);
    // this.props.api.login(data);
    // this.props.api.logout(auth);

    setAuth = (auth) => {
        this.props.persist.set(auth);
        if(auth == null) {
            this.setState({ auth: null, loggedIn: false });
        }
        else {
            this.setState({ auth, loggedIn: true });
        }
    }

    state = {
        loggedIn: null,
        auth: null,
        error: null,
        login: async (data) => {
            if(this.loggedIn)
                await this.state.logout();

            let auth;
            try {
                auth = this.props.api.login(data);
            }
            catch(e) {
                this.setState({ error: e, loggedIn: false });
                return;
            }

            this.setAuth(auth);
        },
        logout: async () => {
            if(!this.loggedIn)
                return;
            await this.props.api?.logout?.(this.state.auth);
            this.setAuth(null);
        }
    }

    async componentDidMount() {
        let auth = await Promise.resolve(this.props.persist.get());
        if(!auth) {
            this.setState({ loggedIn: false });
            return;
        }

        try {
            auth = await this.props.api.refresh(auth);
        }
        catch(e) {
            this.setState({ error: e, loggedIn: false });
            return;
        }

        this.setAuth(auth || null);
    }

    render = () => this.state.loggedIn !== null && (
        <Provider value={this.state}>
            {this.props.children}
        </Provider>
    );
}

const withAuthentication = createHoc(Consumer, "authentication");

export { AuthenticationProvider, withAuthentication };
export const AuthenticationConsumer = Consumer;