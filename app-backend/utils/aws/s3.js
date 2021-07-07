import { S3, Endpoint } from 'aws-sdk';

const s3 = new S3({
  s3ForcePathStyle: true,
  region: process.env.AWS_REGION || 'localhost',
  endpoint:
    process.env.AWS_S3_ENDPOINT && new Endpoint(process.env.AWS_S3_ENDPOINT),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'S3RVER',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'S3RVER',
  },
});

export default s3;
