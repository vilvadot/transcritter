## What is this?

Transcritter is a tool to help automate the creation of transcriptions from audio files. The way it works is:

![transcritter](https://user-images.githubusercontent.com/8507571/101241172-33911b80-36f4-11eb-81f9-9d660dbe41bf.png)


1. Upload an MP3 file to an S3 bucket
2. This triggers a lambda that will set up an AWS Transcribe transcription job
3. Once it finished another lambda is triggered over the result to format it

- The input file **must be an MP3** although Transcribe accepts also MP4, or WAV file formats
- Less than 4 hours in length or less than 2 Gb of audio data
- Transcription settings are currently hardcoded on services/Transcribe

## Deploying

Using serverless framework this will create:

* S3 **transcritter-transcriptions buket**
* Lambda **transcritter-dev-format-transcription**
* Lambda **transcritter-dev-start-transcription**		

1. Set up a serverless AWS profile:
   `serverless config credentials --provider aws --key {AWS_KEY} --secret {AWS_SECRET} --profile transcritter `

> IMPORTANT: Use an IAM user with limited permissions. You can use ./deployer-policy.json. (be aware that it has full permissions over transcritter-\* named S3 resources)**

2. Run `make deploy`