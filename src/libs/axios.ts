import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://www.googleapis.com/gmail/v1/users/me',
});
