import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { Todo, Options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // GET endpoint
  get<T>(url:string, options:Options): Observable<T> {
    return this.http.get<T>(url, options) as Observable<T>
  }

  // POST endpoint
  post<T>(url:string, options:Options, body:any): Observable<T> {
    return this.http.post<T>(url, body, options) as Observable<T>
  }
}
