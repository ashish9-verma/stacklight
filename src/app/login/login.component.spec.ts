import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as sinon from 'sinon';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { LoginComponent } from './login.component';
import {Observable} from 'rxjs/';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  //let dataStub: DataStub;
  let content ={"one":{"emailId":"abc@xyz","password":"1234"},
                "two":{"emailId":"","password":""},
                "three":{"emailId":"abc@xyz","password":""},
                "four":{"emailId":"","password":"1234"}
              };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    //dataStub=fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("test number two", ()=>{
    component.email=content.two.emailId;
    component.password=content.two.password;
    var result=component.login();
    expect(component.errorMessage).toEqual("EmailId,Password Missing");
  });

  it("test number three", ()=>{
    component.email=content.three.emailId;
    component.password=content.three.password;
    var result=component.login();
    expect(component.errorMessage).toEqual("Password Missing");
  });

  it("test number four", ()=>{
    component.email=content.four.emailId;
    component.password=content.four.password;
    var result=component.login();
    expect(component.errorMessage).toEqual("EmailId Missing");
  });
});
