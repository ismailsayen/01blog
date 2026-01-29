import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReports } from './table-reports';

describe('TableReports', () => {
  let component: TableReports;
  let fixture: ComponentFixture<TableReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
