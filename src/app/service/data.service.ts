import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://137.74.116.91:2037/api';

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  getMedecin(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/medecin");
  }

  getService(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/service");
  }

  getPres(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/pres");
  }

  getObs(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/observ");
  }

  getArticle(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/vente");
  }

  getInventaire(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/inventaire");
  }

  getJournal(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/journal");
  }

  getFamille(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/fm");
  }

  getPatient(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/patient");
  }

  getDes(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/des");
  }

  getAllUser(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/user");
  }
  getMedecinPres(): Observable<any> {
    return this._http.get<any>(this.apiUrl+"/medecin");
  }

  // POST PART

  authUser(data:any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/login",data);
  }

  setFamille(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/fm",data);
  }

  setArticle(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/art",data);
  }

  setPatient(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/saisiepatient",data);
  }

  setPres(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/pres",data);
  }

  setUser(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/user",data);
  }

  setChambre(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/chambre",data);
  }

  setLit(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/lit",data);
  }

  setPanier(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/panier",data);
  }
  //Delete Something
  deleteItem(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/del",data);
  }

  setObser(data: any): Observable<any>{
    return this._http.post<any>(this.apiUrl+"/observ",data);
  }



}

