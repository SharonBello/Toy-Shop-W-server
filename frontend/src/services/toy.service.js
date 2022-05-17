import Axios from 'axios'

// const STORAGE_KEY = 'toy'
// const BASE_URL = '/api/toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getAllToys
}

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/toy/'
        : 'http://localhost:3030/api/toy/'

var axios = Axios.create({
    withCredentials: true,
})

function getAllToys() {
    query()
        .then(toys => toys)
}

function query(filterBy){
    console.log('filter by - query -toy.service', filterBy)
    const {txt = '', inStock = '', labels ='', pageIdx = '', sortBy = ''} = filterBy
    const url = `?txt=${txt}&inStock=${inStock}&labels=${labels}&pageIdx=${pageIdx}&sortBy=${sortBy}`

    const urlToRequest = BASE_URL+url
    console.log('urlToSend', urlToRequest)
    return axios.get(urlToRequest)
        .then(res => res.data)
}

function getById(toyId) {
    return axios.get(BASE_URL + toyId).then(res => res.data)
}

function remove(toyId) {
    return axios.delete(BASE_URL + toyId).then(res => res.data)
}

function save(toy) {
    console.log('toy', toy)
    if (toy._id) {
        console.log('BASE_URL + toy._id',BASE_URL + toy._id )
        return axios.put(BASE_URL + toy._id, toy).then(res => res.data)
    } else {
        console.log('BASE_URL',BASE_URL)
        return axios.post(BASE_URL, toy).then(res => res.data)
    }
}
