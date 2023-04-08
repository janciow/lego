import axios from 'axios';

const baseURL = `${window.location.origin.split(':')[0]}:${window.location.origin.split(':')[1]}:5000/api`

export default axios.create({
  // baseURL
});