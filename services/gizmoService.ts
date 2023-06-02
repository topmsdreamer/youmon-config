import ApiClient from "./api/ApiClient";

export class GizmoService {
    private _apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this._apiClient = apiClient;
    }

    public getDeviceLinkage = (id: string,): Promise<any> => {
        let promise = new Promise<any>((resolve, reject) => {
            let url = `gizmo/devices/${id}/links?span=true`;
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
}