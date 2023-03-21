const AWS = require("aws-sdk");
const { Transcribe } = require("./Transcribe");
const CONFIG = require("../config");

describe("Transcribe", () => {
  describe("AWS", () => {
    it("starts a transcription job for the given file", async () => {
      forceTranscriptionSuccess();
      const aFileKey = "some-bucket/aFile.mp3";
      const transcribeParams = {
        Media: {
          MediaFileUri: `s3://${aFileKey}`,
        },
      };

      const response = await Transcribe.start("aName", aFileKey);

      expect(response).toBe("OK");
      expect(
        AWS.TranscribeService.prototype.startTranscriptionJob
      ).toHaveBeenCalledWith(expect.objectContaining(transcribeParams));
    });

    it("handles a job setup failure", async () => {
      forceTranscriptionError();

      const response = await Transcribe.start("aName", "aFile.mp3");

      expect(response).toBe("ERROR");
    });
  });

  const forceTranscriptionError = () => {
    AWS.TranscribeService.prototype.startTranscriptionJob = jest
      .fn()
      .mockImplementation(({}) => ({
        promise: () => Promise.reject("This simulates a failed job setup"),
      }));
  };

  const forceTranscriptionSuccess = () => {
    AWS.TranscribeService.prototype.startTranscriptionJob = jest
      .fn()
      .mockImplementation(({}) => ({ promise: () => Promise.resolve() }));
  };
});
