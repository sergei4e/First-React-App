import React from 'react';
import Counter from './';
import dom from 'react-test-renderer';

const renderTree = dom.create(<Counter posts = { [9, 6, 7, 23] } />).toJSON();

test('Counter should correspond to its snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});
