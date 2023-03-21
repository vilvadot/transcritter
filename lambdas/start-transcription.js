const { StartTranscription } = require("../src/actions/StartTranscription");
const {parseEvent} = require('./utils')

const handler = async (event, context, callback) => {
  await runAction(event, StartTranscription)
};

const runAction = async (event, action) => {
  const {bucket, key} = parseEvent(event)
  const input = `${bucket}/${key}`;

  await action.run(input);
};

module.exports = {
  handler,
  runAction
}