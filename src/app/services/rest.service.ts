import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  get(endpoint: string, payload?: any): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, {params: payload});
  }

  put(endpoint: string, payload: any): Observable<any> {
    return this.http.put(this.baseUrl + endpoint, payload);
  }

  post(endpoint: string, payload: any): Observable<any> {
    return this.http.post(this.baseUrl + endpoint, payload);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.baseUrl + endpoint);
  }
}
