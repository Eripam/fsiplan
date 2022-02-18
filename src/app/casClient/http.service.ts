import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



// import 'rxjs/add/operator/map';
// import { Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * Método responsável por realizar uma requisição com url completa.
   * 
   * @param url 
   */

  doGetUrlXML(url: string): Observable<any> {
    console.log('ServicoURL Cas:' + url);

    return this.http.get(url, { responseType: 'text' })
  }
  // doGetUrlXML(url: string): Observable<any>) {
  //   // console.log('ServicoURL Cas:' + url);
  //    return( this.http.get(url))
  //   // return (this.http.get(url)._subscribe(data=>console.log(data)))
  // }

  /**
   * Método responsável por realizar requisição get para API
   * 
   * @param path 
   */
  doGet(path: string): Observable<any> {
    console.log('ServicoURL Cas:' + path);

    return this.http.get(path)
  
  }

}
