const { runAction, handler } = require("./format");
const { FormatTranscription } = require("../src/actions/FormatTranscription");

jest.mock("../src/actions/FormatTranscription.js");

class Action {
  static run = jest.fn();
}

describe("lambda: format", () => {
  it("runs FormatTranscription", async () => {
    await handler(anEvent());

    expect(FormatTranscription.run).toHaveBeenCalled();
  });
  it("calls an action on the trigger's event bucket and key", async () => {
    const aBucket = "aBucket";
    const aKey = "aKey";
    const event = anEvent({ bucket: aBucket, key: aKey });

    await runAction(event, Action);

    expect(Action.run).toHaveBeenCalledWith(aBucket, aKey);
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
