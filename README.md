[![Travis](https://img.shields.io/travis/ambewas/react-audio-tools.svg)]()
[![npm](https://img.shields.io/npm/v/react-audio-tools.svg)]()
[![npm](https://img.shields.io/npm/dt/react-audio-tools.svg)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/ambewas/react-audio-tools.svg)]()

A set of React components to build things with the webAudio/webMidi API.

## Demo app

http://react-audio-tools.surge.sh/

## Notice

This is a *very* young library and is still in constant development. Do not expect a stable release just yet -- things will break.

## install

`npm i react-audio-tools --save`

## usage

Here's the full code from our demo application:

```js

class App extends Component {
  state = {}

  constructor() {
    super();
    this.state = {
      keyboardLayout: "azerty",
      useMidiController: false,
      /**
       * Effects,... are all controlled components.
       * Saving settings, providing defaults,... should be trivial to implement now.
       * Do note that you must supply ALL params should you wish to provide your own defaults.
       * We will throw an error if you don't
       */
      tremoloParams: {
        frequency: 2,
        depth: 100,
        spread: 0,
        wet: 100,
      },
      tremoloEnabled: true,
      chorusEnabled: false,
      distortionEnabled: false,
      pingPongDelayEnabled: false,
      reverbEnabled: false,
      distortionParams: {
        distortion: 1,
        wet: 50,
      },
      volume: -5,
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

        <Reverb
          input={"chorus"}
          output={"reverb"}
          onChange={params => this.setState({ reverbParams: params })}
          params={this.state.reverbParams}
          onEnableChange={value => this.setState({ reverbEnabled: value })}
          enabled={this.state.reverbEnabled}
        />

        <PingPongDelay
          input={"reverb"}
          output={"pingPongDelay"}
          onChange={params => this.setState({ pingPongDelayParams: params })}
          params={this.state.pingPongDelayParams}
          onEnableChange={value => this.setState({ pingPongDelayEnabled: value })}
          enabled={this.state.pingPongDelayEnabled}
        />

        <Distortion
          input={"pingPongDelay"}
          output={"distortion"}
          onChange={params => this.setState({ distortionParams: params })}
          params={this.state.distortionParams}
          onEnableChange={value => this.setState({ distortionEnabled: value })}
          enabled={this.state.distortionEnabled}
        />
        <div>
          <AudioOutput
            input={"distortion"}
            volume={this.state.volume}
            onVolumeChange={value => this.setState({ volume: value })}
          />
        </div>
      </Connector>
    );
  }
}

```