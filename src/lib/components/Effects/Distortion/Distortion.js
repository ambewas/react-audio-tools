import React, { Component } from "react";
import PropTypes from "prop-types";
import Tone from "tone";
import { makeEffect } from "../../HOC";

class Distortion extends Component {
  static propTypes = {
    effectNode: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      distortion: 0,
    };

    this.effectNode = this.props.effectNode;
  }

  componentDidUpdate() {
    this.effectNode.distortion = this.state.distortion;
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
  effectNode: new Tone.Distortion(0),
};

export default makeEffect(options)(Distortion);
