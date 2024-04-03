const mongodb = require("mongodb");
const dbname = "myapp";

const db = client.db(dbName);

const bucket = new mongodb.GridFSBucket(db, { bucketName: 'myCustomBucket' });
fs.createReadStream('./myFile').
     pipe(bucket.openUploadStream('myFile', {
         chunkSizeBytes: 1048576,
         metadata: { field: 'myField', value: 'myValue' }
     }));