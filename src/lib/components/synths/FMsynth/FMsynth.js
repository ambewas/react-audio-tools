import React, { Component } from "react";
import Tone from "tone";
import PropTypes from "prop-types";
import { connect } from "../../HOC";

class FMsynth extends Component {
  static propTypes = {
    audioNode: PropTypes.object, // eslint-disable-line
  }

  constructor(props) {
    super(props);
  }

  getComponentRenderer = () => {
    return (
      <div>
        this is the fm synth
      </div>
    );
  }

  render() {
    return this.getComponentRenderer();
  }
}

// setup the synth
const options = {
  audioNode: new Tone.FMSynth({
    "modulationIndex": 12.22,
    "carrier": {
      "envelope": {
        "attack": 0.01,
        "decay": 0.2,
      },
    },
    "modulator": {
      "oscillator": {
        "type": "square",
      },
      "envelope": {
        "attack": 0.2,
        "decay": 0.01,
      },
    },
  }),
};

export default connect(options)(FMsynth);
