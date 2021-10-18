import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundrequestVerifyListComponent } from './fundrequest-verify-list.component';

describe('FundrequestVerifyListComponent', () => {
  let component: FundrequestVerifyListComponent;
  let fixture: ComponentFixture<FundrequestVerifyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundrequestVerifyListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestVerifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
