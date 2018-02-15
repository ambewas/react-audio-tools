import React, { Component } from "react";
import ComputerKeyboard, { MidiController, MonoSynth, AudioOutput, Distortion, Tremolo, Connector, Chorus } from "../lib";

class App extends Component {
  state = {}

  constructor() {
    super();
    this.state = {
      useMidiController: false,
      /**
       * Effects,... are all controlled components.
       * Saving settings, providing defaults,... should be trivial to implement now.
       * Do note that you must supply ALL params should you wish to provide your own defaults.
       * We will throw an error if you don't
       */
      tremoloParams: {
        frequency: 23,
        depth: 1,
        spread: 0,
      },
      distortionParams: {
        distortion: 1,
      },
    };
  }

  render() {
    const { useMidiController } = this.state;

    return (
      <Connector>
        Toggle between midi and computerKeyboard:
        <button onClick={() => this.setState(prevState => ({ useMidiController: !prevState.useMidiController }))}>
          {useMidiController ? "use keyboard" : "use midicontroller"}
        </button>

        {
          useMidiController ? (
            <MidiController>
              {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
            </MidiController>
          ) : (
            <ComputerKeyboard controlled keyboardLayout="azerty">
              {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
            </ComputerKeyboard>
          )
        }

        <Tremolo
          input={"monosynth"}
          output={"tremolo"}
          onChange={params => this.setState({ tremoloParams: params })}
          params={this.state.tremoloParams}
        />

        <Chorus
          input={"tremolo"}
          output={"chorus"}
          onChange={params => this.setState({ chorusParams: params })}
          params={this.state.chorusParams}
        />

        <Distortion
          input={"chorus"}
          output={"distortion"}
          onChange={params => this.setState({ distortionParams: params })}
          params={this.state.distortionParams}
        />
        <AudioOutput input={"distortion"} />
      </Connector>
    );
  }
}

export default App;

