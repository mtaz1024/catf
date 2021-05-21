import axios from '../http'
import {base} from '../base'

export const getProfile = params => {
    return axios({
        method: 'get',
        url: base.baseURL + '/profile/get',
        params
    })
}

export const saveProfile = data => {
    return axios({
        method: 'post',
        url: base.baseURL + '/profile/save',
        data
    })
}

// export const saveAvatar