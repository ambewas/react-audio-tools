import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import distortionRenderer from "./distortionRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.Distortion(0),
  },
  defaultParameters: {
    distortion: 1,
    wet: 100,
  },
  parameterTypes: {
    distortion: {
      type: parameterTypes.NORMALRANGE,
    },
    wet: {
      type: parameterTypes.NORMALRANGE,
    },
  },
};

const Distortion = generateEffectComponent("Distortion", options, distortionRenderer);

export default Distortion;
