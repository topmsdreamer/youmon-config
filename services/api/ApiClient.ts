import ApiService from './ApiService'
export class ApiClient {

    private _requestHeaders: any[];
    private _requestMethod: string;
    private _tenant: string;
    private _baseUrl: string;
    private _sessionId: string;
    private _token: string;

    constructor(token:any, tenant: string, baseUrl: string, sessionId: string) {
        this._requestHeaders = [];
        this._requestMethod = 'GET';
        this._tenant = tenant;
        this._token = token;
        this._sessionId = sessionId;
        this._baseUrl = `${baseUrl}/api/`
    }

    public get(url: string):Promise<any> {
        var api = new ApiService(this._token,this._tenant, this._sessionId);        
        return fetch(this._baseUrl + url, api.RequestNoBody());
    }

    head(url: string) {
        var api = new ApiService(this._token,this._tenant, this._sessionId);
        api.setRequestMethod('HEAD');
        return fetch(this._baseUrl + url, api.RequestNoBody());
    }

    post(url: string, body: any) {
        var api = new ApiService(this._token,this._tenant, this._sessionId);
        api.setRequestMethod('POST');
        return fetch(this._baseUrl + url, api.Request(body));
    }

    postMultiPart(url:string,formData:any){
        var api = new ApiService(this._token,this._tenant, this._sessionId);
        api.setRequestMethod('POST'); 
        return fetch(this._baseUrl + url, api.RequestMultiPart(formData));
    }

    put(url: string, body: any) {
        var api = new ApiService(this._token,this._tenant, this._sessionId);
        api.setRequestMethod('PUT');
        return fetch(this._baseUrl + url, api.Request(body));
    }
    
    patch(url: string, body: any) {
        var api = new ApiService(this._token, this._tenant, this._sessionId);
        api.setRequestMethod('PATCH');
        return fetch(this._baseUrl + url, api.Request(body));
    }

    delete(url: string) {
        var api = new ApiService(this._token,this._tenant, this._sessionId);
        api.setRequestMethod('DELETE');
        return fetch(this._baseUrl + url, api.RequestNoBody());
    }
}
export default ApiClient;