import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers,URLSearchParams,RequestMethod} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  doGET(url,params,headers){
      this.http.get(url, params).subscribe(res => console.log(res.json()));
  }

  doPOST(url,params,headers){
    console.log(url)
    console.log(params)
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    let options = new RequestOptions( {headers: headers });

    console.log(httpOptions)
    return this.http.post(url,params,options).pipe(
        map(res => res.data) // or any other operator
      );
  }

}
