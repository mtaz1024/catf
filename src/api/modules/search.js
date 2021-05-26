import axios from '../http'
import {base} from '../base'

export const search = (data, params) =>{
    return axios({
        method: 'post',
        url: base.baseURL + '/search',
        data,
        params
    })
}