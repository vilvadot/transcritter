const AWS = require("aws-sdk");
const CONFIG = require("../config");

const defaultConfig = {
  LanguageCode: "es-ES",
  MediaFormat: "mp3",
  Settings: {
    MaxSpeakerLabels: 2,
    ShowSpeakerLabels: true,
  },
};
const STATUS_OK = "OK";
const STATUS_ERROR = "ERROR";

class Transcribe {
  static async start(jobName, path) {
    if (!jobName) throw new Error("Invalid jobName");
    if (!path) throw new Error("Invalid input file");

    const input = `s3://${path}`;

    console.log("Configuring Transcription service");
    const client = new AWS.TranscribeService({
      region: CONFIG.region,
    });

    if (CONFIG.transcribe.endpoint) {
      client.endpoint = CONFIG.transcribe.endpoint;
    }
    console.log("Starting Transcription job");
    try {
      await client.startTranscriptionJob({
        Media: {
          MediaFileUri: input,
        },
        TranscriptionJobName: jobName,
        OutputBucketName: CONFIG.s3.bucket,
        ...defaultConfig,
      }).promise()
    } catch (error) {
      console.log(error);
      return STATUS_ERROR;
    }
    return STATUS_OK;
  }
}

exports.Transcribe = Transcribe;
