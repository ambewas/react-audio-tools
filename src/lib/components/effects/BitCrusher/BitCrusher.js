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
    bits: parameterTypes.FULL,
    wet: parameterTypes.NORMALRANGE,
  },
};

const Tremolo = generateEffectComponent("Bitcrusher", options, bitCrusherRenderer);

export default Tremolo;
