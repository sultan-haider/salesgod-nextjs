import axios, { AxiosRequestConfig } from 'axios'
import {
  serverAxios

} from './axios-interceptor'
import {services} from "../config";


interface IProps {
  apiObject?: any
  url: AxiosRequestConfig['url']
  payload: AxiosRequestConfig['data']
  method: AxiosRequestConfig['method']
  token?: string
}

const updateUserRequest = async (data: any, token: string, path:string) => {
  const url = `${services.server_url}/users/update-user`
  // const url = path
  return await axios({
    url: url,
    method: "POST",
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: data
  })
      .then((res: any) => {
        return res.data
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        throw err.response
      })
}
const requestPasswordChange = async (data: any, token: string, path:string) => {
  const url = `${services.server_url}/users/change-password`
  // const url = path
  return await axios({
    url: url,
    method: "POST",
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: data
  })
      .then((res: any) => {
        return res.data
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        throw err.response
      })
}

// get User Workspace
export const getUserWorkspace = async (data: any) => {
  const url = `${services.server_url}/workspace/get-workspace`
  // const url = path
  return await axios({
    url: url,
    method: "POST",
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: data
  })
      .then((res: any) => {
        return res.data
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        throw err.response
      })
}
export const getUserWorkspaceRecursive = async (data: any) => {
  const url = `${services.server_url}/workspace/get-workspace-recursive`
  // const url = path
  return await axios({
    url: url,
    method: "POST",
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: data
  })
      .then((res: any) => {
        return res.data
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        throw err.response
      })
}

export const getWorkspaceTeamMembersApi = async (data: any) => {
  const url = `${services.server_url}/workspace/fetch-members`
  // const url = path
  return await axios({
    url: url,
    method: "POST",
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: data
  })
      .then((res: any) => {
        return res.data
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        throw err.response
      })
}
export const auth0UserManagementCall = async ({ url, payload, method }: IProps) => {
  // return initiateApiCall({ apiObject: serverAxios, url, payload, method })
  return updateUserRequest(payload, '', url!)
}

export const auth0RequestPasswordChange = async ({ url, payload, method }: IProps) => {
  // return initiateApiCall({ apiObject: serverAxios, url, payload, method })
  return requestPasswordChange(payload, '', url!)
}



const initiateApiCall = async ({ apiObject, url, payload, method, token}: IProps) => {
  return await callApiIntercept({ apiObject, url, payload, method, token })
}


const callApiIntercept = async ({ apiObject, url, payload, method, token }: IProps) => {
  switch (method) {
  case 'GET': {
    return await apiObject({
      url: url,
      method: method,
      params: payload,
      headers: token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      } : {'Content-Type': 'application/json'}
    })
      .then((res: any) => {
        return res
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        return null
      })
  }
  case 'PATCH':
  case 'PUT':
  case 'POST': {
    return await apiObject({
      url:  url,
      method: method,
      headers: token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      } : {'Content-Type': 'application/json'},
      data: payload
    })
      .then((res: any) => {
        return res
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        return null
      })
  }
  case 'DELETE': {
    return await apiObject({
      url: url,
      method: method,
      params: payload,
      headers: token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      } : {'Content-Type': 'application/json'}
    })
      .then((res: any) => {
        return res
      })
      .catch((err: any) => {
        console.error('something went wrong', err)
        return null
      })
  }
  default: {
    break
  }

  }
}
