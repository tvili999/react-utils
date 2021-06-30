import React from "react";
import createTester from "react-utils/tester";
import AuthSwitch from "./AuthSwitch.js";
import { AuthenticationProvider } from "../index";

// eslint-disable-next-line react/prop-types
const Provider = ({ loggedIn, children }) => (
    <AuthenticationProvider 
        persist={{ get: () => loggedIn, set: () => {} }}
        api={{ refresh: x => x }}
    >
        {children}
    </AuthenticationProvider>
);


test('passes', () => {

});

test('children renderer loggedIn', async () => {
    const tester = createTester(Tester => (
        <Provider loggedIn>
            <AuthSwitch>
                {auth => <Tester value={auth}/>}
            </AuthSwitch>
        </Provider>
    ));

    await tester.nextRender();
    expect(tester.state.loggedIn).toBe(true);
});

test('render prop logged in good route', async () => {
    const tester = createTester(Tester => (
        <Provider loggedIn>
            <AuthSwitch loggedIn render={(auth) => (
                <Tester value={auth}/>
            )}/>
        </Provider>
    ));

    await tester.nextRender();
    expect(tester.state.loggedIn).toBe(true);
});

test('render prop logged in bad route', async () => {
    const tester = createTester(Tester => (
        <Provider loggedIn>
            <AuthSwitch render={(auth) => (
                <Tester value={auth}/>
            )}/>
        </Provider>
    ));

    const rendered = await new Promise(resolve => {
        const timeout = setTimeout(() => {
            resolve(false);
        }, 200);

        tester.nextRender().then(() => {
            clearTimeout(timeout);
            resolve(true);
        });
    });

    expect(rendered).toBe(false);
});

test('render prop logged out good route', async () => {
    const tester = createTester(Tester => (
        <Provider>
            <AuthSwitch render={(auth) => (
                <Tester value={auth}/>
            )}/>
        </Provider>
    ));

    await tester.nextRender();
    expect(tester.state.loggedIn).toBe(false);
});

test('render prop logged out bad route', async () => {
    const tester = createTester(Tester => (
        <Provider>
            <AuthSwitch loggedIn render={(auth) => (
                <Tester value={auth}/>
            )}/>
        </Provider>
    ));

    const rendered = await new Promise(resolve => {
        const timeout = setTimeout(() => {
            resolve(false);
        }, 200);

        tester.nextRender().then(() => {
            clearTimeout(timeout);
            resolve(true);
        });
    });

    expect(rendered).toBe(false);
});
