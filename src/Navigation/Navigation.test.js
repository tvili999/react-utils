import React from "react";
import TestRenderer from 'react-test-renderer';
import { NavigationProvider } from "./Navigation";

test('passes', () => {

});

test('renders', () => {
    const renderer = TestRenderer.create(
        <NavigationProvider>
            <p>asdasd</p>
        </NavigationProvider>
    );
    expect(renderer.root.findByType('p')).toBeTruthy();
});

