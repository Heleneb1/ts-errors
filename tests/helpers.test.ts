import { getErrorObject } from '../src/helpers/helpers';

test('getErrorObject returns correct error object for known code', () => {
    const errInf = getErrorObject(404);
    expect(errInf).toEqual({
        emoji: '⁉️',
        defaultMsg: 'Resource not found',
        category: 'Client Error',
    });

})