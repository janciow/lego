import axios from 'axios';

const baseURL = `${window.location.origin.split(':')[0]}:${window.location.origin.split(':')[1]}:8080/api`

export default axios.create({
  baseURL
});