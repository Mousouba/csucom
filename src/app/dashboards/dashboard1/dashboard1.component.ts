import { Component, OnInit } from '@angular/core';
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

<<<<<<< HEAD
title = "yves mick";
<<<<<<< HEAD
  constructor(private dataService: DataService, private route:Router, private http: HttpClient){ 
=======
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
=======
title = "yves mick"; 
  constructor(private dataService: DataService, private route:Router, private http: HttpClient){
>>>>>>> 581188a335db37f4d147aad95b3d9679c8a2a752

     
  }

  ngOnInit() {
    return this.dataService.getData()
      .subscribe( (Data) => { this.data = Data["info"].listeOb; this.user = Data["user"]; this.info = Data["info"]
<<<<<<< HEAD
        console.log('DATA DIRECT ' + JSON.stringify(Data))} ); 
=======
        console.log('DATA DIRECT ' + JSON.stringify(Data))} );
>>>>>>> 893e1d3dd5b16f9150a90dbf01c6e149ffd16132
>>>>>>> 581188a335db37f4d147aad95b3d9679c8a2a752
  }

  
  
<<<<<<< HEAD

=======
  ngAfterViewInit() {
    console.log("===A====");
<<<<<<< HEAD
    console.log( " Level up " + this.data); 
=======
    console.log(this.data);  
>>>>>>> 893e1d3dd5b16f9150a90dbf01c6e149ffd16132
  }
>>>>>>> 581188a335db37f4d147aad95b3d9679c8a2a752
}




            
            
