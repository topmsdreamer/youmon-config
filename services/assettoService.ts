import ApiClient from "./api/ApiClient";

const collection = 'boats';
export class AssettoService {
    private _apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this._apiClient = apiClient;
    }

    public getAsset = (id: string,includeDevice:boolean = true): Promise<any> => {
        const query = includeDevice ? `?includeDevices=true` : '';
        let promise = new Promise<any>((resolve, reject) => {
            let url = `assetto/${collection}/${id}${query}`;
            this._apiClient.get(url).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    reject(response)
                }
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
        return promise;
    }

    updateAsset(id:string, requestBody:any) {
        let promise = new Promise((resolve, reject) => {
            let url = `assetto/${collection}/${id}`;
            let body = requestBody;
            this._apiClient.patch(url, body).then((response) => {
                if (response.ok)
                    return response.json();
                else
                    reject(response.status)
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(undefined);
            });
        })
        return promise;
    }

    getAssetTimeline = (id: string,query:string): Promise<any[]> => {
        let promise = new Promise<any[]>((resolve, reject) => {
            let url = `assetto/${collection}/${id}/timeline${query}`;
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

    getAssetTimelineItem = (id: string, timelineId: string) => {
        let promise = new Promise((resolve, reject) => {
            let url = `assetto/${collection}/${id}/timeline/${timelineId}`;
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
    
    addAssetTimelineItem(id:string, requestBody:any) {
        let promise = new Promise((resolve, reject) => {
            let url = `assetto/${collection}/${id}/timeline`;
            let body = requestBody;
            this._apiClient.post(url, body).then((response) => {
                if (response.ok)
                    return response.json();
                else
                    reject(response.status)
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(undefined);
            });
        })
        return promise;
    }

    addAssetTimelineResources(id:string,data:FormData) {
        let promise = new Promise((resolve, reject) => {
            let url = `assetto/${collection}/${id}/resources/timeline`;
            let body = data;
            this._apiClient.postMultiPart(url, body)
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else
                        reject(response.status);
                }).then((json) => {
                    resolve(json);
                }).catch((error) => {
                    reject(undefined);
                });
        })
        return promise;
    }
    
    addAssetResources(id:string,data:FormData) {
        let promise = new Promise((resolve, reject) => {
            let url = `assetto/${collection}/${id}/resources/`;
            let body = data;
            this._apiClient.postMultiPart(url, body)
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else
                        reject(response.status);
                }).then((json) => {
                    resolve(json);
                }).catch((error) => {
                    reject(undefined);
                });
        })
        return promise;
    }

    getAssetResources = (id: string) => {
        let promise = new Promise<any[]>((resolve, reject) => {
            let url = `assetto/${collection}/${id}/resources/`;
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
}