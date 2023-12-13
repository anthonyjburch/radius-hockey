import { Component, Input } from '@angular/core';
import { ColDef, ColGroupDef, FilterChangedEvent, GridReadyEvent, SortChangedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-wrapper',
  templateUrl: './ag-grid-wrapper.component.html',
  styleUrls: ['./ag-grid-wrapper.component.scss']
})
export class AgGridWrapperComponent {
  @Input() colDefs: (ColDef | ColGroupDef)[] = [];
  @Input() data: [] = [];

  defaultColumnDef: ColDef = {
    suppressMovable: true,
  };

  onGridReady(event: GridReadyEvent): void {
    event.api.sizeColumnsToFit();
  }

  onSortChanged(event: SortChangedEvent): void {
    event.api.refreshCells();
  }

  onFilterChanged(event: FilterChangedEvent): void {
    event.api.refreshCells();
  }
}
