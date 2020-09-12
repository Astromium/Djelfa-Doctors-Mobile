import config from './config'
import cache from '../utility/cache'
import axios from 'axios';

const baseUrl = `${config.baseUrl}/doctors`;


const getAllDoctors = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}`
        });
        if (res.data.status === 'success') {
            return res.data
        }
    } catch (err) {
        console.log(err);
    }
}

const getDoctor = async (id) => {
    try {
        const cacheData = await cache.get('data');
        if (cacheData) {
            //console.log('gottem from cache lel')
            return cacheData.value.find(doc => doc._id.toString() === id.toString());
        } else {
            const response = await fetch(`${baseUrl}/${id}`)
            const resJson = await response.json();
            //console.log('gottem from server')
            return resJson.doctor
        }
    } catch (err) {
        console.log(err)
    }
}

const getDoctors = async (spec) => {
    try {
        // get doctors from cache
        const cacheData = await cache.get('data');
        if (cacheData) {
            //console.log('gottem from cache')
            return cacheData.value.filter(doc => doc.speciality === spec);
        } else {
            const response = await fetch(`${baseUrl}/specialities/${spec}`);
            const resJson = await response.json();
            //console.log('gottem from server')
            return resJson.doctors;
        }
    } catch (err) {
        console.log(err);
    }
}

export default {
    getAllDoctors,
    getDoctor,
    getDoctors,
}