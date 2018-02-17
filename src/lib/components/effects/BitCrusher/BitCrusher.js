import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import bitCrusherRenderer from "./bitCrusherRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.BitCrusher(4),
  },
  defaultParameters: {
    bits: 1,
    wet: 1,
  },
  parameterTypes: {
    bits: {
      type: parameterTypes.FULL,
      min: 0,
      max: 5,
    },
    wet: {
      type: parameterTypes.NORMALRANGE,
    },
  },
};

const BitCrusher = generateEffectComponent("Bitcrusher", options, bitCrusherRenderer);

export default BitCrusher;
