import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkatingSpeedComponent } from './skating-speed.component';

describe('SkatingSpeedComponent', () => {
  let component: SkatingSpeedComponent;
  let fixture: ComponentFixture<SkatingSpeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkatingSpeedComponent]
    });
    fixture = TestBed.createComponent(SkatingSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
