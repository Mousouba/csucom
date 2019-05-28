import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoUserService } from 'src/app/service/info-user.service';
import { DataService } from '../../service/data.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ProfilService } from 'src/app/profil.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  public currentIcon : any;

  public info = [];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public infoUser: InfoUserService,
    private _route: Router,
    private dataService: DataService,
    private storage: LocalStorageService,
    private profil: ProfilService
  ) {}

  // End open close
  ngOnInit() {
    this.infoUser.infoUser = this.storage.retrieve('stockage');
    this.currentIcon = this.profil.choiceProfil();
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  onDeco(){
    this.storage.clear('stockage');
    this.storage.clear('random');
    this._route.navigate(['/authentication/login']);
  }


}
