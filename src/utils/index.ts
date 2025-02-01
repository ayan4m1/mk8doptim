export const noteToFreq = (note: number) => 440 * Math.pow(2, (note - 69) / 12);

export const MIDI_NOTE_ON = 144;
export const MIDI_NOTE_OFF = 128;
