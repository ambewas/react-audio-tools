import React, { Component } from "react";
import PropTypes from "prop-types";
import Tone from "tone";
import { connect } from "../../HOC";

class Distortion extends Component {
  static propTypes = {
    audioNode: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      distortion: 0,
    };

    this.audioNode = this.props.audioNode;
  }

  componentDidUpdate() {
    this.audioNode.distortion = this.state.distortion;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ distortion: 0 })}>no distortion</button>
        <button onClick={() => this.setState({ distortion: 32 })}>RAAAH!</button>
        {this.state.distortion}
      </div>
    );
  }
}

const options = {
  audioNode: new Tone.Distortion(0),
};

export default connect(options)(Distortion);
