import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import chorusRenderer from "./chorusRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.Chorus(4, 2.5, 0.5),
  },
  defaultParameters: {
    frequency: 4,
    delayTime: 2.5,
    depth: 0.5,
    wet: 100,
  },
  parameterTypes: {
    frequency: {
      type: parameterTypes.FULL,
    },
    delayTime: {
      type: parameterTypes.FULL,
    },
    depth: {
      type: parameterTypes.NORMALRANGE,
    },
    wet: {
      type: parameterTypes.NORMALRANGE,
    },
  },
};

const Distortion = generateEffectComponent("Chorus", options, chorusRenderer);

export default Distortion;
