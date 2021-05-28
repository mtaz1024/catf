import axios from '../http'
import {base} from '../base'


export const createForm = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/createForm',
        data
    })
}

export const updateForm = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/updateForm',
        data
    })
}

export const getForm = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/post/getForm',
        params
    })
}

export const uploadImage = params => {
    return axios({
        method: 'post',
        url: base.baseURL + '/image/uploadImage',
        params
    })
}

export const createImage = (data, params) => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/createImage',
        data,
        params
    })
}

export const updateImage = (data, params) => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/updateImage',
        data,
        params
    })
}

export const getImage = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/post/getImage',
        params
    })
}

export const getPostByUser = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/post/myPosts',
        params
    })
}

export const deleteOnePost = params => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/deleteOne',
        params
    })
}

export const deleteBatchPost = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/deleteBatch',
        data,
    })
}

export const deleteAllPost = params => {
    return axios({
        method: 'post',
        url: base.baseURL + '/post/deleteAll',
        params
    })
}

export const getTopPost = params =>{
    return axios({
        method: 'get',
        url: base.baseURL + '/post/topPost',
        params
    })
}

