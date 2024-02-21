/**
 * 
 * @returns {string}
 * @param {number} i 
 */
export const intTo2Chars = (i) => {
    return i < 10? `0${i}` : i;
};