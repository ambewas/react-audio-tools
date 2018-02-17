import React, { Component } from "react";
import Tone from "tone";
import PropTypes from "prop-types";
import { Knob } from "../Atoms";

class AudioOutput extends Component {
  static propTypes = {
    input: PropTypes.string,
    volume: PropTypes.number,
    onVolumeChange: PropTypes.func,
  }

  static contextTypes = {
    connections: PropTypes.object,
  }

  constructor() {
    super();
    this.volume = new Tone.Volume(-8);
    this.meter = new Tone.Meter(0.01);
    this.state = {
      meterLevel: 0,
      volume: -8,
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(this.updateMeter, 100);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  updateMeter = () => {
    this.setState({
      meterLevel: Math.floor(this.meter.getLevel()),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { input, volume } = nextProps;
    const { connections } = nextContext;

    // set appropriate new volume
    this.volume.volume.value = volume;

    // disconnect the current input
    if (this.props.input) {
      connections[this.props.input].disconnect();
    }

    if (input) {
      connections[input].chain(this.volume, Tone.Master);
      Tone.Master.chain(this.meter);
    }
  }

  render() {
    const meterLevel = this.state.meterLevel;

    return (
      <div style={{ display: "flex" }}>
        audio output
        <Knob
          onChange={this.props.onVolumeChange}
          value={this.props.volume}
          title={"volume"}
          fgColor={"#2d3436"}
          style={{ margin: 10 }}
          min={-60}
          max={6}
        />
        {meterLevel}
      </div>
    );
  }
}


export default AudioOutput;
