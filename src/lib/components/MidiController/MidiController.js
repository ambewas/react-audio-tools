import { Component } from "react";
import PropTypes from "prop-types";
import { midiMessages } from "../../constants";
import webmidi from "webmidi";


class MidiController extends Component {
  state = {}
  static propTypes = {
    children: PropTypes.func,
    controlled: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    if (props.controlled) {
      this.requestMidiAccess();
    }
  }

  requestMidiAccess = () => {
    webmidi.enable(err => {
      if (err) {
        alert("No midi support in your browser."); // eslint-disable-line
      } else {
        this.initializeMidi();
      }
    });
  }

  initializeMidi = () => {
    const inputs = webmidi.inputs;

    for (let input in inputs) {
      inputs[input].addListener("noteon", "all", this.handleNoteOn);
      inputs[input].addListener("noteoff", "all", this.handleNoteOff);
    }
  }

  handleNoteOn = (e) => {
    this.setState({
      midiMsg: {
        type: midiMessages.NOTE_ON,
        pitch: e.note.number,
        velocity: e.rawVelocity,
      },
    });
  }

  handleNoteOff = (e) => {
    this.setState({
      midiMsg: {
        type: midiMessages.NOTE_OFF,
        pitch: e.note.number,
        velocity: 0,
      },
    });
  }

  render() {
    const { children } = this.props;
    const { midiMsg } = this.state;

    return (
      children(midiMsg)
    );
  }
}

export default MidiController;
