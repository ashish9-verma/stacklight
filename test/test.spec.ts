import { Component, OnInit } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { DataService } from '../src/app/data.service';
import { BrowserDynamicTestingModule,platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {LoginComponent} from '../src/app/login/login.component'
import * as sinon from 'sinon';
import {expect} from 'chai';
import { failure } from './src/testing';

describe ("LoginComponent", () =>{

  describe("Checking Valid Email", () =>{
      let content ={"one":{"emailId":"abc@xyz","password":"1234"},
                    "two":{"emailId":"","password":""},
                    "three":{"emailId":"abc@xyz","password":""},
                    "four":{"emailId":"","password":"1234"}
                  };
/*
      let component: LoginComponent;
      let dataService: DataService;

     beforeEach(() =>{
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
          declarations:[
            LoginComponent
          ],
          providers: [
            DataService
          ]
        });
        component=TestBed.createComponent(LoginComponent).componentInstance;
        dataService=TestBed.get(DataService);
        spyOn(dataService,'doPOST').and.returnValue(Observable.of(USER_OBJECT));
      });

      it('should stub the doPOST', () =>{
        component.email=content.one.emailId;
        component.password=content.one.password;
        component.login();
        expect(dataService.doPOST).toHaveBeenCalled();
      });

*/
      it("test number trial", ()=>{
        //Arrange
        let log=new LoginComponent();
        let data=new DataService();
        var url ='http://10.157.251.27:3000/sle/account/login';
        var headers ={'Content-Type':'application/x-www-form-urlencoded'};
        var params ={"emailId":content.one.emailId,"password":content.one.password};

        //log.dataService.doPOST(url,params,headers).subscribe(
        //  var message="hello world";
        //  console.log(message);
        //);

        log.dataService=data;

        console.log(data)
        console.log(log.dataService)

        sinon.stub(log,"login").returns("login stubbed");
        //console.log(log.dataService);

        //sinon.stub(data,"doPOST").withArgs(url,headers,params).returns("yesss");
        //console.log(log.dataService.doPOST(url,headers,params));
        //var spy= sinon.spy(log.dataService,'doPOST').withArgs(url.headers,params);

        //sinon.stub(log.dataService,"doPOST").withArgs(url,headers,params).returns("yesssessses");

        log.email=content.one.emailId;
        log.password=content.one.password;
        //Act
        var result=log.login();


        //expect(spy.calledOnce).toBe(true);
       //Assert
        expect(result).to.equal("login stubbed");
        //Cleanup
        //data.doPOST.restore();
       //log.login.restore();
     });
/*
      it("handles success case of test1", () =>{
        const spy=sandbox.spy();
        sandbox.stub(log.dataService,'doPOST').subscribe({
          suc => {spy}
        });
        sinon.assert.called(spy);
      });

      it("handles failure case of test1", () =>{
        const msg= 'test error';
        sandbox.stub(log.dataService,'doPOST').subscribe({
            err => { sandbox.stub().throws(new Error(msg))}
        });
      })
*/
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

it("test number one", ()=>{
  //Arrange
  var url ='http://10.157.251.27:3000/sle/account/login';
  var headers ={'Content-Type':'application/x-www-form-urlencoded'};
  var params ={"emailId":content.one.emailId,"password":content.one.password};

  //sinon.stub(data,"doPOST").withArgs(url,headers,params).returns("yesss");
  //console.log(log.dataService.doPOST(url,headers,params));
  //var spy= sinon.spy(log.dataService,'doPOST').withArgs(url.headers,params);

  sinon.stub(component.dataService,"doPOST").withArgs(url,headers,params).returns("yesssessses");

  component.email=content.one.emailId;
  component.password=content.one.password;
  //Act
  var result=component.login();
  console.log(result);


  //expect(spy.calledOnce).toBe(true);
 //Assert
  //expect(result).toEqual("yesssessses");
  //Cleanup
 //log.login.restore();
});
