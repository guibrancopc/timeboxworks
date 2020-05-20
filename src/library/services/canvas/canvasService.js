export function getBase64Image(canvas) {
  return canvas.toDataURL();
}

export function getCanvasWithBackgroundColor(srcCanvas, color) {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = srcCanvas.width;
  newCanvas.height = srcCanvas.height;

  const destCtx = newCanvas.getContext('2d');
  destCtx.fillStyle = color;
  destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);
  destCtx.drawImage(srcCanvas, 0, 0);

  return newCanvas;
}
