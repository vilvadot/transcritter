const fs = require("fs")
const path = require("path")
const AWS = require("aws-sdk")
const { StartTranscription } = require("./StartTranscription")
const { S3 } = require("../services/S3")
const { Transcribe } = require("../services/Transcribe");
const CONFIG = require('../config')

describe("StartTranscription", () => {
  afterAll(async () => {
    await new S3().deleteAll()
  })

  it("starts a transcription job with the provided audio file", async () => {
    Date.now = jest.fn().mockReturnValue('123')
    forceTranscriptionSuccess()
    const inputLocation = `some-bucket/anAudio file.mp3`
    const jobName = `transcritter-123-anaudio_file.mp3`

    await StartTranscription.run(inputLocation)

    expect(Transcribe.start).toHaveBeenCalledWith(jobName, inputLocation)
  })

  const forceTranscriptionSuccess = () => {
    Transcribe.start = jest.fn().mockReturnValue("OK")
  }
})
