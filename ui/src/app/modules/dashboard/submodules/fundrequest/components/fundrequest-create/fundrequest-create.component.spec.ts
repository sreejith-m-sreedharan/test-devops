import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundrequestCreateComponent } from './fundrequest-create.component';

describe('FundrequestCreateComponent', () => {
  let component: FundrequestCreateComponent;
  let fixture: ComponentFixture<FundrequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundrequestCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
