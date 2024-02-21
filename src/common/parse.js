/**
 * 
 * @returns {string}
 * @param {number} i 
 */
export const intTo2Chars = (i) => {
    return i < 10? `0${i}` : i;
};

/**
 * 
 * @returns {string}
 * @param {number} i 
 */
export const minutesToHHhMMmn = (i) => {
    let hourPart = (Math.floor(i/60) > 0? intTo2Chars(Math.floor(i/60))+"h" : "");
    let minutePart = intTo2Chars(i%60)+"mn";
    return hourPart+minutePart;
};