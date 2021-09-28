import React from 'react'
import About from '../About'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('render the about page', () => {
    const component = render(<About />);
    const renderEl = component.getByTestId("about");

    expect(renderEl.textContent).toBe("This is about page");
});