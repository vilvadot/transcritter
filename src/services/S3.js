const AWS = require("aws-sdk");
const CONFIG = require("../config");

class S3 {
  constructor({ bucket } = {}) {
    this.client = new AWS.S3({
      s3ForcePathStyle: true,
      signatureVersion: "v4",
    });
    if (CONFIG.s3.endpoint) {
      this.client.endpoint = CONFIG.s3.endpoint;
    }
    this.bucket = bucket || CONFIG.s3.bucket;
  }

  async retrieve(file) {
    const params = {
      Bucket: this.bucket,
      Key: file,
    };
    const response = await this.client.getObject(params).promise();
    return response.Body.toString();
  }

  async store(path, file) {
    const params = {
      Bucket: this.bucket,
      Key: path,
      Body: file,
    };
    return await this.client.putObject(params).promise();
  }

  async deleteAll() {
    const params = {
      Bucket: this.bucket,
    };
    const response = await this.client.listObjectsV2(params).promise()
    if (response.Contents) await this._deleteContents(response.Contents);
  }

  async delete(key) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };
    return this.client.deleteObject(params).promise();
  }

  _deleteContents(contents) {
    contents.forEach(async (object) => {
      await this.delete(object.Key);
    });
  }
}

exports.S3 = S3;
