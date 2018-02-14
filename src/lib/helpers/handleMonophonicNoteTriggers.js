import { midiMessages } from "../constants";
import { append, without, last } from "ramda";
import { noteParser } from "./noteParser";

// handle midi messages for the specific audioNode class that is using the function.
// note that we're assigning statics on the class, to remember which notes have been
// played before. Got to store them somewhere. On the class itself seems fine for now.
export const handleMonophonicNoteTriggers = (midiMsg, someClass) => {
  const { type, pitch, velocity } = midiMsg;

  const parsedPitch = noteParser(pitch);

  if (type === midiMessages.SUSTAIN) {
    if (velocity === 127) {
      someClass.sustained = true;
    } else {
      someClass.sustained = false;
    }
  }

  // save which notes are currently playing based on the midi msg
  if (type === midiMessages.NOTE_ON) {
    someClass.playingNotes = append(parsedPitch, someClass.playingNotes);
  }

  if (type === midiMessages.NOTE_OFF) {
    someClass.playingNotes = without(parsedPitch, someClass.playingNotes);
  }

  const someNoteIsDepressed = someClass.playingNotes && someClass.playingNotes.length > 0;

  // trigger the audioNode for the last note in playingNotes (it's monophonic after all);
  if (someNoteIsDepressed) {
    const noteToTrigger = last(someClass.playingNotes);

    if (noteToTrigger !== someClass.lastPlayingNote) {
      someClass.audioNode.triggerAttack(noteToTrigger);
    }
    someClass.lastPlayingNote = noteToTrigger;
  }

  // if nothing is depressed anymore & sustain is off, kill the audioNode
  if (!someNoteIsDepressed && !someClass.sustained) {
    someClass.audioNode.triggerRelease();
    someClass.lastPlayingNote = undefined;
  }
};
