import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateDetailsComponent } from './gate-details.component';

describe('GateDetailsComponent', () => {
  let component: GateDetailsComponent;
  let fixture: ComponentFixture<GateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
