import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import { InfoUserService } from '../../service/info-user.service';
import { OperationService } from '../../operation.service';


@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
public data = [];
public user = {};
public info = {};   

title = "yves mick"; 
  constructor(private dataService: DataService, private route:Router, private http: HttpClient, private sock: OperationService){}

  ngOnInit() {
    this.sock.messages.subscribe(msg =>{
      console.log(msg);
    })
    return this.dataService.getData()
      .subscribe( (Data) => { console.log(JSON.stringify(Data)); this.data = Data["info"].listeOb; this.user = Data["user"]; this.info = Data["info"]});
  }

  sendMessage(){
    this.sock.sendMessage('Test de Ouf')
  }
}




            
            
