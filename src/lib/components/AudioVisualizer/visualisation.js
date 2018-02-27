function visualisationFunction(dataArray, canvas) {
  const waveContext = canvas.getContext("2d");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  waveContext.clearRect(0, 0, canvasWidth, canvasHeight);
  waveContext.beginPath();
  waveContext.lineJoin = "round";
  waveContext.lineWidth = 6;
  waveContext.strokeStyle = "rgb(250,0,0)";
  waveContext.moveTo(0, (dataArray[0] / 255) * canvasHeight);
  for (let i = 1, len = dataArray.length; i < len; i++) {
    const val = (dataArray[i] + 1) / 2;
    const x = canvasWidth * (i / len);
    const y = val * canvasHeight;

    waveContext.lineTo(x, y);
  }
  waveContext.stroke();
}

export default visualisationFunction;
