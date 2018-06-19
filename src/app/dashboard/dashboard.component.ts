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
  public monitoringComponents : any =[];

  constructor(private router : Router,private dataService: DataService) {

  }

  ngOnInit() {

    let components = [{"componentId":"1","componentName":"Heat","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"2","componentName":"Nova","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"3","componentName":"Neutron","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"4","componentName":"Cinder","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"5","componentName":"Horizon","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"6","componentName":"Ceph","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"7","componentName":"Keystone","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"8","componentName":"Glance","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"9","componentName":"System","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"10","componentName":"Mysql","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"11","componentName":"Contrail","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"12","componentName":"Rabbitmq","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"13","componentName":"Haproxy","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"14","componentName":"Keepalive","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"},{"componentId":"15","componentName":"Radosgw","totalAlerts":"0","ackAlerts":"0","silenceAlerts":"0","alertType":"G","componentSilence":"N","componentEnable":"Y"}];
    for (var i =0; i < components.length; i++){
        this.monitoringComponents[components[i].componentId] = components[i];
    }
    console.log(this.monitoringComponents);

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
               this.monitoringComponents[response[i]["componentId"]].totalAlerts = response[i]["totalAlerts"];
               this.monitoringComponents[response[i]["componentId"]].ackAlerts = response[i]["ackAlerts"];
               this.monitoringComponents[response[i]["componentId"]].silenceAlerts = response[i]["silenceAlerts"];
               this.monitoringComponents[response[i]["componentId"]].alertType = response[i]["alertType"];
               this.monitoringComponents[response[i]["componentId"]].componentSilence = response[i]["componentSilence"];
               this.monitoringComponents[response[i]["componentId"]].componentEnable = response[i]["componentEnable"];
             }
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


