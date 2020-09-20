import axios from 'axios';

const BASE_URL = "api/persons";

const getAll = () => {
    return axios.get(BASE_URL).then(res => res.data);
}

const create = (person) => {
    return axios.post(BASE_URL, person).then(res => res.data).catch(err => new Error(err.response.data.error));
}

const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`).then(res => res.data).catch(err => new Error(err.response.data.error));
}

const update = (id, person) => {
    return axios.put(`${BASE_URL}/${id}`, person).then(res => res.data).catch(err => new Error(err.response.data.error));
}

export default { getAll, create, deletePerson, update }