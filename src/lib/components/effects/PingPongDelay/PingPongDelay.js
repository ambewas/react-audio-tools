import Tone from "tone";
import { generateEffectComponent } from "../../HOC";
import pingPongDelayRenderer from "./pingPongDelayRenderer";
import { parameterTypes } from "../../../constants";

const options = {
  connectOptions: {
    audioNode: new Tone.PingPongDelay("4n"),
  },
  defaultParameters: {
    delayTime: 30,
    feedback: 30,
    wet: 50,
  },
  parameterTypes: {
    delayTime: parameterTypes.NORMALRANGE,
    feedback: parameterTypes.NORMALRANGE,
    wet: parameterTypes.NORMALRANGE,
  },
};

const PingPongDelay = generateEffectComponent("PingPongDelay", options, pingPongDelayRenderer);

export default PingPongDelay;
