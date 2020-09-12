import config from './config'
import axios from 'axios';

const endPoint = config.baseUrl

const createRequest = async (req) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${endPoint}/requests`,
            data: req
        })
        if (res.data.status === 'success') {
            return res.data
        }
    } catch (err) {
        console.log(err);
    }
}

export default {
    createRequest
}