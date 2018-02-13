A set of React components to build things with the webAudio/webMidi API.

## Notice

This is a *very* young library and is still in constant development. Do not expect a stable release just yet -- things will break.

## install

`npm i react-audio-tools --save`

## usage

Here's the full code from our demo application:

```js
import React, { Component } from "react";
import { ComputerKeyboard, MonoSynth, AudioOutput, Distortion, Tremolo, Connecter } from "../lib";

class App extends Component {
	state = {}

	constructor() {
	  super();
	  this.state = {
	    input: "tremolo",
	  };
	}

	render() {
	  return (
	    <Connecter>
        it is possible to route the inputs and outputs however you like:
	      <button onClick={() => this.setState({ input: "tremolo" })}>{"synth -> tremolo -> output"}</button>
	      <button onClick={() => this.setState({ input: "distortion" })}>{"synth -> distortion -> output"}</button>

	      <ComputerKeyboard controlled keyboardLayout="azerty">
	        {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
	      </ComputerKeyboard>

	      <Distortion input={"monosynth"} output={"distortion"} />
	      <Tremolo input={"monosynth"} output={"tremolo"} />
	      <AudioOutput input={this.state.input} />
	    </Connecter>
	  );
	}
}

export default App;


```