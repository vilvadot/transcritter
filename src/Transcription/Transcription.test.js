const Transcription = require('./Transcription')
const TWO_SPEAKERS_RAW = require("./two_speakers");

describe("Transcription", () => {
  it("start time corresponds to start time of first detected word", () => {
    const transciption = Transcription.from(TWO_SPEAKERS_RAW);

    const firstWord = TWO_SPEAKERS_RAW.results.items[0];
    expect(transciption.startTime).toEqual(firstWord.start_time);
  });

  it("end time corresponds to end time of last detected word", () => {
    const transciption = Transcription.from(TWO_SPEAKERS_RAW);

    const numWords = TWO_SPEAKERS_RAW.results.items.length;
    const lastWord = TWO_SPEAKERS_RAW.results.items[numWords - 1];
    expect(transciption.endTime).toEqual(lastWord.end_time);
  });

  it("identifies speakers", () => {
    const transciption = Transcription.from(TWO_SPEAKERS_RAW);

    expect(transciption.speakers.length).toEqual(2);
    expect(transciption.speakers[0]).toEqual('spk_0');
    expect(transciption.speakers[1]).toEqual('spk_1');
  });

  it("composes a dialog", () => {
    const transcription = Transcription.from(TWO_SPEAKERS_RAW);

    const dialog = transcription.dialog
    const firstSentence = dialog[0];
    expect(dialog.length).toEqual(2);

    expect(firstSentence.start).toEqual("0.94");
    expect(firstSentence.end).toEqual("2.85");
    expect(firstSentence.words.length).toEqual(6);

    const secondSentence = dialog[1];
    expect(secondSentence.start).toEqual("3.94");
    expect(secondSentence.end).toEqual("5.45");
    expect(secondSentence.words.length).toEqual(5);
  });
});
