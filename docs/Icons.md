# Icons

```jsx
import React from "react";

import { IconsProvider } from "react-utils/Icon/Icons";

const Icons = ({ children }) => (
    <IconsProvider
        resolvers={[
            (name) => ({
                type: "svg",
                icon: require(`./assets/${name}.svg?raw`)
            })
        ]}
    >
        {children}
    </IconsProvider>
);

export default Icons;
```

```jsx
import React from "react";
import Icons from "./Icons";
import Icon from "react-utils/Icon";

const App = () => (
    <Icons>
        <Icon type="logo" size={24}/>
    </Icons>
);

export default App;
```
