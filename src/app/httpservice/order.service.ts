import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }


  getMenuItems(): Observable<any> {
    return this.http.get<any>(`${environment.ws_url}/api/menu/order/all`)
  }

  fetchByTableCode(): Observable<any> {
    return this.http.get<any>(`${environment.ws_url}/api/menu/order`)
  }

  getLatestEvents(limit: number): Observable<any[]> {
    return this.http.get<any>(`${environment.ws_url}/api/menu/order/all?limit=${limit}`)
  }
}
