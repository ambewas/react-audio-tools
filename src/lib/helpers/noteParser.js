export const noteParser = pitch => {
  if (pitch < 0 || pitch > 127) {
    return undefined;
  }

  const octave = Math.floor(pitch / 12);
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteIndex = pitch % 12;

  return notes[noteIndex] + octave;
};
