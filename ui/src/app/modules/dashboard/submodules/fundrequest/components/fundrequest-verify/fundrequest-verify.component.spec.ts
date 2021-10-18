import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundrequestVerifyComponent } from './fundrequest-verify.component';

describe('FundrequestVerifyComponent', () => {
  let component: FundrequestVerifyComponent;
  let fixture: ComponentFixture<FundrequestVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundrequestVerifyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
