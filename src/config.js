module.exports = {
  namespace: 'transcritter',
  resultExtension: '.txt',
  region: "eu-west-1",
  s3: {
    bucket: process.env.S3_BUCKET,
    endpoint: process.env.S3_ENDPOINT,
  },
  transcribe: {
    endpoint: process.env.TRANSCRIPTION_ENDPOINT,
  }
}