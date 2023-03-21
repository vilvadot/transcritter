const parseEvent = (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  return {
    bucket,
    key
  }
}

module.exports = {parseEvent}