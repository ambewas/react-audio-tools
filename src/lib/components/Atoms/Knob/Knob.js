import React from "react";
import BaseKnob from "./BaseKnob";
import PropTypes from "prop-types";

const Knob = (props) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...props.style }}>
    <BaseKnob
      width={75}
      height={75}
      angleOffset={-125}
      angleArc={250}
      {...props}
    />
    {props.title}
  </div>
);

Knob.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
};

export default Knob;
