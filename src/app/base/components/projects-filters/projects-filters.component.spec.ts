import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsFiltersComponent } from './projects-filters.component';

describe('ProjectsPageComponent', () => {
  let component: ProjectsFiltersComponent;
  let fixture: ComponentFixture<ProjectsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
