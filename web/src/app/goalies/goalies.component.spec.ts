import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaliesComponent } from './goalies.component';

describe('GoaliesComponent', () => {
  let component: GoaliesComponent;
  let fixture: ComponentFixture<GoaliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoaliesComponent]
    });
    fixture = TestBed.createComponent(GoaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
