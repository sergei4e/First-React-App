import { getFullApiUrl, getRandomColor, getUniqueID } from '../';

const GROUP_ID = 'test';
const api = 'https://lab.lectrum.io/react/api';

describe('helpers: ', () => {

    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl should throw an err for wrong argument', () => {
        const getFullApiNameWithError = () => {
            getFullApiUrl(null, 1);
        };

        expect(getFullApiNameWithError).toThrowError(
            `'api' and 'GROUP_ID' should be a string`
        );
    });

    test('getFullApiUrl should return full api URL', () => {
        expect(getFullApiUrl(api, GROUP_ID)).toBe(`${api}/${GROUP_ID}`);
    });
});


describe('helpers: ', () => {

    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor should return a string starts with # symbol', () => {
        expect(getRandomColor()[0]).toBe('#');
    });

    test('getRandomColor should return full api URL', () => {
        expect(getRandomColor().length).toBe(7);
    });
});

describe('helpers: ', () => {

    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should return a string', () => {
        expect(typeof getUniqueID(4)).toBe('string');
    });

    test('getUniqueID(10) should return UniqueID with length = 10', () => {
        expect(getUniqueID(10).length).toBe(10);
    });

    test('getUniqueID() should return UniqueID with length = 15', () => {
        expect(getUniqueID().length).toBe(15);
    });

    test('getUniqueID should throw an err for wrong argument', () => {
        const getUniqueIDWithError = () => {
            getUniqueID('aaaa');
        };

        expect(getUniqueIDWithError).toThrowError('The function argument should be a number!');
    });
});
