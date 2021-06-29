import React, { Component } from "react";

import propTypes from "./Icons.props.js";
import { createHoc } from "react-utils/utils";

const { Provider, Consumer } = React.createContext();

class IconsProvider extends Component {
    static propTypes = propTypes;

    state = {
        icons: this.props.icons || {},
        resolvers: this.props.resolvers || [],
        get: async (name) => {
            if(this.state.icons[name])
                return await Promise.resolve(this.state.icons[name](name));
                
            for(const resolver of this.state.resolvers) {
                const value = await Promise.resolve(resolver(name));
                if(value)
                    return value;
            }

            return null;
        },
        register: (name, resolver) => {
            if(name && resolver) {
                this.setState({
                    icons: {
                        ...this.state.icons,
                        [name]: resolver
                    }
                });
            }
            else {
                resolver = name;
                this.setState({
                    resolvers: [...this.state.resolvers, resolver]
                });
            }
        },

    }

    render = () => (
        <Provider value={this.state}>
            {this.props.children}
        </Provider>
    );
}

const withIcons = createHoc(Consumer, "icons");

export { IconsProvider, withIcons };
export const IconsConsumer = Consumer;