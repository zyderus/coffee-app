import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://coffee-heads-9bd66-default-rtdb.asia-southeast1.firebasedatabase.app/',
})

export default instance
