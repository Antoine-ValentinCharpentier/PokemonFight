import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../type';

const API_URL = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  get<T>(endpoint: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(`${API_URL}${endpoint}`, options) as Observable<T>;
  }

  post<T>(endpoint: string, body: any, options: Options): Observable<T> {
    return this.httpClient.post<T>(`${API_URL}${endpoint}`, body, options) as Observable<T>;
  }

  put<T>(endpoint: string, body: any, options: Options): Observable<T> {
    return this.httpClient.put<T>(`${API_URL}${endpoint}`, body, options) as Observable<T>;
  }

  delete<T>(endpoint: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(`${API_URL}${endpoint}`, options) as Observable<T>;
  }
}
