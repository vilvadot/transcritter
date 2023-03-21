const LINE_BREAK = "\n";
const PARAGRAPH_BREAK = `${LINE_BREAK}${LINE_BREAK}`;
const EMPTY = "";

const WORDS_IN_PARAGRAPH = 60;

class PlainTextOutput {
  static from(transcription) {
    if (!transcription) return EMPTY;

    let result = "";

    transcription.forEachInteraction(({ start, speaker, words }) => {
      result += this.printTimeMark(start, speaker);

      let counter = 0;
      words.forEach((word, index) => {
        const isFirst = counter === 0
        const SPACING = !isFirst ? " " : '';
        counter++;

        if (this.isPunctuation(word.content)) result += `${word.content}`;
        if (!this.isPunctuation(word.content)) result += `${SPACING}${word.content}`;

        if (counter >= WORDS_IN_PARAGRAPH && this.isPunctuation(word.content)) {
          const nextWord = words[index + 1];
          if(!nextWord) return
          result += PARAGRAPH_BREAK;
          result += this.printTimeMark(nextWord.start);
          counter = 0;
        }
      });
      result += PARAGRAPH_BREAK
    });
    return result;
  }

  static isLast = (items, index) => {
    return index === items.length - 1
  };

  static isPunctuation = (character) => {
    const PUNCTUATION = [".", ",", "?", "!", "¿"];
    return PUNCTUATION.includes(character);
  };

  static printTimeMark = (time) => {
    return `${convertToMinutes(time)}${LINE_BREAK}`;
  };
}

const convertToMinutes = (time) => {
  if (time < 1) return `00:00`;
  if (time < 60) return `00:${Math.floor(time)}`;
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if(seconds < 10) seconds = `0${seconds}`
  return `${minutes}:${seconds}`;
};


module.exports = { PlainTextOutput };
