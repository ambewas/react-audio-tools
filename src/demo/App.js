import React, { Component } from "react";
import ComputerKeyboard, { MidiController, MonoSynth, AudioOutput, Distortion, Tremolo, Connector, Chorus, BitCrusher } from "../lib";

class App extends Component {
  state = {}

  constructor() {
    super();
    this.state = {
      keyboardLayout: "qwerty",
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
        wet: 100,
      },
      tremoloEnabled: true,
      chorusEnabled: true,
      distortionEnabled: true,
      bitCrusherEnabled: false,
      distortionParams: {
        distortion: 1,
        wet: 50,
      },
    };
  }

  render() {
    const { useMidiController, keyboardLayout } = this.state;

    return (
      <Connector>
        <div>
          Toggle between midi and computerKeyboard:
          <button onClick={() => this.setState(prevState => ({ useMidiController: !prevState.useMidiController }))}>
            {useMidiController ? "use keyboard" : "use midicontroller"}
          </button>
        </div>
        <div>
          Set keyboard layout:
          <button onClick={() => this.setState({ keyboardLayout: "azerty" })}>
            {"azerty"}
          </button>
          <button onClick={() => this.setState({ keyboardLayout: "qwerty" })}>
            {"qwerty"}
          </button>
        </div>

        {
          useMidiController ? (
            <MidiController>
              {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
            </MidiController>
          ) : (
            <ComputerKeyboard controlled keyboardLayout={keyboardLayout}>
              {msg => <MonoSynth midiMsg={msg} output={"monosynth"} />}
            </ComputerKeyboard>
          )
        }

        <Tremolo
          input={"monosynth"}
          output={"tremolo"}
          onChange={params => this.setState({ tremoloParams: params })}
          params={this.state.tremoloParams}
          onEnableChange={value => this.setState({ tremoloEnabled: value })}
          enabled={this.state.tremoloEnabled}
        />

        <Chorus
          input={"tremolo"}
          output={"chorus"}
          onChange={params => this.setState({ chorusParams: params })}
          params={this.state.chorusParams}
          onEnableChange={value => this.setState({ chorusEnabled: value })}
          enabled={this.state.chorusEnabled}
        />

        <BitCrusher
          input={"chorus"}
          output={"bitcrusher"}
          onChange={params => this.setState({ bitCrusherParams: params })}
          params={this.state.bitCrusherParams}
          onEnableChange={value => this.setState({ bitCrusherEnabled: value })}
          enabled={this.state.bitCrusherEnabled}
        />

        <Distortion
          input={"bitcrusher"}
          output={"distortion"}
          onChange={params => this.setState({ distortionParams: params })}
          params={this.state.distortionParams}
          onEnableChange={value => this.setState({ distortionEnabled: value })}
          enabled={this.state.distortionEnabled}
        />
        <AudioOutput input={"distortion"} />
      </Connector>
    );
  }
}

export default App;

