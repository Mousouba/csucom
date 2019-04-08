import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  public profilIcon = ["beach", "cape", "cityscape", "forest", "home", "sea", "waterfall"];

  constructor(private storage: LocalStorageService) { }

  choiceProfil():string{
    let index = this.storage.retrieve('random');
    let profil = this.profilIcon[index];
    return profil;
  }

}
