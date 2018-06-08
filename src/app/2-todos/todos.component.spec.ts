/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('(Observable) should load todos from Service', () => {
    
    let todoService = TestBed.get( TodoService );     // [KEY]: Get Service instance from TestBed
    spyOn( todoService, 'getTodos' ).and.returnValue( [ [1, 2, 3 ] ] );

    fixture.detectChanges();

    expect( component.todos.length ).toBe( 3 );

  });

  // async()
  it('(Promise) should load todos from Service', async(() => {
    
    let todoService = TestBed.get( TodoService );     // [KEY]: Get Service instance from TestBed
    spyOn( todoService, 'getTodos' ).and.returnValue( [ [1, 2, 3 ] ] );

    fixture.detectChanges();

    fixture.whenStable().then( () => {     
      expect( component.todos.length ).toBe( 3 );
    });
  }));

  // fakeAsync()
  it('(Promise) should load todos from Service', fakeAsync(() => {
    
    let todoService = TestBed.get( TodoService );     // [KEY]: Get Service instance from TestBed
    spyOn( todoService, 'getTodos' ).and.returnValue( [ [1, 2, 3 ] ] );

    fixture.detectChanges();

    tick();
    expect( component.todos.length ).toBe( 3 );
  
  }));
});
