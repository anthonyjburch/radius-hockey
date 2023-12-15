import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollNavigationComponent } from './horizontal-scroll-navigation.component';

describe('HorizontalScrollNavigationComponent', () => {
  let component: HorizontalScrollNavigationComponent;
  let fixture: ComponentFixture<HorizontalScrollNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalScrollNavigationComponent]
    });
    fixture = TestBed.createComponent(HorizontalScrollNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
