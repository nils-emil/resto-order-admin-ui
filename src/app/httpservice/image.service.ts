import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  uploadImage(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/admin/image/upload", params
    )
  }


}
