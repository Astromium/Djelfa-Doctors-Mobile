import axios from 'axios';
import config from './config'


const endPoint = config.baseUrl;

const createReport = async (req) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${endPoint}/reports`,
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
    createReport
}