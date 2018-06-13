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

    return this.http.post(url,params,{headers: headers }).pipe(
        map(res => res.json()) // or any other operator
      );
  }

}
