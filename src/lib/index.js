import ComputerKeyboard from "./components/ComputerKeyboard/ComputerKeyboard";
import FMsynth from "./components/FMsynth/FMsynth";
import AudioOutput from "./components/AudioOutput/AudioOutput";
import Distortion from "./components/Effects/Distortion/Distortion";
import Tremolo from "./components/Effects/Tremolo/Tremolo";
import MonoSynth from "./components/MonoSynth/MonoSynth";
import audioContext from "./store/audioContext";
import Connecter from "./store/Connecter";

export default ComputerKeyboard;

export {
  ComputerKeyboard,
  FMsynth,
  MonoSynth,
  AudioOutput,
  Distortion,
  Tremolo,
  audioContext,
  Connecter,
};
