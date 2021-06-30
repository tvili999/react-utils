import React from "react";
import TestRenderer from 'react-test-renderer';
import merge from "deepmerge";
import { AuthenticationProvider, AuthenticationConsumer } from "./Authentication.js";

test('passes', () => {

});

const context = ({ render, api, persist }) => TestRenderer.create(
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
            {authentication => {
                render(authentication);
                return false;
            }}
        </AuthenticationConsumer>
    </AuthenticationProvider>
);

test('logged out', () => new Promise(resolve => 
    context({
        persist: {
            get: () => null,
        },
        render: (authentication) => {
            expect(authentication.loggedIn).toBe(false);
            resolve();
        }
    }))
);

test('logged in', () => new Promise(resolve => 
    context({
        persist: {
            get: () => true,
            set: () => {}
        },
        api: {
            refresh: (auth) => auth,
        },
        render: (authentication) => {
            expect(authentication.loggedIn).toBe(true);
            resolve();
        }
    }))
);

test('refresh gets persisted', async () => {
    const persist = jest.fn();

    await new Promise(resolve => context({
        persist: {
            get: () => "original",
            set: persist
        },
        api: {
            refresh: () => "new",
        },
        render: resolve
    }));

    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe("new");
});

test('invalid refresh logs out', async () => {
    const persist = jest.fn();

    await new Promise(resolve => context({
        persist: {
            get: () => "original",
            set: persist
        },
        api: {
            refresh: () => null,
        },
        render: (authentication) => {
            expect(authentication.loggedIn).toBe(false);
            resolve();
        }
    }));

    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe(null);
});

test('successful login', async () => {
    const persist = jest.fn();
    const login = jest.fn(() => {
        return "auth";
    });
    const render = jest.fn();
    const inputData = "inputData";

    const renderer = context({
        persist: {
            get: () => "original",
            set: persist
        },
        api: {
            login,
        },
        render
    });

    await renderer.getInstance().state.login(inputData);

    expect(render.mock.calls.length).toBe(2);
    expect(login.mock.calls.length).toBe(1);
    expect(login.mock.calls[0][0]).toBe(inputData);

    expect(persist.mock.calls.length).toBe(1);
    expect(persist.mock.calls[0][0]).toBe("auth");
});

test('failing login', async () => {
    const render = jest.fn();

    const renderer = context({
        persist: {
            get: () => null
        },
        api: {
            login: () => { throw "Bad data"; }
        },
        render
    });

    await renderer.getInstance().state.login("");

    expect(render.mock.calls.length).toBe(2);
    expect(render.mock.calls[1][0].error).toBe("Bad data");
    expect(render.mock.calls[1][0].loggedIn).toBe(false);
});

test('clean error after failing login', async () => {
    const render = jest.fn();

    const renderer = context({
        persist: {
            get: () => null,
            set: () => {}
        },
        api: {
            login: data => {
                if(data == "passes") 
                    return true;
                else
                    throw "Bad data";
            }
        },
        render
    });

    await renderer.getInstance().state.login("fails");
    await renderer.getInstance().state.login("passes");

    expect(render.mock.calls.length).toBe(3);

    expect(render.mock.calls[1][0].error).toBe("Bad data");
    expect(render.mock.calls[1][0].loggedIn).toBe(false);

    expect(render.mock.calls[2][0].error).toBe(null);
    expect(render.mock.calls[2][0].loggedIn).toBe(true);
});

test('log out', async () => {
    let resolve = null;
    const lock = new Promise(_res => resolve = _res);
    const render = jest.fn(() => resolve());
    const logout = jest.fn();
    const persist = jest.fn();

    const renderer = context({
        persist: {
            get: () => "auth",
            set: persist
        },
        api: {
            refresh: auth => auth,
            logout
        },
        render
    });

    await lock;

    await renderer.getInstance().state.logout();

    expect(render.mock.calls.length).toBe(2);

    expect(render.mock.calls[0][0].loggedIn).toBe(true);
    expect(render.mock.calls[1][0].loggedIn).toBe(false);

    expect(logout.mock.calls.length).toBe(1);

    expect(persist.mock.calls.length).toBe(2);
    expect(persist.mock.calls[1][0]).toBe(null);
});
