class Dialog {
  static from(raw){
    const result = []
    const words = raw.results.items;
    const labels = new Labels(raw.results.speaker_labels.segments);
    let contribution = new Contribution();

    contribution.setSpeaker(labels.getFirstSpeaker());

    words.forEach((word) => {
      const speaker = labels.getSpeaker(word);
  
      if (!contribution.speakerEquals(speaker)) {
        result.push(contribution);
        contribution = new Contribution().setSpeaker(speaker);
      }
  
      contribution
      .setStart(word.start_time)
      .setEnd(word.end_time)
      .add({
        start: word.start_time,
        content: word.alternatives[0].content,
      });
    });
    
    result.push(contribution);

    return this._serialize(result)
  }

  static _serialize(result){
    return result.map((dialog) => dialog.serialize())
  }
}

class Contribution {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.words = [];
  }

  setStart(time) {
    if (!this.start) this.start = time;
    return this;
  }

  setEnd(time) {
    if (time) this.end = time;
    return this;
  }

  setSpeaker(speaker) {
    this.speaker = speaker;
    return this;
  }

  speakerEquals(speaker) {
    if (!speaker) return true;
    return this.speaker === speaker;
  }

  add(word) {
    this.words.push(word);
  }

  serialize() {
    return {
      speaker: this.speaker,
      start: this.start,
      end: this.end,
      words: this.words,
    };
  }
}

class Labels {
  constructor(labels) {
    this.labels = labels.reduce((result, group) => {
      group.items.forEach((label) => result.push(label));
      return result;
    }, []);
  }

  getFirstSpeaker() {
    return this.labels[0].speaker_label;
  }

  getSpeaker(word) {
    const matchingLabel = this.labels.find(
      ({ start_time }) => start_time === word.start_time
    );
    return matchingLabel ? matchingLabel.speaker_label : null
  }
}

module.exports = Dialog