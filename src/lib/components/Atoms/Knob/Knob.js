import React from "react";
import BaseKnob from "./BaseKnob";
import PropTypes from "prop-types";

const Knob = (props) => (
  <div>
    <BaseKnob width={75} height={75} {...props} />
    {props.title}
  </div>
);

Knob.propTypes = {
  title: PropTypes.string,
};

export default Knob;
