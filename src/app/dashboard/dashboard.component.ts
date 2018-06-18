import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
              '../../css/icon-style.css',
              '../../assets/css/bootstrap.min.css',
              '../../assets/css/styles.css']
})

export class DashboardComponent implements OnInit {
	title = 'dashboard';

	public mapping_top_row : number[] = [1];
	public mapping_middle_row : number[] = [2,3,4,5,6,7,8];
	public mapping_bottom_row : number[] = [9,10,11,12,13,14];
	public obj_top_row =[];
  public obj_middle_row =[];
  public obj_bottom_row =[];
  public userData : any ;
  public userId : any;
  constructor(private router : Router,private dataService: DataService) {

  }

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    console.log("userData in dashboad",this.userData);
    
    if(this.userData == null){
      this.router.navigate(['login'])
    }else{
      this.userId = this.userData.userId;
    }
        

    var url ='http://10.157.251.27:3000/sle/dashboard?userId='+this.userId+'&cloudName=jse4';

    this.dataService.doGET(url).subscribe(
        suc => {
            let response = suc;

            for(var i =0; i < response.length;i++){
              if(this.inArray(response[i]["componentId"],this.mapping_top_row)){
                let obj ={'key' : response[i]["componentId"],'value':response[i]};
                this.obj_top_row.push(obj)
              }
              if(this.inArray(response[i]["componentId"],this.mapping_middle_row)){
                let obj ={'key' : response[i]["componentId"],'value':response[i]};
                this.obj_middle_row.push(obj)
              }
              if(this.inArray(response[i]["componentId"],this.mapping_bottom_row)){
                let obj ={'key' : response[i]["componentId"],'value':response[i]};
                this.obj_bottom_row.push(obj)
              }
            }
            console.log('success',this.obj_top_row);
            console.log('success',this.obj_middle_row);
            console.log('success',this.obj_bottom_row);
            this.router.navigate(['dashboard'])
        },
        err => {
            console.log("error",err);
        }
    );

  }
  open(){
    console.log("hi");
  }

  inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
          if(haystack[i] == needle) return true;
      }
      return false;
  }

  logout(){
    console.log("logout");
    this.dataService.logout();
  }
}


