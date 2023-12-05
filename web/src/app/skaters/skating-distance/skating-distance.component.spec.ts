import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkatingDistanceComponent } from './skating-distance.component';

describe('SkatingDistanceComponent', () => {
  let component: SkatingDistanceComponent;
  let fixture: ComponentFixture<SkatingDistanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkatingDistanceComponent]
    });
    fixture = TestBed.createComponent(SkatingDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
