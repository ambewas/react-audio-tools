import { Component } from "react";
import PropTypes from "prop-types";

// INFO -> midi cc list http://nickfever.com/music/midi-cc-list

const messages = {
	SUSTAIN: "cc64",
	NOTE_ON: "noteon",
	NOTE_OFF: "noteoff",
};

const azertyKeysToListenTo = ["81", "90", "83", "69", "68", "70", "84", "71", "89", "72", "85", "74", "75", "79", "76", "80", "77", "87", "88", "16"];
const qwertyKeysToListenTo = ["65", "87", "83", "69", "68", "70", "84", "71", "89", "72", "85", "74", "75", "79", "76", "80", "186", "90", "88", "16"];

function generateKeyboardSynth(octave, keyboardLayout) {
	// midi note matrix -> http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm

	const offset = octave * 12;

	if (keyboardLayout === "azerty") {
		return {
			"81": 0 + offset,
			"90": 1 + offset,
			"83": 2 + offset,
			"69": 3 + offset,
			"68": 4 + offset,
			"70": 5 + offset,
			"84": 6 + offset,
			"71": 7 + offset,
			"89": 8 + offset,
			"72": 9 + offset,
			"85": 10 + offset,
			"74": 11 + offset,
			"75": 12 + offset,
			"79": 13 + offset,
			"76": 14 + offset,
			"80": 15 + offset,
			"77": 16 + offset,
		};
	}
	// its qwerty, so different map:
	return {
		"65": 0 + offset,
		"87": 1 + offset,
		"83": 2 + offset,
		"69": 3 + offset,
		"68": 4 + offset,
		"70": 5 + offset,
		"84": 6 + offset,
		"71": 7 + offset,
		"89": 8 + offset,
		"72": 9 + offset,
		"85": 10 + offset,
		"74": 11 + offset,
		"75": 12 + offset,
		"79": 13 + offset,
		"76": 14 + offset,
		"80": 15 + offset,
		"186": 16 + offset,
	};
}

export class ComputerKeyboard extends Component {
	static propTypes = {
		keyboardLayout: PropTypes.oneOf(["azerty", "qwerty"]),
		controlled: PropTypes.bool,
		children: PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.state = {
			midiMsg: {},
			currentOctave: 3,
		};

		this.keySynth = generateKeyboardSynth(3, props.keyboardLayout); //init keysynth around C3
		this.lastEvent = null;
		this.heldKeys = {};
	}

	componentDidCatch(error, info) {
		console.log("error, info", error, info); // eslint-disable-line
	}

	componentDidMount = () => {
		const { controlled } = this.props;

		if (controlled) {
			this.connectEventHandlers();
		}
	}

	componentWillReceiveProps = (nextProps) => {
		const { controlled, keyboardLayout } = this.props;

		if (nextProps.keyboardLayout !== keyboardLayout) {
			this.keySynth = generateKeyboardSynth(this.state.currentOctave, nextProps.keyboardLayout); //init keysynth
		}
		if (controlled && !nextProps.controlled) {
			this.disconnectEventHandlers();
		} else {
			this.connectEventHandlers();
		}
	}

	componentWillUnmount = () => {
		this.disconnectEventHandlers();
	}

	disconnectEventHandlers = () => {
		window.removeEventListener("keydown", this._handleKeyDown);
		window.removeEventListener("keyup", this._handleKeyUp);
	}

	connectEventHandlers = () => {
		window.addEventListener("keydown", this._handleKeyDown);
		window.addEventListener("keyup", this._handleKeyUp);
	}

	shouldHandleKeyUpdate = (e) => {
		const { keyboardLayout } = this.props;
		const keysToSearch = keyboardLayout === "azerty" ? azertyKeysToListenTo : qwertyKeysToListenTo;

		return keysToSearch.indexOf(e.keyCode.toString()) >= 0;
	}

	_handleKeyDown = (e) => {
		const { controlled, keyboardLayout } = this.props;
		const { currentOctave } = this.state;

		if (!controlled) {
			return;
		}

		// return early if keyboard key was already depressed
		if (this.lastEvent && this.lastEvent.keyCode === e.keyCode) {
			return;
		}

		// set flag of depressed keys
		this.lastEvent = e;
		this.heldKeys[e.keyCode] = true;

		if (!this.shouldHandleKeyUpdate(e)) {
			// don't handle updates for keys we don't want to listen to.
		  return;
		}


		if (e.keyCode === 87 && currentOctave > 0) {
			// pressed the 'W' key, we're going down an octave
			this.keySynth = generateKeyboardSynth(currentOctave - 1, keyboardLayout);
			this.setState(prevState => ({
				currentOctave: prevState.currentOctave - 1,
			}));
			return;
		}

		if (e.keyCode === 88 && currentOctave < 10) {
			// pressed the 'X' key, we're going up an octave
			this.keySynth = generateKeyboardSynth(currentOctave + 1, keyboardLayout);
			this.setState(prevState => ({
				currentOctave: prevState.currentOctave + 1,
			}));
			return;
		}

		if (e.keyCode === 16) {
			// turn on sustain
			this.setState({
				midiMsg: {
					type: messages.SUSTAIN,
					pitch: 127, // on
					velocity: 100,
				},
			});
			return;
		}

		if (e.keyCode !== 87 && e.keyCode !== 88 && e.keyCode !== 16) {
			// send a note on event, only if we're pressing a 'note' key.
			// TODO - this should set midiMsg to a TRUE midi messages, or at least the sort of message that's received and sent through by the midi controller
			const pitch = this.keySynth[e.keyCode];

			this.setState({
				midiMsg: {
					type: messages.NOTE_ON,
					pitch,
					velocity: 100,
				},
			});
		}
	}

	_handleKeyUp = (e) => {
		const { controlled } = this.props;

		if (!controlled) {
			return;
		}

		// update depressed keys
		this.lastEvent = null;
		this.heldKeys[e.keyCode] = undefined;

		if (!this.shouldHandleKeyUpdate(e)) {
			// don't handle updates for keys we don't want to listen to.
			return;
		}

		if (e.keyCode === 16) {
			// turn off sustain
			this.setState({
				midiMsg: {
					type: messages.SUSTAIN,
					pitch: 0, // off
					velocity: 100,
				},
			});
		}

		if (e.keyCode === 87 || e.keyCode === 88 || e.keyCode === 16) {
			// we're changing the octave or stopping sustain; we don't want to send a note off event to get continuous playback
			return;
		}

		// set noteoff midi message to state.
		const pitch = this.keySynth[e.keyCode];

		this.setState({
			midiMsg: {
				type: messages.NOTE_OFF,
				pitch,
				velocity: 100,
			},
		});
	}

	render = () => {
		const { midiMsg } = this.state;
		// we're using children-as-a-function to pass a new midi message through

		return this.props.children(midiMsg);
	}
}

export default ComputerKeyboard;
