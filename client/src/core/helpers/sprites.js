export function getSpriteByIndex(number) {
  let colCount = 15;
  let yPos = 0;
  let xPos = 0;
  let yPXFix = 0;
  for (let x = 0; x <= number; x++) {
    xPos = x % colCount;
    if ((x % colCount) === 0) {
      yPos++;
    }
  }
  if (yPos > 4) {
    yPXFix += 2;
  }
  if (yPos > 12) {
    yPXFix += 16;
  }
  yPos--;
  return [xPos * 64 + xPos, yPos * 31 + yPos + yPXFix];
}
