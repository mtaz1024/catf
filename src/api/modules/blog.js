import axios from '../http'
import {base} from '../base'


// 新建
export const save = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/blog/save',
        data
    })
}

// 某一篇
export const get = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/blog/get',
        params
    })
}

// 某用户的所有blog
export const getAll = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/blog/getAll',
        params
    })
}

// 删除
export const deleteBlog = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/blog/delete',
        params
    })
}

// 隐藏
export const hidden = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/blog/hidden',
        params
    })
}