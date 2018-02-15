import React, { Component } from "react";
import Tone from "tone";
import PropTypes from "prop-types";
import { Knob } from "../../Atoms";
import { connect } from "../../HOC";

class MonoSynth extends Component {
  static propTypes = {
    audioNode: PropTypes.object,
  }
  constructor(props) {
    super(props);

    this.state = {
      knobValue: 50,
    };
  }

  componentDidUpdate() {
    const { audioNode } = this.props;

    audioNode.filterEnvelope.set({
      baseFrequency: this.state.knobValue,
    });
  }

  handleKnobChange = (value) => {
    this.setState({
      knobValue: value,
    });
  }

  getComponentRenderer = () => {
    const { knobValue } = this.state;

    return (
      <div>
        this is the monosynth
        <Knob onChange={this.handleKnobChange} value={knobValue}/>
      </div>
    );
  }

  render() {
    return this.getComponentRenderer();
  }
}

// setup the synth
const options = {
  audioNode: new Tone.MonoSynth({
    "oscillator" : {
      "type" : "sawtooth",
    },
    "envelope" : {
      "attack" : 0.1,
    },
    filter  : {
      Q: 5,
      type: "lowpass",
      rolloff: -24,
    },
    filterEnvelope  : {
      attack: 0.06,
      decay: 0.2,
      sustain: 0.5,
      release: 2,
      baseFrequency: 440,
      octaves: 7,
      exponent: 2,
    },
  }),
};

export default connect(options)(MonoSynth);
