import axios from 'axios'

const stockTwitAPI = axios.create({
    baseURL: 'https://api.stocktwits.com/api/2'
})

export default stockTwitAPI;