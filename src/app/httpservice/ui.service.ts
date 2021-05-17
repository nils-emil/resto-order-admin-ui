import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private http: HttpClient) {
  }

  getConfiguration(): Observable<any> {
    return this.http.get<any>(`${environment.ws_url}/api/ui/admin/get/all`)
  }


  updateConfiguration(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/ui/admin/update", {
        ...params
      }
    )
  }


}
