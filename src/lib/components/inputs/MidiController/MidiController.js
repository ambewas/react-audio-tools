import { Component } from "react";
import PropTypes from "prop-types";
import { midiMessages } from "../../../constants";
import webmidi from "webmidi";


class MidiController extends Component {
  state = {}
  static propTypes = {
    children: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestMidiAccess();
  }

  componentWillUnmount() {
    if (this.canAccessMidi) {
      for (let input in this.inputs) {
        this.inputs[input].removeListener("noteon", "all", this.handleNoteOn);
        this.inputs[input].removeListener("noteoff", "all", this.handleNoteOff);
      }
      webmidi.disable();
    }
  }

  requestMidiAccess = () => {
    webmidi.enable(err => {
      if (err) {
        this.canAccessMidi = false;
        alert("No midi support in your browser."); // eslint-disable-line
      } else {
        this.canAccessMidi = true;
        this.initializeMidi();
      }
    });
  }

  initializeMidi = () => {
    this.inputs = webmidi.inputs;
    for (let input in this.inputs) {
      this.inputs[input].addListener("noteon", "all", this.handleNoteOn);
      this.inputs[input].addListener("noteoff", "all", this.handleNoteOff);
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
