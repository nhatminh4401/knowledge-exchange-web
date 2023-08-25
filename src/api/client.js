import axios from 'axios';
import queryString from 'query-string';
import {
  AUTH_API_URL,
  QUESTION_API_URL,
  USER_API_URL,
} from '../utils/constants';

export const questionClient = axios.create({
  baseURL: QUESTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const userClient = axios.create({
  baseURL: USER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
