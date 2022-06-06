import axios from '../http'
import {base} from '../base'


// 用户列表
export const getAllUser = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/admin/getAllUser',
        params
    })
}

// 帖子列表
export const getAllPost = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/admin/getAllPost',
        params
    })
}

// 领养列表
export const getAllAdopt = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/admin/getAllAdopt',
        params
    })
}