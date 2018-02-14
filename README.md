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
      input: "tremolo",
      useMidiController: false,
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


        it is possible to route the inputs and outputs however you like:
        <button onClick={() => this.setState({ input: "tremolo" })}>{"synth -> tremolo -> output"}</button>
        <button onClick={() => this.setState({ input: "distortion" })}>{"synth -> distortion -> output"}</button>

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

        <Distortion input={"monosynth"} output={"distortion"} />
        <Tremolo input={"monosynth"} output={"tremolo"} />
        <AudioOutput input={this.state.input} />
      </Connector>
    );
  }
}

export default App;


```