import React, { Component } from "react";
import Tone from "tone";
import PropTypes from "prop-types";
import { connect } from "../HOC";
import visualisationFunction from "./visualisation";

class AudioVisualiser extends Component {
  static propTypes = {
    audioNode: PropTypes.object,
    visualizer: PropTypes.func,
    type: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    visualizer: visualisationFunction,
    type: "waveform",
    width: 700,
    height: 200,
  }

  componentDidMount() {
    const { type, audioNode } = this.props;

    // set correct analyser type
    audioNode.type = type;
    requestAnimationFrame(this.setDataArray);
  }

  componentWillReceiveProps(nextProps) {
    this.props.audioNode.type = nextProps.type;
  }

  setDataArray = () => {
    const { audioNode, visualizer } = this.props;

    requestAnimationFrame(this.setDataArray);

    const dataArray = audioNode.getValue();

    if (this.canvas) {
      visualizer(dataArray, this.canvas);
    }
  }

  getComponentRenderer = () => {
    const { width, height } = this.props;

    return (
      <canvas
        width={width}
        height={height}
        ref={c => this.canvas = c}
      />
    );
  }

  render() {
    return this.getComponentRenderer();
  }
}

// setup the synth
const options = {
  audioNode: new Tone.Analyser(),
};

export default connect(options)(AudioVisualiser);
