import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get(url){
    let httpOptions =  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get(environment.url + url, httpOptions).pipe(
      map((data: any) => {
        return data;
      }));
  }

  
}
