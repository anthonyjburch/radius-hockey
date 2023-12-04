import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingComponent } from './shooting.component';

describe('ShootingComponent', () => {
  let component: ShootingComponent;
  let fixture: ComponentFixture<ShootingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingComponent]
    });
    fixture = TestBed.createComponent(ShootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
