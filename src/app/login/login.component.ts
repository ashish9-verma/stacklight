import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import {Http, Response, RequestOptions, Headers,URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../css/icon-style.css',
              '../../css/bootstrap.min.css',
              '../../css/styles.css']
})
export class LoginComponent implements OnInit {
  email : string ='';
  password : string =''
  constructor(private router : Router,private dataService: DataService) {}
  ngOnInit() {

  }

  login(){
    var url = 'http://10.157.250.248:8080/sle/account/login';
    var headers ={'Content-Type':'application/json'}
    var params ={"emailId":this.email,"password":this.password};

    this.dataService.doPOST(url,JSON.stringify(params),headers).subscribe(
        suc => {
            console.log('success',suc);
        },
        err => {
            console.log("error",err._body.error );
        }
    );

}
}
