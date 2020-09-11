import axios from 'axios';
const endPoint = 'https://djelfa-doctors.herokuapp.com/api/v1'

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