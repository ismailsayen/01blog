import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReports } from './dashboard-reports';

describe('DashboardReports', () => {
  let component: DashboardReports;
  let fixture: ComponentFixture<DashboardReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
