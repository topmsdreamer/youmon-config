import ApiClient from "./api/ApiClient";

export class InfluxService {
    private _apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this._apiClient = apiClient;
    }

    getGraphSeries = (id: string, from: string, to: string, fields: string[] = [], fn = 'mean', period = '15m'): Promise<any> => {
        let requestBody = {
            from: from,
            to: to,
            fields,
            fn: fn,
            period: period
        };
        let promise = new Promise<any>((resolve, reject) => {
            this._apiClient.post(`influx/graphs/${id}/series`, requestBody).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    reject(response.status);
                }
            }).then((result) => {
                resolve(result);
            }).catch((ex) => {
                reject(ex);
            })
        });
        return promise;
    }

    getMapRoutes = (id: string, from: string, to: string) => {
        let requestBody = {
            from: from,
            to: to
        };
        let promise = new Promise((resolve, reject) => {
            this._apiClient.post(`influx/map/${id}`, requestBody).then((response) => {
                return response.json();
            }).then((result) => {
                resolve(result);
            }).catch((ex) => {
                reject(ex);
            })
        });
        return promise;
    }

    getStatistics = (id: string, from: string, to: string, fields: string[] = []): Promise<any> => {
        let requestBody = {
            from: from,
            to: to,
            fields,
        };
        let promise = new Promise<any>((resolve, reject) => {
            this._apiClient.post(`influx/statistics/${id}`, requestBody).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    reject(response.status);
                }
            }).then((result) => {
                resolve(result);
            }).catch((ex) => {
                reject(ex);
            })
        });
        return promise;
    }
}