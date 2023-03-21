const { runAction, handler } = require("./start-transcription");
const { StartTranscription } = require("../src/actions/StartTranscription");

jest.mock("../src/actions/StartTranscription.js");

class Action {
  static run = jest.fn();
}

describe("lambda: start-transcription", () => {
  it("runs StartTranscription", async () => {
    await handler(anEvent());

    expect(StartTranscription.run).toHaveBeenCalled();
  });

  it("calls action over the file input extracted from the trigger's event", async () => {
    const aBucket = "aBucket";
    const aKey = "aKey";
    const event = anEvent({ bucket: aBucket, key: aKey });
    const input = `${aBucket}/${aKey}`;

    await runAction(event, Action);

    expect(Action.run).toHaveBeenCalledWith(input);
  });

  const defaultParams = { key: "testFile.json", bucket: "aBucket" };
  const anEvent = ({
    key = defaultParams.key,
    bucket = defaultParams.bucket,
  } = defaultParams) => {
    return {
      Records: [
        {
          s3: {
            bucket: {
              name: bucket,
            },
            object: {
              key,
            },
          },
        },
      ],
    };
  };
});
