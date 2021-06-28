# Navigation

## Provider

```jsx
import { BrowserRouter, Route } from "react-router-dom";

import { NavigationProvider } from "contexts/NavigationContext";

const App = () => (
    <BrowserRouter>
        <Route render={props => (
            <NavigationProvider
                onNavigate={url => props.history.push(url)}
            >
                <p></p>
            </NavigationProvider>
        )}/>
    </BrowserRouter>
);
```

## Intercept

Intercept lets you prevent next navigation event. This is useful for exit confirmation dialogs etc.


```jsx
    state = {
        edited: false
    }
    openPopup = ({ onClose }) => {/**/}

    componentDidMount() {
        this.props.navigation.interceptNext((url, intercept) => {
            if(this.state.edited) {
                openPopup({
                    onClose: () => intercept.retry()
                });
            }
            return !this.state.edited;
        });
    }
```

## Listener

Does not prevent navigation, but lets you catch them and react to them. Example is changing page title outside content component tree.
