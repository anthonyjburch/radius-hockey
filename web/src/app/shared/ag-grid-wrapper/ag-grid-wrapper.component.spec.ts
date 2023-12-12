import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridWrapperComponent } from './ag-grid-wrapper.component';

describe('AgGridWrapperComponent', () => {
  let component: AgGridWrapperComponent;
  let fixture: ComponentFixture<AgGridWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridWrapperComponent]
    });
    fixture = TestBed.createComponent(AgGridWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
