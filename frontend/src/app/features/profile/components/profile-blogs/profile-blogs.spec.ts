import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBlogs } from './profile-blogs';

describe('ProfileBlogs', () => {
  let component: ProfileBlogs;
  let fixture: ComponentFixture<ProfileBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBlogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
