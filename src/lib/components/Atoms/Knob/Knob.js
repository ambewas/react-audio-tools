import React from "react";
import BaseKnob from "./BaseKnob";
import PropTypes from "prop-types";

class Knob extends React.Component {
  state = { value: 50 };

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number,
  }

  render() {
    return (
      <BaseKnob
        value={this.props.value}
        onChange={this.props.onChange}
        cursor
      />
    );
  }
}

export default Knob;
