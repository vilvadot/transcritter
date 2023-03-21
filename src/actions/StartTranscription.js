const { Transcribe } = require("../services/Transcribe");
const { namespace } = require("../config");
const { sanitizeFilename } = require("./sanitize-filename");

class StartTranscription {
  static async run(input) {
    console.log('running: StartTranscription')
    console.log("file:", input)
    const filename = sanitizeFilename(getS3ObjectPath(input))
    const status = await Transcribe.start(`${namespace}-${Date.now()}-${filename}`, input);
    console.log(`StartTranscription finished with status: ${status}`)
  }
}

const getS3ObjectPath = (s3Path) => {
  const splitted = s3Path.split("/");
  return splitted[splitted.length - 1]
}

exports.StartTranscription = StartTranscription;
