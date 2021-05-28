import axios from '../http'
import {base} from '../base'


// 新建
export const save = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/event/save',
        data
    })
}

// 获取列表
export const getAll = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/event/getAll',
        params
    })
}