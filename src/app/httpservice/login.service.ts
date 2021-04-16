import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: any

  constructor(private http: HttpClient) {
  }

  setCurrentUser(user: any): void {
    console.log("set")
    this.user = user;
  }

  getCurrentInitUser(): any {
    console.log("get")
    return this.user || {}
  }

  postLogin(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/user/login", params
    )
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(environment.ws_url + "/api/user/current")
  }
}
