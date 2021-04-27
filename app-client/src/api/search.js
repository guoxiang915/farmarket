import { mockSearchResult, mockDataDetail } from './mock';

export const advancedSearchData = async (query, filters) => {
  console.log(query, filters);
  return Promise.resolve(mockSearchResult);
};

export const getDataDetail = async id => {
  console.log(id);
  return Promise.resolve(mockDataDetail);
};
