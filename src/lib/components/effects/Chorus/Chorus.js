import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import chorusRenderer from "./chorusRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.Chorus(4, 2.5, 0.5),
  },
  defaultParameters: {
    frequency: 2,
    delayTime: 4,
    depth: 56,
    wet: 70,
    feedback: 0,
    spread: 120,
  },
  parameterTypes: {
    frequency: {
      type: parameterTypes.FULL,
      min: 0,
      max: 10,
    },
    delayTime: {
      type: parameterTypes.FULL,
      min: 2,
      max: 20,
    },
    depth: {
      type: parameterTypes.NORMALRANGE,
    },
    spread: {
      type: parameterTypes.FULL,
      min: 0,
      max: 180,
    },
    wet: {
      type: parameterTypes.NORMALRANGE,
    },
    feedback: {
      type: parameterTypes.NORMALRANGE,
      min: 0,
      max: 20,
    },
  },
};

const Distortion = generateEffectComponent("Chorus", options, chorusRenderer);

export default Distortion;
