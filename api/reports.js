import axios from 'axios';
const endPoint = 'http://192.168.1.7:3000/api/v1'

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