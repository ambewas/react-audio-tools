import React, { Component } from "react";
import PropTypes from "prop-types";
import Tone from "tone";
import { makeEffect } from "../../HOC";

class Tremolo extends Component {
  static propTypes = {
    effectNode: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      tremolo: 1,
    };

    this.effectNode = this.props.effectNode;
  }

  componentDidUpdate() {
    this.effectNode.frequency.value = this.state.tremolo;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ tremolo: 1 })}>slow tremolo</button>
        <button onClick={() => this.setState({ tremolo: 32 })}>RAAAH!</button>
        {this.state.tremolo}
      </div>
    );
  }
}

const options = {
  effectNode: new Tone.Tremolo(9, 0.75).start(),
};

export default makeEffect(options)(Tremolo);
