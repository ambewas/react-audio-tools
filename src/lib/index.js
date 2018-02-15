import ComputerKeyboard from "./components/inputs/ComputerKeyboard/ComputerKeyboard";
import MidiController from "./components/inputs/MidiController/MidiController";
import FMsynth from "./components/synths/FMsynth/FMsynth";
import MonoSynth from "./components/synths/MonoSynth/MonoSynth";
import AudioOutput from "./components/AudioOutput/AudioOutput";
import Distortion from "./components/effects/Distortion/Distortion";
import Tremolo from "./components/effects/Tremolo/Tremolo";
import audioContext from "./store/audioContext";
import Connector from "./store/Connector";

export default ComputerKeyboard;

export {
  ComputerKeyboard,
  FMsynth,
  MonoSynth,
  AudioOutput,
  Distortion,
  Tremolo,
  audioContext,
  Connector,
  MidiController,
};
