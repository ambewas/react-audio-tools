// a default UI for an effect component.
import React from "react";
import lensify from "lensify";
import { set } from "ramda";
import { Knob } from "../Atoms";

export default (name, color) => (onChange, params, enabled, onEnableChange, parameterTypes) => {
  const paramLenses = lensify(params);
  // make sure any edits that happen to the params object is passed through to onChange again
  // otherwise we lose functionality

  const style = {
    border: `3px solid ${color}`,
    padding: 32,
    margin: 24,
    display: "inline-block",
    position: "relative",
  };

  return (
    <div style={style}>
      The {name}
      <button
        style={{ position: "absolute", top: 0, right: 0, margin: 12 }}
        onClick={() => onEnableChange(!enabled)}
      >
        {enabled ? "disable" : "enable"}
      </button>
      <div style={{ display: "flex" }}>
        {Object.keys(params).map(param => {
          const parameterType = parameterTypes[param];

          console.log("parameterType", parameterType);
          return (
            <Knob
              key={param}
              onChange={(value) => onChange(set(paramLenses[param], value, params))}
              value={params[param]}
              title={param}
              fgColor={color}
              style={{ margin: 10 }}
              min={parameterType.min}
              max={parameterType.max}
            />
          );
        })}
      </div>
    </div>
  );
};
