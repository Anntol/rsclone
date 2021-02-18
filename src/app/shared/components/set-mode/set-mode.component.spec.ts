import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetModeComponent } from './set-mode.component';

describe('SetModeComponent', () => {
  let component: SetModeComponent;
  let fixture: ComponentFixture<SetModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
