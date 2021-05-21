import axios from '../http'
import {base} from '../base'

export const register = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/user/register',
        data
    })
}

export const login = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/user/login',
        data
    })
}

export const logout = () => {
    return axios({
        method: 'get',
        url: base.baseURL + '/user/logout',
    })
}


