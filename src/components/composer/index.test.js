import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import Composer from './';

configure({ adapter: new Adapter() });

const options = {
    myFirstName: 'Сергей',
    avatar:      'randonurl'
};

const props = {
    createPost: jest.fn()
};

const message = 'Hello Lectrum';

const state = {
    comment:           '',
    avatarBorderColor: 'red'
};

const mutatedState = {
    comment:           message,
    avatarBorderColor: 'red'
};

const result = mount(<Composer createPost = { props.createPost } />, { context: options });

window.fetch = () => Promise.resolve(() => ({
    status: 200,
    json:   () => Promise.resolve({
        data:    'some data',
        message: 'success'
    })
}));

describe('Composer: ', () => {
    test(`Should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test(`Should have 1 'textarea' element`, () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test(`Should have 1 'image' element`, () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test(`Should have valid initial state`, () => {
        expect(result.state()).toEqual(state);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea value should be respond by setSttate', () => {
        result.setState(() => ({
            comment: message
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            comment: ''
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe('');
    });

    test('state and textarea value should respond to change event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);
    });
});
