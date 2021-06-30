import React from "react";
import merge from "deepmerge";
import tester from "react-utils/tester";

import { AuthenticationProvider, AuthenticationConsumer } from "./Authentication.js";

test('passes', () => {

});

const buildContext = ({ api, persist }) => tester(Tester => (
    <AuthenticationProvider 
        {...merge({
            persist: {
                get: () => {throw "Do not get from persistance when unneccessary";},
                set: () => {throw "Do not set to persistance when unneccessary";}
            },
            api: {
                login: () => {throw "Do not call api when unneccessary";},
                refresh: () => {throw "Do not call api when unneccessary";},
                logout: () => {throw "Do not call api when unneccessary";}
            },
        }, { api, persist })}
    >
        <AuthenticationConsumer>
            { authentication => <Tester value={authentication}/> }
        </AuthenticationConsumer>
    </AuthenticationProvider>
));

test('logged out', async () => {
    const tester = buildContext({
        persist: { get: () => null }
    });

    await tester.nextRender();
    expect(tester.state.loggedIn).toBe(false);
});

test('logged in', async () => {
    const tester = buildContext({
        persist: { get: () => true, set: () => {} },
        api: { refresh: (auth) => auth }
    });

    await tester.nextRender();
    expect(tester.state.loggedIn).toBe(true);
});

test('refresh gets persisted', async () => {
    const persist = jest.fn();

    const tester = buildContext({
        persist: {
            get: () => "original",
            set: persist
        },
        api: { refresh: () => "new" }
    });

    await tester.nextRender();
    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe("new");
});

test('invalid refresh logs out', async () => {
    const persist = jest.fn();
    const tester = buildContext({
        persist: {
            get: () => "original",
            set: persist
        },
        api: {
            refresh: () => null,
        },
    });
    await tester.nextRender();

    expect(tester.state.loggedIn).toBe(false);
    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe(null);
});

test('successful login', async () => {
    const persist = jest.fn();
    const login = jest.fn(() => "auth");
    const inputData = "inputData";

    const tester = buildContext({
        persist: {
            get: () => "original",
            set: persist
        },
        api: {
            login,
        },
    });
    await tester.nextRender();

    await tester.state.login(inputData);
    await tester.nextRender();

    expect(tester.state.loggedIn).toBe(true);

    expect(login.mock.calls.length).toBe(1);
    expect(login.mock.calls[0][0]).toBe(inputData);

    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe("auth");
});

test('failing login', async () => {
    const tester = buildContext({
        persist: { get: () => null },
        api: { login: () => { throw "Bad data"; } }
    });
    await tester.nextRender();

    await tester.state.login("");
    await tester.nextRender();

    expect(tester.state.error).toBe("Bad data");
    expect(tester.state.loggedIn).toBe(false);
});

test('clean error after failing login', async () => {
    const tester = buildContext({
        persist: { get: () => null, set: () => {} },
        api: {
            login: data => {
                if(data == "passes") 
                    return true;
                else
                    throw "Bad data";
            }
        }
    });

    await tester.nextRender();

    await tester.state.login("fails");
    await tester.nextRender();

    expect(tester.state.error).toBe("Bad data");
    expect(tester.state.loggedIn).toBe(false);

    await tester.state.login("passes");
    await tester.nextRender();

    expect(tester.state.error).toBe(null);
    expect(tester.state.loggedIn).toBe(true);
});

test('log out', async () => {
    const logout = jest.fn();
    const persist = jest.fn();

    const tester = buildContext({
        persist: { get: () => "auth", set: persist },
        api: { refresh: auth => auth, logout }
    });
    await tester.nextRender();

    expect(tester.state.loggedIn).toBe(true);

    await tester.state.logout();
    await tester.nextRender();

    expect(tester.state.loggedIn).toBe(false);

    expect(logout.mock.calls.length).toBe(1);

    expect(persist.mock.calls.length).toBe(2);
    expect(persist.mock.calls[1][0]).toBe(null);
});
