// a default UI for the distortion component.
import React from "react";
import lensify from "lensify";
import { set } from "ramda";
import { Knob } from "../../Atoms";

const style = {
  border: "3px solid #ff7675",
  padding: 32,
  margin: 24,
  display: "inline-block",
};

export default (onChange, params) => {
  const paramLenses = lensify(params);
  // make sure any edits that happen to the params object is passed through to onChange again
  // otherwise we lose functionality

  return (
    <div style={style}>
      Distortion node!
      <div style={{ display: "flex" }}>
        {Object.keys(params).map(param => (
          <Knob
            key={param}
            onChange={(value) => onChange(set(paramLenses[param], value, params))}
            value={params[param]}
            title={param}
            fgColor="#ff7675"
            style={{ margin: 10 }}
          />
        ))}
      </div>
    </div>
  );
};
