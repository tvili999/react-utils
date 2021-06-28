import React, { Component } from "react";

import createHoc from "react-utils/utils/createHoc";

const { Provider, Consumer } = React.createContext();

class NavigationProvider extends Component {
    state = {
        interceptors: [],
        listeners: [],
        navigate: (url) => {
            let intercept = false;

            const interceptApi = {
                retry: () => this.state.navigate(url)
            }

            for(const interceptor of this.state.interceptors) {
                const result = interceptor(url, interceptApi);
                if(result === false) {
                    intercept = true;
                    break;
                }
            }

            if(!intercept) {
                for(const listener of this.state.listeners)
                    listener(url);
                this.props?.onNavigate?.(url);
            }
        },
        addListener: (handler) => {
            this.setState({ listeners: [...this.state.listeners, handler] })
        },
        removeListener: (handler) => {
            this.setState({ listeners: this.state.listeners.filter(x => x !== handler) })
        },
        addInterceptor: (handler) => {
            this.setState({ interceptors: [...this.state.interceptors, handler] });
        },
        removeInterceptor: (handler) => {
            this.setState({ interceptors: this.state.interceptors.filter(x => x !== handler) });
        },
        interceptNext: (handler) => {
            this.state.addInterceptor(handler);

            const remover = () => {
                this.state.removeInterceptor(handler);
                this.state.removeListener(handler);
            }
            this.state.addListener(remover);
        }
    }

    render = () => (
        <Provider value={this.state}>
            {this.props.children}
        </Provider>
    );
}

const withNavigation = createHoc(Consumer, "navigation");

export { NavigationProvider, withNavigation };
export const NavigationConsumer = Consumer;
