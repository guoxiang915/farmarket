import { S3 } from 'aws-sdk';

const s3 = new S3({
  s3ForcePathStyle: true,
  region: process.env.AWS_REGION || 'localhost',
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID || 'S3RVER',
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY || 'S3RVER',
  },
});

console.log(process.env.AWS_ACCESS_KEY_ID);

console.log(process.env.S3_AWS_ACCESS_KEY_ID);
export default s3;
