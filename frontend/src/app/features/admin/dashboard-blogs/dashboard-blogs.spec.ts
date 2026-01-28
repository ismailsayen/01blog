import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBlogs } from './dashboard-blogs';

describe('DashboardBlogs', () => {
  let component: DashboardBlogs;
  let fixture: ComponentFixture<DashboardBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBlogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
