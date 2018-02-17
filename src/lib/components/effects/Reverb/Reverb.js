import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import reverbRenderer from "./reverbRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.Freeverb(),
  },
  defaultParameters: {
    roomSize: 100,
    dampening: 1000,
    wet: 100,
  },
  parameterTypes: {
    roomSize: parameterTypes.NORMALRANGE,
    dampening: parameterTypes.FULL,
    wet: parameterTypes.NORMALRANGE,
  },
};

const Reverb = generateEffectComponent("Reverb", options, reverbRenderer);

export default Reverb;
