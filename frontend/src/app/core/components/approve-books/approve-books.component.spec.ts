import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBooksComponent } from './approve-books.component';

describe('ApproveBooksComponent', () => {
  let component: ApproveBooksComponent;
  let fixture: ComponentFixture<ApproveBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
