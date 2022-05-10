import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class IqacServiceService {
  baseUrl = environment.baseUrl
  faculityData:any;
  

  constructor(private http: HttpClient) { }

  getFaculty():Observable<any>{
    return this.http.get(this.baseUrl + 'staff')
  }

  addFaculty(data:any):Observable<any>{
    return this.http.post(this.baseUrl + 'staff', data)
  }

  updateFaculty(id:any,data:any):Observable<any>{
    return this.http.put(this.baseUrl + 'staff/' + `${id}`, data)
  }

  deleteFaculty(id:any):Observable<any>{
    return this.http.delete(this.baseUrl + 'staff/' + `${id}`)
  }

  getRank():Observable<any>{
    return this.http.get(this.baseUrl + 'rank')
  }

  addRank(data:any):Observable<any>{
    return this.http.post(this.baseUrl + 'rank', data)
  }

  updateRank(id:any,data:any):Observable<any>{
    return this.http.put(this.baseUrl + 'rank/' + `${id}`, data)
  }

  deleteRank(id:any):Observable<any>{
    return this.http.delete(this.baseUrl + 'rank/' + `${id}`)
  }

  getReport():Observable<any>{
    return this.http.get(this.baseUrl + 'files')
  }

  addReport(data:any):Observable<any>{
    return this.http.post(this.baseUrl + 'upload', data)
  }

  updateReport(id:any,data:any):Observable<any>{
    return this.http.put(this.baseUrl + 'files/' + `${id}`, data)
  }

  deleteReport(id:any):Observable<any>{
    return this.http.delete(this.baseUrl + 'files/' + `${id}`)
  }
}
