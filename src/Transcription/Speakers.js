class Speakers {
  static from(raw){
    const contributions = raw.results.speaker_labels.segments;
    return contributions.reduce((speakers, currentContribution) => {
      if (!speakers.includes(currentContribution.speaker_label)) {
        speakers.push(currentContribution.speaker_label);
      }
      return speakers;
    }, []);
  };
}

module.exports = Speakers