import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistedVisitorPopupComponent } from './blacklisted-visitor-popup.component';

describe('BlacklistedVisitorPopupComponent', () => {
  let component: BlacklistedVisitorPopupComponent;
  let fixture: ComponentFixture<BlacklistedVisitorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistedVisitorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistedVisitorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
