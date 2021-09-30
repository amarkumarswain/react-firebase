import React from 'react'
import Home from '../Home'
import { render } from '@testing-library/react'

describe("home component", () => {
    it("render home component", () => {
        const {getByTestId} = render(<Home />);
        const home = getByTestId("home");
        expect(home).toBeTruthy();
    });
});

