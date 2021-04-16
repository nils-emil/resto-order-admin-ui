import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.ws_url}/api/client/category`)
  }


  createCategory(params: any): Observable<any> {
    return this.http.post<any>(environment.ws_url + "/api/category/add", {
        ...params
      }
    )
  }

  updateCategory(params: any): Observable<any> {
    return this.http.post<any>(`${environment.ws_url}/api/category/update/${params._id}`, {
        ...params
      }
    )
  }


  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.ws_url}/api/category/delete/${id}`)
  }

}
