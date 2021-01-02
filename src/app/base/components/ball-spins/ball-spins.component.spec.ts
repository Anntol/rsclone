import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSpinsComponent } from './ball-spins.component';

describe('BallSpinsComponent', () => {
  let component: BallSpinsComponent;
  let fixture: ComponentFixture<BallSpinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallSpinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSpinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
