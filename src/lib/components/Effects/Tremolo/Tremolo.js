import React, { Component } from "react";
import PropTypes from "prop-types";
import Tone from "tone";
import { connect } from "../../HOC";

class Tremolo extends Component {
  static propTypes = {
    audioNode: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      tremolo: 1,
    };

    this.audioNode = this.props.audioNode;
  }

  componentDidUpdate() {
    this.audioNode.frequency.value = this.state.tremolo;
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
  audioNode: new Tone.Tremolo(9, 0.75).start(),
};

export default connect(options)(Tremolo);
