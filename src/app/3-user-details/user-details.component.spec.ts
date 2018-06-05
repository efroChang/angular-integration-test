/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Observable, Subject } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';

class RouterStub                  // [KEY]: The fake Router            
{
  navigate( params )
  {
  }
}

class ActivatedRouteStub          // [KEY]: The fake ActivatedRoute
{
  private subject = new Subject;

  push( value )
  {
    this.subject.next( value );
  }

  get params()                            // Use "get" to make params a public property
  {
    return this.subject.asObservable();
  }
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

  it('should redirect the user to the not found page when an invalid id is passed', () => {
    
    let router = TestBed.get( Router );
    let spy = spyOn( router, 'navigate' );
    let route = TestBed.get( ActivatedRoute );
  
    route.push( { id: 0 } );

    expect( spy ).toHaveBeenCalledWith( ['not-found'] );
  });
});
