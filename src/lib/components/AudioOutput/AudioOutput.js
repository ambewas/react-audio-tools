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
      meterLevel: 1,
      volume: -8,
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(this.updateMeter, 1000 / 60);
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
    const { volume, onVolumeChange } = this.props;
    const { meterLevel } = this.state;

    const meterWrapperStyle = {
      width: 30,
      height: 100,
      position: "relative",
      background: "linear-gradient(#61e57f, yellow 80%, #f30303 100%)",
      overflow: "hidden",
      transform: "rotate(180deg)",
    };

    const meterCoverStyle = {
      height: "100%",
      background: "white",
      transform: `scaleY(${((-meterLevel + 16) / 100)})`,
      transformOrigin: "bottom center",
      width: "100%",
    };

    return (
      <div style={{ display: "flex" }}>
        audio output
        <Knob
          onChange={onVolumeChange}
          value={volume}
          title={"volume"}
          fgColor={"#2d3436"}
          style={{ margin: 10 }}
          min={-60}
          max={6}
        />
        {meterLevel !== -Infinity && (
          <div style={meterWrapperStyle}>
            <div style={meterCoverStyle} />
          </div>
        )}
      </div>
    );
  }
}


export default AudioOutput;
