const CONFIG = require("../config");
const {S3} = require("../services/s3");
const {FormatTranscription, resultFilename} = require("./FormatTranscription");

describe("FormatTranscription", () => {
  const STORAGE = new S3();

  afterEach(async () => {
    await STORAGE.deleteAll();
  });

  it("generates a formatted transcription from raw input", async () => {
    const input = "aFile.json";
    const transcription = "00:00\nHola.\n\n";
    await storeInput(input, JSON.stringify(aTranscription));

    const output = await FormatTranscription.run(CONFIG.s3.bucket, input);

    const result = await retrieveOutput(output);
    expect(result).toEqual(transcription);
  });

  it("generates an empty transcription if input does not exist", async () => {
    const input = "anEmptyFile.json";
    const empty = "";
    await storeInput(input, empty);

    const output = await FormatTranscription.run(CONFIG.s3.bucket, input);

    const result = await retrieveOutput(output);
    expect(result).toEqual(empty);
  });

  const retrieveOutput = async (filename) => {
    return await STORAGE.retrieve(filename);
  };

  const storeInput = async (filename, content) => {
    await STORAGE.store(filename, content);
  };

  const aTranscription = {
    jobName: "Hola",
    accountId: "839597465288",
    results: {
      transcripts: [{ transcript: "Hola." }],
      speaker_labels: {
        speakers: 1,
        segments: [
          {
            start_time: "0.54",
            speaker_label: "spk_0",
            end_time: "1.55",
            items: [
              { start_time: "0.54", speaker_label: "spk_0", end_time: "1.03" },
              { start_time: "1.04", speaker_label: "spk_0", end_time: "1.21" },
            ],
          },
        ],
      },
      items: [
        {
          start_time: "0.54",
          end_time: "1.03",
          alternatives: [{ confidence: "0.942", content: "Hola" }],
          type: "pronunciation",
        },
        {
          alternatives: [{ confidence: "0.0", content: "." }],
          type: "punctuation",
        },
      ],
    },
    status: "COMPLETED",
  };
});
