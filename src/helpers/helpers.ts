import { errorMap } from '../errorHelpers';

export const getErrorObject = (code: number): {
    emoji: string;
    defaultMsg: string;
    category: string;
} => {
    const fallback = {
        emoji: '⚠️',
        defaultMsg: 'Unknown error',
        category: 'Unknown',
    };

    const error = errorMap[code] ?? fallback;
    return {
        emoji: error.emoji,
        defaultMsg: error.defaultMsg,
        category: error.category || 'Unknown',
    };
};
