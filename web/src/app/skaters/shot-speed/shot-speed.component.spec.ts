import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotSpeedComponent } from './shot-speed.component';

describe('ShotSpeedComponent', () => {
  let component: ShotSpeedComponent;
  let fixture: ComponentFixture<ShotSpeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShotSpeedComponent]
    });
    fixture = TestBed.createComponent(ShotSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
