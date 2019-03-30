import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import { InfoUserService } from '../../service/info-user.service';


@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
public data = []
public user = {}
public info = {}

title = "yves mick";
  constructor(private dataService: DataService, private route:Router, private infoUser : InfoUserService, private _http: HttpClient){}

  ngOnInit() {
     
    return this._http.get<any[]>("http://localhost:2037/api")
      .subscribe( (Data) => { this.data = Data["info"].listeOb; this.user = Data["user"]; this.info = Data["info"];
        console.log('DATA DIRECT ' + JSON.stringify(Data));
        console.log('je passe');
        this.infoUser.infoUser = Data.user;

        // if(Data.stat == false){
        //   this.route.navigate(["/authentication/login"]);
        // }
    });
  }

  
  
  ngAfterViewInit() {
    console.log("===A====");
    console.log( " Level up " + this.data); 
  }
}




            
            
