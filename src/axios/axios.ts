import axios from 'axios';
import { getToken } from 'helpers/auth';

//I leave a domain name hardcoded here because we are using json-server and our separate backend as well
//it causes that we have to different connection strings
//in the future it must we change to env variable

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { Authorization: `Bearer ${getToken()}` },
});
