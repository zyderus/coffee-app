import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://da-pizza-react-default-rtdb.asia-southeast1.firebasedatabase.app/',
})

export default instance
