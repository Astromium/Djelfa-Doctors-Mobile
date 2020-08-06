import client from './client';
import cache from '../utility/cache'
import axios from 'axios';

const baseUrl = 'http://192.168.1.7:3000/api/v1';

const endPoint = 'doctors';

//const getAllDoctors = () => client.get(endPoint);
//const getDoctor = (id) => client.get(`${endPoint}/${id}`);
//const getDoctors = (spec) => client.get(`${endPoint}/specialities/${spec}`);
const search = (query) => client.get(`${endPoint}/search/${query}`)

const getAllDoctors = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/doctors`
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
            console.log('gottem from cache lel')
            return cacheData.value.find(doc => doc._id.toString() === id.toString());
        } else {
            const response = await fetch(`http://192.168.1.7:3000/api/v1/doctors/${id}`)
            const resJson = await response.json();
            console.log('gottem from server')
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
            console.log('gottem from cache')
            return cacheData.value.filter(doc => doc.speciality === spec);
        } else {
            const response = await fetch(`http://192.168.1.7:3000/api/v1/doctors/specialities/${spec}`);
            const resJson = await response.json();
            console.log('gottem from server')
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
    search
}