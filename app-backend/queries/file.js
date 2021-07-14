import { v4 as uuid } from 'uuid';
import knex from '../utils/knex';
import s3 from '../utils/aws/s3';

export const getUploadFileUrl = async (
  parent,
  { file, permission = 'private' },
  context
) => {
  const { name } = file || {};
  const userData = await knex('Users')
    .where('email', (context.user && context.user.email) || '')
    .then(users => users[0]);

  if (!userData) {
    throw new Error('User should be existing');
  }

  const date = new Date();
  const fileId = uuid();
  const key = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    userData.id,
    fileId,
    name || '',
  ].join('/');

  const result = await new Promise((resolve, reject) =>
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        ACL: permission,
      },
      (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      }
    )
  );

  return result;
};

export const getUploadFilesUrl = async (
  parent,
  { files, permission = 'public-read' },
  context
) => {
  const filesData = await Promise.all(
    files.map(file => getUploadFileUrl(parent, { file, permission }, context))
  );

  return filesData;
};
