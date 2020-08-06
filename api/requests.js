
import axios from 'axios';
const endPoint = 'http://192.168.1.7:3000/api/v1'

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