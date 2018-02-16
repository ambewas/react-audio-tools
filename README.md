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
        <Distortion
          input={"tremolo"}
          output={"distortion"}
          onChange={params => this.setState({ distortionParams: params })}
          params={this.state.distortionParams}
        />
        <AudioOutput input={"distortion"} />
      </Connector>
    );
  }
}


```