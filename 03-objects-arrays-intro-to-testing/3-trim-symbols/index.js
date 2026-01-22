/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {return string.slice();}
  if (size === 0) {return '';}

  let arr = [];
  let repeatCnt = 0;
  let prevLetter = '';

  for (const letter of string) {
    if (prevLetter == letter) {
      repeatCnt += 1;
      if (repeatCnt < size) {
        arr.push(letter);
      }
    }
    else {
      repeatCnt = 0;
      arr.push(letter);
    }
    prevLetter = letter;
  }
  return arr.join('');
}
