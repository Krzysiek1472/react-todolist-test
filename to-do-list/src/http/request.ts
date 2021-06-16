import axios, { Method } from "axios";

export interface RequestConfig {
    body?: any;
    params?: { [key: string]: string }
}

const apiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000';
    } else {
        return 'http://localhost:5000';
    }
}

export const axiosRequest = async <TResult>(route: string, method: Method, config?: RequestConfig) => {
    return new Promise<TResult>((resolve, reject) => {
        axios.request<TResult>({
            url: apiUrl() + route,
            method: method,
            data: config?.body,
            params: config?.params,
            headers: {
                'Authorization': 'some token',
            }
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            console.error(err);
            reject(err)
        })
    })
}
