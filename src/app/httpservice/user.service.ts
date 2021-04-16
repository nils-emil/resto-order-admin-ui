import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.ws_url}/api/user/all`)
  }


  updatePassword(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/user/current/new-password", {
        ...params
      }
    )
  }

  initPassword(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/user/init/password", {
        ...params
      }
    )
  }

  createOrUpdateUser(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/user/add", {
        ...params
      }
    )
  }

  deleteUser(params: any): Observable<any> {
    console.log(params)
    return this.http.post<any>(`${environment.ws_url}/api/user/delete`, {
        ...params
      }
    )
  }

}
