import axios from 'axios'

import {auth0Config, services} from '../../config'

const serverAxios = axios.create({
  baseURL: services.server_url
})


serverAxios.interceptors.response.use(
  (response: any) => {
    console.log(services.server_url, auth0Config.server_url)
    return new Promise((resolve, reject) => {
      resolve(response.data)
    })
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }

    if ([401, 403].indexOf(error.response.status) > -1) {
      console.log('App Error')
    } else {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  }
)



export {
  serverAxios
}
