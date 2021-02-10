import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-dcd9c-default-rtdb.firebaseio.com',
});

export default instance;
