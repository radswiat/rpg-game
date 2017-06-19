export async function loadImage(imagePath) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = imagePath; // can also be a remote URL e.g. http://
    img.onload = () => {
      console.log('resolve!');
      resolve(img);
    };
  });
}

export function every(mod, value) {
  return value % mod === 0;
}
