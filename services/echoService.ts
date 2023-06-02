import qs from 'qs';
import ApiClient from "./api/ApiClient";

export class EchoService {
    private _apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this._apiClient = apiClient;
    }

    getNotifications = (params:any = {}):Promise<any[]> => {
        const query = qs.stringify(params, {skipNulls:true});
        const queryString = query !== '' ? `?${query}` : '';
        let promise = new Promise<any[]>((resolve, reject) => {
            let url = `echo/notifications${queryString}`;
            this._apiClient.get(url).then((response) => {
                if (response.ok)
                    return response.json();
                else
                    reject(response)
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        })
        return promise;
    }

    getNotification = (uid: string): Promise<any[]> => {
        let promise = new Promise<any[]>((resolve, reject) => {
            let url = `echo/notifications/${uid}`;
            this._apiClient.get(url).then((response) => {
                if (response.ok)
                    return response.json();
                else
                    reject(response)
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        })
        return promise;
    }
    
    updateNotification= (id:string, body:any):Promise<any> => {
        let promise = new Promise((resolve, reject) => {
            this._apiClient.patch(`echo/notifications/${id}`, body).then((response:any) => {
                if (response.ok)
                    return response.json();
                else {
                    reject(response.status)
                }
            }).then((result:any) => {
                resolve(result);
            }).catch((ex:any) => {
                reject(ex);
            })
        });
        return promise;
    }
}