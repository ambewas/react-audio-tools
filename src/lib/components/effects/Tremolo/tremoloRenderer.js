// a default UI for the tremolo component.
import React from "react";
import lensify from "lensify";
import { set } from "ramda";
import { Knob } from "../../Atoms";

const style = {
  border: "3px solid #74b9ff",
  padding: 32,
  margin: 24,
};

export default (onChange, params) => {
  const paramLenses = lensify(params);
  // make sure any edits that happen to the params object is passed through to onChange again
  // otherwise we lose functionality

  return (
    <div style={style}>
      Tremolo node!
      {Object.keys(params).map(param => (
        <Knob
          key={param}
          onChange={(value) => onChange(set(paramLenses[param], value, params))}
          value={params[param]}
          title={param}
          fgColor={"#74b9ff"}
        />
      ))}
    </div>
  );
};
