import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

import Navigation from './Navigation';

describe('Navigation', () => {
  
  it('Renders Navigation component', () => {
    const component = (
      <MemoryRouter>
        <Navigation classes={{}} />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

});