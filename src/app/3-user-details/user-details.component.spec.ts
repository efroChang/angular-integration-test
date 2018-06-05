/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';

class RouterStub                  // [KEY]: The fake Router            
{
  navigate( params )
  {
  }
}

class ActivatedRouteStub          // [KEY]: The fake ActivatedRoute
{
  params: Observable<any> = Observable.empty();   // Returns an Observable
}

describe('UserDetailsComponent', () => {

  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },                        // [KEY]: Mock the Router provider
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }         // [KEY]: Mock the Router provider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect the user to users page after saving', () => {
    
    let router = TestBed.get( Router );
    let spy = spyOn( router, 'navigate' );

    component.save();

    expect( spy ).toHaveBeenCalledWith( ['users'] );
  });


});
