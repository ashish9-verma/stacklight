import { Component, OnInit } from '@angular/core';
import { DataService } from '../src/app/data.service';
import {LoginComponent} from '../src/app/login/login.component'
import * as sinon from 'sinon';
import {expect} from 'chai';

log : LoginComponent;
data : DataService;

describe ("LoginComponent", () =>{
  describe("Checking Valid Email", () =>{

      let content ={"one":{"emailId":"abc@xyz","password":"1234"},
                    "two":{"emailId":"","password":""},
                    "three":{"emailId":"abc@xyz","password":""},
                    "four":{"emailId":"","password":"1234"}
                  };

      it("test number one", ()=>{

        //Arrange
        
        var url ='http://10.157.251.27:3000/sle/account/login';
        var headers ={'Content-Type':'application/x-www-form-urlencoded'};
        var params ={"emailId":content.one.emailId,"password":content.one.password};

        /*log.dataService.doPOST(url,params,headers).subscribe(
          var message="hello world";
          console.log(message);
        );*/
        //data.doPOST(url,headers,params);
        sinon.stub(this.data,"doPOST").withArgs(url,headers,params).returns("yesss");

        this.log.email=content.one.emailId;
        this.log.password=content.one.password;
        //Act
        var result=this.log.login();
        //Assert
        expect(this.log.errorMessage).to.equal("EmailId,Password Missing");
        //Cleanup
        stub.restore();

      });

      it("test number two", ()=>{

        var log=new LoginComponent();
        log.email=content.two.emailId;
        log.password=content.two.password;
        var result=log.login();
        expect(log.errorMessage).to.equal("EmailId,Password Missing");

      });

      it("test number three", ()=>{

        let log=new LoginComponent();
        log.email=content.three.emailId;
        log.password=content.three.password;
        var result=log.login();
        expect(log.errorMessage).to.equal("Password Missing");

      });

      it("test number four", ()=>{

        let log=new LoginComponent();
        log.email=content.four.emailId;
        log.password=content.four.password;
        var result=log.login();
        expect(log.errorMessage).to.equal("EmailId Missing");

      });
  });
});
