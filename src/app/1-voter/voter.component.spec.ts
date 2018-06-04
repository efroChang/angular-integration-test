import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VoterComponent } from './voter.component';
import { debug } from 'util';


describe('VoterComponent', () => {
  
  let fixture: ComponentFixture<VoterComponent>;
  let component: VoterComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({

      declarations: [ VoterComponent ]
    });

    fixture = TestBed.createComponent( VoterComponent );
    component = fixture.componentInstance;
  });

  it('should render total votes', () => {

    component.othersVote = 20;
    component.myVote = 1;

    // [KEY]: Tell Angular to run "Change Detection" in the DOM
    fixture.detectChanges();

    // [KEY]: Find the first matching element using the given CSS class
    let debugElement = fixture.debugElement.query( By.css( '.vote-count') );  

    // Cast the debugElement.nativeElement as HTMLElement
    let htmlElement: HTMLElement = debugElement.nativeElement;      

    // [KEY]: Get innerText from the HTMLElement
    expect( htmlElement.innerText ).toContain( 21 );

  });

  // Test CSS changes
  it( 'should highlight the upvote button if I have upvoted', () => {

    component.myVote = 1;
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query( By.css( '.glyphicon-menu-up') );

    expect( debugElement.classes[ 'highlighted'] ).toBeTruthy();

  });

  // Simulate clicking event
  it ( 'should increase the totalVoutes when I click on the upvote button', () => {

    let debugButton = fixture.debugElement.query( By.css('.glyphicon-menu-up') );

    debugButton.triggerEventHandler( 'click', null );     // [KEY]: Simulate clicking event firing

    expect( component.totalVotes ).toBe( 1 );

  });

});
