import React from 'react';
import renderer from 'react-test-renderer';

import Rules from './Rules';

describe('Rules', () => {

  it('Renders Rules component', () => {
    const tree = renderer.create(<Rules />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});