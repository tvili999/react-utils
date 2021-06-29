import React, { Component } from "react";
import PropTypes from "prop-types";

import { hoc, createHoc } from "react-utils/utils";

import propTypes from "./Popups.props";

// Current popup object
const PopupContext = React.createContext();

export const withPopup = createHoc(PopupContext.Consumer, "popup");
export const PopupConsumer = PopupContext.Consumer;

const PopupContainerPure = ({ popups }) => popups.map(popup => (
    <PopupContext.Provider value={popup} key={popup.id}>
        {popup.render()}
    </PopupContext.Provider>
));

// Popups API

const { Provider, Consumer } = React.createContext(null);

export class PopupsProvider extends Component {
    static propTypes = propTypes;

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

export const withPopups = createHoc(Consumer, "popups");
export const PopupsConsumer = Consumer;

// Separate popups container

@hoc(withPopups)
class PopupContainer extends Component {
    static propTypes = {
        popups: PropTypes.object
    }

    render = () => (
        <PopupContainerPure popups={this.props.popups}/>
    )
}

export { PopupContainer };

