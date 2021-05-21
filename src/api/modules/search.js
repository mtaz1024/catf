import axios from '../http'
import {base} from '../base'

export const search = params =>{
    return axios({
        method: 'get',
        url: base.baseURL + '/search',
        params
    })
}