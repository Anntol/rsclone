import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitMenuComponent } from './git-menu.component';

describe('GitMenuComponent', () => {
  let component: GitMenuComponent;
  let fixture: ComponentFixture<GitMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
