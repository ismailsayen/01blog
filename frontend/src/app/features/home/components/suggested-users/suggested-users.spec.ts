import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedUsers } from './suggested-users';

describe('SuggestedUsers', () => {
  let component: SuggestedUsers;
  let fixture: ComponentFixture<SuggestedUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
