const {FormatTranscription} = require("../src/actions/FormatTranscription")
const {parseEvent} = require('./utils')

const handler = async (event, context, callback) => {
  await runAction(event, FormatTranscription)
};

const runAction = async (event, action) => {
  const {bucket, key} = parseEvent(event)

  await action.run(bucket, key)
}

module.exports = {
  handler,
  runAction
}