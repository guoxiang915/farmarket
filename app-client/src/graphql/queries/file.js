import { gql } from '@apollo/client';

export const GET_UPLOAD_FILE_URL_QUERY = gql`
  query getUploadFileUrlQuery($file: FileInput!) {
    getUploadFileUrl(file: $file)
  }
`;

export const GET_UPLOAD_FILES_URL_QUERY = gql`
  query getUploadFilesUrlQuery($files: [FileInput!]) {
    getUploadFilesUrl(files: $files)
  }
`;
