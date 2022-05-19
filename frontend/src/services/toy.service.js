import Axios from 'axios'
import { getActionRemoveToy, getActionAddToy, getActionUpdateToy } from '../store/actions/toy.action.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'toy'
// const BASE_URL = '/api/toy/'
const toyChannel = new BroadcastChannel('toyChannel')

export const toyService = {
    query,
    getById,
    save,
    remove,
    getAllToys,
    getNumOfPages,
    subscribe,
    unsubscribe
}
const PAGE_SIZE = 4
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

async function query(filterBy = {} ){
    console.log('filter by - query -toy.service', filterBy)
    
    const {txt = '', inStock = '', labels ='', pageIdx = '', sortBy = 'createdAt'} = filterBy
    const url = `?txt=${txt}&inStock=${inStock}&labels=${labels}&pageIdx=${pageIdx}&sortBy=${sortBy}`
    const urlToRequest = BASE_URL+url
    const toys = await axios.get(urlToRequest)
    if(pageIdx === '') return toys
    let fromIdx = +filterBy.pageIdx * PAGE_SIZE
    let toysByPage = toys.data.slice(fromIdx, fromIdx+PAGE_SIZE)
    // return toys.data
    return toysByPage
}

function getById(toyId) {
    // return axios.get(BASE_URL + toyId).then(res => res.data)
    const toy = httpService.get(`toy/${toyId}`)
    return toy
}

async function remove(toyId) {
    
    // await axios.delete(BASE_URL + toyId)
    await httpService.delete(`toy/${toyId}`)
    toyChannel.postMessage(getActionRemoveToy(toyId))
    return toyId
}

async function save(toy) {
    var savedToy
    if (toy._id) {
        console.log('BASE_URL + toy._id',BASE_URL + toy._id )
        // savedToy = await httpService.put(`toy/${toy._id}`,toy)
        savedToy = await axios.put(BASE_URL + toy._id, toy)
        savedToy = savedToy.data
        toyChannel.postMessage(getActionUpdateToy(savedToy))
    } else {
        savedToy = await axios.post(BASE_URL, toy)
        savedToy = savedToy.data
        toyChannel.postMessage(getActionAddToy(savedToy))
    }
    return savedToy
}


async function getNumOfPages() {

    const toys = await query()    
    const toysQty = toys.data.length / PAGE_SIZE
    return toysQty
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function subscribe(listener) {
    toyChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    toyChannel.removeEventListener('message', listener)
}
