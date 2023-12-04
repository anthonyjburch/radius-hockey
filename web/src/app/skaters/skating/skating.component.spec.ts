import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkatingComponent } from './skating.component';

describe('SkatingComponent', () => {
  let component: SkatingComponent;
  let fixture: ComponentFixture<SkatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkatingComponent]
    });
    fixture = TestBed.createComponent(SkatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
