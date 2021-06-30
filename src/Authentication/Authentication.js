import React, { Component } from "react";

import propTypes from "./Authentication.props.js";
import { createHoc } from "react-utils/utils";

const { Provider, Consumer } = React.createContext();

class AuthenticationProvider extends Component {
    static propTypes = propTypes;

    setAuth = (auth) => {
        auth = auth || null;
        this.props.persist.set(auth);
        this.setState({ auth, loggedIn: !!auth, error: null });
    }

    state = {
        loggedIn: null,
        auth: null,
        error: null,
        login: async (data) => {
            if(this.state.loggedIn)
                await this.state.logout();

            let auth;
            try {
                auth = await Promise.resolve(this.props.api.login(data));
            }
            catch(e) {
                this.setState({ error: e, loggedIn: false });
                return;
            }

            this.setAuth(auth);
        },
        logout: async () => {
            if(!this.state.loggedIn)
                return;
            await Promise.resolve(this.props.api?.logout?.(this.state.auth));
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