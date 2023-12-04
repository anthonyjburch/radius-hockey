import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkatersComponent } from './skaters.component';

describe('SkatersComponent', () => {
  let component: SkatersComponent;
  let fixture: ComponentFixture<SkatersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkatersComponent]
    });
    fixture = TestBed.createComponent(SkatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
