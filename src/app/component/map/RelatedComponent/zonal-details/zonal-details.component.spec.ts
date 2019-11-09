import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalDetailsComponent } from './zonal-details.component';

describe('ZonalDetailsComponent', () => {
  let component: ZonalDetailsComponent;
  let fixture: ComponentFixture<ZonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
