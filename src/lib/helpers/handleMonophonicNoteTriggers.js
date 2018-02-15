import { midiMessages } from "../constants";
import { append, without, last } from "ramda";
import { noteParser } from "./noteParser";
import Tone from "tone";
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

    // simply switch to another note if we already are holding down a note
    if (someClass.lastPlayingNote) {
      someClass.audioNode.setNote(noteToTrigger);
    }

    // otherwise, trigger a new note
    if (!someClass.lastPlayingNote && noteToTrigger) {
      someClass.audioNode.triggerAttack(noteToTrigger, Tone.context.currentTime, velocity / 100);
    }

    // remember which note we last triggered
    someClass.lastPlayingNote = noteToTrigger;
  }

  // if nothing is depressed anymore & sustain is off, kill the audioNode
  if (!someNoteIsDepressed && !someClass.sustained) {
    someClass.audioNode.triggerRelease();
    someClass.lastPlayingNote = undefined;
  }
};
