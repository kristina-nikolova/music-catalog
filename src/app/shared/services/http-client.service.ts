import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpClientService {

  constructor(private http: Http) {}

  /**
   * name: createAuthorizationHeader
   * params: {Headers} headers
   * description: append Authorization Token to the header
   */
  createAuthorizationHeader(headers: Headers) {
    let  token = sessionStorage.getItem('access_token');
    headers.append('Authorization', 'Bearer ' + token); 
  }

  /**
   * name: get
   * params:{String}  url
   * description: append header to the get request
   */
  get(url: string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  /**
   * name: post
   * params: {String} url
   * params: {Object} data
   * description: append header to the get request
   */
  post(url: string, data: Object) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  /**
   * name: put
   * params: {String} url
   * params: {Object} data
   * description: append header to the put request
   */
  put(url: string, data: Object) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  /**
   * name: delete
   * params: {String} url
   * description: append header to the delete request
   */
  delete(url: string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }
}
