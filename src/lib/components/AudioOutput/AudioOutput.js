import React, { Component } from "react";
import Tone from "tone";
import PropTypes from "prop-types";

class AudioOutput extends Component {
  static propTypes = {
    input: PropTypes.string,
  }

  static contextTypes = {
    connections: PropTypes.object,
  }

  constructor() {
    super();
    this.volume = new Tone.Volume(0);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { input } = nextProps;
    const { connections } = nextContext;

    // disconnect the current input
    if (this.props.input) {
      connections[this.props.input].disconnect();
    }

    if (input) {
      connections[input].chain(this.volume, Tone.Master);
    }
  }

  render() {
    return (
      <div>
        audio output
      </div>
    );
  }
}


export default AudioOutput;
