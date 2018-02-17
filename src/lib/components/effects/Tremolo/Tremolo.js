import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import tremoloRenderer from "./tremoloRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.Tremolo(9, 0.75).start(),
  },
  defaultParameters: {
    frequency: 1,
    depth: 100,
    spread: 0,
    wet: 100,
  },
  parameterTypes: {
    frequency: {
      type: parameterTypes.FULL,
      min: 0,
      max: 20,
    },
    spread: {
      type: parameterTypes.FULL,
      min: 0,
      max: 180,
    },
    depth: {
      type:parameterTypes.NORMALRANGE,
    },
    wet: {
      type:parameterTypes.NORMALRANGE,
    },
  },
};

const Tremolo = generateEffectComponent("Tremolo", options, tremoloRenderer);

export default Tremolo;
