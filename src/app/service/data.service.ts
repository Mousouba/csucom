import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:2037/api';

  constructor(private _http: HttpClient) { }

  getData(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl);
  }

  getMedecin(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl+"/medecin");
  }

  getPres(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl+"/pres");
  }

  getObs(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl+"/observ");
  }

  getArticle(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl+"/vente");
  }

  getJournal(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl+"/journal");
  }
  
}

