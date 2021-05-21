import axios from '../http'
import {base} from '../base'


// 申请
export const apply = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/apply',
        params
    })
}

// 取消
export const cancel = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/cancel',
        params
    })
}

// 拒绝
export const refuse = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/refuse',
        params
    })
}

// 通过
export const pass = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/pass',
        params
    })
}

// 我的申请列表
export const getMyApply = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/getMyApply',
        params
    })
}

// 收到的申请列表
export const getOtherApply = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/getOtherApply',
        params
    })
}

// 获取领养列表
export const getAdopt = params => {
    return axios({
        method: "get",
        url: base.baseURL + '/adopt/getAdopt',
        params
    })
}

// 获取领养信息
export const getApplyInfo = params => {
    return axios({
        method: "get",
        url: base.baseURL + '/adopt/getInfo',
        params
    })
}

export const getAdoptByUser = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/user',
        params
    })
}

export const getAdoptByUserAll = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/user/all',
        params
    })
}

export const deleteOne = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/delete/one',
        params
    })
}

export const deleteBatch = params => {
    return axios({
        method: 'post',
        url: base.baseURL + '/adopt/delete/batch',
        params
    })
}

export const deleteAll = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/adopt/delete/all',
        params
    })
}