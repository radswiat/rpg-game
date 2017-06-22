export function getSpriteByIndex(number) {
  let colCount = 16;
  let yPos = 0;
  let xPos = 0;
  for (let x = 0; x <= number; x++) {
    xPos = x % colCount;
    if ((x % colCount) === 0) {
      yPos++;
    }
  }
  yPos--;
  return [xPos * 40, yPos * 40];
}
