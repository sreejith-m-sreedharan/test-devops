import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundrequestViewComponent } from './fundrequest-view.component';

describe('FundrequestViewComponent', () => {
  let component: FundrequestViewComponent;
  let fixture: ComponentFixture<FundrequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundrequestViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
