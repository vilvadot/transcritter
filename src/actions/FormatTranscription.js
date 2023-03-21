const { S3 } = require("../services/S3");
const { resultExtension } = require("../config");
const { PlainTextOutput } = require("../PlainTextOutput");
const Transcription = require("../Transcription");

const INPUT_EXTENSION = ".json";

class FormatTranscription {
  static async run(bucket, key) {
    console.log('running: FormatTranscription')
    console.log('file:', key)
    const Repository = new S3({ bucket });

    const name = this.removeExtension(key);
    const input = await Repository.retrieve(key);
    const transcription = input ? Transcription.from(JSON.parse(input)) : null;
    const formatted = PlainTextOutput.from(transcription);
    console.log('formatted correctly')

    const resultKey = resultFilename(name);

    await Repository.store(resultKey, formatted);
    console.log('FormatTranscription finished!')
    return resultKey;
  }

  static removeExtension(filename) {
    return filename.split(INPUT_EXTENSION)[0];
  }

  static getKeyFrom(event) {
    return decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );
  }
}

const resultFilename = (filename) => {
  return `${filename}${resultExtension}`;
};

module.exports = { FormatTranscription, resultFilename };
