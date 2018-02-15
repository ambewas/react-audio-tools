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
    depth: 1,
    spread: 0,
  },
  parameterTypes: {
    frequency: parameterTypes.FULL,
    spread: parameterTypes.FULL,
    depth: parameterTypes.NORMALRANGE,
  },
};

const Tremolo = generateEffectComponent("Tremolo", options, tremoloRenderer);

export default Tremolo;
