import React, { Component } from "react";
import { ComputerKeyboard, MonoSynth, AudioOutput, Distortion, Tremolo, Connector } from "../lib";

class App extends Component {
	state = {}

	constructor() {
	  super();
	  this.state = {
	    input: "tremolo",
	    keyboardLayout: "azerty",
	  };
	}

	toggleLayout() {
	  return this.state.keyboardLayout === "azerty"
	    ? "qwerty"
	    : "azerty";
	}

	render() {
	  return (
	    <Connector>
				it is possible to route the inputs and outputs however you like:
	      <button onClick={() => this.setState({ input: "tremolo" })}>{"synth -> tremolo -> output"}</button>
	      <button onClick={() => this.setState({ input: "distortion" })}>{"synth -> distortion -> output"}</button>

	      <ComputerKeyboard controlled keyboardLayout="azerty">
	        {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
	      </ComputerKeyboard>

	      <Distortion input={"monosynth"} output={"distortion"} />
	      <Tremolo input={"monosynth"} output={"tremolo"} />
	      <AudioOutput input={this.state.input} />

              <button onClick={() => this.setState({ keyboardLayout: this.toggleLayout() })}>
                {"keyboard layout: " + this.state.keyboardLayout}
              </button>
	    </Connector>
	  );
	}
}

export default App;

