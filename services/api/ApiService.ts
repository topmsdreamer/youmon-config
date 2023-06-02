export class ApiService {
  private _requestHeaders: any[];
  private _requestMethod: "GET" | "POST" | "PUT" | "DELETE";
  private _tenant: string;
  constructor(token: string, tenant: string, sessionId: string) {
    this._requestHeaders = [];
    this._requestMethod = "GET";
    this._tenant = tenant;

    this._requestHeaders.push(["x-authorization", token]);
    this._requestHeaders.push(["x-tenant", tenant]);
    this._requestHeaders.push(["x-device", sessionId]);
    this._requestHeaders.push(["Content-Type", "application/json;charset=UTF-8"]);
  }
  setRequestHeaders(headers: any) {
    for (const i in headers) {
      if (headers[i].hasOwnProperty("key") && headers[i].hasOwnProperty("value")) {
        this._requestHeaders.push([headers[i].key, headers[i].value]);
      }
    }
    return this;
  }

  getRequestHeaders() {
    return this._requestHeaders;
  }

  resetRequestHeaders() {
    this._requestHeaders = [];
    return this;
  }

  setRequestMethod(method: any) {
    this._requestMethod = method;
    return this;
  }

  _mapHeaders(headers: any) {
    let mappedHeaders: any = {};
    headers.map((header: any) => {
      mappedHeaders[header[0]] = header[1];
    });

    return mappedHeaders;
  }

  Request(body: any) {
    const headers = this._mapHeaders(this._requestHeaders);
    return {
      headers: headers,
      method: this._requestMethod,
      body: JSON.stringify(body)
    };
  }

  RequestNoBody() {
    const headers = this._mapHeaders(this._requestHeaders);
    return {
      headers: headers,
      method: this._requestMethod
    };
  }
  RequestMultiPart(formData: any) {
    const headers = this._mapHeaders(this._requestHeaders);
    headers["Content-Type"] = `multipart/form-data`;

    return {
      headers: headers,
      method: this._requestMethod,
      body: formData
    };
  }
}
export default ApiService;
