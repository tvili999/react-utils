import React, { Component, Fragment } from "react";

const PopupContext = React.createContext();

const { Provider, Consumer } = React.createContext(null);

const PopupContainerPure = ({ popups }) => popups.map((x, i) => (
    <Fragment key={i}>
        <PopupContext.Provider value={x}>
            {x.render()}
        </PopupContext.Provider>
    </Fragment>
))

class PopupsProvider extends Component {
    state = {
        popups: [],
        open: (render) => {
            const id = this.nextId++;
            const popup = {
                id,
                close: () => this.setState({
                    popups: this.state.popups.filter(x => x.id !== id)
                }),
                render: () => render(popup)
            };

            this.setState({
                popups: [
                    ...this.state.popups,
                    popup
                ]
            });
        }
    }

    nextId = 0;

    render = () => (
        <Provider value={this.state}>
            {(!this.props.noContainer) && (
                <PopupContainerPure popups={this.state.popups}/>
            )}
            {this.props.children}
        </Provider>
    );
}

const withPopups = Component => {
    const hoc = (props) => (
        <Consumer>
            {value => <Component popups={value} {...props} />}
        </Consumer>
    );

    hoc.displayName = "withPopups()";

    return hoc;
};

const withPopup = Component => {
    const hoc = (props) => (
        <PopupContext.Consumer>
            {value => <Component popup={value} {...props} />}
        </PopupContext.Consumer>
    );

    hoc.displayName = "withPopup()";

    return hoc;
};

export { PopupsProvider, withPopups, withPopup };
export const PopupsConsumer = Consumer;
export const PopupConsumer = PopupContext.Consumer;
